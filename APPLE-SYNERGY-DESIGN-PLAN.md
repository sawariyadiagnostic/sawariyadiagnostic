# Sawariya Diagnostic — Apple-Synergy Design System Plan

## Status
Planning only. This document defines the next visual-system phase; it does not change application code.

## Intent
Bring the website closer to Apple-quality interaction and visual coherence without copying Apple branding. Preserve Sawariya identity:

- **SAWARIYA:** laboratory red
- **DIAGNOSTIC LAB:** diagnostic blue
- **Detect • Diagnose • Deliver:** warm brown
- **Peacock inspiration:** restrained iridescent depth, not rainbow decoration

## Design direction

**Clinical Peacock Editorial** — calm, precise, warm, locally trustworthy, and tactile.  
Apple influence is applied to hierarchy, materials, typography, feedback, adaptivity, and restraint—not to Apple logos, copy, or proprietary visual assets.

## Quality score

| Dimension | Score | Reason |
|---|---:|---|
| Aesthetic impact | 4/5 | Strong red/blue/brown identity with a restrained spectrum anchor |
| Context fit | 5/5 | Calm clinical hierarchy suits patients and caregivers |
| Implementation feasibility | 5/5 | Existing React/Tailwind/Framer Motion stack is enough |
| Performance safety | 4/5 | Use CSS/materials selectively; reduce broad blur and looping blobs |
| Consistency risk | 2/5 risk | Legacy teal/amber/purple classes must be migrated |

## Apple principles translated to this web product

### 1. Purpose
Every screen answers one primary question:

- Homepage: “How do I book or find a test?”
- Catalog: “Which test/package fits my need?”
- Booking: “What happens next, and is my request recorded?”
- Reports: “Can I securely access my report?”
- Staff controls: “What needs attention now?”

### 2. Agency
- Let patients choose home collection, lab visit, WhatsApp fallback, or phone.
- Preserve form data after validation errors.
- Allow edit/back before final confirmation.
- Never imply a booking/payment/report is complete without a confirmed backend/provider response.

### 3. Familiarity
- Use one consistent close affordance in dialogs.
- Use tabs only for peer content: packages vs individual tests.
- Use a bottom dock on compact screens for the three high-frequency actions: portal, book, call/WhatsApp.
- Use progressive disclosure for advanced metadata and staff tools.

### 4. Simplicity
- One dominant CTA per surface.
- Move technical schema/SEO/admin controls out of patient-facing UI.
- Reduce decorative badges that compete with the test name, price, preparation, and booking action.
- Keep “why this matters” copy short and plain.

### 5. Craft
- Tokenize all colors, surfaces, radius, shadows, spacing, type, motion, and focus styles.
- No component should invent a new red/blue/brown/teal hex value.
- Every interactive state must be designed: default, hover, focus, active, disabled, loading, success, error, empty.

### 6. Delight
- Use a single memorable “feather trace” gradient in the logo/hero mark.
- Use tactile press feedback and calm material transitions.
- Do not add confetti, loud pulses, or medical urgency theatrics.

# System architecture

## Layer 1 — brand tokens

Create one canonical token layer in `src/index.css` and reference the same semantic values from `src/config/site.ts`.

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

Future refinement may express the same values in OKLCH for perceptual lightness control, but do not mix RGB/HSL/OKLCH ad hoc. Pick one authoring format and generate semantic aliases.

## Layer 2 — semantic roles

| Semantic token | Meaning | Current brand mapping |
|---|---|---|
| `surface.page` | page canvas | cream |
| `surface.elevated` | card/dialog | white |
| `surface.inverse` | dark structural surface | navy |
| `content.primary` | main text | navy |
| `content.secondary` | supporting text | muted ink |
| `action.primary` | booking/submit | red |
| `action.secondary` | navigation/search | blue |
| `action.tertiary` | low-emphasis action | white + navy border |
| `identity.brand` | logo/brand | red + blue + brown |
| `status.success` | confirmed/verified | semantic green |
| `status.warning` | pending/needs confirmation | semantic amber/brown |
| `status.error` | failure/invalid | semantic error red, distinct from brand red |
| `status.info` | explanation | semantic blue |

## Layer 3 — materials

Use only three materials:

1. **Base:** opaque cream/white; default for readable content.
2. **Elevated:** white with subtle border/shadow; cards and forms.
3. **Floating:** translucent navy/white with blur; navbar, mobile dock, dialogs only.

Rules:

- Never stack translucent surfaces over translucent surfaces.
- Never place essential small text directly on a moving gradient.
- `prefers-reduced-transparency: reduce` switches floating materials to opaque surfaces.
- Use a thin highlight edge and one shadow rather than multiple borders.

## Layer 4 — geometry

- Base spacing unit: 4px; primary rhythm: 8px.
- Page horizontal padding: fluid, 16px mobile → 48px desktop.
- Readable content measure: 60–75 characters per line.
- Card radius: 16px standard; 24px hero/dialog; avoid random radii.
- Touch targets: minimum 44px, preferably 48px for primary actions.
- Safe-area padding remains on mobile dock and full-screen sheets.

## Layer 5 — typography

- Display: Outfit, tight tracking, `text-wrap: balance`.
- Body: DM Sans, 16px mobile input minimum, 1.5–1.6 line-height.
- Small labels: 12–13px, medium weight, positive tracking only when uppercase.
- Prices/status counts: `font-variant-numeric: tabular-nums`.
- Body and form text never use ultra-light weights.
- Use `text-wrap: pretty` for descriptions and error messages.

# Surface-by-surface placement plan

## Homepage / Hero — Persuade mode

### Visual hierarchy
1. Logo/brand promise.
2. One headline: precision + comfort, not unsupported clinical guarantees.
3. Search tests.
4. Primary red “Book Home Sample”.
5. Secondary blue “Explore Tests”.
6. Three evidence tiles with restrained icons.
7. Peacock feather trace as the only decorative signature.

### Material plan
- Cream page canvas.
- Opaque white hero card, not a full-screen blur field.
- Navy/blue specimen preview card.
- Red only for action and SAWARIYA identity.
- Brown only for promise line and warm editorial labels.

### Motion plan
- Hero content enters once: opacity + 12px lift, 400ms.
- Search focus responds immediately.
- CTA press scales to 0.98 on pointer-down.
- Disable ambient loops under reduced motion.

## Catalog — Operate mode

### Information architecture
- Segmented control: `Health Packages` / `Individual Tests`.
- Search field first.
- Filters second.
- Results third.
- Detail modal/page fourth.

### Card anatomy
1. Test/package name.
2. One-line purpose.
3. Price and validity.
4. Preparation/specimen/TAT row.
5. Home collection availability.
6. One red booking action.
7. Secondary “View details” action.

Do not use a color badge for every property. Use text, icon, and spacing before color.

## Booking — Form mode

### Flow
1. Select test/package.
2. Patient name and phone.
3. Home/lab segmented control.
4. Address and slot only when relevant.
5. Review and consent.
6. Confirmed request or explicit WhatsApp fallback.

### Apple-style control rules
- Segmented control for Home / Lab because options are mutually exclusive and few.
- Native `<select>` for slot lists.
- Input labels remain visible; placeholders are examples, not labels.
- Inline validation on blur and submit.
- Loading state uses a label change plus spinner; never a silent disabled button.
- Error state explains recovery immediately.

## Report portal — Protect mode

- Separate patient task from marketing.
- No schema/debug preview.
- No seeded demo records unless `VITE_DEMO_MODE=true`.
- Clear states: enter reference, checking, no record, report processing, report ready, report recalled, support.
- Use navy inverse header and cream/white body for focus.
- Report download must be a real LIS/provider response, never a generated fake file.

## Navigation

### Compact width
- Bottom dock: Portal, Book, Call, WhatsApp.
- Drawer contains secondary navigation.
- Preserve safe-area insets.

### Regular width
- Top navigation with five destinations maximum.
- Keep portal and booking as persistent actions.
- Do not expose staff/CMS controls in public navigation.

### Future staff console
- Desktop: sidebar + queue + detail panel.
- Mobile: single queue with filter sheet and detail push view.
- Use red only for exceptions; use semantic status colors for lifecycle state.

# Motion system

## Motion tokens

| Token | Use | Behavior |
|---|---|---|
| `motion.press` | button press | 100ms scale/color |
| `motion.fade` | content appearance | 200ms opacity |
| `motion.sheet` | dialog/drawer | spring-like 300–400ms |
| `motion.momentum` | flick/drag release | only when user supplies velocity |
| `motion.reduced` | reduced motion | opacity/color only |

Rules:

- Animate from current visual state.
- Never lock input during animation.
- Use springs only for sheets/dragged surfaces, not every fade.
- No bounce on ordinary page load.
- Add momentum only after a real drag/flick.

# Accessibility and platform synergy

- WCAG AA baseline; healthcare workflows should target AAA where practical for critical text.
- Focus ring: 3px, brand-blue/red contrast tested on every surface.
- Color never communicates status alone.
- Screen-reader labels for icon-only controls.
- `aria-live` for booking/report status.
- Keyboard escape closes dialogs; focus returns to trigger.
- 200% zoom must preserve task completion.
- Reduced motion and reduced transparency get real alternatives.
- Use semantic HTML before ARIA.
- Keep input font at 16px on mobile to avoid iOS Safari zoom.

# Implementation sequence

## P0 — foundation
- Add canonical semantic tokens.
- Replace hardcoded legacy palette with tokens.
- Add state palette and contrast assertions.
- Document `brand-guidelines.md`.

## P1 — identity surfaces
- Logo, navbar, hero, footer.
- Remove extra gradients/blur layers.
- Add one Peacock signature trace.
- Verify light/compact/large layouts.

## P2 — task surfaces
- Catalog cards and segmented tabs.
- Booking form and dialogs.
- Report portal states.
- Standardize control sizes, labels, focus, loading, error, success.

## P3 — motion/material
- Replace decorative loops with purposeful entrance/press/sheet motion.
- Add reduced motion/transparency branches.
- Verify no layout shifts or scroll traps.

## P4 — QA and governance
- Contrast scan across semantic pairs.
- Keyboard and screen-reader pass.
- Responsive screenshots at 360/390/768/1024/1440.
- Performance check for blur/animation and bundle size.
- Add a lightweight color-token review checklist to CI/documentation.

# Acceptance criteria

- One token change updates all major surfaces.
- No legacy teal/purple/amber brand colors remain outside semantic status states.
- SAWARIYA red, DIAGNOSTIC blue, and brown promise line remain recognizable everywhere.
- Homepage, catalog, booking, and reports each have a clear primary action.
- UI behaves predictably across compact and regular widths.
- Focus, reduced motion, reduced transparency, and 200% zoom remain usable.
- No patient-facing debug/schema preview.
- No unsupported medical/accreditation claims are introduced.
- Build, syntax, accessibility, and responsive checks are fresh before release.

# Deliberate non-goals

- Literal iOS cloning.
- SF Symbols or Apple branding on the web.
- Native mobile app implementation in this phase.
- More decorative color before token consolidation.
- Micro-interaction for every control.
