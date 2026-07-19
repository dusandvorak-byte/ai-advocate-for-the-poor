import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { INTERNAL_ARCHIVE_TEST, localizeInternalArchiveTest } from '../web/archive-update.js';

test('internal archive update distinguishes a legal deadline from a monitoring checkpoint', () => {
  const result = localizeInternalArchiveTest('cs');
  assert.match(result.decision.deadline, /Žádná zjištěná zákonná lhůta/i);
  assert.match(result.decision.checkpoint, /30\. července 2026/i);
  assert.match(result.decision.checkpoint, /nejde o právní lhůtu/i);
  assert.match(result.decision.errorGuard, /odmítl.*zákonnou lhůtu/i);
});

test('the relevance matrix records both positive and negative routing decisions', () => {
  const result = localizeInternalArchiveTest('cs');
  assert.ok(result.relevance.some((item) => item.level === 'direct' && /nejvyšší státní zástupkyni/i.test(item.targets)));
  assert.ok(result.relevance.some((item) => item.level === 'direct' && /ministrovi vnitra/i.test(item.targets)));
  assert.ok(result.internalDrafts.some((item) => item.id === 'president-letter' && item.level === 'review'));
  assert.ok(result.relevance.some((item) => item.level === 'limited' && /Ministerstvo zdravotnictví/.test(item.targets)));
  assert.ok(result.relevance.some((item) => item.level === 'none' && /RRTV/.test(item.targets)));
  assert.ok(result.relevance.some((item) => item.level === 'none' && /Obnova trestních řízení/i.test(item.targets)));
});

test('the three unfiled 18 July drafts receive document-specific insertion guidance', () => {
  const result = localizeInternalArchiveTest('cs');
  assert.equal(result.internalDrafts.length, 3);
  assert.deepEqual(new Set(result.internalDrafts.map(({ id }) => id)), new Set(['ncoz-action', 'justice-action', 'president-letter']));
  for (const draft of result.internalDrafts) {
    assert.ok(draft.decision && draft.document && draft.why && draft.locations && draft.proposedText);
    assert.match(draft.proposedText, /Krajské.*státní.*zastupitelství.*Ostrav/i);
    assert.match(draft.proposedText, /nedokládá|nepotvrzuje/i);
  }
  assert.match(result.internalDrafts.find(({ id }) => id === 'ncoz-action').proposedText, /nemění.*žalovaného ani petit/i);
});

test('a short document is checked for cross-system propagation without overstatement', () => {
  const result = localizeInternalArchiveTest('cs');
  const checks = result.propagationCheck.checks;
  assert.ok(checks.some(({ question, result: value }) => /nový procesní uzel/i.test(question) && /ANO/.test(value)));
  assert.ok(checks.some(({ question, result: value }) => /zákonnou lhůtu/i.test(question) && /NEZJIŠTĚNO/.test(value)));
  assert.ok(checks.some(({ question, result: value }) => /systémové selhání/i.test(question) && /^NE/.test(value)));
});

test('draft integrity control prevents an unfiled document from being reported as filed', () => {
  const result = localizeInternalArchiveTest('cs');
  assert.match(result.draftIntegrityWarning.rule, /Bez doručenky.*připraveno.*odesláno.*doručeno/i);
  assert.equal(result.draftIntegrityWarning.findings.length, 3);
  assert.ok(result.draftIntegrityWarning.findings.some(({ detected }) => /byla předložena.*bylo doloženo/i.test(detected)));
  assert.ok(result.draftIntegrityWarning.findings.some(({ detected }) => /již byly zaslány/i.test(detected)));
  assert.ok(result.draftIntegrityWarning.findings.some(({ document, correction }) => /soukromá pracovní vrstva/i.test(document) && /nezveřejňovat/i.test(correction)));
  assert.match(result.draftIntegrityWarning.rule, /nesmí slučovat.*adresy.*stabilní identifikátor.*aktuální název.*historické aliasy.*neveřejné vrstvě/i);
  assert.doesNotMatch(JSON.stringify(result.draftIntegrityWarning), /IČ\s*\d|registration number\s*\d/i);
});

test('the referral remains a procedural fact and never becomes a finding of wrongdoing', () => {
  const result = localizeInternalArchiveTest('cs');
  assert.match(result.doesNotProve.join(' '), /nepotvrzuje nezákonnost ani nesprávnost/i);
  assert.doesNotMatch(result.proves.join(' '), /pochybení (bylo|je) potvrzeno/i);
});

test('Czech public materials use Czech public-prosecution terminology consistently', async () => {
  const files = ['../web/index.html', '../web/app.js', '../web/case-map.js', '../web/case-memory.js', '../web/archive-update.js'];
  const contents = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), 'utf8')));
  for (const content of contents) assert.doesNotMatch(content, /prokurátor|prokuratura/i);
  assert.match(JSON.stringify(INTERNAL_ARCHIVE_TEST), /státní zastupitelství/i);
});

test('English version preserves the same checkpoint limitation', () => {
  const result = localizeInternalArchiveTest('en');
  assert.match(result.decision.deadline, /No identified statutory deadline/i);
  assert.match(result.decision.checkpoint, /not a legal deadline/i);
  assert.match(result.doesNotProve.join(' '), /does not confirm unlawful or incorrect conduct/i);
});
