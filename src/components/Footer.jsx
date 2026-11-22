import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { footer, navLinks, site } from "../data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("top")?.focus({ preventScroll: true });
  };

  return (
    <footer className={styles.footer}>
      <motion.div
        className={`container ${styles.inner}`}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.brandBlock}>
          <a href="#top" className={styles.wordmark}>
            <span className="gradient-text">E</span>xecutron
          </a>
          <p className={styles.tagline}>{footer.tagline}</p>
          <ul className={styles.socials}>
            <li>
              <a href={`mailto:${site.email}`} className="icon-btn" aria-label={`Email ${site.name}`}>
                <Mail size={18} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile (opens in a new tab)">
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className={`mono-label ${styles.navTitle}`}>Quick links</p>
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {year} {site.brand}. All rights reserved.
        </p>
        <button type="button" className={`btn btn-ghost btn-sm ${styles.top}`} onClick={toTop}>
          Back to top
          <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
