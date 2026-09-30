import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { Script } from 'node:vm';

const root = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');

test('all local resources exist', async () => {
  const references = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|data:)/.test(reference)) continue;
    await access(new URL(reference.split('#')[0], root));
  }
});

test('navigation and tab references resolve to unique IDs', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, id] of html.matchAll(/(?:href="#|aria-controls=")([^"]+)"/g)) assert.ok(ids.includes(id), id);
});

test('business contact and expanded audience are present', async () => {
  const config = await readFile(new URL('config.js', root), 'utf8');
  assert.match(config, /34665015804/);
  assert.match(html, /Marcas personales/);
  assert.match(html, /Pyme o negocio local/);
  assert.match(html, /id="goal"/);
  assert.match(html, /no están incluidos en la tarifa del sistema local/);
});

test('application scripts parse and respect motion preferences', async () => {
  for (const name of ['app.js', 'config.js', 'motion.js']) {
    const source = await readFile(new URL(name, root), 'utf8');
    assert.doesNotThrow(() => new Script(source, { filename: name }));
  }
  const motion = await readFile(new URL('motion.js', root), 'utf8');
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /if \(!gsap \|\| !ScrollTrigger\) return/);
  assert.match(motion, /removeEventListener/);
  assert.doesNotMatch(html, /<script[^>]+src="https?:/);
});
