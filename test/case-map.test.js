import test from 'node:test';
import assert from 'node:assert/strict';
import { INSTITUTIONAL_CASE_MAP, localizeInstitutionalCaseMap } from '../web/case-map.js';

test('institutional map covers the complete intended public structure', () => {
  const groupIds = INSTITUTIONAL_CASE_MAP.groups.map(({ id }) => id);
  assert.deepEqual(groupIds, ['core', 'president', 'courts', 'prosecutors', 'executive', 'europe', 'remedies']);

  const nodeIds = new Set(INSTITUTIONAL_CASE_MAP.groups.flatMap(({ nodes }) => nodes.map(({ id }) => id)));
  for (const required of [
    'program', 'president-office', 'district-court', 'municipal-court',
    'supreme-court', 'constitutional-court', 'supreme-prosecutor',
    'district-prosecutors', 'health-ministry', 'justice-ministry',
    'interior-ministry', 'police', 'forensics', 'cjeu', 'commission',
    'ecthr', 'government-agent', 'compensation', 'cultivation-2026'
  ]) assert.ok(nodeIds.has(required), `Missing ${required}`);

  for (const relation of INSTITUTIONAL_CASE_MAP.relations) {
    assert.ok(nodeIds.has(relation.from), `Unknown relation source ${relation.from}`);
    assert.ok(nodeIds.has(relation.to), `Unknown relation target ${relation.to}`);
  }
});

test('referral remains procedural and never confirms wrongdoing', () => {
  const map = localizeInstitutionalCaseMap('cs');
  const referral = map.relations.find(({ from, to }) => from === 'regional-prosecutors' && to === 'district-prosecutors');
  assert.match(referral.label, /není potvrzením pochybení/i);
});

test('headline counts are present but unverified ones are visibly creator-stated', () => {
  const expectedCreatorStated = new Map([
    ['22', 'řízení u Ústavního soudu'],
    ['10', 'řízení u Nejvyššího soudu'],
    ['3', 'podněty Evropské komisi'],
    ['77 let', 'součet horních sazeb navrhovaných trestů']
  ]);
  for (const [value, label] of expectedCreatorStated) {
    const metric = INSTITUTIONAL_CASE_MAP.metrics.find((item) => item.value === value && item.label.cs === label);
    assert.equal(metric?.status, 'creator-stated');
  }
  const ecthr = INSTITUTIONAL_CASE_MAP.metrics.find((item) => item.value === '10' && /ESLP/.test(item.label.cs));
  assert.equal(ecthr?.status, 'creator-stated');
});

test('public map credits the creator but excludes private identifiers and live case references', () => {
  const serialized = JSON.stringify(INSTITUTIONAL_CASE_MAP);
  assert.match(serialized, /Mgr\. Dušan Dvořák/);
  assert.doesNotMatch(serialized, /12\.\s*1\.\s*1962|Ospělov\s*6|@[a-z]|r8u3nhx/i);
  assert.doesNotMatch(serialized, /7116\/2026|4093\/2026|18\s*A\s*17\/2026|18\s*A\s*23\/2026/i);
});

test('English localization retains all nodes and relationships', () => {
  const map = localizeInstitutionalCaseMap('en');
  assert.equal(map.groups.length, INSTITUTIONAL_CASE_MAP.groups.length);
  assert.equal(map.relations.length, INSTITUTIONAL_CASE_MAP.relations.length);
  assert.match(map.title, /European case/i);
});
