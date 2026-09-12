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

- Production audit command:
- Full audit date:
- Findings:
- Upgrade branch/PR:
- Verification result:
- Reviewer:
