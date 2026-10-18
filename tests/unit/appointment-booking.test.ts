import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../../src/config/site';

describe('appointment booking slot integration', () => {
  const homeCollectionSource = readFileSync(
    resolve(process.cwd(), 'src/components/HomeCollection.tsx'),
    'utf8'
  );
  const contactSource = readFileSync(
    resolve(process.cwd(), 'src/components/Contact.tsx'),
    'utf8'
  );

  it('houses the Cal.com appointment integration in HomeCollection only', () => {
    // 1. Verifies @calcom/embed-react is imported in HomeCollection
    expect(homeCollectionSource).toContain('from "@calcom/embed-react"');
    expect(homeCollectionSource).toContain('getCalApi');
    expect(homeCollectionSource).toContain('<Cal');

    // 2. Verifies Cal.com is configured with canonical siteConfig integrations
    expect(homeCollectionSource).toContain('siteConfig.integrations.calNamespace');
    expect(homeCollectionSource).toContain('siteConfig.integrations.calLink');

    // 3. Verifies Cal.com is completely purged from Contact
    expect(contactSource).not.toContain('@calcom/embed-react');
    expect(contactSource).not.toContain('getCalApi');
    expect(contactSource).not.toContain('<Cal');
    expect(contactSource).not.toContain('Launch Interactive Calendar');
  });

  it('provides an in-place button expansion for the appointment calendar', () => {
    // Checks the expansion toggle button and state in HomeCollection
    expect(homeCollectionSource).toContain('const [showCalendar, setShowCalendar] = useState(false);');
    expect(homeCollectionSource).toContain('onClick={() => setShowCalendar(!showCalendar)}');
    expect(homeCollectionSource).toContain('Open appointment calendar');
    expect(homeCollectionSource).toContain('Hide appointment calendar');
  });

  it('provides an honest fallback when calendar embed fails', () => {
    expect(homeCollectionSource).toContain('const [calendarError, setCalendarError] = useState(false);');
    expect(homeCollectionSource).toContain('setCalendarError(true);');
    expect(homeCollectionSource).toContain('Calendar temporarily unavailable');
    expect(homeCollectionSource).toContain('role="alert"');
  });

  it('enforces that exactly one appointment calendar embed exists across the client source', () => {
    const componentDir = resolve(process.cwd(), 'src/components');
    const getTsxFiles = (dir: string): string[] => {
      const entries = readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];
      for (const entry of entries) {
        const fullPath = resolve(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...getTsxFiles(fullPath));
        } else if (/\.(tsx|ts)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
      return files;
    };

    const allFiles = getTsxFiles(componentDir);
    const filesWithCal = allFiles.filter((filePath) => {
      const content = readFileSync(filePath, 'utf8');
      return content.includes('@calcom/embed-react') && content.includes('<Cal');
    });

    expect(filesWithCal).toHaveLength(1);
    expect(filesWithCal[0]).toContain('HomeCollection.tsx');
  });
});
