# AI-Ascension.github.io

Public site for AI-Ascension: what is tested today, what is only proposed, and a browser replay of one gateway contract test.

Live at <https://ai-ascension.github.io>.

## Run locally

The runtime needs no bundler. Open `index.html` directly, or use the pinned development
tools (Node version in `.node-version`):

```
npm ci --ignore-scripts --no-audit --no-fund
npm run build:pages
node tests/serve.cjs .pages-dist
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

`npm run verify` checks scoped formatting, browser/Node JavaScript contexts,
fixture bytes, links, synthetic replay and real Chromium keyboard, error and
reduced-motion behavior. Install the pinned Playwright browser once with
`npx playwright install chromium`. Publication regressions reject symlinked or
missing inputs, omit synthetic reports and policy files, and compare repeated
build digests. These tests do not establish screen-reader or game-host behavior.
The read-only validation workflow also reproduces both historical Rust recipes.

`.github/workflows/pages.yml` publishes the explicit runtime inventory in
`.pages-dist` on pushes to `main` or manual dispatch, using pinned action commits.
The build preserves existing self-hosted font licenses and recipe JSON bytes;
Node packages, test traces, standards tooling and source reports are excluded.
`.nojekyll` disables Jekyll. No deployment is implied by local validation.

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
multiplayer gameplay, release readiness, or general compatibility. The current candidate review
also tracks the open draft gateway PR #22, MCP PR #27, and harness PR #36 for catalog recovery
with their source checks; these are not native or release evidence. See `evidence.html#current`.

AI-Ascension is an independent project. It is not affiliated with or endorsed by Mega Crit or Valve and grants no rights to game files, assets, or marks. No game files are stored or distributed.
