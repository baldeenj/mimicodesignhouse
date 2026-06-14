---
title: "Applying the EPIS Framework to Dashboard Design and Implementation"
tag: Design
date: 2025-10-01
summary: "The EPIS framework — Explain, Predict, Inform, Support — provides a principled way to evaluate whether a dashboard is doing the right job. Here's how to apply it in practice, from discovery through delivery."
---

Most dashboards fail not because they lack data, but because they lack purpose. They accumulate metrics without asking what decisions those metrics are meant to support. The result is screens that look impressive in demos but fail to change behavior in practice.

The EPIS framework offers a corrective: a structured way to evaluate whether a dashboard is doing the right kind of work for its users.

## What EPIS Stands For

**Explain:** The dashboard helps users understand what happened and why. It answers retrospective questions: How did last month compare to targets? Which segments drove the change? What caused the anomaly on Tuesday?

**Predict:** The dashboard helps users anticipate what will happen. It surfaces leading indicators, forecasts, and early warnings before problems become crises.

**Inform:** The dashboard provides context that makes numbers meaningful. A 12% conversion rate means nothing without knowing whether the industry average is 8% or 18%, or whether it was 15% last quarter.

**Support:** The dashboard facilitates the decision or action that results from the analysis. This might mean surfacing recommended next steps, highlighting which items need attention, or enabling actions directly within the dashboard interface.

## Diagnosing Dashboard Problems with EPIS

The framework is most useful as a diagnostic tool. When a dashboard isn't working, EPIS helps identify where the gap lies:

- **All Explain, no Support:** Users understand what happened but don't know what to do about it. The dashboard generates analysis paralysis rather than action.
- **All Predict, no Inform:** Forecasts appear without context. Users don't know whether a predicted outcome is good, bad, or expected.
- **Heavy Inform, weak Explain:** Users have benchmarks and comparisons but can't trace performance to its causes.
- **Missing Predict entirely:** The dashboard is entirely retrospective, useful only for reporting rather than decision-making.

## Applying EPIS in Discovery

In discovery sessions, EPIS provides a vocabulary for surfacing user needs that users themselves often can't articulate directly.

Ask: "When you look at this metric, what question are you trying to answer?" Map responses to EPIS categories. Patterns emerge: a sales team might need strong Explain and Support functions; a planning team might prioritize Predict; a regulatory reporting team might be Inform-heavy.

Ask: "After you see this number, what do you do next?" This reveals the Support dimension — whether the dashboard connects to action, or stops at observation.

Ask: "What would make you confident this number is meaningful?" This surfaces Inform needs — what context is required for the metric to drive decisions.

## Applying EPIS in Design

Once you understand which EPIS functions a dashboard needs to serve, design follows:

**Layout:** Lead with the function that drives the most critical decisions. If users need to know what requires attention today (Support), that should be above the fold — not buried beneath explanatory charts.

**Metric selection:** Every metric should serve at least one EPIS function clearly. Metrics that don't Explain, Predict, Inform, or Support anything belong off the dashboard.

**Temporal scope:** Explain functions typically require historical views; Predict functions require forward views; Inform functions often require comparison views. Design the time controls to serve all required functions.

**Actions and integrations:** Support functions often require that the dashboard connect to downstream systems — a task management tool, an alerting system, a workflow platform. Design these integrations as features, not afterthoughts.

## EPIS in Implementation and Iteration

During implementation, EPIS provides a shared language for evaluating whether in-progress design decisions are serving the right purpose. When a stakeholder requests an additional chart, ask which EPIS function it serves. When a feature is cut for time, identify which EPIS function is affected and whether the gap is acceptable.

Post-launch, EPIS guides evaluation. If users return to the dashboard but don't take actions after viewing it, the Support function may be weak. If users frequently call for explanation of what they're seeing, the Explain function may be insufficient.

A well-executed EPIS-grounded dashboard doesn't just display data — it changes what decisions get made.
