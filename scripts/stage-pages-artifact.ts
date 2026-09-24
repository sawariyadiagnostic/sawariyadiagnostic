import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SOURCE_DIR = path.resolve(process.cwd(), 'dist');
const STAGED_DIR = path.resolve(process.cwd(), 'dist-pages');
const REQUIRED_FILES = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'release.json'];
const FORBIDDEN_FILE = /(?:^|[\\/])server\.cjs(?:\.map)?$|\.map$/i;

export function validatePublicArtifact(directory = STAGED_DIR): true {
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    throw new Error(`Public artifact directory is missing: ${directory}`);
  }

  for (const file of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(directory, file))) {
      throw new Error(`Public artifact is missing required file: ${file}`);
    }
  }

  let release: unknown;
  try {
    release = JSON.parse(fs.readFileSync(path.join(directory, 'release.json'), 'utf8'));
  } catch {
    throw new Error('Public artifact has invalid release.json');
  }
  if (!release || typeof release !== 'object') throw new Error('Public artifact has invalid release.json');
  const marker = release as { buildSha?: unknown; runId?: unknown };
  if (!/^[a-f0-9]{40}$/i.test(String(marker.buildSha ?? '')) || !(marker.runId === null || /^\d+$/.test(String(marker.runId)))) {
    throw new Error('Public artifact has invalid release.json');
  }

  const files = fs.readdirSync(directory, { recursive: true, withFileTypes: true });
  const forbidden = files
    .filter((entry) => entry.isFile() && FORBIDDEN_FILE.test(entry.name))
    .map((entry) => entry.name);
  if (forbidden.length) {
    throw new Error(`Public artifact contains forbidden files: ${forbidden.join(', ')}`);
  }

  return true;
}

export function stagePagesArtifact(source = SOURCE_DIR, target = STAGED_DIR): true {
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    throw new Error(`Build output directory is missing: ${source}`);
  }
  if (path.resolve(source) === path.resolve(target)) {
    throw new Error('Build output and Pages staging directories must differ');
  }

  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, target, {
    recursive: true,
    filter: (entry) => !FORBIDDEN_FILE.test(entry),
  });
  fs.writeFileSync(path.join(target, 'release.json'), `${JSON.stringify({
    buildSha: process.env.GITHUB_SHA ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
    runId: process.env.GITHUB_RUN_ID ?? null,
  }, null, 2)}\n`);
  return validatePublicArtifact(target);
}

const action = process.argv[2];
if (action === 'stage') {
  stagePagesArtifact();
  console.log('Staged and validated static GitHub Pages artifact in dist-pages.');
} else if (action === 'validate') {
  validatePublicArtifact();
  console.log('Validated static GitHub Pages artifact in dist-pages.');
}
