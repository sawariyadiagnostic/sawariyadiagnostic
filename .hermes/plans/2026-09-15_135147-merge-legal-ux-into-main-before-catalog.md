# Merge Legal and Patient-UX Work into `main` Before Catalog Work

**Status:** PLAN ONLY — no merge, commit, push, deployment, source edit, stash, reset, or
catalog implementation is performed in this turn.

**Prepared:** 2026-09-15 13:51 IST  
**Repository:** `C:\Users\Dell\Desktop\python\website-github-sync`  
**Next workstream:** merge and verify the already-implemented legal/privacy/visitor UX slices;
only after that release is stable, begin the separate test/package catalog project.

## Goal

Integrate the reviewed legal, privacy, SSG, and visitor-UX commits into `main` without duplicating
patches or losing the existing hero, team, favicon, operating-hours, and public-boundary work, then
verify the live-facing artifact before starting catalog implementation.

## Current context and assumptions

### Confirmed Git state

The live repository inspection found:

| Ref/worktree | Current state | Meaning |
|---|---|---|
| `main` / `origin/main` | `33c3f52` | Known-good live hero restoration baseline. |
| `sawariya/feat/patient-legal-ux-enhancement` | `e38c62b` plus two uncommitted files | Cleanest integration candidate after its uncommitted dependency repair is handled. |
| `sawariya/feat/legal-a11y-slice` | `ee08a14` plus dirty and untracked files | Active checkout is dirty and contains a partial/duplicate legal slice; do not merge from it. |
| `sawariya/feat/visitor-ux-slice-v2` | `2673b5e` | Agent branch whose patch is already represented by `165a07a` on the integration candidate. |
| `sawariya/feat/legal-ssg-slice-v2` | `0ca7b24` | Agent branch whose patch is already represented by `e38c62b` on the integration candidate. |
| `sawariya/feat/visitor-ux-slice` | `33c3f52` | Historical/empty branch at the main baseline; no visitor slice to merge. |
| `sawariya/feat/legal-ssg-slice` | `33c3f52` | Historical/empty branch at the main baseline; no SSG slice to merge. |

`git rev-list --left-right --count main...sawariya/feat/patient-legal-ux-enhancement` returned
`0 5`, so the candidate is a linear descendant of `main` by five commits:

```text
36cf677  fix(privacy): tighten public trust boundaries
946bf68  feat(legal): add fail-closed document metadata contract
41ef696  fix(legal): clarify draft status and dialog interactions
165a07a  fix(visitor): make empty catalog request-first
e38c62b  fix(ssg): gate legal routes behind publication approval
```

The candidate is therefore eligible for a fast-forward integration after its dirty working-tree
repair. No merge conflict is expected when this exact ancestry is preserved.

### Dirty worktrees that must be preserved

The active root checkout `C:\Users\Dell\Desktop\python\website-github-sync` is on
`sawariya/feat/legal-a11y-slice` and currently contains:

```text
M  scripts/generate-ssg.ts
M  src/data/approvedGuideManifest.ts
?? .hermes/
?? scripts/legal-publication.ts
?? tests/e2e/legal-pages.spec.ts
```

Do not run `git clean`, `git reset --hard`, `git stash --include-untracked`, branch switching, or
file restoration in this checkout. The merge must happen in a new clean worktree so these files
remain recoverable and untouched.

The clean integration worktree at
`C:\Users\Dell\Desktop\python\patient-legal-ux-integration` is on the candidate branch and
contains:

```text
M  package.json
M  src/data/approvedGuideManifest.ts
```

The `src/data/approvedGuideManifest.ts` content has the same Git blob hash as `main`; the observed
change is line-ending/worktree noise, not a catalog or guide data change. The `package.json` change
aligns `cross-env` from `^7.0.3` to `^10.1.0`, matching the committed lockfile resolution and
must be handled before the candidate is merged.

### Work explicitly excluded from this merge

- The two catalog attachments and all catalog parsing/package work.
- `catalog-workspace/raw-inventory/` and any future source-material copies.
- The previous catalog plan’s implementation.
- Final legal prose or operative legal policies; the current legal records remain draft/review-gated.
- Any duplicate cherry-pick of `ee08a14`, `2673b5e`, or `0ca7b24`.
- Any unrelated remote branches, automated Bolt/Sentinel branches, or old palette branches.
- Deployment settings changes.

## Architecture / proposed approach

Use the already-reviewed patient/legal integration branch as the single source of truth, repair its
manifest/lockfile state, and fast-forward a fresh `main` worktree to that candidate. Do not merge
individual agent branches one at a time: patch-equivalent commits already exist in the candidate,
and cherry-picking them again creates duplicate history and avoidable conflicts.

Run the complete quality and production-browser gates on the merged result, inspect the generated
artifact and local patient-facing behavior, then push `main` only after the merged artifact is
verified. Keep the catalog disabled/empty and start catalog work later from the verified new `main`
commit in a separate worktree.

## Merge inventory and duplicate protection

### Commits to include through the candidate branch

The following five commits are already in the candidate branch and should arrive together:

```text
36cf677  privacy boundary
946bf68  legal document metadata contract
41ef696  draft legal dialog/a11y behavior
165a07a  request-first visitor UX
 e38c62b  approval-gated legal SSG/base-path behavior
```

`165a07a` is the candidate’s cherry-picked equivalent of the visitor-v2 work at `2673b5e`.
`e38c62b` is the candidate’s integrated legal-SSG-v2 result based on `0ca7b24`.

### Commits/branches not to cherry-pick

`ee08a14` and `41ef696` have the same patch ID. Verify before implementation with:

```bash
for c in 41ef696 ee08a14; do
  printf '%s ' "$c"
  git show "$c" --format= --binary | git patch-id --stable | cut -d' ' -f1
done
```

**Expected result:** both lines have the same patch ID. Keep `41ef696` through the candidate; do
not cherry-pick `ee08a14`.

Do not separately cherry-pick `2673b5e` or `0ca7b24`; the candidate already contains their
integrated equivalents. Do not merge `sawariya/feat/visitor-ux-slice` or
`sawariya/feat/legal-ssg-slice`; both currently point at `33c3f52`.

## Step-by-step implementation tasks

### Phase 0 — Freeze the dirty work and create a safe merge location

#### Task 0.1 — Record the dirty root state without changing it

Run from any repository checkout:

```bash
git -C C:/Users/Dell/Desktop/python/website-github-sync status --short --branch
git -C C:/Users/Dell/Desktop/python/website-github-sync worktree list --porcelain
```

**Expected output:** the root remains on `sawariya/feat/legal-a11y-slice` with the five listed dirty
paths; `patient-legal-ux-integration` remains registered. Do not stage or restore any root files.

#### Task 0.2 — Confirm the candidate ancestry

```bash
git -C C:/Users/Dell/Desktop/python/website-github-sync merge-base --is-ancestor \
  main sawariya/feat/patient-legal-ux-enhancement
printf 'ancestor_check_exit=%s\n' "$?"
git -C C:/Users/Dell/Desktop/python/website-github-sync rev-list \
  --left-right --count main...sawariya/feat/patient-legal-ux-enhancement
```

**Expected output:** `ancestor_check_exit=0` and `0 5` before the dependency repair commit.
If either result differs, stop and re-audit the graph; do not use `--force`, rebase, or cherry-pick
blindly.

#### Task 0.3 — Create a fresh `main` merge worktree

The root checkout is dirty and must not be switched to `main`. Because `main` is not currently
checked out by another worktree, create this clean worktree:

```bash
test ! -e C:/Users/Dell/Desktop/python/website-main-legal-merge || {
  printf '%s\n' 'Refusing to reuse existing merge worktree; inspect it first.' >&2
  exit 1
}
git -C C:/Users/Dell/Desktop/python/website-github-sync worktree add \
  C:/Users/Dell/Desktop/python/website-main-legal-merge main
cd C:/Users/Dell/Desktop/python/website-main-legal-merge
git branch --show-current
git rev-parse HEAD
git status --short --branch
```

**Expected output:** branch `main`, HEAD `33c3f5260da9ee8d1a65f393db4183d21867a56f`, and a
clean status. If the worktree is not clean, remove nothing; stop and inspect the path.

#### Task 0.4 — Create a local rollback reference

In the clean `main` worktree:

```bash
git branch backup/main-before-legal-ux main
git show-ref --verify refs/heads/backup/main-before-legal-ux
```

**Expected output:** the backup ref resolves to `33c3f52`. Do not delete this reference until the
merged site has passed all gates and live deployment verification.

### Phase 1 — Repair the candidate branch without touching catalog or legal content

#### Task 1.1 — Verify the candidate’s generated manifest change is non-semantic

In `C:\Users\Dell\Desktop\python\patient-legal-ux-integration`:

```bash
cd C:/Users/Dell/Desktop/python/patient-legal-ux-integration
git diff -- src/data/approvedGuideManifest.ts
git show main:src/data/approvedGuideManifest.ts | git hash-object --stdin
git hash-object src/data/approvedGuideManifest.ts
```

**Expected output:** the worktree diff is line-ending-only or empty, and both blob hashes match
`030a10ed4bac1c0faebcde0830c6bcbad7abec7c`. Restore only this generated file:

```bash
git restore --source=HEAD -- src/data/approvedGuideManifest.ts
git status --short --branch
```

**Expected output:** `src/data/approvedGuideManifest.ts` is no longer modified. Do not manually
rewrite the generated file or add a guide fixture.

#### Task 1.2 — Verify the lockfile already resolves the manifest’s `cross-env`

```bash
node -e "const p=require('./package.json'); const l=require('./package-lock.json'); console.log('manifest='+p.devDependencies['cross-env']); console.log('lockfile='+l.packages['node_modules/cross-env'].version)"
git diff -- package-lock.json
```

**Expected output:**

```text
manifest=^10.1.0
lockfile=10.1.0
```

and no `package-lock.json` diff. If the lockfile differs, stop and resolve the lockfile from the
candidate branch rather than guessing a version.

#### Task 1.3 — Commit only the dependency-manifest correction

Before committing, verify the branch and staged scope:

```bash
git branch --show-current
git diff --check
git add package.json
git diff --cached --stat
git diff --cached -- package.json
```

**Expected output:** branch `sawariya/feat/patient-legal-ux-enhancement`; only `package.json` is
staged; the only change is `cross-env` `^7.0.3` → `^10.1.0`.

Commit using the repository’s commit conventions:

```bash
git commit -m "build(deps): Align cross-env with lockfile" \
  -m "Keep the manifest consistent with the committed cross-env 10.1.0 resolution so clean installs and Windows production browser gates use the same dependency graph."
```

**Expected output:** one new commit on the candidate branch, with no `src/data/approvedGuideManifest.ts`
change. If the commit skill requires its configured AI attribution footer, apply that footer
according to the loaded commit skill; do not add unrelated text.

#### Task 1.4 — Verify the repaired candidate is clean

```bash
git status --short --branch
git diff --check
git log --oneline --decorate -7
```

**Expected output:** clean candidate worktree; the new dependency commit is immediately above
`e38c62b`; no untracked files. The root dirty `legal-a11y-slice` worktree must remain unchanged.

### Phase 2 — Pre-merge review and fast-forward integration

#### Task 2.1 — Review the complete candidate diff against `main`

From the clean `main` merge worktree:

```bash
cd C:/Users/Dell/Desktop/python/website-main-legal-merge
git diff --name-status main..sawariya/feat/patient-legal-ux-enhancement
git diff --stat main..sawariya/feat/patient-legal-ux-enhancement
git diff --check main..sawariya/feat/patient-legal-ux-enhancement
```

**Expected output:** the legal/privacy/visitor/SSG files and the dependency manifest are the only
changes. There must be no catalog attachment, raw-register import, credential, patient data, or
unrelated branch content.

Review these important files explicitly:

```text
.env.example
CONTENT-PUBLICATION-POLICY.md
LEGAL-OPERATIONAL-READINESS.md
docs/legal/README.md
docs/legal/approval-ledger.md
scripts/generate-ssg.ts
scripts/legal-publication.ts
src/data/legal-document-index.ts
src/components/Hero.tsx
src/components/TestCatalog.tsx
src/components/Footer.tsx
src/components/ui/LegalModal.tsx
src/components/ui/ReportDownloadModal.tsx
tests/e2e/legal-pages.spec.ts
tests/unit/legal-publication-boundary.test.ts
tests/unit/privacy-boundary.test.ts
tests/unit/ssg-legal-boundary.test.ts
```

#### Task 2.2 — Confirm the fast-forward remains conflict-free

```bash
git merge-base --is-ancestor main sawariya/feat/patient-legal-ux-enhancement
printf 'ancestor_check_exit=%s\n' "$?"
git merge-tree main sawariya/feat/patient-legal-ux-enhancement | grep -E '^(<<<<<<<|=======|>>>>>>>|CONFLICT)' || true
```

**Expected output:** `ancestor_check_exit=0` and no conflict-marker lines. An empty conflict scan is
not permission to merge a different branch; verify the exact candidate name first.

#### Task 2.3 — Fast-forward local `main`; do not create a synthetic merge commit

```bash
git merge --ff-only sawariya/feat/patient-legal-ux-enhancement
git branch --show-current
git rev-parse HEAD
git status --short --branch
```

**Expected output:** branch `main`, HEAD equal to the dependency-repaired candidate tip, and a
clean status. `--ff-only` must succeed. If it fails, stop; do not use `git merge`, `git rebase`,
`git cherry-pick`, or `git reset` as a workaround until the graph is re-read.

### Phase 3 — Conflict protocol if the graph unexpectedly changes

This phase is only used if Task 2.3 fails or a future candidate is not a descendant of `main`.
The current inspected graph predicts no conflict.

#### Task 3.1 — Stop and classify the conflict

```bash
git status
 git diff --name-only --diff-filter=U
 git diff --cc -- scripts/generate-ssg.ts src/components/TestCatalog.tsx \
  src/components/Hero.tsx src/components/Footer.tsx
```

Do not resolve all files with `--ours` or `--theirs`. Preserve the user’s dirty root worktree
outside this merge worktree.

#### Task 3.2 — Apply file-specific resolution rules

- **`scripts/generate-ssg.ts`:** retain the candidate’s legal publication filter and
  base-path-safe `publicUrl()`. Do not reintroduce old test/package SSG generation, legal routes
  from draft metadata, or duplicate metadata blocks.
- **`src/data/legal-document-index.ts` and `scripts/legal-publication.ts`:** retain the candidate’s
  eight-key, draft-by-default, approval-required contract. Do not publish prose or change all
  drafts to published.
- **`src/components/TestCatalog.tsx`:** retain one truthful request-first empty state and WhatsApp
  handoff. Do not restore dead “Find Test,” portal, doctor, or fake booking labels.
- **`src/components/Hero.tsx`:** retain the illustrative Hb/TSH/Glucose preview and the existing
  approved `24 HRS OPEN` presentation. Only the visitor CTA wording may change as represented by
  the candidate.
- **`src/components/Footer.tsx`:** retain draft/review-required legal labels and the candidate’s
  confirmation wording; do not turn a draft into an operative policy.
- **`.env.example`:** retain removal of the browser-visible Web3Forms access-key placeholder.
- **`src/data/approvedGuideManifest.ts`:** keep the empty generated manifest; do not add a guide.
- **Tests:** preserve assertions for all of the above; update a test only if the intended behavior
  is explicitly unchanged and the conflict is formatting-only.

After each actual conflict repair, run the smallest affected test first. If a conflict changes
behavior rather than formatting, follow RED → GREEN → REFACTOR and add a focused regression test
before continuing.

### Phase 4 — Fresh verification on merged `main`

All commands in this phase run from:

```text
C:\Users\Dell\Desktop\python\website-main-legal-merge
```

#### Task 4.1 — Install from the committed dependency graph

```bash
npm ci --ignore-scripts --legacy-peer-deps
```

**Expected output:** exit `0`, dependencies installed from `package-lock.json`, and no manifest/lock
mismatch. If npm cache corruption recurs, run `npm cache verify` once, then retry with the same
command; do not change source files to work around installation.

#### Task 4.2 — Run focused legal/privacy/visitor tests first

```bash
npm run test:unit -- \
  tests/unit/privacy-boundary.test.ts \
  tests/unit/legal-publication-boundary.test.ts \
  tests/unit/ssg-legal-boundary.test.ts \
  tests/unit/catalog-boundary.test.ts \
  tests/unit/public-copy-boundary.test.ts
```

**Expected output:** exit `0`; all selected tests pass; legal metadata remains draft-only; the
catalog remains empty/request-first; no browser-visible credential placeholder or unsupported
handoff label is present.

#### Task 4.3 — Run the repository static gates

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run validate:content
git diff --check
```

**Expected output:** every command exits `0`. Existing non-blocking lint warnings may be recorded,
but no new error is acceptable.

#### Task 4.4 — Run the full unit suite

```bash
npm run test:unit
```

**Expected output:** exit `0`, zero failed tests. The current candidate baseline previously reported
41 passing unit tests; record the fresh count rather than assuming it remains 41.

#### Task 4.5 — Build the production artifact

```bash
npm run build
```

**Expected output:** exit `0`; guide count remains zero; catalog routes remain zero; the SSG log
reports no generated legal routes and produces `dist/404.html`, `dist/sitemap.xml`, and OG assets.
The build must not contain source attachment paths or raw inventory imports.

#### Task 4.6 — Inspect the built route and metadata boundary

```bash
test ! -e dist/privacy.html
test ! -e dist/terms.html
test ! -e dist/patient-rights.html
! grep -Eiq 'privacy|terms|patient-rights|home-collection|report-assistance|accessibility|grievance|external-services' dist/sitemap.xml
! grep -RIlE 'raw-inventory|Sawariya_Lab_Catalog_74_Tests|Sawariya_Lab_Master_Clinical|VITE_WEB3FORMS_ACCESS_KEY|web3forms' dist
printf '%s\n' 'built-boundary-check=pass'
```

**Expected output:** `built-boundary-check=pass`; draft legal keys do not appear in the sitemap or
route files. If the first `grep` matches a legitimate visible word in a non-route asset, inspect
the matching file and narrow the assertion rather than deleting valid content.

#### Task 4.7 — Run production smoke, accessibility, and legal-route browser tests

```bash
npm run test:e2e
npm run test:a11y
npx cross-env PLAYWRIGHT_PRODUCTION=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:4173 \
  playwright test tests/e2e/legal-pages.spec.ts --config playwright.config.ts --workers=1
```

**Expected output:** each command exits `0`; smoke passes; accessibility passes; legal-route tests
return 404 for draft legal pages and find no draft legal prose in the sitemap or unknown-route
response. The current candidate baseline reported smoke `1/1`, accessibility `8/8`, and legal
route `2/2`; use fresh counts as the evidence.

### Phase 5 — Confirm the visible product effect locally

#### Task 5.1 — Verify the visitor-facing behavior against the production artifact

Use the production browser suite or a local browser at `http://127.0.0.1:4173/` and verify:

- the illustrative `Hemoglobin (Hb)`, `Thyroid (TSH)`, and `Fasting Glucose` preview remains;
- the catalog presents one request-first WhatsApp path while empty;
- the catalog does not present dead search success, patient portal, doctor consultation, or `24x7`
  service labels;
- report assistance remains a contact handoff and does not imply stored report retrieval;
- phone, WhatsApp, and Cal.com remain handoffs rather than confirmation/payment/report success;
- footer legal links say draft/review required;
- legal routes are not generated while all eight legal documents are draft;
- team roles, favicon/manifest, walk-in wording, and the approved `24 HRS OPEN` wording from
  `33c3f52` remain present where expected.

**Expected result:** the merged site shows the intended patient-facing changes while retaining the
previously approved visual and brand work. Any mismatch becomes a regression issue before push.

#### Task 5.2 — Run exact copy regressions for preserved and removed labels

```bash
git grep -nEi 'Patient Lab Portal|WhatsApp Doctor Consultation|Chat with Doctor|Call 24[*/:]?7 Helpline' -- \
  ':!catalog-workspace/**' ':!docs/**' ':!\.hermes/**' || true
git grep -nEi 'Illustrative test preview|Hemoglobin \(Hb\)|Thyroid \(TSH\)|Fasting Glucose|24 HRS OPEN' -- \
  src/components public index.html
```

**Expected output:** the first command returns no unsupported label matches; the second returns
expected preserved hero/hours matches. Do not remove the hero visual merely to satisfy a broad
claim scan; it is explicitly illustrative and was restored in `33c3f52`.

### Phase 6 — Finalize the local `main` integration

#### Task 6.1 — Review the final local history and status

```bash
git status --short --branch
git log --oneline --decorate -8
git diff --stat backup/main-before-legal-ux..HEAD
git diff --check backup/main-before-legal-ux..HEAD
```

**Expected output:** branch `main`, clean status, the five legal/privacy/visitor/SSG commits plus
the dependency alignment commit in history, and no catalog source changes. Keep the backup branch
and all agent branches for audit until live verification is complete.

#### Task 6.2 — Verify the local main ref matches the intended candidate

```bash
git merge-base --is-ancestor backup/main-before-legal-ux HEAD
printf 'baseline_is_ancestor_exit=%s\n' "$?"
git merge-base --is-ancestor sawariya/feat/patient-legal-ux-enhancement HEAD
printf 'candidate_is_ancestor_exit=%s\n' "$?"
```

**Expected output:** both exit values are `0`. The first confirms no history rewrite; the second
confirms all candidate commits reached local `main`.

### Phase 7 — Push and verify GitHub Pages only after local gates pass

This phase is executed only when the user authorizes the already-verified local merge to affect
GitHub and the live site.

#### Task 7.1 — Push the fast-forwarded `main`

```bash
git push origin main
```

**Expected output:** push succeeds without force. Never use `git push --force` or rewrite `main`.

#### Task 7.2 — Verify the remote ref and workflow result

```bash
git fetch origin main
git rev-parse HEAD
git rev-parse origin/main
gh run list --branch main --limit 5
```

**Expected output:** local HEAD equals `origin/main`; the quality/deploy workflow for the new main
commit completes successfully. If a workflow is still running, use its returned run ID with:

```bash
gh run watch <RUN_ID> --exit-status
```

Do not claim deployment success from a push response alone.

#### Task 7.3 — Verify the live artifact after Pages deployment

```bash
curl -I https://sawariyadiagnostic.github.io/sawariyadiagnostic/
curl -fsS https://sawariyadiagnostic.github.io/sawariyadiagnostic/sitemap.xml \
  | grep -E 'sawariyadiagnostic.github.io/sawariyadiagnostic/'
for route in privacy terms patient-rights home-collection report-assistance accessibility grievance external-services; do
  code=$(curl -s -o /dev/null -w '%{http_code}' \
    "https://sawariyadiagnostic.github.io/sawariyadiagnostic/${route}.html")
  printf '%s=%s\n' "$route" "$code"
done
```

**Expected output:** homepage and sitemap return HTTP `200`; each draft legal route returns `404`;
the sitemap contains the canonical homepage and no draft legal URLs. Use a direct production-browser
check for the hero preview, request-first catalog, and draft labels before reporting live success.

### Phase 8 — Handoff to the separate catalog project

Only after Phase 7 passes:

1. Create a new catalog worktree from the verified `main` commit, not from the dirty legal-a11y
   checkout and not from an older agent branch.
2. Use the separate catalog plan:
   `.hermes/plans/2026-09-15_131458-sawariya-catalog-normalization-publication-plan.md`.
3. Keep the public catalog empty until the private source reconciliation, individual review, package
   integrity, clinical/laboratory review, owner/commercial approval, legal/privacy review, public
   projection, manifest generation, and staged 1→3 pilot all pass.
4. Do not add the two attachment documents to the public website repository or import them into
   `src/`, `scripts/generate-ssg.ts`, browser bundles, or metadata.
5. Do not mix catalog commits into the legal merge. The catalog receives its own branch, review,
   commits, release gates, and rollback target.

## Tests and validation strategy

### TDD rule for any merge repair

The merge itself is integration work, not new application behavior. If a conflict or repair changes
behavior:

1. Add one focused failing test in the affected existing test file or a new focused test.
2. Run only that test and confirm it fails for the intended missing behavior.
3. Make the smallest source change.
4. Run the focused test and confirm it passes.
5. Run the full unit suite and relevant browser suite.
6. Commit the logical repair separately before retrying the merge.

Do not weaken existing boundary tests to make the merge pass.

### Required gate order

```text
candidate repair
→ ancestry and diff review
→ fast-forward local main
→ clean install
→ focused unit tests
→ lint/typecheck/content validation
→ full unit suite
→ production build
→ built-artifact boundary scan
→ smoke/accessibility/legal browser tests
→ visible UX review
→ local status/history review
→ push
→ CI/Pages verification
→ live HTTP/browser verification
```

### Acceptance criteria

The merge is ready for the catalog phase only when:

- local `main` is the fast-forwarded candidate plus the required dependency-manifest commit;
- the dirty `sawariya/feat/legal-a11y-slice` checkout remains untouched and recoverable;
- no duplicate legal or visitor commits were cherry-picked;
- all legal metadata remains draft-only and no legal SSG route/sitemap entry exists;
- visitor UX is request-first and truthful;
- report assistance is contact-only;
- no Web3Forms/browser credential placeholder remains;
- hero Hb/TSH/Glucose illustration, team roles, favicon/manifest, and approved hours wording remain;
- unit, lint, typecheck, content, build, smoke, accessibility, and legal-route tests pass freshly;
- the generated `dist/` artifact contains no raw source attachments, private review paths, or internal
  catalog data;
- if pushed, remote `main`, CI, GitHub Pages, homepage, sitemap, draft legal route responses, and
  live browser behavior have all been read back and verified;
- the separate catalog workstream has not yet published any tests/packages.

## Risks, tradeoffs, and open questions

### Risks and mitigations

- **Dirty-checkout loss:** switching or cleaning the current legal-a11y checkout could destroy
  uncommitted work. Mitigation: never switch it; merge from a fresh `main` worktree.
- **Duplicate patch history:** cherry-picking agent branches after their changes are already in the
  candidate can duplicate legal/visitor patches. Mitigation: use ancestry and patch-ID checks, then
  `git merge --ff-only` once.
- **Generated-file noise:** line-ending changes in `src/data/approvedGuideManifest.ts` can create a
  false catalog/guide diff. Mitigation: compare blob hashes and restore only the generated file
  after confirming no semantic difference.
- **Dependency mismatch:** `package.json` previously declared `cross-env ^7.0.3` while the lockfile
  resolved `10.1.0`. Mitigation: commit the manifest alignment before clean installation.
- **Legal overpublication:** metadata may be mistaken for final legal prose. Mitigation: retain
  draft state, fail-closed SSG filtering, 404 route tests, and no final policy text.
- **UX regression:** claim cleanup could accidentally remove the illustrative hero or handoff paths.
  Mitigation: explicit smoke/copy assertions for Hb/TSH/Glucose, WhatsApp, phone, and Cal.com.
- **Premature catalog scope:** merging catalog work with legal work increases conflict and review
  surface. Mitigation: stop after the stable main release and create a new catalog worktree.

### Open questions

1. After local verification, should the implementation push `main` immediately, or stop before the
   external GitHub/Pages side effect for owner review?
2. Should the preserved `backup/main-before-legal-ux` branch remain indefinitely for audit, or be
   removed after the first successful live verification?
3. Is the `cross-env` manifest alignment intended to be included in the same release as the legal/UX
   merge? This plan assumes yes because it fixes the clean-install lockfile mismatch.
4. Does the owner want the dirty `sawariya/feat/legal-a11y-slice` branch preserved as an archival
   worktree after the candidate is merged, or cleaned up only after explicit review?

## Rollback procedure

### Before push

If local verification fails before push, do not reset the dirty root checkout. In the clean `main`
merge worktree, restore the local branch to the preserved baseline only if necessary:

```bash
git status --short --branch
git reset --hard backup/main-before-legal-ux
```

This command is permitted only in the disposable clean merge worktree after confirming the backup
ref. Do not run it in `website-github-sync` or `patient-legal-ux-integration`.

### After push

Do not rewrite remote history. Create a normal revert commit after confirming the incident scope:

```bash
git revert --no-edit backup/main-before-legal-ux..HEAD
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run test:unit
npm run build
git push origin main
```

Then verify CI, Pages, homepage, sitemap, and the affected routes again. Keep the legal/catalog
branches and approval evidence intact for correction rather than deleting history.
