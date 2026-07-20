import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseline = JSON.parse(await readFile(
  new URL('../project-memory/registry-baseline-2026-07-20.json', import.meta.url),
  'utf8'
));

test('the test-count answer preserves distinct checks and does not invent a cumulative total', () => {
  const history = baseline.testHistoryAtQuestionTime;
  assert.equal(history.distinctAutomatedChecks, 85);
  assert.equal(history.submissionChecks, 54);
  assert.equal(history.postSubmissionChecksAdded, 31);
  assert.equal(history.minimumDocumentedIndividualExecutions, 267);
  assert.equal(history.exactCumulativeExecutionCount, null);
  assert.equal(history.submissionChecks + history.postSubmissionChecksAdded, history.distinctAutomatedChecks);
  const current = baseline.currentTestSuite;
  assert.equal(current.build, 'v2.6');
  assert.equal(current.distinctAutomatedChecks, 144);
  assert.equal(current.submissionChecks, 54);
  assert.equal(current.postSubmissionChecksAdded, 90);
  assert.deepEqual(current.latestCompleteRun, { passed: 144, failed: 0 });
  assert.equal(current.minimumDocumentedSuccessfulIndividualExecutions, 686);
  assert.equal(current.minimumCalculation, '54 + 62 + 66 + 85 + 131 + 144 + 144');
  assert.equal(current.exactCumulativeExecutionCount, null);
  assert.equal(current.submissionChecks + current.postSubmissionChecksAdded, current.distinctAutomatedChecks);
});

test('the fixed submission-date registry baseline contains exactly five unique organisations', () => {
  assert.equal(baseline.asOf, '2026-07-20');
  assert.equal(baseline.recordedAfterSubmission, true);
  assert.equal(baseline.submissionArchiveModified, false);
  assert.equal(baseline.organisations.length, 5);
  assert.equal(new Set(baseline.organisations.map(({ id }) => id)).size, 5);
});

test('all current registration numbers are unique eight-digit identifiers', () => {
  const ids = baseline.organisations.map(({ ico }) => ico);
  assert.equal(new Set(ids).size, 5);
  for (const ico of ids) assert.match(ico, /^\d{8}$/);
  assert.ok(ids.includes('70631298'));
  assert.ok(!JSON.stringify(baseline).includes('706312983'));
});

test('current legal names stay separate from historical and typographic variants', () => {
  const byId = new Map(baseline.organisations.map((item) => [item.id, item]));
  const educational = byId.get('educational-cannabis-clinic');
  assert.equal(educational.officialRegisteredName, 'Educational Cannabis Clinic, z.s.');
  assert.ok(educational.registeredNameHistory.some(({ name }) => name === 'European Educational Cannabis Clinic, z.s.'));
  assert.match(educational.nameChangeBoundary, /současný název.*předchozí rejstříkový název/i);
  assert.equal(byId.get('ganja-for-all-animals').officialRegisteredName, 'Ganja For All Animals, z.s.');
});

test('all five data boxes are exact, unique, and tied to official identity sources', () => {
  const expected = ['wztbjmm', '4ex7c9p', 'dxeepmd', '6ufexs6', 'pmgb579'];
  assert.deepEqual(baseline.organisations.map(({ dataBox }) => dataBox), expected);
  assert.equal(new Set(expected).size, 5);
  for (const organisation of baseline.organisations) {
    assert.ok(organisation.identitySourceIds.some((id) => id === `data-box-${organisation.dataBox}`));
  }
  const officialSources = baseline.sources.filter(({ kind }) => kind === 'official-public-data-box-holder-list');
  assert.equal(officialSources.length, 5);
  for (const source of officialSources) assert.match(source.url, /^https:\/\/www\.mojedatovaschranka\.cz\/sds\/detail\.do\?dbid=/);
});

test('creator-confirmed alliance roles are not relabelled as registry findings', () => {
  for (const organisation of baseline.organisations) {
    assert.equal(organisation.roleEvidenceLevel, 'creator-confirmed-alliance-record');
  }
  assert.match(baseline.evidencePolicy.allianceHistory, /nejsou.*vydávány za úplnou právní historii/i);
  assert.match(baseline.evidencePolicy.nameChanges, /Přesná rejstříková posloupnost/i);
});

test('the three clinic co-founders and their shared 2016 seat are preserved exactly', () => {
  assert.deepEqual(baseline.jointClinic.coFounderOrganisationIds, [
    'edukativni-konopna-klinika',
    'educational-cannabis-clinic',
    'ganja-for-all-animals'
  ]);
  assert.equal(baseline.jointClinic.sharedSeatSinceYear, 2016);
  assert.deepEqual(baseline.jointClinic.locations, ['Praha', 'Olomouc', 'Ospělov']);
  assert.match(baseline.jointClinic.alliancePublicPlaceName, /Konopná apatyka královny koloběžky první/);
});

test('the baseline contains organisational data only and no personal identifiers', () => {
  const source = JSON.stringify(baseline);
  for (const forbidden of ['datum narození', 'rodné číslo', 'Digitálně podepsal', 'Bc. Jana Barková']) {
    assert.doesNotMatch(source, new RegExp(forbidden, 'i'));
  }
});
