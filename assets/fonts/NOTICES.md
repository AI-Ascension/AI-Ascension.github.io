# Font notices

All fonts in this directory are self-hosted subsets under the SIL Open Font License 1.1. No runtime font service is used. Files were copied unmodified from the fontsource npm packages listed below (version 5.3.0, latin subset, `wght` variable axis). Full license text sits beside each family as `LICENSE-<Family>.txt`.

| Family | Upstream project | fontsource package | Package version | Upstream font version | License | Subset / axis | File | SHA-256 |
|---|---|---|---|---|---|---|---|---|
| Fraunces | Copyright 2020 The Fraunces Project Authors — https://github.com/undercasetype/Fraunces | `@fontsource-variable/fraunces` (source: https://github.com/google/fonts) | 5.3.0 | v38 (2025-09-10) | OFL-1.1 | latin, wght 100–900, normal | `fraunces-latin-wght-normal.woff2` (36,620 B) | `7f9d191d999336d3b9790afa72e1358e50a13b06d4f289341e92a311967a80f9` |
| Fraunces (italic) | as above | as above | 5.3.0 | v38 | OFL-1.1 | latin, wght 100–900, italic | `fraunces-latin-wght-italic.woff2` (45,656 B) | `bceec2ef4d549efbc8df0194a8d5280b6a64c3e399244dffccd9ea1bd9ad6db7` |
| Bricolage Grotesque | Copyright 2022 The Bricolage Grotesque Project Authors — https://github.com/ateliertriay/bricolage | `@fontsource-variable/bricolage-grotesque` (source: https://github.com/google/fonts) | 5.3.0 | v9 (2025-09-11) | OFL-1.1 | latin, wght 200–800, normal | `bricolage-grotesque-latin-wght-normal.woff2` (41,344 B) | `a97804dc9fbe5fc972a08018c5eda4dab7ef2346f64c57e61419d05e6de4ea1c` |
| JetBrains Mono | Copyright 2020 The JetBrains Mono Project Authors — https://github.com/JetBrains/JetBrainsMono | `@fontsource-variable/jetbrains-mono` (source: https://github.com/google/fonts) | 5.3.0 | v24 (2025-09-11) | OFL-1.1 | latin, wght 100–800, normal | `jetbrains-mono-latin-wght-normal.woff2` (40,404 B) | `18be452724bfdc236c074ca94a249a7f41a86752c7d04ab258ce9ed5651f6a7e` |

License files: `LICENSE-Fraunces.txt`, `LICENSE-BricolageGrotesque.txt`, `LICENSE-JetBrainsMono.txt` (verbatim `LICENSE` from each package).

Notes

- The `wght` subset files pin the other axes at their defaults (Fraunces `opsz` 14, `SOFT` 0, `WONK` 0; Bricolage Grotesque `opsz` 14, `wdth` 100). Display-size optical sizing of Fraunces is therefore not available at runtime; the outlined identity assets (`../identity/wordmark*.svg`, banners) were produced from the full variable TTFs at `opsz` 144 and carry no font dependency.
- OFL 1.1 Reserved Font Name clauses: the fonts are served under their original names and are not modified; the subsetting was done upstream by fontsource.
- Per OFL, the fonts may be bundled with, embedded in, and redistributed with this site, but may not be sold by themselves.
