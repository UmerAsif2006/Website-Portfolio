import { Suspense, lazy, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AudioLines, MessageSquareText } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ChatDemo from "./ChatDemo";
import { worksSection } from "../data/site";
import { isChatConfigured } from "../services/api";
import styles from "./Works.module.css";

const VoiceDemo = lazy(() => import("./VoiceDemo"));

const TABS = [
  { id: "chat", label: "Chat Agent", icon: MessageSquareText },
  { id: "voice", label: "Voice Agent", icon: AudioLines },
];

export default function Works() {
  const [tab, setTab] = useState("chat");
  const tabRefs = useRef([]);
  const reduce = useReducedMotion();
  const online = isChatConfigured();

  const onKeyDown = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="works" className={`section ${styles.section}`} aria-labelledby="works-title">
      <div className="container">
        <SectionHeading id="works-title" eyebrow={worksSection.eyebrow} title={worksSection.heading} subtitle={worksSection.subtitle} />

        <motion.div
          className={`glass ${styles.panel}`}
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.bar}>
            <div className={styles.tabs} role="tablist" aria-label="Live demos">
              {TABS.map((item, index) => {
                const Icon = item.icon;
                const selected = tab === item.id;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    id={`tab-${item.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                    onClick={() => setTab(item.id)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    {selected && <motion.span layoutId="works-tab" className={styles.tabBg} transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                    <Icon size={16} aria-hidden="true" className={styles.tabIcon} />
                    <span className={styles.tabLabel}>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <span className={`${styles.status} ${online ? styles.online : ""}`}>
              <span className={styles.statusDot} aria-hidden="true" />
              {online ? "Agent online" : "Demo offline"}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "chat" ? (
                <ChatDemo />
              ) : (
                <Suspense fallback={<div className={styles.loading} />}>
                  <VoiceDemo />
                </Suspense>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
