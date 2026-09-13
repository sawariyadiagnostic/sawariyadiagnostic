# Sawariya Diagnostic Website

Patient-facing React/Vite website for Sawariya Diagnostic Lab, Charkhi Dadri, Haryana.

The site presents the approved public catalog, laboratory contact routes, home-collection information, role-based quality structure, and appointment handoff. It is not a laboratory information system, payment processor, patient-record store, or report-hosting service.

## Public facts

- **Location:** Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana 127306
- **Phone:** `+91 99919 41207`
- **Emergency line:** `+91 70152 90782`
- **Email:** `sawariyadiagnosticckd11@gmail.com`
- **Hours:** hours and service availability require confirmation; home collection is subject to confirmation
- **Booking:** Cal.com embed/handoff where configured; the provider and event must be verified before operational changes

Accreditation, certification, clinical-performance, turnaround, privacy, and security claims require owner and qualified-adviser approval before publication.

## Repository map

| Path | Purpose |
| --- | --- |
| `src/` | React application and public content rendering |
| `src/config/site.ts` | Public brand, contact, location, and integration configuration |
| `src/data/` | Curated public catalog and role-based team data |
| `public/` | Static assets, crawl metadata, robots, sitemap, and AI context |
| `scripts/generate-ssg.ts` | Static route and metadata generation |
| `server.ts` | Development/optional Express boundary and health endpoint |
| `catalog-workspace/raw-inventory/` | Non-public source registers and extracted inventory |
| `catalog-workspace/approved-catalog/` | Owner-approved publication boundary |
| `catalog-workspace/report-parameters/` | Empty/report-template material awaiting clinical review |
| `docs/` | Architecture, design, operations, content, and historical documents |
| `.github/workflows/` | GitHub Actions build and deployment workflows |

Raw inventory must never be imported into the browser bundle or published by SSG without approval.

## Local setup

### Requirements

- Node.js 24 to match CI
- npm with the committed `package-lock.json`
- Git

### Install

```bash
npm ci
```

### Development

```bash
npm run dev
```

The development server uses port `3000` by default. Change `PORT` for the Express/Vite server when needed.

### Verification commands currently available

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
```

`npm run build` produces the Vite frontend, static pages, sitemap/fallback output, and the bundled server artifact in `dist/`.

### Preview

```bash
npm run preview
```

Use the preview server to inspect the generated frontend. Do not treat a local preview as proof that a booking, report, payment, LIS, notification, or home-collection backend exists.

### Production server bundle

```bash
npm run start
```

The bundled Express server is optional for the static GitHub Pages deployment. Its currently supported boundary is the static app, health check, and explicitly configured integration routes; it must not receive patient records without an approved backend, privacy notice, authentication, retention policy, and operational owner.

## Configuration

Copy `.env.example` for local placeholders. Never commit `.env` files, credentials, tokens, API keys, patient information, or provider secrets.

- Variables prefixed `VITE_` are browser-visible after build and are not secrets.
- Server-only credentials must not use `VITE_` names.
- Empty integration values must render a truthful unavailable/configuration state.
- Public contact and business facts must be changed in the approved configuration/data source, not scattered through components.

## Booking and patient-data boundary

The public site may hand a patient to a configured booking provider or to the lab's published phone/WhatsApp route. It must not claim that a booking, phlebotomist dispatch, LIS entry, WhatsApp notification, payment, report generation, or report download completed unless the provider response is real and verified.

Do not add patient names, phone numbers, addresses, report identifiers, or medical results to URLs, localStorage, analytics payloads, or public logs.

## Catalog and content workflow

1. Keep raw registers and AI-extracted data in `catalog-workspace/raw-inventory/`.
2. Review aliases, parameters, preparation, specimen, price, listed value, availability, and claims.
3. Record owner/clinician approval in the approved-catalog workflow.
4. Publish only approved records through the curated public data source.
5. Re-run the build and content review before deployment.

See:

- [Documentation index](docs/README.md)
- [Engineering guide](ENGINEERING.md)
- [Content publication policy](CONTENT-PUBLICATION-POLICY.md)
- [Legal and operational readiness](LEGAL-OPERATIONAL-READINESS.md)
- [Catalog workspace](catalog-workspace/README.md)
- [Architecture](docs/architecture/ARCHITECTURE.md)
- [Brand guidelines](brand-guidelines.md)

## Deployment

Pushes to `main` trigger the GitHub Pages workflow. The deployment workflow must install from the lockfile, run the required quality gate, build `dist/`, and deploy only the verified artifact. Preserve the last known-good deployment when a release fails.

Before a production push, run:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run validate:content
git diff --check
```

## Troubleshooting

- If `npm ci` fails, use Node.js 24 and npm 11, remove the local `node_modules/` directory, and retry from the committed lockfile. Do not replace `npm ci` with an unpinned install for release verification.
- If the development server cannot bind to port `3000`, stop the process already using it or set `PORT` to another local port before running `npm run dev`. The Playwright configuration expects port `3000` unless it is changed with the configuration.
- If browser checks cannot start, install the Chromium browser required by Playwright with `npx playwright install chromium`, then run `npm run test:e2e` and `npm run test:a11y` separately.
- If content validation fails, inspect the reported records and approvals; do not bypass `npm run validate:content` or publish unapproved content.
- If a build fails, inspect the first reported error, fix the source or configuration, and rerun the relevant command before deployment.

## Rollback

There is no repository rollback script. GitHub Pages upload and deployment occur only after the deploy workflow's lint, typecheck, unit, content-validation, production-audit, smoke, accessibility, and build steps pass. If a release must be reverted, revert the offending commit on `main`, run the local production checks, and push the corrective commit so the workflow rebuilds the previous source state. Do not delete or manually edit generated `dist/` output as a rollback mechanism.

## Known limitations

- The site is a static public frontend and optional server bundle. It does not provide a laboratory information system, patient-record store, report hosting/download, payment processing, LIS integration, notification delivery, or home-collection dispatch backend.
- Booking is a configured Cal.com or published phone/WhatsApp handoff; a rendered link or embed is not proof that an appointment was created or accepted.
- The configured hours and public catalog are informational. Service availability, home collection, turnaround, and other operational details require confirmation outside this repository.
- `npm run validate:content` checks the repository's content contract; it does not replace owner, clinical, legal, or operational review.
- Automated accessibility coverage currently exercises the homepage browser path. It does not replace a broader manual accessibility review.

## Legal and clinical review boundary

The repository contains readiness checklists and content-review templates, not legal advice or a compliance certificate. The lab owner and qualified advisers must approve privacy/consent language, patient rights, retention/deletion, home-collection terms, report access, refunds, grievances, applicable healthcare obligations, and every clinical or accreditation claim before publication.

## License

© Sawariya Diagnostic. All rights reserved.
