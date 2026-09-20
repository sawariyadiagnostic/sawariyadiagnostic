# Legal document contract

This directory defines the metadata boundary for legal and patient-facing notices. It does **not** contain final legal prose and is not legal advice.

The current website privacy modal uses the owner-supplied `docs/legal/privacy-policy.md` text as the operative Privacy & Medical Data Policy (version 2.0-Operative Standard, effective October 1, 2025). This does not approve or publish the remaining legal documents, which stay draft/review-required until their own wording and approvals are supplied.

## Fail-closed contract

`src/data/legal-document-index.ts` is the source of truth for the eight document keys:

- `privacy`: data categories, purposes, retention, sharing, rights, and contact routes.
- `terms`: service scope, booking/account terms, user responsibilities, limitations, refunds,
  jurisdiction, and other contractual terms.
- `patient-rights`: access, communication, consent, correction, and complaint expectations.
- `home-collection`: service area, scheduling, preparation, collection logistics, cancellations,
  and safety instructions.
- `report-assistance`: how a patient can request help understanding a report and the limits of
  that help. It must not promise diagnosis, treatment, or emergency care.
- `accessibility`: supported access methods, known limitations, feedback, and accommodation contact.
- `grievance`: submission, ownership, acknowledgement, and escalation of grievances.
- `external-services`: third-party booking, payment, communications, analytics, hosting, or report
  services and related disclosures.

Every record requires `state`, semantic `version`, nullable `effectiveAt`, and three approval
records: owner, clinical, and legal. Each approval requires status, reviewer identity, and review
time before publication. The index intentionally initializes every record as `draft`, version
`0.0.0`, with no effective date and pending approvals.

## Review workflow

1. Draft metadata and proposed prose internally; do not publish either as approved content.
2. Owner reviews business identity, service scope, contacts, operational commitments, and vendor
   facts.
3. Clinical reviewer reviews patient-safety, specimen/collection, report-assistance, and clinical
   claims. Clinical review is required for patient-rights, home-collection, and report-assistance;
   consult it for any document that could affect care.
4. Qualified legal/privacy reviewer reviews legal duties, consent, rights, liability, jurisdiction,
   vendor disclosures, accessibility commitments, and grievance obligations. Legal review is
   required for every document.
5. Record reviewer identity, timestamp, and notes in the approval ledger. Resolve rejected items
   and repeat the affected review.
6. Set a non-zero version and effective timestamp only after approvals are complete. A publication
   boundary must call `validateLegalDocumentForPublication`; any missing or pending field rejects.
7. Preserve prior versions and retire superseded documents. Do not add routes or publish text from
   this slice.

The metadata contract does not prove regulatory compliance, legal sufficiency, clinical accuracy,
accessibility conformance, or vendor compliance.
