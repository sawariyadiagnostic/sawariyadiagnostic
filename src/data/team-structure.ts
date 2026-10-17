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
    shortDescription: 'Clinical review of abnormal findings and diagnostic report sign-off.',
    responsibilities: ['Critical Value Review', 'Result Interpretation', 'Clinical Escalation'],
    publishState: 'public',
  },
  {
    id: 'laboratory-direction',
    label: 'Laboratory Director',
    tier: 'governance',
    order: 2,
    shortDescription: 'Laboratory direction, patient-safety governance, and diagnostic standards.',
    responsibilities: ['Diagnostic Governance', 'Calibration Standards', 'Patient Safety'],
    publishState: 'public',
  },
  {
    id: 'quality-management',
    label: 'Quality Manager',
    tier: 'governance',
    order: 3,
    shortDescription: 'Quality assurance documentation, internal verification, and audit consistency.',
    responsibilities: ['Quality Assurance', 'Internal Audits', 'Standard Operating Procedures'],
    publishState: 'public',
  },
  {
    id: 'technical-management',
    label: 'Technical Manager',
    tier: 'governance',
    order: 4,
    shortDescription: 'Analytical instrumentation oversight, calibration records, and result integrity.',
    responsibilities: ['Analyzer Maintenance', 'Calibration Verification', 'Result Integrity'],
    publishState: 'public',
  },
  {
    id: 'logistics-management',
    label: 'Logistics Manager',
    tier: 'governance',
    order: 5,
    shortDescription: 'Cold-chain transit monitoring, home visit scheduling, and sample chain of custody.',
    responsibilities: ['Home Visit Scheduling', 'Cold-Chain Monitoring', 'Sample Tracking'],
    publishState: 'public',
  },
  {
    id: 'medical-technologists',
    label: 'Medical Technologists',
    tier: 'operations',
    order: 1,
    shortDescription: 'Chemiluminescence assays, 5-part hematology analysis, and daily control runs.',
    responsibilities: ['Daily Control Runs', 'CLIA Immunoassays', 'Differential Analysis'],
    publishState: 'public',
  },
  {
    id: 'laboratory-technicians',
    label: 'Laboratory Technicians',
    tier: 'operations',
    order: 2,
    shortDescription: 'Specimen preparation, centrifugation, staining, and laboratory bench operations.',
    responsibilities: ['Specimen Preparation', 'Centrifugation Protocol', 'Bench Operations'],
    publishState: 'public',
  },
  {
    id: 'phlebotomy-team',
    label: 'Phlebotomy Team',
    tier: 'operations',
    order: 3,
    shortDescription: 'Certified collection team for comfortable doorstep and in-lab blood draws.',
    responsibilities: ['Patient Identification', 'Single-Use Vacutainers', 'Cold-Chain Transit'],
    publishState: 'public',
  },
  {
    id: 'laboratory-assistants',
    label: 'Laboratory Assistants',
    tier: 'operations',
    order: 4,
    shortDescription: 'Sample accessioning, barcoding readiness, and laboratory records support.',
    responsibilities: ['Barcoded Sample Intake', 'Supply Readiness', 'Laboratory Records'],
    publishState: 'public',
  },
];
