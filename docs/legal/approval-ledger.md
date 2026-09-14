# Legal document approval ledger

This ledger is a review record template, not an approval. All entries remain blocked until the
named reviewer records a decision with identity, timestamp, and notes. Do not treat a checked box
as legal, clinical, accessibility, or regulatory compliance.

| Key | Owner approval | Clinical approval | Legal/privacy approval | State | Version | Effective at | Blocker / notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| privacy | PENDING — name/date/notes required | PENDING — name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Final scope, retention, sharing, rights, and vendors not approved |
| terms | PENDING — name/date/notes required | PENDING — if clinical/service claims; name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Contractual terms, liability, refunds, and jurisdiction not approved |
| patient-rights | PENDING — name/date/notes required | PENDING — clinical reviewer/name/date/notes required | PENDING — qualified reviewer/name/date/notes required | draft | 0.0.0 | — | Patient-safety and operational commitments not approved |
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
