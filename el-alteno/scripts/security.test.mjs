import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('security headers protect framing and restrict external resources', () => {
  const config = fs.readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
  for (const required of ['Content-Security-Policy', "frame-ancestors 'none'", "object-src 'none'", 'X-Frame-Options', 'DENY', 'Referrer-Policy', 'Permissions-Policy', 'https://formspree.io', 'https://www.google.com']) assert.ok(config.includes(required), required);
});
test('original event videos and design candidate are not public', () => {
  for (const file of ['images/events-gallery/VID_20231021_140635.mp4', 'images/events-gallery/VID_20231203_134004.mp4', 'images/local_para_eventos/_candidates/bar/bar-candidate-03-cocktails.png', 'videos/hero-bg.mp4']) assert.equal(fs.existsSync(new URL('../public/' + file, import.meta.url)), false, file);
});
test('approved runtime videos remain available', () => {
  for (const file of ['bar-service.mp4','optimized/gallery-room-360.mp4','optimized/gallery-celebration-720.mp4','optimized/walkthrough-720.mp4','optimized/hero-720.mp4','optimized/tortillas-720.mp4']) assert.ok(fs.existsSync(new URL('../public/videos/' + file, import.meta.url)), file);
});
