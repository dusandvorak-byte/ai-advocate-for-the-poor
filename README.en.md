# AI Advocate for the Poor

**Creator and project lead: Mgr. Dušan Dvořák**

[Live demonstration](https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/en.html) · [Exact submitted website](https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/archive/submission-2026-07-20/en.html) · [Full Build Week submission](SUBMISSION.md)

## Mission

**AI Advocate turns an overwhelming archive into auditable memory, so a person does not have to be wealthy, healthy, or legally trained to understand their own story. That memory should belong to the person.**

It is for anyone trying to answer four ordinary questions after a death in the family, fire, accident, insurance letter, or interaction with an institution:

- What happened?
- What does the evidence show?
- What remains unknown?
- What must a person check?

The project is practical infrastructure for democracy and mutual support. The extensive Czech cannabis case files are a demanding, tightly bounded stress test—not the service’s subject, political position, or limit of future use.

## What the current prototype does

The bilingual static application processes readable PDF, TXT, Markdown, or pasted text locally in the visitor’s browser. It extracts indicative document type, dates, case references, institutions, amounts, explicit deadline signals, public-memory overlap, and a proposed human review step.

- An unrelated document receives a private **0/9** archive result and never inherits another case’s analysis.
- A weak textual overlap receives at most **1/9** until a person confirms the relationship.
- A small set of reviewed private PDFs is recognized only by an exact full-file SHA-256 fingerprint.
- Only an exact supported input can open a prepared, anonymized, source-bounded result.
- Private originals, addresses, signatures, and unnecessary identifiers are not published.
- The nine-level traffic light expresses evidence-review priority—not guilt, unlawfulness, a deadline, legal entitlement, or likelihood of success.

No model runs inside the current public static application. General semantic analysis, OCR, persistent storage, authentication, voice input, and automated filing remain future work.

## Pre-deadline v3.2 extension

The exact 20 July 2026 submission website is preserved in a dated public archive. Before the hackathon deadline, the live version was extended and clearly labelled as post-submission, pre-deadline development.

The same safety rules were applied to 18 additional private files: 17 distinct byte streams and 15 substantive records across four separate personal and institutional branches. The new interface uses a consistent pattern:

**one sentence → traffic light → next human step → expandable evidence**

Each of four anonymized case rows shows the supplied source inventory, current procedural status, candidate new evidence, and legal review axes. The shared new evidence concerning the absence and lack of unification of a binding THC-measurement procedure receives **9/9 — EXTREME, ON FIRE** in all four cases. The traffic light measures relevance and does not predict the court’s future decision.

The controlled Czech test begins with a creator-confirmed and documented hypothesis:

> Since 1999, Czech courts should have determined criminal liability for cannabis cultivation on the basis of THC content. To this day, the courts have never required a legally binding rule of the police and customs administration showing how their forensic laboratories consistently distinguish lawful cannabis from unlawful cannabis. No such rule exists, and the differences can be tenfold, as documented by the evidence assembled by the creator.

The interface labels this as the creator’s evidence-based thesis and baseline of the controlled test, not a general judicial finding. It assesses the supplied records separately in every file and does not present the traffic light as a guarantee of reopening.

V3.1 adds a direct judicial source. On 29 July 2025, by order ref. **11 To 88/2024-2990**, the High Court in Prague quashed the findings of guilt, the related sentences, and the forfeiture order in the Prague Municipal Court judgment dated 7 May 2024, ref. **45 T 1/2024-2430**, and returned the matter to the Prague Municipal Court for a new hearing and decision under Section 259(1) of the Code of Criminal Procedure. Paragraphs 31–40 separately address lay chemical and biological reasoning, the failure to distinguish lawful from prohibited cannabis, the meaning of a 1.0% THC result, and judicial review of expert evidence; paragraph 41 identifies complete unreviewability as the central ground for quashing. The October 2026 hearing date is displayed separately as creator-confirmed because it is not stated in the order. Neither the private partially anonymized court copy nor the creator’s filing of 28 November 2024 is published.

V3.2 processes five PDFs supplied on 21 July. Three concern events already known to the memory: the police record is an exact duplicate and increases no count; a fifteen-page reopening motion and a forty-nine-page preventive filing upgrade two creator-recorded events to primary-PDF-established content. Two records create new official nodes: Ministry of the Interior response **MV-114818-2/TP-2026** and Brno Regional Public Prosecutor review branch **1 KZT 475/2026-32**. The system does not present the ministry response as a merits assessment or the announced review as its outcome. All five inputs have 9/9 relevance to the live map, but none itself sets a new statutory deadline. Private originals belonging to other people remain outside the public website.

The visible v3.2 output dated 22 July 2026 consists of five public Czech PDFs across four separate cases. The only document actually filed is Mgr. Dušan Dvořák’s complete, non-anonymised motion dated 12 July 2026, published unchanged with his explicit consent and a recorded SHA-256. It is accompanied by a separate unfiled addendum concerning later records, anonymised working drafts for L. CH. and M. K. / J. K., and an anonymised procedural memorandum for G. F. / J. K. The last document is not called a motion to reopen because the available records describe conditional discontinuance rather than conviction and do not establish the original order, finality, or the post-probation outcome. No working output is legal advice, a prediction of success, or ready for filing without review of the complete case file, the affected person, and a qualified lawyer.

See [the exact Devpost update text](DEVPOST_UPDATE_2026-07-21.md).

## Run and test

Node.js 24 or newer is required.

```bash
npx serve web
npm test
```

The application has no production dependencies and requires no API key. The suite contained **188 distinct automated checks at the deadline** and now contains **200**, all passing. At least 1,240 successful individual check executions are documented by complete historical runs; this is a lower bound because the exact lifetime total was not tracked from the beginning. The GitHub Pages workflow runs the checks before publishing only the reviewed `web/` directory.

## How Codex and GPT-5.6 were used

GPT-5.6 helped turn the broader social and evidential problem into a product concept, separate facts, allegations, procedural acts, legal hypotheses, and uncertainty, and design a source-grounded output model.

Codex audited the repository and implemented the bounded document routing, full-file identity checks, rejection of altered inputs, bilingual interface, case and institutional maps, nine-level evidence-priority system, local generic intake, four-case comparison, privacy boundaries, dated submission archive, documentation, GitHub Pages workflow, and automated regression tests. The creator made the key product, evidential, legal-framing, privacy, and publication decisions and remains responsible for the final claims and wording.

Codex and GPT-5.6 do not run at runtime in the public static prototype. Their outputs were reviewed, corrected, and constrained by the creator before publication.

## Safety boundary

This is a demonstration prototype, not legal, medical, or financial advice. It separates direct document statements, creator-confirmed inputs, system interpretation, uncertainty, and the next human check. A possible deadline is never calculated without the triggering event, service date, governing procedure, and complete wording. A qualified person must review the original records before reliance or filing.

## Licence

MIT — see [LICENSE](LICENSE).
