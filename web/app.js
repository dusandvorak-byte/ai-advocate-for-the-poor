import { analyzeDocumentSet, SAMPLE_DOCUMENT } from './analysis.js';
import { buildCaseMemory } from './memory.js';
import { localizeInstitutionalCaseMap } from './case-map.js';

const $ = (id) => document.getElementById(id);
const language = document.documentElement.lang === 'en' ? 'en' : 'cs';
let preparedDocuments = [];
let preparedInstitutionalMap = false;

const UI = {
  cs: {
    confidence: 'Jistota', documents: 'dokumentů', branches: 'rozpoznaných větví', references: 'spisových značek', dates: 'dat',
    noBranch: 'Zatím nebyla rozpoznána žádná podporovaná větev.', noReference: 'Nebyla rozpoznána žádná spisová značka.', noDate: 'Nebylo rozpoznáno žádné datum.',
    documentReferences: 'spisových značek', documentDates: 'dat', noMetadata: 'Bez rozpoznaných spisových značek a dat', pasted: 'Vložený dokument',
    empty: 'Nejprve vložte text nebo vyberte textové soubory.', demoLoaded: 'Načtena anonymizovaná institucionální mapa případu 2004–2026. Klikněte na „Vytvořit mapu případu“.', mapCreated: 'Mapa případu byla vytvořena.',
    indexed: 'indexováno v projektových podkladech', creatorStated: 'tvrzení autora — připojit anonymizovaný pramen', relations: 'Vazby mezi institucemi', timeline: 'Časová osa', evidenceStatus: 'Stav zdroje'
  },
  en: {
    confidence: 'Confidence', documents: 'documents', branches: 'identified branches', references: 'case references', dates: 'dates',
    noBranch: 'No supported branch has been identified yet.', noReference: 'No case reference was identified.', noDate: 'No date was identified.',
    documentReferences: 'case references', documentDates: 'dates', noMetadata: 'No identified case references or dates', pasted: 'Pasted document',
    empty: 'Paste text or select text files first.', demoLoaded: 'The anonymized 2004–2026 institutional case map is loaded. Click “Create case map”.', mapCreated: 'The case map was created.',
    indexed: 'indexed in project materials', creatorStated: 'creator-stated — attach anonymized source', relations: 'Institutional relationships', timeline: 'Timeline', evidenceStatus: 'Source status'
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

async function selectedDocuments() {
  const files = [...$('files').files];
  if (files.length) return Promise.all(files.map(async (file) => ({ name: file.name, text: await file.text() })));
  if (preparedDocuments.length) return preparedDocuments;
  return $('doc').value.trim() ? [{ name: UI.pasted, text: $('doc').value }] : [];
}

$('load').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
  $('files').value = '';
  $('doc').value = SAMPLE_DOCUMENT;
  $('status').hidden = true;
});

$('load-case').addEventListener('click', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = true;
  $('files').value = '';
  $('doc').value = '';
  showStatus(UI.demoLoaded, 'info');
});

$('files').addEventListener('change', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
});

$('doc').addEventListener('input', () => {
  preparedDocuments = [];
  preparedInstitutionalMap = false;
  $('institutional-map').hidden = true;
});

$('analyse').addEventListener('click', () => {
  void (async () => {
    if (preparedInstitutionalMap) {
      renderInstitutionalMap(localizeInstitutionalCaseMap(language));
      showStatus(UI.mapCreated, 'info');
      window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
      return;
    }
    const documents = await selectedDocuments();
    if (!documents.length) return reject({ reason: UI.empty });
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
