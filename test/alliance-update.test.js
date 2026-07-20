import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  ALLIANCE_UPDATE,
  ALLIANCE_UPDATE_DIGESTS,
  ALLIANCE_FOLLOWUP_DIGESTS,
  ALLIANCE_UPDATE_SOURCE_EXCERPTS,
  identifyAllianceUpdateDigest,
  localizeAllianceUpdate
} from '../web/alliance-update.js';
import { POLICE_UPDATE_DIGESTS } from '../web/police-update.js';

test('the 2025 Annual Report is recorded as approved but remains unpublished pending design work', () => {
  const report = ALLIANCE_UPDATE.annualReport;
  assert.equal(report.year, 2025);
  assert.equal(report.approvalDate, '2026-07-14');
  assert.match(report.status.cs, /svátek Bastily.*14\. července 2026/i);
  assert.match(report.status.cs, /po grafických úpravách.*Konopí je lék\.cz/i);
  assert.equal(report.website, 'https://www.konopijelek.cz/');
  assert.match(report.publicationBoundary.cs, /nezveřejňuje ani nepřikládá/i);
  assert.equal('publicFile' in report, false);
});

test('seven unique reviewed source files are fingerprinted without becoming public downloads', async () => {
  assert.equal(Object.keys(ALLIANCE_UPDATE_DIGESTS).length, 7);
  assert.equal(new Set(Object.values(ALLIANCE_UPDATE_DIGESTS)).size, 7);
  for (const digest of Object.values(ALLIANCE_UPDATE_DIGESTS)) assert.match(digest, /^[a-f0-9]{64}$/);
  assert.equal(Object.keys(ALLIANCE_FOLLOWUP_DIGESTS).length, 3);
  assert.equal(ALLIANCE_FOLLOWUP_DIGESTS.policeDuplicate, POLICE_UPDATE_DIGESTS.privateOriginal);
  assert.equal(identifyAllianceUpdateDigest(ALLIANCE_UPDATE_DIGESTS.liberecBalance), 'liberecBalance');
  assert.equal(identifyAllianceUpdateDigest(ALLIANCE_UPDATE_DIGESTS.generaliPaid), 'generaliPaid');
  assert.equal(identifyAllianceUpdateDigest(POLICE_UPDATE_DIGESTS.privateOriginal), null);

  const files = await readdir(new URL('../web/', import.meta.url), { recursive: true });
  const joined = files.join('\n');
  for (const forbidden of ['Exeutor zastavuje', 'EX Liberec', 'EX Plzeň', 'OS Prostějov', 'rejstřík - Gabriela', 'dluh na exekuci je', 'exekuce Generali uhrazena']) {
    assert.doesNotMatch(joined, new RegExp(forbidden, 'i'));
  }
});

test('four concluded enforcement branches expose only bounded procedural metadata and amounts', () => {
  const items = new Map(ALLIANCE_UPDATE.enforcementProceedings.map((item) => [item.id, item]));
  assert.equal(items.size, 4);

  const art = items.get('art-language');
  assert.equal(art.executor, 'Mgr. Jiří Král');
  assert.equal(art.reference, '043 EX 38/15-24');
  assert.equal(art.stoppedDate, '2016-09-05');
  assert.equal(art.amount.exactAtStop, 3318807.15);
  assert.match(art.amount.display.cs, /přibližně 3,3 mil\. Kč.*zaokrouhleno.*3 318 807,15 Kč/i);

  const plzen = items.get('plzen-clinic');
  assert.equal(plzen.executor, 'Mgr. Ing. Jiří Prošek');
  assert.equal(plzen.reference, '134 EX 07180/19-508');
  assert.equal(plzen.stoppedDate, '2026-05-15');
  assert.equal(plzen.amount.exactAtStop, 230615.37);
  assert.match(plzen.amount.display.cs, /přibližně 200 000 Kč.*230 615,37 Kč/i);

  const liberec = items.get('liberec-clinic');
  assert.equal(liberec.executor, 'Mgr. Petr Polanský');
  assert.equal(liberec.reference, '131 EX 8674/15-143');
  assert.equal(liberec.stoppedDate, '2026-06-22');
  assert.equal(liberec.amount.exactPrincipal, 83020.64);
  assert.equal(liberec.amount.exactAtCheckpoint, 192752.91);
  assert.equal(liberec.amount.paidAtCheckpoint, 21555.87);
  assert.equal(liberec.amount.checkpointDate, '2025-07-08');
  assert.match(liberec.amount.display.cs, /přibližně 200 000 Kč.*192 752,91 Kč.*21 555,87 Kč/i);
  assert.match(liberec.amount.display.cs, /přesný zůstatek ke dni zastavení neuvádí/i);

  const generali = items.get('generali-paid');
  assert.equal(generali.executor, 'Mgr. Ing. Jiří Prošek');
  assert.equal(generali.reference, '134 EX 20124/14-066');
  assert.equal(generali.outcomeDate, '2015-02-27');
  assert.equal(generali.outcomeKind, 'satisfied-and-authority-expired');
  assert.equal(generali.amount.exactAtOutcome, null);
  assert.match(generali.outcome.cs, /úplné vymožení.*oprávnění.*zaniklo/i);
  assert.match(generali.amount.display.cs, /částku neuvádí|neuvedena/i);
  const currentRegistration = ALLIANCE_UPDATE.registerContext.citations.find((value) => value.includes('226 80 101'));
  assert.equal(currentRegistration.replace(/\D/g, ''), generali.identityCitation.replace(/\D/g, ''));

  for (const item of items.values()) {
    assert.ok(item.appointment.cs.length > 40);
    assert.ok(item.appointmentCitations.length > 0);
    assert.ok((item.outcome?.cs ?? item.stopped?.cs).includes(item.executor));
    assert.equal('publicFile' in item, false);
  }
});

test('every displayed enforcement citation is present in the reviewed source excerpts', () => {
  const sourcesById = {
    'art-language': [ALLIANCE_UPDATE_SOURCE_EXCERPTS.artLanguageExecution],
    'plzen-clinic': [ALLIANCE_UPDATE_SOURCE_EXCERPTS.plzenExecution],
    'liberec-clinic': [ALLIANCE_UPDATE_SOURCE_EXCERPTS.liberecExecution, ALLIANCE_UPDATE_SOURCE_EXCERPTS.liberecBalance],
    'generali-paid': [ALLIANCE_UPDATE_SOURCE_EXCERPTS.generaliPaid]
  };
  for (const item of ALLIANCE_UPDATE.enforcementProceedings) {
    const citations = [
      ...item.appointmentCitations,
      item.executorCitation,
      item.creditorCitation,
      item.matterCitation,
      item.identityCitation,
      item.stopCitation,
      item.outcomeCitation,
      item.outcomeDateCitation,
      item.amount.citation,
      ...(item.amount.additionalCitations ?? [])
    ].filter(Boolean);
    for (const citation of citations) {
      assert.ok(sourcesById[item.id].some((source) => source.includes(citation)), `${item.id} citation must be source-backed: ${citation}`);
    }
  }
  for (const citation of ALLIANCE_UPDATE.districtCourt.citations) {
    assert.ok(ALLIANCE_UPDATE_SOURCE_EXCERPTS.prostejovJudgment.includes(citation));
  }
  for (const citation of ALLIANCE_UPDATE.registerContext.citations) {
    assert.ok(ALLIANCE_UPDATE_SOURCE_EXCERPTS.publicRegister.includes(citation));
  }
});

test('the Prostějov judgment is reported precisely and is not generalized into a no-damage finding', () => {
  const judgment = ALLIANCE_UPDATE.districtCourt;
  assert.equal(judgment.reference, '14 C 89/2018-606');
  assert.equal(judgment.decisionDate, '2019-03-29');
  assert.match(judgment.claim.cs, /zamítl.*28 654 Kč/i);
  assert.match(judgment.reason.cs, /nebylo prokázáno uzavření smlouvy/i);
  assert.match(judgment.meaning.cs, /této konkrétní smluvní větvi/i);
  assert.match(judgment.limitation.cs, /není obecným výrokem.*nikdy nezpůsobila žádnou škodu/i);
});

test('the creator’s state-terror description is visibly separate from official findings', () => {
  assert.match(ALLIANCE_UPDATE.creatorAssessment.statement.cs, /státního teroru/i);
  assert.match(ALLIANCE_UPDATE.creatorAssessment.boundary.cs, /autorovo hodnotící pojmenování/i);
  assert.match(ALLIANCE_UPDATE.creatorAssessment.boundary.cs, /sam[ay] nedokládají/i);
  assert.doesNotMatch(JSON.stringify(ALLIANCE_UPDATE_SOURCE_EXCERPTS), /státního teroru/i);
});

test('Czech and English versions preserve the same numbers, boundaries, and public link', () => {
  const cs = localizeAllianceUpdate('cs');
  const en = localizeAllianceUpdate('en');
  assert.equal(cs.enforcementProceedings.length, en.enforcementProceedings.length);
  assert.equal(cs.annualReport.website, en.annualReport.website);
  assert.match(en.annualReport.status, /Approved on Bastille Day, 14 July 2026/i);
  assert.match(en.enforcementProceedings[0].amount.display, /approximately CZK 3\.3 million.*rounded/i);
  assert.match(en.enforcementProceedings[2].amount.display, /CZK 192,752\.91.*CZK 21,555\.87/i);
  assert.match(en.enforcementProceedings[3].outcome, /full recovery.*authority.*expired/i);
  assert.match(en.districtCourt.limitation, /not a general finding.*never caused any damage/i);
});

test('the public update omits addresses, signatures, and unrelated personal fields from the supplied PDFs', async () => {
  const source = await readFile(new URL('../web/alliance-update.js', import.meta.url), 'utf8');
  for (const privateValue of ['Dvořákova 1515/2', 'Voroněžská 144/20', 'Ospělov 6', 'Bc. Jana Barková', 'Digitálně podepsal']) {
    assert.doesNotMatch(source, new RegExp(privateValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
});
