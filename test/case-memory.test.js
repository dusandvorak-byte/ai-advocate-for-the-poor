import test from 'node:test';
import assert from 'node:assert/strict';
import { CASE_MEMORY } from '../web/case-memory.js';

test('verified records contain statement metadata and source citation', () => {
  for (const record of CASE_MEMORY.verifiedStatements) {
    for (const field of ['statement', 'date', 'reference', 'institution', 'branch', 'citation', 'source', 'verification']) {
      assert.ok(record[field], `${record.id} is missing ${field}`);
    }
  }
});

test('unsupported links are explicitly marked as unverified', () => {
  assert.ok(CASE_MEMORY.pendingNodes.length);
  for (const node of CASE_MEMORY.pendingNodes) assert.match(node.verification, /neověřeno|čeká|hypotéza/i);
});

test('jurisprudence has source URL and limited relation', () => {
  assert.ok(CASE_MEMORY.jurisprudence.length >= 5);
  for (const decision of CASE_MEMORY.jurisprudence) {
    assert.match(decision.sourceUrl, /^https:\/\//);
    assert.ok(decision.reference && decision.principle && decision.relation);
  }
});

test('public case study names its consenting author but excludes direct contact identifiers', () => {
  const memory = JSON.stringify(CASE_MEMORY);
  assert.match(memory, /Dušan\s+Dvořák/i);
  assert.doesNotMatch(memory, /(?:datum narození|nar\.\s*\d|datová schránka|ID DS|@|\+420|\b\d{3}\s?\d{3}\s?\d{3}\b)/i);
});

test('case-study nodes separate source level from interpretation', () => {
  assert.equal(CASE_MEMORY.caseStudy.name, 'CannaInsider.eu — 1994 · 2004 · 2008 · 2010 · 2026');
  assert.ok(CASE_MEMORY.caseStudy.timeline.length >= 10);
  for (const node of CASE_MEMORY.caseStudy.timeline) {
    for (const field of ['date', 'actor', 'reference', 'statement', 'relation', 'source', 'page', 'level']) assert.ok(node[field], `timeline node missing ${field}`);
  }
  const police = CASE_MEMORY.verifiedStatements.find((record) => record.id === 'police-first-method-54-2021');
  assert.match(police.proves, /výrok/i);
  assert.match(police.doesNotProve, /nedokládá.*rozpor/i);
  const zin38 = CASE_MEMORY.verifiedStatements.find((record) => record.id === 'ns-zin-38-no-thc-case-law');
  assert.equal(zin38.reference, 'Zin 38/2016');
  assert.match(zin38.doesNotProve, /konkrétní znalecké měření bylo vadné/i);
  assert.match(CASE_MEMORY.caseStudy.candidateContradictions[0].status, /nikoli hotový rozpor/i);
});

test('case-study map distinguishes recorded acts from unique proceedings', () => {
  const metrics = CASE_MEMORY.caseStudy.mapSummary.metrics;
  assert.deepEqual(metrics.map((metric) => metric.value), [31, 10, 29, 70]);
  assert.equal(metrics[0].value + metrics[1].value + metrics[2].value, metrics[3].value);
  assert.match(CASE_MEMORY.caseStudy.mapSummary.status, /Neznamenají 70 samostatných řízení/i);
  for (const metric of metrics) assert.ok(metric.citation && metric.note, 'map metric must include a cited passage and evidence note');
});

test('three intervention actions and the Czech Television suit remain separate branches', () => {
  const branches = CASE_MEMORY.caseStudy.activeCourtBranches;
  assert.equal(branches.filter((branch) => branch.type === 'zásahová žaloba').length, 3);
  assert.ok(branches.some((branch) => /Česká televize/i.test(branch.defendant)));
  for (const branch of branches) {
    for (const field of ['court', 'reference', 'relation', 'citation', 'source', 'verification']) assert.ok(branch[field], `active branch missing ${field}`);
    assert.ok(branch.evidence.length >= 3, 'active branch must list its submitted or related materials');
    assert.doesNotMatch(branch.verification, /potvrzuje pochybení/i);
  }
});

test('public evidence axes separate facts, interpretation, uncertainty and citations', () => {
  const axes = CASE_MEMORY.caseStudy.publicEvidenceAxes;
  assert.equal(axes.length, 3);
  for (const axis of axes) {
    for (const field of ['title', 'fact', 'citation', 'source', 'interpretation', 'uncertainty']) {
      assert.ok(axis[field], `evidence axis missing ${field}`);
    }
  }
  assert.match(axes[0].uncertainty, /automaticky/i);
  assert.match(axes[1].uncertainty, /jen po kontrole celé procesní návaznosti/i);
  assert.match(axes[2].uncertainty, /nedokazuje vadu konkrétního měření/i);
});

test('traffic-light red means urgency, not guilt or predicted success', () => {
  const caseStudy = CASE_MEMORY.caseStudy;
  assert.match(caseStudy.trafficLightRule, /nikoli vinu instituce/i);
  assert.equal(caseStudy.trafficLightLegend.length, 4);
  assert.match(caseStudy.trafficLightLegend[0].meaning, /15 let/i);
  assert.match(caseStudy.publicEvidenceAxes[0].uncertainty, /pracovní hypotéza/i);
});

test('2026 referral tree preserves procedural meaning and source citations', () => {
  const tree = CASE_MEMORY.caseStudy.currentReferralTree;
  assert.match(tree.notice, /Postoupení není věcným vypořádáním/i);
  assert.ok(tree.nodes.length >= 8);
  for (const node of tree.nodes) {
    for (const field of ['date', 'institution', 'reference', 'status', 'citation', 'source', 'audit']) assert.ok(node[field], `referral node missing ${field}`);
  }
});
