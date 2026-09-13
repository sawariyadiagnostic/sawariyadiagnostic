# Sawariya Diagnostic Platform — Master PRD

**Status:** Planning baseline | **Repository:** `sawariyadiagnostic/sawariyadiagnostic` | **Audited commit:** `fe7b5226796c1fb899b863ffdae49ad85295514f`

## Executive summary
Turn the current React/Vite website into a trustworthy patient-access and lab-operations platform. Patients discover tests, understand preparation and pricing, book home collection, receive durable references, track status, and retrieve verified reports. Staff manage catalog, bookings, collections, exceptions, notifications, payments, reports, and integration health. The LIS remains the clinical source of truth.

## Current-state risks
- `serverless-db.ts` uses browser `localStorage` as a fake database with seeded health data.
- Payment clients simulate Razorpay/Stripe success when configuration is absent.
- LIS fallback can return `https://example.com/mock-report.pdf`.
- Forms can show success without durable delivery.
- CMS is localStorage-first and not a protected admin system.
- No verified auth, authorization, audit log, idempotency, rate limiting, webhook signature validation, or durable queue.
- Static GitHub Pages cannot safely hold LIS/payment secrets or process protected health data.

## Product principles
1. Truth over conversion: never confirm before durable acknowledgement.
2. Clinical boundary: display/route results; never diagnose.
3. One source of truth: LIS for clinical results, platform DB for workflow, provider for payment events.
4. Privacy by default: minimize, encrypt, restrict, retain, audit.
5. Mobile-first patients; desktop-efficient staff.
6. WhatsApp/phone is fallback, not proof of durable booking.
7. Adapter-based integrations require official contracts and sandbox tests.

## Users and JTBD
- **Patient/family:** find the right test, preparation, cost, home availability, book, retrieve report, get help.
- **Doctor/partner:** see availability/specimen requirements and obtain verified reports.
- **Coordinator:** operate one queue for requests, follow-ups, payments, and exceptions.
- **Collection staff:** see assigned visits and update collection status from mobile.
- **Lab/pathologist:** see workflow while LIS remains clinical system of record.
- **Owner/admin:** control catalog, permissions, integrations, audit, and metrics.

## Goals and KPIs
### Release 1
- 100% of confirmations map to a durable booking.
- Zero production paths fabricate payment/report/LIS success.
- Report access requires OTP or approved identity control.
- Every booking exception is visible and actionable.
- Core patient flow passes WCAG 2.2 AA smoke checks.
### KPIs
Search-to-book conversion; booking abandonment; duplicate-submit rate; collection on-time rate; report retrieval success; notification delivery/retry rate; payment reconciliation variance; integration failure/recovery rate; support contacts per booking.

## Scope
### Must have
Canonical business profile; catalog with specimen/preparation/price validity/TAT/home eligibility; idempotent bookings; service-area/slot rules; staff queue; OTP report portal; private/signed reports; notification states; audit log; LIS adapter boundary; complete loading/error/retry states.
### Should have
Doctor referrals; server-verified payments; effective-dated packages; operational dashboards; Hindi/English; consent controls.
### Later
Biomarker trends from verified data; B2B accounts; partner API; multiple LIS adapters; PWA.
### Not first release
Full LIS replacement; diagnosis/treatment advice; AI clinical conclusions; public report URLs; microservices before measured need.

## Functional requirements
- **FR-001 Identity:** patient OTP report access; managed staff authentication; role-based catalog/booking/collection/report/finance/admin permissions; audited protected actions; no secrets in client bundles.
- **FR-010 Catalog:** stable IDs; category/specimen/preparation/parameters/price/validity/TAT/home flag/publication state; search/filter; expired items not bookable; versioned/audited edits.
- **FR-020 Booking:** selection, patient/contact, home/lab, address, slot, consent; server validation; idempotency key; reference; lifecycle `REQUESTED → CONFIRMED → ASSIGNED → EN_ROUTE → COLLECTED → RECEIVED → IN_PROCESS → REPORT_READY` plus `CANCELLED/FAILED`.
- **FR-030 Operations:** mobile collection actions; assignment; no-show, wrong address, rejected specimen, recollection, delay, escalation exceptions; protected internal notes.
- **FR-040 Reports:** LIS/manual metadata; private storage/proxy; short-lived access; verification metadata; `PROCESSING/VERIFIED/PUBLISHED/RECALLED/ERROR`; recalled reports blocked.
- **FR-050 LIS:** adapter health/auth/patient lookup/report list/metadata/file/verification/error mapping; server-only credentials; timeout/retry/correlation ID; signed idempotent webhooks; sandbox contract tests.
- **FR-060 Payments:** server-created order; provider webhook authoritative; `PENDING/AUTHORIZED/PAID/FAILED/REFUNDED/PARTIAL/RECONCILIATION_REQUIRED`; idempotent linkage; cash/UPI pending until staff confirms.
- **FR-070 Communications:** approved templates; delivery/retry records; fallback clearly labelled.
- **FR-080 Admin:** authenticated staff CMS; validated prices/dates/IDs; review/approval for clinical content; no tokens in localStorage.

## Non-functional requirements
OWASP ASVS-aligned validation, rate limits, secure headers, CORS/CSRF policy, secret manager, audit logs, retention schedule, consent, backups/restore drill, PHI-redacted logs, error tracking, health checks, WCAG 2.2 AA, Hindi/English-ready content, mobile performance budgets for LCP/INP/CLS.

## UX/UI direction
- Homepage task order: **Book home collection**, Find a test, Download report, evidence/trust, services, location, support.
- Catalog cards: name, price validity, preparation, specimen, TAT range, home availability, one action.
- Booking stepper: selection → patient/contact → visit/address/slot → review/consent → durable confirmation.
- Report portal is separate from marketing and exposes identity, processing, report list, verification, expiry/recalled state, support.
- Staff console is queue-first: today, overdue, unassigned, failed integration, payment, report exceptions.
- No unsupported “100% accurate”, urgency, accreditation, or 24/7 claims.

## Logical data model
`business_profile`, `locations`, `service_areas`, `users`, `roles`, `patients`, `consents`, `catalog_tests`, `catalog_packages`, `catalog_versions`, `bookings`, `booking_items`, `slots`, `assignments`, `specimens`, `reports`, `report_files`, `payments`, `notifications`, `integration_connections`, `integration_events`, `audit_events`, `support_cases`.

## Acceptance gates
No demo fallback in production; failure-case tests for booking/report/payment; no unmitigated critical/high security issue; keyboard/screen-reader smoke pass; retention/support/incident/backup/rollback docs; staff can reconcile a booking through final report.

## Open decisions
Exact LIS/API contract; canonical phone/email/hours/service area/accreditation scope; API/database/private-report hosting; payment policy; OTP/messaging provider; staff roles/approvals; report file ownership; retention/consent/breach/legal review.
