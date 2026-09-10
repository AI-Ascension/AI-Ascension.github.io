# AI-Ascension.github.io

Public site for AI-Ascension: what is tested today, what is only proposed, and a browser replay of one gateway contract test.

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
readiness, or general compatibility. The latest source review, captured at 08:09 UTC on 2026-09-10,
tracks nine default-main heads, including gateway [`6b6c7f2`](https://github.com/AI-Ascension/sts2-gateway/commit/6b6c7f2fac67de22fdf78c9fd818c6781f689ba0),
MCP [`73e777b`](https://github.com/AI-Ascension/sts2-mcp-server/commit/73e777b96700917cca5ff8f6ce0f5a72009384bc),
and harness [`33437dd`](https://github.com/AI-Ascension/sts2-harness/commit/33437ddb18f69f68d88521d947efa3568a32a3bf), where PR #50 is merged with durable recovery and raw action identity source. The same refresh recorded 27 open pull requests; these are not native or release evidence. See `evidence.html#current` for all nine heads and the current limits.

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or Valve and grants no rights to game files, assets, or marks. No game files are stored or distributed.
