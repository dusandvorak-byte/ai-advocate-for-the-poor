import { analyzeDocumentSet, SAMPLE_DOCUMENT } from './analysis.js';
import { buildCaseMemory } from './memory.js';
import { CASE_MEMORY } from './case-memory.js';
import { localizeCaseMemory } from './case-memory-en.js';
import { localizeInstitutionalCaseMap } from './case-map.js';
import { localizeInternalArchiveTest } from './archive-update.js';
import { identifyOrganisationUpdateDigest, localizeOrganisationUpdate } from './organisation-update.js';
import { identifyPoliceUpdateDigest, localizePoliceUpdate } from './police-update.js';
import { identifyAllianceUpdateDigest, localizeAllianceUpdate } from './alliance-update.js';
import { identifyPrisonerReopeningDigest, localizePrisonerReopeningUpdate } from './prisoner-reopening-update.js';
import { localizeVersion2, trafficScore } from './version-2.js';
import { analyzeGenericDocuments } from './generic-intake.js';
import { extractPdfText } from './pdf-reader.js';

const $ = (id) => document.getElementById(id);
const language = document.documentElement.lang === 'en' ? 'en' : 'cs';
const PUBLIC_MEMORY = localizeCaseMemory(CASE_MEMORY, language);
const INTERNAL_TEST = localizeInternalArchiveTest(language);
const ORGANISATION_TEST = localizeOrganisationUpdate(language);
const POLICE_TEST = localizePoliceUpdate(language);
const ALLIANCE_TEST = localizeAllianceUpdate(language);
const PRISONER_TEST = localizePrisonerReopeningUpdate(language);
const VERSION_2 = localizeVersion2(language);
const TRAFFIC_LEVEL_BY_ID = new Map(VERSION_2.trafficLevels.map((level) => [level.id, level]));
let preparedDocuments = [];
let preparedInstitutionalMap = false;

const UI = {
  cs: {
    confidence: 'Jistota', documents: 'dokumentů', branches: 'rozpoznaných větví', references: 'spisových značek', dates: 'dat',
    noBranch: 'Zatím nebyla rozpoznána žádná podporovaná větev.', noReference: 'Nebyla rozpoznána žádná spisová značka.', noDate: 'Nebylo rozpoznáno žádné datum.',
    documentReferences: 'spisových značek', documentDates: 'dat', noMetadata: 'Bez rozpoznaných spisových značek a dat', pasted: 'Vložený dokument',
    empty: 'Nejprve vložte text nebo vyberte textové soubory.', demoLoaded: 'Načtena anonymizovaná institucionální mapa případu 2004–2026. Klikněte na „Vytvořit mapu případu“.', mapCreated: 'Mapa případu byla vytvořena.',
    indexed: 'indexováno v projektových podkladech', creatorStated: 'tvrzení autora — připojit anonymizovaný pramen', relations: 'Vazby mezi institucemi', timeline: 'Časová osa', evidenceStatus: 'Stav zdroje', link: 'Vazba', status: 'Stav', source: 'Zdroj', page: 'str.', audit: 'Audit', earlier: 'Dřívější výrok', intermediate: 'Mezilehlý výrok', later: 'Pozdější výrok', red: 'červená', amber: 'oranžová', before: 'PŘED TESTEM', after: 'PO TESTU', systemChange: 'Změna vytvořená systémem', urgent: 'bezodkladná lidská kontrola kvůli tvrzené naléhavosti a možným nevratným dopadům; výsledek řízení se nepředjímá', review: 'probíhající související větev vyžadující kontrolu úplného spisu', unknownPdf: 'Nejméně jedno PDF není přesně podporovaná listina. Prototyp nic neodeslal a na žádný soubor nepřenesl připravenou analýzu.', onePdfOnly: 'V režimu PDF vyberte pouze jeden nebo více přesně podporovaných PDF bez textových příloh.', organisationLoaded: 'Veřejná anonymizovaná kopie PDF byla načtena lokálně. Klikněte na „Analyzovat lokálně“.', policeLoaded: 'Veřejná odvozená kopie policejního sdělení byla načtena lokálně. Jméno Dušana Dvořáka zůstává zachováno; adresa a podpisová data jsou odstraněna. Klikněte na „Analyzovat lokálně“.', privateOriginal: 'soukromý originál rozpoznán přesným digitálním otiskem; veřejně se zobrazí pouze zkontrolovaný výstup', publicDerivative: 'veřejná odvozená kopie rozpoznána přesným digitálním otiskem', policeRecognized: 'Následný test dokončen: přesné policejní PDF bylo rozpoznáno lokálně. Jméno Dušana Dvořáka zůstává veřejné; adresa a podpisová data se nezveřejňují. Zobrazuje se zdrojově omezený výstup před/po, devět červených vazeb a návrh pro lidskou kontrolu.', allianceRecognized: 'Přesná zkontrolovaná listina byla rozpoznána lokálně. Soubor se nikam neodeslal; stránka zvýraznila odpovídající zdrojově omezený záznam v živé paměti.', prisonerRecognized: 'Přesný soukromý návrh L. CH. byl rozpoznán pouze digitálním otiskem. Soubor se nikam neodeslal; stránka ukazuje anonymizované porovnání s pamětí k 20. 7. 2026. Hodnocení 9/9 znamená relevanci, nikoli šanci na úspěch.', redLinks: 'červených vazeb', amberLinks: 'oranžových vazeb', greenLinks: 'zelených vazeb', openResult: 'Zobrazit úplný výsledek', priorityRule: 'Pořadí určuje nejvyšší dosažený stupeň semaforu, potom počet červených a oranžových vazeb, jejich souhrnná váha a datum listiny. Semafor vyjadřuje relevanci a potřebu lidské reakce; sám neprokazuje pochybení ani výsledek řízení.', deadline: 'Lhůta', peakPriority: 'Nejvyšší priorita', substantiveAnswers: 'věcných odpovědí v listině'
  },
  en: {
    confidence: 'Confidence', documents: 'documents', branches: 'identified branches', references: 'case references', dates: 'dates',
    noBranch: 'No supported branch has been identified yet.', noReference: 'No case reference was identified.', noDate: 'No date was identified.',
    documentReferences: 'case references', documentDates: 'dates', noMetadata: 'No identified case references or dates', pasted: 'Pasted document',
    empty: 'Paste text or select text files first.', demoLoaded: 'The anonymized 2004–2026 institutional case map is loaded. Click “Create case map”.', mapCreated: 'The case map was created.',
    indexed: 'indexed in project materials', creatorStated: 'creator-stated — attach anonymized source', relations: 'Institutional relationships', timeline: 'Timeline', evidenceStatus: 'Source status', link: 'Link', status: 'Status', source: 'Source', page: 'p.', audit: 'Audit', earlier: 'Earlier statement', intermediate: 'Intermediate statement', later: 'Later statement', red: 'red', amber: 'amber', before: 'BEFORE THE TEST', after: 'AFTER THE TEST', systemChange: 'System-generated change', urgent: 'immediate human review because of alleged urgency and potentially irreversible effects; the outcome is not prejudged', review: 'an active related branch requiring review of the complete file', unknownPdf: 'At least one PDF is not an exactly supported document. The prototype uploaded nothing and transferred no prepared analysis to any file.', onePdfOnly: 'In PDF mode, select only one or more exactly supported PDFs without text attachments.', organisationLoaded: 'The public anonymized PDF copy was loaded locally. Click “Analyze locally”.', policeLoaded: 'The reviewed public derivative of the police notice was loaded locally. Dušan Dvořák’s name remains visible; the address and signature data have been removed. Click “Analyze locally”.', privateOriginal: 'private original recognized by its exact digital fingerprint; only the reviewed output is displayed publicly', publicDerivative: 'reviewed public derivative recognized by its exact digital fingerprint', policeRecognized: 'Post-submission test completed: the exact police PDF was recognized locally. Dušan Dvořák’s name remains public; the address and signature data are not published. The page displays a source-bounded before/after result, nine red links, and a proposal for human review.', allianceRecognized: 'The exact reviewed document was recognized locally. The file was not uploaded; the page highlighted the corresponding source-bounded record in the living memory.', prisonerRecognized: 'The exact private L. CH. motion was recognized only by its digital fingerprint. The file was not uploaded; the page shows the anonymized comparison with the memory as of 20 July 2026. The 9/9 score means relevance, not likelihood of success.', redLinks: 'red links', amberLinks: 'amber links', greenLinks: 'green links', openResult: 'Show full result', priorityRule: 'Ordering uses the highest traffic-light level first, followed by red and amber link counts, their combined weight, and document date. The traffic light records relevance and the need for human response; it does not itself prove wrongdoing or predict an outcome.', deadline: 'Deadline', peakPriority: 'Highest priority', substantiveAnswers: 'substantive answers in the document'
  }
}[language];

const GENERIC_UI = language === 'en' ? {
  reading: 'The document is being read and compared only in this browser…',
  done: 'General local orientation is complete. Case-specific conclusions were not transferred; source-linked shared cannabis evidence is shown separately where relevant.'
} : {
  reading: 'Dokument se čte a porovnává pouze v tomto prohlížeči…',
  done: 'Obecná místní orientace je hotová. Případově specifické závěry nebyly přeneseny; relevantní zdrojované sdílené konopné důkazy jsou zobrazeny odděleně.'
};

function renderVersion2Dashboard() {
  const history = $('version-history');
  history.replaceChildren();
  for (const item of VERSION_2.history) {
    const card = document.createElement('a');
    card.className = `version-card version-${item.kind}`;
    card.href = item.href;
    const version = document.createElement('span');
    version.className = 'version-number';
    version.textContent = item.id.toUpperCase();
    const period = document.createElement('span');
    period.className = 'version-period';
    period.textContent = item.period;
    const title = document.createElement('strong');
    title.textContent = item.title;
    const description = document.createElement('small');
    description.textContent = item.description;
    card.append(version, period, title, description);
    history.append(card);
  }

  const metrics = $('case-input-metrics');
  metrics.replaceChildren();
  const metricData = [...VERSION_2.dashboard.counts, VERSION_2.dashboard.administrativeProceedings];
  for (const metric of metricData) {
    const card = document.createElement('article');
    card.className = `metric-card dashboard-metric${metric.value === '—' ? ' metric-pending' : ''}`;
    const value = document.createElement('strong');
    value.textContent = metric.value;
    const label = document.createElement('span');
    label.textContent = metric.label;
    const note = document.createElement('small');
    note.textContent = metric.note;
    card.append(value, label, note);
    metrics.append(card);
  }

  const latest = VERSION_2.dashboard.latestDocument;
  const priorityLevel = TRAFFIC_LEVEL_BY_ID.get(latest.priority);
  const priority = $('latest-priority');
  priority.replaceChildren();
  priority.className = `latest-priority traffic-border-${latest.priority}`;
  const priorityBadge = document.createElement('span');
  priorityBadge.className = `risk-badge traffic-${latest.priority}`;
  priorityBadge.textContent = priorityLevel.label;
  const version = document.createElement('strong');
  version.textContent = `${latest.version} · ${latest.date}`;
  const headline = document.createElement('p');
  headline.textContent = latest.headline;
  const links = document.createElement('div');
  links.className = 'priority-link-count';
  for (const metric of latest.metrics) {
    const item = document.createElement('span');
    item.textContent = `${metric.value} ${metric.label}`;
    links.append(item);
  }
  const distribution = document.createElement('div');
  distribution.className = 'priority-distribution';
  for (const item of latest.trafficDistribution) {
    const level = TRAFFIC_LEVEL_BY_ID.get(item.band);
    const badge = document.createElement('span');
    badge.className = `risk-badge traffic-${item.band}`;
    badge.textContent = `${item.count}× ${level.label}`;
    distribution.append(badge);
  }
  priority.append(priorityBadge, version, headline, links, distribution);

  const deadline = latest.stateDeadline;
  const deadlineCard = $('latest-deadline');
  deadlineCard.replaceChildren();
  deadlineCard.className = 'latest-deadline deadline-not-stated';
  const deadlineLabel = document.createElement('strong');
  deadlineLabel.textContent = deadline.label;
  const deadlineValue = document.createElement('span');
  deadlineValue.textContent = deadline.value;
  const deadlineRule = document.createElement('small');
  deadlineRule.textContent = deadline.rule;
  deadlineCard.append(deadlineLabel, deadlineValue, deadlineRule);

  const scale = $('traffic-scale');
  scale.replaceChildren();
  for (const level of VERSION_2.trafficLevels) {
    const card = document.createElement('article');
    card.className = `traffic-level-card traffic-${level.id}`;
    const score = document.createElement('span');
    score.className = 'traffic-score';
    score.textContent = `${level.score}/9`;
    const label = document.createElement('strong');
    label.textContent = level.label;
    const meaning = document.createElement('small');
    meaning.textContent = level.meaning;
    card.append(score, label, meaning);
    scale.append(card);
  }

  const snapshots = $('daily-version-history');
  snapshots.replaceChildren();
  for (const snapshot of VERSION_2.dashboard.dailySnapshots) {
    const link = document.createElement('a');
    link.className = 'daily-snapshot';
    link.href = snapshot.href;
    const date = document.createElement('strong');
    date.textContent = `${snapshot.version} · ${snapshot.date}`;
    const title = document.createElement('span');
    title.textContent = snapshot.title;
    const change = document.createElement('small');
    change.textContent = snapshot.change;
    link.append(date, title, change);
    snapshots.append(link);
  }
  $('daily-version-rule').textContent = VERSION_2.dashboard.snapshotRule;

  const linkList = $('latest-link-list');
  linkList.replaceChildren();
  for (const item of POLICE_TEST.relevance.filter(({ level }) => level === 'direct')) {
    const band = trafficBandFor(item);
    const traffic = TRAFFIC_LEVEL_BY_ID.get(band);
    const entry = document.createElement('li');
    entry.className = `traffic-link traffic-border-${band}`;
    const badge = document.createElement('span');
    badge.className = `risk-badge traffic-${band}`;
    badge.textContent = traffic.label;
    const label = document.createElement('strong');
    label.textContent = item.label.replace(/^(?:ČERVENÁ|RED)\s+\d+\s+-\s+/i, '');
    const targets = document.createElement('small');
    targets.textContent = item.targets;
    entry.append(badge, label, targets);
    linkList.append(entry);
  }
}

function createAllianceTrafficBadge(band) {
  const level = TRAFFIC_LEVEL_BY_ID.get(band);
  const badge = document.createElement('span');
  badge.className = `risk-badge traffic-${band}`;
  badge.textContent = level.label;
  return badge;
}

function appendAllianceField(target, label, value) {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = value;
  target.append(term, description);
}

function appendAllianceCitations(target, citations, label) {
  const values = [...new Set(citations.filter(Boolean))];
  if (!values.length) return;
  const details = document.createElement('details');
  details.className = 'source-citations';
  const summary = document.createElement('summary');
  summary.textContent = label;
  details.append(summary);
  for (const value of values) {
    const citation = document.createElement('blockquote');
    citation.lang = 'cs';
    citation.textContent = `„${value}“`;
    details.append(citation);
  }
  target.append(details);
}

function renderAllianceUpdate() {
  const labels = language === 'en' ? {
    report: 'ANNUAL REPORT STATUS', register: 'ORGANISATIONAL CONTEXT', enforcement: 'CONCLUDED ENFORCEMENT BRANCHES',
    court: 'PRECISE JUDICIAL FINDING', executor: 'Bailiff', appointment: 'Appointment and enforceable title',
    matter: 'Matter', creditor: 'Creditor', outcome: 'How and when the branch concluded', amount: 'Documented amount',
    source: 'Exact source wording (Czech)', confidence: 'Source status', boundary: 'Publication and evidence boundary'
  } : {
    report: 'STAV VÝROČNÍ ZPRÁVY', register: 'ORGANIZAČNÍ KONTEXT', enforcement: 'UKONČENÉ EXEKUČNÍ VĚTVE',
    court: 'PŘESNÝ SOUDNÍ ZÁVĚR', executor: 'Exekutor', appointment: 'Pověření a exekuční titul',
    matter: 'Věc', creditor: 'Oprávněný', outcome: 'Jak a kdy byla větev ukončena', amount: 'Doložená částka',
    source: 'Přesné znění zdroje', confidence: 'Stav zdroje', boundary: 'Hranice zveřejnění a důkazu'
  };

  const updateDate = language === 'en' ? '20 July 2026' : '20. 7. 2026';
  $('latest-update-title').textContent = `${updateDate} — ${ALLIANCE_TEST.headline}`;
  $('latest-update-summary').textContent = ALLIANCE_TEST.summary;
  $('alliance-update-heading').textContent = ALLIANCE_TEST.title;
  $('alliance-update-summary').textContent = ALLIANCE_TEST.summary;

  const duplicateTarget = $('deduplication-update');
  duplicateTarget.replaceChildren();
  const duplicate = document.createElement('article');
  duplicate.className = `alliance-card duplicate-card traffic-border-${ALLIANCE_TEST.duplicateRecognition.trafficBand}`;
  const duplicateMeta = document.createElement('p');
  duplicateMeta.className = 'alliance-card-label';
  duplicateMeta.append(createAllianceTrafficBadge(ALLIANCE_TEST.duplicateRecognition.trafficBand));
  const duplicateTitle = document.createElement('h4');
  duplicateTitle.textContent = ALLIANCE_TEST.duplicateRecognition.title;
  const duplicateResult = document.createElement('p');
  duplicateResult.textContent = ALLIANCE_TEST.duplicateRecognition.result;
  const duplicateConfidence = document.createElement('small');
  duplicateConfidence.textContent = ALLIANCE_TEST.duplicateRecognition.confidence;
  duplicate.append(duplicateMeta, duplicateTitle, duplicateResult, duplicateConfidence);
  duplicateTarget.append(duplicate);

  const reportTarget = $('annual-report-update');
  reportTarget.replaceChildren();
  const report = document.createElement('article');
  report.className = `alliance-card annual-report-card traffic-border-${ALLIANCE_TEST.annualReport.trafficBand}`;
  const reportMeta = document.createElement('p');
  reportMeta.className = 'alliance-card-label';
  reportMeta.append(createAllianceTrafficBadge(ALLIANCE_TEST.annualReport.trafficBand), document.createTextNode(` ${labels.report}`));
  const reportTitle = document.createElement('h4');
  reportTitle.textContent = ALLIANCE_TEST.annualReport.title;
  const reportStatus = document.createElement('p');
  reportStatus.textContent = ALLIANCE_TEST.annualReport.status;
  const reportLink = document.createElement('a');
  reportLink.className = 'action-link';
  reportLink.href = ALLIANCE_TEST.annualReport.website;
  reportLink.target = '_blank';
  reportLink.rel = 'noopener';
  reportLink.textContent = ALLIANCE_TEST.annualReport.websiteLabel;
  const reportBoundary = document.createElement('p');
  reportBoundary.className = 'evidence-boundary compact-boundary';
  reportBoundary.textContent = ALLIANCE_TEST.annualReport.publicationBoundary;
  const reportProvenance = document.createElement('small');
  reportProvenance.textContent = `${labels.confidence}: ${ALLIANCE_TEST.annualReport.provenance}`;
  report.append(reportMeta, reportTitle, reportStatus, reportLink, reportBoundary, reportProvenance);
  reportTarget.append(report);

  const registerTarget = $('register-context-update');
  registerTarget.replaceChildren();
  const register = document.createElement('article');
  register.className = `alliance-card traffic-border-${ALLIANCE_TEST.registerContext.trafficBand}`;
  const registerMeta = document.createElement('p');
  registerMeta.className = 'alliance-card-label';
  registerMeta.append(createAllianceTrafficBadge(ALLIANCE_TEST.registerContext.trafficBand), document.createTextNode(` ${labels.register}`));
  const registerClaim = document.createElement('p');
  registerClaim.textContent = ALLIANCE_TEST.registerContext.claim;
  const registerConfidence = document.createElement('small');
  registerConfidence.textContent = `${labels.confidence}: ${ALLIANCE_TEST.registerContext.confidence}`;
  register.append(registerMeta, registerClaim, registerConfidence);
  appendAllianceCitations(register, ALLIANCE_TEST.registerContext.citations, labels.source);
  registerTarget.append(register);

  const enforcementTarget = $('enforcement-update');
  enforcementTarget.replaceChildren();
  for (const item of ALLIANCE_TEST.enforcementProceedings) {
    const card = document.createElement('article');
    card.className = `alliance-card enforcement-card traffic-border-${item.trafficBand}`;
    card.id = `alliance-evidence-${item.id}`;
    const meta = document.createElement('p');
    meta.className = 'alliance-card-label';
    meta.append(createAllianceTrafficBadge(item.trafficBand), document.createTextNode(` ${labels.enforcement}`));
    const heading = document.createElement('h4');
    heading.textContent = `${item.subject} · ${item.reference}`;
    const facts = document.createElement('dl');
    facts.className = 'alliance-facts';
    appendAllianceField(facts, labels.executor, `${item.executor} · ${item.office}`);
    appendAllianceField(facts, labels.appointment, item.appointment);
    appendAllianceField(facts, labels.creditor, item.creditor);
    appendAllianceField(facts, labels.matter, item.matter);
    appendAllianceField(facts, labels.outcome, item.outcome ?? item.stopped);
    appendAllianceField(facts, labels.amount, item.amount.display);
    card.append(meta, heading, facts);
    appendAllianceCitations(card, [
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
    ], labels.source);
    enforcementTarget.append(card);
  }

  const courtTarget = $('district-court-update');
  courtTarget.replaceChildren();
  const court = document.createElement('article');
  court.className = `alliance-card court-card traffic-border-${ALLIANCE_TEST.districtCourt.trafficBand}`;
  const courtMeta = document.createElement('p');
  courtMeta.className = 'alliance-card-label';
  courtMeta.append(createAllianceTrafficBadge(ALLIANCE_TEST.districtCourt.trafficBand), document.createTextNode(` ${labels.court}`));
  const courtHeading = document.createElement('h4');
  courtHeading.textContent = `${ALLIANCE_TEST.districtCourt.court} · ${ALLIANCE_TEST.districtCourt.reference}`;
  const courtClaim = document.createElement('p');
  courtClaim.className = 'claim-text';
  courtClaim.textContent = ALLIANCE_TEST.districtCourt.claim;
  const courtReason = document.createElement('p');
  courtReason.textContent = ALLIANCE_TEST.districtCourt.reason;
  const courtMeaning = document.createElement('p');
  courtMeaning.className = 'system-meaning';
  courtMeaning.textContent = ALLIANCE_TEST.districtCourt.meaning;
  const courtFinality = document.createElement('small');
  courtFinality.textContent = `${ALLIANCE_TEST.districtCourt.finality} ${ALLIANCE_TEST.districtCourt.confidence}`;
  const courtBoundary = document.createElement('p');
  courtBoundary.className = 'evidence-boundary compact-boundary';
  courtBoundary.textContent = ALLIANCE_TEST.districtCourt.limitation;
  court.append(courtMeta, courtHeading, courtClaim, courtReason, courtMeaning, courtFinality, courtBoundary);
  appendAllianceCitations(court, ALLIANCE_TEST.districtCourt.citations, labels.source);
  courtTarget.append(court);

  const assessmentTarget = $('alliance-author-assessment');
  assessmentTarget.replaceChildren();
  const assessmentTitle = document.createElement('strong');
  assessmentTitle.textContent = ALLIANCE_TEST.creatorAssessment.label;
  const assessment = document.createElement('p');
  assessment.textContent = ALLIANCE_TEST.creatorAssessment.statement;
  const assessmentBoundary = document.createElement('p');
  assessmentBoundary.className = 'evidence-boundary compact-boundary';
  assessmentBoundary.textContent = ALLIANCE_TEST.creatorAssessment.boundary;
  assessmentTarget.append(assessmentTitle, assessment, assessmentBoundary);

  $('alliance-evidence-boundary').textContent = `${labels.boundary}: ${ALLIANCE_TEST.summary}`;
}

function renderPrisonerReopeningUpdate() {
  const labels = language === 'en' ? {
    publicContext: 'PUBLIC FILM CONTEXT', source: '1 · STATEMENTS IN THE 2022 MOTION',
    baseline: '2 · AUTHOR-CONFIRMED TEST BASELINE', synthesis: '3 · SYSTEM COMPARISON WITH THE MEMORY AS OF 20 JULY 2026',
    sourceWording: 'Exact anonymized source wording (Czech)', sourceLimit: 'Source limit',
    currentEvidence: 'Current memory evidence and case-law links', caseLaw: 'Case law',
    memory: 'Evidence memory', axis: 'Public evidence axis', boundary: 'Limit', rewrite: 'What a new motion would do differently'
  } : {
    publicContext: 'VEŘEJNÝ FILMOVÝ KONTEXT', source: '1 · VÝROKY NÁVRHU Z ROKU 2022',
    baseline: '2 · AUTOREM POTVRZENÝ ZÁKLAD TESTU', synthesis: '3 · POROVNÁNÍ SYSTÉMU S PAMĚTÍ K 20. 7. 2026',
    sourceWording: 'Přesné anonymizované znění zdroje', sourceLimit: 'Mez zdroje',
    currentEvidence: 'Dnešní důkazní paměť a judikatorní vazby', caseLaw: 'Judikatura',
    memory: 'Důkazní paměť', axis: 'Veřejná důkazní osa', boundary: 'Mez', rewrite: 'Co by nový návrh udělal jinak'
  };

  const updateDate = language === 'en' ? '20 July 2026' : '20. 7. 2026';
  $('latest-update-title').textContent = `${updateDate} — ${PRISONER_TEST.title}`;
  $('latest-update-summary').textContent = PRISONER_TEST.summary;
  $('prisoner-update-heading').textContent = PRISONER_TEST.title;
  $('prisoner-update-summary').textContent = PRISONER_TEST.summary;

  const overall = $('prisoner-update-overall');
  overall.replaceChildren();
  overall.className = `prisoner-overall traffic-border-${PRISONER_TEST.overall.trafficBand}`;
  const overallBadge = createAllianceTrafficBadge(PRISONER_TEST.overall.trafficBand);
  overallBadge.textContent = `${PRISONER_TEST.overall.score}/9 · ${PRISONER_TEST.overall.label}`;
  const overallBoundary = document.createElement('strong');
  overallBoundary.textContent = PRISONER_TEST.overall.boundary;
  overall.append(overallBadge, overallBoundary);

  const context = $('prisoner-public-context');
  context.replaceChildren();
  const contextLabel = document.createElement('p');
  contextLabel.className = 'alliance-card-label';
  contextLabel.textContent = labels.publicContext;
  const contextTitle = document.createElement('h4');
  contextTitle.textContent = PRISONER_TEST.publicContext.label;
  const contextLink = document.createElement('a');
  contextLink.className = 'action-link';
  contextLink.href = PRISONER_TEST.publicContext.url;
  contextLink.target = '_blank';
  contextLink.rel = 'noopener noreferrer';
  contextLink.textContent = PRISONER_TEST.publicContext.linkLabel;
  const contextBoundary = document.createElement('p');
  contextBoundary.className = 'evidence-boundary compact-boundary';
  contextBoundary.textContent = PRISONER_TEST.publicContext.boundary;
  context.append(contextLabel, contextTitle, contextLink, contextBoundary);

  const sourceTarget = $('prisoner-source-facts');
  sourceTarget.replaceChildren();
  const sourceHeading = document.createElement('h4');
  sourceHeading.textContent = labels.source;
  sourceTarget.append(sourceHeading);
  for (const item of PRISONER_TEST.source.sourceStatements) {
    const card = document.createElement('article');
    card.className = 'prisoner-source-card';
    const claim = document.createElement('p');
    claim.className = 'claim-text';
    claim.textContent = item.claim;
    const page = document.createElement('small');
    page.textContent = `${language === 'en' ? 'Private source, p.' : 'Soukromý zdroj, str.'} ${item.page}`;
    card.append(claim, page);
    appendAllianceCitations(card, [item.citation, item.supportingCitation], labels.sourceWording);
    if (language === 'en') {
      appendAllianceCitations(card, [item.citationTranslation, item.supportingCitationTranslation], 'English translation');
    }
    const limit = document.createElement('p');
    limit.className = 'evidence-note';
    limit.textContent = `${labels.sourceLimit}: ${item.limitation}`;
    card.append(limit);
    sourceTarget.append(card);
  }

  const baseline = $('prisoner-author-baseline');
  baseline.replaceChildren();
  const baselineHeading = document.createElement('h4');
  baselineHeading.textContent = labels.baseline;
  const baselineConfidence = document.createElement('p');
  baselineConfidence.textContent = PRISONER_TEST.authorBaseline.confidence;
  const baselineFacts = document.createElement('ul');
  for (const fact of PRISONER_TEST.authorBaseline.facts) {
    const item = document.createElement('li');
    item.textContent = fact;
    baselineFacts.append(item);
  }
  baseline.append(baselineHeading, baselineConfidence, baselineFacts);

  const comparisonTarget = $('prisoner-comparison');
  comparisonTarget.replaceChildren();
  const comparisonHeading = document.createElement('h4');
  comparisonHeading.textContent = labels.synthesis;
  comparisonTarget.append(comparisonHeading);
  for (const item of PRISONER_TEST.comparison) {
    const card = document.createElement('article');
    card.className = `prisoner-comparison-card traffic-border-${item.trafficBand}`;
    const badge = createAllianceTrafficBadge(item.trafficBand);
    badge.textContent = `${item.score}/9 · ${badge.textContent}`;
    const title = document.createElement('h5');
    title.textContent = item.title;
    const meaning = document.createElement('p');
    meaning.textContent = item.meaning;
    card.append(badge, title, meaning);

    const evidence = [...item.memoryEvidence, ...item.jurisprudence, ...item.publicAxes];
    if (evidence.length) {
      const details = document.createElement('details');
      details.className = 'prisoner-evidence-details';
      const summary = document.createElement('summary');
      summary.textContent = labels.currentEvidence;
      details.append(summary);
      for (const record of item.memoryEvidence) {
        const entry = document.createElement('div');
        const heading = document.createElement('strong');
        heading.textContent = `${labels.memory}: ${record.institution} · ${record.reference}`;
        const statement = document.createElement('p');
        statement.textContent = record.statement;
        const quote = document.createElement('blockquote');
        quote.textContent = `„${record.originalCitation ?? record.citation}“`;
        const limit = document.createElement('small');
        limit.textContent = record.doesNotProve;
        entry.append(heading, statement, quote, limit);
        details.append(entry);
      }
      for (const decision of item.jurisprudence) {
        const entry = document.createElement('div');
        const link = document.createElement('a');
        link.href = decision.sourceUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = `${labels.caseLaw}: ${decision.court} · ${decision.reference}`;
        const principle = document.createElement('p');
        principle.textContent = `${decision.principle} ${decision.relation}`;
        entry.append(link, principle);
        details.append(entry);
      }
      for (const axis of item.publicAxes) {
        const entry = document.createElement('div');
        const heading = document.createElement('strong');
        heading.textContent = `${labels.axis}: ${axis.title}`;
        const fact = document.createElement('p');
        fact.textContent = axis.fact;
        const limit = document.createElement('small');
        limit.textContent = axis.uncertainty;
        entry.append(heading, fact, limit);
        details.append(entry);
      }
      card.append(details);
    }
    const limit = document.createElement('p');
    limit.className = 'evidence-boundary compact-boundary';
    limit.textContent = `${labels.boundary}: ${item.boundary}`;
    card.append(limit);
    comparisonTarget.append(card);
  }

  const rewriteTarget = $('prisoner-rewrite');
  rewriteTarget.replaceChildren();
  const rewriteHeading = document.createElement('h4');
  rewriteHeading.textContent = labels.rewrite;
  const rewriteList = document.createElement('ol');
  for (const step of PRISONER_TEST.rewritePlan) {
    const item = document.createElement('li');
    item.textContent = step;
    rewriteList.append(item);
  }
  rewriteTarget.append(rewriteHeading, rewriteList);
  $('prisoner-evidence-boundary').textContent = PRISONER_TEST.publicationBoundary;
}

function highlightAllianceEvidence(ids) {
  for (const prior of document.querySelectorAll('.recognized-evidence')) prior.classList.remove('recognized-evidence');
  const targetIds = {
    publicRegister: 'register-context-update',
    artLanguageExecution: 'alliance-evidence-art-language',
    liberecExecution: 'alliance-evidence-liberec-clinic',
    plzenExecution: 'alliance-evidence-plzen-clinic',
    prostejovJudgment: 'district-court-update',
    liberecBalance: 'alliance-evidence-liberec-clinic',
    generaliPaid: 'alliance-evidence-generali-paid'
  };
  let first = null;
  for (const id of ids) {
    const container = $(targetIds[id]);
    const target = container?.classList.contains('alliance-card') ? container : container?.querySelector('.alliance-card');
    if (!target) continue;
    target.classList.add('recognized-evidence');
    first ??= target;
  }
  return first;
}

function renderStatements(targetId, items) {
  const target = $(targetId);
  target.replaceChildren();
  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'claim';
    const claim = document.createElement('p');
    claim.className = 'claim-text';
    claim.textContent = item.claim;
    const confidence = document.createElement('p');
    confidence.className = 'confidence';
    confidence.textContent = `${UI.confidence}: ${item.confidence}`;
    const citation = document.createElement('blockquote');
    citation.textContent = `„${item.citation}“`;
    card.append(claim, confidence, citation);
    if (language === 'en' && item.citationTranslation) {
      const translation = document.createElement('p');
      translation.className = 'translation';
      translation.textContent = `English translation: “${item.citationTranslation}”`;
      card.append(translation);
    }
    target.append(card);
  }
}

function reject(result) {
  $('analysis-out').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
  showStatus(result.reason, 'error');
}

function showStatus(message, kind = 'warning') {
  $('status').hidden = false;
  $('status').className = `status ${kind}`;
  $('status').textContent = message;
}

function renderList(targetId, items) {
  const target = $(targetId);
  target.replaceChildren();
  for (const value of items) {
    const entry = document.createElement('li');
    entry.textContent = value;
    target.append(entry);
  }
}

function renderGroundedOrPlain(targetId, items) {
  if (items.length && typeof items[0] === 'object') {
    renderStatements(targetId, items);
    return;
  }
  const target = $(targetId);
  target.replaceChildren();
  const list = document.createElement('ul');
  for (const value of items) {
    const entry = document.createElement('li');
    entry.textContent = value;
    list.append(entry);
  }
  target.append(list);
}

function trafficBandFor(item) {
  if (item.trafficBand) return item.trafficBand;
  if (item.level === 'direct') return 'red-1';
  if (item.level === 'supportive') return 'amber-1';
  return 'green-1';
}

function priorityCounts(test) {
  const bands = test.relevance.map(trafficBandFor);
  const scores = bands.map(trafficScore);
  return {
    red: bands.filter((band) => band.startsWith('red-')).length,
    amber: bands.filter((band) => band.startsWith('amber-')).length,
    green: bands.filter((band) => band.startsWith('green-')).length,
    maxScore: Math.max(0, ...scores),
    totalScore: scores.reduce((sum, score) => sum + score, 0),
    peakBand: bands.sort((left, right) => trafficScore(right) - trafficScore(left))[0] ?? 'green-1'
  };
}

function appendPriorityBadges(target, test) {
  const counts = priorityCounts(test);
  const peak = TRAFFIC_LEVEL_BY_ID.get(counts.peakBand);
  if (peak) {
    const peakBadge = document.createElement('span');
    peakBadge.className = `risk-badge traffic-${peak.id}`;
    peakBadge.textContent = `${UI.peakPriority}: ${peak.label}`;
    target.append(peakBadge, document.createTextNode(' '));
  }
  const values = [
    ['critical', `${counts.red} ${UI.redLinks}`],
    ['review', `${counts.amber} ${UI.amberLinks}`],
    ['verified', `${counts.green} ${UI.greenLinks}`]
  ];
  for (const [level, label] of values) {
    const badge = document.createElement('span');
    badge.className = `risk-badge ${level}`;
    badge.textContent = label;
    target.append(badge, document.createTextNode(' '));
  }
}

function renderPriorityQueue(entries) {
  const sorted = [...entries].sort((left, right) => {
    const a = priorityCounts(left.test);
    const b = priorityCounts(right.test);
    return b.maxScore - a.maxScore
      || b.red - a.red
      || b.amber - a.amber
      || b.totalScore - a.totalScore
      || String(right.test.source.documentDate).localeCompare(String(left.test.source.documentDate));
  });
  $('priority-queue-summary').textContent = UI.priorityRule;
  const queue = $('priority-queue');
  queue.replaceChildren();
  for (const entry of sorted) {
    const card = document.createElement('article');
    card.className = 'claim priority-card';
    const title = document.createElement('h3');
    title.textContent = `${entry.test.source.documentDate} · ${entry.test.title}`;
    const source = document.createElement('p');
    source.textContent = entry.name;
    const badges = document.createElement('p');
    badges.className = 'priority-badges';
    appendPriorityBadges(badges, entry.test);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'secondary';
    button.textContent = UI.openResult;
    button.addEventListener('click', () => {
      renderExactPdfUpdate(entry.test, entry.inputKind);
      window.scrollTo({ top: $('organisation-result').offsetTop, behavior: 'smooth' });
    });
    card.append(title, source, badges, button);
    queue.append(card);
  }
  $('priority-queue-section').hidden = false;
  return sorted;
}

function renderInternalArchiveTest(test) {
  $('integration-title').textContent = `${test.persona} · ${test.title}`;
  $('integration-scope').textContent = `${test.scope} ${language === 'en' ? 'Test version' : 'Verze testu'}: ${test.version}.`;

  const metrics = $('integration-metrics');
  metrics.replaceChildren();
  for (const metric of test.archiveMetrics) {
    const card = document.createElement('article'); card.className = 'metric-card';
    const value = document.createElement('strong'); value.textContent = metric.value;
    const label = document.createElement('span'); label.textContent = metric.label;
    card.append(value, label); metrics.append(card);
  }

  const incoming = test.incomingDocument;
  const sourceCard = document.createElement('article'); sourceCard.className = 'claim integration-source';
  const sourceTitle = document.createElement('h3'); sourceTitle.textContent = language === 'en' ? 'New document recognized' : 'Rozpoznaná nová listina';
  const sourceMeta = document.createElement('p'); sourceMeta.textContent = `${incoming.issuer} · ${incoming.issued} · ${incoming.reference} · ${incoming.type}`;
  const receipt = document.createElement('p'); receipt.textContent = `${language === 'en' ? 'Recorded receipt date' : 'Evidované datum doručení'}: ${incoming.received}`;
  const quote = document.createElement('blockquote'); quote.textContent = `„${incoming.quote}“`;
  if (language === 'en') quote.append(document.createElement('br'), document.createTextNode(`English translation: “${incoming.quoteTranslation}”`));
  sourceCard.append(sourceTitle, sourceMeta, receipt, quote);
  $('integration-document').replaceChildren(sourceCard);

  const decision = test.decision;
  const decisionCard = document.createElement('article'); decisionCard.className = 'claim integration-decision';
  const decisionTitle = document.createElement('h3');
  const badge = document.createElement('span'); badge.className = `risk-badge ${decision.level}`; badge.textContent = decision.label;
  decisionTitle.append(badge);
  const result = document.createElement('p'); result.className = 'claim-text'; result.textContent = decision.result;
  const deadline = document.createElement('p'); deadline.textContent = `${language === 'en' ? 'Legal deadline' : 'Zákonná lhůta'}: ${decision.deadline}.`;
  const checkpoint = document.createElement('p'); checkpoint.textContent = `${language === 'en' ? 'Monitoring checkpoint' : 'Kontrolní bod'}: ${decision.checkpoint}`;
  const why = document.createElement('p'); why.textContent = decision.why;
  const guard = document.createElement('p'); guard.className = 'evidence-note'; guard.textContent = `${language === 'en' ? 'Error prevented' : 'Zachycená chyba'}: ${decision.errorGuard}`;
  decisionCard.append(decisionTitle, result, deadline, checkpoint, why, guard);
  $('integration-decision').replaceChildren(decisionCard);

  renderList('integration-proves', test.proves);
  renderList('integration-limits', test.doesNotProve);
  renderList('integration-human-checks', test.humanChecks);

  $('integration-propagation-title').textContent = test.propagationCheck.title;
  $('integration-propagation-rule').textContent = test.propagationCheck.rule;
  const propagation = $('integration-propagation');
  propagation.replaceChildren(); propagation.className = 'relevance-grid';
  for (const item of test.propagationCheck.checks) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h4');
    const marker = document.createElement('span'); marker.className = `risk-badge ${item.level}`; marker.textContent = item.question;
    title.append(marker);
    const result = document.createElement('p'); result.textContent = item.result;
    card.append(title, result); propagation.append(card);
  }

  const integrity = test.draftIntegrityWarning;
  $('integration-integrity-title').textContent = integrity.title;
  $('integration-integrity-summary').textContent = integrity.summary;
  const integrityFindings = $('integration-integrity-findings');
  integrityFindings.replaceChildren(); integrityFindings.className = 'draft-grid';
  for (const item of integrity.findings) {
    const card = document.createElement('article'); card.className = 'claim draft-impact';
    const title = document.createElement('h4'); title.textContent = item.document;
    const detected = document.createElement('p'); detected.textContent = `${language === 'en' ? 'Detected' : 'Zjištěno'}: ${item.detected}`;
    const correction = document.createElement('p'); correction.className = 'evidence-note'; correction.textContent = `${language === 'en' ? 'Correction' : 'Oprava'}: ${item.correction}`;
    card.append(title, detected, correction); integrityFindings.append(card);
  }
  $('integration-integrity-rule').textContent = integrity.rule;

  const legend = $('integration-legend');
  legend.replaceChildren();
  const legendList = document.createElement('ul');
  for (const item of test.relevanceLegend) {
    const entry = document.createElement('li');
    const marker = document.createElement('span'); marker.className = `risk-badge ${item.level}`; marker.textContent = item.label;
    entry.append(marker, document.createTextNode(` — ${item.meaning}`)); legendList.append(entry);
  }
  legend.append(legendList);

  const drafts = $('integration-drafts');
  drafts.replaceChildren(); drafts.className = 'draft-grid';
  for (const item of test.internalDrafts) {
    const card = document.createElement('article'); card.className = 'claim draft-impact';
    const title = document.createElement('h4');
    const marker = document.createElement('span'); marker.className = `risk-badge ${item.level}`; marker.textContent = item.decision;
    title.append(marker, document.createElement('br'), document.createTextNode(item.document));
    const why = document.createElement('p'); why.textContent = `${language === 'en' ? 'Why' : 'Proč'}: ${item.why}`;
    const locations = document.createElement('p'); locations.className = 'evidence-note'; locations.textContent = `${language === 'en' ? 'Insert in' : 'Vložit do'}: ${item.locations}.`;
    const proposedTitle = document.createElement('strong'); proposedTitle.textContent = language === 'en' ? 'Proposed wording:' : 'Navržené znění:';
    const proposed = document.createElement('blockquote'); proposed.textContent = item.proposedText;
    card.append(title, why, locations, proposedTitle, proposed); drafts.append(card);
  }

  const relevance = $('integration-relevance');
  relevance.replaceChildren(); relevance.className = 'relevance-grid';
  for (const item of test.relevance) {
    const card = document.createElement('article'); card.className = `claim relevance-${item.level}`;
    const title = document.createElement('h4');
    const marker = document.createElement('span');
    marker.className = `risk-badge ${item.level === 'direct' ? 'critical' : item.level === 'none' ? 'verified' : 'review'}`;
    marker.textContent = item.label;
    title.append(marker, document.createElement('br'), document.createTextNode(item.targets));
    const reason = document.createElement('p'); reason.textContent = item.reason;
    const action = document.createElement('p'); action.className = 'evidence-note'; action.textContent = `${language === 'en' ? 'Action' : 'Postup'}: ${item.action}`;
    card.append(title, reason, action); relevance.append(card);
  }
  $('integration-test').hidden = false;
}

function renderExactPdfUpdate(test, inputKind) {
  $('prototype-laboratory').open = true;
  $('generic-result').hidden = true;
  $('organisation-title').textContent = test.title;
  const isPublicDerivative = inputKind?.includes('public');
  const recognition = isPublicDerivative
    ? UI.publicDerivative
    : (test.source.recognition ?? UI.privateOriginal);
  $('organisation-scope').textContent = `${recognition} ${test.source.privacy}`;
  const priority = $('organisation-priority');
  priority.replaceChildren();
  appendPriorityBadges(priority, test);

  const systemic = $('organisation-systemic-finding');
  systemic.replaceChildren();
  if (test.systemicFinding) {
    const card = document.createElement('article');
    card.className = 'claim systemic-finding';
    const label = document.createElement('p');
    label.className = 'eyebrow';
    label.textContent = test.systemicFinding.label;
    const headline = document.createElement('h3');
    headline.textContent = test.systemicFinding.headline;
    const explanation = document.createElement('p');
    explanation.className = 'claim-text';
    explanation.textContent = test.systemicFinding.explanation;
    const limitation = document.createElement('p');
    limitation.className = 'evidence-note';
    limitation.textContent = test.systemicFinding.limitation;
    card.append(label, headline, explanation, limitation);
    for (const value of test.systemicFinding.citations) {
      const citation = document.createElement('blockquote');
      citation.textContent = `„${value}“`;
      card.append(citation);
    }
    systemic.append(card);
  }

  const sourceCard = document.createElement('article');
  sourceCard.className = 'claim organisation-source';
  const sourceTitle = document.createElement('h3');
  sourceTitle.textContent = [test.source.institution, test.source.documentDate, test.source.reference]
    .filter(Boolean)
    .join(' · ');
  const sourceStatus = document.createElement('p');
  sourceStatus.textContent = test.source.status ?? (language === 'en'
    ? 'Source-bounded court-order extract; the original PDF is neither uploaded nor published.'
    : 'Zdrojově omezený výtah soudního usnesení; původní PDF se neodesílá ani nezveřejňuje.');
  sourceCard.append(sourceTitle, sourceStatus);
  if (test.deadline) {
    const deadline = document.createElement('div');
    deadline.className = 'document-deadline deadline-not-stated';
    const label = document.createElement('strong');
    label.textContent = test.deadline.label;
    const value = document.createElement('span');
    value.textContent = test.deadline.value;
    const explanation = document.createElement('small');
    explanation.textContent = test.deadline.explanation;
    deadline.append(label, value, explanation);
    sourceCard.append(deadline);
  }
  if (test.source.publicFile) {
    const sourceLink = document.createElement('a');
    sourceLink.href = test.source.publicFile;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener';
    sourceLink.textContent = test.source.publicLinkLabel
      ?? (language === 'en' ? 'Open the anonymized public extract' : 'Otevřít anonymizovaný veřejný výtah');
    sourceCard.append(sourceLink);
  }
  $('organisation-source-card').replaceChildren(sourceCard);

  const comparison = $('organisation-comparison');
  comparison.replaceChildren();
  comparison.className = 'comparison-grid';
  for (const item of [test.comparison.before, test.comparison.after]) {
    const card = document.createElement('article');
    card.className = 'claim comparison-card';
    const title = document.createElement('h3');
    const marker = document.createElement('span');
    marker.className = `risk-badge ${item === test.comparison.before ? 'pending' : 'verified'}`;
    marker.textContent = item.label;
    title.append(marker, document.createElement('br'), document.createTextNode(item.title));
    const state = document.createElement('p');
    state.textContent = item.state;
    card.append(title, state);
    comparison.append(card);
  }
  renderList('organisation-solution', test.comparison.solution);

  renderStatements('organisation-facts', test.facts);

  const creatorRecord = $('organisation-creator-record');
  const creatorChronology = $('organisation-creator-chronology');
  creatorChronology.replaceChildren();
  if (test.creatorChronology) {
    const card = document.createElement('article');
    card.className = 'claim creator-chronology';
    const label = document.createElement('p');
    label.className = 'eyebrow';
    label.textContent = test.creatorChronology.label;
    const statement = document.createElement('p');
    statement.className = 'claim-text';
    statement.textContent = test.creatorChronology.statement;
    const provenance = document.createElement('p');
    provenance.className = 'confidence';
    provenance.textContent = test.creatorChronology.provenance;
    const boundary = document.createElement('p');
    boundary.className = 'evidence-note';
    boundary.textContent = test.creatorChronology.boundary;
    card.append(label, statement, provenance, boundary);
    creatorChronology.append(card);
    creatorRecord.hidden = false;
  } else {
    creatorRecord.hidden = true;
  }

  const archiveCard = document.createElement('article');
  archiveCard.className = 'claim organisation-author';
  const archiveTitle = document.createElement('h4');
  archiveTitle.textContent = test.archiveOwnerStatement.label;
  const archiveValue = document.createElement('p');
  archiveValue.className = 'claim-text';
  archiveValue.textContent = test.archiveOwnerStatement.value;
  const archiveConfidence = document.createElement('p');
  archiveConfidence.className = 'confidence';
  archiveConfidence.textContent = `${UI.confidence}: ${test.archiveOwnerStatement.confidence}`;
  archiveCard.append(archiveTitle, archiveValue, archiveConfidence);
  $('organisation-author-statement').replaceChildren(archiveCard);

  renderGroundedOrPlain('organisation-limits', test.doesNotProve);
  renderGroundedOrPlain('organisation-human-checks', test.humanChecks);

  const relevance = $('organisation-relevance');
  relevance.replaceChildren();
  relevance.className = 'relevance-grid';
  for (const item of test.relevance) {
    const trafficBand = trafficBandFor(item);
    const trafficLevel = TRAFFIC_LEVEL_BY_ID.get(trafficBand);
    const card = document.createElement('article');
    card.className = `claim relevance-${item.level} traffic-border-${trafficBand}`;
    const title = document.createElement('h4');
    const marker = document.createElement('span');
    marker.className = `risk-badge traffic-${trafficBand}`;
    marker.textContent = `${trafficLevel.label} · ${item.label}`;
    title.append(marker, document.createElement('br'), document.createTextNode(item.targets));
    const reason = document.createElement('p');
    reason.textContent = item.reason;
    const action = document.createElement('p');
    action.className = 'evidence-note';
    action.textContent = `${language === 'en' ? 'Action' : 'Postup'}: ${item.action}`;
    card.append(title, reason, action);
    if (item.evidenceStatus) {
      const evidenceStatus = document.createElement('p');
      evidenceStatus.className = 'confidence';
      evidenceStatus.textContent = `${UI.evidenceStatus}: ${item.evidenceStatus}`;
      card.append(evidenceStatus);
    }
    if (item.citation) {
      const citation = document.createElement('blockquote');
      citation.textContent = `„${item.citation}“`;
      card.append(citation);
    }
    relevance.append(card);
  }

  $('organisation-result').hidden = false;
}

async function sha256Hex(bytes) {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, '0')).join('');
}

function renderMemory(memory) {
  $('memory-summary').textContent = `${memory.documents.length} ${UI.documents} · ${memory.branches.length} ${UI.branches} · ${memory.references.length} ${UI.references} · ${memory.dates.length} ${UI.dates}`;
  const target = $('branches');
  target.replaceChildren();
  for (const branch of memory.branches) {
    const card = document.createElement('article');
    card.className = 'branch';
    const heading = document.createElement('h3');
    heading.textContent = branch.label;
    const list = document.createElement('ul');
    for (const branchDocument of branch.documents) {
      const entry = document.createElement('li');
      entry.textContent = branchDocument.name;
      list.append(entry);
    }
    card.append(heading, list);
    target.append(card);
  }
  if (!memory.branches.length) target.textContent = UI.noBranch;

  const documents = $('memory-documents');
  documents.replaceChildren();
  for (const memoryDocument of memory.documents) {
    const card = documentCard(memoryDocument);
    documents.append(card);
  }

  renderTags('memory-references', memory.references, UI.noReference);
  renderTags('memory-dates', memory.dates, UI.noDate);

  const limitations = $('memory-limitations');
  limitations.replaceChildren();
  for (const limitation of memory.limitations) {
    const entry = document.createElement('li');
    entry.textContent = limitation;
    limitations.append(entry);
  }
  $('memory-out').hidden = false;
}

function formatBytes(value) {
  if (!Number.isFinite(value)) return language === 'en' ? 'not available' : 'neuvedeno';
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} kB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function appendGenericMetadata(target, label, value) {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = value;
  target.append(term, description);
}

function appendGenericGroup(target, title, items, className = '') {
  if (!items.length) return;
  const section = document.createElement('section');
  section.className = `generic-output-group ${className}`.trim();
  const heading = document.createElement('h4');
  heading.textContent = title;
  section.append(heading);
  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'generic-output-item';
    const value = document.createElement('strong');
    value.textContent = item.label ? [item.label, item.branch].filter(Boolean).join(' · ') : item.value;
    const confidence = document.createElement('small');
    confidence.textContent = item.confidence;
    const citation = document.createElement('blockquote');
    citation.textContent = `„${item.citation}“`;
    card.append(value, confidence, citation);
    section.append(card);
  }
  target.append(section);
}

function renderSharedCannabisEvidence(target, analysis) {
  if (!analysis.detected) return;
  const labels = language === 'en' ? {
    eyebrow: 'SHARED CANNABIS EVIDENCE LAYER',
    contribution: 'Candidate contribution from this person',
    signals: 'Why the document entered this layer',
    candidates: 'Source-linked facts and evidence candidates for human-reviewed working material',
    noCandidate: 'A cannabis-related legal conflict was detected, but no specific shared evidence axis was matched yet. Add the challenged decision, expert report, or the precise legal issue for comparison.',
    external: 'Exact signal in this person’s document',
    memory: 'Quotation from shared public memory',
    translation: 'English translation',
    source: 'Shared-memory source',
    proves: 'What this source may support',
    limitation: 'What it does not establish for this person',
    framework: 'Public evidence and case-law framework relevant to reopening review',
    routes: 'Requested or textually indicated working outputs',
    routeCitation: 'Text indicating this objective',
    required: 'Still required from this person’s own file',
    outline: 'Working outline for human review',
    routeBoundary: 'Route boundary',
    policy: 'Cross-case sharing rule',
    openSource: 'Open public source'
  } : {
    eyebrow: 'SDÍLENÁ KONOPNÁ DŮKAZNÍ VRSTVA',
    contribution: 'Kandidátní příspěvek tohoto člověka',
    signals: 'Proč dokument vstoupil do této vrstvy',
    candidates: 'Zdrojovaná fakta a důkazní kandidáti pro lidsky kontrolovaný pracovní podklad',
    noCandidate: 'Právní střet ve věci konopí byl rozpoznán, ale zatím nebyla nalezena konkrétní sdílená důkazní osa. Pro porovnání doplňte napadené rozhodnutí, znalecký posudek nebo přesnou právní otázku.',
    external: 'Přesný signál v dokumentu tohoto člověka',
    memory: 'Citace ze sdílené veřejné paměti',
    translation: 'Anglický překlad',
    source: 'Zdroj ve sdílené paměti',
    proves: 'Co může tento zdroj podpořit',
    limitation: 'Co pro tohoto člověka nedokládá',
    framework: 'Veřejný důkazní a judikatorní rámec relevantní pro kontrolu obnovy',
    routes: 'Požadované nebo textem naznačené pracovní výstupy',
    routeCitation: 'Text, který naznačil tento cíl',
    required: 'Co stále chybí z vlastního spisu tohoto člověka',
    outline: 'Pracovní osnova ke kontrole člověkem',
    routeBoundary: 'Hranice této cesty',
    policy: 'Pravidlo mezikauzálního sdílení',
    openSource: 'Otevřít veřejný zdroj'
  };

  const panel = document.createElement('section');
  panel.className = 'generic-cannabis-panel';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = labels.eyebrow;
  const title = document.createElement('h4');
  title.textContent = analysis.label;
  const meaning = document.createElement('p');
  meaning.className = 'system-meaning';
  meaning.textContent = analysis.meaning;
  const contribution = document.createElement('aside');
  contribution.className = 'shared-contribution-status';
  const contributionTitle = document.createElement('strong');
  contributionTitle.textContent = labels.contribution;
  const contributionStatus = document.createElement('span');
  contributionStatus.textContent = analysis.contributionCandidate.status;
  const contributionUse = document.createElement('p');
  contributionUse.textContent = analysis.contributionCandidate.use;
  contribution.append(contributionTitle, contributionStatus, contributionUse);
  panel.append(eyebrow, title, meaning, contribution);

  appendGenericGroup(
    panel,
    labels.signals,
    [...analysis.cannabisSignals, ...analysis.legalSignals, ...analysis.matchedTopics],
    'generic-cannabis-signals'
  );

  const candidatesTitle = document.createElement('h5');
  candidatesTitle.textContent = labels.candidates;
  panel.append(candidatesTitle);
  if (!analysis.sharedEvidenceCandidates.length) {
    const empty = document.createElement('p');
    empty.className = 'evidence-note';
    empty.textContent = labels.noCandidate;
    panel.append(empty);
  }
  for (const candidate of analysis.sharedEvidenceCandidates) {
    const entry = document.createElement('article');
    entry.className = 'shared-evidence-candidate';
    const heading = document.createElement('h6');
    heading.textContent = candidate.topic;
    const confidence = document.createElement('small');
    confidence.textContent = candidate.confidence;
    const claim = document.createElement('p');
    claim.className = 'claim-text';
    claim.textContent = candidate.claim;
    const externalLabel = document.createElement('strong');
    externalLabel.textContent = labels.external;
    const externalQuote = document.createElement('blockquote');
    externalQuote.textContent = `„${candidate.externalCitation}“`;
    const memoryLabel = document.createElement('strong');
    memoryLabel.textContent = labels.memory;
    const memoryQuote = document.createElement('blockquote');
    memoryQuote.lang = 'cs';
    memoryQuote.textContent = `„${candidate.memoryCitation}“`;
    entry.append(heading, confidence, claim, externalLabel, externalQuote, memoryLabel, memoryQuote);
    if (candidate.memoryCitationTranslation) {
      const translation = document.createElement('p');
      translation.className = 'translation';
      translation.textContent = `${labels.translation}: “${candidate.memoryCitationTranslation}”`;
      entry.append(translation);
    }
    const details = document.createElement('dl');
    details.className = 'shared-evidence-details';
    appendGenericMetadata(details, labels.source, candidate.memorySource);
    appendGenericMetadata(details, labels.proves, candidate.proves);
    appendGenericMetadata(details, labels.limitation, candidate.limitation);
    entry.append(details);
    panel.append(entry);
  }

  if (analysis.reopeningFramework.length) {
    const frameworkTitle = document.createElement('h5');
    frameworkTitle.textContent = labels.framework;
    const framework = document.createElement('div');
    framework.className = 'reopening-framework';
    for (const item of analysis.reopeningFramework) {
      const entry = document.createElement('article');
      const heading = document.createElement('strong');
      heading.textContent = `${item.court} · ${item.reference} · ${item.date}`;
      const principle = document.createElement('p');
      principle.textContent = item.principle;
      const relation = document.createElement('small');
      relation.textContent = `${item.relation} · ${item.confidence}`;
      const source = document.createElement('a');
      source.href = item.sourceUrl;
      source.target = '_blank';
      source.rel = 'noopener';
      source.textContent = labels.openSource;
      entry.append(heading, principle, relation, source);
      framework.append(entry);
    }
    panel.append(frameworkTitle, framework);
  }

  const routesTitle = document.createElement('h5');
  routesTitle.textContent = labels.routes;
  const routes = document.createElement('div');
  routes.className = 'remedy-route-grid';
  for (const route of analysis.remedyRoutes) {
    const routeCard = document.createElement('article');
    routeCard.className = `remedy-route-card remedy-route-${route.id}`;
    const routeTitle = document.createElement('h6');
    routeTitle.textContent = route.title;
    const routeBasis = document.createElement('small');
    routeBasis.className = 'remedy-route-basis';
    routeBasis.textContent = route.basisLabel;
    const routeMeaning = document.createElement('p');
    routeMeaning.textContent = route.meaning;
    routeCard.append(routeTitle, routeBasis);
    if (route.citation) {
      const citationLabel = document.createElement('strong');
      citationLabel.textContent = labels.routeCitation;
      const citation = document.createElement('blockquote');
      citation.textContent = `„${route.citation}“`;
      routeCard.append(citationLabel, citation);
    }
    const requiredTitle = document.createElement('strong');
    requiredTitle.textContent = labels.required;
    const required = document.createElement('ul');
    for (const value of route.requiredCaseSpecificItems) {
      const item = document.createElement('li');
      item.textContent = value;
      required.append(item);
    }
    const outlineTitle = document.createElement('strong');
    outlineTitle.textContent = labels.outline;
    const outline = document.createElement('ol');
    for (const value of route.draftOutline) {
      const item = document.createElement('li');
      item.textContent = value;
      outline.append(item);
    }
    const routeBoundary = document.createElement('p');
    routeBoundary.className = 'evidence-boundary compact-boundary';
    routeBoundary.textContent = `${labels.routeBoundary}: ${route.boundary}`;
    routeCard.append(routeMeaning, requiredTitle, required, outlineTitle, outline, routeBoundary);
    routes.append(routeCard);
  }
  panel.append(routesTitle, routes);
  const policyTitle = document.createElement('h5');
  policyTitle.textContent = labels.policy;
  const policy = document.createElement('p');
  policy.className = 'generic-sharing-policy';
  policy.textContent = analysis.sharingPolicy;
  const boundary = document.createElement('p');
  boundary.className = 'evidence-boundary compact-boundary';
  boundary.textContent = analysis.draftBoundary;
  panel.append(policyTitle, policy, boundary);
  target.append(panel);
}

function renderGenericIntake(batch) {
  const labels = language === 'en' ? {
    meta: 'LOCAL FILE METADATA', type: 'Indicative document type', extraction: 'Text extraction', format: 'Format', size: 'File size', pages: 'PDF pages read', chars: 'Readable characters', digest: 'SHA-256 fingerprint',
    relation: 'Comparison with the creator’s public memory and the shared cannabis evidence layer', dates: 'Detected dates', references: 'Detected case references', amounts: 'Detected amounts', institutions: 'Detected institutions', deadlines: 'Possible deadline expressions — not calculated deadlines', signals: 'Textual overlaps with the creator’s memory', steps: 'Proposed next step', boundary: 'Evidence boundary'
  } : {
    meta: 'MÍSTNÍ METADATA SOUBORU', type: 'Orientační typ dokumentu', extraction: 'Vytěžení textu', format: 'Formát', size: 'Velikost souboru', pages: 'Přečtené strany PDF', chars: 'Čitelných znaků', digest: 'Otisk SHA-256',
    relation: 'Porovnání s veřejnou pamětí autora a sdílenou konopnou důkazní vrstvou', dates: 'Rozpoznaná data', references: 'Rozpoznané spisové značky', amounts: 'Rozpoznané částky', institutions: 'Rozpoznané instituce', deadlines: 'Možné lhůtové výrazy — nikoli vypočtené lhůty', signals: 'Textové průniky s pamětí autora', steps: 'Navržený další krok', boundary: 'Důkazní hranice'
  };
  $('generic-result-summary').textContent = batch.summary;
  $('generic-result-boundary').textContent = `${labels.boundary}: ${batch.boundary}`;
  const target = $('generic-documents');
  target.replaceChildren();

  for (const item of batch.documents) {
    const card = document.createElement('article');
    const noMatch = item.relation.id === 'black-0';
    card.className = `generic-document-card traffic-border-${item.relation.id}`;
    const relationLabel = document.createElement('p');
    relationLabel.className = 'eyebrow';
    relationLabel.textContent = labels.relation;
    const relation = document.createElement('div');
    relation.className = `generic-relation ${noMatch ? 'generic-no-match' : 'generic-weak-match'}`;
    const dot = document.createElement('span');
    dot.className = `match-dot ${noMatch ? 'match-dot-black' : 'match-dot-green'}`;
    dot.setAttribute('aria-hidden', 'true');
    const score = document.createElement('strong');
    score.textContent = item.relation.label;
    const meaning = document.createElement('span');
    meaning.textContent = item.relation.meaning;
    relation.append(dot, score, meaning);
    const heading = document.createElement('h3');
    heading.textContent = item.name;

    const metadataLabel = document.createElement('p');
    metadataLabel.className = 'alliance-card-label';
    metadataLabel.textContent = labels.meta;
    const metadata = document.createElement('dl');
    metadata.className = 'generic-metadata';
    appendGenericMetadata(metadata, labels.format, item.kind.toUpperCase());
    appendGenericMetadata(metadata, labels.extraction, item.extractionLabel);
    appendGenericMetadata(metadata, labels.size, formatBytes(item.byteLength));
    if (Number.isFinite(item.extraction?.pageCount)) appendGenericMetadata(metadata, labels.pages, `${item.extraction.pagesRead}/${item.extraction.pageCount}`);
    appendGenericMetadata(metadata, labels.chars, String(item.characterCount));
    if (item.sha256) appendGenericMetadata(metadata, labels.digest, item.sha256);

    const kind = document.createElement('section');
    kind.className = 'generic-kind';
    const kindTitle = document.createElement('h4');
    kindTitle.textContent = labels.type;
    const kindValue = document.createElement('p');
    kindValue.textContent = `${item.documentKind.label} · ${item.documentKind.confidence}`;
    kind.append(kindTitle, kindValue);
    if (item.documentKind.citation) {
      const quote = document.createElement('blockquote');
      quote.textContent = `„${item.documentKind.citation}“`;
      kind.append(quote);
    }

    card.append(relationLabel, relation, heading, metadataLabel, metadata, kind);
    appendGenericGroup(card, labels.signals, item.memorySignals, 'generic-memory-signals');
    appendGenericGroup(card, labels.dates, item.dates);
    appendGenericGroup(card, labels.references, item.references);
    appendGenericGroup(card, labels.amounts, item.amounts);
    appendGenericGroup(card, labels.institutions, item.institutions);
    appendGenericGroup(card, labels.deadlines, item.deadlineSignals, 'generic-deadline-signals');
    renderSharedCannabisEvidence(card, item.cannabisLegalConflict);

    const stepsTitle = document.createElement('h4');
    stepsTitle.textContent = labels.steps;
    const steps = document.createElement('ol');
    for (const value of item.proposedSteps) {
      const entry = document.createElement('li');
      entry.textContent = value;
      steps.append(entry);
    }
    const privacy = document.createElement('p');
    privacy.className = 'generic-privacy';
    privacy.textContent = item.privacyNotice;
    const boundary = document.createElement('p');
    boundary.className = 'evidence-boundary compact-boundary';
    boundary.textContent = item.evidenceBoundary;
    card.append(stepsTitle, steps, privacy, boundary);
    target.append(card);
  }
  $('generic-result').hidden = false;
}

async function prepareGenericInput(documents) {
  return Promise.all(documents.map(async (entry) => {
    if (entry.kind === 'pdf') {
      const extraction = await extractPdfText(entry.bytes);
      return {
        name: entry.name,
        kind: 'pdf',
        text: extraction.text,
        byteLength: entry.bytes.byteLength,
        sha256: await sha256Hex(entry.bytes),
        extraction
      };
    }
    const bytes = new TextEncoder().encode(entry.text);
    return {
      name: entry.name,
      kind: 'text',
      text: entry.text,
      byteLength: bytes.byteLength,
      sha256: await sha256Hex(bytes),
      extraction: { status: 'text', code: null, pageCount: null, pagesRead: null, truncated: false }
    };
  }));
}

async function renderGenericFallback(documents) {
  showStatus(GENERIC_UI.reading, 'info');
  const prepared = await prepareGenericInput(documents);
  const requestedRemedy = $('requested-remedy').value;
  const routed = prepared.map((entry) => ({ ...entry, requestedRemedy }));
  const batch = analyzeGenericDocuments(routed, language);
  $('institutional-map').hidden = true;
  $('analysis-out').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  renderMemory(buildCaseMemory(prepared.filter(({ text: value }) => value), language));
  renderGenericIntake(batch);
  showStatus(`${GENERIC_UI.done} ${batch.summary}`, 'info');
  window.scrollTo({ top: $('generic-result').offsetTop, behavior: 'smooth' });
}

function renderInstitutionalMap(caseMap) {
  $('memory-out').hidden = true;
  $('analysis-out').hidden = true;
  $('case-map-title').textContent = caseMap.title;
  $('case-map-notice').textContent = caseMap.notice;

  const metrics = $('case-metrics');
  metrics.replaceChildren();
  for (const metric of caseMap.metrics) {
    const card = document.createElement('article');
    card.className = 'metric-card';
    const value = document.createElement('strong');
    value.textContent = metric.value;
    const label = document.createElement('span');
    label.textContent = metric.label;
    const status = document.createElement('small');
    status.textContent = `${UI.evidenceStatus}: ${metric.status === 'indexed' ? UI.indexed : UI.creatorStated}`;
    card.append(value, label, status);
    metrics.append(card);
  }

  const groups = $('case-groups');
  groups.replaceChildren();
  const nodeLabels = new Map();
  for (const group of caseMap.groups) {
    const lane = document.createElement('section');
    lane.className = `case-lane lane-${group.id}`;
    const heading = document.createElement('h3');
    heading.textContent = group.label;
    const grid = document.createElement('div');
    grid.className = 'case-node-grid';
    for (const caseNode of group.nodes) {
      nodeLabels.set(caseNode.id, caseNode.label);
      const card = document.createElement('article');
      card.className = 'case-node';
      const nodeHeading = document.createElement('h4');
      nodeHeading.textContent = caseNode.label;
      const detail = document.createElement('p');
      detail.textContent = caseNode.detail;
      card.append(nodeHeading, detail);
      grid.append(card);
    }
    lane.append(heading, grid);
    groups.append(lane);
  }

  $('case-relations-title').textContent = UI.relations;
  const relations = $('case-relations');
  relations.replaceChildren();
  for (const relation of caseMap.relations) {
    const entry = document.createElement('li');
    const from = document.createElement('strong');
    from.textContent = nodeLabels.get(relation.from);
    const to = document.createElement('strong');
    to.textContent = nodeLabels.get(relation.to);
    entry.append(from, document.createTextNode(' → '), to, document.createTextNode(` — ${relation.label}`));
    relations.append(entry);
  }

  $('case-timeline-title').textContent = UI.timeline;
  const timeline = $('case-timeline');
  timeline.replaceChildren();
  for (const event of caseMap.timeline) {
    const entry = document.createElement('li');
    const year = document.createElement('strong');
    year.textContent = event.year;
    entry.append(year, document.createTextNode(` — ${event.label}`));
    timeline.append(entry);
  }
  $('institutional-map').hidden = false;
}

function documentCard(record) {
  const card = document.createElement('article');
  card.className = 'document-card';
  const heading = document.createElement('h3');
  heading.textContent = record.name;
  const details = document.createElement('p');
  const parts = [];
  if (record.references.length) parts.push(`${record.references.length} ${UI.documentReferences}`);
  if (record.dates.length) parts.push(`${record.dates.length} ${UI.documentDates}`);
  details.textContent = parts.join(' · ') || UI.noMetadata;
  card.append(heading, details);
  return card;
}

function renderTags(targetId, values, emptyText) {
  const target = $(targetId);
  target.replaceChildren();
  if (!values.length) {
    target.textContent = emptyText;
    return;
  }
  for (const value of values) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = value;
    target.append(tag);
  }
}

function renderRegistry() {
  for (const record of PUBLIC_MEMORY.verifiedStatements) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = `${record.date} · ${record.reference} · ${record.institution}`;
    const text = document.createElement('p'); text.textContent = record.statement;
    const relation = document.createElement('p'); relation.textContent = `${language === 'en' ? 'Link' : 'Vazba'}: ${record.branch}. ${record.proves} ${record.doesNotProve}`;
    const citation = document.createElement('blockquote'); citation.textContent = `„${record.originalCitation ?? record.citation}“`;
    if (language === 'en' && record.citationTranslation) citation.append(document.createElement('br'), document.createTextNode(`English translation: “${record.citationTranslation}”`));
    card.append(title, text, relation, citation); $('registry-statements').append(card);
  }
  for (const node of PUBLIC_MEMORY.pendingNodes) {
    const item = document.createElement('li'); item.textContent = `${node.reference} — ${node.relation} ${language === 'en' ? 'Status' : 'Stav'}: ${node.verification}.`;
    $('registry-pending').append(item);
  }
  for (const decision of PUBLIC_MEMORY.jurisprudence) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); const link = document.createElement('a');
    link.href = decision.sourceUrl; link.target = '_blank'; link.rel = 'noreferrer';
    link.textContent = `${decision.court} · ${decision.reference} · ${decision.date}`; title.append(link);
    const principle = document.createElement('p'); principle.textContent = decision.principle;
    const relation = document.createElement('p'); relation.className = 'confidence'; relation.textContent = `${language === 'en' ? 'Link' : 'Vazba'}: ${decision.relation}`;
    card.append(title, principle, relation); $('registry-cases').append(card);
  }
  const caseStudy = PUBLIC_MEMORY.caseStudy;
  $('case-study-name').textContent = caseStudy.name;
  $('case-study-intro').textContent = `${caseStudy.person} — ${caseStudy.role}. ${caseStudy.evidenceRule}`;
  const trafficLight = $('case-study-traffic-light');
  const trafficNotice = document.createElement('p'); trafficNotice.className = 'evidence-note'; trafficNotice.textContent = caseStudy.trafficLightRule;
  const trafficLegend = document.createElement('ul');
  for (const item of caseStudy.trafficLightLegend) { const li = document.createElement('li'); const badge = document.createElement('span'); badge.className = `risk-badge ${item.level}`; badge.textContent = item.label; li.append(badge, document.createTextNode(` — ${item.meaning}`)); trafficLegend.append(li); }
  trafficLight.append(trafficNotice, trafficLegend);
  const axes = $('case-study-axes');
  axes.className = 'map-grid';
  for (const axis of caseStudy.publicEvidenceAxes) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = axis.title;
    const fact = document.createElement('p'); fact.textContent = axis.fact;
    const citation = document.createElement('blockquote'); citation.textContent = `„${axis.originalCitation ?? axis.citation}“ — ${axis.source}`;
    if (language === 'en' && axis.citationTranslation) citation.append(document.createElement('br'), document.createTextNode(`English translation: “${axis.citationTranslation}”`));
    if (axis.sourceUrl) {
      const link = document.createElement('a'); link.href = axis.sourceUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = language === 'en' ? 'Open public source' : 'Otevřít veřejný zdroj'; citation.append(document.createElement('br'), link);
    }
    const interpretation = document.createElement('p'); interpretation.textContent = `${language === 'en' ? 'Interpretation' : 'Právní význam'}: ${axis.interpretation}`;
    const uncertainty = document.createElement('p'); uncertainty.className = 'evidence-note'; uncertainty.textContent = `${language === 'en' ? 'Limit' : 'Mez tvrzení'}: ${axis.uncertainty}`;
    card.append(title, fact, citation, interpretation, uncertainty); axes.append(card);
  }
  const map = $('case-study-map');
  map.className = 'map-grid';
  for (const metric of caseStudy.mapSummary.metrics) {
    const card = document.createElement('article'); card.className = 'claim metric';
    const value = document.createElement('strong'); value.textContent = metric.value;
    const label = document.createElement('p'); label.textContent = language === 'en' ? metric.labelEn : metric.label;
    const citation = document.createElement('blockquote'); citation.textContent = `„${metric.citation}“`;
    if (language === 'en' && metric.citationTranslation) citation.append(document.createElement('br'), document.createTextNode(`English translation: “${metric.citationTranslation}”`));
    const note = document.createElement('p'); note.className = 'evidence-note'; note.textContent = language === 'en' ? metric.noteEn : metric.note;
    card.append(value, label, citation, note); map.append(card);
  }
  const active = $('case-study-active');
  active.className = 'map-grid';
  for (const branch of caseStudy.activeCourtBranches) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = `${branch.type} · ${branch.defendant}`;
    const risk = document.createElement('p'); const riskBadge = document.createElement('span'); const isIntervention = branch.isIntervention ?? branch.type === 'zásahová žaloba'; riskBadge.className = `risk-badge ${isIntervention ? 'critical' : 'review'}`; riskBadge.textContent = isIntervention ? UI.red : UI.amber; risk.append(riskBadge, document.createTextNode(` — ${isIntervention ? UI.urgent : UI.review}`));
    const reference = document.createElement('p'); reference.textContent = `${branch.court} · ${branch.reference}`;
    const relation = document.createElement('p'); relation.textContent = `${UI.link}: ${branch.relation}`;
    const citation = document.createElement('blockquote'); citation.textContent = `„${branch.citation}“ — ${branch.source}`;
    const evidenceTitle = document.createElement('strong'); evidenceTitle.textContent = language === 'en' ? 'Submitted and related materials:' : 'Předložené a související podklady:';
    const evidence = document.createElement('ul');
    for (const item of branch.evidence ?? []) { const li = document.createElement('li'); li.textContent = item; evidence.append(li); }
    const status = document.createElement('p'); status.className = 'evidence-note'; status.textContent = branch.verification;
    card.append(title, risk, reference, relation, citation, evidenceTitle, evidence, status); active.append(card);
  }
  const referralTree = $('case-study-referrals');
  const referralNotice = document.createElement('p'); referralNotice.className = 'evidence-note'; referralNotice.textContent = caseStudy.currentReferralTree.notice; referralTree.append(referralNotice);
  for (const node of caseStudy.currentReferralTree.nodes) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = `${node.date} · ${node.institution}`;
    const status = document.createElement('p'); status.textContent = `${node.status} · ${node.reference}`;
    if (node.received) status.textContent += ` · ${language === 'en' ? 'received' : 'doručeno'} ${node.received}`;
    const citation = document.createElement('blockquote'); citation.textContent = `„${node.originalCitation ?? node.citation}“ — ${node.source}`;
    if (language === 'en' && node.citationTranslation) citation.append(document.createElement('br'), document.createTextNode(`English translation: “${node.citationTranslation}”`));
    const audit = document.createElement('p'); audit.className = 'evidence-note'; audit.textContent = `${UI.audit}: ${node.audit}`;
    card.append(title, status, citation, audit); referralTree.append(card);
  }
  for (const node of caseStudy.timeline) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3');
    if (node.phase) {
      const marker = document.createElement('span');
      marker.className = `risk-badge ${node.phase === 'before' ? 'pending' : 'verified'}`;
      marker.textContent = UI[node.phase];
      title.append(marker, document.createElement('br'));
    }
    title.append(document.createTextNode(`${node.date} · ${node.actor} · ${node.reference}`));
    const text = document.createElement('p'); text.textContent = node.statement;
    const relation = document.createElement('p'); relation.textContent = `${UI.link}: ${node.relation}`;
    const change = document.createElement('p'); change.className = 'evidence-note';
    if (node.change) change.textContent = `${UI.systemChange}: ${node.change}`;
    const source = document.createElement('blockquote'); source.textContent = `${node.level} — ${UI.source}: ${node.source}, ${UI.page} ${node.page}.`;
    card.append(title, text, relation);
    if (node.change) card.append(change);
    card.append(source); $('case-study-timeline').append(card);
  }
  for (const conflict of caseStudy.candidateContradictions) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = conflict.title;
    const earlier = document.createElement('p'); earlier.textContent = `${UI.earlier}: ${conflict.earlier}`;
    const intermediate = document.createElement('p'); intermediate.textContent = conflict.intermediate ? `${UI.intermediate}: ${conflict.intermediate}` : '';
    const later = document.createElement('p'); later.textContent = `${UI.later}: ${conflict.later}`;
    const status = document.createElement('blockquote'); status.textContent = conflict.status;
    card.append(title, earlier); if (conflict.intermediate) card.append(intermediate); card.append(later, status); $('case-study-conflicts').append(card);
  }
}

const evidenceDocument = $('evidence-document');
$('registry').before(evidenceDocument);
renderVersion2Dashboard();
renderAllianceUpdate();
renderPrisonerReopeningUpdate();
renderRegistry();

function revealEvidenceNetwork() {
  $('registry').hidden = false;
  $('case-study').hidden = false;
}
async function selectedDocuments() {
  const files = [...$('files').files];
  if (files.length) return Promise.all(files.map(async (file) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (isPdf) return { name: file.name, kind: 'pdf', bytes: await file.arrayBuffer() };
    return { name: file.name, kind: 'text', text: await file.text() };
  }));
  if (preparedDocuments.length) return preparedDocuments;
  return $('doc').value.trim() ? [{ name: UI.pasted, kind: 'text', text: $('doc').value }] : [];
}

$('load').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
  $('files').value = '';
  $('doc').value = SAMPLE_DOCUMENT;
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
  $('status').hidden = true;
});

$('load-organisation-sample').addEventListener('click', () => {
  void (async () => {
    const response = await fetch(ORGANISATION_TEST.source.publicFile);
    if (!response.ok) return reject({ reason: language === 'en' ? 'The anonymized sample could not be loaded.' : 'Anonymizovanou ukázku se nepodařilo načíst.' });
    preparedDocuments = [{
      name: 'organisation-change-anonymized-2026-07-13.pdf',
      kind: 'pdf',
      bytes: await response.arrayBuffer()
    }];
    preparedInstitutionalMap = false;
    $('files').value = '';
    $('doc').value = '';
    $('integration-test').hidden = true;
    $('organisation-result').hidden = true;
    $('priority-queue-section').hidden = true;
    $('generic-result').hidden = true;
    showStatus(UI.organisationLoaded, 'info');
  })();
});

async function preparePoliceSample() {
  const response = await fetch(POLICE_TEST.source.publicFile);
  if (!response.ok) {
    reject({ reason: language === 'en' ? 'The reviewed police sample could not be loaded.' : 'Veřejnou policejní ukázku se nepodařilo načíst.' });
    return false;
  }
  preparedDocuments = [{
    name: 'police-notice-public-derivative-2026-07-20.pdf',
    kind: 'pdf',
    bytes: await response.arrayBuffer()
  }];
  preparedInstitutionalMap = false;
  $('files').value = '';
  $('doc').value = '';
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
  return true;
}

$('load-police-sample').addEventListener('click', () => {
  void (async () => {
    if (await preparePoliceSample()) showStatus(UI.policeLoaded, 'info');
  })();
});

$('show-latest-update').addEventListener('click', () => {
  void (async () => {
    if (!(await preparePoliceSample())) return;
    const digest = await sha256Hex(preparedDocuments[0].bytes);
    const inputKind = identifyPoliceUpdateDigest(digest);
    if (!inputKind) return reject({ reason: UI.unknownPdf });
    const recognized = [{ name: preparedDocuments[0].name, inputKind, test: POLICE_TEST }];
    $('institutional-map').hidden = true;
    $('memory-out').hidden = true;
    $('analysis-out').hidden = true;
    renderPriorityQueue(recognized);
    renderExactPdfUpdate(POLICE_TEST, inputKind);
    showStatus(UI.policeRecognized, 'info');
    window.scrollTo({ top: $('organisation-result').offsetTop, behavior: 'smooth' });
  })();
});

$('load-case').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = true;
  $('files').value = '';
  $('doc').value = '';
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
  showStatus(UI.demoLoaded, 'info');
});

$('run-internal-test').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('files').value = '';
  $('doc').value = '';
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
  revealEvidenceNetwork();
  renderInstitutionalMap(localizeInstitutionalCaseMap(language));
  renderInternalArchiveTest(INTERNAL_TEST);
  showStatus(language === 'en'
    ? 'Internal test completed: no statutory response deadline was identified; a voluntary monitoring checkpoint was created and the decision graph was updated.'
    : 'Interní test dokončen: nebyla zjištěna zákonná lhůta k reakci; vznikl dobrovolný kontrolní bod a pavouk byl aktualizován.', 'info');
  window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
});

$('files').addEventListener('change', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
});

$('doc').addEventListener('input', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
  $('priority-queue-section').hidden = true;
  $('generic-result').hidden = true;
});

$('requested-remedy').addEventListener('change', () => {
  $('generic-result').hidden = true;
  $('status').hidden = true;
});

$('open-external-test').addEventListener('click', () => {
  $('prototype-laboratory').open = true;
});

$('analyse').addEventListener('click', () => {
  void (async () => {
    if (preparedInstitutionalMap) {
      revealEvidenceNetwork();
      renderInstitutionalMap(localizeInstitutionalCaseMap(language));
      showStatus(UI.mapCreated, 'info');
      window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
      return;
    }
    const documents = await selectedDocuments();
    if (!documents.length) return reject({ reason: UI.empty });
    $('generic-result').hidden = true;
    const pdfDocuments = documents.filter((item) => item.kind === 'pdf');
    if (pdfDocuments.length) {
      if (documents.length === pdfDocuments.length) {
        const recognized = await Promise.all(pdfDocuments.map(async (pdfDocument) => {
          const digest = await sha256Hex(pdfDocument.bytes);
          const organisationInputKind = identifyOrganisationUpdateDigest(digest);
          const policeInputKind = identifyPoliceUpdateDigest(digest);
          const allianceEvidenceId = identifyAllianceUpdateDigest(digest);
          const prisonerInputKind = identifyPrisonerReopeningDigest(digest);
          const inputKind = organisationInputKind ?? policeInputKind ?? (allianceEvidenceId ? `alliance-${allianceEvidenceId}` : null) ?? (prisonerInputKind ? `prisoner-${prisonerInputKind}` : null);
          return {
            name: pdfDocument.name,
            inputKind,
            allianceEvidenceId,
            prisonerInputKind,
            test: prisonerInputKind ? PRISONER_TEST : policeInputKind ? POLICE_TEST : organisationInputKind ? ORGANISATION_TEST : null
          };
        }));
        if (recognized.every(({ inputKind }) => inputKind)) {
          $('institutional-map').hidden = true;
          $('memory-out').hidden = true;
          $('analysis-out').hidden = true;
          const allianceEntries = recognized.filter(({ allianceEvidenceId }) => allianceEvidenceId);
          const prisonerEntries = recognized.filter(({ prisonerInputKind }) => prisonerInputKind);
          if (prisonerEntries.length === recognized.length) {
            renderPrisonerReopeningUpdate();
            const target = $('prisoner-reopening-update');
            target.classList.add('recognized-evidence');
            showStatus(UI.prisonerRecognized, 'info');
            window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            return;
          }
          if (allianceEntries.length === recognized.length) {
            renderAllianceUpdate();
            const target = highlightAllianceEvidence(allianceEntries.map(({ allianceEvidenceId }) => allianceEvidenceId));
            showStatus(UI.allianceRecognized, 'info');
            window.scrollTo({ top: (target ?? $('alliance-update')).offsetTop, behavior: 'smooth' });
            return;
          }
          if (!allianceEntries.length && !prisonerEntries.length) {
            const sorted = renderPriorityQueue(recognized);
            renderExactPdfUpdate(sorted[0].test, sorted[0].inputKind);
            const containsPolice = recognized.some(({ test }) => test === POLICE_TEST);
            showStatus(containsPolice ? UI.policeRecognized : (language === 'en'
              ? 'Supported PDF recognized locally. Personal data remain in the private original; only the anonymized, source-bounded result is displayed.'
              : 'Podporované PDF bylo rozpoznáno lokálně. Osobní údaje zůstávají v soukromém originálu; zobrazuje se jen anonymizovaný, zdrojově omezený výsledek.'), 'info');
            window.scrollTo({ top: $('organisation-result').offsetTop, behavior: 'smooth' });
            return;
          }
        }
      }
      await renderGenericFallback(documents);
      return;
    }
    const result = analyzeDocumentSet(documents, language);
    if (!result.supported) {
      await renderGenericFallback(documents);
      return;
    }
    revealEvidenceNetwork();
    renderMemory(buildCaseMemory(documents, language));
    showStatus(result.prototypeNotice);
    for (const group of ['facts', 'interpretation', 'uncertainty', 'actions']) renderStatements(group, result[group]);
    $('analysis-out').hidden = false;
    window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
  })();
});
