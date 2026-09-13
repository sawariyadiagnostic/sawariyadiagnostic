# Contributing

This repository contains a patient-facing diagnostic website. Keep changes small, evidence-based, and reviewable.

## Before changing code

1. Read `AGENTS.md`, `ENGINEERING.md`, and the relevant document in `docs/`.
2. Check `git status --short --branch`.
3. Confirm the change is needed; prefer deletion or an existing platform/dependency feature over new abstractions.
4. Keep raw registers, credentials, patient data, and provider secrets out of Git.

## Required review boundaries

- **Code:** TypeScript, lint, build, and focused tests must pass.
- **Catalog:** owner approval is required for names, aliases, parameters, pricing, listed values, specimen, preparation, turnaround, and availability.
- **Clinical copy:** clinician review is required for medical explanations, preparation instructions, reference ranges, interpretation, and safety language.
- **Legal copy:** owner and qualified legal review are required for privacy, consent, terms, retention, refunds, grievance, report access, and health-data handling.
- **Integrations:** do not add simulated success. Provider credentials and contracts are configured separately and never committed.
- **Accessibility:** preserve semantic headings, keyboard access, visible focus, readable contrast, responsive wrapping, and reduced-motion behavior.

## Verification

Run the checks relevant to the change and include exact results in the pull request:

```bash
npm ci --ignore-scripts --dry-run
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
git diff --check
```

Do not report a check as passing unless it was run on the submitted diff.

## Pull requests

Describe:

- user-facing behavior changed
- files changed and why
- content/legal/clinical approvals required or received
- commands run and results
- known limitations and follow-up work

Use the pull request template. One focused task per pull request is preferred.
