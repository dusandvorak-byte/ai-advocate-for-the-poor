# AI Advocate for the Poor

**Autor a vedoucí projektu: Mgr. Dušan Dvořák**

## Poslání

**AI Advocate for the Poor pomáhá chudým a zdravotně postiženým lidem proměnit nepřehledný životní a právní problém v ověřitelný případ: uspořádá podklady, zachová souvislosti, nalezne důležitou větev a připraví návrh dalšího kroku ke kontrole člověkem.**

Současná veřejná verze je určena každému v České republice, kdo čelí nebo čelil právní kolizi ve věci konopí a chce připravit podklad k návrhu na obnovu řízení, zásahové žalobě, náhradě škody či nemajetkové újmy nebo jinému navazujícímu kroku. Projekt buduje co nejrozsáhlejší průběžně ověřovanou paměť důkazů a judikatury a propojuje důkazy, fakta, přesné výroky, čísla jednací, spisové značky a judikaturu. **Nezaručuje úspěch, nezakládá právní nárok a nenahrazuje právníka.**

Člověk může přijít se stovkami nebo tisíci prvků: listinami, událostmi, osobami, institucemi, tvrzeními, důkazy, rozpory a lhůtami. Může mít oprávněný nárok i dostatek důkazů, ale kvůli chudobě, zdravotnímu postižení, bolesti, vyčerpání nebo složitosti systému nemusí být schopen svůj případ uspořádat a prosadit.

AI Advocate má tuto informační a kapacitní nevýhodu kompenzovat. Zamýšlený model převádí roztříštěné podklady na strukturu:

```text
nezpracované prvky
→ osoby, instituce, události a řízení
→ vztahy a tematické či procesní větve
→ tvrzení, důkazy, rozpory a mezery
→ stav zvolené větve
→ vhodný další krok
→ návrh podání nebo jiného jednání ke kontrole člověkem
```

Nejde o nahrazení advokáta ani o automatické rozhodování o právech. Cílem je dostat znevýhodněného člověka do stavu, kdy mu advokát, poradna, ombudsman nebo úřad mohou skutečně pomoci. Projekt mu má dát paměť, strukturu a schopnost jednat, které jsou jinak dostupné především institucím a lidem s dostatkem prostředků.

## Přidaná hodnota modelu

- vytváří dlouhodobou paměť případu místo jednorázového shrnutí;
- třídí velké množství různorodých prvků do věcných a procesních větví;
- propojuje osoby, instituce, spisy, události, tvrzení a důkazy;
- sleduje, kdo co věděl, z jakého zdroje a od jakého okamžiku;
- rozlišuje ověřené skutečnosti, tvrzení, právní interpretaci a nejistotu;
- ke každému závěru uchovává dohledatelnou citaci;
- nachází rozpory, chybějící dokumenty, nevyřízené otázky a lhůty;
- v uživatelem zvolené větvi shromáždí relevantní podklady;
- z podkladů připraví návrh podání nebo dalšího kroku pro lidskou kontrolu;
- usnadňuje bezpečné převzetí případu právníkem nebo neziskovou poradnou.

## Kontinuita od roku 1994

Projekt navazuje na třicetiletou linii praktických integračních projektů vedených Dušanem Dvořákem: od budování olomouckého P-centra v roce 1994 přes dobrovolnické internetové poradenství a otevřenou bezbariérovou školu pro dospělé Ateliér ALF až po vznik dlouhodobé odborné a dokumentární paměti programu Konopí je lék. AI Advocate převádí stejný princip do nové technologické generace: místo aby člověk předával odborníkovi neuspořádanou hromadu podkladů, předá mu auditovatelnou mapu případu.

Oficiální seznam Ministerstva obrany uvádí Dušana Dvořáka mezi držiteli osvědčení účastníka odboje a odporu proti komunismu. Dobová zpráva z února 2021, opřená o vyjádření ministerstva, zaznamenává, že osvědčení obdržel během výkonu trestu ve věznici. Projekt tento údaj uvádí jako doložený životopisný kontext, nikoli jako argument o správnosti pozdějších právních tvrzení.

Podrobnější česko-anglický zakladatelský příběh a rozlišení doložených údajů od produktové vize obsahují soutěžní podklady [SUBMISSION.cs.md](SUBMISSION.cs.md) a [SUBMISSION.md](SUBMISSION.md).

## Současný stav: bezpečný demonstrační prototyp

Veřejná aplikace zatím **není univerzální právní AI a neposkytuje právní radu**. První připravenou analýzu demonstruje na anonymizované ukázce sdělení Krajského státního zastupitelství v Ostravě ze dne 8. července 2026. Druhý podporovaný vstup přijímá přesnou verzi soudního PDF o změně v dozorčí radě, ověří ji lokálně digitálním otiskem a zobrazí pouze anonymizovaný výstup. Třetí podporovaný vstup zpracuje přesnou verzi policejního sdělení ze dne 20. července 2026. Čtvrtý přesný otisk rozpozná soukromý návrh na obnovu L. CH. z roku 2022 a zobrazí pouze anonymizované porovnání s pamětí k 20. červenci 2026; zdrojové PDF, osobní údaje a identifikátory trestní věci se nezveřejňují. Každý jiný čitelný PDF, TXT, Markdown nebo vložený text dostane oddělenou deterministickou místní orientaci, nikdy připravený právní závěr. Vedle toho aplikace obsahuje veřejnou kazuistiku „živé paměti“ zveřejněnou se souhlasem autora; ta je porovnávacím registrem, nikoli automatickou právní analýzou libovolného dokumentu.

### Živý vývoj po odeslání přihlášky — od 20. července 2026

Veřejný vývoj je od této chvíle rozdělen do tří jasně označených vrstev:

- **V0 — vstupní data od 20. dubna 2026:** podání, rozhodnutí a procesní vazby vzniklé před znalostí soutěže a před návrhem dnešní podoby systému; nejde o starší web, ale o původní datovou a důkazní vrstvu;
- **V1 — soutěžní stav dne 20. července 2026:** neměnný snímek webu v okamžiku podání přihlášky;
- **V2 — živý vývoj od 20. července 2026:** každá další zkontrolovaná listina dostane datovaný záznam a ukáže, které uzly, větve, priority a případné doložené lhůty změnila.

Titulní obrazovka V2 rozlišuje pět aktuálně veřejně propojených důkazních PDF, osm zkontrolovaných neveřejných zdrojových PDF a dosud neuzavřený celkový inventář listin. Zobrazuje 70 evidovaných rozhodnutí a úkonů, čtyři aktivní soudní větve, devět událostí vyřizování od 20. dubna 2026 a čtyři doložené ukončené exekuční větve. Tři exekuce byly zastaveny; ve čtvrté zaniklo pověření exekutora po úplném vymožení. Přesný počet aktivních správních řízení zůstává viditelně neurčený, dokud jej nebude možné odvodit listinu po listině; systém jej neodhaduje z počtu institucí nebo spisových značek.

V2 používá devít stupňů relevance: tři červené, tři oranžové a tři zelené. Nejvyšší červená **EXTRÉM — HOŘÍ** znamená extrémně důležité vztahy a bezodkladnou potřebu lidské reakce. Barva sama nikdy nevytváří právní lhůtu: lhůta se zobrazí jen tehdy, když ji stanoví posuzovaná listina nebo jiný ověřený pramen. U každého dalšího uživatele se semafor vztahuje k jeho konkrétní kauze, vazbám a relevanci, nikoli automaticky k této kazuistice.

Odeslaná soutěžní verze je zachována nejen v historii repozitáře, ale také jako samostatně otevřitelný veřejný archiv ve `web/archive/submission-2026-07-20/`. Archiv obsahuje přesnou webovou složku z commitu `2238ae2736a6e13c2c93ecf06288a9f06604903f` a kontrolní manifest s digitálními otisky hlavních souborů. Hlavní česká i anglická adresa naproti tomu ukazují živý vývoj po podání.

Následná vývojová verze v2.1 přidává třetí přesně podporovaný vstup: jednostránkové policejní sdělení ze dne 20. července 2026. Soukromý originál se nepublikuje. Prohlížeč rozpozná přesným SHA-256 otiskem originál i samostatnou veřejnou odvozenou kopii. Ta zachovává jméno Dušana Dvořáka, ale odstraňuje jeho adresu, jméno podepisující úřední osoby, podpisová data a nepotřebné interní identifikátory. Výstup okamžitě zobrazí stav paměti před/po, výrazný systémový závěr s omezením jeho důkazní povahy, citované skutečnosti, meze listiny, devět červených vazeb a návrh řešení ke kontrole člověkem. Tři vazby jsou označeny jako **EXTRÉM — HOŘÍ**, čtyři jako **HODNĚ VAROVNÁ** a dvě jako **VAROVNÁ**. Při vložení více přesně podporovaných PDF vznikne prioritní fronta seřazená podle nejvyššího dosaženého stupně, počtu červených a oranžových vazeb, jejich souhrnné váhy a data. V tehdejší v2.1 se pozměněný nebo jiný PDF odmítal; od v2.4 nedostane připravený výklad, ale je-li čitelný, přejde do bezpečné obecné orientace.

Aktualizace v2.2 zapisuje do živé paměti stav **Výroční zprávy aliance Cannabis is The Cure za rok 2025**: podle autorem potvrzeného záznamu byla schválena na svátek Bastily dne 14. července 2026 a po grafických úpravách bude zveřejněna na webu [Konopí je lék.cz](https://www.konopijelek.cz/). Samotná výroční zpráva se nyní nezveřejňuje ani nepřikládá.

V2.2 dále z pěti zkontrolovaných, ale nezveřejněných zdrojových PDF ukazuje pouze kontrolovatelná metadata a význam: rejstříkovou vazbu aliance, tři zastavené exekuce a rozsudek Okresního soudu v Prostějově. U Art Language uvádí zaokrouhleně přibližně 3,3 mil. Kč z přesného zůstatku 3 318 807,15 Kč; u plzeňské větve přibližně 200 tis. Kč s uvedením přesné listinné částky 230 615,37 Kč; u liberecké větve přibližně 200 tis. Kč jako orientační údaj autora, protože rozhodnutí samo uvádí jen jistinu 83 020,64 Kč s příslušenstvím. Rozsudek č. j. 14 C 89/2018-606 je formulován úzce: v konkrétní smluvní větvi zamítl žalobu na 28 654 Kč, protože nebylo prokázáno uzavření smlouvy s označeným spolkem; nejde o obecný soudní výrok o veškerých tvrzených škodách. Autorovo označení exekuční větve za „státní teror“ je zobrazeno odděleně jako jeho hodnocení, nikoli jako závěr rozhodnutí.

Aktualizace v2.3 zpracovává další tři vložené soubory. Policejní PDF má totožný SHA-256 otisk jako originál již evidovaný ve v2.1, proto nevytváří další dokument, událost, červenou vazbu ani lhůtu. Liberecké vyrozumění č. j. 131 EX 8674/15-119 uvádí k 8. červenci 2025 přesně 192 752,91 Kč a současně 21 555,87 Kč již vymožených či uhrazených; nejde však o přesný zůstatek ke dni zastavení 22. června 2026. Potvrzení č. j. 134 EX 20124/14-066 přidává větev Generali: Mgr. Ing. Jiří Prošek dne 27. února 2015 potvrdil úplné vymožení pohledávky, příslušenství a nákladů a zánik svého pověření. Číselnou částku tato listina neuvádí, proto ji systém nedopočítává. Shodné IČ 22680101 propojuje tehdejší označení Ateliér ALF, o.s., se současným rejstříkovým názvem Edukativní konopná klinika, z.s.; úplnou posloupnost změn názvu však tyto dvě listiny samy nedokládají.

Funkční sestavení v2.4 přidává bezpečnou vstupní bránu pro návštěvníka zvenčí. Čitelný PDF s textovou vrstvou, TXT, Markdown nebo vložený text se zpracuje pouze v prohlížeči. Přesný podporovaný otisk nadále dostane zkontrolovanou analýzu; každý jiný vstup dostane jen obecnou orientaci. Nulový rozlišující průnik s veřejnou pamětí autora se označí samostatným černým bodem **0/9 — ŽÁDNÁ SHODA**. Alespoň jeden textový signál dostane pouze **1/9 — NEJSLABŠÍ ZELENÁ SHODA**, dokud skutečnou vazbu nepotvrdí člověk. V obou případech aplikace může vytěžit data, spisové značky, instituce, částky a možné lhůtové výrazy a navrhne kontrolní krok. Lhůtu nevypočítává a obrazový sken bez textové vrstvy výslovně pošle k místnímu OCR.

V2.4 současně rozlišuje dokument jiného člověka od skutečně nesouvisejícího dokumentu. Pokud text obsahuje konopný i právně-procesní signál, vstoupí do **sdílené konopné důkazní vrstvy**. Jeho vlastní fakta, citace, rozhodnutí, doručení a procesní stav zůstávají oddělené. Zdrojované důkazy k měření THC, vzorkování, THC/THCA, nejistotě měření, technickým předpisům a notifikaci lze prověřit napříč kauzami a vložit do lidsky kontrolovaného pracovního podkladu k obnově řízení, zásahové žalobě, náhradě škody či újmy nebo jiné cestě. Návštěvník může cíl zvolit; při automatickém režimu se zobrazí pouze cíle výslovně naznačené textem a jinak zůstane cesta neurčena. Výstup zvlášť ukazuje kandidátní příspěvek nového člověka, zkontrolované společné důkazní zdroje, chybějící podklady z jeho vlastního spisu a oddělenou osnovu každého pracovního výstupu. Samotná podobnost, volba cíle ani vložení dokumentu nedokládají přípustnost, včasnost, nárok, nezákonnost nebo budoucí úspěch.

Aktualizace v2.5 je první přesně zkontrolované anonymizované porovnání dokumentu jiné osoby. Soukromý desetistránkový návrh na obnovu L. CH. z roku 2022 dostal nejvyšší průnik **9/9 — EXTRÉM, HOŘÍ** ve větvi odběru, homogenizace a měření THC. To znamená relevanci a prioritu lidského přepracování, nikoli pravděpodobnost úspěchu. Výstup odděluje doslovné anonymizované citace návrhu, údaje přijaté pouze jako autorem potvrzený základ řízeného testu a syntézu systému nad pozdějšími úředními důkazy a judikaturou. Nový návrh by měl postavit do čela úřední odpovědi z roku 2025, prověřit jejich procesní novost a materiálnost, vyžádat původní laboratorní řetězec a oddělit osobně přičítaných 9 rostlin od skupinového součtu. Veřejně se osoba označuje pouze **L. CH.** s odkazem na dokument České televize [Smoke (2025)](https://www.ceskatelevize.cz/porady/16298026696-smoke/); zdrojové PDF, jméno, datum narození, adresy, věznice, podpisy a identifikátory věci zůstávají neveřejné.

Pevný organizační základ k okamžiku podání je uložen v `project-memory/registry-baseline-2026-07-20.json`. Eviduje pět subjektů, jejich osmimístná IČO, datové schránky, úřední názvy a odděleně alianční role a historická označení. IČO European Society of Investors in Natural and Social Sciences Research je správně `706 31 298`; devátá číslice v jednom přepisu byla odstraněna jako překlep. U IČO `227 27 281` je k 20. červenci 2026 současným názvem **Educational Cannabis Clinic, z.s.**; **European Educational Cannabis Clinic, z.s.** je vedeno jako předchozí název do 16. června 2026. Záznam vznikl po odeslání přihlášky, proto nemění neměnný archiv V1 a slouží jako porovnávací základ pro další V2.

Osm neveřejných zdrojových PDF je možné v prohlížeči rozpoznat pouze přesným celosouborovým otiskem. Soubor neopustí zařízení a aplikace pouze zvýrazní odpovídající předem zkontrolovaný záznam; neznámý nebo pozměněný vstup žádný připravený výklad nedostane. Ani exekuční listiny, ani soukromý návrh L. CH., jejich adresy, účty, podpisová data či osobní identifikátory nejsou součástí veřejné složky.

Aktuální sada má 131 automatických kontrol; původních 54 soutěžních kontrol zůstává zachováno a po podání přibylo 77 dalších. V okamžiku dřívějšího dotazu na dosavadní počet měla sada 85 různých kontrol. Ze čtyř tehdy doložených úplných běhů plynulo nejméně 267 jednotlivých průchodů (`54 + 62 + 66 + 85`), nikoli přesný celoživotní součet všech meziběhů. Novější souhrn běhů je uložen vedle pevného organizačního základu v `project-memory/registry-baseline-2026-07-20.json`.

Policejní aktualizace vede tři odlišné vrstvy: doslovné výroky listiny, autorem potvrzenou chronologii a systémovou syntézu. Mgr. Dušan Dvořák jako vlastník archivu potvrzuje souběžné rozeslání předžalobní výzvy dne 14. července 2026; systém tento záznam přijímá bez požadavku, aby autor dokazoval sám sobě své jednání, ale ve veřejném výstupu jej nepřepisuje na výrok policie nebo potvrzení jednotlivých adresátů. Anglické rozhraní překládá analýzu a podstatné citace a současně zachovává české znění jako kontrolovatelný pramen.

GitHub Pages je statická aplikace: soubor vybraný návštěvníkem zůstává v jeho prohlížeči a neposílá se autorovi, Codexu ani jinému serveru. V2.5 umí okamžitou deterministickou orientaci čitelného vstupu, porovnání s veřejnými textovými signály paměti a přesně zkontrolované anonymizované výstupy pro podporované otisky. Neprovádí však obecné sémantické nebo právní posouzení. Bezpečné trvalé uložení, OCR, automatický překlad a modelová analýza by vyžadovaly další vrstvy; nejsou skrytou funkcí současné ukázky.

Kazuistika nyní ukazuje skutečný rozsah problému, pro který je projekt určen. Autorem sestavená tabulka pro období 2010–2024 zachycuje 31 prvoinstančních rozhodnutí či úkonů, 10 rozhodnutí Nejvyššího soudu a 29 rozhodnutí Ústavního soudu — dohromady 70 evidovaných uzlů. Nejde o tvrzení, že existuje 70 samostatných kauz: více rozhodnutí může patřit do jednoho řízení. Aplikace proto zobrazuje spisovou značku, instituci, datum, citovanou pasáž, druh vazby a stav ověření místo zavádějícího jediného čísla.

Současná mapa roku 2026 vede odděleně tři zásahové žaloby u Městského soudu v Praze — větve Ministerstva zdravotnictví, Ministerstva spravedlnosti a NCOZ/Policie ČR — a civilní žalobu proti České televizi. Samotná existence podání, postoupení nebo výzvy k poplatku není prezentována jako potvrzení pochybení žalovaného. To je praktická ukázka hlavní přidané hodnoty: rozsáhlý archiv se mění v auditovatelnou síť důkazů, procesních kroků a dosud neověřených tvrzení.

Nyní funguje:

- načtení zachované ukázky KSZ Ostrava;
- striktní rozpoznání tohoto podporovaného dokumentu;
- kontrola úplné shody podporovaného dokumentu (s tolerancí pouze pro konce řádků a okolní mezery), takže nestačí shodný název, vybrané fráze ani připojení ukázky k jinému textu;
- odmítnutí prázdných, pozměněných a nepodporovaných dokumentů;
- oddělení extrahovaných faktů, právní interpretace, nejistoty a doporučených kroků;
- citace a míra jistoty u každého zobrazeného tvrzení;
- automatické testy proti záměně postoupení věci za potvrzení pochybení;
- provoz bez API klíčů a placených služeb.
- lokální výběr více textových listin bez jejich odesílání na server;
- orientační vytvoření mapy dokumentů, spisových značek, dat a větví;
- konkrétní demonstrační scénář pro rodiny lidí ve výkonu trestu: rozsudky a protokoly měření THC.
- jedním kliknutím načitatelná anonymizovaná institucionální mapa evropského případu 2004–2026: prezident republiky, soudy, státní zastupitelství, ministerstva, policie a forenzní orgány, evropská ochrana, odškodnění a výzkumný program;
- viditelné směrované vazby mezi institucemi, časová osa a souhrnné počty; nedoložené souhrnné údaje jsou označeny jako tvrzení autora čekající na anonymizovaný prvotní pramen;
- české a anglické veřejné rozhraní pro mezinárodní demonstraci.
- veřejný souhlasem zveřejněný registr ověřených výroků, institucí, procesních vazeb a zdrojované judikatury;
- přísné oddělení ověřené skutečnosti, neověřeného uzlu a obecného právního principu.
- lokální rozpoznání jedné přesně verzované soudní listiny PDF a její veřejné anonymizované odvozené kopie podle SHA-256;
- zákaz přenosu připravené analýzy na neznámý nebo pozměněný PDF; čitelný vstup místo ní dostane pouze obecnou místní orientaci;
- oddělení obsahu soudního usnesení od tvrzení autora, semafor relevance a blokující kontrola data právní moci a podpisového oprávnění;
- viditelné porovnání paměti před vložením a po vložení listiny včetně konkrétního řešení, chybějících podkladů a větví, do nichž se nová informace nemá přenášet;
- zveřejnění pouze odvozeného důkazního výtahu bez dat narození, rodných čísel, adres, podpisů a nepotřebných údajů třetích osob; úplný originál zůstává mimo veřejný web.
- lokální rozpoznání přesného policejního PDF ze dne 20. července 2026 bez zveřejnění soukromého originálu, s veřejnou odvozenou kopií zachovávající jméno adresáta, výstupem před/po, citacemi, devíti červenými vazbami a návrhem kontrolního postupu;
- prioritní fronta více přesně podporovaných PDF podle nejvyššího dosaženého stupně, počtu červených a oranžových vazeb, jejich váhy a data listiny; červená znamená prioritu lidské kontroly, nikoli prokázané pochybení;
- oddělení hodnotícího názvu souboru od slov policejního sdělení a zákaz záměny „uložení bez dalšího opatření“ za rozhodnutí NSZ nebo věcné potvrzení pochybení;
- zákaz odhadu zákonné lhůty nebo opravného prostředku bez úplného procesního kontextu.
- přesné lokální rozpoznání sedmi neveřejných zdrojových PDF finanční a organizační aktualizace pouze digitálním otiskem, včetně deduplikace již evidované policejní listiny;
- rozlišení částky doložené k historickému mezidatu od částky ke dni zastavení a zákaz dopočtu částky, kterou listina neuvádí;
- místní čtení textové vrstvy běžného PDF a místní zpracování TXT, Markdownu nebo vloženého textu bez odeslání souboru;
- samostatný černý bod 0/9 pro nulovou shodu s pamětí autora a nejvýše nejslabší zelená 1/9 pro dosud nepotvrzený textový průnik;
- obecné vytěžení dat, spisových značek, institucí, částek a možných lhůtových výrazů s citací a navrženým kontrolním krokem;
- přiznaná hranice OCR: obrazový sken bez textové vrstvy se neinterpretuje a dostane pokyn k místnímu OCR nebo zkontrolovanému přepisu;
- rozpoznání právního střetu ve věci konopí jen při současném konopném a právně-procesním signálu;
- sdílená konopná důkazní vrstva pro zdrojované kandidáty k měření THC, vzorkování, nejistotě měření a oznamování technických předpisů;
- oddělené pracovní osnovy pro obnovu řízení, zásahovou žalobu, náhradu škody či nemajetkové újmy a jiný postup; každá vyžaduje vlastní případové podklady a ponechává přípustnost, včasnost, nárok i konečné znění lidské právní kontrole;
- možnost po zdrojové kontrole, souhlasu nebo zákonné anonymizaci přidat fakta a důkazy dalšího člověka do sdílené vrstvy, aniž se přenese jeho identita, doručení, právní moc, lhůty nebo výsledek kauzy;

### Konkrétní aplikace dostupná už nyní

Člověk může v prohlížeči vybrat textové přepisy rozsudků, protokolů OKTE a dalších listin. Prototyp je lokálně roztřídí do orientačního typu a vytáhne rozpoznané spisové značky, data, instituce, částky a možné lhůtové výrazy. U omezené sady přesně podporovaných PDF navíc ověří verzi digitálním otiskem a zobrazí zdrojově omezenou analýzu. Jiný čitelný PDF dostane černý výsledek 0/9 nebo nejslabší zelený 1/9 a obecný kontrolní postup. Právní konflikt ve věci konopí navíc dostane zdrojované společné důkazní kandidáty a podle volby uživatele či výslovného textového signálu pracovní osnovu obnovy, zásahové žaloby, náhrady nebo jiného kroku; případová fakta každého člověka přitom zůstávají oddělená. Obrazový sken bez textové vrstvy vyžaduje OCR. Soubory neopouštějí zařízení a po obnovení stránky se zahodí.

Tato první vrstva ještě neurčuje správný opravný prostředek ani neposuzuje správnost měření THC. Ukazuje však základ budoucího systému: z neuspořádaných listin vznikne mapa případu, na kterou lze bezpečně navázat ověřenou znalostní paměť, odbornou kontrolu a citovanou přípravu dalšího kroku.

## Co je zatím vize

Repozitář dosud neobsahuje univerzální sémantickou nebo právní analýzu libovolných dokumentů, podporu DOCX, příjem stovek dokumentů, OCR, runtime AI model, databázi, plný znalostní graf, vyhledávání napříč spisy, automatický právní výběr větve, generování obecných podání, autentizaci, řízení přístupu ani auditní log. To jsou plánované vrstvy širšího modelu, nikoli vlastnosti dnešní ukázky. V2.4 poskytuje pouze pravidlovou místní orientaci čitelného vstupu a bezpečné směrování k lidské kontrole.

## Přístupnost jako základní požadavek

Budoucí produkt má podporovat jednoduchý jazyk, ovládání klávesnicí a asistivními technologiemi, hlasový vstup, OCR fotografovaných listin, práci po malých krocích, bezpečné ukládání rozpracovaného případu a nízké nebo nulové náklady. Přístupnost není doplněk; je součástí účelu projektu.

Zamýšlená vstupní brána nabízí dvě rovnocenné cesty: člověk buď vloží dokumenty k místnímu předzpracování a řízené anonymizaci, nebo problém po malých krocích namluví ve vlastním jazyce. Systém připraví kontrolovatelnou strukturu a uživatel rozhodne, co smí být sdíleno. Oprávněný advokát nebo pracovník poradny pak může anonymizovaný případ převzít, určit vhodnou právní cestu a navrhnout další krok. Hlasový vstup, překlad, řízení souhlasu a předání právníkovi jsou zatím vize, nikoli funkce dnešní veřejné ukázky.

## Struktura repozitáře

```text
web/                  veřejná statická aplikace
  analysis.js         bezpečné rozpoznání a strukturovaný výstup
  case-map.js         anonymizovaná institucionální mapa, vazby, metriky a časová osa
  memory.js           lokální mapa více dokumentů a věcných větví
  case-memory.js      veřejná kazuistika, výroky, vazby a zdrojovaná judikatura
  organisation-update.js  přesné rozpoznání vnějšího PDF, anonymizovaná fakta a semafor relevance
  police-update.js    následný přesný policejní PDF test, citace, meze a návrh řešení
  alliance-update.js  v2.2: výroční zpráva, tři exekuce a přesně omezený soudní závěr bez publikace zdrojových PDF
  version-2.js        historie V0/V1/V2, vstupní metriky a devítistupňový semafor
  generic-intake.js   obecná místní orientace, černá 0/9 a nejslabší zelená 1/9
  shared-cannabis-evidence.js  mezikauzální konopné důkazy a oddělené osnovy právních cest
  pdf-reader.js       omezené místní čtení textové vrstvy PDF
  vendor/pdfjs/       připnutý Apache-2.0 runtime PDF.js pro prohlížeč
  documents/          tři schválené odeslané výstupy a dvě veřejné odvozené důkazní kopie
  app.js              vykreslení výsledků
  index.html          veřejná prezentace a ukázka
  styles.css          vzhled aplikace
test/                 automatické testy
project-memory/       datované pevné základy, které se nesmějí zpětně přepisovat do archivu V1
.github/workflows/    nasazení pouze složky web/
ksz_ostrava_*.txt     zdrojová ukázka, nepublikovaná Pages workflow
```

## Spuštění a testování

Je potřeba Node.js 24 nebo novější.

```bash
npx serve web
npm test
```

Aplikace nemá produkční závislosti a nevyžaduje API klíč. Testy používají vestavěný `node:test`.

## Nasazení

Workflow `.github/workflows/static.yml` se spouští při pushi do `main` nebo ručně. Nejprve spustí bezpečnostní regresní testy; nasazení pokračuje jen po jejich úspěchu. GitHub Pages publikuje výhradně zkontrolovanou složku `web/`: webové rozhraní, tři autorem výslovně schválené odeslané výstupy a dvě veřejné odvozené důkazní kopie. U policejní kopie zůstává jméno Dušana Dvořáka veřejné, zatímco jeho adresa a podpisová data jsou odstraněna. Soukromé originály, testy ani kořen repozitáře se nepublikují.

Živé demo: <https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/>

Soutěžní podklady: [česky](SUBMISSION.cs.md) · [English](SUBMISSION.md)

## Použití Codexu a GPT-5.6

Codex byl použit jako vývojový spolupracovník pro audit první verze, formulaci širšího modelu, návrh bezpečnostních hranic, strukturování výstupů, tvorbu testů, dokumentaci a kontrolu nasazení. GPT-5.6 byl v průběhu vývoje využit k promýšlení produktového konceptu, bezpečnostních scénářů a srozumitelné prezentace projektu; jeho návrhy podléhají lidské kontrole. Codex ani GPT-5.6 v současné statické webové ukázce neběží a za provozu negenerují právní závěry. Každá další etapa musí projít lidskou technickou, právní a přístupnostní kontrolou.

Projekt existoval jako raný prototyp před zahájením OpenAI Build Week. Rozšíření vytvořená v soutěžním období jsou odlišena datovanou historií commitů: přísné ověření identity dokumentu, bezpečné odmítání vstupů, vícedokumentová mapa, dvojjazyčné rozhraní, zdrojový registr živé paměti, adversariální testy, vyčištění repozitáře a nasazení pouze webové aplikace.

## Soutěžní soulad

- doporučená kategorie: **Apps for Your Life**;
- živé demo je zdarma a bez přihlášení;
- anglické rozhraní a anglický soutěžní popis jsou součástí repozitáře;
- finální video musí být veřejné na YouTube, se zvukem, v angličtině nebo s úplným anglickým překladem a kratší než tři minuty;
- před odevzdáním je nutné vložit `/feedback` Codex Session ID hlavního vývojového vlákna;
- dokumenty třetích osob, podpisy, adresy a jiné osobní údaje se do veřejné soutěžní ukázky nevkládají bez oprávnění;
- projekt musí zůstat dostupný porotě bez omezení nejméně do skončení hodnocení.

## Licence

MIT — viz [LICENSE](LICENSE).
