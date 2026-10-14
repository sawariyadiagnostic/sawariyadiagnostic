import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const NOT_FOUND_PATH = path.join(DIST_DIR, '404.html');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

// Core SEO Catalog injected into static HTML for Googlebot & LLM Crawlers
const STATIC_SEO_HTML = `
<div id="root">
  <main style="max-width:1024px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;color:#0f172a;">
    <header>
      <h1>Sawariya Diagnostic Lab — Central Pathology &amp; Diagnostic Lab in Charkhi Dadri</h1>
      <p><strong>Location:</strong> 1st Floor, Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana 127306</p>
      <p><strong>Phone &amp; Home Sample Collection:</strong> <a href="tel:+919991941207">+91 99919 41207</a></p>
      <p>In-house testing across 5-Part Hematology, CLIA Hormone Immunoassays, Biochemistry, Coagulation, and Preventive Full Body Checkups with same-day digital reports.</p>
    </header>
    <section>
      <h2>Preventive Full Body Health Checkup Profiles</h2>
      <ul>
        <li><strong>Sawariya Gold Health Profile (84+ Parameters):</strong> Complete Blood Count (CBC), Liver Function Test (LFT), Kidney Function Test (KFT), Lipid Profile, Thyroid Profile (TSH, FT3, FT4), Blood Sugar, Urine Routine.</li>
        <li><strong>Sawariya Platinum Profile:</strong> Gold 84+ Parameters plus Vitamin D (25-OH), Vitamin B12, HbA1c, and Iron Studies.</li>
        <li><strong>Sawariya Diamond &amp; Signature Profiles:</strong> Comprehensive cardiac risk markers, hormone screening, inflammation markers, and metabolic profiling.</li>
      </ul>
    </section>
    <section>
      <h2>Popular Individual Pathology &amp; Blood Tests in Charkhi Dadri</h2>
      <ul>
        <li><strong>Complete Blood Count (5-Part Automated CBC)</strong> — No Fasting Required — Report in 2–4 Hours</li>
        <li><strong>Thyroid Profile (FT3, FT4, Ultrasensitive TSH via CLIA)</strong> — Morning Sample Recommended — Same-Day Report</li>
        <li><strong>HbA1c (Glycosylated Hemoglobin) &amp; Fasting Blood Glucose</strong> — Diabetes Monitoring</li>
        <li><strong>Lipid Profile (Cholesterol, Triglycerides, HDL, LDL, VLDL)</strong> — 10–12 Hours Fasting Required</li>
        <li><strong>Liver Function Test (LFT) &amp; Kidney Function Test (KFT / RFT)</strong> — Biochemistry</li>
        <li><strong>Vitamin D (25-Hydroxy) &amp; Vitamin B12 CLIA Assay</strong> — Bone, Nerve &amp; Fatigue Screening</li>
        <li><strong>Fever Panel (Malaria, Dengue NS1/IgG/IgM, Typhoid, CBC, ESR, CRP)</strong> — Rapid Same-Day Reporting</li>
        <li><strong>Antenatal Care (ANC) Pregnancy Profile</strong> — CBC, Blood Group, HIV, HBsAg, VDRL, TSH, Glucose</li>
      </ul>
    </section>
  </main>
</div>`;

function runPostBuild() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('[postbuild-seo] Error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  // 1. Inject Crawl-Ready Static HTML inside <div id="root"></div>
  let html = fs.readFileSync(INDEX_PATH, 'utf-8');
  html = html.replace('<div id="root"></div>', STATIC_SEO_HTML.trim());
  fs.writeFileSync(INDEX_PATH, html, 'utf-8');
  console.log('[postbuild-seo] Injected static SEO catalog into dist/index.html');

  // 2. Copy dist/index.html to dist/404.html for GitHub Pages SPA Routing resilience
  fs.copyFileSync(INDEX_PATH, NOT_FOUND_PATH);
  console.log('[postbuild-seo] Created dist/404.html fallback for GitHub Pages deep links');

  // 3. Update lastmod date in dist/sitemap.xml
  if (fs.existsSync(SITEMAP_PATH)) {
    const today = new Date().toISOString().split('T')[0];
    let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
    console.log(`[postbuild-seo] Updated dist/sitemap.xml lastmod to ${today}`);
  }
}

runPostBuild();
