# Contrast audit — Ascent Ledger tokens

Computed by `scratchpad/identity-tools/contrast.js` (WCAG 2.x relative luminance, sRGB). Ratios are floored to 2 decimals so a PASS never rounds across a threshold. Thresholds: AA normal text 4.5:1, AA large text (>= 24px, or >= 18.66px bold) and UI/graphic objects 3.0:1. Token values are not changed by this audit.

## light theme

| token | hex | vs ground #F4EEE2 | AA normal | AA large | vs ground-2 #EBE3D3 | AA normal | AA large |
|---|---|---:|---|---|---:|---|---|
| ink | #1A1712 | 15.46:1 | PASS | PASS | 14.00:1 | PASS | PASS |
| ink-dim | #5E564A | 6.25:1 | PASS | PASS | 5.66:1 | PASS | PASS |
| ember | #9C5B12 | 4.63:1 | PASS | PASS | 4.20:1 | FAIL | PASS |
| ember-hi | #C8782A | 2.94:1 | FAIL | FAIL | 2.66:1 | FAIL | FAIL |
| confirmed | #2F7F66 | 4.17:1 | FAIL | PASS | 3.78:1 | FAIL | PASS |
| source-derived | #4E6A8F | 4.80:1 | PASS | PASS | 4.35:1 | FAIL | PASS |
| proposed | #9A7B1C | 3.47:1 | FAIL | PASS | 3.15:1 | FAIL | PASS |
| inferred | #6F5A94 | 5.09:1 | PASS | PASS | 4.61:1 | PASS | PASS |
| unverified | #A8402F | 5.28:1 | PASS | PASS | 4.78:1 | PASS | PASS |

## dark theme

| token | hex | vs ground #0B0A08 | AA normal | AA large | vs ground-2 #15120E | AA normal | AA large |
|---|---|---:|---|---|---:|---|---|
| ink | #EDE4D3 | 15.68:1 | PASS | PASS | 14.79:1 | PASS | PASS |
| ink-dim | #A89F8C | 7.54:1 | PASS | PASS | 7.11:1 | PASS | PASS |
| ember | #E39B3A | 8.49:1 | PASS | PASS | 8.01:1 | PASS | PASS |
| ember-hi | #F2B75C | 11.02:1 | PASS | PASS | 10.40:1 | PASS | PASS |
| confirmed | #5FA88F | 7.05:1 | PASS | PASS | 6.65:1 | PASS | PASS |
| source-derived | #7F8FA6 | 6.01:1 | PASS | PASS | 5.67:1 | PASS | PASS |
| proposed | #D2B04C | 9.47:1 | PASS | PASS | 8.93:1 | PASS | PASS |
| inferred | #A08AB8 | 6.42:1 | PASS | PASS | 6.06:1 | PASS | PASS |
| unverified | #C25B4A | 4.60:1 | PASS | PASS | 4.34:1 | FAIL | PASS |

## Usage constraints (tokens failing AA normal text)

- **light / ember** (#9C5B12) fails AA normal text on ground-2 (4.20:1). Constraint: large text (>= 24px, or >= 18.66px bold), rules, stamps/icons and decorative use only; never body or caption text.
- **light / ember-hi** (#C8782A) fails AA normal text on ground and ground-2 (2.94:1, 2.66:1). Constraint: decorative only (rules, gradients, fills behind text); not text at any size.
- **light / confirmed** (#2F7F66) fails AA normal text on ground and ground-2 (4.17:1, 3.78:1). Constraint: large text (>= 24px, or >= 18.66px bold), rules, stamps/icons and decorative use only; never body or caption text.
- **light / source-derived** (#4E6A8F) fails AA normal text on ground-2 (4.35:1). Constraint: large text (>= 24px, or >= 18.66px bold), rules, stamps/icons and decorative use only; never body or caption text.
- **light / proposed** (#9A7B1C) fails AA normal text on ground and ground-2 (3.47:1, 3.15:1). Constraint: large text (>= 24px, or >= 18.66px bold), rules, stamps/icons and decorative use only; never body or caption text.
- **dark / unverified** (#C25B4A) fails AA normal text on ground-2 (4.34:1). Constraint: large text (>= 24px, or >= 18.66px bold), rules, stamps/icons and decorative use only; never body or caption text.

## Notes

- `rule` is not a text token; it is audited nowhere and reserved for 1px ledger rules and hairlines.
- Banner and avatar art use `ember`/`ember-hi` for the caret and spire (graphic objects, 3.0:1 applies).
- Stamp labels are ink-dim (lead decision 2026-09-02); only the 20px icon carries the evidence colour. Icons are non-text graphic objects, so the 3.0:1 threshold applies to the evidence colours: every evidence colour passes 3.0:1 on both grounds in both themes (light minimum: proposed 3.15:1 on ground-2).
- The stamp SVGs bake the light-theme colour for `<img>` use; inline them (they use `currentColor`) to get theme-correct colour.
- Banner status line (`banner-light.svg`): the outlined words "unverified"/"confirmed" at 14.5px are tinted with the evidence tokens; light `confirmed` (#2F7F66) is 4.17:1 on ground there. Kept by lead decision: it is a graphic object inside an image, and the same words appear in ink-dim prose beside it.
