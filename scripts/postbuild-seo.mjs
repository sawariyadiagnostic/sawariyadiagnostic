import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const NOT_FOUND_PATH = path.join(DIST_DIR, '404.html');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

// Core SEO Catalog injected into static HTML for Googlebot & LLM Crawlers
const STATIC_SEO_HTML = `
<div id="root">
  <main style="max-width:1024px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;line-height:1.6;">
    <header style="margin-bottom:28px;">
      <h1 style="color:#102a43;font-size:2rem;margin-bottom:8px;">Sawariya Diagnostic Lab — Central Pathology &amp; Diagnostic Lab in Charkhi Dadri</h1>
      <p><strong>Physical Address:</strong> 1st Floor, Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana 127306</p>
      <p><strong>Phone &amp; Home Sample Collection:</strong> <a href="tel:+919991941207" style="color:#155e9a;font-weight:bold;">+91 99919 41207</a> | <strong>WhatsApp Desk:</strong> +91 99919 41207</p>
      <p><strong>Operating Hours:</strong> Central laboratory is open 24*7 for walk-in patients and emergency from hospitals. Home sample collection is available from 07:00 AM to 07:00 PM.</p>
      <p>Equipped with 5-Part Automated Hematology, CLIA Chemiluminescence Immunoassays, Biochemistry, Coagulation analyzers, and rapid digital report delivery.</p>
    </header>

    <section style="margin-bottom:32px;">
      <h2 style="color:#102a43;font-size:1.4rem;border-bottom:2px solid #e2e8f0;padding-bottom:6px;">What Multi-Test Clinical Panels Are Available at Sawariya Diagnostic?</h2>
      <p>Standardized clinical panels consolidated into single physical sample draws with transparent pricing, exact fasting instructions, and verified turnaround times:</p>
      <div style="overflow-x:auto;">
        <table border="1" cellpadding="8" style="border-collapse:collapse;width:100%;text-align:left;margin-top:12px;border:1px solid #cbd5e1;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;color:#1e293b;">
              <th>Clinical Health Panel</th>
              <th>Key Analytes &amp; Parameters</th>
              <th>Fasting Requirement</th>
              <th>Transparent Price</th>
              <th>Turnaround (TAT)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Complete Hemogram (CBC + ESR)</strong></td>
              <td>16 Parameters: Hemoglobin, RBC, TLC, 5-Part DLC, Platelets, Westergren ESR</td>
              <td>Non-Fasting (Water Allowed)</td>
              <td>₹450</td>
              <td>4 Hours</td>
            </tr>
            <tr>
              <td><strong>Liver Function &amp; Biliary Panel (LFT)</strong></td>
              <td>11 Parameters: Bilirubin (Total, Direct, Indirect), SGOT/AST, SGPT/ALT, ALP, Protein, Albumin, A:G Ratio</td>
              <td>8–10 Hours Overnight Fast</td>
              <td>₹600</td>
              <td>6 Hours</td>
            </tr>
            <tr>
              <td><strong>Renal Function &amp; Complete Electrolytes (KFT)</strong></td>
              <td>9 Parameters: Serum Creatinine, Urea, Uric Acid, Sodium (Na+), Potassium (K+), Chloride (Cl-), Magnesium (Mg2+)</td>
              <td>8 Hours Overnight Fast</td>
              <td>₹1,000</td>
              <td>6 Hours</td>
            </tr>
            <tr>
              <td><strong>Lipid Profile &amp; ASCVD Risk</strong></td>
              <td>8 Parameters: Total Cholesterol, Triglycerides, HDL, LDL, VLDL, Non-HDL, Risk Ratios</td>
              <td>10–12 Hours Overnight Fast</td>
              <td>₹450</td>
              <td>6 Hours</td>
            </tr>
            <tr>
              <td><strong>Comprehensive Diabetic &amp; Glycemic Panel</strong></td>
              <td>4 Parameters: Fasting Blood Glucose, HPLC HbA1c, Estimated Average Glucose (eAG), Urine Glucose/Protein</td>
              <td>8–10 Hours Overnight Fast</td>
              <td>₹510</td>
              <td>6 Hours</td>
            </tr>
            <tr>
              <td><strong>Thyroid Profile (Total &amp; Free TFT)</strong></td>
              <td>5 Parameters: Total T3, Total T4, Ultrasensitive TSH, Free T3 (FT3), Free T4 (FT4) via CLIA</td>
              <td>Morning Fasting Preferred</td>
              <td>₹750</td>
              <td>12 Hours</td>
            </tr>
            <tr>
              <td><strong>Vital Vitamins &amp; Deep Iron Panel</strong></td>
              <td>4 Parameters: Vitamin D3 (25-OH Total), Vitamin B12 (Cyanocobalamin), Serum Ferritin, Serum Iron</td>
              <td>Morning Draw (07–10 AM)</td>
              <td>₹2,400</td>
              <td>16 Hours</td>
            </tr>
            <tr>
              <td><strong>Coagulation &amp; Clotting Screen</strong></td>
              <td>PT, INR, aPTT (Citrate Plasma Clotting Screen)</td>
              <td>Non-Fasting</td>
              <td>₹650</td>
              <td>6 Hours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section style="margin-bottom:32px;">
      <h2 style="color:#102a43;font-size:1.4rem;border-bottom:2px solid #e2e8f0;padding-bottom:6px;">Which Individual Diagnostic Tests Can You Book in Charkhi Dadri?</h2>
      <p>Browse individual tests with transparent pricing and standard specimen collection requirements:</p>
      <ul style="margin-top:8px;padding-left:20px;">
        <li><strong>Complete Blood Count (CBC)</strong> — Cellular blood counts, hemoglobin, platelets, and infection indicators.</li>
        <li><strong>HbA1c (Glycated Hemoglobin)</strong> — Gold-standard 90-day average blood sugar control via HPLC.</li>
        <li><strong>Thyroid Stimulating Hormone (TSH Ultrasensitive)</strong> — Pituitary-thyroid screening via Chemiluminescence (CLIA).</li>
        <li><strong>Serum Creatinine &amp; Blood Urea</strong> — Essential renal filtration indicators.</li>
        <li><strong>Serum Bilirubin &amp; SGPT/ALT</strong> — Liver enzyme and jaundice evaluation.</li>
        <li><strong>Lipid Profile (Cholesterol &amp; Triglycerides)</strong> — Cardiovascular and arterial risk assessment.</li>
        <li><strong>Vitamin D (25-OH) &amp; Vitamin B12</strong> — Bone health, chronic fatigue, and neurological wellness.</li>
        <li><strong>Serum Uric Acid</strong> — Joint pain and gout screening.</li>
        <li><strong>Widal / Typhoid Screen &amp; Malaria Parasite Antigen</strong> — Acute fever and seasonal infection diagnosis.</li>
        <li><strong>Urine Complete Examination (Routine &amp; Microscopy)</strong> — Urinary tract infection (UTI) and kidney screening.</li>
      </ul>
    </section>

    <section style="margin-bottom:32px;">
      <h2 style="color:#102a43;font-size:1.4rem;border-bottom:2px solid #e2e8f0;padding-bottom:6px;">Where Does Sawariya Diagnostic Provide Home Sample Collection?</h2>
      <p>Daily scheduled morning home sample collection (07:00 AM – 07:00 PM) with cold-chain sample transport across Charkhi Dadri district, Badhra Tehsil, and surrounding rural communities:</p>
      <ul style="margin-top:8px;padding-left:20px;">
        <li><strong>Charkhi Dadri City:</strong> Loharu Road, Delhi Road, Rohtak Road, Railway Road, Main Market, Civil Hospital Road, Bypass.</li>
        <li><strong>Tehsils &amp; Major Hubs:</strong> Badhra, Jhojhu Kalan, Bond Kalan, Ranila.</li>
        <li><strong>Catchment Villages:</strong> Sanjarwas, Tiwala, Atela, Rawaldhi, Imlota, Mandola, Bhandwa, Berla, Morwala, Mankawas, Kheri Sanwal, Fatehgarh, Dhani Phogat, Charkhi.</li>
      </ul>
      <p>Prescription slips can be shared directly on WhatsApp (<a href="tel:+919991941207" style="color:#155e9a;font-weight:bold;">+91 99919 41207</a>) for immediate test availability and doorstep booking confirmation.</p>
    </section>
  </main>
</div>`;

function runPostBuild() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('[postbuild-seo] Error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  // 1. Inject Crawl-Ready Static HTML inside <div id="root"></div>
  const today = new Date().toISOString().split('T')[0];
  let html = fs.readFileSync(INDEX_PATH, 'utf-8');
  html = html.replace('<div id="root"></div>', STATIC_SEO_HTML.trim());
  html = html.replace(/"dateModified":\s*"[^"]*"/g, `"dateModified": "${today}"`);
  fs.writeFileSync(INDEX_PATH, html, 'utf-8');
  console.log('[postbuild-seo] Injected static SEO catalog into dist/index.html');

  // 2. Create dedicated 404.html for static routing and crawler gates
  const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,follow" />
    <meta name="theme-color" content="#FFF9F3" />
    <title>Page not found | Sawariya Diagnostic Lab</title>
    <style>body{margin:0;padding:2rem;font:16px/1.6 system-ui,sans-serif;color:#102A43;background:#FFF9F3}main{max-width:42rem;margin:12vh auto;padding:2rem;background:#fff;border:1px solid #e5e7eb;border-radius:1rem}a{color:#155E9A;font-weight:600;margin-right:1rem}</style>
  </head>
  <body>
    <main>
      <h1>Page not found</h1>
      <p>This page may have moved or the address may be incorrect.</p>
      <p><a href="https://sawariyadiagnostic.github.io/sawariyadiagnostic/">Home</a><a href="https://sawariyadiagnostic.github.io/sawariyadiagnostic/#tests">Browse individual tests</a></p>
    </main>
  </body>
</html>`;
  fs.writeFileSync(NOT_FOUND_PATH, notFoundHtml, 'utf-8');
  console.log('[postbuild-seo] Created dedicated dist/404.html with noindex');

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
