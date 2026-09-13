# Planning Task

## Goal
Build a trustworthy patient-access and lab-operations platform from the GitHub-synced repository.

## Methods
Evidence-first audit; JTBD/service blueprint; domain boundaries; RICE prioritization; WCAG 2.2 AA; OWASP ASVS; privacy and NABL/ISO 15189 operational constraints.

## Status
- Repository baseline: complete
- PRD/architecture/execution plan: complete
- Business/LIS decisions: pending
- Implementation: not started

## Non-negotiable
No production patient data in localStorage; no simulated payment/report/LIS success; no unverified clinical/accreditation claims; no LIS implementation without official contract and sandbox.

## Known blockers
- Local Node/npm/Vite execution hangs under Node v24.13.1.
- Initial GitHub npm lockfile was out of sync.
- LIS API endpoints in current server are assumptions.
