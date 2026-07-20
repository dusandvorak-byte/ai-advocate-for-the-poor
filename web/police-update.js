const text = (cs, en) => ({ cs, en });

export const POLICE_UPDATE_DIGESTS = Object.freeze({
  privateOriginal: '1038a80c8e57a4e4ecd3fb4f511ce9e7a6cf129634f5b193397391f9295966c7',
  publicDerivative: 'e0b6f7d33373d390a077f581be6f251f10b701b04e81bfdaaea672aff587b307'
});

// Backwards-compatible name retained for the private source used in the test.
export const POLICE_UPDATE_DIGEST = POLICE_UPDATE_DIGESTS.privateOriginal;

export const POLICE_UPDATE_SOURCE_TEXT = `
Předžalobní výzva Mgr. Dušana Dvořáka - sdělení o uložení věci

Územnímu odboru Prostějov Krajského ředitelství policie Olomouckého kraje bylo dne
14.7.2026 doručeno Vaše podání označené jako Předžalobní výzva k odstranění trvajícího
stavu nepřezkoumatelnosti a roztříštěného vyřizování podání.

Informuji Vás, že podání adresované Nejvyššímu státnímu zastupitelství v Brně bylo bez
přijetí dalšího opatření uloženo pod č.j. KRPM-100092/ČJ-2026-1412UO.
`.trim();

const receiptCitation =
  'Územnímu odboru Prostějov Krajského ředitelství policie Olomouckého kraje bylo dne 14.7.2026 doručeno Vaše podání označené jako Předžalobní výzva k odstranění trvajícího stavu nepřezkoumatelnosti a roztříštěného vyřizování podání.';
const dispositionCitation =
  'podání adresované Nejvyššímu státnímu zastupitelství v Brně bylo bez přijetí dalšího opatření uloženo pod č.j. KRPM-100092/ČJ-2026-1412UO';
const receiptCitationTranslation =
  'The Prostějov Territorial Department of the Olomouc Regional Police Directorate received on 14 July 2026 your submission designated as a pre-action demand to remedy the continuing state of unreviewability and fragmented handling of submissions.';
const dispositionCitationTranslation =
  'the submission addressed to the Supreme Public Prosecutor’s Office in Brno was placed on file without further action under reference KRPM-100092/ČJ-2026-1412UO';
const headingCitationTranslation =
  'Pre-action demand by Mgr. Dušan Dvořák — notice that the matter was placed on file';
const fifteenYearCitation =
  'Ani po více než patnácti letech, více než stovce spisů NZN a více než pětadvaceti kárných podnětech a stížnostech v agendě SPR nebyl vydán jediný souhrnný, věcný a přezkoumatelný závěr.';
const preventiveCitation =
  'Návrh na obnovu a preventivní podání ze dne 12. července 2026 Okresnímu soudu v Prostějově, Okresnímu státnímu zastupitelství v Prostějově a Krajskému ředitelství policie Olomouckého kraje.';
const municipalHealthCitation =
  'Žalobce předkládá Předžalobní výzva Nejvyššímu státnímu zastupitelství ze dne 14. července 2026 jako nový souhrnný důkaz';
const municipalJusticeCitation =
  'Rovněž předžalobní výzvu Nejvyššímu státnímu zastupitelství ze dne 14. července 2026 soud již obdržel.';
const kprCitation =
  'KPR byla seznámena s předžalobní výzvou NSZ, stížnostmi ministrům a novými důkazy.';

export const POLICE_UPDATE = {
  version: '2026-07-20-post-submission-1',
  title: text(
    'Následný test: policejní sdělení o uložení podání bez dalšího opatření',
    'Post-submission test: police notice recording a submission without further action'
  ),
  source: {
    institution: text(
      'Policie ČR - Krajské ředitelství policie Olomouckého kraje, Územní odbor Prostějov',
      'Police of the Czech Republic - Olomouc Regional Directorate, Prostějov Territorial Department'
    ),
    documentDate: '2026-07-20',
    reference: 'KRPM-100092-2/ČJ-2026-1412UO',
    publicFile: 'documents/police-notice-public-derivative-2026-07-20.pdf',
    publicLinkLabel: text(
      'Otevřít veřejnou odvozenou kopii se zachovaným jménem adresáta',
      'Open the reviewed public derivative preserving the addressee’s name'
    ),
    recognition: text(
      'Soukromý originál byl rozpoznán přesným digitálním otiskem. Soubor neopustil prohlížeč.',
      'The private original was recognized by its exact digital fingerprint. The file did not leave the browser.'
    ),
    status: text(
      'Zdrojově omezená analýza jednostránkového sdělení. Originál, adresa příjemce a podpisové údaje se nezveřejňují.',
      'Source-bounded analysis of a one-page notice. The original, recipient address, and signature data are not published.'
    ),
    privacy: text(
      'Jméno Mgr. Dušana Dvořáka a názvy jím zastupovaných nevládních organizací zůstávají veřejné. Skryty jsou adresní a podpisové údaje a nepotřebná data třetích osob.',
      'Mgr. Dušan Dvořák’s name and the names of the nonprofit organisations he represents remain public. Recipient-address and signature data and unnecessary third-party data are withheld.'
    )
  },
  deadline: {
    status: 'not-stated',
    stateSet: false,
    label: text('LHŮTA STANOVENÁ STÁTEM', 'STATE-SET DEADLINE'),
    value: text('V posuzované listině neuvedena', 'Not stated in the reviewed document'),
    explanation: text(
      'Nejvyšší stupeň semaforu vyjadřuje dopad listiny do propojených větví a potřebu lidské reakce. Neznamená, že si systém domyslel zákonnou lhůtu nebo opravný prostředek.',
      'The highest traffic-light level records the document’s impact on connected branches and the need for human response. It does not mean that the system invented a statutory deadline or remedy.'
    ),
    citation: dispositionCitation
  },
  systemicFinding: {
    label: text('SYSTÉMOVÝ VÝSLEDEK', 'SYSTEMIC RESULT'),
    headline: text(
      'Po více než patnácti letech vymáhání věcné a přezkoumatelné odpovědi nepřinesla ani tato listina věcnou odpověď.',
      'After more than fifteen years of seeking a substantive and reviewable answer, this document again provided no substantive answer.'
    ),
    explanation: text(
      'Policejní sdělení pouze zaznamenalo, že podání adresované Nejvyššímu státnímu zastupitelství bylo bez přijetí dalšího opatření uloženo. V propojeném archivu tím vzniká další uzel stejného procesního vzorce a devět červených vazeb vyžadujících přednostní lidskou kontrolu.',
      'The police notice merely recorded that a submission addressed to the Supreme Public Prosecutor’s Office was placed on file without further action. In the connected archive this creates another node in the same procedural pattern and nine red links requiring priority human review.'
    ),
    limitation: text(
      'Jde o syntézu policejního sdělení, propojeného archivu a autorem potvrzené chronologie, nikoli o doslovný výrok policie ani pravomocné určení nezákonnosti.',
      'This is a synthesis of the police notice, the connected archive, and the creator-confirmed chronology, not a verbatim police statement or a final determination of unlawfulness.'
    ),
    citations: [fifteenYearCitation, dispositionCitation]
  },
  comparison: {
    before: {
      label: text('PŘED TESTEM', 'BEFORE THE TEST'),
      title: text(
        'Paměť znala předžalobní výzvu, ale nikoli tento policejní způsob vyřízení',
        'The memory knew of the pre-action demand, but not this police handling event'
      ),
      state: text(
        'Bez nové listiny systém nesměl tvrdit, že Územní odbor Prostějov podání obdržel nebo je bez dalšího opatření uložil.',
        'Without the new document, the system could not state that the Prostějov Territorial Department received the submission or recorded it without further action.'
      )
    },
    after: {
      label: text('PO TESTU', 'AFTER THE TEST'),
      title: text(
        'Vznikl nový policejní uzel a nevyřešená otázka původu předání',
        'A new police node and an unresolved routing question were created'
      ),
      state: text(
        'Systém eviduje přijetí dne 14. července 2026 a sdělení ze dne 20. července 2026. Nevyvozuje, že podání předalo NSZ, že je NSZ vyřídilo nebo že policie rozhodla o jeho důvodnosti.',
        'The system records receipt on 14 July 2026 and the notice dated 20 July 2026. It does not infer that the Supreme Public Prosecutor’s Office forwarded or disposed of the submission, or that the police decided its merits.'
      )
    },
    solution: [
      text(
        'Do chronologie vložit odděleně datum policejního přijetí 14. července a datum sdělení 20. července 2026.',
        'Enter the police receipt date of 14 July and notice date of 20 July 2026 as separate events.'
      ),
      text(
        'Policejní větev označit jako uloženou bez dalšího opatření, nikoli jako věcně rozhodnutou nebo vyřízenou NSZ.',
        'Mark the police branch as recorded without further action, not as a merits decision or a disposal by the Supreme Public Prosecutor’s Office.'
      ),
      text(
        'Otevřít kontrolní mezeru: kdo, kdy a pod jakým průvodním číslem doručil policii podání adresované NSZ.',
        'Open a verification gap: who delivered to the police a submission addressed to the Supreme Public Prosecutor’s Office, when, and under what covering reference.'
      ),
      text(
        'Připravit k lidské kontrole dotaz na původ předání a skutkový i právní důvod uložení bez dalšího opatření; systém jej sám neodesílá.',
        'Prepare for human review a request asking about the routing provenance and the factual and legal basis for recording the matter without further action; the system does not send it.'
      )
    ]
  },
  archiveOwnerStatement: {
    label: text(
      'Název souboru zadaný uživatelem - není výrokem policie',
      'User-supplied filename - not a police statement'
    ),
    value: text(
      'Slova „odkládáme do koše“ jsou hodnotícím označením v názvu souboru. V samotné listině se nevyskytují.',
      'The words “we are throwing it in the bin” are evaluative wording in the filename. They do not occur in the document.'
    ),
    confidence: text(
      'archivní metadata oddělená od obsahu listiny',
      'archive metadata kept separate from the document content'
    )
  },
  creatorChronology: {
    label: text('AUTOREM POTVRZENÁ CHRONOLOGIE', 'CREATOR-CONFIRMED CHRONOLOGY'),
    statement: text(
      'Mgr. Dušan Dvořák potvrzuje, že dne 14. července 2026 po podání předžalobní výzvy Nejvyššímu státnímu zastupitelství zaslal tutéž výzvu také Policii ČR jako důkaz důvodnosti preventivního podání ze dne 12. července 2026, Okresnímu soudu v Prostějově, Okresnímu státnímu zastupitelství v Prostějově, Kanceláři prezidenta republiky, Ministerstvu spravedlnosti a do souvisejících zásahových žalob.',
      'Mgr. Dušan Dvořák confirms that on 14 July 2026, after filing the pre-action demand with the Supreme Public Prosecutor’s Office, he sent the same demand to the Police as evidence supporting the preventive filing dated 12 July 2026, to the Prostějov District Court, the Prostějov District Public Prosecutor’s Office, the Office of the President, the Ministry of Justice, and into the related intervention actions.'
    ),
    provenance: text(
      'Autorem potvrzený záznam vložený do paměti případu dne 20. července 2026.',
      'Creator-confirmed record entered into the case memory on 20 July 2026.'
    ),
    boundary: text(
      'Systém tento údaj přijímá jako autorův záznam bez požadavku, aby autor dokazoval sám sobě vlastní jednání. Ve veřejném výstupu jej však nezaměňuje za doslovný obsah policejní listiny ani za potvrzení jednotlivých adresátů.',
      'The system accepts this as the archive owner’s record without requiring him to prove his own action to himself. In the public output it remains distinct from the police document’s wording and from confirmation by any individual recipient.'
    )
  },
  facts: [
    {
      claim: text(
        'Územní odbor Prostějov uvádí, že dne 14. července 2026 obdržel podání označené jako předžalobní výzva.',
        'The Prostějov Territorial Department states that on 14 July 2026 it received a submission designated as a pre-action demand.'
      ),
      citation: receiptCitation,
      citationTranslation: receiptCitationTranslation,
      confidence: text('vysoká - přímý výrok listiny', 'high - direct statement in the document')
    },
    {
      claim: text(
        'Policie uvádí, že podání adresované Nejvyššímu státnímu zastupitelství bylo bez přijetí dalšího opatření uloženo.',
        'The police state that the submission addressed to the Supreme Public Prosecutor’s Office was recorded without further action.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('vysoká - přímý výrok listiny', 'high - direct statement in the document')
    },
    {
      claim: text(
        'Listina sama sebe označuje jako sdělení o uložení věci, nikoli jako rozhodnutí NSZ.',
        'The document identifies itself as a notice that the matter was recorded, not as a decision of the Supreme Public Prosecutor’s Office.'
      ),
      citation: 'Předžalobní výzva Mgr. Dušana Dvořáka - sdělení o uložení věci',
      citationTranslation: headingCitationTranslation,
      confidence: text('vysoká - nadpis listiny', 'high - document heading')
    }
  ],
  doesNotProve: [
    {
      claim: text(
        'Listina neříká, kdo podání adresované NSZ doručil policii ani zda je policii postoupilo NSZ.',
        'The document does not say who delivered the submission addressed to the Supreme Public Prosecutor’s Office to the police or whether that Office forwarded it.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('vysoká - mez výslovného obsahu listiny', 'high - limit of the document’s express wording')
    },
    {
      claim: text(
        'Listina nedokládá, že NSZ předžalobní výzvu věcně posoudilo nebo o ní rozhodlo.',
        'The document does not establish that the Supreme Public Prosecutor’s Office assessed or decided the pre-action demand on its merits.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('vysoká - mez výslovného obsahu listiny', 'high - limit of the document’s express wording')
    },
    {
      claim: text(
        'Listina neuvádí skutkové ani právní důvody, proč policie nepřijala další opatření.',
        'The document gives no factual or legal reasons for the police taking no further action.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('vysoká - mez jednostránkového sdělení', 'high - limit of the one-page notice')
    },
    {
      claim: text(
        'Z této listiny samotné nelze vypočítat zákonnou lhůtu k reakci ani určit opravný prostředek.',
        'This document alone does not allow a statutory response deadline or remedy to be calculated.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('střední - vyžaduje právní kontrolu úplného procesního kontextu', 'medium - requires legal review of the complete procedural context')
    }
  ],
  relevance: [
    {
      level: 'direct',
      trafficBand: 'red-3',
      label: text('ČERVENÁ 1 - NSZ a souběžné rozeslání', 'RED 1 - Supreme Public Prosecutor and parallel distribution'),
      targets: text(
        'Předžalobní výzva evidovaná policií dne 14. července 2026, NSZ a policejní větev',
        'Pre-action demand recorded by the police on 14 July 2026, the Supreme Public Prosecutor’s Office, and the police branch'
      ),
      reason: text(
        'Listina spojuje podání adresované NSZ s evidencí u policie. Autorem potvrzená chronologie vysvětluje, že stejnopis zaslal policii přímo autor; systém proto nevyvozuje, že jej postoupilo NSZ.',
        'The document connects a submission addressed to the Supreme Public Prosecutor’s Office with a police record. The creator-confirmed chronology records that the creator sent the copy directly to the police; the system therefore does not infer that the Office forwarded it.'
      ),
      action: text(
        'Zapsat přímé rozeslání autorem jako samostatnou událost a policejní sdělení jako samostatný výsledek; nepřisuzovat předání NSZ.',
        'Record the creator’s direct distribution as one event and the police notice as a separate outcome; do not attribute the routing to the Supreme Public Prosecutor’s Office.'
      ),
      citation: dispositionCitation,
      evidenceStatus: text('přijetí a uložení: přímý výrok listiny; přímé rozeslání: autorem potvrzená chronologie', 'receipt and filing: direct document statement; direct distribution: creator-confirmed chronology')
    },
    {
      level: 'direct',
      trafficBand: 'red-3',
      label: text('ČERVENÁ 2 - Policie a preventivní podání', 'RED 2 - Police and preventive submission'),
      targets: text(
        'Krajské ředitelství policie Olomouckého kraje a preventivní podání ze dne 12. července 2026',
        'Olomouc Regional Police Directorate and the preventive submission dated 12 July 2026'
      ),
      reason: text(
        'Policejní sdělení dokládá přijetí navazující předžalobní výzvy dne 14. července; propojený archiv ji váže k preventivnímu podání z 12. července.',
        'The police notice establishes receipt of the follow-up pre-action demand on 14 July; the connected archive links it to the preventive submission dated 12 July.'
      ),
      action: text(
        'Přednostně porovnat obě listiny a určit, zda sdělení reagovalo na preventivní riziko zásahu, nebo pouze evidovalo navazující výzvu.',
        'Compare both documents as a priority and determine whether the notice addressed the preventive risk of intervention or merely recorded the follow-up demand.'
      ),
      citation: preventiveCitation,
      evidenceStatus: text('vazba doložena obsahem předžalobní výzvy a autorem potvrzenou chronologií', 'link supported by the pre-action demand and creator-confirmed chronology')
    },
    {
      level: 'direct',
      trafficBand: 'red-2',
      label: text('ČERVENÁ 3 - Okresní soud v Prostějově', 'RED 3 - Prostějov District Court'),
      targets: text(
        'Preventivní soudní větev a důkaz naléhavosti',
        'Preventive court branch and evidence of urgency'
      ),
      reason: text(
        'Předžalobní výzva uvádí preventivní podání okresnímu soudu; podle autora mu byla téhož dne předložena také jako navazující důkaz naléhavosti.',
        'The pre-action demand records the preventive submission to the District Court; according to the creator, it was also supplied there the same day as follow-up evidence of urgency.'
      ),
      action: text(
        'Spojit listiny v časové ose a zachovat předžalobní výzvu jako autorem potvrzený důkaz naléhavosti této větve.',
        'Link the documents in the timeline and retain the pre-action demand as creator-confirmed evidence of urgency in this branch.'
      ),
      citation: preventiveCitation,
      evidenceStatus: text('existence větve doložena; rozeslání dne 14. července potvrzeno autorem', 'branch existence supported; distribution on 14 July confirmed by the creator')
    },
    {
      level: 'direct',
      trafficBand: 'red-2',
      label: text('ČERVENÁ 4 - OSZ v Prostějově', 'RED 4 - Prostějov District Public Prosecutor’s Office'),
      targets: text('Dohledová větev 1 ZT 11/2010 a preventivní podání', 'Supervisory branch 1 ZT 11/2010 and the preventive submission'),
      reason: text(
        'Propojený archiv výslovně uvádí preventivní podání tomuto státnímu zastupitelství a dlouhodobou absenci věcného vypořádání.',
        'The connected archive expressly records a preventive submission to this public prosecutor’s office and the long-running absence of a substantive disposition.'
      ),
      action: text(
        'V paměti spojit obě listiny a při další úřední odpovědi kontrolovat, zda byly posouzeny společně a věcně.',
        'Connect both documents in the memory and check in the next official response whether they were assessed together and on their merits.'
      ),
      citation: preventiveCitation,
      evidenceStatus: text('existence větve doložena obsahem podání; rozeslání navazující výzvy potvrzeno autorem', 'branch existence supported by the submission; distribution of the follow-up demand confirmed by the creator')
    },
    {
      level: 'direct',
      trafficBand: 'red-1',
      label: text('ČERVENÁ 5 - Kancelář prezidenta republiky', 'RED 5 - Office of the President of the Republic'),
      targets: text('KPR 4093/2026 a prezidentská větev', 'KPR 4093/2026 and the presidential branch'),
      reason: text(
        'Odeslané prezidentské podání zaznamenává, že KPR byla s předžalobní výzvou a novými důkazy seznámena.',
        'The sent presidential submission records that the Office was informed of the pre-action demand and new evidence.'
      ),
      action: text(
        'Nové policejní sdělení zařadit jako následný procesní výsledek; netvrdit, že KPR přijala opatření.',
        'Record the new police notice as a subsequent procedural outcome; do not claim that the Office took action.'
      ),
      citation: kprCitation,
      evidenceStatus: text('doloženo textem odeslaného prezidentského podání a autorem potvrzenou chronologií', 'supported by the sent presidential submission and creator-confirmed chronology')
    },
    {
      level: 'direct',
      trafficBand: 'red-2',
      label: text('ČERVENÁ 6 - ministr a Ministerstvo spravedlnosti', 'RED 6 - Minister and Ministry of Justice'),
      targets: text('Stížnost na nečinnost a znalecký dohled', 'Inactivity complaint and forensic oversight'),
      reason: text(
        'Podle autora byla předžalobní výzva předložena také této větvi jako důkaz pokračujícího roztříštěného vyřizování.',
        'According to the creator, the pre-action demand was also supplied to this branch as evidence of continuing fragmented handling.'
      ),
      action: text(
        'Vložit jako autorem potvrzenou součást společného rozeslání a výslovně rozlišit, že policejní sdělení dokládá uložení bez opatření, nikoli pochybení ministerstva.',
        'Record it as a creator-confirmed part of the parallel distribution and expressly distinguish that the police notice establishes filing without action, not wrongdoing by the Ministry.'
      ),
      citation: text('tvrzení autora o rozeslání ze dne 14. července 2026', 'creator statement concerning distribution on 14 July 2026'),
      evidenceStatus: text('autorem potvrzená chronologie vložená do paměti případu', 'creator-confirmed chronology entered into the case memory')
    },
    {
      level: 'direct',
      trafficBand: 'red-1',
      label: text('ČERVENÁ 7 - zásahová žaloba MZ', 'RED 7 - Ministry of Health intervention action'),
      targets: text('Městský soud v Praze, sp. zn. 8 Ad 9/2026', 'Prague Municipal Court, file 8 Ad 9/2026'),
      reason: text(
        'Doplnění žaloby ze dne 14. července výslovně předkládá předžalobní výzvu jako nový souhrnný důkaz.',
        'The supplement dated 14 July expressly submits the pre-action demand as new consolidated evidence.'
      ),
      action: text(
        'Policejní výsledek připojit k téže důkazní linii jen jako následnou událost; neměnit žalovaného ani petit.',
        'Attach the police outcome to the same evidence line only as a subsequent event; do not change the defendant or relief sought.'
      ),
      citation: municipalHealthCitation,
      evidenceStatus: text('přímý výrok doplnění žaloby ze dne 14. července 2026', 'direct statement in the action supplement dated 14 July 2026')
    },
    {
      level: 'direct',
      trafficBand: 'red-2',
      label: text('ČERVENÁ 8 - zásahová žaloba MSP', 'RED 8 - Ministry of Justice intervention action'),
      targets: text('Městský soud v Praze, sp. zn. 18 A 23/2026', 'Prague Municipal Court, file 18 A 23/2026'),
      reason: text(
        'Odeslané doplnění uvádí, že soud předžalobní výzvu již obdržel a má ji hodnotit společně s dalšími listinami.',
        'The sent supplement states that the court had already received the pre-action demand and should assess it together with the other documents.'
      ),
      action: text(
        'Nové sdělení zařadit jako další výsledek stejného řetězce a před dalším doplněním soudu zkontrolovat jeho přesný význam a důkazní meze.',
        'Record the new notice as another outcome in the same chain and check its precise meaning and evidentiary limits before any further court supplement.'
      ),
      citation: municipalJusticeCitation,
      evidenceStatus: text('doloženo textem odeslaného doplnění ze dne 19. července 2026', 'supported by the sent supplement dated 19 July 2026')
    },
    {
      level: 'direct',
      trafficBand: 'red-3',
      label: text('ČERVENÁ 9 - zásahová žaloba NCOZ/Policie ČR', 'RED 9 - NCOZ/Police intervention action'),
      targets: text('Městský soud v Praze, policejní zásahová větev', 'Prague Municipal Court, police-intervention branch'),
      reason: text(
        'Odeslané podání uvádí předžalobní výzvu mezi rozhodnými důkazy; policejní sdělení je proto přímou následnou událostí téže institucionální větve.',
        'The sent filing lists the pre-action demand among the material evidence; the police notice is therefore a direct subsequent event in the same institutional branch.'
      ),
      action: text(
        'Zařadit s nejvyšší prioritou k lidské kontrole, ale samo sdělení nevydávat za důkaz nezákonného zásahu nebo úspěchu žaloby.',
        'Queue it for highest-priority human review, but do not treat the notice itself as proof of unlawful intervention or likely success.'
      ),
      citation: text('předžalobní výzvou NSZ ze dne 14. července 2026', 'the pre-action demand to the Supreme Public Prosecutor’s Office dated 14 July 2026'),
      evidenceStatus: text('doloženo seznamem důkazů odeslaného podání a autorem potvrzenou chronologií', 'supported by the evidence list in the sent filing and creator-confirmed chronology')
    },
    {
      level: 'supportive',
      trafficBand: 'amber-3',
      label: text('ORANŽOVÁ - další dohledové orgány', 'AMBER - other oversight authorities'),
      targets: text('Ministr vnitra, VSZ v Olomouci, VSZ v Praze, KSZ v Brně a KSZ v Ostravě', 'Minister of the Interior, High Public Prosecutor’s Offices in Olomouc and Prague, and Regional Public Prosecutor’s Offices in Brno and Ostrava'),
      reason: text(
        'Relevance vzniká jen tam, kde konkrétní spis sleduje stejné podání, stejný procesní řetězec nebo tvrzené roztříštěné vyřizování.',
        'Relevance arises only where a specific file tracks the same submission, procedural chain, or alleged fragmented handling.'
      ),
      action: text(
        'Nejdříve spárovat spisové značky a věcný obsah; teprve potom rozhodnout o samostatném doplnění.',
        'First match file references and substantive content; only then decide whether a separate supplement is warranted.'
      ),
      citation: dispositionCitation,
      evidenceStatus: text('podmíněná vazba vyžadující spárování spisů', 'conditional link requiring file matching')
    },
    {
      level: 'none',
      trafficBand: 'green-1',
      label: text('ZELENÁ - bez přímé vazby', 'GREEN - no direct link'),
      targets: text('RRTV, Česká televize, Rada ČT a ÚOOÚ', 'Broadcasting Council, Czech Television, Czech Television Council, and Data Protection Authority'),
      reason: text(
        'Policejní sdělení neobsahuje skutkovou vazbu k mediální nebo datové větvi.',
        'The police notice contains no factual link to the media or data-protection branches.'
      ),
      action: text(
        'Pouze evidovat v centrální chronologii; bez nového propojujícího důkazu samostatné doplnění nevytvářet.',
        'Record it only in the central chronology; do not create a separate supplement without new linking evidence.'
      ),
      citation: receiptCitation,
      evidenceStatus: text('žádná přímá vazba v posuzované listině', 'no direct link in the assessed document')
    }
  ],
  humanChecks: [
    {
      claim: text(
        'Ve veřejném výstupu zachovat oddělení mezi přijetím výzvy, které uvádí policie, a širším rozesláním, které potvrzuje autor.',
        'In the public output, keep the police statement that it received the demand separate from the wider distribution confirmed by the creator.'
      ),
      citation: receiptCitation,
      citationTranslation: receiptCitationTranslation,
      confidence: text('doporučení k lidské kontrole', 'recommendation for human review')
    },
    {
      claim: text(
        'Vyhledat průvodní písemnost nebo elektronický záznam vysvětlující, jak se podání adresované NSZ dostalo k policii.',
        'Locate a covering document or electronic record explaining how a submission addressed to the Supreme Public Prosecutor’s Office reached the police.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('doporučení k lidské kontrole', 'recommendation for human review')
    },
    {
      claim: text(
        'Před jakoukoli reakcí nechat prověřit, zda a jak lze žádat odůvodnění, dohled nebo jiný přezkum; systém lhůtu ani opravný prostředek nehádá.',
        'Before responding, obtain professional review of whether and how reasons, supervision, or another review may be requested; the system does not guess a deadline or remedy.'
      ),
      citation: dispositionCitation,
      citationTranslation: dispositionCitationTranslation,
      confidence: text('právní kontrola nutná', 'legal review required')
    }
  ]
};

export function identifyPoliceUpdateDigest(digest) {
  if (digest === POLICE_UPDATE_DIGESTS.privateOriginal) return 'police-private-original';
  if (digest === POLICE_UPDATE_DIGESTS.publicDerivative) return 'police-public-derivative';
  return null;
}

export function localizePoliceUpdate(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const localize = (value) => value?.[lang] ?? value;
  const localizeStatement = (item) => ({
    ...item,
    claim: localize(item.claim),
    citation: localize(item.citation),
    citationTranslation: localize(item.citationTranslation),
    confidence: localize(item.confidence)
  });
  return {
    ...POLICE_UPDATE,
    title: localize(POLICE_UPDATE.title),
    source: {
      ...POLICE_UPDATE.source,
      institution: localize(POLICE_UPDATE.source.institution),
      publicLinkLabel: localize(POLICE_UPDATE.source.publicLinkLabel),
      recognition: localize(POLICE_UPDATE.source.recognition),
      status: localize(POLICE_UPDATE.source.status),
      privacy: localize(POLICE_UPDATE.source.privacy)
    },
    deadline: {
      ...POLICE_UPDATE.deadline,
      label: localize(POLICE_UPDATE.deadline.label),
      value: localize(POLICE_UPDATE.deadline.value),
      explanation: localize(POLICE_UPDATE.deadline.explanation)
    },
    systemicFinding: {
      ...POLICE_UPDATE.systemicFinding,
      label: localize(POLICE_UPDATE.systemicFinding.label),
      headline: localize(POLICE_UPDATE.systemicFinding.headline),
      explanation: localize(POLICE_UPDATE.systemicFinding.explanation),
      limitation: localize(POLICE_UPDATE.systemicFinding.limitation)
    },
    comparison: {
      before: {
        ...POLICE_UPDATE.comparison.before,
        label: localize(POLICE_UPDATE.comparison.before.label),
        title: localize(POLICE_UPDATE.comparison.before.title),
        state: localize(POLICE_UPDATE.comparison.before.state)
      },
      after: {
        ...POLICE_UPDATE.comparison.after,
        label: localize(POLICE_UPDATE.comparison.after.label),
        title: localize(POLICE_UPDATE.comparison.after.title),
        state: localize(POLICE_UPDATE.comparison.after.state)
      },
      solution: POLICE_UPDATE.comparison.solution.map(localize)
    },
    archiveOwnerStatement: {
      ...POLICE_UPDATE.archiveOwnerStatement,
      label: localize(POLICE_UPDATE.archiveOwnerStatement.label),
      value: localize(POLICE_UPDATE.archiveOwnerStatement.value),
      confidence: localize(POLICE_UPDATE.archiveOwnerStatement.confidence)
    },
    creatorChronology: {
      ...POLICE_UPDATE.creatorChronology,
      label: localize(POLICE_UPDATE.creatorChronology.label),
      statement: localize(POLICE_UPDATE.creatorChronology.statement),
      provenance: localize(POLICE_UPDATE.creatorChronology.provenance),
      boundary: localize(POLICE_UPDATE.creatorChronology.boundary)
    },
    facts: POLICE_UPDATE.facts.map(localizeStatement),
    doesNotProve: POLICE_UPDATE.doesNotProve.map(localizeStatement),
    relevance: POLICE_UPDATE.relevance.map((item) => ({
      ...item,
      label: localize(item.label),
      targets: localize(item.targets),
      reason: localize(item.reason),
      action: localize(item.action),
      citation: localize(item.citation),
      evidenceStatus: localize(item.evidenceStatus)
    })),
    humanChecks: POLICE_UPDATE.humanChecks.map(localizeStatement)
  };
}
