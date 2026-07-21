import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CZECH_PILOT_V3, localizeCzechPilotV3 } from '../web/czech-pilot-v3.js';

test('V3 compares four cases concerning six people and identifies every available criminal court file', () => {
  const pilot = localizeCzechPilotV3('cs');
  assert.equal(pilot.caseAssessments.length, 4);
  assert.equal(pilot.caseAssessments.reduce((sum, item) => sum + item.people, 0), 6);
  const cases = new Map(pilot.caseAssessments.map((item) => [item.id, item]));
  assert.match(`${cases.get('dd').court} ${cases.get('dd').courtReference}`, /Okresní soud v Prostějově.*2 T 104\/2010.*další/i);
  assert.match(`${cases.get('lch').court} ${cases.get('lch').courtReference}`, /Krajský soud v Brně.*50 T 7\/2018-603/i);
  assert.match(`${cases.get('mk-jk').court} ${cases.get('mk-jk').courtReference}`, /Krajský soud v Hradci Králové.*9 T 5\/2016-948/i);
  assert.match(`${cases.get('gf-jk').court} ${cases.get('gf-jk').courtReference}`, /Okresní soud v Ostravě.*15 T 11\/2025/i);
});

test('every case begins with a 2026 reopening relevance line while success probability remains prohibited', () => {
  const pilot = localizeCzechPilotV3('cs');
  for (const item of pilot.caseAssessments) {
    assert.match(item.relevanceLine, /RELEVANCE.*(K NÁVRHU NA OBNOVU|PRO PŘEZKUM).*V ROCE 2026/i);
    assert.match(item.relevanceLine, /9\/9 — EXTRÉM, HOŘÍ/i);
    assert.equal(item.priority, 9);
  }
  assert.match(pilot.scoreRule, /ve všech čtyřech.*9\/9 — EXTRÉM, HOŘÍ/i);
  assert.match(pilot.scoreRule, /neurčuje procento budoucího úspěchu/i);
  assert.doesNotMatch(JSON.stringify(pilot), /pravděpodobnost úspěchu:\s*\d|šance na úspěch:\s*\d/i);
});

test('V3 leads with the exact Prague judicial breakthrough and keeps the October hearing separately sourced', () => {
  const finding = localizeCzechPilotV3('cs').judicialBreakthrough;
  assert.equal(finding.priority, 9);
  assert.match(finding.source, /Vrchní soud v Praze.*29\. 7\. 2025.*11 To 88\/2024-2990/i);
  assert.match(finding.source, /Městského soudu v Praze.*7\. 5\. 2024.*45 T 1\/2024-2430.*§ 259 odst\. 1.*vrácena Městskému soudu v Praze.*novému projednání a rozhodnutí/i);
  assert.match(finding.headline, /legální.*zakázané/i);
  assert.match(finding.boundary, /říjen 2026.*není uveden v usnesení/i);
});

test('each case states what its new records changed and what remains for a person to do', () => {
  const cases = new Map(localizeCzechPilotV3('cs').caseAssessments.map((item) => [item.id, item]));
  for (const item of cases.values()) {
    assert.ok(item.sourceInventory);
    assert.ok(item.documentImpact);
    assert.ok(item.next);
  }
  assert.match(cases.get('dd').documentImpact, /20\. 7\. 2026.*nový uzel.*devíti souvisejících větví/i);
  assert.match(cases.get('lch').documentImpact, /metodice.*kandidáta novosti.*tři odpovědi KPR/i);
  assert.match(cases.get('mk-jk').documentImpact, /čtyři různé důkazní osy.*§ 278 odst\. 4/i);
  assert.match(cases.get('gf-jk').documentImpact, /2 KZT 59\/2025-62.*3,7 % THC.*podmíněném zastavení.*oddělil.*procesní.*9\/9/i);
});

test('the creator live map has nine exact references and does not inflate the open inventory', () => {
  const branches = localizeCzechPilotV3('cs').authorBranches;
  assert.equal(branches.exactReferenceCount, 9);
  assert.equal(branches.courtBranches.length, 4);
  assert.equal(branches.institutionalBranches.length, 5);
  assert.deepEqual(branches.courtBranches.map((item) => item.reference), [
    '10 C 69/2026', '8 Ad 9/2026', '18 A 23/2026', '18 A 17/2026'
  ]);
  assert.deepEqual(branches.institutionalBranches.map((item) => item.reference), [
    'KPR 4093/2026', 'MSP-162/2026-ODKA-SPZ', 'MSP-19/2026-ODKA-ROZ',
    'MV-108890-3/TP-2026', 'MV-97289/TP-2026'
  ]);
  assert.match(branches.headline, /Až přibližně 20.*devět.*přesnou značkou.*inventář.*otevřený/i);
  assert.match(branches.boundary, /nesmí vydávat za uzavřený počet samostatných řízení/i);
});

test('open groups preserve missing references and distinguish reopening, supervision, and prevention', () => {
  const groups = localizeCzechPilotV3('cs').authorBranches.openGroups;
  assert.equal(groups.length, 3);
  assert.match(groups[0].description, /Patnáctiletá tvrzená nečinnost NCOZ.*značky.*prvotních listin/i);
  assert.match(groups[1].description, /Okresní soud v Prostějově.*2 T 104\/2010 a další/i);
  assert.match(groups[1].description, /jeden důkaz.*automaticky.*všechna rozhodnutí/i);
  assert.match(groups[2].description, /Úroda 2026|preventivní/i);
  assert.match(groups[2].description, /doručenek a odpovědí/i);
});

test('dated testing periods separate submission evidence, pre-deadline work, and the post-22-July roadmap', () => {
  const periods = localizeCzechPilotV3('cs').testPeriods;
  assert.equal(periods.length, 3);
  assert.match(periods[0].period, /20\. 4\..*20\. 7\. 2026.*14:00 CEST/i);
  assert.match(periods[0].scope, /70.*54/i);
  assert.match(periods[1].period, /20\. 7\..*21\. 7\. 2026.*22:00 CEST/i);
  assert.match(periods[1].scope, /pět lidí/i);
  assert.match(periods[2].period, /Od 22\. 7\. 2026/i);
  assert.match(periods[2].claimBoundary, /plán, nikoli hotovou funkci/i);
  assert.doesNotMatch(JSON.stringify(periods), /22\. 2\. 2026/);
});

test('the presidential and public-outreach context is documented without claiming a decision', () => {
  const context = localizeCzechPilotV3('cs').civicContext;
  assert.match(context.statement, /doloženou větví podání k prezidentské amnestii/i);
  assert.match(context.statement, /samy nedokládají, že prezident rozhodl.*přijal právní argument.*osobně posuzuje/i);
  assert.match(context.outreach, /Ženeva–Santiago.*budoucím pilotem.*nikoli důkazem/i);
  assert.doesNotMatch(JSON.stringify(context), /prezident.*skutečně řeší udělení|prezident.*udělí/i);
});

test('the public interface puts the V3 result before the detailed portfolio and keeps evidence expandable', async () => {
  const [cs, en, app, styles] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/styles.css', import.meta.url), 'utf8')
  ]);
  for (const html of [cs, en]) {
    assert.match(html, /id="czech-pilot-v3"/);
    assert.match(html, /id="v3-case-assessments"/);
    assert.match(html, /id="dd-live-branches"/);
    assert.ok(html.indexOf('id="czech-pilot-v3"') < html.indexOf('id="case-portfolio"'));
  }
  assert.match(app, /localizeCzechPilotV3/);
  assert.match(app, /renderCzechPilotV3\(\)/);
  assert.match(app, /item\.court.*item\.courtReference/s);
  assert.match(app, /item\.relevanceLine/);
  assert.match(app, /item\.documentImpact/);
  assert.doesNotMatch(app, /readinessValue\.textContent = item\.readinessLabel/);
  assert.match(styles, /\.v3-relevance-line/);
  assert.match(styles, /\.v3-case-details/);
  assert.match(styles, /\.v3-judicial-breakthrough/);
  assert.match(app, /const breakthrough = CZECH_PILOT\.judicialBreakthrough/);
});

test('V3 keeps other people anonymized, links Smoke, and publishes no address or birth date', () => {
  const localized = localizeCzechPilotV3('cs');
  const serialized = JSON.stringify(CZECH_PILOT_V3);
  assert.deepEqual(localized.caseAssessments.map((item) => item.label), [
    'Mgr. Dušan Dvořák', 'L. CH.', 'M. K. / J. K.', 'G. F. / J. K.'
  ]);
  assert.equal(localized.caseAssessments[1].publicContextUrl, 'https://www.ceskatelevize.cz/porady/16298026696-smoke/');
  assert.doesNotMatch(serialized, /datum narození|date of birth|trvale bytem|street address/i);
});
