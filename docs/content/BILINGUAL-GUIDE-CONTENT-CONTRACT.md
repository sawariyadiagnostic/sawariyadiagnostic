# Bilingual test-guide content contract

The public site may publish a test guide only when its structured record passes `src/content-guide-schema.ts` and `isPublishableGuide()`.

## Required record

- Stable slug
- English and Hindi titles/summaries
- English and Hindi Markdown paths under `content/test-guides/<slug>/`
- Preparation and specimen approval flags
- Clinical, owner, and legal approval records
- At least one cited source with URL and access date
- Publication state
- Last-reviewed timestamp
- Optional approved price/listed-value metadata with listed value greater than or equal to customer price

## Publication rule

A guide is public only when:

- `publication` is `published`
- preparation is approved
- specimen is approved
- clinical review is approved
- owner review is approved
- legal review is approved

Draft, review, rejected, withdrawn, incomplete, stale, or unverified guides stay outside the browser and SSG manifest.

## Validation

```bash
npm run validate:content
```

The validator accepts an empty `content/test-guides/` directory so content can be added one approved record at a time. It rejects malformed JSON, missing bilingual paths, missing citations, inverted prices, and non-publishable records.

Do not add clinical facts, reference ranges, preparation instructions, or claims without the owner/clinical review process in `docs/content/clinical-content-review-checklist.md`.
