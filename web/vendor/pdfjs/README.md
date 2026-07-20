# PDF.js browser runtime

This directory contains the unmodified minified legacy browser build of
[`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist) version `6.1.200`.
It is loaded only when a visitor selects a PDF that is not one of the
fingerprint-bound prepared samples.

- License: Apache-2.0 (see `LICENSE`)
- `pdf.min.mjs` SHA-256: `1aa1611025bfb69ddebf9410ae4a7a8c269828496bd57d2fb9aacc66d09da0a3`
- `pdf.worker.min.mjs` SHA-256: `30237a42aa8bde8d87770bc5b55848d792953d6f1befe5958dc61314b3a67d51`

The selected PDF remains in the visitor's browser. PDF.js extracts only the
available text layer; it does not provide OCR for image-only scans.
