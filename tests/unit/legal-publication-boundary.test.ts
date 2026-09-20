import { describe, expect, it } from 'vitest';
import {
  LEGAL_DOCUMENT_KEYS,
  legalDocumentIndex,
  validateLegalDocumentForPublication,
} from '../../src/data/legal-document-index';

describe('legal document publication boundary', () => {
  it('defines exactly the required document keys', () => {
    expect(LEGAL_DOCUMENT_KEYS).toEqual([
      'privacy',
      'terms',
      'patient-rights',
      'home-collection',
      'report-assistance',
      'accessibility',
      'grievance',
      'external-services',
    ]);
    expect(Object.keys(legalDocumentIndex)).toEqual(LEGAL_DOCUMENT_KEYS);
  });

  it('keeps unapproved documents blocked and the supplied terms record approved', () => {
    for (const key of LEGAL_DOCUMENT_KEYS) {
      const document = legalDocumentIndex[key];
      if (key === 'terms') {
        expect(document.state).toBe('published');
        expect(document.version).toBe('2.0.0');
        expect(document.effectiveAt).toBe('2026-10-01');
        expect(validateLegalDocumentForPublication(document).success).toBe(true);
      } else {
        expect(document.state).toBe('draft');
        expect(document.version).toBe('0.0.0');
        expect(document.effectiveAt).toBeNull();
        expect(document.ownerApproval.status).toBe('pending');
        expect(document.clinicalApproval.status).toBe('pending');
        expect(document.legalApproval.status).toBe('pending');
        expect(validateLegalDocumentForPublication(document).success).toBe(false);
      }
    }
  });

  it('fails closed when an approval is missing required audit fields', () => {
    const draft = legalDocumentIndex.privacy;
    const candidate = {
      ...draft,
      state: 'published' as const,
      version: '1.0.0',
      effectiveAt: '2026-09-15T00:00:00.000Z',
      ownerApproval: { status: 'approved' as const, reviewer: 'owner', reviewedAt: '2026-09-15T00:00:00.000Z' },
      clinicalApproval: { status: 'approved' } as never,
      legalApproval: { status: 'approved' as const, reviewer: 'legal', reviewedAt: '2026-09-15T00:00:00.000Z' },
    };

    const result = validateLegalDocumentForPublication(candidate);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain('clinicalApproval.reviewer is required');
  });

  it('accepts publication only after state, effective date, and all approvals are complete', () => {
    const draft = legalDocumentIndex.privacy;
    const candidate = {
      ...draft,
      state: 'published' as const,
      version: '1.0.0',
      effectiveAt: '2026-09-15T00:00:00.000Z',
      ownerApproval: { status: 'approved' as const, reviewer: 'owner', reviewedAt: '2026-09-15T00:00:00.000Z' },
      clinicalApproval: { status: 'approved' as const, reviewer: 'clinical', reviewedAt: '2026-09-15T00:00:00.000Z' },
      legalApproval: { status: 'approved' as const, reviewer: 'legal', reviewedAt: '2026-09-15T00:00:00.000Z' },
    };

    expect(validateLegalDocumentForPublication(candidate).success).toBe(true);
  });
});
