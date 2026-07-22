const text = (cs, en) => ({ cs, en });

// A compact, public-facing comparison. It deliberately describes evidence
// relevance and source status — never guilt or a predicted court outcome.
export const CASE_PORTFOLIO = Object.freeze({
  version: 'v2.7',
  testedAt: '2026-07-21',
  title: text(
    'Čtyři oddělené kauzy prověřují jednu společnou důkazní paměť',
    'Four separate cases test one shared evidence memory'
  ),
  introduction: text(
    'Jde o náročnou a přesně ohraničenou kontrolní sadu. Konopí není tématem služby: systém na těchto spisech ověřuje, zda umí oddělit osoby, procesní stavy, úřední výroky, tvrzení podatelů a společné důkazní kandidáty.',
    'This is a demanding, tightly bounded test set. Cannabis is not the service’s subject: these records test whether the system can separate people, procedural states, official statements, party allegations, and shared evidence candidates.'
  ),
  testHistory: [
    {
      period: text('Do podání přihlášky 20. 7. 2026', 'Up to submission on 20 July 2026'),
      statement: text(
        'Pracovní metoda a veřejný prototyp byly testovány na vlastních spisech autora.',
        'The working method and public prototype were tested on the creator’s own records.'
      )
    },
    {
      period: text('Po podání přihlášky, před uzávěrkou', 'After submission and before the deadline'),
      statement: text(
        'Stejná pravidla oddělení zdrojů, osob a závěrů byla použita na další spisy lidí z okruhu aliance Cannabis is The Cure, z.s., kterým autor a aliance pomáhají.',
        'The same source, person, and conclusion-separation rules were applied to additional records of people assisted by the creator and the Cannabis is The Cure alliance.'
      )
    }
  ],
  researchQuestion: {
    label: text('VÝCHOZÍ TEZE AUTORA A KONTROLNÍ OTÁZKA', 'CREATOR’S HYPOTHESIS AND REVIEW QUESTION'),
    motto: text(
      'Od roku 1999 by měly české soudy určovat trestní odpovědnost za pěstování konopí na základě obsahu THC. Do dnešního dne si soudy nikdy nevyžádaly právně závazné pravidlo policie a celní správy, které by ukazovalo, jak jejich forenzní laboratoře jednotně rozlišují legální konopí od nelegálního konopí. Žádné totiž neexistuje a rozdíly mohou být desetinásobné, což jsme doložili důkazy.',
      'Since 1999, Czech courts should have determined criminal liability for cannabis cultivation on the basis of THC content. To this day, the courts have never required a legally binding rule of the police and customs administration showing how their forensic laboratories consistently distinguish lawful cannabis from unlawful cannabis. No such rule exists, and the differences can be tenfold, as documented by the evidence assembled by the creator.'
    ),
    mottoContext: text(
      'Autor tuto doloženou tezi řízeného českého testu poměřuje ústavním pořádkem s čl. 36 a 39 Listiny, členstvím České republiky v EU od roku 2004 a zvláštní zákonnou chronologií: podle podkladů, za které odpovídá, nebyl do roku 1999 v žádném českém právním předpisu stanoven limit THC, zatímco zákon o návykových látkách od roku 1999 umožnil občanům pěstovat konopí na ploše do 100 m² bez povolení.',
      'The creator tests this documented Czech-case hypothesis against the constitutional order, including Articles 36 and 39 of the Charter, Czech EU membership since 2004, and a specific statutory chronology: according to the records for which he takes responsibility, no Czech legal rule stated a THC threshold until 1999, while the 1999 Act on Addictive Substances allowed citizens to grow cannabis on an area of up to 100 m² without a permit.'
    ),
    authorPosition: text(
      'Ústřední právní teze autora zní: od obnovení demokracie neměl být nikdo zbaven svobody pouze za nakládání s konopím, pokud stát v jeho konkrétní věci nedoložil právně určitý a zpětně přezkoumatelný postup, podle něhož rozlišil legální a nelegální konopí. Autor se ptá, zda jím shromážděné obecné veřejně ověřitelné důkazy mohou otevřít cestu k propuštění nebo obnově řízení.',
      'The creator’s central legal hypothesis is that, since democracy was restored, no person should have been deprived of liberty solely for handling cannabis unless the State demonstrated in that person’s case a legally certain and retrospectively reviewable procedure for distinguishing lawful from unlawful cannabis. He asks whether the generally applicable, publicly verifiable evidence he assembled can open a route to release or reopening.'
    ),
    controlledTestBaseline: text(
      'Autorem potvrzený společný základ řízeného testu: v těchto spisech nebyl poškozený člověk, odcizená věc ani podvod. Trestní odpovědnost byla vystavěna na chybějícím povolení, které stát nevydával, a na překročení limitu THC. Ve všech čtyřech kauzách bylo pro trestní posouzení rozhodující nadlimitní THC vytvořené laboratorním postupem policejního znalce zahrnujícím přeměnu THCA na THC. Žádný z dotčených soudů neposoudil tuto přeměnu ani přezkoumatelnost použitého postupu a nevyžádal právně závazný předpis ani úplnou laboratorní protokolaci požadovanou autorem s odkazem na forenzní požadavky EU, UNODC a ENFSI. Na tomto společném novém důkazu stojí relevance přezkumu obnovy u všech čtyř kauz: 9/9 — EXTRÉM, HOŘÍ.',
      'Creator-confirmed baseline for the controlled test: these files involved no injured person, stolen property, or fraud. Criminal liability was built on a missing permit that the State did not issue and on exceeding a THC threshold. In all four cases, the criminal assessment turned on above-limit THC produced by a police-expert laboratory procedure involving conversion of THCA into THC. None of the courts concerned assessed that conversion or the reviewability of the applied procedure, or required the legally binding rule and complete laboratory audit record sought by the creator by reference to EU, UNODC, and ENFSI forensic requirements. This shared new evidence is the basis for the reopening review relevance in all four cases: 9/9 — EXTREME, ON FIRE.'
    ),
    systemQuestion: text(
      'Jaké nové a materiálně významné procesní „okénko“ otevírá v každém konkrétním starém spise dříve neposouzená laboratorní přeměna THCA na THC, nedoložený jednotný postup a pozdější úřední důkazy?',
      'What new and materially significant procedural “window” do the previously unassessed laboratory conversion of THCA into THC, the absence of a documented unified procedure, and the later official evidence open in each particular older case file?'
    ),
    answerRule: text(
      'Systém odpovídá pro každého člověka zvlášť. Kontroluje původní rozhodnutí, novost a možný vliv důkazu i přesný procesní stav. Společný důkaz se nepřenáší automaticky a semafor sám nikoho nepropouští ani nezaručuje obnovu.',
      'The system answers separately for each person. It checks the original decision, evidential novelty and potential effect, and the exact procedural status. Shared evidence is never transferred automatically, and the traffic light neither releases anyone nor guarantees reopening.'
    )
  },
  boundary: text(
    'Společný nový důkaz k chybějícímu závaznému a jednotnému postupu měření THC má ve všech čtyřech kauzách relevanci 9/9 — EXTRÉM, HOŘÍ. Semafor není procento úspěchu, určení viny, závěr o nezákonnosti ani právní nárok na obnovu řízení.',
    'The shared new evidence concerning the missing binding and unified THC-measurement procedure has 9/9 relevance — EXTREME, ON FIRE — in all four cases. The traffic light is not a success percentage, a finding of guilt or unlawfulness, or a legal entitlement to reopening.'
  ),
  cases: [
    {
      id: 'dd',
      label: 'Mgr. Dušan Dvořák',
      visibility: text('veřejná referenční kauza se souhlasem autora', 'public reference case with the creator’s consent'),
      score: 9,
      trafficBand: 'red-3',
      sourceCount: text(
        '70 evidovaných rozhodnutí či úkonů, 6 zdrojově ověřených úředních výroků, 3 veřejné důkazní osy a navazující procesní strom roku 2026; přesný počet všech listin zatím není uzavřen.',
        '70 recorded decisions or acts, 6 source-verified official statements, 3 public evidence axes, and the linked 2026 procedural tree; the exact total document count is not yet closed.'
      ),
      status: text(
        'Aktivní procesní a důkazní větve; společný nový důkaz má pro přezkum prvních čtyř trestních řízení relevanci 9/9.',
        'Active procedural and evidential branches; the shared new evidence has 9/9 relevance to review of the first four criminal proceedings.'
      ),
      headline: text(
        '9/9 priorita porovnat pozdější úřední výroky o metodice s původními posudky v každém dotčeném řízení.',
        '9/9 priority to compare later official methodology statements with the original expert records in each affected proceeding.'
      ),
      mainCandidate: text(
        'Úřední odpovědi z let 2016 a 2025 a citovaný podklad z roku 2026 mohou být novým vstupem pro starší spisy; jejich novost a schopnost změnit původní skutkový závěr je nutné ověřit zvlášť v každé věci.',
        'Official responses from 2016 and 2025 and a record quoted in 2026 may be new inputs for older files; novelty and capacity to change the original factual finding must be tested separately in every matter.'
      ),
      article39: text(
        'Autor uplatňuje argument podle čl. 39 Listiny. Systém jej vede jako právní osu k ověření nad časově účinným zákonem, konkrétní skutkovou větou a použitým měřicím postupem, nikoli jako hotový závěr.',
        'The creator advances an argument under Article 39 of the Charter. The system keeps it as a legal line to verify against the law in force at the time, the exact statement of facts, and the measurement procedure—not as a settled conclusion.'
      ),
      eu: text(
        'Veřejná paměť dokládá uplatňování unijních námitek nejméně od roku 2012. Je nutné po rozhodnutích ověřit, co bylo konkrétnímu soudu navrženo a jak odpověděl; samotná nepoložená otázka neprokazuje porušení unijního práva.',
        'The public memory documents EU-law arguments from at least 2012. Each decision must be checked for what was actually requested from the court and how it responded; the absence of a reference does not by itself establish a breach of EU law.'
      ),
      link: '#case-study'
    },
    {
      id: 'lch',
      label: 'L. CH.',
      visibility: text('anonymizovaná neveřejná zdrojová kauza', 'anonymized case with private source records'),
      score: 9,
      trafficBand: 'red-3',
      sourceCount: text(
        '1 soukromý desetistránkový návrh na obnovu z roku 2022, 2 v něm citovaná soudní rozhodnutí a 3 samostatné odpovědi KPR z roku 2025.',
        '1 private ten-page motion to reopen from 2022, 2 judicial decisions cited in it, and 3 separate presidential-office responses from 2025.'
      ),
      status: text(
        'Starší návrh byl porovnán s pozdější důkazní pamětí; současný systém neurčuje procento úspěchu ani automatický důvod obnovy.',
        'The older motion was compared with later evidence memory; the system assigns neither a success percentage nor an automatic reopening ground.'
      ),
      headline: text(
        '9/9 relevance k přepracování: pozdější úřední výroky o metodice v návrhu z roku 2022 být nemohly.',
        '9/9 relevance for reworking: the later official methodology statements could not have appeared in the 2022 motion.'
      ),
      mainCandidate: text(
        'Prověřit novost a materiální dopad pozdějších úředních podkladů vůči původnímu posudku, devíti osobně přičítaným rostlinám a výpočtu hmotnosti.',
        'Test the novelty and material effect of the later official records against the original expert opinion, the nine plants personally attributed to L. CH., and the weight calculation.'
      ),
      article39: text(
        'Argument čl. 39 je nutné propojit s konkrétním znakem skutkové podstaty a skutkovým zjištěním; samotná pozdější právní argumentace není novým skutkovým důkazem.',
        'The Article 39 argument must be tied to a particular element of the offence and factual finding; later legal argument alone is not new factual evidence.'
      ),
      eu: text(
        'Oznamovací a předběžná otázka zůstávají samostatnou právní osou. Je třeba doložit přesný návrh soudu a jeho vypořádání, nikoli je vydávat za automatickou neplatnost zákona.',
        'Notification and preliminary-reference issues remain a separate legal line. The exact request to the court and its response must be documented, rather than presented as automatic invalidity of the statute.'
      ),
      link: '#prisoner-reopening-update'
    },
    {
      id: 'mk-jk',
      label: 'M. K. / J. K.',
      visibility: text('anonymizovaná vícezdrojová kauza', 'anonymized multi-source case'),
      score: 9,
      trafficBand: 'red-3',
      sourceCount: text(
        '17 přijatých souborů, 16 jedinečných po deduplikaci, a veřejné rozhodnutí IV. ÚS 1140/18.',
        '17 received files, 16 unique after deduplication, and the public decision IV. ÚS 1140/18.'
      ),
      status: text(
        'Dodané podklady byly analyzovány jako celek. Společný nový důkaz k postupu měření THC má pro přezkum obnovy relevanci 9/9; pravděpodobnost úspěchu se neurčuje.',
        'The supplied records were analysed as a whole. The shared new evidence concerning the THC-measurement procedure has 9/9 relevance to reopening review; no likelihood of success is assigned.'
      ),
      headline: text(
        '9/9 — HOŘÍ společný nový důkaz k měření THC i zvláštní cesta podle § 278 odst. 4.',
        '9/9 — ON FIRE for both the shared new THC-measurement evidence and the case-specific route under section 278(4).'
      ),
      mainCandidate: text(
        'Pozdější úřední důkazy k neexistenci a nesjednocení závazného postupu měření THC nebyly součástí původního rozhodování. Dodané podklady současně otevírají zvláštní osu podle § 278 odst. 4.',
        'Later official evidence concerning the absence and lack of unification of a binding THC-measurement procedure was not part of the original decision-making. The supplied records also open a separate line under section 278(4).'
      ),
      article39: text(
        'Metodický a zákonný argument lze použít jen po porovnání s původním chemickým důkazem a znakem skutkové podstaty; karta jej neoznačuje za prokázaný důvod obnovy.',
        'The methodology and legality argument can be used only after comparison with the original chemical evidence and the relevant element of the offence; this card does not call it an established reopening ground.'
      ),
      eu: text(
        'Pozdější věc C-663/18 není totožná s touto trestní věcí a sama není novým skutkovým důkazem. Rozhodující je přesný obsah dříve vznesené otázky a odpovědi soudu.',
        'The later case C-663/18 is not identical to this criminal matter and is not itself new factual evidence. What matters is the exact earlier question and the court’s response.'
      ),
      link: '#mk-jk-reopening-update'
    },
    {
      id: 'gf-jk',
      label: 'G. F. / J. K.',
      visibility: text('anonymizovaná procedurální kauza', 'anonymized procedural case'),
      score: 9,
      trafficBand: 'red-3',
      sourceCount: text(
        '6 věcných záznamů této osobní větve v balíku 18 souborů; celý balík představuje 15 věcných záznamů ve 4 oddělených větvích.',
        '6 substantive records in this personal branch within an 18-file set; the full set represents 15 substantive records across 4 separate branches.'
      ),
      status: text(
        'Dodané podklady uvádějí podmíněné zastavení trestního stíhání, které není odsouzením. Tento procesní stav zůstává oddělen od relevance společného důkazu 9/9.',
        'The supplied records report conditional discontinuance, which is not a conviction. That procedural status remains separate from the shared evidence’s 9/9 relevance.'
      ),
      headline: text(
        '9/9 — HOŘÍ společný nový důkaz k měření THC; samostatně je nutné zjistit konečný stav a správný procesní prostředek.',
        '9/9 — ON FIRE for the shared new THC-measurement evidence; the final status and correct procedural route must be established separately.'
      ),
      mainCandidate: text(
        'Listina KSZ 2 KZT 59/2025-62 přímo spojuje výsledek 3,7 % THC s konkrétním odborným vyjádřením a současně zaznamenává, že státní zástupkyně neměla předpisy OKTE. Ve spojení se společnými pozdějšími úředními důkazy jde o samostatnou osu relevance 9/9; k posouzení výsledku je nutné získat použitý SOP a úplný laboratorní řetězec.',
        'Record 2 KZT 59/2025-62 directly links the 3.7% THC result to a particular expert statement while recording that the public prosecutor did not possess the OKTE rules. Together with the shared later official evidence, this creates a separate 9/9 relevance line; assessing the result requires the applied SOP and complete laboratory chain.'
      ),
      article39: text(
        'Nejdříve je nutné znát konečné rozhodnutí a právní kvalifikaci. Teprve potom lze posoudit, zda a jak se argument čl. 39 vztahuje ke skutkovému zjištění.',
        'The final decision and legal classification must be known first. Only then can the application of Article 39 to the factual finding be assessed.'
      ),
      eu: text(
        'KSZ uvedlo, že státnímu zastupitelství nepřísluší předložit trestní věc SDEU. To samo nedokládá, zda příslušný soud dostal návrh předběžné otázky a jak o něm rozhodl.',
        'The public prosecutor’s office stated that it was not competent to refer the criminal case to the CJEU. This does not establish whether the competent court received a proposed question or how it decided it.'
      ),
      link: '#gf-jk-procedural-update'
    }
  ],
  sharedMethodology: {
    title: text(
      'Společná otázka: jaký přesný postup byl použit v konkrétním měření?',
      'Shared question: what exact procedure was used in the particular measurement?'
    ),
    explanation: text(
      'Paměť nespojuje kauzy podle stejného tématu, ale jen podle ověřitelného důkazního průniku. Každý starší posudek musí být porovnán s vlastním SOP, odběrem, homogenizací, chromatogramy a nejistotou měření.',
      'The memory links cases through verifiable evidential overlap, not merely a shared subject. Each older expert record must be compared with its own SOP, sampling, homogenisation, chromatograms, and measurement uncertainty.'
    ),
    shortArgument: text(
      'Proč svítí červená: o trestním výsledku rozhodovalo naměřené THC, přičemž laboratorní metoda mohla přeměnit THCA na THC. Ani v roce 2026 nebyl podle doloženého citovaného sdělení postup centrálně sjednocen — jednotlivá OKTE vytvářejí vlastní SOP a laboratoře samy řeší uvádění nejistoty. Není-li v konkrétním spise doložen právě použitý SOP, rozlišení THC/THCA a měřicí podklad, výsledek nelze plně zpětně zkontrolovat.',
      'Why the light is red: measured THC affected the criminal outcome, while the laboratory method may have converted THCA into THC. According to the documented quoted 2026 communication, the procedure still was not centrally unified—individual OKTE units create their own SOPs and laboratories decide how measurement uncertainty is reported. Unless the particular file identifies the SOP actually used, the THC/THCA distinction, and the measurement record, the result cannot be fully reviewed retrospectively.'
    ),
    auditTrailTitle: text('Úplná laboratorní protokolace požadovaná pro zpětnou kontrolu', 'Complete laboratory record required for retrospective review'),
    auditTrail: [
      text('právní základ, přesný použitý předpis a datovanou verzi SOP', 'legal basis, the exact rule applied, and the dated SOP version'),
      text('úplný řetězec převzetí, označení a předání vzorku', 'the complete chain of receipt, labelling, and custody'),
      text('protokol reprezentativního vzorkování a odběru včetně původu každé analyzované části', 'the representative sampling and collection record, including the origin of every analysed portion'),
      text('postup sušení, oddělení částí, mletí a homogenizace', 'the drying, separation, grinding, and homogenisation procedure'),
      text('oddělené původní hodnoty THC a THCA a výpočet či podmínky jejich přeměny', 'separate original THC and THCA values and the calculation or conditions of conversion'),
      text('přístroj, kalibraci, referenční materiály a původní chromatogramy', 'instrument, calibration, reference materials, and original chromatograms'),
      text('nejistotu měření, meze detekce a způsob zaokrouhlení výsledku', 'measurement uncertainty, detection limits, and the result-rounding method'),
      text('jméno odpovědného znalce, podpis, datum a úplnou revizní historii výstupu', 'the responsible expert’s name, signature, date, and complete output revision history')
    ],
    scientificSources: [
      {
        title: text('Tsujikawa et al. (2023) — účinnost dekarboxylace THCA podle metody UNODC', 'Tsujikawa et al. (2023) — THCA decarboxylation efficiency under the UNODC method'),
        url: 'https://pubmed.ncbi.nlm.nih.gov/36652066/',
        relevance: text('Primární studie potvrzuje, že zahřátí THCA na THC je používaný způsob stanovení celkového THC a že účinnost přeměny závisí na podmínkách.', 'The primary study confirms that heating THCA into THC is used to determine total THC and that conversion efficiency depends on the conditions.'),
        limitation: text('Studie sama nedokládá, jakou metodu použilo konkrétní české pracoviště.', 'The study does not establish which method a particular Czech laboratory used.')
      },
      {
        title: text('Brighenti et al. (2014) — oddělené stanovení THC a THCA metodou HPLC', 'Brighenti et al. (2014) — separate THC and THCA quantification by HPLC'),
        url: 'https://pubmed.ncbi.nlm.nih.gov/25005819/',
        relevance: text('Primární studie popisuje alternativní postup bez tepelné dekarboxylace, který měří THC a THCA odděleně a celkové THC teprve vypočítá.', 'The primary study describes an alternative without thermal decarboxylation, measuring THC and THCA separately before calculating total THC.'),
        limitation: text('Jde o odborné srovnání metod, nikoli právní závěr o českých rozsudcích.', 'This is a scientific method comparison, not a legal conclusion about Czech judgments.')
      }
    ],
    timeline: [
      {
        date: '2015',
        sourceStatus: text('tvrzení připsané úředním orgánům v pozdějším podání; původní listiny zde nejsou', 'statement attributed to public bodies in a later submission; the originals are not present here'),
        source: text('NSZ 1 NZO 84/2015-14; Nejvyšší soud 11 Tdo 181/2015; ministr vnitra Milan Chovanec, MV-106071-1/KM-2015', 'Supreme Public Prosecutor’s Office 1 NZO 84/2015-14; Supreme Court 11 Tdo 181/2015; Interior Minister Milan Chovanec, MV-106071-1/KM-2015'),
        statement: text('Pozdější podání těmto zdrojům připisuje tvrzení o existujícím metodickém standardu.', 'A later submission attributes to these sources a statement that a methodological standard existed.'),
        limitation: text('Bez originálů se nepoužívá jako ověřený citát ani hotový rozpor.', 'Without the originals, this is not used as a verified quotation or a settled contradiction.')
      },
      {
        date: '2016-04-21',
        sourceStatus: text('přímo ověřená úřední listina', 'directly verified official record'),
        source: text('předseda Nejvyššího soudu prof. JUDr. Pavel Šámal, Ph.D. · Zin 38/2016', 'President of the Supreme Court Prof. JUDr. Pavel Šámal, Ph.D. · Zin 38/2016'),
        statement: text('Nejvyšší soud podle listiny dosud v judikatuře neřešil vážení rostlin a měření THC a kolegium ani plénum nepřijaly stanovisko.', 'According to the record, Supreme Court case law had not addressed plant weighing and THC measurement, and neither the criminal division nor the plenary had adopted a position.'),
        citation: 'Nejvyšší soud dosud problematiku vážení rostlin konopí a způsobu měření THC v něm obsaženém v judikatuře neřešil.',
        limitation: text('Nevylučuje existenci odborného laboratorního postupu.', 'It does not exclude the existence of a professional laboratory procedure.')
      },
      {
        date: '2025-05-06',
        sourceStatus: text('přímo ověřená úřední listina', 'directly verified official record'),
        source: 'Policejní prezidium ČR · PPR-21028-11/ČJ-2025-990810',
        statement: text('Policie uvedla, že v letech 2004–2021 nevydala vlastní metodiku a rozkaz č. 54/2021 označila za první metodiku vyjmenovaného komplexního rozsahu.', 'Police stated that it had issued no methodology of its own in 2004–2021 and described Order 54/2021 as the first methodology of the specified comprehensive scope.'),
        citation: 'Policie České republiky nevydala v časovém rozmezí od 1. května 2004 do 11. listopadu 2021 žádnou metodiku k určování obsahu THC v rostlinách konopí.',
        limitation: text('Nevylučuje používání jiných odborných postupů a sama nedokládá vadu konkrétního posudku.', 'It does not exclude other professional procedures and does not itself establish a defect in a particular expert record.')
      },
      {
        date: '2025-02-27',
        sourceStatus: text('přímo ověřená úřední listina pro větev G. F. / J. K.', 'directly verified official record for the G. F. / J. K. branch'),
        source: text('Krajské státní zastupitelství v Ostravě · 2 KZT 59/2025-62', 'Ostrava Regional Public Prosecutor’s Office · 2 KZT 59/2025-62'),
        statement: text('Listina zaznamenává, že státní zástupkyně neměla předpisy, podle nichž OKTE při zkoumání konopí postupuje.', 'The record states that the public prosecutor did not possess the rules followed by OKTE when examining cannabis.'),
        citation: 'nedisponuje předpisy, kterými se tato pracoviště řídí při odborném zkoumání rostlin konopí',
        limitation: text('Nedostupnost předpisu státní zástupkyni není totožná s neexistencí postupu ani s vadou výsledku.', 'A public prosecutor not possessing the rules is not the same as no procedure existing or the result being defective.')
      },
      {
        date: '2026-06-25',
        sourceStatus: text('úřední výrok citovaný v podání; zdrojová pasáž čeká na samostatné zveřejnění', 'official statement quoted in a submission; the source passage awaits separate publication'),
        source: 'Kriminalistický ústav · KU-4139-5/ČJ-2026-2305KM',
        statement: text('Podání uvádí, že stanoviska KÚ jsou pro OKTE doporučující, pracoviště vytvářejí vlastní SOP a uvádění nejistoty je ponecháno laboratořím.', 'The submission states that KÚ guidance is advisory for OKTE, individual units create their own SOPs, and reporting uncertainty is left to laboratories.'),
        limitation: text('Dokud není ověřena původní pasáž, jde o přesně označený citovaný vstup, nikoli přímý veřejný důkaz.', 'Until the original passage is verified, this remains a precisely labelled quoted input rather than direct public evidence.')
      }
    ]
  },
  legalSources: [
    {
      reference: text('čl. 39 Listiny základních práv a svobod', 'Article 39 of the Czech Charter of Fundamental Rights and Freedoms'),
      url: 'https://e-sbirka.gov.cz/sb/1993/2',
      boundary: text('Právní kontrolní rámec; jeho použití v konkrétní věci musí posoudit soud nebo právník nad úplným spisem.', 'Legal review framework; its application in a particular case requires a court or lawyer to review the complete file.')
    },
    {
      reference: text('čl. 267 Smlouvy o fungování EU', 'Article 267 of the Treaty on the Functioning of the EU'),
      url: 'https://eur-lex.europa.eu/eli/treaty/tfeu_2016/art_267/oj',
      boundary: text('Předběžnou otázku předkládá soud za podmínek článku; systém musí doložit návrh, příslušnost a reakci soudu.', 'A court makes a preliminary reference under the conditions in the Article; the system must document the request, competence, and the court’s response.')
    },
    {
      reference: text('§§ 277–278 trestního řádu', 'Sections 277–278 of the Code of Criminal Procedure'),
      url: 'https://e-sbirka.gov.cz/sb/1961/141',
      boundary: text('Novost a možný vliv důkazu se hodnotí vždy proti původnímu pravomocnému rozhodnutí a úplnému spisu.', 'Novelty and potential effect are assessed against the original final decision and complete record.')
    }
  ]
});

function localizeValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, 'cs') && Object.hasOwn(value, 'en')) return value[language];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]));
}

export function localizeCasePortfolio(language = 'cs') {
  return localizeValue(CASE_PORTFOLIO, language === 'en' ? 'en' : 'cs');
}
