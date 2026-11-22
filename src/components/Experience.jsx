import { motion, useReducedMotion } from "framer-motion";
import { Cpu, GraduationCap, MapPin, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/experience";
import { experienceSection } from "../data/site";
import styles from "./Experience.module.css";

const ICONS = { cpu: Cpu, graduation: GraduationCap };

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" eyebrow={experienceSection.eyebrow} title={experienceSection.heading} />

        <div className={styles.timeline}>
          <motion.span
            className={styles.line}
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className={styles.list}>
            {experience.map((entry, index) => {
              const Icon = ICONS[entry.icon] || Cpu;
              return (
                <motion.li
                  key={entry.id}
                  className={styles.item}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: reduce ? 0 : 0.15 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.dot} aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <article className={`glass ${styles.card}`}>
                    <div className={styles.cardHead}>
                      <h3 className={styles.title}>{entry.title}</h3>
                      <span className={`mono-label ${styles.period}`}>{entry.period}</span>
                    </div>
                    <p className={styles.org}>
                      <MapPin size={14} aria-hidden="true" />
                      {entry.org}
                    </p>
                    {entry.description && <p className={styles.description}>{entry.description}</p>}
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.p
          className={styles.closing}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.4 }}
        >
          <Rocket size={18} aria-hidden="true" className={styles.closingIcon} />
          {experienceSection.closingLine}
        </motion.p>
      </div>
    </section>
  );
}
