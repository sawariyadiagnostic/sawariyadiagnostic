# Color Synergy Refinement Plan

## Locked visual anchors

These headline treatments stay unchanged:

- `Comfortable Diagnostics.`
- `Directly At Your Home.`
- `Precision Pathology.`
- `Peace of Mind at Home.`

They are already the strongest visual anchors and should not be recolored during this pass.

## Direction

**Clinical Graphite / Steel / Warm Paper** — Apple-like restraint, material clarity, and one purposeful diagnostic accent.

The site should feel calm, premium, and medically credible—not colorful for its own sake. Purple, cyan, emerald, and bright yellow are removed from decorative UI because they compete with the brand and create unrelated emotional signals.

## Palette roles

| Role | Token | Value | Where it goes |
|---|---|---:|---|
| Sawariya mark | `--brand-red-deep` | `#A61E1E` | SAWARIYA wordmark, primary action |
| Sawariya hover | `--brand-red-dark` | `#7F1717` | primary hover/pressed |
| Diagnostic steel | `--brand-blue` | `#155E9A` | DIAGNOSTIC, links, search focus, secondary action |
| Diagnostic deep | `--brand-blue-deep` | `#0F4775` | blue hover/active and high-contrast text |
| Promise brown | `--brand-brown` | `#7A4B2A` | Detect • Diagnose • Deliver only, warm editorial accents |
| Graphite | `--brand-graphite` | `#1D1D1F` | headings, primary dark text |
| Apple-like dark off-white | `--brand-off-white` | `#F5F5F7` | inverted logo text, dark hero/footer text, never pure white by default |
| Navy structure | `--brand-navy` | `#102A43` | footer, dark panels, modal headers |
| Warm paper | `--surface-paper` | `#FFF9F3` | page canvas |
| Elevated white | `--surface-elevated` | `#FFFFFF` | cards, forms, dialogs |
| Quiet steel | `--text-secondary` | `#455468` | secondary copy |
| Warm border | `--border-warm` | `#D7C7B8` | borders and dividers |

## Forbidden decorative colors

Remove from decorative/UI-category styling:

- Purple and violet
- Bright cyan
- Emerald/teal gradients
- Yellow as a decorative highlight
- Orange/gold gradients

Semantic success/warning/error colors may remain only where they communicate actual state and have text/icon labels.

## Logo treatment

### Light surfaces
- `SAWARIYA`: `#A61E1E`, not bright red.
- `DIAGNOSTIC LAB`: `#155E9A`.
- Promise line: `#7A4B2A`.

### Dark surfaces/footer
- `SAWARIYA`: `#E54848` or a light red tint, never pure white.
- `DIAGNOSTIC LAB`: `#B9D9FF`.
- Promise line: `#E8C8AE`.
- All general inverted copy: `#F5F5F7`, Apple-like off-white instead of `#FFFFFF`.

## Component rules

- Primary button: deep red + off-white text.
- Secondary button: deep diagnostic blue + off-white text.
- Tertiary button: elevated white + graphite text + warm border.
- Search focus: diagnostic blue ring.
- Card accent: one blue or red edge, never a rainbow.
- Status: semantic state palette only.
- Hero specimen visualization: graphite/navy base with blue/red signal lines; no purple TSH bar.
- Decorative gradients: red→brown→blue only for logo/one signature hero trace; never for routine controls.
- Shadows: graphite/navy alpha, not colored teal/purple shadows.

## Typography synergy

- Headings use graphite and existing locked headline treatments.
- SAWARIYA gets slightly tighter tracking and heavier weight.
- Inverted copy uses `#F5F5F7` for softer Apple-like contrast.
- Labels use steel/graphite; avoid colored labels unless they communicate state.

## Implementation sequence

1. Add canonical graphite/off-white/deep-red tokens.
2. Update Logo light/inverted variants.
3. Preserve locked headline classes.
4. Replace purple/cyan/teal/emerald decorative utilities in Hero and section accents.
5. Normalize cards, badges, nav, footer, forms, and modal headers.
6. Validate contrast and responsive layouts.
7. Build and inspect generated CSS/bundle.

## Acceptance criteria

- Locked headlines remain visually unchanged.
- SAWARIYA is darker and more premium on light surfaces.
- Inverted logo uses `#F5F5F7`, not pure white.
- No purple decorative TSH line remains.
- No random rainbow/teal/purple decorative surfaces remain.
- Red, blue, and brown roles are predictable.
- Status colors remain meaningful and labeled.
- WCAG AA contrast remains intact.


## Verification note

The post-refinement native esbuild JS/CSS bundle checks pass. Vite/Rollup is currently hanging before emitting transform output in the Windows runtime even after orphan Node processes and the analyzer plugin were removed. This is an environment/tool-process blocker; do not claim the Vite production build passes until it completes in CI or a clean machine.
