# Desktop / Tablet Button Text Overflow Audit

## Finding

The mobile layout hides many overflow problems because controls become full-width or have more available vertical wrapping behavior. Tablet and desktop expose fixed-height, fixed-padding controls with long labels, especially inside grid cards, navbar actions, tabs, and modal footers.

## High-risk surfaces

### P0 — must fix first

1. **Package card footer actions** — `src/components/TestCatalog.tsx`
   - `Overview` and `Book Package` share a narrow 2-column grid.
   - Long labels can exceed available width at tablet/card widths.
   - Fix: use `min-w-0`, `text-wrap: balance`, allow two-line labels, and make the action row responsive: two columns only when each column is ≥160px; otherwise stack.

2. **Individual test card footer actions** — `src/components/ui/TestCard.tsx`
   - `Details` and `Book Now` are compact fixed-height buttons.
   - Fix: stable icon + label layout, `min-h-11`, `whitespace-normal`, label `leading-tight`, and stack at narrow card widths.

3. **Catalog segmented tabs** — `src/components/TestCatalog.tsx`
   - `Health Packages (N)` and `Individual Tests (N+)` are long inside equal halves.
   - Fix: hide counts visually on constrained widths or move counts to badges; use `min-w-0` and two-line labels at tablet widths.

4. **Navbar actions** — `src/components/layout/Navbar.tsx`
   - `Patient Portal` and `Book Home Visit` compete with logo/nav at laptop widths.
   - Fix: reserve action width, use label priority rules, and collapse to icons/tooltips below a desktop threshold.

5. **Modal footers** — `TestDetailModal`, `PatientReportPortal`, `TestBookingModal`
   - Share/back/book/report actions can exceed the footer on tablet split widths.
   - Fix: footer uses `flex-wrap`, primary action gets `flex: 1 1 180px`, secondary actions remain `flex: 0 1 auto`, and at ≤560px becomes a vertical stack.

### P1 — likely overflow / readability issues

6. **Hero action buttons and search button**
   - Long labels such as `Explore Health Packages` and `Book Doorstep Sample` need flexible width and balanced wrapping.
   - Fix: keep primary CTA full-width on compact layouts; set `max-width` and two-line label behavior on tablet.

7. **Contact CTAs**
   - `Call Desk`, booking, and maps actions have mixed fixed heights and long labels.
   - Fix: use a shared action class with `min-width: 0`, `white-space: normal`, and `leading-tight`.

8. **Mobile menu / report portal / booking controls**
   - Mostly safe on mobile, but desktop/tablet dialog widths expose long action labels.
   - Fix: centralize button text wrapping rather than patching each component independently.

## Shared button contract

Add one reusable CSS contract for text-bearing controls:

```css
.action-button {
  min-width: 0;
  min-height: 44px;
  height: auto;
  white-space: normal;
  overflow-wrap: anywhere;
  text-wrap: balance;
  line-height: 1.15;
}
.action-button > span { min-width: 0; }
.action-button svg { flex: 0 0 auto; }
```

Do not use `overflow-hidden` or `truncate` to conceal important labels. Truncation is acceptable only for non-essential metadata, never for `Book`, `Overview`, `Details`, `Back`, `Patient Portal`, or payment/report actions.

## Breakpoint plan

- **≤639px:** full-width/stacked actions; labels may wrap to two lines.
- **640–767px:** two-column cards only when each action has ≥160px; otherwise stack.
- **768–1023px:** preserve two-column cards but allow two-line labels; navbar reduces secondary labels.
- **≥1024px:** single-line labels where space permits; grid/card minimum widths prevent compression.
- **Modal max width:** action footer switches to wrapped layout before text can overflow.

## Component implementation order

1. Add shared `.action-button` and `.action-label` token classes.
2. Fix package and test card action rows.
3. Fix catalog tabs/count badges.
4. Fix navbar action priority.
5. Fix modal footers.
6. Fix Hero/Contact actions.
7. Run desktop/tablet visual checks at 768, 834, 1024, 1280, 1440px.
8. Run keyboard/focus and 200% text-size checks.

## Acceptance checks

- No button text clips, overflows, or overlaps icons at target widths.
- No important label is silently truncated.
- Buttons remain at least 44px high.
- Primary action remains visually primary after wrapping.
- Focus rings remain visible on wrapped buttons.
- English labels survive 200% text zoom.
- Cards maintain equal visual rhythm when one label wraps.
- Modal footer never forces horizontal scrolling.

## Deliberate simplification

Do not introduce a new component library or responsive layout engine. Use existing Tailwind/CSS utilities and one shared button contract; the problem is inconsistent width/wrapping rules, not missing dependencies.
