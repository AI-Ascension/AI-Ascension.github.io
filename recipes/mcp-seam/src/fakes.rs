// SPDX-License-Identifier: MIT

//! In-memory `GatewayAdapter` that records what the seam forwarded.
//!
//! No socket, process, or provider is involved: the adapter answers from a
//! fixed outcome and keeps every request it was handed.

use sts2_mcp_server::{GatewayAdapter, GatewayError, GatewayRequest, GatewayResponse, JsonValue};

/// Records forwarded requests and answers with one predetermined outcome.
pub struct FakeGateway {
    requests: Vec<GatewayRequest>,
    outcome: Result<JsonValue, GatewayError>,
}

impl FakeGateway {
    /// An adapter that answers every request with status 200 and `body`.
    pub const fn success(body: JsonValue) -> Self {
        Self {
            requests: Vec::new(),
            outcome: Ok(body),
        }
    }

    /// An adapter that fails every request with `error`.
    pub const fn failure(error: GatewayError) -> Self {
        Self {
            requests: Vec::new(),
            outcome: Err(error),
        }
    }

    /// Number of requests the seam forwarded so far.
    pub fn call_count(&self) -> u64 {
        u64::try_from(self.requests.len()).unwrap_or(u64::MAX)
    }

    /// The first forwarded request, if the seam forwarded anything.
    pub fn first_request(&self) -> Option<&GatewayRequest> {
        self.requests.first()
    }
}

impl GatewayAdapter for FakeGateway {
    fn forward(&mut self, request: GatewayRequest) -> Result<GatewayResponse, GatewayError> {
        self.requests.push(request);
        match &self.outcome {
            Ok(body) => Ok(GatewayResponse {
                status: 200,
                body: body.clone(),
            }),
            Err(error) => Err(*error),
        }
    }
}
