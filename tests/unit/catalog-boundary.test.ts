import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPublishableGuide, validateGuideForPublication } from '../../src/content-guide-schema';
import { approvedGuideManifest } from '../../src/data/approvedGuideManifest';
import { medicalTests, publishedCatalogManifest } from '../../src/data/publishedCatalog';
import { siteConfig, validateSiteConfig } from '../../src/config/site';
import { teamStructure } from '../../src/data/team-structure';
import { formatInr } from '../../src/lib/utils';

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
  it('uses the authorized sanitized publication projection', () => {
    expect(publishedCatalogManifest.publicationStatus).toBe('APPROVED');
    expect(publishedCatalogManifest.publicationMode).toBe('manual_exception');
    expect(medicalTests).toHaveLength(74);
    expect(publishedCatalogManifest.packages).toBe(0);
    expect(JSON.stringify(publishedCatalogManifest)).not.toMatch(/provenance|source_file|b2b|wholesale|floor|margin|profit|review_ledgers|original_text/i);
  });

  it('publishes real source-derived test descriptions', () => {
    expect(medicalTests).toHaveLength(74);
    expect(new Set(medicalTests.map((test) => test.description)).size).toBeGreaterThan(70);
    expect(medicalTests.every((test) => !test.description.includes('Current test details are published'))).toBe(true);
    expect(medicalTests.find((test) => test.id === 'web-001')?.description).toBe('Comprehensive evaluation of cellular blood components.');
    expect(medicalTests.find((test) => test.id === 'web-074')?.description).toBe('Laboratory measurement for MALARIA PARASITE ANTIGEN; see the specimen, method, preparation, and parameters below.');
  });

  it('renders the approved individual-test catalog only', () => {
    expect(visitorSource).not.toContain('Health Packages');
    expect(visitorSource).toContain('Individual Tests. Transparent Pricing.');
    expect(visitorSource).toContain('Diagnostic Test Catalog');
    expect(visitorSource).not.toContain('packages.length');
    expect(visitorSource).not.toContain('Free Doorstep Home Sample');
    expect(visitorSource).not.toContain('Save {discountPercent}%');
  });

  it('does not expose unsafe external links from the catalog surface', () => {
    expect(visitorSource).not.toContain('target="_blank"');
    expect(visitorSource).not.toContain('rel="noreferrer"');
  });

  it('keeps individual test identifiers unique', () => {
    expect(uniqueIds(medicalTests).size).toBe(medicalTests.length);
  });

  it('provides a resettable accessible empty state for filtered tests', () => {
    expect(visitorSource).toContain('No tests match this search');
    expect(visitorSource).toContain('aria-live="polite"');
    expect(visitorSource).toContain('clearFilters');
  });


  it('keeps dialog layers above the mobile dock', () => {
    const dialogSource = readFileSync(resolve(process.cwd(), 'src/components/ui/dialog.tsx'), 'utf8');
    expect(dialogSource).toContain('inset-0 z-[110]');
    expect(dialogSource).toContain('top-[50%] z-[110]');
  });

  it('keeps individual tests resolvable for public detail views', () => {
    expect(medicalTests.every((test) => test.id && test.name && test.price >= 0)).toBe(true);
  });

  it('formats INR prices consistently with Indian grouping', () => {
    expect(formatInr(100)).toBe('₹100');
    expect(formatInr(4299)).toBe('₹4,299');
  });

  it('restores and owns individual test hash state', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/TestCatalog.tsx'), 'utf8');
    expect(source).toContain("/^#\\/test\\/([^/]+)$/");
    expect(source).toContain("window.history.pushState({ catalogDetail: true }");
    expect(source).toContain('window.history.state?.catalogDetail');
  });

  it('gives both catalog search inputs stable form metadata', () => {
    const heroSource = readFileSync(resolve(process.cwd(), 'src/components/Hero.tsx'), 'utf8');
    const catalogSource = readFileSync(resolve(process.cwd(), 'src/components/TestCatalog.tsx'), 'utf8');
    expect(heroSource).toContain('placeholder="Ask about a test or package…"');
    expect(catalogSource).toContain('placeholder="Ask about an individual test…"');
  });

  it('announces catalog search result counts to assistive technology', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/TestCatalog.tsx'), 'utf8');
    expect(source).toContain('role="status" aria-live="polite" className="text-xs text-slate-600 mb-4 px-1 font-medium"');
  });

  it('keeps test cards free of nested interactive semantics', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/ui/TestCard.tsx'), 'utf8');
    expect(source).not.toContain('role="button"');
    expect(source).not.toContain('tabIndex={0}');
    expect(source).toContain('onClick={(e) => { e.stopPropagation(); handleCardClick(); }}');
  });

  it('reports clipboard share success and failure honestly', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/catalog/TestDetailModal.tsx'), 'utf8');
    expect(source).toContain('const handleShare = async () =>');
    expect(source).toContain('await navigator.clipboard.writeText(url)');
    expect(source).toContain("toast.error('Could not copy the link. Please copy the page URL manually.')");
  });

  it('gives calendar initialization an honest contact fallback', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/Contact.tsx'), 'utf8');
    expect(source).toContain('const [calendarError, setCalendarError] = useState(false);');
    expect(source).toContain('catch {');
    expect(source).toContain('Calendar temporarily unavailable');
    expect(source).toContain('role="alert"');
  });

  it('gives the mobile menu dialog semantics and Escape dismissal', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/layout/MobileMenu.tsx'), 'utf8');
    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
    expect(source).toContain('aria-label="Mobile navigation"');
    expect(source).toContain("if (event.key === 'Escape') onClose();");
    expect(source).toContain('window.removeEventListener');
  });

  it('keeps the navbar logo keyboard accessible as Back to top', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/layout/Navbar.tsx'), 'utf8');
    expect(source).toContain('<button');
    expect(source).toContain('type="button"');
    expect(source).toContain('aria-label="Back to top"');
    expect(source).toContain("window.scrollTo({ top: 0, behavior: 'smooth' })");
  });

  it('protects WhatsApp new tabs from opener access', () => {
    const files = [
      ['src/components/ui/WhatsAppButton.tsx', "window.open(whatsappUrl, '_blank', 'noopener,noreferrer')"],
      ['src/components/layout/MobileBottomDock.tsx', "window.open(url, '_blank', 'noopener,noreferrer')"],
      ['src/components/layout/MobileMenu.tsx', "window.open(url, '_blank', 'noopener,noreferrer')"],
    ] as const;
    for (const [file, opener] of files) {
      const source = readFileSync(resolve(process.cwd(), file), 'utf8');
      expect(source).toContain(opener);
      expect(source).not.toContain("window.open(url, '_blank')");
    }
  });

  it('keeps draft legal actions at accessible touch height', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/Footer.tsx'), 'utf8');
    expect(source.match(/min-h-11 px-2 py-2 text-center/g)).toHaveLength(3);
  });

  it('does not render equal customer and listed prices as discounts', () => {
    const detailModalSource = readFileSync(resolve(process.cwd(), 'src/components/catalog/TestDetailModal.tsx'), 'utf8');
    const bookingModalSource = readFileSync(resolve(process.cwd(), 'src/components/booking/TestBookingModal.tsx'), 'utf8');
    expect(detailModalSource).toContain('item.originalPrice > item.price');
    expect(bookingModalSource).toContain('originalPrice !== undefined && originalPrice > price');
  });


  it('keeps listed values at or above customer prices', () => {
    expect(medicalTests.every((test) => test.originalPrice === undefined || test.originalPrice >= test.price)).toBe(true);
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
