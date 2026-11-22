import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import NeuralBackground from "./NeuralBackground";
import RotatingTags from "./RotatingTags";
import HeroConsole from "./HeroConsole";
import { hero, site } from "../data/site";
import styles from "./Hero.module.css";

// Keep the final two words on one line so a narrow screen never strands a single word.
const keepLastTwo = (text) => text.replace(/ (\S+) (\S+)$/, " $1\u00A0$2");

export default function Hero() {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.2 } },
  };
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title" tabIndex={-1}>
      <NeuralBackground />
      <div className={styles.fade} aria-hidden="true" />

      <div className={`container ${styles.layout}`}>
        <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className={`mono-label ${styles.label}`}>
            <span className={styles.pulse} aria-hidden="true" />
            {hero.label}
          </motion.span>

          <motion.h1 id="hero-title" variants={item} className={styles.title}>
            Muhammad <span className={`gradient-text ${styles.shimmer}`}>Umer Asif</span>
          </motion.h1>

          <motion.p variants={item} className={styles.tagline}>
            {site.role}
          </motion.p>

          <motion.div variants={item} className={styles.rotating}>
            <RotatingTags tags={hero.rotatingTags} />
          </motion.div>

          <motion.p variants={item} className={styles.taglineSub}>
            {keepLastTwo(site.taglineSub)}
          </motion.p>

          <motion.p variants={item} className={styles.value}>
            {hero.valueLines.map((line) => (
              <span key={line} className={styles.valueLine}>
                {line}
              </span>
            ))}
          </motion.p>

          <motion.div variants={item} className={styles.ctas}>
            <a href="#projects" className="btn btn-primary">
              {hero.ctas.projects}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#works" className="btn btn-ghost">
              <Play size={16} aria-hidden="true" />
              {hero.ctas.demo}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {hero.ctas.contact}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={reduce ? false : { opacity: 0, y: 32, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={styles.float}
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeroConsole />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className={styles.scroll}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.2 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={styles.scrollIcon}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
