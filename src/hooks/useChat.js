import { useCallback, useRef, useState } from "react";
import { sendChatMessage } from "../services/api";

let counter = 0;
const nextId = () => `m-${Date.now().toString(36)}-${(counter += 1)}`;

/** Chat state shared by the chat demo, voice demo and floating widget. */
export function useChat({ greeting } = {}) {
  const [messages, setMessages] = useState(() =>
    greeting ? [{ id: "greeting", role: "assistant", content: greeting }] : [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadingRef = useRef(false);
  const lastUserText = useRef(null);

  const request = useCallback(async (text) => {
    loadingRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const reply = await sendChatMessage(text);
      setMessages((prev) => [...prev, { id: nextId(), role: "assistant", content: reply }]);
      return reply;
    } catch (err) {
      setError(err && err.message ? err.message : "Something went wrong. Please try again.");
      return null;
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  const send = useCallback(
    async (raw) => {
      const text = (raw || "").trim();
      if (!text || loadingRef.current) return null;
      lastUserText.current = text;
      setMessages((prev) => [...prev, { id: nextId(), role: "user", content: text }]);
      return request(text);
    },
    [request],
  );

  const retry = useCallback(async () => {
    if (!lastUserText.current || loadingRef.current) return null;
    return request(lastUserText.current);
  }, [request]);

  const dismissError = useCallback(() => setError(null), []);

  return { messages, send, retry, isLoading, error, dismissError };
}
