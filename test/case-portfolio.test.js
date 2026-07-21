import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CASE_MEMORY } from '../web/case-memory.js';
import { GF_JK_SOURCE_EXCERPTS } from '../web/gf-jk-procedural-update.js';
import { CASE_PORTFOLIO, localizeCasePortfolio } from '../web/case-portfolio.js';

test('the controlled portfolio contains four separate people-specific cases', () => {
  const portfolio = localizeCasePortfolio('cs');
  assert.equal(portfolio.version, 'v2.7');
  assert.deepEqual(portfolio.cases.map(({ id }) => id), ['dd', 'lch', 'mk-jk', 'gf-jk']);
  assert.equal(new Set(portfolio.cases.map(({ link }) => link)).size, 4);
  assert.ok(portfolio.cases.every(({ score, trafficBand }) => score === 9 && trafficBand === 'red-3'));
  assert.match(portfolio.introduction, /náročnou.*kontrolní sad/i);
  assert.match(portfolio.introduction, /konopí není tématem služby/i);
});

test('testing history distinguishes the creator archive before submission from other files after submission', () => {
  const history = localizeCasePortfolio('cs').testHistory;
  assert.equal(history.length, 2);
  assert.match(history[0].period, /Do podání.*20\. 7\. 2026/i);
  assert.match(history[0].statement, /vlastních spisech autora/i);
  assert.match(history[1].period, /Po podání.*před uzávěrkou/i);
  assert.match(history[1].statement, /aliance Cannabis is The Cure/i);
});

test('the author-confirmed baseline is forceful but remains provenance-labelled', () => {
  const question = localizeCasePortfolio('cs').researchQuestion;
  assert.match(question.motto, /Od roku 1993.*obsahu THC.*právně závazný předpis.*legální konopí od nelegálního/i);
  assert.match(question.mottoContext, /čl\. 36 a 39 Listiny.*EU od roku 2004.*do roku 1999.*limit THC.*100 m² bez povolení/i);
  assert.match(question.authorPosition, /nikdo zbaven svobody.*právně určitý.*přezkoumatelný postup/i);
  assert.match(question.controlledTestBaseline, /ve všech čtyřech.*nadlimitní THC/i);
  assert.match(question.controlledTestBaseline, /nebyl poškozený člověk, odcizená věc ani podvod/i);
  assert.match(question.controlledTestBaseline, /povolení, které stát nevydával.*překročení limitu THC/i);
  assert.match(question.controlledTestBaseline, /laboratorním postupem policejního znalce.*THCA na THC/i);
  assert.match(question.controlledTestBaseline, /Žádný z dotčených soudů neposoudil/i);
  assert.match(question.controlledTestBaseline, /nevyžádal právně závazný předpis ani úplnou laboratorní protokolaci/i);
  assert.match(question.controlledTestBaseline, /EU, UNODC a ENFSI/i);
  assert.match(question.controlledTestBaseline, /všech čtyř kauz: 9\/9 — EXTRÉM, HOŘÍ/i);
  assert.doesNotMatch(question.controlledTestBaseline, /údajně nadlimitní/i);
});

test('the system asks for a case-specific procedural window and never guarantees universal release', () => {
  const portfolio = localizeCasePortfolio('cs');
  assert.match(portfolio.researchQuestion.systemQuestion, /procesní.*okénko.*každém konkrétním.*spise/i);
  assert.match(portfolio.researchQuestion.answerRule, /pro každého člověka zvlášť/i);
  assert.match(portfolio.researchQuestion.answerRule, /semafor sám nikoho nepropouští ani nezaručuje obnovu/i);
  assert.match(portfolio.boundary, /není.*procento úspěchu.*určení viny.*právní nárok/i);
});

test('each case presents supplied sources and legal axes without lowering common relevance', () => {
  const cases = new Map(localizeCasePortfolio('cs').cases.map((item) => [item.id, item]));
  for (const item of cases.values()) {
    for (const key of ['sourceCount', 'status', 'headline', 'mainCandidate', 'article39', 'eu']) assert.ok(item[key], `${item.id} lacks ${key}`);
    assert.equal(item.score, 9);
    assert.equal(item.trafficBand, 'red-3');
  }
  assert.match(cases.get('dd').sourceCount, /70.*6.*3/i);
  assert.match(cases.get('lch').sourceCount, /desetistránkový.*2.*3/i);
  assert.match(cases.get('mk-jk').status, /společný nový důkaz.*9\/9.*pravděpodobnost.*neurčuje/i);
  assert.match(cases.get('mk-jk').headline, /9\/9.*HOŘÍ.*§ 278 odst\. 4/i);
  assert.match(cases.get('gf-jk').status, /podmíněné zastavení trestního stíhání.*není odsouzením.*oddělen.*9\/9/i);
});

test('the shared methodology timeline distinguishes direct records from attributed or quoted inputs', () => {
  const timeline = localizeCasePortfolio('cs').sharedMethodology.timeline;
  assert.equal(timeline.length, 5);
  assert.match(timeline[0].sourceStatus, /pozdějším podání.*původní listiny.*nejsou/i);
  assert.match(timeline[1].sourceStatus, /přímo ověřená úřední listina/i);
  assert.match(timeline[2].sourceStatus, /přímo ověřená úřední listina/i);
  assert.match(timeline[3].sourceStatus, /přímo ověřená úřední listina/i);
  assert.match(timeline[4].sourceStatus, /citovaný v podání/i);

  const memoryCitations = CASE_MEMORY.verifiedStatements.map(({ citation }) => citation);
  assert.ok(memoryCitations.includes(timeline[1].citation));
  assert.ok(memoryCitations.includes(timeline[2].citation));
  assert.ok(GF_JK_SOURCE_EXCERPTS.ksz.includes(timeline[3].citation));
});

test('the short argument reaches 2026 and separates THCA conversion from proof of a particular defect', () => {
  const shared = localizeCasePortfolio('cs').sharedMethodology;
  assert.match(shared.shortArgument, /THCA na THC.*ani v roce 2026.*centrálně sjednocen/i);
  assert.match(shared.shortArgument, /SOP.*THC\/THCA.*nelze plně zpětně zkontrolovat/i);
  assert.equal(shared.scientificSources.length, 2);
  assert.ok(shared.scientificSources.every(({ url }) => /^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\//.test(url)));
  assert.ok(shared.scientificSources.every(({ limitation }) => /nedokládá|nikoli právní závěr/i.test(limitation)));
  assert.equal(shared.auditTrail.length, 8);
  assert.match(shared.auditTrail.join(' '), /právní základ.*SOP.*řetězec.*vzorkování.*THC.*THCA.*chromatogram.*nejistot.*reviz/i);
});

test('the public pages lead with a universal mission and hide portfolio detail behind drawers', async () => {
  const [cs, en, app, styles] = await Promise.all([
    readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/en.html', import.meta.url), 'utf8'),
    readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../web/styles.css', import.meta.url), 'utf8')
  ]);
  assert.match(cs, /Když víte, co se stalo, ale zatím to nemůžete dokázat/);
  assert.match(cs, /Tato paměť má patřit člověku/);
  assert.match(en, /When you know what happened but cannot yet prove it/);
  assert.match(en, /That memory should belong to the person/);
  for (const html of [cs, en]) {
    assert.ok(html.indexOf('class="human-story"') < html.indexOf('id="case-portfolio"'));
    assert.match(html, /id="case-portfolio-rows"/);
    assert.match(html, /class="shared-question-drawer"/);
    assert.match(html, /0\/9/);
  }
  assert.match(app, /localizeCasePortfolio/);
  assert.match(app, /renderCasePortfolio\(\)/);
  assert.match(app, /target instanceof HTMLDetailsElement.*target\.open = true/s);
  assert.match(styles, /\.portfolio-case>summary/);
});
