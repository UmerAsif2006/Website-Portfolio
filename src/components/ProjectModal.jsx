import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, FileText, Maximize2, X } from "lucide-react";
import { CATEGORY_COLORS, ScreenshotPlaceholder } from "./ProjectCard";
import styles from "./ProjectModal.module.css";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const touchStart = useRef(null);
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const slides = [
    ...(project.videos || []).map((video) => ({ ...video, type: "video" })),
    ...(project.screenshots || []).map((shot) => ({ ...shot, type: "image" })),
  ];
  const hasSlides = slides.length > 0;
  const files = project.files || [];
  const titleId = `project-modal-title-${project.id}`;

  const go = useCallback(
    (step) => {
      if (slides.length < 2) return;
      setDirection(step);
      setSlide((current) => (current + step + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("[data-autofocus]")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        // Leave arrow keys to the video player when it has focus (seeking).
        if (event.target instanceof HTMLVideoElement) return;
        go(event.key === "ArrowRight" ? 1 : -1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const current = slides[slide];
  const slideLabel = current ? `${slide + 1} of ${slides.length}` : "";

  return createPortal(
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.dialog}
        style={{ "--cat": CATEGORY_COLORS[project.category] }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className={`icon-btn ${styles.close}`} onClick={onClose} aria-label="Close project details" data-autofocus>
          <X size={20} aria-hidden="true" />
        </button>

        <div className={styles.carousel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {hasSlides ? (
            <>
              <div className={styles.slideFrame} aria-roledescription="carousel" aria-label={`${project.title} media`}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={slide}
                    className={styles.slide}
                    custom={direction}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {current.type === "video" ? (
                      <video
                        src={current.src}
                        className={styles.media}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={`${current.title || `${project.title} video`} (${slideLabel})`}
                      />
                    ) : (
                      <img src={current.src} alt={current.alt || `${project.title} screenshot ${slideLabel}`} className={styles.media} />
                    )}
                  </motion.div>
                </AnimatePresence>
                {current.type === "video" && <span className={styles.videoTag}>Video</span>}
                {current.type === "image" && (
                  <a href={current.src} target="_blank" rel="noopener noreferrer" className={styles.fullSize}>
                    <Maximize2 size={14} aria-hidden="true" />
                    Full size
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
              {slides.length > 1 && (
                <div className={styles.controls}>
                  <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous slide">
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <span className={styles.counter} aria-live="polite">
                    {slide + 1} / {slides.length}
                  </span>
                  <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next slide">
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.slideFrame}>
              <ScreenshotPlaceholder project={project} large />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <span className={`mono-label ${styles.category}`}>{project.category}</span>
          <h3 id={titleId} className={styles.title}>
            {project.title}
          </h3>
          {project.summary && <p className={styles.summary}>{project.summary}</p>}

          {project.flow && project.flow.length > 0 && (
            <section className={styles.block} aria-labelledby={`${titleId}-flow`}>
              <h4 id={`${titleId}-flow`} className={styles.blockTitle}>
                How it works
              </h4>
              <ol className={styles.flow}>
                {project.flow.map((step, index) => (
                  <li key={step} className={styles.step}>
                    <span className={styles.stepNum} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.tools && project.tools.length > 0 && (
            <section className={styles.block} aria-labelledby={`${titleId}-tools`}>
              <h4 id={`${titleId}-tools`} className={styles.blockTitle}>
                Tools used
              </h4>
              <ul className={styles.tools}>
                {project.tools.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {files.length > 0 && (
            <section className={styles.block} aria-labelledby={`${titleId}-files`}>
              <h4 id={`${titleId}-files`} className={styles.blockTitle}>
                Files
              </h4>
              <ul className={styles.files}>
                {files.map((file) => (
                  <li key={file.href}>
                    <a href={file.href} target="_blank" rel="noopener noreferrer" className={styles.file}>
                      <span className={styles.fileIcon} aria-hidden="true">
                        <FileText size={18} />
                      </span>
                      <span className={styles.fileText}>
                        <span className={styles.fileLabel}>
                          {file.label}
                          <ExternalLink size={14} aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </span>
                        {file.note && <span className={styles.fileNote}>{file.note}</span>}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.demo}`}>
              View demo
              <ExternalLink size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
