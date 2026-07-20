# AI Advocate for the Poor

**Auditable memory for people facing documents, institutions and serious life events without a professional apparatus.**

[Live demo](https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/) · [2:57 demo video](https://www.youtube.com/watch?v=6OXuZ1nMcBA) · [Full English submission story](SUBMISSION.md) · [Czech reference version](SUBMISSION.cs.md)

Creator and project lead: **Mgr. Dušan Dvořák** — special educator, addiction specialist, and group and family therapist.

## Why it exists

An official letter arrives and you do not understand its references or whether a deadline is running. A house burns down and the police, fire service and insurer each hold only part of the record. A relative dies and a family scattered across countries needs to reconnect photographs, records and memories. An accident leaves reports, expert opinions and changing statements.

In each situation, the person needs four answers:

1. What happened?
2. What does the evidence show?
3. What remains unknown?
4. What must a person check?

AI Advocate for the Poor is designed to keep facts, evidence and their relationships connected without turning allegations, procedural events or model inferences into proven facts.

The prototype grew from a real archive of criminal, administrative, constitutional and European proceedings concerning cannabis research, cultivation and medical use. That case is the living test bench, not the limit of the product. The same method can support families, advice centres, nonprofit organisations, investigators, insurers and people responding to fire, flood, conflict or another crisis.

## What works now

The public build is a **bounded demonstration prototype, not legal advice and not a universal legal AI**.

It currently provides:

- a Czech and English public interface;
- an anonymised institutional map and public living-memory case study;
- a controlled internal test in which one new public-prosecution notice updates an already populated archive;
- a visible before/after comparison and document-specific relevance routing;
- separation of facts, source quotations, interpretation, uncertainty and proposed human review;
- exact recognition of one versioned court PDF and its public anonymised derivative using SHA-256;
- local browser processing: selected files are not uploaded and disappear on refresh;
- safe rejection of unknown or materially altered PDFs;
- three creator-approved sent outputs and one anonymised evidentiary derivative with recorded SHA-256 provenance;
- 54 automated safety and regression tests.

The internal test correctly treats the notice of the Regional Public Prosecutor’s Office in Ostrava as a procedural referral to the District Public Prosecutor’s Office in Frýdek-Místek. It creates a new open branch but does **not** present the referral as confirmation of wrongdoing. It also separates issue and receipt dates and never invents a statutory deadline from a voluntary monitoring checkpoint.

The outside-input test accepts only the exact supported PDF or its exact anonymised derivative. It separates court-supported facts from the archive owner’s statement, blocks unsupported conclusions about finality or signing authority and publishes no unnecessary third-party personal data.

## Try the working demo

Open the [English interface](https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/en.html).

1. Select **Run the new-document test** to add the referral notice to the prepared archive.
2. Compare the memory before and after insertion, including the new procedural branch and relevance traffic light.
3. Review **What the document proves**, **What it does not prove**, the integrity warning and the proposed human checks.
4. In the outside-input section, select **Load the public anonymized PDF copy** and then **Analyze locally**.
5. Observe that the exact supported document receives the bounded analysis, while an unknown or altered PDF receives no prepared legal interpretation.

The public buttons provide the controlled sample data required for judging. No account, API key or private document is needed.

## Safety contract

The implementation and documentation follow these rules:

- prepared interpretation applies only to explicitly supported, exact inputs;
- a filename, title, issuer, date, reference number or selected phrase is not sufficient document identity;
- unrelated, incomplete, embedded or materially altered inputs are rejected;
- every displayed factual conclusion contains an exact quotation from its source;
- facts, interpretation, uncertainty and next steps remain visibly separate;
- a referral, forwarding, review or investigation is never treated as proof of wrongdoing;
- generic multi-document mapping cannot inherit the prepared legal interpretation;
- human technical and legal review is required before relying on any output.

## Current limitations

The repository does not yet contain general PDF/DOCX analysis, OCR, a production database, authentication, access control, an audit-log service, universal legal analysis, voice input, a cross-border advisory network, legislator matching or automated filing. These are proposed development tracks, not claims about the current public build.

Codex and GPT-5.6 were used during development. They do not run inside the current static GitHub Pages deployment and do not generate live legal conclusions for visitors.

## Local setup

Requirements: Node.js 20 or later. The application has no production dependencies and needs no API key.

```bash
git clone https://github.com/dusandvorak-byte/ai-advocate-for-the-poor.git
cd ai-advocate-for-the-poor
npm test
npx serve web
```

Then open the local address printed by `serve`. The static app can also be served by any basic HTTP server from the `web/` directory.

## Tests

```bash
npm test
```

The 54 automated checks cover, among other things:

- exact supported-input identity;
- empty, unrelated, incomplete, altered and embedded-input rejection;
- source quotations for displayed conclusions;
- preservation of the referral-versus-wrongdoing distinction;
- no prepared interpretation in generic multi-document mode;
- correct Czech public-prosecution terminology;
- Czech/English interface parity;
- anonymisation and exclusion of known removed personal data;
- provenance and SHA-256 identity of the four published PDFs;
- deployment of only the reviewed `web/` directory.

## Repository structure

```text
web/                         reviewed static application deployed to GitHub Pages
  index.html                 Czech interface
  en.html                    English interface
  app.js                     rendering and interaction
  analyzer.js                exact supported referral analysis
  archive-update.js          internal before/after archive test
  organisation-update.js     exact outside-PDF test and relevance routing
  case-map.js                institutional map and timeline
  case-memory.js             public living-memory evidence register
  documents/                 approved public outputs and anonymised derivative
test/                        safety, adversarial and deployment regression tests
tools/                       deterministic builders for reviewed public derivatives
SUBMISSION.md                complete English project story
SUBMISSION.cs.md             complete Czech reference story
```

## Deployment and privacy

The GitHub Actions workflow runs the test suite before deployment and publishes only `web/`. Source samples, tests, tools and the repository root are not deployed as the website.

The three sent PDFs are published in the form approved by their author. The separate organisational record is available only as an anonymised derivative. Its private original is not published. The derivative excludes dates of birth, national identification numbers, home addresses, signatures, court-staff names and unnecessary identifiers of other entities.

## How Codex and GPT-5.6 were used

The underlying archive method had been explored since 20 April 2026, before the competition rules were known. From 17 to 20 July 2026, more than 50 hours of human work went into the competition-specific public prototype, testing, documentation, deployment and demonstration video, with the dated commit history identifying the new work.

**GPT-5.6** helped turn the broader social and legal problem into a product concept, distinguish facts, allegations, procedural steps and legal conclusions, and design a source-grounded output structure.

**Codex** audited the repository and implemented the bounded analyzers, safe refusal paths, institutional map, bilingual interface, before/after tests, public-document provenance, 54 automated checks, documentation and limited GitHub Pages deployment. The creator selected the evidence, corrected facts, approved public materials and retained responsibility for final wording and submission.

## OpenAI Build Week

- Track: **Apps for Your Life**
- Demo video: [YouTube — 2:57](https://www.youtube.com/watch?v=6OXuZ1nMcBA)
- Live project: [GitHub Pages](https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/)
- English project story: [SUBMISSION.md](SUBMISSION.md)
- Czech reference version: [SUBMISSION.cs.md](SUBMISSION.cs.md)

The required `/feedback` Codex Session ID is supplied in the Devpost submission form rather than published in this repository.

## License

[MIT](LICENSE)
