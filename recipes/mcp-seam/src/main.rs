// SPDX-License-Identifier: MIT

//! Deterministic replay of the `sts2-mcp-server` gateway seam at a pinned revision.
//!
//! The program drives the public `McpServer` API with an in-memory fake
//! `GatewayAdapter`, checks every expectation, and prints one stable JSON
//! document on success. Any failed expectation produces a message on stderr
//! and a non-zero exit code.

mod fakes;
mod json;
mod steps;

use std::process::ExitCode;

use sts2_mcp_server::{GatewayError, JsonValue, McpServer};

use fakes::FakeGateway;
use json::Json;
use steps::{Decision, Step, check, contains, len_u64, request_json};

const RECIPE: &str = "mcp-seam";
const CRATE: &str = "sts2-mcp-server";
const REV: &str = "5faed9761866f89b922f01d3d389f3db55b9cf5e";

const TEST_VALID: &str = "valid_call_maps_to_one_owned_gateway_request";
const TEST_CORRELATION: &str = "correlation_preserves_mcp_request_and_session_namespaces";
const TEST_PARSE: &str = "malformed_json_is_rejected_before_gateway_access";
const TEST_CAPABILITY: &str = "unsupported_capability_is_rejected_without_forwarding";
const TEST_UNAUTHORIZED: &str = "gateway_authorization_error_maps_to_stable_rpc_error";

const SEAM_BOUNDARY: &str = "McpServer.handle_frame → GatewayAdapter";
const FRAMING_BOUNDARY: &str = "McpServer.handle_frame → FrameCodec (before GatewayAdapter)";
const CATALOG_BOUNDARY: &str =
    "McpServer.handle_frame → capability dispatch (before GatewayAdapter)";

/// Builds a `tools/call` frame for `sts2_get_state`.
fn state_call(id: &str, session: &str, instance: &str) -> String {
    format!(
        "{{\"jsonrpc\":\"2.0\",\"id\":\"{id}\",\"method\":\"tools/call\",\
         \"params\":{{\"name\":\"sts2_get_state\",\"arguments\":{{\
         \"instance_id\":\"{instance}\",\"mcp_session_id\":\"{session}\"}}}}}}"
    )
}

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

/// One valid call maps to exactly one GET with both correlation headers.
fn step_valid(n: u64) -> Result<Step, String> {
    let mut server = McpServer::new(FakeGateway::success(JsonValue::object([(
        String::from("phase"),
        JsonValue::string("ready"),
    )])));
    let frame = state_call("mcp-request-42", "mcp-session-9", "instance-1");
    let response = server.handle_frame(&frame);
    contains(n, "response", &response, "\"isError\":false")?;
    contains(n, "response", &response, "ready")?;
    contains(n, "response id", &response, "\"id\":\"mcp-request-42\"")?;
    let gateway = server.gateway();
    check(n, "gateway calls", gateway.call_count(), 1)?;
    let request = gateway
        .first_request()
        .ok_or_else(|| format!("step {n}: no gateway request recorded"))?;
    check(
        n,
        "path",
        request.path.as_str(),
        "/v1/instances/instance-1/state",
    )?;
    check(n, "body present", request.body.is_some(), false)?;
    check(
        n,
        "x-mcp-request-id",
        request.headers.get("x-mcp-request-id").map(String::as_str),
        Some("mcp-request-42"),
    )?;
    check(
        n,
        "x-mcp-session-id",
        request.headers.get("x-mcp-session-id").map(String::as_str),
        Some("mcp-session-9"),
    )?;
    check(n, "header count", len_u64(request.headers.len()), 2)?;
    Ok(Step {
        n,
        action: "valid_get_state",
        frame,
        rpc_error_code: None,
        result: String::from("isError=false; one GET forwarded with both correlation headers"),
        gateway_calls: gateway.call_count(),
        gateway_request: Some(request_json(request)),
        boundary: SEAM_BOUNDARY,
        decision: Decision::Allowed,
        source_test: TEST_VALID,
    })
}

/// A truncated frame is a parse error decided before the adapter is touched.
fn step_malformed(n: u64) -> Result<Step, String> {
    let mut server = McpServer::new(FakeGateway::success(JsonValue::Null));
    let frame = String::from("{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":");
    let response = server.handle_frame(&frame);
    contains(n, "response", &response, "\"code\":-32700")?;
    contains(n, "response id", &response, "\"id\":null")?;
    check(n, "gateway calls", server.gateway().call_count(), 0)?;
    Ok(Step {
        n,
        action: "malformed_json",
        frame,
        rpc_error_code: Some(-32700),
        result: String::from("parse error with a null id; nothing forwarded"),
        gateway_calls: 0,
        gateway_request: None,
        boundary: FRAMING_BOUNDARY,
        decision: Decision::DeniedBeforeGateway,
        source_test: TEST_PARSE,
    })
}

/// A method outside the advertised capability is refused without forwarding.
fn step_unsupported(n: u64) -> Result<Step, String> {
    let mut server = McpServer::new(FakeGateway::success(JsonValue::Null));
    let frame =
        String::from("{\"jsonrpc\":\"2.0\",\"id\":3,\"method\":\"resources/list\",\"params\":{}}");
    let response = server.handle_frame(&frame);
    contains(n, "response", &response, "\"code\":-32601")?;
    contains(n, "response", &response, "not supported")?;
    check(n, "gateway calls", server.gateway().call_count(), 0)?;
    Ok(Step {
        n,
        action: "unsupported_capability",
        frame,
        rpc_error_code: Some(-32601),
        result: String::from("method not found; nothing forwarded"),
        gateway_calls: 0,
        gateway_request: None,
        boundary: CATALOG_BOUNDARY,
        decision: Decision::DeniedBeforeGateway,
        source_test: TEST_CAPABILITY,
    })
}

/// A gateway `Unauthorized` maps to a stable -32001 after one forward.
fn step_unauthorized(n: u64) -> Result<Step, String> {
    let mut server = McpServer::new(FakeGateway::failure(GatewayError::Unauthorized));
    let frame = state_call("request-8", "session-2", "instance-3");
    let response = server.handle_frame(&frame);
    contains(n, "response", &response, "\"code\":-32001")?;
    contains(n, "response", &response, "gateway authorization failed")?;
    contains(n, "response id", &response, "\"id\":\"request-8\"")?;
    let gateway = server.gateway();
    check(n, "gateway calls", gateway.call_count(), 1)?;
    let request = gateway
        .first_request()
        .ok_or_else(|| format!("step {n}: no gateway request recorded"))?;
    check(
        n,
        "path",
        request.path.as_str(),
        "/v1/instances/instance-3/state",
    )?;
    Ok(Step {
        n,
        action: "gateway_unauthorized",
        frame,
        rpc_error_code: Some(-32001),
        result: String::from("gateway authorization failed mapped to -32001 after one forward"),
        gateway_calls: gateway.call_count(),
        gateway_request: Some(request_json(request)),
        boundary: SEAM_BOUNDARY,
        decision: Decision::DeniedByGateway,
        source_test: TEST_UNAUTHORIZED,
    })
}

fn replay() -> Result<Json, String> {
    let steps = vec![
        step_valid(1)?,
        step_malformed(2)?,
        step_unsupported(3)?,
        step_unauthorized(4)?,
    ];
    let gateway_calls_total: u64 = steps.iter().map(|step| step.gateway_calls).sum();
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
            "denied_before_gateway",
            Json::Num(count(Decision::DeniedBeforeGateway)),
        ),
        (
            "denied_by_gateway",
            Json::Num(count(Decision::DeniedByGateway)),
        ),
        ("gateway_calls_total", Json::Num(gateway_calls_total)),
        ("all_expectations_met", Json::Bool(true)),
    ]);
    Ok(Json::Obj(vec![
        ("recipe", Json::text(RECIPE)),
        ("crate", Json::text(CRATE)),
        ("rev", Json::text(REV)),
        ("mode", Json::text("deterministic-replay")),
        ("live_game_compatibility", Json::text("unverified")),
        ("correlation_source_test", Json::text(TEST_CORRELATION)),
        (
            "steps",
            Json::Arr(steps.into_iter().map(Step::into_json).collect()),
        ),
        ("summary", summary),
    ]))
}
