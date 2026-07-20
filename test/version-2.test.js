import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  localizeVersion2,
  TRAFFIC_LEVELS,
  VERSION_2_DASHBOARD,
  VERSION_HISTORY,
  trafficScore
} from '../web/version-2.js';

test('V0, V1, and V2 preserve source data, submission baseline, and live development', () => {
  assert.deepEqual(VERSION_HISTORY.map(({ id }) => id), ['v0', 'v1', 'v2']);
  assert.equal(VERSION_HISTORY[0].date, '2026-04-20');
  assert.match(VERSION_HISTORY[0].description.cs, /Nejde o starší web.*datovou a důkazní vrstvu/i);
  assert.equal(VERSION_HISTORY[1].date, '2026-07-20');
  assert.match(VERSION_HISTORY[1].href, /archive\/submission-2026-07-20\/index\.html/);
  assert.equal(VERSION_HISTORY[2].kind, 'current');
  assert.match(VERSION_HISTORY[2].description.cs, /denní historii změn/i);
});

test('the traffic light contains exactly three red, three amber, and three green levels', () => {
  assert.equal(TRAFFIC_LEVELS.length, 9);
  assert.deepEqual(TRAFFIC_LEVELS.map(({ score }) => score), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
  assert.equal(new Set(TRAFFIC_LEVELS.map(({ id }) => id)).size, 9);
  for (const color of ['red', 'amber', 'green']) {
    assert.equal(TRAFFIC_LEVELS.filter((level) => level.color === color).length, 3);
  }
  assert.equal(trafficScore('red-3'), 9);
  assert.equal(trafficScore('green-1'), 1);
  assert.equal(trafficScore('unknown'), 0);
  assert.match(TRAFFIC_LEVELS[0].label.cs, /EXTRÉM.*HOŘÍ/);
  assert.match(TRAFFIC_LEVELS[3].label.cs, /MEZI ORANŽOVOU A ČERVENOU/);
  assert.match(TRAFFIC_LEVELS[6].label.cs, /MEZI ZELENOU A ORANŽOVOU/);
});

test('the first-window counts are exact where known and visibly open where not yet inventoried', () => {
  const result = localizeVersion2('cs').dashboard;
  const known = new Map(result.counts.map((item) => [item.label, item.value]));
  assert.equal(known.get('veřejných důkazních PDF'), '5');
  assert.equal(known.get('nově zkontrolovaných neveřejných souborů'), '24');
  assert.equal(known.get('všech listin v paměti'), '—');
  assert.equal(known.get('evidovaných rozhodnutí a úkonů'), '70');
  assert.equal(known.get('aktivní soudní větve'), '4');
  assert.equal(known.get('událostí vyřizování od 20. 4. 2026'), '9');
  assert.equal(known.get('doložené ukončené exekuční větve'), '4');
  assert.equal(result.administrativeProceedings.value, '—');
  assert.match(result.administrativeProceedings.note, /nebude.*odhadovat/i);
  assert.match(result.counts.find(({ label }) => label === 'všech listin v paměti').note, /pět znamená pouze veřejně/i);
});

test('the latest reviewed evidence set is highly relevant without inventing a new deadline', () => {
  const latest = VERSION_2_DASHBOARD.latestDocument;
  assert.equal(latest.version, 'v2.6');
  assert.equal(latest.priority, 'red-3');
  assert.deepEqual(latest.metrics.map(({ value }) => value), ['16', '7', '3', '0']);
  assert.deepEqual(latest.trafficDistribution, [
    { band: 'red-3', count: 1 },
    { band: 'red-2', count: 1 },
    { band: 'red-1', count: 1 },
    { band: 'amber-3', count: 1 },
    { band: 'amber-2', count: 1 },
    { band: 'green-3', count: 1 },
    { band: 'green-2', count: 1 }
  ]);
  assert.equal(latest.stateDeadline.status, 'none-currently-stated');
  assert.match(latest.stateDeadline.rule.cs, /nevytváří lhůtu.*není pravděpodobností úspěchu.*4\/9/i);
});

test('daily V2 history grows only when a reviewed document is added', () => {
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots.length, 5);
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[0].version, 'v2.6');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[0].date, '2026-07-20');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[0].href, '#mk-jk-reopening-update');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[1].version, 'v2.5');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[1].href, '#prisoner-reopening-update');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[2].version, 'v2.3');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[3].version, 'v2.2');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[3].href, '#alliance-update-v22');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[4].version, 'v2.1');
  assert.equal(VERSION_2_DASHBOARD.dailySnapshots[4].href, '#police-update');
  assert.match(VERSION_2_DASHBOARD.snapshotRule.cs, /zkontrolované listiny.*prázdné denní kopie se nevytvářejí/i);
});

test('test memory separates the submission baseline, pre-deadline development, and later judging period', () => {
  const periods = localizeVersion2('cs').dashboard.testPeriods;
  assert.deepEqual(periods.map(({ id }) => id), ['through-submission', 'submission-to-deadline', 'deadline-to-judging']);
  assert.equal(periods[0].distinctChecks, 54);
  assert.equal(periods[1].distinctChecks, 144);
  assert.equal(periods[1].addedChecks, 90);
  assert.match(periods[1].window, /22\. 7\. 2026.*02:00 CEST/i);
  assert.equal(periods[2].distinctChecks, 0);
  assert.match(periods[2].status, /DOSUD NEZAČALO/);
  assert.match(VERSION_2_DASHBOARD.testCountingRule.cs, /počet různých automatických kontrol.*nikoli celoživotní součet/i);
  assert.match(VERSION_2_DASHBOARD.testCountingRule.cs, /nejméně 686/i);
});

test('both public pages render the same V2 model and all nine visual levels', async () => {
  const [app, styles] = await Promise.all([
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/styles.css', import.meta.url), 'utf8')
  ]);
  assert.match(app, /localizeVersion2/);
  assert.match(app, /localizeAllianceUpdate/);
  assert.match(app, /renderVersion2Dashboard\(\)/);
  assert.match(app, /latest\.trafficDistribution/);
  assert.match(app, /renderAllianceUpdate\(\)/);
  assert.match(app, /identifyAllianceUpdateDigest/);
  assert.match(app, /highlightAllianceEvidence/);
  for (const level of TRAFFIC_LEVELS) {
    assert.match(styles, new RegExp(`\\.traffic-${level.id}\\{`));
  }
});
