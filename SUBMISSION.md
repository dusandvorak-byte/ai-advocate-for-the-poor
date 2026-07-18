# AI Advocate for the Poor — OpenAI Build Week submission draft

**Creator and project lead: Mgr. Dušan Dvořák**

## One-line pitch

AI Advocate for the Poor turns fragmented legal materials from people with limited money, health, or support into an auditable case map, helping them reach a state where a lawyer, legal-aid organization, ombudsperson, or public authority can actually assist.

## The problem

A person may have a legitimate claim and important evidence yet still fail because they lack the money, health, time, or professional capacity to organize hundreds of documents, events, people, institutions, case references, and deadlines. Institutions have structured files and professional staff. A disadvantaged person often arrives with an unmanageable pile of material.

## The solution

The project is building a long-term, source-grounded memory for a legal case. Its first public stage:

- maps multiple text documents locally without uploading them;
- identifies documents, case references, dates, and factual or procedural branches;
- provides a one-click fictional demo case with no personal data;
- separates extracted facts, legal interpretation, uncertainty, and recommended next steps for one anonymized supported sample;
- displays an exact source quotation with every conclusion;
- refuses to transfer the prepared interpretation to altered, unrelated, or multi-document inputs.

## What makes it different

This is not another chatbot designed to answer a legal question confidently. It is designed to give a person memory, structure, and the ability to act. Every conclusion should remain traceable to a source, every uncertainty should remain visible, and every proposed action should require human review.

## How Codex and GPT-5.6 were used

GPT-5.6 helped translate a broad social and legal problem into a clear product concept, examine likely confusions between facts, allegations, procedural actions, and legal conclusions, and design a source-grounded output structure. Codex audited the repository and implemented the input boundary, local case mapping, interface, adversarial regression tests, documentation, and restricted GitHub Pages deployment.

No model runs inside the current static demo. That is a deliberate first-stage boundary: prepared conclusions must not leak onto unsupported documents. A later stage will place GPT-5.6 behind input validation, quotation checks, a strict output schema, and human review.

## Safety is part of the product

The prototype clearly states that it is neither legal advice nor a universal legal AI. It verifies the complete identity of the one supported document before showing its prepared interpretation. A procedural referral is never presented as confirmation of wrongdoing. Multi-document mode produces an orientation map only and can never receive the prepared legal interpretation.

## Current limitations

The public version accepts text and supports one verified sample. It does not yet include OCR, a database, authentication, general legal analysis, or document drafting. These are planned capabilities, not claims about the current build.

## Links

- Live demo: https://dusandvorak-byte.github.io/ai-advocate-for-the-poor/
- Source code: https://github.com/dusandvorak-byte/ai-advocate-for-the-poor

## 90-second demo video script

1. **0–15 seconds — problem:** Show fragmented legal materials and explain the information imbalance between an institution and a person without resources.
2. **15–35 seconds — case map:** Click “Načíst fiktivní demonstrační případ” and “Vytvořit mapu případu.” Show the three documents, branches, references, and dates.
3. **35–55 seconds — safety boundary:** Point out that the map does not decide legality or select a remedy, and that multi-document mode receives no prepared legal interpretation.
4. **55–75 seconds — grounded analysis:** Load the standalone KSZ Ostrava sample. Show the four separate output groups and their exact quotations.
5. **75–90 seconds — impact:** Close with: “We do not want to replace a lawyer. We want to help a disadvantaged person reach the point where a lawyer can actually help.”
