// SPDX-License-Identifier: MIT

//! Step records, expectation checking, and small JSON helpers for the replay.

use std::fmt::Debug;

use sts2_gateway::{FixedRoute, GatewayError, InstanceId, LeaseProof};

use crate::json::Json;

#[derive(Clone, Copy, Eq, PartialEq)]
pub enum Decision {
    Allowed,
    DeniedBeforeTransport,
    DeniedByLimit,
    Released,
}

impl Decision {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Allowed => "allowed",
            Self::DeniedBeforeTransport => "denied-before-transport",
            Self::DeniedByLimit => "denied-by-limit",
            Self::Released => "released",
        }
    }
}

/// One recorded scenario step; rendered in stable key order.
pub struct Step {
    pub n: u64,
    pub action: &'static str,
    pub input: Json,
    pub result: String,
    pub transport_calls: u64,
    pub boundary: &'static str,
    pub decision: Decision,
    pub source_test: &'static str,
}

impl Step {
    pub fn into_json(self) -> Json {
        Json::Obj(vec![
            ("n", Json::Num(self.n)),
            ("action", Json::text(self.action)),
            ("input", self.input),
            ("result", Json::Str(self.result)),
            ("transport_calls", Json::Num(self.transport_calls)),
            ("boundary", Json::text(self.boundary)),
            ("decision", Json::text(self.decision.label())),
            ("source_test", Json::text(self.source_test)),
        ])
    }
}

/// A forward attempt together with the outcome the product tests require.
pub struct ForwardCase {
    pub n: u64,
    pub action: &'static str,
    pub target: InstanceId,
    pub proof: LeaseProof,
    pub operation: u64,
    pub route: FixedRoute,
    pub body: Vec<u8>,
    pub expected: Result<u16, GatewayError>,
    pub expected_calls: u64,
    pub boundary: &'static str,
    pub decision: Decision,
    pub source_test: &'static str,
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
            "step {n} {what}: expected {expected:?}, got {actual:?}"
        ))
    }
}

pub fn len_u64(length: usize) -> u64 {
    u64::try_from(length).unwrap_or(u64::MAX)
}

pub fn proof_json(proof: LeaseProof) -> Json {
    Json::Obj(vec![
        ("instance_id", Json::Num(proof.instance_id().value())),
        ("caller_id", Json::Num(proof.caller_id().value())),
        ("session_id", Json::Num(proof.session_id().value())),
        ("lease_id", Json::Num(proof.lease_id().value())),
        ("epoch", Json::Num(proof.epoch().value())),
    ])
}
