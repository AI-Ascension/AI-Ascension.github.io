// SPDX-License-Identifier: MIT

//! Deterministic replay of the `sts2-gateway` lease fence at a pinned revision.
//!
//! The program drives the public `Gateway` API with in-memory fakes, checks
//! every expectation, and prints one stable JSON document on success. Any
//! failed expectation produces a message on stderr and a non-zero exit code.

mod fakes;
mod json;
mod scenario;
mod steps;

use std::process::ExitCode;

use sts2_gateway::{
    Allocation, CallerId, Gateway, GatewayConfig, InstanceId, LeaseEpoch, LeaseId, LifecycleState,
    OperationId, SessionId, StopMode,
};

use fakes::{AlwaysReady, CallCounter, CountingTransport, FrozenClock, LedgerProcess, StopLedger};
use json::Json;
use steps::{Decision, ForwardCase, Step, check, len_u64, proof_json};

const RECIPE: &str = "gateway-lease-fence";
const CRATE: &str = "sts2-gateway";
const REV: &str = "e7bce21d0cbd48a02c25d6463a3376ea1c94e253";
const CAPACITY: usize = 4;
const LEASE_DURATION_MILLIS: u64 = 10;
const MAX_BODY_BYTES: usize = 8;
const MAX_RESPONSE_BYTES: usize = 8;
const CALLER: CallerId = CallerId::new(7);
const SESSION: SessionId = SessionId::new(11);

const TEST_ALLOCATE: &str = "allocation_reconciles_through_readiness";
const TEST_RELEASE: &str = "release_then_cleanup_removes_instance";

type ReplayGateway = Gateway<FrozenClock, LedgerProcess, AlwaysReady, CountingTransport>;

fn main() -> ExitCode {
    match replay() {
        Ok(document) => {
            println!("{}", document.render());
            ExitCode::SUCCESS
        }
        Err(message) => {
            eprintln!("{RECIPE}: expectation failed: {message}");
            ExitCode::FAILURE
        }
    }
}

fn allocate_ready(
    gateway: &mut ReplayGateway,
    calls: &CallCounter,
    n: u64,
    expected_instance: u64,
    steps: &mut Vec<Step>,
) -> Result<Allocation, String> {
    let allocated = gateway.allocate(CALLER, SESSION);
    let allocation = allocated.map_err(|error| format!("step {n} allocate: {error}"))?;
    let expected_id = InstanceId::new(expected_instance);
    check(n, "instance id", allocation.instance_id(), expected_id)?;
    let expected_lease = LeaseId::new(expected_instance);
    check(n, "lease id", allocation.lease().lease_id(), expected_lease)?;
    check(
        n,
        "lease epoch",
        allocation.lease().epoch(),
        LeaseEpoch::new(1),
    )?;
    let reconciled = gateway.reconcile(allocation.instance_id());
    check(n, "reconcile", reconciled, Ok(LifecycleState::Ready))?;
    check(n, "transport calls", calls.count(), 0)?;
    steps.push(Step {
        n,
        action: "allocate_reconcile",
        input: Json::Obj(vec![
            ("caller_id", Json::Num(CALLER.value())),
            ("session_id", Json::Num(SESSION.value())),
        ]),
        result: format!("allocate={allocated:?}; reconcile={reconciled:?}"),
        transport_calls: calls.count(),
        boundary: "gateway.allocate → ProcessPort; gateway.reconcile → ProcessPort, ReadinessPort",
        decision: Decision::Allowed,
        source_test: TEST_ALLOCATE,
    });
    Ok(allocation)
}

fn forward(
    gateway: &mut ReplayGateway,
    calls: &CallCounter,
    case: ForwardCase,
    steps: &mut Vec<Step>,
) -> Result<(), String> {
    let body_len = len_u64(case.body.len());
    let outcome = gateway.forward(
        case.target,
        case.proof,
        OperationId::new(case.operation),
        case.route,
        case.body,
    );
    let observed = outcome
        .as_ref()
        .map(|response| response.status())
        .map_err(|error| *error);
    check(case.n, "forward outcome", observed, case.expected)?;
    check(
        case.n,
        "transport calls",
        calls.count(),
        case.expected_calls,
    )?;
    steps.push(Step {
        n: case.n,
        action: case.action,
        input: Json::Obj(vec![
            ("target_instance_id", Json::Num(case.target.value())),
            ("proof", proof_json(case.proof)),
            ("operation_id", Json::Num(case.operation)),
            ("route", Json::text(format!("{:?}", case.route))),
            ("body_len", Json::Num(body_len)),
        ]),
        result: format!("{outcome:?}"),
        transport_calls: calls.count(),
        boundary: case.boundary,
        decision: case.decision,
        source_test: case.source_test,
    });
    Ok(())
}

fn release(
    gateway: &mut ReplayGateway,
    calls: &CallCounter,
    stops: &StopLedger,
    n: u64,
    allocation: Allocation,
    steps: &mut Vec<Step>,
) -> Result<(), String> {
    let proof = allocation.lease().proof();
    let released = gateway.release(proof);
    check(n, "release", released, Ok(()))?;
    let snapshot = gateway
        .status(allocation.instance_id())
        .map_err(|error| format!("step {n} status: {error}"))?;
    check(n, "state", snapshot.state(), LifecycleState::Stopped)?;
    check(n, "process attached", snapshot.process_attached(), false)?;
    check(n, "lease cleared", snapshot.lease(), None)?;
    check(n, "stop modes", stops.modes(), vec![StopMode::Graceful])?;
    check(n, "transport calls", calls.count(), 1)?;
    steps.push(Step {
        n,
        action: "release_status",
        input: Json::Obj(vec![("proof", proof_json(proof))]),
        result: format!(
            "release={released:?}; state={:?}; process_attached={}; stop_modes={:?}",
            snapshot.state(),
            snapshot.process_attached(),
            stops.modes()
        ),
        transport_calls: calls.count(),
        boundary: "gateway.release → ProcessPort (graceful stop); gateway.status → in-memory record",
        decision: Decision::Released,
        source_test: TEST_RELEASE,
    });
    Ok(())
}

fn replay() -> Result<Json, String> {
    let stops = StopLedger::default();
    let calls = CallCounter::default();
    let config = GatewayConfig::new(
        CAPACITY,
        LEASE_DURATION_MILLIS,
        MAX_BODY_BYTES,
        MAX_RESPONSE_BYTES,
    );
    let mut gateway = Gateway::new(
        config,
        FrozenClock,
        LedgerProcess::new(stops.clone()),
        AlwaysReady,
        CountingTransport::new(calls.clone()),
    );
    let mut steps = Vec::new();

    let first = allocate_ready(&mut gateway, &calls, 1, 1, &mut steps)?;
    let second = allocate_ready(&mut gateway, &calls, 2, 2, &mut steps)?;
    let cases = scenario::forward_cases(&first, &second, CALLER, SESSION, MAX_BODY_BYTES);
    for case in cases {
        forward(&mut gateway, &calls, case, &mut steps)?;
    }
    release(&mut gateway, &calls, &stops, 8, first, &mut steps)?;

    let count = |decision: Decision| {
        len_u64(
            steps
                .iter()
                .filter(|step| step.decision == decision)
                .count(),
        )
    };
    let summary = Json::Obj(vec![
        ("steps", Json::Num(len_u64(steps.len()))),
        ("allowed", Json::Num(count(Decision::Allowed))),
        (
            "denied_before_transport",
            Json::Num(count(Decision::DeniedBeforeTransport)),
        ),
        ("denied_by_limit", Json::Num(count(Decision::DeniedByLimit))),
        ("released", Json::Num(count(Decision::Released))),
        ("transport_calls_total", Json::Num(calls.count())),
        ("all_expectations_met", Json::Bool(true)),
    ]);
    Ok(Json::Obj(vec![
        ("recipe", Json::text(RECIPE)),
        ("crate", Json::text(CRATE)),
        ("rev", Json::text(REV)),
        ("mode", Json::text("deterministic-replay")),
        ("live_game_compatibility", Json::text("unverified")),
        (
            "config",
            Json::Obj(vec![
                ("capacity", Json::Num(len_u64(CAPACITY))),
                ("lease_duration_millis", Json::Num(LEASE_DURATION_MILLIS)),
                ("max_body_bytes", Json::Num(len_u64(MAX_BODY_BYTES))),
                ("max_response_bytes", Json::Num(len_u64(MAX_RESPONSE_BYTES))),
            ]),
        ),
        (
            "steps",
            Json::Arr(steps.into_iter().map(Step::into_json).collect()),
        ),
        ("summary", summary),
    ]))
}
