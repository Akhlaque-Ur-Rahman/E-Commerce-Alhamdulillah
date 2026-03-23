/**
 * Removes light gray/white background from logo PNG.
 * Makes near-white and light-gray pixels transparent.
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, '../src/assets/alhamdulillah-logo.png');

const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const threshold = 240; // pixels with R,G,B all above this become transparent

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3] ?? 255;
  // Light gray or white: make transparent
  if (r >= threshold && g >= threshold && b >= threshold) {
    data[i + 3] = 0;
  }
  // Slightly darker grays (e.g. #e0e0e0): also make transparent
  else if (r >= 220 && g >= 220 && b >= 220) {
    data[i + 3] = 0;
  }
}

await sharp(Buffer.from(data), {
  raw: { width, height, channels },
})
  .png()
  .toFile(logoPath);

console.log('Logo background removed.');
