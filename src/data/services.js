// Services offered. Each card has WhatsApp and LinkedIn buttons; the WhatsApp
// message is pre-filled with the service title.
export const services = [
  {
    id: "chatbot",
    icon: "bot",
    title: "Custom AI Chatbot Development",
    points: ["Trained on your documents and data", "Answers customers 24/7", "Captures leads into your sheet or CRM"],
    tools: ["n8n", "OpenAI", "Supabase"],
  },
  {
    id: "voice",
    icon: "phone",
    title: "AI Voice Agent Setup",
    points: ["Answers inbound calls", "Books appointments in real time", "Logs every call for follow-up"],
    tools: ["Vapi", "OpenAI", "Google Calendar"],
  },
  {
    id: "workflow",
    icon: "workflow",
    title: "n8n Workflow Automation",
    points: ["Maps your repetitive tasks", "Connects your apps through APIs", "Error alerts so nothing breaks silently"],
    tools: ["n8n", "Zapier", "Make"],
  },
  {
    id: "leads",
    icon: "radar",
    title: "Lead Generation Automation",
    points: ["Google Maps and LinkedIn scraping", "Cleaned, de-duplicated lists", "Delivered to Google Sheets"],
    tools: ["Apify", "Google Sheets", "Webhooks"],
  },
  {
    id: "content",
    icon: "clapper",
    title: "AI Content & Video Automation",
    points: ["LinkedIn posts on a schedule", "Talking-avatar videos", "Short-form reels"],
    tools: ["OpenAI", "D-ID", "Kie AI"],
  },
  {
    id: "integration",
    icon: "plug",
    title: "API & CRM Integration",
    points: ["Syncs CRMs, sheets and databases", "Custom webhooks and endpoints", "Clean, structured data flow"],
    tools: ["APIs", "Airtable", "Notion"],
  },
];
