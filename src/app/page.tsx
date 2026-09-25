import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Full-Stack / Product Engineer</p>

        <h1>Guilford Hunter Benevedes</h1>

        <p className="hero-intro">
          I build software at the intersection of product requirements,
          technical systems, and human needs.
        </p>
      </section>

      <section id="work">
        <p className="eyebrow">Selected Work</p>

        <article className="featured-project">
          <div>
            <p className="eyebrow">Current Project</p>
            <h2>Human Advocacy Framework</h2>

            <p>
              An exploration of how AI agents might increase human agency
              rather than substitute for human judgment.
            </p>
          </div>

          <a className="project-link" href="/haf">
            Explore the project →
          </a>
        </article>
      </section>

      <section className="experience">
        <p className="eyebrow">Experience</p>
        <p>Uber · Postmates · StubHub · MaidSafe</p>
      </section>
    </main>
  );
}

