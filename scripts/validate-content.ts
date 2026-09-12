import fs from 'node:fs';
import path from 'node:path';
import { bilingualGuideSchema, isPublishableGuide } from '../src/content-guide-schema';

const CONTENT_DIR = path.resolve(process.cwd(), 'content/test-guides');

export function validateContentDirectory(directory = CONTENT_DIR) {
  if (!fs.existsSync(directory)) return { files: 0, published: 0 };
  const entries = fs.readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
  let published = 0;

  for (const entry of entries) {
    const folder = path.join(directory, entry.name);
    const file = `${entry.name}/guide.json`;
    const metadataPath = path.join(folder, 'guide.json');
    if (!fs.existsSync(metadataPath)) throw new Error(`${file}: guide.json is required`);

    const source = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const result = bilingualGuideSchema.safeParse(source);
    if (!result.success) {
      throw new Error(`${file}: ${result.error.issues.map((issue) => issue.message).join('; ')}`);
    }

    const englishPath = path.resolve(process.cwd(), result.data.englishPath);
    const hindiPath = path.resolve(process.cwd(), result.data.hindiPath);
    if (!fs.existsSync(englishPath) || !fs.existsSync(hindiPath)) {
      throw new Error(`${file}: both approved language Markdown files are required`);
    }
    if (!fs.readFileSync(englishPath, 'utf8').trim() || !fs.readFileSync(hindiPath, 'utf8').trim()) {
      throw new Error(`${file}: bilingual Markdown files cannot be empty`);
    }

    if (isPublishableGuide(result.data)) published += 1;
  }

  return { files: entries.length, published };
}

if (process.argv[1]?.endsWith('validate-content.ts')) {
  const result = validateContentDirectory();
  console.log(`Validated ${result.files} guide record(s); ${result.published} publishable.`);
}
