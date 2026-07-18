import { analyzeDocument, SAMPLE_DOCUMENT } from './analysis.js';
import { buildCaseMemory } from './memory.js';

const $ = (id) => document.getElementById(id);

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
    confidence.textContent = `Jistota: ${item.confidence}`;
    const citation = document.createElement('blockquote');
    citation.textContent = `„${item.citation}“`;
    card.append(claim, confidence, citation);
    target.append(card);
  }
}

function reject(result) {
  $('analysis-out').hidden = true;
  $('status').hidden = false;
  $('status').className = 'status error';
  $('status').textContent = result.reason;
}

function renderMemory(memory) {
  $('memory-summary').textContent = `${memory.documents.length} dokumentů · ${memory.branches.length} rozpoznaných větví · ${memory.references.length} spisových značek · ${memory.dates.length} dat`;
  const target = $('branches');
  target.replaceChildren();
  for (const branch of memory.branches) {
    const card = document.createElement('article');
    card.className = 'branch';
    const heading = document.createElement('h3');
    heading.textContent = branch.label;
    const list = document.createElement('ul');
    for (const document of branch.documents) {
      const entry = document.createElement('li');
      entry.textContent = document.name;
      list.append(entry);
    }
    card.append(heading, list);
    target.append(card);
  }
  if (!memory.branches.length) target.textContent = 'Zatím nebyla rozpoznána žádná podporovaná větev.';
  $('memory-out').hidden = false;
}

async function selectedDocuments() {
  const files = [...$('files').files];
  if (files.length) return Promise.all(files.map(async (file) => ({ name: file.name, text: await file.text() })));
  return $('doc').value.trim() ? [{ name: 'Vložený dokument', text: $('doc').value }] : [];
}

$('load').addEventListener('click', () => {
  $('doc').value = SAMPLE_DOCUMENT;
  $('status').hidden = true;
});

$('analyse').addEventListener('click', () => {
  void (async () => {
  const documents = await selectedDocuments();
  if (!documents.length) return reject({ reason: 'Nejprve vložte text nebo vyberte textové soubory.' });
  renderMemory(buildCaseMemory(documents));
  const result = documents.length === 1 ? analyzeDocument(documents[0].text) : { supported: false, reason: 'Mapa archivu byla vytvořena. Ověřená právní interpretace je v této etapě dostupná pouze pro samostatnou ukázku KSZ Ostrava.' };
  if (!result.supported) return reject(result);
  $('status').hidden = false;
  $('status').className = 'status warning';
  $('status').textContent = result.prototypeNotice;
  for (const group of ['facts', 'interpretation', 'uncertainty', 'actions']) renderStatements(group, result[group]);
  $('analysis-out').hidden = false;
  window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
  })();
});
