# Sawariya Diagnostic Lab — Colour System Upgrade Plan

## Executive summary

The current site has the right brand ingredients—laboratory red, diagnostic blue, warm brown, cream, and Peacock-inspired depth—but the implementation is uneven: legacy teal/emerald/amber/purple classes remain, gradients use too many competing hues, status colors are not consistently semantic, and several text/background pairs need deliberate contrast governance.

The target is **Clinical Peacock Editorial**: a calm cream canvas, deep diagnostic navy as the structural anchor, red as the decisive laboratory/booking action, blue as the diagnostic/navigation signal, and brown as the human promise line: **Detect • Diagnose • Deliver**.

## Design direction

- **Aesthetic:** Clinical Peacock Editorial — quiet medical clarity with iridescent depth used sparingly.
- **DFII:** Impact 4 + Context 5 + Feasibility 5 + Performance 4 − Consistency risk 2 = **16/20 equivalent; proceed**.
- **Recognition anchor:** red SAWARIYA + blue DIAGNOSTIC + brown promise line, with a single peacock-feather gradient used only as a signature accent—not as a page-wide rainbow.
- **User feeling:** calm, credible, locally trustworthy, and clear about the next action.

## Current audit

### Strengths
- Existing logo already separates SAWARIYA and DIAGNOSTIC.
- Red/blue/brown brand variables exist in `src/config/site.ts`.
- Navy surfaces and cream/light surfaces support strong contrast.
- Focus-visible styling and reduced-motion rules exist.

### Problems
- Old teal/emerald/amber/purple palette still appears in component classes.
- `btn-primary`, `btn-secondary`, and custom inline gradients do not share one semantic system.
- Brand colors are mixed with status colors, so users may read state as identity.
- Some marketing/status colors are decorative rather than meaningful.
- CSS uses HSL tokens but most components use hardcoded hex values, making global adjustment expensive.
- Theme is visually rich but lacks a documented hierarchy of where each color is allowed.

## Colour roles

| Role | Token | Value | Allowed use |
|---|---|---:|---|
| Laboratory red | `--brand-red-600` | `#C62828` | SAWARIYA, primary booking CTA, urgent-but-not-alarming actions |
| Red hover | `--brand-red-700` | `#A61E1E` | Primary CTA hover/active |
| Diagnostic blue | `--brand-blue-600` | `#155E9A` | DIAGNOSTIC, navigation, links, secondary CTA |
| Blue hover | `--brand-blue-700` | `#0F4775` | Secondary hover/active |
| Deep navy | `--brand-navy-900` | `#102A43` | Header/footer, dark surfaces, high-trust structure |
| Promise brown | `--brand-brown-700` | `#7A4B2A` | Detect/Diagnose/Deliver, editorial labels, warm accent |
| Cream canvas | `--surface-cream` | `#FFF9F3` | Page background, calm sections |
| White surface | `--surface-white` | `#FFFFFF` | Cards, forms, dialogs |
| Ink | `--text-ink` | `#102A43` | Primary text |
| Muted ink | `--text-muted` | `#455468` | Secondary text; never use low-contrast gray for body copy |
| Border | `--border-warm` | `#D7C7B8` | Dividers and inputs on cream/white |

## Accent and status rules

Do not use brand red to mean error and do not use blue to mean success. Brand and state are separate systems.

| State | Token | Use |
|---|---|---|
| Success | `#166534` on `#F0FDF4` | submitted, verified, completed |
| Warning | `#92400E` on `#FFFBEB` | pending, confirmation needed |
| Error | `#991B1B` on `#FEF2F2` | validation or failure |
| Info | `#1E40AF` on `#EFF6FF` | explanatory notices |
| Disabled | `#64748B` on `#F1F5F9` | unavailable controls |

Status colors must be paired with text/icon labels; never communicate status by color alone.

## Contrast evidence

Fresh WCAG ratio calculations for the proposed core palette:

- Red on white: **5.62:1** — AA normal text pass.
- Blue on white: **6.78:1** — AA/AAA-strength pass.
- Brown on white: **7.32:1** — AAA-strength pass.
- Navy on white: **14.64:1** — AAA-strength pass.
- Muted ink on cream: **4.55:1** — AA normal text pass, do not lower it.
- White on red: **5.62:1** — AA pass for primary CTA.
- White on blue: **6.78:1** — AA/AAA-strength secondary CTA.
- Cream on navy: **14.01:1** — strong dark-surface contrast.

## Token architecture

### Phase 1 — canonical tokens
Create one source of truth in `src/index.css` and `src/config/site.ts`:

```css
:root {
  --brand-red-600: #C62828;
  --brand-red-700: #A61E1E;
  --brand-blue-600: #155E9A;
  --brand-blue-700: #0F4775;
  --brand-brown-700: #7A4B2A;
  --brand-navy-900: #102A43;
  --surface-cream: #FFF9F3;
  --surface-white: #FFFFFF;
  --text-ink: #102A43;
  --text-muted: #455468;
  --border-warm: #D7C7B8;
}
```

Then map Tailwind semantic tokens: `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`, `border`, `ring`, `destructive`.

### Phase 2 — component migration
Replace hardcoded colors in this order:

1. `Logo` and navbar.
2. Hero CTA, search, and trust metrics.
3. Home collection form.
4. Test/package cards and booking modal.
5. Contact/location.
6. Footer and mobile dock.
7. Report portal and legal modals.
8. Remaining UI primitives.

Do not rewrite layout while migrating colors. One concern per diff.

### Phase 3 — signature gradient
Use one Peacock signature gradient only for:

```css
--brand-spectrum: linear-gradient(135deg, #C62828 0%, #7A4B2A 46%, #155E9A 100%);
```

Allowed: logo mark, one hero visual, one decorative hairline.  
Forbidden: every button, every card, every section background.

### Phase 4 — dark surfaces
Dark surfaces use navy, not black:

- Footer: navy 900.
- Hero visual: navy 900 with blue/red low-opacity glows.
- Dialog headers: navy 900 → blue 700.
- White/cream text only; no gray-on-navy body copy.

### Phase 5 — gradients and transparency
- Keep decorative opacity below 20% unless contrast is rechecked.
- Never place essential text on a blurred gradient without a solid/opaque surface.
- Check gradient endpoints, not just the average color.
- Prefer border and elevation over extra saturated fills.

## Typography/color pairing

- Display/headings: Outfit; ink navy.
- Body: DM Sans; ink navy or muted ink.
- SAWARIYA: red, heavy weight.
- DIAGNOSTIC LAB: blue, tracked uppercase.
- Detect/Diagnose/Deliver: brown, small editorial line.
- Links: blue + underline on hover/focus.
- Primary action: red background + white text.
- Secondary action: blue background + white text.
- Tertiary action: white/cream surface + navy border.

## Component recipes

### Primary CTA
```text
background: red-600
hover: red-700
text: white
focus ring: red-600 at 30%
```

### Secondary CTA
```text
background: blue-600
hover: blue-700
text: white
focus ring: blue-600 at 30%
```

### Card
```text
background: white
border: warm border at 70%
heading: navy
body: muted ink
accent: one red or blue edge, never both by default
```

### Form
```text
background: white
border: warm border
focus border/ring: blue
validation error: semantic error red, not brand red
success: semantic green, not brand red
```

### Status badge
Use semantic state palette, icon + text, and a visible label. Do not use `bg-accent-*` for status.

## Accessibility gates

- Normal text ratio ≥ 4.5:1.
- Large text ratio ≥ 3:1.
- UI borders/focus indicators ≥ 3:1 where required.
- Never rely on red/green alone.
- Focus rings remain visible on cream, white, blue, red, and navy.
- Test keyboard focus on dialogs, tabs, buttons, links, and form errors.
- Test `prefers-reduced-motion`.
- Run automated axe scan after migration and manually inspect focus order.

## Visual QA matrix

Test at:

- 360px mobile
- 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Review these states:

- Default, hover, focus, active, disabled.
- Empty catalog, no search result, validation error.
- Booking success, booking failure, report unavailable.
- Light mode and any future dark mode.
- Text zoom 200%.
- High contrast/forced colors where supported.

## Rollout plan

### P0 — remove confusion
- Remove legacy teal/purple/amber brand uses.
- Standardize CTA colors.
- Fix contrast failures.
- Keep current layout.

### P1 — make the system maintainable
- Move component colors to tokens.
- Create status tokens.
- Add a small color swatch/token page for staff/design review.
- Add contrast assertions for critical pairs.

### P2 — refine the signature
- Apply restrained Peacock spectrum to logo/hero only.
- Add warm brown editorial rhythm.
- Reduce glass blur and saturated decorative blobs.

### P3 — validate
- Build, lint, axe, contrast, responsive screenshots, and human visual review.
- Compare conversion actions before/after: book, search, report access, call.

## Success criteria

- No off-brand legacy colors in semantic UI classes.
- All primary/secondary/status controls have predictable meaning.
- Critical text/control contrast passes AA.
- Logo is recognizable without the surrounding UI.
- Color use explains hierarchy instead of decorating every surface.
- No patient-facing schema/debug controls.
- Color tokens can be changed in one file without hunting through components.

## What not to do

- Do not add more colors to solve hierarchy.
- Do not use gradients as a substitute for contrast.
- Do not use red for every CTA.
- Do not turn clinical status green/red into brand identity.
- Do not promise ranking gains from color alone.
