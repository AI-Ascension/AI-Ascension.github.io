# mcp-seam

A self-contained, deterministic replay of the `sts2-mcp-server` gateway seam, built only
against that crate's public API at one pinned revision.

## What it proves (label: `confirmed`)

At `sts2-mcp-server` rev `5faed9761866f89b922f01d3d389f3db55b9cf5e`, driving `McpServer`
with an in-memory fake `GatewayAdapter`, the seam:

- maps one valid `sts2_get_state` tool call to exactly one `GET /v1/instances/instance-1/state`
  carrying both `x-mcp-request-id` and `x-mcp-session-id` and no body, and answers `isError:false`;
- rejects a truncated frame with `-32700` and a null id before the adapter is reached
  (gateway calls: 0);
- rejects an unsupported capability, `resources/list`, with `-32601` without forwarding
  (gateway calls: 0);
- maps a gateway `Unauthorized` to the stable `-32001` "gateway authorization failed" after
  exactly one forward, preserving the request id.

The program checks every one of those expectations itself and exits non-zero if any fails.
Each step names the product integration test in `crates/mcp-server/tests/seam.rs` whose
behaviour it mirrors (`source_test`); the test file itself is not copied. The correlation
header assertions mirror `correlation_preserves_mcp_request_and_session_namespaces`, named
in the document's `correlation_source_test` field.

## What it does not prove (label: `unverified`)

- Live MCP transport: no socket, pipe, or stdio framing loop is opened. `FrameCodec` is
  exercised only through `McpServer::handle_frame`.
- Any gateway connection: the adapter is a fake. No gateway process, port, or credential
  is involved, and no response comes from a real gateway.
- Live Slay the Spire 2 compatibility, or behaviour against any real game process or host.
- Anything about game files: none are read, needed, or included.
- Anything about a model or provider: none is used. Model cost: none.

## Prerequisites

- Rust 1.97.1 via `rustup` (`rust-toolchain.toml` selects it automatically).
- `git`, and network access for the first `cargo build` to fetch the pinned crate from GitHub.
- No credentials, environment variables, or game files are read.

## Run it

```
cargo run --locked --release
```

Measured 2026-09-05 on one Windows 11 machine under WSL with Rust 1.97.1: first build about
2.2 s including the one-time git fetch of the crate; a warm run well under a second. Your
numbers will differ.

## Expected output

Stdout is a single JSON document that must match `fixture.json` byte for byte
(SHA-256 `158b964ec7c3647e96283b660ed5d0e6285f7c94314d0d1911a0c37998ecc5cd`). To compare:

```
cargo run --locked --release > out.json
sha256sum out.json fixture.json                       # Linux, macOS, Git Bash
Get-FileHash out.json, fixture.json -Algorithm SHA256 # PowerShell 7
```

Use a plain `>` redirect. `Out-File` rewrites line endings and will not match.

Three consecutive runs produced identical output when this fixture was recorded, and CI
reproduces it on Linux and compares with `cmp` on every pull request.

## Field discipline

The document uses the same shape as `recipes/gateway-lease-fence`: `recipe`, `crate`, `rev`,
`mode`, `live_game_compatibility`, `steps[]`, and `summary`. Each step records the frame sent,
the JSON-RPC error code or `none`, the number of gateway calls, the forwarded request when
there was one, the boundary that decided the outcome, the decision, and the source test.

## Safe defaults

Nothing is written to disk by the program; no network is used beyond Cargo fetching the crate;
no credentials, environment variables, or game files are read. AI-Ascension is an independent
project, not affiliated with or endorsed by Mega Crit or Valve.
