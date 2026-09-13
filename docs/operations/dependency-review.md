# Dependency review

## Current production audit

Run:

```bash
npm audit --omit=dev --audit-level=high
```

The production audit is currently clean after the transitive `qs` resolution moved to `6.16.0` through the existing Express/body-parser boundary.

## Full development-tree audit

Run:

```bash
npm audit --json
```

The full tree may report development/build-tool advisories through Vite, esbuild, js-yaml, Vitest, and Vitest's mocker packages. These packages are not shipped in the static `dist/` runtime, but they execute in developer/CI environments and must not be ignored silently.

Current policy:

- Block production releases on high/critical production dependencies.
- Keep the full-tree audit visible in maintenance work.
- Do not use `npm audit fix --force` without a compatibility branch and complete lint/type/unit/browser/build verification.
- Upgrade Vite/Vitest together because the current application is on Vite 5 and latest Vitest requires a newer Vite major.
- Prefer a planned major-toolchain task over a forced lockfile rewrite.
- Review Dependabot pull requests with the full quality workflow before merge.

## Review record

- Production audit command: `npm audit --omit=dev --audit-level=high` — 0 vulnerabilities, exit 0 (2026-09-13).
- Full audit date: 2026-09-13T12:35:12+05:30; initial `npm audit --json` reported 6 development-tree vulnerabilities (3 moderate, 2 high, 1 critical). After the compatible `js-yaml` patch, the current full audit reports 5 (3 moderate, 1 high, 1 critical).
- Findings: `GHSA-2883-xcg3-v3hh` (`js-yaml`, `node_modules/js-yaml`, high) was remediated from 4.3.1 to 4.3.2 without a major toolchain change. Remaining findings are `GHSA-4w7w-66w2-5vf9` and `GHSA-fx2h-pf6j-xcff` (Vite, `node_modules/vite`, moderate/high), `GHSA-v6wh-96g9-6wx3` (Vite/launch-editor path, `node_modules/vite`, moderate), `GHSA-67mh-4wv8-2f99` (esbuild, `node_modules/vite/node_modules/esbuild`, moderate), and `GHSA-5xrq-8626-4rwp` plus `GHSA-82fw-gwwq-j7x9` (Vitest/@vitest/mocker, `node_modules/vitest` and `node_modules/@vitest/mocker`, critical/moderate). npm reports only breaking fixes: `vite@8.3.0` and `vitest@5.0.0`; no force fix was applied. These are development/CI-tooling paths, not production dependencies, but remain release-maintenance risk.
- Upgrade branch/PR: None. Plan a separate Vite/Vitest major-toolchain upgrade with compatibility review, test/browser/build verification, and the corresponding esbuild/vite-node remediation.
- Verification result: `npm audit fix --dry-run` proposed only the compatible `js-yaml 4.3.1 => 4.3.2` change plus force-only Vite/Vitest major upgrades; `npm ls --all` completed without dependency-tree problems. Full post-edit gates are recorded in the task result.
- Reviewer: automated audit — human review pending.
