import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeGenericDocument,
  analyzeGenericDocuments,
  GENERIC_RELATION_LEVELS,
  PUBLIC_AUTHOR_MEMORY_SIGNAL_IDS
} from '../web/generic-intake.js';
import { SAMPLE_DOCUMENT } from '../web/analysis.js';

test('an unrelated readable document receives black 0/9 and still yields useful orientation', () => {
  const source = 'FAKTURA 2026-071. Vystaveno 20. 7. 2026. Částka 1 250 Kč. Zaplaťte do 14 dnů.';
  const result = analyzeGenericDocument({ name: 'faktura.txt', text: source }, 'cs');

  assert.equal(result.relation.id, 'black-0');
  assert.equal(result.relation.score, 0);
  assert.match(result.relation.label, /0\/9.*ŽÁDNÁ SHODA/);
  assert.equal(result.preparedLegalInterpretation, false);
  assert.ok(result.dates.some(({ value }) => value === '20. 7. 2026'));
  assert.ok(result.amounts.some(({ value }) => value === '1 250 Kč'));
  assert.ok(result.deadlineSignals.some(({ value }) => /do 14 dnů/i.test(value)));
  assert.ok(result.proposedSteps.some((step) => /samostatnou novou věc/i.test(step)));
  assert.ok(result.proposedSteps.some((step) => /žádná lhůta vypočtena/i.test(step)));
});

test('an unrelated insurer notice stays private at 0/9 while preserving its explicit deadline and sanction', () => {
  const source = 'Pojišťovna oznamuje: pojistné 2 400 Kč je splatné do 31. 7. 2026. Při prodlení je sjednána smluvní pokuta 500 Kč.';
  const result = analyzeGenericDocument({ name: 'pojisteni-auta.txt', text: source }, 'cs');

  assert.equal(result.relation.id, 'black-0');
  assert.equal(result.relation.score, 0);
  assert.equal(result.memorySignals.length, 0);
  assert.ok(result.deadlineSignals.some(({ value }) => /do 31\. 7\. 2026/i.test(value)));
  assert.ok(result.amounts.some(({ value }) => /2 400 Kč/i.test(value)));
  assert.ok(result.amounts.some(({ value }) => /500 Kč/i.test(value)));
  assert.ok(result.proposedSteps.some((step) => /samostatnou novou věc/i.test(step)));
  assert.ok(result.proposedSteps.some((step) => /žádná lhůta vypočtena/i.test(step)));
  assert.equal('calculatedDeadline' in result, false);
});

test('a distinctive public-memory overlap receives only the weakest green 1/9', () => {
  const result = analyzeGenericDocument({
    name: 'poznamka.txt',
    text: 'Text zmiňuje výzkum Cannabis is The Cure, ale sám neprokazuje žádnou procesní souvislost.'
  }, 'cs');

  assert.equal(result.relation.id, 'green-1');
  assert.equal(result.relation.score, 1);
  assert.match(result.relation.label, /1\/9.*NEJSLABŠÍ ZELENÁ/);
  assert.ok(result.memorySignals.some(({ id }) => id === 'research'));
  assert.doesNotMatch(result.relation.id, /red|amber/);
  assert.equal(result.preparedLegalInterpretation, false);
});

test('an inflected reference to the Supreme Public Prosecutor Office is recognized as a weak signal', () => {
  const result = analyzeGenericDocument({
    text: 'Podání bylo adresováno Nejvyššímu státnímu zastupitelství dne 14. 7. 2026.'
  }, 'cs');

  assert.equal(result.relation.id, 'green-1');
  assert.ok(result.memorySignals.some(({ id }) => id === 'nsz'));
});

test('generic police and court vocabulary alone does not create a creator-case match', () => {
  const result = analyzeGenericDocument({
    text: 'Policie České republiky předala dne 1. 6. 2026 obecnou informaci okresnímu soudu.'
  }, 'cs');

  assert.equal(result.relation.id, 'black-0');
  assert.equal(result.memorySignals.length, 0);
  assert.ok(result.institutions.some(({ value }) => /Policie České republiky/i.test(value)));
});

test('all displayed generic citations are exact excerpts of the visitor input', () => {
  const source = 'Okresní soud v Prostějově, č. j. 14 C 89/2018-606, dne 15. 5. 2026. Částka 28 654 Kč.';
  const result = analyzeGenericDocument({ text: source }, 'cs');
  const cited = [
    ...result.dates,
    ...result.references,
    ...result.amounts,
    ...result.institutions,
    ...result.deadlineSignals,
    ...result.memorySignals
  ];

  assert.ok(cited.length > 0);
  for (const item of cited) assert.ok(source.includes(item.citation), `Citation is not an exact source excerpt: ${item.citation}`);
});

test('a scan without a readable text layer stays black and proposes local OCR', () => {
  const result = analyzeGenericDocument({
    name: 'scan.pdf',
    kind: 'pdf',
    text: '',
    extraction: { status: 'no-text', code: 'no-text-layer', pageCount: 2, pagesRead: 2, truncated: false }
  }, 'cs');

  assert.equal(result.relation.id, 'black-0');
  assert.equal(result.hasReadableText, false);
  assert.match(result.extractionLabel, /nemá vytěžitelnou textovou vrstvu/i);
  assert.ok(result.proposedSteps.some((step) => /OCR/i.test(step)));
});

test('a possible deadline expression is flagged but never converted into a calculated deadline', () => {
  const result = analyzeGenericDocument({
    text: 'Odvolání lze podat ve lhůtě 15 dnů. Datum doručení zde uvedeno není.'
  }, 'cs');

  assert.equal(result.deadlineSignals.length, 1);
  assert.ok(result.proposedSteps.some((step) => /zde nebyla žádná lhůta vypočtena/i.test(step)));
  assert.equal('calculatedDeadline' in result, false);
});

test('a mixed batch counts black, weakest-green, unreadable, and deadline signals separately', () => {
  const result = analyzeGenericDocuments([
    { name: 'cizi.txt', text: 'Faktura vystavená 20. 7. 2026, splatná do 10 dnů.' },
    { name: 'prunik.txt', text: 'Cannabis is The Cure' },
    { name: 'scan.pdf', kind: 'pdf', text: '', extraction: { status: 'no-text', code: 'no-text-layer' } }
  ], 'cs');

  assert.deepEqual(result.counts, { total: 3, matched: 1, noMatch: 2, unreadable: 1, possibleDeadlines: 1, cannabisLegalConflicts: 0, sharedEvidenceCandidates: 0 });
  assert.match(result.boundary, /nevzniká případově specifický připravený právní výklad/i);
});

test('English generic output preserves the same safety and privacy boundary', () => {
  const result = analyzeGenericDocument({ text: 'Invoice issued on July 20, 2026. Payment due within 30 days.' }, 'en');

  assert.equal(result.relation.id, 'black-0');
  assert.match(result.relation.label, /0\/9.*NO MATCH/);
  assert.match(result.privacyNotice, /only in this browser.*not uploaded/i);
  assert.match(result.evidenceBoundary, /not a verified legal analysis.*never inherits case-specific conclusions/i);
});

test('an altered prepared sample can receive generic routing but never its prepared legal interpretation', () => {
  const result = analyzeGenericDocument({ text: `${SAMPLE_DOCUMENT}\nPOZMĚNĚNO` }, 'cs');

  assert.equal(result.mode, 'generic-local-orientation');
  assert.equal(result.preparedLegalInterpretation, false);
  assert.ok(['black-0', 'green-1'].includes(result.relation.id));
  assert.match(result.evidenceBoundary, /pozměněný dokument nikdy nepřebírá případově specifické závěry/i);
});

test('the two generic relation levels and public-memory signal identifiers remain explicit and unique', () => {
  assert.equal(GENERIC_RELATION_LEVELS.none.score, 0);
  assert.equal(GENERIC_RELATION_LEVELS.weak.score, 1);
  assert.ok(PUBLIC_AUTHOR_MEMORY_SIGNAL_IDS.length >= 10);
  assert.equal(new Set(PUBLIC_AUTHOR_MEMORY_SIGNAL_IDS).size, PUBLIC_AUTHOR_MEMORY_SIGNAL_IDS.length);
});
