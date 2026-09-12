import fs from 'node:fs';
import path from 'node:path';
import { bilingualGuideSchema, isPublishableGuide } from '../src/content-guide-schema';

const CONTENT_DIR = path.resolve(process.cwd(), 'content/test-guides');

export function validateContentDirectory(directory = CONTENT_DIR) {
  if (!fs.existsSync(directory)) return { files: 0, published: 0 };
  const files = fs.readdirSync(directory).filter((file) => file.endsWith('.json')).sort();
  let published = 0;

  for (const file of files) {
    const source = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
    const result = bilingualGuideSchema.safeParse(source);
    if (!result.success) {
      throw new Error(`${file}: ${result.error.issues.map((issue) => issue.message).join('; ')}`);
    }
    if (isPublishableGuide(result.data)) published += 1;
  }

  return { files: files.length, published };
}

if (process.argv[1]?.endsWith('validate-content.ts')) {
  const result = validateContentDirectory();
  console.log(`Validated ${result.files} guide record(s); ${result.published} publishable.`);
}
