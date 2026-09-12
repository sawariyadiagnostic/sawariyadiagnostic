# Approved guide page and SEO contract

`TestGuidePage` renders only records from `src/data/approvedGuideManifest.ts`. The manifest is generated from approved JSON records by `scripts/build-guide-manifest.ts`.

## Route policy

- No route is generated for drafts, review records, rejected records, withdrawn records, or incomplete bilingual content.
- A guide must have both English and Hindi Markdown files, approved preparation/specimen facts, owner/clinical/legal approvals, citations, and valid price metadata before entering the manifest.
- The current manifest is intentionally empty because no guide has completed review.
- Do not add CBC, lipid, thyroid, HbA1c, KFT, or any other clinical guide until the lab owner and qualified clinical reviewer provide and approve the exact facts.

## Page requirements

Published pages provide:

- semantic `main`, `article`, headings, and language metadata
- English/Hindi navigation
- last-reviewed date
- approved Markdown content
- citations held in the manifest
- general-information disclaimer
- phone/WhatsApp appointment handoff without browser patient-data collection

When guide records exist, SSG/SEO route work must add canonical URLs, language alternates, sitemap entries, and JSON-LD only from the same approved manifest.
