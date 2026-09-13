# Sawariya Team Identity System — Long-Term Implementation Blueprint

## 1. Product decision

The public website should not be a staff directory. It should be a **quality and accountability system** that explains how responsibility is distributed across the laboratory.

This gives Sawariya a more durable identity than publishing names that may change, anonymous portraits, or AI-generated staff imagery.

Public goal:

> Show the laboratory is organized, accountable, technically capable, and patient-focused—without exposing personal identities before approval.

## 2. Long-term architecture

Separate three concepts:

1. **Role** — stable organizational responsibility.
2. **Capability** — what that role controls or contributes.
3. **Person** — optional private/public identity attached later only with approval.

The public page renders roles and capabilities by default. A person can be attached later without redesigning the UI.

```text
Role → capabilities → optional approved profile
```

## 3. Public information model

### Governance layer

- `Pathology Oversight`
- `Laboratory Director`
- `Quality Manager`
- `Technical Manager`
- `Logistics Manager`

### Operations layer

- `Medical Technologists`
- `Laboratory Technicians`
- `Phlebotomy Team`
- `Laboratory Assistants`

### Quality principles layer

- `Clinical review`
- `Documented quality checks`
- `Technical workflow control`
- `Sample identity and movement control`
- `Patient-focused report delivery`

These are public descriptions, not unsupported accreditation claims.

## 4. Owner-controlled data model

Create a dedicated source file:

```text
src/data/team-structure.ts
```

```ts
export type TeamTier = 'governance' | 'operations' | 'quality';
export type PublishState = 'public' | 'owner-review' | 'private';

export interface TeamRole {
  id: string;
  label: string;
  tier: TeamTier;
  order: number;
  shortDescription: string;
  responsibilities: string[];
  countLabel?: string;
  qualificationLabel?: string;
  publishState: PublishState;
  person?: {
    name: string;
    title: string;
    qualification: string;
    approvedForPublic: boolean;
  };
}
```

Rules:

- `publishState !== 'public'` never renders publicly.
- `person` is optional.
- `approvedForPublic` must be true before identity appears.
- No public component should read private names directly.
- Counts are optional and owner-approved, not inferred.
- Qualifications are optional and must be verified before publication.

## 5. Recommended initial public records

Start with no person data:

```ts
const teamStructure: TeamRole[] = [
  {
    id: 'pathology-oversight',
    label: 'Pathology Oversight',
    tier: 'governance',
    order: 1,
    countLabel: 'Owner review required',
    shortDescription: 'Clinical interpretation and pathology oversight.',
    responsibilities: ['Clinical review', 'Result interpretation', 'Escalation of significant findings'],
    publishState: 'owner-review',
  },
  {
    id: 'laboratory-direction',
    label: 'Laboratory Director',
    tier: 'governance',
    order: 2,
    shortDescription: 'Laboratory direction, accountability, and patient-safety standards.',
    responsibilities: ['Operational accountability', 'Service standards', 'Clinical coordination'],
    publishState: 'public',
  },
  {
    id: 'quality-management',
    label: 'Quality Manager',
    tier: 'governance',
    order: 3,
    shortDescription: 'Quality documentation, internal checks, and process consistency.',
    responsibilities: ['Quality records', 'Internal checks', 'Corrective-action coordination'],
    publishState: 'public',
  },
  {
    id: 'technical-management',
    label: 'Technical Manager',
    tier: 'governance',
    order: 4,
    shortDescription: 'Technical workflow, instrumentation, and result integrity.',
    responsibilities: ['Technical workflow', 'Equipment/process coordination', 'Result integrity'],
    publishState: 'public',
  },
  {
    id: 'logistics-management',
    label: 'Logistics Manager',
    tier: 'governance',
    order: 5,
    shortDescription: 'Collection coordination, sample movement, and delivery continuity.',
    responsibilities: ['Collection scheduling', 'Sample movement', 'Delivery coordination'],
    publishState: 'public',
  },
  {
    id: 'medical-technologists',
    label: 'Medical Technologists',
    tier: 'operations',
    order: 1,
    shortDescription: 'Instrument-led testing, technical validation, and analytical workflow.',
    responsibilities: ['Testing workflow', 'Technical validation', 'Analytical process support'],
    qualificationLabel: 'Qualification details available on owner approval',
    publishState: 'owner-review',
  },
  {
    id: 'laboratory-technicians',
    label: 'Laboratory Technicians',
    tier: 'operations',
    order: 2,
    shortDescription: 'Specimen preparation, bench workflow, and laboratory support.',
    responsibilities: ['Specimen preparation', 'Bench workflow', 'Laboratory support'],
    publishState: 'public',
  },
  {
    id: 'phlebotomy-team',
    label: 'Phlebotomy Team',
    tier: 'operations',
    order: 3,
    shortDescription: 'Sample-collection professionals for lab and home visits.',
    responsibilities: ['Patient identification', 'Sample collection', 'Collection safety and handoff'],
    publishState: 'owner-review',
  },
  {
    id: 'laboratory-assistants',
    label: 'Laboratory Assistants',
    tier: 'operations',
    order: 4,
    shortDescription: 'Organized support across preparation, records, and laboratory workflow.',
    responsibilities: ['Workflow support', 'Records coordination', 'Material readiness'],
    publishState: 'owner-review',
  },
];
```

The exact `publishState`, counts, and qualifications must be approved before rendering.

## 6. Component architecture

Replace the current person-card loop in `Team.tsx` with:

```text
TeamSection
├── TeamSectionHeader
├── GovernanceGrid
│   └── GovernanceRoleCard
├── OperationsPanel
│   └── OperationsRoleCard
├── QualityRibbon
└── TeamDisclosure
```

### Governance cards

- 5 cards on large screens: 3 + 2 balanced layout or a 5-column grid only when cards remain readable.
- 2 columns on tablet.
- 1 column on mobile.
- Larger visual weight than operations roles.
- Use role icon, label, responsibility summary, and 2–3 capability bullets.

### Operations panel

- One premium wide card instead of many anonymous profile cards.
- Four role chips/cards.
- Small icon + label + one-line responsibility.
- On mobile, stack vertically.
- No carousel; all role information remains discoverable.

### Quality ribbon

```text
Clinical oversight · Quality ownership · Technical control · Coordinated collection
```

Use icons and text; do not rely on color alone.

## 7. Visual direction

### Hierarchy

- Governance: navy/steel surfaces, red top rule, strong labels.
- Operations: white/warm-paper surface, blue/brown micro-accents.
- Quality ribbon: dark navy band with off-white text.
- No purple role cards, no rainbow role palette, no generated portraits.

### Premium signals

- Consistent 20–24px card radius.
- Calm spacing and aligned card heights.
- Thin border and restrained shadow.
- Small uppercase tier labels.
- Capability bullets with quiet icons.
- A structured “quality pathway” connector between governance and operations.

Avoid:

- Fake awards
- Unverified accreditation badges
- Anonymous stock people
- Individual claims without approval
- Excessive gradients
- “100% accuracy” or guaranteed clinical outcomes

## 8. Content language

Preferred:

- `Pathology Oversight`
- `Clinical interpretation`
- `Quality documentation`
- `Technical workflow control`
- `Sample-collection professionals`
- `Report delivery continuity`
- `Defined responsibility`

Avoid:

- `Riders`
- `Super expert`
- `Error-free`
- `100% accurate`
- `Guaranteed results`
- `Certified` unless documented and approved
- `MLT` unless the exact qualification is approved
- `Pathologist` as a person entity unless the public identity is approved

## 9. SEO and structured data

Do not create `Person` schema for anonymous roles.

Use visible role content for page understanding, but only add structured data for:

- The laboratory organization
- Services actually shown
- Publicly verified credentials

Role content supports natural discovery for searches involving:

- diagnostic laboratory quality process
- pathology oversight
- medical technologists
- laboratory technicians
- phlebotomy home collection
- sample collection coordination

The wording must remain factual and non-promotional.

## 10. Accessibility

- Use `<section aria-labelledby="team-heading">`.
- Use semantic headings for governance and operations tiers.
- Every role card has a visible heading and text summary.
- Do not use hover-only descriptions.
- Keep all role content available at 200% zoom.
- Respect reduced motion for card entrance animation.
- Use `aria-hidden="true"` only for decorative icons.
- Keep text contrast at WCAG AA.

## 11. Future expansion without redesign

Later, owner-approved people can be attached:

```ts
person: {
  name: 'Approved Name',
  title: 'Approved Public Title',
  qualification: 'Approved Qualification',
  approvedForPublic: true,
}
```

The role card can then optionally expose:

- Name
- Public title
- Qualification
- Approved portrait
- Biography
- Professional registration, only if explicitly approved

The default UI remains role-first, so turnover does not require redesign.

## 12. Migration plan

1. Add `src/data/team-structure.ts`.
2. Remove named members from public `website-content.ts`.
3. Replace `Team.tsx` person cards with governance/operations components.
4. Remove external avatar URL requests.
5. Add owner-review gating in data.
6. Add quality ribbon.
7. Add responsive layout and reduced-motion behavior.
8. Audit SEO/schema to ensure no fabricated people remain.
9. Build and perform visual/a11y verification.
10. Publish only after owner confirms counts, titles, and wording.

## 13. Acceptance criteria

- No personal name or portrait appears publicly without approval.
- Governance and operations are visually distinct.
- `Phlebotomy Team` replaces rider wording.
- Public page communicates professionalism without unsupported claims.
- Mobile and desktop layouts remain readable.
- No role is represented only by color.
- Future approved people can be added through data, not a component rewrite.
- Existing brand colors remain consistent.

## Final recommendation

Implement the role-first system now. Keep identities private by default. Add people only as an approved enhancement later. This gives Sawariya a premium, stable, and trustworthy public presence while protecting operational privacy and keeping future expansion cheap.
