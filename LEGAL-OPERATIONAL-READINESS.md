# Legal and Operational Readiness Checklist

This is an implementation checklist, not legal advice. A qualified India-focused lawyer and the lab's compliance/quality owner must review final text before launch.

The metadata contract in `src/data/legal-document-index.ts` is fail-closed: records remain `draft`,
version `0.0.0`, with no effective date and pending owner, clinical, and legal approval unless an
exact supplied document has a complete independent sign-off ledger. The Terms & Patient Rights
records are current approved exceptions. Follow `docs/legal/README.md` and record decisions in
`docs/legal/approval-ledger.md`.
This contract does not claim compliance or replace professional review.

## Business identity

- [ ] Confirm legal entity name and operating name
- [ ] Confirm registered address and service area
- [ ] Confirm official phone, email, hours, and grievance contact
- [ ] Confirm whether accreditation claims may be published and attach evidence
- [ ] Confirm lab registration/licensing details and renewal owner

## Patient privacy and data

- [ ] Final privacy notice covering collection, purpose, retention, sharing, deletion, and contact
- [ ] Consent language for booking, home collection, WhatsApp/email, analytics, and reports
- [ ] Patient-data retention schedule
- [ ] Access controls for LIS/report systems
- [ ] Processor/vendor register for hosting, forms, WhatsApp, email, payments, analytics, and LIS
- [ ] Incident/breach response procedure
- [ ] Data subject request process
- [ ] Minimum necessary data collection review

## Website/legal documents

- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Patient Rights and Responsibilities
- [ ] Diagnostic interpretation disclaimer
- [ ] Home collection terms
- [ ] Pricing/refund/cancellation policy
- [ ] Payment provider terms
- [ ] Cookie/analytics consent policy if non-essential tracking is enabled
- [ ] Accessibility statement and contact method

## Clinical and quality claims

- [ ] Review every accreditation, certification, accuracy, turnaround, doctor-signoff, and quality claim
- [ ] Confirm report verification/QR workflow is real before publishing it
- [ ] Confirm test preparation and reference-range ownership
- [ ] Confirm public package composition and price approval
- [ ] Confirm adverse-result communication/escalation process

## Security and operations

- [ ] HTTPS and domain ownership
- [ ] Secrets stored only in deployment secrets
- [ ] Provider timeouts and error handling
- [ ] Rate limiting and abuse monitoring for public endpoints
- [ ] Dependency update cadence
- [ ] Backups and restore test
- [ ] Monitoring and alerting
- [ ] Release rollback procedure
- [ ] Quarterly content and legal review

## Launch gate

No production claim of legal or clinical compliance should be made until the owner and qualified advisers sign off the applicable checklist items.
