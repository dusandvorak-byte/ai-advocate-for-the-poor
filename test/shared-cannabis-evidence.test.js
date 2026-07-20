import test from 'node:test';
import assert from 'node:assert/strict';
import { CASE_MEMORY } from '../web/case-memory.js';
import { analyzeGenericDocument } from '../web/generic-intake.js';
import {
  analyzeCannabisLegalConflict,
  CANNABIS_REMEDY_ROUTE_IDS,
  CANNABIS_LEGAL_SIGNAL_IDS,
  SHARED_CANNABIS_EVIDENCE_TOPIC_IDS
} from '../web/shared-cannabis-evidence.js';

test('cannabis content alone is not misclassified as a legal conflict', () => {
  const result = analyzeCannabisLegalConflict('Botanická studie popisuje růst a výnos rostlin konopí.', 'cs');

  assert.equal(result.detected, false);
  assert.equal(result.mode, 'not-detected');
  assert.equal(result.sharedEvidenceCandidates.length, 0);
  assert.equal(result.reopeningFramework.length, 0);
  assert.equal(result.contributionCandidate.eligible, false);
});

test('another person’s cannabis legal conflict enters the weakest-green shared-evidence route', () => {
  const source = 'Policie mi zajistila rostliny konopí a Krajský soud rozhodoval pod sp. zn. 7 T 123/2020.';
  const result = analyzeGenericDocument({ name: 'jina-kauza.txt', text: source }, 'cs');

  assert.equal(result.relation.id, 'green-1');
  assert.equal(result.cannabisLegalConflict.detected, true);
  assert.equal(result.cannabisLegalConflict.contributionCandidate.eligible, true);
  assert.match(result.cannabisLegalConflict.contributionCandidate.status, /Kandidátní příspěvek tohoto člověka/i);
  assert.equal(result.cannabisLegalConflict.remedyRoutes[0].id, 'other');
  assert.equal(result.cannabisLegalConflict.remedyRoutes[0].legallyDetermined, false);
  assert.equal(result.cannabisLegalConflict.reopeningFramework.length, 0);
  assert.ok(result.cannabisLegalConflict.draftOutline.length >= 5);
  assert.equal(result.preparedLegalInterpretation, false);
});

test('THC-measurement conflict receives source-linked shared evidence candidates, not copied case conclusions', () => {
  const source = 'Okresní soud mě odsoudil za konopí. Znalecký posudek stanovil THC bez popisu vzorkování a nejistoty měření. Navrhuji obnovu řízení ve věci 2 T 44/2017.';
  const result = analyzeCannabisLegalConflict(source, 'cs');

  assert.equal(result.detected, true);
  assert.ok(result.matchedTopics.some(({ id }) => id === 'thc-methodology'));
  assert.equal(result.sharedEvidenceCandidates.length, 4);
  const publicMemory = JSON.stringify(CASE_MEMORY);
  for (const candidate of result.sharedEvidenceCandidates) {
    assert.ok(source.includes(candidate.externalCitation));
    assert.ok(publicMemory.includes(candidate.memoryCitation));
    assert.ok(candidate.claim && candidate.memorySource && candidate.proves && candidate.limitation && candidate.confidence);
    assert.match(candidate.confidence, /kandidátní.*význam pro konkrétní kauzu neověřen/i);
  }
  assert.doesNotMatch(JSON.stringify(result.sharedEvidenceCandidates), /2 T 44\/2017/);
  assert.match(result.draftBoundary, /nikoli závěr.*přípustný.*nárok.*nezákonný/i);
  assert.match(result.remedyRoutes[0].boundary, /splněny zákonné podmínky obnovy.*obnova bude povolena/i);
});

test('EU technical-regulation issue is routed as a distinct shared comparison axis', () => {
  const source = 'V trestním rozsudku za pěstování cannabis nebyla vypořádána notifikace technického předpisu podle 2015/1535 ani předběžná otázka SDEU.';
  const result = analyzeCannabisLegalConflict(source, 'cs');

  assert.ok(result.matchedTopics.some(({ id }) => id === 'technical-regulations'));
  const candidate = result.sharedEvidenceCandidates.find(({ topicId }) => topicId === 'technical-regulations');
  assert.ok(candidate);
  assert.ok(source.includes(candidate.externalCitation));
  assert.match(candidate.confidence, /nutno ověřit ustanovení a rozhodné období/i);
  assert.match(candidate.limitation, /automaticky/i);
});

test('cross-case sharing accepts facts and evidence only with provenance, consent or anonymisation, and human relevance review', () => {
  const result = analyzeCannabisLegalConflict('Policie zabavila konopí v trestním řízení.', 'cs');

  assert.match(result.sharingPolicy, /Fakta a důkazy každého člověka/i);
  assert.match(result.sharingPolicy, /zdrojem.*citací.*souhlasem nebo zákonnou anonymizací.*lidským rozhodnutím/i);
  assert.match(result.sharingPolicy, /Identita, doručení, právní moc, lhůty a závěry.*se do jiné kauzy nepřenášejí/i);
  assert.match(result.contributionCandidate.use, /mohou.*rozšířit sdílenou vrstvu/i);
  assert.match(result.contributionCandidate.use, /nepovažuje za důkaz jen proto, že byl vložen/i);
});

test('the reopening outline requires the person’s own final decision, original evidence, novelty, and materiality', () => {
  const result = analyzeCannabisLegalConflict('Byl jsem odsouzen za konopí a mám nový důkaz pro obnovu řízení.', 'cs');
  const required = result.requiredCaseSpecificItems.join(' ');
  const outline = result.draftOutline.join(' ');

  assert.match(required, /pravomocné rozhodnutí.*spisovou značku.*právní moc/i);
  assert.match(required, /původní skutečnost nebo důkaz/i);
  assert.match(required, /proč nejde jen o dříve známou argumentaci/i);
  assert.match(required, /jiné rozhodnutí.*podobnost kauz sama nestačí/i);
  assert.match(outline, /bez předčasného tvrzení, že obnova musí být povolena/i);
  assert.equal(result.legallyDetermined, false);
  assert.doesNotMatch(JSON.stringify(result), /calculatedDeadline/i);
  assert.match(result.remedyRoutes[0].boundary, /nikoli závěr.*obnova bude povolena/i);
});

test('English output preserves the same shared-evidence and case-separation rules', () => {
  const source = 'I was convicted in a cannabis case. The expert report measured THC without a sampling rule or measurement uncertainty. This is new evidence for reopening.';
  const result = analyzeCannabisLegalConflict(source, 'en');

  assert.equal(result.detected, true);
  assert.ok(result.sharedEvidenceCandidates.length >= 4);
  assert.match(result.meaning, /own facts remain case-specific.*cross-case use/i);
  assert.match(result.sharingPolicy, /Facts and evidence from any person.*consent or lawful anonymisation/i);
  assert.match(result.draftBoundary, /not a finding.*admissible.*compensation is owed.*unlawful/i);
  assert.ok(result.sharedEvidenceCandidates.every(({ memoryCitationTranslation }) => memoryCitationTranslation));
  assert.equal(new Set(CANNABIS_LEGAL_SIGNAL_IDS).size, CANNABIS_LEGAL_SIGNAL_IDS.length);
  assert.deepEqual(SHARED_CANNABIS_EVIDENCE_TOPIC_IDS, ['thc-methodology', 'technical-regulations']);
});

test('a user-selected intervention action creates only a review outline, not a legal determination', () => {
  const result = analyzeGenericDocument({
    text: 'Policie provedla zásah kvůli konopí a jeho účinky podle mě stále trvají.',
    requestedRemedy: 'intervention-action'
  }, 'cs');
  const route = result.cannabisLegalConflict.remedyRoutes[0];

  assert.equal(route.id, 'intervention-action');
  assert.equal(route.basis, 'user-selected');
  assert.equal(route.legallyDetermined, false);
  assert.match(route.requiredCaseSpecificItems.join(' '), /orgán veřejné moci.*chronologii.*dotčená práva.*příslušný soud/i);
  assert.match(route.boundary, /nikoli závěr.*nezákonný zásah.*přípustná.*včasná.*úspěšná/i);
});

test('an intervention-action objective can be textually indicated without deciding admissibility', () => {
  const source = 'V konopné věci podávám zásahovou žalobu na ochranu před nezákonným zásahem.';
  const result = analyzeCannabisLegalConflict(source, 'cs');
  const route = result.remedyRoutes[0];

  assert.equal(result.detected, true);
  assert.equal(route.id, 'intervention-action');
  assert.equal(route.basis, 'textual-indication');
  assert.ok(route.citation && source.includes(route.citation));
  assert.equal(result.reopeningFramework.length, 0);
});

test('a compensation objective keeps harm, official conduct, causation, and prior request separate', () => {
  const result = analyzeCannabisLegalConflict(
    'V konopné trestní věci žádám náhradu škody a nemajetkové újmy po policejním postupu.',
    'cs',
    { requestedRemedy: 'compensation' }
  );
  const route = result.remedyRoutes[0];
  const required = route.requiredCaseSpecificItems.join(' ');

  assert.equal(route.id, 'compensation');
  assert.match(required, /majetkové škody.*nemajetkové újmy.*úřední postup.*příčinné souvislosti.*Předchozí žádost/i);
  assert.match(route.boundary, /nikoli závěr.*odpovědnost.*příčinná souvislost.*nárok.*úspěch/i);
});

test('automatic routing keeps multiple stated objectives as separate working routes', () => {
  const result = analyzeCannabisLegalConflict(
    'Po odsouzení za konopí mám nový důkaz pro obnovu řízení, zvažuji zásahovou žalobu a náhradu újmy.',
    'cs'
  );

  assert.deepEqual(result.remedyRoutes.map(({ id }) => id), ['reopening', 'intervention-action', 'compensation']);
  assert.ok(result.remedyRoutes.every(({ legallyDetermined }) => legallyDetermined === false));
  assert.match(result.meaning, /nezakládá nárok/i);
});

test('when no remedy is stated, the system asks a person to select another route', () => {
  const result = analyzeCannabisLegalConflict('Policie zajistila konopí pod sp. zn. 5 T 20/2021.', 'cs');
  const route = result.remedyRoutes[0];

  assert.equal(route.id, 'other');
  assert.equal(route.basis, 'not-determined');
  assert.match(route.requiredCaseSpecificItems.join(' '), /Výsledek.*rozhodnutí.*spisové značky.*chronologii.*kvalifikovaný člověk/i);
  assert.deepEqual(CANNABIS_REMEDY_ROUTE_IDS, ['reopening', 'intervention-action', 'compensation', 'other']);
});
