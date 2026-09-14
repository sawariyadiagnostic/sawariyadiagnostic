import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const publicCopyFiles = [
  'src/data/website-content.ts',
  'src/data/mockTests.ts',
  'src/lib/search-fuse.ts',
  'src/components/Hero.tsx',
  'src/components/TestCatalog.tsx',
  'src/components/ui/TestCard.tsx',
  'src/components/catalog/TestDetailModal.tsx',
  'src/components/About.tsx',
  'src/components/Contact.tsx',
  'src/components/Services.tsx',
  'src/components/Team.tsx',
  'src/components/HomeCollection.tsx',
  'src/components/Footer.tsx',
  'src/components/TrustIndicators.tsx',
  'src/components/ui/LegalModal.tsx',
  'src/components/ui/ReportDownloadModal.tsx',
  'src/config/site.ts',
  'index.html',
  'metadata.json',
  'public/og-image.svg',
  'public/ai.txt',
].map((file) => resolve(process.cwd(), file));

const publicCopy = publicCopyFiles
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

describe('public copy claim boundary', () => {
  it('uses request language for visitor actions and avoids unsupported handoff labels', () => {
    expect(publicCopy).not.toMatch(/Find Test|Explore Health Packages|Book Doorstep Sample|Book Home Sample Visit|WhatsApp Doctor Consultation|Patient Lab Portal|Call 24\*7 Helpline/i);
    expect(publicCopy).toMatch(/Ask the lab|Request home collection|Request a test/i);
  });

  it('does not publish unsupported speed or instant-confirmation promises', () => {
    expect(publicCopy).not.toMatch(/Immediate STAT turnaround|Quick Reports|Quick turnaround time|Instant confirmation/i);
  });

  it('does not publish unsupported performance metrics', () => {
    expect(publicCopy).not.toMatch(/Clinical Accuracy|Patients in 2026|Automated Tests|High-precision analyzers|Validated Profiles|State-of-the-art equipment|Experienced pathologists|(?:7,000|10,000|180)\+/i);
  });

  it('does not publish unapproved operational or laboratory capability claims', () => {
    expect(publicCopy).not.toMatch(/Open 24 hours|trained phlebotomist|automated|\bQC\b|sterile|safe and hygienic|Hygienic Collection|high-throughput|Most booked|bookingsLast6Months|535 in last 6 months/i);
  });

  it('does not publish unapproved legal, facility, or live-booking promises', () => {
    expect(publicCopy).not.toMatch(/live available time slots|dedicated patient parking|sample collection rooms|Online Appointment & Doctor Desk|Emergency & Lab Director|policy confirms compliance|will never be sold|regular subsidized|free diabetes checks/i);
  });

  it('does not label handoffs as completed services or doctor consultation', () => {
    expect(publicCopy).not.toMatch(/Patient Lab Portal|WhatsApp Doctor Consultation|Chat with Doctor|Call 24\*7 Helpline/i);
  });

  it('does not publish report-like patient fixtures or verification promises', () => {
    expect(publicCopy).not.toMatch(/Sample #SD-|MD Sign-off|QR-Secured|14\.2 g\/dL|2\.4 mIU\/L|92 mg\/dL|Free Home Visit \(₹0\)|>Verified</i);
  });

  it('does not expose turnaround implementation fields in public renderers', () => {
    const rendererCopy = [
      'src/lib/search-fuse.ts',
      'src/components/ui/TestCard.tsx',
      'src/components/catalog/TestDetailModal.tsx',
    ].map((file) => readFileSync(resolve(process.cwd(), file), 'utf8')).join('\n');
    expect(rendererCopy).not.toContain('turnaroundTime');
    expect(rendererCopy).not.toMatch(/No Fasting Needed|10-12 Hrs Fasting/i);
  });
});
