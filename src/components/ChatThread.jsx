import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Bot, RotateCcw, SendHorizontal, User } from "lucide-react";
import styles from "./ChatThread.module.css";

/** Renders **bold**, line breaks and "- " bullets without injecting HTML. */
function RichText({ text }) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => {
    const bullet = /^\s*[-*•]\s+/.test(line);
    const clean = bullet ? line.replace(/^\s*[-*•]\s+/, "") : line;
    const parts = clean.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
    );
    return (
      <Fragment key={lineIndex}>
        {bullet ? <span className={styles.bullet}>{parts}</span> : parts}
        {lineIndex < lines.length - 1 && !bullet && <br />}
      </Fragment>
    );
  });
}

export default function ChatThread({ chat, suggestions = [], compact = false, label = "Chat with the demo agent", placeholder = "Type your message..." }) {
  const { messages, send, retry, isLoading, error } = chat;
  const [input, setInput] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const reduce = useReducedMotion();
  const showSuggestions = suggestions.length > 0 && !messages.some((m) => m.role === "user");

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, isLoading, error, reduce]);

  const submit = (event) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    send(input);
    setInput("");
  };

  return (
    <div className={`${styles.thread} ${compact ? styles.compact : ""}`}>
      <div ref={listRef} className={styles.messages} role="log" aria-live="polite" aria-label={label}>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`${styles.row} ${message.role === "user" ? styles.rowUser : ""}`}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.avatar} aria-hidden="true">
                {message.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </span>
              <p className={`${styles.bubble} ${message.role === "user" ? styles.user : styles.assistant}`}>
                <span className="sr-only">{message.role === "user" ? "You: " : "Agent: "}</span>
                <RichText text={message.content} />
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className={styles.row} aria-label="Agent is typing">
            <span className={styles.avatar} aria-hidden="true">
              <Bot size={14} />
            </span>
            <span className={`${styles.bubble} ${styles.assistant} ${styles.typing}`}>
              <span />
              <span />
              <span />
            </span>
          </div>
        )}

        {error && !isLoading && (
          <div className={styles.error} role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{error}</span>
            <button type="button" className={styles.retry} onClick={retry}>
              <RotateCcw size={14} aria-hidden="true" />
              Retry
            </button>
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className={styles.suggestions} aria-label="Suggested questions">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" className={styles.suggestion} onClick={() => send(suggestion)} disabled={isLoading}>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form className={styles.form} onSubmit={submit}>
        <label className="sr-only" htmlFor={compact ? "widget-chat-input" : "demo-chat-input"}>
          Message
        </label>
        <input
          ref={inputRef}
          id={compact ? "widget-chat-input" : "demo-chat-input"}
          className={styles.input}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          maxLength={1000}
        />
        <button type="submit" className={styles.send} disabled={!input.trim() || isLoading} aria-label="Send message">
          <SendHorizontal size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
