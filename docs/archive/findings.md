# Repository Findings

Audited GitHub commit `fe7b5226796c1fb899b863ffdae49ad85295514f`.

## Current system
React 18/TypeScript/Vite/Tailwind/Radix UI; Express server; SSG routes; local TypeScript catalog; localStorage “database”; simulated CMS webhook; simulated payments; mock LIS report fallback; unprotected CMS UI; no verified auth, audit, rate limits, idempotency, webhook signature validation, or durable queue.

## High-risk findings
1. Success can be shown without durable record.
2. Client-side payment can fabricate success.
3. Report endpoint can return `example.com` mock URL.
4. Seeded health data lives in browser storage.
5. CMS is not authenticated source of truth.
6. Business facts and claims are scattered literals.
7. Static GitHub Pages cannot safely hold LIS secrets or process PHI.

## Product boundary
Patient portal plus operations/integration layer; LIS remains clinical system of record.
