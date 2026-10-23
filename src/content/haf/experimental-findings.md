# HAF Experimental Findings

**Status:** Working Notes

## Purpose

This document records findings that emerged while testing HAF's cross-scenario requirements through concrete advocacy events.

These findings are not amendments to the HAF requirements or settled architectural decisions. They record observed behavior, recurring tensions, and questions that should inform subsequent design.

The experiments are intended to expose weaknesses in the interpretation and implementation of HAF rather than demonstrate that HAF already behaves as intended.

A failure in an experiment may indicate a problem with:

* a requirement;
* the interpretation of a requirement;
* model instructions;
* application architecture;
* the interaction between requirements;
* or the behavior of a particular model invocation.

The experiments therefore treat unexpected or undesirable behavior as information about the framework rather than something to immediately prompt away.

## Experimental Method

The initial prototype selected a subset of HAF requirements that appeared relevant to an advocacy event and then asked a model to respond under those requirements.

This approach exposed a problem: deciding which requirements mattered before deliberation could cause the system to exclude a moral consideration before that consideration had an opportunity to examine the situation.

A subsequent experiment instead allowed every requirement to examine the same advocacy event.

Conceptually:

```text
Write requirement
      ↓
Put HAF in a concrete situation
      ↓
Every requirement examines the situation
      ↓
Critique those interpretations
      ↓
Deliberate about the advocacy event
      ↓
Critique the deliberation
      ↓
Human examines surprising behavior
      ↓
Ask: where did this come from?
```

The current experimental pipeline is approximately:

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
```

The **Requirement Guidance** stage asks what each HAF requirement reveals about the situation. Every requirement receives an opportunity to examine the same event. A requirement may reveal a substantial consideration or very little.

The **Guidance Validation** stage critically examines whether each interpretation faithfully represents its authoritative requirement. The guidance itself is treated as model-generated interpretation rather than as an authoritative extension of the framework.

The **Deliberation** stage considers the guidance and its critique together in light of the HAF foundations, principles, and requirements.

The **Deliberation Validation** stage attempts to identify failures, unsupported assumptions, omissions, conflicts with requirements, and claims that cannot actually be established from the generated deliberation.

These experiments are exploratory rather than statistical. A single model response does not establish that a behavior necessarily follows from a particular requirement or architecture. Repeated patterns are treated as reasons for further investigation rather than proof of causality.

The current experiments have included both adversarial situations and ordinary advocacy situations, including fear about AI news, health information overload, and deliberation about a local voting measure.

## Finding 1 — Holistic Consideration Does Not Require Holistic Exposition

Allowing every HAF requirement to examine an advocacy event corrected an important weakness in the earlier selection approach.

A requirement that initially appears unimportant may reveal something significant about the event. HAF should therefore be cautious about deciding which moral considerations matter before those considerations have examined the situation.

However, the experiments exposed a second problem.

When every requirement produces useful guidance, the combined guidance can become extensive. A deliberating model may then attempt to incorporate all of those considerations into its response to the person.

This can produce an answer that is individually defensible under many requirements while collectively doing too much.

The emerging distinction is:

> **Every HAF requirement may participate in reasoning without every resulting consideration needing to appear in the current response.**

Holistic moral consideration therefore does not imply exhaustive communication.

A system may need substantial internal deliberation in order to determine that the most appropriate immediate interaction is quite small.

This suggests that the question of **what HAF should consider** is different from the question of **what HAF should presently say or do**.

## Finding 2 — Deliberation and Interaction Are Different Responsibilities

The initial experimental architecture implicitly treated good deliberation and a good response as approximately the same problem.

The experiments increasingly challenge that assumption.

HAF may need to understand:

* the person's situation;
* relevant evidence;
* competing interpretations;
* uncertainty;
* applicable moral considerations;
* possible harms;
* relevant interests;
* and unresolved questions.

But the person does not necessarily need all of that reasoning presented at once.

This suggests a distinction between **deliberation** and **interaction**.

Deliberation asks:

> Given what HAF currently has available, what should HAF understand about this advocacy situation?

Interaction asks:

> Given that understanding, what should HAF do or say with the person now?

The distinction can be summarized as:

> **Depth of the advocate's understanding is not the same thing as length of the advocate's utterance.**

A deeply considered act of advocacy might result in a detailed explanation.

It might instead result in:

* one clarifying question;
* one important fact;
* a concise challenge;
* an invitation to examine a particular assumption;
* a recommendation to seek another human being or professional;
* or no interruption at all.

This distinction suggests that a future HAF architecture may need a responsibility concerned specifically with interaction rather than asking the deliberating component to directly produce the final human-facing response.

The experiments have not yet established what that architecture should be.

## Finding 3 — Proportionality Is Interactive

Three ordinary scenarios produced a recurring pattern.

In the **AI News Fear** scenario, the person explicitly described feeling scared and overwhelmed. The generated response was thoughtful and well organized, distinguished categories of claims, and offered useful questions for investigation. Nevertheless, it presented a substantial amount of intellectual material before returning the interaction to the person.

In the **Health Information** scenario, the person again explicitly described being overwhelmed. The generated response responded to that difficulty partly by providing another structured framework for evaluating health claims.

In the **Voting Measure** scenario, the generated response provided a thoughtful framework involving competing interests, uncertainty, subsidiarity, the common good, and questions for investigation. Again, it performed much of the deliberative work before inviting further participation from the person.

In these experiments, validation tended to regard organization, relevance, and completeness as evidence that the response satisfied proportionality.

That revealed a possible weakness in the interpretation of R11.

A well-organized wall of information can still be a wall of information.

The relevant question may therefore not merely be:

> How much information is appropriate for this issue?

It may also be:

> What does this person need from HAF at this moment in the interaction?

Proportionality may concern conversational pacing, cognitive burden, emotional state, available attention, and when responsibility for the next step should return to the person.

This does not yet establish that R11 itself needs to change. The problem may instead lie in how proportionality is interpreted or operationalized.

## Finding 4 — Minimum Necessary Context May Be Temporal

R3 requires HAF to obtain only personal information materially relevant to the advocacy event.

The experiments raised a more precise question about what "necessary" means during an ongoing interaction.

One interpretation is:

> Gather all personal context that could materially improve the eventual answer.

Another is:

> Gather the context necessary for the next useful act of advocacy.

These approaches can produce very different interactions.

For example, when a person says that health advice is overwhelming, HAF could construct a broad analysis based on the information already available.

Alternatively, it might first ask:

> What vitamin does the expert say you're not getting enough of, and what reason do they give?

That question obtains additional information, but may actually exercise greater restraint. It avoids making assumptions and postpones unnecessary investigation until the person's actual concern is clearer.

The experiments therefore suggest that minimum necessary context may have a temporal dimension.

Information can be potentially relevant to the overall advocacy event without being necessary **yet**.

This finding also complicates the assumption that asking fewer questions necessarily means collecting less context. Avoiding a clarifying question may cause the system to compensate by generating a larger analysis from assumptions.

## Finding 5 — Capacity Building May Require Returning the Turn to the Person

R7 requires repeated use of HAF to ordinarily increase the person's capacity to understand, judge, participate, and act without HAF.

The experiments suggest at least two different ways an advocate might attempt to build that capacity.

One is to provide the person with a useful intellectual framework.

Another is to conduct a deliberation in which the person practices judgment themselves.

The first approach appeared frequently in the experimental responses. The model explained distinctions, organized competing considerations, supplied questions, and constructed frameworks the person could use.

This can genuinely build capacity.

But it can also perform much of the intellectual work on the person's behalf.

In some situations, a single well-chosen question may leave more room for the person to identify what matters, articulate an assumption, recognize uncertainty, or make a connection themselves.

The emerging concern is:

> **A response can contain good advocacy content while its mode of presentation performs too much of the deliberative process at once.**

This does not imply that HAF should always use a Socratic method or avoid direct explanation.

Explanation, teaching, challenge, persuasion, calculation, evidence gathering, and direct answers may all be legitimate forms of advocacy.

The unresolved question is when HAF should continue performing intellectual work and when it should return the turn to the person.

## Finding 6 — Architectural Responsibilities Cannot Be Validated From Prose Alone

Experiments involving R10 — Constitutional Enforcement exposed an important distinction between model behavior and architectural guarantees.

A generated response can be consistent with a constitutional boundary.

A model can also state that it is constrained by such a boundary.

Neither demonstrates that the boundary is actually enforced.

For example, a model might say that it cannot access personal information without permission. That statement does not establish that the surrounding application prevents unauthorized information from being supplied to the model.

The experiments produced variation here. Some validation runs correctly identified that constitutional enforcement could not be established from the response alone. Another treated language about being constitutionally constrained as evidence that the requirement had been satisfied.

This suggests an important evaluation rule:

> **A model's claim about an architectural property is not evidence that the architecture possesses that property.**

This applies beyond constitutional enforcement.

Properties involving permissions, context boundaries, provenance, persistence, access control, and deterministic enforcement may require inspection or testing of the surrounding software rather than evaluation of generated prose.

Model evaluation and system evaluation are therefore different responsibilities.

## Finding 7 — Model-Generated Interpretation Is Not Authoritative

The experiments introduced model-generated Requirement Guidance in order to allow every HAF requirement to examine an advocacy event.

A second model invocation then critically evaluates that guidance.

This produced useful disagreements.

Those disagreements also exposed a constitutional issue.

Neither the original interpretation nor its critique becomes authoritative merely because a model produced a persuasive explanation.

The authority chain remains:

```text
Foundations
    ↓
Principles
    ↓
Requirements
    ↓
Model-generated interpretation
```

The model-generated interpretation is an attempt to apply the framework. It is not an amendment to the framework.

Likewise, a validation agent is not a constitutional court whose judgment automatically overrides the interpretation it evaluates.

When guidance and validation disagree, the disagreement itself can be useful evidence. It may reveal:

* ambiguity in a requirement;
* an unsupported inference;
* a poor model interpretation;
* a missing architectural distinction;
* or a question that requires human judgment.

The experiments therefore suggest that model disagreement should often be preserved rather than automatically resolved.

This is particularly important during development. Prompt changes made merely to eliminate surprising outputs can conceal ambiguity rather than clarify it.

The experimental process should instead ask:

> Where did this behavior come from?

Only then should a change be attributed to the requirement, its interpretation, the agent instructions, the architecture, or model variability.

## Finding 8 — Observed Events Introduce an Intervention Decision

Most initial HAF scenarios begin with an explicit request from a person.

Conceptually:

```text
Human asks HAF something
        ↓
HAF advocates in response
```

Some digital advocacy situations have a different shape.

For example, consider a person ordering dinner through a food-delivery application. During checkout, the application presents a membership offer, an incentive to add another item, a tip prompt, and prices that may differ from ordering directly from the restaurant.

If HAF can observe this event, the person has not necessarily asked a question.

The flow becomes:

```text
Something happens
        ↓
HAF perceives it
        ↓
Should HAF intervene?
        ↓
If yes, how?
```

This introduces a responsibility that the current experimental pipeline presupposes rather than evaluates.

Good advocacy may sometimes mean explaining the economics of an offer.

It may sometimes mean asking whether the person wants help evaluating it.

It may sometimes mean remaining silent.

Continuous intervention could itself undermine agency by making ordinary life burdensome, encouraging dependence, or turning the advocate into another system competing for the person's attention.

Observed events also raise additional questions about permission, privacy, inference, interruption, frequency, and what HAF is authorized to observe in the first place.

For this reason, observed-event scenarios should not simply be treated as ordinary request-response scenarios with a synthetic user question appended to them.

Whether to intervene is itself part of the advocacy problem.

## Open Questions

The experiments suggest several questions for subsequent engineering work.

### Interaction

How should HAF determine the next useful act of advocacy?

When should it:

* explain;
* ask;
* challenge;
* investigate;
* calculate;
* recommend;
* defer;
* or remain silent?

Should interaction be a distinct architectural responsibility from deliberation?

If so, what information should an interaction component receive from the deliberative process?

### Incremental vs. Upfront Deliberation

How much deliberation should occur before HAF first returns the interaction to the person?

Should HAF attempt a comprehensive understanding of an advocacy event before interacting, or should deliberation itself proceed incrementally as the person provides additional information?

Different situations may require different answers.

### Session State

What should HAF remember during an advocacy session?

How should the system distinguish:

* what the person explicitly said;
* what HAF inferred;
* what external evidence established;
* what HAF interpreted;
* what remains uncertain;
* and what remains an open question?

How should these distinctions survive across multiple turns?

### Deliberative Record

Should the complete products of Requirement Guidance, Guidance Validation, Deliberation, and Deliberation Validation be retained?

Such a record may be useful for:

* debugging;
* evaluation;
* provenance;
* contestability;
* research;
* and understanding why HAF acted as it did.

However, retaining a deliberative record does not imply that the entire record should be supplied to every subsequent model invocation.

### Active Model Context

A distinction may be necessary between information HAF has retained and information a particular model invocation needs.

Conceptually:

```text
Constitutional Context
Foundations / Principles / Requirements

Deliberative Record
Guidance / critiques / evidence / prior reasoning

Active Advocacy Context
Only what this invocation needs now
```

This raises a new form of context selection.

The earlier experimental architecture selected which **requirements** were relevant before allowing them to examine the event.

That approach risked excluding moral considerations prematurely.

A future architecture might instead allow the requirements to participate in deliberation while selecting which **already-considered information** a particular model invocation needs.

Whether this distinction is sound remains to be tested.

### Context Summarization

Long-running sessions may eventually exceed practical model context limits.

Summarizing previous deliberation is one possible response, but summarization introduces another interpretive layer.

A generated summary might silently transform:

* something the person stated into something HAF inferred;
* uncertainty into apparent certainty;
* a temporary concern into a persistent preference;
* a model interpretation into established context;
* or a contested conclusion into settled history.

How can HAF reduce context while preserving provenance and epistemic distinctions?

### Provenance of Model-Generated State

R5 clearly applies to external evidence and personal context, but the experiments raise questions about the provenance of HAF's own evolving reasoning.

If a later interaction depends upon an interpretation generated several turns earlier:

* should that interpretation retain its origin?
* should it retain the evidence available when it was generated?
* should later agents know that it was model-generated?
* how should corrections propagate?
* when should an old interpretation be reconsidered rather than reused?

### Evaluation

The current experiments are qualitative and exploratory.

A later evaluation suite may need to run the same scenarios repeatedly and across different models.

This would help distinguish:

* recurring architectural behavior;
* prompt-dependent behavior;
* model-specific tendencies;
* stochastic variation;
* and failures that consistently arise from ambiguous requirements.

The goal should not be to optimize until every validator reports success.

The more important question is whether the experiments help reveal where HAF's moral commitments succeed, fail, conflict, or remain underspecified when translated into software.

## Current Direction

The experiments do not yet establish a final architecture.

They do suggest that HAF may need to distinguish at least four concerns that were initially easier to treat as one:

```text
Moral consideration
        ↓
Deliberative understanding
        ↓
Active context
        ↓
Human interaction
```

These distinctions remain hypotheses.

The next engineering work should investigate them without prematurely converting them into permanent components or assuming a fixed pipeline order.

In particular, the experiments suggest that the goal is not to make HAF produce increasingly comprehensive answers.

The deeper objective remains to build an advocate that **facilitates human agency rather than replacing it**.
