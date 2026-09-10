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
The diagnostic's disconnect observation failed and produced no gameplay or recovery claim. These
records are scoped to their named fixtures and do not establish model-played Victory, native
multiplayer gameplay, release readiness, or general compatibility. The current source review tracks
the default-main gateway [`2b44bf3`](https://github.com/AI-Ascension/sts2-gateway/commit/2b44bf347f790509c9f13378c89719d09366d45b),
MCP [`b5a9262`](https://github.com/AI-Ascension/sts2-mcp-server/commit/b5a9262f1c76da76ea6f84fca0f1ee821ff67001),
and harness [`3926e5a`](https://github.com/AI-Ascension/sts2-harness/commit/3926e5a30ab569612e67d2dfdc6542f1391e95d7) heads for their source/component paths as refreshed at 02:36 UTC on 2026-09-10. The same refresh recorded 31 open pull requests; these are not native or release evidence. See `evidence.html#current` for all nine heads and the current limits.

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or Valve and grants no rights to game files, assets, or marks. No game files are stored or distributed.
