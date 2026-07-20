import { analyzeDocumentSet, SAMPLE_DOCUMENT } from './analysis.js';
import { buildCaseMemory } from './memory.js';
import { CASE_MEMORY } from './case-memory.js';
import { localizeCaseMemory } from './case-memory-en.js';
import { localizeInstitutionalCaseMap } from './case-map.js';
import { localizeInternalArchiveTest } from './archive-update.js';
import { identifyOrganisationUpdateDigest, localizeOrganisationUpdate } from './organisation-update.js';

const $ = (id) => document.getElementById(id);
const language = document.documentElement.lang === 'en' ? 'en' : 'cs';
const PUBLIC_MEMORY = localizeCaseMemory(CASE_MEMORY, language);
const INTERNAL_TEST = localizeInternalArchiveTest(language);
const ORGANISATION_TEST = localizeOrganisationUpdate(language);
let preparedDocuments = [];
let preparedInstitutionalMap = false;

const UI = {
  cs: {
    confidence: 'Jistota', documents: 'dokumentů', branches: 'rozpoznaných větví', references: 'spisových značek', dates: 'dat',
    noBranch: 'Zatím nebyla rozpoznána žádná podporovaná větev.', noReference: 'Nebyla rozpoznána žádná spisová značka.', noDate: 'Nebylo rozpoznáno žádné datum.',
    documentReferences: 'spisových značek', documentDates: 'dat', noMetadata: 'Bez rozpoznaných spisových značek a dat', pasted: 'Vložený dokument',
    empty: 'Nejprve vložte text nebo vyberte textové soubory.', demoLoaded: 'Načtena anonymizovaná institucionální mapa případu 2004–2026. Klikněte na „Vytvořit mapu případu“.', mapCreated: 'Mapa případu byla vytvořena.',
    indexed: 'indexováno v projektových podkladech', creatorStated: 'tvrzení autora — připojit anonymizovaný pramen', relations: 'Vazby mezi institucemi', timeline: 'Časová osa', evidenceStatus: 'Stav zdroje', link: 'Vazba', status: 'Stav', source: 'Zdroj', page: 'str.', audit: 'Audit', earlier: 'Dřívější výrok', intermediate: 'Mezilehlý výrok', later: 'Pozdější výrok', red: 'červená', amber: 'oranžová', before: 'PŘED TESTEM', after: 'PO TESTU', systemChange: 'Změna vytvořená systémem', urgent: 'bezodkladná lidská kontrola kvůli tvrzené naléhavosti a možným nevratným dopadům; výsledek řízení se nepředjímá', review: 'probíhající související větev vyžadující kontrolu úplného spisu', unknownPdf: 'Toto PDF není přesně podporovaná listina. Prototyp je neodeslal ani na něj nepřenesl připravenou analýzu.', onePdfOnly: 'PDF test přijímá právě jeden podporovaný soubor bez dalších příloh.', organisationLoaded: 'Veřejná anonymizovaná kopie PDF byla načtena lokálně. Klikněte na „Analyzovat lokálně“.', privateOriginal: 'soukromý originál rozpoznán přesným digitálním otiskem; veřejně se zobrazí pouze anonymizovaný výstup', publicDerivative: 'veřejná anonymizovaná kopie rozpoznána přesným digitálním otiskem'
  },
  en: {
    confidence: 'Confidence', documents: 'documents', branches: 'identified branches', references: 'case references', dates: 'dates',
    noBranch: 'No supported branch has been identified yet.', noReference: 'No case reference was identified.', noDate: 'No date was identified.',
    documentReferences: 'case references', documentDates: 'dates', noMetadata: 'No identified case references or dates', pasted: 'Pasted document',
    empty: 'Paste text or select text files first.', demoLoaded: 'The anonymized 2004–2026 institutional case map is loaded. Click “Create case map”.', mapCreated: 'The case map was created.',
    indexed: 'indexed in project materials', creatorStated: 'creator-stated — attach anonymized source', relations: 'Institutional relationships', timeline: 'Timeline', evidenceStatus: 'Source status', link: 'Link', status: 'Status', source: 'Source', page: 'p.', audit: 'Audit', earlier: 'Earlier statement', intermediate: 'Intermediate statement', later: 'Later statement', red: 'red', amber: 'amber', before: 'BEFORE THE TEST', after: 'AFTER THE TEST', systemChange: 'System-generated change', urgent: 'immediate human review because of alleged urgency and potentially irreversible effects; the outcome is not prejudged', review: 'an active related branch requiring review of the complete file', unknownPdf: 'This PDF is not the exactly supported document. The prototype uploaded nothing and did not transfer the prepared analysis to it.', onePdfOnly: 'The PDF test accepts exactly one supported file without additional attachments.', organisationLoaded: 'The public anonymized PDF copy was loaded locally. Click “Analyze locally”.', privateOriginal: 'private original recognized by its exact digital fingerprint; only the anonymized output is displayed publicly', publicDerivative: 'public anonymized copy recognized by its exact digital fingerprint'
  }
}[language];

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
    target.append(card);
  }
}

function reject(result) {
  $('analysis-out').hidden = true;
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

function renderOrganisationUpdate(test, inputKind) {
  $('organisation-title').textContent = test.title;
  $('organisation-scope').textContent = `${inputKind === 'private-original' ? UI.privateOriginal : UI.publicDerivative}. ${test.source.privacy}`;

  const sourceCard = document.createElement('article');
  sourceCard.className = 'claim organisation-source';
  const sourceTitle = document.createElement('h3');
  sourceTitle.textContent = `${test.source.institution} · ${test.source.documentDate}`;
  const sourceStatus = document.createElement('p');
  sourceStatus.textContent = language === 'en'
    ? 'Source-bounded court-order extract; the original PDF is neither uploaded nor published.'
    : 'Zdrojově omezený výtah soudního usnesení; původní PDF se neodesílá ani nezveřejňuje.';
  const sourceLink = document.createElement('a');
  sourceLink.href = test.source.publicFile;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener';
  sourceLink.textContent = language === 'en' ? 'Open the anonymized public extract' : 'Otevřít anonymizovaný veřejný výtah';
  sourceCard.append(sourceTitle, sourceStatus, sourceLink);
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

  renderList('organisation-limits', test.doesNotProve);
  renderList('organisation-human-checks', test.humanChecks);

  const relevance = $('organisation-relevance');
  relevance.replaceChildren();
  relevance.className = 'relevance-grid';
  for (const item of test.relevance) {
    const card = document.createElement('article');
    card.className = `claim relevance-${item.level}`;
    const title = document.createElement('h4');
    const marker = document.createElement('span');
    marker.className = `risk-badge ${item.level === 'direct' ? 'critical' : item.level === 'none' ? 'verified' : 'review'}`;
    marker.textContent = item.label;
    title.append(marker, document.createElement('br'), document.createTextNode(item.targets));
    const reason = document.createElement('p');
    reason.textContent = item.reason;
    const action = document.createElement('p');
    action.className = 'evidence-note';
    action.textContent = `${language === 'en' ? 'Action' : 'Postup'}: ${item.action}`;
    card.append(title, reason, action);
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
    showStatus(UI.organisationLoaded, 'info');
  })();
});

$('load-case').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = true;
  $('files').value = '';
  $('doc').value = '';
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
  showStatus(UI.demoLoaded, 'info');
});

$('run-internal-test').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('files').value = '';
  $('doc').value = '';
  $('organisation-result').hidden = true;
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
});

$('doc').addEventListener('input', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
  $('integration-test').hidden = true;
  $('organisation-result').hidden = true;
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
    const pdfDocuments = documents.filter((item) => item.kind === 'pdf');
    if (pdfDocuments.length) {
      if (documents.length !== 1) return reject({ reason: UI.onePdfOnly });
      const digest = await sha256Hex(pdfDocuments[0].bytes);
      const inputKind = identifyOrganisationUpdateDigest(digest);
      if (!inputKind) return reject({ reason: UI.unknownPdf });
      $('institutional-map').hidden = true;
      $('memory-out').hidden = true;
      $('analysis-out').hidden = true;
      renderOrganisationUpdate(ORGANISATION_TEST, inputKind);
      showStatus(language === 'en'
        ? 'Supported PDF recognized locally. Personal data remain in the private original; only the anonymized, source-bounded result is displayed.'
        : 'Podporované PDF bylo rozpoznáno lokálně. Osobní údaje zůstávají v soukromém originálu; zobrazuje se jen anonymizovaný, zdrojově omezený výsledek.', 'info');
      window.scrollTo({ top: $('organisation-result').offsetTop, behavior: 'smooth' });
      return;
    }
    revealEvidenceNetwork();
    renderMemory(buildCaseMemory(documents, language));
    const result = analyzeDocumentSet(documents, language);
    if (result.mode === 'map-only') {
      $('analysis-out').hidden = true;
      showStatus(`${UI.mapCreated} ${result.reason}`, 'info');
      window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
      return;
    }
    if (!result.supported) return reject(result);
    showStatus(result.prototypeNotice);
    for (const group of ['facts', 'interpretation', 'uncertainty', 'actions']) renderStatements(group, result[group]);
    $('analysis-out').hidden = false;
    window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
  })();
});
