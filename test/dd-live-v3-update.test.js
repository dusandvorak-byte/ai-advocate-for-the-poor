import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import {
  DD_LIVE_V3_DIGESTS,
  identifyDdLiveV3Digest,
  localizeDdLiveV3Update
} from '../web/dd-live-v3-update.js';

test('the five reviewed PDFs are routed only by their exact fingerprints', () => {
  for (const [id, digest] of Object.entries(DD_LIVE_V3_DIGESTS)) {
    assert.match(digest, /^[a-f0-9]{64}$/);
    assert.equal(identifyDdLiveV3Digest(digest), id);
    assert.equal(identifyDdLiveV3Digest(`${digest.slice(0, -1)}${digest.endsWith('0') ? '1' : '0'}`), null);
  }
  assert.equal(identifyDdLiveV3Digest('not-a-digest'), null);
});

test('five inputs become three already-known events and two new official events', () => {
  const result = localizeDdLiveV3Update('cs');
  assert.equal(result.version, 'v3.2');
  assert.deepEqual(result.metrics, {
    receivedFiles: 5,
    knownBeforeInsertion: 3,
    newEvents: 2,
    exactDuplicates: 1,
    sourceUpgrades: 2,
    newOfficialRecords: 2,
    substantiveNewOrUpgraded: 4,
    publicSourceFilesAdded: 0
  });
  assert.deepEqual(result.documents.filter(({ intakeClass }) => intakeClass === 'exact-duplicate').map(({ id }) => id), ['policeExactDuplicate']);
  assert.deepEqual(result.documents.filter(({ intakeClass }) => intakeClass === 'source-upgrade').map(({ id }) => id), ['reopeningMotionPrimary', 'preventiveFilingPrimary']);
  assert.deepEqual(result.documents.filter(({ intakeClass }) => intakeClass === 'new-official').map(({ id }) => id), ['ministerInteriorResponse', 'brnoProsecutorReview']);
});

test('the Ministry response is a new node but not a merits decision', () => {
  const item = localizeDdLiveV3Update('cs').documents.find(({ id }) => id === 'ministerInteriorResponse');
  assert.equal(item.reference, 'MV-114818-2/TP-2026');
  assert.match(item.mainSentence, /15\. a 17\. července.*nepovažuje za svou působnost/i);
  assert.match(item.after, /nikoli jako věcné posouzení.*vyloučení ministra.*soudní rozhodnutí/i);
  assert.match(item.boundary, /pouze data.*nikoli.*čísla jednací/i);
});

test('the Brno prosecutor record opens review without inventing its outcome', () => {
  const item = localizeDdLiveV3Update('cs').documents.find(({ id }) => id === 'brnoProsecutorReview');
  assert.equal(item.reference, '1 KZT 475/2026-32');
  assert.match(item.mainSentence, /přezkoumá.*OSZ Prostějov.*1 ZT 11\/2010/i);
  assert.match(item.after, /Nejde ještě o výsledek přezkumu ani potvrzení pochybení/i);
  assert.match(item.boundary, /10\. 7\. 2026.*10\. 7\. 2025.*Rozpor roku/i);
});

test('the reopening and preventive events are upgraded by primary PDFs without inflating filing status', () => {
  const result = localizeDdLiveV3Update('cs');
  const reopening = result.documents.find(({ id }) => id === 'reopeningMotionPrimary');
  const prevention = result.documents.find(({ id }) => id === 'preventiveFilingPrimary');
  assert.equal(reopening.pages, 15);
  assert.match(reopening.mainSentence, /prvních čtyř trestních řízení.*28 označených důkazních položek/i);
  assert.match(reopening.after, /nedokládá doručení.*zahájení řízení.*názor soudu/i);
  assert.equal(prevention.pages, 49);
  assert.match(prevention.mainSentence, /preventivní nabídku součinnosti.*mírnější prostředky/i);
  assert.match(prevention.after, /doručení a reakce každého adresáta.*samostatně/i);
});

test('all five records carry 9/9 relevance while no deadline or outcome is invented', () => {
  const result = localizeDdLiveV3Update('cs');
  assert.ok(result.documents.every(({ priority, trafficBand }) => priority === 9 && trafficBand === 'red-3'));
  assert.match(result.deadlineRule, /Žádná z pěti listin.*nestanoví novou zákonnou lhůtu/i);
  assert.match(result.deadlineRule, /nikoli automatický opravný prostředek/i);
});

test('the public model keeps exact references but withholds private identity fields and originals', () => {
  const result = localizeDdLiveV3Update('cs');
  assert.match(result.privacy, /jméno autora.*instituce.*data.*spisové značky/i);
  assert.match(result.privacy, /Nezveřejňuje.*adresu.*datum narození.*datovou schránku.*podpisová data.*soukromé originály/i);
  assert.equal(result.metrics.publicSourceFilesAdded, 0);
});

test('the bilingual interface renders and recognizes the daily set without publishing its PDFs', async () => {
  const [app, cs, en, styles, publicDocuments] = await Promise.all([
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/styles.css', import.meta.url), 'utf8'),
    readdir(new URL('../web/documents/', import.meta.url))
  ]);
  assert.match(app, /identifyDdLiveV3Digest\(digest\)/);
  assert.match(app, /renderDdLiveV3Update\(ddLiveEntries\.map/);
  assert.match(app, /isSinglePoliceDuplicate/);
  assert.match(app, /UI\.ddLiveRecognized/);
  for (const html of [cs, en]) {
    assert.match(html, /id="dd-daily-update"/);
    assert.match(html, /id="dd-update-documents"/);
  }
  assert.match(styles, /\.dd-update-card/);
  assert.equal(publicDocuments.some((name) => /114818|475.2026|preventiv|obnova/i.test(name)), false);
});
