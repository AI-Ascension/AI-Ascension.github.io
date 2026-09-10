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

The deterministic recipe remains pinned to its historical gateway revision. Current repositories also
contain bounded, dated Windows/Linux campaign and replay records, Runtime-v4 source/component paths,
a read-only coordinator-synchronization check, and a two-process native co-op admission diagnostic.
The diagnostic's disconnect observation failed and produced no gameplay or recovery claim. A fresh
identity-bound cleanup removed the previously reviewed stale Windows candidate and hash-verified the
retained profile save and canonical source; this is storage evidence only. These records are scoped to
their named fixtures and do not establish model-played Victory, native multiplayer gameplay, release
readiness, or general compatibility. The latest `confirmed` source review, captured at 15:34–15:38 UTC on 2026-09-10, records all nine exact default-main heads and the site publication result in `evidence.html#current` and the linked status supplement. The records do not establish model-played Victory or its replay, native settlement or co-op recovery, live two-backend telemetry, a public release, or Workshop upload, legal agreement, entitlement, and lifecycle acceptance. Site `main` is `3935679`; validation run `34495457608` and Pages deployment `34495457785` succeeded, which confirms static publication only.

The latest `confirmed` successor refresh begins at 15:54 UTC on 2026-09-10 and records the current
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

The latest `confirmed` successor refresh, captured at 16:13 UTC, follows harness PR [#51](https://github.com/AI-Ascension/sts2-harness/pull/51)
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

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or Valve and grants no rights to game files, assets, or marks. No game files are stored or distributed.
