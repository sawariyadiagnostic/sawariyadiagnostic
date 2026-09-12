# Wave 2 Baseline — L12

Captured on the the Wave 2 baseline task branch before integration cleanup.

## Verification baseline

| Check | Result |
| --- | --- |
| `npm run lint` | Pass; 0 errors, 6 existing Fast Refresh warnings |
| `npm run typecheck` | Pass |
| `npm run test:unit` | Pass; 1 file, 5 tests |
| `npm run test:e2e -- --workers=1` | Pass; 2 tests |
| `npm audit --omit=dev --audit-level=high` | Pass; 0 production vulnerabilities |
| `npm run build` | Previously pass; 2,088 modules, 85 static pages, server bundle |
| Markdown internal links | Pass; 0 broken links across 56 files |

## Repository size snapshot

- `src/`: 83 files, 539,045 bytes
- `public/`: 9 files, 1,213,170 bytes
- `scripts/`: 2 files, 8,601 bytes
- `catalog-workspace/`: 20 files, 30,596 bytes
- `.github/`: 7 files, 4,862 bytes
- Current generated bundle includes `dist/index.html`, `dist/404.html`, `dist/server.cjs`, 85 SSG pages, and static metadata/assets.

## Integration inventory

| Surface | Evidence | Wave 2 decision |
| --- | --- | --- |
| Home-collection form | `HomeCollection.tsx`, `FormsService`, patient name/phone/address fields | Remove browser-side patient collection; use configured Cal.com/phone/WhatsApp handoff |
| Test/package booking | `TestBookingModal.tsx`, `FormsService` | Remove direct patient submission path; preserve selected-context handoff only |
| LIS/report | `server.ts`, `src/lib/lis-client.ts`, report portal/demo components | Remove from public build until authenticated, contracted, privacy-reviewed backend exists |
| Payments | `src/lib/payments.ts`, booking/report paths | Remove unused payment/demo code; no payment success claims |
| Local serverless DB | `src/lib/serverless-db.ts` | Remove if no runtime import remains |
| Analytics | `src/lib/analytics.ts`, `/api/track` | Remove mock endpoint/client unless a real consented analytics provider is configured |
| CMS | no public `CMSClient` import found; source references only in historical/ignored material | Keep removed; delete residual source only if tracked and unreferenced |
| Cal.com | `Contact.tsx` embeds `sawariya-lab/30min` | Keep as the only appointment provider; centralize provider configuration before changing behavior |

## Known build caveat

On this Windows workspace, SSG can log non-fatal `EPERM` warnings when overwriting protected `public/og-image.png` and `dist/sitemap.xml`. The build still generated the expected static pages. A later deterministic-SSG task must make this behavior explicit and CI-safe.

## Scope rule

This baseline is evidence, not a target metric. Wave 2 changes must preserve or improve these gates and must not publish patient data or simulated provider success.
