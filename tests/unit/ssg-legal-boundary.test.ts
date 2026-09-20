import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { publicUrl } from '../../scripts/generate-ssg';
import { filterApprovedLegalMetadata } from '../../scripts/legal-publication';
import { legalDocumentIndex } from '../../src/data/legal-document-index';

describe('approval-gated legal SSG boundary', () => {
  it('keeps only the supplied terms document approved in metadata', () => {
    const documents = Object.values(legalDocumentIndex);

    expect(documents).toHaveLength(8);
    expect(filterApprovedLegalMetadata(legalDocumentIndex).map((document) => document.key)).toEqual(['terms']);
    expect(documents.filter((document) => document.state === 'draft')).toHaveLength(7);
  });

  it('does not include legal routes or draft prose in the SSG generator', () => {
    const generator = readFileSync(resolve(process.cwd(), 'scripts/generate-ssg.ts'), 'utf8');

    expect(generator).not.toMatch(/privacy\.html|terms\.html|patient-rights\.html/);
    expect(generator).not.toMatch(/review-required|0\.0\.0|Privacy notice|Patient rights and responsibilities/);
  });

  it('resolves canonical URLs below the GitHub Pages repository base path', () => {
    expect(publicUrl('/guide/example.html')).toBe('https://sawariyadiagnostic.github.io/sawariyadiagnostic/guide/example.html');
    expect(publicUrl('guide/example-hi.html')).toBe('https://sawariyadiagnostic.github.io/sawariyadiagnostic/guide/example-hi.html');
    expect(publicUrl('/')).toBe('https://sawariyadiagnostic.github.io/sawariyadiagnostic/');
  });
});
