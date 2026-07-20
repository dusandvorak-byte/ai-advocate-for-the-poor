const text = (cs, en) => ({ cs, en });

export const ALLIANCE_UPDATE_DIGESTS = Object.freeze({
  publicRegister: '78d02fa15c2a50a861bdcde2819a2ce645455b54af062a7a199c0de9e9ba902a',
  artLanguageExecution: '5db024cb59938f3657a00e28a532e2d911f6fbe831ecf0702dde08a29c4257c7',
  liberecExecution: 'e76a1cc0c622dd691601f5bf7803feeb2141a0b00bba3685a54b9f1ef805e21b',
  plzenExecution: 'fc5015d32dccef7996f96ef29596e97f6e2bab1bb118e2b445a948cda3f2ad0a',
  prostejovJudgment: 'e334b2cbe96bcb6b557680162178639f345ba2ce2dfaed0c7560173c9a6eb346',
  liberecBalance: 'cc0133fbaddc7dfe001b385523d0a3ebb509a56e0569f62a38e6cd2b98f90b7f',
  generaliPaid: '3669893d3b74ec5cace66065492e39bc72688129e97f76d032a2d0ace356df78'
});

export const ALLIANCE_FOLLOWUP_DIGESTS = Object.freeze({
  policeDuplicate: '1038a80c8e57a4e4ecd3fb4f511ce9e7a6cf129634f5b193397391f9295966c7',
  liberecBalance: ALLIANCE_UPDATE_DIGESTS.liberecBalance,
  generaliPaid: ALLIANCE_UPDATE_DIGESTS.generaliPaid
});

export const ALLIANCE_UPDATE_SOURCE_EXCERPTS = Object.freeze({
  artLanguageExecution: [
    'Soudní exekutor Mgr. Jiří Král, Exekutorský úřad Ostrava',
    'pověřený dne 18.03.2015 č.j. 50 EXE 3744/2015-14, podle vykonatelného rozsudku Okresního soudu v Olomouci, č.j. 17 C 572/2009-260 ze dne 04.12.2014',
    'na návrh oprávněného: Československá obchodní banka, a.s.',
    'o nařízení exekuce k vymožení povinnosti povinného zaplatit oprávněnému pohledávku ve výši 1.030.870,05 Kč a její příslušenství',
    'zůstatek vymáhané pohledávky včetně nákladů exekuce ke dni 05.09.2016 činí 3.318.807,15 Kč',
    'I. Exekuce se zastavuje.'
  ].join('\n'),
  liberecExecution: [
    'Soudní exekutor Mgr. Petr Polanský, Exekutorský úřad Liberec',
    'pověřený provedením exekuce na základě usnesení o nařízení exekuce a pověření exekutora k jejímu provedení č.j. 36 EXE 3728/2015, ze dne 15.10.2015, které vydal Obvodní soud pro Prahu 3',
    'oprávněného: O2 Czech Republic a.s.',
    'k uspokojení pohledávky oprávněného ve výši 83 020,64 Kč s příslušenstvím',
    'I. Exekuce vedená podle usnesení - pověření č. j. 36 EXE 3728/2015, které vydal Obvodní soud pro Prahu 3 dne 15.10.2015 se podle ust. § 55 odst. 7 a.n. e.ř. zastavuje.',
    'V Liberci dne 22.6.2026'
  ].join('\n'),
  liberecBalance: [
    'Proti Vaší společnosti vedeme pouze jedno řízení.',
    'Exekucí vymáhaná povinnost představuje k 08.07.2025 celkem 192 752,91 Kč.',
    'Ke dni 8.7.2025 bylo soudním exekutorem vymoženo (Vámi uhrazeno) celkem 21 555,87 Kč.'
  ].join('\n'),
  plzenExecution: [
    'Soudní exekutor Mgr. Ing. Jiří Prošek, Exekutorský úřad Plzeň-město',
    'pověřený provedením exekuce na základě pověření Okresního soudu v Prostějově ze dne 06.09.2019, č.j. 24 EXE 1343/2019 - 17',
    'oprávněného: Pražská plynárenská, a.s.',
    'usnesení Obvodního soudu pro Prahu 3 č. j. 23 C 136/2013-149 ze dne 21.01.2016',
    'rozsudku Obvodního soudu pro Prahu 3 č. j. 23 C 136/2013-146 ze dne 21.01.2016',
    'v částce 74 981,00 Kč s příslušenstvím a s náklady exekuce, které budou v řízení stanoveny, v její aktuální výši 230 615,37 Kč, včetně nákladů exekuce ke dni 15.05.2026',
    'I. Exekuce se zastavuje.'
  ].join('\n'),
  prostejovJudgment: [
    'I. Žaloba na zaplacení částky 28.654Kč s úrokem z prodlení 0,05% denně z částky 3.853Kč od 11. 8. 2017 do zaplacení a s úrokem z prodlení 0,05% denně z částky 24.706Kč od 24. 11. 2017 do zaplacení, se zamítá.',
    'Nebylo proto prokázáno, že žalobce uzavřel smlouvu se subjektem, kterého označil v žalobě jako žalovaného a soud z tohoto důvodu žalobu v celém rozsahu zamítl.'
  ].join('\n'),
  publicRegister: [
    'Název: Edukativní konopná klinika, z.s.',
    'Identifikační číslo: 226 80 101',
    'Cannabis is The Cure, z.s., IČ: 266 70 232',
    'Ganja For All Animals, z.s., IČ: 227 24 303',
    'Údaje platné ke dni 19.7.2026 03:59'
  ].join('\n'),
  generaliPaid: [
    'Soudní exekutor Mgr. Ing. Jiří Prošek, Exekutorský úřad Plzeň - město',
    'pověřený provedením exekuce: č.j. 35 EXE 3654/2014, vydal OS Praha 3 dne 14.10.2014, na základě exekučního titulu: Rozsudek č.j. 21 C 317/2013-26, vydal OS Praha 3 dne 03.12.2013',
    'Generali Pojišťovna a.s., IČ 61859869',
    'Ateliér ALF,o.s., IČ 22680101',
    'dne 27.02.2015 byly splněny veškeré povinnosti dané exekučním titulem a tedy pohledávka, její příslušenství a náklady exekuce, případně další povinnosti dané exekučním titulem, byly vymoženy. Oprávnění soudního exekutora k vedení exekuce tedy ve smyslu § 51 písm. c) EŘ zaniká.'
  ].join('\n')
});

const artExecutorCitation = 'Soudní exekutor Mgr. Jiří Král, Exekutorský úřad Ostrava';
const artAppointmentCitation = 'pověřený dne 18.03.2015 č.j. 50 EXE 3744/2015-14, podle vykonatelného rozsudku Okresního soudu v Olomouci, č.j. 17 C 572/2009-260 ze dne 04.12.2014';
const artCreditorCitation = 'na návrh oprávněného: Československá obchodní banka, a.s.';
const artMatterCitation = 'o nařízení exekuce k vymožení povinnosti povinného zaplatit oprávněnému pohledávku ve výši 1.030.870,05 Kč a její příslušenství';
const artBalanceCitation = 'zůstatek vymáhané pohledávky včetně nákladů exekuce ke dni 05.09.2016 činí 3.318.807,15 Kč';
const stopCitation = 'I. Exekuce se zastavuje.';
const liberecExecutorCitation = 'Soudní exekutor Mgr. Petr Polanský, Exekutorský úřad Liberec';
const liberecAppointmentCitation = 'pověřený provedením exekuce na základě usnesení o nařízení exekuce a pověření exekutora k jejímu provedení č.j. 36 EXE 3728/2015, ze dne 15.10.2015, které vydal Obvodní soud pro Prahu 3';
const liberecCreditorCitation = 'oprávněného: O2 Czech Republic a.s.';
const liberecPrincipalCitation = 'k uspokojení pohledávky oprávněného ve výši 83 020,64 Kč s příslušenstvím';
const liberecStopCitation = 'I. Exekuce vedená podle usnesení - pověření č. j. 36 EXE 3728/2015, které vydal Obvodní soud pro Prahu 3 dne 15.10.2015 se podle ust. § 55 odst. 7 a.n. e.ř. zastavuje.';
const liberecOutcomeDateCitation = 'V Liberci dne 22.6.2026';
const liberecSingleProceedingCitation = 'Proti Vaší společnosti vedeme pouze jedno řízení.';
const liberecBalanceCitation = 'Exekucí vymáhaná povinnost představuje k 08.07.2025 celkem 192 752,91 Kč.';
const liberecPaidCitation = 'Ke dni 8.7.2025 bylo soudním exekutorem vymoženo (Vámi uhrazeno) celkem 21 555,87 Kč.';
const plzenExecutorCitation = 'Soudní exekutor Mgr. Ing. Jiří Prošek, Exekutorský úřad Plzeň-město';
const plzenAppointmentCitation = 'pověřený provedením exekuce na základě pověření Okresního soudu v Prostějově ze dne 06.09.2019, č.j. 24 EXE 1343/2019 - 17';
const plzenCreditorCitation = 'oprávněného: Pražská plynárenská, a.s.';
const plzenOrderCitation = 'usnesení Obvodního soudu pro Prahu 3 č. j. 23 C 136/2013-149 ze dne 21.01.2016';
const plzenJudgmentCitation = 'rozsudku Obvodního soudu pro Prahu 3 č. j. 23 C 136/2013-146 ze dne 21.01.2016';
const plzenBalanceCitation = 'v částce 74 981,00 Kč s příslušenstvím a s náklady exekuce, které budou v řízení stanoveny, v její aktuální výši 230 615,37 Kč, včetně nákladů exekuce ke dni 15.05.2026';
const generaliExecutorCitation = 'Soudní exekutor Mgr. Ing. Jiří Prošek, Exekutorský úřad Plzeň - město';
const generaliAppointmentCitation = 'pověřený provedením exekuce: č.j. 35 EXE 3654/2014, vydal OS Praha 3 dne 14.10.2014, na základě exekučního titulu: Rozsudek č.j. 21 C 317/2013-26, vydal OS Praha 3 dne 03.12.2013';
const generaliCreditorCitation = 'Generali Pojišťovna a.s., IČ 61859869';
const generaliSubjectCitation = 'Ateliér ALF,o.s., IČ 22680101';
const generaliOutcomeCitation = 'dne 27.02.2015 byly splněny veškeré povinnosti dané exekučním titulem a tedy pohledávka, její příslušenství a náklady exekuce, případně další povinnosti dané exekučním titulem, byly vymoženy. Oprávnění soudního exekutora k vedení exekuce tedy ve smyslu § 51 písm. c) EŘ zaniká.';
const judgmentDispositionCitation = 'I. Žaloba na zaplacení částky 28.654Kč s úrokem z prodlení 0,05% denně z částky 3.853Kč od 11. 8. 2017 do zaplacení a s úrokem z prodlení 0,05% denně z částky 24.706Kč od 24. 11. 2017 do zaplacení, se zamítá.';
const judgmentReasonCitation = 'Nebylo proto prokázáno, že žalobce uzavřel smlouvu se subjektem, kterého označil v žalobě jako žalovaného a soud z tohoto důvodu žalobu v celém rozsahu zamítl.';

export const ALLIANCE_UPDATE = Object.freeze({
  version: 'v2.3',
  addedDate: '2026-07-20',
  title: text(
    'Výroční zpráva 2025 a čtyři doložené ukončené exekuční větve aliance',
    'The 2025 Annual Report and four documented concluded enforcement branches of the alliance'
  ),
  headline: text(
    'Nové doklady zpřesnily liberecký dluh na 192 752,91 Kč k 8. červenci 2025 a přidaly čtvrtou exekuční větev ukončenou úplným vymožením; policejní PDF bylo správně rozpoznáno jako duplicita.',
    'New records fixed the Liberec balance at CZK 192,752.91 on 8 July 2025 and added a fourth enforcement branch concluded by full recovery; the police PDF was correctly recognized as a duplicate.'
  ),
  summary: text(
    'Ze tří právě doložených souborů jsou dva nové a jeden je přesnou duplicitou již evidované policejní listiny. Paměť nyní drží sedm jedinečných neveřejných zdrojových PDF této aktualizace; na webu zůstávají jen kontrolovatelná metadata, význam a citace.',
    'Of the three files just supplied, two are new and one is an exact duplicate of the police document already recorded. The memory now holds seven unique non-public source PDFs for this update; the website retains only auditable metadata, meaning, and quotations.'
  ),
  duplicateRecognition: {
    trafficBand: 'green-2',
    digest: ALLIANCE_FOLLOWUP_DIGESTS.policeDuplicate,
    matches: 'POLICE_UPDATE_DIGESTS.privateOriginal',
    title: text('Duplicitní policejní PDF nebylo započítáno podruhé', 'The duplicate police PDF was not counted twice'),
    result: text(
      'Digitální otisk se přesně shoduje s policejním originálem již evidovaným ve v2.1. Nevzniká nový dokument, nová událost, další červená vazba ani nová lhůta.',
      'Its digital fingerprint exactly matches the police original already recorded in v2.1. It creates no new document, event, red link, or deadline.'
    ),
    confidence: text('jisté — shoda celého SHA-256 otisku', 'certain — complete SHA-256 match')
  },
  annualReport: {
    year: 2025,
    approvalDate: '2026-07-14',
    trafficBand: 'green-3',
    title: text('Výroční zpráva aliance Cannabis is The Cure za rok 2025', 'Cannabis is The Cure alliance Annual Report for 2025'),
    status: text(
      'Schválena na svátek Bastily dne 14. července 2026. Po grafických úpravách bude zveřejněna na webu Konopí je lék.cz.',
      'Approved on Bastille Day, 14 July 2026. It will be published on the Konopí je lék.cz website after graphic design work.'
    ),
    website: 'https://www.konopijelek.cz/',
    websiteLabel: text('Konopí je lék.cz — aliance Cannabis is The Cure', 'Konopí je lék.cz — Cannabis is The Cure alliance'),
    publicationBoundary: text(
      'Samotná výroční zpráva se v této verzi nezveřejňuje ani nepřikládá; zveřejnění je odloženo do dokončení grafických úprav.',
      'The Annual Report itself is neither published nor attached in this version; publication is deferred until the graphic design work is complete.'
    ),
    provenance: text('autorem potvrzený záznam aliance', 'creator-confirmed alliance record')
  },
  registerContext: {
    trafficBand: 'green-2',
    date: '2026-07-20',
    validAt: '2026-07-19T03:59:00+02:00',
    claim: text(
      'Veřejný rejstřík uvádí Edukativní konopnou kliniku pod IČ 22680101 a propojuje v jejích orgánech spolky European Educational Cannabis Clinic, Cannabis is The Cure a Ganja For All Animals. Stejné IČ je v listině Generali z roku 2015 uvedeno u názvu Ateliér ALF, o.s.; shoda IČ propojuje obě historická označení, úplnou posloupnost změn názvu však tato dvojice listin sama neukazuje.',
      'The public register lists Edukativní konopná klinika under registration No. 22680101 and links European Educational Cannabis Clinic, Cannabis is The Cure, and Ganja For All Animals through its governing bodies. The 2015 Generali document uses the same registration number for Ateliér ALF, o.s.; that match links the two historical labels, although these two documents alone do not show the complete sequence of name changes.'
    ),
    citations: [
      'Název: Edukativní konopná klinika, z.s.',
      'Identifikační číslo: 226 80 101',
      'Cannabis is The Cure, z.s., IČ: 266 70 232',
      'Ganja For All Animals, z.s., IČ: 227 24 303',
      'Údaje platné ke dni 19.7.2026 03:59'
    ],
    confidence: text('vysoká — veřejný spolkový rejstřík', 'high — public associations register')
  },
  enforcementProceedings: [
    {
      id: 'art-language',
      trafficBand: 'red-2',
      subject: 'Art Language',
      reference: '043 EX 38/15-24',
      executor: 'Mgr. Jiří Král',
      office: text('Exekutorský úřad Ostrava', 'Ostrava Enforcement Office'),
      executorCitation: artExecutorCitation,
      creditor: 'Československá obchodní banka, a.s.',
      creditorCitation: artCreditorCitation,
      appointment: text(
        'Pověřen dne 18. 3. 2015 pod č. j. 50 EXE 3744/2015-14 podle vykonatelného rozsudku Okresního soudu v Olomouci č. j. 17 C 572/2009-260 ze dne 4. 12. 2014.',
        'Appointed on 18 March 2015 under ref. 50 EXE 3744/2015-14 on the basis of the enforceable Olomouc District Court judgment ref. 17 C 572/2009-260 dated 4 December 2014.'
      ),
      appointmentCitations: [artAppointmentCitation],
      matter: text('Pohledávka 1 030 870,05 Kč s příslušenstvím a náklady.', 'Claim of CZK 1,030,870.05 plus accessories and costs.'),
      matterCitation: artMatterCitation,
      stoppedDate: '2016-09-05',
      stopped: text('Exekuci zastavil Mgr. Jiří Král dne 5. 9. 2016.', 'Mgr. Jiří Král stopped the enforcement on 5 September 2016.'),
      stopCitation,
      amount: {
        display: text(
          'přibližně 3,3 mil. Kč — výslovně zaokrouhleno z přesného zůstatku 3 318 807,15 Kč ke dni zastavení',
          'approximately CZK 3.3 million — expressly rounded from the exact balance of CZK 3,318,807.15 on the stopping date'
        ),
        exactAtStop: 3318807.15,
        source: 'document',
        citation: artBalanceCitation
      }
    },
    {
      id: 'plzen-clinic',
      trafficBand: 'red-1',
      subject: 'Edukativní konopná klinika, z.s.',
      reference: '134 EX 07180/19-508',
      executor: 'Mgr. Ing. Jiří Prošek',
      office: text('Exekutorský úřad Plzeň-město', 'Plzeň-City Enforcement Office'),
      executorCitation: plzenExecutorCitation,
      creditor: 'Pražská plynárenská, a.s.',
      creditorCitation: plzenCreditorCitation,
      appointment: text(
        'Pověřen Okresním soudem v Prostějově dne 6. 9. 2019 pod č. j. 24 EXE 1343/2019-17; exekuce vycházela z usnesení č. j. 23 C 136/2013-149 a rozsudku č. j. 23 C 136/2013-146 Obvodního soudu pro Prahu 3 ze dne 21. 1. 2016.',
        'Appointed by Prostějov District Court on 6 September 2019 under ref. 24 EXE 1343/2019-17; the enforcement was based on Prague 3 District Court order ref. 23 C 136/2013-149 and judgment ref. 23 C 136/2013-146, both dated 21 January 2016.'
      ),
      appointmentCitations: [plzenAppointmentCitation, plzenOrderCitation, plzenJudgmentCitation],
      matter: text('Pohledávka 74 981 Kč s příslušenstvím a náklady.', 'Claim of CZK 74,981 plus accessories and costs.'),
      stoppedDate: '2026-05-15',
      stopped: text('Exekuci zastavil Mgr. Ing. Jiří Prošek dne 15. 5. 2026.', 'Mgr. Ing. Jiří Prošek stopped the enforcement on 15 May 2026.'),
      stopCitation,
      amount: {
        display: text(
          'přibližně 200 000 Kč — zaokrouhlený souhrn; listina uvádí přesně 230 615,37 Kč včetně nákladů ke dni zastavení',
          'approximately CZK 200,000 — a rounded summary; the document states exactly CZK 230,615.37 including costs on the stopping date'
        ),
        exactAtStop: 230615.37,
        source: 'document-rounded-for-summary',
        citation: plzenBalanceCitation
      }
    },
    {
      id: 'liberec-clinic',
      trafficBand: 'red-1',
      subject: 'Edukativní konopná klinika, z.s.',
      reference: '131 EX 8674/15-143',
      executor: 'Mgr. Petr Polanský',
      office: text('Exekutorský úřad Liberec', 'Liberec Enforcement Office'),
      executorCitation: liberecExecutorCitation,
      creditor: 'O2 Czech Republic a.s.',
      creditorCitation: liberecCreditorCitation,
      appointment: text(
        'Pověřen na základě usnesení Obvodního soudu pro Prahu 3 č. j. 36 EXE 3728/2015 ze dne 15. 10. 2015.',
        'Appointed on the basis of Prague 3 District Court order ref. 36 EXE 3728/2015 dated 15 October 2015.'
      ),
      appointmentCitations: [liberecAppointmentCitation],
      matter: text('Pohledávka 83 020,64 Kč s příslušenstvím.', 'Claim of CZK 83,020.64 plus accessories.'),
      matterCitation: liberecPrincipalCitation,
      stoppedDate: '2026-06-22',
      stopped: text('Exekuci zastavil Mgr. Petr Polanský dne 22. 6. 2026.', 'Mgr. Petr Polanský stopped the enforcement on 22 June 2026.'),
      stopCitation: liberecStopCitation,
      outcomeDateCitation: liberecOutcomeDateCitation,
      amount: {
        display: text(
          'přibližně 200 000 Kč — vyrozumění uvádí přesně 192 752,91 Kč k 8. 7. 2025 a současně 21 555,87 Kč již vymožených (uhrazených); usnesení o zastavení z 22. 6. 2026 přesný zůstatek ke dni zastavení neuvádí',
          'approximately CZK 200,000 — the notice states exactly CZK 192,752.91 on 8 July 2025 and CZK 21,555.87 already recovered (paid); the stopping order of 22 June 2026 does not state the exact balance on the stopping date'
        ),
        exactPrincipal: 83020.64,
        exactAtCheckpoint: 192752.91,
        paidAtCheckpoint: 21555.87,
        checkpointDate: '2025-07-08',
        source: 'document-checkpoint-with-stopping-date-boundary',
        citation: liberecBalanceCitation,
        additionalCitations: [liberecPaidCitation, liberecSingleProceedingCitation]
      }
    },
    {
      id: 'generali-paid',
      trafficBand: 'red-1',
      subject: 'Ateliér ALF, o.s. · IČ 22680101',
      reference: '134 EX 20124/14-066',
      executor: 'Mgr. Ing. Jiří Prošek',
      office: text('Exekutorský úřad Plzeň-město', 'Plzeň-City Enforcement Office'),
      executorCitation: generaliExecutorCitation,
      creditor: 'Generali Pojišťovna a.s.',
      creditorCitation: generaliCreditorCitation,
      appointment: text(
        'Pověřen na základě pověření Obvodního soudu pro Prahu 3 č. j. 35 EXE 3654/2014 ze dne 14. 10. 2014 a rozsudku téhož soudu č. j. 21 C 317/2013-26 ze dne 3. 12. 2013.',
        'Appointed on the basis of Prague 3 District Court commission ref. 35 EXE 3654/2014 dated 14 October 2014 and that court’s judgment ref. 21 C 317/2013-26 dated 3 December 2013.'
      ),
      appointmentCitations: [generaliAppointmentCitation],
      matter: text(
        'Vymožení povinností vůči Generali Pojišťovně; listina částku neuvádí.',
        'Recovery of obligations owed to Generali Pojišťovna; the document states no amount.'
      ),
      matterCitation: generaliCreditorCitation,
      outcomeKind: 'satisfied-and-authority-expired',
      outcomeDate: '2015-02-27',
      outcome: text(
        'Mgr. Ing. Jiří Prošek dne 27. 2. 2015 potvrdil úplné vymožení pohledávky, příslušenství a nákladů; jeho oprávnění vést exekuci tím zaniklo.',
        'On 27 February 2015, Mgr. Ing. Jiří Prošek confirmed full recovery of the claim, accessories, and costs; his authority to conduct the enforcement therefore expired.'
      ),
      outcomeCitation: generaliOutcomeCitation,
      identityCitation: generaliSubjectCitation,
      amount: {
        display: text(
          'V této listině neuvedena — potvrzeno je úplné vymožení pohledávky, příslušenství a nákladů, nikoli jejich číselná výše.',
          'Not stated in this document — it confirms full recovery of the claim, accessories, and costs, but not their numerical amount.'
        ),
        exactAtOutcome: null,
        source: 'not-stated-in-document',
        citation: generaliOutcomeCitation
      }
    }
  ],
  districtCourt: {
    trafficBand: 'red-1',
    court: text('Okresní soud v Prostějově', 'Prostějov District Court'),
    reference: '14 C 89/2018-606',
    decisionDate: '2019-03-29',
    finality: text(
      'Výrok I nabyl právní moci dne 11. 5. 2019.',
      'Operative part I became final on 11 May 2019.'
    ),
    claim: text(
      'Soud v celém rozsahu zamítl žalobu ČEZ Prodej a.s. proti spolku Konopí je lék, z.s. na 28 654 Kč s příslušenstvím.',
      'The court dismissed in full the claim by ČEZ Prodej a.s. against Konopí je lék, z.s. for CZK 28,654 plus accessories.'
    ),
    reason: text(
      'Důvodem bylo, že nebylo prokázáno uzavření smlouvy s označeným žalovaným spolkem.',
      'The reason was that a contract with the named defendant association had not been proven.'
    ),
    meaning: text(
      'V této konkrétní smluvní větvi soud odmítl přenést předmětný dluh na spolek.',
      'In this specific contractual branch, the court refused to shift the debt at issue to the association.'
    ),
    limitation: text(
      'Rozsudek není obecným výrokem, že aliance nikdy nezpůsobila žádnou škodu; rozhoduje pouze konkrétní nárok na dluh za elektřinu a otázku, zda byla smlouva uzavřena se žalovaným.',
      'The judgment is not a general finding that the alliance never caused any damage; it decides only the specific electricity-debt claim and whether the contract was made with the defendant.'
    ),
    citations: [judgmentDispositionCitation, judgmentReasonCitation],
    confidence: text('vysoká — pravomocný výrok a odůvodnění rozsudku', 'high — final operative part and reasoning of the judgment')
  },
  creatorAssessment: {
    label: text('HODNOCENÍ AUTORA PŘÍPADU', 'CASE CREATOR’S ASSESSMENT'),
    statement: text(
      'Autor tyto čtyři exekuční větve popisuje jako jinou větev „státního teroru“: pachatelé podle něj nebyli vyšetřeni, zatímco na spolky byly přenášeny exekuce.',
      'The creator describes these four enforcement branches as another branch of “state terror”: in his account, perpetrators were not investigated while enforcement burdens were shifted onto the associations.'
    ),
    boundary: text(
      'Jde o autorovo hodnotící pojmenování. Přiložené listiny dokládají tři zastavené exekuce a jednu větev ukončenou úplným vymožením; samy nedokládají existenci pachatelů, policejní nevyšetřování ani právní závěr o státním teroru.',
      'This is the creator’s evaluative description. The supplied records establish three stopped enforcement proceedings and one branch concluded by full recovery; by themselves they do not establish perpetrators, a police failure to investigate, or a legal finding of state terror.'
    )
  },
  deadline: {
    status: 'none-currently-stated',
    stateSet: false,
    label: text('AKTUÁLNÍ LHŮTA K REAKCI', 'CURRENT RESPONSE DEADLINE'),
    value: text('Z těchto zastavovacích rozhodnutí nyní neplyne', 'None currently follows from these stopping orders'),
    explanation: text(
      'Rozhodnutí zaznamenávají zastavení exekucí. Semafor vyjadřuje důkazní a systémovou relevanci, nikoli novou smyšlenou lhůtu.',
      'The decisions record stopped enforcement proceedings. The traffic light records evidentiary and systemic relevance, not a newly invented deadline.'
    )
  },
  relevance: [
    { id: 'art-language', trafficBand: 'red-2' },
    { id: 'plzen-clinic', trafficBand: 'red-1' },
    { id: 'liberec-clinic', trafficBand: 'red-1' },
    { id: 'generali-paid', trafficBand: 'red-1' },
    { id: 'prostejov-judgment', trafficBand: 'red-1' },
    { id: 'annual-report', trafficBand: 'green-3' },
    { id: 'register-context', trafficBand: 'green-2' }
  ]
});

function localize(value, language) {
  if (value && typeof value === 'object' && 'cs' in value && 'en' in value) return value[language];
  return value;
}

export function localizeAllianceUpdate(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const localized = (value) => localize(value, lang);
  return {
    ...ALLIANCE_UPDATE,
    title: localized(ALLIANCE_UPDATE.title),
    headline: localized(ALLIANCE_UPDATE.headline),
    summary: localized(ALLIANCE_UPDATE.summary),
    duplicateRecognition: {
      ...ALLIANCE_UPDATE.duplicateRecognition,
      title: localized(ALLIANCE_UPDATE.duplicateRecognition.title),
      result: localized(ALLIANCE_UPDATE.duplicateRecognition.result),
      confidence: localized(ALLIANCE_UPDATE.duplicateRecognition.confidence)
    },
    annualReport: {
      ...ALLIANCE_UPDATE.annualReport,
      title: localized(ALLIANCE_UPDATE.annualReport.title),
      status: localized(ALLIANCE_UPDATE.annualReport.status),
      websiteLabel: localized(ALLIANCE_UPDATE.annualReport.websiteLabel),
      publicationBoundary: localized(ALLIANCE_UPDATE.annualReport.publicationBoundary),
      provenance: localized(ALLIANCE_UPDATE.annualReport.provenance)
    },
    registerContext: {
      ...ALLIANCE_UPDATE.registerContext,
      claim: localized(ALLIANCE_UPDATE.registerContext.claim),
      confidence: localized(ALLIANCE_UPDATE.registerContext.confidence)
    },
    enforcementProceedings: ALLIANCE_UPDATE.enforcementProceedings.map((item) => ({
      ...item,
      office: localized(item.office),
      appointment: localized(item.appointment),
      matter: localized(item.matter),
      stopped: localized(item.stopped),
      outcome: localized(item.outcome),
      amount: { ...item.amount, display: localized(item.amount.display) }
    })),
    districtCourt: {
      ...ALLIANCE_UPDATE.districtCourt,
      court: localized(ALLIANCE_UPDATE.districtCourt.court),
      finality: localized(ALLIANCE_UPDATE.districtCourt.finality),
      claim: localized(ALLIANCE_UPDATE.districtCourt.claim),
      reason: localized(ALLIANCE_UPDATE.districtCourt.reason),
      meaning: localized(ALLIANCE_UPDATE.districtCourt.meaning),
      limitation: localized(ALLIANCE_UPDATE.districtCourt.limitation),
      confidence: localized(ALLIANCE_UPDATE.districtCourt.confidence)
    },
    creatorAssessment: {
      ...ALLIANCE_UPDATE.creatorAssessment,
      label: localized(ALLIANCE_UPDATE.creatorAssessment.label),
      statement: localized(ALLIANCE_UPDATE.creatorAssessment.statement),
      boundary: localized(ALLIANCE_UPDATE.creatorAssessment.boundary)
    },
    deadline: {
      ...ALLIANCE_UPDATE.deadline,
      label: localized(ALLIANCE_UPDATE.deadline.label),
      value: localized(ALLIANCE_UPDATE.deadline.value),
      explanation: localized(ALLIANCE_UPDATE.deadline.explanation)
    }
  };
}

export function identifyAllianceUpdateDigest(digest) {
  for (const [id, expected] of Object.entries(ALLIANCE_UPDATE_DIGESTS)) {
    if (digest === expected) return id;
  }
  return null;
}
