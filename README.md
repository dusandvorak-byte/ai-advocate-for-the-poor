# AI Advocate for the Poor

**Autor a vedoucí projektu: Mgr. Dušan Dvořák**

## Poslání

**AI Advocate for the Poor pomáhá chudým a zdravotně postiženým lidem proměnit nepřehledný životní a právní problém v ověřitelný případ: uspořádá podklady, zachová souvislosti, nalezne důležitou větev a připraví návrh dalšího kroku ke kontrole člověkem.**

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

## Současný stav: bezpečný demonstrační prototyp

Veřejná aplikace zatím **není univerzální právní AI a neposkytuje právní radu**. Demonstruje uvedenou metodu na jediné předem připravené a anonymizované ukázce sdělení Krajského státního zastupitelství v Ostravě ze dne 8. července 2026. Jméno podatele a spisová značka byly nahrazeny demonstračními údaji.

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

### Konkrétní aplikace dostupná už nyní

Rodina může v prohlížeči vybrat textové přepisy rozsudků, protokolů OKTE a dalších listin. Prototyp je lokálně roztřídí do soudní, laboratorní, procesní nebo zdravotní větve a vytáhne rozpoznané spisové značky a data. Soubory neopouštějí zařízení a po obnovení stránky se zahodí.

Tato první vrstva ještě neurčuje správný opravný prostředek ani neposuzuje správnost měření THC. Ukazuje však základ budoucího systému: z neuspořádaných listin vznikne mapa případu, na kterou lze bezpečně navázat ověřenou znalostní paměť, odbornou kontrolu a citovanou přípravu dalšího kroku.

## Co je zatím vize

Repozitář dosud neobsahuje příjem stovek dokumentů, OCR, AI model, databázi, znalostní graf, vyhledávání napříč spisy, automatický výběr větve, generování obecných podání, autentizaci, řízení přístupu ani auditní log. To jsou plánované vrstvy širšího modelu, nikoli vlastnosti dnešní ukázky.

## Přístupnost jako základní požadavek

Budoucí produkt má podporovat jednoduchý jazyk, ovládání klávesnicí a asistivními technologiemi, hlasový vstup, OCR fotografovaných listin, práci po malých krocích, bezpečné ukládání rozpracovaného případu a nízké nebo nulové náklady. Přístupnost není doplněk; je součástí účelu projektu.

## Struktura repozitáře

```text
web/                  veřejná statická aplikace
  analysis.js         bezpečné rozpoznání a strukturovaný výstup
  case-map.js         anonymizovaná institucionální mapa, vazby, metriky a časová osa
  memory.js           lokální mapa více dokumentů a věcných větví
  app.js              vykreslení výsledků
  index.html          veřejná prezentace a ukázka
  styles.css          vzhled aplikace
test/                 automatické testy
.github/workflows/    nasazení pouze složky web/
ksz_ostrava_*.txt     zdrojová ukázka, nepublikovaná Pages workflow
```

## Spuštění a testování

Je potřeba Node.js 20 nebo novější.

```bash
npx serve web
npm test
```

Aplikace nemá produkční závislosti a nevyžaduje API klíč. Testy používají vestavěný `node:test`.

## Nasazení

Workflow `.github/workflows/static.yml` se spouští při pushi do `main` nebo ručně. Nejprve spustí bezpečnostní regresní testy; nasazení pokračuje jen po jejich úspěchu. GitHub Pages publikuje výhradně složku `web/`, nikoli právní dokumenty, testy nebo celý repozitář.

Živé demo: <https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/>

Soutěžní podklady: [česky](SUBMISSION.cs.md) · [English](SUBMISSION.md)

## Použití Codexu a GPT-5.6

Codex byl použit jako vývojový spolupracovník pro audit první verze, formulaci širšího modelu, návrh bezpečnostních hranic, strukturování výstupů, tvorbu testů, dokumentaci a kontrolu nasazení. GPT-5.6 byl v průběhu vývoje využit k promýšlení produktového konceptu, bezpečnostních scénářů a srozumitelné prezentace projektu; jeho návrhy podléhají lidské kontrole. Codex ani GPT-5.6 v současné statické webové ukázce neběží a za provozu negenerují právní závěry. Každá další etapa musí projít lidskou technickou, právní a přístupnostní kontrolou.

## Licence

MIT — viz [LICENSE](LICENSE).
