import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  identifyOrganisationUpdateDigest,
  localizeOrganisationUpdate,
  ORGANISATION_UPDATE_DIGESTS
} from '../web/organisation-update.js';

test('only the exact private original or public anonymized derivative receives prepared analysis', () => {
  assert.equal(identifyOrganisationUpdateDigest(ORGANISATION_UPDATE_DIGESTS.privateOriginal), 'private-original');
  assert.equal(identifyOrganisationUpdateDigest(ORGANISATION_UPDATE_DIGESTS.publicAnonymized), 'public-anonymized');
  assert.equal(identifyOrganisationUpdateDigest(`${ORGANISATION_UPDATE_DIGESTS.privateOriginal.slice(0, -1)}0`), null);
  assert.equal(identifyOrganisationUpdateDigest(''), null);
});

test('the public derivative has the exact versioned digest recorded by the analyzer', async () => {
  const bytes = await readFile(new URL('../web/documents/organisation-change-anonymized-2026-07-13.pdf', import.meta.url));
  const digest = createHash('sha256').update(bytes).digest('hex');
  assert.equal(digest, ORGANISATION_UPDATE_DIGESTS.publicAnonymized);
});

test('court facts and the archive-owner statement remain separate evidence levels', () => {
  const result = localizeOrganisationUpdate('cs');
  assert.equal(result.facts.length, 3);
  assert.ok(result.facts.every(({ claim, citation, confidence }) => claim && citation && confidence));
  assert.match(result.archiveOwnerStatement.value, /Konferenci členů dne 21\. března 2026/i);
  assert.match(result.archiveOwnerStatement.confidence, /tvrzení autora.*nedokládá/i);
  assert.doesNotMatch(result.facts.map(({ claim }) => claim).join(' '), /novinář|ekonom|Konferenci členů/i);
});

test('the outside-input result exposes a before/after change and a concrete solution', () => {
  const result = localizeOrganisationUpdate('cs');
  assert.match(result.comparison.before.label, /PŘED TESTEM/);
  assert.match(result.comparison.before.state, /nesměl tvrdit/i);
  assert.match(result.comparison.after.label, /PO TESTU/);
  assert.match(result.comparison.after.state, /zařadil|oddělil/i);
  assert.ok(result.comparison.solution.length >= 4);
  assert.ok(result.comparison.solution.some((item) => /právní moci|úplný výpis/i.test(item)));
});

test('the analyzer blocks false finality and general-representation inferences', () => {
  const result = localizeOrganisationUpdate('cs');
  assert.match(result.doesNotProve.join(' '), /nedokládá.*právní moci.*13\. července 2026/i);
  assert.match(result.doesNotProve.join(' '), /neznamená.*obecné oprávnění zastupovat alianci navenek/i);
  assert.ok(result.humanChecks.some((item) => /přesný den nabytí právní moci/i.test(item)));
  assert.ok(result.humanChecks.some((item) => /kdo je oprávněn jednat za alianci/i.test(item)));
});

test('relevance traffic light routes identity issues but excludes unrelated merits', () => {
  const result = localizeOrganisationUpdate('cs');
  assert.ok(result.relevance.filter(({ level }) => level === 'direct').length >= 2);
  assert.ok(result.relevance.some(({ level, targets }) => level === 'supportive' && /Web projektu/.test(targets)));
  assert.ok(result.relevance.some(({ level, targets, reason }) => level === 'none' && /zásahových žalob/.test(targets) && /nemění skutkové ani důkazní jádro/.test(reason)));
});

test('public implementation contains no known removed personal data', async () => {
  const files = [
    '../web/index.html', '../web/en.html', '../web/app.js', '../web/organisation-update.js',
    '../tools/build_anonymized_registry_extract.py'
  ];
  const publicText = (await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), 'utf8')))).join('\n');
  for (const forbidden of [
    /10\. dubna 1936/i, /360410\/429/, /22\. května 1987/i, /875522\/7899/,
    /Dlhé lúky/i, /Půchov/i, /Hana Králová/i, /Věra Šnajdrová/i
  ]) assert.doesNotMatch(publicText, forbidden);
  assert.match(publicText, /Ing\. František Dvořák/i);
  assert.match(publicText, /Bc\. Patricia Janeková/i);
});
