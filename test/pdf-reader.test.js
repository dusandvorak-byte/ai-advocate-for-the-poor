import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { extractPdfText, PDF_READER_LIMITS } from '../web/pdf-reader.js';

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');

test('the vendored PDF.js runtime is pinned, licensed, and byte-verified', async () => {
  const [runtime, worker, license, readme] = await Promise.all([
    readFile(new URL('../web/vendor/pdfjs/pdf.min.mjs', import.meta.url)),
    readFile(new URL('../web/vendor/pdfjs/pdf.worker.min.mjs', import.meta.url)),
    readFile(new URL('../web/vendor/pdfjs/LICENSE', import.meta.url), 'utf8'),
    readFile(new URL('../web/vendor/pdfjs/README.md', import.meta.url), 'utf8')
  ]);

  assert.equal(digest(runtime), '1aa1611025bfb69ddebf9410ae4a7a8c269828496bd57d2fb9aacc66d09da0a3');
  assert.equal(digest(worker), '30237a42aa8bde8d87770bc5b55848d792953d6f1befe5958dc61314b3a67d51');
  assert.match(license, /Apache License\s+Version 2\.0/i);
  assert.match(readme, /pdfjs-dist.*6\.1\.200/is);
});

test('the local PDF reader extracts the text layer from a reviewed public PDF', async () => {
  const bytes = await readFile(new URL('../web/documents/police-notice-public-derivative-2026-07-20.pdf', import.meta.url));
  const result = await extractPdfText(bytes);
  const normalized = result.text.replace(/\s+/g, ' ');

  assert.equal(result.status, 'ok');
  assert.equal(result.pageCount, 1);
  assert.equal(result.pagesRead, 1);
  assert.match(normalized, /Předžalobní výzva Mgr\. Dušana Dvořáka/i);
  assert.match(normalized, /bez přijetí dalšího opatření uloženo/i);
});

test('the PDF reader rejects an oversized input before parsing it', async () => {
  const result = await extractPdfText(new Uint8Array(8), { maxBytes: 4 });

  assert.equal(result.status, 'error');
  assert.equal(result.code, 'file-too-large');
  assert.equal(result.byteLength, 8);
  assert.equal(result.pagesRead, 0);
});

test('the PDF reader returns a bounded error instead of exposing parser details', async () => {
  const result = await extractPdfText(new TextEncoder().encode('not a pdf'));

  assert.equal(result.status, 'error');
  assert.match(result.code, /invalid-pdf|unreadable-pdf/);
  assert.equal(result.text, '');
  assert.equal(PDF_READER_LIMITS.maxPages, 80);
  assert.equal(PDF_READER_LIMITS.maxCharacters, 250000);
});
