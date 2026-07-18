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
