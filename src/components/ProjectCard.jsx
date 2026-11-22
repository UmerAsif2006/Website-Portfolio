import { ArrowUpRight, Bot, Database, Mic, PenSquare, PlayCircle } from "lucide-react";
import styles from "./ProjectCard.module.css";

export const CATEGORY_ICONS = {
  "Chatbots & Agents": Bot,
  "Data & Scraping": Database,
  "Content Automation": PenSquare,
  "Voice & Avatar": Mic,
};

// Each category gets its own accent so the grid reads as colorful, not monochrome.
export const CATEGORY_COLORS = {
  "Chatbots & Agents": "var(--color-cyan)",
  "Data & Scraping": "var(--color-violet)",
  "Content Automation": "var(--color-orange)",
  "Voice & Avatar": "var(--color-yellow)",
};

const MAX_TOOLS = 4;

export function ScreenshotPlaceholder({ project, index, large = false }) {
  const Icon = CATEGORY_ICONS[project.category] || Bot;
  return (
    <div style={{ "--cat": CATEGORY_COLORS[project.category] }} className={`${styles.placeholder} ${large ? styles.placeholderLarge : ""}`} role="img" aria-label={`${project.title}: screenshot coming soon`}>
      <svg className={styles.network} viewBox="0 0 160 100" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <path d="M10 70 L45 30 L80 60 L115 25 L150 55" />
        <path d="M45 30 L80 80 L115 25" />
        {[
          [10, 70],
          [45, 30],
          [80, 60],
          [115, 25],
          [150, 55],
          [80, 80],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" />
        ))}
      </svg>
      <span className={styles.placeholderIcon}>
        <Icon size={large ? 32 : 26} aria-hidden="true" />
      </span>
      {typeof index === "number" && <span className={styles.placeholderIndex}>{String(index + 1).padStart(2, "0")}</span>}
      {large && <span className={styles.placeholderText}>Screenshot coming soon</span>}
    </div>
  );
}

export default function ProjectCard({ project, index, onOpen }) {
  const cover = project.screenshots && project.screenshots[0];
  const extraTools = project.tools.length - MAX_TOOLS;
  const hasVideo = project.videos && project.videos.length > 0;

  return (
    <article className={`glass ${styles.card}`} style={{ "--cat": CATEGORY_COLORS[project.category] }}>
      <div className={styles.media}>
        {cover ? (
          <img src={cover.src} alt={cover.alt || `${project.title} screenshot`} loading="lazy" decoding="async" className={styles.image} />
        ) : (
          <ScreenshotPlaceholder project={project} index={index} />
        )}
        {hasVideo && (
          <span className={styles.videoBadge}>
            <PlayCircle size={14} aria-hidden="true" />
            Video
          </span>
        )}
      </div>

      <div className={styles.body}>
        <span className={`mono-label ${styles.category}`}>{project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        {project.tools.length > 0 && (
          <ul className={styles.tools} aria-label="Tools used">
            {project.tools.slice(0, MAX_TOOLS).map((tool) => (
              <li key={tool} className="chip">
                {tool}
              </li>
            ))}
            {extraTools > 0 && <li className={`chip ${styles.more}`}>+{extraTools}</li>}
          </ul>
        )}

        <button type="button" className={`btn btn-ghost btn-sm ${styles.details}`} onClick={(event) => onOpen(project, event.currentTarget)}>
          View Details
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only">about {project.title}</span>
        </button>
      </div>
    </article>
  );
}
