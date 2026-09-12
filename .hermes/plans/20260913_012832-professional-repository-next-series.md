# Professional Repository and Knowledge Library — Next Series Plan

> **For Hermes:** Execute this plan task-by-task with the `subagent-driven-development` workflow. This document is planning-only; no implementation is performed in this plan turn.

**Goal:** Continue the attached professional-repository plan from the current Sawariya codebase, first establishing a clean, documented, testable foundation, then removing unverified/dead integrations before expanding the bilingual clinician-reviewed test-guide system.

**Architecture:** Keep the patient website static and deployable to GitHub Pages. Keep Cal.com as the only booking provider in this series. Keep raw register data outside browser/SSG imports. Publish only owner-and-clinician-approved content. Remove or isolate unfinished patient-data, report, payment, LIS, CMS, and analytics pathways instead of presenting simulations as production capabilities.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Radix/shadcn-style UI, Framer Motion, Express only while a verified server integration boundary is required, npm lockfile, GitHub Actions, GitHub Pages.

**Workspace:** `C:\Users\Dell\Desktop\python\website-github-sync`

**Current baseline observed before this plan:**

- Branch: `main`, clean at commit `af537c7` before this continuation.
- Public role-based Team section and approved-catalog boundary are present.
- `npm run lint` exits 0 with six Fast Refresh warnings from generated UI primitives.
- TypeScript check passes after the catalog type repair in the current working state.
- Vite frontend build, SSG generation, and server bundle have passed in recent verification.
- `npm audit --omit=dev --audit-level=high` reports one moderate `qs` advisory; no high/critical advisory was reported.
- Current repository still contains root-level planning documents, dormant integration paths, no meaningful automated test suite, relaxed TypeScript settings, and legal/content documents that require owner/legal review.

---

## Non-negotiable constraints

- One task uses one branch: `luna/LNN-short-name`.
- Each task changes only its named files plus direct tests.
- Do not publish raw registers, draft guides, patient-like fixtures, or unapproved claims.
- Do not add real credentials, tokens, patient data, or provider secrets.
- Do not preserve simulated success language in production paths.
- Do not claim legal, clinical, accreditation, accuracy, or security compliance without evidence and owner/legal approval.
- Only dependency tasks may modify `package.json` or `package-lock.json`.
- Every task ends with `git diff --check` and its exact required checks.
- Stop if a required check fails outside the task's allowed files.

## Luna task contract

Every implementation prompt must include:

```text
Task: LNN - short title
Branch: luna/LNN-short-name
Allowed files: exact paths
Do not change: all other files
Goal: one observable outcome
Required checks: exact commands
Acceptance: exact result
Handoff: summary, changed files, command results, known follow-up
```

Before each task:

```bash
git status --short --branch
```

After each task:

```bash
git diff --check
```

Commit each approved task using a conventional message. Do not squash unrelated task boundaries.

---

# Wave 1 — Repository foundation and release discipline

Execute these in order. This is the next series to implement now.

### Task L01: Create the documentation index

**Objective:** Make repository documentation discoverable without reading every root file.

**Files:**
- Create: `docs/README.md`
- Modify: `README.md` only if needed for links

**Content:** Classify documents into `getting-started`, `architecture`, `operations`, `design`, `content`, `legal`, and `archive`. Mark which documents are normative versus historical.

**Checks:**

```bash
python -c "from pathlib import Path; p=Path('docs/README.md'); assert p.exists(); print('docs index present')"
git diff --check
```

**Acceptance:** Every active root Markdown document is either linked or explicitly classified as historical.

### Task L02: Organize root planning documents

**Objective:** Reduce root clutter without losing project history or breaking links.

**Files:**
- Move: root planning/design/audit documents into `docs/architecture/`, `docs/design/`, `docs/content/`, `docs/operations/`, and `docs/archive/`
- Modify: links in `README.md`, `ENGINEERING.md`, and moved documents

**Rules:** Do not move `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `.env.example`, package/config files, or current legal/readiness files until their links are updated. Preserve Git history with `git mv`.

**Checks:**

```bash
python - <<'PY'
from pathlib import Path
for p in Path('docs').rglob('*.md'):
    text=p.read_text(encoding='utf-8')
    for token in ('](../', '](./'):
        assert not ('MISSING' in text), p
print('document tree readable')
PY
git diff --check
```

**Acceptance:** No internal Markdown link points to a missing path; root contains only intentional entry-point docs.

### Task L03: Rewrite the engineer README

**Objective:** Make a fresh engineer able to install, verify, develop, preview, and deploy the repository.

**Files:**
- Modify: `README.md`
- Reference: `ENGINEERING.md`, `ARCHITECTURE.md`, `.env.example`, `.github/workflows/deploy.yml`

**Required sections:** product scope, architecture, public/private data boundary, exact commands, environment variables, Cal.com boundary, catalog approval flow, legal-review boundary, deployment, rollback, troubleshooting, known limitations.

**Checks:**

```bash
npm ci --ignore-scripts --dry-run
npm run lint
npx tsc --noEmit -p tsconfig.app.json
```

**Acceptance:** README contains no unsupported accreditation/accuracy/security claims and no command that does not exist in `package.json`.

### Task L04: Add contribution and review governance

**Objective:** Prevent future changes from bypassing quality/content/legal gates.

**Files:**
- Create: `CONTRIBUTING.md`
- Create: `AGENTS.md`
- Create: `.github/pull_request_template.md`
- Create: `.github/ISSUE_TEMPLATE/bug_report.md`
- Create: `.github/ISSUE_TEMPLATE/content_review.md`
- Create: `.github/ISSUE_TEMPLATE/legal_review.md`
- Create: `docs/content/clinical-content-review-checklist.md`

**Required rules:** allowed task scope, checks before merge, no secrets, raw-vs-approved content, owner/clinician review, no fake integrations, accessibility and responsive verification.

**Checks:**

```bash
python - <<'PY'
from pathlib import Path
for p in ['CONTRIBUTING.md','AGENTS.md','.github/pull_request_template.md','docs/content/clinical-content-review-checklist.md']:
    assert Path(p).exists(), p
print('governance files present')
PY
```

**Acceptance:** A content change and a code change each have a documented review path.

### Task L05: Remove obsolete repository artifacts

**Objective:** Remove stale files only after proving no active imports or links remain.

**Files:**
- Candidate removals: `.lovable/plan.md`, `metadata.json`, `GITHUB_SOURCE.txt`, obsolete generated assets, duplicate historical pointers
- Modify: references in docs only

**Before deletion:**

```bash
git grep -n "\.lovable/plan\|metadata.json\|GITHUB_SOURCE\|preview-dist\|public/logo.svg" -- ':!docs/archive/**'
```

**Acceptance:** Every deleted file has zero active references; raw source inventory remains under `catalog-workspace/raw-inventory/`.

### Task L06: Pin runtime and package manager

**Objective:** Make local and CI runtime versions reproducible.

**Files:**
- Modify: `package.json`
- Create: `.nvmrc` with `24`
- Create: `.node-version` with `24`
- Modify: `README.md` and workflow only if needed

**Add:** `engines.node`, `engines.npm`, and an explicit `packageManager` field matching the committed npm lockfile.

**Checks:**

```bash
npm ci --ignore-scripts --dry-run
node --version
npm --version
```

**Acceptance:** A clean checkout can select the documented Node/npm versions and `npm ci` accepts the lockfile.

### Task L07: Add one quality entry point

**Objective:** Give developers one command that represents the minimum release gate.

**Files:**
- Modify: `package.json`
- Modify: `README.md`

**Scripts:**

```json
"typecheck": "tsc --noEmit -p tsconfig.app.json",
"test:unit": "vitest run",
"test:e2e": "playwright test",
"test:a11y": "playwright test tests/e2e/accessibility.spec.ts",
"validate:content": "tsx scripts/validate-content.ts",
"check": "npm run lint && npm run typecheck && npm run test:unit && npm run build"
```

Do not add scripts until their dependencies and files exist in later tasks; this task may add placeholder command wiring only as part of the same dependency task if the check remains runnable.

**Acceptance:** `npm run check` is a documented single entry point and fails on any required stage.

### Task L08: Add minimal automated test infrastructure

**Objective:** Cover the current critical public path before larger refactors.

**Files:**
- Dependency task: `package.json`, `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/unit/catalog-boundary.test.ts`
- Create: `tests/e2e/smoke.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`

**Minimal coverage:** public catalog starts empty until approved records exist; role-based Team renders headings; home-collection link does not claim backend submission; logo asset path is base-aware.

**Checks:**

```bash
npm ci
npm run test:unit
npm run test:e2e
npm run test:a11y
```

**Acceptance:** At least one unit, browser smoke, and axe accessibility test pass on a clean install.

### Task L09: Add a pull-request quality workflow

**Objective:** Prevent regressions without deploying from pull requests.

**Files:**
- Create: `.github/workflows/quality.yml`

**Stages:** `npm ci`, lint, typecheck, unit, build, dependency audit. Use Node 24 and least-privilege read permissions.

**Acceptance:** Workflow is syntax-valid and never deploys to `gh-pages`.

### Task L10: Harden deployment workflow

**Objective:** Deploy only a verified artifact from `main`.

**Files:**
- Modify: `.github/workflows/deploy.yml`

**Order:** checkout → Node setup → `npm ci` → quality gate → `npm run build` → upload Pages artifact → deploy Pages artifact.

**Acceptance:** No deployment step can run if lint/type/test/build fails.

### Task L11: Add dependency maintenance

**Objective:** Make dependency drift visible and scheduled.

**Files:**
- Create: `.github/dependabot.yml`
- Create: `docs/operations/dependency-review.md`

**Acceptance:** Weekly npm update configuration exists; dependency review documents how to assess the current `qs` advisory before upgrading.

---

# Wave 2 — Remove unfinished integrations and strengthen boundaries

Do not begin until Wave 1 quality workflow exists.

### Task L12: Record a measurable baseline

Create `docs/operations/baseline.md` with fresh outputs for lint warnings, typecheck, bundle sizes, audit, tracked artifacts, and source counts. Do not invent before/after metrics.

### Task L13: Finish unused-code cleanup

Use a dependency/import scan to remove only confirmed unused UI primitives and dependencies. Do not delete a component used by generated code without checking all imports.

### Task L14: Validate public site configuration

Create a typed config schema for public contact, location, base path, Cal.com event, hours, and legal-review status. Invalid required public config must fail type/validation checks.

### Task L15: Make Cal.com the single booking boundary

Verify the real current event slug and preserve it. Centralize the booking launcher. Show provider-unavailable state without collecting patient data in the browser.

### Task L16: Replace home-collection form

Replace `HomeCollection.tsx` form submission with a Cal.com handoff or explicit call/WhatsApp handoff. Remove name/phone/address submission unless a real provider and privacy flow are approved.

### Task L17: Replace catalog booking submission

Make test/package booking actions pass only selected context to Cal.com. Do not put patient data or secrets into query parameters.

### Task L18: Remove obsolete forms/payment/LIS client paths

After the previous tasks pass, remove `forms.ts`, `payments.ts`, browser LIS client, report demo flow, and unused dependencies. Preserve future integration guidance only in docs.

### Task L19: Add public error boundaries

Add a small error boundary around lazy/optional sections and a factual fallback that does not expose stack traces or promise unavailable backend features.

### Task L20: Deterministic SSG

Make SSG write only into a clean `dist/` directory. Never overwrite protected files under `public/`; fail clearly when generated metadata cannot be written.

---

# Wave 3 — Approved bilingual test-guide system

Begin only after the owner and clinician agree to the content workflow.

### Task L21: Define content schemas

Add Zod schemas/types for bilingual guides, packages, citations, approvals, price metadata, and publication state.

### Task L22: Validate content

Create `scripts/validate-content.ts` to reject missing language pairs, missing approvals, stale reviews, unsafe clinical wording, invalid links, and unapproved pricing.

### Task L23: Create manifest build

Generate a validated manifest from `content/test-guides/<slug>/en.md` and `hi.md`; browser and SSG consume only the manifest.

### Task L24: Remove register runtime imports

Ensure raw CSV/register data is never imported into browser code or SSG. Keep it only for owner review.

### Task L25: Build TestGuidePage

Create accessible long-form test pages with purpose, preparation, specimen, limits, related tests, citations, disclaimer, bilingual navigation, and Cal.com action.

### Task L26: Add one approved guide at a time

Start with CBC, then Lipid Profile, Thyroid Profile, HbA1c, and KFT only when owner and clinician provide exact facts and approvals.

### Task L27: SSG/SEO guide routes

Generate canonical English/Hindi routes, hreflang, sitemap entries, and schema only for approved records.

---

# Wave 4 — Visual/accessibility quality

### Task L28: Consolidate design tokens

Move brand, spacing, typography, motion, and semantic state values into one documented token layer.

### Task L29: Split global CSS safely

Split `src/index.css` into tokens/base/layout/component layers without visual change; compare mobile and desktop screenshots.

### Task L30: Accessibility hardening

Verify keyboard, focus return, 44px targets, contrast, 200% zoom, reduced motion/transparency, dialog labeling, and mobile overflow.

### Task L31: Content/claim review

Audit visible copy, JSON-LD, `ai.txt`, robots, sitemap, legal modal, and README against owner-approved facts.

---

# Ralph loop and release gate

Run three passes after every wave:

## Pass A — specification

- Every task acceptance criterion checked.
- No unapproved content or provider claim.
- No file changed outside allowed task scope.

## Pass B — engineering

```bash
npm ci
npm run lint
npm run typecheck
npm run test:unit
npm run build
git diff --check
npm audit --omit=dev --audit-level=high
```

## Pass C — browser/accessibility/content

```bash
npm run test:e2e
npm run test:a11y
npm run validate:content
```

Inspect generated `dist/` for:

- expected static routes
- no CMS editor text
- no raw register data
- correct GitHub Pages asset paths
- no fake report/payment/booking success
- no unsupported accreditation/accuracy/security claims

Stop with a documented blocker rather than weakening a gate.

## Current known exceptions to resolve

- Six Fast Refresh warnings from generated Radix/shadcn component files.
- One moderate `qs` advisory; determine dependency path and upgrade safely.
- Legal documents remain templates until reviewed by qualified counsel and the lab owner.
- Real booking/LIS/payment/report integrations require provider contracts, credentials, privacy review, and end-to-end verification.

## Handoff

This plan is the continuation of `PLAN (3).md`. It prioritizes repository foundation and unfinished integration cleanup before the test-guide content program. Execute Wave 1 in order; do not jump to guide publication while the quality gate and approval model are incomplete.
