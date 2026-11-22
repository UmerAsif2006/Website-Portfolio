import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Info, Mic, Square, Volume2 } from "lucide-react";
import ChatThread from "./ChatThread";
import { useChat } from "../hooks/useChat";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { worksSection } from "../data/site";
import styles from "./VoiceDemo.module.css";

const STATUS_TEXT = {
  idle: "Tap the mic and start talking",
  listening: "Listening...",
  thinking: "Thinking...",
  speaking: "Speaking... tap to stop",
};

const BARS = 28;

function Waveform({ state }) {
  const reduce = useReducedMotion();
  return (
    <div className={`${styles.wave} ${styles[state]}`} aria-hidden="true">
      {Array.from({ length: BARS }, (_, i) => {
        const base = 0.25 + Math.abs(Math.sin(i * 0.9)) * 0.35;
        const active = state === "listening" || state === "speaking";
        const peak = state === "speaking" ? 1 : 0.85;
        return (
          <motion.span
            key={i}
            className={styles.bar}
            initial={false}
            animate={
              reduce
                ? { scaleY: active ? 0.7 : 0.2 }
                : active
                  ? { scaleY: [base, peak * (0.5 + ((i * 7) % 5) / 10), base * 0.6, base] }
                  : state === "thinking"
                    ? { scaleY: [0.18, 0.4, 0.18], opacity: [0.5, 1, 0.5] }
                    : { scaleY: 0.15 + base * 0.2 }
            }
            transition={
              reduce || state === "idle"
                ? { duration: 0.3 }
                : { duration: state === "thinking" ? 1.2 : 0.7 + (i % 4) * 0.12, repeat: Infinity, ease: "easeInOut", delay: state === "thinking" ? i * 0.04 : 0 }
            }
          />
        );
      })}
    </div>
  );
}

export default function VoiceDemo() {
  const chat = useChat();
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const { send } = chat;

  const handleFinal = useCallback(
    async (text) => {
      const reply = await send(text);
      if (reply) speak(reply);
    },
    [send, speak],
  );

  const recognition = useSpeechRecognition({ onFinalResult: handleFinal });
  const { supported, listening, transcript, error, permissionDenied, start, stop } = recognition;

  const state = listening ? "listening" : chat.isLoading ? "thinking" : speaking ? "speaking" : "idle";
  const lastReply = [...chat.messages].reverse().find((m) => m.role === "assistant");

  const onMic = () => {
    if (state === "listening") stop();
    else if (state === "speaking") cancel();
    else if (state === "idle") start();
  };

  if (supported === null) {
    return <div className={styles.loading} aria-hidden="true" />;
  }

  if (supported === false || permissionDenied) {
    return (
      <div className={styles.fallback}>
        <p className={styles.notice} role="status">
          <Info size={18} aria-hidden="true" />
          {supported === false
            ? "Voice input isn't supported in this browser (try Chrome or Edge). You can chat with the same agent by text below."
            : error}
        </p>
        <ChatThread chat={chat} suggestions={worksSection.suggestions} label="Voice agent text fallback" />
      </div>
    );
  }

  return (
    <div className={styles.voice}>
      <div className={styles.stage}>
        <Waveform state={state} />

        <motion.button
          type="button"
          className={`${styles.mic} ${styles[`mic_${state}`]}`}
          onClick={onMic}
          disabled={state === "thinking"}
          aria-label={state === "listening" ? "Stop listening" : state === "speaking" ? "Stop speaking" : "Start talking to the voice agent"}
          whileTap={{ scale: 0.94 }}
        >
          {state === "listening" || state === "speaking" ? <Square size={26} aria-hidden="true" /> : <Mic size={30} aria-hidden="true" />}
          {state === "listening" && <span className={styles.ring} aria-hidden="true" />}
        </motion.button>

        <p className={`mono-label ${styles.status}`} aria-live="polite">
          {STATUS_TEXT[state]}
        </p>
      </div>

      <div className={styles.transcripts}>
        <div className={styles.line}>
          <span className={styles.lineLabel}>
            <Mic size={14} aria-hidden="true" /> You said
          </span>
          <p className={styles.lineText}>{transcript || <span className={styles.placeholder}>Your words will appear here.</span>}</p>
        </div>
        <div className={styles.line}>
          <span className={styles.lineLabel}>
            <Volume2 size={14} aria-hidden="true" /> Agent
          </span>
          <p className={styles.lineText}>{lastReply ? lastReply.content : <span className={styles.placeholder}>The agent's spoken reply will appear here.</span>}</p>
        </div>

        {(error || chat.error) && (
          <p className={styles.error} role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{error || chat.error}</span>
            {chat.error && !error && (
              <button type="button" className={styles.retry} onClick={async () => {
                const reply = await chat.retry();
                if (reply) speak(reply);
              }}>
                Retry
              </button>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
