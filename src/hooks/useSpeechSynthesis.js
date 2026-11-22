import { useCallback, useEffect, useState } from "react";

const toSpeakable = (text) =>
  text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[*_`#>]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "link")
    .trim();

function pickVoice(voices) {
  const english = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));
  return (
    english.find((v) => /natural|google|samantha|daniel|aria|jenny/i.test(v.name)) ||
    english[0] ||
    null
  );
}

/** Speaks text with the browser speechSynthesis API. */
export function useSpeechSynthesis() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return undefined;
    setSupported(true);
    window.speechSynthesis.getVoices();
    return () => window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback((text, { onEnd } = {}) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) {
      onEnd?.();
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(toSpeakable(text));
    const voice = pickVoice(synth.getVoices());
    if (voice) utterance.voice = voice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    const finish = () => {
      setSpeaking(false);
      onEnd?.();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    synth.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { supported, speaking, speak, cancel };
}
