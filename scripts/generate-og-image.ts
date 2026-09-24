import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

export function generateOgImage(outputDir = path.resolve(process.cwd(), 'dist')) {
  const svgPath = path.resolve(process.cwd(), 'public/og-image.svg');
  if (!fs.existsSync(svgPath)) throw new Error('public/og-image.svg not found');

  const svg = fs.readFileSync(svgPath, 'utf-8');
  const pngBuffer = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'og-image.png'), pngBuffer);
  console.log('✅ Generated OG image assets in dist');
}

if (process.argv[1] && process.argv[1].endsWith('generate-og-image.ts')) generateOgImage();
