// Tech Stack cards. `node` is the short name shown on the live stack map,
// `fits` explains where that group sits in a typical automation.
export const techStack = [
  {
    id: "automation",
    title: "Automation & Integration",
    node: "Orchestrate",
    fits: "The engine room: n8n, Zapier and Make wire every step together through APIs and webhooks.",
    icon: "workflow",
    items: ["n8n", "Zapier", "Make", "Webhooks", "REST APIs"],
  },
  {
    id: "ai",
    title: "AI & LLMs",
    node: "AI Brain",
    fits: "The thinking layer: language models and agents that read, decide and write.",
    icon: "brain",
    items: ["OpenAI", "Claude", "Google Gemini", "AI Agents", "Prompt Engineering", "Structured Outputs"],
  },
  {
    id: "rag",
    title: "RAG & Data",
    node: "Knowledge",
    fits: "The memory: your documents and records, stored so the AI answers with your facts.",
    icon: "database",
    items: ["RAG Pipelines", "Embeddings", "Vector Databases (Supabase)", "PostgreSQL", "Google Sheets", "Airtable", "Notion"],
  },
  {
    id: "voice",
    title: "Voice, Avatar & Video",
    node: "Voice & Video",
    fits: "The voice and face: phone agents, talking avatars and generated video.",
    icon: "mic",
    items: ["Vapi", "D-ID", "Shotstack", "Kie AI"],
  },
  {
    id: "search",
    title: "Data Collection & Search",
    node: "Collect",
    fits: "The eyes: scrapers and search APIs that pull fresh data from the web.",
    icon: "search",
    items: ["Apify", "Tavily", "SearchApi", "YouTube Data API", "TradingView Charts (chart-img)"],
  },
  {
    id: "google",
    title: "Google, CRM & Documents",
    node: "Deliver",
    fits: "The hand-off: results land in Gmail, Calendar, your CRM or a polished PDF.",
    icon: "file",
    items: ["Google Workspace (Drive, Sheets, Calendar, Gmail)", "CRM Integrations", "PDFShift", "PDF.co"],
  },
];

// The moving tool strip shown just before About, in this order.
export const marqueeTools = [
  "n8n",
  "Zapier",
  "Make",
  "Vapi",
  "OpenAI",
  "Claude",
  "Gemini",
  "Supabase",
  "PostgreSQL",
  "APIs",
  "Webhooks",
  "Google Sheets",
  "Airtable",
  "Notion",
  "CRM",
  "RAG",
  "AI Agents",
];

export const toolCount = techStack.reduce((total, group) => total + group.items.length, 0);
