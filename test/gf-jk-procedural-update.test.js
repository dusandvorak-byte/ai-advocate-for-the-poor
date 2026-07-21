import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import {
  CASE_BUNDLE_DIGESTS,
  GF_JK_PROCEDURAL_UPDATE,
  GF_JK_SOURCE_EXCERPTS,
  identifyCaseBundleDigest,
  isGfJkEvidenceId,
  localizeGfJkProceduralUpdate
} from '../web/gf-jk-procedural-update.js';

test('the mixed intake preserves 18 received files as 17 byte streams and 15 substantive records', () => {
  const inventory = GF_JK_PROCEDURAL_UPDATE.sourceInventory;
  assert.deepEqual(inventory, {
    receivedFiles: 18,
    uniqueByteStreams: 17,
    substantiveRecords: 15,
    exactDuplicateCopies: 1,
    equivalentExportGroups: 2,
    publicSourceFilesAdded: 0
  });
  const digests = Object.values(CASE_BUNDLE_DIGESTS);
  assert.equal(digests.length, 16);
  assert.equal(new Set(digests).size, 16);
  assert.ok(digests.every((digest) => /^[a-f0-9]{64}$/.test(digest)));
});

test('only exact reviewed fingerprints route into the prepared mixed-set assessment', () => {
  for (const [id, digest] of Object.entries(CASE_BUNDLE_DIGESTS)) {
    assert.equal(identifyCaseBundleDigest(digest), id);
    assert.equal(identifyCaseBundleDigest(digest.toUpperCase()), id);
  }
  const digest = CASE_BUNDLE_DIGESTS.gfJkKszSupervision;
  const replacement = digest.endsWith('0') ? '1' : '0';
  assert.equal(identifyCaseBundleDigest(`${digest.slice(0, -1)}${replacement}`), null);
  assert.equal(identifyCaseBundleDigest(''), null);
});

test('six records route to G. F. and J. K. while other people remain separate branches', () => {
  const gfJkIds = Object.keys(CASE_BUNDLE_DIGESTS).filter(isGfJkEvidenceId);
  assert.equal(gfJkIds.length, 6);
  assert.deepEqual(GF_JK_PROCEDURAL_UPDATE.branches.map(({ id, fileCount }) => [id, fileCount]), [
    ['gf-jk', 6], ['lch', 3], ['dd', 2], ['shared', 4]
  ]);
  assert.equal(GF_JK_PROCEDURAL_UPDATE.branches.reduce((sum, item) => sum + item.fileCount, 0), 15);
});

test('official-record facts and later party claims remain separate quotation-backed layers', () => {
  const update = localizeGfJkProceduralUpdate('cs');
  assert.equal(update.facts.length, 4);
  assert.equal(update.submittedClaims.length, 3);
  for (const item of update.facts) {
    assert.ok(Object.values(GF_JK_SOURCE_EXCERPTS).some((source) => source.includes(item.citation)), `Missing official citation: ${item.citation}`);
    assert.equal(item.confidence, 'high');
  }
  for (const item of update.submittedClaims) {
    assert.ok(Object.values(GF_JK_SOURCE_EXCERPTS).some((source) => source.includes(item.citation)), `Missing party citation: ${item.citation}`);
    assert.equal(item.confidence, 'medium');
  }
});

test('conditional discontinuance is never rewritten as a conviction or a completed reopening route', () => {
  const update = localizeGfJkProceduralUpdate('cs');
  assert.equal(update.route.status, 'evidence-review');
  assert.match(update.route.label, /9\/9.*HOŘÍ/i);
  assert.match(update.mainSentence, /3,7 % THC.*závazný a jednotný postup.*9\/9.*HOŘÍ/i);
  assert.match(update.submittedClaims.find(({ id }) => id === 'conditional-discontinuance').claim, /podmíněně zastavil/i);
  assert.match(update.relevance[0].boundary, /Podmíněné zastavení.*není odsouzení/i);
  assert.doesNotMatch(`${update.title} ${update.summary} ${update.mainSentence}`, /obnova bude povolena|pravděpodobnost úspěchu/i);
});

test('plant-count differences trigger primary-record retrieval rather than a finding of judicial error', () => {
  const count = localizeGfJkProceduralUpdate('cs').relevance.find(({ id }) => id === 'plant-count');
  assert.equal(count.score, 8);
  assert.match(count.headline, /3 \+ 1, pěti a 6 \+ 1/i);
  assert.match(count.action, /protokol o vydání věci.*OKTE.*soudní usnesení/i);
  assert.match(count.boundary, /nejde o prokázaný rozpor ani chybu soudu/i);
});

test('the traffic light measures evidence-review priority and never guilt or success probability', () => {
  const update = localizeGfJkProceduralUpdate('cs');
  assert.deepEqual(update.relevance.map(({ score }) => score), [9, 8, 9, 6, 5, 2, 1]);
  assert.deepEqual(update.relevance.map(({ trafficBand }) => trafficBand), ['red-3', 'red-2', 'red-3', 'amber-3', 'amber-2', 'green-2', 'green-1']);
  const methodology = update.relevance.find(({ id }) => id === 'methodology');
  assert.match(`${methodology.title} ${methodology.headline}`, /EXTRÉM.*HOŘÍ.*9\/9/i);
  assert.match(update.publicationBoundary, /relevanci.*nikoli vinu, nezákonnost, právní nárok nebo pravděpodobnost úspěchu/i);
});

test('private reviewed originals are not shipped in the public web document directory', async () => {
  const privateDigests = new Set(Object.values(CASE_BUNDLE_DIGESTS));
  const directory = new URL('../web/documents/', import.meta.url);
  for (const name of await readdir(directory)) {
    const bytes = await readFile(new URL(name, directory));
    const digest = createHash('sha256').update(bytes).digest('hex');
    assert.ok(!privateDigests.has(digest), `Private mixed-set source published as ${name}`);
  }
  assert.equal(GF_JK_PROCEDURAL_UPDATE.sourceInventory.publicSourceFilesAdded, 0);
  assert.match(GF_JK_PROCEDURAL_UPDATE.privacy.cs, /pouze iniciály G\. F\. a J\. K\./i);
  for (const item of localizeGfJkProceduralUpdate('cs').facts) assert.doesNotMatch(item.source, /ID\s*\d+/i);
});

test('official legal links and the local-only analyzer are exposed in both languages', async () => {
  const [cs, en, app] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/app.js', import.meta.url), 'utf8')
  ]);
  for (const source of GF_JK_PROCEDURAL_UPDATE.legalSources) assert.match(source.url, /^https:\/\/e-sbirka\.gov\.cz\//);
  for (const html of [cs, en]) {
    assert.match(html, /id="gf-jk-procedural-update"/);
    assert.match(html, /id="gf-jk-priority-rows"/);
    assert.match(html, /15 (?:věcných záznamů|substantive records)/i);
  }
  assert.match(app, /identifyCaseBundleDigest/);
  assert.match(app, /renderGfJkProceduralUpdate\(\)/);
  assert.match(app, /UI\.gfJkRecognized/);
});
