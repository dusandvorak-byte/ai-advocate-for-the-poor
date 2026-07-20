import { CASE_MEMORY } from './case-memory.js';
import { localizeCaseMemory } from './case-memory-en.js';

const text = (cs, en) => ({ cs, en });

export const PRISONER_REOPENING_DIGESTS = Object.freeze({
  privateOriginal: 'db5bcc7a4532d12180b22d17bee92bf254e07be253c3d72a092c132c20595abf'
});

export const PRISONER_REOPENING_SOURCE_EXCERPTS = [
  'Text vypracovaný v roce 2022 aliancí Cannabis is The Cure,z.s.',
  'vlastnictvím bylo pouze a jen 9 rostlin konopí na vymezeném pozemku',
  'spolu s dalšími 22 rostlinami konopí spoluobviněných',
  'Dle rozsudků totiž bylo na 1 rostlině konopí téměř 600 gramů překatrované sušiny, což je více než desetinásobek váhy obvyklé, na totožně vysokých rostlinách.',
  'Obálka obsahující reprezentativní vzorek (SIC!) zajištěný z toxikomansky využitelných částí rostlin o hmotnosti 237,4 gramů',
  'celková hmotnost toxikomansky využitelných částí rostlin je uvedena 17.500 gramů a stonků 23.520 gramů.',
  'Jak je uvedeno dále v odborném vyjádření policie z těchto nekompetentní osobou určených 237,4 gramů k expertíze bylo při expertíze použito 6,4 gramů!',
  'aniž došlo k homogenizaci celého vzorku (tzn. 17,5 kg)'
].join('\n');

const sourceStatements = [
  {
    id: 'authorship-and-year',
    page: 1,
    claim: text(
      'Záhlaví označuje text jako návrh zpracovaný v roce 2022 aliancí Cannabis is The Cure, z. s.',
      'The heading describes the text as a motion prepared in 2022 by the Cannabis is The Cure alliance.'
    ),
    citation: 'Text vypracovaný v roce 2022 aliancí Cannabis is The Cure,z.s.',
    citationTranslation: 'Text prepared in 2022 by the Cannabis is The Cure alliance.',
    limitation: text(
      'Jde o údaj v samotném návrhu. Technická metadata souboru nejsou vydávána za datum jeho podání soudu.',
      'This is a statement in the motion itself. The file metadata are not presented as the date on which it was filed with a court.'
    )
  },
  {
    id: 'nine-plants',
    page: 5,
    claim: text(
      'Návrh tvrdí, že L. CH. osobně náleželo 9 rostlin, zatímco dalších 22 přisuzuje dvěma spoluobviněným.',
      'The motion states that 9 plants were personally attributable to L. CH. and attributes another 22 plants to two co-defendants.'
    ),
    citation: 'vlastnictvím bylo pouze a jen 9 rostlin konopí na vymezeném pozemku',
    citationTranslation: 'only 9 cannabis plants on the defined plot were mine',
    supportingCitation: 'spolu s dalšími 22 rostlinami konopí spoluobviněných',
    supportingCitationTranslation: 'together with another 22 cannabis plants of co-defendants',
    limitation: text(
      'Citace dokládá obsah obhajoby, nikoli sama skutkové zjištění soudu.',
      'The quotation proves what the defence argued; it is not itself a judicial finding of fact.'
    )
  },
  {
    id: 'yield-claim',
    page: 5,
    claim: text(
      'Návrh napadá hmotnostní základ rozsudků tvrzením o téměř 600 gramech sušiny na jednu rostlinu.',
      'The motion challenges the judgments’ weight basis by alleging almost 600 grams of dried material per plant.'
    ),
    citation: 'Dle rozsudků totiž bylo na 1 rostlině konopí téměř 600 gramů překatrované sušiny, což je více než desetinásobek váhy obvyklé, na totožně vysokých rostlinách.',
    citationTranslation: 'According to the judgments, there were almost 600 grams of sifted dried material per cannabis plant, more than ten times the usual weight for plants of the same height.',
    limitation: text(
      'Bez rozsudků, protokolů a posudku systém neověřuje výpočet ani srovnávanou obvyklou výtěžnost.',
      'Without the judgments, protocols, and expert opinion, the system does not verify the calculation or the asserted usual yield.'
    )
  },
  {
    id: 'sampling-claim',
    page: 6,
    claim: text(
      'Návrh cituje odborné vyjádření tak, že z celkových 17,5 kg byl vybrán „reprezentativní“ vzorek 237,4 g.',
      'The motion quotes the expert statement as using a 237.4 g “representative” sample from a total of 17.5 kg.'
    ),
    citation: 'Obálka obsahující reprezentativní vzorek (SIC!) zajištěný z toxikomansky využitelných částí rostlin o hmotnosti 237,4 gramů',
    citationTranslation: 'An envelope containing a representative sample (sic) secured from usable parts of plants weighing 237.4 grams',
    supportingCitation: 'celková hmotnost toxikomansky využitelných částí rostlin je uvedena 17.500 gramů a stonků 23.520 gramů.',
    supportingCitationTranslation: 'the total weight of usable plant parts is stated as 17,500 grams and the stems as 23,520 grams.',
    limitation: text(
      'Jde o citaci odborného vyjádření uvnitř návrhu. Před novým podáním se musí porovnat s originálem posudku a protokolem odběru.',
      'This is a quotation from an expert statement reproduced inside the motion. A new filing must compare it with the original opinion and sampling protocol.'
    )
  },
  {
    id: 'analysis-claim',
    page: 7,
    claim: text(
      'Návrh uvádí, že při expertize bylo použito 6,4 g, a namítá, že nebyl homogenizován celý vzorek 17,5 kg.',
      'The motion states that 6.4 g was used for the analysis and argues that the entire 17.5 kg sample was not homogenized.'
    ),
    citation: 'Jak je uvedeno dále v odborném vyjádření policie z těchto nekompetentní osobou určených 237,4 gramů k expertíze bylo při expertíze použito 6,4 gramů!',
    citationTranslation: 'As further stated in the police expert statement, 6.4 grams of the 237.4 grams selected for examination were used in the examination.',
    supportingCitation: 'aniž došlo k homogenizaci celého vzorku (tzn. 17,5 kg)',
    supportingCitationTranslation: 'without homogenization of the entire sample (that is, 17.5 kg)',
    limitation: text(
      'Návrh formuluje odbornou námitku. Systém bez úplných laboratorních podkladů neurčuje, zda použitý postup byl vadný.',
      'The motion raises a technical objection. Without the complete laboratory materials, the system does not determine whether the procedure used was defective.'
    )
  }
];

const comparison = [
  {
    id: 'thc-method',
    trafficBand: 'red-3',
    score: 9,
    title: text('Odběr, homogenizace a měření THC', 'Sampling, homogenization, and THC measurement'),
    meaning: text(
      'Návrh z roku 2022 již konkrétně napadal výběr 237,4 g, použití 6,4 g a absenci homogenizace celku. Paměť dnes obsahuje pozdější úřední výroky o období bez vlastní policejní metodiky a o první metodice č. 54/2021. To je nejsilnější přímý průnik k novému odbornému prověření.',
      'The 2022 motion already made specific objections concerning selection of 237.4 g, use of 6.4 g, and lack of homogenization of the whole. The memory now contains later official statements about a period without an internal police methodology and about the first methodology, Order No. 54/2021. This is the strongest direct overlap for renewed technical review.'
    ),
    memoryRecordIds: ['police-method-2004-2021', 'police-first-method-54-2021', 'ns-zin-38-no-thc-case-law'],
    jurisprudenceRefs: ['II. ÚS 1703/24'],
    boundary: text(
      'Pozdější obecný výrok o metodice sám neprokazuje vadu konkrétní expertizy; vyžaduje původní SOP, protokol vzorkování, chromatogramy a nejistotu měření.',
      'A later general statement about methodology does not itself prove a defect in the particular examination; the original SOP, sampling protocol, chromatograms, and measurement uncertainty are required.'
    )
  },
  {
    id: 'new-and-material',
    trafficBand: 'red-2',
    score: 8,
    title: text('Novost a možný vliv důkazů vzniklých po roce 2022', 'Novelty and possible materiality of evidence arising after 2022'),
    meaning: text(
      'Úřední odpověď z roku 2025 časově následuje po návrhu z roku 2022. Nové podání by ji mělo předložit jako přesně citovaný důkaz a vysvětlit její vztah k původnímu rozhodnutí.',
      'The official 2025 response post-dates the 2022 motion. A new filing should submit it as precisely quoted evidence and explain its relationship to the original decision.'
    ),
    memoryRecordIds: ['police-method-2004-2021', 'police-first-method-54-2021'],
    jurisprudenceRefs: ['Tpjn 302/2012', '8 Tz 25/2015'],
    boundary: text(
      'Pozdější datum neznamená automaticky procesní novost ani způsobilost změnit rozhodnutí; obě podmínky musí posoudit soud nad úplným spisem.',
      'A later date does not automatically establish procedural novelty or capacity to change the decision; both conditions must be assessed by the court on the complete record.'
    )
  },
  {
    id: 'personal-scope-and-weight',
    trafficBand: 'red-1',
    score: 7,
    title: text('Osobní rozsah 9 rostlin a hmotnostní základ', 'Personal scope of 9 plants and the weight basis'),
    meaning: text(
      'Rozlišení osobně přičítaných 9 rostlin od skupinového součtu 31 a kontrola hmotnostního přepočtu mohou být materiálně významné. Návrh tuto otázku nastolil, ale veřejná paměť zatím nemá původní rozsudky a expertizu této věci.',
      'Distinguishing the 9 plants personally attributed from the group total of 31, and checking the weight calculation, may be material. The motion raised the issue, but the public memory does not yet hold the original judgments and expert opinion in this matter.'
    ),
    memoryRecordIds: [],
    jurisprudenceRefs: ['Tpjn 301/2013', '3 Tdo 687/2006'],
    boundary: text(
      'Před použitím je nutné ověřit přesný výrok, skutkovou větu, spolupachatelství, zajišťovací protokol a celý znalecký řetězec.',
      'Before use, the exact operative ruling, statement of facts, co-perpetration findings, seizure protocol, and full expert-evidence chain must be checked.'
    )
  },
  {
    id: 'eu-notification',
    trafficBand: 'amber-3',
    score: 6,
    title: text('Technické předpisy a oznamovací povinnost EU', 'Technical regulations and EU notification duties'),
    meaning: text(
      'Návrh z roku 2022 tuto právní osu rozvinul a současná veřejná paměť obsahuje judikatorně podložený důvod ji prověřovat ustanovení po ustanovení a podle časově účinného znění.',
      'The 2022 motion developed this legal line, and the current public memory contains case-law-based reasons to verify it provision by provision and under the wording in force at the relevant time.'
    ),
    publicAxisIndexes: [0],
    memoryRecordIds: [],
    jurisprudenceRefs: [],
    boundary: text(
      'Nenotifikace konkrétní technické normy automaticky neruší celý zákon ani sama neprokazuje nezákonnost odsouzení.',
      'Failure to notify a particular technical rule does not automatically invalidate an entire statute or by itself prove that the conviction was unlawful.'
    )
  },
  {
    id: 'attempt-classification',
    trafficBand: 'amber-2',
    score: 5,
    title: text('Pokus, dokonání a právní kvalifikace', 'Attempt, completion, and legal classification'),
    meaning: text(
      'Návrh namítal právní kvalifikaci skutku. V nové verzi má tato osa zůstat oddělená od nových důkazů, aby starší právní argument nebyl nesprávně vydáván za novou skutečnost.',
      'The motion challenged the legal classification of the conduct. In a new version, this line should remain separate from new evidence so that an older legal argument is not incorrectly presented as a new fact.'
    ),
    memoryRecordIds: [],
    jurisprudenceRefs: [],
    boundary: text(
      'Aktuální sdílená paměť sama nepřidává nový skutkový důkaz k této právní námitce.',
      'The current shared memory does not itself add new factual evidence to this legal objection.'
    )
  },
  {
    id: 'current-situation',
    trafficBand: 'green-2',
    score: 2,
    title: text('Podmíněné propuštění a současný účel podání', 'Conditional release and the filing’s current purpose'),
    meaning: text(
      'Autorem potvrzené podmíněné propuštění dne 14. 7. 2026 mění současnou situaci L. CH. a formulaci požadovaného praktického výsledku.',
      'The author-confirmed conditional release on 14 July 2026 changes L. CH.’s current situation and the formulation of the practical relief sought.'
    ),
    memoryRecordIds: [],
    jurisprudenceRefs: [],
    boundary: text(
      'Podmíněné propuštění samo nevypovídá o správnosti původního odsouzení ani samo nezakládá důvod obnovy.',
      'Conditional release says nothing by itself about the correctness of the original conviction and does not itself establish a ground for reopening.'
    )
  }
];

export const PRISONER_REOPENING_UPDATE = Object.freeze({
  id: 'lch-reopening-2022',
  version: 'v2.5',
  testedAt: '2026-07-20',
  subjectLabel: 'L. CH.',
  title: text(
    'Návrh na obnovu L. CH. z roku 2022: 9/9 relevance k novým důkazům o metodice THC',
    'L. CH.’s 2022 motion to reopen: 9/9 relevance to new evidence about THC methodology'
  ),
  summary: text(
    'První anonymizovaný test dokumentu jiné osoby ukazuje, co se změní, když se starší návrh porovná s důkazní a judikatorní pamětí dostupnou 20. 7. 2026. Hodnota 9/9 měří sílu průniku a prioritu lidského přepracování — nikoli šanci na úspěch.',
    'The first anonymized test of another person’s document shows what changes when an older motion is compared with the evidence and case-law memory available on 20 July 2026. The 9/9 value measures strength of overlap and priority for human reworking—not the likelihood of success.'
  ),
  source: {
    pages: 10,
    documentLabel: text('Návrh na obnovu řízení z roku 2022', 'Motion to reopen proceedings from 2022'),
    status: text('soukromý originál zkontrolován; veřejně se nezveřejňuje', 'private original reviewed; not publicly released'),
    digest: PRISONER_REOPENING_DIGESTS.privateOriginal,
    sourceStatements
  },
  publicContext: {
    label: text('L. CH. z dokumentu České televize Smoke (2025)', 'L. CH. from Czech Television’s documentary Smoke (2025)'),
    url: 'https://www.ceskatelevize.cz/porady/16298026696-smoke/',
    linkLabel: text('Přehrát dokument Smoke v iVysílání České televize', 'Watch Smoke on Czech Television’s iVysílání'),
    boundary: text(
      'Odkaz dokládá veřejný kontext filmu. Neprokazuje údaje přijaté pouze z autorova testovacího zadání ani důvodnost obnovy.',
      'The link establishes the film’s public context. It does not prove facts accepted only from the author’s test instructions or the merits of reopening.'
    )
  },
  courtPathAddedIn: 'v2.6',
  courtPath: [
    {
      court: text('Krajský soud v Brně', 'Brno Regional Court'),
      date: '2019-02-28',
      reference: '50 T 7/2018-603',
      sourceStatus: text(
        'rozsudek citovaný v soukromém návrhu z roku 2022',
        'judgment cited in the private 2022 motion'
      )
    },
    {
      court: text('Vrchní soud v Olomouci', 'Olomouc High Court'),
      date: '2019-11-06',
      reference: '5 To 39/2019-707',
      sourceStatus: text(
        'odvolací rozhodnutí citované v soukromém návrhu z roku 2022',
        'appellate decision cited in the private 2022 motion'
      )
    }
  ],
  authorBaseline: {
    label: text('AUTOREM POTVRZENÝ ZÁKLAD ŘÍZENÉHO TESTU', 'AUTHOR-CONFIRMED CONTROLLED-TEST BASELINE'),
    confidence: text(
      'Pro toto přesně vymezené porovnání systém přijímá údaje autora jako dodaný základ. Nevydává je za výrok soudu ani nezávisle ověřené zjištění.',
      'For this precisely bounded comparison, the system accepts the author’s supplied facts as the baseline. It does not present them as a court statement or an independently verified finding.'
    ),
    facts: [
      text('L. CH. byl podle autora odsouzen za 9 rostlin konopí k trestu odnětí svobody na 8 let.', 'According to the author, L. CH. was sentenced to 8 years’ imprisonment for 9 cannabis plants.'),
      text('Po odpykání 6 let byl podle autora dne 14. 7. 2026 podmíněně propuštěn.', 'According to the author, after serving 6 years he was conditionally released on 14 July 2026.'),
      text('Autor uvádí, že návrh zpracoval ve vězení v roce 2022.', 'The author states that he prepared the motion in prison in 2022.'),
      text('Soudy, data a čísla jednací citovaná v soukromém návrhu se veřejně vypisují podle pokynu autora; jejich věcný obsah zůstává omezen na to, co dokládá zkontrolovaný návrh.', 'Courts, dates, and reference numbers cited in the private motion are displayed publicly at the creator’s direction; their substantive content remains limited to what the reviewed motion establishes.')
    ]
  },
  overall: {
    trafficBand: 'red-3',
    score: 9,
    label: text('EXTRÉM — HOŘÍ: relevance k přepracování', 'EXTREME — ON FIRE: relevance for reworking'),
    boundary: text(
      '9/9 není 100% šance na obnovu. Znamená nejvyšší zjištěný průnik k dnešní důkazní paměti a potřebu přednostní kontroly člověkem.',
      '9/9 is not a 100% chance of reopening. It means the strongest detected overlap with today’s evidence memory and a need for priority human review.'
    )
  },
  comparison,
  rewritePlan: [
    text('Začít pozdějšími úředními důkazy z roku 2025 a přesně vysvětlit, proč nebyly součástí návrhu z roku 2022.', 'Lead with the later official evidence from 2025 and explain precisely why it was not part of the 2022 motion.'),
    text('Oddělit nové skutečnosti a důkazy od starších právních námitek a u každého bodu popsat možný vliv na původní rozhodnutí.', 'Separate new facts and evidence from older legal objections and explain the possible effect of each point on the original decision.'),
    text('Srovnat v tabulce přesné výroky rozsudků a expertizy s pozdějšími úředními výroky o metodice; nic neparafrázovat bez citace.', 'Use a table to compare the exact statements in the judgments and expert opinion with the later official statements about methodology; paraphrase nothing without a citation.'),
    text('Vyžádat a prověřit použitý SOP, plán odběru, homogenizaci, řetězec předání, chromatogramy, nejistotu měření a rozlišení THC/THCA.', 'Obtain and review the SOP used, sampling plan, homogenization, chain of custody, chromatograms, measurement uncertainty, and distinction between THC and THCA.'),
    text('Samostatně vymezit 9 osobně přičítaných rostlin vůči skupinovému součtu a ověřit výpočet hmotnosti z původních listin.', 'Separately delimit the 9 personally attributed plants from the group total and verify the weight calculation against the original records.'),
    text('U každého tvrzeného nového důkazu projít test novosti a možné materiálnosti podle rámce Tpjn 302/2012 a 8 Tz 25/2015.', 'For each alleged new item of evidence, apply the novelty and potential-materiality framework under Tpjn 302/2012 and 8 Tz 25/2015.'),
    text('Oznamovací povinnost EU ponechat jako samostatně ověřovanou právní osu, nikoli jako automatický důvod neplatnosti celého zákona.', 'Keep the EU notification issue as a separately verified legal line, not as an automatic ground for invalidating the entire statute.'),
    text('Po podmíněném propuštění nově formulovat aktuální právní zájem a požadovaný výsledek; konečné podání musí zkontrolovat obhájce nad úplným spisem.', 'Following conditional release, reformulate the current legal interest and relief sought; defence counsel must review any final filing against the complete record.')
  ],
  publicationBoundary: text(
    'Na veřejném webu zůstává označení L. CH., anonymizované citace, výsledek porovnání a výslovně požadovaná procesní cesta se soudy, daty a čísly jednacími. Celé jméno, datum narození, adresy, věznice, podpisy a zdrojové PDF zůstávají neveřejné.',
    'The public website retains the label L. CH., anonymized quotations, the comparison result, and the expressly requested procedural path with courts, dates, and reference numbers. The full name, date of birth, addresses, prison, signatures, and source PDF remain private.'
  )
});

function localizeValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, 'cs') && Object.hasOwn(value, 'en')) return value[language];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]));
}

function attachMemoryEvidence(update, language) {
  const memory = localizeCaseMemory(CASE_MEMORY, language);
  const statements = new Map(memory.verifiedStatements.map((item) => [item.id, item]));
  const cases = new Map(memory.jurisprudence.map((item) => [item.reference, item]));
  update.comparison = update.comparison.map((item) => ({
    ...item,
    memoryEvidence: item.memoryRecordIds.map((id) => statements.get(id)).filter(Boolean),
    jurisprudence: item.jurisprudenceRefs.map((reference) => cases.get(reference)).filter(Boolean),
    publicAxes: (item.publicAxisIndexes ?? []).map((index) => memory.caseStudy.publicEvidenceAxes[index]).filter(Boolean)
  }));
  return update;
}

export function identifyPrisonerReopeningDigest(digest) {
  return digest === PRISONER_REOPENING_DIGESTS.privateOriginal ? 'private-original' : null;
}

export function localizePrisonerReopeningUpdate(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  return attachMemoryEvidence(localizeValue(PRISONER_REOPENING_UPDATE, lang), lang);
}
