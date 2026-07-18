import { analyzeDocument, SAMPLE_DOCUMENT } from './analysis.js';

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
  $('out').hidden = true;
  $('status').hidden = false;
  $('status').className = 'status error';
  $('status').textContent = result.reason;
}

$('load').addEventListener('click', () => {
  $('doc').value = SAMPLE_DOCUMENT;
  $('status').hidden = true;
});

$('analyse').addEventListener('click', () => {
  const result = analyzeDocument($('doc').value);
  if (!result.supported) return reject(result);
  $('status').hidden = false;
  $('status').className = 'status warning';
  $('status').textContent = result.prototypeNotice;
  for (const group of ['facts', 'interpretation', 'uncertainty', 'actions']) renderStatements(group, result[group]);
  $('out').hidden = false;
  window.scrollTo({ top: $('status').offsetTop, behavior: 'smooth' });
});
