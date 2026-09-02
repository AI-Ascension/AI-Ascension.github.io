// SPDX-License-Identifier: MIT

//! Deterministic in-memory port implementations for the replay.
//!
//! These are original fakes written against the public `sts2-gateway` port
//! traits. They perform no I/O, use no wall-clock time, and never fail.

use std::cell::{Cell, RefCell};
use std::rc::Rc;

use sts2_gateway::{
    Clock, HealthFault, InstanceId, LaunchSpec, ProcessFault, ProcessHandle, ProcessPort,
    ProcessState, Readiness, ReadinessPort, StopMode, Tick, TransportFault, TransportPort,
    TransportRequest, TransportResponse,
};

/// A monotonic clock frozen at tick 0, so no lease expires during the replay.
pub struct FrozenClock;

impl Clock for FrozenClock {
    fn now(&self) -> Tick {
        Tick::from_millis(0)
    }
}

/// Shared, observable record of every stop the process port was asked for.
#[derive(Clone, Default)]
pub struct StopLedger(Rc<RefCell<Vec<StopMode>>>);

impl StopLedger {
    pub fn modes(&self) -> Vec<StopMode> {
        self.0.borrow().clone()
    }
}

/// Hands out handles 1, 2, ... in order, reports every process as running,
/// and appends each stop request to the ledger.
pub struct LedgerProcess {
    next_handle: u64,
    stops: StopLedger,
}

impl LedgerProcess {
    pub const fn new(stops: StopLedger) -> Self {
        Self {
            next_handle: 1,
            stops,
        }
    }
}

impl ProcessPort for LedgerProcess {
    fn start(&mut self, _specification: LaunchSpec) -> Result<ProcessHandle, ProcessFault> {
        let handle = ProcessHandle::new(self.next_handle);
        self.next_handle = self.next_handle.saturating_add(1);
        Ok(handle)
    }

    fn inspect(&mut self, _process: ProcessHandle) -> Result<ProcessState, ProcessFault> {
        Ok(ProcessState::Running)
    }

    fn stop(&mut self, _process: ProcessHandle, mode: StopMode) -> Result<(), ProcessFault> {
        self.stops.0.borrow_mut().push(mode);
        Ok(())
    }
}

/// A readiness probe that always answers `Ready`.
pub struct AlwaysReady;

impl ReadinessPort for AlwaysReady {
    fn probe(
        &mut self,
        _instance: InstanceId,
        _process: ProcessHandle,
    ) -> Result<Readiness, HealthFault> {
        Ok(Readiness::Ready)
    }
}

/// Shared, observable count of how many requests reached the transport seam.
#[derive(Clone, Default)]
pub struct CallCounter(Rc<Cell<u64>>);

impl CallCounter {
    pub fn count(&self) -> u64 {
        self.0.get()
    }
}

/// Counts every forwarded request and answers with a fixed one-byte 200 response.
pub struct CountingTransport {
    calls: CallCounter,
}

impl CountingTransport {
    pub const fn new(calls: CallCounter) -> Self {
        Self { calls }
    }
}

impl TransportPort for CountingTransport {
    fn forward(&mut self, _request: TransportRequest) -> Result<TransportResponse, TransportFault> {
        self.calls.0.set(self.calls.0.get().saturating_add(1));
        Ok(TransportResponse::new(200, vec![1]))
    }
}
