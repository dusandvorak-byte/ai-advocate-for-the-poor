import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCaseMemory } from '../web/memory.js';

test('structures multiple documents into relevant branches', () => {
  const memory = buildCaseMemory([
    { name: 'rozsudek.txt', text: 'Okresní soud vydal rozsudek pod sp. zn. 3 T 10/2025.' },
    { name: 'protokol.txt', text: 'OKTE provedlo laboratorní měření vzorku THC dne 8. 7. 2026.' }
  ]);
  assert.equal(memory.documents.length, 2);
  assert.ok(memory.branches.some(({ id }) => id === 'court'));
  assert.ok(memory.branches.some(({ id }) => id === 'laboratory'));
  assert.ok(memory.references.some((reference) => reference.includes('3 T 10/2025')));
});

test('does not retain empty documents', () => {
  assert.equal(buildCaseMemory([{ name: 'empty.txt', text: ' ' }]).documents.length, 0);
});
