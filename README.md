# AI Advocate for the Poor

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

Veřejná aplikace zatím **není univerzální právní AI a neposkytuje právní radu**. Demonstruje uvedenou metodu na jediné předem připravené ukázce sdělení Krajského státního zastupitelství v Ostravě ze dne 8. července 2026.

Nyní funguje:

- načtení zachované ukázky KSZ Ostrava;
- striktní rozpoznání tohoto podporovaného dokumentu;
- odmítnutí prázdných, pozměněných a nepodporovaných dokumentů;
- oddělení extrahovaných faktů, právní interpretace, nejistoty a doporučených kroků;
- citace a míra jistoty u každého zobrazeného tvrzení;
- automatické testy proti záměně postoupení věci za potvrzení pochybení;
- provoz bez API klíčů a placených služeb.

## Co je zatím vize

Repozitář dosud neobsahuje příjem stovek dokumentů, OCR, AI model, databázi, znalostní graf, vyhledávání napříč spisy, automatický výběr větve, generování obecných podání, autentizaci, řízení přístupu ani auditní log. To jsou plánované vrstvy širšího modelu, nikoli vlastnosti dnešní ukázky.

## Přístupnost jako základní požadavek

Budoucí produkt má podporovat jednoduchý jazyk, ovládání klávesnicí a asistivními technologiemi, hlasový vstup, OCR fotografovaných listin, práci po malých krocích, bezpečné ukládání rozpracovaného případu a nízké nebo nulové náklady. Přístupnost není doplněk; je součástí účelu projektu.

## Struktura repozitáře

```text
web/                  veřejná statická aplikace
  analysis.js         bezpečné rozpoznání a strukturovaný výstup
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

Workflow `.github/workflows/static.yml` se spouští při pushi do `main` nebo ručně. GitHub Pages publikuje výhradně složku `web/`, nikoli právní dokumenty, testy nebo celý repozitář.

Živé demo: <https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/>

## Použití Codexu

Codex byl použit jako vývojový spolupracovník pro audit první verze, formulaci širšího modelu, návrh bezpečnostních hranic, strukturování výstupů, tvorbu testů, dokumentaci a kontrolu nasazení. Codex v současné webové ukázce neběží a právní závěry negeneruje za provozu. Každá další etapa musí projít lidskou technickou, právní a přístupnostní kontrolou.

## Licence

MIT — viz [LICENSE](LICENSE).
