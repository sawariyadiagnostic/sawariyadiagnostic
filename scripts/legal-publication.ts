import {
  type LegalDocumentKey,
  type LegalDocumentMetadata,
  legalDocumentIndex,
  validateLegalDocumentForPublication,
} from '../src/data/legal-document-index';

/**
 * Return only documents that have passed the contract's publication validator.
 * The source currently contains metadata only, so this is intentionally fail-closed:
 * draft/review-required records never become routes or sitemap entries.
 */
export function filterApprovedLegalMetadata(
  documents: Readonly<Record<LegalDocumentKey, LegalDocumentMetadata>> = legalDocumentIndex,
): LegalDocumentMetadata[] {
  return Object.values(documents).filter((document) => validateLegalDocumentForPublication(document).success);
}
