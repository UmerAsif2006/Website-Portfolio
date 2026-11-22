import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/site";
import styles from "./HeroConsole.module.css";

const TICK = 520;
const PAUSE_TICKS = 7;

/**
 * Live code-style window: a signal runs through each workflow's nodes, then the
 * JSON result types itself out, then the next workflow takes over.
 */
export default function HeroConsole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const current = hero.consoles[index];
  const nodeCount = current.nodes.length;
  const total = nodeCount + current.output.length + PAUSE_TICKS;

  useEffect(() => {
    if (reduce) return undefined;
    const timer = setInterval(() => setTick((value) => value + 1), TICK);
    return () => clearInterval(timer);
  }, [reduce]);

  useEffect(() => {
    if (tick >= total) {
      setTick(0);
      setIndex((value) => (value + 1) % hero.consoles.length);
    }
  }, [tick, total]);

  // With reduced motion everything is shown at once, no cycling.
  const step = reduce ? total : tick;
  const activeNode = Math.min(step, nodeCount - 1);
  const linesShown = reduce ? current.output.length : Math.max(0, step - nodeCount + 1);
  const done = linesShown >= current.output.length;

  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.chrome}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.file}
              className={styles.file}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {current.file}
            </motion.span>
          </AnimatePresence>
          <span className={styles.live}>
            <span className={styles.liveDot} />
            live
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.file}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className={styles.canvas}>
              {current.nodes.map((node, i) => {
                const reached = i <= activeNode;
                const isHead = i === activeNode && !done;
                return (
                  <Fragment key={node}>
                    <span
                      className={[
                        styles.node,
                        reached ? styles.reached : "",
                        isHead ? styles.head : "",
                        i === current.hot ? styles.hot : "",
                      ].join(" ")}
                    >
                      {node}
                    </span>
                    {i < nodeCount - 1 && (
                      <span className={`${styles.wire} ${i < activeNode ? styles.wireOn : ""}`}>
                        <span className={styles.spark} />
                      </span>
                    )}
                  </Fragment>
                );
              })}
            </div>

            <pre className={styles.code}>
              <span className={styles.brace}>{"{"}</span>
              {current.output.map(([key, value], i) => {
                const literal = !value.startsWith('"');
                return (
                  <span key={key} className={`${styles.line} ${i < linesShown ? styles.lineOn : ""}`}>
                    {"  "}
                    <span className={styles.key}>"{key}"</span>
                    <span className={styles.punct}>: </span>
                    <span className={literal ? styles.literal : styles.string}>{value}</span>
                    <span className={styles.punct}>,</span>
                  </span>
                );
              })}
              <span className={styles.brace}>{"}"}</span>
              <span className={styles.cursor} />
            </pre>

            <div className={styles.status}>
              <span className={done ? styles.ok : styles.running}>{done ? "✓ success" : "● executing"}</span>
              <span>{current.nodes.length} nodes</span>
              <span>n8n</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
