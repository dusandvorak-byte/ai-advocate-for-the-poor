export const CASE_MEMORY = {
  version: '2026-07-18',
  privacy: 'Veřejná demonstrační paměť. Jméno podatele je anonymizováno.',
  verifiedStatements: [
    {
      id: 'ksz-ostrava-forwarding',
      statement: 'Část podání týkající se postupu OKTE Frýdek-Místek byla postoupena OSZ Frýdek-Místek.',
      date: '2026-07-08', reference: '4 KZN 7116/2026-45',
      institution: 'Krajské státní zastupitelství v Ostravě',
      relatedInstitution: 'Okresní státní zastupitelství ve Frýdku-Místku',
      branch: 'Procesní postup institucí / laboratorní a THC důkazy',
      citation: 'část Vašeho podání směřující vůči postupu policejního orgánu - OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku',
      proves: 'Dokládá procesní postoupení části podání.',
      doesNotProve: 'Nedokládá nezákonnost postupu OKTE ani výsledek vyhodnocení OSZ.',
      source: 'ksz_ostrava_2026_07_08.txt', verification: 'ověřeno zdrojovou listinou'
    },
    {
      id: 'ksz-ostrava-purpose',
      statement: 'Účelem postoupení bylo vyhodnocení a přijetí odpovídajícího opatření.',
      date: '2026-07-08', reference: '4 KZN 7116/2026-45',
      institution: 'Krajské státní zastupitelství v Ostravě',
      relatedInstitution: 'Okresní státní zastupitelství ve Frýdku-Místku',
      branch: 'Procesní postup institucí',
      citation: 'k vyhodnocení a přijetí odpovídajícího opatření',
      proves: 'Dokládá deklarovaný účel postoupení.',
      doesNotProve: 'Nedokládá, že již bylo přijato konkrétní opatření.',
      source: 'ksz_ostrava_2026_07_08.txt', verification: 'ověřeno zdrojovou listinou'
    }
  ],
  pendingNodes: [
    { reference: 'KPR 4093/2026', branch: 'Chronologie institucionální vědomosti', relation: 'V původní ukázce označeno jako související větev.', verification: 'neověřeno — zdrojová listina není v repozitáři' },
    { reference: '18 A 23/2026', institution: 'MSp', branch: 'Soudní / správní větev', relation: 'V původní ukázce označeno jako podpůrná vazba k aktuálnosti.', verification: 'neověřeno — zdrojová listina není v repozitáři' },
    { reference: '18 A 17/2026', institution: 'NCOZ', branch: 'Soudní / správní větev', relation: 'V původní ukázce označeno jako možný kontrast procesního zacházení.', verification: 'neověřeno — zdrojová listina není v repozitáři' },
    { reference: 'nová spisová značka OSZ Frýdek-Místek', branch: 'Procesní pokračování', relation: 'Chybějící navazující uzel po postoupení.', verification: 'čeká na zjištění a zdrojovou listinu' },
    { reference: 'obnovy trestních řízení', branch: 'Mimořádné opravné prostředky', relation: 'Možná budoucí větev; význam závisí na nových skutečnostech, důkazech a konkrétních spisech.', verification: 'hypotéza, nikoli právní závěr' }
  ],
  jurisprudence: [
    { court: 'Ústavní soud', date: '2024', reference: 'II. ÚS 1703/24', principle: 'Znalecký posudek je nutné prověřovat z hlediska úplnosti podkladů, logické návaznosti a vnitřních rozporů.', relation: 'Obecný kontrolní rámec pro odborné a laboratorní důkazy; konkrétní použitelnost vyžaduje obsah protokolu a spisu.', sourceUrl: 'https://nalus.usoud.cz/Search/GetText.aspx?sz=2-1703-24_1' },
    { court: 'Nejvyšší soud', date: '2013-01-30', reference: 'Tpjn 302/2012', principle: 'Při obnově se posuzuje, zda nové skutečnosti či důkazy mohou ve spojení s původními odůvodnit jiné rozhodnutí.', relation: 'Obecný rámec obnovy; ne každá nová informace je způsobilým důvodem.', sourceUrl: 'https://sbirka.nsoud.cz/sbirka/6773/' },
    { court: 'Nejvyšší soud', date: '2016-07-20', reference: '8 Tz 25/2015', principle: 'Soud zkoumá, zda je navrhovaný důkaz nový, dříve neznámý a potenciálně způsobilý vést k jinému rozhodnutí.', relation: 'Kontrolní otázky pro případné nové laboratorní nebo odborné podklady.', sourceUrl: 'https://sbirka.nsoud.cz/sbirka/7413/' },
    { court: 'Nejvyšší soud', date: '2014-03-13', reference: 'Tpjn 301/2013', principle: 'Stanovisko se zabývá významem množství účinné látky THC pro prahové hodnoty drogové trestné činnosti.', relation: 'Obecná THC větev; samo neposuzuje správnost konkrétního měření.', sourceUrl: 'https://eslp.nsoud.cz/sbirka/6963/' },
    { court: 'Nejvyšší soud', date: '2006-06-21', reference: '3 Tdo 687/2006', principle: 'Při objasňování věci je třeba zvažovat chemický znalecký posudek a naměřené hodnoty psychotropních látek v rostlinách.', relation: 'Obecná vazba mezi chemickým důkazem, naměřenými hodnotami a trestněprávním posouzením.', sourceUrl: 'https://eslp.nsoud.cz/sbirka/14402/' }
  ]
};
