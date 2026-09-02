import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

export function generateOgImage() {
  const svgPath = path.resolve(process.cwd(), 'public/og-image.svg');
  if (!fs.existsSync(svgPath)) {
    console.error('❌ public/og-image.svg not found!');
    return;
  }

  const svg = fs.readFileSync(svgPath, 'utf-8');
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const publicJpgPath = path.resolve(process.cwd(), 'public/og-image.jpg');
  const publicPngPath = path.resolve(process.cwd(), 'public/og-image.png');

  fs.writeFileSync(publicJpgPath, pngBuffer);
  fs.writeFileSync(publicPngPath, pngBuffer);

  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'og-image.jpg'), pngBuffer);
    fs.writeFileSync(path.join(distDir, 'og-image.png'), pngBuffer);
  }

  console.log('✅ Generated 1200x630 og-image.jpg & og-image.png successfully!');
}

if (process.argv[1] && process.argv[1].endsWith('generate-og-image.ts')) {
  generateOgImage();
}
