export default function HafPage() {
  return (
    <main>
      <a href="/">← Back to portfolio</a>

      <header>
        <p>Current Project</p>
        <h1>Human Advocacy Framework</h1>

        <p>
          How might an AI agent be architected to increase human agency
          rather than substitute for human judgment?
        </p>
      </header>

      <section>
        <h2>The Problem</h2>

        <p>
          As AI becomes a larger part of digital life, I am interested in
          a question that sits beneath individual AI capabilities: who is
          the agent actually working for?
        </p>

        <p>
          The Human Advocacy Framework is an exploration of what it would
          mean to architect an AI agent whose purpose is to help a person
          understand, deliberate, participate, and act without replacing
          that person's judgment.
        </p>

        <p>
          The project is inspired by Catholic Social Doctrine and, in
          particular, questions raised by Magnifica Humanitas about human
          dignity, participation, technology, truth, and the common good.
        </p>
      </section>

<section>
  <p className="eyebrow">Method</p>
  <h2>From principles to implementation</h2>

  <p>
    I began with the human and product problem rather than an AI
    architecture.
  </p>

  <div className="method-flow">
    <div>
      <span>01</span>
      <strong>Foundations</strong>
      <p>Define the human and social principles.</p>
    </div>

    <div>
      <span>02</span>
      <strong>Scenarios</strong>
      <p>Test those principles against concrete situations.</p>
    </div>

    <div>
      <span>03</span>
      <strong>Requirements</strong>
      <p>Extract recurring behavioral and architectural constraints.</p>
    </div>

    <div>
      <span>04</span>
      <strong>Engineering</strong>
      <p>Translate the requirements into system boundaries.</p>
    </div>

    <div>
      <span>05</span>
      <strong>Evaluate</strong>
      <p>Test whether the implementation actually preserves human judgment.</p>
    </div>
  </div>
</section>

      <section>
        <h2>Requirements That Emerged</h2>

        <p>
          Testing the design foundations against several advocacy scenarios
          produced fifteen cross-scenario requirements. Some of the most
          important are:
        </p>

        <article>
          <h3>Human Judgment</h3>
          <p>
            The agent should facilitate consequential human judgment rather
            than replace it.
          </p>
        </article>

        <article>
          <h3>Epistemic Integrity</h3>
          <p>
            The system should distinguish evidence, fact, inference,
            prediction, opinion, uncertainty, incentives, and claims about
            intent where those distinctions matter.
          </p>
        </article>

        <article>
          <h3>Minimum Necessary Context</h3>
          <p>
            The availability of personal information does not constitute
            permission to use it. Purpose should determine what context is
            relevant and what authority is required.
          </p>
        </article>

        <article>
          <h3>Provenance</h3>
          <p>
            Information should retain its origins where practical.
            Provenance, authority, and truth are related but distinct.
          </p>
        </article>

        <article>
          <h3>Capacity Building</h3>
          <p>
            Repeated use should ordinarily increase the person's capacity
            for independent understanding and judgment rather than create
            unnecessary dependence on the advocate.
          </p>
        </article>

        <article>
          <h3>Non-Manipulation</h3>
          <p>
            HAF should not steer the person toward a predetermined belief,
            emotional state, purchase, vote, or action.
          </p>
        </article>
      </section>

      <section>
        <h2>A Concrete Example</h2>

        <blockquote>
          I keep seeing claims that AI will eliminate huge numbers of jobs
          within a few years and may even cause human extinction. How
          seriously should I take these claims?
        </blockquote>

        <p>
          HAF should not decide that the person ought to be optimistic,
          skeptical, reassured, or afraid.
        </p>

        <p>Instead, an advocacy session might investigate:</p>

        <ul>
          <li>What exactly is being claimed?</li>
          <li>What evidence supports the claim?</li>
          <li>What is known versus inferred or predicted?</li>
          <li>What assumptions does the prediction depend upon?</li>
          <li>What remains uncertain?</li>
          <li>What relevant interests or incentives exist?</li>
          <li>What alternative explanations exist?</li>
          <li>What remains for the person to judge?</li>
        </ul>
      </section>

      <section>
        <h2>Current Engineering Direction</h2>
      
        <p>
          Experiments with the initial HAF runtime exposed a distinction between
          deliberating about an advocacy situation and interacting with the person.
          A foundation model may need substantial context and reasoning to understand
          a situation without presenting all of that reasoning to the person at once.
        </p>
      
        <pre>
          {`Person / Environment
              │
              ▼
      Advocacy Session
              │
              ├── Constitutional Context
              ├── Authority / Permissions
              ├── Session History
              └── External Evidence
              │
              ▼
      Deliberation
              │
              ▼
      Determine Next Act of Advocacy
              │
              ▼
      Person`}
        </pre>
      
        <p>
          The current architecture therefore treats advocacy as an ongoing
          interaction rather than a single request that produces a complete answer.
          Depending on the situation, the next useful act might be a question, a
          distinction, a piece of evidence, a challenge, an explanation, or a
          recommendation.
        </p>
      
        <p>
          The current persistence hypothesis is deliberately conservative: preserve
          a faithful session history and allow the foundation model to interpret that
          history during deliberation. More structured session state, retrieval, or
          summarization should be introduced when experiments demonstrate that they
          are necessary.
        </p>
      
        <p>
          The foundation model remains an instrument used by HAF rather than the
          source of HAF's constitutional authority. Constraints such as permissions
          may require enforcement outside the model rather than relying on the model
          to reconstruct them from conversation history.
        </p>
      </section>

      <section>
        <h2>Project Documents</h2>
      <div className="document-grid">
      <article className="document-card">
        <p className="eyebrow">01</p>
        <h3>Design Foundations</h3>
        <p>
          The human and social principles from which the framework begins.
        </p>
        <a href="/haf/foundations">Read Design Foundations →</a>
      </article>

        <article className="document-card">
          <p className="eyebrow">02</p>
          <h3>Advocacy Scenarios</h3>
          <p>
            Six concrete situations used to test the foundations and derive
            the cross-scenario requirements.
          </p>
          <a href="/haf/scenarios">Read Advocacy Scenarios →</a>
        </article>

        <article className="document-card">
          <p className="eyebrow">03</p>
          <h3>Engineering Review</h3>
          <p>
            A proposed v0.1 architecture, implementation boundaries,
            failure modes, and open questions about LLM components.
          </p>
        <a href="/haf/engineering">Read Engineering Review →</a>
        </article>

        <article className="document-card">
          <p className="eyebrow">04</p>
          <h3>Experimental Findings</h3>
          <p>
            Findings from testing HAF's requirements through concrete advocacy
            events, including tensions around deliberation, interaction,
            proportionality, context, and constitutional enforcement.
          </p>
          <a href="/haf/findings">Read Experimental Findings →</a>
        </article>
 
        <article className="document-card">
          <p className="eyebrow">05</p>
          <h3>Interaction &amp; Session Architecture</h3>
          <p>
            An engineering review of how HAF can maintain rich internal
            deliberation while interacting proportionately with a person across
            an evolving advocacy session.
          </p>
          <a href="/haf/interaction-session">
            Read Interaction &amp; Session Architecture →
          </a>
        </article>

      </div>
      </section>

      <section>
        <h2>Status</h2>
      
        <p>
          <strong>Current phase:</strong> Multi-turn advocacy experiments
        </p>
      
        <p>
          The initial HAF runtime has been tested against concrete advocacy
          scenarios. Those experiments exposed new architectural questions about
          proportional interaction, session persistence, model context, and the
          distinction between internal deliberation and the next act of advocacy.
        </p>
      
        <p>
          The next experiments will test how HAF maintains an evolving advocacy
          session across multiple interactions with a person.
        </p>
      </section>
      
      <section>
        <h2>Questions I'm Investigating</h2>
      
        <ul>
          <li>
            Can a foundation model maintain a faithful understanding of an evolving
            advocacy session from the preserved session history?
          </li>
          <li>
            What information must remain available across an advocacy session, and
            what does a particular model invocation actually need?
          </li>
          <li>
            When is previous deliberation sufficient, and when should HAF deliberate
            again?
          </li>
          <li>
            How should HAF determine the next appropriate act of advocacy without
            performing too much of the person's deliberation for them?
          </li>
          <li>
            Which responsibilities, particularly authority and permissions, require
            architectural enforcement outside the foundation model?
          </li>
        </ul>
      </section>
    </main>
  );
}

