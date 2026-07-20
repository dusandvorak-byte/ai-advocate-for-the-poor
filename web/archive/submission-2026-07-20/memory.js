const REFERENCE_PATTERN = /\b(?:\d+\s*)?[A-ZČĚŠŘŽÝÁÍÉÚŮ]{1,8}\s*\d+\/\d{2,4}(?:\s*-\s*\d+)?\b/giu;
const DATE_PATTERNS = [
  /\b\d{1,2}\.\s*\d{1,2}\.\s*\d{4}\b/g,
  /\b\d{1,2}\.\s*(?:ledna|února|března|dubna|května|června|července|srpna|září|října|listopadu|prosince)\s+\d{4}\b/giu
];

const BRANCH_RULES = [
  { id: 'laboratory', label: { cs: 'Laboratorní a THC důkazy', en: 'Laboratory and THC evidence' }, pattern: /\b(?:THC|tetrahydrokanabinol|OKTE|laborator|chromatograf|vzorek|měření)\w*/iu },
  { id: 'court', label: { cs: 'Soudní rozhodnutí', en: 'Court decisions' }, pattern: /\b(?:rozsudek|usnesení|soud|odsouzen|trest)\w*/iu },
  { id: 'procedure', label: { cs: 'Procesní postup institucí', en: 'Procedural actions by institutions' }, pattern: /\b(?:postoupen|vyhodnocení|opatření|státní zastupitelství|policejní orgán)\w*/iu },
  { id: 'health', label: { cs: 'Zdravotní souvislosti', en: 'Health context' }, pattern: /\b(?:zdravot|diagnóz|lékař|nemoc|postižení)\w*/iu }
];

const unique = (values) => [...new Set(values.map((value) => value.replace(/\s+/g, ' ').trim()))];

export function buildCaseMemory(documents, language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const normalized = documents
    .map((document, index) => ({
      id: `document-${index + 1}`,
      name: document.name || `Dokument ${index + 1}`,
      text: String(document.text ?? '').replace(/\r\n/g, '\n').trim()
    }))
    .filter((document) => document.text);

  const branches = BRANCH_RULES.map((rule) => ({
    id: rule.id,
    label: rule.label[lang],
    documents: normalized.filter((document) => rule.pattern.test(document.text)).map(({ id, name }) => ({ id, name }))
  })).filter((branch) => branch.documents.length);

  const records = normalized.map((document) => {
    const references = unique(document.text.match(REFERENCE_PATTERN) || []);
    const dates = unique(DATE_PATTERNS.flatMap((pattern) => document.text.match(pattern) || []));
    return { ...document, references, dates };
  });

  return {
    documents: records,
    branches,
    references: unique(records.flatMap(({ references }) => references)),
    dates: unique(records.flatMap(({ dates }) => dates)),
    limitations: lang === 'en' ? [
      'Automatic classification is indicative and must be confirmed by a person.',
      'This stage does not verify the scientific validity of laboratory measurements or the legality of decisions.',
      'General PDF files and photographs currently require text conversion; one exact supported PDF follows a separate fingerprint-bound path. OCR is planned for a later stage.'
    ] : [
      'Automatické zařazení je orientační a musí je potvrdit člověk.',
      'Tato etapa neověřuje odbornou správnost laboratorního měření ani zákonnost rozhodnutí.',
      'Obecná PDF a fotografie zatím vyžadují převod do textu; jedna přesně podporovaná PDF listina používá samostatnou cestu vázanou na digitální otisk. OCR je plánovaná další vrstva.'
    ]
  };
}
