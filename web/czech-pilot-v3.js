const text = (cs, en) => ({ cs, en });

// V3 is a public explanation layer over the existing evidence memory. It keeps
// creator-confirmed procedural routes separate from court-verified status and
// never converts evidence relevance into a predicted outcome.
export const CZECH_PILOT_V3 = Object.freeze({
  version: 'v3.2-predeadline',
  preparedAt: '2026-07-21',
  title: text(
    'Český živý pilot: čtyři kauzy, šest lidí, žádný vypůjčený závěr',
    'Czech live pilot: four cases, six people, no borrowed conclusions'
  ),
  introduction: text(
    'Včerejší přihláška vysvětluje univerzální produkt. Dnešní řízený test ukazuje jeho funkci v jednom mimořádně náročném tematickém celku: jaký význam mají pro autora a pět dalších lidí kriminalizovaných v souvislosti s pěstováním konopí nové úřední důkazy v roce 2026 a co přesně mění v jejich starých spisech.',
    'The submitted entry explains the universal product. Today’s controlled test demonstrates it in one exceptionally demanding domain: what the new official evidence means in 2026 for the creator and five other people criminalised in connection with cannabis cultivation, and precisely what it changes in their older files.'
  ),
  slogans: [
    text('V těchto spisech nebyl poškozený člověk, odcizená věc ani podvod. Trest stál na povolení, které stát nevydával, a na limitu THC, pro jehož měření nedoložil závazný postup.', 'These files involved no injured person, stolen property, or fraud. Punishment rested on a permit the State did not issue and a THC threshold for which it did not demonstrate a binding measurement procedure.'),
    text('Když stát bere svobodu podle obsahu THC, musí umět doložit, jak jej změřil.', 'If the State takes liberty on the basis of THC content, it must be able to show how that content was measured.'),
    text('Stát má institucionální paměť. Člověk si zaslouží vlastní.', 'The State has institutional memory. A person deserves one too.'),
    text('Nejdříve jedna věta. Pod ní zdroje. Neznámé zůstává viditelné.', 'One sentence first. Sources underneath. Unknowns stay visible.'),
    text('Nový dokument nemění celý příběh — jen ty větve, které skutečně dokládá.', 'A new document does not change the whole story—only the branches it actually supports.'),
    text('Nový důkaz není nový příběh. Je to nové okno do starého rozhodnutí.', 'New evidence is not a new story. It is a new window into an old decision.'),
    text('Červená znamená: prověřit teď. Neznamená: u soudu vyhrajete.', 'Red means: review now. It does not mean: you will win in court.')
  ],
  scoreRule: text(
    'Ve všech čtyřech kauzách má společný nový důkaz k chybějícímu závaznému a jednotnému postupu měření THC relevanci 9/9 — EXTRÉM, HOŘÍ. Systém zde hodnotí dodané podklady a jejich význam pro přezkum v roce 2026; neurčuje procento budoucího úspěchu.',
    'In all four cases, the shared new evidence concerning the missing binding and unified THC-measurement procedure has 9/9 relevance — EXTREME, ON FIRE. Here the system assesses the supplied records and their significance for review in 2026; it does not assign a percentage likelihood of future success.'
  ),
  judicialBreakthrough: {
    priority: 9,
    priorityBand: 'red-3',
    label: text('NOVÝ PŘÍMÝ SOUDNÍ DŮKAZ', 'NEW DIRECT JUDICIAL EVIDENCE'),
    headline: text(
      'Vrchní soud zrušil výrok o vině: u části konopí z něj nešlo poznat, zda bylo legální, nebo zakázané.',
      'The High Court quashed the findings of guilt: for part of the cannabis, the judgment did not show whether the material was lawful or prohibited.'
    ),
    source: text(
      'Vrchní soud v Praze · usnesení ze dne 29. 7. 2025 · č. j. 11 To 88/2024-2990 · zrušen výrok o vině, navazující tresty a zabrání věci z rozsudku Městského soudu v Praze ze dne 7. 5. 2024, č. j. 45 T 1/2024-2430 · podle § 259 odst. 1 věc vrácena Městskému soudu v Praze k novému projednání a rozhodnutí',
      'High Court in Prague · order of 29 July 2025 · ref. 11 To 88/2024-2990 · findings of guilt, related sentences, and forfeiture in the Prague Municipal Court judgment of 7 May 2024, ref. 45 T 1/2024-2430, quashed · matter returned to the Prague Municipal Court for a new hearing and decision under Section 259(1)'
    ),
    impact: text(
      'Před vložením této listiny paměť obsahovala autorské tvrzení z 28. 11. 2024. Nyní obsahuje i nezávislý soudní pramen z jiné živé věci: vytýká laické chemické úsudky, nejasný význam výsledku 1,0 % THC a nedostatečnou kontrolu znaleckého posudku. Relevance ke společné otázce všech čtyř kontrolních kauz: 9/9 — EXTRÉM, HOŘÍ.',
      'Before this record was added, the memory contained the creator’s claim from 28 November 2024. It now also contains an independent judicial source from a different live matter: it criticizes lay chemical reasoning, unclear treatment of a 1.0% THC result, and insufficient review of the expert opinion. Relevance to the shared question in all four controlled cases: 9/9 — EXTREME, ON FIRE.'
    ),
    boundary: text(
      'Nové projednání u Městského soudu v Praze je podle autora naplánováno na říjen 2026; tento termín není uveden v usnesení. Usnesení nerozhoduje ostatní kauzy a rozsudek zrušilo z více zásadních důvodů; nenařídilo zproštění.',
      'According to the creator, the new hearing before the Prague Municipal Court is scheduled for October 2026; that date is not stated in the order. The order does not decide the other cases and quashed the judgment for several fundamental reasons; it did not direct an acquittal.'
    )
  },
  caseAssessments: [
    {
      id: 'dd', people: 1, label: 'Mgr. Dušan Dvořák', link: '#dd-live-branches',
      court: text('Okresní soud v Prostějově', 'Prostějov District Court'),
      courtReference: text('sp. zn. 2 T 104/2010 a další', 'file 2 T 104/2010 and others'),
      sourceInventory: text(
        'Veřejná autorova případová paměť: 70 evidovaných rozhodnutí či procesních úkonů, návrh obnovy prvních čtyř trestních řízení a navazující živé větve.',
        'The creator’s public case memory: 70 recorded decisions or procedural acts, the proposed reopening of the first four criminal proceedings, and related live branches.'
      ),
      priority: 9, priorityBand: 'red-3',
      conclusion: text(
        'Pozdější úřední důkazy o neexistenci a nesjednocení závazného postupu měření THC zesilují společnou důkazní osu prvních čtyř trestních řízení i současných navazujících větví.',
        'Later official evidence concerning the absence and lack of unification of a binding THC-measurement procedure strengthens the shared evidential line in the first four criminal proceedings and the current connected branches.'
      ),
      relevanceLine: text(
        'RELEVANCE SPOLEČNÉHO NOVÉHO DŮKAZU K NÁVRHU NA OBNOVU V ROCE 2026: 9/9 — EXTRÉM, HOŘÍ.',
        'RELEVANCE OF THE SHARED NEW EVIDENCE TO A 2026 REOPENING MOTION: 9/9 — EXTREME, ON FIRE.'
      ),
      documentImpact: text(
        'Policejní sdělení ze dne 20. 7. 2026 přidalo nový uzel: potvrzuje přijetí stejnopisu výzvy a jeho uložení bez dalšího opatření, avšak nepřináší věcnou odpověď ani rozhodnutí NSZ. Do devíti souvisejících větví se proto zapisuje jako nová procesní událost, nikoli jako důkaz jejich výsledku.',
        'The police notice dated 20 July 2026 added a new node: it records receipt of a copy of the demand and filing without further action, but provides neither a substantive answer nor a decision by the Supreme Public Prosecutor’s Office. It therefore enters nine related branches as a new procedural event, not as proof of their outcome.'
      ),
      next: text(
        'U každého dotčeného rozhodnutí ukázat přesný původní výrok o povolení a THC, pozdější nový důkaz a jeho možný vliv na výsledek.',
        'For every affected decision, show the exact original finding about permission and THC, the later new evidence, and its potential effect on the outcome.'
      )
    },
    {
      id: 'lch', people: 1, label: 'L. CH.', link: '#prisoner-reopening-update',
      court: text('Krajský soud v Brně', 'Brno Regional Court'),
      courtReference: '50 T 7/2018-603',
      sourceInventory: text(
        'Jeden soukromý desetistránkový návrh z roku 2022, dvě v něm citovaná soudní rozhodnutí a tři samostatné odpovědi KPR z roku 2025.',
        'One private ten-page motion from 2022, two judicial decisions cited in it, and three separate presidential-office responses from 2025.'
      ),
      publicContextUrl: 'https://www.ceskatelevize.cz/porady/16298026696-smoke/',
      priority: 9, priorityBand: 'red-3',
      conclusion: text(
        'Návrh z roku 2022 má nejvyšší průnik s pozdějšími úředními důkazy o metodice, které tehdy nemohl obsahovat. Nová důkazní situace proto dostává 9/9 — EXTRÉM, HOŘÍ.',
        'The 2022 motion has the strongest overlap with later official methodology evidence that it could not have contained at the time. The new evidential situation therefore receives 9/9 — EXTREME, ON FIRE.'
      ),
      relevanceLine: text(
        'RELEVANCE SPOLEČNÉHO NOVÉHO DŮKAZU K NÁVRHU NA OBNOVU V ROCE 2026: 9/9 — EXTRÉM, HOŘÍ.',
        'RELEVANCE OF THE SHARED NEW EVIDENCE TO A 2026 REOPENING MOTION: 9/9 — EXTREME, ON FIRE.'
      ),
      documentImpact: text(
        'Pozdější úřední podklady o metodice vytvářejí kandidáta novosti, který návrh z roku 2022 nemohl obsahovat; tři odpovědi KPR současně doplnily oddělené větve milosti, předání do Rakouska a informačního řízení. Samy však nemění rozsudek ani nedokládají splnění podmínek obnovy.',
        'Later official methodology records create a candidate for novelty that the 2022 motion could not have contained; three presidential-office responses also added separate clemency, transfer-to-Austria, and information-law branches. They do not themselves alter the judgment or establish the conditions for reopening.'
      ),
      next: text(
        'Přepracovat hlavní argument návrhu: propojit každý pozdější úřední důkaz s původním výsledkem THC, absencí povolení a čl. 39 Listiny.',
        'Rework the motion’s central argument by connecting each later official record to the original THC result, absence of permission, and Article 39 of the Charter.'
      )
    },
    {
      id: 'mk-jk', people: 2, label: 'M. K. / J. K.', link: '#mk-jk-reopening-update',
      court: text('Krajský soud v Hradci Králové', 'Hradec Králové Regional Court'),
      courtReference: '9 T 5/2016-948',
      sourceInventory: text(
        'Sedmnáct přijatých souborů, šestnáct jedinečných po deduplikaci, a veřejné rozhodnutí Ústavního soudu IV. ÚS 1140/18.',
        'Seventeen received files, sixteen unique after deduplication, and the public Constitutional Court decision IV. ÚS 1140/18.'
      ),
      priority: 9, priorityBand: 'red-3',
      conclusion: text(
        'Hoří dvě samostatné důkazní osy: společný nový důkaz k chybějícímu závaznému a jednotnému postupu měření THC a zvláštní cesta podle § 278 odst. 4 trestního řádu. Obě mají relevanci 9/9 pro přezkum obnovy v roce 2026.',
        'Two separate evidential lines are on fire: the shared new evidence concerning the missing binding and unified THC-measurement procedure, and the case-specific route under section 278(4) of the Code of Criminal Procedure. Both have 9/9 relevance to review for reopening in 2026.'
      ),
      relevanceLine: text(
        'RELEVANCE SPOLEČNÉHO NOVÉHO DŮKAZU K NÁVRHU NA OBNOVU V ROCE 2026: 9/9 — EXTRÉM, HOŘÍ.',
        'RELEVANCE OF THE SHARED NEW EVIDENCE TO A 2026 REOPENING MOTION: 9/9 — EXTREME, ON FIRE.'
      ),
      documentImpact: text(
        'Deduplikovaný souborový balík oddělil čtyři různé důkazní osy. Společná metodická osa THC i zvláštní kandidát podle § 278 odst. 4 mají prioritu 9/9, ale každá vyžaduje jiné prvotní prameny. Výnos a digitální řetězec zůstávají dalšími samostatnými větvemi.',
        'The deduplicated file set separated four different evidential lines. Both the shared THC-methodology line and the case-specific candidate under section 278(4) have 9/9 priority, but each requires different primary records. Yield and the digital chain remain additional separate lines.'
      ),
      next: text(
        'Postavit obnovu na dvou oddělených osách 9/9: společném novém důkazu k měření THC a zvláštním důvodu podle § 278 odst. 4.',
        'Build the reopening analysis on two separate 9/9 lines: the shared new THC-measurement evidence and the case-specific ground under section 278(4).'
      )
    },
    {
      id: 'gf-jk', people: 2, label: 'G. F. / J. K.', link: '#gf-jk-procedural-update',
      court: text('Okresní soud v Ostravě', 'Ostrava District Court'),
      courtReference: '15 T 11/2025',
      sourceInventory: text(
        'Šest věcných záznamů osobní větve v balíku osmnácti souborů; celý balík po deduplikaci představuje patnáct věcných záznamů ve čtyřech větvích.',
        'Six substantive records in the personal branch within an eighteen-file set; after deduplication the complete set contains fifteen substantive records across four branches.'
      ),
      priority: 9, priorityBand: 'red-3',
      conclusion: text(
        'Společný nový důkaz k postupu měření THC má i zde relevanci 9/9 — EXTRÉM, HOŘÍ. Dodané listiny současně zachycují podmíněné zastavení trestního stíhání, nikoli odsouzení; tento přesný procesní stav proto systém vede odděleně od důkazní relevance.',
        'The shared new evidence concerning the THC-measurement procedure also has 9/9 relevance here — EXTREME, ON FIRE. At the same time, the supplied records describe conditional discontinuance rather than a conviction, so the system keeps that exact procedural status separate from evidential relevance.'
      ),
      relevanceLine: text(
        'RELEVANCE SPOLEČNÉHO NOVÉHO DŮKAZU PRO PŘEZKUM V ROCE 2026: 9/9 — EXTRÉM, HOŘÍ.',
        'RELEVANCE OF THE SHARED NEW EVIDENCE TO REVIEW IN 2026: 9/9 — EXTREME, ON FIRE.'
      ),
      documentImpact: text(
        'Listina KSZ 2 KZT 59/2025-62 spojila výsledek 3,7 % THC s konkrétním odborným vyjádřením a zaznamenala, že okresní státní zástupkyně neměla předpisy OKTE. Pozdější podání doplnilo údaj o podmíněném zastavení; systém tak oddělil tehdejší procesní způsob skončení věci od 9/9 relevance společného nového důkazu.',
        'Record 2 KZT 59/2025-62 linked the 3.7% THC result to a particular expert statement and recorded that the district public prosecutor did not possess the OKTE rules. A later submission added the reported conditional discontinuance, allowing the system to separate that procedural disposition from the 9/9 relevance of the shared new evidence.'
      ),
      next: text(
        'Použít společný nový důkaz k přezkumu výsledku 3,7 % THC a zachovat přesné označení tehdejšího procesního způsobu skončení věci.',
        'Use the shared new evidence to review the 3.7% THC result while preserving the exact designation of the case’s procedural disposition.'
      )
    }
  ],
  authorBranches: {
    exactReferenceCount: 9,
    headline: text(
      'Až přibližně 20 autorem uváděných aktivních procesních větví; devět je nyní označeno přesnou značkou a úplný inventář zůstává otevřený.',
      'Up to approximately 20 creator-reported active procedural branches; nine currently have an exact reference and the full inventory remains open.'
    ),
    boundary: text(
      'Čtyři soudní spisy jsou v projektové paměti doloženy alespoň podáním nebo soudní listinou. Pět čísel stížnostních a správních podání níže potvrzuje autor; prvotní odpovědi dosud nejsou všechny ve veřejném repozitáři. Přibližný počet se nesmí vydávat za uzavřený počet samostatných řízení.',
      'The four court files are supported in project memory by at least a filing or court record. The creator confirms the five complaint and administrative references below; not all primary responses are yet in the public repository. The approximate total must not be presented as a closed count of separate proceedings.'
    ),
    courtBranches: [
      { reference: '10 C 69/2026', counterparty: text('Česká televize', 'Czech Television'), kind: text('civilní soudní větev', 'civil court branch'), sourceStatus: text('doložena výzvou k soudnímu poplatku; meritum z ní neplyne', 'supported by a court-fee notice; no merits finding follows from it') },
      { reference: '8 Ad 9/2026', counterparty: text('Ministerstvo zdravotnictví', 'Ministry of Health'), kind: text('správní soudní větev', 'administrative court branch'), sourceStatus: text('spisová značka doložena soudní listinou', 'case reference supported by a court record') },
      { reference: '18 A 23/2026', counterparty: text('Ministerstvo spravedlnosti', 'Ministry of Justice'), kind: text('správní soudní větev', 'administrative court branch'), sourceStatus: text('značka doložena v předloženém podání; stav čeká na soudní listinu', 'reference supported by a supplied filing; status awaits a court record') },
      { reference: '18 A 17/2026', counterparty: text('NCOZ / Policie ČR', 'NCOZ / Czech Police'), kind: text('správní soudní větev', 'administrative court branch'), sourceStatus: text('značka doložena v předloženém podání; přesný stav čeká na soudní listinu', 'reference supported by a supplied filing; exact status awaits a court record') }
    ],
    institutionalBranches: [
      { reference: 'KPR 4093/2026', institution: text('Kancelář prezidenta republiky', 'Office of the President'), status: text('prezidentská, milostní a institucionální větev', 'presidential, clemency, and institutional branch') },
      { reference: 'MSP-162/2026-ODKA-SPZ', institution: text('Ministerstvo spravedlnosti', 'Ministry of Justice'), status: text('autorem potvrzené aktuální podání; prvotní listina k doplnění', 'creator-confirmed current filing; primary record still to be added') },
      { reference: 'MSP-19/2026-ODKA-ROZ', institution: text('Ministerstvo spravedlnosti', 'Ministry of Justice'), status: text('autorem potvrzené aktuální podání; prvotní listina k doplnění', 'creator-confirmed current filing; primary record still to be added') },
      { reference: 'MV-108890-3/TP-2026', institution: text('Ministerstvo vnitra', 'Ministry of the Interior'), status: text('autorem potvrzené aktuální podání; prvotní listina k doplnění', 'creator-confirmed current filing; primary record still to be added') },
      { reference: 'MV-97289/TP-2026', institution: text('Ministerstvo vnitra', 'Ministry of the Interior'), status: text('autorem potvrzené aktuální podání; prvotní listina k doplnění', 'creator-confirmed current filing; primary record still to be added') }
    ],
    openGroups: [
      {
        title: text('Přibližně deset trestních přezkumů a dohledů', 'Approximately ten criminal-review and supervision routes'),
        description: text('Patnáctiletá tvrzená nečinnost NCOZ a navazující stupně státních zastupitelství; jednotlivé značky a stavy budou doplněny pouze z prvotních listin.', 'The alleged fifteen-year NCOZ inaction and subsequent levels of public prosecution; individual references and statuses will be added only from primary records.')
      },
      {
        title: text('Obnova prvních čtyř trestních řízení', 'Reopening of the first four criminal proceedings'),
        description: text('Okresní soud v Prostějově, sp. zn. 2 T 104/2010 a další; nejde o tvrzení, že jeden návrh nebo jeden důkaz automaticky pokrývá všechna rozhodnutí.', 'Prostějov District Court, file 2 T 104/2010 and others; this does not claim that one motion or one item of evidence automatically covers every decision.')
      },
      {
        title: text('Úroda 2026 a preventivní podání', 'The 2026 crop and preventive filing'),
        description: text('Samostatná preventivní větev u Okresního soudu v Prostějově a Policie ČR; přesný procesní stav a případné lhůty se doplní z doručenek a odpovědí.', 'A separate preventive branch before the Prostějov District Court and Czech Police; exact procedural status and any deadlines will be added from delivery receipts and responses.')
      }
    ]
  },
  testPeriods: [
    {
      period: text('20. 4. – 20. 7. 2026 přibližně 14:00 CEST', '20 April – 20 July 2026, approximately 14:00 CEST'),
      label: text('PŘED PODÁNÍM', 'BEFORE SUBMISSION'),
      scope: text('Vlastní archiv autora: dlouhodobá paměť, 70 evidovaných rozhodnutí či úkonů, zdrojové osy, bezpečnostní meze a 54 soutěžních kontrol.', 'The creator’s own archive: long-term memory, 70 recorded decisions or acts, source axes, safety boundaries, and 54 submission checks.'),
      claimBoundary: text('Jde o základ projektu vznikající od 20. 4.; soutěžní práce od 17. 7. je v repozitáři oddělena.', 'This is the project foundation developed from 20 April; competition-period work from 17 July is separated in the repository.')
    },
    {
      period: text('20. 7. přibližně 14:00 – 21. 7. 2026, 22:00 CEST', '20 July, approximately 14:00 – 21 July 2026, 22:00 CEST'),
      label: text('PO PODÁNÍ, PŘED UZÁVĚRKOU', 'AFTER SUBMISSION, BEFORE DEADLINE'),
      scope: text('Tři další anonymizované revize zahrnující pět lidí: L. CH.; M. K. a J. K.; G. F. a J. K. Oddělení duplicit, osob, procesních stavů a společné důkazní relevance 9/9.', 'Three further anonymized reviews covering five people: L. CH.; M. K. and J. K.; G. F. and J. K. Separation of duplicates, people, procedural status, and the shared 9/9 evidential relevance.'),
      claimBoundary: text('Vývoj je označen jako následný a původní web z okamžiku podání zůstává v neměnném archivu.', 'The work is labelled as post-submission development and the website at submission remains in an immutable archive.')
    },
    {
      period: text('Od 22. 7. 2026', 'From 22 July 2026'),
      label: text('PLÁNOVANÝ ROZVOJ', 'PLANNED DEVELOPMENT'),
      scope: text('Český živý pilot bude dokument po dokumentu uzavírat přesný inventář; obecná mezinárodní verze rozšíří stejné jádro na rodinu, nehody, pojištění, úřady a další životní situace.', 'The Czech live pilot will close the exact inventory document by document; a general international version will extend the same core to family, accidents, insurance, public authorities, and other life events.'),
      claimBoundary: text('Jde o plán, nikoli hotovou funkci současného statického prototypu.', 'This is a roadmap, not a completed capability of the current static prototype.')
    }
  ],
  civicContext: {
    title: text('Od jednotlivých spisů k doložené veřejné otázce', 'From individual files to a documented public question'),
    statement: text(
      'Projektová paměť propojuje konkrétní přezkumy s doloženou větví podání k prezidentské amnestii. Přidělené značky a odpovědi KPR dokládají existenci a vyřizování podání; samy nedokládají, že prezident rozhodl, přijal právní argument nebo osobně posuzuje jeho důvodnost.',
      'Project memory links individual reviews to a documented presidential-amnesty submission branch. Assigned references and responses from the Office of the President establish the existence and handling of submissions; they do not themselves establish that the President has decided, accepted the legal argument, or is personally assessing its merits.'
    ),
    outreach: text(
      'Plánovaná veřejná cesta Ženeva–Santiago v roce 2027 a další občanské prezentace mohou ověřovat přístupnost nástroje v terénu. Jsou budoucím pilotem a komunikačním rámcem, nikoli důkazem v kterékoli trestní věci.',
      'The planned Geneva–Santiago journey in 2027 and other civic presentations may test accessibility in the field. They are a future pilot and communication framework, not evidence in any criminal matter.'
    )
  }
});

function localizeValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, 'cs') && Object.hasOwn(value, 'en')) return value[language];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]));
}

export function localizeCzechPilotV3(language = 'cs') {
  return localizeValue(CZECH_PILOT_V3, language === 'en' ? 'en' : 'cs');
}
