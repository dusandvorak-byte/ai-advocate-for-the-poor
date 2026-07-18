export const SAMPLE_DOCUMENT = `KRAJSKÉ STÁTNÍ ZASTUPITELSTVÍ V OSTRAVĚ
Ostrava 8. července 2026
4 KZN 7116/2026 - 45

Podání Mgr. Dušana Dvořáka ze dne 27. 5. 2026

Sděluji Vám, že část Vašeho podání směřující vůči postupu policejního orgánu - OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku k vyhodnocení a přijetí odpovídajícího opatření.`;

const REQUIRED_PASSAGES = [
  'KRAJSKÉ STÁTNÍ ZASTUPITELSTVÍ V OSTRAVĚ',
  'Ostrava 8. července 2026',
  '4 KZN 7116/2026 - 45',
  'část Vašeho podání směřující vůči postupu policejního orgánu - OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku',
  'k vyhodnocení a přijetí odpovídajícího opatření'
];

const item = (claim, citation, confidence = 'vysoká') => ({ claim, citation, confidence });

export function analyzeDocument(input) {
  const text = String(input ?? '').replace(/\r\n/g, '\n').trim();
  if (!text) return { supported: false, reason: 'Nebyl vložen žádný dokument.' };

  const missing = REQUIRED_PASSAGES.filter((passage) => !text.includes(passage));
  if (missing.length) {
    return {
      supported: false,
      reason: 'Tento demonstrační prototyp podporuje pouze přiloženou ukázku sdělení KSZ Ostrava ze dne 8. července 2026. Jiný dokument vyžaduje nový ověřený analyzátor; aplikace mu proto nesmí přiřadit předem připravené závěry.'
    };
  }

  const origin = REQUIRED_PASSAGES[0];
  const date = REQUIRED_PASSAGES[1];
  const reference = REQUIRED_PASSAGES[2];
  const forwarding = REQUIRED_PASSAGES[3];
  const purpose = REQUIRED_PASSAGES[4];

  return {
    supported: true,
    prototypeNotice: 'Předem připravená ukázková analýza jednoho podporovaného dokumentu. Nejde o obecnou AI právní analýzu.',
    facts: [
      item('Dokument vydalo Krajské státní zastupitelství v Ostravě.', origin),
      item('Dokument je datován 8. července 2026.', date),
      item('Uvedená spisová značka je 4 KZN 7116/2026-45.', reference),
      item('Část podání týkající se postupu OKTE Frýdek-Místek byla postoupena OSZ ve Frýdku-Místku.', forwarding)
    ],
    interpretation: [
      item('Jde o procesní postoupení části podání, nikoli o meritorní potvrzení pochybení OKTE.', forwarding),
      item('OSZ Frýdek-Místek má postoupenou část podání vyhodnotit a zvážit odpovídající opatření.', purpose)
    ],
    uncertainty: [
      item('Dokument neuvádí, zda byl postup OKTE nezákonný nebo nesprávný.', forwarding),
      item('Dokument nepotvrzuje, že OSZ již přijalo konkrétní opatření.', purpose),
      item('Z dokumentu nelze zjistit novou spisovou značku přidělenou OSZ.', reference, 'střední')
    ],
    actions: [
      item('Zjistit spisovou značku, pod níž OSZ Frýdek-Místek postoupenou část eviduje.', forwarding, 'doporučení'),
      item('Vyžádat informaci o výsledku vyhodnocení a případném opatření.', purpose, 'doporučení'),
      item('Před právním použitím nechat závěry ověřit kvalifikovanou osobou.', purpose, 'doporučení')
    ]
  };
}
