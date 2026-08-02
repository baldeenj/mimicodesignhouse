---
title: 'Pipeline discipline, enforced: how Event Horizon runs the lead pipeline'
tag: Design
date: 2026-07-29T00:00:00.000Z
heroImage: /uploads/Event Horizon Hero Image-selection.jpg
summary: 'Most CRMs treat the pipeline as a whiteboard. A rep drags a deal from “Discovery” to “Proposal” whenever it feels right, and the stage becomes a label rather than a fact. Forecasts inherit that optimism, managers can’t trust the board, and “why did this deal stall?” has no answer. Event Horizon takes the opposite stance: the pipeline is a set of rules the system enforces, not suggestions it displays.'
---

Event Horizon by [Stargazer Dynamics](https://www.stargazer-dynamics.com)

Most CRMs treat the pipeline as a whiteboard. A rep drags a deal from “Discovery” to “Proposal” whenever it feels right, and the stage becomes a label rather than a fact. Forecasts inherit that optimism, managers can’t trust the board, and “why did this deal stall?” has no answer. Event Horizon takes the opposite stance: the pipeline is a set of rules the system enforces, not suggestions it displays.

![](</uploads/Screenshot 2026-07-27 at 4.29.47 PM.png>)

## Quality starts at capture

Event Horizon is contact-first. You can’t create a lead as a floating name and email — every lead is anchored to a real person (an existing contact or one created inline), and its identity is derived from that contact. Duplicate detection flags a new lead only when name, email, and phone all match an existing one, so you catch true duplicates without drowning in false alarms. The result: no phantom leads, no orphaned records, clean data from the first click.

## Qualification is a gate, not a checkbox

A lead can’t advance out of qualification until it genuinely is qualified. That’s enforced in the database by an eight-part check. Until all eight are present, the qualification milestone won’t complete and the deal can’t move forward. This isn’t a reminder a rep can dismiss; it’s a server-side rule that applies no matter how the update is attempted.

## Configurable stages with real entry gates

Each team defines its own pipeline stages, and each stage can carry enforced entry criteria — require an expected close date before “Proposal,” require an estimated value before “Negotiation,” require meeting evidence before “Demo,” require proposal evidence and negotiation notes before “Negotiation.” Try to skip ahead and the system refuses the move, telling you exactly what’s missing (cumulatively, across every stage between here and there). Managers who need to override an unmet gate can, deliberately and on the record — the exception is captured, not hidden.

## The board tells the truth over time

Because every stage change is timestamped and written to a transition history, Event Horizon knows how long a deal has sat in its current stage and when it was last touched. Stages carry a configurable staleness threshold, so pursuits that go quiet surface automatically as “needs attention,” and owners get notified before a deal quietly rots. Closing is structured too: losing a deal captures a reason and competitor; reopening a closed deal is a governed request, not a silent drag back onto the board. Every one of these transitions is auditable.

## Why this beats the typical CRM

* Enforced, not advisory. In most CRMs, stage definitions and validation are optional configuration a rep can route around. In Event Horizon the gates live in the database, so the integrity holds regardless of the UI, the API, or the user.
* Clean data by construction. Contact-first capture and the qualification gate mean the pipeline is built from complete records — so forecasts, conversion metrics, and health scores are trustworthy instead of aspirational.
* Configurable per team, not one-size-fits-all. Stages, entry criteria, and staleness windows are per-team settings, so the discipline matches your motion instead of a vendor’s default.
* Hygiene is built in. Stage-age tracking, automatic stale detection, owner notifications, and full transition history come standard — not as a paid add-on, a custom report, or a Monday-morning spreadsheet.
* Accountable by default. Overrides, losses, and reopens are recorded, so the pipeline is a defensible record of what happened, not a snapshot someone tidied up before the review.

![](</uploads/Event Horizon Pipeline Infographic-selection (1).jpg>)
