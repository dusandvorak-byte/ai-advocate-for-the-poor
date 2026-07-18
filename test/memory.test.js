import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCaseMemory } from '../web/memory.js';

const TEST_CASE_DOCUMENTS = [
  {
    name: '01_rozsudek_test.txt',
    text: 'FIKTIVNÍ LISTINA PRO TEST. Okresní soud vydal dne 12. 6. 2025 rozsudek pod sp. zn. 3 T 10/2025 a uložil trest.'
  },
  {
    name: '02_protokol_okte_test.txt',
    text: 'FIKTIVNÍ LISTINA PRO TEST. OKTE dne 8. 7. 2026 provedlo laboratorní měření vzorku THC evidovaného pod č. j. KRP 123/2026-7.'
  },
  {
    name: '03_procesni_sdeleni_test.txt',
    text: 'FIKTIVNÍ LISTINA PRO TEST. Státní zastupitelství dne 10. 7. 2026 postoupilo podání pod sp. zn. 4 KZN 20/2026-3 k vyhodnocení a přijetí opatření.'
  }
];

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

test('fictional test fixtures produce an auditable document map', () => {
  assert.equal(TEST_CASE_DOCUMENTS.length, 3);
  assert.ok(TEST_CASE_DOCUMENTS.every(({ text }) => text.startsWith('FIKTIVNÍ LISTINA PRO TEST')));
  const memory = buildCaseMemory(TEST_CASE_DOCUMENTS);
  assert.equal(memory.documents.length, 3);
  assert.ok(memory.branches.some(({ id }) => id === 'court'));
  assert.ok(memory.branches.some(({ id }) => id === 'laboratory'));
  assert.ok(memory.branches.some(({ id }) => id === 'procedure'));
});
