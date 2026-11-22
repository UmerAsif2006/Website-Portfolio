import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Linkedin, Sparkles, Target, Workflow } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { about, site } from "../data/site";
import styles from "./About.module.css";

const ICONS = { workflow: Workflow, target: Target, bot: Bot };

// Counts up from 0 to a numeric value the first time it scrolls into view.
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const target = Number(value);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce || !Number.isFinite(target)) return undefined;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(String(Math.round(latest))),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return <span ref={ref}>{shown}</span>;
}

export default function About() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.heading} />

        <div className={styles.grid}>
          <motion.div className={styles.copy} {...reveal(0.05)}>
            <p className={styles.lead}>{about.lead}</p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            {about.founderLine && <p className={styles.founderLine}>{about.founderLine}</p>}
            <ul className={styles.bullets}>
              {about.bullets.map((bullet) => (
                <li key={bullet.slice(0, 24)} className={styles.bullet}>
                  {bullet}
                </li>
              ))}
            </ul>
            {about.closing && <p className={styles.paragraph}>{about.closing}</p>}
            {about.ctaLine && (
              <p className={styles.ctaLine}>
                <Sparkles size={18} aria-hidden="true" />
                {about.ctaLine}
              </p>
            )}
            <div className={styles.links}>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Linkedin size={18} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </motion.div>

          <ul className={styles.highlights}>
            {about.highlights.map((highlight, index) => {
              const Icon = ICONS[highlight.icon] || Workflow;
              return (
                <motion.li key={highlight.label} className={`glass ${styles.card}`} {...reveal(0.1 + index * 0.1)}>
                  <motion.span
                    className={styles.icon}
                    aria-hidden="true"
                    initial={reduce ? false : { scale: 0.4, rotate: -20, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: reduce ? 0 : 0.25 + index * 0.1 }}
                  >
                    <Icon size={22} />
                  </motion.span>
                  <p className={styles.cardText}>
                    {highlight.value && (
                      <span className={`gradient-text ${styles.value}`}>
                        <CountUp value={highlight.value} />
                      </span>
                    )}
                    <span className={styles.label}>{highlight.label}</span>
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
