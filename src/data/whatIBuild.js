// "What I Build" cards. `icon` is a key in WhatIBuild.jsx, `stack` shows the tools used.
export const whatIBuild = [
  {
    id: "rag-chatbots",
    icon: "bot",
    title: "RAG Chatbots",
    text: "Assistants trained on your documents, sheets and CRM data that answer with your facts, not guesses, and capture leads while they chat.",
    stack: ["n8n", "OpenAI", "Supabase"],
  },
  {
    id: "voice-agents",
    icon: "phone",
    title: "AI Voice Agents",
    text: "Phone agents that answer calls, understand what the caller wants and book appointments straight into the calendar.",
    stack: ["Vapi", "OpenAI", "Calendar"],
  },
  {
    id: "ai-agents",
    icon: "brain",
    title: "Tool-Using AI Agents",
    text: "Agents that reason, search the web, call APIs and finish multi-step tasks, like market research or stock sentiment reports.",
    stack: ["OpenAI", "Tavily", "SearchApi"],
  },
  {
    id: "lead-engines",
    icon: "radar",
    title: "Lead & Data Engines",
    text: "Scrapers that pull businesses and profiles from Google Maps and LinkedIn, then clean, de-duplicate and store them ready for outreach.",
    stack: ["Apify", "Google Sheets", "n8n"],
  },
  {
    id: "content-studios",
    icon: "clapper",
    title: "AI Content Studios",
    text: "Pipelines that write LinkedIn posts, create talking-avatar videos and generate short reels with very little manual work.",
    stack: ["D-ID", "Kie AI", "Shotstack"],
  },
  {
    id: "document-automation",
    icon: "file",
    title: "Document Automation",
    text: "Systems that turn raw inputs into polished CVs, course plans and reports, delivered as ready-to-send PDFs.",
    stack: ["PDFShift", "PDF.co", "Gmail"],
  },
];
