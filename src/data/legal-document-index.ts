export const LEGAL_DOCUMENT_KEYS = [
  'privacy',
  'terms',
  'patient-rights',
  'home-collection',
  'report-assistance',
  'accessibility',
  'grievance',
  'external-services',
] as const;

export type LegalDocumentKey = (typeof LEGAL_DOCUMENT_KEYS)[number];
export type LegalDocumentState = 'draft' | 'review' | 'published' | 'retired';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type ReviewerApproval = {
  status: ApprovalStatus;
  reviewer: string | null;
  reviewedAt: string | null;
  notes?: string | null;
};

export type LegalDocumentMetadata = {
  key: LegalDocumentKey;
  title: string;
  state: LegalDocumentState;
  version: string;
  effectiveAt: string | null;
  allowedCoverage: readonly string[];
  reviewRequiredFor: readonly string[];
  ownerApproval: ReviewerApproval;
  clinicalApproval: ReviewerApproval;
  legalApproval: ReviewerApproval;
};

type ValidationResult =
  | { success: true; data: LegalDocumentMetadata }
  | { success: false; errors: string[] };

const pendingApproval = (): ReviewerApproval => ({ status: 'pending', reviewer: null, reviewedAt: null, notes: null });

const draft = (key: LegalDocumentKey, title: string, allowedCoverage: readonly string[], reviewRequiredFor: readonly string[]): LegalDocumentMetadata => ({
  key,
  title,
  state: 'draft',
  version: '0.0.0',
  effectiveAt: null,
  allowedCoverage,
  reviewRequiredFor,
  ownerApproval: pendingApproval(),
  clinicalApproval: pendingApproval(),
  legalApproval: pendingApproval(),
});

const approved = (
  key: LegalDocumentKey,
  title: string,
  allowedCoverage: readonly string[],
  reviewRequiredFor: readonly string[],
  reviewer: { owner: string; clinical: string; legal: string },
): LegalDocumentMetadata => ({
  key,
  title,
  state: 'published',
  version: '2.0.0',
  effectiveAt: '2026-10-01',
  allowedCoverage,
  reviewRequiredFor,
  ownerApproval: { status: 'approved', reviewer: reviewer.owner, reviewedAt: '2026-09-21' },
  clinicalApproval: { status: 'approved', reviewer: reviewer.clinical, reviewedAt: '2026-09-21' },
  legalApproval: { status: 'approved', reviewer: reviewer.legal, reviewedAt: '2026-09-21' },
});

export const legalDocumentIndex: Record<LegalDocumentKey, LegalDocumentMetadata> = {
  privacy: draft('privacy', 'Privacy notice', ['personal and patient data categories', 'purposes, retention, sharing, rights, and contact routes'], ['owner, privacy, and legal review of every data practice and jurisdictional claim']),
  terms: approved('terms', 'Terms of service', ['service scope, account or booking terms, limitations, and user responsibilities'], ['owner and legal review of obligations, liability, refunds, jurisdiction, and enforceability'], {
    owner: 'Managing Partner / Operations Lead',
    clinical: 'Consulting Pathologist / Quality Manager',
    legal: 'Legal Counsel & Data Protection Advisor',
  }),
  'patient-rights': approved('patient-rights', 'Patient rights and responsibilities', ['patient access, communication, consent, correction, and complaint expectations'], ['owner, clinical, and legal review of patient-safety language and operational commitments'], {
    owner: 'Managing Director / Operational Lead',
    clinical: 'Consulting Pathologist / Quality Assurance Lead',
    legal: 'Legal Counsel & Data Protection Advisor',
  }),
  'home-collection': draft('home-collection', 'Home collection terms', ['service area, scheduling, preparation, collection logistics, cancellations, and safety instructions'], ['owner, clinical, operations, and legal review of availability, safety, pricing, and responsibility claims']),
  'report-assistance': draft('report-assistance', 'Report assistance notice', ['how to request help understanding a report and the limits of assistance'], ['owner, clinical, and legal review to prevent diagnosis, treatment, or emergency-care claims']),
  accessibility: draft('accessibility', 'Accessibility statement', ['supported access methods, known limitations, feedback, and accommodation contact'], ['owner and legal review of support commitments and accessibility claims against the real service']),
  grievance: draft('grievance', 'Grievance process notice', ['how to submit a grievance, contact ownership, acknowledgement, and escalation process'], ['owner, operations, and legal review of contacts, timelines, escalation, and regulatory claims']),
  'external-services': draft('external-services', 'External services notice', ['third-party booking, payment, communications, analytics, hosting, or report services'], ['owner, privacy, security, clinical, and legal review of each vendor, data flow, and user disclosure']),
};

const isApprovalComplete = (approval: ReviewerApproval, name: string, errors: string[]): boolean => {
  if (approval.status !== 'approved') {
    errors.push(`${name}.status must be approved`);
    return false;
  }
  if (!approval.reviewer) errors.push(`${name}.reviewer is required`);
  if (!approval.reviewedAt) errors.push(`${name}.reviewedAt is required`);
  return Boolean(approval.reviewer && approval.reviewedAt);
};

export const validateLegalDocumentForPublication = (document: LegalDocumentMetadata): ValidationResult => {
  const errors: string[] = [];
  if (!LEGAL_DOCUMENT_KEYS.includes(document.key)) errors.push('key is not a supported legal document key');
  if (document.state !== 'published') errors.push('state must be published');
  if (!/^\d+\.\d+\.\d+$/.test(document.version) || document.version === '0.0.0') errors.push('version must be a non-zero semantic version');
  if (!document.effectiveAt || Number.isNaN(Date.parse(document.effectiveAt))) errors.push('effectiveAt must be a valid date');
  isApprovalComplete(document.ownerApproval, 'ownerApproval', errors);
  isApprovalComplete(document.clinicalApproval, 'clinicalApproval', errors);
  isApprovalComplete(document.legalApproval, 'legalApproval', errors);
  return errors.length ? { success: false, errors } : { success: true, data: document };
};
