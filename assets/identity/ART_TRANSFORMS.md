# Art transforms — Direction A "Ledger Spire"

Source: `identity/art/ledger-spire-source.png` (1536×1024, sha256 `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461`), selected by the lead 2026-09-02. Generated upstream with Codex `image_gen.imagegen`; exact model revision unverified. Art is branding, not product evidence. Every derived asset below is a deterministic sharp transform of that file plus outlined-text SVG overlays (fontkit; no `<text>` elements; fonts: Fraunces / Bricolage Grotesque / JetBrains Mono variable TTFs from google/fonts, OFL). No new images were generated. Script: `scratchpad/identity-tools/build-art.js`.

Measured spire column in the source: x=402 (26.20% of width) — the vector spire overlays are placed at that fraction.

## Recompositions

| output | source sha256 | sharp operations | overlay SVG | output sha256 | timestamp (UTC) |
|---|---|---|---|---|---|
| `identity/hero-art.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1600,1000,{fit:"cover",position:"centre",kernel:"lanczos3"}) [= scale ×1.04167 to 1600×1067, crop rows 33..1033] | (none) | `798d4dadfa2b4391635e9a6601095f72fd76367d35f3b9d8ebe1bbb8a55dffb4` | 2026-09-02T07:20:36.752Z |
| `identity/hero-art-dark.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1600,1000,{fit:"cover",position:"centre",kernel:"lanczos3"}) [= scale ×1.04167 to 1600×1067, crop rows 33..1033] → linear(a=[0.105,0.1,0.088], b=[2,1,0]) per channel (paper ≈ #191510, ink-wash ≈ #0A0805) → png buffer → composite(overlays/hero-art-dark.spire.svg, blend "over") [second sharp pass; sharp orders linear after composite otherwise] [2px vector spire at x=419.3 restoring the ember line] | `identity/overlays/hero-art-dark.spire.svg` | `602f8947aa80c03c7b9402862349387d48d35df874178fa62c8a6b4ae165a685` | 2026-09-02T07:20:36.752Z |
| `identity/proof-card.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/proof-card.svg, blend "over") | `identity/overlays/proof-card.svg` | `3879141625d13cfecf1e542053a09577ef2e50d673ca7af487d90870d4bd5815` | 2026-09-02T07:20:36.752Z |
| `identity/social/org.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/org.svg, blend "over") | `identity/overlays/org.svg` | `466676fa8344b945d26314d0e50a320d2bdfb464aed1b98dc1ba10b269a2e084` | 2026-09-02T07:20:36.752Z |
| `identity/social/dot-github.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/dot-github.svg, blend "over") | `identity/overlays/dot-github.svg` | `74e97f708f36019462cafc607d29ac898be4999a7ebd777e8e94f4d84205805a` | 2026-09-02T07:20:36.752Z |
| `identity/social/ai-ascension.github.io.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/ai-ascension.github.io.svg, blend "over") | `identity/overlays/ai-ascension.github.io.svg` | `17247a396f85cd2f229ce5fc2d24441e72248cf09f30e664eaae71d273d62966` | 2026-09-02T07:20:36.752Z |
| `identity/social/sts2-game-core.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/sts2-game-core.svg, blend "over") | `identity/overlays/sts2-game-core.svg` | `021618b21e109bdcbdc7b014d1f705807e5a91ce81d2077c0c1734045956f20e` | 2026-09-02T07:20:36.752Z |
| `identity/social/sts2-game-mod.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/sts2-game-mod.svg, blend "over") | `identity/overlays/sts2-game-mod.svg` | `7f914575c9ec2d19203e4cd53cdfbc537457a6daab77eb42caa55ca32592db40` | 2026-09-02T07:20:36.752Z |
| `identity/social/sts2-gateway.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/sts2-gateway.svg, blend "over") | `identity/overlays/sts2-gateway.svg` | `a9206abe494f3392dbe3e58c9b4391a165f5dde8e29e9b216a45183ebac788a5` | 2026-09-02T07:20:36.752Z |
| `identity/social/sts2-mcp-server.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/sts2-mcp-server.svg, blend "over") | `identity/overlays/sts2-mcp-server.svg` | `674f7949a0eaed22068b06f4366b6babba0653111962289d0b45c54d05bd75d6` | 2026-09-02T07:20:36.752Z |
| `identity/social/sts2-harness.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/sts2-harness.svg, blend "over") | `identity/overlays/sts2-harness.svg` | `a5b08e7dd052682ea62daa703dac3a45828cf5f827d730d0a104e7e408f8db4d` | 2026-09-02T07:20:36.752Z |
| `identity/social/sts2-protocol.png` | `c77235b84035037f30b6a1be8e0791bf7dcd262b415a939ed9f798256abac461` | resize(1280,853,{kernel:"lanczos3"}) [scale ×0.8333] → extract({left:0,top:120,width:1280,height:640}) → linear(a=[0.235,0.215,0.185], b=[-4,-4,-3]) → png buffer → composite(overlays/card.spire.svg, blend "over") [second pass] [2px vector spire at x=335.4] → composite(overlays/sts2-protocol.svg, blend "over") | `identity/overlays/sts2-protocol.svg` | `58e4d752de25773286c063306297ae449401c1d2375ee0fa892cd3e6d4f0ceb3` | 2026-09-02T07:20:36.752Z |
| `identity/favicon.svg` | `19c0049d5cac86a4dd3d6f3ee963de2dae78281e5685b49d67ccc4b8409f7d9e (identity/glyph.svg)` | hand-composed: rounded square (rx 12) #0B0A08 + glyph.svg caret path in #F2B75C | (none) | `20fea5632997ea5640947cf5ab97e741a317ba7f08d7a769357f70d5270be925` | 2026-09-02T07:20:36.752Z |
| `identity/favicon-32.png` | `20fea5632997ea5640947cf5ab97e741a317ba7f08d7a769357f70d5270be925 (identity/favicon.svg)` | sharp(favicon.svg).resize(32,32).png() | (none) | `ef1e931627f5997cac31c06257412ef0b11527731e27509ef6ec880b9b0977e6` | 2026-09-02T07:20:36.752Z |
| `identity/apple-touch-icon.png` | `1ee7d71995fbc667f8da530e95f3cc44fe620b3bb92e21f493e346f27b8e6948 (identity/avatar.png)` | sharp(avatar.png).resize(180,180,{kernel:"lanczos3"}).png() | (none) | `99b6e29ab9ed121b7870e13fc76b1c82da1dbbb0ad9b1fddab90080deeed4901` | 2026-09-02T07:20:36.752Z |

## Text contrast (measured)

Method: for each text block, the background pixels under the block's bounding box are sampled from the composed card background (before the overlay); WCAG 2.x relative luminance is computed per pixel; the ratio is reported against the mean luminance and against the 95th-percentile (brightest 5%) luminance, so a PASS holds even on the lightest paper grain under the text. Text colours are the dark-theme tokens. Threshold 4.5:1 (AA normal text).

- **proof-card** — worst p95 ratio 5.68:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - headline 1: #EDE4D3 mean 11.25:1 / p95 11.03:1
  - headline 2: #EDE4D3 mean 11.37:1 / p95 11.18:1
  - mono 1: #EDE4D3 mean 11.49:1 / p95 11.18:1
  - mono 2: #EDE4D3 mean 11.48:1 / p95 11.18:1
  - mono 3: #EDE4D3 mean 11.52:1 / p95 11.18:1
  - stamp unverified: #EDE4D3 mean 11.95:1 / p95 11.60:1
  - stamp confirmed: #EDE4D3 mean 11.57:1 / p95 11.34:1
  - url: #A89F8C mean 5.88:1 / p95 5.68:1
- **org** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.34:1 / p95 11.07:1
  - body 1: #EDE4D3 mean 11.44:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - body 3: #EDE4D3 mean 11.57:1 / p95 11.18:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **dot-github** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.38:1 / p95 11.18:1
  - body 1: #EDE4D3 mean 11.45:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **ai-ascension.github.io** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.30:1 / p95 11.04:1
  - body 1: #EDE4D3 mean 11.45:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.46:1 / p95 11.18:1
  - body 3: #EDE4D3 mean 11.75:1 / p95 11.34:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **sts2-game-core** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.33:1 / p95 11.07:1
  - body 1: #EDE4D3 mean 11.44:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.46:1 / p95 11.18:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **sts2-game-mod** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.33:1 / p95 11.07:1
  - body 1: #EDE4D3 mean 11.44:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - body 3: #EDE4D3 mean 11.93:1 / p95 11.44:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **sts2-gateway** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.34:1 / p95 11.07:1
  - body 1: #EDE4D3 mean 11.44:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - body 3: #EDE4D3 mean 11.78:1 / p95 11.34:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **sts2-mcp-server** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.32:1 / p95 11.07:1
  - body 1: #EDE4D3 mean 11.44:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **sts2-harness** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.34:1 / p95 11.08:1
  - body 1: #EDE4D3 mean 11.45:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - body 3: #EDE4D3 mean 11.73:1 / p95 11.33:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1
- **sts2-protocol** — worst p95 ratio 5.45:1 PASS
  - wordmark: #EDE4D3 mean 12.00:1 / p95 11.48:1
  - title: #EDE4D3 mean 11.34:1 / p95 11.07:1
  - body 1: #EDE4D3 mean 11.44:1 / p95 11.18:1
  - body 2: #EDE4D3 mean 11.47:1 / p95 11.18:1
  - body 3: #EDE4D3 mean 11.87:1 / p95 11.34:1
  - status "runtime:": #A89F8C mean 6.40:1 / p95 6.11:1
  - status "unverified · deterministic tests:": #A89F8C mean 5.75:1 / p95 5.50:1
  - status "confirmed": #A89F8C mean 5.62:1 / p95 5.45:1
  - url: #A89F8C mean 5.92:1 / p95 5.75:1

Card background luminance under the text column (x 380–1230, y 60–580): mean 0.0216, p95 0.0244, max 0.0284.

## Source provenance metadata (found, not asserted)

`strings` over `art/ledger-spire-source.png` shows an embedded C2PA manifest (OpenAI-issued, SSL.com C2PA certificate chain): `c2pa.created` 2026-09-02T00:00:00Z, `softwareAgent` name `gpt-image` version `2.0`, `digitalSourceType` `trainedAlgorithmicMedia`. This is source-derived from the file itself; it names a model family and major version, not an exact revision, so the revision stays `unverified`. The `http://` strings the grep finds inside the PNG are certificate/OCSP URLs in that manifest, not resources the site requests. Derived PNGs written by sharp do not carry the manifest (0 `c2pa` strings in `hero-art.png`, `proof-card.png`).
