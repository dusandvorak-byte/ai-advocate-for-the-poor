const text = (cs, en) => ({ cs, en });

// These fingerprints route only the five records reviewed on 21 July 2026.
// The private source PDFs are not included in the public deployment.
export const DD_LIVE_V3_DIGESTS = Object.freeze({
  ministerInteriorResponse: 'f2a93da5eb4a5b6c8c5d7275521af748c40ca63cbd5f1e84689853e9c9b29d58',
  policeExactDuplicate: '1038a80c8e57a4e4ecd3fb4f511ce9e7a6cf129634f5b193397391f9295966c7',
  brnoProsecutorReview: '69cc0bd0262cf6f333402fb4f1a0f9ca7d061e1c65fce5827300f94937e54055',
  reopeningMotionPrimary: 'e59f9ffde1001d232bd27d1017911d31ba85113413a8aec768d31d2c001ce691',
  preventiveFilingPrimary: '67b3d88af8a2f78f4d9e7fc73fa894f4379e37c57d06663e9ccf0b95bb5d15f5'
});

const digestIndex = new Map(Object.entries(DD_LIVE_V3_DIGESTS).map(([id, digest]) => [digest, id]));

export function identifyDdLiveV3Digest(digest) {
  return typeof digest === 'string' ? (digestIndex.get(digest.toLowerCase()) ?? null) : null;
}

const documents = [
  {
    id: 'ministerInteriorResponse',
    date: '2026-07-21',
    institution: text('Ministerstvo vnitra — Odbor komunikace', 'Ministry of the Interior — Communications Department'),
    reference: 'MV-114818-2/TP-2026',
    pages: 1,
    intakeClass: 'new-official',
    intakeLabel: text('NOVÁ ÚŘEDNÍ LISTINA', 'NEW OFFICIAL RECORD'),
    priority: 9,
    trafficBand: 'red-3',
    mainSentence: text(
      'Ministerstvo potvrdilo přijetí dvou podání z 15. a 17. července, ale odpovědělo pouze, že nemůže pomoci a věc nepovažuje za svou působnost.',
      'The Ministry confirmed receipt of two submissions dated 15 and 17 July, but responded only that it could not assist and did not consider the matter within its competence.'
    ),
    citation: text(
      '„Vámi uváděné skutečnosti se nevztahují k působnosti ministerstva.“',
      '“The matters you describe do not fall within the Ministry’s competence.”'
    ),
    before: text(
      'Paměť znala dvě autorem označené stížnostní větve, ale neměla jejich společnou odpověď ze dne 21. července.',
      'The memory knew two creator-identified complaint branches but did not contain their joint response dated 21 July.'
    ),
    after: text(
      'Vznikl nový přesně označený uzel MV-114818-2/TP-2026. Listina se zapisuje jako odmítnutí pomoci pro tvrzenou nepříslušnost, nikoli jako věcné posouzení stížností, vyloučení ministra nebo soudní rozhodnutí.',
      'A new exactly referenced node, MV-114818-2/TP-2026, was created. The record is classified as refusal to assist on stated competence grounds, not a merits assessment, ministerial recusal, or judicial decision.'
    ),
    targets: ['MV-108890-3/TP-2026', 'MV-97289/TP-2026', '18 A 17/2026'],
    boundary: text(
      'Odpověď uvádí pouze data obou podání, nikoli jejich čísla jednací. Přiřazení ke dvěma autorem uvedeným značkám musí být potvrzeno doručenkami nebo obsahem podání.',
      'The response identifies the two submissions only by date, not by their references. Matching them to the two creator-provided references requires delivery receipts or the filings themselves.'
    )
  },
  {
    id: 'policeExactDuplicate',
    date: '2026-07-20',
    institution: text('Policie ČR — KŘP Olomouckého kraje, Územní odbor Prostějov', 'Czech Police — Olomouc Regional Directorate, Prostějov Territorial Department'),
    reference: 'KRPM-100092-2/ČJ-2026-1412UO',
    pages: 1,
    intakeClass: 'exact-duplicate',
    intakeLabel: text('PŘESNÁ DUPLICITA — NEPOČÍTAT ZNOVU', 'EXACT DUPLICATE — DO NOT COUNT AGAIN'),
    priority: 9,
    trafficBand: 'red-3',
    mainSentence: text(
      'Stejný soubor už paměť znala: potvrzuje přijetí výzvy dne 14. července a její uložení bez dalšího opatření, nikoli věcnou odpověď.',
      'The memory already knew this exact file: it records receipt of the demand on 14 July and filing without further action, not a substantive answer.'
    ),
    citation: text(
      '„bez přijetí dalšího opatření uloženo“',
      '“placed on file without further action”'
    ),
    before: text('Listina už měla přesný digitální otisk a devět zdrojově omezených vazeb.', 'The record already had an exact digital fingerprint and nine source-bounded links.'),
    after: text('Nové vložení nezměnilo počty, semafor ani právní závěr; pouze potvrdilo správnou deduplikaci.', 'The repeated input changed no count, traffic light, or legal conclusion; it only confirmed correct deduplication.'),
    targets: ['KRPM-100092/ČJ-2026-1412UO', '1 ZT 11/2010', 'KPR 4093/2026', '8 Ad 9/2026', '18 A 23/2026', '18 A 17/2026'],
    boundary: text('Hodnotící slova v názvu souboru nejsou obsahem policejní listiny.', 'Evaluative wording in the filename is not part of the police record.')
  },
  {
    id: 'brnoProsecutorReview',
    date: '2026-07-21',
    institution: text('Krajské státní zastupitelství v Brně', 'Brno Regional Public Prosecutor’s Office'),
    reference: '1 KZT 475/2026-32',
    pages: 1,
    intakeClass: 'new-official',
    intakeLabel: text('NOVÁ ÚŘEDNÍ LISTINA', 'NEW OFFICIAL RECORD'),
    priority: 9,
    trafficBand: 'red-3',
    mainSentence: text(
      'KSZ Brno potvrdilo, že po opatření spisů přezkoumá postup OSZ Prostějov ve věci 1 ZT 11/2010 a vyrozumí autora o výsledku.',
      'The Brno Regional Public Prosecutor’s Office confirmed that, after obtaining the files, it will review the conduct of the Prostějov District Public Prosecutor’s Office in matter 1 ZT 11/2010 and notify the creator of the result.'
    ),
    citation: text(
      '„Po opatření příslušných spisových materiálů bude věc přezkoumána.“',
      '“After the relevant files have been obtained, the matter will be reviewed.”'
    ),
    before: text(
      'Žádost o přezkum ze dne 10. července byla v paměti jako autorem potvrzené podání bez přesné navazující značky a bez potvrzení, že přezkum začne.',
      'The review request dated 10 July was recorded as a creator-confirmed filing without an exact follow-on reference or confirmation that review would begin.'
    ),
    after: text(
      'Vznikla přesná přezkumná větev 1 KZT 475/2026-32 se stavem „spisy budou opatřeny a věc přezkoumána“. Nejde ještě o výsledek přezkumu ani potvrzení pochybení OSZ.',
      'An exact review branch, 1 KZT 475/2026-32, was created with status “files to be obtained and matter to be reviewed”. This is not yet the review outcome or confirmation of error by the district prosecutor.'
    ),
    targets: ['1 KZT 475/2026-32', '1 ZT 11/2010', '2 T 104/2010 a další', 'preventivní podání 12. 7. 2026'],
    boundary: text(
      'Záhlaví označuje podání ze dne 10. 7. 2026, zatímco tělo uvádí 10. 7. 2025. Rozpor roku musí být ověřen; systém jej tiše neopravuje.',
      'The heading identifies a filing dated 10 July 2026, while the body states 10 July 2025. The year discrepancy requires verification and is not silently corrected.'
    )
  },
  {
    id: 'reopeningMotionPrimary',
    date: '2026-07-12',
    institution: text('Podání Mgr. Dušana Dvořáka Okresnímu soudu v Prostějově', 'Filing by Mgr. Dušan Dvořák to the Prostějov District Court'),
    reference: text('2 T 104/2010; 2 T 65/2011 / 2 Nt 1257/2013; 2 Nt 1151/2014; 3 Nt 1151/2014', '2 T 104/2010; 2 T 65/2011 / 2 Nt 1257/2013; 2 Nt 1151/2014; 3 Nt 1151/2014'),
    pages: 15,
    intakeClass: 'source-upgrade',
    intakeLabel: text('ZNÁMÁ UDÁLOST — NOVĚ PRVOTNÍ PDF', 'KNOWN EVENT — PRIMARY PDF NOW SUPPLIED'),
    priority: 9,
    trafficBand: 'red-3',
    mainSentence: text(
      'Předložené PDF přesně dokládá obsah společného návrhu na obnovu prvních čtyř trestních řízení a seznam 28 označených důkazních položek.',
      'The supplied PDF precisely establishes the contents of the joint motion to reopen the first four criminal proceedings and its list of 28 identified evidential items.'
    ),
    citation: text(
      '„Jestliže byl navrhovatel … trestán … podle obsahu THC, musí být zpětně přezkoumatelně doloženo … jakou metodou … byla tato hranice určována.“',
      '“Where the applicant was punished on the basis of THC content, the method by which that threshold was determined must be retrospectively reviewable.”'
    ),
    before: text(
      'Paměť znala existenci návrhu, jeho účel a čtyři cílové věci pouze jako autorův procesní záznam.',
      'The memory knew the existence, purpose, and four target matters only as the creator’s procedural record.'
    ),
    after: text(
      'Zdrojový stav se změnil na „obsah doložen předloženým patnáctistránkovým PDF“. Samotné PDF však bez doručenky nebo soudního záznamu nedokládá doručení, zahájení řízení, společné projednání ani názor soudu.',
      'Source status changed to “contents established by the supplied fifteen-page PDF”. Without a delivery receipt or court record, the PDF does not establish filing, commencement, consolidation, or the court’s view.'
    ),
    targets: ['2 T 104/2010', '2 T 65/2011', '2 Nt 1257/2013', '2 Nt 1151/2014', '3 Nt 1151/2014'],
    boundary: text(
      'Právní a skutkové závěry v návrhu jsou tvrzení navrhovatele. Dokument dokládá, co žádá a čím to odůvodňuje; nedokládá, že soud důvody přijal.',
      'The legal and factual conclusions are the applicant’s submissions. The document establishes what he seeks and why; it does not establish that the court accepted those grounds.'
    )
  },
  {
    id: 'preventiveFilingPrimary',
    date: '2026-07-12',
    institution: text('Podání Mgr. Dušana Dvořáka OS Prostějov, Policii ČR a na vědomí OSZ Prostějov', 'Filing by Mgr. Dušan Dvořák to the Prostějov District Court, Czech Police, and copied to the district prosecutor'),
    reference: text('úroda 2026; 2 T 104/2010 a další; 1 ZT 11/2010', '2026 crop; 2 T 104/2010 and others; 1 ZT 11/2010'),
    pages: 49,
    intakeClass: 'source-upgrade',
    intakeLabel: text('ZNÁMÁ UDÁLOST — NOVĚ PRVOTNÍ PDF', 'KNOWN EVENT — PRIMARY PDF NOW SUPPLIED'),
    priority: 9,
    trafficBand: 'red-3',
    mainSentence: text(
      'Předložené PDF dokládá preventivní nabídku součinnosti a žádost o mírnější prostředky před případným zásahem v pěstebním roce 2026.',
      'The supplied PDF establishes a preventive offer of cooperation and request for less intrusive measures before any intervention in the 2026 cultivation year.'
    ),
    citation: text(
      '„Toto podání není žádostí o výjimku ze zákona ani žádostí o jakoukoli imunitu před zákonem.“',
      '“This filing is not a request for an exemption from the law or for any immunity from the law.”'
    ),
    before: text(
      'Paměť znala preventivní podání ze 12. července jako událost propojenou s pozdější předžalobní výzvou a policejním sdělením.',
      'The memory knew the preventive filing dated 12 July as an event linked to the later pre-action demand and police notice.'
    ),
    after: text(
      'Zdrojový stav se změnil na „obsah doložen předloženým devětačtyřicetistránkovým PDF“. Lze přesně oddělit jeho účel, adresáty, označené spisy a navržené mírnější prostředky; doručení a reakce každého adresáta se musí doložit samostatně.',
      'Source status changed to “contents established by the supplied forty-nine-page PDF”. Its purpose, recipients, referenced files, and proposed less intrusive measures can now be separated precisely; delivery and each recipient’s response require separate proof.'
    ),
    targets: ['2 T 104/2010', '2 Nt 1257/2013', '2 Nt 1151/2014', '3 Nt 1151/2014', '1 ZT 11/2010', 'KRPM-100092/ČJ-2026-1412UO'],
    boundary: text(
      'Dokument dokládá obsah autorova preventivního podání. Sám nedokládá souhlas policie nebo soudu, zákonnost pěstování, bezprostřední hrozbu zásahu ani vznik lhůty.',
      'The document establishes the contents of the creator’s preventive filing. It does not itself establish police or court agreement, legality of cultivation, an imminent intervention, or a deadline.'
    )
  }
];

export const DD_LIVE_V3_UPDATE = Object.freeze({
  version: 'v3.2',
  reviewedAt: '2026-07-21',
  title: text(
    'Pět dnešních PDF: jedna duplicita, dvě povýšení zdroje a dvě nové úřední listiny',
    'Five PDFs supplied today: one duplicate, two source upgrades, and two new official records'
  ),
  summary: text(
    'Pět přijatých PDF představuje čtyři nové nebo nově doložené věcné záznamy. Přesná policejní duplicita nic nenavyšuje. Každý záznam níže ukazuje, co bylo známo před vložením, co listina skutečně změnila a kam se smí propsat.',
    'Five received PDFs represent four new or newly evidenced substantive records. The exact police duplicate increases nothing. Each record below shows what was known before insertion, what the record actually changed, and where it may propagate.'
  ),
  metrics: {
    receivedFiles: 5,
    knownBeforeInsertion: 3,
    newEvents: 2,
    exactDuplicates: 1,
    sourceUpgrades: 2,
    newOfficialRecords: 2,
    substantiveNewOrUpgraded: 4,
    publicSourceFilesAdded: 0
  },
  documents,
  privacy: text(
    'Veřejná vrstva zachovává jméno autora, instituce, data a spisové značky. Nezveřejňuje jeho adresu, datum narození, datovou schránku, podpisová data ani soukromé originály.',
    'The public layer retains the creator’s name, institutions, dates, and references. It does not publish his address, date of birth, data-box identifier, signature data, or private originals.'
  ),
  deadlineRule: text(
    'Žádná z pěti listin sama nestanoví novou zákonnou lhůtu k reakci. Červená 9/9 vyjadřuje význam pro živé větve a potřebu rychlé lidské kontroly, nikoli automatický opravný prostředek.',
    'None of the five records itself sets a new statutory response deadline. Red 9/9 records significance to live branches and the need for prompt human review, not an automatic remedy.'
  )
});

function localizeValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, 'cs') && Object.hasOwn(value, 'en')) return value[language];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]));
}

export function localizeDdLiveV3Update(language = 'cs') {
  return localizeValue(DD_LIVE_V3_UPDATE, language === 'en' ? 'en' : 'cs');
}
