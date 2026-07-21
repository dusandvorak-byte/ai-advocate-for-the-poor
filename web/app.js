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
import { identifyMkJkReopeningDigest, localizeMkJkReopeningUpdate } from './mk-jk-reopening-update.js';
import { identifyCaseBundleDigest, localizeGfJkProceduralUpdate } from './gf-jk-procedural-update.js';
import { identifyPragueThcDigest, localizePragueThcUpdate } from './prague-thc-remand-update.js';
import { identifyDdLiveV3Digest, localizeDdLiveV3Update } from './dd-live-v3-update.js';
import { localizeCasePortfolio } from './case-portfolio.js';
import { localizeCzechPilotV3 } from './czech-pilot-v3.js';
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
const MK_JK_TEST = localizeMkJkReopeningUpdate(language);
const GF_JK_TEST = localizeGfJkProceduralUpdate(language);
const CASE_PORTFOLIO = localizeCasePortfolio(language);
const CZECH_PILOT = localizeCzechPilotV3(language);
const DD_LIVE_V3 = localizeDdLiveV3Update(language);
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
    indexed: 'indexováno v projektových podkladech', creatorStated: 'tvrzení autora — připojit anonymizovaný pramen', relations: 'Vazby mezi institucemi', timeline: 'Časová osa', evidenceStatus: 'Stav zdroje', link: 'Vazba', status: 'Stav', source: 'Zdroj', page: 'str.', audit: 'Audit', earlier: 'Dřívější výrok', intermediate: 'Mezilehlý výrok', later: 'Pozdější výrok', red: 'červená', amber: 'oranžová', before: 'PŘED TESTEM', after: 'PO TESTU', systemChange: 'Změna vytvořená systémem', urgent: 'bezodkladná lidská kontrola kvůli tvrzené naléhavosti a možným nevratným dopadům; výsledek řízení se nepředjímá', review: 'probíhající související větev vyžadující kontrolu úplného spisu', unknownPdf: 'Nejméně jedno PDF není přesně podporovaná listina. Prototyp nic neodeslal a na žádný soubor nepřenesl připravenou analýzu.', onePdfOnly: 'V režimu PDF vyberte pouze jeden nebo více přesně podporovaných PDF bez textových příloh.', organisationLoaded: 'Veřejná anonymizovaná kopie PDF byla načtena lokálně. Klikněte na „Analyzovat lokálně“.', policeLoaded: 'Veřejná odvozená kopie policejního sdělení byla načtena lokálně. Jméno Dušana Dvořáka zůstává zachováno; adresa a podpisová data jsou odstraněna. Klikněte na „Analyzovat lokálně“.', privateOriginal: 'soukromý originál rozpoznán přesným digitálním otiskem; veřejně se zobrazí pouze zkontrolovaný výstup', publicDerivative: 'veřejná odvozená kopie rozpoznána přesným digitálním otiskem', policeRecognized: 'Následný test dokončen: přesné policejní PDF bylo rozpoznáno lokálně. Jméno Dušana Dvořáka zůstává veřejné; adresa a podpisová data se nezveřejňují. Zobrazuje se zdrojově omezený výstup před/po, devět červených vazeb a návrh pro lidskou kontrolu.', allianceRecognized: 'Přesná zkontrolovaná listina byla rozpoznána lokálně. Soubor se nikam neodeslal; stránka zvýraznila odpovídající zdrojově omezený záznam v živé paměti.', prisonerRecognized: 'Přesný soukromý návrh L. CH. byl rozpoznán pouze digitálním otiskem. Soubor se nikam neodeslal; stránka ukazuje anonymizované porovnání s pamětí k 20. 7. 2026. Hodnocení 9/9 znamená relevanci, nikoli šanci na úspěch.', mkJkRecognized: 'Přesná zkontrolovaná listina M. K. a J. K. byla rozpoznána pouze digitálním otiskem. Nic se neodeslalo; stránka ukazuje anonymizované posouzení a odděluje procesní stav od společné relevance 9/9.', gfJkRecognized: 'Přesná zkontrolovaná listina ze smíšeného balíku byla rozpoznána pouze digitálním otiskem. Nic se neodeslalo; systém ji zařadil do oddělené osobní nebo institucionální větve a nepřenesl závěr jiné osoby. Společný nový důkaz má relevanci 9/9.', pragueThcRecognized: 'Nový přímý soudní důkaz byl rozpoznán lokálně. Vrchní soud zrušil odsuzující rozsudek a výslovně popsal problém rozlišení legálního a zakázaného konopí. Soubor se neodeslal ani nezveřejnil; zobrazuje se pouze zdrojově omezený výstup 9/9.', ddLiveRecognized: 'Přesná dnešní listina autora byla rozpoznána lokálně a zařazena do živé mapy. Soubor se nikam neodeslal; zobrazuje se, zda jde o duplicitu, nový úřední uzel nebo nově doložený prvotní zdroj.', redLinks: 'červených vazeb', amberLinks: 'oranžových vazeb', greenLinks: 'zelených vazeb', openResult: 'Zobrazit úplný výsledek', priorityRule: 'Pořadí určuje nejvyšší dosažený stupeň semaforu, potom počet červených a oranžových vazeb, jejich souhrnná váha a datum listiny. Semafor vyjadřuje relevanci a potřebu lidské reakce; sám neprokazuje pochybení ani výsledek řízení.', deadline: 'Lhůta', peakPriority: 'Nejvyšší priorita', substantiveAnswers: 'věcných odpovědí v listině'
  },
  en: {
    confidence: 'Confidence', documents: 'documents', branches: 'identified branches', references: 'case references', dates: 'dates',
    noBranch: 'No supported branch has been identified yet.', noReference: 'No case reference was identified.', noDate: 'No date was identified.',
    documentReferences: 'case references', documentDates: 'dates', noMetadata: 'No identified case references or dates', pasted: 'Pasted document',
    empty: 'Paste text or select text files first.', demoLoaded: 'The anonymized 2004–2026 institutional case map is loaded. Click “Create case map”.', mapCreated: 'The case map was created.',
    indexed: 'indexed in project materials', creatorStated: 'creator-stated — attach anonymized source', relations: 'Institutional relationships', timeline: 'Timeline', evidenceStatus: 'Source status', link: 'Link', status: 'Status', source: 'Source', page: 'p.', audit: 'Audit', earlier: 'Earlier statement', intermediate: 'Intermediate statement', later: 'Later statement', red: 'red', amber: 'amber', before: 'BEFORE THE TEST', after: 'AFTER THE TEST', systemChange: 'System-generated change', urgent: 'immediate human review because of alleged urgency and potentially irreversible effects; the outcome is not prejudged', review: 'an active related branch requiring review of the complete file', unknownPdf: 'At least one PDF is not an exactly supported document. The prototype uploaded nothing and transferred no prepared analysis to any file.', onePdfOnly: 'In PDF mode, select only one or more exactly supported PDFs without text attachments.', organisationLoaded: 'The public anonymized PDF copy was loaded locally. Click “Analyze locally”.', policeLoaded: 'The reviewed public derivative of the police notice was loaded locally. Dušan Dvořák’s name remains visible; the address and signature data have been removed. Click “Analyze locally”.', privateOriginal: 'private original recognized by its exact digital fingerprint; only the reviewed output is displayed publicly', publicDerivative: 'reviewed public derivative recognized by its exact digital fingerprint', policeRecognized: 'Post-submission test completed: the exact police PDF was recognized locally. Dušan Dvořák’s name remains public; the address and signature data are not published. The page displays a source-bounded before/after result, nine red links, and a proposal for human review.', allianceRecognized: 'The exact reviewed document was recognized locally. The file was not uploaded; the page highlighted the corresponding source-bounded record in the living memory.', prisonerRecognized: 'The exact private L. CH. motion was recognized only by its digital fingerprint. The file was not uploaded; the page shows the anonymized comparison with the memory as of 20 July 2026. The 9/9 score means relevance, not likelihood of success.', mkJkRecognized: 'An exact reviewed M. K. and J. K. document was recognized only by its digital fingerprint. Nothing was uploaded; the page shows the anonymized assessment and separates procedural status from the shared 9/9 relevance.', gfJkRecognized: 'An exact reviewed record from the mixed set was recognized only by its digital fingerprint. Nothing was uploaded; the system placed it in a separate personal or institutional branch and transferred no other person’s conclusion. The shared new evidence has 9/9 relevance.', pragueThcRecognized: 'The new direct judicial evidence was recognized locally. The High Court quashed the conviction judgment and expressly described the problem of distinguishing lawful from prohibited cannabis. The file was neither uploaded nor published; only the source-bounded 9/9 result is displayed.', ddLiveRecognized: 'The exact creator record supplied today was recognized locally and placed in the live map. The file was not uploaded; the interface shows whether it is a duplicate, a new official node, or a newly evidenced primary source.', redLinks: 'red links', amberLinks: 'amber links', greenLinks: 'green links', openResult: 'Show full result', priorityRule: 'Ordering uses the highest traffic-light level first, followed by red and amber link counts, their combined weight, and document date. The traffic light records relevance and the need for human response; it does not itself prove wrongdoing or predict an outcome.', deadline: 'Deadline', peakPriority: 'Highest priority', substantiveAnswers: 'substantive answers in the document'
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

  const testPeriods = $('test-period-history');
  testPeriods.replaceChildren();
  for (const period of VERSION_2.dashboard.testPeriods) {
    const card = document.createElement('article');
    card.className = 'daily-snapshot';
    const state = document.createElement('strong');
    state.textContent = `${period.status} · ${period.distinctChecks} ${language === 'en' ? 'distinct checks' : 'různých kontrol'}`;
    const label = document.createElement('span');
    label.textContent = period.label;
    const detail = document.createElement('small');
    detail.textContent = `${period.window}. ${period.note} ${language === 'en' ? 'Checks added in this period' : 'Nové kontroly v tomto období'}: ${period.addedChecks}.`;
    card.append(state, label, detail);
    testPeriods.append(card);
  }
  $('test-period-rule').textContent = VERSION_2.dashboard.testCountingRule;

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
    currentEvidence: 'Current memory evidence and case-law links', caseLaw: 'Case law', courtPath: 'COURTS, DATES, AND REFERENCE NUMBERS CITED IN THE 2022 MOTION',
    memory: 'Evidence memory', axis: 'Public evidence axis', boundary: 'Limit', rewrite: 'What a new motion would do differently'
  } : {
    publicContext: 'VEŘEJNÝ FILMOVÝ KONTEXT', source: '1 · VÝROKY NÁVRHU Z ROKU 2022',
    baseline: '2 · AUTOREM POTVRZENÝ ZÁKLAD TESTU', synthesis: '3 · POROVNÁNÍ SYSTÉMU S PAMĚTÍ K 20. 7. 2026',
    sourceWording: 'Přesné anonymizované znění zdroje', sourceLimit: 'Mez zdroje',
    currentEvidence: 'Dnešní důkazní paměť a judikatorní vazby', caseLaw: 'Judikatura', courtPath: 'SOUDY, DATA A ČÍSLA JEDNACÍ CITOVANÁ V NÁVRHU Z ROKU 2022',
    memory: 'Důkazní paměť', axis: 'Veřejná důkazní osa', boundary: 'Mez', rewrite: 'Co by nový návrh udělal jinak'
  };

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

  const courtPathTarget = $('prisoner-court-path');
  courtPathTarget.replaceChildren();
  const courtPathHeading = document.createElement('h4');
  courtPathHeading.textContent = labels.courtPath;
  courtPathTarget.append(courtPathHeading);
  for (const item of PRISONER_TEST.courtPath) {
    const card = document.createElement('article');
    card.className = 'prisoner-source-card';
    const court = document.createElement('strong');
    court.textContent = item.court;
    const identity = document.createElement('p');
    identity.textContent = `${formatProjectDate(item.date)} · ${language === 'en' ? 'Ref.' : 'č. j.'} ${item.reference}`;
    const status = document.createElement('small');
    status.textContent = item.sourceStatus;
    card.append(court, identity, status);
    courtPathTarget.append(card);
  }

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

function formatProjectDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'cs-CZ', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function renderMkJkReopeningUpdate() {
  const labels = language === 'en' ? {
    inventory: 'REVIEWED SOURCE SET', courtPath: 'EXACT PROCEDURAL PATH', official: '1 · WHAT THE COURTS ACTUALLY FOUND',
    submissions: '2 · ALLEGATIONS AND MATERIALS SUBMITTED', synthesis: '3 · SYSTEM ASSESSMENT AS OF 20 JULY 2026',
    next: 'How the supplied evidence supports the 2026 reopening review', legal: 'Verified legal sources', source: 'Source',
    finding: 'Finding', limit: 'Evidence limit', step: 'How this supports review', priority: 'Relevance to reopening review',
    alliance: 'CREATOR-CONFIRMED ALLIANCE CONTEXT'
  } : {
    inventory: 'ZKONTROLOVANÝ SOUBOR ZDROJŮ', courtPath: 'PŘESNÁ PROCESNÍ CESTA', official: '1 · CO SKUTEČNĚ ZJISTILY SOUDY',
    submissions: '2 · TVRZENÍ A PODKLADY V PODÁNÍCH', synthesis: '3 · POSOUZENÍ SYSTÉMU K 20. 7. 2026',
    next: 'Jak dodané důkazy podporují přezkum obnovy v roce 2026', legal: 'Ověřené právní zdroje', source: 'Zdroj',
    finding: 'Zjištění', limit: 'Důkazní mez', step: 'Vazba na přezkum', priority: 'Relevance k přezkumu obnovy',
    alliance: 'AUTOREM POTVRZENÝ ALIANČNÍ KONTEXT'
  };

  $('mk-jk-update-heading').textContent = MK_JK_TEST.title;
  $('mk-jk-update-summary').textContent = MK_JK_TEST.summary;

  const inventory = $('mk-jk-source-inventory');
  inventory.replaceChildren();
  const inventoryLabel = document.createElement('strong');
  inventoryLabel.textContent = labels.inventory;
  const inventoryText = document.createElement('p');
  inventoryText.textContent = language === 'en'
    ? `${MK_JK_TEST.sourceInventory.receivedFiles} files received · ${MK_JK_TEST.sourceInventory.uniqueFiles} unique after SHA-256 deduplication · ${MK_JK_TEST.sourceInventory.publicSourceFilesAdded} private source files published. ${MK_JK_TEST.sourceInventory.status}`
    : `${MK_JK_TEST.sourceInventory.receivedFiles} přijatých souborů · ${MK_JK_TEST.sourceInventory.uniqueFiles} jedinečných po deduplikaci SHA-256 · ${MK_JK_TEST.sourceInventory.publicSourceFilesAdded} zveřejněných soukromých zdrojových souborů. ${MK_JK_TEST.sourceInventory.status}`;
  inventory.append(inventoryLabel, inventoryText);

  const overall = $('mk-jk-update-overall');
  overall.replaceChildren();
  overall.className = `prisoner-overall traffic-border-${MK_JK_TEST.overall.priority.trafficBand}`;
  const priorityBadge = createAllianceTrafficBadge(MK_JK_TEST.overall.priority.trafficBand);
  priorityBadge.textContent = `${labels.priority}: ${MK_JK_TEST.overall.priority.score}/9 · ${priorityBadge.textContent}`;
  const conclusion = document.createElement('strong');
  conclusion.textContent = MK_JK_TEST.overall.conclusion;
  overall.append(priorityBadge, conclusion);

  const courtPath = $('mk-jk-court-path');
  courtPath.replaceChildren();
  const courtHeading = document.createElement('h4');
  courtHeading.textContent = labels.courtPath;
  courtPath.append(courtHeading);
  for (const item of MK_JK_TEST.courtPath) {
    const card = document.createElement('article');
    card.className = 'prisoner-source-card';
    const court = document.createElement('strong');
    court.textContent = item.court;
    const ref = document.createElement('p');
    ref.textContent = `${formatProjectDate(item.date)} · ${language === 'en' ? 'Ref.' : 'č. j.'} ${item.reference}`;
    const result = document.createElement('small');
    result.textContent = item.result;
    card.append(court, ref, result);
    if (item.sourceUrl) {
      const link = document.createElement('a');
      link.href = item.sourceUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `${labels.source}: ${item.reference}`;
      card.append(link);
    }
    courtPath.append(card);
  }

  const official = $('mk-jk-official-findings');
  official.replaceChildren();
  const officialHeading = document.createElement('h4');
  officialHeading.textContent = labels.official;
  official.append(officialHeading);
  for (const item of MK_JK_TEST.officialFindings) {
    const card = document.createElement('article');
    card.className = 'prisoner-source-card';
    const source = document.createElement('strong');
    source.textContent = `${labels.source}: ${item.source}`;
    const finding = document.createElement('p');
    finding.textContent = item.finding;
    const limit = document.createElement('small');
    limit.textContent = `${labels.limit}: ${item.boundary}`;
    card.append(source, finding, limit);
    official.append(card);
  }

  const submissions = $('mk-jk-submitted-claims');
  submissions.replaceChildren();
  const submissionsHeading = document.createElement('h4');
  submissionsHeading.textContent = labels.submissions;
  const submissionsList = document.createElement('ul');
  for (const statement of MK_JK_TEST.submittedClaims) {
    const item = document.createElement('li');
    item.textContent = statement;
    submissionsList.append(item);
  }
  submissions.append(submissionsHeading, submissionsList);

  const alliance = $('mk-jk-alliance-context');
  alliance.replaceChildren();
  const allianceHeading = document.createElement('strong');
  allianceHeading.textContent = labels.alliance;
  const allianceStatement = document.createElement('p');
  allianceStatement.textContent = `${MK_JK_TEST.allianceContext.statement} ${MK_JK_TEST.allianceContext.euAuthorship}`;
  const allianceBoundary = document.createElement('small');
  allianceBoundary.textContent = MK_JK_TEST.allianceContext.boundary;
  alliance.append(allianceHeading, allianceStatement, allianceBoundary);

  const comparison = $('mk-jk-comparison');
  comparison.replaceChildren();
  const comparisonHeading = document.createElement('h4');
  comparisonHeading.textContent = labels.synthesis;
  comparison.append(comparisonHeading);
  for (const item of MK_JK_TEST.relevance) {
    const card = document.createElement('article');
    card.className = `prisoner-comparison-card traffic-border-${item.trafficBand}`;
    const badge = createAllianceTrafficBadge(item.trafficBand);
    badge.textContent = `${item.score}/9 · ${badge.textContent}`;
    const title = document.createElement('h5');
    title.textContent = item.title;
    const status = document.createElement('strong');
    status.textContent = item.status;
    const meaning = document.createElement('p');
    meaning.textContent = item.meaning;
    const step = document.createElement('p');
    step.textContent = `${labels.step}: ${item.next}`;
    const boundary = document.createElement('small');
    boundary.textContent = `${labels.limit}: ${item.boundary}`;
    card.append(badge, title, status, meaning, step, boundary);
    if (item.sourceUrl) {
      const link = document.createElement('a');
      link.href = item.sourceUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = labels.source;
      card.append(link);
    }
    comparison.append(card);
  }

  const next = $('mk-jk-next-evidence');
  next.replaceChildren();
  const nextHeading = document.createElement('h4');
  nextHeading.textContent = labels.next;
  const nextList = document.createElement('ol');
  for (const step of MK_JK_TEST.nextEvidence) {
    const item = document.createElement('li');
    item.textContent = step;
    nextList.append(item);
  }
  const legalHeading = document.createElement('h5');
  legalHeading.textContent = labels.legal;
  const legalList = document.createElement('ul');
  for (const source of MK_JK_TEST.legalSources) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `${source.reference} — ${source.title}`;
    item.append(link);
    legalList.append(item);
  }
  next.append(nextHeading, nextList, legalHeading, legalList);

  $('mk-jk-evidence-boundary').textContent = `${MK_JK_TEST.identityBoundary} ${MK_JK_TEST.publicationBoundary}`;
}

function renderGfJkProceduralUpdate() {
  const labels = language === 'en' ? {
    files: 'substantive records in branch',
    next: 'Next human step',
    limit: 'What this does not establish',
    source: 'Source',
    confidence: 'Source status',
    route: 'Procedural route'
  } : {
    files: 'věcných záznamů ve větvi',
    next: 'Další lidský krok',
    limit: 'Co tím ještě není prokázáno',
    source: 'Zdroj',
    confidence: 'Stav zdroje',
    route: 'Procesní cesta'
  };

  $('gf-jk-update-heading').textContent = GF_JK_TEST.title;
  $('gf-jk-update-summary').textContent = GF_JK_TEST.summary;

  const main = $('gf-jk-main-sentence');
  main.replaceChildren();
  const routeBadge = document.createElement('span');
  routeBadge.className = 'route-status traffic-red-3';
  routeBadge.textContent = GF_JK_TEST.route.label;
  const sentence = document.createElement('strong');
  sentence.textContent = GF_JK_TEST.mainSentence;
  const reason = document.createElement('small');
  reason.textContent = `${labels.route}: ${GF_JK_TEST.route.reason}`;
  main.append(routeBadge, sentence, reason);

  const branches = $('case-branch-rows');
  branches.replaceChildren();
  for (const item of GF_JK_TEST.branches) {
    const card = document.createElement('article');
    card.className = `case-branch-row traffic-border-${item.trafficBand}`;
    const badge = createAllianceTrafficBadge(item.trafficBand);
    badge.textContent = `${item.score}/9`;
    const content = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = item.label;
    const headline = document.createElement('p');
    headline.textContent = item.headline;
    content.append(title, headline);
    const count = document.createElement('small');
    count.textContent = `${item.fileCount} ${labels.files}`;
    card.append(badge, content, count);
    branches.append(card);
  }

  const priorities = $('gf-jk-priority-rows');
  priorities.replaceChildren();
  const gfJkPriorities = [...GF_JK_TEST.relevance].sort((a, b) => {
    if (a.id === 'methodology') return -1;
    if (b.id === 'methodology') return 1;
    return b.score - a.score;
  });
  gfJkPriorities.forEach((item, index) => {
    const drawer = document.createElement('details');
    drawer.className = `case-priority-row traffic-border-${item.trafficBand}`;
    if (index === 0) drawer.open = true;
    const summary = document.createElement('summary');
    const badge = createAllianceTrafficBadge(item.trafficBand);
    badge.textContent = `${item.score}/9`;
    const title = document.createElement('strong');
    title.textContent = item.title;
    const headline = document.createElement('span');
    headline.textContent = item.headline;
    summary.append(badge, title, headline);
    const body = document.createElement('div');
    body.className = 'case-priority-content';
    const action = document.createElement('p');
    action.innerHTML = `<strong>${labels.next}:</strong> `;
    action.append(document.createTextNode(item.action));
    const boundary = document.createElement('p');
    boundary.className = 'evidence-boundary compact-boundary';
    boundary.innerHTML = `<strong>${labels.limit}:</strong> `;
    boundary.append(document.createTextNode(item.boundary));
    body.append(action, boundary);
    drawer.append(summary, body);
    priorities.append(drawer);
  });

  const renderEvidenceLayer = (targetId, entries) => {
    const target = $(targetId);
    target.replaceChildren();
    for (const item of entries) {
      const card = document.createElement('article');
      card.className = 'case-evidence-item';
      const source = document.createElement('strong');
      source.textContent = `${labels.source}: ${item.source}`;
      const claim = document.createElement('p');
      claim.textContent = item.claim;
      const citation = document.createElement('blockquote');
      citation.lang = 'cs';
      citation.textContent = `„${item.citation}“`;
      const confidence = document.createElement('small');
      confidence.textContent = `${labels.confidence}: ${item.confidence}`;
      card.append(source, claim, citation, confidence);
      target.append(card);
    }
  };
  renderEvidenceLayer('gf-jk-official-facts', GF_JK_TEST.facts);
  renderEvidenceLayer('gf-jk-party-claims', GF_JK_TEST.submittedClaims);

  const legal = $('gf-jk-legal-sources');
  legal.replaceChildren();
  for (const item of GF_JK_TEST.legalSources) {
    const row = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `${item.reference} — ${item.title}`;
    row.append(link);
    legal.append(row);
  }
  $('gf-jk-evidence-boundary').textContent = `${GF_JK_TEST.privacy} ${GF_JK_TEST.publicationBoundary}`;
}

function renderCasePortfolio() {
  const labels = language === 'en' ? {
    sources: 'Available for analysis', status: 'Current procedural reading', candidate: 'Main candidate for review',
    article39: 'Article 39 line', eu: 'EU-law and preliminary-reference line',
    open: 'Open the full case assessment', sourceStatus: 'Source status', limitation: 'Limit', source: 'Source'
  } : {
    sources: 'K analýze bylo k dispozici', status: 'Současné procesní čtení', candidate: 'Hlavní kandidát k prověření',
    article39: 'Osa čl. 39 Listiny', eu: 'Osa práva EU a předběžných otázek',
    open: 'Otevřít úplné posouzení kauzy', sourceStatus: 'Stav zdroje', limitation: 'Omezení', source: 'Zdroj'
  };

  $('case-portfolio-title').textContent = CASE_PORTFOLIO.title;
  $('case-portfolio-introduction').textContent = CASE_PORTFOLIO.introduction;
  $('case-research-label').textContent = CASE_PORTFOLIO.researchQuestion.label;
  $('case-specific-motto').textContent = CASE_PORTFOLIO.researchQuestion.motto;
  $('case-specific-context').textContent = CASE_PORTFOLIO.researchQuestion.mottoContext;
  $('case-author-position').textContent = CASE_PORTFOLIO.researchQuestion.authorPosition;
  $('case-author-baseline').textContent = CASE_PORTFOLIO.researchQuestion.controlledTestBaseline;
  $('case-system-question').textContent = CASE_PORTFOLIO.researchQuestion.systemQuestion;
  $('case-answer-rule').textContent = CASE_PORTFOLIO.researchQuestion.answerRule;
  $('case-portfolio-boundary').textContent = CASE_PORTFOLIO.boundary;

  const history = $('case-test-history');
  history.replaceChildren();
  for (const item of CASE_PORTFOLIO.testHistory) {
    const card = document.createElement('article');
    const period = document.createElement('strong');
    period.textContent = item.period;
    const statement = document.createElement('span');
    statement.textContent = item.statement;
    card.append(period, statement);
    history.append(card);
  }

  const rows = $('case-portfolio-rows');
  rows.replaceChildren();
  for (const item of CASE_PORTFOLIO.cases) {
    const drawer = document.createElement('details');
    drawer.className = `portfolio-case traffic-border-${item.trafficBand}`;
    const summary = document.createElement('summary');
    const badge = createAllianceTrafficBadge(item.trafficBand);
    badge.textContent = `${item.score}/9`;
    const identity = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = item.label;
    const visibility = document.createElement('small');
    visibility.textContent = item.visibility;
    identity.append(name, visibility);
    const headline = document.createElement('span');
    headline.textContent = item.headline;
    summary.append(badge, identity, headline);

    const content = document.createElement('div');
    content.className = 'portfolio-case-content';
    const facts = document.createElement('dl');
    const values = [
      [labels.sources, item.sourceCount],
      [labels.status, item.status],
      [labels.candidate, item.mainCandidate],
      [labels.article39, item.article39],
      [labels.eu, item.eu]
    ];
    for (const [termText, descriptionText] of values) {
      const term = document.createElement('dt');
      term.textContent = termText;
      const description = document.createElement('dd');
      description.textContent = descriptionText;
      facts.append(term, description);
    }
    const link = document.createElement('a');
    link.className = 'action-link';
    link.href = item.link;
    link.textContent = labels.open;
    link.addEventListener('click', () => {
      const target = document.querySelector(item.link);
      if (target instanceof HTMLDetailsElement) target.open = true;
    });
    content.append(facts, link);
    drawer.append(summary, content);
    rows.append(drawer);
  }

  $('shared-methodology-title').textContent = CASE_PORTFOLIO.sharedMethodology.title;
  $('shared-methodology-explanation').textContent = CASE_PORTFOLIO.sharedMethodology.explanation;
  $('shared-methodology-short-argument').textContent = CASE_PORTFOLIO.sharedMethodology.shortArgument;
  $('shared-methodology-audit-title').textContent = CASE_PORTFOLIO.sharedMethodology.auditTrailTitle;
  const auditTrail = $('shared-methodology-audit-trail');
  auditTrail.replaceChildren();
  for (const value of CASE_PORTFOLIO.sharedMethodology.auditTrail) {
    const item = document.createElement('li');
    item.textContent = value;
    auditTrail.append(item);
  }
  const timeline = $('shared-methodology-timeline');
  timeline.replaceChildren();
  for (const item of CASE_PORTFOLIO.sharedMethodology.timeline) {
    const card = document.createElement('article');
    const heading = document.createElement('h5');
    heading.textContent = `${item.date} · ${item.source}`;
    const status = document.createElement('small');
    status.textContent = `${labels.sourceStatus}: ${item.sourceStatus}`;
    const statement = document.createElement('p');
    statement.textContent = item.statement;
    card.append(heading, status, statement);
    if (item.citation) {
      const citation = document.createElement('blockquote');
      citation.lang = 'cs';
      citation.textContent = `„${item.citation}“`;
      card.append(citation);
    }
    const limitation = document.createElement('p');
    limitation.className = 'evidence-boundary compact-boundary';
    limitation.textContent = `${labels.limitation}: ${item.limitation}`;
    card.append(limitation);
    timeline.append(card);
  }

  const science = $('case-portfolio-science-sources');
  science.replaceChildren();
  for (const item of CASE_PORTFOLIO.sharedMethodology.scientificSources) {
    const row = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = item.title;
    const explanation = document.createElement('span');
    explanation.textContent = ` — ${item.relevance}`;
    const limitation = document.createElement('small');
    limitation.textContent = ` ${labels.limitation}: ${item.limitation}`;
    row.append(link, explanation, limitation);
    science.append(row);
  }

  const legal = $('case-portfolio-legal-sources');
  legal.replaceChildren();
  for (const item of CASE_PORTFOLIO.legalSources) {
    const row = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = item.reference;
    const boundary = document.createElement('small');
    boundary.textContent = item.boundary;
    row.append(link, document.createTextNode(' — '), boundary);
    legal.append(row);
  }
}

function renderCzechPilotV3() {
  const labels = language === 'en' ? {
    court: 'Criminal court and file', available: 'Available for analysis', current: 'Current reading',
    impact: 'What the new record changed', next: 'Next human step', open: 'Open the full evidence assessment',
    context: 'Public context: Czech Television documentary Smoke',
    evidencePriority: 'Evidence priority', sourceStatus: 'Source status'
  } : {
    court: 'Trestní soud a spis', available: 'K analýze bylo k dispozici', current: 'Současné čtení',
    impact: 'Co nový dokument změnil', next: 'Další lidský krok', open: 'Otevřít úplné důkazní posouzení',
    context: 'Veřejný kontext: dokument České televize Smoke',
    evidencePriority: 'Důkazní priorita', sourceStatus: 'Stav zdroje'
  };

  $('v3-title').textContent = CZECH_PILOT.title;
  $('v3-introduction').textContent = CZECH_PILOT.introduction;
  $('v3-score-rule').textContent = CZECH_PILOT.scoreRule;

  const breakthrough = CZECH_PILOT.judicialBreakthrough;
  $('v3-breakthrough-label').textContent = breakthrough.label;
  $('v3-breakthrough-score').textContent = `${breakthrough.priority}/9`;
  $('v3-breakthrough-headline').textContent = breakthrough.headline;
  $('v3-breakthrough-source').textContent = breakthrough.source;
  $('v3-breakthrough-impact').textContent = breakthrough.impact;
  $('v3-breakthrough-boundary').textContent = breakthrough.boundary;

  const slogans = $('v3-slogans');
  slogans.replaceChildren();
  CZECH_PILOT.slogans.forEach((value, index) => {
    const statement = document.createElement(index < 2 ? 'strong' : 'span');
    statement.textContent = value;
    slogans.append(statement);
  });

  const cases = $('v3-case-assessments');
  cases.replaceChildren();
  for (const item of CZECH_PILOT.caseAssessments) {
    const card = document.createElement('article');
    card.className = `v3-case-card traffic-border-${item.priorityBand}`;

    const heading = document.createElement('div');
    heading.className = 'v3-case-heading';
    const identity = document.createElement('h4');
    identity.textContent = item.label;
    const priority = document.createElement('span');
    priority.className = `risk-badge traffic-${item.priorityBand}`;
    priority.textContent = `${item.priority}/9 · ${labels.evidencePriority}`;
    heading.append(identity, priority);

    const court = document.createElement('p');
    court.className = 'v3-court-line';
    const courtLabel = document.createElement('small');
    courtLabel.textContent = labels.court;
    const courtValue = document.createElement('strong');
    courtValue.textContent = `${item.court} · ${item.courtReference}`;
    court.append(courtLabel, courtValue);

    const relevance = document.createElement('p');
    relevance.className = 'v3-relevance-line';
    relevance.textContent = item.relevanceLine;

    const details = document.createElement('details');
    details.className = 'v3-case-details';
    const summary = document.createElement('summary');
    summary.textContent = labels.impact;
    const content = document.createElement('dl');
    const values = [
      [labels.available, item.sourceInventory],
      [labels.current, item.conclusion],
      [labels.impact, item.documentImpact],
      [labels.next, item.next]
    ];
    for (const [termValue, descriptionValue] of values) {
      const term = document.createElement('dt');
      term.textContent = termValue;
      const description = document.createElement('dd');
      description.textContent = descriptionValue;
      content.append(term, description);
    }
    const links = document.createElement('div');
    links.className = 'v3-card-links';
    const link = document.createElement('a');
    link.className = 'action-link';
    link.href = item.link;
    link.textContent = labels.open;
    link.addEventListener('click', () => {
      const target = document.querySelector(item.link);
      if (target instanceof HTMLDetailsElement) target.open = true;
    });
    links.append(link);
    if (item.publicContextUrl) {
      const context = document.createElement('a');
      context.href = item.publicContextUrl;
      context.target = '_blank';
      context.rel = 'noopener noreferrer';
      context.textContent = labels.context;
      links.append(context);
    }
    details.append(summary, content, links);
    card.append(heading, court, relevance, details);
    cases.append(card);
  }

  $('dd-live-headline').textContent = CZECH_PILOT.authorBranches.headline;
  $('dd-live-boundary').textContent = CZECH_PILOT.authorBranches.boundary;
  const renderBranches = (targetId, items, institutionKey) => {
    const target = $(targetId);
    target.replaceChildren();
    for (const item of items) {
      const row = document.createElement('article');
      const reference = document.createElement('strong');
      reference.textContent = item.reference;
      const title = document.createElement('span');
      title.textContent = item[institutionKey];
      const kind = document.createElement('small');
      kind.textContent = item.kind ? `${item.kind} · ${labels.sourceStatus}: ${item.sourceStatus}` : `${labels.sourceStatus}: ${item.status}`;
      row.append(reference, title, kind);
      target.append(row);
    }
  };
  renderBranches('dd-court-branches', CZECH_PILOT.authorBranches.courtBranches, 'counterparty');
  renderBranches('dd-institutional-branches', CZECH_PILOT.authorBranches.institutionalBranches, 'institution');

  const groups = $('dd-open-groups');
  groups.replaceChildren();
  for (const item of CZECH_PILOT.authorBranches.openGroups) {
    const card = document.createElement('article');
    const title = document.createElement('strong');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    card.append(title, description);
    groups.append(card);
  }

  const periods = $('v3-test-periods');
  periods.replaceChildren();
  for (const item of CZECH_PILOT.testPeriods) {
    const card = document.createElement('article');
    const status = document.createElement('strong');
    status.textContent = item.label;
    const period = document.createElement('span');
    period.textContent = item.period;
    const scope = document.createElement('p');
    scope.textContent = item.scope;
    const boundary = document.createElement('small');
    boundary.textContent = item.claimBoundary;
    card.append(status, period, scope, boundary);
    periods.append(card);
  }

  $('v3-civic-title').textContent = CZECH_PILOT.civicContext.title;
  $('v3-civic-statement').textContent = CZECH_PILOT.civicContext.statement;
  $('v3-civic-outreach').textContent = CZECH_PILOT.civicContext.outreach;
}

function renderDdLiveV3Update(highlightIds = []) {
  const labels = language === 'en' ? {
    received: 'PDFs received', known: 'already-known events', newEvents: 'new official events',
    duplicate: 'exact duplicate', upgrades: 'primary-source upgrades', substantive: 'new or upgraded records',
    details: 'What this record changed and where it may propagate', before: 'BEFORE INSERTION',
    after: 'AFTER INSERTION', citation: 'SOURCE EXCERPT', targets: 'AFFECTED BRANCHES',
    boundary: 'EVIDENCE BOUNDARY', pages: 'pages', priority: 'RELEVANCE 9/9 · EXTREME, ON FIRE'
  } : {
    received: 'přijatých PDF', known: 'dříve známé události', newEvents: 'nové úřední události',
    duplicate: 'přesná duplicita', upgrades: 'povýšení na prvotní zdroj', substantive: 'nové nebo povýšené záznamy',
    details: 'Co tato listina změnila a kam se smí propsat', before: 'PŘED VLOŽENÍM',
    after: 'PO VLOŽENÍ', citation: 'VÝŇATEK ZE ZDROJE', targets: 'DOTČENÉ VĚTVE',
    boundary: 'DŮKAZNÍ HRANICE', pages: 'stran', priority: 'RELEVANCE 9/9 · EXTRÉM, HOŘÍ'
  };

  $('dd-update-title').textContent = `${DD_LIVE_V3.version} · ${DD_LIVE_V3.title}`;
  $('dd-update-summary').textContent = DD_LIVE_V3.summary;

  const metrics = $('dd-update-metrics');
  metrics.replaceChildren();
  const metricValues = [
    [DD_LIVE_V3.metrics.receivedFiles, labels.received],
    [DD_LIVE_V3.metrics.knownBeforeInsertion, labels.known],
    [DD_LIVE_V3.metrics.newEvents, labels.newEvents],
    [DD_LIVE_V3.metrics.exactDuplicates, labels.duplicate],
    [DD_LIVE_V3.metrics.sourceUpgrades, labels.upgrades],
    [DD_LIVE_V3.metrics.substantiveNewOrUpgraded, labels.substantive]
  ];
  for (const [value, label] of metricValues) {
    const card = document.createElement('article');
    const number = document.createElement('strong');
    number.textContent = String(value);
    const description = document.createElement('span');
    description.textContent = label;
    card.append(number, description);
    metrics.append(card);
  }

  const highlighted = new Set(highlightIds);
  const documentList = $('dd-update-documents');
  documentList.replaceChildren();
  let firstHighlighted = null;
  for (const item of DD_LIVE_V3.documents) {
    const card = document.createElement('article');
    card.id = `dd-evidence-${item.id}`;
    card.className = `dd-update-card dd-intake-${item.intakeClass} traffic-border-${item.trafficBand}`;
    if (highlighted.has(item.id)) {
      card.classList.add('recognized-evidence');
      firstHighlighted ??= card;
    }

    const heading = document.createElement('div');
    heading.className = 'dd-update-heading';
    const intake = document.createElement('span');
    intake.className = 'dd-intake-label';
    intake.textContent = item.intakeLabel;
    const priority = document.createElement('span');
    priority.className = `risk-badge traffic-${item.trafficBand}`;
    priority.textContent = labels.priority;
    heading.append(intake, priority);

    const title = document.createElement('h6');
    title.textContent = item.institution;
    const source = document.createElement('p');
    source.className = 'dd-update-source';
    source.textContent = `${formatProjectDate(item.date)} · ${item.reference} · ${item.pages} ${labels.pages}`;
    const sentence = document.createElement('p');
    sentence.className = 'dd-update-main';
    sentence.textContent = item.mainSentence;

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = labels.details;
    const values = [
      [labels.before, item.before],
      [labels.after, item.after],
      [labels.citation, `„${item.citation}“`],
      [labels.targets, item.targets.join(' · ')],
      [labels.boundary, item.boundary]
    ];
    const content = document.createElement('dl');
    for (const [termValue, descriptionValue] of values) {
      const term = document.createElement('dt');
      term.textContent = termValue;
      const description = document.createElement('dd');
      description.textContent = descriptionValue;
      content.append(term, description);
    }
    details.append(summary, content);
    card.append(heading, title, source, sentence, details);
    documentList.append(card);
  }

  $('dd-update-boundary').textContent = DD_LIVE_V3.privacy;
  $('dd-update-deadline').textContent = DD_LIVE_V3.deadlineRule;
  return firstHighlighted;
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
  if (test.source.returnedJudgment) {
    const returnedJudgment = document.createElement('p');
    returnedJudgment.className = 'claim-text';
    returnedJudgment.textContent = test.source.returnedJudgment;
    sourceCard.append(returnedJudgment);
  }
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
renderCzechPilotV3();
renderDdLiveV3Update();
renderCasePortfolio();
renderAllianceUpdate();
renderPrisonerReopeningUpdate();
renderMkJkReopeningUpdate();
renderGfJkProceduralUpdate();
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
          const mkJkEvidenceId = identifyMkJkReopeningDigest(digest);
          const caseBundleEvidenceId = identifyCaseBundleDigest(digest);
          const pragueThcEvidenceId = identifyPragueThcDigest(digest);
          const ddLiveEvidenceId = identifyDdLiveV3Digest(digest);
          const inputKind = organisationInputKind
            ?? policeInputKind
            ?? (allianceEvidenceId ? `alliance-${allianceEvidenceId}` : null)
            ?? (prisonerInputKind ? `prisoner-${prisonerInputKind}` : null)
            ?? (mkJkEvidenceId ? `mk-jk-${mkJkEvidenceId}` : null)
            ?? (caseBundleEvidenceId ? `case-bundle-${caseBundleEvidenceId}` : null)
            ?? (pragueThcEvidenceId ? `prague-thc-${pragueThcEvidenceId}` : null)
            ?? (ddLiveEvidenceId ? `dd-live-${ddLiveEvidenceId}` : null);
          return {
            name: pdfDocument.name,
            inputKind,
            allianceEvidenceId,
            prisonerInputKind,
            mkJkEvidenceId,
            caseBundleEvidenceId,
            pragueThcEvidenceId,
            ddLiveEvidenceId,
            test: pragueThcEvidenceId
              ? localizePragueThcUpdate(language, pragueThcEvidenceId)
              : caseBundleEvidenceId
                ? GF_JK_TEST
                : mkJkEvidenceId
                  ? MK_JK_TEST
                  : prisonerInputKind
                    ? PRISONER_TEST
                    : policeInputKind
                      ? POLICE_TEST
                      : organisationInputKind
                        ? ORGANISATION_TEST
                        : null
          };
        }));
        if (recognized.every(({ inputKind }) => inputKind)) {
          $('institutional-map').hidden = true;
          $('memory-out').hidden = true;
          $('analysis-out').hidden = true;
          const allianceEntries = recognized.filter(({ allianceEvidenceId }) => allianceEvidenceId);
          const prisonerEntries = recognized.filter(({ prisonerInputKind }) => prisonerInputKind);
          const mkJkEntries = recognized.filter(({ mkJkEvidenceId }) => mkJkEvidenceId);
          const caseBundleEntries = recognized.filter(({ caseBundleEvidenceId }) => caseBundleEvidenceId);
          const ddLiveEntries = recognized.filter(({ ddLiveEvidenceId }) => ddLiveEvidenceId);
          if (ddLiveEntries.length === recognized.length) {
            const isSinglePoliceDuplicate = recognized.length === 1
              && ddLiveEntries[0].ddLiveEvidenceId === 'policeExactDuplicate';
            if (isSinglePoliceDuplicate) {
              renderExactPdfUpdate(POLICE_TEST, ddLiveEntries[0].inputKind);
              showStatus(UI.policeRecognized, 'info');
              window.scrollTo({ top: $('organisation-result').offsetTop, behavior: 'smooth' });
              return;
            }
            const target = renderDdLiveV3Update(ddLiveEntries.map(({ ddLiveEvidenceId }) => ddLiveEvidenceId));
            $('dd-live-branches').open = true;
            showStatus(UI.ddLiveRecognized, 'info');
            window.scrollTo({ top: (target ?? $('dd-daily-update')).offsetTop, behavior: 'smooth' });
            return;
          }
          if (caseBundleEntries.length === recognized.length) {
            renderGfJkProceduralUpdate();
            const target = $('gf-jk-procedural-update');
            target.open = true;
            target.classList.add('recognized-evidence');
            showStatus(UI.gfJkRecognized, 'info');
            window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            return;
          }
          if (mkJkEntries.length === recognized.length) {
            renderMkJkReopeningUpdate();
            const target = $('mk-jk-reopening-update');
            target.open = true;
            target.classList.add('recognized-evidence');
            showStatus(UI.mkJkRecognized, 'info');
            window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            return;
          }
          if (prisonerEntries.length === recognized.length) {
            renderPrisonerReopeningUpdate();
            const target = $('prisoner-reopening-update');
            target.open = true;
            target.classList.add('recognized-evidence');
            showStatus(UI.prisonerRecognized, 'info');
            window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            return;
          }
          if (allianceEntries.length === recognized.length) {
            renderAllianceUpdate();
            $('alliance-update').open = true;
            const target = highlightAllianceEvidence(allianceEntries.map(({ allianceEvidenceId }) => allianceEvidenceId));
            showStatus(UI.allianceRecognized, 'info');
            window.scrollTo({ top: (target ?? $('alliance-update')).offsetTop, behavior: 'smooth' });
            return;
          }
          if (!allianceEntries.length && !prisonerEntries.length && !mkJkEntries.length && !caseBundleEntries.length) {
            const sorted = renderPriorityQueue(recognized);
            renderExactPdfUpdate(sorted[0].test, sorted[0].inputKind);
            const containsPolice = recognized.some(({ test }) => test === POLICE_TEST);
            const containsPragueThc = recognized.some(({ pragueThcEvidenceId }) => pragueThcEvidenceId);
            showStatus(containsPragueThc ? UI.pragueThcRecognized : containsPolice ? UI.policeRecognized : (language === 'en'
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
