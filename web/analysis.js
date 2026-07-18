export const SAMPLE_DOCUMENT = `KRAJSKÉ STÁTNÍ ZASTUPITELSTVÍ V OSTRAVĚ
Ostrava 8. července 2026
4 KZN 1000/2026 - 10

Podání anonymizovaného podatele ze dne 27. 5. 2026

Sděluji Vám, že část Vašeho podání směřující vůči postupu policejního orgánu - OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku k vyhodnocení a přijetí odpovídajícího opatření.`;

const normalizeDocument = (value) => String(value ?? '').replace(/\r\n?/g, '\n').trim();

const item = (claim, citation, confidence = 'vysoká') => ({ claim, citation, confidence });

const COPY = {
  cs: {
    mapOnly: 'Ověřená právní interpretace je dostupná pouze pro samostatnou ukázku KSZ Ostrava; více dokumentům se nepřiřazuje.',
    empty: 'Nebyl vložen žádný dokument.',
    unsupported: 'Tento demonstrační prototyp podporuje pouze přiloženou ukázku sdělení KSZ Ostrava ze dne 8. července 2026. Jiný dokument vyžaduje nový ověřený analyzátor; aplikace mu proto nesmí přiřadit předem připravené závěry.',
    notice: 'Předem připravená ukázková analýza jednoho anonymizovaného podporovaného dokumentu. Nejde o obecnou AI právní analýzu.',
    confidence: 'vysoká',
    recommendation: 'doporučení'
  },
  en: {
    mapOnly: 'Verified legal interpretation is available only for the standalone KSZ Ostrava sample; it is never assigned to multiple documents.',
    empty: 'No document was provided.',
    unsupported: 'This demonstration prototype supports only the included KSZ Ostrava communication dated 8 July 2026. A different document requires a separately verified analyzer, so the application must not assign prepared conclusions to it.',
    notice: 'Prepared sample analysis of one anonymized supported document. This is not general-purpose AI legal analysis.',
    confidence: 'high',
    recommendation: 'recommendation'
  }
};

export function analyzeDocumentSet(documents, language = 'cs') {
  const copy = COPY[language] || COPY.cs;
  if (!Array.isArray(documents) || documents.length !== 1) {
    return {
      supported: false,
      mode: 'map-only',
      reason: copy.mapOnly
    };
  }
  const document = documents[0];
  return analyzeDocument(typeof document === 'object' ? document.text : document, language);
}

export function analyzeDocument(input, language = 'cs') {
  const copy = COPY[language] || COPY.cs;
  const text = normalizeDocument(input);
  if (!text) return { supported: false, reason: copy.empty };

  // Prepared conclusions are available only for the complete, versioned sample.
  // Phrase matching is deliberately insufficient: it could accept an altered
  // document or unrelated text with the sample embedded inside it.
  if (text !== normalizeDocument(SAMPLE_DOCUMENT)) {
    return {
      supported: false,
      reason: copy.unsupported
    };
  }

  const origin = 'KRAJSKÉ STÁTNÍ ZASTUPITELSTVÍ V OSTRAVĚ';
  const date = 'Ostrava 8. července 2026';
  const reference = '4 KZN 1000/2026 - 10';
  const forwarding = 'část Vašeho podání směřující vůči postupu policejního orgánu - OKTE Frýdek-Místek byla postoupena Okresnímu státnímu zastupitelství ve Frýdku-Místku';
  const purpose = 'k vyhodnocení a přijetí odpovídajícího opatření';

  const cs = language !== 'en';
  const high = copy.confidence;
  const recommendation = copy.recommendation;
  return {
    supported: true,
    prototypeNotice: copy.notice,
    facts: [
      item(cs ? 'Dokument vydalo Krajské státní zastupitelství v Ostravě.' : 'The document was issued by the Regional Public Prosecutor’s Office in Ostrava.', origin, high),
      item(cs ? 'Dokument je datován 8. července 2026.' : 'The document is dated 8 July 2026.', date, high),
      item(cs ? 'Anonymizovaná spisová značka je 4 KZN 1000/2026-10.' : 'The anonymized case reference is 4 KZN 1000/2026-10.', reference, high),
      item(cs ? 'Část podání týkající se postupu OKTE Frýdek-Místek byla postoupena OSZ ve Frýdku-Místku.' : 'The part of the submission concerning OKTE Frýdek-Místek was referred to the District Public Prosecutor’s Office in Frýdek-Místek.', forwarding, high)
    ],
    interpretation: [
      item(cs ? 'Jde o procesní postoupení části podání, nikoli o meritorní potvrzení pochybení OKTE.' : 'This is a procedural referral of part of the submission, not a determination that OKTE committed wrongdoing.', forwarding, high),
      item(cs ? 'OSZ Frýdek-Místek má postoupenou část podání vyhodnotit a zvážit odpovídající opatření.' : 'The District Public Prosecutor’s Office in Frýdek-Místek is to evaluate the referred part and consider an appropriate measure.', purpose, high)
    ],
    uncertainty: [
      item(cs ? 'Dokument neuvádí, zda byl postup OKTE nezákonný nebo nesprávný.' : 'The document does not state whether OKTE’s conduct was unlawful or incorrect.', forwarding, high),
      item(cs ? 'Dokument nepotvrzuje, že OSZ již přijalo konkrétní opatření.' : 'The document does not confirm that the District Public Prosecutor’s Office has already taken a specific measure.', purpose, high),
      item(cs ? 'Z dokumentu nelze zjistit novou spisovou značku přidělenou OSZ.' : 'The new case reference assigned by the District Public Prosecutor’s Office cannot be determined from this document.', reference, cs ? 'střední' : 'medium')
    ],
    actions: [
      item(cs ? 'Zjistit spisovou značku, pod níž OSZ Frýdek-Místek postoupenou část eviduje.' : 'Identify the case reference under which the District Public Prosecutor’s Office records the referred part.', forwarding, recommendation),
      item(cs ? 'Vyžádat informaci o výsledku vyhodnocení a případném opatření.' : 'Request information about the outcome of the evaluation and any measure taken.', purpose, recommendation),
      item(cs ? 'Před právním použitím nechat závěry ověřit kvalifikovanou osobou.' : 'Have a qualified person verify the conclusions before any legal use.', purpose, recommendation)
    ]
  };
}
