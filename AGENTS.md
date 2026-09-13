# Agent operating rules

## Repository

- Root: `C:\Users\Dell\Desktop\python\website-github-sync`
- Preserve the separate older workspace at `C:\Users\Dell\Desktop\python\website`.
- Do not commit, push, rewrite history, or modify deployment settings unless the active task explicitly allows it.
- Check Git status before and after every task.

## Engineering rules

- Read the target files and nearby imports before editing.
- Use the smallest safe diff. Delete dead code rather than adding compatibility layers.
- Do not invent files, APIs, provider behavior, clinical facts, accreditation, security, accuracy, or legal compliance.
- Keep raw registers and patient-like fixtures outside browser/SSG imports.
- Never expose credentials, tokens, passwords, report identifiers, or patient data.
- Keep `VITE_` values non-secret because they are browser-visible.
- Preserve the supplied logo asset and owner-approved brand phrases/colors.
- Keep the public Team section role-first and name-free unless explicitly approved.

## Healthcare content rules

- Public test/package content requires owner approval.
- Clinical explanations, preparation, specimen, reference-range, interpretation, and safety language require qualified clinical review.
- Legal and privacy copy requires owner/legal review; code alone is not a compliance certificate.
- Unavailable integrations must say that they are unavailable or require confirmation. Never use mock success as if it were production behavior.

## Verification rules

Before claiming completion, run the exact relevant command and read its exit status/output:

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
git diff --check
```

For money, content, patient-data, or trust-boundary changes, add or update a focused regression check. Record failures and do not silently weaken gates.
