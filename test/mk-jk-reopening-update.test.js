import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import {
  identifyMkJkReopeningDigest,
  MK_JK_REOPENING_DIGESTS,
  MK_JK_REOPENING_UPDATE,
  localizeMkJkReopeningUpdate
} from '../web/mk-jk-reopening-update.js';

test('the received set contains 17 files but 16 unique SHA-256 sources', () => {
  const digests = Object.values(MK_JK_REOPENING_DIGESTS);
  assert.equal(digests.length, 16);
  assert.equal(new Set(digests).size, 16);
  assert.ok(digests.every((digest) => /^[a-f0-9]{64}$/.test(digest)));
  assert.equal(MK_JK_REOPENING_UPDATE.sourceInventory.receivedFiles, 17);
  assert.equal(MK_JK_REOPENING_UPDATE.sourceInventory.uniqueFiles, 16);
  assert.equal(MK_JK_REOPENING_UPDATE.sourceInventory.duplicateDigest, MK_JK_REOPENING_DIGESTS.doctorStatementPage2);
});

test('only an exact reviewed digest receives the prepared assessment', () => {
  for (const [id, digest] of Object.entries(MK_JK_REOPENING_DIGESTS)) {
    assert.equal(identifyMkJkReopeningDigest(digest), id);
  }
  const digest = MK_JK_REOPENING_DIGESTS.constitutionalCourtDecision;
  assert.equal(identifyMkJkReopeningDigest(`${digest.slice(0, -1)}0`), null);
  assert.equal(identifyMkJkReopeningDigest(''), null);
});

test('none of the private reviewed source files is published in the web document directory', async () => {
  const privateDigests = new Set(Object.values(MK_JK_REOPENING_DIGESTS));
  const directory = new URL('../web/documents/', import.meta.url);
  for (const name of await readdir(directory)) {
    const bytes = await readFile(new URL(name, directory));
    assert.ok(!privateDigests.has(createHash('sha256').update(bytes).digest('hex')), `Private source published as ${name}`);
  }
  assert.equal(MK_JK_REOPENING_UPDATE.sourceInventory.publicSourceFilesAdded, 0);
});

test('the exact court path always includes court, date, and reference number', () => {
  const update = localizeMkJkReopeningUpdate('cs');
  assert.deepEqual(update.courtPath.map(({ court, date, reference }) => ({ court, date, reference })), [
    { court: 'Krajský soud v Hradci Králové', date: '2017-02-27', reference: '9 T 5/2016-948' },
    { court: 'Vrchní soud v Praze', date: '2017-06-12', reference: '11 To 48/2017-1036' },
    { court: 'Nejvyšší soud', date: '2017-12-13', reference: '11 Tdo 1499/2017-48' },
    { court: 'Ústavní soud', date: '2019-07-09', reference: 'IV. ÚS 1140/18' }
  ]);
  assert.match(update.courtPath[3].sourceUrl, /nalus\.usoud\.cz/);
});

test('judicial findings and allegations from submissions remain separate evidence layers', () => {
  const update = localizeMkJkReopeningUpdate('cs');
  assert.equal(update.officialFindings.length, 5);
  assert.equal(update.submittedClaims.length, 5);
  assert.ok(update.officialFindings.every(({ source, finding, boundary }) => source && finding && boundary));
  assert.ok(update.submittedClaims.every(Boolean));
  assert.match(update.publicationBoundary, /Výroky soudů, tvrzení podatelů, lékařské vyjádření.*zůstávají oddělené/i);
});

test('the Constitutional Court finding about the vehicle search is not overstated', () => {
  const finding = localizeMkJkReopeningUpdate('cs').officialFindings.find(({ id }) => id === 'vehicle-search');
  assert.match(finding.finding, /nebyla kryta potřebným příkazem.*výsledek řízení nezměnila/i);
  assert.match(finding.boundary, /nový materiální důkaz.*zopakování.*nestačí/i);
});

test('section 278(4) is the highest-priority route but its condition is expressly not established', () => {
  const update = localizeMkJkReopeningUpdate('cs');
  const route = update.relevance.find(({ id }) => id === 'final-judge-judgment');
  assert.equal(route.score, 9);
  assert.equal(route.trafficBand, 'red-3');
  assert.match(route.status, /DOSUD NEDOLOŽENA/);
  assert.match(route.next, /pravomocný trestní rozsudek.*doložku právní moci.*11 To 48\/2017/i);
  assert.match(route.boundary, /nepravomocný.*žádnou vazbu/i);
});

test('priority, filing readiness, and likelihood of success are three different values', () => {
  const overall = localizeMkJkReopeningUpdate('cs').overall;
  assert.equal(overall.priority.score, 9);
  assert.equal(overall.readiness.score, 4);
  assert.equal(overall.probability, null);
  assert.match(overall.conclusion, /reálná cesta.*nelze.*tvrdit.*povolena/i);
});

test('later EU law and the 2017 medical statement are not presented as new stand-alone facts', () => {
  const update = localizeMkJkReopeningUpdate('cs');
  const eu = update.relevance.find(({ id }) => id === 'eu-law-later-case');
  const medical = update.relevance.find(({ id }) => id === 'medical');
  assert.match(eu.meaning, /C-663\/18.*CBD.*není totožný/i);
  assert.match(eu.next, /pozdější právní vývoj.*neprezentovat.*nový skutkový důkaz/i);
  assert.match(medical.boundary, /1\. 6\. 2017.*není novým důkazem/i);
});

test('the proposed evidence plan targets the yield calculation and primary digital chain', () => {
  const update = localizeMkJkReopeningUpdate('cs');
  const plan = update.nextEvidence.join(' ');
  assert.match(plan, /Ing\. Josefa Beneše.*8\. 9\. 2015.*31\. 1\. 2017/i);
  assert.match(plan, /botanicko-zemědělský posudek.*hranici velkého rozsahu/i);
  assert.match(plan, /digitálně-forenzní řetězec.*hashů.*všech zpráv/i);
  assert.match(plan, /SOP.*chromatogramy.*nejistotu měření/i);
});

test('official legal sources are linked and no success percentage is manufactured', () => {
  const update = localizeMkJkReopeningUpdate('cs');
  assert.deepEqual(update.legalSources.map(({ reference }) => reference), [
    'IV. ÚS 1140/18', '§ 278 trestního řádu', '3 Tz 82/2001', '7 Tz 1/80', 'C-663/18'
  ]);
  assert.ok(update.legalSources.every(({ url }) => /^https:\/\//.test(url)));
  assert.equal(update.overall.probability, null);
});

test('the public module and pages use initials and omit private identity data', async () => {
  const [moduleSource, cs, en, app] = await Promise.all([
    readFile(new URL('../web/mk-jk-reopening-update.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/app.js', import.meta.url), 'utf8')
  ]);
  assert.doesNotMatch(moduleSource, /(?:datum narození|\bnar\.|\bbytem\b|adresa|ulice|č\.p\.|PSČ|postal code)\s*[:=]\s*['"]?[0-9A-Za-zÀ-ž]/i);
  assert.match(moduleSource, /M\. K\. a J\. K\./);
  for (const html of [cs, en]) {
    assert.match(html, /id="mk-jk-reopening-update"/);
    assert.match(html, /id="mk-jk-court-path"/);
    assert.doesNotMatch(html, /(?:datum narození|\bnar\.|\bbytem\b|adresa|ulice|č\.p\.|PSČ|postal code)\s*[:=]\s*['"]?[0-9A-Za-zÀ-ž]/i);
  }
  assert.match(app, /identifyMkJkReopeningDigest/);
  assert.match(app, /renderMkJkReopeningUpdate\(\)/);
  assert.match(app, /UI\.mkJkRecognized/);
});
