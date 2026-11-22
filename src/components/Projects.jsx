import { Suspense, lazy, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { categories, projects } from "../data/projects";
import { projectsSection } from "../data/site";
import styles from "./Projects.module.css";

const ProjectModal = lazy(() => import("./ProjectModal"));

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const openProject = (project, trigger) => {
    triggerRef.current = trigger;
    setSelected(project);
  };

  const closeProject = () => {
    setSelected(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" eyebrow={projectsSection.eyebrow} title={projectsSection.heading} subtitle={projectsSection.subtitle} />

        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {categories.map((category) => {
            const count = category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                className={`${styles.filter} ${active ? styles.filterActive : ""}`}
                aria-pressed={active}
                onClick={() => setFilter(category)}
              >
                {category}
                <span className={styles.count}>{count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        <motion.ul layout={!reduce} className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.li
                key={project.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={styles.item}
              >
                <ProjectCard project={project} index={projects.indexOf(project)} onOpen={openProject} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={closeProject} />}</AnimatePresence>
      </Suspense>
    </section>
  );
}
