---
title: "Case Study: Designing an AI-Driven Product with Strategic Ownership"
tag: Design
date: 2025-07-03
summary: "When AI generates the content, what does the designer's job become? This case study traces the design process for an AI-driven product — from problem definition through delivery — and examines what strategic ownership looks like when the system generates its own outputs."
---

Designing products where AI generates core outputs presents a set of challenges distinct from conventional product design. The interaction model is different, the error modes are different, the user's mental model is different, and the designer's relationship to the content is fundamentally changed.

This case study traces the design process for an AI-driven product — details generalized for confidentiality — and examines what strategic ownership means when the system is part of the creative process.

## The Problem: Intelligence Without Judgment

The client operated a professional services platform where users needed to produce complex outputs — structured documents, analysis, recommendations — that required both domain knowledge and judgment. The existing process was manual, slow, and inconsistent. The proposed solution was to introduce AI generation of these outputs, with users reviewing, editing, and approving.

The design challenge wasn't "how do we make AI generation work?" — the technical team had a capable model. The design challenge was: how do we design an interface and interaction model such that AI-generated outputs make users more effective, rather than undermining their expertise, creating over-reliance, or producing outputs users can't evaluate?

## Discovery: Understanding the Expert Mental Model

The first phase was deep research with the domain experts who would use the system. This was not generic user research — it was specifically targeted at understanding the expert mental model: how do they evaluate quality in these outputs? What signals tell them something is wrong? What's the distribution of cases from routine to genuinely complex?

Key findings:

**Experts evaluate holistically first, details second.** When reviewing a document, experienced professionals scan for structural correctness and logical coherence before reading carefully. The AI outputs needed to make this high-level evaluation fast and reliable.

**Errors cluster by type.** AI errors in this domain weren't random — they followed predictable patterns. Certain types of reasoning were reliably wrong; certain types of fact retrieval were reliably strong. This asymmetry shaped where the interface needed to direct attention.

**Trust is earned incrementally.** No one was going to trust AI-generated outputs on day one. The system needed to earn trust through demonstrated accuracy, and the interface needed to support the verification behavior that would establish that trust.

**Accountability is non-negotiable.** Users needed to be able to stand behind the outputs they approved. The interface had to make clear that they were reviewing and approving, not rubber-stamping — and had to support the level of review that this accountability required.

## Design Principles from Discovery

The discovery phase produced four design principles:

**Make uncertainty visible.** When the AI is less confident, show it. Don't present all outputs with equal apparent confidence.

**Support the expert's evaluation process, not just the output.** The interface should make it fast to check what experts actually check — not just display what was generated.

**Separate the AI's job from the user's job.** The AI drafts; the user evaluates, edits, and owns. The interaction model must make this distinction clear and feel true, not just nominal.

**Build in checkpoints for complex cases.** The system should be able to flag outputs that exceed its reliable range and escalate to more intensive human review.

## Design Decisions

**Confidence indicators without specificity theater.** Showing a "73% confidence" score would create false precision. Instead, the design used qualitative signals (flagged sections, suggested-review prompts) that communicated uncertainty actionably without false precision.

**Section-level review, not just document-level.** Rather than presenting the full output and asking for approval, the interface broke outputs into evaluable sections with explicit review states. This made thorough review faster and made the user's role explicit.

**Edit-first affordance.** The design made editing easy and prominent — not hiding behind "accept" and "reject" options. This reinforced the mental model that the output was a starting draft, not a final recommendation.

**Audit trail by default.** Every AI-generated output included a transparent record of what the model used as inputs, what version it was, and what changes the user made. This served both accountability and debugging.

## Outcomes and Reflections

Post-launch observation showed users establishing trust incrementally — initially reviewing every section carefully, then calibrating to the sections the AI reliably struggled with. This was the expected pattern, and the interface supported it.

The most important reflection: the design work was primarily about the relationship between the AI system and the human expert, not about the interface in isolation. Getting that relationship right — respecting expert judgment while genuinely augmenting it — was the core design problem. The interface was in service of that relationship.

Strategic ownership in AI-driven product design means owning that relationship: deciding how AI and human expertise should interact, what role each should play, and what the interface must do to keep the human genuinely in control.
