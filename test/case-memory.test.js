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

test('public case memory does not contain the data subject name', () => {
  assert.doesNotMatch(JSON.stringify(CASE_MEMORY), /Dušan\s+Dvořák/i);
});
