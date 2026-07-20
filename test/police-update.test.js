import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  identifyPoliceUpdateDigest,
  localizePoliceUpdate,
  POLICE_UPDATE_DIGEST,
  POLICE_UPDATE_DIGESTS,
  POLICE_UPDATE_SOURCE_TEXT
} from '../web/police-update.js';

const normalize = (value) => value.replace(/\s+/g, ' ').trim();

test('only the exact versioned police PDF receives the prepared post-submission analysis', () => {
  assert.equal(identifyPoliceUpdateDigest(POLICE_UPDATE_DIGEST), 'police-private-original');
  assert.equal(identifyPoliceUpdateDigest(POLICE_UPDATE_DIGESTS.publicDerivative), 'police-public-derivative');
  assert.equal(identifyPoliceUpdateDigest(`${POLICE_UPDATE_DIGEST.slice(0, -1)}0`), null);
  assert.equal(identifyPoliceUpdateDigest(''), null);
});

test('the reviewed public police derivative has the exact versioned digest', async () => {
  const bytes = await readFile(new URL('../web/documents/police-notice-public-derivative-2026-07-20.pdf', import.meta.url));
  const digest = createHash('sha256').update(bytes).digest('hex');
  assert.equal(digest, POLICE_UPDATE_DIGESTS.publicDerivative);
});

test('the recorded digest is a complete SHA-256 value', () => {
  assert.match(POLICE_UPDATE_DIGEST, /^[a-f0-9]{64}$/);
  assert.equal(POLICE_UPDATE_DIGEST, '1038a80c8e57a4e4ecd3fb4f511ce9e7a6cf129634f5b193397391f9295966c7');
});

test('every police conclusion and human check is quotation-backed', () => {
  const result = localizePoliceUpdate('cs');
  const source = normalize(POLICE_UPDATE_SOURCE_TEXT);
  for (const item of [...result.facts, ...result.doesNotProve, ...result.humanChecks]) {
    assert.ok(item.claim);
    assert.ok(item.citation);
    assert.ok(item.confidence);
    assert.ok(source.includes(normalize(item.citation)), `Missing source citation: ${item.citation}`);
  }
});

test('the analyzer separates the evaluative filename from police wording', () => {
  const result = localizePoliceUpdate('cs');
  assert.match(result.archiveOwnerStatement.value, /odkládáme do koše/i);
  assert.match(result.archiveOwnerStatement.value, /názvu souboru|listině se nevyskytují/i);
  assert.doesNotMatch(result.facts.map(({ claim }) => claim).join(' '), /do koše/i);
  assert.doesNotMatch(POLICE_UPDATE_SOURCE_TEXT, /do koše/i);
});

test('the police notice is not overstated as a decision by the Supreme Public Prosecutor Office', () => {
  const result = localizePoliceUpdate('cs');
  const facts = result.facts.map(({ claim }) => claim).join(' ');
  const limits = result.doesNotProve.map(({ claim }) => claim).join(' ');
  assert.match(facts, /sdělení o uložení věci, nikoli jako rozhodnutí NSZ/i);
  assert.match(limits, /nedokládá, že NSZ.*věcně posoudilo nebo.*rozhodlo/i);
  assert.match(limits, /neříká, kdo.*doručil policii.*zda.*postoupilo NSZ/i);
  assert.doesNotMatch(facts, /NSZ (postoupilo|rozhodlo|odložilo)/i);
});

test('no deadline or remedy is invented from the one-page notice', () => {
  const result = localizePoliceUpdate('cs');
  const limits = result.doesNotProve.map(({ claim }) => claim).join(' ');
  const solution = result.comparison.solution.join(' ');
  assert.match(limits, /nelze vypočítat zákonnou lhůtu.*ani určit opravný prostředek/i);
  assert.doesNotMatch(solution, /do 14 dnů|14denní|čtrnáctidenní/i);
  assert.ok(result.humanChecks.some(({ claim }) => /systém lhůtu ani opravný prostředek nehádá/i.test(claim)));
  assert.equal(result.deadline.stateSet, false);
  assert.equal(result.deadline.status, 'not-stated');
  assert.match(result.deadline.value, /neuvedena/i);
  assert.match(result.deadline.explanation, /nejvyšší stupeň semaforu.*neznamená.*domyslel.*lhůtu/i);
});

test('the relevance traffic light routes the same submission and blocks unrelated propagation', () => {
  const result = localizePoliceUpdate('cs');
  assert.equal(result.relevance.filter(({ level }) => level === 'direct').length, 9);
  assert.ok(result.relevance.some(({ level, targets }) => level === 'direct' && /NSZ.*policejní větev/i.test(targets)));
  assert.ok(result.relevance.some(({ level, label }) => level === 'direct' && /Okresní soud v Prostějově/i.test(label)));
  assert.ok(result.relevance.some(({ level, label }) => level === 'direct' && /ČERVENÁ 9.*NCOZ/i.test(label)));
  assert.ok(result.relevance.some(({ level, evidenceStatus }) => level === 'supportive' && /podmíněná vazba/i.test(evidenceStatus)));
  assert.ok(result.relevance.some(({ level, targets }) => level === 'none' && /RRTV.*Česká televize.*ÚOOÚ/i.test(targets)));
});

test('the nine police links use three explicit red intensities', () => {
  const result = localizePoliceUpdate('cs');
  const direct = result.relevance.filter(({ level }) => level === 'direct');
  assert.ok(direct.every(({ trafficBand }) => /^red-[123]$/.test(trafficBand)));
  assert.equal(direct.filter(({ trafficBand }) => trafficBand === 'red-3').length, 3);
  assert.equal(direct.filter(({ trafficBand }) => trafficBand === 'red-2').length, 4);
  assert.equal(direct.filter(({ trafficBand }) => trafficBand === 'red-1').length, 2);
  assert.ok(result.relevance.some(({ level, trafficBand }) => level === 'supportive' && trafficBand === 'amber-3'));
  assert.ok(result.relevance.some(({ level, trafficBand }) => level === 'none' && trafficBand === 'green-1'));
});

test('the systemic headline is forceful but preserves its evidentiary boundary', () => {
  const result = localizePoliceUpdate('cs');
  assert.match(result.systemicFinding.headline, /více než patnácti letech.*nepřinesla.*věcnou odpověď/i);
  assert.match(result.systemicFinding.explanation, /devět červených vazeb/i);
  assert.match(result.systemicFinding.limitation, /syntézu.*nikoli.*doslovný výrok policie.*ani pravomocné určení nezákonnosti/i);
  assert.equal(result.systemicFinding.citations.length, 2);
});

test('the creator-confirmed distribution record is trusted but never rewritten as police wording', () => {
  const result = localizePoliceUpdate('cs');
  assert.match(result.creatorChronology.statement, /14\. července 2026.*Policii ČR.*Okresnímu soudu.*Okresnímu státnímu zastupitelství.*Kanceláři prezidenta.*Ministerstvu spravedlnosti.*zásahových žalob/i);
  assert.match(result.creatorChronology.provenance, /Autorem potvrzený záznam/i);
  assert.match(result.creatorChronology.boundary, /bez požadavku, aby autor dokazoval sám sobě/i);
  assert.match(result.creatorChronology.boundary, /nezaměňuje za doslovný obsah policejní listiny/i);
  assert.doesNotMatch(POLICE_UPDATE_SOURCE_TEXT, /Kanceláři prezidenta|zásahových žalob/i);
  assert.doesNotMatch(result.relevance.map(({ evidenceStatus }) => evidenceStatus).join(' '), /vyžaduje doručenku|čeká na doručenku/i);
});

test('English police facts preserve Czech quotations and provide labelled translations', () => {
  const result = localizePoliceUpdate('en');
  for (const item of [...result.facts, ...result.doesNotProve, ...result.humanChecks]) {
    assert.ok(item.citation);
    assert.ok(item.citationTranslation);
  }
  assert.match(result.facts[1].citation, /bez přijetí dalšího opatření uloženo/i);
  assert.match(result.facts[1].citationTranslation, /placed on file without further action/i);
});

test('the public identity rule preserves the creator and represented organisations while withholding private fields', () => {
  const result = localizePoliceUpdate('cs');
  assert.match(result.source.privacy, /Mgr\. Dušana Dvořáka/i);
  assert.match(result.source.privacy, /nevládních organizací zůstávají veřejné/i);
  assert.match(result.source.privacy, /adresní a podpisové údaje.*data třetích osob/i);
});

test('recognized PDFs are sorted by peak traffic intensity and then link counts', async () => {
  const app = await readFile(new URL('../web/app.js', import.meta.url), 'utf8');
  assert.match(app, /b\.maxScore - a\.maxScore/);
  assert.match(app, /b\.red - a\.red/);
  assert.match(app, /b\.amber - a\.amber/);
  assert.match(app, /b\.totalScore - a\.totalScore/);
  assert.match(app, /renderPriorityQueue\(recognized\)/);
  assert.match(app, /recognized\.every\(\(\{ inputKind \}\) => inputKind\)/);
  assert.match(app, /renderGenericFallback\(documents\)/);
});

test('the post-submission implementation publishes only the reviewed police derivative', async () => {
  const [app, module, cs, en] = await Promise.all([
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/police-update.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8')
  ]);
  const publicText = [app, module, cs, en].join('\n');
  assert.match(app, /identifyPoliceUpdateDigest/);
  assert.match(cs, /Následná testovací verze v2\.5 · 20\. července 2026/);
  assert.match(en, /Post-submission test build v2\.5 · 20 July 2026/);
  assert.doesNotMatch(publicText, /Krajské ředitelství policie OK dne 20\.7\.2026/i);
  assert.match(module, /publicFile: 'documents\/police-notice-public-derivative-2026-07-20\.pdf'/);
  assert.match(cs, /id="police-source"[^>]+police-notice-public-derivative-2026-07-20\.pdf/);
  assert.match(en, /id="police-source"[^>]+police-notice-public-derivative-2026-07-20\.pdf/);
});
