import { motion, useReducedMotion } from "framer-motion";
import {
  Binary,
  Bot,
  Braces,
  Clapperboard,
  Compass,
  ContactRound,
  FileDown,
  FileText,
  Globe,
  Hash,
  PhoneCall,
  Route,
  ScanSearch,
  SearchCode,
  Sparkles,
  Terminal,
  Video,
  Webhook,
  Brain,
  Database,
  FileText as FileTextIcon,
  Mic,
  Search,
  Workflow,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { techStack } from "../data/techStack";
import { techSection } from "../data/site";
import { brandIcons, getToolIcon } from "../data/toolIcons";
import styles from "./TechStack.module.css";

const ICONS = { workflow: Workflow, brain: Brain, database: Database, mic: Mic, search: Search, file: FileTextIcon };

const LUCIDE = {
  Binary,
  Bot,
  Braces,
  Clapperboard,
  Compass,
  ContactRound,
  FileDown,
  FileText,
  Globe,
  Hash,
  PhoneCall,
  Route,
  ScanSearch,
  SearchCode,
  Sparkles,
  Terminal,
  Video,
  Webhook,
};

function ToolGlyph({ name, size = 15 }) {
  const icon = getToolIcon(name);

  if (icon.brand) {
    const brand = brandIcons[icon.brand];
    if (!brand) return null;
    return (
      <svg viewBox={brand.viewBox} width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
        {brand.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  const LucideIcon = LUCIDE[icon.lucide] || Hash;
  return <LucideIcon size={size} aria-hidden="true" />;
}

export default function TechStack() {
  const reduce = useReducedMotion();
  const chipList = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: reduce ? 0 : 0.15 } },
  };
  const chip = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 6 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section id="tech-stack" className={`section ${styles.section}`} aria-labelledby="tech-title">
      <div className="container">
        <SectionHeading id="tech-title" eyebrow={techSection.eyebrow} title={techSection.heading} subtitle={techSection.subtitle} />

        <div className={styles.grid}>
          {techStack.map((group, index) => {
            const Icon = ICONS[group.icon] || Workflow;
            return (
              <motion.article
                key={group.id}
                className={`glass ${styles.card}`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: reduce ? 0 : (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <header className={styles.head}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3 className={styles.title}>{group.title}</h3>
                </header>
                <motion.ul
                  className={styles.chips}
                  variants={chipList}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {group.items.map((name) => (
                    <motion.li key={name} variants={chip} className={`chip ${styles.chip}`}>
                      <span className={styles.chipIcon} aria-hidden="true">
                        <ToolGlyph name={name} />
                      </span>
                      {name}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
