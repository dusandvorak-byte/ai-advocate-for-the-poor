import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const requiredIds = [
  'post-submission', 'latest-update-title', 'latest-update-summary', 'current-audience', 'show-latest-update',
  'version-history', 'version-0', 'case-input-metrics', 'latest-priority',
  'latest-deadline', 'traffic-scale', 'daily-version-history', 'daily-version-rule',
  'test-period-history', 'test-period-rule',
  'case-portfolio', 'case-portfolio-title', 'case-portfolio-introduction', 'case-test-history',
  'case-research-label', 'case-specific-motto', 'case-specific-context', 'case-author-position', 'case-author-baseline', 'case-system-question',
  'case-answer-rule', 'case-portfolio-rows', 'shared-methodology-title',
  'shared-methodology-explanation', 'shared-methodology-short-argument', 'shared-methodology-timeline',
  'shared-methodology-audit-title', 'shared-methodology-audit-trail',
  'case-portfolio-science-sources', 'case-portfolio-legal-sources', 'case-portfolio-boundary',
  'gf-jk-procedural-update', 'gf-jk-update-heading', 'gf-jk-update-summary', 'gf-jk-main-sentence',
  'case-branch-rows', 'gf-jk-priority-rows', 'gf-jk-official-facts', 'gf-jk-party-claims',
  'gf-jk-legal-sources', 'gf-jk-evidence-boundary',
  'mk-jk-reopening-update', 'mk-jk-update-heading', 'mk-jk-update-summary', 'mk-jk-source-inventory',
  'mk-jk-update-overall', 'mk-jk-court-path', 'mk-jk-official-findings', 'mk-jk-submitted-claims',
  'mk-jk-alliance-context', 'mk-jk-comparison', 'mk-jk-next-evidence', 'mk-jk-evidence-boundary',
  'prisoner-reopening-update', 'prisoner-update-heading', 'prisoner-update-summary',
  'prisoner-update-overall', 'prisoner-public-context', 'prisoner-court-path', 'prisoner-source-facts',
  'prisoner-author-baseline', 'prisoner-comparison', 'prisoner-rewrite', 'prisoner-evidence-boundary',
  'alliance-update', 'alliance-update-heading', 'alliance-update-summary',
  'deduplication-update', 'annual-report-update', 'register-context-update', 'enforcement-update',
  'district-court-update', 'alliance-author-assessment', 'alliance-evidence-boundary',
  'alliance-update-v22', 'police-update', 'latest-link-list', 'prototype-laboratory', 'open-external-test',
  'files', 'requested-remedy', 'load', 'load-case', 'doc', 'analyse', 'status', 'memory-out',
  'memory-summary', 'branches', 'memory-documents', 'memory-references',
  'memory-dates', 'memory-limitations', 'analysis-out', 'facts',
  'interpretation', 'uncertainty', 'actions', 'institutional-map',
  'case-map-title', 'case-map-notice', 'case-metrics',
  'case-groups', 'case-relations-title', 'case-relations', 'case-timeline-title',
  'case-timeline', 'registry', 'registry-statements', 'registry-pending', 'registry-cases',
  'case-study', 'case-study-name', 'case-study-intro', 'case-study-map', 'case-study-active',
  'case-study-timeline', 'case-study-conflicts', 'evidence-document',
  'case-study-traffic-light', 'case-study-axes', 'case-study-referrals', 'everyday-impact',
  'run-internal-test', 'integration-test', 'integration-title', 'integration-scope',
  'integration-metrics', 'integration-document', 'integration-decision', 'integration-proves',
  'integration-limits', 'integration-propagation-title', 'integration-propagation-rule',
  'integration-propagation', 'integration-integrity-title', 'integration-integrity-summary',
  'integration-integrity-findings', 'integration-integrity-rule', 'integration-legend', 'integration-drafts',
  'integration-relevance', 'integration-human-checks', 'sent-output', 'sent-president',
  'sent-msp', 'sent-ncoz', 'internal-before-after', 'external-test', 'load-organisation-sample', 'organisation-source',
  'load-police-sample', 'police-source',
  'generic-result', 'generic-result-summary', 'generic-documents', 'generic-result-boundary',
  'priority-queue-section', 'priority-queue-summary', 'priority-queue',
  'organisation-result', 'organisation-title', 'organisation-scope', 'organisation-source-card',
  'organisation-priority', 'organisation-systemic-finding',
  'organisation-comparison', 'organisation-solution',
  'organisation-facts', 'organisation-creator-record', 'organisation-creator-chronology',
  'organisation-author-statement', 'organisation-limits',
  'organisation-relevance', 'organisation-human-checks'
];

test('Czech and English pages expose the same complete interactive surface', async () => {
  const [cs, en] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8')
  ]);

  assert.match(cs, /<html lang="cs">/);
  assert.match(en, /<html lang="en">/);
  assert.match(cs, /href="en\.html"/);
  assert.match(en, /href="index\.html"/);

  for (const html of [cs, en]) {
    for (const id of requiredIds) {
      const occurrences = html.match(new RegExp(`id="${id}"`, 'g')) || [];
      assert.equal(occurrences.length, 1, `Expected exactly one #${id}`);
    }
    assert.match(html, /<script type="module" src="app\.js"><\/script>/);
    assert.match(html, /href="traffic-light\.css"/);
    assert.match(html, /id="status"[^>]*role="status"/);
    assert.match(html, /id="files"[^>]*accept="[^"]*\.pdf/);
  }
});

test('source document precedes the initially collapsed evidence network', async () => {
  const html = await readFile(new URL('../web/index.html', import.meta.url), 'utf8');
  assert.match(html, /<details id="prototype-laboratory" class="prototype-laboratory">/);
  assert.doesNotMatch(html, /<details id="prototype-laboratory"[^>]*\sopen/);
  assert.match(html, /id="registry" hidden/);
  assert.match(html, /id="case-study" hidden/);
  assert.match(html, /id="evidence-document"/);
});

test('the homepage leads with the post-submission evidence update in both languages', async () => {
  const [cs, en] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8')
  ]);

  for (const html of [cs, en]) {
    assert.ok(html.indexOf('id="post-submission"') < html.indexOf('class="mission"'));
    assert.ok(html.indexOf('id="current-audience"') < html.indexOf('class="judge-test-cta"'));
    assert.match(html, /id="version-history"/);
    assert.match(html, /id="case-input-metrics"/);
    assert.match(html, /id="traffic-scale"/);
    assert.match(html, /id="latest-priority"/);
    assert.match(html, /id="latest-deadline"/);
    assert.match(html, /archive\/submission-2026-07-20/);
    assert.match(html, /police-notice-public-derivative-2026-07-20\.pdf/);
    assert.match(html, /id="alliance-update"/);
    assert.match(html, /id="prisoner-reopening-update"/);
    assert.match(html, /id="mk-jk-reopening-update"/);
    assert.ok(html.indexOf('id="mk-jk-reopening-update"') < html.indexOf('id="prisoner-reopening-update"'));
    assert.ok(html.indexOf('id="prisoner-reopening-update"') < html.indexOf('id="alliance-update"'));
    assert.match(html, /7 (?:jedinečných zdrojových PDF zůstává neveřejných|unique source PDFs remain unpublished)/);
  }
  assert.match(cs, /V0 jsou data.*V1.*V2.*V3/i);
  assert.match(cs, /DEVÍTISTUPŇOVÝ SEMAFOR/);
  assert.match(en, /V0 is the data.*V1.*V2.*V3/i);
  assert.match(en, /NINE-LEVEL TRAFFIC LIGHT/);
  assert.match(cs, /AUTOREM POTVRZENÁ CHRONOLOGIE/);
  assert.match(cs, /více než patnácti letech.*věcnou odpověď/i);
  assert.match(cs, /Pro každého, kdo potřebuje porozumět vlastním dokumentům a neztratit svůj příběh/i);
  assert.match(cs, /praktický nástroj demokracie a solidarity/i);
  assert.match(cs, /Nezaručuje úspěch, nezakládá právní nárok a nenahrazuje odborníka/i);
  assert.match(cs, /Rozsáhlé konopné spisy jsou pouze náročnou řízenou testovací sadou/i);
  assert.match(en, /CREATOR-CONFIRMED CHRONOLOGY/);
  assert.match(en, /English translation: “placed on file without further action/);
  assert.match(en, /Anyone who needs to understand their own documents without losing their story/i);
  assert.match(en, /practical infrastructure for democracy and solidarity/i);
  assert.match(en, /does not guarantee success, create a legal entitlement, or replace a professional/i);
  assert.match(en, /cannabis records are only a demanding controlled test set/i);
  assert.match(cs, /Návrh na obnovu L\. CH\..*9\/9 relevance/i);
  assert.match(en, /L\. CH\.’s 2022 motion to reopen.*9\/9 relevance/i);
  assert.match(cs, /Případ M\. K\. a J\. K\..*společný nový důkaz 9\/9.*EXTRÉM, HOŘÍ/i);
  assert.match(en, /M\. K\. and J\. K\. case.*shared new evidence 9\/9.*EXTREME, ON FIRE/i);
  assert.match(cs, /DATOVANÁ PAMĚŤ TESTŮ/);
  assert.match(en, /DATED TEST MEMORY/);
});

test('both homepages expose black 0/9, weakest green 1/9, local processing, and the OCR boundary', async () => {
  const [cs, en, app] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/app.js', import.meta.url), 'utf8')
  ]);

  assert.match(cs, /černý bod 0\/9/i);
  assert.match(cs, /1\/9 zelený/i);
  assert.match(cs, /pouze lokálně v prohlížeči/i);
  assert.match(cs, /sken bez textové vrstvy.*OCR/i);
  assert.match(cs, /právním střetem ve věci konopí.*citovaná fakta.*důkazní kandidáty.*zvolenou či textem naznačenou cestu/i);
  assert.match(cs, /id="requested-remedy"[\s\S]*value="reopening"[\s\S]*value="intervention-action"[\s\S]*value="compensation"[\s\S]*value="other"/i);
  assert.match(en, /black 0\/9 dot/i);
  assert.match(en, /green 1\/9/i);
  assert.match(en, /only in the browser/i);
  assert.match(en, /image-only scan.*OCR/i);
  assert.match(en, /cannabis-related legal conflict.*quoted facts.*evidence candidates.*selected or textually indicated route/i);
  assert.match(en, /id="requested-remedy"[\s\S]*value="reopening"[\s\S]*value="intervention-action"[\s\S]*value="compensation"[\s\S]*value="other"/i);
  assert.match(app, /renderGenericFallback\(documents\)/);
  assert.match(app, /renderSharedCannabisEvidence/);
  assert.match(app, /const requestedRemedy = \$\('requested-remedy'\)\.value/);
  assert.match(app, /analyzeGenericDocuments\(routed, language\)/);
  assert.match(app, /recognized\.every\(\(\{ inputKind \}\) => inputKind\)/);
  assert.doesNotMatch(app, /generic-document-card[\s\S]{0,500}innerHTML/);
});

test('the exact submission website remains available as a dated immutable archive', async () => {
  const manifest = JSON.parse(await readFile(new URL('../web/archive/submission-2026-07-20/archive-manifest.json', import.meta.url), 'utf8'));
  assert.equal(manifest.sourceCommit, '2238ae2736a6e13c2c93ecf06288a9f06604903f');
  assert.equal(manifest.submissionDate, '2026-07-20');

  for (const [path, digest] of Object.entries(manifest.coreSha256)) {
    const bytes = await readFile(new URL(`../web/archive/submission-2026-07-20/${path}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), digest, `Archive digest mismatch: ${path}`);
  }
});

test('Pages deployment runs tests and publishes only the reviewed web directory', async () => {
  const workflow = await readFile(new URL('../.github/workflows/static.yml', import.meta.url), 'utf8');
  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /needs: test/);
  assert.match(workflow, /path: '\.\/web'/);
  assert.doesNotMatch(workflow, /path: ['"]?\.['"]?\s*$/m);
});

test('browser rendering never shadows the global document object', async () => {
  const app = await readFile(new URL('../web/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /for\s*\(const\s+document\s+of/);
  assert.match(app, /from ['"]\.\/case-map\.js['"]/);
  assert.match(app, /const entry = document\.createElement\('li'\)/);
});

test('English evidence preserves the Czech quote and adds a labelled translation', async () => {
  const { localizeCaseMemory } = await import('../web/case-memory-en.js');
  const { CASE_MEMORY } = await import('../web/case-memory.js');
  const english = localizeCaseMemory(CASE_MEMORY, 'en');
  const app = await readFile(new URL('../web/app.js', import.meta.url), 'utf8');
  assert.equal(english.verifiedStatements[0].originalCitation, CASE_MEMORY.verifiedStatements[0].citation);
  assert.match(english.verifiedStatements[0].citationTranslation, /Supreme Court/i);
  assert.match(english.caseStudy.publicEvidenceAxes[0].citationTranslation, /technical regulation/i);
  assert.match(english.caseStudy.currentReferralTree.nodes[2].citationTranslation, /refer/i);
  assert.match(app, /English translation/);
});

test('published real-world outputs are exact files with recorded provenance', async () => {
  const manifest = JSON.parse(await readFile(new URL('../web/documents/manifest.json', import.meta.url), 'utf8'));
  assert.equal(manifest.documents.length, 3);

  for (const item of manifest.documents) {
    const bytes = await readFile(new URL(`../web/documents/${item.path}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256);
    assert.equal(item.sentDate, '2026-07-19');
    assert.equal(item.documentDate, '2026-07-19');
  }

  assert.equal(manifest.privacyPreservingDerivatives.length, 2);
  for (const item of manifest.privacyPreservingDerivatives) {
    const bytes = await readFile(new URL(`../web/documents/${item.path}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256);
    assert.equal(item.privateOriginalPublished, false);
  }
});

test('both public languages link all three sent PDFs without overstating Codex role', async () => {
  const [cs, en] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8')
  ]);
  const paths = [
    'documents/president-submission-2026-07-19.pdf',
    'documents/municipal-court-msp-submission-2026-07-19.pdf',
    'documents/municipal-court-ncoz-submission-2026-07-19.pdf'
  ];

  for (const html of [cs, en]) {
    for (const path of paths) assert.match(html, new RegExp(path.replaceAll('.', '\\.')));
    assert.match(html, /Codex/);
    assert.doesNotMatch(html, /Codex (filed|submitted|represented|odeslal|podal|zastupoval)/i);
  }
  assert.match(cs, /Dokument i odeslání: 19\. 7\. 2026/);
  assert.match(en, /Document and dispatch: 19 July 2026/);
});
