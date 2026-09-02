'use client';

import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

const DEFAULT_TITLE = 'Sawariya Diagnostic - NABL Accredited Diagnostic Lab';
const DEFAULT_DESC = 'NABL accredited diagnostic lab offering blood tests, health packages, and home sample collection with test catalog and online booking.';
const BASE_CANONICAL = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic/';
const DEFAULT_OG_IMAGE = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic/og-image.jpg';

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalUrl = BASE_CANONICAL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd,
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Dynamic JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
