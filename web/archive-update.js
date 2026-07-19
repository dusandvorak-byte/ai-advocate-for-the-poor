const text = (cs, en) => ({ cs, en });

export const INTERNAL_ARCHIVE_TEST = {
  version: '2026-07-19',
  persona: text('Občan XY', 'Citizen XY'),
  title: text(
    'Interní test: jedna nová listina mění existující archiv',
    'Internal test: one new document changes an existing archive'
  ),
  scope: text(
    'Předem sestavený anonymizovaný archiv 2004–2026. V tomto kole se nepřijímají cizí dokumenty a nic se neodesílá mimo prohlížeč.',
    'A prepared anonymized archive covering 2004–2026. This round does not accept outside documents and sends nothing beyond the browser.'
  ),
  archiveMetrics: [
    { value: '2004–2026', label: text('rozsah archivní paměti', 'archive-memory coverage') },
    { value: '70', label: text('zachycených rozhodnutí a procesních úkonů', 'recorded decisions and procedural acts') },
    { value: '3', label: text('aktivní zásahové žaloby', 'active intervention actions') },
    { value: '1', label: text('nová listina v tomto testu', 'new document in this test') }
  ],
  incomingDocument: {
    issuer: text('Krajské státní zastupitelství v Ostravě', 'Regional Public Prosecutor’s Office in Ostrava'),
    issued: '2026-07-08',
    received: '2026-07-16',
    reference: text('4 KZN 1000/2026-10 (anonymizováno)', '4 KZN 1000/2026-10 (anonymized)'),
    type: text('procesní postoupení části podání', 'procedural referral of part of a submission'),
    quote: 'část Vašeho podání směřující vůči postupu policejního orgánu - OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku k vyhodnocení a přijetí odpovídajícího opatření',
    quoteTranslation: 'the part of your submission directed against the conduct of the police authority — OKTE Frýdek-Místek — was referred to the District Public Prosecutor’s Office in Frýdek-Místek for assessment and adoption of an appropriate measure'
  },
  decision: {
    label: text('KLID — ověřit a sledovat', 'STAY CALM — verify and monitor'),
    level: 'verified',
    result: text(
      'Z textu sdělení nebyla zjištěna zákonná lhůta k odvolání, stížnosti ani jiné povinné reakci. Listina pouze oznamuje postoupení.',
      'The communication states no statutory deadline for an appeal, complaint, or other mandatory response. It only notifies the recipient of a referral.'
    ),
    deadline: text('Žádná zjištěná zákonná lhůta', 'No identified statutory deadline'),
    checkpoint: text(
      '30. července 2026 — dobrovolný kontrolní bod 14 kalendářních dnů od doručení; nejde o právní lhůtu.',
      '30 July 2026 — a voluntary checkpoint 14 calendar days after receipt; this is not a legal deadline.'
    ),
    why: text(
      'Do tohoto dne prakticky ověřit novou spisovou značku OSZ Frýdek-Místek a zda už existuje věcný výsledek nebo opatření.',
      'By that date, check the new District Public Prosecutor’s Office reference and whether a substantive outcome or measure already exists.'
    ),
    errorGuard: text(
      'Systém odmítl vydávat praktický čtrnáctidenní kontrolní interval za zákonnou lhůtu.',
      'The system refused to present a practical fourteen-day monitoring interval as a statutory deadline.'
    )
  },
  proves: [
    text('KSZ Ostrava postoupilo vymezenou část podání OSZ Frýdek-Místek.', 'The Regional Public Prosecutor’s Office referred a defined part of the submission to the District Public Prosecutor’s Office.'),
    text('Účelem postoupení je vyhodnocení a případné přijetí odpovídajícího opatření.', 'The stated purpose is assessment and possible adoption of an appropriate measure.'),
    text('Vznikla samostatná slezská procesní větev, jejíž nová značka a výsledek zatím v archivu chybějí.', 'A separate Silesian procedural branch now exists; its new reference and outcome are not yet in the archive.')
  ],
  doesNotProve: [
    text('Listina nepotvrzuje nezákonnost ani nesprávnost postupu OKTE.', 'The document does not confirm unlawful or incorrect conduct by OKTE.'),
    text('Listina nepotvrzuje, že OSZ již přijalo konkrétní opatření.', 'The document does not confirm that the District Public Prosecutor’s Office has taken a specific measure.'),
    text('Listina sama nemění žalované, petity ani příslušnost probíhajících soudních řízení.', 'The document does not itself change the defendants, relief sought, or jurisdiction in pending court proceedings.')
  ],
  relevanceLegend: [
    { level: 'critical', label: text('Červená — přímá relevance', 'Red — direct relevance'), meaning: text('Před podáním dokument zkontrolovat a novou skutečnost doplnit. Barva nevyjadřuje vinu ani předpověď výsledku.', 'Review before filing and add the new fact. The colour does not express guilt or predict an outcome.') },
    { level: 'review', label: text('Oranžová — podpůrná nebo omezená relevance', 'Amber — supportive or limited relevance'), meaning: text('Doplnit stručně nebo pouze podmíněně; nepřeceňovat důkazní význam.', 'Add briefly or only if a stated condition is met; do not overstate evidential value.') },
    { level: 'verified', label: text('Zelená — nyní bez doplnění', 'Green — no supplement now'), meaning: text('Listinu pouze evidovat. Samostatné podání by nyní nepřineslo relevantní novou skutečnost.', 'Record the document only. A separate submission would not currently add a relevant new fact.') }
  ],
  propagationCheck: {
    title: text('Kontrola řetězení dopadu malého detailu', 'Small-detail impact propagation check'),
    rule: text('Ani krátké procesní sdělení se nesmí hodnotit izolovaně. Systém je porovná se všemi aktivními větvemi, ale nerozšíří jeho význam bez důkazu.', 'Even a short procedural notice must not be assessed in isolation. The system compares it with every active branch but does not enlarge its meaning without evidence.'),
    checks: [
      { level: 'critical', question: text('Vzniká nový procesní uzel?', 'Does it create a new procedural node?'), result: text('ANO — OSZ Frýdek-Místek; chybí nová značka a výsledek.', 'YES — Frýdek-Místek District Public Prosecutor; the new reference and outcome are missing.') },
      { level: 'critical', question: text('Dotýká se důkazního řetězce OKTE?', 'Does it touch the OKTE evidence chain?'), result: text('ANO — proto se přímo promítá do větve NCOZ a do auditu roztříštění u NSZ.', 'YES — it therefore directly affects the NCOZ branch and the Supreme Public Prosecutor fragmentation audit.') },
      { level: 'review', question: text('Může se význam později rozšířit?', 'Could its significance expand later?'), result: text('ANO, PODMÍNĚNĚ — teprve věcný výsledek OSZ nebo nový odborný podklad může ovlivnit další soudní, dohledové nebo mediální větve.', 'YES, CONDITIONALLY — only a merits outcome or new expert material may affect further judicial, supervisory, or media branches.') },
      { level: 'verified', question: text('Zakládá novou zákonnou lhůtu?', 'Does it create a new statutory deadline?'), result: text('NEZJIŠTĚNO — z textu neplyne poučení ani povinná reakce.', 'NOT IDENTIFIED — the text contains no instructions or mandatory response.') },
      { level: 'verified', question: text('Mění žalovaného nebo petit?', 'Does it change the defendant or relief sought?'), result: text('NE — jde o novou procesní skutečnost, nikoli změnu předmětu řízení.', 'NO — it is a new procedural fact, not a change in the subject matter of the proceedings.') },
      { level: 'verified', question: text('Potvrzuje pochybení nebo systémové selhání?', 'Does it confirm wrongdoing or systemic failure?'), result: text('NE — tuto hranici nelze překročit bez navazujícího věcného výsledku.', 'NO — that boundary cannot be crossed without a subsequent merits outcome.') }
    ]
  },
  draftIntegrityWarning: {
    title: text(
      'Kritická kontrola chronologie a identifikace',
      'Critical chronology and identity check'
    ),
    summary: text(
      'Systém porovnal stav podání v archivu s formulacemi ve třech návrzích a v soukromé pracovní vrstvě zkontroloval také aktuálnost názvů a identifikátorů. Veřejný výstup tyto interní identifikační údaje nezobrazuje.',
      'The system compared the filing status recorded in the archive with the wording of the three drafts and also checked current names and identifiers in the private working layer. The public output does not expose those internal identity details.'
    ),
    findings: [
      {
        document: text('Dopis prezidentu republiky', 'Letter to the President of the Republic'),
        detected: text('„byla předložena“ a „bylo doloženo“', '“was submitted” and “was documented”'),
        correction: text('Nahrazeno formulací „byla připravena“; skutečné odeslání a doručení musí doložit doručenka.', 'Replaced with “was prepared”; actual dispatch and receipt must be supported by a delivery record.')
      },
      {
        document: text('Doplnění žaloby proti Ministerstvu spravedlnosti', 'Supplement to the action against the Ministry of Justice'),
        detected: text('tvrzení, že přílohy „již byly zaslány“ do jiného soudního spisu', 'a claim that exhibits “had already been sent” to another court file'),
        correction: text('Nahrazeno podmínkou: soud je má hodnotit v obou věcech až po prokazatelném doručení.', 'Replaced with a condition: the court should consider them in both cases only after documented delivery.')
      },
      {
        document: text('Kontrola identity subjektů — soukromá pracovní vrstva', 'Entity identity check — private working layer'),
        detected: text('Aktuální názvy, stabilní identifikátory a historické změny byly posouzeny odděleně od veřejné ukázky.', 'Current names, stable identifiers, and historical changes were assessed separately from the public demonstration.'),
        correction: text('Veřejně zobrazit jen výsledek kontroly. Konkrétní interní identifikátory a historické názvy nezveřejňovat.', 'Expose only the check result publicly. Do not disclose specific internal identifiers or former names.')
      }
    ],
    rule: text(
      'Bez doručenky systém nesmí změnit stav „připraveno“ na „odesláno“ nebo „doručeno“. Identitu nesmí slučovat jen podle adresy nebo podobného názvu; sleduje stabilní identifikátor, aktuální název a časově označené historické aliasy v neveřejné vrstvě.',
      'Without a delivery record, the system must not change “prepared” to “sent” or “delivered”. It must not merge identity merely because of an address or similar name; it tracks the stable identifier, current name, and time-labelled historical aliases in a non-public layer.'
    )
  },
  internalDrafts: [
    {
      id: 'ncoz-action',
      level: 'critical',
      decision: text('DOPLNIT PŘED PODÁNÍM', 'SUPPLEMENT BEFORE FILING'),
      document: text('Městskému soudu v Praze — NCOZ — extrémní naléhavost, 18. 7. 2026', 'Prague Municipal Court — NCOZ — extreme urgency, 18 July 2026'),
      why: text('Přímá vazba na postup OKTE a na otázku, zda odkaz na postup státního zastupitelství představuje skutečně dokončenou nápravu.', 'Direct link to OKTE conduct and to whether referral to the public prosecution service amounts to an actually completed remedy.'),
      locations: text('oddíl IV; oddíl XV jako nová slezská větev; důkazní návrhy; oddíl o naléhavosti; seznam příloh', 'section IV; section XV as a new Silesian branch; evidence proposals; urgency section; exhibit list'),
      proposedText: text(
        'Nová procesní skutečnost. Krajské státní zastupitelství v Ostravě sdělením ze dne 8. července 2026, doručeným dne 16. července 2026, oznámilo, že část podání ze dne 27. května 2026 směřující vůči postupu OKTE Frýdek-Místek postoupilo Okresnímu státnímu zastupitelství ve Frýdku-Místku „k vyhodnocení a přijetí odpovídajícího opatření“. Listina dokládá pouze vznik a pokračování této procesní větve. Nedokládá potvrzení nesprávnosti či nezákonnosti postupu OKTE ani přijetí konkrétního opatření. Dosud není doložena nová spisová značka OSZ ani výsledek vyhodnocení. Tato skutečnost nemění označení žalovaného ani petit; dokládá však, že uvedená procesní cesta dosud nebyla věcně ukončena.',
        'New procedural fact. By a communication dated 8 July 2026 and received on 16 July 2026, the Regional Public Prosecutor’s Office in Ostrava stated that the part of the 27 May 2026 submission concerning OKTE Frýdek-Místek had been referred to the District Public Prosecutor’s Office in Frýdek-Místek “for assessment and adoption of an appropriate measure”. The document proves only the creation and continuation of this procedural branch. It does not confirm incorrect or unlawful OKTE conduct or the adoption of a specific measure. The new District Office reference and assessment outcome remain undocumented. This fact changes neither the defendant nor the relief sought; it shows that the stated procedural route has not yet produced a merits disposition.'
      )
    },
    {
      id: 'justice-action',
      level: 'review',
      decision: text('STRUČNĚ DOPLNIT PŘED PODÁNÍM', 'ADD A BRIEF SUPPLEMENT BEFORE FILING'),
      document: text('Městskému soudu v Praze — MSp — naléhavost, 18. 7. 2026', 'Prague Municipal Court — Ministry of Justice — urgency, 18 July 2026'),
      why: text('Podpůrný doklad aktuálního stavu forenzní větve a potřeby koordinovaného dohledu; nepřenáší odpovědnost KSZ nebo OSZ na Ministerstvo spravedlnosti.', 'Supportive evidence of the current forensic branch and the need for coordinated supervision; it does not transfer responsibility from the prosecution offices to the Ministry of Justice.'),
      locations: text('oddíl XIV o nových důkazech; oddíl XV o souvisejících řízeních; oddíl XVI o naléhavosti; důkazy a přílohy', 'section XIV on new evidence; section XV on related proceedings; section XVI on urgency; evidence and exhibits'),
      proposedText: text(
        'Dne 16. července 2026 bylo žalobci doručeno sdělení Krajského státního zastupitelství v Ostravě ze dne 8. července 2026, podle něhož byla část podání týkající se postupu OKTE Frýdek-Místek postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku k vyhodnocení a přijetí odpovídajícího opatření. Jde o novou procesní skutečnost dokládající otevřenou forenzní větev. Listina nepotvrzuje pochybení OKTE ani výsledek dohledu. Žalobce ji předkládá pouze k doložení aktuálního stavu a naléhavosti koordinovaného vypořádání, aniž mění žalovaného nebo petit.',
        'On 16 July 2026, the claimant received a communication of 8 July 2026 from the Regional Public Prosecutor’s Office in Ostrava stating that the part of the submission concerning OKTE Frýdek-Místek had been referred to the District Public Prosecutor’s Office in Frýdek-Místek for assessment and adoption of an appropriate measure. This is a new procedural fact showing an open forensic branch, not confirmation of OKTE wrongdoing or a supervisory outcome. It is submitted only to document the current status and urgency of coordinated disposition, without changing the defendant or relief sought.'
      )
    },
    {
      id: 'president-letter',
      level: 'review',
      decision: text('DOPLNIT CHRONOLOGII A PŘÍLOHY', 'UPDATE THE CHRONOLOGY AND EXHIBITS'),
      document: text('Prezidentu republiky — nové důkazy, naléhavost a stížnost, 18. 7. 2026', 'President of the Republic — new evidence, urgency and complaint, 18 July 2026'),
      why: text('Nový uzel patří do pavouka institucionálního vyřizování a podporuje žádost o koordinovanou odpověď; sám nepotvrzuje systémové pochybení.', 'The new node belongs in the institutional-handling graph and supports a request for a coordinated answer; it does not itself confirm systemic wrongdoing.'),
      locations: text('oddíl II nebo IV chronologie; oddíl VIII o naléhavosti; P. S.; seznam příloh', 'chronology in section II or IV; urgency section VIII; postscript; exhibit list'),
      proposedText: text(
        'Chronologie byla nově doplněna o sdělení Krajského státního zastupitelství v Ostravě ze dne 8. července 2026, doručené dne 16. července 2026. Část podání vztahující se k postupu OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku k vyhodnocení a přijetí odpovídajícího opatření. Tato listina nepotvrzuje pochybení ani přijetí opatření; dokládá, že další související procesní větev zůstává otevřená bez doložené spisové značky OSZ a bez věcného výsledku.',
        'The chronology has been updated with the Regional Public Prosecutor’s Office in Ostrava communication dated 8 July 2026 and received on 16 July 2026. The part of the submission concerning OKTE Frýdek-Místek was referred to the District Public Prosecutor’s Office in Frýdek-Místek for assessment and adoption of an appropriate measure. The document confirms neither wrongdoing nor the adoption of a measure; it shows that another related procedural branch remains open without a documented District Office reference or merits outcome.'
      )
    }
  ],
  relevance: [
    {
      level: 'direct',
      label: text('Přímá', 'Direct'),
      targets: text('OSZ Frýdek-Místek; KSZ Ostrava', 'District Public Prosecutor’s Office in Frýdek-Místek; Regional Public Prosecutor’s Office in Ostrava'),
      reason: text('Zjistit novou spisovou značku, evidenci převzetí a pozdější věcné vyřízení.', 'Identify the new reference, confirm receipt, and obtain the later substantive disposition.'),
      action: text('Zapsat uzel a sledovat; nejprve není nutné opakovat celou argumentaci.', 'Record and monitor the node; do not initially repeat the entire argument.')
    },
    {
      level: 'direct',
      label: text('Přímá', 'Direct'),
      targets: text('Předžalobní výzva nejvyšší státní zástupkyni ze 14. července 2026', 'Pre-litigation demand to the Supreme Public Prosecutor dated 14 July 2026'),
      reason: text('Další větev vzniklá po rozdělení původního podání je přímo významná pro požadavek koordinovaného prověření.', 'Another branch created after the original submission was split is directly relevant to the request for coordinated review.'),
      action: text('Doplnit datum, přesnou citaci a mez tvrzení; požádat o audit návaznosti, novou značku OSZ a věcný výsledek. Neoznačovat postoupení za potvrzení pochybení.', 'Add the date, exact quotation, and claim limitation; request an audit of the chain, the new District Office reference, and the merits outcome. Do not call the referral confirmation of wrongdoing.')
    },
    {
      level: 'direct',
      label: text('Přímá', 'Direct'),
      targets: text('Stížnosti ministrovi vnitra z 15. a 17. července 2026', 'Complaints to the Minister of the Interior dated 15 and 17 July 2026'),
      reason: text('Přímá vazba na policejní a forenzní dohled a na souběžné vyřizování více orgány.', 'Direct link to police and forensic oversight and parallel handling by several authorities.'),
      action: text('Doplnit obě stížnosti jednou shodnou pasáží: datum a citace postoupení, výslovná mez tvrzení a žádost o koordinaci policejního a forenzního dohledu a zachování podkladů.', 'Add the same concise passage to both complaints: date and quotation of the referral, express claim limitation, and a request for coordinated police and forensic oversight and preservation of records.')
    },
    {
      level: 'supportive',
      label: text('Podpůrná', 'Supportive'),
      targets: text('Stížnost ministryni spravedlnosti z 15. července 2026', 'Complaint to the Minister of Justice dated 15 July 2026'),
      reason: text('Dokládá aktuální stav jedné forenzní větve a podporuje požadavek koordinované odpovědi, ale nepřenáší odpovědnost KSZ nebo OSZ na ministerstvo.', 'Shows the current status of one forensic branch and supports a request for a coordinated answer, but does not transfer prosecution-office responsibility to the Ministry.'),
      action: text('Doplnit stručně do chronologie a naléhavosti. Výslovně uvést, že nejde o výsledek vyhodnocení ani důkaz pochybení OKTE.', 'Add briefly to the chronology and urgency section. State expressly that it is neither an assessment outcome nor proof of OKTE wrongdoing.')
    },
    {
      level: 'supportive',
      label: text('Podpůrná', 'Supportive'),
      targets: text('MSZ Praha a VSZ Praha', 'Prague Municipal and High Public Prosecutors’ Offices'),
      reason: text('Je-li tato větev důsledkem rozdělení původního podání, je významná pro audit, zda roztříštění vede k věcnému vyřízení.', 'If this branch resulted from splitting the original submission, it matters to the audit of whether fragmentation leads to a merits disposition.'),
      action: text('Použít jen po ověření procesní návaznosti v rozdělovníku MSZ Praha.', 'Use only after checking the procedural link in the Prague Municipal Public Prosecutor’s distribution record.')
    },
    {
      level: 'limited',
      label: text('Omezená', 'Limited'),
      targets: text('Třetí zásahová žaloba — Ministerstvo zdravotnictví, 8 Ad 9/2026', 'Third intervention action — Ministry of Health, 8 Ad 9/2026'),
      reason: text('Společné odborné téma THC a laboratorních podkladů, ale jiný žalovaný a procesní předmět.', 'A shared THC and laboratory-evidence subject, but a different defendant and procedural subject matter.'),
      action: text('Pokud se soudu podává další souhrnné doplnění, uvést listinu jen jako kontext otevřené laboratorní větve. Samostatné nové podání pouze kvůli tomuto postoupení není nyní nutné.', 'If a further consolidated supplement is filed, mention the document only as context for an open laboratory branch. A separate filing solely because of this referral is not currently necessary.')
    },
    {
      level: 'supportive',
      label: text('Podmíněná', 'Conditional'),
      targets: text('VSZ Olomouc; KSZ Brno; dohledová větev KSZ Ostrava', 'High Public Prosecutor’s Office in Olomouc; Regional Public Prosecutor’s Office in Brno; Ostrava Regional supervisory branch'),
      reason: text('Společné odborné téma OKTE a THC může být systémově významné, ale jednotlivé územní a dohledové větve nelze slučovat bez procesního spoje.', 'The shared OKTE and THC subject may be systemically relevant, but territorial and supervisory branches cannot be merged without a procedural link.'),
      action: text('Doplnit jen tam, kde spis výslovně prověřuje stejnou laboratorní metodiku nebo návaznost téhož podání; jinak pouze evidovat.', 'Supplement only a file that expressly reviews the same laboratory methodology or the chain of the same submission; otherwise record only.')
    },
    {
      level: 'none',
      label: text('Nyní bez samostatného podání', 'No separate submission now'),
      targets: text('ÚOOÚ — přezkum informačního rozhodnutí MV', 'Data Protection Authority — review of the Interior Ministry information decision'),
      reason: text('Postoupení samo nemění zákonnost informačního rozhodnutí.', 'The referral alone does not change the lawfulness of the information decision.'),
      action: text('Zmínit jen tehdy, pokud nová větev odhalí konkrétní chybějící záznam, který mělo MV vyhledat.', 'Use only if the new branch identifies a specific missing record that the Ministry should have searched for.')
    },
    {
      level: 'none',
      label: text('Nyní bez samostatného podání', 'No separate submission now'),
      targets: text('RRTV; Rada ČT; generální ředitel ČT; civilní spor s ČT; ÚOOÚ/ČT', 'RRTV; Czech Television Council; Czech Television Director General; civil action against Czech Television; DPA/Television branch'),
      reason: text('Procesní postoupení nepotvrzuje pochybení OKTE ani nepravdivost mediálního sdělení.', 'A procedural referral confirms neither wrongdoing by OKTE nor inaccuracy in media reporting.'),
      action: text('Nevkládat jako nový důkaz. Případný pozdější věcný výsledek posoudit samostatně.', 'Do not submit it as new evidence. Assess any later substantive outcome separately.')
    },
    {
      level: 'none',
      label: text('Nyní bez samostatného podání', 'No separate submission now'),
      targets: text('Obnova trestních řízení u Okresního soudu v Prostějově', 'Reopening proceedings before the Prostějov District Court'),
      reason: text('Samotné postoupení není novým věcným důkazem způsobilým změnit rozhodnutí.', 'The referral alone is not new substantive evidence capable of changing a decision.'),
      action: text('Vyčkat na výsledek posouzení nebo nový odborný podklad.', 'Wait for the assessment outcome or new expert material.')
    }
  ],
  humanChecks: [
    text('Ověřit z doručenky datum 16. července 2026.', 'Verify the 16 July 2026 receipt date against the delivery record.'),
    text('Ověřit, zda úplná listina neobsahuje poučení nebo další výrok mimo analyzovanou pasáž.', 'Check whether the full document contains instructions or another operative statement outside the analyzed passage.'),
    text('Zjistit novou spisovou značku OSZ Frýdek-Místek a přesný rozsah převzaté části podání.', 'Identify the new District Public Prosecutor’s Office reference and the exact scope of the referred part.'),
    text('Před odesláním doplnění zkontrolovat soudní spisy, adresáty, podpis a přílohy.', 'Before filing any supplement, check the court files, recipients, signature, and attachments.')
  ]
};

export function localizeInternalArchiveTest(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const localize = (value) => value?.[lang] ?? value;
  const source = INTERNAL_ARCHIVE_TEST;
  return {
    ...source,
    persona: localize(source.persona),
    title: localize(source.title),
    scope: localize(source.scope),
    archiveMetrics: source.archiveMetrics.map((metric) => ({ ...metric, label: localize(metric.label) })),
    incomingDocument: Object.fromEntries(Object.entries(source.incomingDocument).map(([key, value]) => [key, localize(value)])),
    decision: Object.fromEntries(Object.entries(source.decision).map(([key, value]) => [key, localize(value)])),
    proves: source.proves.map(localize),
    doesNotProve: source.doesNotProve.map(localize),
    relevanceLegend: source.relevanceLegend.map((item) => ({ ...item, label: localize(item.label), meaning: localize(item.meaning) })),
    propagationCheck: {
      ...source.propagationCheck,
      title: localize(source.propagationCheck.title),
      rule: localize(source.propagationCheck.rule),
      checks: source.propagationCheck.checks.map((item) => ({ ...item, question: localize(item.question), result: localize(item.result) }))
    },
    draftIntegrityWarning: {
      ...source.draftIntegrityWarning,
      title: localize(source.draftIntegrityWarning.title),
      summary: localize(source.draftIntegrityWarning.summary),
      findings: source.draftIntegrityWarning.findings.map((item) => ({
        document: localize(item.document),
        detected: localize(item.detected),
        correction: localize(item.correction)
      })),
      rule: localize(source.draftIntegrityWarning.rule)
    },
    internalDrafts: source.internalDrafts.map((item) => ({
      ...item,
      decision: localize(item.decision),
      document: localize(item.document),
      why: localize(item.why),
      locations: localize(item.locations),
      proposedText: localize(item.proposedText)
    })),
    relevance: source.relevance.map((item) => ({
      ...item,
      label: localize(item.label),
      targets: localize(item.targets),
      reason: localize(item.reason),
      action: localize(item.action)
    })),
    humanChecks: source.humanChecks.map(localize)
  };
}
