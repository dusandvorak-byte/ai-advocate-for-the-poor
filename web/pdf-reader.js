const DEFAULT_MAX_BYTES = 25 * 1024 * 1024;
const DEFAULT_MAX_PAGES = 80;
const DEFAULT_MAX_CHARACTERS = 250_000;

let pdfJsPromise;

async function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import('./vendor/pdfjs/pdf.min.mjs').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        './vendor/pdfjs/pdf.worker.min.mjs',
        import.meta.url
      ).href;
      return pdfjs;
    });
  }
  return pdfJsPromise;
}

function bytesView(bytes) {
  if (bytes instanceof ArrayBuffer) return new Uint8Array(bytes.slice(0));
  if (ArrayBuffer.isView(bytes)) {
    return new Uint8Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  }
  throw new TypeError('PDF input must be an ArrayBuffer or typed-array view.');
}

function pageText(textContent) {
  let text = '';
  for (const item of textContent.items) {
    if (!item || typeof item.str !== 'string') continue;
    text += item.str;
    text += item.hasEOL ? '\n' : ' ';
  }
  return text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function errorCode(error) {
  if (error?.name === 'PasswordException') return 'password-protected';
  if (error?.name === 'InvalidPDFException') return 'invalid-pdf';
  if (error?.name === 'MissingPDFException') return 'missing-pdf';
  return 'unreadable-pdf';
}

export async function extractPdfText(bytes, options = {}) {
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;
  const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
  const maxCharacters = options.maxCharacters ?? DEFAULT_MAX_CHARACTERS;
  const data = bytesView(bytes);

  if (data.byteLength > maxBytes) {
    return {
      status: 'error',
      code: 'file-too-large',
      text: '',
      byteLength: data.byteLength,
      maxBytes,
      pageCount: null,
      pagesRead: 0,
      truncated: false
    };
  }

  let loadingTask;
  let pdf;
  try {
    const pdfjs = await loadPdfJs();
    loadingTask = pdfjs.getDocument({
      data,
      isEvalSupported: false,
      stopAtErrors: false,
      useSystemFonts: true
    });
    pdf = await loadingTask.promise;
    const pagesToRead = Math.min(pdf.numPages, maxPages);
    const pages = [];
    let characterLimitReached = false;

    for (let pageNumber = 1; pageNumber <= pagesToRead; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent({ includeMarkedContent: false });
      const extracted = pageText(content);
      const remaining = maxCharacters - pages.join('\n\n').length;
      if (remaining <= 0) {
        characterLimitReached = true;
        break;
      }
      pages.push(extracted.slice(0, remaining));
      if (extracted.length > remaining) {
        characterLimitReached = true;
        break;
      }
    }

    const text = pages.filter(Boolean).join('\n\n').trim();
    const truncated = characterLimitReached || pagesToRead < pdf.numPages;
    return {
      status: text ? 'ok' : 'no-text',
      code: text ? null : 'no-text-layer',
      text,
      byteLength: data.byteLength,
      pageCount: pdf.numPages,
      pagesRead: pages.length,
      truncated,
      maxPages,
      maxCharacters
    };
  } catch (error) {
    return {
      status: 'error',
      code: errorCode(error),
      text: '',
      byteLength: data.byteLength,
      pageCount: null,
      pagesRead: 0,
      truncated: false
    };
  } finally {
    if (typeof pdf?.destroy === 'function') await pdf.destroy();
    else if (typeof loadingTask?.destroy === 'function') await loadingTask.destroy();
  }
}

export const PDF_READER_LIMITS = Object.freeze({
  maxBytes: DEFAULT_MAX_BYTES,
  maxPages: DEFAULT_MAX_PAGES,
  maxCharacters: DEFAULT_MAX_CHARACTERS
});
