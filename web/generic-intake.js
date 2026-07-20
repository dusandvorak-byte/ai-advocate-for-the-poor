import { analyzeCannabisLegalConflict } from './shared-cannabis-evidence.js';

const text = (cs, en) => ({ cs, en });

export const GENERIC_RELATION_LEVELS = Object.freeze({
  none: {
    id: 'black-0',
    score: 0,
    label: text('0/9 — ŽÁDNÁ SHODA', '0/9 — NO MATCH'),
    meaning: text(
      'V textu nebyl nalezen rozlišující průnik s veřejnou pamětí autora ani právní střet ve věci konopí.',
      'No distinctive overlap with the creator’s public memory or cannabis-related legal conflict was found in the text.'
    )
  },
  weak: {
    id: 'green-1',
    score: 1,
    label: text('1/9 — NEJSLABŠÍ ZELENÁ SHODA', '1/9 — WEAKEST GREEN MATCH'),
    meaning: text(
      'Byl nalezen alespoň jeden textový signál, ale souvislost musí potvrdit člověk.',
      'At least one textual signal was found, but a person must confirm the relationship.'
    )
  }
});

const MEMORY_SIGNALS = Object.freeze([
  { id: 'creator', label: text('Mgr. Dušan Dvořák', 'Mgr. Dušan Dvořák'), branch: text('autor případu', 'case creator'), pattern: /(?:Mgr\.\s*)?Dušan\s+Dvořák/iu },
  { id: 'research', label: text('Výzkum Konopí je lék / Cannabis is The Cure', 'Cannabis is The Cure research'), branch: text('výzkum a aliance', 'research and alliance'), pattern: /Konopí\s+je\s+lék|Cannabis\s+is\s+The\s+Cure/iu },
  { id: 'edukativni-clinic', label: text('Edukativní konopná klinika', 'Edukativní konopná klinika'), branch: text('organizační paměť', 'organisational memory'), pattern: /Edukativní\s+konopn(?:á|e)\s+klinik[ay]/iu },
  { id: 'educational-clinic', label: text('Educational Cannabis Clinic', 'Educational Cannabis Clinic'), branch: text('organizační paměť', 'organisational memory'), pattern: /(?:European\s+)?Educational\s+Cannabis\s+Clinic/iu },
  { id: 'ganja-animals', label: text('Ganja For All Animals', 'Ganja For All Animals'), branch: text('organizační paměť', 'organisational memory'), pattern: /Ganja\s+For\s+All\s+Animals/iu },
  { id: 'art-language', label: text('Art Language Factory / Ateliér ALF', 'Art Language Factory / Ateliér ALF'), branch: text('historie organizací a exekucí', 'organisation and enforcement history'), pattern: /Art(?:\s*&\s*Body)?\s+Language\s+Factory|Ateliér\s+ALF/iu },
  { id: 'investors-society', label: text('European Society of Investors in Natural and Social Sciences Research', 'European Society of Investors in Natural and Social Sciences Research'), branch: text('organizační paměť', 'organisational memory'), pattern: /European\s+Society\s+of\s+Investors\s+in\s+Natural\s+and\s+Social\s+Sciences\s+Research/iu },
  { id: 'alliance-ico', label: text('IČO některé z pěti organizací aliance', 'Registration number of one of the five alliance organisations'), branch: text('rejstříková identita', 'registry identity'), pattern: /(?:706\s*31\s*298|266\s*70\s*232|226\s*80\s*101|227\s*27\s*281|227\s*24\s*303)/u },
  { id: 'nsz', label: text('Nejvyšší státní zastupitelství / NSZ', 'Supreme Public Prosecutor’s Office / NSZ'), branch: text('státní zastupitelství', 'public prosecution'), pattern: /(?:Nejvyšší|Nejvyššímu|Nejvyššího)\s+(?:státní|státnímu|státního)\s+zastupitelstv(?:í|u)|\bNSZ\b/iu },
  { id: 'ksz-ostrava', label: text('Krajské státní zastupitelství v Ostravě', 'Regional Public Prosecutor’s Office in Ostrava'), branch: text('státní zastupitelství', 'public prosecution'), pattern: /Krajské\s+státní\s+zastupitelství\s+v\s+Ostravě/iu },
  { id: 'osz-prostejov', label: text('Okresní státní zastupitelství v Prostějově', 'District Public Prosecutor’s Office in Prostějov'), branch: text('státní zastupitelství', 'public prosecution'), pattern: /Okresní\s+státní\s+zastupitelství\s+v\s+Prostějově/iu },
  { id: 'os-prostejov', label: text('Okresní soud v Prostějově', 'Prostějov District Court'), branch: text('soudní větve', 'court branches'), pattern: /Okresní\s+soud\s+v\s+Prostějově/iu },
  { id: 'municipal-court-prague', label: text('Městský soud v Praze', 'Prague Municipal Court'), branch: text('zásahové žaloby', 'intervention actions'), pattern: /Městský\s+soud\s+v\s+Praze/iu },
  { id: 'ncoz', label: text('NCOZ', 'NCOZ'), branch: text('policejní větev', 'police branch'), pattern: /Národní\s+centrál[ay]\s+proti\s+organizovanému\s+zločinu|\bNCOZ\b/iu },
  { id: 'okte', label: text('OKTE', 'OKTE'), branch: text('laboratorní a policejní důkazy', 'laboratory and police evidence'), pattern: /\bOKTE\b/iu },
  { id: 'justice-ministry', label: text('Ministerstvo spravedlnosti', 'Ministry of Justice'), branch: text('výkonná moc a zásahová žaloba', 'executive branch and intervention action'), pattern: /Ministerstvo\s+spravedlnosti|Ministry\s+of\s+Justice/iu },
  { id: 'health-ministry', label: text('Ministerstvo zdravotnictví', 'Ministry of Health'), branch: text('zdravotní a zásahová větev', 'health and intervention branch'), pattern: /Ministerstvo\s+zdravotnictví|Ministry\s+of\s+Health/iu },
  { id: 'president-office', label: text('Kancelář prezidenta republiky', 'Office of the President of the Republic'), branch: text('prezidentská větev', 'presidential branch'), pattern: /Kancelář\s+prezidenta\s+republiky|Office\s+of\s+the\s+President/iu },
  { id: 'czech-television', label: text('Česká televize', 'Czech Television'), branch: text('civilní a mediální větev', 'civil and media branch'), pattern: /Česká\s+televize|Czech\s+Television/iu },
  { id: 'rrtv', label: text('RRTV', 'RRTV'), branch: text('mediální regulace', 'media regulation'), pattern: /Rada\s+pro\s+rozhlasové\s+a\s+televizní\s+vysílání|\bRRTV\b/iu },
  { id: 'uoou', label: text('ÚOOÚ', 'Czech Data Protection Authority'), branch: text('ochrana osobních údajů', 'data protection'), pattern: /Úřad\s+pro\s+ochranu\s+osobních\s+údajů|\bÚOOÚ\b/iu }
]);

const DOCUMENT_KIND_RULES = Object.freeze([
  { id: 'enforcement', label: text('exekuční nebo vykonávací listina', 'enforcement document'), pattern: /exekuc|soudní\s+exekutor|bailiff|enforcement/iu },
  { id: 'court', label: text('soudní listina', 'court document'), pattern: /rozsudek|soudní\s+usnesení|\busnesení\b|judgment|court\s+order/iu },
  { id: 'police-prosecution', label: text('policejní nebo státně-zastupitelská listina', 'police or public-prosecution document'), pattern: /policie|státní\s+zastupitelství|police|public\s+prosecutor/iu },
  { id: 'medical', label: text('zdravotní listina', 'medical document'), pattern: /diagn[oó]z|lékař|pacient|nemocnic|medical|physician|patient|hospital/iu },
  { id: 'contract', label: text('smluvní nebo obchodní listina', 'contractual or business document'), pattern: /smlouva|objednávka|dodavatel|odběratel|contract|agreement|supplier|customer/iu },
  { id: 'invoice', label: text('účetní nebo platební listina', 'accounting or payment document'), pattern: /faktura|daňový\s+doklad|invoice|payment\s+due/iu },
  { id: 'research', label: text('vědecký nebo odborný text', 'scientific or technical text'), pattern: /výzkum|metodolog|studie|laborator|research|methodolog|study|laborator/iu },
  { id: 'public-policy', label: text('správní nebo politicko-veřejný text', 'administrative or public-policy text'), pattern: /ministerstvo|správní\s+orgán|vláda|vyhláška|ministry|administrative\s+authority|government|regulation/iu }
]);

const DATE_PATTERNS = [
  /\b(?:0?[1-9]|[12]\d|3[01])\.\s*(?:0?[1-9]|1[0-2])\.\s*(?:19|20)\d{2}\b/gu,
  /\b(?:0?[1-9]|[12]\d|3[01])\.\s*(?:ledna|února|března|dubna|května|června|července|srpna|září|října|listopadu|prosince)\s+(?:19|20)\d{2}\b/giu,
  /\b(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])\b/gu,
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:0?[1-9]|[12]\d|3[01]),?\s+(?:19|20)\d{2}\b/giu
];

const REFERENCE_PATTERNS = [
  /\b\d{1,4}\s*[A-ZČĚŠŘŽÝÁÍÉÚŮ]{1,8}\s*\d{1,8}\/\d{2,4}(?:\s*-\s*\d{1,6})?\b/giu,
  /\b[A-Z]{2,10}(?:-\d+)+(?:\/[A-ZČ]{1,5})?-\d{4}(?:-[A-Z0-9]+)*\b/gu,
  /\b\d{2,4}\s+EX(?:E)?\s+\d+\/\d{2,4}(?:-\d+)?\b/giu
];

const AMOUNT_PATTERNS = [
  /\b\d{1,3}(?:[ .]\d{3})*(?:,\d{1,2})?\s*(?:Kč|CZK|EUR)(?!\p{L})/giu,
  /(?:€|CZK|EUR)\s*\d{1,3}(?:[ ,.]?\d{3})*(?:[.,]\d{1,2})?/giu
];

const DEADLINE_PATTERNS = [
  /(?:ve\s+lhůtě|nejpozději\s+do|do)\s+(?:\d{1,3}\s+(?:kalendářních\s+|pracovních\s+)?dnů|(?:0?[1-9]|[12]\d|3[01])\.\s*(?:0?[1-9]|1[0-2])\.\s*(?:19|20)\d{2})/giu,
  /(?:odvolání|stížnost|námitk[ay])[^.\n]{0,100}\b\d{1,3}\s+dnů/giu,
  /(?:within\s+\d{1,3}\s+(?:calendar\s+|working\s+)?days|no\s+later\s+than\s+[^.\n]{1,40}|deadline\s*:?\s*[^.\n]{1,40})/giu
];

const INSTITUTION_PATTERNS = [
  /\b(?:Okresní|Krajský|Městský|Nejvyšší|Ústavní)\s+soud(?:\s+v\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][\p{L}-]+)?/giu,
  /\b(?:Okresní|Krajské|Nejvyšší)\s+státní\s+zastupitelství(?:\s+v\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][\p{L}-]+)?/giu,
  /\bPolicie\s+České\s+republiky\b/giu,
  /\bMinisterstvo\s+[\p{L}-]+(?:\s+[\p{L}-]+)?/giu,
  /\bExekutorský\s+úřad\s+[\p{L}-]+/giu,
  /\b(?:District|Regional|Municipal|Supreme|Constitutional)\s+Court(?:\s+in\s+[A-Z][A-Za-z-]+)?\b/giu,
  /\b(?:Ministry|Office|Authority)\s+of\s+[A-Z][A-Za-z -]{2,50}\b/gu
];

function localize(value, language) {
  return value[language === 'en' ? 'en' : 'cs'];
}

function exactExcerpt(source, index, length, radius = 70) {
  const start = Math.max(0, index - radius);
  const end = Math.min(source.length, index + length + radius);
  return source.slice(start, end).trim();
}

function uniqueItems(items, limit = 12) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = item.value.replace(/\s+/g, ' ').trim().toLocaleLowerCase('cs');
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
    if (result.length >= limit) break;
  }
  return result;
}

function findPatternItems(source, patterns, language, limit = 12) {
  const confidence = language === 'en' ? 'indicative pattern match' : 'orientační shoda vzoru';
  const found = [];
  for (const pattern of patterns) {
    const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
    const matcher = new RegExp(pattern.source, flags);
    for (const match of source.matchAll(matcher)) {
      const value = match[0].trim();
      found.push({
        value,
        citation: exactExcerpt(source, match.index, match[0].length),
        confidence,
        start: match.index,
        end: match.index + match[0].length
      });
    }
  }
  const nonOverlapping = [];
  for (const item of found.sort((left, right) => left.start - right.start || right.end - left.end)) {
    if (nonOverlapping.some((kept) => item.start < kept.end && item.end > kept.start)) continue;
    nonOverlapping.push(item);
  }
  return uniqueItems(nonOverlapping, limit).map(({ start, end, ...item }) => item);
}

function findRuleSignals(source, rules, language) {
  const found = [];
  for (const rule of rules) {
    const flags = rule.pattern.flags.replace('g', '');
    const match = new RegExp(rule.pattern.source, flags).exec(source);
    if (!match) continue;
    found.push({
      id: rule.id,
      label: localize(rule.label, language),
      branch: localize(rule.branch, language),
      value: match[0],
      citation: exactExcerpt(source, match.index, match[0].length),
      confidence: language === 'en' ? 'textual signal only' : 'pouze textový signál'
    });
  }
  return found;
}

function detectDocumentKind(source, language) {
  for (const rule of DOCUMENT_KIND_RULES) {
    const match = new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')).exec(source);
    if (!match) continue;
    return {
      id: rule.id,
      label: localize(rule.label, language),
      citation: exactExcerpt(source, match.index, match[0].length),
      confidence: language === 'en' ? 'indicative, not verified' : 'orientační, neověřeno'
    };
  }
  return {
    id: 'unclassified',
    label: language === 'en' ? 'type not reliably identified' : 'typ nebyl spolehlivě rozpoznán',
    citation: null,
    confidence: language === 'en' ? 'not determined' : 'neurčeno'
  };
}

function extractionLabel(extraction, language) {
  const en = language === 'en';
  if (!extraction || extraction.status === 'text') return en ? 'readable text input' : 'čitelný textový vstup';
  if (extraction.status === 'ok') return extraction.truncated
    ? (en ? 'PDF text layer read locally; safety limit reached' : 'textová vrstva PDF přečtena lokálně; dosažen bezpečnostní limit')
    : (en ? 'PDF text layer read locally' : 'textová vrstva PDF přečtena lokálně');
  if (extraction.code === 'no-text-layer') return en ? 'PDF has no extractable text layer' : 'PDF nemá vytěžitelnou textovou vrstvu';
  if (extraction.code === 'password-protected') return en ? 'password-protected PDF' : 'PDF chráněné heslem';
  if (extraction.code === 'file-too-large') return en ? 'PDF exceeds the local safety limit' : 'PDF překračuje místní bezpečnostní limit';
  return en ? 'PDF text could not be read' : 'text PDF se nepodařilo přečíst';
}

function nextSteps(result, language) {
  const en = language === 'en';
  const steps = [];
  if (!result.hasReadableText) {
    steps.push(en
      ? 'Run OCR locally or paste a checked transcription; until then the system can use only file metadata.'
      : 'Spusťte místní OCR nebo vložte zkontrolovaný přepis; do té doby systém pracuje pouze s metadaty souboru.');
  } else if (result.cannabisLegalConflict.detected) {
    steps.push(en
      ? 'Keep the person’s own facts and procedure separate, then compare the source-linked shared cannabis evidence candidates with the exact finding and evidence in that person’s decision.'
      : 'Oddělte vlastní skutkový a procesní stav člověka a poté porovnejte zdrojované sdílené konopné důkazy s přesným zjištěním a důkazem v jeho rozhodnutí.');
  } else if (result.relation.id === 'black-0') {
    steps.push(en
      ? 'Keep this as a separate new matter; do not merge it into the creator’s case memory merely because it was tested here.'
      : 'Veďte dokument jako samostatnou novou věc; neslučujte jej s kauzou autora jen proto, že zde byl otestován.');
  } else {
    steps.push(en
      ? 'A person must confirm whether the named overlap is a real case link or only the same institution or phrase.'
      : 'Člověk musí potvrdit, zda nalezený průnik představuje skutečnou vazbu kauzy, nebo jen shodnou instituci či výraz.');
  }
  if (result.deadlineSignals.length) {
    steps.push(en
      ? 'Check the complete deadline wording, the triggering event, service date, governing procedure, and remedy before acting; no deadline was calculated here.'
      : 'Před jednáním ověřte celé znění lhůty, rozhodnou událost, datum doručení, použitelný postup a opravný prostředek; zde nebyla žádná lhůta vypočtena.');
  }
  if (result.references.length) {
    steps.push(en
      ? 'Use the extracted reference only as a search key and verify it against the original document or official file.'
      : 'Vytěženou spisovou značku použijte jen jako vyhledávací klíč a ověřte ji proti originálu nebo úřednímu spisu.');
  }
  if (result.hasReadableText && !result.references.length && !result.dates.length && !result.institutions.length) {
    steps.push(en
      ? 'Add the sender, date, requested outcome, and the event that happened; the present text contains too little structure for a procedural map.'
      : 'Doplňte odesílatele, datum, požadovaný výsledek a popis události; současný text má pro procesní mapu příliš málo struktury.');
  }
  steps.push(en
    ? 'Before legal, medical, financial, scientific, business, or political reliance, have the original and the proposed next step checked by a qualified person.'
    : 'Před právním, zdravotním, finančním, vědeckým, obchodním nebo politickým použitím nechte originál a navržený krok zkontrolovat kvalifikovanou osobou.');
  return steps;
}

export function analyzeGenericDocument(input, language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const source = String(input?.text ?? '').replace(/\r\n?/g, '\n').trim();
  const memorySignals = source ? findRuleSignals(source, MEMORY_SIGNALS, lang) : [];
  const cannabisLegalConflict = analyzeCannabisLegalConflict(source, lang, {
    requestedRemedy: input?.requestedRemedy
  });
  const relationTemplate = memorySignals.length || cannabisLegalConflict.detected
    ? GENERIC_RELATION_LEVELS.weak
    : GENERIC_RELATION_LEVELS.none;
  const relation = {
    ...relationTemplate,
    label: localize(relationTemplate.label, lang),
    meaning: cannabisLegalConflict.detected
      ? (lang === 'en'
          ? 'A cannabis-related legal conflict was detected. Shared facts and evidence may be screened for cross-case use, but a person must confirm relevance.'
          : 'Byl rozpoznán právní střet ve věci konopí. Sdílená fakta a důkazy lze prověřit pro mezikauzální použití, ale relevanci musí potvrdit člověk.')
      : localize(relationTemplate.meaning, lang)
  };
  const result = {
    mode: 'generic-local-orientation',
    preparedLegalInterpretation: false,
    name: input?.name || (lang === 'en' ? 'Unnamed document' : 'Dokument bez názvu'),
    kind: input?.kind || 'text',
    sha256: input?.sha256 || null,
    byteLength: Number.isFinite(input?.byteLength) ? input.byteLength : null,
    extraction: input?.extraction || { status: 'text', code: null, pageCount: null, pagesRead: null, truncated: false },
    extractionLabel: extractionLabel(input?.extraction, lang),
    hasReadableText: Boolean(source),
    characterCount: source.length,
    documentKind: detectDocumentKind(source, lang),
    dates: findPatternItems(source, DATE_PATTERNS, lang),
    references: findPatternItems(source, REFERENCE_PATTERNS, lang),
    amounts: findPatternItems(source, AMOUNT_PATTERNS, lang),
    institutions: findPatternItems(source, INSTITUTION_PATTERNS, lang),
    deadlineSignals: findPatternItems(source, DEADLINE_PATTERNS, lang),
    memorySignals,
    cannabisLegalConflict,
    relation,
    privacyNotice: lang === 'en'
      ? 'Processed only in this browser. The document is not uploaded or retained after refresh. It enters no shared memory unless a person later supplies it for source review with consent or lawful anonymisation.'
      : 'Zpracováno pouze v tomto prohlížeči. Dokument se neodesílá a po obnovení stránky se nezachová. Do sdílené paměti vstoupí jen tehdy, pokud jej člověk následně poskytne ke zdrojové kontrole se souhlasem nebo zákonnou anonymizací.',
    evidenceBoundary: lang === 'en'
      ? 'This is deterministic local orientation, not a verified legal analysis or a promise of success. Another person’s or altered document never inherits case-specific conclusions, but its source-linked facts and shared cannabis evidence may become candidate material for a human-reviewed reopening motion, intervention action, compensation request, or another route.'
      : 'Jde o deterministickou místní orientaci, nikoli ověřenou právní analýzu ani příslib úspěchu. Dokument jiného člověka ani pozměněný dokument nikdy nepřebírá případově specifické závěry, ale jeho zdrojovaná fakta a sdílené konopné důkazy mohou být kandidátními podklady pro lidsky kontrolovaný návrh na obnovu, zásahovou žalobu, náhradu škody či újmy nebo jinou cestu.'
  };
  result.proposedSteps = nextSteps(result, lang);
  return result;
}

export function analyzeGenericDocuments(inputs, language = 'cs') {
  const documents = (Array.isArray(inputs) ? inputs : []).map((input) => analyzeGenericDocument(input, language));
  const matched = documents.filter(({ relation }) => relation.id === 'green-1').length;
  const noMatch = documents.filter(({ relation }) => relation.id === 'black-0').length;
  const unreadable = documents.filter(({ hasReadableText }) => !hasReadableText).length;
  const possibleDeadlines = documents.reduce((sum, item) => sum + item.deadlineSignals.length, 0);
  const cannabisLegalConflicts = documents.filter(({ cannabisLegalConflict }) => cannabisLegalConflict.detected).length;
  const sharedEvidenceCandidates = documents.reduce((sum, item) => sum + item.cannabisLegalConflict.sharedEvidenceCandidates.length, 0);
  const en = language === 'en';
  return {
    mode: 'generic-local-orientation-batch',
    documents,
    counts: { total: documents.length, matched, noMatch, unreadable, possibleDeadlines, cannabisLegalConflicts, sharedEvidenceCandidates },
    summary: en
      ? `${documents.length} document(s): ${matched} weakest-green match(es), ${noMatch} black no-match result(s), ${cannabisLegalConflicts} cannabis-related legal conflict(s), ${sharedEvidenceCandidates} shared-evidence candidate(s), ${unreadable} without readable text, ${possibleDeadlines} possible deadline expression(s).`
      : `${documents.length} dokumentů: ${matched} nejslabších zelených shod, ${noMatch} černých výsledků bez shody, ${cannabisLegalConflicts} právních střetů ve věci konopí, ${sharedEvidenceCandidates} kandidátů sdílených důkazů, ${unreadable} bez čitelného textu, ${possibleDeadlines} možných lhůtových výrazů.`,
    boundary: en
      ? 'No case-specific prepared interpretation or promise of success is produced in this mode. Source-linked shared cannabis evidence may be routed into working material for reopening, an intervention action, compensation, or another route, but relevance, conditions, timing, causation, entitlement, and procedure remain for human review.'
      : 'V tomto režimu nevzniká případově specifický připravený právní výklad ani příslib úspěchu. Zdrojované sdílené konopné důkazy lze směrovat do pracovních podkladů k obnově, zásahové žalobě, náhradě nebo jiné cestě, ale relevanci, podmínky, čas, příčinnou souvislost, nárok a procesní postup musí ověřit člověk.'
  };
}

export const PUBLIC_AUTHOR_MEMORY_SIGNAL_IDS = Object.freeze(MEMORY_SIGNALS.map(({ id }) => id));
