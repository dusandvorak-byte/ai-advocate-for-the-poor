import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCaseMemory, DEMO_CASE_DOCUMENTS } from '../web/memory.js';

test('structures multiple documents into relevant branches', () => {
  const memory = buildCaseMemory([
    { name: 'rozsudek.txt', text: 'Okresní soud vydal rozsudek pod sp. zn. 3 T 10/2025.' },
    { name: 'protokol.txt', text: 'OKTE provedlo laboratorní měření vzorku THC dne 8. 7. 2026.' }
  ]);
  assert.equal(memory.documents.length, 2);
  assert.ok(memory.branches.some(({ id }) => id === 'court'));
  assert.ok(memory.branches.some(({ id }) => id === 'laboratory'));
  assert.ok(memory.references.some((reference) => reference.includes('3 T 10/2025')));
  assert.ok(memory.dates.includes('8. 7. 2026'));
  assert.equal(memory.documents[0].name, 'rozsudek.txt');
  assert.ok(memory.limitations.some((limitation) => /neověřuje odbornou správnost/i.test(limitation)));
});

test('does not retain empty documents', () => {
  assert.equal(buildCaseMemory([{ name: 'empty.txt', text: ' ' }]).documents.length, 0);
});

test('the prepared case is explicitly fictional and produces an auditable map', () => {
  assert.equal(DEMO_CASE_DOCUMENTS.length, 3);
  assert.ok(DEMO_CASE_DOCUMENTS.every(({ text }) => text.startsWith('FIKTIVNÍ LISTINA')));
  const memory = buildCaseMemory(DEMO_CASE_DOCUMENTS);
  assert.equal(memory.documents.length, 3);
  assert.ok(memory.branches.some(({ id }) => id === 'court'));
  assert.ok(memory.branches.some(({ id }) => id === 'laboratory'));
  assert.ok(memory.branches.some(({ id }) => id === 'procedure'));
});
