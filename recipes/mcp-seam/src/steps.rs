// SPDX-License-Identifier: MIT

//! Step records and expectation helpers for the MCP seam replay.

use core::fmt::Debug;

use sts2_mcp_server::{GatewayMethod, GatewayRequest};

use crate::json::Json;

/// What the seam did with one frame.
#[derive(Clone, Copy, Eq, PartialEq)]
pub enum Decision {
    Allowed,
    DeniedBeforeGateway,
    DeniedByGateway,
}

impl Decision {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Allowed => "allowed",
            Self::DeniedBeforeGateway => "denied-before-gateway",
            Self::DeniedByGateway => "denied-by-gateway",
        }
    }
}

/// One replayed frame and everything observed about it.
pub struct Step {
    pub n: u64,
    pub action: &'static str,
    pub frame: String,
    pub rpc_error_code: Option<i64>,
    pub result: String,
    pub gateway_calls: u64,
    pub gateway_request: Option<Json>,
    pub boundary: &'static str,
    pub decision: Decision,
    pub source_test: &'static str,
}

impl Step {
    pub fn into_json(self) -> Json {
        Json::Obj(vec![
            ("step", Json::Num(self.n)),
            ("action", Json::text(self.action)),
            ("frame", Json::Str(self.frame)),
            (
                "rpc_error_code",
                match self.rpc_error_code {
                    Some(code) => Json::text(code.to_string()),
                    None => Json::text("none"),
                },
            ),
            ("result", Json::Str(self.result)),
            ("gateway_calls", Json::Num(self.gateway_calls)),
            (
                "gateway_request",
                self.gateway_request.unwrap_or(Json::text("none")),
            ),
            ("boundary", Json::text(self.boundary)),
            ("decision", Json::text(self.decision.label())),
            ("source_test", Json::text(self.source_test)),
        ])
    }
}

/// Renders a forwarded request, including the correlation headers.
pub fn request_json(request: &GatewayRequest) -> Json {
    let method = match request.method {
        GatewayMethod::Get => "GET",
    };
    let headers = request
        .headers
        .iter()
        .map(|(key, value)| {
            Json::Obj(vec![
                ("name", Json::text(key.clone())),
                ("value", Json::text(value.clone())),
            ])
        })
        .collect();
    Json::Obj(vec![
        ("method", Json::text(method)),
        ("path", Json::text(request.path.clone())),
        ("headers", Json::Arr(headers)),
        ("body_present", Json::Bool(request.body.is_some())),
        (
            "correlation",
            Json::Obj(vec![
                (
                    "mcp_session_id",
                    Json::text(request.correlation.mcp_session_id.clone()),
                ),
                (
                    "mcp_request_id",
                    Json::text(request.correlation.mcp_request_id.stable_text()),
                ),
            ]),
        ),
    ])
}

/// Compares an observed value with the expected one, naming the step on mismatch.
pub fn check<T: Debug + PartialEq>(
    n: u64,
    what: &str,
    actual: T,
    expected: T,
) -> Result<(), String> {
    if actual == expected {
        Ok(())
    } else {
        Err(format!(
            "step {n} {what}: expected {expected:?}, observed {actual:?}"
        ))
    }
}

/// Asserts that `haystack` contains `needle`, naming the step on failure.
pub fn contains(n: u64, what: &str, haystack: &str, needle: &str) -> Result<(), String> {
    if haystack.contains(needle) {
        Ok(())
    } else {
        Err(format!(
            "step {n} {what}: {needle:?} not found in {haystack:?}"
        ))
    }
}

/// Converts a length to the `u64` the JSON writer takes.
pub fn len_u64(value: usize) -> u64 {
    u64::try_from(value).unwrap_or(u64::MAX)
}
