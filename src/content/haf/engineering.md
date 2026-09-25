# HAF Advocacy Session v0.1

**Status:** Proposed

## Overview

The Human Advocacy Framework (HAF) explores how an AI agent might act as an advocate for a human person in digital environments.

The HAF Design Foundations establish the principles the system is intended to preserve. The Advocacy Scenarios apply those principles to concrete situations and derive a set of cross-scenario requirements (R1–R15).

This document proposes a small web application intended to test some of those requirements in software.

v0.1 is not intended to implement the complete Human Advocacy Framework. It implements one advocacy workflow so that the assumptions behind HAF can be tested.

## Reference Scenario

v0.1 will use the **AI News Fear** scenario.

A person encounters repeated claims about AI-driven unemployment, AGI, human extinction, resource consumption, or rapid capability growth and asks:

> Help me gain perspective on this.

Rather than deciding whether the person should be optimistic, skeptical, afraid, or reassured, HAF should help them understand:

* what is actually being claimed;  
* what evidence supports the claims;  
* what is known versus inferred or predicted;  
* what assumptions predictions depend upon;  
* what remains uncertain;  
* what relevant incentives or interests exist;  
* what alternative explanations exist;  
* and what remains for the person to judge.

## Goals

v0.1 should:

1. Allow a person to submit a question, claim, URL, or piece of text.  
2. Gather external evidence relevant to the question.  
3. Preserve the provenance of that evidence.  
4. Distinguish evidence, fact, inference, prediction, opinion, and uncertainty where materially relevant.  
5. Avoid using personal context that is unnecessary for the advocacy event.  
6. Keep consequential judgment with the person.  
7. Allow the person to inspect the evidence supporting important claims.  
8. Allow the person to challenge or continue investigating the response.  
9. Keep HAF's constitution and context independent from a particular foundation model.  
10. Test which HAF requirements can be implemented through conventional software architecture and which depend upon model behavior.

## Non-Goals

v0.1 will not:

* train or fine-tune a foundation model;  
* build a custom LLM;  
* implement federation;  
* implement community governance;  
* integrate with email, banking, health records, or social media;  
* perform continuous monitoring;  
* autonomously act on behalf of the person;  
* implement persistent personal profiling;  
* solve AI alignment;  
* implement the complete HAF framework.

## Requirements

The Advocacy Scenarios produced fifteen cross-scenario requirements:

* **R1 — Human Judgment**  
* **R2 — Epistemic Integrity**  
* **R3 — Minimum Necessary Context**  
* **R4 — Explicit Authority**  
* **R5 — Provenance**  
* **R6 — Contestability**  
* **R7 — Capacity Building**  
* **R8 — Non-Manipulation**  
* **R9 — Context Separation**  
* **R10 — Constitutional Enforcement**  
* **R11 — Proportionality**  
* **R12 — Relationship Preservation**  
* **R13 — Independence From Desired Emotional Outcome**  
* **R14 — Encountering Disagreement**  
* **R15 — No Automatic Inference of Intent**

The full definitions and the scenarios from which they were derived are documented in the HAF Advocacy Scenarios.

v0.1 will primarily investigate R1–R6, R8, R10, R13, and R15.

## Proposed User Experience

The initial application can be deliberately simple.

The person is presented with:

> **What would you like help understanding?**

They submit text or a URL.

HAF returns an analysis organized around questions such as:

* What is being claimed?  
* What evidence supports it?  
* What appears established?  
* What is inferred?  
* What is predicted?  
* What assumptions does the prediction require?  
* What remains uncertain?  
* What relevant incentives or interests exist?  
* What alternative explanations exist?  
* What questions remain unresolved?

Sources should be visible and inspectable.

The person may then continue the investigation or challenge HAF's analysis.

## Proposed Architecture

v0.1 is primarily a conventional full-stack web application with a foundation model and evidence retrieval as dependencies.
```text
┌─────────────────────┐
│       Person        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Next.js UI     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────┐
│   Advocacy Session Service  │
└──────────────┬──────────────┘
               │
       ┌───────┼────────┐
       │       │        │
       ▼       ▼        ▼
    Context  Evidence  HAF
    Boundary Service   Constitution
       │       │        │
       └───────┼────────┘
               │
               ▼
       ┌───────────────┐
       │ Model Adapter │
       └───────┬───────┘
               │
               ▼
        Foundation Model
               │
               ▼
       Advocacy Response
               │
               ▼
             Person
```
The component boundaries are hypotheses rather than finalized architecture.

## Request Flow

A successful advocacy event could operate approximately as follows:

```text
Person submits question / text / URL
               │
               ▼
      Create advocacy session
               │
               ▼
      Establish session purpose
               │
               ▼
     Retrieve external evidence
               │
               ▼
     Preserve source provenance
               │
               ▼
      Construct bounded context
               │
               ▼
       Invoke foundation model
               │
               ▼
      Produce draft analysis
               │
               ▼
         Evaluate response
               │
               ▼
    Present response + evidence
               │
               ▼
Person inspects / challenges / continues
```
Exactly which stages require an LLM and which should be implemented with deterministic application logic remains an open engineering question.

## Context Boundary

One hypothesis HAF will test is that access to personal context should be controlled outside the foundation model.

For example, a model might determine that knowing a person's employment situation would help answer a question about AI job displacement.

That does not give the model authority to retrieve that information.

Conceptually:

```text
Model requests context
        │
        ▼
Context Boundary
        │
        ├── Is it relevant to this purpose?
        │
        ├── Has the person authorized it?
        │
        └── If not, request permission
```
The model's ability to request information is therefore distinct from its authority to receive information.

v0.1 may begin even more simply by using only context explicitly supplied during the current session.

## Evidence and Provenance

External evidence should retain information about its source rather than becoming undifferentiated text inside a model prompt.

A possible representation is:

```ts
interface Evidence {
  id: string;
  sourceUrl: string;
  title?: string;
  retrievedAt: string;
  content: string;
}
```

Generated claims may reference supporting evidence:

```ts
type ClaimType =
  | "fact"
  | "inference"
  | "prediction"
  | "opinion"
  | "possibility";

interface Claim {
  text: string;
  type: ClaimType;
  evidenceIds: string[];
}
```

These structures are illustrative. An important question for the prototype is whether current models can reliably produce and maintain these distinctions.

## Model Boundary

The foundation model should be treated as a dependency of HAF rather than the source of HAF's constitutional authority.

Conceptually:

```ts
interface ModelAdapter {
  generate(request: ModelRequest): Promise<ModelResponse>;
}
```

This does not assume that models are behaviorally interchangeable.

Different models may have substantially different capabilities and learned behavior.

The narrower goal is that HAF's constitution, evidence, permissions, and user context should not be inseparably owned by a particular foundation model.

## Constitutional Enforcement

An important question for v0.1 is which requirements can be enforced outside the model.

For example:

```text
MODEL INSTRUCTION

"Do not access personal information without permission."

                 vs.

APPLICATION BOUNDARY

Unauthorized personal information is never

provided to the model.
```

The second provides a software-enforced guarantee that does not depend upon the model following an instruction.

Other requirements are substantially harder.

For example:

* avoiding subtle manipulation;  
* appropriately representing uncertainty;  
* recognizing unsupported inference;  
* avoiding confirmation bias.

The prototype should help identify where conventional software boundaries are sufficient and where model behavior or model evaluation becomes necessary.

## LLM / ML Open Questions

I am approaching HAF primarily from the perspective of a full-stack/product engineer rather than an ML researcher.

The following are therefore intentionally open engineering questions:

### Model behavior vs application behavior

Which HAF requirements should be implemented through:

* application code,  
* model instructions,  
* structured outputs,  
* retrieval,  
* model evaluation,  
* or model-level techniques?

### Provenance

How reliably can a generated claim be associated with the evidence that actually supports it?

How should HAF detect a citation that does not support the generated claim?

### Epistemic classification

Can a model reliably distinguish:

* fact,  
* inference,  
* prediction,  
* opinion,  
* possibility,  
* and claims about intent?

Should those classifications be generated by the same model or independently evaluated?

### Hallucination

Which hallucination risks matter most for an advocacy system?

When should HAF decline to make a claim because sufficient evidence is unavailable?

### Evaluation

How should HAF test behaviors such as:

* confirmation bias;  
* unsupported attribution of intent;  
* inappropriate certainty;  
* emotional steering;  
* paternalism;  
* source misrepresentation;  
* substitution of model judgment for human judgment?

### Model replaceability

What makes a model sufficiently compatible with HAF?

Could the same advocacy scenarios and evaluation suite be run against multiple models to measure behavioral differences?

### Model-level customization

Can HAF accomplish its goals using external context, retrieval, application boundaries, and evaluation?

Or do some requirements eventually require fine-tuning or other model-level techniques?

v0.1 assumes no custom model training. That assumption should be tested rather than treated as settled.

## Failure Modes

The initial prototype should pay particular attention to:

* confirmation bias;  
* false certainty;  
* unsupported attribution of intent;  
* citation/source mismatch;  
* unnecessary personal context;  
* information overload;  
* predetermined emotional outcomes;  
* paternalism;  
* dependency;  
* substitution of model judgment for human judgment.

A technically successful response that exhibits these behaviors may still constitute a failed advocacy event.

## Evaluation

The primary measure of success is not whether HAF produces the "correct answer."

Instead:

* Did the person retain the consequential judgment?  
* Were important factual claims supported?  
* Could the evidence be inspected?  
* Were inference and prediction distinguished from established facts?  
* Was uncertainty represented?  
* Were incentives distinguished from intent?  
* Was unnecessary personal context excluded?  
* Could the person challenge the analysis?  
* Were meaningful alternative explanations represented?  
* Did the interaction increase the person's capacity to understand the issue?

## Future Work

Potential future work includes:

* persistent personal context;  
* interpretive context;  
* community context;  
* federation;  
* portable identity and context;  
* multiple-model evaluation;  
* local models;  
* governance;  
* delegated actions;  
* longitudinal observation.

These are intentionally outside the v0.1 implementation boundary.

## v0.1 Implementation Boundary

The smallest useful experiment is:

```text
Person
   │
   │ question / text / URL
   ▼
Next.js Application
   │
   ├── retrieve evidence
   ├── retain provenance
   ├── apply HAF constraints
   │
   ▼
Foundation Model
   │
   ▼
Structured Advocacy Response
   │
   ├── evidence
   ├── inference
   ├── predictions
   ├── uncertainty
   └── unresolved questions
   │
   ▼
Person
```

The purpose of this prototype is not to demonstrate that HAF is a finished solution.

It is to answer a smaller engineering question:

> **Can a conventional web application place meaningful architectural boundaries around a foundation model such that the resulting system behaves more like an advocate for human judgment than a general-purpose assistant?**

The results of that experiment should determine what needs to be designed next.
