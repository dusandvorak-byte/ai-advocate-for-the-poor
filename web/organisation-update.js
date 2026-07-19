const text = (cs, en) => ({ cs, en });

export const ORGANISATION_UPDATE_DIGESTS = Object.freeze({
  privateOriginal: 'b2424b5b2cbba7d3cb2dda3c1d0422b4d8df222291d474f41d57ce1deed91493',
  publicAnonymized: '448a95420aa26f3498939e2789b00d581e26bd56486350f5e5f534111247f838'
});

export const ORGANISATION_UPDATE = {
  version: '2026-07-19',
  title: text(
    'Vnější test: změna v dozorčí radě bez úniku osobních údajů',
    'Outside-input test: supervisory-board change without exposing personal data'
  ),
  source: {
    institution: text(
      'Krajský soud v Ostravě - pobočka v Olomouci',
      'Regional Court in Ostrava - Olomouc branch'
    ),
    documentDate: '2026-07-13',
    publicFile: 'documents/organisation-change-anonymized-2026-07-13.pdf',
    privacy: text(
      'Úplný originál zůstává v soukromém archivu a prohlížeč jej nikam neodesílá. Veřejná odvozená kopie neobsahuje data narození, rodná čísla, adresy, podpisy, jména soudních zaměstnanců ani nepotřebné identifikátory dalších subjektů.',
      'The complete original remains in the private archive and the browser uploads it nowhere. The public derivative contains no dates of birth, national identification numbers, addresses, signatures, court-staff names, or unnecessary identifiers of other entities.'
    )
  },
  comparison: {
    before: {
      label: text('PŘED TESTEM', 'BEFORE THE TEST'),
      title: text('Paměť změnu orgánu ještě nedokládala', 'The memory did not yet evidence the governance change'),
      state: text(
        'Archiv obsahoval údaje o alianci, ale bez této přesně rozpoznané listiny nesměl tvrdit změnu v dozorčí radě, datum její účinnosti ani podpisové oprávnění nové osoby.',
        'The archive contained information about the alliance, but without this exactly recognized document it could not assert a supervisory-board change, its effective date, or the new person’s signing authority.'
      )
    },
    after: {
      label: text('PO TESTU', 'AFTER THE TEST'),
      title: text('Vznikl nový časový uzel a kontrolní řešení', 'A new temporal node and review path were created'),
      state: text(
        'Systém listinu zařadil k organizační historii, oddělil soudem doložené údaje od tvrzení autora, odstranil nepotřebné osobní údaje a zablokoval zpětné datování i neprokázaný závěr o oprávnění jednat za alianci.',
        'The system placed the document in the organisational history, separated court-supported facts from the archive owner’s statement, removed unnecessary personal data, and blocked both retroactive dating and an unsupported inference of authority to act for the alliance.'
      )
    },
    solution: [
      text('Do veřejné paměti zapsat usnesení k 13. červenci 2026, nikoli zatím účinnost změny.', 'Record the order in public memory as dated 13 July 2026, but do not yet record the change as effective.'),
      text('Vyžádat zápis z Konference členů a doklad právní moci nebo aktuální úplný výpis.', 'Obtain the Members Conference minutes and proof of finality or a current complete register extract.'),
      text('Před podpisem či podáním jménem aliance samostatně ověřit oprávnění jednat navenek.', 'Before any signature or filing for the alliance, verify external authority separately.'),
      text('Do nesouvisejících žalob, prezidentské, ministerské ani mediální větve personální změnu nepřenášet.', 'Do not propagate the personnel change into unrelated court, presidential, ministerial, or media branches.')
    ]
  },
  archiveOwnerStatement: {
    label: text('Archivní údaj autora - vyžaduje zápis z Konference členů', 'Archive-owner statement - requires the Members Conference minutes'),
    value: text(
      'Na Konferenci členů dne 21. března 2026 odstoupil z funkce nyní devadesátiletý ekonom Ing. František Dvořák a byla zvolena slovenská novinářka Bc. Patricia Janeková.',
      'At the Members Conference on 21 March 2026, the now 90-year-old economist Ing. František Dvořák resigned and Slovak journalist Bc. Patricia Janeková was elected.'
    ),
    confidence: text('tvrzení autora - samotné usnesení je nedokládá', 'creator-stated - not proved by the order itself')
  },
  facts: [
    {
      claim: text(
        'Usnesení zaznamenává výmaz Ing. Františka Dvořáka a zápis Bc. Patricie Janekové jako osoby zastupující při výkonu funkce v dozorčí radě.',
        'The order records the removal of Ing. František Dvořák and entry of Bc. Patricia Janeková as the person representing in the performance of the supervisory-board function.'
      ),
      citation: text(
        'se vymazává - Dozorčí rada - při výkonu funkce zastupuje Ing. FRANTIŠEK DVOŘÁK / se zapisuje - Dozorčí rada - při výkonu funkce zastupuje Bc. PATRICIA JANEKOVÁ',
        'removed - Supervisory board - represented in the performance of the function by Ing. FRANTIŠEK DVOŘÁK / entered - Supervisory board - represented in the performance of the function by Bc. PATRICIA JANEKOVÁ'
      ),
      confidence: text('vysoká - anonymizovaný výtah z listiny', 'high - anonymized extract from the source document')
    },
    {
      claim: text('Usnesení je datováno 13. července 2026.', 'The order is dated 13 July 2026.'),
      citation: text('Olomouc 13. července 2026', 'Olomouc, 13 July 2026'),
      confidence: text('vysoká - přímý údaj listiny', 'high - direct document statement')
    },
    {
      claim: text(
        'Listina váže den zápisu změny na nabytí právní moci.',
        'The document ties the recording date to the order becoming final.'
      ),
      citation: text(
        'Den zápisu změny: Dnem nabytí právní moci',
        'Date of recording the change: on the date the order becomes final'
      ),
      confidence: text('vysoká - přímý údaj listiny', 'high - direct document statement')
    }
  ],
  doesNotProve: [
    text(
      'Usnesení samo nedokládá, že změna nabyla právní moci nebo byla účinně zapsána již 13. července 2026.',
      'The order alone does not prove that the change became final or was effectively recorded on 13 July 2026.'
    ),
    text(
      'Usnesení samo nedokládá průběh Konference členů dne 21. března 2026, odstoupení ani volbu; k tomu je třeba zápis z konference.',
      'The order alone does not prove what occurred at the Members Conference on 21 March 2026, including the resignation or election; the conference minutes are required.'
    ),
    text(
      'Zápis osoby pro výkon funkce v dozorčí radě neznamená bez dalšího obecné oprávnění zastupovat alianci navenek.',
      'Recording a person for the performance of a supervisory-board function does not by itself establish general authority to represent the alliance externally.'
    ),
    text(
      'Změna v orgánu spolku nic nedokládá o správnosti důkazů, důvodnosti žalob ani pochybení státních orgánů.',
      'The association-governance change proves nothing about the correctness of evidence, merits of the actions, or wrongdoing by public authorities.'
    )
  ],
  relevance: [
    {
      level: 'direct',
      label: text('ČERVENÁ - přímá a blokující kontrola', 'RED - direct and blocking check'),
      targets: text('Časová identita aliance a všech dokumentů po změně', 'Temporal identity of the alliance and every document after the change'),
      reason: text(
        'Systém musí uchovat odděleně datum konference, datum usnesení a dosud neověřený den nabytí právní moci. Jediný nesprávně převzatý den by mohl zpětně označit nesprávnou osobu nebo oprávnění.',
        'The system must keep the conference date, order date, and still-unverified finality date separate. One incorrectly copied date could retroactively assign the wrong person or authority.'
      ),
      action: text(
        'Před každým veřejným nebo právním použitím ověřit zápis z konference a aktuální úplný výpis nebo doložku právní moci. Změnu neuplatňovat zpětně.',
        'Before any public or legal use, verify the conference minutes and a current complete extract or finality endorsement. Do not apply the change retroactively.'
      )
    },
    {
      level: 'direct',
      label: text('ČERVENÁ - kontrola podpisu a oprávnění', 'RED - signature and authority check'),
      targets: text('Podání, smlouvy a veřejná tvrzení činěná jménem aliance', 'Filings, contracts, and public statements made for the alliance'),
      reason: text(
        'Listina popisuje zastupování při výkonu funkce v dozorčí radě, nikoli automaticky obecné zastupování aliance navenek.',
        'The order describes representation in the performance of a supervisory-board function, not automatic general external representation of the alliance.'
      ),
      action: text(
        'Nedovozovat podpisové oprávnění Bc. Patricie Janekové pouze z této listiny; obecné jednání navenek ověřit podle aktuálního výpisu a stanov.',
        'Do not infer Bc. Patricia Janeková’s signing authority from this document alone; verify general external representation against the current register extract and statutes.'
      )
    },
    {
      level: 'supportive',
      label: text('ORANŽOVÁ - omezená relevance', 'AMBER - limited relevance'),
      targets: text('Web projektu, soutěžní údaje a organizační historie', 'Project website, competition information, and organisational history'),
      reason: text(
        'Aktuální veřejné informace o dozorčí radě je vhodné časově opravit, ale bez zveřejnění odstraněných osobních údajů.',
        'Current public information about the supervisory board should be time-corrected without publishing the removed personal data.'
      ),
      action: text(
        'Zveřejnit pouze anonymizovaný výtah a stav ověření; originál ponechat v soukromém archivu.',
        'Publish only the anonymized extract and verification status; keep the original in the private archive.'
      )
    },
    {
      level: 'none',
      label: text('ZELENÁ - pouze evidovat', 'GREEN - record only'),
      targets: text(
        'Věcná správnost zásahových žalob, postoupení KSZ, prezident, ministři, státní zastupitelství a mediální větev',
        'Merits of the intervention actions, the Regional Public Prosecutor referral, President, ministers, public prosecution offices, and media branch'
      ),
      reason: text(
        'Personální změna v orgánu spolku nemění skutkové ani důkazní jádro těchto řízení.',
        'A personnel change in an association body does not alter the factual or evidentiary core of those proceedings.'
      ),
      action: text(
        'Do těchto podání ji nedoplňovat, ledaže bude nutné doložit aktuální zastoupení, podpis nebo procesní oprávnění konkrétního subjektu.',
        'Do not add it to those submissions unless current representation, signature, or procedural authority of a specific entity must be established.'
      )
    }
  ],
  humanChecks: [
    text('Doložit zápis z Konference členů ze dne 21. března 2026.', 'Obtain the Members Conference minutes dated 21 March 2026.'),
    text('Ověřit přesný den nabytí právní moci a účinného zápisu změny.', 'Verify the exact date of finality and effective recording of the change.'),
    text('Ověřit podle aktuálního výpisu a stanov, kdo je oprávněn jednat za alianci navenek.', 'Use the current register extract and statutes to verify who may act externally for the alliance.'),
    text('Potvrdit, že veřejná kopie neobsahuje žádný odstraněný osobní údaj.', 'Confirm that the public copy contains none of the removed personal data.')
  ]
};

export function identifyOrganisationUpdateDigest(digest) {
  if (digest === ORGANISATION_UPDATE_DIGESTS.privateOriginal) return 'private-original';
  if (digest === ORGANISATION_UPDATE_DIGESTS.publicAnonymized) return 'public-anonymized';
  return null;
}

export function localizeOrganisationUpdate(language = 'cs') {
  const lang = language === 'en' ? 'en' : 'cs';
  const localize = (value) => value?.[lang] ?? value;
  return {
    ...ORGANISATION_UPDATE,
    title: localize(ORGANISATION_UPDATE.title),
    source: {
      ...ORGANISATION_UPDATE.source,
      institution: localize(ORGANISATION_UPDATE.source.institution),
      privacy: localize(ORGANISATION_UPDATE.source.privacy)
    },
    comparison: {
      before: {
        ...ORGANISATION_UPDATE.comparison.before,
        label: localize(ORGANISATION_UPDATE.comparison.before.label),
        title: localize(ORGANISATION_UPDATE.comparison.before.title),
        state: localize(ORGANISATION_UPDATE.comparison.before.state)
      },
      after: {
        ...ORGANISATION_UPDATE.comparison.after,
        label: localize(ORGANISATION_UPDATE.comparison.after.label),
        title: localize(ORGANISATION_UPDATE.comparison.after.title),
        state: localize(ORGANISATION_UPDATE.comparison.after.state)
      },
      solution: ORGANISATION_UPDATE.comparison.solution.map(localize)
    },
    archiveOwnerStatement: {
      ...ORGANISATION_UPDATE.archiveOwnerStatement,
      label: localize(ORGANISATION_UPDATE.archiveOwnerStatement.label),
      value: localize(ORGANISATION_UPDATE.archiveOwnerStatement.value),
      confidence: localize(ORGANISATION_UPDATE.archiveOwnerStatement.confidence)
    },
    facts: ORGANISATION_UPDATE.facts.map((item) => ({
      ...item,
      claim: localize(item.claim),
      citation: localize(item.citation),
      confidence: localize(item.confidence)
    })),
    doesNotProve: ORGANISATION_UPDATE.doesNotProve.map(localize),
    relevance: ORGANISATION_UPDATE.relevance.map((item) => ({
      ...item,
      label: localize(item.label),
      targets: localize(item.targets),
      reason: localize(item.reason),
      action: localize(item.action)
    })),
    humanChecks: ORGANISATION_UPDATE.humanChecks.map(localize)
  };
}
