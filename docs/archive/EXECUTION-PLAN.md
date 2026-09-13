# Execution Plan

Every phase produces implementation, tests, operational notes, and fresh verification evidence.

## Phase 0 — Decisions/evidence
Confirm canonical business facts; obtain LIS API docs, sandbox, auth, sample report, webhook spec, limits, support contact; decide hosting, DB, private report storage, OTP, messaging, payments, retention, staff roles. **Exit:** signed decision record.

## Phase 1 — Runtime baseline
Pin Node LTS/package manager; repair lockfile; deterministic install/build/lint/typecheck; CI; setup docs. **Exit:** clean CI/local build.

## Phase 2 — Trust/config cleanup
Centralize business facts/claims/URLs; remove mock success; gate demo seed data to development; replace patient/report localStorage with API. **Exit:** production cannot fabricate outcomes.

## Phase 3 — API/persistence
PostgreSQL-compatible DB; migrations/constraints; validation/auth/rate limits/correlation IDs/error envelope/audit events. **Exit:** synthetic booking persists and is staff-queryable.

## Phase 4 — Catalog/booking
Canonical catalog/effective dates; preparation UX; service-area/slot rules; idempotent booking; notifications; cancellation/reschedule/exceptions. **Exit:** no duplicate mobile bookings.

## Phase 5 — Staff operations
Roles; today queue; assignment; collection status; exceptions; audit history; metrics. **Exit:** coordinator can run synthetic day without spreadsheets.

## Phase 6 — LIS/reports
Adapter contract; test-only fake; vendor sandbox after docs; OTP; private/signed delivery; timeout/not-found/revoked/duplicate/outage handling; reconciliation. **Exit:** sandbox report retrieved securely.

## Phase 7 — Payments
Choose prepay/pay-at-collection; server order; signed webhooks; idempotency; refunds/failures/reconciliation. **Exit:** test lifecycle reconciles provider event.

## Phase 8 — UX/accessibility
Task-first homepage; catalog detail; short booking stepper; separate report portal; staff queue; Hindi/English; keyboard/focus/contrast/reduced motion/screen-reader checks. **Exit:** WCAG smoke checklist.

## Phase 9 — Launch
PHI-redacted logs; metrics/alerts; backup/restore; security/dependency/threat/privacy review; staged rollout and rollback. **Exit:** signed launch checklist.

## Test matrix
Catalog validation/publication/pricing/search/empty; booking validation/duplicate/slot-race/cancel/outage; OTP expiry/replay/role denial/IDOR/revoked report/signed URL expiry; forged payment success/duplicate webhook/refund/reconciliation; accessibility keyboard/focus/labels/contrast/reduced motion; security injection/CSRF/CORS/rate-limit/log redaction; mobile LCP/INP/CLS.
