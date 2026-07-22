import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const read = (path, encoding = 'utf8') => readFile(new URL(path, import.meta.url), encoding);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

test('all public entry points expose the same editorial front page and Votruba credit', async () => {
  const pages = await Promise.all([
    read('../web/index.html'),
    read('../web/en.html'),
    read('../web/en/index.html')
  ]);

  for (const page of pages) {
    assert.match(page, /class="news-header"/);
    assert.match(page, /class="editorial-lead"/);
    assert.match(page, /class="editorial-card-grid"/);
    assert.match(page, /Jiří Votruba/);
    assert.match(page, /assets\/votruba\/prague\.jpg/);
    assert.match(page, /assets\/votruba\/write-lawmakers\.jpg/);
    assert.match(page, /assets\/votruba\/hold\.jpg/);
    assert.match(page, /assets\/votruba\/friends\.jpg/);
    assert.match(page, /assets\/votruba\/sing\.jpg/);
  }
});

test('the editorial illustration layer is expressly separated from evidence', async () => {
  const [cs, en] = await Promise.all([read('../web/index.html'), read('../web/en.html')]);
  assert.match(cs, /ilustrační vrstva, nikoli důkaz/i);
  assert.match(cs, /nejsou pramenem k žádnému právnímu nebo skutkovému závěru/i);
  assert.match(en, /editorial layer, not evidence/i);
  assert.match(en, /not a source for any legal or factual conclusion/i);
});

test('published Votruba assets match the retrieved originals', async () => {
  const expected = {
    'write-lawmakers.jpg': '7e51e140047a36250e7efe1da6c73d4409aabbbc498f9f2b79aca413a9948680',
    'fly.jpg': 'fd1fbf8d71fb783f0e8b4deba3cca8434a9c3def15764d88c189296273aa06bb',
    'hold.jpg': '06308171f6070574ba9b83c46d96f1d5e2411668bf41819b596a67091f059125',
    'prague.jpg': 'c4c6aa752cbfdb5e6211650972a84138e47c2c8485ec9f9aa55be05216b70990',
    'fly-plural.jpg': 'f46883e28b1b703a4fd0c8e4e10152acf0f9db2502669f41fb4df6d758245b48',
    'friends.jpg': '9f2e5320ce76eebc73ce26714d7a31c2846d2924581a0188d5eaf2473f98b359',
    'sing.jpg': '14b101ce67243ec9bb6815470f108bbf45e532c6ba4a007ab88d827f73141756'
  };

  for (const [name, digest] of Object.entries(expected)) {
    const bytes = await read(`../web/assets/votruba/${name}`, null);
    assert.equal(sha256(bytes), digest, `Unexpected illustration bytes: ${name}`);
  }
});

test('archive viewers link back to the live site while exact entry files retain submission hashes', async () => {
  const base = '../web/archive/submission-2026-07-20/';
  const [manifestText, csViewer, enViewer] = await Promise.all([
    read(`${base}archive-manifest.json`),
    read(`${base}index.html`),
    read(`${base}en.html`)
  ]);
  const manifest = JSON.parse(manifestText);

  assert.deepEqual(manifest.entryPoints, { cs: 'index.original.html', en: 'en.original.html' });
  assert.deepEqual(manifest.viewerEntryPoints, { cs: 'index.html', en: 'en.html' });
  assert.match(csViewer, /href="\.\.\/\.\.\/index\.html"[\s\S]*aktuální živý web v3\.2/i);
  assert.match(enViewer, /href="\.\.\/\.\.\/en\.html"[\s\S]*current live website v3\.2/i);
  assert.match(csViewer, /Navigační lišta byla přidána později/i);
  assert.match(enViewer, /navigation bar was added later/i);
});
