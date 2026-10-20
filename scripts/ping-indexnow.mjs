/**
 * IndexNow Submission Utility for Sawariya Diagnostic
 *
 * IndexNow is an open protocol created by Microsoft Bing and Yandex to instantly notify
 * search engines (which in turn index content into Bing and ChatGPT search) when URLs
 * are updated or published.
 *
 * Usage:
 *   node scripts/ping-indexnow.mjs <API_KEY>
 *
 * Or set INDEXNOW_KEY environment variable.
 */

import https from 'node:https';

const HOST = 'sawariyadiagnostic.github.io';
const SITE_URL = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic/';
const API_KEY = process.argv[2] || process.env.INDEXNOW_KEY;

if (!API_KEY) {
  console.log('[IndexNow] Notice: No INDEXNOW_KEY provided. Skipping automated ping.');
  console.log('[IndexNow] To enable: Generate a key in Bing Webmaster Tools (or an arbitrary 32-char hex string),');
  console.log(`[IndexNow] place it as public/<key>.txt, and run: node scripts/ping-indexnow.mjs <key>`);
  process.exit(0);
}

const payload = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: `${SITE_URL}${API_KEY}.txt`,
  urlList: [
    SITE_URL,
    `${SITE_URL}#tests`
  ]
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`[IndexNow] Response status code: ${res.statusCode}`);
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('[IndexNow] Successfully submitted site URLs to IndexNow network (Bing, Yandex, etc.)!');
  } else {
    console.warn(`[IndexNow] Search engines returned HTTP ${res.statusCode}. Check if key file is accessible.`);
  }
});

req.on('error', (error) => {
  console.error('[IndexNow] Error submitting to IndexNow:', error.message);
});

req.write(payload);
req.end();
