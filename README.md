# AI-Ascension.github.io

Public site for AI-Ascension: what is tested today, what is only proposed, and a browser replay of one gateway contract test.

This repository is the historical evidence entry point for AI Ascension. The
developer flagship is [Ascension](https://github.com/AI-Ascension/sts2-harness),
and audience-facing run reports belong to **The Climb — by AI Ascension**.
Those labels are presentation copy; this Pages repository name, its routes,
anchors, and evidence assets remain stable.

Live at <https://ai-ascension.github.io>.

## Run locally

There is no build step. Open `index.html` directly in a browser, or serve the directory with any static file server, for example:

```
npx serve .
```

Every page is hand-authored HTML, CSS, and vanilla JavaScript. Fonts are self-hosted. The site makes no external requests: no analytics, no cookies, no font service, no CDN.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | hero, evidence status, the ascent, four audience paths, tested versus proposed |
| `proof.html` | deterministic replay of the `sts2-gateway` lease fence (eight steps from `recipes/gateway-lease-fence/fixture.json`) |
| `recipes.html` | the starter cargo recipe, an honest empty gallery, how to submit |
| `architecture.html` | runtime topology, boundary table, definitions |
| `repositories.html` | nine-repository inventory, historical pinned commits and CI results |
| `evidence.html` | claim ledger, labels, description synchronization, unknowns, dispute path |
| `contributing.html` | one bounded first task per audience |
| `404.html` | not found |

## Deploy

`node --test tests/*.test.cjs` checks the embedded fixture, entry-page local links,
and replay controls with a synthetic DOM. The read-only validation workflow also
runs the pinned Rust recipe and compares its output. These checks do not render
the site or establish screen-reader, browser-layout, or game-host behavior.

`.github/workflows/pages.yml` deploys the repository root to GitHub Pages on every push to `main` (and on manual dispatch) using pinned action commits. `.nojekyll` disables Jekyll processing. Pages must be enabled for the repository with "GitHub Actions" as the source.

## Identity and art provenance

Design tokens, marks, stamps, and banners live in `assets/identity/`; their provenance, sizes, and hashes are in `assets/identity/MANIFEST.md`, and the contrast audit in `assets/identity/CONTRAST.md`. Fonts (SIL OFL 1.1) are in `assets/fonts/` with notices in `assets/fonts/NOTICES.md`. Third-party notices for the site are in `NOTICES.md`. Art is branding, never product evidence.

## Recipe

`recipes/gateway-lease-fence/` is a self-contained cargo program that reproduces the proof trace against the pinned `sts2-gateway` crate. See its README for prerequisites, the command, and how to compare hashes.

## Status

The accepted artifact snapshot remains the dated 22:27 UTC native-artifact successor below; the latest source heads are recorded in the 02:02 UTC successor that follows it.

The deterministic recipe remains pinned to its historical gateway revision. Current repositories also
contain bounded, dated Windows/Linux campaign and replay records, Runtime-v4 source/component paths,
a read-only coordinator-synchronization check, and a two-process native co-op admission diagnostic.
The diagnostic's disconnect observation failed and produced no gameplay or recovery claim. A fresh
identity-bound cleanup removed the previously reviewed stale Windows candidate and hash-verified the
retained profile save and canonical source; this is storage evidence only. These records are scoped to
their named fixtures and do not establish model-played Victory, native multiplayer gameplay, release
readiness, or general compatibility. An earlier `confirmed` source review, captured at 15:34–15:38 UTC on 2026-09-10, records all nine exact default-main heads and the site publication result in `evidence.html#current` and the linked status supplement. The records do not establish model-played Victory or its replay, native settlement or co-op recovery, live two-backend telemetry, a public release, or Workshop upload, legal agreement, entitlement, and lifecycle acceptance. Site `main` is `3935679`; validation run `34495457608` and Pages deployment `34495457785` succeeded, which confirms static publication only.

An earlier `confirmed` successor refresh began at 15:54 UTC on 2026-09-10 and records the current
nine default-main heads and completed checks in [`evidence.html#current`](evidence.html#current).
Game-mod `main` is [`a70a5e5`](https://github.com/AI-Ascension/sts2-game-mod/commit/a70a5e5bb2fa89fade7e16dbb4a58ed80e31355b)
after [PR #71](https://github.com/AI-Ascension/sts2-game-mod/pull/71) closed the source-distribution
policy and copied REST artifact parity gap. Harness `main` is
[`4342789`](https://github.com/AI-Ascension/sts2-harness/commit/4342789de4bf5a5f23aee85be273db9a263c9c31)
after [PR #58](https://github.com/AI-Ascension/sts2-harness/pull/58) wired the worker handoff/runtime/store
graph and its watchdog-worker-v1 fixtures and restart/recovery tests. These remain source/component
and CI records. The blockers remain exact: no model-controlled Victory or replay; no native two-peer
action/effect/checksum settlement or disconnect/rejoin recovery; Laminar credential/path and rootful
Podman/host acceptance are still needed; there are zero tags and zero GitHub releases across the nine
repositories; and Workshop upload, Steam legal agreement, entitlement, item/content visibility,
subscription/discovery/loading, update, and rollback remain unverified. Site `main` is `a451a70`, with
validation `34498420048` and Pages deployment `34498419971` successful; this confirms static publication
only.

An earlier `confirmed` successor refresh, captured at 16:13 UTC, follows harness PR [#51](https://github.com/AI-Ascension/sts2-harness/pull/51)
merging at `2026-09-10T16:03:56Z`. Harness `main` is
[`780f2d5`](https://github.com/AI-Ascension/sts2-harness/commit/780f2d521508a2aadc76c4d779544d967955f102);
PR checks `34499698232` and `34499698312`, followed by main checks `34499708670` and
`34499708793`, passed. PR #51 adds bounded context-capture source/component wiring through
`ExoSession::decide`, the generic `ProviderPort` route, Astra's final CLI handoff, and Ollama's
final serialized HTTP write, with lifecycle, identity, manifest, queue, vault, and
failure-fidelity tests. These are source/component and synthetic differential records: no real
provider, game, or external service was called, so they do not establish a provider receipt,
game action, browser run, native platform behavior, integrated producer/store demonstration,
or gameplay settlement. Native preflight reached root → lead only; coordinator/specialist
ancestry remains unverified. The exact nine-head table and blockers remain in
[`evidence.html#current`](evidence.html#current) and the linked status supplement. At capture,
site `main` was `457f002`, with validation `34499991425` and Pages deployment `34499991509`
successful; this confirms static publication only. The current blockers remain no
model-controlled Victory or replay, no native two-peer settlement or disconnect/rejoin recovery,
no restart-persistent two-backend telemetry acceptance, zero tags and releases, and no verified
Workshop upload or lifecycle acceptance.

An earlier `confirmed` successor refresh, captured at 16:25 UTC, follows gateway PR [#37](https://github.com/AI-Ascension/sts2-gateway/pull/37)
merging at `2026-09-10T16:20:43Z` and harness PR [#59](https://github.com/AI-Ascension/sts2-harness/pull/59)
merging at `2026-09-10T16:21:05Z`. Gateway `main` is
[`5f3eadab`](https://github.com/AI-Ascension/sts2-gateway/commit/5f3eadabede9954bc834a62e3c4c1003444826ca),
with CI `34501500166` and policy `34501500201` passed. Harness `main` is
[`5cc486a6`](https://github.com/AI-Ascension/sts2-harness/commit/5cc486a66b6f11930675af06f7426cd91c609983),
with CI `34501538192` and policy `34501538262` passed. Gateway PR #37 is a test-only malformed
settled-receipt regression; harness PR #59 rejects conflicting provider completion retries.
These are reliability source/component records and do not establish live host, provider, or game
execution.

Game-mod now has one published, non-draft source-only prerelease,
[`sts2-game-mod-v0.4.0`](https://github.com/AI-Ascension/sts2-game-mod/releases/tag/sts2-game-mod-v0.4.0),
targeting [`a70a5e5`](https://github.com/AI-Ascension/sts2-game-mod/commit/a70a5e5bb2fa89fade7e16dbb4a58ed80e31355b);
source-release workflow `34501301708` passed. Its bundles contain no compiled mod, runtime payload,
proprietary game files, Workshop package, installer operation, or game launch. Host compatibility,
live gameplay, provider operation, Workshop publication, and platform support remain unverified;
the other eight repositories have zero tags and releases. See [`evidence.html#current`](evidence.html#current)
and the linked status supplement for the complete nine-head table, release details, and blockers.

## Latest acceptance successor — 2026-09-10, 19:15 UTC (post-19:05 native co-op consumer merges)

The current confirmed successor follows gateway PR #38 (https://github.com/AI-Ascension/sts2-gateway/pull/38),
MCP PR #39 (https://github.com/AI-Ascension/sts2-mcp-server/pull/39), harness PR
#61 (https://github.com/AI-Ascension/sts2-harness/pull/61), and protocol PR
#34 (https://github.com/AI-Ascension/sts2-protocol/pull/34) merging between 17:51 and
19:05 UTC. The complete exact commit/tree table is in
[evidence.html#current](evidence.html#current) and the
[status supplement](https://github.com/AI-Ascension/.github/blob/main/STATUS.md).

Current main heads are game-core f9db577 / tree 8cb53ed, game-mod a70a5e5 /
0b16693, gateway de1fe723 / cbf10caa, MCP 47d63f6 / a6eb009,
harness 0f71c186 / 6b8f26d5, protocol ed8626c / 3681cf21,
observability d7e79e1 / 179eab49, .github 9c795e6 / 8367f189, and
this site b0b04b8 / 45900bbb. Their latest completed CI and policy results are
linked in the dated evidence table. The four native co-op consumer PRs establish
serialized source/component conformance for coop-native-v1; live two-peer admission,
settled action/vote/effect/checksum outcomes, and disconnect/rejoin recovery remain
unverified.

The accepted component artifact records schema digest
2f3bc99e53080fa11b39592b64fb0ab964a16f568719a2622d0b2caf766ab629 and
source-to-consumer pass for producer snapshot sts2-game-mod@ab702db / tree
e3f0aa9d30fe25585fbb3c1fe8e3c1fcdfa43223, gateway de1fe723 / tree
cbf10caa6775ca06adf7fe1e9d6cc98be6453a66, MCP 47d63f6 / tree
a6eb009912a4f624c49398f6cfc25022da65b563, and harness H0 a2cb481 / tree
083e1dc3ca88c35eedc10a6187a63c91a9864c46. The producer snapshot and harness H0
are bounded artifact inputs and are distinct from the current game-mod release/main
and harness main.

Game-mod has exactly one published, non-draft source-only prerelease,
[sts2-game-mod-v0.4.0](https://github.com/AI-Ascension/sts2-game-mod/releases/tag/sts2-game-mod-v0.4.0),
targeting a70a5e5 / tree 0b16693; source-policy SHA-256 is
f8fea839e28902843d1ea02db2589337ff36ec8214765d548c42177514fe3ba8, included-content
digest is 54b56ad89e813b1d250bf8d3a318b377ccae26db7d7122f534b4adccfee2dbbe, and
Windows/Linux archive hashes are acdf792a359cdf4f7f078967371317a995aea7c8194415800a00efb40db10362
and 5670d7992d3e1276f4f8de1f3735f0d7e1595e7900990e7e9d7f1ef5ca5a77cf.
The other eight repositories have zero tags and releases. The source release contains
no compiled runtime or Workshop package and establishes no stable release or host
compatibility.

The runtime and acceptance blockers remain explicit: no model-controlled Victory or
replay is recorded; named Windows/Linux runs are bounded Defeat campaigns and forced
Victory fixtures bypass ordinary play; Runtime-v4 and native co-op records remain
source, fixture, or serialized component evidence; MLflow returned HTTP 200 for a
failed 124-span run without terminal outcome; Laminar health returned HTTP 200 while
its query returned HTTP 401 with zero rows/pages; and rootful Podman/host access plus a
valid Laminar credential/path are needed for restart-persistent terminal telemetry.
Workshop upload, Steam legal agreement, entitlement, item/content visibility,
subscription/discovery/loading, update, and rollback remain unverified.

Before this successor is deployed, site main is b0b04b8 / tree 45900bb, with
validation run 34502645662 and Pages deploy run 34502645601 passed. Cache-busted
requests to the deployed r11 pages returned HTTP 200 with hashes recorded in the status
supplement. This is static publication evidence only; the successor is not deployed
until its site PR merges.

## Latest publication successor — 2026-09-10, 19:26 UTC

The preceding 19:15 UTC successor is now published; its pre-merge publication wording is retained
as dated history. Site `main` is
[`64de240`](https://github.com/AI-Ascension/AI-Ascension.github.io/commit/64de240fe7f93e4660d6e3e53a0844257d6827f8)
with tree `530c3f7819b92699bb266add9ef703477fde73d5`. Site validation
[34520369933](https://github.com/AI-Ascension/AI-Ascension.github.io/actions/runs/34520369933)
and Pages deployment
[34520369905](https://github.com/AI-Ascension/AI-Ascension.github.io/actions/runs/34520369905)
passed, and deployment `6379445687` reached `success`.

Cache-busted HTTPS requests returned HTTP 200 and matched the merged tree exactly:
`README.md` `9c4a5589bc35e41b71bb1ef26154b1c35e67f57d1f36e5f0e7b399ac51150dc3`,
`evidence.html` `a2851de73896a6a2d19e91692043b9eaae028984baca273eeefc6b823e97fd8e`, and
`repositories.html` `46ac34bd073bc1db8294dee97a649685fa958c4ff027ce3054298af4776a4ecc`.
This is confirmed static publication evidence; it does not establish game runtime, provider
settlement, native two-peer gameplay, observability persistence, release compatibility, or
Workshop lifecycle acceptance.

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or Valve and grants no rights to game files, assets, or marks. No game files are stored or distributed.


## Latest observability successor — 2026-09-10, 20:44 UTC (post-PR #19 merge)

The current observability source is [`89539a6e`](https://github.com/AI-Ascension/ai-agent-observability/commit/89539a6e7754b389f8eac148ba8a49c3892cddd8), tree [`dd948bdb`](https://github.com/AI-Ascension/ai-agent-observability/tree/dd948bdb68844f83e79e36611faacb945030b618), after [PR #19](https://github.com/AI-Ascension/ai-agent-observability/pull/19) merged at `2026-09-10T20:42:45Z`. Its main CI run [34528007520](https://github.com/AI-Ascension/ai-agent-observability/actions/runs/34528007520) passed. The OTel bind/inode deployment repair remains source/component evidence; it does not establish live ingestion, query access, persistence across restart, or two-backend correlation. The other eight repository identities are unchanged from the linked nine-head table; this site is [`f8b1e8f`](https://github.com/AI-Ascension/AI-Ascension.github.io/commit/f8b1e8fedeb6d22e79cd19efb8bdd2e4360cf605) / tree [`1218f1e4`](https://api.github.com/repos/AI-Ascension/AI-Ascension.github.io/git/trees/1218f1e42f6eed422e1d2f1beb81ab46a5fc5720), with validation `34521517729` and Pages deployment `34521517811` passed.

The final r2 query remains `backend_unavailable`: MLflow has one exact identity/trace match with 124 allowlisted spans and no terminal outcome, while Laminar is credential-unavailable with no query rows or restart-persistence proof. Rootful Podman/image identity and the root-only Laminar query key remain unavailable. This is a dated observability boundary and does not change the named Defeat-only runtime evidence, native co-op live gate, source-only release, or Workshop blocker.


## Latest acceptance successor — 2026-09-10, 21:27 UTC (post-recovery-fence merges)

Gateway PR [#39](https://github.com/AI-Ascension/sts2-gateway/pull/39), harness PR
[#62](https://github.com/AI-Ascension/sts2-harness/pull/62), and MCP PR
[#40](https://github.com/AI-Ascension/sts2-mcp-server/pull/40) merged between 21:20 and
21:21 UTC. The current source heads are gateway
[`c8be3a7`](https://github.com/AI-Ascension/sts2-gateway/commit/c8be3a72ba9e304392575a1b2bdbc262e392be21) /
tree `69b9dc2`, MCP
[`037d10d`](https://github.com/AI-Ascension/sts2-mcp-server/commit/037d10def1cbcb1c807e136d31b294355a92c010) /
tree `53013a3`, and harness
[`682c2b5`](https://github.com/AI-Ascension/sts2-harness/commit/682c2b5ba38010e16d43b04c43d40184bda70106) /
tree `173be64`. Main CI and policy passed for all three.

Gateway rejects echoed recovery request responses and fences unknown receipt generations;
harness rejects recovery generation drift; MCP accepts the canonical pending-rejoin receipt
and rejects invalid post-generations on reconcile or unknown responses. These are
source/component checks. The accepted `coop-native-v1` artifact at protocol
[`ed8626c`](https://github.com/AI-Ascension/sts2-protocol/commit/ed8626c2cf30089b4bdf214a2fdcb09b3eca3d29)
still binds gateway `de1fe723`, MCP `47d63f6`, and harness H0 `a2cb481`, with producer
`ab702db`; the later fixes have not refreshed those artifact identities.

Native two-peer action, vote, effect, checksum, and disconnect/rejoin recovery remain
unverified. No model-controlled Victory or replay is recorded, and the named Windows/Linux
records remain bounded Defeat campaigns.

## Latest release successor — 2026-09-10, 21:32 UTC (v0.4.1 source-only prerelease)

The current [`sts2-game-mod-v0.4.1` tag/release](https://github.com/AI-Ascension/sts2-game-mod/releases/tag/sts2-game-mod-v0.4.1)
is published and non-draft at source commit
[`d23ca838`](https://github.com/AI-Ascension/sts2-game-mod/commit/d23ca838a7be875f32242123955b4a27782bac04)
and source tree [`23336ca`](https://github.com/AI-Ascension/sts2-game-mod/tree/23336ca834b5870d15ee6369c101d5c67ff34caf).
The source-release workflow [34532717805](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34532717805),
CI [34532510095](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34532510095), and
policy [34532510190](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34532510190)
passed at that commit.

The Windows x86-64 source archive SHA-256 is
`58fdaaf9a6fa243e8a18398bc0d2b90f78eddb228626fbff7b3b5255c3117050`; the Linux x86-64 source
archive SHA-256 is `174bb1551e26d7693c707f5f9f8989dc0f0d9b83ac34e7e6b9b337c2f03fa78b`.
This is a source-only prerelease with no compiled runtime or Workshop package, so host
compatibility and platform support remain unverified. The historical
[`sts2-game-mod-v0.4.0` release](https://github.com/AI-Ascension/sts2-game-mod/releases/tag/sts2-game-mod-v0.4.0)
remains published at `a70a5e5` / tree `0b16693`; its earlier hashes remain in the dated
16:25 UTC record above.

## Latest native artifact successor — 2026-09-10, 21:53 UTC (protocol PR #35)

Protocol PR [#35](https://github.com/AI-Ascension/sts2-protocol/pull/35) merged at
`2026-09-10T21:51:44Z`. The current protocol artifact is
[`d930110b`](https://github.com/AI-Ascension/sts2-protocol/commit/d930110b98f3eb10b6db0bccfb50e9daa775c939)
/ tree [`aef7ce55`](https://github.com/AI-Ascension/sts2-protocol/tree/aef7ce550f2561eae5bca9b666ce4cc60d155f0a), with
[CI 34534444584](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34534444584) and
[policy 34534444476](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34534444476)
passed. The fresh source-only capture
[`coop-native-source-only-20260910-r7`](https://github.com/AI-Ascension/sts2-protocol/blob/d930110b98f3eb10b6db0bccfb50e9daa775c939/artifacts/coop-native-v1/producer-capture.json)
contains 9 serialized wrapper captures with projection matches.

Its capture-bound component identities are producer `sts2-game-mod` `d23ca838` / tree `23336ca8`,
gateway `c8be3a72` / `69b9dc22`, MCP `037d10de` / `53013a3f`, and harness consumer snapshot
`682c2b5b` / `173be647`. The conformance record reports `component_serialized_conformance` and
`source_to_consumer: pass`; the schema digest is
`2f3bc99e53080fa11b39592b64fb0ab964a16f568719a2622d0b2caf766ab629`. Harness `main` later advanced
through dependency-only PR #44 to `d23b490` / tree `8dd448e2`, with main CI `34534240707` and policy
`34534240680` passed; the artifact remains explicitly bound to the `682c2b5b` / `173be647` snapshot
until refreshed.

The source-only capture uses a synthetic `CapturePort` and does not execute a native session.
Live two-peer action, vote, effect, checksum, and disconnect/rejoin recovery remain unverified;
the v0.4.1 release and current observability/runtime limits remain unchanged.

## Latest native artifact successor — 2026-09-10, 22:04 UTC (protocol PR #36)

Protocol PR [#36](https://github.com/AI-Ascension/sts2-protocol/pull/36) merged at
`2026-09-10T22:02:17Z`. The current protocol artifact is
[`b1d1a86a`](https://github.com/AI-Ascension/sts2-protocol/commit/b1d1a86a91af0fd14b7906d2d0d183a093a2e618)
/ tree [`57478028`](https://github.com/AI-Ascension/sts2-protocol/tree/574780284a1543b4dea76ceb9481c3ce4edabf51), with
[CI 34535371482](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34535371482) and
[policy 34535371517](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34535371517)
passed. This successor supersedes the 21:53 UTC artifact record.

The fresh source-only capture
[`coop-native-source-only-20260910-r7`](https://github.com/AI-Ascension/sts2-protocol/blob/b1d1a86a91af0fd14b7906d2d0d183a093a2e618/artifacts/coop-native-v1/producer-capture.json)
remains unchanged: it was captured at `2026-09-10T21:39:58Z`, contains 9 serialized wrapper captures
with projection matches, and retains schema digest
`2f3bc99e53080fa11b39592b64fb0ab964a16f568719a2622d0b2caf766ab629`. The refreshed conformance
record binds producer `sts2-game-mod` `d23ca838` / tree `23336ca8`, gateway `c8be3a72` / `69b9dc22`,
MCP `037d10de` / `53013a3f`, and current harness `d23b490` / `8dd448e2`, with
`component_serialized_conformance` and `source_to_consumer: pass`.

Protocol PR #36 pins current harness `main` at `d23b490` / `8dd448e2`; its dependency-only `sha2`
0.10.9 to 0.11.0 digest API migration leaves the `coop-native` wire and serialization semantics
unchanged, so no producer recapture was needed. The source-only capture uses a synthetic `CapturePort`
and does not execute a native session. Live two-peer action, vote, effect, checksum, and
disconnect/rejoin recovery remain unverified; the v0.4.1 release and current observability/runtime
limits remain unchanged.

## Latest native artifact successor — 2026-09-10, 22:27 UTC (protocol PR #38)

This `confirmed` source-only artifact refresh follows protocol PR [#38](https://github.com/AI-Ascension/sts2-protocol/pull/38),
which merged at `2026-09-10T22:24:58Z`. Protocol `main` is now
[`f22dd721`](https://github.com/AI-Ascension/sts2-protocol/commit/f22dd7216f65de91a0ffa27f50bc2036be6c8b24)
with tree [`0e053e68`](https://github.com/AI-Ascension/sts2-protocol/tree/0e053e68d7e2e7411bd77dfe696e0afa859341); its
[CI 34537328660](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34537328660) and
[policy 34537328616](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34537328616)
passed. This successor supersedes the 22:04 UTC artifact identity above while preserving the
live-runtime boundary.

The protocol artifact's conformance record binds producer capture input
[`d23ca838`](https://github.com/AI-Ascension/sts2-game-mod/commit/d23ca838a7be875f32242123955b4a27782bac04)
 / tree [`23336ca8`](https://github.com/AI-Ascension/sts2-game-mod/tree/23336ca834b5870d15ee6369c101d5c67ff34caf),
gateway [`c8be3a72`](https://github.com/AI-Ascension/sts2-gateway/commit/c8be3a72ba9e304392575a1b2bdbc262e392be21),
MCP [`037d10de`](https://github.com/AI-Ascension/sts2-mcp-server/commit/037d10def1cbcb1c807e136d31b294355a92c010),
and harness [`63dc5636`](https://github.com/AI-Ascension/sts2-harness/commit/63dc563690c93c575e75228f54672c1689d8a879)
 / tree [`575a84cc`](https://github.com/AI-Ascension/sts2-harness/tree/575a84ccc7c0cef7c73f34759c5cb6563b0d0433).
The current game-mod `main` is [`888b067`](https://github.com/AI-Ascension/sts2-game-mod/commit/888b06702021cd2bbd22773b0267733766c3b04)
 / tree [`1fec63ba`](https://github.com/AI-Ascension/sts2-game-mod/tree/1fec63bade6f1f4942fb682782ffe107e6230630);
PR [#65](https://github.com/AI-Ascension/sts2-game-mod/pull/65) updated `sha2` to 0.11.0 and its digest helpers,
with [CI 34535163545](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34535163545) and
[policy 34535163507](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34535163507) passed.
That current head is recorded separately from the capture input.

The fresh producer capture [`coop-native-source-only-20260910-r7`](https://github.com/AI-Ascension/sts2-protocol/blob/f22dd7216f65de91a0ffa27f50bc2036be6c8b24/artifacts/coop-native-v1/producer-capture.json)
remains unchanged: it was captured at `2026-09-10T21:39:58Z`, has `wrapper_count: 9` and
`projection_match: true`, and retains schema digest
`2f3bc99e53080fa11b39592b64fb0ab964a16f568719a2622d0b2caf766ab629`. The refreshed conformance
record reports `component_serialized_conformance` / `source_to_consumer: pass` for those exact identities.

Harness PR [#53](https://github.com/AI-Ascension/sts2-harness/pull/53) added runtime-v4 expert catalog/composition/transport
coverage and corrected runtime-v3 recovery fixtures; its [PR CI 34536315640](https://github.com/AI-Ascension/sts2-harness/actions/runs/34536315640)
and [PR policy 34536315601](https://github.com/AI-Ascension/sts2-harness/actions/runs/34536315601) passed,
as did merged main [CI 34536555216](https://github.com/AI-Ascension/sts2-harness/actions/runs/34536555216)
and [policy 34536555229](https://github.com/AI-Ascension/sts2-harness/actions/runs/34536555229).
The protocol refresh records that PR #53 changed no `coop-native` wire or serialization files, so no producer recapture was needed.

The capture uses a synthetic `CapturePort` and records `native_session_executed: false`.
Live two-peer action, vote, effect, checksum, and disconnect/rejoin recovery remain unverified;
the v0.4.1 release and current observability/runtime limits remain unchanged.


## Current source-head successor — 2026-09-10, 23:48 UTC

After the 22:27 UTC native artifact snapshot, two bounded source changes merged:

- **sts2-gateway**: [`8ba5521c`](https://github.com/AI-Ascension/sts2-gateway/commit/8ba5521c2ec8f158d437a7104567592703e53259) / tree [`afb63ec0`](https://github.com/AI-Ascension/sts2-gateway/tree/afb63ec02ffb6af335dd604e0d4ac82066253dd3), PR [#34](https://github.com/AI-Ascension/sts2-gateway/pull/34), CI [34543637424](https://github.com/AI-Ascension/sts2-gateway/actions/runs/34543637424) and policy [34543637382](https://github.com/AI-Ascension/sts2-gateway/actions/runs/34543637382) passed. It keeps persisted host-install rows historical until a fresh in-memory grant is acknowledged and adds restart coverage.
- **sts2-harness**: [`a0ace671`](https://github.com/AI-Ascension/sts2-harness/commit/a0ace6712686cb30d6f0b556cb6814ad4c0721d1) / tree [`ece08dbf`](https://github.com/AI-Ascension/sts2-harness/tree/ece08dbfdd989f8b22c4520fe64554b5a4026a9d), PR [#66](https://github.com/AI-Ascension/sts2-harness/pull/66), CI [34542788897](https://github.com/AI-Ascension/sts2-harness/actions/runs/34542788897) and policy [34542788865](https://github.com/AI-Ascension/sts2-harness/actions/runs/34542788865) passed. It adds an authenticated native worker endpoint and durable admission/recovery checks.

The accepted protocol artifact remains bound to gateway `c8be3a72` and harness `63dc5636`; these later source heads were not silently substituted into the captured conformance record. No live host install, two-peer native action, shared settlement, disconnect/rejoin recovery, or model-played victory is established by these checks.

## Current source-head successor — 2026-09-11, 02:02 UTC

A fresh read-only GitHub refresh at `2026-09-11T02:02:14Z` records the current default-branch
heads after the 23:48 UTC source snapshot. These are source/component and CI records; they do not
extend the accepted native artifact's conformance result to later heads.

- **sts2-protocol:** [`0bc689ea`](https://github.com/AI-Ascension/sts2-protocol/commit/0bc689eabc5542ede2b09b030d9ea32daa8a73e7) / tree [`6d91bcf4`](https://github.com/AI-Ascension/sts2-protocol/tree/6d91bcf46aadfcd611ae38c78885de0dadf5c074), after README-only [PR #20](https://github.com/AI-Ascension/sts2-protocol/pull/20) merged at `2026-09-11T00:36:59Z`. Current CI [34547243872](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34547243872) and policy [34547243877](https://github.com/AI-Ascension/sts2-protocol/actions/runs/34547243877) passed; the accepted artifact files and digest remain unchanged from `f22dd721`.
- **sts2-gateway:** [`f5582995`](https://github.com/AI-Ascension/sts2-gateway/commit/f5582995da2ac9b4ba7f66602062a62c48648537) / tree [`9f5f25f0`](https://github.com/AI-Ascension/sts2-gateway/tree/9f5f25f00309909581e239d4a3ee6c6ea0ab78ba), after README-only [PR #21](https://github.com/AI-Ascension/sts2-gateway/pull/21) merged at `2026-09-11T00:36:54Z`. Current CI [34547237851](https://github.com/AI-Ascension/sts2-gateway/actions/runs/34547237851) and policy [34547237849](https://github.com/AI-Ascension/sts2-gateway/actions/runs/34547237849) passed.
- **sts2-game-mod:** [`bd8e9054`](https://github.com/AI-Ascension/sts2-game-mod/commit/bd8e90542dfc89366f820150c5c755e32716b1b0) / tree [`54ffc38e`](https://github.com/AI-Ascension/sts2-game-mod/tree/54ffc38e7accded92b79cfd666dbb3133b3628a2), after README-only [PR #55](https://github.com/AI-Ascension/sts2-game-mod/pull/55) merged at `2026-09-11T00:40:52Z`. Current CI [34547520887](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34547520887), policy [34547520864](https://github.com/AI-Ascension/sts2-game-mod/actions/runs/34547520864), and the managed source-only boundary passed. This current head remains distinct from capture input `d23ca838`.
- **sts2-harness:** [`787c5dce`](https://github.com/AI-Ascension/sts2-harness/commit/787c5dcea7455f5abf2587935afb91ab8c66c10e) / tree [`2d0fd1f9`](https://github.com/AI-Ascension/sts2-harness/tree/2d0fd1f940bca40880cae76d785ce51fd6b0c319), after [PR #67](https://github.com/AI-Ascension/sts2-harness/pull/67) merged at `2026-09-11T01:57:44Z`. Current CI [34552750699](https://github.com/AI-Ascension/sts2-harness/actions/runs/34552750699) and policy [34552750723](https://github.com/AI-Ascension/sts2-harness/actions/runs/34552750723) passed. The intervening [PR #60](https://github.com/AI-Ascension/sts2-harness/pull/60), [PR #65](https://github.com/AI-Ascension/sts2-harness/pull/65), and #67 cover bounded context memory, user-selected Ollama models, and provisional `Unknown` recovery evidence.

The accepted native artifact remains protocol [`f22dd721`](https://github.com/AI-Ascension/sts2-protocol/commit/f22dd7216f65de91a0ffa27f50bc2036be6c8b24) / tree [`0e053e68`](https://github.com/AI-Ascension/sts2-protocol/tree/0e053e68d7e2e7411bd77dfe696e0afa859341), bound to producer capture input `d23ca838`, gateway `c8be3a72`, MCP `037d10de`, and harness `63dc5636`. The current heads above are source-only pointers and were not substituted into that `source_to_consumer: pass` record.

The capture [`coop-native-source-only-20260910-r7`](https://github.com/AI-Ascension/sts2-protocol/blob/f22dd7216f65de91a0ffa27f50bc2036be6c8b24/artifacts/coop-native-v1/producer-capture.json) remains unchanged: it was captured at `2026-09-10T21:39:58Z`, has 9 serialized wrapper captures with `projection_match: true`, and retains schema digest `2f3bc99e53080fa11b39592b64fb0ab964a16f568719a2622d0b2caf766ab629`. It uses a synthetic `CapturePort` with `native_session_executed: false`; live native co-op and model/provider settlement remain unverified.
