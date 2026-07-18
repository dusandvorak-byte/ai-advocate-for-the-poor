# AI Advocate for the Poor — návrh přihlášky OpenAI Build Week

**Autor a vedoucí projektu: Mgr. Dušan Dvořák**

## Jedna věta

AI Advocate for the Poor mění roztříštěné právní podklady chudých a zdravotně postižených lidí v ověřitelnou mapu případu, aby mohli účinně požádat o pomoc advokáta, poradnu, ombudsmana nebo úřad.

## Problém

Člověk může mít oprávněný nárok i důležité důkazy, ale přesto selhat, protože nemá peníze, zdraví, čas nebo odbornou kapacitu zpracovat stovky listin, událostí, osob, institucí, spisových značek a lhůt. Instituce mají strukturované spisy a profesionální aparát; znevýhodněný člověk často přichází jen s neuspořádanou hromadou podkladů.

## Řešení

Projekt vytváří dlouhodobou, zdrojově ukotvenou paměť případu. První veřejná etapa:

- lokálně mapuje více textových listin bez jejich odesílání;
- rozpoznává dokumenty, spisové značky, data a věcné či procesní větve;
- nabízí jedním kliknutím anonymizovanou institucionální mapu evropského případu 2004–2026 s vazbami na prezidenta republiky, soudy, státní zastupitelství, ministerstva, policii, forenzní orgány, evropské instituce, odškodnění a výzkumný program;
- zobrazuje časovou osu a souhrnné počty a odlišuje indexované údaje od tvrzení autora, která ještě vyžadují anonymizovaný prvotní pramen;
- na jednom anonymizovaném podporovaném vzorku odděluje fakta, právní interpretaci, nejistotu a doporučené kroky;
- u každého zobrazeného závěru uvádí přesnou citaci;
- odmítá přenést připravený právní výklad na pozměněný, cizí nebo vícedokumentový vstup.

## Proč je projekt jiný

Cílem není další chatbot, který sebejistě odpoví na právní otázku. Cílem je dát člověku paměť, strukturu a schopnost jednat. Každé tvrzení má mít dohledatelný zdroj, každá nejistota má zůstat viditelná a každý návrh musí před použitím zkontrolovat člověk.

## Použití Codexu a GPT-5.6

GPT-5.6 pomohl převést širší sociální a právní problém do srozumitelného produktového konceptu, analyzovat možné záměny mezi faktem, tvrzením, procesním krokem a právním závěrem a navrhnout zdrojově ukotvenou strukturu výstupu. Codex provedl audit repozitáře, implementoval bezpečnostní hranice, lokální mapu případu, uživatelské rozhraní, adversariální testy, dokumentaci a omezené nasazení GitHub Pages.

Model v současném statickém demu neběží. To je úmyslná hranice první etapy: připravené závěry nesmějí uniknout na nepodporované dokumenty. Další etapa připojí GPT-5.6 až za ověřování vstupu, citací, schématu výstupu a lidskou kontrolu.

## Bezpečnost jako součást produktu

Prototyp výslovně uvádí, že nejde o právní radu ani univerzální právní AI. Úplná identita jediného podporovaného dokumentu se ověřuje před zobrazením připraveného výkladu. Procesní postoupení není prezentováno jako potvrzení pochybení. Vícedokumentový režim vytváří pouze orientační mapu a nikdy nedostane připravenou právní interpretaci.

## Současné omezení

Veřejná verze pracuje pouze s textem a jedním ověřeným vzorkem. Neobsahuje OCR, databázi, autentizaci, obecnou právní analýzu ani generování podání. Tyto funkce jsou plánované, nikoli předstírané.

## Odkazy

- Živé demo: https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/
- Kód: https://github.com/dusandvorak-byte/ai-advocate-for-the-poor

## Scénář demonstračního videa — 90 sekund

1. **0–15 s — problém:** Ukažte neuspořádané právní podklady a vysvětlete informační nerovnost mezi institucí a člověkem bez prostředků.
2. **15–35 s — mapa případu:** Klikněte na „Načíst anonymizovanou evropskou mapu případu“ a „Vytvořit mapu případu“. Ukažte prezidenta republiky, soudy, státní zastupitelství, ministerstva, policii, evropské orgány a jejich vazby.
3. **35–55 s — bezpečnostní hranice:** Zdůrazněte, že mapa sama neurčuje nezákonnost ani správný opravný prostředek a že vícedokumentový režim nedostává připravený právní výklad.
4. **55–75 s — ukotvená analýza:** Načtěte samostatnou ukázku KSZ Ostrava. Ukažte čtyři oddělené skupiny a přesné citace.
5. **75–90 s — dopad:** Uzavřete: „Nechceme nahradit advokáta. Chceme dostat znevýhodněného člověka do stavu, kdy mu advokát může skutečně pomoci.“
