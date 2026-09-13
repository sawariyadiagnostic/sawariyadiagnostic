# Target Architecture

```text
Patient Web App ─┐
Staff Console ────┼──> API/BFF ──> PostgreSQL
Doctor/Partner ──┘       │          Private report storage
                          ├──> LIS adapter(s)
                          ├──> payment adapter
                          ├──> messaging adapter
                          └──> audit / metrics / error tracking
```

LIS remains the clinical source of truth. Platform DB owns bookings, workflow, consent, notifications, integration state, and audit history.

## Architecture decisions
- Modular monolith first; no speculative microservices.
- One DB and one queue/job mechanism until measured need.
- One authoritative CMS.
- Public frontend may deploy separately, but sensitive operations go through the API.

## Delivery stages
1. Foundation: Node LTS, deterministic lockfile/build/lint/typecheck, validated config, API health, request IDs, structured errors, migrations.
2. Workflow: catalog API, admin writes, booking transaction/idempotency, slots/service areas, notifications, staff queue.
3. Reports: OTP/auth, LIS adapter, metadata mapping, private/signed access, verification/recalled behavior.
4. Payments: server orders, signed webhooks, reconciliation.
5. UX/scale: mobile-first, Hindi/English, WCAG, performance budgets, dashboards.

## LIS adapter contract
```text
healthCheck()
authenticate()
findPatient(criteria)
listReports(criteria)
getReportMetadata(reportId)
getReportFile(reportId)
verifyReport(reportId, code)
mapError(error)
```
Vendor credentials remain server-only; UI never knows vendor endpoints.
