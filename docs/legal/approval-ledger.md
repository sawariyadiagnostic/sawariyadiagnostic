# Legal document approval ledger

This ledger is a review record template, not an approval. All entries remain blocked until the
named reviewer records a decision with identity, timestamp, and notes. Do not treat a checked box
as legal, clinical, accessibility, or regulatory compliance.

| Key | Owner approval | Clinical approval | Legal/privacy approval | State | Version | Effective at | Blocker / notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| privacy | PENDING — name/date/notes required | PENDING — name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Final scope, retention, sharing, rights, and vendors not approved |
| terms | APPROVED — Managing Partner / Operations Lead — 2026-09-21 | APPROVED — Consulting Pathologist / Quality Manager — 2026-09-21 | APPROVED — Legal Counsel & Data Protection Advisor — 2026-09-21 | published | 2.0.0 | 2025-10-01 | Source document Version 2.0-Legal Standard; exact sign-off ledger preserved in `docs/legal/terms-and-patient-rights.md` |
| patient-rights | APPROVED — Managing Director / Operational Lead — 2026-09-21 | APPROVED — Consulting Pathologist / Quality Assurance Lead — 2026-09-21 | APPROVED — Legal Counsel & Data Protection Advisor — 2026-09-21 | published | 2.0.0 | 2025-10-01 | Source document SDL-QMS-CC-2026-V2; exact sign-off ledger preserved in `docs/legal/quality-community-charter.md` |
| home-collection | PENDING — name/date/notes required | PENDING — clinical reviewer/name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Safety, service area, availability, pricing, and cancellation claims not approved |
| report-assistance | PENDING — name/date/notes required | PENDING — clinical reviewer/name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Diagnostic/treatment boundary and escalation language not approved |
| accessibility | PENDING — name/date/notes required | PENDING — where patient-care access is affected; name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Actual support, limitations, and accommodation commitments not verified |
| grievance | PENDING — name/date/notes required | PENDING — where clinical escalation is affected; name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Contacts, timelines, escalation, and regulatory claims not approved |
| external-services | PENDING — name/date/notes required | PENDING — where clinical/report services are involved; name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Vendor inventory, data flows, disclosures, and contracts not approved |

## Required record

For each approval, replace `PENDING` only with `approved` or `rejected`, the reviewer’s identity,
UTC timestamp, and decision notes. A rejected or incomplete approval keeps the document blocked.
Owner, clinical, and legal/privacy review are independent gates; one cannot substitute for another.

A release coordinator may move a record to `published` only when all three gates are approved, the
version is non-zero semantic versioning, and `effectiveAt` is a valid timestamp. Until then, no
legal document route, navigation link, SSG page, or policy text may be added from this slice.
