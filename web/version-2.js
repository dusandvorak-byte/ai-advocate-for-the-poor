const text = (cs, en) => ({ cs, en });

export const VERSION_HISTORY = Object.freeze([
  {
    id: 'v0',
    date: '2026-04-20',
    period: text('20. 4.–19. 7. 2026', '20 April–19 July 2026'),
    title: text('Vstupní data případu před vznikem soutěžního webu', 'Case input data before the competition website existed'),
    description: text(
      'Podání, rozhodnutí a procesní vazby vznikaly bez znalosti soutěže a bez hotové podoby systému Právníka chudých. Nejde o starší web, ale o původní datovou a důkazní vrstvu.',
      'The submissions, decisions, and procedural links arose without knowledge of the competition and before the Advocate for the Poor system had been designed. This is the original data and evidence layer, not an earlier website.'
    ),
    href: '#version-0',
    kind: 'source'
  },
  {
    id: 'v1',
    date: '2026-07-20',
    period: text('20. 7. 2026 · okamžik podání', '20 July 2026 · submission baseline'),
    title: text('Přesná soutěžní verze', 'Exact competition version'),
    description: text(
      'Neměnný veřejný snímek webu z commitu 2238ae2, na který odkazovala podaná přihláška.',
      'The preserved public website snapshot from commit 2238ae2 linked by the submitted entry.'
    ),
    href: 'archive/submission-2026-07-20/index.html',
    hrefEn: 'archive/submission-2026-07-20/en.html',
    kind: 'archive'
  },
  {
    id: 'v2',
    date: '2026-07-20',
    period: text('od 20. 7. 2026 · živý vývoj', 'since 20 July 2026 · live development'),
    title: text('Živá důkazní paměť', 'Living evidence memory'),
    description: text(
      'Aktuální verze řadí nové listiny podle relevance, ukazuje jejich průnik do všech větví a zachovává denní historii změn.',
      'The current version ranks new documents by relevance, shows their propagation through every branch, and preserves a dated change history.'
    ),
    href: '#case-portfolio',
    kind: 'source'
  },
  {
    id: 'v3',
    date: '2026-07-21',
    period: text('21. 7. 2026 · přehledná veřejná vrstva', '21 July 2026 · clear public layer'),
    title: text('Jedna věta, trestní spis, semafor a dopad dokumentu', 'One sentence, criminal file, traffic light, and document impact'),
    description: text(
      'Aktuální rozhraní staví výsledek před detail: čtyři anonymizovaně oddělené kauzy, přesný soudní spis, společná relevance nového důkazu 9/9 a teprve pod nimi rozbalené dodané důkazy.',
      'The current interface puts the result before detail: four separately anonymized cases, the exact criminal file, 9/9 shared-new-evidence relevance, and the supplied evidence underneath in expandable layers.'
    ),
    href: '#czech-pilot-v3',
    kind: 'current'
  }
]);

export const TRAFFIC_LEVELS = Object.freeze([
  {
    id: 'red-3', score: 9, color: 'red', intensity: 3,
    label: text('EXTRÉM — HOŘÍ', 'EXTREME — ON FIRE'),
    meaning: text('Extrémně důležitý vztah a bezodkladná potřeba lidské reakce.', 'An extremely important relationship requiring immediate human response.')
  },
  {
    id: 'red-2', score: 8, color: 'red', intensity: 2,
    label: text('HODNĚ VAROVNÁ', 'HIGH WARNING'),
    meaning: text('Silný přímý dopad; řešit před méně významnými větvemi.', 'Strong direct impact; address before lower-priority branches.')
  },
  {
    id: 'red-1', score: 7, color: 'red', intensity: 1,
    label: text('VAROVNÁ', 'WARNING'),
    meaning: text('Přímá relevance vyžadující konkrétní kontrolní krok.', 'Direct relevance requiring a specific review step.')
  },
  {
    id: 'amber-3', score: 6, color: 'amber', intensity: 3,
    label: text('MEZI ORANŽOVOU A ČERVENOU', 'BETWEEN AMBER AND RED'),
    meaning: text('Velmi silná podmíněná relevance; může rychle přejít do červené.', 'Very strong conditional relevance that may quickly turn red.')
  },
  {
    id: 'amber-2', score: 5, color: 'amber', intensity: 2,
    label: text('VYSOKÁ POZORNOST', 'HIGH ATTENTION'),
    meaning: text('Významná podpůrná vazba; ověřit podmínku jejího použití.', 'A significant supporting link; verify the condition for using it.')
  },
  {
    id: 'amber-1', score: 4, color: 'amber', intensity: 1,
    label: text('SLEDOVAT', 'MONITOR'),
    meaning: text('Vazbu evidovat a průběžně sledovat bez samostatné urgentní reakce.', 'Record and monitor the link without a separate urgent response.')
  },
  {
    id: 'green-3', score: 3, color: 'green', intensity: 3,
    label: text('MEZI ZELENOU A ORANŽOVOU', 'BETWEEN GREEN AND AMBER'),
    meaning: text('Nyní nízká relevance, ale nový důkaz ji může změnit.', 'Currently low relevance, but new evidence may change it.')
  },
  {
    id: 'green-2', score: 2, color: 'green', intensity: 2,
    label: text('PRŮBĚŽNÁ KONTROLA', 'PERIODIC REVIEW'),
    meaning: text('Bez potřeby okamžité reakce; zachovat v paměti pro kontrolu.', 'No immediate response needed; retain it in memory for review.')
  },
  {
    id: 'green-1', score: 1, color: 'green', intensity: 1,
    label: text('BEZ PŘÍMÉHO DOPADU', 'NO DIRECT IMPACT'),
    meaning: text('Listina se do této větve nyní nepropíše.', 'The document does not currently propagate into this branch.')
  }
]);

export const VERSION_2_DASHBOARD = Object.freeze({
  version: '3.2',
  snapshotDate: '2026-07-21',
  caseDataStart: '2026-04-20',
  counts: [
    {
      value: '5',
      label: text('veřejných důkazních PDF', 'public evidence PDFs'),
      note: text('Tři odeslané výstupy a dvě zkontrolované odvozené kopie.', 'Three sent outputs and two reviewed public derivatives.'),
      source: 'web/documents/manifest.json'
    },
    {
      value: '45',
      label: text('nově zkontrolovaných neveřejných věcných záznamů', 'newly reviewed non-public substantive records'),
      note: text(
        'K předchozím 41 záznamům přibyly dva nové úřední uzly a dvě dříve známé události nově doložené prvotními PDF; přesná policejní kopie počet nenavyšuje.',
        'The previous 41 records were joined by two new official nodes and two previously known events newly established by primary PDFs; the exact police copy does not inflate the count.'
      ),
      source: 'alliance-update.js · prisoner-reopening-update.js · mk-jk-reopening-update.js · gf-jk-procedural-update.js · prague-thc-remand-update.js · dd-live-v3-update.js · verified SHA-256 digests'
    },
    {
      value: '—',
      label: text('všech listin v paměti', 'all documents in case memory'),
      note: text(
        'Přesný soupis po jednotlivých listinách zatím není uzavřen; pět znamená pouze veřejně propojená PDF.',
        'The document-by-document inventory is not yet closed; five counts only the publicly linked PDFs.'
      ),
      source: 'pending document inventory'
    },
    {
      value: '70',
      label: text('evidovaných rozhodnutí a úkonů', 'recorded decisions and acts'),
      note: text('Nejde o 70 unikátních řízení; více úkonů může patřit do stejné věci.', 'This does not mean 70 unique proceedings; several acts may belong to one matter.'),
      source: 'case-memory.js · 31 + 10 + 29'
    },
    {
      value: '4',
      label: text('aktivní soudní větve', 'active court branches'),
      note: text('Tři zásahové žaloby a jedna civilní žaloba.', 'Three intervention actions and one civil action.'),
      source: 'case-memory.js · activeCourtBranches'
    },
    {
      value: '9',
      label: text('událostí vyřizování od 20. 4. 2026', 'handling events since 20 April 2026'),
      note: text('Osm uzlů výchozího stromu a nové policejní uložení bez dalšího opatření.', 'Eight baseline routing nodes plus the new police filing without further action.'),
      source: 'case-memory.js + police-update.js'
    },
    {
      value: '4',
      label: text('doložené ukončené exekuční větve', 'documented concluded enforcement branches'),
      note: text('Tři exekuce byly zastaveny; u čtvrté zaniklo pověření po úplném vymožení. Žádná se zde nepočítá jako aktivní.', 'Three enforcements were stopped; in the fourth, authority expired after full recovery. None is counted here as active.'),
      source: 'alliance-update.js'
    }
  ],
  administrativeProceedings: {
    value: '—',
    label: text('aktivní správní řízení', 'active administrative proceedings'),
    note: text(
      'Přesný počet zatím není uzavřen. Verze 2 jej doplní z jednotlivých listin a nebude jej odhadovat ze samotných názvů institucí.',
      'The exact number is not yet closed. Version 2 will derive it from individual documents rather than guess from institution names.'
    )
  },
  latestDocument: {
    date: '2026-07-21',
    version: 'v3.2',
    priority: 'red-3',
    headline: text(
      'Pět PDF dodaných 21. 7. představuje tři již známé události a dva nové úřední uzly: jedna přesná duplicita nic nenavyšuje, dvě prvotní PDF zesilují zdrojový stav a dvě úřední listiny otevírají přesně označené větve. Všechny mají pro živou mapu relevanci 9/9.',
      'Five PDFs supplied on 21 July represent three already-known events and two new official nodes: one exact duplicate increases nothing, two primary PDFs strengthen source status, and two official records open exactly referenced branches. All have 9/9 relevance to the live map.'
    ),
    metrics: [
      { value: '5', label: text('dnešních přesně zkontrolovaných PDF', 'exact PDFs reviewed today') },
      { value: '3', label: text('dříve známé události', 'already-known events') },
      { value: '2', label: text('nové úřední uzly', 'new official nodes') },
      { value: '4', label: text('nové nebo zdrojově povýšené záznamy', 'new or source-upgraded records') },
      { value: '0', label: text('nově zveřejněných zdrojových PDF', 'newly published source PDFs') }
    ],
    trafficDistribution: [
      { band: 'red-3', count: 5 }
    ],
    stateDeadline: {
      status: 'none-currently-stated',
      label: text('Aktuální lhůta k reakci', 'Current response deadline'),
      value: text('Ze zkontrolovaného návrhu ani testovacího zadání nyní neplyne', 'None currently follows from the reviewed motion or test instructions'),
      rule: text(
        'Žádná z pěti listin sama nestanoví novou zákonnou lhůtu. Semafor 9/9 vyjadřuje relevanci pro živé větve; neurčuje budoucí výsledek a sám nezakládá opravný prostředek ani právní nárok.',
        'None of the five records itself sets a new statutory deadline. The 9/9 traffic light expresses relevance to live branches; it does not determine a future outcome or itself create a remedy or legal entitlement.'
      )
    }
  },
  dailySnapshots: [
    {
      date: '2026-07-21',
      version: 'v3.2',
      href: '#dd-daily-update',
      title: text(
        'Pět dnešních PDF: tři známé události a dva nové úřední uzly',
        'Five PDFs supplied today: three known events and two new official nodes'
      ),
      change: text(
        'Přesný policejní duplikát nezvýšil počty. Návrh na obnovu a preventivní podání byly povýšeny na události doložené prvotním PDF. Odpověď Ministerstva vnitra MV-114818-2/TP-2026 a přezkum KSZ Brno 1 KZT 475/2026-32 vytvořily dva nové úřední uzly.',
        'The exact police duplicate increased no count. The reopening motion and preventive filing were upgraded to primary-PDF-established events. Ministry response MV-114818-2/TP-2026 and Brno prosecutor review 1 KZT 475/2026-32 created two new official nodes.'
      )
    },
    {
      date: '2026-07-21',
      version: 'v3.1',
      href: '#v3-judicial-breakthrough',
      title: text(
        'Přímý soudní zlom v otázce rozlišení legálního a zakázaného konopí',
        'Direct judicial breakthrough on distinguishing lawful from prohibited cannabis'
      ),
      change: text(
        'Usnesení Vrchního soudu v Praze ze dne 29. 7. 2025, č. j. 11 To 88/2024-2990, zrušilo rozsudek Městského soudu v Praze ze dne 7. 5. 2024, č. j. 45 T 1/2024-2430, a věc mu vrátilo k novému projednání. Autorem uváděný říjnový termín roku 2026 zůstává oddělen od obsahu usnesení.',
        'The High Court in Prague order of 29 July 2025, ref. 11 To 88/2024-2990, quashed the Prague Municipal Court judgment of 7 May 2024, ref. 45 T 1/2024-2430, and returned the case for a new hearing. The October 2026 date reported by the creator remains separate from the order itself.'
      )
    },
    {
      date: '2026-07-21',
      version: 'v3.0',
      href: '#czech-pilot-v3',
      title: text(
        'Čtyři soudní spisy v jednom srovnatelném veřejném okně',
        'Four court files in one comparable public window'
      ),
      change: text(
        'Každá karta nyní začíná trestním soudem a spisovou značkou, pokračuje výrazným řádkem společné relevance 9/9 k přezkumu v roce 2026 a teprve poté rozbaluje dodané důkazy a jejich dopad. Samostatná živá mapa autora uvádí devět přesných aktuálních značek.',
        'Each card now begins with the criminal court and file reference, follows with a prominent shared 9/9 relevance line for review in 2026, and only then expands the supplied evidence and its impact. A separate live creator map lists nine exact current references.'
      )
    },
    {
      date: '2026-07-21',
      version: 'v2.7',
      href: '#gf-jk-procedural-update',
      title: text(
        'Čtyři oddělené kauzy a společná přezkoumatelná důkazní otázka',
        'Four separate cases and one shared reviewable evidence question'
      ),
      change: text(
        'Osmnáct přijatých souborů bylo rozděleno na patnáct věcných záznamů ve čtyřech větvích. Nové rozhraní ukazuje jednu větu, semafor a další krok; zdroje, nejistoty a úplná laboratorní protokolace zůstávají v rozbalovacích vrstvách.',
        'Eighteen received files were reduced to fifteen substantive records across four branches. The new interface shows one sentence, a traffic light, and the next step; sources, uncertainty, and the complete laboratory record remain in expandable layers.'
      )
    },
    {
      date: '2026-07-20',
      version: 'v2.6',
      href: '#mk-jk-reopening-update',
      title: text(
        'Anonymizované vícezdrojové posouzení M. K. a J. K.',
        'Anonymized multi-source assessment of M. K. and J. K.'
      ),
      change: text(
        'Sedmnáct přijatých souborů představovalo šestnáct jedinečných zdrojů. Výstup odděluje soudní zjištění, tvrzení z podání, lékařské vyjádření, alianční kontext a systémovou syntézu; soukromé zdroje nezveřejňuje.',
        'Seventeen received files represented sixteen unique sources. The output separates judicial findings, allegations in submissions, the medical statement, alliance context, and system synthesis; private source files are not published.'
      )
    },
    {
      date: '2026-07-20',
      version: 'v2.5',
      href: '#prisoner-reopening-update',
      title: text(
        'Anonymizované porovnání návrhu na obnovu L. CH. z roku 2022',
        'Anonymized comparison of L. CH.’s 2022 motion to reopen'
      ),
      change: text(
        'Soukromý desetistránkový návrh byl porovnán s pamětí k 20. 7. 2026. Nejvyšší průnik 9/9 má metodika odběru a měření THC; jméno a zdrojové PDF zůstávají neveřejné, soudy, data a čísla jednací se uvádějí.',
        'A private ten-page motion was compared with the memory as of 20 July 2026. Sampling and THC measurement have the highest 9/9 overlap; the name and source PDF remain private while courts, dates, and reference numbers are displayed.'
      )
    },
    {
      date: '2026-07-20',
      version: 'v2.3',
      href: '#alliance-update',
      title: text(
        'Přesný liberecký mezistav, Generali a rozpoznaná duplicita',
        'Exact Liberec checkpoint, Generali, and a recognized duplicate'
      ),
      change: text(
        'Dvě jedinečné listiny doplnily přesný finanční mezistav a čtvrtou ukončenou exekuční větev; stejné policejní PDF nezvýšilo počty ani semafor.',
        'Two unique records added an exact financial checkpoint and a fourth concluded enforcement branch; the same police PDF increased neither counts nor traffic-light links.'
      )
    },
    {
      date: '2026-07-20',
      version: 'v2.2',
      href: '#alliance-update-v22',
      title: text(
        'Výroční zpráva 2025 a finanční větev aliance',
        'The 2025 Annual Report and the alliance’s financial branch'
      ),
      change: text(
        'Pět zkontrolovaných, ale nezveřejněných PDF doplňuje organizační vazbu, tři zastavené exekuce a jeden přesně omezený soudní závěr.',
        'Five reviewed but unpublished PDFs add one organisational link, three stopped enforcement proceedings, and one precisely bounded judicial finding.'
      )
    },
    {
      date: '2026-07-20',
      version: 'v2.1',
      href: '#police-update',
      title: text(
        'Policejní sdělení: devět nových vazeb v pavoukovi případu',
        'Police notice: nine new links in the case graph'
      ),
      change: text(
        'První listina doložená po podání přihlášky. Přidává nový policejní uzel, devět červených vazeb a nulovou věcnou odpověď v samotné listině.',
        'The first document supplied after submission. It adds a new police node, nine red links, and no substantive answer in the document itself.'
      )
    }
  ],
  snapshotRule: text(
    'Nový datovaný snímek vznikne při doplnění zkontrolované listiny; prázdné denní kopie se nevytvářejí.',
    'A new dated snapshot is created when a reviewed document is added; empty daily copies are not generated.'
  ),
  testPeriods: [
    {
      id: 'through-submission',
      label: text('Do podání přihlášky', 'Through submission'),
      window: text('Vývoj do okamžiku podání dne 20. 7. 2026', 'Development through the submission on 20 July 2026'),
      status: text('UZAVŘENÝ SOUTĚŽNÍ ZÁKLAD', 'CLOSED SUBMISSION BASELINE'),
      distinctChecks: 54,
      addedChecks: 54,
      note: text('Archiv V1 zachovává stav, který byl předložen soutěži.', 'The V1 archive preserves the state submitted to the competition.')
    },
    {
      id: 'submission-to-deadline',
      label: text('Od podání do uzávěrky', 'Submission to deadline'),
      window: text('Po podání 20. 7. 2026 až 22. 7. 2026 v 02:00 CEST', 'After submission on 20 July 2026 through 22 July 2026 at 02:00 CEST'),
      status: text('UZAVŘENO V OKAMŽIKU UZÁVĚRKY', 'CLOSED AT THE DEADLINE'),
      distinctChecks: 188,
      addedChecks: 134,
      note: text('Ke dni uzávěrky sada zahrnovala původních 54 kontrol a 134 nových regresních kontrol.', 'At the deadline, the suite contained the original 54 checks and 134 new regression checks.')
    },
    {
      id: 'deadline-to-judging',
      label: text('Od uzávěrky do prvního doloženého hodnocení', 'Deadline to first evidenced judging'),
      window: text('Začne 22. 7. 2026 v 02:00 CEST; první skutečný přístup poroty zatím není znám', 'Starts 22 July 2026 at 02:00 CEST; the first actual judge access is not yet known'),
      status: text('PROBÍHÁ', 'IN PROGRESS'),
      distinctChecks: 192,
      addedChecks: 4,
      note: text('Po uzávěrce přibyly čtyři regresní kontroly redakční titulní strany, původních ilustrací a návratového odkazu z archivu. První skutečný přístup poroty není pozorovatelný, proto se jeho datum nedoplňuje.', 'After the deadline, four regression checks were added for the editorial front page, original illustrations, and the archive return link. The judges’ first actual access is not observable, so no such date is invented.')
    }
  ],
  testCountingRule: text(
    'Číslo znamená počet různých automatických kontrol v daném stavu sady, nikoli celoživotní součet všech opakovaných spuštění. Nejméně 1 040 jednotlivých úspěšných průchodů je doloženo úplnými historickými běhy; přesný celoživotní součet se od začátku nevedl a nebude se domýšlet.',
    'The number is the count of distinct automated checks in that suite state, not the lifetime total of repeated executions. At least 1,040 individual successful check executions are documented by complete historical runs; the exact lifetime total was not tracked from the beginning and will not be invented.'
  )
});

function localize(value, language) {
  if (value && typeof value === 'object' && 'cs' in value && 'en' in value) return value[language];
  return value;
}

export function localizeVersion2(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  return {
    history: VERSION_HISTORY.map((item) => ({
      ...item,
      period: localize(item.period, lang),
      title: localize(item.title, lang),
      description: localize(item.description, lang),
      href: lang === 'en' && item.hrefEn ? item.hrefEn : item.href
    })),
    trafficLevels: TRAFFIC_LEVELS.map((item) => ({
      ...item,
      label: localize(item.label, lang),
      meaning: localize(item.meaning, lang)
    })),
    dashboard: {
      ...VERSION_2_DASHBOARD,
      counts: VERSION_2_DASHBOARD.counts.map((item) => ({
        ...item,
        label: localize(item.label, lang),
        note: localize(item.note, lang)
      })),
      administrativeProceedings: {
        ...VERSION_2_DASHBOARD.administrativeProceedings,
        label: localize(VERSION_2_DASHBOARD.administrativeProceedings.label, lang),
        note: localize(VERSION_2_DASHBOARD.administrativeProceedings.note, lang)
      },
      latestDocument: {
        ...VERSION_2_DASHBOARD.latestDocument,
        headline: localize(VERSION_2_DASHBOARD.latestDocument.headline, lang),
        metrics: VERSION_2_DASHBOARD.latestDocument.metrics.map((item) => ({
          ...item,
          label: localize(item.label, lang)
        })),
        stateDeadline: {
          ...VERSION_2_DASHBOARD.latestDocument.stateDeadline,
          label: localize(VERSION_2_DASHBOARD.latestDocument.stateDeadline.label, lang),
          value: localize(VERSION_2_DASHBOARD.latestDocument.stateDeadline.value, lang),
          rule: localize(VERSION_2_DASHBOARD.latestDocument.stateDeadline.rule, lang)
        }
      },
      dailySnapshots: VERSION_2_DASHBOARD.dailySnapshots.map((item) => ({
        ...item,
        title: localize(item.title, lang),
        change: localize(item.change, lang)
      })),
      snapshotRule: localize(VERSION_2_DASHBOARD.snapshotRule, lang),
      testPeriods: VERSION_2_DASHBOARD.testPeriods.map((item) => ({
        ...item,
        label: localize(item.label, lang),
        window: localize(item.window, lang),
        status: localize(item.status, lang),
        note: localize(item.note, lang)
      })),
      testCountingRule: localize(VERSION_2_DASHBOARD.testCountingRule, lang)
    }
  };
}

export function trafficScore(levelId) {
  return TRAFFIC_LEVELS.find(({ id }) => id === levelId)?.score ?? 0;
}
