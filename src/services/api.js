// Network layer for the n8n webhooks. URLs come only from import.meta.env.

const SESSION_KEY = "executron_chat_session";
const REQUEST_TIMEOUT_MS = 45000;
let memorySessionId = null;

export class ApiError extends Error {
  constructor(message, code = "request_failed") {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

function createId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Session id persisted in sessionStorage, with an in-memory fallback. */
export function getSessionId() {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = createId();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    if (!memorySessionId) memorySessionId = createId();
    return memorySessionId;
  }
}

async function postJson(url, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error && error.name === "AbortError") {
      throw new ApiError("The request took too long. Please try again.", "timeout");
    }
    throw new ApiError("Couldn't reach the server. Check your connection and try again.", "network");
  } finally {
    clearTimeout(timer);
  }

  const raw = await response.text();
  let data = raw;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    /* plain-text response */
  }

  if (!response.ok) {
    throw new ApiError(`The server responded with an error (${response.status}). Please try again.`, "http");
  }
  return data;
}

function extractReply(data) {
  if (data == null) return "";
  if (typeof data === "string") return data.trim();
  const item = Array.isArray(data) ? data[0] : data;
  if (item == null) return "";
  if (typeof item === "string") return item.trim();
  const reply = item.output ?? item.reply ?? item.text;
  return typeof reply === "string" ? reply.trim() : "";
}

export function isChatConfigured() {
  return Boolean(import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL);
}

/** Sends one message to the n8n chat webhook and returns the agent's reply text. */
export async function sendChatMessage(text) {
  const url = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL;
  if (!url) {
    throw new ApiError(
      "The live demo isn't connected yet. Please check back soon or reach out through the contact form.",
      "not_configured",
    );
  }
  const data = await postJson(url, {
    action: "sendMessage",
    sessionId: getSessionId(),
    chatInput: text,
  });
  const reply = extractReply(data);
  if (!reply) throw new ApiError("The agent sent an empty reply. Please try again.", "empty");
  return reply;
}

/** Posts the contact form to the n8n contact webhook. */
export async function submitContact({ name, email, subject, message }) {
  const url = import.meta.env.VITE_N8N_CONTACT_WEBHOOK_URL;
  if (!url) {
    throw new ApiError(
      "The contact form isn't connected yet. Please email me directly in the meantime.",
      "not_configured",
    );
  }
  const data = await postJson(url, {
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    message,
    source: "executron-portfolio-contact",
  });
  const result = Array.isArray(data) ? data[0] : data;
  if (result && typeof result === "object" && result.success === false) {
    throw new ApiError("Your message couldn't be saved. Please try again.", "rejected");
  }
  return true;
}
