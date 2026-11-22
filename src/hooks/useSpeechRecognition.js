import { useCallback, useEffect, useRef, useState } from "react";

const ERROR_MESSAGES = {
  "not-allowed":
    "Microphone access is blocked. Allow mic permission in your browser settings, or type your message below.",
  "service-not-allowed":
    "Microphone access is blocked. Allow mic permission in your browser settings, or type your message below.",
  "no-speech": "I didn't catch that. Tap the mic and try again.",
  "audio-capture": "No microphone was found on this device. You can type your message below.",
  network: "Speech recognition needs an internet connection. Please try again.",
};

/**
 * Wraps the browser Web Speech API.
 * supported is null until checked on the client, then true/false.
 */
export function useSpeechRecognition({ lang = "en-US", onFinalResult } = {}) {
  const [supported, setSupported] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const recognitionRef = useRef(null);
  const callbackRef = useRef(onFinalResult);

  useEffect(() => {
    callbackRef.current = onFinalResult;
  }, [onFinalResult]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return undefined;
    }
    setSupported(true);

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      setTranscript((finalText || interimText).trim());
      if (finalText.trim() && callbackRef.current) callbackRef.current(finalText.trim());
    };
    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === "aborted") return;
      setErrorCode(event.error);
      setError(ERROR_MESSAGES[event.error] || "Speech recognition stopped unexpectedly. Please try again.");
    };

    recognitionRef.current = recognition;
    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
      try {
        recognition.abort();
      } catch {
        /* not running */
      }
      recognitionRef.current = null;
    };
  }, [lang]);

  const start = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    setError(null);
    setErrorCode(null);
    setTranscript("");
    try {
      recognition.start();
    } catch {
      /* already started */
    }
  }, []);

  const stop = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* not running */
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setErrorCode(null);
  }, []);

  const permissionDenied = errorCode === "not-allowed" || errorCode === "service-not-allowed";

  return { supported, listening, transcript, error, permissionDenied, start, stop, clearError };
}
