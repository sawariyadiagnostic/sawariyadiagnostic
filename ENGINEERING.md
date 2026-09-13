# Sawariya Diagnostic Website — Engineering Documentation

## Scope

This repository contains the public React/Vite patient website, static SEO pages, a small Express integration boundary, and a private catalog-workspace used to prepare owner-approved tests/packages.

## Runtime boundaries

- Public frontend: `src/`
- Public static assets: `public/`
- Static-page generation: `scripts/generate-ssg.ts`
- Server integration boundary: `server.ts`
- Raw, non-public inventory: `catalog-workspace/raw-inventory/`
- Report parameter templates: `catalog-workspace/report-parameters/`
- Approved public catalog: `catalog-workspace/approved-catalog/`

The public site must never publish raw inventory automatically. A record enters the public catalog only after owner review of its name, parameters, price, listed value, preparation, turnaround, specimen, and availability.

## Local commands

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
npm run validate:content
npm run preview
```

`npm run build` creates the Vite frontend, static pages, sitemap, fallback page, and server bundle.

## Configuration

- Public, non-secret values belong in `src/config/site.ts` and environment overrides.
- Server-only credentials must never use `VITE_` variables.
- `.env` is local-only and must not be committed.
- Real LIS, notification, payment, booking, and report delivery behavior is unavailable until the corresponding provider is configured and tested.

## Extension rules

1. Add domain types before UI fields.
2. Keep business rules out of presentational components.
3. Prefer a single source of truth for brand, catalog, team roles, and legal copy.
4. Add a focused verification check before changing money, report access, or patient data flows.
5. Do not publish a claim merely because it appears in an old fixture, generated asset, or AI-extracted spreadsheet.
6. Keep the public role-first Team section separate from private personnel administration.

## Deployment

GitHub Actions runs Node 24, installs from `package-lock.json`, builds, and deploys `dist/` to `gh-pages`. Review the workflow after dependency or deployment changes.

## Incident response

- Disable or remove a failing integration through its environment configuration.
- Never expose provider credentials in browser code.
- Preserve the last known-good deployment.
- Record the incident, affected workflow, user impact, and recovery action in the repository issue tracker.
