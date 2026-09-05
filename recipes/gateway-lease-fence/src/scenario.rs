// SPDX-License-Identifier: MIT

//! Forward-case table for the replay.
//!
//! Kept out of `main.rs` so each source file stays inside the repository's
//! 300 nonblank-line budget.

use sts2_gateway::{
    Allocation, CallerId, FenceFailure, FixedRoute, GatewayError, LeaseEpoch, LeaseProof, SessionId,
};

use crate::steps::{Decision, ForwardCase};

/// Test in `crates/gateway/tests/control_plane.rs` establishing the fence denials.
const TEST_FENCE: &str = "stale_epoch_and_wrong_instance_are_denied_before_transport";
/// Test in `crates/gateway/tests/control_plane.rs` establishing the transport bounds.
const TEST_TRANSPORT: &str = "fixed_transport_is_bounded_and_fail_closed";
/// `WrongCaller` has no dedicated integration test; the behaviour is established
/// by `evaluate_fence` in `crates/gateway/src/identity.rs`, which returns it when
/// the recorded lease caller differs from the presented proof.
const SOURCE_EVALUATE_FENCE: &str = "identity::evaluate_fence";

const FENCE_BOUNDARY: &str = "gateway.forward → lease fence (before TransportPort)";

/// A caller that never holds a lease in this replay.
const OTHER_CALLER: CallerId = CallerId::new(8);

/// Builds the ordered forward cases, including one denial per fence reason the
/// replay covers. Every denied case leaves `transport_calls` unchanged.
pub fn forward_cases(
    first: &Allocation,
    second: &Allocation,
    caller: CallerId,
    session: SessionId,
    max_body_bytes: usize,
) -> Vec<ForwardCase> {
    let stale = LeaseProof::new(
        first.instance_id(),
        caller,
        session,
        first.lease().lease_id(),
        LeaseEpoch::new(0),
    );
    let wrong_caller = LeaseProof::new(
        first.instance_id(),
        OTHER_CALLER,
        session,
        first.lease().lease_id(),
        LeaseEpoch::new(1),
    );
    vec![
        ForwardCase {
            n: 3,
            action: "forward_stale_epoch",
            target: first.instance_id(),
            proof: stale,
            operation: 1,
            route: FixedRoute::Command,
            body: vec![1],
            expected: Err(GatewayError::Fence(FenceFailure::StaleEpoch)),
            expected_calls: 0,
            boundary: FENCE_BOUNDARY,
            decision: Decision::DeniedBeforeTransport,
            source_test: TEST_FENCE,
        },
        ForwardCase {
            n: 4,
            action: "forward_wrong_instance",
            target: second.instance_id(),
            proof: first.lease().proof(),
            operation: 2,
            route: FixedRoute::ReadOnly,
            body: vec![1],
            expected: Err(GatewayError::Fence(FenceFailure::WrongInstance)),
            expected_calls: 0,
            boundary: FENCE_BOUNDARY,
            decision: Decision::DeniedBeforeTransport,
            source_test: TEST_FENCE,
        },
        ForwardCase {
            n: 5,
            action: "forward_wrong_caller",
            target: first.instance_id(),
            proof: wrong_caller,
            operation: 3,
            route: FixedRoute::Command,
            body: vec![1],
            expected: Err(GatewayError::Fence(FenceFailure::WrongCaller)),
            expected_calls: 0,
            boundary: FENCE_BOUNDARY,
            decision: Decision::DeniedBeforeTransport,
            source_test: SOURCE_EVALUATE_FENCE,
        },
        ForwardCase {
            n: 6,
            action: "forward_valid",
            target: first.instance_id(),
            proof: first.lease().proof(),
            operation: 4,
            route: FixedRoute::Receipt,
            body: vec![2, 3],
            expected: Ok(200),
            expected_calls: 1,
            boundary: "gateway.forward → TransportPort",
            decision: Decision::Allowed,
            source_test: TEST_TRANSPORT,
        },
        ForwardCase {
            n: 7,
            action: "forward_body_too_large",
            target: first.instance_id(),
            proof: first.lease().proof(),
            operation: 5,
            route: FixedRoute::Command,
            body: vec![0; 9],
            expected: Err(GatewayError::BodyTooLarge {
                limit: max_body_bytes,
                actual: 9,
            }),
            expected_calls: 1,
            boundary: "gateway.forward → body limit (before lease fence and TransportPort)",
            decision: Decision::DeniedByLimit,
            source_test: TEST_TRANSPORT,
        },
    ]
}
