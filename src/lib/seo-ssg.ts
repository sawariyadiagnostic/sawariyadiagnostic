import type { MedicalTest, HealthPackage } from '@/data/mockTests';

/**
 * Dynamic SEO & Structured Data (JSON-LD) Manager
 * Generates Schema.org compliant structured data for DiagnosticLab and MedicalTest entities
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic';

export const SEOManager = {
  /**
   * Updates document meta tags dynamically
   */
  updateMeta: (metadata: SEOMetadata) => {
    if (typeof document === 'undefined') return;

    // Title
    document.title = metadata.title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metadata.description);

    // OpenGraph
    const setMetaProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaProperty('og:title', metadata.title);
    setMetaProperty('og:description', metadata.description);
    setMetaProperty('og:type', metadata.type || 'website');
    if (metadata.canonicalUrl) {
      setMetaProperty('og:url', metadata.canonicalUrl);
    }
    if (metadata.ogImage) {
      setMetaProperty('og:image', metadata.ogImage);
    }

    // Twitter
    const setMetaName = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaName('twitter:title', metadata.title);
    setMetaName('twitter:description', metadata.description);

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (metadata.canonicalUrl) {
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', metadata.canonicalUrl);
    }

    // JSON-LD Structured Data
    if (metadata.jsonLd) {
      const existingScript = document.getElementById('dynamic-jsonld-schema');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'dynamic-jsonld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(metadata.jsonLd);
      document.head.appendChild(script);
    }
  },

  /**
   * Generates Schema.org MedicalTest JSON-LD for an individual blood test
   */
  generateTestSchema: (test: MedicalTest) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalTest',
      name: test.name,
      description: test.description,
      url: `${BASE_URL}/#/test/${test.id}`,
      code: {
        '@type': 'MedicalCode',
        code: test.id.toUpperCase(),
        codingSystem: 'Internal-LIS'
      },
      offers: {
        '@type': 'Offer',
        price: test.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
        seller: {
          '@type': 'DiagnosticLab',
          name: 'Sawariya Diagnostic',
          telephone: '+917015290782'
        }
      },
      usedToDiagnose: test.parameters?.map(p => ({
        '@type': 'MedicalCondition',
        name: p
      })) || [],
      relevantSpecialty: {
        '@type': 'MedicalSpecialty',
        name: 'Pathology'
      }
    };
  },

  /**
   * Generates Schema.org MedicalBusiness / HealthPackage schema
   */
  generatePackageSchema: (pkg: HealthPackage) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: pkg.name,
      description: pkg.description,
      url: `${BASE_URL}/#/package/${pkg.id}`,
      offers: {
        '@type': 'Offer',
        price: pkg.price,
        priceCurrency: 'INR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'DiagnosticLab',
          name: 'Sawariya Diagnostic'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '342'
      }
    };
  },

  /**
   * Generates BreadcrumbList schema
   */
  generateBreadcrumbSchema: (items: { name: string; url: string }[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }
};
