# gateway-lease-fence

A self-contained, deterministic replay of the `sts2-gateway` lease fence, built only
against that crate's public API at one pinned revision.

## What it proves (label: `confirmed`)

At `sts2-gateway` rev `e7bce21d0cbd48a02c25d6463a3376ea1c94e253`, with in-memory fakes for
every port (frozen clock at tick 0, sequential process handles, always-ready probe,
counting transport), the gateway:

- allocates instances 1 and 2 with lease epoch 1 and reconciles both to `Ready`;
- denies a forward carrying a stale epoch (`Fence(StaleEpoch)`) before touching the transport;
- denies a forward whose proof names a different instance (`Fence(WrongInstance)`) before the transport;
- denies a forward whose proof names a caller that does not hold the lease (`Fence(WrongCaller)`) before the transport;
- forwards a valid proof once and returns the transport's status 200 (transport calls: 1);
- rejects a 9-byte body against an 8-byte limit (`BodyTooLarge { limit: 8, actual: 9 }`) without a transport call;
- releases instance 1 with one graceful stop, leaving it `Stopped` with no process attached.

The program checks every one of those expectations itself and exits non-zero if any fails.
Each step in the output names the product integration test it mirrors (`source_test`). The
`WrongCaller` denial has no dedicated integration test; it cites `identity::evaluate_fence`,
the function in `crates/gateway/src/identity.rs` that returns the variant when the recorded
lease caller differs from the presented proof.

## What it does not prove (label: `unverified`)

- Live Slay the Spire 2 compatibility, or behavior against any real game process, host, or transport.
- Anything about game files: none are read, needed, or included.
- Anything about a model or provider: none is used. Model cost: none.

## Prerequisites

- Rust 1.97.1 via `rustup` (`rust-toolchain.toml` selects it automatically).
- `git`, and network access for the first `cargo build` to fetch the pinned crate from GitHub.

## Run

```
cargo run --locked --release
```

Measured 2026-09-02 on one Windows 11 machine with Rust 1.97.1: first-ever build 3.8 s including the
one-time git fetch of the crate; a cold run after `cargo clean` about 1 s; a warm run about 0.09 s.

## Expected output

Stdout is a single JSON document that must match `fixture.json` byte for byte
(SHA-256 `68f8180b2110b92bdcc283bcbbaf4461bda4ba66e9a7bce78151b6409dcdc769`). To compare:

```
cargo run --locked --release > out.json
sha256sum out.json fixture.json                       # Linux, macOS, Git Bash
Get-FileHash out.json, fixture.json -Algorithm SHA256 # PowerShell 7
```

Use a plain `>` redirect. `Out-File` rewrites line endings and will not match.

## Safe defaults

Nothing is written to disk by the program; no network is used beyond Cargo fetching the crate; no credentials, environment variables, or game files are read.

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or
Valve and grants no rights to game files, assets, or marks.
