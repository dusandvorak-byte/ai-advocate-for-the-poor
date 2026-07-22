import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const read = (path, encoding = 'utf8') => readFile(new URL(path, import.meta.url), encoding);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

const outputPaths = [
  'dusan-dvorak-motion-to-reopen-filed-2026-07-12.pdf',
  'dusan-dvorak-addendum-draft-2026-07-22.pdf',
  'lch-motion-to-reopen-working-draft-2026-07-22.pdf',
  'mk-jk-motion-to-reopen-working-draft-2026-07-22.pdf',
  'gf-jk-procedural-memorandum-2026-07-22.pdf'
];

test('all current public entry points expose the five reviewed v3.2 outputs', async () => {
  const pages = await Promise.all([
    read('../web/index.html'),
    read('../web/en.html'),
    read('../web/en/index.html')
  ]);

  for (const page of pages) {
    assert.match(page, /id="reopening-outputs-v32"/);
    assert.match(page, /href="#reopening-outputs-v32"/);
    for (const path of outputPaths) assert.match(page, new RegExp(`documents/${path.replaceAll('.', '\\.')}`));
  }
});

test('the visible labels distinguish the single filed original from four unfiled outputs', async () => {
  const [cs, en] = await Promise.all([read('../web/index.html'), read('../web/en.html')]);
  assert.match(cs, /Podáno 12\. 7\. 2026 · přesný originál/);
  assert.match(cs, /Pracovní dodatek · dosud nepodán/);
  assert.match(cs, /Procesní memorandum · nikoli návrh/);
  assert.match(cs, /pouze první PDF je skutečně podané/i);
  assert.match(en, /Filed 12 July 2026 · exact original/);
  assert.match(en, /Working addendum · not filed/);
  assert.match(en, /Procedural memorandum · not a motion/);
  assert.match(en, /only the first PDF was actually filed/i);
});

test('the document manifest authenticates every reviewed public PDF and its page count', async () => {
  const manifest = JSON.parse(await read('../web/documents/manifest.json'));
  const items = [...manifest.filedSourceDocuments, ...manifest.generatedReviewedOutputs];
  assert.equal(manifest.version, 3);
  assert.equal(manifest.publishedAt, '2026-07-22');
  assert.equal(items.length, 5);

  for (const item of items) {
    const bytes = await read(`../web/documents/${item.path}`, null);
    assert.equal(sha256(bytes), item.sha256, `Digest mismatch: ${item.path}`);
    const pageObjects = bytes.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) || [];
    assert.equal(pageObjects.length, item.pages, `Page-count mismatch: ${item.path}`);
  }
});

test('the filed Dušan Dvořák PDF is the authorised byte-for-byte source, not a generated substitute', async () => {
  const manifest = JSON.parse(await read('../web/documents/manifest.json'));
  const [filed] = manifest.filedSourceDocuments;
  assert.equal(filed.sha256, 'e59f9ffde1001d232bd27d1017911d31ba85113413a8aec768d31d2c001ce691');
  assert.equal(filed.copiedByteForByte, true);
  assert.equal(filed.anonymized, false);
  assert.match(filed.publicationStatus, /filed exact original/i);
  assert.match(filed.publicationBasis, /expressly authorised/i);
});

test('public working outputs consistently identify other people by initials', async () => {
  const [cs, en, builder] = await Promise.all([
    read('../web/index.html'),
    read('../web/en.html'),
    read('../tools/build_reopening_outputs_v32.py')
  ]);
  const publicSource = `${cs}\n${en}\n${builder}`;
  assert.match(publicSource, /L\. CH\./);
  assert.match(publicSource, /M\. K\. \/ J\. K\./);
  assert.match(publicSource, /G\. F\. \/ J\. K\./);
});

test('each case output keeps its court path, dates, and reference numbers visible', async () => {
  const cs = await read('../web/index.html');
  assert.match(cs, /Okresní soud v Prostějově[\s\S]*2 T 104\/2010/);
  assert.match(cs, /KS Brno 28\. 2\. 2019, č\. j\. 50 T 7\/2018-603/);
  assert.match(cs, /VS Olomouc 6\. 11\. 2019, č\. j\. 5 To 39\/2019-707/);
  assert.match(cs, /KS Hradec Králové 27\. 2\. 2017, č\. j\. 9 T 5\/2016-948/);
  assert.match(cs, /ÚS 9\. 7\. 2019, sp\. zn\. IV\. ÚS 1140\/18/);
  assert.match(cs, /18\. 6\. 2025, č\. j\. 15 T 11\/2025-122/);
});

test('shared evidence remains comparative and never becomes an automatic reopening conclusion', async () => {
  const [cs, en, builder] = await Promise.all([
    read('../web/index.html'),
    read('../web/en.html'),
    read('../tools/build_reopening_outputs_v32.py')
  ]);
  assert.match(cs, /hotový závěr z jiné kauzy se nikdy nepřenáší/i);
  assert.match(cs, /srovnávací pramen, nikoli automatické zproštění ani samočinný důvod obnovy/i);
  assert.match(en, /a prepared conclusion from another case is never transferred/i);
  assert.match(en, /comparative source, not an automatic acquittal or an automatic ground for reopening/i);
  assert.match(builder, /pozdější soudní názor není sám o sobě novou skutkovou okolností/i);
});

test('the 1999 THC thesis and the 30,000–50,000 estimate are visibly attributed and bounded', async () => {
  const [cs, en, portfolio] = await Promise.all([
    read('../web/index.html'),
    read('../web/en.html'),
    read('../web/case-portfolio.js')
  ]);
  assert.match(cs, /KONKRÉTNÍ APLIKACE DNES V ČESKÉ REPUBLICE U CCA 30–50 TISÍC OBČANŮ/);
  assert.match(cs, /orientační odhad autora.*nejde o výsledek oficiální statistiky/i);
  assert.match(en, /CONCRETE APPLICATION TODAY IN THE CZECH REPUBLIC FOR APPROXIMATELY 30,000–50,000 CITIZENS/);
  assert.match(en, /creator’s approximate estimate.*neither an official statistic/i);
  assert.match(portfolio, /Od roku 1999.*rozdíly mohou být desetinásobné.*doložili důkazy/is);
  assert.doesNotMatch(portfolio, /Od roku 1993|Since 1993/i);
});
