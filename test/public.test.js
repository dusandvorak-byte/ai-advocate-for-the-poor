import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const requiredIds = [
  'files', 'load', 'load-case', 'doc', 'analyse', 'status', 'memory-out',
  'memory-summary', 'branches', 'memory-documents', 'memory-references',
  'memory-dates', 'memory-limitations', 'analysis-out', 'facts',
  'interpretation', 'uncertainty', 'actions'
  , 'registry', 'registry-statements', 'registry-pending', 'registry-cases',
  'case-study', 'case-study-intro', 'case-study-timeline', 'case-study-conflicts'
];

test('Czech and English pages expose the same complete interactive surface', async () => {
  const [cs, en] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8')
  ]);

  assert.match(cs, /<html lang="cs">/);
  assert.match(en, /<html lang="en">/);
  assert.match(cs, /href="en\.html"/);
  assert.match(en, /href="index\.html"/);

  for (const html of [cs, en]) {
    for (const id of requiredIds) {
      const occurrences = html.match(new RegExp(`id="${id}"`, 'g')) || [];
      assert.equal(occurrences.length, 1, `Expected exactly one #${id}`);
    }
    assert.match(html, /<script type="module" src="app\.js"><\/script>/);
    assert.match(html, /id="status"[^>]*role="status"/);
  }
});

test('Pages deployment runs tests and publishes only the reviewed web directory', async () => {
  const workflow = await readFile(new URL('../.github/workflows/static.yml', import.meta.url), 'utf8');
  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /needs: test/);
  assert.match(workflow, /path: '\.\/web'/);
  assert.doesNotMatch(workflow, /path: ['"]?\.['"]?\s*$/m);
});

test('browser rendering never shadows the global document object', async () => {
  const app = await readFile(new URL('../web/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /for\s*\(const\s+document\s+of/);
  assert.match(app, /const entry = document\.createElement\('li'\)/);
});
