import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { CASE_MEMORY } from '../web/case-memory.js';
import {
  identifyPrisonerReopeningDigest,
  localizePrisonerReopeningUpdate,
  PRISONER_REOPENING_DIGESTS,
  PRISONER_REOPENING_SOURCE_EXCERPTS,
  PRISONER_REOPENING_UPDATE
} from '../web/prisoner-reopening-update.js';

test('only the exact private motion receives the reviewed L. CH. comparison', () => {
  const digest = PRISONER_REOPENING_DIGESTS.privateOriginal;
  assert.match(digest, /^[a-f0-9]{64}$/);
  assert.equal(identifyPrisonerReopeningDigest(digest), 'private-original');
  assert.equal(identifyPrisonerReopeningDigest(`${digest.slice(0, -1)}0`), null);
  assert.equal(identifyPrisonerReopeningDigest(''), null);
});

test('the private source PDF is not published in the web document directory', async () => {
  const directory = new URL('../web/documents/', import.meta.url);
  const files = (await readdir(directory)).filter((name) => name.endsWith('.pdf'));
  for (const name of files) {
    const bytes = await readFile(new URL(name, directory));
    assert.notEqual(createHash('sha256').update(bytes).digest('hex'), PRISONER_REOPENING_DIGESTS.privateOriginal);
  }
  assert.match(PRISONER_REOPENING_UPDATE.source.status.cs, /soukromý originál.*nezveřejňuje/i);
});

test('the public identity is L. CH. and links to the official 2025 Smoke page', () => {
  const update = localizePrisonerReopeningUpdate('cs');
  assert.equal(update.subjectLabel, 'L. CH.');
  assert.match(update.publicContext.label, /^L\. CH\. z dokumentu České televize Smoke \(2025\)$/);
  assert.equal(update.publicContext.url, 'https://www.ceskatelevize.cz/porady/16298026696-smoke/');
  assert.match(update.publicContext.boundary, /neprokazuje.*testovacího zadání.*obnovy/i);
  assert.deepEqual(update.courtPath.map(({ court, date, reference }) => ({ court, date, reference })), [
    { court: 'Krajský soud v Brně', date: '2019-02-28', reference: '50 T 7/2018-603' },
    { court: 'Vrchní soud v Olomouci', date: '2019-11-06', reference: '5 To 39/2019-707' }
  ]);
});

test('source statements, author-confirmed facts, and system synthesis remain separate layers', () => {
  const update = localizePrisonerReopeningUpdate('cs');
  assert.equal(update.source.sourceStatements.length, 5);
  assert.equal(update.authorBaseline.facts.length, 4);
  assert.equal(update.comparison.length, 6);
  assert.match(update.authorBaseline.confidence, /přijímá údaje autora.*nevydává.*výrok soudu/i);
  assert.ok(update.source.sourceStatements.every((item) => item.citation && item.limitation));
  assert.ok(update.comparison.every((item) => item.meaning && item.boundary));
});

test('every displayed motion quotation occurs in the reviewed anonymized source excerpts', () => {
  for (const item of PRISONER_REOPENING_UPDATE.source.sourceStatements) {
    assert.ok(PRISONER_REOPENING_SOURCE_EXCERPTS.includes(item.citation));
    if (item.supportingCitation) assert.ok(PRISONER_REOPENING_SOURCE_EXCERPTS.includes(item.supportingCitation));
    assert.doesNotMatch(`${item.citation} ${item.supportingCitation ?? ''}`, /(?:sp\.?\s?zn\.?|č\.?\s?j\.?|KRPB|\bPH\b|\bMF\b)/i);
  }
});

test('the six-link traffic light measures relevance and never predicts success', () => {
  const update = localizePrisonerReopeningUpdate('cs');
  assert.deepEqual(update.comparison.map(({ score }) => score), [9, 8, 7, 6, 5, 2]);
  assert.deepEqual(update.comparison.map(({ trafficBand }) => trafficBand), ['red-3', 'red-2', 'red-1', 'amber-3', 'amber-2', 'green-2']);
  assert.equal(update.overall.score, 9);
  assert.match(update.overall.boundary, /není 100% šance.*nejvyšší.*průnik/i);
  assert.match(update.summary, /nikoli šanci na úspěch/i);
});

test('every attached present-day memory record and case-law reference exists in shared memory', () => {
  const statementIds = new Set(CASE_MEMORY.verifiedStatements.map(({ id }) => id));
  const caseRefs = new Set(CASE_MEMORY.jurisprudence.map(({ reference }) => reference));
  for (const item of PRISONER_REOPENING_UPDATE.comparison) {
    for (const id of item.memoryRecordIds) assert.ok(statementIds.has(id), `Missing memory record ${id}`);
    for (const reference of item.jurisprudenceRefs) assert.ok(caseRefs.has(reference), `Missing case-law record ${reference}`);
  }
  const localized = localizePrisonerReopeningUpdate('en');
  assert.ok(localized.comparison.some((item) => item.memoryEvidence.length >= 3));
  assert.ok(localized.comparison.some((item) => item.jurisprudence.length >= 2));
});

test('later official evidence is a candidate new input, not an automatic reopening ground', () => {
  const update = localizePrisonerReopeningUpdate('cs');
  const novelty = update.comparison.find(({ id }) => id === 'new-and-material');
  assert.match(novelty.meaning, /odpověď z roku 2025.*návrhu z roku 2022/i);
  assert.match(novelty.boundary, /neznamená automaticky procesní novost.*úplným spisem/i);
  const release = update.comparison.find(({ id }) => id === 'current-situation');
  assert.match(release.boundary, /samo.*nezakládá důvod obnovy/i);
});

test('the proposed rewrite covers methodology, novelty, personal scope, EU law, and current relief', () => {
  const update = localizePrisonerReopeningUpdate('cs');
  const plan = update.rewritePlan.join(' ');
  assert.equal(update.rewritePlan.length, 8);
  assert.match(plan, /SOP.*homogenizaci.*chromatogramy.*nejistotu měření.*THC\/THCA/i);
  assert.match(plan, /novosti.*materiálnosti.*Tpjn 302\/2012.*8 Tz 25\/2015/i);
  assert.match(plan, /9 osobně přičítaných rostlin/i);
  assert.match(plan, /Oznamovací povinnost EU/i);
  assert.match(plan, /podmíněném propuštění.*právní zájem/i);
});

test('both homepages and the local analyzer expose the L. CH. update with public court references but private identity', async () => {
  const [cs, en, app, moduleSource] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/prisoner-reopening-update.js', import.meta.url), 'utf8')
  ]);
  for (const html of [cs, en]) {
    assert.match(html, /id="prisoner-reopening-update"/);
    assert.match(html, /L\. CH\./);
    assert.match(html, /v2\.5/i);
  }
  assert.match(app, /identifyPrisonerReopeningDigest/);
  assert.match(app, /renderPrisonerReopeningUpdate\(\)/);
  assert.match(app, /UI\.prisonerRecognized/);
  assert.match(moduleSource, /Krajský soud v Brně[\s\S]*50 T 7\/2018-603/);
  assert.match(moduleSource, /Vrchní soud v Olomouci[\s\S]*5 To 39\/2019-707/);
  assert.doesNotMatch(moduleSource, /(?:KRPB-|\bPH a MF\b|(?:datum narození|\bnar\.|\bbytem\b|adresa|věznice|PSČ|postal code)\s*[:=]\s*['"]?[0-9A-Za-zÀ-ž])/i);
  assert.match(moduleSource, /Celé jméno, datum narození, adresy, věznice, podpisy.*zůstávají neveřejné/);
});
