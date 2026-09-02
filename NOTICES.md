# Third-party notices

## Fonts

Fraunces, Bricolage Grotesque, and JetBrains Mono are self-hosted under the SIL Open Font License 1.1. Package sources, versions, hashes, and the license texts are recorded in [`assets/fonts/NOTICES.md`](assets/fonts/NOTICES.md) and the `assets/fonts/LICENSE-*.txt` files.

## Art and identity assets

Every identity asset (wordmark, glyph, stamps, banners, avatar, hero art, social and proof cards) is owned by AI-Ascension. Provenance, generation metadata, sizes, and hashes are recorded in [`assets/identity/MANIFEST.md`](assets/identity/MANIFEST.md); the generation log lives in the planning repository's art log. Art is branding, never product evidence.

`assets/hero/*.webp` are size-only derivatives (640, 1024, and 1600 px wide, WebP) of `assets/identity/hero-art.png` and `hero-art-dark.png`, produced with `sharp` for responsive delivery on `index.html`; the identity PNGs remain the source of truth and the `<img>` fallback. No content was added or altered.

## Code

The site's HTML, CSS, and JavaScript are original and MIT licensed (see `LICENSE`). No other third-party code is included: no framework, no bundler, no CSS library, no analytics.

The recipe under `recipes/gateway-lease-fence/` depends on the `sts2-gateway` crate (MIT, AI-Ascension) at a pinned revision; see its `Cargo.toml`.
