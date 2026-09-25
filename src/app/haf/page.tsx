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
        <h2>Current Engineering Proposal</h2>

        <p>
          The current engineering question is how much of HAF's behavior
          can be established through conventional software architecture
          around a foundation model, and which requirements depend upon
          model behavior, evaluation, or techniques I have not yet explored.
        </p>

        <pre>
          {`Person
   │
   ▼
Advocacy Session
   │
   ├── Context / Authority
   ├── Evidence / Provenance
   └── HAF Constitution
   │
   ▼
Model Adapter
   │
   ▼
Foundation Model
   │
   ▼
Evaluation
   │
   ▼
Person`}
        </pre>

        <p>
          One of the central hypotheses is that the foundation model should
          be an instrument used by HAF rather than the source of HAF's
          constitutional authority.
        </p>

        <p>
          Some constraints can potentially be enforced through ordinary
          software. For example, unauthorized personal context can simply
          never be supplied to the model.
        </p>

        <p>
          Other requirements, such as avoiding subtle manipulation or
          reliably distinguishing warranted inference from speculation,
          raise questions about model behavior and evaluation that remain
          open.
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
      </div>
      </section>

      <section>
        <h2>Status</h2>

        <p>
          <strong>Current phase:</strong> Design → Prototype
        </p>

        <p>
          The design foundations and scenario analysis establish the initial
          requirements. The next step is a small advocacy-session prototype
          intended to test the architectural assumptions rather than
          demonstrate a finished implementation.
        </p>
      </section>

      <section>
        <h2>Questions I'm Investigating</h2>

        <ul>
          <li>
            Which constitutional constraints should be enforced outside the
            foundation model?
          </li>
          <li>
            How should generated claims retain meaningful provenance?
          </li>
          <li>What constitutes a HAF-compatible model?</li>
          <li>
            Can a common evaluation suite measure behavior across different
            foundation models?
          </li>
          <li>
            Which requirements require techniques beyond conventional
            application architecture?
          </li>
        </ul>
      </section>
    </main>
  );
}

