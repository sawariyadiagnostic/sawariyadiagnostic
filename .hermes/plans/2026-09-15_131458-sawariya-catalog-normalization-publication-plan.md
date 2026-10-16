# Sawariya Diagnostic Lab Catalog Normalization and Publication Plan

**Status:** PLAN ONLY — no catalog code, source data, legal text, commit, push, or deployment is performed by this plan turn.  
**Prepared:** 2026-09-15 13:14 IST  
**Repository:** `C:\Users\Dell\Desktop\python\website-github-sync`  
**Primary future workstream:** a separate private catalog project, followed by a tightly gated website integration.

## Goal

Turn the two supplied catalog documents into a traceable, clinically and commercially reviewed catalog dataset, then publish only a small explicitly approved subset through the website without leaking raw data, internal pricing, unsafe clinical instructions, or unverified claims.

## Current context and assumptions

1. The two supplied files are source material, not approval evidence:
   - `C:\Users\Dell\AppData\Local\hermes\attachments\Sawariya_Lab_Catalog_74_Tests_Patient_Guide.md`
   - `C:\Users\Dell\AppData\Local\hermes\attachments\Sawariya_Lab_Master_Clinical_Catalog_2026-09-14.md`
2. The first document declares 74 tests and contains 74 `WEB-*` records and preparation-guide sections. The second declares 17 panels and a 74-biomarker library.
3. The current website must remain catalog-empty until individual records and packages pass approval. The current `src/data/approvedGuideManifest.ts` is empty by design.
4. `src/data/mockTests.ts` is legacy/mock catalog data. It is not a source of truth and must not be promoted into the new catalog.
5. `src/components/TestCatalog.tsx` currently imports legacy types and builds empty runtime arrays. It must not be connected to the supplied documents directly.
6. `scripts/generate-ssg.ts` currently generates approved guide pages and support assets, not test/package catalog pages. This is the safe default and must remain safe while the approved manifest is empty.
7. `catalog-workspace/approved-catalog/README.md` is intentionally empty. `catalog-workspace/raw-inventory/` is non-public and must never be imported by the browser or SSG.
8. The active checkout was observed with unrelated legal/SSG modifications on `sawariya/feat/legal-a11y-slice`. Do not use that dirty checkout for catalog implementation. Create a separate catalog worktree from the reviewed integration baseline after the legal work is reconciled.
9. No clinical statement in either attachment has been independently validated by this plan. “Validated,” “certified,” “NABL,” “ISO 15189,” “official,” “statutory,” “gold standard,” “definitive,” “clearance,” “triage,” and similar source wording are claims requiring evidence and qualified review, not facts to copy into the website.
10. The user’s future 800+ test catalog remains a separate project. This plan provides a safe pipeline that can scale to it; it does not require publishing all 74 source records now.

## Source audit findings that block direct publication

The following are observed source inconsistencies and publication risks. The implementer must preserve them as review findings rather than silently correcting them.

| Finding | Evidence | Required handling |
|---|---|---|
| The patient guide contains 74 `WEB-*` records; the master panel inclusions contain 250 ID occurrences but only 68 unique IDs. | Patient guide lines 1–2, 5–78, 82, 143, 202, 4444–4498; master lines 42–615. | Reconcile by stable ID. Do not assume an unpanelled test is obsolete or publishable. |
| Six individual records are absent from all panel inclusions: `WEB-002`, `WEB-003`, `WEB-004`, `WEB-005`, `WEB-006`, `WEB-063`. | Master panel inclusion audit, lines 42–615. | Classify each as standalone, omitted, duplicate, or unresolved after owner/laboratory review. |
| Panel 13 title says 34 parameters, while the tariff/body/inclusions say 30. | Master lines 34 and 418–464. | Block package approval until the count and name are explicitly decided. |
| Panel 15 title says 20 parameters, while the tariff/body/inclusions say 18. | Master lines 36 and 508–541. | Block package approval until resolved. |
| Panel 16 title says 16 parameters, while the tariff/body/inclusions say 15. | Master lines 37 and 545–575. | Block package approval until resolved. |
| Panel 11 describes three physical tubes plus urine but lists four vacutainer tubes. | Master lines 320–327. | Separate tube count, specimen types, and collection events; require laboratory-owner confirmation. |
| Source aliases and analytical variants are mixed into display names. | Examples include `WEB-006`, `WEB-009`, `WEB-011`, `WEB-015`, `WEB-016`, `WEB-024`, `WEB-029`, `WEB-031`, `WEB-040`; patient guide lines 440–494 and 1454–1508. | Preserve original labels and model canonical name, alias, method variant, and specimen variant separately. |
| Preparation text is not consistent across individual and panel records. | Master lines 82, 186, 210, 260, 474, 515, 552; patient guide lines 109–110, 1902–1904, 2260–2349, 2620–2622, 2652–2681, 3009–3060. | Never merge preparation instructions automatically. Require assay/laboratory/clinical review. |
| Medication and supplement instructions may cause harm if generalized. | Patient guide lines 2265–2278, 2505–2523, 2921–2934, 3041–3055, 3881–3894. | Public copy may only say to report medicines/supplements and obtain individualized instructions unless a qualified reviewer approves more. |
| Acute-care, diagnostic, and outcome language overstates what a laboratory test or panel establishes. | Patient guide lines 94–100, 2546–2548, 2605–2606, 2664–2700, 3728–3774, 4160–4197; master lines 127–157, 203–216, 381–394, 508–521, 545–575. | Hold, remove, or replace only through qualified clinical/legal review. Do not self-edit into a clinical claim. |
| The master document includes internal B2B costs, margins, floor prices, discount controls, and partner economics. | Master lines 11–38; patient guide lines 5–78 and package pricing sections. | Keep all internal economics outside public records, bundles, JSON-LD, metadata, sitemap, and browser source. |
| The source calls its floor tariff statutory and claims ISO/NABL/certified/validated status without an evidence package. | Master lines 1–14 and 617–618. | Treat as unverified. Publish only after documentary evidence and legal/quality approval of the exact wording. |
| The Platinum package says it saves over ₹5,000, while the supplied arithmetic shows ₹3,761 between retail/list value ₹10,760 and floor ₹6,999. | Master lines 320–333. | Block the promotional claim; recompute public savings from approved public prices only. |
| “MRP,” “wholesale,” “floor,” “margin,” “net profit,” and “listed value” are not interchangeable. | Both attachments; master lines 20–38. | Define price roles and audience eligibility in schema; expose only approved customer price and optionally approved listed value. |

### Required reconciliation output

The private catalog audit must emit a deterministic report containing at minimum:

```text
individual_records_declared=74
individual_records_parsed=74
panel_records_declared=17
panel_membership_occurrences=250
panel_membership_unique_ids=68
panel_only_missing_from_individual_records=0
individual_ids_not_in_any_panel=WEB-002,WEB-003,WEB-004,WEB-005,WEB-006,WEB-063
count_conflicts=PANEL-GERIATRIC-LONGEVITY-MEGA,PANEL-PREOPERATIVE-SURGICAL,PANEL-AUTOIMMUNE-ARTHRITIS-MEGA
collection_conflicts=PANEL-PLATINUM-360-MEGA
publication_status=BLOCKED
```

The exact formatting may differ, but the values and blocked state must be equivalent. The parser must preserve source line ranges and original text beside each normalized value.

## Architecture and proposed approach

Use a six-layer pipeline: **private source quarantine → normalized internal catalog → review/approval records → approved public records → generated public manifest → browser/SSG runtime**. The website will consume only the generated public manifest, never Markdown attachments, raw CSV/register data, review notes, B2B economics, or unapproved clinical prose.

Keep the catalog authoring work in a separate private project/worktree. The website repository receives only the minimum approved public export, provenance references that do not expose internal data, deterministic generated output, and tests proving the import boundary. A publication flag and per-record status must fail closed to the current empty catalog.

## Proposed file and data boundaries

### Private catalog project

Create a separate private project, for example:

```text
C:\Users\Dell\Desktop\python\sawariya-catalog-private\
├── source-material\
│   ├── Sawariya_Lab_Catalog_74_Tests_Patient_Guide.md
│   └── Sawariya_Lab_Master_Clinical_Catalog_2026-09-14.md
├── source-manifests\
│   └── source-manifest.json
├── normalized\
│   ├── tests.jsonl
│   ├── panels.jsonl
│   ├── aliases.jsonl
│   └── reconciliation-report.json
├── review\
│   ├── tests/WEB-001.md
│   ├── packages/PANEL-LFT.md
│   └── decisions/
├── schemas/
│   ├── test-record.schema.json
│   ├── package-record.schema.json
│   ├── approval-record.schema.json
│   └── public-export.schema.json
├── scripts/catalog/
│   ├── parse-source.ts
│   ├── normalize-records.ts
│   ├── reconcile-sources.ts
│   ├── validate-records.ts
│   ├── validate-pricing.ts
│   ├── build-public-export.ts
│   └── scan-public-export.ts
└── tests/catalog/
```

The private project is illustrative and must be created only after the implementer confirms where private source material may safely live. Do not commit full attachments containing internal pricing, margins, booking counts, or operational notes to the public website repository.

### Website repository

Use the existing boundaries and add only approved export artifacts:

```text
catalog-workspace/
├── approved-catalog/
│   ├── tests/                 # approved public test JSON only
│   ├── packages/              # approved public package JSON only
│   └── README.md
└── review-notes/              # no browser/SSG imports

scripts/
└── build-catalog-manifest.ts  # reads approved-catalog only

src/data/generated/
└── catalogManifest.ts         # generated, public-safe fields only

tests/unit/
├── catalog-schema.test.ts
├── catalog-manifest.test.ts
├── catalog-pricing.test.ts
├── catalog-boundary.test.ts
└── catalog-reconciliation.test.ts

tests/e2e/
└── catalog.spec.ts
```

Do not use `src/data/mockTests.ts` as the new source of truth. Retain or delete legacy data only after a reference search proves it is not needed by unrelated UI and after a focused boundary test protects the decision.

## Canonical record design

### Individual test record

The private normalized record must preserve all source fields and unresolved conflicts. The public record must be a strict projection, not a copy of the private record.

Required private field groups:

- **Identity:** `recordId`, `canonicalName`, `displayName`, `aliases`, `slug`, `recordType`, `status`.
- **Provenance:** `sourceDocument`, `sourceVersion`, `sourceHash`, `sourceLineStart`, `sourceLineEnd`, `sourceSection`, `parserVersion`, `normalizedAt`.
- **Clinical/laboratory facts:** `analyteOrMeasurement`, `department`, `category`, `specimenMatrix`, `containerType`, `containerAdditive`, `collectionMethod`, `laboratoryMethod`, `methodVariant`, `instrumentOrPlatform`, `derivedMeasurement`, `calculationFormula`, `inputTestIds`, `referenceIntervalContext`.
- **Preparation:** `fastingStatus`, `fastingMinHours`, `fastingMaxHours`, `waterAllowed`, `dietRestrictions`, `medicationInstructions`, `supplementInstructions`, `exerciseRestrictions`, `collectionWindow`, `cycleOrClinicalTiming`, `urgencyClass`.
- **Operations:** `turnaroundValue`, `turnaroundUnit`, `turnaroundExceptions`, `availabilityStatus`, `homeCollectionStatus`, `serviceAreaStatus`, `confirmationRequired`.
- **Commercial:** `currency`, `customerPriceInr`, `listedValueInr`, `b2bPriceInr`, `internalFloorPriceInr`, `wholesaleCostInr`, `discountPolicy`, `taxInclusion`, `effectiveFrom`, `effectiveTo`.
- **Claims:** original purpose text, patient-facing draft text, promotional text, claim type, claim risk, evidence references, and disposition (`approved`, `rewritten`, `blocked`, `removed`).
- **Review:** clinical, laboratory, owner, commercial, legal, privacy, editorial, and publication review objects, each with status, reviewer identity/role, timestamp, notes, evidence references, expiry/review date.
- **Change control:** revision, previous revision, change summary, withdrawal reason, and publication history.

The public projection may contain only approved fields:

```json
{
  "id": "WEB-001",
  "slug": "complete-blood-count",
  "name": null,
  "aliases": [],
  "category": null,
  "summary": null,
  "whatIsMeasured": null,
  "specimen": null,
  "preparation": null,
  "collectionTiming": null,
  "medicineNote": "Tell the lab or ordering clinician about medicines and supplements. Do not stop a prescribed medicine based on this page.",
  "turnaround": null,
  "homeCollection": null,
  "confirmationRequired": true,
  "customerPriceInr": null,
  "listedValueInr": null,
  "citations": [],
  "lastReviewedAt": null,
  "publicationStatus": "draft"
}
```

`null` fields above are deliberate. The implementer must not fill them from intuition or from the attachment merely because a plausible value exists.

### Package record

A package must reference canonical test IDs, never display-name strings:

```json
{
  "id": "PANEL-LFT",
  "slug": "liver-health-profile",
  "name": null,
  "category": null,
  "description": null,
  "includedTestIds": ["WEB-012", "WEB-013"],
  "declaredCount": null,
  "computedUniqueCount": null,
  "specimenSummary": null,
  "preparationSummary": null,
  "customerPriceInr": null,
  "listedValueInr": null,
  "publicationStatus": "draft",
  "review": {
    "owner": "pending",
    "clinical": "pending",
    "laboratory": "pending",
    "commercial": "pending",
    "legal": "pending"
  }
}
```

A package is publishable only when every referenced test is approved and published, the computed count equals the approved displayed count, specimen/preparation summaries are reconciled, public pricing is approved, and the package copy passes clinical/legal/editorial review.

## Approval state machine

Allowed states:

```text
raw → parsed → normalized → in_review → approved → published
                         ↘ rejected
approved/published → withdrawn
```

Every transition must record:

- record ID and revision;
- prior and new status;
- reviewer identity and role;
- ISO timestamp;
- decision and reason;
- evidence/source references;
- affected fields;
- next review/expiry date where applicable.

`published` is not allowed if any required review is pending, any source conflict remains unresolved, public copy contains blocked claims, or customer pricing is absent/invalid.

## Phased implementation plan

Each task below is intentionally small. For every code task, follow **RED → GREEN → REFACTOR**, run the stated command, and make a small conventional commit only after the command passes. Do not commit directly to `main`.

### Phase 0 — isolate the work and protect source material

#### Task 0.1 — Create a dedicated catalog worktree

**Scope:** no website source changes.  
**Commands:**

```bash
git -C C:/Users/Dell/Desktop/python/website-github-sync status --short --branch
git -C C:/Users/Dell/Desktop/python/website-github-sync branch --show-current
git -C C:/Users/Dell/Desktop/python/website-github-sync worktree add -b sawariya/feat/catalog-normalization C:/Users/Dell/Desktop/python/sawariya-catalog-site-worktree <reviewed-baseline>
```

**Expected output:** the original dirty checkout is unchanged; a separate worktree is created on `sawariya/feat/catalog-normalization`. Replace `<reviewed-baseline>` with the reviewed legal/integration commit; do not guess it.

#### Task 0.2 — Record the two source hashes and line counts

**Scope:** private source-manifest only.  
**Commands:**

```bash
sha256sum 'C:/Users/Dell/AppData/Local/hermes/attachments/Sawariya_Lab_Catalog_74_Tests_Patient_Guide.md'
sha256sum 'C:/Users/Dell/AppData/Local/hermes/attachments/Sawariya_Lab_Master_Clinical_Catalog_2026-09-14.md'
wc -l 'C:/Users/Dell/AppData/Local/hermes/attachments/Sawariya_Lab_Catalog_74_Tests_Patient_Guide.md'
wc -l 'C:/Users/Dell/AppData/Local/hermes/attachments/Sawariya_Lab_Master_Clinical_Catalog_2026-09-14.md'
```

**Expected output:** hashes are stored in a private manifest; line counts are approximately `4503` and `619`. If the files differ from the supplied versions, stop and obtain the new source version instead of silently replacing the manifest.

#### Task 0.3 — Add the catalog data-classification policy

**New file in private catalog project:** `docs/CATALOG-DATA-CLASSIFICATION.md`.  
Document that attachments, B2B prices, margins, booking counts, raw preparation text, review notes, and unresolved claims are private/unapproved; only approved public projections can enter the website. No code test is needed for a documentation-only file, but run:

```bash
git diff --check
```

**Expected output:** exit `0`, with no whitespace errors. Commit as `docs(catalog): define source data boundaries`.

### Phase 1 — parse without trusting or executing source prose

#### Task 1.1 — Write parser RED tests

**New file:** `tests/catalog/parse-source.test.ts` in the private catalog project.  
Test only structural behavior:

- parses 74 individual IDs;
- parses 17 panel IDs;
- preserves source line ranges;
- preserves original text;
- handles rupee symbols, Unicode punctuation, Markdown emphasis, blank lines, and malformed rows as validation errors;
- never executes embedded Markdown/HTML/script-like content.

**RED command:**

```bash
npm test -- --run tests/catalog/parse-source.test.ts
```

**Expected RED result:** the test fails because the parser module does not exist. A syntax/import error is not acceptable; fix the test setup until the failure is specifically “module/function missing.”

#### Task 1.2 — Implement the minimal source parser

**New file:** `scripts/catalog/parse-source.ts`.  
Implement a deterministic local parser using plain text processing. It must return records with `sourceDocument`, `sourceLineStart`, `sourceLineEnd`, original labels, raw values, and parse warnings. It must not call a network, an LLM, a shell, or a dynamic evaluator.

**GREEN command:**

```bash
npm test -- --run tests/catalog/parse-source.test.ts
```

**Expected output:** all parser tests pass. Commit as `feat(catalog): parse quarantined source records`.

#### Task 1.3 — Write reconciliation RED tests

**New file:** `tests/catalog/reconcile-sources.test.ts`.  
Use a tiny fixture with one omitted ID, one alias, one duplicate, and one count mismatch. Assert that the result reports conflicts instead of repairing them.

**RED command:**

```bash
npm test -- --run tests/catalog/reconcile-sources.test.ts
```

**Expected RED result:** failure because reconciliation is not implemented.

#### Task 1.4 — Implement source reconciliation

**New file:** `scripts/catalog/reconcile-sources.ts`.  
Compare individual records, panel membership, aliases, counts, specimens, preparation, methods, and pricing roles by stable ID. Emit JSON and Markdown reports. The report must explicitly contain the six guide-only IDs and the three package count conflicts listed above.

**GREEN command:**

```bash
npm run catalog:reconcile -- \
  --individual 'C:/Users/Dell/AppData/Local/hermes/attachments/Sawariya_Lab_Catalog_74_Tests_Patient_Guide.md' \
  --master 'C:/Users/Dell/AppData/Local/hermes/attachments/Sawariya_Lab_Master_Clinical_Catalog_2026-09-14.md'
```

**Expected output:** `individual_records=74`, `panels=17`, `unique_panel_tests=68`, the six omitted IDs, count conflicts for panels 13/15/16, and `publication_status=BLOCKED`. Commit as `test(catalog): report source reconciliation conflicts`.

### Phase 2 — define and validate the canonical schema

#### Task 2.1 — Write schema RED tests

**New file:** `tests/catalog/record-schema.test.ts`.  
Test that records fail for missing ID, invalid ID, missing provenance, missing reviewer audit data, inverted public prices, package references to missing tests, missing publication status, ambiguous aliases, and unsupported extra public fields.

**RED command:**

```bash
npm test -- --run tests/catalog/record-schema.test.ts
```

**Expected RED result:** failure because schemas/validators are not present.

#### Task 2.2 — Add the private schemas

**New files:**

- `schemas/test-record.schema.json`
- `schemas/package-record.schema.json`
- `schemas/approval-record.schema.json`
- `schemas/public-export.schema.json`

Use integer INR units, stable IDs, explicit status values, source locators, review objects, and separate public/internal price roles. Do not include patient data fields. Do not encode clinical truth that has not been verified.

**GREEN command:**

```bash
npm run catalog:validate -- --fixture tests/fixtures/catalog-invalid.json
npm test -- --run tests/catalog/record-schema.test.ts
```

**Expected output:** invalid fixtures fail with named field errors; valid minimal fixtures pass. Commit as `feat(catalog): define reviewable catalog schemas`.

#### Task 2.3 — Add alias and derived-measurement policy

**Files:** `schemas/test-record.schema.json`, `tests/catalog/alias-resolution.test.ts`, `review/decisions/alias-policy.md`.  
Model alias groups separately from distinct measurements. Do not merge bilirubin fractions, protein/ratio measures, BUN versus blood urea, lipid-derived ratios, or calculated eGFR merely because names are related.

**RED/GREEN command:**

```bash
npm test -- --run tests/catalog/alias-resolution.test.ts
```

**Expected output:** ambiguous aliases fail closed; each approved alias resolves to exactly one canonical ID. Commit as `feat(catalog): make alias resolution fail closed`.

### Phase 3 — normalize laboratory and patient-preparation facts

#### Task 3.1 — Create the review worksheet template

**New files in private project:**

- `review/templates/individual-test-review.md`
- `review/templates/package-review.md`
- `review/templates/claim-review.md`

Each test worksheet must include canonical name, source labels, aliases, specimen matrix, container/additive, collection method, method/platform, preparation, medication/supplement note, timing, turnaround, availability, customer price, listed value, citations, unresolved conflicts, clinical reviewer, laboratory reviewer, owner reviewer, legal reviewer, and publication decision.

**Expected verification:**

```bash
git diff --check
```

Exit `0`. Commit as `docs(catalog): add record review worksheets`.

#### Task 3.2 — Write normalization RED tests

**New file:** `tests/catalog/normalize-records.test.ts`.  
Test casing, whitespace, Unicode rupee values, separators, common aliases, source preservation, method variants, specimen variants, and `null` for unresolved fields. Assert that normalization never invents a missing method, reference range, turnaround SLA, or availability value.

**RED command:**

```bash
npm test -- --run tests/catalog/normalize-records.test.ts
```

**Expected RED result:** failure because the normalizer is missing.

#### Task 3.3 — Implement deterministic normalization

**New file:** `scripts/catalog/normalize-records.ts`.  
Normalize only representation. Preserve every original field and attach a warning when multiple values conflict. Never select one method/specimen/preparation value merely because it appears more often.

**GREEN command:**

```bash
npm run catalog:normalize -- --source-manifest source-manifests/source-manifest.json
npm test -- --run tests/catalog/normalize-records.test.ts
```

**Expected output:** normalized files are deterministic; unresolved conflicts remain listed; tests pass. Commit as `feat(catalog): normalize records with provenance`.

#### Task 3.4 — Establish clinical safety disposition rules

**File:** `review/decisions/clinical-content-policy.md`.  
Classify source statements as:

- public preparation candidate;
- laboratory-operational only;
- clinician-only interpretation;
- emergency/triage/high-risk;
- commercial/promotional;
- accreditation/quality claim;
- unsupported/unresolved.

Medication-holding, supplement-stopping, gluten-challenge, acute chest-pain, fever-triage, surgical-clearance, cancer-marker, hormone/fertility, diagnostic-threshold, and outcome claims default to blocked. Public default wording must not instruct a patient to stop a prescribed medicine.

**Expected verification:**

```bash
git diff --check
```

Exit `0`. Commit as `docs(catalog): define clinical copy review boundary`.

### Phase 4 — approve individual tests one at a time

#### Task 4.1 — Create the first review batch without publishing it

Select a small internal batch, for example CBC, HbA1c, TSH, and LFT, only as review candidates. Do not assume these are approved because they are familiar or appear in the hero illustration.

**Files:** `review/tests/WEB-001.md`, `review/tests/WEB-012.md`, `review/tests/WEB-040.md`, `review/tests/WEB-050.md`.  
Populate only verified source facts; unresolved fields remain `PENDING REVIEW` or `null`.

**Expected verification:**

```bash
npm run catalog:validate -- --path review/tests
```

Expected output: records are reviewable but `publicationStatus=review`, not `published`.

#### Task 4.2 — Record the qualified laboratory/clinical review

For each candidate, the qualified reviewer must independently confirm the actual performing method, specimen, container, preparation, reportable measurements, limitations, and safe patient wording. The reviewer must not simply sign the attachment text.

**Required evidence:** reviewer identity/role, date, exact approved fields, citations or controlled SOP references, rejected claims, and re-review date. If unavailable, keep the record blocked.

#### Task 4.3 — Record owner and commercial review

The owner must separately approve canonical public name, customer price, listed value, current availability, home-collection status, confirmation requirement, collection area, turnaround wording, and public scope. Internal B2B/wholesale/floor/margin fields remain restricted.

Use this model:

```text
public customer price = approved amount charged to the patient
public listed value   = optional approved comparison value, never below customer price
internal floor        = restricted authorization threshold, never a public price
B2B/wholesale cost    = restricted channel value, never a patient discount
```

#### Task 4.4 — Validate individual-test publication eligibility

**New test:** `tests/catalog/public-eligibility.test.ts`.  
Require clinical/laboratory, owner, commercial, legal/content, provenance, price, specimen, preparation, and publication approvals. Ensure a rejected or withdrawn test is absent from the public export.

**RED/GREEN command:**

```bash
npm test -- --run tests/catalog/public-eligibility.test.ts
```

Expected RED before implementation, then GREEN only when the validator is implemented. Commit as `test(catalog): enforce individual publication approval`.

### Phase 5 — construct and approve packages from approved tests

#### Task 5.1 — Write package referential-integrity RED tests

**New file:** `tests/catalog/package-integrity.test.ts`.  
Test missing test IDs, duplicate members, unapproved members, mismatched declared count, duplicate package IDs, circular references, invalid specimen summaries, and package publication while any member is not published.

**RED command:**

```bash
npm test -- --run tests/catalog/package-integrity.test.ts
```

Expected RED: validator missing.

#### Task 5.2 — Implement package composition validation

**New file:** `scripts/catalog/validate-packages.ts`.  
Resolve only canonical IDs. Recompute unique count, public listed value, customer savings, specimen summary, and any public count. Flag disagreements; do not overwrite source values automatically.

**GREEN command:**

```bash
npm run catalog:validate-packages -- --tests normalized/tests.jsonl --packages normalized/panels.jsonl
npm test -- --run tests/catalog/package-integrity.test.ts
```

Expected output: panels 13, 15, and 16 remain blocked until the source count decisions are recorded; tests pass. Commit as `feat(catalog): validate package membership`.

#### Task 5.3 — Resolve package count conflicts explicitly

Create decisions:

- `review/decisions/PANEL-GERIATRIC-LONGEVITY-MEGA.md`
- `review/decisions/PANEL-PREOPERATIVE-SURGICAL.md`
- `review/decisions/PANEL-AUTOIMMUNE-ARTHRITIS-MEGA.md`
- `review/decisions/PANEL-PLATINUM-360-MEGA.md`

Each decision must state the chosen count, exact included IDs, specimen/collection semantics, changed display name if needed, approving owner, qualified clinical/laboratory reviewer, and why the original conflicting value is rejected. Do not silently edit the source attachment.

#### Task 5.4 — Apply package commercial and wording review

For each package, separately approve:

- included test IDs;
- public package name;
- neutral patient-facing description;
- customer price;
- optional listed value;
- savings calculation and rounding rule;
- preparation summary;
- specimen/tube summary;
- home collection/availability wording;
- turnaround wording;
- emergency/clinical limitation wording;
- legal/editorial approval.

Block source phrases such as “fever clearance,” “gold standard,” “definitive,” “pinpoint accuracy,” “eliminates joint stiffness,” “hospital-ready surgical clearance,” “complete fertility diagnosis,” and “recommended by diabetologists” until exact evidence and qualified approvals exist.

#### Task 5.5 — Validate pricing arithmetic

**New file:** `tests/catalog/pricing.test.ts`.  
Use integer INR values and test:

```text
listedValueInr >= customerPriceInr
customerPriceInr >= internalFloorPriceInr      # internal-only check
packageListedValue = sum(approved member listed values)
publicSavings = listedValueInr - customerPriceInr
publicDiscountPercent = one documented rounded calculation
```

The source audit found that individual-test MRP sums and B2B sums reconcile to panel values arithmetically, but this does not approve the prices. It also found eight small percentage-overage/rounding cases and an unsupported “save over ₹5,000” claim for Platinum. The validator must report these, not hide them.

**RED/GREEN command:**

```bash
npm test -- --run tests/catalog/pricing.test.ts
```

Expected GREEN output: invalid/inverted/stale/ambiguous prices fail; approved fixtures pass. Commit as `test(catalog): guard public pricing arithmetic`.

### Phase 6 — generate a public-safe export while keeping the default empty

#### Task 6.1 — Write manifest RED tests

**New file:** `tests/unit/catalog-manifest.test.ts` in the website repository.  
Test that:

- an empty approved directory generates zero public tests/packages;
- draft/review/rejected/withdrawn records generate zero public records;
- only records with all approvals appear;
- packages resolve to approved test IDs;
- B2B, wholesale, floor, margin, profit, booking counts, internal notes, source paths, and raw claim text are absent;
- ordering and serialized output are deterministic.

**RED command:**

```bash
npm run test:unit -- tests/unit/catalog-manifest.test.ts
```

Expected RED until the generator and fixture boundary exist.

#### Task 6.2 — Implement the approved catalog manifest generator

**New file:** `scripts/build-catalog-manifest.ts`.  
Read only `catalog-workspace/approved-catalog/tests/` and `catalog-workspace/approved-catalog/packages/`. Validate each record, project public-safe fields, resolve package references, sort by stable ID, and write:

```text
src/data/generated/catalogManifest.ts
```

Add a manifest revision/hash, but do not include private source text or internal economics. Keep `catalogEnabled=false` or an empty approved directory as the default.

**GREEN command:**

```bash
npm run build:catalog-manifest
npm run test:unit -- tests/unit/catalog-manifest.test.ts
```

Expected output: `Built approved catalog manifest: 0 test(s), 0 package(s).` until real approvals are intentionally added. Commit as `feat(catalog): generate approved public manifest`.

#### Task 6.3 — Add raw-data/import-boundary tests

Extend `tests/unit/catalog-boundary.test.ts` or add `tests/unit/catalog-runtime-boundary.test.ts`. Scan `src/`, `scripts/`, `server.ts`, generated HTML, and bundles for:

- attachment absolute paths;
- `catalog-workspace/raw-inventory`;
- private review paths;
- B2B/wholesale/floor/margin/profit field names;
- booking counts;
- direct imports of `mockTests.ts` from public catalog runtime;
- patient-like data, report IDs, secrets, or source line dumps.

**RED/GREEN command:**

```bash
npm run test:unit -- tests/unit/catalog-runtime-boundary.test.ts
```

Expected GREEN with the manifest empty. Commit as `test(catalog): protect runtime data boundaries`.

### Phase 7 — connect the website only to the generated public manifest

#### Task 7.1 — Write a one-record fixture test before changing UI

**Fixture:** `tests/fixtures/catalog/approved-test.json` and `tests/fixtures/catalog/approved-package.json`.  
Use neutral placeholder copy and explicit review metadata. Do not use unreviewed source clinical text. Test that the UI can render one test and one package from the manifest.

**RED command:**

```bash
npm run test:unit -- tests/unit/catalog-ui-data.test.ts
```

Expected RED: current `TestCatalog.tsx` uses legacy types/empty arrays and no generated manifest adapter.

#### Task 7.2 — Add a public catalog adapter

**New file:** `src/data/catalog.ts`.  
Export public-only types and the generated manifest. No private fields or source paths may be represented in this module. Keep `siteConfig` and handoff behavior separate from catalog facts.

**GREEN command:**

```bash
npm run test:unit -- tests/unit/catalog-ui-data.test.ts
npm run typecheck
```

Expected output: fixture tests and typecheck pass. Commit as `ref(catalog): expose approved manifest types`.

#### Task 7.3 — Replace legacy catalog runtime data with the adapter

**Files:**

- `src/components/TestCatalog.tsx`
- `src/lib/search-fuse.ts`
- `src/components/ui/TestCard.tsx`
- `src/components/catalog/TestDetailModal.tsx`
- `src/data/mockTests.ts` only if reference analysis proves it can be removed or isolated.

Use the public manifest only. Remove or rewrite unsupported legacy labels such as “Preventive Care,” “Free Doorstep Home Sample,” “Book Appointment (₹...)”, and any unapproved “Clinical Overview” wording unless the approved record specifically supports them. Keep phone/WhatsApp/Cal.com as handoffs and do not imply confirmation, payment, collection, or report retrieval success.

**TDD commands:**

```bash
npm run test:unit -- tests/unit/catalog-ui-data.test.ts
npm run typecheck
```

Expected output: fixture behavior passes and no raw/legacy runtime import remains. Commit as `ref(catalog): render only approved catalog records`.

#### Task 7.4 — Implement safe search and filters

**Files:** `src/lib/search-fuse.ts`, `src/components/TestCatalog.tsx`.  
Search only approved fields: canonical name, approved aliases, category, approved purpose, specimen, preparation keywords, and package name. Do not search review notes, internal claims, raw source prose, B2B fields, patient data, or hidden records.

Required behavior:

- aliases resolve to one canonical record;
- ambiguous aliases return a clarification/no-result state;
- filters do not create indexable parameter URLs;
- empty catalog remains useful and request-first;
- no-results provides a truthful request/ask handoff;
- result counts are accurate.

**TDD commands:**

```bash
npm run test:unit -- tests/unit/catalog-search.test.ts
```

Expected output: alias, filter, empty, and no-result tests pass. Commit as `feat(catalog): add approved-record search`.

#### Task 7.5 — Build accessible canonical details

**Files:** `src/components/catalog/TestDetailModal.tsx`, `src/components/ui/TestCard.tsx`, and the new canonical route component if needed.  
A modal may be a summary, but each published record must have a canonical, directly navigable detail page. The page may show only approved fields:

- what the test measures, without diagnosis;
- specimen/container if approved;
- preparation/timing if approved;
- medicine/supplement note that does not instruct stopping treatment;
- turnaround/availability only if operationally approved;
- customer price and approved listed value;
- review date and citations;
- contact/booking handoff;
- clear limitation that results require qualified clinical interpretation.

**TDD commands:**

```bash
npm run test:unit -- tests/unit/catalog-details.test.ts
npm run test:a11y -- tests/e2e/catalog.spec.ts
```

Expected output: keyboard, focus, escape, visible disclaimer, and handoff behavior pass. Commit as `feat(catalog): add accessible catalog details`.

### Phase 8 — generate routes and SEO metadata only for published records

#### Task 8.1 — Write SSG catalog route RED tests

**File:** `tests/unit/catalog-ssg-boundary.test.ts`.  
Test empty manifest, one approved test, one approved package, withdrawn records, duplicate canonical URLs, base path `/sawariyadiagnostic/`, sitemap parity, and no raw/private text in generated HTML.

**RED command:**

```bash
npm run test:unit -- tests/unit/catalog-ssg-boundary.test.ts
```

Expected RED until the route generator is implemented.

#### Task 8.2 — Add catalog routes to `scripts/generate-ssg.ts`

Read only the generated public manifest. Add routes such as:

```text
catalog/tests/<slug>.html
catalog/packages/<slug>.html
```

Use one base-path-safe `publicUrl()` helper. Generate canonical, Open Graph, Twitter, JSON-LD, and sitemap entries from the same public record. Generate no route for draft/review/rejected/withdrawn/incomplete records. Preserve the current legal fail-closed behavior and zero-guide/zero-catalog behavior.

**GREEN commands:**

```bash
npm run build
npm run test:unit -- tests/unit/catalog-ssg-boundary.test.ts
```

Expected output: empty manifest produces no catalog routes; approved fixture produces exactly the expected routes and sitemap entries. Commit as `feat(catalog): generate approved catalog routes`.

#### Task 8.3 — Apply restrained structured data

**Files:** `scripts/generate-ssg.ts`, any shared SEO helper, and `tests/unit/catalog-schema.test.ts`.  
Use only schema matching visible content. Candidates:

- `BreadcrumbList` when breadcrumbs are visible;
- `MedicalWebPage` for a guide/detail page when appropriate;
- `MedicalTest` only where the visible page genuinely describes a medical test;
- `Product`/`Offer` only when a current customer price is visibly shown and approved;
- `LocalBusiness`/`Organization` only from verified site configuration.

Do not emit reviews, aggregate ratings, FAQPage, accreditation, accuracy, official-record, availability, or medical-outcome claims merely to improve SEO. Schema does not guarantee rankings or rich results.

**Validation commands:**

```bash
npm run build
npm run test:unit -- tests/unit/catalog-schema.test.ts
```

Expected output: valid JSON-LD with no internal fields and no schema for hidden records. Commit as `feat(catalog): align catalog schema with visible facts`.

### Phase 9 — browser, accessibility, determinism, and privacy gates

#### Task 9.1 — Add catalog browser coverage

**New file:** `tests/e2e/catalog.spec.ts`.  
Cover:

- empty catalog state;
- one-test pilot;
- three-test pilot;
- package detail and test links;
- direct navigation and refresh on nested route;
- back/forward;
- mobile viewport;
- keyboard search/filter/detail/escape;
- no-results request handoff;
- no patient-data collection;
- no false appointment/payment/report success;
- disabled/withdrawn record inaccessible by search, route, sitemap, and JSON-LD.

**Command:**

```bash
npm run build
npx cross-env PLAYWRIGHT_PRODUCTION=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:4173 playwright test tests/e2e/catalog.spec.ts --config playwright.config.ts --workers=1
```

Expected output: all catalog scenarios pass against the production artifact. Commit as `test(catalog): cover public catalog flows`.

#### Task 9.2 — Add accessibility and copy/privacy scans

Extend focused unit scans and `tests/e2e/accessibility-interactions.spec.ts` for catalog routes. Check headings, labels, focus visibility, contrast, 44px targets, language attributes, reduced motion, visible disclaimers, and no horizontal overflow.

**Commands:**

```bash
npm run test:a11y
npm run test:unit -- tests/unit/public-copy-boundary.test.ts tests/unit/catalog-runtime-boundary.test.ts
```

Expected output: accessibility and boundary suites pass with no private or unsupported catalog content.

#### Task 9.3 — Verify deterministic builds

Build twice from the same clean dependency state and compare route lists, generated manifest, HTML, sitemap, and bundle scans.

```bash
rm -rf dist
npm run build
cp -R dist /tmp/sawariya-dist-a
rm -rf dist
npm run build
python - <<'PY'
from pathlib import Path
import hashlib

def digest(root):
    return {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(root.rglob('*')) if p.is_file()}
a = digest(Path('/tmp/sawariya-dist-a'))
b = digest(Path('dist'))
assert a == b, 'dist artifacts differ between identical builds'
print(f'deterministic_artifacts={len(a)}')
PY
```

Expected output: `deterministic_artifacts=<same positive count>` and no assertion failure. If timestamps make the builds differ, remove timestamp nondeterminism from generated catalog artifacts; do not weaken the check.

#### Task 9.4 — Run the repository release gates

From the catalog website worktree:

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run test:unit
npm run validate:content
npm run build
npm run test:e2e
npm run test:a11y
git diff --check
git status --short --branch
```

Expected output: every command exits `0`; the final status contains only intentionally staged catalog changes and no source attachments, credentials, private review files, or unrelated legal modifications.

### Phase 10 — staged publication and rollback

#### Task 10.1 — Keep a catalog kill switch

Add a single configuration-controlled `catalogEnabled` flag only after the public manifest and UI are already safe with zero records. When false, render the existing empty/request-first state and generate no test/package routes, sitemap entries, or schema.

**TDD:** write `tests/unit/catalog-kill-switch.test.ts`, run it RED, implement the minimal flag, run it GREEN, then commit as `feat(catalog): add fail-closed catalog switch`.

#### Task 10.2 — Pilot exactly one approved test

Publish one individually approved test only after:

- clinical/laboratory review;
- owner approval;
- commercial approval;
- legal/editorial/privacy review;
- source provenance and citations;
- public-copy and privacy scans;
- build, SSG, browser, accessibility, and deterministic-build gates;
- rollback target recorded.

The pilot must be a real approved record, not a fixture. Record exact slug, manifest revision, commit, artifact hash, URL, reviewer decisions, and rollback target.

#### Task 10.3 — Expand to three approved tests

Add two more approved tests only if the one-record pilot has no unresolved issue. Re-run all gates and compare route lists, search results, metadata, sitemap, and artifact hashes with the one-record release.

#### Task 10.4 — Add packages only after their members are published

Start with a package whose every member is individually approved and published. Do not publish a package simply because its panel appears in the master document. Re-run count, specimen, preparation, pricing, copy, schema, and package-to-test link checks.

#### Task 10.5 — Verify rollback and withdrawal

Use a test-only staging/local release first:

```bash
# Disable the catalog flag or withdraw one record in the private review fixture.
npm run build
find dist -type f | sort | grep -E 'catalog|sitemap|index.html'
```

Expected output: the withdrawn record is absent from routes, sitemap, HTML, JSON-LD, and search; the safe empty or previous known-good state remains. Record the result before any live deployment.

## Required automated test matrix

| Area | Required assertions |
|---|---|
| Parsing | headings, IDs, tables, rupee values, Unicode, malformed rows, duplicate sections, hostile prose treated as data |
| Provenance | source hash, document, version, line range, parser version, normalization timestamp |
| Identity | unique canonical IDs, stable slugs, alias-to-one-record, ambiguous alias failure |
| Clinical/laboratory | specimen, container, method, derived value, preparation, timing, medication note, limitations are explicit or blocked |
| Package integrity | every member exists, is approved, is unique, count matches, no circular references |
| Pricing | integer INR, listed value ≥ customer price, internal floor check, recomputed savings, one rounding rule, stale/missing prices fail |
| Approval | reviewer identity/role/date/evidence required for each approval; invalid transitions fail |
| Public projection | only approved fields; no B2B, wholesale, floor, margin, profit, booking counts, private notes, source paths |
| Runtime boundary | no raw attachment paths, raw inventory, review files, legacy unapproved import, patient-like data, or secrets in source/bundles/HTML |
| UI | empty, one-record, three-record, package, alias search, filters, no-results, withdrawn, handoffs, detail links |
| Accessibility | axe, keyboard, focus, dialog escape, headings/labels, language, contrast, target size, reduced motion, mobile overflow |
| SSG | empty-safe routes, route/sitemap parity, canonical uniqueness, base path, JSON-LD validity, no draft routes |
| Determinism | two clean builds have equal generated artifact hashes and stable ordering |
| Release | exact commit, manifest revision/hash, route list, scan output, approval IDs, rollback target retained |

## Legal, privacy, and patient-facing requirements

These are publication dependencies, not wording to invent in code:

1. Do not publish a final Privacy Policy, Terms, Patient Rights statement, refund/cancellation rule, home-collection terms, grievance process, or report-assistance policy from the catalog attachments. The legal advisor must review those documents separately.
2. Catalog pages must not collect patient names, phone numbers, addresses, report IDs, medical results, or appointment details in URLs, metadata, analytics, local storage, logs, or AI-facing files.
3. WhatsApp, phone, and Cal.com remain handoffs. A click must not be presented as a confirmed appointment, collection, payment, report retrieval, dispatch, or notification.
4. Any catalog page must say that current availability, collection timing, preparation, and service scope are subject to confirmation where those facts are not controlled by the approved manifest.
5. Emergency symptoms must not be routed only to a laboratory booking CTA. Any emergency/escalation language requires qualified clinical and legal review and must not make the lab a substitute for emergency care.
6. No analytics/tracking is added in this catalog project unless the data flow is explicitly approved and the operative privacy notice matches the implementation.
7. No schema, Open Graph, sitemap, `robots.txt`, AI context file, or hidden metadata may contain a claim that is not visible and approved on the corresponding page.

## Risks, tradeoffs, and open questions

### Risks

- **Clinical harm:** incorrect fasting or medication instructions can cause unsafe behavior. Mitigation: qualified review, conservative public wording, and blocked defaults.
- **Commercial leakage:** B2B costs, margins, floor rates, booking counts, or partner economics may become public through bundles or source maps. Mitigation: separate schemas and bundle scans.
- **False authority:** accreditation, certification, accuracy, diagnostic, clearance, or specialist-endorsement language may mislead patients. Mitigation: evidence-backed claim ledger and legal/quality approval.
- **Package drift:** changing an individual price or test method can invalidate package counts, values, and preparation. Mitigation: immutable membership, derived calculations, and re-review on dependency changes.
- **SEO duplication:** generating one page per unapproved or near-duplicate test creates thin or misleading pages. Mitigation: publish only the 1–3 pilot records first and canonicalize from the approved manifest.
- **Privacy exposure:** source documents and review notes contain business-sensitive data and possibly operational counts. Mitigation: private project, public-safe projection, no raw source copy in the website repository.
- **Current-branch contamination:** unrelated legal/SSG changes are already dirty in one checkout. Mitigation: separate worktree and parent-level diff review.

### Tradeoffs

- A smaller approved catalog is less immediately comprehensive but safer and more trustworthy than publishing 74 uncertain records.
- A private catalog project adds a repository boundary, but it prevents internal pricing and raw source prose from entering a public website repository.
- Canonical IDs and explicit variants create more records than display-name deduplication, but they prevent method/specimen/derived-measurement confusion.
- Showing “confirm with lab” more often reduces marketing conversion but avoids unsupported availability, preparation, and turnaround promises.
- Static SSG routes improve crawlability only for pages that are actually approved and rendered. It does not guarantee Google indexing or rankings.

### Open questions requiring owner/qualified reviewer decisions

1. Is the full source catalog allowed to be stored in a private Git repository, or must the attachments remain outside version control with only hashes retained?
2. What is the authoritative performing laboratory method, analyzer/platform, specimen matrix, tube/additive, and report layout for each `WEB-*` record?
3. Are the six unpanelled IDs standalone tests, omitted panel members, duplicates, or retired records?
4. Which counts are correct for panels 13, 15, and 16, and is Panel 11’s urine specimen actually part of the package workflow?
5. Which values are genuinely public customer prices, and which are internal B2B, wholesale, floor, or historical values?
6. Is “MRP” legally and commercially appropriate for public display, including tax treatment?
7. Which tests and packages are currently available, home-collection eligible, referral-lab dependent, or confirmation-only?
8. What numeric turnaround policy can be truthfully published, including cutoffs, weekends, referral tests, and urgent requests?
9. Which preparation statements are approved for the exact assay and patient population? Which should be reduced to “ask the ordering clinician/lab”?
10. Who is the qualified reviewer for hematology, biochemistry, endocrine/reproductive, cardiac, infectious disease, oncology markers, pre-operative testing, and patient-facing translations?
11. Is bilingual English/Hindi content required for each published catalog page? If yes, who approves equivalent translations and reciprocal `hreflang`?
12. Is the current GitHub Pages architecture sufficient for the desired number of approved routes, or should a server-rendered platform be considered later? Do not migrate as part of the first pilot.
13. Which legal documents are operative versus draft, and what exact privacy/data flows apply to the booking, phone, WhatsApp, and report-assistance handoffs?

## Definition of done for the future catalog release

The catalog work is **not ready for website publication** until all of the following are true:

- source files are hashed, quarantined, and not exposed by the public repository/runtime;
- all 74 source records and 17 panels are reconciled by stable ID;
- six unpanelled IDs and all count/specimen/method/preparation conflicts have documented decisions;
- every published test has an approved canonical record and review evidence;
- every published package references only published tests and passes recomputed count/specimen/price checks;
- public price fields contain no B2B, wholesale, floor, margin, profit, or partner economics;
- clinical, laboratory, owner, commercial, legal/privacy, editorial, and publication approvals are recorded where required;
- unsafe medication, diagnostic, triage, clearance, outcome, accreditation, and unsupported promotional language is absent or explicitly approved;
- empty, one-record, three-record, package, withdrawal, and rollback behavior is tested;
- runtime, bundle, HTML, JSON-LD, sitemap, and metadata scans pass;
- lint, typecheck, unit tests, content validation, build, E2E, accessibility, deterministic-build, and `git diff --check` gates pass;
- a release record identifies the exact commit, manifest revision/hash, artifact hash, published URLs, approvals, and rollback target;
- live publication is performed only after the Lab Director’s explicit approval of the exact records in that release.

## Final verification command set for the implementer

Run from the isolated website worktree after each release candidate:

```bash
npm ci
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run test:unit
npm run validate:content
npm run build
npm run test:e2e
npm run test:a11y
git diff --check
git status --short --branch
```

Expected result: every command exits `0`; the approved manifest count, generated routes, sitemap, public-copy scan, privacy scan, and browser-visible catalog count match the explicit release approval. If any command fails or an approval is missing, keep the catalog disabled and retain the prior known-good website artifact.
