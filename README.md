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

The current snapshot is the dated 19:15 UTC successor below; earlier paragraphs preserve historical captures.

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

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or Valve and grants no rights to game files, assets, or marks. No game files are stored or distributed.
