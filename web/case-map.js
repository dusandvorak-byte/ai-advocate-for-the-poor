const text = (cs, en) => ({ cs, en });

export const INSTITUTIONAL_CASE_MAP = {
  title: text(
    'Anonymizovaná institucionální mapa evropského případu 2004–2026',
    'Anonymized institutional map of a European case, 2004–2026'
  ),
  notice: text(
    'Mapa je pracovním indexem tvrzení a řízení z projektové paměti. Nejde o rozhodnutí o vině, nezákonnosti ani důvodnosti nároků. Údaje označené „tvrzení autora“ vyžadují před právním použitím připojení anonymizovaného prvotního pramene.',
    'This map is a working index of claims and proceedings from the project memory. It is not a determination of guilt, unlawfulness, or entitlement. Items marked “creator-stated” require an anonymized primary source before legal use.'
  ),
  groups: [
    {
      id: 'core',
      label: text('Výzkum a nositelé projektu', 'Research and project entities'),
      nodes: [
        { id: 'lead', label: text('Mgr. Dušan Dvořák', 'Mgr. Dušan Dvořák'), detail: text('autor AI Advocate for the Poor a vedoucí programu Konopí je lék', 'creator of AI Advocate for the Poor and lead of the Cannabis is The Cure research program') },
        { id: 'program', label: text('Program Konopí je lék', 'Cannabis is The Cure program'), detail: text('právní, přírodovědný, zdravotní a ekonomický výzkum; počátek institucionální chronologie v roce 2004', 'legal, scientific, health, and economic research; institutional chronology begins in 2004') },
        { id: 'alliance', label: text('Cannabis is The Cure, z. s.', 'Cannabis is The Cure, z. s.'), detail: text('veřejný nositel projektu a propojení odborné a občanské pomoci', 'public project entity connecting research and civil assistance') },
        { id: 'clinic', label: text('Educational Cannabis Clinic, z. s.', 'Educational Cannabis Clinic, z. s.'), detail: text('odborné a vzdělávací zázemí programu', 'professional and educational base of the program') }
      ]
    },
    {
      id: 'president',
      label: text('Prezident republiky', 'President of the Czech Republic'),
      nodes: [
        { id: 'president-office', label: text('Prezident a Kancelář prezidenta republiky', 'President and Office of the President'), detail: text('podání požadující milost, amnestii, abolici a rehabilitaci s odkazem na ochranu života, zdraví, rodiny a majetku; naléhavost pěstebního roku 2026', 'petition seeking clemency, amnesty, abolition of prosecution, and rehabilitation with reference to the protection of life, health, family, and property; urgency of the 2026 cultivation season') }
      ]
    },
    {
      id: 'courts',
      label: text('Soudy', 'Courts'),
      nodes: [
        { id: 'district-court', label: text('Okresní soud v Prostějově', 'Prostějov District Court'), detail: text('čtyři anonymizované větve obnovy řízení; návrh přerušení a předběžných otázek SDEU', 'four anonymized reopening branches; request for a stay and preliminary questions to the CJEU') },
        { id: 'regional-high-courts', label: text('Krajské a vrchní soudy', 'Regional and High Courts'), detail: text('odvolací, stížnostní a navazující přezkumné větve v Praze, Brně, Olomouci a Ostravě', 'appeal, complaint, and review branches in Prague, Brno, Olomouc, and Ostrava') },
        { id: 'municipal-court', label: text('Městský soud v Praze', 'Municipal Court in Prague'), detail: text('zásahové a správní žaloby na nečinnost či postup policie, ministerstev a dalších orgánů v roce 2026', '2026 intervention and administrative actions concerning police, ministries, and other authorities') },
        { id: 'supreme-court', label: text('Nejvyšší soud', 'Supreme Court'), detail: text('dovolací a související trestní větve evidované v projektové paměti', 'appeal-on-points-of-law and related criminal branches indexed in project memory') },
        { id: 'constitutional-court', label: text('Ústavní soud', 'Constitutional Court'), detail: text('ústavní stížnosti a ochrana základních práv', 'constitutional complaints and fundamental-rights protection') }
      ]
    },
    {
      id: 'prosecutors',
      label: text('Státní zastupitelství', 'Public prosecution service'),
      nodes: [
        { id: 'supreme-prosecutor', label: text('Nejvyšší státní zastupitelství', 'Supreme Public Prosecutor’s Office'), detail: text('dlouhodobá dohledová a přezkumná větev; evidence podnětů, stížností a spisů NZN', 'long-running supervision and review branch; index of submissions, complaints, and NZN files') },
        { id: 'high-prosecutors', label: text('Vrchní státní zastupitelství Praha a Olomouc', 'High Public Prosecutors’ Offices in Prague and Olomouc'), detail: text('dohledové a přezkumné větve', 'supervision and review branches') },
        { id: 'regional-prosecutors', label: text('Krajská státní zastupitelství', 'Regional Public Prosecutors’ Offices'), detail: text('Brno, Ostrava a další anonymizované přezkumné větve', 'Brno, Ostrava, and other anonymized review branches') },
        { id: 'district-prosecutors', label: text('Okresní státní zastupitelství', 'District Public Prosecutors’ Offices'), detail: text('Prostějov a Frýdek-Místek; vyhodnocení podání a případných opatření', 'Prostějov and Frýdek-Místek; evaluation of submissions and possible measures') }
      ]
    },
    {
      id: 'executive',
      label: text('Ministerstva, policie a forenzní orgány', 'Ministries, police, and forensic bodies'),
      nodes: [
        { id: 'health-ministry', label: text('Ministerstvo zdravotnictví', 'Ministry of Health'), detail: text('žádosti o povolení výzkumu a léčivých odrůd od roku 2004', 'applications for research and medicinal-cultivar authorization since 2004') },
        { id: 'justice-ministry', label: text('Ministerstvo spravedlnosti', 'Ministry of Justice'), detail: text('stížnosti, žádosti o přezkum, odškodnění a soudní přezkum nečinnosti', 'complaints, review requests, compensation, and judicial review of inaction') },
        { id: 'interior-ministry', label: text('Ministerstvo vnitra', 'Ministry of the Interior'), detail: text('dohled nad policejními a kriminalistickými orgány', 'oversight of police and forensic bodies') },
        { id: 'police', label: text('Policejní prezidium, NCOZ a krajská policie', 'Police Presidium, NCOZ, and regional police'), detail: text('zásahy, vyšetřování, nečinnost a institucionální odpovědnost', 'interventions, investigations, inaction, and institutional responsibility') },
        { id: 'forensics', label: text('Kriminalistický ústav a OKTE', 'Institute of Criminalistics and OKTE'), detail: text('odběr vzorků, měření THC, metodika a odborná správnost', 'sampling, THC measurements, methodology, and scientific validity') }
      ]
    },
    {
      id: 'europe',
      label: text('Evropská ochrana', 'European protection'),
      nodes: [
        { id: 'cjeu', label: text('Soudní dvůr Evropské unie', 'Court of Justice of the European Union'), detail: text('navrhované předběžné otázky k unijnímu právu', 'proposed preliminary questions on EU law') },
        { id: 'commission', label: text('Evropská komise', 'European Commission'), detail: text('podněty a unijní kontrolní větev', 'complaints and EU oversight branch') },
        { id: 'ecthr', label: text('Evropský soud pro lidská práva', 'European Court of Human Rights'), detail: text('stížnosti týkající se spravedlivého procesu, soukromí, zdraví, rodiny a majetku', 'applications concerning fair trial, privacy, health, family, and property') },
        { id: 'government-agent', label: text('Kancelář vládního zmocněnce pro ESLP', 'Office of the Government Agent before the ECtHR'), detail: text('zastupování státu a návaznost judikatury ESLP', 'state representation and ECtHR case-law follow-up') }
      ]
    },
    {
      id: 'remedies',
      label: text('Náprava, veřejná kontrola a dopad', 'Remedy, public oversight, and impact'),
      nodes: [
        { id: 'compensation', label: text('Náhrada škody a nemajetkové újmy', 'Compensation for damage and non-pecuniary harm'), detail: text('ztráta příjmu, zdraví, rodinné dopady a náklady dlouhodobého řízení — anonymizováno', 'lost income, health, family impact, and costs of long proceedings — anonymized') },
        { id: 'media-oversight', label: text('Česká televize, Rada ČT a ÚOOÚ', 'Czech Television, its Council, and the DPA'), detail: text('veřejné informace, oprava, ochrana osobních údajů a civilní přezkum', 'public information, correction, data protection, and civil review') },
        { id: 'cultivation-2026', label: text('Pěstební rok 2026', '2026 cultivation season'), detail: text('časová naléhavost prevence dalších zásahů a ochrany výzkumu', 'time-critical prevention of further interventions and protection of research') }
      ]
    }
  ],
  relations: [
    { from: 'lead', to: 'program', label: text('vede výzkumný program', 'leads the research program') },
    { from: 'program', to: 'alliance', label: text('institucionální a občanská základna', 'institutional and civil base') },
    { from: 'program', to: 'clinic', label: text('odborná a vzdělávací základna', 'professional and educational base') },
    { from: 'program', to: 'health-ministry', label: text('žádosti o povolení od roku 2004', 'authorization applications since 2004') },
    { from: 'program', to: 'forensics', label: text('spor o vzorkování a měření THC', 'dispute over sampling and THC measurement') },
    { from: 'forensics', to: 'police', label: text('odborné podklady pro zásahy a trestní řízení', 'forensic basis for interventions and criminal proceedings') },
    { from: 'police', to: 'district-prosecutors', label: text('dozor a přezkum postupu', 'supervision and review of police conduct') },
    { from: 'regional-prosecutors', to: 'district-prosecutors', label: text('procesní postoupení k vyhodnocení; není potvrzením pochybení', 'procedural referral for evaluation; not confirmation of wrongdoing') },
    { from: 'supreme-prosecutor', to: 'high-prosecutors', label: text('dohledová soustava', 'supervision hierarchy') },
    { from: 'high-prosecutors', to: 'regional-prosecutors', label: text('dohled a přezkum', 'supervision and review') },
    { from: 'district-prosecutors', to: 'district-court', label: text('trestní a obnovovací větve', 'criminal and reopening branches') },
    { from: 'district-court', to: 'regional-high-courts', label: text('opravné prostředky', 'appeals and remedies') },
    { from: 'regional-high-courts', to: 'supreme-court', label: text('dovolací větev', 'appeal-on-points-of-law branch') },
    { from: 'supreme-court', to: 'constitutional-court', label: text('ústavní ochrana po vyčerpání prostředků', 'constitutional protection after exhaustion of remedies') },
    { from: 'district-court', to: 'cjeu', label: text('návrh předběžných otázek', 'request for preliminary rulings') },
    { from: 'constitutional-court', to: 'ecthr', label: text('mezinárodní ochrana po vnitrostátním řízení', 'international protection after domestic proceedings') },
    { from: 'commission', to: 'cjeu', label: text('unijní kontrolní a interpretační větev', 'EU oversight and interpretation branch') },
    { from: 'ecthr', to: 'government-agent', label: text('zastupování státu v řízeních', 'state representation in proceedings') },
    { from: 'police', to: 'municipal-court', label: text('zásahová žaloba na postup či nečinnost', 'intervention action concerning conduct or inaction') },
    { from: 'justice-ministry', to: 'municipal-court', label: text('správní a zásahový přezkum', 'administrative and intervention review') },
    { from: 'interior-ministry', to: 'police', label: text('dohledová odpovědnost', 'oversight responsibility') },
    { from: 'interior-ministry', to: 'forensics', label: text('dohled nad metodikou a stížnostmi', 'oversight of methodology and complaints') },
    { from: 'program', to: 'president-office', label: text('žádost o milost, amnestii, abolici a rehabilitaci', 'request for clemency, amnesty, abolition, and rehabilitation') },
    { from: 'president-office', to: 'justice-ministry', label: text('součinnost a podklady pro prezidentské rozhodování', 'coordination and materials for presidential decision-making') },
    { from: 'justice-ministry', to: 'compensation', label: text('předběžné uplatnění nároku a odškodnění', 'preliminary compensation claim') },
    { from: 'media-oversight', to: 'municipal-court', label: text('civilní a správní ochrana', 'civil and administrative protection') },
    { from: 'cultivation-2026', to: 'president-office', label: text('extrémní časová naléhavost', 'extreme time urgency') },
    { from: 'cultivation-2026', to: 'police', label: text('prevence dalších zásahů', 'prevention of further interventions') }
  ],
  metrics: [
    { value: '2004–2026', label: text('institucionální chronologie', 'institutional chronology'), status: 'indexed' },
    { value: '4', label: text('anonymizované větve obnovy řízení', 'anonymized reopening branches'), status: 'indexed' },
    { value: '>100', label: text('spisů NZN uváděných u NSZ', 'NZN files stated for the Supreme Prosecutor'), status: 'indexed' },
    { value: '>25', label: text('stížností a dohledových podnětů', 'complaints and supervision submissions'), status: 'indexed' },
    { value: '22', label: text('řízení u Ústavního soudu', 'Constitutional Court proceedings'), status: 'creator-stated' },
    { value: '10', label: text('řízení u Nejvyššího soudu', 'Supreme Court proceedings'), status: 'creator-stated' },
    { value: '10', label: text('řízení u ESLP', 'ECtHR proceedings'), status: 'creator-stated' },
    { value: '3', label: text('podněty Evropské komisi', 'European Commission complaints'), status: 'creator-stated' },
    { value: '77 let', label: text('součet horních sazeb navrhovaných trestů', 'aggregate upper ranges of proposed sentences'), status: 'creator-stated' }
  ],
  timeline: [
    { year: '2004', label: text('První žádost Ministerstvu zdravotnictví o povolení výzkumu.', 'First Ministry of Health research-authorization application.') },
    { year: '2010', label: text('Počátek hlavních trestních, znaleckých a důkazních větví.', 'Start of the principal criminal, forensic, and evidentiary branches.') },
    { year: '2012 a 2016', label: text('Neúspěšné pokusy o omezení svéprávnosti — tvrzení autora k doložení anonymizovanými prameny.', 'Unsuccessful attempts to restrict legal capacity — creator-stated, pending anonymized sources.') },
    { year: '2019', label: text('Vazba a následný výkon souhrnného trestu 80 měsíců — tvrzení autora k doložení anonymizovanými prameny.', 'Remand and subsequent aggregate 80-month sentence — creator-stated, pending anonymized sources.') },
    { year: '2025', label: text('Novela trestního zákoníku a změny metodických předpisů otevírají nové přezkumné otázky.', 'Criminal-code amendment and methodology changes open new review questions.') },
    { year: '2026', label: text('Obnovy řízení, zásahové žaloby, prezidentská větev, odškodnění a naléhavost pěstebního roku.', 'Reopening motions, intervention actions, presidential branch, compensation, and cultivation-season urgency.') }
  ]
};

export function localizeInstitutionalCaseMap(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const localize = (value) => value?.[lang] ?? value;
  return {
    title: localize(INSTITUTIONAL_CASE_MAP.title),
    notice: localize(INSTITUTIONAL_CASE_MAP.notice),
    groups: INSTITUTIONAL_CASE_MAP.groups.map((group) => ({
      ...group,
      label: localize(group.label),
      nodes: group.nodes.map((node) => ({ ...node, label: localize(node.label), detail: localize(node.detail) }))
    })),
    relations: INSTITUTIONAL_CASE_MAP.relations.map((relation) => ({ ...relation, label: localize(relation.label) })),
    metrics: INSTITUTIONAL_CASE_MAP.metrics.map((metric) => ({ ...metric, label: localize(metric.label) })),
    timeline: INSTITUTIONAL_CASE_MAP.timeline.map((event) => ({ ...event, label: localize(event.label) }))
  };
}
