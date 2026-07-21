const text = (cs, en) => ({ cs, en });

// Exact fingerprints are used only to route a locally selected, reviewed file.
// None of the private originals below is shipped with the public website.
export const CASE_BUNDLE_DIGESTS = Object.freeze({
  gfJkKszSupervision: '3b568697f435c836e038ff628117dcc672cf75660481ffbd6052a4a79a1903ba',
  gfJkAbolitionSubmission: 'e18d96d506b3ce5295de3d5f10a1be84edb777e17173b6a82a4fd31064052ba7',
  gfJkComplaint2026: '8e4fd42e6a4d84beb736bcf4e090a76dd8db81f45845cdbb8bc2de2fbebfff7d',
  gfJkSolidarityRequest: '92b895e1d5524fa48e7a1b0f637a13636f82a5db36a8849f79b8cc65687c736e',
  gfJkPresidentialMaterialsMarch11: '23f88a44b08682df629e0abb3c5424f79f1223f0d429d0cf132f5fe8878695bf',
  gfJkPresidentialMaterialsMarch14: '606b77d7218a7fe4a6931c46c55fddc54d689b21da3e19b0748c72b5cdddbc96',
  sharedKprDeliveryProof: '6935b023fc2be1f12cf772c4aeaf5dd95a205c4aa532676d19eda19b93730bc4',
  sharedKprDeliveryProofAlternateExport: 'c6d159186c10e5d22dcd5c7f1a907a761cd2172782ffcf9c332448c1487150df',
  sharedAmnestySignatures: '44e2a080dc16a861f76f93d34b095a81f85060f2c54a3608921fa2ebdc099700',
  sharedAssociationRegister: 'd33b7b473f94b595357a07102d34652a6a5a8d2028afb51edd0d226c079bafa9',
  sharedKprAmnestyResponse: 'd6f80054699c5b640dad0c779f59389629466560bc5a0e06bf74445f31a1e512',
  lchKprInformationResponse: 'bb68f3f211f7d8e49059b3b0444740359d870a40f1da919b98f17fff805bc8d2',
  lchKprForeignProceedingResponse: '54c6e446ec52db4b8885d227043607e9f1170c9099509a644bfa2e1395c5c26e',
  lchKprClemencyResponse: 'c25486b67a42ecf00fccc5947c5b5f950a25961a4fd0a45d879febe62150202d',
  ddClemencyRequest: 'adb902e3b57e98ffaa6ee00aa669377e54937f843b559fbc5bea0c586a1a7c6a',
  ddPresidentialSubmissionPdf: 'b920fb83792f62586fc5c0e94a133915e50375060e2b3124ad891cf7ce127d5d'
});

const GF_JK_IDS = new Set([
  'gfJkKszSupervision',
  'gfJkAbolitionSubmission',
  'gfJkComplaint2026',
  'gfJkSolidarityRequest',
  'gfJkPresidentialMaterialsMarch11',
  'gfJkPresidentialMaterialsMarch14'
]);

const bundleIndex = new Map(Object.entries(CASE_BUNDLE_DIGESTS).map(([id, digest]) => [digest, id]));

export function identifyCaseBundleDigest(digest) {
  return typeof digest === 'string' ? (bundleIndex.get(digest.toLowerCase()) ?? null) : null;
}

export function isGfJkEvidenceId(id) {
  return GF_JK_IDS.has(id);
}

const sourceExcerpts = Object.freeze({
  ksz: [
    'K námitkám týkajícím se způsobu zjišťování obsahu THC odbornými pracovišti OKTE státní zástupkyně uvedla, že nedisponuje předpisy, kterými se tato pracoviště řídí při odborném zkoumání rostlin konopí.',
    'dne 21. 8. 2024 byly vydány 3 rostliny marihuany, odstřiženy z květináče, a 1 sušená rostlina marihuany (původně na sítu k usušení) a dále 2 sklenice cca 2 dcl s obsahem sušiny marihuany',
    'zkoumáno bylo 42,4 g rostlinné hmoty a bylo zjištěno, že rostlinná hmota obsahuje 3,7 % THC, což v celkovém množství předloženého rostlinného materiálu představuje hmotnost 1,6 g THC.',
    'vzhledem k jejímu množství (celkem 8,2 g hmoty) nebylo stanoveno procento účinné látky ve vzorku, pouze bylo konstatováno, že také tato rostlinná hmota obsahuje THC.',
    'Váš poukaz, že jste konopí používali pouze k léčbě, nemá oporu v provedených důkazech',
    'v dané věci nebyla zjištěna pochybení policejního orgánu vyžadující zásah dozorového státního zastupitelství.'
  ].join(' '),
  abolitionSubmission: [
    'usnesení Okresního soudu v Ostravě dne 18.června 2025, č. j. 15 T 11/2025-122, kterým soud v trestním řízení proti paní G.F. a panu J.K. podle § 307, odst. 1 a 4 trestního řádu na dvanáct měsíců podmíněně pozastavil trestní řízení',
    'se starali o 3 ks rostlin s morfologickými znaky konopí setého',
    'a zároveň sušili 1 ks rostliny s morfologickými znaky konopí setého',
    'Soudkyně dne 18. června 2025 obviněným potvrdila, že ověřila jako pravdivé tvrzení lékařů o účelnosti používání cannabisterapie obviněnými.'
  ].join(' '),
  complaint: [
    'K naší žádosti o zastavení trestního řízení sp. zn. 15 T 11/2025 v důsledku netrestnosti našeho skutku dle trestní novely č. 270/2025 Sb. soud dne 13.ledna 2026 uvedl, cituji:',
    'Ve vašem případě šlo o pěstování celkem 6 kusů rostlin konopí setého a sušení dalšího 1 kusu rostliny konopí setého, vše s obsahem 3,7 % THC',
    'První pochybení (matematika a trestní právo): Soud pominul zásadní fakt',
    '42,4 gramů rostlinné hmoty využitelné pro toxikománii s obsahem 3,7 % THC, tj. 1,6 gramu THC'
  ].join(' '),
  delivery: [
    'Stav zprávy: Dodaná',
    'Datum a čas: 6. 3. 2026 v 14:06:51',
    'Stížnost - anonymizovaná - na postup soudu a další důkazy k abolici a amnestii - 1.března 2026.pdf'
  ].join(' ')
});

const facts = [
  {
    id: 'ksz-review',
    claim: text(
      'Krajské státní zastupitelství v Ostravě uvedlo, že nebylo zjištěno pochybení policie vyžadující zásah dozorového státního zastupitelství.',
      'The Ostrava Regional Public Prosecutor’s Office stated that it found no police error requiring intervention by the supervising public prosecutor’s office.'
    ),
    source: text('KSZ Ostrava, 27. 2. 2025, 2 KZT 59/2025-62', 'Ostrava Regional Public Prosecutor’s Office, 27 February 2025, 2 KZT 59/2025-62'),
    citation: sourceExcerpts.ksz.split(' ').slice(-14).join(' '),
    confidence: 'high'
  },
  {
    id: 'ksz-rules',
    claim: text(
      'Táž listina reprodukuje sdělení okresní státní zástupkyně, že neměla předpisy, podle nichž OKTE při odborném zkoumání rostlin konopí postupuje.',
      'The same document records the district public prosecutor’s statement that she did not possess the rules followed by OKTE when examining cannabis plants.'
    ),
    source: text('KSZ Ostrava, 27. 2. 2025, 2 KZT 59/2025-62', 'Ostrava Regional Public Prosecutor’s Office, 27 February 2025, 2 KZT 59/2025-62'),
    citation: sourceExcerpts.ksz.split(' v dané věci')[0].split('dne 21. 8. 2024')[0].trim(),
    confidence: 'high'
  },
  {
    id: 'ksz-lab',
    claim: text(
      'KSZ popsalo společné předložení tří rostlin a jedné sušené rostliny, zkoumání 42,4 g a výsledek 3,7 % THC; u dalších 8,2 g nebylo procento THC stanoveno.',
      'The prosecutor’s office described three plants and one dried plant submitted together, examination of 42.4 g, and a result of 3.7% THC; no THC percentage was determined for a further 8.2 g.'
    ),
    source: text('KSZ Ostrava, 27. 2. 2025, 2 KZT 59/2025-62', 'Ostrava Regional Public Prosecutor’s Office, 27 February 2025, 2 KZT 59/2025-62'),
    citation: 'zkoumáno bylo 42,4 g rostlinné hmoty a bylo zjištěno, že rostlinná hmota obsahuje 3,7 % THC, což v celkovém množství předloženého rostlinného materiálu představuje hmotnost 1,6 g THC.',
    confidence: 'high'
  },
  {
    id: 'delivery',
    claim: text(
      'Datová doručenka dokládá dodání podání s anonymizovanou stížností Kanceláři prezidenta republiky dne 6. 3. 2026.',
      'The data-box receipt records delivery to the Office of the President on 6 March 2026 of a submission attaching the anonymized complaint.'
    ),
    source: text('datová doručenka ze dne 6. 3. 2026', 'data-box delivery receipt dated 6 March 2026'),
    citation: 'Stav zprávy: Dodaná Datum a čas: 6. 3. 2026 v 14:06:51',
    confidence: 'high'
  }
];

const submittedClaims = [
  {
    id: 'conditional-discontinuance',
    claim: text(
      'Podání z 24. 6. 2025 uvádí, že soud usnesením 15 T 11/2025-122 trestní stíhání na dvanáct měsíců podmíněně zastavil.',
      'A submission dated 24 June 2025 states that order 15 T 11/2025-122 conditionally discontinued the prosecution for twelve months.'
    ),
    citation: 'usnesení Okresního soudu v Ostravě dne 18.června 2025, č. j. 15 T 11/2025-122, kterým soud v trestním řízení proti paní G.F. a panu J.K. podle § 307, odst. 1 a 4 trestního řádu na dvanáct měsíců podmíněně pozastavil trestní řízení',
    source: text('podání aliance ze dne 24. 6. 2025', 'alliance submission dated 24 June 2025'),
    confidence: 'medium'
  },
  {
    id: 'court-2026-quote',
    claim: text(
      'Stížnost z 1. 3. 2026 připisuje soudu sdělení o šesti pěstovaných a jedné sušené rostlině; původní soudní sdělení v dodaném balíku není.',
      'The complaint dated 1 March 2026 attributes to the court a statement about six growing plants and one drying plant; the original court communication is not in the supplied set.'
    ),
    citation: 'Ve vašem případě šlo o pěstování celkem 6 kusů rostlin konopí setého a sušení dalšího 1 kusu rostliny konopí setého, vše s obsahem 3,7 % THC',
    source: text('stížnost G. F. a J. K. ze dne 1. 3. 2026', 'G. F. and J. K. complaint dated 1 March 2026'),
    confidence: 'medium'
  },
  {
    id: 'medical-purpose',
    claim: text(
      'Podání z 24. 6. 2025 tvrdí, že soudkyně ověřila účelnost cannabisterapie; listina KSZ naproti tomu uvádí, že léčebný účel neměl oporu v provedených důkazech.',
      'The submission dated 24 June 2025 claims that the judge verified the usefulness of cannabis therapy; the prosecutor’s document, by contrast, states that the therapeutic-purpose claim lacked support in the evidence.'
    ),
    citation: 'Soudkyně dne 18. června 2025 obviněným potvrdila, že ověřila jako pravdivé tvrzení lékařů o účelnosti používání cannabisterapie obviněnými.',
    source: text('podání aliance ze dne 24. 6. 2025', 'alliance submission dated 24 June 2025'),
    confidence: 'medium'
  }
];

const relevance = [
  {
    id: 'primary-court-status', trafficBand: 'red-3', score: 9,
    title: text('Zjistit skutečný současný procesní stav', 'Establish the actual current procedural status'),
    headline: text('Chybí původní usnesení, právní moc a výsledek po zkušební době.', 'The original order, proof of finality, and post-probation outcome are missing.'),
    action: text('Opatřit usnesení 15 T 11/2025-122, doložku právní moci a případné rozhodnutí podle § 308 trestního řádu.', 'Obtain order 15 T 11/2025-122, proof of finality, and any decision under section 308 of the Code of Criminal Procedure.'),
    boundary: text('Podmíněné zastavení trestního stíhání není odsouzení. Bez výsledku po zkušební době nelze označit věc za pravomocně skončenou ani volit obnovu.', 'Conditional discontinuance is not a conviction. Without the post-probation outcome, the case cannot be described as finally concluded and reopening cannot be selected.')
  },
  {
    id: 'plant-count', trafficBand: 'red-2', score: 8,
    title: text('Sjednotit počet a procesní význam rostlin', 'Reconcile the plant counts and their procedural significance'),
    headline: text('Dodané texty pracují s 3 + 1, pěti a 6 + 1 rostlinami.', 'The supplied texts refer to 3 + 1, five, and 6 + 1 plants.'),
    action: text('Porovnat protokol o vydání věci, odborné vyjádření OKTE, návrh na potrestání, soudní usnesení a sdělení z 13. 1. 2026.', 'Compare the surrender record, OKTE expert statement, proposal for punishment, court order, and communication dated 13 January 2026.'),
    boundary: text('Rozdíl může mít skutkové nebo terminologické vysvětlení; bez prvotních listin nejde o prokázaný rozpor ani chybu soudu.', 'The difference may have a factual or terminological explanation; without the primary records it is not an established contradiction or judicial error.')
  },
  {
    id: 'methodology', trafficBand: 'red-3', score: 9,
    title: text('EXTRÉM — HOŘÍ: společný nový důkaz k postupu měření THC', 'EXTREME — ON FIRE: shared new evidence concerning the THC-measurement procedure'),
    headline: text('KSZ současně zaznamenalo absenci předpisů u státní zástupkyně a přijalo výsledek 3,7 % THC; ve spojení s pozdějšími úředními důkazy má tato osa relevanci 9/9.', 'The prosecutor’s document both recorded that the public prosecutor lacked the OKTE rules and accepted the 3.7% THC result; together with later official evidence, this line has 9/9 relevance.'),
    action: text('Opatřit úplné OKTE KRPT-2600-1/KT-2024, použitý SOP, záznam vzorkování, chromatogramy, nejistotu měření a oddělené výsledky jednotlivých položek.', 'Obtain the complete OKTE KRPT-2600-1/KT-2024 statement, the applied SOP, sampling record, chromatograms, measurement uncertainty, and item-specific results.'),
    boundary: text('Absence centrální policejní metodiky ani nedisponování předpisem samy neprokazují, že konkrétní měření bylo nesprávné.', 'The absence of a central police methodology or possession of the rules does not by itself prove that the particular measurement was wrong.')
  },
  {
    id: 'medical', trafficBand: 'amber-3', score: 6,
    title: text('Oddělit tvrzený léčebný účel od jeho důkazů', 'Separate the asserted therapeutic purpose from its evidence'),
    headline: text('KSZ a pozdější podání popisují význam zdravotních podkladů opačně.', 'The prosecutor’s document and a later submission describe the significance of the medical material differently.'),
    action: text('Opatřit původní lékařské zprávy a přesnou pasáž soudního usnesení, která hodnotí účel a relevanci léčby.', 'Obtain the original medical records and the precise passage of the court order evaluating therapeutic purpose and relevance.'),
    boundary: text('Zdravotní újma ani léčebná nezbytnost nejsou tímto balíkem samy prokázány.', 'Neither harm to health nor medical necessity is established by this set alone.')
  },
  {
    id: 'eu-law', trafficBand: 'amber-2', score: 5,
    title: text('Přiřadit každou unijní námitku orgánu, který o ní mohl rozhodnout', 'Assign each EU-law argument to the body competent to decide it'),
    headline: text('KSZ uvedlo, že státnímu zastupitelství nepřísluší předkládat trestní věc SDEU.', 'The prosecutor’s office stated that a public prosecutor’s office is not competent to refer the criminal case to the CJEU.'),
    action: text('Doložit, zda a jak byla předběžná otázka navržena příslušnému soudu a jak o ní soud rozhodl.', 'Document whether and how a preliminary reference was requested from the competent court and how the court decided it.'),
    boundary: text('Tato věta KSZ sama nedokládá porušení práva EU ani odmítnutí předběžné otázky soudem.', 'This sentence in the prosecutor’s document does not itself establish a breach of EU law or a court’s refusal to make a preliminary reference.')
  },
  {
    id: 'petitions', trafficBand: 'green-2', score: 2,
    title: text('KPR, amnestijní a solidární dokumenty', 'Presidential-office, amnesty, and solidarity records'),
    headline: text('Dokládají doručení, podporu a širší institucionální chronologii.', 'They record delivery, support, and the wider institutional chronology.'),
    action: text('Uchovat je v chronologii a nepoužívat je jako náhradu za chybějící soudní nebo laboratorní prvotní pramen.', 'Keep them in the chronology and do not use them in place of the missing primary court or laboratory record.'),
    boundary: text('Petice, podpisy ani doručenka samy nedokládají vadu měření nebo důvod konkrétního opravného prostředku.', 'Petitions, signatures, and a delivery receipt do not themselves establish a measurement defect or a ground for a particular remedy.')
  },
  {
    id: 'other-people', trafficBand: 'green-1', score: 1,
    title: text('Listiny Dušana Dvořáka a L. CH.', 'Dušan Dvořák and L. CH. records'),
    headline: text('Patří do jiných osobních a procesních větví.', 'They belong to different personal and procedural branches.'),
    action: text('Sdílet jen obecný důkazní kandidát, pokud se shoduje konkrétní metodika; nepřenášet procesní stav ani závěr jiné osoby.', 'Share only a general evidence candidate where the specific methodology matches; do not transfer another person’s procedural status or conclusion.'),
    boundary: text('Podobné konopné téma samo nezakládá relevanci pro vinu, obnovu ani výsledek věci G. F. a J. K.', 'A similar cannabis topic does not by itself establish relevance to guilt, reopening, or the outcome of G. F. and J. K.’s case.')
  }
];

const branches = [
  {
    id: 'gf-jk', trafficBand: 'red-3', score: 9,
    label: text('G. F. / J. K. — Ostrava', 'G. F. / J. K. — Ostrava'),
    headline: text('Nejdříve zjistit konečný procesní stav; zatím nejde bezpečně hodnotit obnovu řízení.', 'First establish the final procedural status; reopening cannot yet be assessed safely.'),
    fileCount: 6
  },
  {
    id: 'lch', trafficBand: 'red-1', score: 7,
    label: text('L. CH.', 'L. CH.'),
    headline: text('Tři odpovědi KPR doplňují samostatnou větev milosti, předání do Rakouska a informačního řízení.', 'Three presidential-office responses add a separate clemency, transfer-to-Austria, and information-law branch.'),
    fileCount: 3
  },
  {
    id: 'dd', trafficBand: 'amber-2', score: 5,
    label: text('Mgr. Dušan Dvořák', 'Mgr. Dušan Dvořák'),
    headline: text('Vlastní podání a žádost o milost zůstávají v autorově veřejné referenční větvi.', 'The creator’s submissions and clemency request remain in his public reference branch.'),
    fileCount: 2
  },
  {
    id: 'shared', trafficBand: 'green-2', score: 2,
    label: text('Společná institucionální a amnestijní dokumentace', 'Shared institutional and amnesty records'),
    headline: text('Podporuje společnou chronologii, ale nenahrazuje prvotní důkaz v žádné osobní kauze.', 'It supports the shared chronology but does not replace primary evidence in any personal case.'),
    fileCount: 4
  }
];

export const GF_JK_PROCEDURAL_UPDATE = Object.freeze({
  id: 'gf-jk-procedural-review',
  version: 'v2.7',
  testedAt: '2026-07-21',
  sourceInventory: {
    receivedFiles: 18,
    uniqueByteStreams: 17,
    substantiveRecords: 15,
    exactDuplicateCopies: 1,
    equivalentExportGroups: 2,
    publicSourceFilesAdded: 0
  },
  title: text(
    'G. F. a J. K.: společný nový důkaz k měření THC 9/9 — EXTRÉM, HOŘÍ',
    'G. F. and J. K.: shared new THC-measurement evidence 9/9 — EXTREME, ON FIRE'
  ),
  summary: text(
    'Osmnáct souborů bylo odděleno do čtyř osobních a institucionálních větví. Listina 2 KZT 59/2025-62 spojila výsledek 3,7 % THC s konkrétním odborným vyjádřením a současně zaznamenala, že státní zástupkyně neměla předpisy OKTE. Ve spojení s pozdějšími úředními důkazy má tato osa pro přezkum v roce 2026 relevanci 9/9.',
    'Eighteen files were separated into four personal and institutional branches. Record 2 KZT 59/2025-62 linked the 3.7% THC result to a particular expert statement while recording that the public prosecutor did not possess the OKTE rules. Together with later official evidence, this line has 9/9 relevance to review in 2026.'
  ),
  mainSentence: text(
    'Trestní věc stála na konopí a výsledku 3,7 % THC; nový společný důkaz ukazuje, že závazný a jednotný postup jeho měření nebyl doložen. Relevance pro přezkum: 9/9 — EXTRÉM, HOŘÍ.',
    'The criminal matter rested on cannabis and a 3.7% THC result; the shared new evidence shows that no binding and unified procedure for measuring it was demonstrated. Relevance to review: 9/9 — EXTREME, ON FIRE.'
  ),
  route: {
    status: 'evidence-review',
    label: text('DŮKAZNÍ RELEVANCE: 9/9 — HOŘÍ', 'EVIDENTIAL RELEVANCE: 9/9 — ON FIRE'),
    reason: text('Systém hodnotí význam dodaných podkladů pro přezkum v roce 2026; přesné procesní označení tehdejšího způsobu skončení věci zachovává odděleně.', 'The system assesses the significance of the supplied records to review in 2026 while preserving the exact procedural designation of the case’s disposition separately.')
  },
  branches,
  facts,
  submittedClaims,
  relevance,
  legalSources: [
    {
      reference: '§ 2 odst. 1 trestního zákoníku',
      title: text('pozdější příznivější zákon', 'later, more favourable criminal law'),
      url: 'https://e-sbirka.gov.cz/sb/2009/40'
    },
    {
      reference: '§ 285 trestního zákoníku',
      title: text('úprava účinná od 1. 1. 2026', 'rules effective from 1 January 2026'),
      url: 'https://e-sbirka.gov.cz/sb/2009/40'
    },
    {
      reference: '§§ 307–308 trestního řádu',
      title: text('podmíněné zastavení a rozhodnutí po zkušební době', 'conditional discontinuance and post-probation decision'),
      url: 'https://e-sbirka.gov.cz/sb/1961/141'
    },
    {
      reference: '§§ 277–278 trestního řádu',
      title: text('obnova až podle způsobu pravomocného skončení', 'reopening depends on the form of final disposition'),
      url: 'https://e-sbirka.gov.cz/sb/1961/141'
    }
  ],
  privacy: text(
    'Veřejný výstup používá pouze iniciály G. F. a J. K. Nezveřejňuje jejich jména, data narození, adresy, identifikátory datových schránek, podpisy, diagnózy ani soukromé zdrojové soubory. Názvy institucí, data, spisové značky a přesné relevantní výroky zůstávají dohledatelné.',
    'The public output uses only G. F. and J. K.’s initials. It does not publish their names, dates of birth, addresses, data-box identifiers, signatures, diagnoses, or private source files. Institutions, dates, case references, and precise relevant statements remain traceable.'
  ),
  publicationBoundary: text(
    'Semafor vyjadřuje relevanci dodaných důkazů pro přezkum, nikoli vinu, nezákonnost, právní nárok nebo pravděpodobnost úspěchu. Výroky orgánů, tvrzení podatelů, systémová kontrolní otázka a přesný procesní stav jsou zobrazeny odděleně.',
    'The traffic light expresses the supplied evidence’s relevance to review, not guilt, unlawfulness, legal entitlement, or likelihood of success. Institutional statements, party allegations, the system review question, and the exact procedural status are displayed separately.'
  )
});

function localize(value, language) {
  return typeof value === 'object' && value?.cs && value?.en
    ? value[language === 'en' ? 'en' : 'cs']
    : value;
}

export function localizeGfJkProceduralUpdate(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const localizeClaim = (item) => ({
    ...item,
    claim: localize(item.claim, lang),
    source: localize(item.source, lang)
  });
  return {
    ...GF_JK_PROCEDURAL_UPDATE,
    title: localize(GF_JK_PROCEDURAL_UPDATE.title, lang),
    summary: localize(GF_JK_PROCEDURAL_UPDATE.summary, lang),
    mainSentence: localize(GF_JK_PROCEDURAL_UPDATE.mainSentence, lang),
    route: {
      ...GF_JK_PROCEDURAL_UPDATE.route,
      label: localize(GF_JK_PROCEDURAL_UPDATE.route.label, lang),
      reason: localize(GF_JK_PROCEDURAL_UPDATE.route.reason, lang)
    },
    branches: GF_JK_PROCEDURAL_UPDATE.branches.map((item) => ({
      ...item,
      label: localize(item.label, lang),
      headline: localize(item.headline, lang)
    })),
    facts: GF_JK_PROCEDURAL_UPDATE.facts.map(localizeClaim),
    submittedClaims: GF_JK_PROCEDURAL_UPDATE.submittedClaims.map(localizeClaim),
    relevance: GF_JK_PROCEDURAL_UPDATE.relevance.map((item) => ({
      ...item,
      title: localize(item.title, lang),
      headline: localize(item.headline, lang),
      action: localize(item.action, lang),
      boundary: localize(item.boundary, lang)
    })),
    legalSources: GF_JK_PROCEDURAL_UPDATE.legalSources.map((item) => ({
      ...item,
      title: localize(item.title, lang)
    })),
    privacy: localize(GF_JK_PROCEDURAL_UPDATE.privacy, lang),
    publicationBoundary: localize(GF_JK_PROCEDURAL_UPDATE.publicationBoundary, lang)
  };
}

export const GF_JK_SOURCE_EXCERPTS = sourceExcerpts;
