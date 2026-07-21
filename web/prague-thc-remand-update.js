const text = (cs, en) => ({ cs, en });

export const PRAGUE_THC_DIGESTS = Object.freeze({
  courtOrder: '407d350451ef0e97735ce85aa6e371af527c25ee5f582be959952cc5e07b0560',
  creatorRequest: 'fabf256fc5056f680a4f8c212f468f867a90131e252b103c8365db8ba1d72d2c'
});

const courtFacts = [
  {
    claim: text(
      'Vrchní soud v Praze rozhodl dne 29. 7. 2025 pod č. j. 11 To 88/2024-2990: zrušil výrok o vině, navazující tresty a zabrání věci z rozsudku Městského soudu v Praze ze dne 7. 5. 2024, č. j. 45 T 1/2024-2430, a podle § 259 odst. 1 trestního řádu věc vrátil Městskému soudu v Praze k novému projednání a rozhodnutí.',
      'On 29 July 2025, in ref. 11 To 88/2024-2990, the High Court in Prague quashed the findings of guilt, the related sentences and forfeiture order in the Prague Municipal Court judgment of 7 May 2024, ref. 45 T 1/2024-2430, and returned the matter to the Prague Municipal Court for a new hearing and decision under Section 259(1) of the Code of Criminal Procedure.'
    ),
    confidence: 'high',
    citation: 'napadený rozsudek zrušuje ve výroku o vině a trestech […] a […] věc […] vrací soudu prvního stupně',
    citationTranslation: 'the challenged judgment is quashed as to guilt and sentence […] and […] the case […] is returned to the first-instance court'
  },
  {
    claim: text(
      'Bod 31 označuje za poměrně zásadní pochybení, že soud opíral trestní odpovědnost o vlastní laické chemické a biologické úsudky místo odborných důkazů.',
      'Paragraph 31 calls it a fairly fundamental error that criminal liability rested on the court’s own lay chemical and biological reasoning instead of expert evidence.'
    ),
    confidence: 'high',
    citation: 'Poměrně zásadním pochybením […] bylo to, že […] využíval svých vlastních „odborných“ či spíše laických […] úsudků',
    citationTranslation: 'A fairly fundamental error […] was that […] it used its own “expert”, or rather lay, reasoning'
  },
  {
    claim: text(
      'Bod 34 přímo uvádí, že z popisu skutku nebylo možné rozlišit, zda šlo o konopí zakázané, nebo legální.',
      'Paragraph 34 directly states that the description of the offence did not allow prohibited cannabis to be distinguished from lawful cannabis.'
    ),
    confidence: 'high',
    citation: 'z popisu skutku uvedeného ve výroku o vině nelze rozklíčovat',
    citationTranslation: 'the description of the offence in the finding of guilt does not allow the matter to be disentangled'
  },
  {
    claim: text(
      'Bod 35 uvádí, že stopa s výsledkem 1,0 % THC nedosahovala parametrů látky, s níž bylo zakázáno zacházet bez povolení.',
      'Paragraph 35 states that the trace measured at 1.0% THC did not meet the parameters of a substance prohibited without authorization.'
    ),
    confidence: 'high',
    citation: 'stopa č. 8 nedosahovala parametrů látky, s níž je zakázáno bez povolení zacházet',
    citationTranslation: 'trace no. 8 did not meet the parameters of a substance that may not be handled without authorization'
  },
  {
    claim: text(
      'Bod 39 požaduje, aby soud znalecký posudek sám kontroloval a hodnotil, nikoli pouze přebíral jeho výsledky do rozsudku.',
      'Paragraph 39 requires the court to review and evaluate the expert opinion itself rather than merely copy its results into the judgment.'
    ),
    confidence: 'high',
    citation: 'Soud by tedy neměl jen „přebírat“ výsledky do výroku rozsudku, ale měl by i znalecký posudek podrobit určité vlastní kontrole',
    citationTranslation: 'The court should not merely “copy” results into the operative part, but should subject the expert opinion to its own review'
  },
  {
    claim: text(
      'Bod 41 označuje za stěžejní důvod zrušení rozsudku jeho naprostou nepřezkoumatelnost; výhrady k THC byly tedy součástí širšího souboru vad.',
      'Paragraph 41 identifies the judgment’s complete unreviewability as the central ground for quashing it; the THC issues therefore formed part of a broader set of defects.'
    ),
    confidence: 'high',
    citation: 'Stěžejním důvodem pro zrušení napadeného rozsudku je však jeho naprostá nepřezkoumatelnost',
    citationTranslation: 'The central reason for quashing the challenged judgment is, however, its complete unreviewability'
  }
];

const courtOrder = Object.freeze({
  version: 'v3.1-predeadline',
  title: text(
    'Vrchní soud: z rozsudku nešlo rozlišit legální a zakázané konopí',
    'High Court: the judgment did not distinguish lawful from prohibited cannabis'
  ),
  source: {
    institution: text('Vrchní soud v Praze', 'High Court in Prague'),
    documentDate: '2025-07-29',
    reference: '11 To 88/2024-2990',
    returnedJudgment: text(
      'Rozsudek Městského soudu v Praze ze dne 7. 5. 2024, č. j. 45 T 1/2024-2430; věc vrácena Městskému soudu v Praze podle § 259 odst. 1 trestního řádu k novému projednání a rozhodnutí.',
      'Prague Municipal Court judgment of 7 May 2024, ref. 45 T 1/2024-2430; matter returned to the Prague Municipal Court for a new hearing and decision under Section 259(1) of the Code of Criminal Procedure.'
    ),
    recognition: text('částečně anonymizovaný soudní opis rozpoznán přesným digitálním otiskem;', 'partially anonymized court copy recognized by its exact digital fingerprint;'),
    status: text('Částečně anonymizovaný opis byl zkontrolován lokálně. Zdrojové PDF se nezveřejňuje.', 'The partially anonymized copy was reviewed locally. The source PDF is not published.'),
    privacy: text('jména a osobní údaje obžalovaných se ve veřejném výstupu nepřebírají.', 'defendants’ names and personal data are not carried into the public output.')
  },
  deadline: {
    label: text('Lhůta v usnesení', 'Deadline in the order'),
    value: text('Neuvedena', 'Not stated'),
    explanation: text('Usnesení pouze uvádí, že proti němu není řádný opravný prostředek přípustný. Říjnový termín roku 2026 potvrzuje autor odděleně; tato listina jej neobsahuje.', 'The order states only that no ordinary remedy is available. The creator separately reports an October 2026 hearing; this record does not state that date.')
  },
  systemicFinding: {
    label: text('NOVÝ PŘÍMÝ SOUDNÍ DŮKAZ · 9/9 — EXTRÉM, HOŘÍ', 'NEW DIRECT JUDICIAL EVIDENCE · 9/9 — EXTREME, ON FIRE'),
    headline: text(
      'Vrchní soud v Praze dne 29. 7. 2025 zrušil výrok o vině a navazující výroky v rozsudku č. j. 45 T 1/2024-2430: u části konopí z něj nešlo poznat, zda bylo legální, nebo zakázané.',
      'On 29 July 2025, the High Court in Prague quashed the findings of guilt and related rulings in judgment ref. 45 T 1/2024-2430: for part of the cannabis, the judgment did not show whether the material was lawful or prohibited.'
    ),
    explanation: text(
      'Body 31–40 samostatně vytýkají laické úsudky z chemie a biologie, nejasné hodnocení výsledku 1,0 % THC, chybějící odborný přezkum a pouhé přebírání znaleckých závěrů. Nový dokument proto mění dřívější autorské tvrzení na nezávisle doloženou soudní paralelu stejného praktického problému rozlišení.',
      'Paragraphs 31–40 separately criticize lay chemical and biological reasoning, unclear treatment of a 1.0% THC result, missing expert review, and mere copying of expert conclusions. The new record therefore changes an earlier creator claim into an independently documented judicial parallel concerning the same practical distinction problem.'
    ),
    limitation: text(
      'Usnesení neříká, že v České republice neexistuje závazný měřicí předpis, a nerozhoduje ostatní kauzy. Rozsudek zrušilo z více procesních i věcných důvodů a nenařídilo zproštění obžaloby.',
      'The order does not state that no binding measurement rule exists in the Czech Republic and does not decide the other cases. It quashed the judgment for several procedural and substantive reasons and did not direct an acquittal.'
    ),
    citations: [
      'z popisu skutku uvedeného ve výroku o vině nelze rozklíčovat',
      'stopa č. 8 nedosahovala parametrů látky, s níž je zakázáno bez povolení zacházet'
    ]
  },
  comparison: {
    before: {
      label: text('PŘED NOVOU LISTINOU', 'BEFORE THE NEW RECORD'),
      title: text('Doložená autorská teze', 'Documented creator hypothesis'),
      state: text('Podání z 28. 11. 2024 dokládá, že autor žádal určit závazný postup pro rozlišení legálního a zakázaného konopí. Samo však bylo tvrzením podatele.', 'The filing of 28 November 2024 shows that the creator sought identification of a binding procedure for distinguishing lawful and prohibited cannabis. By itself, it was the filer’s claim.')
    },
    after: {
      label: text('PO NOVÉ LISTINĚ', 'AFTER THE NEW RECORD'),
      title: text('Nezávislý soudní pramen', 'Independent judicial source'),
      state: text('Vrchní soud v jiné živé trestní věci přímo popsal, že rozsudek nerozlišil legální a zakázané konopí a že chemické závěry vyžadují odborné podložení a soudní kontrolu.', 'In a different live criminal matter, the High Court directly described a judgment that failed to distinguish lawful from prohibited cannabis and held that chemical conclusions require expert support and judicial review.')
    },
    solution: [
      text('Přidat usnesení jako samostatný soudní uzel, nikoli jako opis autorského tvrzení.', 'Add the order as a separate judicial node, not as a repetition of the creator’s claim.'),
      text('U všech čtyř kontrolních kauz zobrazit relevanci 9/9 a porovnat konkrétní původní výrok o THC s body 31–40 tohoto usnesení.', 'Show 9/9 relevance in all four controlled cases and compare each original THC finding with paragraphs 31–40 of this order.'),
      text('Zachovat odděleně širší důvody zrušení, procesní stav pražské věci a skutečnost, že nejde o konečné zproštění.', 'Keep separate the broader grounds for quashing, the Prague matter’s procedural status, and the fact that this was not a final acquittal.')
    ]
  },
  facts: courtFacts,
  archiveOwnerStatement: {
    label: text('Význam podle autora archivu', 'Meaning according to the archive owner'),
    value: text('Autor považuje usnesení za první přímý soudní důkaz v paměti, že trestní rozsudek může selhat právě při rozlišení legálního a zakázaného konopí podle THC.', 'The archive owner regards the order as the memory’s first direct judicial evidence that a criminal judgment can fail precisely when distinguishing lawful from prohibited cannabis by THC.'),
    confidence: text('autorem potvrzená interpretace; soudní výroky jsou citovány odděleně', 'creator-confirmed interpretation; judicial findings are quoted separately')
  },
  creatorChronology: {
    label: text('AUTOREM POTVRZENÝ ŽIVÝ STAV', 'CREATOR-CONFIRMED LIVE STATUS'),
    statement: text('Autor uvádí, že nové projednání u Městského soudu v Praze je plánováno na říjen 2026.', 'The creator states that the renewed proceedings before the Prague Municipal Court are scheduled for October 2026.'),
    provenance: text('Autorem potvrzeno dne 21. 7. 2026.', 'Confirmed by the creator on 21 July 2026.'),
    boundary: text('Tento termín není obsažen v usnesení 11 To 88/2024-2990 a zobrazuje se proto jako oddělený autorský údaj.', 'That date does not appear in order 11 To 88/2024-2990 and is therefore displayed as a separate creator statement.')
  },
  doesNotProve: [
    text('Neprokazuje, že všechny české laboratoře používaly stejný nebo vadný postup.', 'It does not establish that every Czech laboratory used the same or a defective procedure.'),
    text('Neprokazuje automatický důvod obnovy ani výsledek jiné trestní věci.', 'It does not establish an automatic reopening ground or the outcome of another criminal matter.'),
    text('Nejde o konečné zproštění; Městský soud v Praze musí věc znovu projednat.', 'It is not a final acquittal; the Prague Municipal Court must hear the case again.')
  ],
  humanChecks: [
    text('Porovnat body 31–40 s původním znaleckým důkazem v každé ze čtyř testovaných kauz.', 'Compare paragraphs 31–40 with the original expert evidence in each of the four controlled cases.'),
    text('V každém výstupu citovat přesný odstavec usnesení a přesný původní výrok o THC; nepřenášet skutkový stav pražské věci.', 'In every output, cite the exact paragraph and the exact original THC finding; do not transfer the facts of the Prague matter.'),
    text('Nové projednání sledovat jako živou větev a přidávat pouze doložené procesní události.', 'Track the renewed proceedings as a live branch and add only documented procedural events.')
  ],
  relevance: [
    {
      level: 'direct', trafficBand: 'red-3', label: text('9/9 — PŘÍMÝ SOUDNÍ DŮKAZ', '9/9 — DIRECT JUDICIAL EVIDENCE'),
      targets: text('Vrchní soud v Praze 11 To 88/2024 → Městský soud v Praze 45 T 1/2024', 'High Court in Prague 11 To 88/2024 → Prague Municipal Court 45 T 1/2024'),
      reason: text('Výrok o vině, tresty a zabrání věci byly zrušeny; dokazování a hodnocení se musí opakovat a doplnit.', 'The findings of guilt, sentences, and forfeiture were quashed; evidence-taking and evaluation must be repeated and supplemented.'),
      action: text('Založit novou živou soudní větev a sledovat nové projednání.', 'Create a new live judicial branch and track the renewed proceedings.'),
      evidenceStatus: text('přímý výrok a odůvodnění odvolacího soudu', 'direct operative ruling and appellate reasoning'),
      citation: 'napadený rozsudek zrušuje ve výroku o vině a trestech […] a […] věc […] vrací soudu prvního stupně'
    },
    {
      level: 'direct', trafficBand: 'red-3', label: text('9/9 — SPOLEČNÁ DŮKAZNÍ OTÁZKA', '9/9 — SHARED EVIDENCE QUESTION'),
      targets: text('D. D. · L. CH. · M. K./J. K. · G. F./J. K.', 'D. D. · L. CH. · M. K./J. K. · G. F./J. K.'),
      reason: text('Jiný odvolací soudní spis přímo dokládá selhání rozlišení legálního a zakázaného konopí a potřebu odborně podložit THC závěr.', 'A separate appellate file directly documents a failure to distinguish lawful from prohibited cannabis and the need for expert support of the THC conclusion.'),
      action: text('Přidat jako nezávislou srovnávací listinu; u každé osoby zachovat její vlastní skutkový a procesní stav.', 'Add it as independent comparative evidence while preserving each person’s own facts and procedural status.'),
      evidenceStatus: text('přímý soudní pramen; mezikauzální relevance, nikoli přenos výsledku', 'direct judicial source; cross-case relevance, not transfer of outcome'),
      citation: 'z popisu skutku uvedeného ve výroku o vině nelze rozklíčovat'
    },
    {
      level: 'direct', trafficBand: 'red-3', label: text('9/9 — KONTROLA ZNALECKÉHO DŮKAZU', '9/9 — REVIEW OF EXPERT EVIDENCE'),
      targets: text('Postup měření THC, význam hranice a soudní hodnocení posudku', 'THC measurement procedure, threshold meaning, and judicial review of the expert opinion'),
      reason: text('Vrchní soud vytkl laické chemické úsudky, nejasný výklad výsledku 1,0 % THC a pouhé přebírání znaleckých výsledků.', 'The High Court criticized lay chemical reasoning, unclear treatment of a 1.0% THC result, and mere copying of expert results.'),
      action: text('V dalších výstupech oddělit naměřenou hodnotu, její právní význam, laboratorní postup a soudní hodnocení.', 'In later outputs, separate the measured value, its legal meaning, the laboratory procedure, and judicial evaluation.'),
      evidenceStatus: text('body 31–40 usnesení', 'paragraphs 31–40 of the order'),
      citation: 'Soud by tedy neměl jen „přebírat“ výsledky do výroku rozsudku'
    }
  ]
});

const creatorRequest = Object.freeze({
  version: 'v3.1-predeadline',
  title: text('Podání autora z 28. 11. 2024: dřívější doložená kontrolní otázka', 'Creator filing of 28 November 2024: earlier documented review question'),
  source: {
    institution: text('Odborná společnost Konopí je lék, z.s.', 'Cannabis is The Cure professional association'),
    documentDate: '2024-11-28',
    reference: text('žádost o informace a navazující podání', 'information request and related filing'),
    recognition: text('soukromý zdrojový PDF rozpoznán přesným digitálním otiskem;', 'private source PDF recognized by its exact digital fingerprint;'),
    status: text('Veřejný výstup přebírá pouze kontrolní otázku a datum. Adresa, data třetích osob a zdrojový PDF se nezveřejňují.', 'The public output carries over only the review question and date. Address data, third-party data, and the source PDF are not published.'),
    privacy: text('zobrazuje se zdrojově omezená autorská chronologie.', 'a source-bounded creator chronology is displayed.')
  },
  systemicFinding: {
    label: text('AUTORSKÉ PODÁNÍ — NIKOLI SOUDNÍ ZJIŠTĚNÍ', 'CREATOR FILING — NOT A JUDICIAL FINDING'),
    headline: text('Dokumentuje, že autor vznesl otázku závazného rozlišení legálního a zakázaného konopí už 28. 11. 2024.', 'It documents that the creator raised the question of a binding distinction between lawful and prohibited cannabis on 28 November 2024.'),
    explanation: text('Je důkazem data, obsahu a adresování autorského podání. Nové usnesení Vrchního soudu se vede jako samostatný pozdější soudní pramen.', 'It proves the date, content, and addressing of the creator’s filing. The new High Court order is kept as a separate later judicial source.'),
    limitation: text('Podání samo neprokazuje pravdivost právních a skutkových tvrzení, která obsahuje.', 'The filing alone does not establish the truth of the legal and factual claims it contains.'),
    citations: ['kdo je odpovědný za neexistující právně závazný předpis k zjištění legálního konopí']
  },
  comparison: {
    before: { label: text('PŘED PODÁNÍM', 'BEFORE THE FILING'), title: text('Otázka v paměti autora', 'Question in creator memory'), state: text('Kontrolní otázka nebyla v tomto uzlu datována jednou konkrétní listinou.', 'The review question had not been dated in this node by one specific record.') },
    after: { label: text('PO PODÁNÍ', 'AFTER THE FILING'), title: text('Doložená autorská chronologie', 'Documented creator chronology'), state: text('Je doloženo, že otázka byla vznesena a rozeslána dne 28. 11. 2024; nejde o odpověď adresovaných institucí.', 'It is documented that the question was raised and distributed on 28 November 2024; this is not an answer from the recipient institutions.') },
    solution: [text('Připojit k časové ose jako autorské podání.', 'Attach it to the timeline as a creator filing.'), text('Nezaměňovat jeho tvrzení za výrok soudu nebo ministra.', 'Do not rewrite its claims as a court or ministerial finding.')]
  },
  facts: [
    { claim: text('Podání je datováno 28. 11. 2024 a žádá určit, kdo odpovídá za tvrzeně chybějící závazný předpis.', 'The filing is dated 28 November 2024 and asks who is responsible for the alleged absence of a binding rule.'), confidence: 'high', citation: 'kdo je odpovědný za neexistující právně závazný předpis', citationTranslation: 'who is responsible for the non-existent legally binding rule' }
  ],
  archiveOwnerStatement: { label: text('Stav zdroje', 'Source status'), value: text('Autorské podání dokládá, co bylo tvrzeno a kdy; nedokládá samo správnost tvrzení.', 'The creator filing proves what was claimed and when; it does not itself prove the claim correct.'), confidence: text('přímý zdroj k autorské chronologii', 'direct source for creator chronology') },
  doesNotProve: [text('Nejde o odpověď ministra, soudu ani policie.', 'It is not a response by a minister, court, or police authority.')],
  humanChecks: [text('Spojit pouze s pozdějšími odpověďmi a rozhodnutími, která mají vlastní přesný pramen.', 'Link it only to later responses and decisions supported by their own exact sources.')],
  relevance: [
    { level: 'direct', trafficBand: 'red-3', label: text('9/9 — CHRONOLOGIE UPOZORNĚNÍ', '9/9 — NOTICE CHRONOLOGY'), targets: text('Autorská a institucionální paměť', 'Creator and institutional memory'), reason: text('Listina přesně datuje vznesení ústřední kontrolní otázky.', 'The record exactly dates the raising of the central review question.'), action: text('Vést jako podání autora, nikoli jako potvrzení adresáta.', 'Keep it as a creator filing, not recipient confirmation.'), evidenceStatus: text('přímý zdroj k obsahu podání', 'direct source for the filing’s content'), citation: 'Dne 28.listopadu 2024' }
  ]
});

export function identifyPragueThcDigest(digest) {
  return Object.entries(PRAGUE_THC_DIGESTS).find(([, value]) => value === String(digest).toLowerCase())?.[0] ?? null;
}

function localizeValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, 'cs') && Object.hasOwn(value, 'en')) return value[language];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]));
}

export function localizePragueThcUpdate(language = 'cs', inputKind = 'courtOrder') {
  const source = inputKind === 'creatorRequest' ? creatorRequest : courtOrder;
  return localizeValue(source, language === 'en' ? 'en' : 'cs');
}

export const PRAGUE_THC_REMAND_UPDATE = courtOrder;
