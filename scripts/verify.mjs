import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');

const requiredFiles = [
  'index.html',
  'legal.html',
  '404.html',
  'app.js',
  'config.js',
  'style.css',
  'visual.css',
  'fonts.css',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects',
  'assets/logo.svg',
  'assets/logo-light.svg',
  'assets/bilbao.jpg',
  'assets/estetica.jpg',
  'assets/fisioterapia.jpg',
  'assets/font-0.woff2',
  'assets/font-1.woff2',
  'assets/font-3.woff2',
  'assets/font-4.woff2',
  'assets/font-5.woff2',
  'assets/font-7.woff2',
];

console.log('🔍 Checking Ratio Agency project for Cloudflare deployment...');

let missing = 0;
for (const rel of requiredFiles) {
  const p = path.join(dist, rel);
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing required file: dist/${rel}`);
    missing++;
  }
}

if (missing > 0) {
  console.error(`\nBuild check failed with ${missing} missing files.`);
  process.exit(1);
}

// Check wrangler config
const wranglerPath = path.join(root, 'wrangler.jsonc');
if (!fs.existsSync(wranglerPath)) {
  console.error('❌ Missing wrangler.jsonc in repository root');
  process.exit(1);
}

const stats = fs.statSync(path.join(dist, 'index.html'));
console.log(`✓ Verified ${requiredFiles.length} distribution files (index.html: ${(stats.size / 1024).toFixed(1)} KB)`);
console.log('✓ Cloudflare Wrangler config verified');
console.log('🚀 Ready for Cloudflare deployment!\n');
