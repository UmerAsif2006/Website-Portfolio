import { motion, useReducedMotion } from "framer-motion";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({ eyebrow, title, subtitle, id, align = "left" }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];
  const header = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };
  // The underline grows in after the heading appears, driven by the header's in-view state.
  const bar = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.8, delay: reduce ? 0 : 0.3, ease } },
  };

  return (
    <motion.header
      className={`${styles.heading} ${align === "center" ? styles.center : ""}`}
      variants={header}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {eyebrow && <span className={`mono-label ${styles.eyebrow}`}>{eyebrow}</span>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <motion.span className={styles.bar} aria-hidden="true" variants={bar} />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.header>
  );
}
