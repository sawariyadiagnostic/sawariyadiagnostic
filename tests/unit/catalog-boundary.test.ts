import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPublishableGuide, validateGuideForPublication } from '../../src/content-guide-schema';
import { approvedGuideManifest } from '../../src/data/approvedGuideManifest';
import { healthPackages, medicalTests } from '../../src/data/mockTests';
import { siteConfig, validateSiteConfig } from '../../src/config/site';
import { teamStructure } from '../../src/data/team-structure';

const visitorSource = readFileSync(resolve(process.cwd(), 'src/components/TestCatalog.tsx'), 'utf8');

const uniqueIds = (items: { id: string }[]) => new Set(items.map((item) => item.id));
const runtimeSource = (root: string): string => {
  const entries = readdirSync(resolve(process.cwd(), root), { withFileTypes: true });
  return entries.map((entry) => {
    const relative = `${root}/${entry.name}`;
    if (entry.isDirectory()) return runtimeSource(relative);
    return /\.(ts|tsx|js|jsx|html)$/.test(entry.name) ? readFileSync(resolve(process.cwd(), relative), 'utf8') : '';
  }).join('\n');
};

describe('approved public catalog', () => {
  it('uses one request path while the public catalog is empty', () => {
    expect(visitorSource).toContain('The public catalog is being prepared');
    expect(visitorSource).toContain('Request a test or package on WhatsApp');
    expect(visitorSource).not.toContain('Clear Search Filters');
    expect(visitorSource).not.toContain('Try searching with generic terms');
  });

  it('keeps test and package identifiers unique', () => {
    expect(uniqueIds(medicalTests).size).toBe(medicalTests.length);
    expect(uniqueIds(healthPackages).size).toBe(healthPackages.length);
  });

  it('keeps listed values at or above customer prices', () => {
    expect(medicalTests.every((test) => test.originalPrice === undefined || test.originalPrice >= test.price)).toBe(true);
    expect(healthPackages.every((pkg) => pkg.originalPrice >= pkg.price)).toBe(true);
  });

  it('does not expose insurer-branded packages', () => {
    expect(healthPackages.some((pkg) => /starhealth|niva\s*bupa/i.test(pkg.name))).toBe(false);
  });
});

describe('public site configuration', () => {
  it('accepts the current public configuration', () => {
    expect(validateSiteConfig()).toBe(siteConfig);
  });

  it('keeps the appointment provider boundary explicit', () => {
    expect(siteConfig.integrations.calNamespace).toBe('sawariya-booking');
    expect(siteConfig.integrations.calLink).toBe('sawariya-lab/30min');
  });

  it('rejects invalid required contact data', () => {
    expect(() => validateSiteConfig({
      ...siteConfig,
      contact: { ...siteConfig.contact, email: 'invalid' },
    })).toThrow('Invalid public contact email');
  });
});

describe('bilingual guide publication boundary', () => {
  const guide = {
    slug: 'cbc', titleEn: 'Complete Blood Count', titleHi: 'कम्प्लीट ब्लड काउंट',
    summaryEn: 'A guide pending clinical review.', summaryHi: 'क्लिनिकल समीक्षा लंबित है।',
    englishPath: 'content/test-guides/cbc/en.md', hindiPath: 'content/test-guides/cbc/hi.md',
    preparationApproved: true, specimenApproved: true,
    clinicalReview: { status: 'approved', reviewer: 'clinical-reviewer', reviewedAt: '2026-09-13T00:00:00.000Z' },
    ownerReview: { status: 'approved', reviewer: 'owner', reviewedAt: '2026-09-13T00:00:00.000Z' },
    legalReview: { status: 'approved', reviewer: 'legal-reviewer', reviewedAt: '2026-09-13T00:00:00.000Z' },
    citations: [{ id: 'CIT-CBC-1', title: 'Source', url: 'https://example.org/source', accessedAt: '2026-09-13T00:00:00.000Z' }],
    price: { customerPriceInr: 220, listedValueInr: 400 },
    publication: 'published', lastReviewedAt: '2026-09-13T00:00:00.000Z',
  } as const;

  it('rejects drafts from publication', () => {
    expect(validateGuideForPublication({ ...guide, publication: 'draft' }).success).toBe(false);
  });

  it('accepts a fully approved guide', () => {
    const result = validateGuideForPublication(guide);
    expect(result.success).toBe(true);
    if (result.success) expect(isPublishableGuide(result.data)).toBe(true);
  });

  it('requires reviewer identity and date for every approved review', () => {
    const withoutAuditFields = {
      ...guide,
      clinicalReview: { status: 'approved' },
      ownerReview: { status: 'approved' },
      legalReview: { status: 'approved' },
    };

    expect(validateGuideForPublication(withoutAuditFields).success).toBe(false);
  });

  it('rejects inverted price metadata', () => {
    expect(validateGuideForPublication({ ...guide, price: { customerPriceInr: 500, listedValueInr: 400 } }).success).toBe(false);
  });
});

describe('approved guide manifest', () => {
  it('does not publish unapproved guides by default', () => {
    expect(approvedGuideManifest).toEqual([]);
  });
});

describe('public role structure', () => {
  it('keeps the approved role taxonomy', () => {
    expect(teamStructure.map((role) => role.label)).toEqual([
      'Pathology Oversight',
      'Laboratory Director',
      'Quality Manager',
      'Technical Manager',
      'Logistics Manager',
      'Medical Technologists',
      'Laboratory Technicians',
      'Phlebotomy Team',
      'Laboratory Assistants',
    ]);
    for (const tier of ['governance', 'operations'] as const) {
      const orders = teamStructure.filter((role) => role.tier === tier).map((role) => role.order);
      expect(orders).toEqual([...orders].sort((a, b) => a - b));
    }
  });
});

describe('deployment asset contract', () => {
  it('runs the full interaction accessibility suite and release check', () => {
    const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    expect(packageJson.scripts['test:a11y']).toContain('tests/e2e/accessibility-interactions.spec.ts');
    expect(packageJson.scripts.check).toContain('npm run validate:content');
    expect(packageJson.scripts.check).toContain('npm run test:a11y');
  });

  it('does not generate unrendered test or package SSG routes', () => {
    const ssg = readFileSync(resolve(process.cwd(), 'scripts/generate-ssg.ts'), 'utf8');
    expect(ssg).not.toContain("from '../src/data/mockTests'");
    expect(ssg).not.toContain('path: `test/');
    expect(ssg).not.toContain('path: `package/');
  });

  it('replaces base route metadata instead of appending duplicate SEO blocks', () => {
    const ssg = readFileSync(resolve(process.cwd(), 'scripts/generate-ssg.ts'), 'utf8');
    expect(ssg).toContain("html = html.replace(/<link\\s+rel=\"canonical\"[^>]*>\\s*/i, '')");
    expect(ssg).toContain("html = html.replace(/<meta\\s+property=\"og:url\"[^>]*>\\s*/i, '')");
    expect(ssg).toContain("html = html.replace(/<meta\\s+name=\"twitter:title\"[^>]*>\\s*/i, '')");
    expect(ssg).toContain("html = html.replace(/<meta\\s+name=\"twitter:description\"[^>]*>\\s*/i, '')");
    expect(ssg).toContain("html = html.replace(/<script\\s+type=\"application\\/ld\\+json\">[\\s\\S]*?<\\/script>\\s*/i, '')");
  });

  it('keeps raw register paths out of runtime source', () => {
    const source = [runtimeSource('src'), runtimeSource('scripts'), readFileSync(resolve(process.cwd(), 'server.ts'), 'utf8'), readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')].join('\n');
    expect(source).not.toContain('raw-inventory');
    expect(source).not.toContain('registerCatalog');
  });

  it('keeps the logo source base-path relative', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/ui/Logo.tsx'), 'utf8');
    expect(source).toContain('`${import.meta.env.BASE_URL}brand/sawariya-dna-original.svg`');
    expect(existsSync(resolve(process.cwd(), 'public/brand/sawariya-dna-original.svg'))).toBe(true);
  });
});
