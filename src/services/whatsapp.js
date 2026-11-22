import { site } from "../data/site";

/** Opens a WhatsApp chat with the owner, optionally with a pre-filled message. */
export function whatsappUrl(message) {
  const base = "https://wa.me/" + site.whatsappParts.join("");
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function openWhatsApp(message) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}
