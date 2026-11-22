import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, MessageCircle, X } from "lucide-react";
import ChatThread from "./ChatThread";
import { useChat } from "../hooks/useChat";
import { worksSection } from "../data/site";
import styles from "./ChatWidget.module.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const chat = useChat({ greeting: worksSection.chatGreeting });
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector("input")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={styles.widget}>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="chat-widget-panel"
            role="dialog"
            aria-label="Chat with the Executron agent"
            className={styles.panel}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.header}>
              <span className={styles.headerIcon} aria-hidden="true">
                <Bot size={18} />
              </span>
              <div>
                <p className={styles.headerTitle}>Executron Agent</p>
                <p className={styles.headerSub}>AI demo · replies in seconds</p>
              </div>
              <button type="button" className={`icon-btn ${styles.close}`} onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={18} aria-hidden="true" />
              </button>
            </header>
            <div className={styles.body}>
              <ChatThread chat={chat} suggestions={worksSection.suggestions.slice(0, 2)} compact label="Chat widget conversation" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="chat-widget-panel"
        aria-label={open ? "Close chat" : "Open chat with the AI agent"}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.4, type: "spring", stiffness: 260, damping: 20 }}
        whileTap={{ scale: 0.92 }}
      >
        {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
      </motion.button>
    </div>
  );
}
