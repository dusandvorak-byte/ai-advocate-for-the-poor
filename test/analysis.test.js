import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeDocument, SAMPLE_DOCUMENT } from '../web/analysis.js';

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
