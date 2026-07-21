const text = (cs, en) => ({ cs, en });

export const MK_JK_REOPENING_DIGESTS = Object.freeze({
  allianceConferenceRecord: 'f08331c54212693e6242ab9dd483c9468b303bf51bf8ed0ae670d2a2f0e76c0a',
  signedAllianceDeclaration: '61d7cf9d83d1e90debed94480b63c4b44d00dafe397718252d7485e7cf56b3a3',
  constitutionalCourtInformationPage2: 'c31a5a5d15022262f470a3b26006cd3a87e9a53d0650771bdd5f9d62891e5391',
  constitutionalCourtInformationPage1: '71969b520bf90d8aa298986ff2aa7eeca18bfe7a59c8229c3aee2b7f8f3ae254',
  secondConstitutionalSupplement: '6266f5c50eca40589d05c6d05cde1b53ff887c240cff3bd078fabd956aa8927f',
  constitutionalComplaintMaterials: '983c1a00c0af4c19f2548d3fcf60a3cb25d247eff2a4a84698d36599e4b72f63',
  doctorStatementPage2: 'ae4db1590fe06166e66bb86a7572558443535745808cf2708c80e211923b4d78',
  constitutionalCourtDecision: '26b192d680193db0569a828d3d7a7cf720cc967d7d5119e3ce40ae8642e47c1f',
  justiceMinistrySupervision: '93b4c48f59d11abefb562a54a9d12c483ea8eb033f9802123b3e8346830ee1ea',
  justiceMinistryInformation: '4dbc648014ad09f2d51a80fe9c187597535594c69a42d02fa66b181e41ed1aff',
  supremeProsecutorNotice: 'b3bf1161a55051a8e86e9b935ee6864a5e8f76fd0626330f4c530454676c9ba1',
  thirdConstitutionalSupplement: '3e47b6c92325e3590e1c684399b1f7a0d7a18956266411164ce22c070c57f4d9',
  jointSubmissionPdf: '5faf8b56d906bd39d038a909940d61437cadbaa75b467ff578beb58223d96179',
  jointSubmissionDoc: '33a109722de9e108e143e8e99bc26d68806f970b6c4a3c4c609caa6882c0973a',
  highProsecutorNotice: '0920ee3da3804e3d11cbd0487e1203f172f33f59d728bb052cff6800c015fcc9',
  authorNote: '526a9c06a96c1f5e5bbb367f582a303f0ee2029cc832d21e58f0e5d97b52f928'
});

const courtPath = [
  {
    court: text('Krajský soud v Hradci Králové', 'Hradec Králové Regional Court'),
    date: '2017-02-27',
    reference: '9 T 5/2016-948',
    result: text('rozsudek soudu prvního stupně; později v celém rozsahu zrušen odvolacím soudem', 'first-instance judgment; later quashed in full by the appellate court')
  },
  {
    court: text('Vrchní soud v Praze', 'Prague High Court'),
    date: '2017-06-12',
    reference: '11 To 48/2017-1036',
    result: text('nový odsuzující rozsudek: oběma tři roky podmíněně; další výroky podle rozhodnutí', 'new conviction: three-year suspended sentences for both; additional orders as stated in the decision')
  },
  {
    court: text('Nejvyšší soud', 'Supreme Court'),
    date: '2017-12-13',
    reference: '11 Tdo 1499/2017-48',
    result: text('dovolání obou odsouzených odmítnuta', 'both appeals on points of law rejected')
  },
  {
    court: text('Ústavní soud', 'Constitutional Court'),
    date: '2019-07-09',
    reference: 'IV. ÚS 1140/18',
    result: text('ústavní stížnost odmítnuta jako zjevně neopodstatněná', 'constitutional complaint rejected as manifestly ill-founded'),
    sourceUrl: 'https://nalus.usoud.cz/Search/GetText.aspx?sz=4-1140-18_1'
  }
];

const officialFindings = [
  {
    id: 'vehicle-search',
    source: text('Ústavní soud, bod 31', 'Constitutional Court, paragraph 31'),
    finding: text('Prohlídka automobilu nebyla kryta potřebným příkazem, ale Ústavní soud uzavřel, že tato vada výsledek řízení nezměnila.', 'The vehicle search was not covered by the required warrant, but the Constitutional Court held that the defect did not change the outcome.'),
    boundary: text('Pro obnovu je nutný nový materiální důkaz; samotné zopakování již uznané vady nestačí.', 'Reopening requires new material evidence; repeating the already recognised defect is insufficient.')
  },
  {
    id: 'yield',
    source: text('Ústavní soud, body 33–34', 'Constitutional Court, paragraphs 33–34'),
    finding: text('Soud přijal počet 545 rostlin a rozlišil teoretickou budoucí výtěžnost od skutečně zajištěné sušiny. Námitky proti odbornému vyjádření Ing. Josefa Beneše neuznal.', 'The Court accepted the count of 545 plants and distinguished projected future yield from the dried material actually seized. It rejected the objections to Ing. Josef Beneš’s expert statement.'),
    boundary: text('Nové posouzení musí pracovat s původním vyjádřením, jeho doplňkem, fotografiemi, vstupními parametry a původními laboratorními podklady.', 'Any new assessment must use the original statement, its supplement, photographs, input parameters, and the original laboratory materials.')
  },
  {
    id: 'sale',
    source: text('Ústavní soud, bod 35', 'Constitutional Court, paragraph 35'),
    finding: text('Závěr o předávání či prodeji soud spojil zejména se SMS komunikací, výpověďmi a množstvím hotové drogy; označení „polský trh“ považoval za možné zveličení, nikoli za extrémní rozpor.', 'The Court linked the finding of supply or sale mainly to text messages, statements, and the amount of finished drug; it considered “Polish market” potentially exaggerated but not an extreme contradiction.'),
    boundary: text('Obnovu by mohl podpořit až nový primární digitálně-forenzní důkaz, nikoli pouze starší alternativní výklad zpráv.', 'Only new primary digital-forensic evidence, rather than the earlier alternative reading of the messages, could support reopening.')
  },
  {
    id: 'eu-law',
    source: text('Ústavní soud, body 37–38', 'Constitutional Court, paragraphs 37–38'),
    finding: text('Ústavní soud odmítl námitku neoznámených technických předpisů i požadavek na předběžnou otázku a nečekal na věc C-663/18.', 'The Constitutional Court rejected the technical-notification argument and the request for a preliminary ruling, and did not wait for Case C-663/18.'),
    boundary: text('Pozdější právní názor nebo rozsudek není sám o sobě novou skutkovou okolností pro obnovu podle § 278 odst. 1.', 'A later legal view or judgment is not by itself a new factual circumstance for reopening under section 278(1).')
  },
  {
    id: 'judge-route',
    source: text('Ústavní soud, bod 40', 'Constitutional Court, paragraph 40'),
    finding: text('Ústavní soud výslovně uvedl, že pravomocné zjištění trestného porušení povinností soudce v původním řízení by zakládalo důvod obnovy podle § 278 odst. 4 trestního řádu.', 'The Constitutional Court expressly stated that a final finding that a judge criminally breached duties in the original proceedings would establish a reopening ground under section 278(4) of the Code of Criminal Procedure.'),
    boundary: text('Zkontrolovaný soubor neobsahuje pravomocný trestní rozsudek s doložkou právní moci ani důkaz, že zjištěné jednání zasáhlo právě věc 11 To 48/2017.', 'The reviewed set contains neither a final criminal judgment with proof of finality nor evidence that the established conduct affected case 11 To 48/2017 specifically.')
  }
];

const submittedClaims = [
  text('Podatelé zpochybňovali vstupní údaje a výpočet budoucí výtěžnosti v odborném vyjádření Ing. Josefa Beneše.', 'The applicants challenged the input data and projected-yield calculation in Ing. Josef Beneš’s expert statement.'),
  text('Tvrdili promísení fotografií či nosičů z jiné domovní prohlídky a žádali přesné přiřazení každého digitálního důkazu.', 'They alleged mixing of photographs or devices from another search and sought exact attribution of every item of digital evidence.'),
  text('Nabídli alternativní vysvětlení SMS a poukazovali na použité telefony a SIM karty.', 'They offered alternative explanations for the text messages and referred to second-hand phones and SIM cards.'),
  text('Lékařské vyjádření z 1. 6. 2017 spojovalo léčbu konopím se zlepšením zdravotního stavu; jde o odborné tvrzení předložené již před rozhodnutím Ústavního soudu, nikoli automaticky nový důkaz.', 'A medical statement dated 1 June 2017 linked cannabis therapy to improved health; it is an expert assertion submitted before the Constitutional Court’s decision, not automatically new evidence.'),
  text('Unijní argumentaci rozvinula podání z 11. 12. 2018 a 20. 3. 2019; Ústavní soud ji v rozhodnutí z 9. 7. 2019 výslovně shrnul a odmítl.', 'The EU-law argument was developed in submissions dated 11 December 2018 and 20 March 2019; the Constitutional Court expressly summarised and rejected it on 9 July 2019.')
];

const relevance = [
  {
    id: 'final-judge-judgment', trafficBand: 'red-3', score: 9,
    title: text('§ 278 odst. 4: pravomocný rozsudek o trestném porušení povinností soudce', 'Section 278(4): final judgment finding a judge’s criminal breach of duty'),
    meaning: text('Jde o jedinou cestu, kterou Ústavní soud v této konkrétní věci sám výslovně označil jako možný důvod obnovy.', 'This is the only route that the Constitutional Court itself expressly identified in this particular case as a possible reopening ground.'),
    status: text('PODMÍNKA DOSUD NEDOLOŽENA', 'CONDITION NOT YET ESTABLISHED'),
    next: text('Opatřit pravomocný trestní rozsudek, doložku právní moci a přesnou skutkovou vazbu na senát a rozhodnutí 11 To 48/2017.', 'Obtain the final criminal judgment, proof of finality, and the precise factual link to the panel and decision 11 To 48/2017.'),
    boundary: text('Veřejná zpráva z 23. 1. 2026 označila nový odsuzující rozsudek za nepravomocný; žádnou vazbu na tuto věc sama nedokládá.', 'A public report dated 23 January 2026 described the new conviction as non-final; it does not itself establish any link to this case.'),
    sourceUrl: 'https://ct24.ceskatelevize.cz/clanek/domaci/soud-uznal-i-napodruhe-vinnym-soudce-elischera-369569'
  },
  {
    id: 'new-yield-opinion', trafficBand: 'red-2', score: 8,
    title: text('Nový nezávislý posudek k výtěžnosti a kvalifikačnímu znaku velkého rozsahu', 'New independent opinion on projected yield and the large-scale qualifying element'),
    meaning: text('Nosným bodem pokusu bylo tvrzení, kolik sušiny mohlo vzniknout z 545 nedorostlých rostlin. Skutečně nový odborný obsah by mohl být materiální.', 'A central point in the attempt conviction was the projected amount of dried material from 545 immature plants. Genuinely new expert content could be material.'),
    status: text('SILNÝ DŮKAZNÍ KANDIDÁT', 'STRONG EVIDENCE CANDIDATE'),
    next: text('Zadat revizní botanicko-zemědělský posudek nad úplnými původními daty a výslovně vyčíslit dopad na právní práh.', 'Commission a reviewing botanical-agricultural opinion using the complete original data and expressly quantify the effect on the legal threshold.'),
    boundary: text('Jiný názor bez nových podkladů, metody nebo obsahu nemusí projít testem novosti a materiálnosti.', 'A different opinion without new data, method, or content may fail the novelty and materiality test.')
  },
  {
    id: 'digital-chain', trafficBand: 'red-1', score: 7,
    title: text('Nová digitální forenzika telefonů, SIM, nosičů a řetězce zajištění', 'New digital forensics of phones, SIMs, devices, and chain of custody'),
    meaning: text('Prodejní závěr stojí mimo jiné na konkrétních zprávách. Nový forenzní obraz, metadata nebo řetězec předání by mohl zasáhnout nosný důkaz.', 'The supply finding rests in part on specific messages. A new forensic image, metadata, or chain-of-custody record could affect a central item of evidence.'),
    status: text('PODMÍNĚNĚ MATERIÁLNÍ', 'CONDITIONALLY MATERIAL'),
    next: text('Opatřit forenzní obrazy, hashe, protokoly zajištění, IMEI/IMSI, vlastnictví SIM a úplný export komunikace s kontextem.', 'Obtain forensic images, hashes, seizure records, IMEI/IMSI data, SIM ownership, and the complete contextual message export.'),
    boundary: text('Starší tvrzení o použitých telefonech a alternativní význam SMS byla soudu známa; sama nejsou nová.', 'The earlier assertions about second-hand phones and alternative message meanings were known to the court and are not new by themselves.')
  },
  {
    id: 'police-methodology', trafficBand: 'red-3', score: 9,
    title: text('Společný nový důkaz: chybějící závazný a jednotný postup měření THC', 'Shared new evidence: missing binding and unified THC-measurement procedure'),
    meaning: text('Pozdější úřední důkazy o metodice vznikly po původním řízení. Protože podle autorem potvrzeného základu bylo nadlimitní THC rozhodující i v této věci, jde o samostatnou důkazní osu s relevancí 9/9 k prověření obnovy.', 'The later official methodology evidence arose after the original proceeding. Because, on the creator-confirmed baseline, above-limit THC was decisive in this case as well, it is a separate evidential line with 9/9 relevance to review for reopening.'),
    status: text('EXTRÉM — HOŘÍ: SAMOSTATNÁ DŮKAZNÍ OSA', 'EXTREME — ON FIRE: SEPARATE EVIDENTIAL LINE'),
    next: text('Porovnat ji s konkrétním SOP, odběrem, homogenizací, chromatogramy a nejistotou měření v původním spisu.', 'Compare it with the specific SOP, sampling, homogenisation, chromatograms, and measurement uncertainty in the original file.'),
    boundary: text('Hodnota 9/9 vyjadřuje relevanci a naléhavost kontroly, nikoli automatické povolení obnovy. Je nutné propojit pozdější úřední důkazy s konkrétním původním výsledkem, použitým SOP a možným vlivem na rozhodnutí.', 'The 9/9 score expresses relevance and urgency of review, not automatic reopening. The later official evidence must be connected to the particular original result, applied SOP, and potential effect on the decision.')
  },
  {
    id: 'medical', trafficBand: 'amber-2', score: 5,
    title: text('Zdravotní účel a nové medicínské skutečnosti', 'Medical purpose and new medical facts'),
    meaning: text('Léčebný účel byl v původním řízení částečně přijat, ale soud jej nepovažoval za rozhodný vzhledem k rozsahu a prodejnímu závěru.', 'Medical purpose was partly accepted in the original proceedings but was not considered decisive in light of scale and the supply finding.'),
    status: text('PODPŮRNÁ VĚTEV', 'SUPPORTING BRANCH'),
    next: text('Použít pouze nové nezávislé medicínské poznatky s jasnou vazbou na tehdejší stav, spotřebu a materiální dopad; staré vyjádření označit jako již známé.', 'Use only new independent medical findings clearly linked to the historical condition, consumption, and material effect; label the old statement as already known.'),
    boundary: text('Lékařské vyjádření z 1. 6. 2017 bylo dostupné před skončením původního řízení a samo není novým důkazem.', 'The medical statement dated 1 June 2017 was available before the original proceedings ended and is not new evidence by itself.')
  },
  {
    id: 'eu-law-later-case', trafficBand: 'green-3', score: 3,
    title: text('C-663/18 a unijní argumentace', 'Case C-663/18 and the EU-law argument'),
    meaning: text('Rozsudek C-663/18 ze dne 19. 11. 2020 se týkal CBD a volného pohybu zboží; je právně zajímavý, ale skutkově není totožný s odsouzením za konopí s vysokým THC a prodej.', 'The judgment of 19 November 2020 in C-663/18 concerned CBD and free movement of goods; it is legally relevant but factually distinct from a conviction involving high-THC cannabis and supply.'),
    status: text('SAMOSTATNÁ PRÁVNÍ OSA', 'SEPARATE LEGAL AXIS'),
    next: text('Uvést jen jako pozdější právní vývoj a neprezentovat jej jako nový skutkový důkaz podle § 278 odst. 1.', 'Present it only as later legal development, not as new factual evidence under section 278(1).'),
    boundary: text('Nejvyšší soud judikuje, že pozdější právní názor v jiné věci sám není důvodem obnovy.', 'Supreme Court case law states that a later legal view in another case is not by itself a reopening ground.'),
    sourceUrl: 'https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:62018CJ0663'
  },
  {
    id: 'routing-records', trafficBand: 'green-2', score: 2,
    title: text('Podněty NSZ, ministerstvu a dohledová korespondence', 'Submissions to the Supreme Public Prosecutor, Ministry, and supervisory correspondence'),
    meaning: text('Listiny přesně dokládají procesní cestu podnětů a jejich založení či postoupení, nikoli nesprávnost výroku o vině.', 'The records precisely document the routing, filing, or referral of submissions, not that the conviction was wrong.'),
    status: text('CHRONOLOGIE, NE NOVÝ DŮKAZ VINY', 'CHRONOLOGY, NOT NEW EVIDENCE ON GUILT'),
    next: text('Použít pro úplnost procesní historie a ověřit, zda byl po 9. 7. 2019 podán obnovený podnět; nemíchat s důvody obnovy.', 'Use for procedural history and verify whether a renewed submission was made after 9 July 2019; do not mix it with reopening grounds.'),
    boundary: text('Emotivní hodnocení v podáních je tvrzením jejich autorů, nikoli zjištěním oslovených orgánů.', 'Emotive characterisations in the submissions are the authors’ allegations, not findings by the recipient authorities.')
  }
];

export const MK_JK_REOPENING_UPDATE = Object.freeze({
  id: 'mk-jk-reopening-review',
  version: 'v2.6',
  testedAt: '2026-07-20',
  subjectLabel: 'M. K. a J. K.',
  source: {
    documentDate: '2026-07-20',
    institution: text('vícezdrojové posouzení', 'multi-source review'),
    reference: 'IV. ÚS 1140/18',
    status: text('odvozený testovací výstup, nikoli nové soudní rozhodnutí', 'derived test output, not a new judicial decision')
  },
  title: text(
    'Případ M. K. a J. K.: společný nový důkaz k obnově 9/9 — EXTRÉM, HOŘÍ',
    'The M. K. and J. K. case: shared new reopening evidence 9/9 — EXTREME, ON FIRE'
  ),
  summary: text(
    'Šestnáct jedinečných souborů bylo porovnáno s veřejným rozhodnutím IV. ÚS 1140/18 a dnešní důkazní pamětí. Společný nový důkaz k neexistenci a nesjednocení závazného postupu měření THC i zvláštní cesta podle § 278 odst. 4 mají relevanci 9/9. Semafor neurčuje pravděpodobnost úspěchu.',
    'Sixteen unique files were compared with the public decision IV. ÚS 1140/18 and today’s evidence memory. Both the shared new evidence concerning the absence and lack of unification of a binding THC-measurement procedure and the case-specific section 278(4) line have 9/9 relevance. The traffic light does not predict success.'
  ),
  sourceInventory: {
    receivedFiles: 17,
    uniqueFiles: 16,
    duplicateDigest: MK_JK_REOPENING_DIGESTS.doctorStatementPage2,
    publicSourceFilesAdded: 0,
    status: text('soukromé zdroje zkontrolovány; veřejně se zveřejňuje pouze odvozené posouzení a odkazy na veřejná rozhodnutí', 'private sources reviewed; only the derived assessment and links to public decisions are published')
  },
  identityBoundary: text(
    'Veřejný výstup používá iniciály M. K. a J. K. podle databáze NALUS. Nezveřejňuje data narození, adresy, podpisy, zdravotní dokumentaci ani soukromé zdrojové soubory.',
    'The public output uses the initials M. K. and J. K. used by the NALUS database. Dates of birth, addresses, signatures, medical records, and private source files are not published.'
  ),
  allianceContext: {
    statement: text('Autor a předložené alianční záznamy označují oba za členy aliance; jeden podepsaný záznam uvádí funkci M. K. v odborné společnosti.', 'The creator and supplied alliance records identify both as alliance members; one signed record states M. K.’s office in a professional association.'),
    euAuthorship: text('Autor potvrzuje, že unijní argumentace byla argumentací aliance Cannabis is The Cure.', 'The creator confirms that the EU-law argument was developed by the Cannabis is The Cure alliance.'),
    boundary: text('Jde o autorem potvrzený alianční kontext, nikoli důvod obnovy ani soudní zjištění.', 'This is creator-confirmed alliance context, not a reopening ground or a judicial finding.')
  },
  courtPath,
  officialFindings,
  submittedClaims,
  overall: {
    priority: { trafficBand: 'red-3', score: 9, label: text('EXTRÉM — HOŘÍ: relevance k přezkumu obnovy', 'EXTREME — ON FIRE: relevance to reopening review') },
    conclusion: text('Dodané podklady vytvářejí dvě samostatné důkazní osy 9/9 pro přezkum obnovy v roce 2026. Semafor hodnotí jejich relevanci a neurčuje budoucí rozhodnutí soudu.', 'The supplied records create two separate 9/9 evidential lines for reopening review in 2026. The traffic light assesses their relevance and does not determine the court’s future decision.'),
    probability: null
  },
  relevance,
  legalSources: [
    { reference: 'IV. ÚS 1140/18', title: text('Ústavní soud, 9. 7. 2019', 'Constitutional Court, 9 July 2019'), url: 'https://nalus.usoud.cz/Search/GetText.aspx?sz=4-1140-18_1' },
    { reference: '§ 278 trestního řádu', title: text('Trestní řád — podmínky obnovy', 'Code of Criminal Procedure — conditions for reopening'), url: 'https://e-sbirka.gov.cz/sb/1961/141' },
    { reference: '3 Tz 82/2001', title: text('Pozdější právní názor není sám novou skutečností', 'A later legal view is not by itself a new fact'), url: 'https://sbirka.nsoud.cz/sbirka/4545/' },
    { reference: '7 Tz 1/80', title: text('Dříve provedený důkaz může mít nový obsah', 'Previously adduced evidence may have new content'), url: 'https://sbirka.nsoud.cz/sbirka/10924/' },
    { reference: 'C-663/18', title: text('Soudní dvůr EU, rozsudek z 19. 11. 2020', 'Court of Justice, judgment of 19 November 2020'), url: 'https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:62018CJ0663' }
  ],
  nextEvidence: [
    text('Původní trestní závěr spojit s absencí povolení a překročením limitu THC.', 'Connect the original criminal finding to the absence of permission and the exceeded THC threshold.'),
    text('Pozdější úřední důkazy o neexistenci a nesjednocení závazného postupu měření předložit jako novou samostatnou důkazní osu.', 'Present the later official evidence concerning the absence and lack of unification of a binding measurement procedure as a separate new evidential line.'),
    text('Odděleně vyložit zvláštní důvod podle § 278 odst. 4 a nepřekrývat jej s metodickou osou THC.', 'Explain the case-specific section 278(4) ground separately without merging it into the THC-methodology line.'),
    text('U obou os přesně popsat možný vliv na původní rozhodnutí a zachovat citace ke každému tvrzení.', 'For both lines, state the potential effect on the original decision precisely and retain a citation for every claim.')
  ],
  publicationBoundary: text(
    'Semafor měří relevanci a prioritu dalšího dokazování, nikoli vinu úředních osob ani šanci na úspěch. Výroky soudů, tvrzení podatelů, lékařské vyjádření, autorský alianční kontext a závěr systému zůstávají oddělené.',
    'The traffic light measures relevance and priority for further evidence work, not official misconduct or likelihood of success. Judicial findings, applicants’ allegations, the medical statement, creator-confirmed alliance context, and the system conclusion remain separate.'
  )
});

function localizeValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, 'cs') && Object.hasOwn(value, 'en')) return value[language];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]));
}

export function identifyMkJkReopeningDigest(digest) {
  return Object.entries(MK_JK_REOPENING_DIGESTS).find(([, value]) => value === digest)?.[0] ?? null;
}

export function localizeMkJkReopeningUpdate(language = 'cs') {
  return localizeValue(MK_JK_REOPENING_UPDATE, language === 'en' ? 'en' : 'cs');
}
