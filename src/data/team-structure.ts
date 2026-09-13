export type TeamTier = 'governance' | 'operations';
export type PublishState = 'public' | 'owner-review';

export interface TeamRole {
  id: string;
  label: string;
  tier: TeamTier;
  order: number;
  shortDescription: string;
  responsibilities: string[];
  publishState: PublishState;
  countLabel?: string;
}

export const teamStructure: TeamRole[] = [
  {
    id: 'pathology-oversight',
    label: 'Pathology Oversight',
    tier: 'governance',
    order: 1,
    shortDescription: 'Clinical interpretation and pathology oversight.',
    responsibilities: ['Clinical review', 'Result interpretation', 'Escalation coordination'],
     publishState: 'public',
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
    responsibilities: ['Technical workflow', 'Process coordination', 'Result integrity'],
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
     publishState: 'public',
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
     publishState: 'public',
  },
  {
    id: 'laboratory-assistants',
    label: 'Laboratory Assistants',
    tier: 'operations',
    order: 4,
    shortDescription: 'Organized support across preparation, records, and laboratory workflow.',
    responsibilities: ['Workflow support', 'Records coordination', 'Material readiness'],
     publishState: 'public',
  },
];
