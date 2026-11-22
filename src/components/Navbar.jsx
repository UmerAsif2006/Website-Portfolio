import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollSpy";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(sectionIds);
  const reduce = useReducedMotion();
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector("a")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab" && drawerRef.current) {
        const focusables = [toggleRef.current, ...drawerRef.current.querySelectorAll("a")].filter(Boolean);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ""}`}>
      <nav className={`container ${styles.inner}`} aria-label="Primary">
        <a href="#top" className={styles.brand} aria-label={`${site.brand}, back to top`}>
          <span className={styles.wordmark}>
            <span className="gradient-text">E</span>xecutron
          </span>
          <span className={`mono-label ${styles.suffix}`}>{site.brandSuffix}</span>
        </a>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`${styles.link} ${active === link.id ? styles.active : ""}`}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
                {active === link.id && (
                  <motion.span layoutId="nav-active" className={styles.activeBar} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <a href="#contact" className={`btn btn-primary btn-sm ${styles.cta}`}>
            Contact
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`icon-btn ${styles.toggle}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            className={styles.drawer}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className={styles.drawerLinks}>
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.04 * index + 0.06 }}
                >
                  <a
                    href={`#${link.id}`}
                    className={`${styles.drawerLink} ${active === link.id ? styles.drawerActive : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className={styles.drawerIndex}>0{index + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
