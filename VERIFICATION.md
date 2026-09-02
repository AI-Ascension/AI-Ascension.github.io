# Verification record — 2026-09-02

Independent checks run against the published site and the public recipe. Each line names the tool,
the target commit, and the result. Nothing here is a claim about live game compatibility.

| Check | Target | Result |
| --- | --- | --- |
| W3C Nu HTML checker (`validator.w3.org/nu`, 26.8.31) | eight pages at commit `a7f4a46` | 0 errors, 0 warnings, 0 info on every page |
| Lighthouse 13.4.1, mobile | `index.html`, `proof.html`, `evidence.html` | performance 99 / 100 / 99; accessibility 100 ×3; best practices 100 ×3 |
| Horizontal overflow at 320 px (real 320 px viewport) | all eight pages, both themes | `scrollWidth == 320`; only the two wide tables scroll inside their own containers |
| Reduced motion | `index.html`, `proof.html` | final state shown immediately; 0 running animations; Run reveals all seven steps |
| Requests made by the pages | `index.html`, `proof.html`, all proof controls pressed | only `ai-ascension.github.io`; no cookies; no request on Run |
| Proof replay determinism | `proof.html?autorun=1&fast=1`, three fresh browser profiles | trace hash `80095d8c` in all three; a fourth real-speed run matched |
| Recipe determinism | `recipes/gateway-lease-fence`, `cargo run --locked --release` | six runs (three warm, three from a fresh cargo home with the crate fetched from GitHub): all `1115b6f6fab379ddf161614d783c65f92be11f2fbcfcc41d3b12fc648fa6695d`, equal to `fixture.json` (LF) and to the fixture embedded in `proof.html` |
| Source-test anchors | `proof.html` links to `control_plane.rs@e7bce21` `#L12 #L32 #L72 #L209` | each fragment lands on the signature line of the named test |
| Asset sizes | banners 1600×400, cards 1280×640 ×10, avatar 1024×1024, hero 1600×1000, stamps 20×20 | exact; SVGs contain no `<text>`; banners and cards render with fonts disabled |
| Contrast | body text both themes | 15.46:1 light, 15.68:1 dark; secondary text 6.25:1 / 7.54:1 |
| Links | 97 unique targets across site, profile README, and six README headers | 97/97 HTTP 200 (issue-form URLs 302 to login for anonymous requests; the form files exist) |
| Descriptions | org, eight repositories, six README headers, profile, site metadata, cards, drafts | byte-identical to the approved map |

Known limits: timings are from one Windows 11 machine; a Windows checkout with `core.autocrlf=true`
would have hashed `fixture.json` with CRLF before `.gitattributes` pinned it to LF; the browser
"real-speed" run was measured under Chrome virtual time. Evidence labels: everything above is
`confirmed` for the named commits; runtime, host, and game compatibility remain `unverified`.
