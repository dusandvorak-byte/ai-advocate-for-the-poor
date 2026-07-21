import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import {
  PRAGUE_THC_DIGESTS,
  identifyPragueThcDigest,
  localizePragueThcUpdate
} from '../web/prague-thc-remand-update.js';

test('both Prague THC records are accepted only by their exact reviewed fingerprints', () => {
  assert.equal(identifyPragueThcDigest(PRAGUE_THC_DIGESTS.courtOrder), 'courtOrder');
  assert.equal(identifyPragueThcDigest(PRAGUE_THC_DIGESTS.creatorRequest), 'creatorRequest');
  assert.equal(identifyPragueThcDigest(`0${PRAGUE_THC_DIGESTS.courtOrder.slice(1)}`), null);
  assert.equal(identifyPragueThcDigest('not-a-digest'), null);
});

test('the court result states the complete appellate and returned-judgment identity', () => {
  const result = localizePragueThcUpdate('cs', 'courtOrder');
  assert.equal(result.source.institution, 'Vrchní soud v Praze');
  assert.equal(result.source.documentDate, '2025-07-29');
  assert.equal(result.source.reference, '11 To 88/2024-2990');
  assert.match(result.source.returnedJudgment, /Městského soudu v Praze.*7\. 5\. 2024.*45 T 1\/2024-2430.*vrácena.*novému projednání/i);
  assert.match(result.facts[0].claim, /29\. 7\. 2025.*11 To 88\/2024-2990.*7\. 5\. 2024.*45 T 1\/2024-2430.*§ 259 odst\. 1.*vrátil Městskému soudu v Praze.*novému projednání a rozhodnutí/i);
});

test('the court result preserves the precise judicial findings in paragraphs 31 to 41', () => {
  const result = localizePragueThcUpdate('cs', 'courtOrder');
  const facts = result.facts.map(({ claim }) => claim).join(' ');
  assert.match(facts, /Bod 31.*laické chemické a biologické úsudky/i);
  assert.match(facts, /Bod 34.*legální/i);
  assert.match(facts, /Bod 35.*1,0 % THC/i);
  assert.match(facts, /Bod 39.*kontroloval a hodnotil/i);
  assert.match(facts, /Bod 41.*naprostou nepřezkoumatelnost/i);
  assert.ok(result.relevance.every(({ trafficBand }) => trafficBand === 'red-3'));
});

test('the public classification wording uses lawful or prohibited, not the disputed cannabis label', () => {
  const result = localizePragueThcUpdate('cs', 'courtOrder');
  const serialized = JSON.stringify(result);
  assert.match(serialized, /legální.*zakázané/i);
  assert.doesNotMatch(serialized, /technické konopí|technického konopí|technická marihuana/i);
});

test('the October 2026 hearing is displayed only as creator-confirmed chronology', () => {
  const result = localizePragueThcUpdate('cs', 'courtOrder');
  assert.match(result.creatorChronology.statement, /Městského soudu v Praze.*říjen 2026/i);
  assert.match(result.creatorChronology.provenance, /Autorem potvrzeno dne 21\. 7\. 2026/i);
  assert.match(result.creatorChronology.boundary, /není obsažen.*11 To 88\/2024-2990/i);
  assert.match(result.deadline.value, /Neuvedena/i);
});

test('the appellate order is not inflated into a nationwide finding or final acquittal', () => {
  const result = localizePragueThcUpdate('cs', 'courtOrder');
  assert.match(result.systemicFinding.limitation, /neříká.*neexistuje závazný měřicí předpis/i);
  assert.match(result.systemicFinding.limitation, /více procesních i věcných důvodů/i);
  assert.match(result.systemicFinding.limitation, /nenařídilo zproštění/i);
  assert.match(result.doesNotProve.join(' '), /Nejde o konečné zproštění/i);
});

test('the creator filing remains a separate dated claim rather than a court finding', () => {
  const result = localizePragueThcUpdate('cs', 'creatorRequest');
  assert.equal(result.source.documentDate, '2024-11-28');
  assert.match(result.systemicFinding.label, /AUTORSKÉ PODÁNÍ.*NIKOLI SOUDNÍ ZJIŠTĚNÍ/i);
  assert.match(result.systemicFinding.headline, /28\. 11\. 2024/i);
  assert.match(result.systemicFinding.limitation, /samo neprokazuje pravdivost/i);
});

test('the application recognizes the new records while their private source PDFs remain unpublished', async () => {
  const [app, cs, en, publicDocuments] = await Promise.all([
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readdir(new URL('../web/documents/', import.meta.url))
  ]);
  assert.match(app, /identifyPragueThcDigest\(digest\)/);
  assert.match(app, /localizePragueThcUpdate\(language, pragueThcEvidenceId\)/);
  assert.match(app, /UI\.pragueThcRecognized/);
  for (const html of [cs, en]) {
    assert.match(html, /id="v3-judicial-breakthrough"/);
    assert.match(html, /id="v3-breakthrough-source"/);
  }
  assert.equal(publicDocuments.some((name) => /11.?To.?88|28.?11.?2024/i.test(name)), false);
});
