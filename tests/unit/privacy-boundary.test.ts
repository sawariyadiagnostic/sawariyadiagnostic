import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { privacyPolicyText } from '../../src/data/privacy-policy';

const activeSourceFiles = [
  '.env.example',
  'src/components/ui/ReportDownloadModal.tsx',
  'src/components/Footer.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/MobileMenu.tsx',
  'src/components/layout/MobileBottomDock.tsx',
].map((file) => resolve(process.cwd(), file));

const activeSource = activeSourceFiles
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

const reportModal = readFileSync(
  resolve(process.cwd(), 'src/components/ui/ReportDownloadModal.tsx'),
  'utf8',
);

const policyDocument = readFileSync(
  resolve(process.cwd(), 'docs/legal/privacy-policy.md'),
  'utf8',
).replace(/^<!-- [\s\S]*? -->\s*/u, '');

describe('privacy and trust boundary', () => {
  it('keeps the supplied privacy policy identical in website docs and runtime copy', () => {
    expect(policyDocument).toBe(privacyPolicyText);
    expect(privacyPolicyText).toContain('Document Version: 2.0-Operative Standard');
    expect(privacyPolicyText).toContain('Effective Date: October 1, 2025');
    expect(privacyPolicyText).toContain('11. Statutory Grievance Redressal and Contact Details');
  });

  it('does not retain the stale browser-visible Web3Forms key', () => {
    expect(readFileSync(resolve(process.cwd(), '.env.example'), 'utf8')).not.toContain(
      'VITE_WEB3FORMS_ACCESS_KEY',
    );
    expect(activeSource).not.toMatch(/web3forms|access[_-]?key/i);
  });

  it('keeps report assistance contact-only', () => {
    expect(reportModal).toMatch(/does not store or display patient reports/i);
    expect(reportModal).toMatch(/contact the lab through a verified channel/i);
    expect(reportModal).toMatch(/telHref|mailto:|whatsappHref/);
    expect(reportModal).not.toMatch(/<form|fetch\(|axios|web3forms|access[_-]?key/i);
  });

  it('does not publish portal, doctor, or round-the-clock service labels', () => {
    expect(activeSource).not.toMatch(/\bportal\b|\bdoctor\b|24\s*[x*/:]\s*7|24-hour|24 hours/i);
  });
});
