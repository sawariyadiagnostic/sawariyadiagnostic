# Pull request

## What changed

<!-- Describe the user-facing or operational change. -->

## Scope

- [ ] One focused task
- [ ] No unrelated refactor
- [ ] No secrets, patient data, or raw register data added

## Content and compliance

- [ ] No new clinical, accreditation, accuracy, security, or legal claim
- [ ] Owner approval attached/recorded for catalog or business facts
- [ ] Clinical review attached/recorded for medical content
- [ ] Legal review required/received for policy or consent content
- [ ] Unavailable integrations remain truthful

## Verification

```text
npm ci --ignore-scripts --dry-run:
npm run lint:
npx tsc --noEmit -p tsconfig.app.json:
npm run build:
git diff --check:
```

## Accessibility and responsive behavior

- [ ] Keyboard and visible focus checked
- [ ] Mobile/tablet/desktop checked
- [ ] Text wraps without clipping
- [ ] Reduced motion remains usable

## Known limitations / follow-up

<!-- State unresolved items plainly. -->
