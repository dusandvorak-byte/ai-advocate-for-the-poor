import { analyzeDocumentSet, SAMPLE_DOCUMENT } from './analysis.js';
import { buildCaseMemory, DEMO_CASE_DOCUMENTS } from './memory.js';
import { CASE_MEMORY } from './case-memory.js';

const $ = (id) => document.getElementById(id);
const language = document.documentElement.lang === 'en' ? 'en' : 'cs';
let preparedDocuments = [];

const UI = {
  cs: {
    confidence: 'Jistota', documents: 'dokumentů', branches: 'rozpoznaných větví', references: 'spisových značek', dates: 'dat',
    noBranch: 'Zatím nebyla rozpoznána žádná podporovaná větev.', noReference: 'Nebyla rozpoznána žádná spisová značka.', noDate: 'Nebylo rozpoznáno žádné datum.',
    documentReferences: 'spisových značek', documentDates: 'dat', noMetadata: 'Bez rozpoznaných spisových značek a dat', pasted: 'Vložený dokument',
    empty: 'Nejprve vložte text nebo vyberte textové soubory.', demoLoaded: 'Načteny tři jasně označené fiktivní listiny. Klikněte na „Vytvořit mapu případu“.', mapCreated: 'Mapa případu byla vytvořena.'
  },
  en: {
    confidence: 'Confidence', documents: 'documents', branches: 'identified branches', references: 'case references', dates: 'dates',
    noBranch: 'No supported branch has been identified yet.', noReference: 'No case reference was identified.', noDate: 'No date was identified.',
    documentReferences: 'case references', documentDates: 'dates', noMetadata: 'No identified case references or dates', pasted: 'Pasted document',
    empty: 'Paste text or select text files first.', demoLoaded: 'Three clearly labelled fictional documents are loaded. Click “Create case map”.', mapCreated: 'The case map was created.'
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
  for (const record of CASE_MEMORY.verifiedStatements) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = `${record.date} · ${record.reference} · ${record.institution}`;
    const text = document.createElement('p'); text.textContent = record.statement;
    const relation = document.createElement('p'); relation.textContent = `Vazba: ${record.branch}. ${record.proves} ${record.doesNotProve}`;
    const citation = document.createElement('blockquote'); citation.textContent = `„${record.citation}“`;
    card.append(title, text, relation, citation); $('registry-statements').append(card);
  }
  for (const node of CASE_MEMORY.pendingNodes) {
    const item = document.createElement('li'); item.textContent = `${node.reference} — ${node.relation} Stav: ${node.verification}.`;
    $('registry-pending').append(item);
  }
  for (const decision of CASE_MEMORY.jurisprudence) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); const link = document.createElement('a');
    link.href = decision.sourceUrl; link.target = '_blank'; link.rel = 'noreferrer';
    link.textContent = `${decision.court} · ${decision.reference} · ${decision.date}`; title.append(link);
    const principle = document.createElement('p'); principle.textContent = decision.principle;
    const relation = document.createElement('p'); relation.className = 'confidence'; relation.textContent = `Vazba: ${decision.relation}`;
    card.append(title, principle, relation); $('registry-cases').append(card);
  }
  const caseStudy = CASE_MEMORY.caseStudy;
  $('case-study-intro').textContent = `${caseStudy.person} — ${caseStudy.role}. ${caseStudy.evidenceRule}`;
  for (const node of caseStudy.timeline) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = `${node.date} · ${node.actor} · ${node.reference}`;
    const text = document.createElement('p'); text.textContent = node.statement;
    const relation = document.createElement('p'); relation.textContent = `Vazba: ${node.relation}`;
    const source = document.createElement('blockquote'); source.textContent = `${node.level} — Zdroj: ${node.source}, str. ${node.page}.`;
    card.append(title, text, relation, source); $('case-study-timeline').append(card);
  }
  for (const conflict of caseStudy.candidateContradictions) {
    const card = document.createElement('article'); card.className = 'claim';
    const title = document.createElement('h3'); title.textContent = conflict.title;
    const earlier = document.createElement('p'); earlier.textContent = `Dřívější výrok: ${conflict.earlier}`;
    const intermediate = document.createElement('p'); intermediate.textContent = conflict.intermediate ? `Mezilehlý výrok: ${conflict.intermediate}` : '';
    const later = document.createElement('p'); later.textContent = `Pozdější výrok: ${conflict.later}`;
    const status = document.createElement('blockquote'); status.textContent = conflict.status;
    card.append(title, earlier); if (conflict.intermediate) card.append(intermediate); card.append(later, status); $('case-study-conflicts').append(card);
  }
}

renderRegistry();
async function selectedDocuments() {
  const files = [...$('files').files];
  if (files.length) return Promise.all(files.map(async (file) => ({ name: file.name, text: await file.text() })));
  if (preparedDocuments.length) return preparedDocuments;
  return $('doc').value.trim() ? [{ name: UI.pasted, text: $('doc').value }] : [];
}

$('load').addEventListener('click', () => {
  preparedDocuments = [];
  $('files').value = '';
  $('doc').value = SAMPLE_DOCUMENT;
  $('status').hidden = true;
});

$('load-case').addEventListener('click', () => {
  preparedDocuments = DEMO_CASE_DOCUMENTS.map((document) => ({ ...document }));
  $('files').value = '';
  $('doc').value = '';
  showStatus(UI.demoLoaded, 'info');
});

$('files').addEventListener('change', () => {
  preparedDocuments = [];
});

$('doc').addEventListener('input', () => {
  preparedDocuments = [];
});

$('analyse').addEventListener('click', () => {
  void (async () => {
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
