import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeDocument, analyzeDocumentSet, SAMPLE_DOCUMENT } from '../web/analysis.js';

test('recognizes the supported KSZ sample', () => {
  assert.equal(analyzeDocument(SAMPLE_DOCUMENT).supported, true);
});

test('rejects empty and unrelated inputs', () => {
  assert.equal(analyzeDocument('  ').supported, false);
  assert.equal(analyzeDocument('Rozsudek jiného soudu v jiné věci.').supported, false);
});

test('rejects a similar document without the forwarding event', () => {
  const altered = SAMPLE_DOCUMENT.replace('byla postoupena', 'byla vyřízena');
  assert.equal(analyzeDocument(altered).supported, false);
});

test('rejects an incomplete sample', () => {
  assert.equal(analyzeDocument(SAMPLE_DOCUMENT.slice(0, -80)).supported, false);
});

test('rejects unrelated text with the complete sample appended or embedded', () => {
  assert.equal(analyzeDocument(`Rozsudek v jiné věci.\n\n${SAMPLE_DOCUMENT}`).supported, false);
  assert.equal(analyzeDocument(`${SAMPLE_DOCUMENT}\n\nDodatečný věcný závěr.`).supported, false);
});

test('allows harmless line-ending and surrounding-whitespace differences', () => {
  const crlf = `  \r\n${SAMPLE_DOCUMENT.replaceAll('\n', '\r\n')}\r\n  `;
  assert.equal(analyzeDocument(crlf).supported, true);
});

test('does not confuse forwarding with confirmation of wrongdoing', () => {
  const text = analyzeDocument(SAMPLE_DOCUMENT).interpretation.map(({ claim }) => claim).join(' ');
  assert.match(text, /nikoli o meritorní potvrzení pochybení/i);
  assert.doesNotMatch(text, /pochybení (bylo|je) potvrzeno/i);
});

test('every displayed statement cites the source document', () => {
  const result = analyzeDocument(SAMPLE_DOCUMENT);
  for (const group of ['facts', 'interpretation', 'uncertainty', 'actions']) {
    for (const entry of result[group]) {
      assert.ok(entry.claim && entry.citation && entry.confidence);
      assert.ok(SAMPLE_DOCUMENT.includes(entry.citation));
    }
  }
});

test('multi-document mode never receives the prepared legal interpretation', () => {
  const result = analyzeDocumentSet([
    { text: SAMPLE_DOCUMENT },
    { text: 'Jiný dokument.' }
  ]);
  assert.equal(result.supported, false);
  assert.equal(result.mode, 'map-only');
  assert.equal(result.facts, undefined);
  assert.equal(result.interpretation, undefined);
});

test('English output preserves the same source grounding and referral safeguard', () => {
  const result = analyzeDocument(SAMPLE_DOCUMENT, 'en');
  assert.equal(result.supported, true);
  assert.match(result.interpretation[0].claim, /not a determination.*wrongdoing/i);
  for (const group of ['facts', 'interpretation', 'uncertainty', 'actions']) {
    for (const entry of result[group]) assert.ok(SAMPLE_DOCUMENT.includes(entry.citation));
  }
});
