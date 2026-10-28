# HAF Interaction and Session Architecture

**Status:** Complete

## Overview

The initial HAF prototype explored whether the Human Advocacy Framework's requirements could meaningfully constrain and guide a foundation model during an advocacy event.

Experiments with concrete scenarios exposed a distinction that the initial architecture did not adequately represent: **deliberating about an advocacy situation and interacting with the person are not necessarily the same responsibility.**

A system may need substantial internal reasoning in order to understand a person's situation, relevant evidence, uncertainty, competing considerations, and the requirements of HAF. That does not mean all of that reasoning should be presented to the person at once.

In several experiments, HAF produced responses that were substantively thoughtful and individually defensible under many requirements, but that performed too much of the deliberative process before returning the interaction to the person.

This raises a new engineering question:

> **How should HAF maintain an advocacy session in which rich internal deliberation informs a proportionate interaction with the person over time?**

This document investigates that question.

It does not assume that the solution requires a particular agent, pipeline, context-selection mechanism, or persistence model. Those boundaries should emerge from the responsibilities the system needs to fulfill.

## Motivation

The initial experimental flow can be represented approximately as:

```text
Human request
      ↓
Requirement Guidance
      ↓
Guidance Validation
      ↓
Deliberation
      ↓
Deliberation Validation
      ↓
Response to person
```

This architecture is useful for examining how HAF's requirements affect model reasoning.

However, it implicitly encourages a complete-response model of advocacy:

```text
understand the situation
        ↓
perform deliberation
        ↓
produce the answer
        ↓
return control to the person
```

Experiments involving AI news, health information, and civic deliberation exposed a recurring problem with this assumption.

The person may not need a complete analysis yet.

They may instead need:

* one clarifying question;
* one important distinction;
* one piece of evidence;
* a challenge to an assumption;
* an opportunity to articulate what matters to them;
* or simply another turn in the conversation.

This suggests an important distinction:

> **Depth of advocate understanding is not the same thing as length of advocate utterance.**

The system may therefore need to preserve rich deliberation while exposing only what is useful for the present interaction.

## Problem Statement

HAF is intended to facilitate human agency rather than replace it.

A system that produces comprehensive, accurate, well-organized answers can still undermine that objective if it routinely performs deliberation that could appropriately remain with the person.

At the same time, artificially withholding useful reasoning or forcing every interaction into a sequence of questions would create a different failure mode. Human advocacy can legitimately include explanation, teaching, persuasion, challenge, calculation, recommendation, and direct answers.

The engineering problem is therefore not simply to make HAF respond less.

It is to determine how HAF can decide **what act of advocacy is appropriate now**, while maintaining enough understanding of the broader advocacy event to make that decision responsibly.

This introduces several related problems:

* how an advocacy event persists across multiple human turns;
* what HAF should understand internally versus communicate externally;
* what information a particular model invocation needs;
* what deliberative information should persist between turns;
* how model-generated interpretation retains its epistemic status and provenance;
* when additional context should be requested;
* when HAF should explain rather than ask;
* and how the person can inspect, challenge, or redirect the ongoing deliberation.

These problems concern not merely conversation management but the preservation of human agency across an ongoing advocacy relationship.

## Initial Design Principle

The experimental findings suggest an initial principle for this engineering review:

> **Every HAF requirement may participate in deliberation without every resulting consideration needing to appear in the current interaction.**

This separates two questions that the initial prototype tended to combine:

```text
What should HAF consider?
          │
          ▼
What should HAF understand?

          ≠

What should HAF say or do now?
```

The first concerns the adequacy of HAF's deliberation.

The second concerns its interaction with the person.

Neither can be reduced to the other.

A short interaction should not imply shallow deliberation.

A deep deliberation should not require a long response.

## Embodiment and the Limits of Artificial Understanding

HAF currently represents much of what it knows about a person through information such as their goals, values, circumstances, history, statements, and ongoing session state.

This representation is necessarily incomplete.

A human person is embodied. Human beings learn about the world through their senses and communicate with one another not only through propositions but through embodied expression. Human attention, emotion, fatigue, physical presence, relationships, and circumstances can all participate in how something is understood and communicated.

This raises an important question for an advocacy system whose interaction with a person is mediated through digital information.

Additional data about a person does not necessarily amount to fuller understanding of the person. A system might receive text, images, voice, behavioral signals, or physiological measurements while still encountering the person's embodied experience only indirectly.

This may place important epistemic limits on HAF. For example, the system should distinguish what a person has expressed from what HAF has observed and from what HAF infers about the person's interior experience.

It may also affect the design of interaction itself. A person's need at a particular moment may depend upon realities that are only partially represented in the model's available context. HAF should therefore be cautious about assuming that sufficiently rich digital context makes the person fully legible to the system.

This consideration may eventually have implications for epistemic integrity, minimum necessary context, proportionality, relationship preservation, and the design of the interaction layer.

Whether embodiment should be represented more explicitly in HAF's Design Foundations remains an open question.

## Responsibilities of an Advocacy Session

The initial HAF prototype treated an advocacy event primarily as a request that eventually produced a response.

An ongoing advocacy session introduces a different responsibility. HAF may need to interact with the person over multiple turns before substantial analysis, explanation, or recommendation is appropriate.

The purpose of this interaction is not merely to collect enough information to generate a more complete answer. The interaction itself can be part of the advocacy.

An insightful question may help the person recognize something they had not considered. A distinction may help them think more clearly. In other circumstances, the person may benefit from being walked through a problem step by step. At other times, a direct explanation or recommendation may be appropriate.

HAF should therefore determine an appropriate **next act of advocacy** from its current understanding of the person and situation.

Conceptually:

```text
Current advocacy context
        ↓
Determine next act of advocacy
        ↓
Interact with the person
        ↓
Person responds
        ↓
Advocacy context changes
        ↓
Determine next act of advocacy
        ↓
...
```

The person's response becomes part of the ongoing advocacy session and may change what HAF understands, what remains uncertain, and what kind of advocacy is appropriate next.

This creates a feedback loop rather than a single request-response pipeline.

### Returning the Interaction to the Person

A complete internal analysis does not imply that HAF should communicate that analysis all at once.

HAF should return the interaction to the person when further human participation would better facilitate the person's agency than continuing the deliberative process on their behalf.

For example, rich internal deliberation might result in:

```text
deliberation → one probing question
```

or:

```text
deliberation → one useful distinction
```

or:

```text
deliberation → step → human response → next step
```

In other circumstances:

```text
deliberation → substantial explanation
```

The objective is therefore not to minimize the amount HAF says, nor to make HAF consistently Socratic. Questioning, explaining, challenging, teaching, recommending, and walking through a problem can all be legitimate acts of advocacy.

The engineering problem is to enable HAF to determine which act is appropriate **at this point in the advocacy session**.

### Open Question: What Must Persist?

If each human interaction can change the advocacy situation, HAF needs some representation of what has occurred and what it currently understands.

The next design question is therefore:

> **What information must persist across an advocacy session for HAF to determine the next act of advocacy responsibly?**

This question should be answered before deciding how that information is stored, summarized, selected for model context, or divided among architectural components.

### Persistence Is Not Model Context

An advocacy session may accumulate substantially more information than any individual model invocation needs.

HAF may need to preserve information such as:

* Foundations, Principles, and Requirements;
* human input;
* available input from the person's environment;
* HAF's interactions with the person;
* deliberative artifacts;
* evidence and provenance;
* uncertainties, disagreements, and unresolved questions.

Preserving this information does not imply that all of it should be supplied to every model invocation.

This distinction is important:

> **Information can belong to the advocacy session without belonging to the active model context.**

The complete session record may be valuable for continuity, provenance, contestability, evaluation, and later deliberation. A particular responsibility within HAF may require only a subset of that record.

This suggests at least three conceptually different forms of information:

**Constitutional Context** contains HAF's Foundations, Principles, and Requirements.

**Deliberative Record** preserves reasoning artifacts produced during the advocacy session, including interpretations, evidence analysis, uncertainty, disagreement, and unresolved questions.

**Active Advocacy Context** contains the information necessary for a particular act of deliberation or interaction at a particular point in the session.

These are conceptual distinctions rather than proposed software components.

### Context Growth and Interaction Latency

An ongoing advocacy session creates two related engineering pressures.

First, the amount of persisted information can grow continuously. Repeatedly supplying the entire session history to foundation models would cause active model contexts to grow with the length of the interaction.

Second, HAF's internal deliberative process may itself be expensive in time. A system that performs comprehensive requirement analysis, validation, deliberation, and validation before every small interaction could create unacceptable latency even when the resulting act of advocacy is only a short question.

HAF should therefore avoid assuming either that:

```text
persisted session state = active model context
```

or that:

```text
new human turn = complete re-deliberation of the entire session
```

How HAF selects, summarizes, retrieves, or reconstructs relevant context remains an open design problem.

Likewise, this document does not yet determine when previous deliberation can be reused, when new deliberation is necessary, or how much deliberation must occur before HAF can perform the next act of advocacy.

These decisions should preserve HAF's constitutional responsibilities without making comprehensive reprocessing of the entire advocacy history the default architecture.

### Open Questions

The session architecture must eventually determine:

* what information is preserved verbatim;
* what information can be represented as derived session state;
* how human statements are distinguished from model-generated interpretations;
* how environmental observations are distinguished from inferences about those observations;
* what previous deliberation remains authoritative enough to reuse;
* what information is supplied to each model invocation;
* when additional deliberation is necessary;
* and how context can be reduced without silently changing the meaning of the person's circumstances, values, or uncertainty.

The immediate question is not yet how to optimize token usage.

It is:

> **What information does HAF need to preserve faithfully, even when that information is not presently in a model's context window?**

#### Human and Environmental Context

An advocacy session may receive information both directly from the person and from the environment in which advocacy occurs.

**Human input** includes information the person intentionally communicates to HAF during the advocacy session.

**Human environment input** may include information HAF is authorized to encounter from the person's digital, physical, or community environment. Examples might include visited-site HTML, images appearing in a scrolled feed, video transcripts, screenshot captures, local air quality, weather and season, or shared community context concerning a street, neighborhood, town, or city.

Environmental input should not automatically be treated as information about the person's interior state.

For example:

```text
Person was exposed to an image
        ≠
Person attended to the image
        ≠
Person understood the image
        ≠
Person believed its claims
        ≠
Person was emotionally affected by it
```

HAF may sometimes have reasonable grounds for making such inferences, but the inference should remain distinguishable from the observation from which it was derived.

Likewise, information about the person's environment is not necessarily personal information about the person. Understanding a local election, air-quality event, weather condition, neighborhood development proposal, or other shared circumstance may be necessary for advocacy without requiring HAF to acquire additional personal information.

The session architecture should therefore preserve meaningful distinctions between what the person has communicated, what HAF has observed or retrieved from the person's environment, and what HAF has inferred from those sources.

## Advocacy Session Information Model

An Advocacy Session is not merely a conversation transcript.

It is an evolving record of the advocacy relationship between the person and HAF. During that relationship, the person may communicate new information, clarify or correct previous information, articulate goals and concerns, respond to HAF's questions, and revise their understanding of the situation.

HAF may also receive authorized information from the person's environment, retrieve external evidence, develop interpretations and inferences, identify uncertainty, conduct internal deliberation, and communicate with the person.

These forms of information should not be collapsed into an undifferentiated session summary.

The session should preserve meaningful distinctions in at least:

* **source** — where the information came from;
* **epistemic status** — whether something was stated, observed, retrieved, inferred, interpreted, or remains uncertain;
* **authority** — whether HAF was authorized to observe, retrieve, use, or act upon the information;
* **time** — when the information entered or became relevant to the session;
* **relationship to the advocacy purpose** — why the information may matter to the ongoing advocacy.

For example, these are not equivalent:

```text
The person said:
"I don't know who to trust."

HAF inferred:
The person's immediate question may be part of
a broader difficulty evaluating health claims.

External evidence established:
A particular health authority recommends X.

HAF observed:
A promotional membership offer appeared
during checkout.
```

All four may become relevant to deliberation, but HAF came to know them in different ways and should not silently transform one into another.

### Evolving Advocacy Purpose

The purpose of an advocacy session may not be fully known from the person's initial request.

Through interaction, the person may clarify what they are trying to understand, articulate previously unstated concerns, introduce new circumstances, or discover that the question they initially asked is part of a broader problem.

HAF should therefore avoid reducing an advocacy session to a single inferred purpose.

A session may contain multiple related forms of purpose, including an immediate question, a practical goal, a broader concern, or a value the person has explicitly identified as relevant.

For example:

```text
Immediate question:
"Should I take a multivitamin?"

Practical goal:
"I want to get everything I need."

Broader goal:
"I want to be healthy and get sick less."

Epistemic concern:
"I don't know who to trust."
```

The fact that HAF can infer relationships among these statements does not make the inference equivalent to what the person explicitly said.

The session should allow its understanding of the advocacy purpose to develop without silently replacing the person's expressed purposes with HAF's interpretation of what the person's "real" problem is.

### Authority and Session Context

Information being available to HAF does not by itself establish authority to use that information for every advocacy purpose.

The online-shopping scenario demonstrates this distinction.

A person might authorize HAF to observe a particular application without granting unrestricted access to other personal information or authorizing HAF to intervene in every event it observes.

Conceptually:

```text
Information exists
        ≠
HAF may access it

HAF may access it
        ≠
It is relevant to this advocacy event

It is relevant
        ≠
HAF is authorized to use it for this purpose

HAF is authorized to use it
        ≠
It must appear in the active model context
```

Authority and permissions therefore participate in determining what information may enter an advocacy session and how it may subsequently be used.

This is particularly important when HAF has access to persistent personal context from outside the immediate interaction.

### Interaction May Begin With Observation

Not every Advocacy Session necessarily begins with a human request.

Where explicitly authorized, HAF may encounter an event in the person's environment that appears potentially relevant to advocacy.

This introduces an additional decision before ordinary interaction:

```text
Authorized environmental observation
        ↓
Potential advocacy relevance detected
        ↓
Should HAF intervene?
        ↓
If yes, what act is appropriate?
```

An appropriate act might be to offer assistance rather than immediately performing the advocacy.

The person may then accept, decline, ignore, or otherwise respond to that offer.

This preserves a distinction between authority to **observe**, authority to **access additional context**, and authority to **participate in a particular act of advocacy**.

It also means that non-intervention can be a meaningful outcome of HAF's deliberation.

### Working Model of Session Persistence

The scenarios examined so far do not establish that HAF needs a structured semantic representation of everything that occurs during an Advocacy Session.

A foundation model may be able to interpret much of the meaning of an ongoing interaction directly from the history of that interaction. For example, later statements by the person may clarify, qualify, or correct earlier statements without requiring HAF to maintain a separate structured representation of the person's meaning.

A conservative starting point is therefore to preserve the original session record faithfully and allow HAF's deliberative process to interpret that record when necessary.

The persistent session record may include human input, authorized environmental observations, HAF interactions, retrieved external evidence, and deliberative artifacts. Some forms of state, particularly constitutional context and authority or permissions, may require more explicit representation because their enforcement should not depend solely upon a foundation model reconstructing them from conversation history.

This leaves open how HAF should operate when the complete session record becomes too large or irrelevant to supply to a particular model invocation. Retrieval, summarization, derived session state, or more structured semantic representations may eventually be necessary.

Those mechanisms should not be introduced merely because information can be structured. They should address demonstrated needs of the advocacy architecture while preserving the distinctions identified above, including source, epistemic status, authority, time, and the difference between what the person expressed and what HAF inferred.

The immediate design question therefore remains:

> **What must HAF preserve faithfully in the session record so that later deliberation can understand the advocacy relationship without silently changing its history or meaning?**

## Next Step

This Engineering Review establishes the responsibilities and open questions of HAF's interaction and session architecture without prescribing a final persistence or context-management design.

The next phase of work should test these assumptions through concrete multi-turn advocacy experiments. In particular, experiments should examine whether a foundation model can maintain a faithful understanding of an evolving advocacy session from the preserved session history, and identify where additional retrieval, derived session state, or architectural enforcement becomes necessary.

Observed failures should be used to determine which additional responsibilities belong in the session architecture rather than introducing those mechanisms in advance.

