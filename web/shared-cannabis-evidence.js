import { CASE_MEMORY } from './case-memory.js';
import { localizeCaseMemory } from './case-memory-en.js';

const text = (cs, en) => ({ cs, en });
const localize = (value, language) => value[language === 'en' ? 'en' : 'cs'];

const CANNABIS_SIGNALS = Object.freeze([
  {
    id: 'cannabis-plant',
    label: text('konopí nebo marihuana', 'cannabis or marijuana'),
    pattern: /(?:konop[\p{L}]*|cannabis|hemp|mari(?:huan|juan)[\p{L}]*)/iu
  },
  {
    id: 'cannabinoids',
    label: text('THC, THCA nebo jiný kanabinoid', 'THC, THCA, or another cannabinoid'),
    pattern: /\b(?:THCA?|CBD|kanabinoid[\p{L}]*|cannabinoid[a-z]*)\b/iu
  }
]);

const LEGAL_COLLISION_SIGNALS = Object.freeze([
  {
    id: 'criminal-decision',
    label: text('trestní rozhodnutí nebo odsouzení', 'criminal decision or conviction'),
    pattern: /trestn[\p{L}]*\s+(?:řízení|věc[\p{L}]*|stíhání|rozsud[\p{L}]*)|odsoud[\p{L}]*|obviněn[\p{L}]*|stíhán[\p{L}]*|obžalob[\p{L}]*|trest\s+odnětí\s+svobody|criminal\s+(?:case|proceeding|judgment|prosecution)|convict(?:ed|ion)|charg(?:e|ed)|indict(?:ed|ment)|sentence[ds]?/iu
  },
  {
    id: 'court-file',
    label: text('soudní nebo spisová větev', 'court or case-file branch'),
    pattern: /(?:okresní|krajský|městský|vrchní|nejvyšší|ústavní)\s+soud|\bsoud(?:u|em|y)?\b|\b(?:sp\.\s*zn\.|č\.\s*j\.)|court|case\s+(?:number|reference)|judg(?:e)?ment/iu
  },
  {
    id: 'police-seizure',
    label: text('policejní zásah, zajištění nebo prohlídka', 'police action, seizure, or search'),
    pattern: /polici[ei]|zajištěn[\p{L}]*|zabaven[\p{L}]*|domovní\s+prohlídk[\p{L}]*|police|seiz(?:e|ed|ure)|house\s+search/iu
  },
  {
    id: 'extraordinary-remedy',
    label: text('obnova řízení nebo nový důkaz', 'reopening or new evidence'),
    pattern: /obnov[\p{L}]*\s+řízení|nov[ýé]\s+(?:skutečnost[\p{L}]*|důkaz[\p{L}]*)|mimořádn[\p{L}]*\s+opravn[\p{L}]*\s+prostředek|reopen(?:ing)?|retrial|new\s+(?:fact|evidence)/iu
  },
  {
    id: 'intervention-remedy',
    label: text('zásahová žaloba nebo ochrana před nezákonným zásahem', 'intervention action or protection from unlawful interference'),
    pattern: /zásahov(?:á|ou|é|ý)\s+žalob(?:a|u|y|ě)|ochran(?:a|u|y)\s+před\s+nezákonn(?:ý|ým|ého|ému|é)\s+zásah(?:em|u|y)?|intervention\s+action|unlawful\s+interference/iu
  },
  {
    id: 'compensation-remedy',
    label: text('náhrada škody nebo nemajetkové újmy', 'compensation for damage or non-pecuniary harm'),
    pattern: /náhrad[auy]\s+(?:škody|újmy)|nemajetkov[áé]\s+újm[auy]|odškodněn[íý]|zadostiučiněn[íý]|compensation|damages|non[-\s]?pecuniary\s+harm|just\s+satisfaction/iu
  },
  {
    id: 'administrative-action',
    label: text('správní řízení, sankce nebo povolení', 'administrative proceeding, sanction, or licence'),
    pattern: /správn[\p{L}]*\s+(?:řízení|rozhodnutí|orgán)|přestup[\p{L}]*|pokut[\p{L}]*|povolen[\p{L}]*|licen[cs][\p{L}]*|administrative\s+(?:proceeding|decision|authority)|regulatory\s+action|fine[ds]?|licen[cs]e/iu
  }
]);

const REMEDY_ROUTE_RULES = Object.freeze([
  {
    id: 'reopening',
    title: text('Návrh na obnovu řízení', 'Motion to reopen proceedings'),
    pattern: /obnov[auyě]\s+řízení|nov[ýé]\s+(?:skutečnost[\p{L}]*|důkaz[\p{L}]*)|mimořádn[\p{L}]*\s+opravn[\p{L}]*\s+prostředek|reopen(?:ing)?|retrial|new\s+(?:fact|evidence)/iu
  },
  {
    id: 'intervention-action',
    title: text('Zásahová žaloba', 'Intervention action'),
    pattern: /zásahov(?:á|ou|é|ý)\s+žalob(?:a|u|y|ě)|ochran(?:a|u|y)\s+před\s+nezákonn(?:ý|ým|ého|ému|é)\s+zásah(?:em|u|y)?|nezákonn(?:ý|é|ým)\s+zásah|trvajíc(?:í|ím)\s+zásah|intervention\s+action|unlawful\s+(?:interference|action)|ongoing\s+interference/iu
  },
  {
    id: 'compensation',
    title: text('Náhrada škody nebo nemajetkové újmy', 'Compensation for damage or non-pecuniary harm'),
    pattern: /náhrad[auy]\s+(?:škody|újmy)|nemajetkov[áé]\s+újm[auy]|odškodněn[íý]|zadostiučiněn[íý]|compensation|damages|non[-\s]?pecuniary\s+harm|just\s+satisfaction/iu
  }
]);

const OTHER_REMEDY_ROUTE = Object.freeze({
  id: 'other',
  title: text('Jiný nebo dosud neurčený postup', 'Other or not-yet-determined route')
});

const SHARED_EVIDENCE_TOPICS = Object.freeze([
  {
    id: 'thc-methodology',
    label: text('Měření THC, vzorkování a forenzní metodika', 'THC measurement, sampling, and forensic methodology'),
    pattern: /\bTHCA?\b|tetrahydrokanabinol|měřen[\p{L}]*|stanoven[\p{L}]*\s+obsah[\p{L}]*|vzork[\p{L}]*|nejistot[\p{L}]*\s+měření|standardní\s+operační\s+postup|\bSOP\b|laborator[\p{L}]*|znaleck[\p{L}]*|\bOKTE\b|chromatograf[\p{L}]*|measurement|sampling|measurement\s+uncertainty|standard\s+operating\s+procedure|laborator[yi]|expert\s+(?:report|evidence)/iu,
    recordIds: [
      'ns-zin-38-no-thc-case-law',
      'police-method-1999-2004',
      'police-method-2004-2021',
      'police-first-method-54-2021'
    ]
  },
  {
    id: 'technical-regulations',
    label: text('Technické předpisy, notifikace a právo EU', 'Technical regulations, notification, and EU law'),
    pattern: /technick[\p{L}]*\s+(?:předpis|specifikac)[\p{L}]*|notifik[\p{L}]*|\bTRIS\b|98\/34|2015\/1535|předběžn[\p{L}]*\s+otáz[\p{L}]*|\bSDEU\b|technical\s+(?:regulation|specification)|notification\s+duty|preliminary\s+(?:question|reference)|\bCJEU\b|EU\s+law/iu,
    publicAxisIndex: 0
  }
]);

function exactExcerpt(source, index, length, radius = 85) {
  const start = Math.max(0, index - radius);
  const end = Math.min(source.length, index + length + radius);
  return source.slice(start, end).trim();
}

function findSignals(source, rules, language) {
  const result = [];
  for (const rule of rules) {
    const match = new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')).exec(source);
    if (!match) continue;
    result.push({
      id: rule.id,
      label: localize(rule.label, language),
      value: match[0],
      citation: exactExcerpt(source, match.index, match[0].length),
      confidence: language === 'en' ? 'textual routing signal only' : 'pouze textový směrovací signál'
    });
  }
  return result;
}

function sharedRecordCandidate(record, topic, externalCitation, language) {
  return {
    id: record.id,
    topicId: topic.id,
    topic: localize(topic.label, language),
    sourceType: 'reviewed-public-memory-record',
    externalCitation,
    claim: record.statement,
    memoryCitation: record.originalCitation || record.citation,
    memoryCitationTranslation: language === 'en' ? record.citationTranslation : null,
    memorySource: record.source,
    proves: record.proves,
    limitation: record.doesNotProve,
    confidence: language === 'en'
      ? 'candidate shared evidence — individual-case relevance unverified'
      : 'kandidátní sdílený důkaz — význam pro konkrétní kauzu neověřen'
  };
}

function sharedAxisCandidate(axis, topic, externalCitation, language) {
  return {
    id: topic.id,
    topicId: topic.id,
    topic: localize(topic.label, language),
    sourceType: 'public-comparison-axis',
    externalCitation,
    claim: axis.fact,
    memoryCitation: axis.originalCitation || axis.citation,
    memoryCitationTranslation: language === 'en' ? axis.citationTranslation : null,
    memorySource: axis.source,
    proves: axis.interpretation,
    limitation: axis.uncertainty,
    confidence: language === 'en'
      ? 'candidate shared legal-evidence axis — provision and time period must be checked'
      : 'kandidátní sdílená právně-důkazní osa — nutno ověřit ustanovení a rozhodné období'
  };
}

function reopeningFramework(memory, hasThcTopic, language) {
  const references = new Set(['Tpjn 302/2012', '8 Tz 25/2015']);
  if (hasThcTopic) {
    references.add('II. ÚS 1703/24');
    references.add('Tpjn 301/2013');
    references.add('3 Tdo 687/2006');
  }
  return memory.jurisprudence
    .filter(({ reference }) => references.has(reference))
    .map((item) => ({
      reference: item.reference,
      court: item.court,
      date: item.date,
      principle: item.principle,
      relation: item.relation,
      sourceUrl: item.sourceUrl,
      confidence: language === 'en'
        ? 'general review framework; application to this case is not determined'
        : 'obecný kontrolní rámec; použitelnost na tuto kauzu není určena'
    }));
}

function reopeningRequiredItems(language) {
  return language === 'en' ? [
    'The exact final decision to be challenged, its case reference, operative part, finality, and the procedural status of the person concerned.',
    'The exact passage showing which original fact or evidence supported the decision, especially the expert report, sampling method, measured value, and treatment of uncertainty where relevant.',
    'For every proposed new fact or item of evidence: its source, date, provenance, when and how it became available, and why it was not merely a previously known argument.',
    'A case-specific explanation of how the proposed material could, together with the original file, support a different decision; this must not be inferred from similarity alone.',
    'The available procedural route, competent court, standing, required attachments, and any applicable time rule checked against current law and the complete file.'
  ] : [
    'Přesné pravomocné rozhodnutí, které má být napadeno, jeho spisovou značku, výrok, právní moc a procesní postavení dotčené osoby.',
    'Přesnou pasáž, z níž plyne, o jakou původní skutečnost nebo důkaz se rozhodnutí opíralo; podle věci zejména znalecký posudek, způsob vzorkování, naměřenou hodnotu a práci s nejistotou.',
    'U každé navrhované nové skutečnosti nebo důkazu zdroj, datum, původ, okamžik a způsob získání a vysvětlení, proč nejde jen o dříve známou argumentaci.',
    'Případové vysvětlení, jak by nový podklad mohl ve spojení s původním spisem podpořit jiné rozhodnutí; podobnost kauz sama nestačí.',
    'Podle aktuálního práva a úplného spisu ověřit použitelný procesní postup, příslušný soud, oprávněnou osobu, povinné přílohy a případné časové pravidlo.'
  ];
}

function reopeningDraftOutline(language) {
  return language === 'en' ? [
    'Identify the person’s own decision and quote the material original finding.',
    'List each new fact or item of evidence separately, with its exact source and quotation.',
    'Keep shared cannabis evidence in a separate section and state precisely which original finding it is being compared with.',
    'Explain novelty and potential materiality without claiming in advance that reopening must be granted.',
    'Attach the source documents and leave the procedural request, competence, and final wording for human legal review.'
  ] : [
    'Označit vlastní rozhodnutí dotčené osoby a přesně citovat rozhodující původní zjištění.',
    'Uvést každou novou skutečnost nebo důkaz samostatně, s přesným zdrojem a citací.',
    'Sdílené konopné důkazy držet v odděleném oddílu a přesně uvést, s jakým původním zjištěním se porovnávají.',
    'Vysvětlit novost a možný význam bez předčasného tvrzení, že obnova musí být povolena.',
    'Připojit zdrojové listiny a procesní návrh, příslušnost i konečné znění ponechat lidské právní kontrole.'
  ];
}

function interventionRequiredItems(language) {
  return language === 'en' ? [
    'The exact public authority or actor and the precise act, omission, or interference alleged, quoted from the person’s own documents.',
    'A dated chronology showing when the interference began, whether it continues, and which present effects or real risk are asserted.',
    'The rights said to be affected and the exact evidence supporting each material fact, kept separate from legal conclusions.',
    'Earlier submissions, available responses, and any protection already requested, with service and procedural status verified from the complete file.',
    'Standing, competent court, timeliness, permissible form of protection, and current statutory requirements checked by a qualified person.'
  ] : [
    'Přesný orgán veřejné moci nebo jiného původce a konkrétní tvrzený úkon, opomenutí či zásah, citovaný z vlastních listin člověka.',
    'Datovanou chronologii: kdy zásah začal, zda trvá a jaké současné účinky nebo reálné riziko člověk tvrdí.',
    'Dotčená práva a přesný důkaz ke každé podstatné skutečnosti, oddělený od právního hodnocení.',
    'Dřívější podání, dostupné odpovědi a již požadovanou ochranu; doručení a procesní stav ověřit z úplného spisu.',
    'Kvalifikovaně ověřit aktivní legitimaci, příslušný soud, včasnost, přípustnou podobu ochrany a aktuální zákonné podmínky.'
  ];
}

function interventionDraftOutline(language) {
  return language === 'en' ? [
    'Identify the person and the authority or actor whose conduct is being examined.',
    'Describe the alleged interference and chronology fact by fact, using exact quotations and source references.',
    'List the affected rights as the person’s legal position, not as a conclusion already established by the system.',
    'Separate evidence of continuing effects, prior requests for protection, responses, and unresolved gaps.',
    'Leave jurisdiction, timeliness, admissibility, requested relief, and final filing language for human legal review.'
  ] : [
    'Označit člověka a orgán nebo jiného původce, jehož postup má být prověřen.',
    'Popsat tvrzený zásah a chronologii po jednotlivých skutečnostech, s přesnými citacemi a zdroji.',
    'Uvést dotčená práva jako právní stanovisko člověka, nikoli jako závěr již prokázaný systémem.',
    'Oddělit důkazy o trvajících účincích, předchozí žádosti o ochranu, odpovědi a neuzavřené mezery.',
    'Příslušnost, včasnost, přípustnost, požadovanou ochranu a konečné znění ponechat lidské právní kontrole.'
  ];
}

function compensationRequiredItems(language) {
  return language === 'en' ? [
    'Each claimed item of financial damage or non-pecuniary harm, its amount or requested form of satisfaction, and the evidence supporting it.',
    'The exact official decision or maladministration alleged, with the source passage and its procedural status.',
    'Case-specific evidence of causation between the alleged official conduct and each claimed consequence.',
    'Any prior compensation request, preliminary procedure, response, payment, or related proceeding, including dates and service evidence.',
    'The responsible entity, standing, limitation or other timing rules, possible double recovery, and current statutory conditions checked by a qualified person.'
  ] : [
    'Každou tvrzenou položku majetkové škody nebo nemajetkové újmy, její částku či požadovanou formu zadostiučinění a důkaz, který ji podporuje.',
    'Přesné tvrzené nezákonné rozhodnutí nebo nesprávný úřední postup, se zdrojovou pasáží a procesním stavem.',
    'Případové důkazy příčinné souvislosti mezi tvrzeným úředním postupem a každým požadovaným následkem.',
    'Předchozí žádost o náhradu, předběžné projednání, odpověď, platbu nebo související řízení včetně dat a dokladů o doručení.',
    'Kvalifikovaně ověřit odpovědný subjekt, legitimaci, promlčení či jiné časové podmínky, možné dvojí plnění a aktuální zákonné podmínky.'
  ];
}

function compensationDraftOutline(language) {
  return language === 'en' ? [
    'Identify the claimant, the entity said to be responsible, and the decision or official conduct under review.',
    'List every item of damage or harm separately, with amount or requested satisfaction and exact supporting evidence.',
    'Build a source-linked chronology and explain the alleged causal link without treating it as already proved.',
    'Record the prior compensation request, response, payments, parallel proceedings, and evidentiary gaps.',
    'Leave legal basis, limitation, valuation, competent forum, and final wording for human legal review.'
  ] : [
    'Označit žadatele, tvrzeně odpovědný subjekt a rozhodnutí či úřední postup, který má být prověřen.',
    'Uvést každou škodu nebo újmu samostatně, s částkou či požadovaným zadostiučiněním a přesným důkazem.',
    'Sestavit zdrojovanou chronologii a vysvětlit tvrzenou příčinnou souvislost, aniž by ji systém vydával za prokázanou.',
    'Zaznamenat předchozí žádost o náhradu, odpověď, plnění, souběžná řízení a důkazní mezery.',
    'Právní základ, promlčení, ocenění, příslušný orgán a konečné znění ponechat lidské právní kontrole.'
  ];
}

function otherRequiredItems(language) {
  return language === 'en' ? [
    'The outcome the person wants and the current practical problem stated in their own words.',
    'All relevant decisions, submissions, responses, dates, case references, and proof of service available in the person’s own file.',
    'A source-linked chronology separating documented facts, the person’s assertions, and missing evidence.',
    'Any active proceeding, urgent event, possible deadline wording, or irreversible consequence requiring prompt human review.',
    'A qualified person must select the legal route, competent body, conditions, and final wording under current law.'
  ] : [
    'Výsledek, kterého chce člověk dosáhnout, a současný praktický problém popsaný jeho vlastními slovy.',
    'Všechna relevantní rozhodnutí, podání, odpovědi, data, spisové značky a dostupné doklady o doručení z vlastního spisu.',
    'Zdrojovanou chronologii oddělující doložená fakta, tvrzení člověka a chybějící důkazy.',
    'Aktivní řízení, naléhavou událost, možný lhůtový výraz nebo nevratný následek vyžadující rychlou lidskou kontrolu.',
    'Právní cestu, příslušný orgán, podmínky a konečné znění musí podle aktuálního práva určit kvalifikovaný člověk.'
  ];
}

function otherDraftOutline(language) {
  return language === 'en' ? [
    'State the person’s requested outcome without converting it into a legal entitlement.',
    'Create a dated inventory of decisions, submissions, responses, evidence, and exact quotations.',
    'Separate verified facts, the person’s assertions, interpretation, uncertainty, and missing material.',
    'Flag urgent or irreversible issues for immediate human review without calculating a deadline from an isolated phrase.',
    'Ask a qualified person to select the appropriate legal or non-legal route and approve any final filing.'
  ] : [
    'Uvést požadovaný výsledek člověka, aniž by se změnil v tvrzení o existujícím právním nároku.',
    'Vytvořit datovaný soupis rozhodnutí, podání, odpovědí, důkazů a přesných citací.',
    'Oddělit ověřená fakta, tvrzení člověka, výklad, nejistotu a chybějící podklady.',
    'Naléhavé nebo nevratné otázky označit k okamžité lidské kontrole bez výpočtu lhůty z osamocené věty.',
    'Požádat kvalifikovaného člověka o výběr vhodné právní či jiné cesty a schválení konečného podání.'
  ];
}

function routeMaterials(routeId, language) {
  if (routeId === 'reopening') return {
    meaning: language === 'en'
      ? 'A working motion-to-reopen file can be assembled from the person’s own final decision, original evidence, and genuinely new source-linked material.'
      : 'Lze sestavit pracovní podklad k návrhu na obnovu z vlastního pravomocného rozhodnutí člověka, původních důkazů a skutečně nových zdrojovaných podkladů.',
    requiredCaseSpecificItems: reopeningRequiredItems(language),
    draftOutline: reopeningDraftOutline(language),
    boundary: language === 'en'
      ? 'This route is a working outline, not a finding that statutory reopening conditions are met or that reopening will be granted.'
      : 'Tato cesta je pracovní osnova, nikoli závěr, že jsou splněny zákonné podmínky obnovy nebo že obnova bude povolena.'
  };
  if (routeId === 'intervention-action') return {
    meaning: language === 'en'
      ? 'A working intervention-action file can organise the alleged act or omission, chronology, continuing effects, affected rights, and requested protection.'
      : 'Lze sestavit pracovní podklad k zásahové žalobě, který uspořádá tvrzený úkon či opomenutí, chronologii, trvající účinky, dotčená práva a požadovanou ochranu.',
    requiredCaseSpecificItems: interventionRequiredItems(language),
    draftOutline: interventionDraftOutline(language),
    boundary: language === 'en'
      ? 'This route is a working outline, not a finding that an unlawful interference occurred or that the action is admissible, timely, or successful.'
      : 'Tato cesta je pracovní osnova, nikoli závěr, že nastal nezákonný zásah nebo že je žaloba přípustná, včasná či úspěšná.'
  };
  if (routeId === 'compensation') return {
    meaning: language === 'en'
      ? 'A working compensation file can separate each alleged item of damage or harm, official conduct, causation, valuation, and prior request.'
      : 'Lze sestavit pracovní podklad k náhradě, který oddělí každou tvrzenou škodu či újmu, úřední postup, příčinnou souvislost, ocenění a předchozí žádost.',
    requiredCaseSpecificItems: compensationRequiredItems(language),
    draftOutline: compensationDraftOutline(language),
    boundary: language === 'en'
      ? 'This route is a working outline, not a finding that liability, causation, entitlement, valuation, or success has been established.'
      : 'Tato cesta je pracovní osnova, nikoli závěr, že byly prokázány odpovědnost, příčinná souvislost, nárok, výše plnění nebo budoucí úspěch.'
  };
  return {
    meaning: language === 'en'
      ? 'The system can first organise the person’s objective, documents, facts, statements, case references, and evidence; a qualified person must then select the route.'
      : 'Systém nejprve uspořádá cíl člověka, listiny, fakta, výroky, spisové značky a důkazy; vhodnou cestu poté musí určit kvalifikovaný člověk.',
    requiredCaseSpecificItems: otherRequiredItems(language),
    draftOutline: otherDraftOutline(language),
    boundary: language === 'en'
      ? 'No legal route, entitlement, deadline, unlawfulness, or prospect of success has been determined.'
      : 'Nebyla určena právní cesta, nárok, lhůta, nezákonnost ani vyhlídka na úspěch.'
  };
}

function remedyRoutes(source, language, requestedRemedy) {
  const requested = String(requestedRemedy ?? 'auto').trim();
  const known = new Map(REMEDY_ROUTE_RULES.map((rule) => [rule.id, rule]));
  known.set(OTHER_REMEDY_ROUTE.id, OTHER_REMEDY_ROUTE);
  let selected = [];
  if (requested !== 'auto' && known.has(requested)) {
    selected = [{ rule: known.get(requested), basis: 'user-selected', citation: null }];
  } else {
    selected = REMEDY_ROUTE_RULES.flatMap((rule) => {
      const match = new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')).exec(source);
      return match ? [{ rule, basis: 'textual-indication', citation: exactExcerpt(source, match.index, match[0].length) }] : [];
    });
  }
  if (!selected.length) selected = [{ rule: OTHER_REMEDY_ROUTE, basis: 'not-determined', citation: null }];

  return selected.map(({ rule, basis, citation }) => ({
    id: rule.id,
    title: localize(rule.title, language),
    basis,
    basisLabel: language === 'en'
      ? (basis === 'user-selected' ? 'objective selected by the user' : basis === 'textual-indication' ? 'objective indicated by the document text' : 'route not determined — human selection required')
      : (basis === 'user-selected' ? 'cíl zvolený uživatelem' : basis === 'textual-indication' ? 'cíl naznačený textem dokumentu' : 'cesta neurčena — nutný výběr člověkem'),
    citation,
    legallyDetermined: false,
    ...routeMaterials(rule.id, language)
  }));
}

export function analyzeCannabisLegalConflict(sourceText, language = 'cs', options = {}) {
  const lang = language === 'en' ? 'en' : 'cs';
  const source = String(sourceText ?? '').replace(/\r\n?/g, '\n').trim();
  const cannabisSignals = source ? findSignals(source, CANNABIS_SIGNALS, lang) : [];
  const legalSignals = source ? findSignals(source, LEGAL_COLLISION_SIGNALS, lang) : [];
  const detected = cannabisSignals.length > 0 && legalSignals.length > 0;
  const memory = localizeCaseMemory(CASE_MEMORY, lang);
  const verifiedById = new Map(memory.verifiedStatements.map((item) => [item.id, item]));
  const sharedEvidenceCandidates = [];
  const matchedTopics = [];

  if (detected) {
    for (const topic of SHARED_EVIDENCE_TOPICS) {
      const match = new RegExp(topic.pattern.source, topic.pattern.flags.replace('g', '')).exec(source);
      if (!match) continue;
      const externalCitation = exactExcerpt(source, match.index, match[0].length);
      matchedTopics.push({
        id: topic.id,
        label: localize(topic.label, lang),
        value: match[0],
        citation: externalCitation,
        confidence: lang === 'en' ? 'candidate cross-case topic' : 'kandidátní mezikauzální téma'
      });
      for (const id of topic.recordIds || []) {
        const record = verifiedById.get(id);
        if (record) sharedEvidenceCandidates.push(sharedRecordCandidate(record, topic, externalCitation, lang));
      }
      if (Number.isInteger(topic.publicAxisIndex)) {
        const axis = memory.caseStudy.publicEvidenceAxes[topic.publicAxisIndex];
        if (axis) sharedEvidenceCandidates.push(sharedAxisCandidate(axis, topic, externalCitation, lang));
      }
    }
  }

  const hasThcTopic = matchedTopics.some(({ id }) => id === 'thc-methodology');
  const routes = detected ? remedyRoutes(source, lang, options.requestedRemedy) : [];
  const firstRoute = routes[0] ?? null;
  const contributionCitations = [...cannabisSignals, ...legalSignals, ...matchedTopics]
    .map(({ citation }) => citation)
    .filter((citation, index, values) => citation && values.indexOf(citation) === index);
  return {
    detected,
    mode: detected ? 'shared-cannabis-evidence-screening' : 'not-detected',
    label: lang === 'en'
      ? (detected ? 'Cannabis-related legal conflict detected' : 'No cannabis-related legal conflict detected')
      : (detected ? 'Rozpoznán právní střet ve věci konopí' : 'Právní střet ve věci konopí nebyl rozpoznán'),
    meaning: lang === 'en'
      ? 'The person’s own facts remain case-specific. Source-linked cannabis evidence may be screened for cross-case use as human-reviewed working material for reopening, an intervention action, compensation for damage or harm, or another route. The system neither creates an entitlement nor guarantees success.'
      : 'Vlastní skutkový a procesní stav člověka zůstává případový. Zdrojované konopné důkazy lze prověřit pro lidsky kontrolované pracovní podklady k obnově řízení, zásahové žalobě, náhradě škody či újmy nebo jinému kroku. Systém nezakládá nárok ani nezaručuje úspěch.',
    cannabisSignals,
    legalSignals,
    matchedTopics,
    contributionCandidate: {
      eligible: detected,
      status: lang === 'en'
        ? (detected ? 'Candidate contribution from this person — awaiting source, consent/anonymisation, and relevance review' : 'Not routed to the shared cannabis evidence layer')
        : (detected ? 'Kandidátní příspěvek tohoto člověka — čeká na kontrolu zdroje, souhlasu/anonymizace a relevance' : 'Nesměrováno do sdílené konopné důkazní vrstvy'),
      citations: detected ? contributionCitations : [],
      use: lang === 'en'
        ? 'After review, the quoted facts or evidence may extend the shared layer and be compared with other cannabis cases; the document is not treated as proof merely because it was submitted.'
        : 'Po kontrole mohou citovaná fakta nebo důkazy rozšířit sdílenou vrstvu a být porovnávány s dalšími konopnými kauzami; dokument se nepovažuje za důkaz jen proto, že byl vložen.'
    },
    sharedEvidenceCandidates,
    remedyRoutes: routes,
    legallyDetermined: false,
    reopeningFramework: routes.some(({ id }) => id === 'reopening') ? reopeningFramework(memory, hasThcTopic, lang) : [],
    requiredCaseSpecificItems: firstRoute?.requiredCaseSpecificItems ?? [],
    draftOutline: firstRoute?.draftOutline ?? [],
    sharingPolicy: lang === 'en'
      ? 'Facts and evidence from any person with a cannabis-related legal conflict may enter the shared evidence layer only with source provenance, a checked quotation, consent or lawful anonymisation, and a human relevance decision. Identity, service, finality, deadlines, and conclusions about that person’s case are never copied into another case.'
      : 'Fakta a důkazy každého člověka s právním střetem ve věci konopí mohou vstoupit do sdílené důkazní vrstvy jen se zdrojem, zkontrolovanou citací, souhlasem nebo zákonnou anonymizací a lidským rozhodnutím o relevanci. Identita, doručení, právní moc, lhůty a závěry o jeho kauze se do jiné kauzy nepřenášejí.',
    draftBoundary: lang === 'en'
      ? 'The result is a source inventory and working outline, not a finding that any route is admissible, timely, well-founded, or likely to succeed, that compensation is owed, or that earlier conduct was unlawful.'
      : 'Výsledkem je soupis zdrojů a pracovní osnova, nikoli závěr, že je kterýkoli prostředek přípustný, včasný, důvodný či úspěšný, že vznikl nárok na náhradu nebo že dřívější postup byl nezákonný.'
  };
}

export const SHARED_CANNABIS_EVIDENCE_TOPIC_IDS = Object.freeze(SHARED_EVIDENCE_TOPICS.map(({ id }) => id));
export const CANNABIS_LEGAL_SIGNAL_IDS = Object.freeze(LEGAL_COLLISION_SIGNALS.map(({ id }) => id));
export const CANNABIS_REMEDY_ROUTE_IDS = Object.freeze([...REMEDY_ROUTE_RULES.map(({ id }) => id), OTHER_REMEDY_ROUTE.id]);
