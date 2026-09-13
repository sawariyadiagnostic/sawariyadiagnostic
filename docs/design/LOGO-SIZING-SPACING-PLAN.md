# Sawariya Horizontal Logo — Sizing and Spacing Plan

## Current problems

1. DNA mark is taller than the complete text stack, so it dominates the lockup.
2. `SAWARIYA`, `DIAGNOSTIC LAB`, and the promise line all use nearly the same `mt-1` gap.
3. MobileMenu hides the promise line, creating an incomplete identity.
4. Navbar, Hero, and Footer use different size presets without a shared optical rule.

## Target lockup

```text
[DNA]  SAWARIYA
       DIAGNOSTIC LAB
       Detect | Diagnose | Deliver
```

## Optical rules

- Text stack is the primary reading unit.
- DNA mark height should be approximately 0.95–1.05× the three-line text stack height.
- `SAWARIYA` is the strongest line.
- `DIAGNOSTIC LAB` is 60–70% of the brand line's visual weight.
- Promise line is 50–60% of brand line size and never hidden in the compact identity.
- Gap between `SAWARIYA` and `DIAGNOSTIC LAB`: 2–3px optical spacing.
- Gap between `DIAGNOSTIC LAB` and promise: 4–6px optical spacing.
- DNA-to-wordmark gap: 8px desktop/tablet, 6px mobile.
- The mark and text stack align by center, not top, so the tall artwork does not look dropped.

## Recommended responsive sizes

| Context | DNA mark | SAWARIYA | DIAGNOSTIC LAB | Promise | DNA/text gap |
|---|---:|---:|---:|---:|---:|
| Mobile compact | 42px | 16px | 11px | 8px | 6px |
| Hero/card mobile | 48px | 17px | 12px | 8.5px | 7px |
| Navbar desktop | 54px | 20px | 13px | 9px | 8px |
| Footer/dark | 72px | 26px | 17px | 12px | 10px |

## Component implementation

Create a single `Logo` horizontal layout contract with CSS variables/classes. Use CSS media queries for responsive sizes instead of increasingly large Tailwind strings. Keep `Logo` as the only source of truth.

## Mobile behavior

- Never hide the promise line in `MobileMenu` or Hero.
- Allow the identity block to wrap vertically; do not force `flex-nowrap` on the entire logo row.
- The Verified pill belongs outside the logo row and moves below it below 640px.
- The wordmark remains readable if the DNA asset fails to load; text is the accessible identity fallback.

## Acceptance criteria

- Mark height and text-stack height are within ±5% in each context.
- SAWARIYA is visibly dominant.
- DIAGNOSTIC LAB sits directly underneath with a smaller controlled gap.
- Detect | Diagnose | Deliver sits below the diagnostic line with a visibly larger editorial gap.
- Promise line is visible in navbar, hero, mobile menu, and footer unless a deliberate space constraint exists.
- No Verified pill overlap at 320px, 375px, 390px, 768px, or 1440px widths.
- The original SVG remains unchanged and uses the base-aware asset path.
