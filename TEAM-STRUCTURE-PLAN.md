# Sawariya Diagnostic Lab — Role-Based Team Presentation Plan

## Decision

Replace the current named-person cards with a role-based laboratory structure. Do not publish personal names, portraits, or individual qualifications until the lab explicitly approves them.

The public section should communicate operational depth and quality ownership without revealing who is currently operating the laboratory.

## Public information architecture

### Section label

`Laboratory Team & Quality Structure`

### Headline

`A quality system built around accountable roles.`

### Supporting copy

`Our work is organized across clinical oversight, quality management, technical operations, logistics, and trained sample-collection teams. Each stage has a defined responsibility before a report reaches the patient.`

Avoid:

- “Led by Experienced Medical Specialists” unless named/verified specialists are actually shown.
- “Every report is signed by qualified pathologists” unless that is operationally true for every public workflow.
- Personal names, portraits, social profiles, or external avatar services.

## Hierarchy

### Tier 1 — Clinical and laboratory governance

Display as the highest visual tier with larger cards or a horizontal governance band:

1. `Pathology Oversight`
   - Public wording: `Clinical interpretation and pathology oversight`
   - Count: `Two pathology oversight roles` only if the lab confirms this wording.
   - Do not publish names until approved.

2. `Laboratory Director`
   - Public wording: `Laboratory direction, accountability, and patient-safety standards`

3. `Quality Manager`
   - Public wording: `Quality documentation, internal checks, and process consistency`

4. `Technical Manager`
   - Public wording: `Technical workflow, instrumentation, and result integrity`

5. `Logistics Manager`
   - Public wording: `Collection coordination, sample movement, and delivery continuity`

The user specifically mentioned two pathologists, a laboratory director, one quality manager, one technical manager, and one logistics manager. Publish the counts only after owner confirmation. Role labels are safer than invented personal profiles.

### Tier 2 — Core laboratory operations

Display as a grouped operational team rather than individual identity cards:

- `Medical Technologists`
  - `Instrument-led testing, technical validation, and analytical workflow`
  - Do not publish “MLT” unless the exact qualification and staff approval are confirmed.

- `Laboratory Technicians`
  - `Specimen preparation, bench workflow, and laboratory support`

- `Phlebotomy Team`
  - Use `Phlebotomy Team`, not `Collection Riders` or `Riders`.
  - Public wording: `Trained sample-collection professionals for lab and home visits`
  - Do not claim certification, training level, or experience duration without records.

- `Laboratory Assistants`
  - Use this as a support role only if this is the actual internal title.
  - Do not automatically rename assistants as technicians; titles should match employment and competency records.

## Visual system

### Tier 1 cards

- Larger cards, calm navy/steel surfaces.
- One restrained red clinical accent line.
- No faces, generated avatars, or anonymous stock portraits.
- Use role glyphs or abstract line icons with accessible labels.
- Show responsibility, not personality.

### Tier 2 team band

- One wide “Core Operations Team” panel.
- Three or four role chips/cards:
  - Medical Technologists
  - Laboratory Technicians
  - Phlebotomy Team
  - Laboratory Assistants, if confirmed
- Use progressive disclosure for descriptions on mobile.

### Quality ribbon

Add one non-credentialed quality statement below the hierarchy:

`Clinical oversight · Quality ownership · Technical control · Coordinated collection`

Do not use accreditation seals, ratings, “error-free,” “100% accurate,” or unsupported compliance claims.

## Recommended copy hierarchy

```text
Laboratory Team & Quality Structure
A quality system built around accountable roles.

Clinical oversight, quality ownership, technical control, and coordinated collection—working together across the diagnostic journey.

Clinical & Laboratory Governance
[Pathology Oversight] [Laboratory Director] [Quality Manager]
[Technical Manager] [Logistics Manager]

Core Operations Team
Medical Technologists · Laboratory Technicians · Phlebotomy Team · Laboratory Assistants

Every role has a defined place in the journey from collection to report delivery.
```

## What must be owner-approved before publication

- Exact count of pathologists and whether “two” is publicly publishable.
- Whether Laboratory Director is a public role title.
- Whether Quality Manager, Technical Manager, and Logistics Manager are current official titles.
- Whether `Medical Technologists` is the preferred title for the three friends.
- Whether their MLT/master’s qualifications may be stated anonymously.
- Whether `Laboratory Assistants` and `Laboratory Technicians` are distinct internal roles.
- Whether all home-collection personnel may be called a `Phlebotomy Team`.
- Whether “trained” is documented and approved.
- Which claims are true for every sample/report workflow.

## Data model

Replace the current person-centric shape:

```ts
{ name, role, qualification, bio, image }
```

with a role-centric shape:

```ts
{
  id: string,
  label: string,
  tier: 'governance' | 'operations',
  summary: string,
  responsibilities: string[],
  countLabel?: string,
  publishStatus: 'approved' | 'owner-review'
}
```

Do not include names, images, or qualifications until `publishStatus` is approved.

## Accessibility and UX

- Use headings for `Clinical & Laboratory Governance` and `Core Operations Team`.
- Cards should be informational, not clickable unless they reveal approved details.
- Do not rely on color to distinguish management from operations.
- Use visible role labels and short descriptions.
- Keep the section readable at 200% zoom.
- Use a single-column stack on mobile and a governance grid on desktop.
- Avoid horizontal carousels for core role information.

## SEO/GEO benefit

This structure supports trustworthy discovery without inventing people:

- Clear role-based organization.
- Natural terms: pathology oversight, laboratory quality, medical technologists, laboratory technicians, phlebotomy team, home sample collection.
- Better alignment between visible content and structured data.
- No fake person entities or unsupported credentials.
- No anonymous AI portraits that could imply real staff identities.

Do not create individual Person schema entries until each person is explicitly approved for public publication.

## Implementation sequence

1. Replace `team.members` with role-based `team.structure`.
2. Remove external avatar URLs and personal names from public rendering.
3. Build Tier 1 governance cards.
4. Build Tier 2 operations panel.
5. Add quality ribbon with non-credentialed wording.
6. Add owner-review flags in data, not in public UI.
7. Verify responsive behavior and accessibility.
8. Revisit individual profiles later only after explicit approval.

## Deliberate simplification

The public site does not need a staff directory to appear premium. A precise, accountable operating model communicates more trust than unnamed portraits and fabricated biographies.
