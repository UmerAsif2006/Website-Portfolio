import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./RotatingTags.module.css";

const INTERVAL_MS = 2600;

// Shows one tag at a time, fading between them. Screen readers get the full list once.
export default function RotatingTags({ tags }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (tags.length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % tags.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [tags.length]);

  return (
    <p className={styles.wrap}>
      <span className="sr-only">{tags.join(", ")}</span>
      <span className={styles.stage} aria-hidden="true">
        <span className={styles.marker} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={tags[index]}
            className={styles.tag}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {tags[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
