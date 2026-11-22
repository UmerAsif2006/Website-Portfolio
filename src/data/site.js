// All site copy lives here so it can be edited without touching components.
import { toolCount } from "./techStack";

export const site = {
  brand: "Executron AI Automations",
  shortBrand: "Executron",
  brandSuffix: "AI Automations",
  name: "Muhammad Umer Asif",
  taglineSub: "Building workflows that run while you sleep",
  role: "AI Automation Engineer",
  email: "umer.asifham@gmail.com",
  linkedin: "https://www.linkedin.com/in/mu-umer-asif",
  // Country code, network and number. The owner shows it in Contact as "+92 300 7300009".
  whatsappParts: ["92", "300", "7300009"],
  url: "https://executron-ai-automations.vercel.app",
};

/** "+92 300 7300009" for display. */
export const phoneDisplay = `+${site.whatsappParts.join(" ")}`;

export const seo = {
  title: "Executron AI Automations | Muhammad Umer Asif, AI Automation Engineer",
  description:
    "Muhammad Umer Asif builds RAG chatbots, real-time voice agents and n8n workflow automations that remove repetitive work. Explore services, projects and live AI demos.",
  keywords:
    "AI automation engineer, n8n workflow automation, RAG chatbot, AI voice agent, Vapi, OpenAI, AI agents, business automation, Executron AI Automations, Muhammad Umer Asif",
  ogImage: "https://executron-ai-automations.vercel.app/og-image.png",
  themeColor: "#F6F6F1",
  themeColorDark: "#05060A",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "what-i-build", label: "What I Build" },
  { id: "services", label: "Services" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  label: "EXECUTRON AI AUTOMATIONS",
  // Shown under the static role line, one at a time, fading in and out.
  rotatingTags: ["RAG Chatbots", "Voice Agents", "Workflow Automation", "Founder, Executron AI Automations"],
  valueLines: [
    "Building AI chatbots, voice agents and workflow automations",
    "that remove repetitive work, so teams can focus on what matters.",
  ],
  ctas: {
    projects: "View Projects",
    demo: "Try Live Demo",
    contact: "Contact Me",
  },
  // The live code window beside the name. Sample data only, cycles one workflow at a time.
  consoles: [
    {
      file: "voice-agent.workflow",
      nodes: ["Inbound Call", "Vapi Agent", "Intent", "Calendar", "Sheets Log"],
      hot: 2,
      output: [
        ["caller", '"+92 ••• 4417"'],
        ["intent", '"book_appointment"'],
        ["slot", '"Thu 11:30"'],
        ["confirmed", "true"],
      ],
    },
    {
      file: "rag-chatbot.workflow",
      nodes: ["Question", "Embed", "Supabase Vectors", "GPT", "Answer"],
      hot: 2,
      output: [
        ["query", '"What are your opening hours?"'],
        ["chunks", "4"],
        ["source", '"business_sheet"'],
        ["grounded", "true"],
      ],
    },
    {
      file: "maps-leads.workflow",
      nodes: ["Keyword", "Apify Scraper", "Clean", "Dedupe", "Google Sheets"],
      hot: 1,
      output: [
        ["search", '"dentists in Lahore"'],
        ["found", "60"],
        ["with_phone", "48"],
        ["saved", "true"],
      ],
    },
  ],
};

export const about = {
  heading: "About Me",
  lead: "Designing AI-driven systems, from chatbots and voice agents to data pipelines and automated workflows, that remove repetitive work and save teams hours every week. Reliable, simple to maintain, and built to last.",
  paragraphs: [
    "Most businesses lose hours every week to work that a well-built system could handle: answering the same questions, chasing leads, copying data between tools. I fix that.",
  ],
  founderLine: "As the founder of Executron AI Automations, building the AI systems that take over those tasks:",
  bullets: [
    "RAG chatbots trained on your business's own knowledge, so they give accurate answers instead of generic ones",
    "Voice agents that pick up calls and book appointments in real time",
    "Scraping and content engines that collect data and produce content on their own",
  ],
  closing:
    "As a computer scientist, building automation the way software should be built: structured, tested, and made to last. My skills cover RAG chatbots, voice agents, data pipelines, and API-driven workflows, turning a rough idea into something your team can rely on from day one.",
  ctaLine: "Got a process that keeps eating your time? Let's fix it.",
  // Only true numbers: 11 projects on this page, and the tools listed in Tech Stack.
  highlights: [
    { icon: "workflow", value: "11", label: "Automation Solutions Built" },
    { icon: "plug", value: String(toolCount), label: "Tools & APIs in My Stack" },
    { icon: "clock", value: "24/7", label: "Workflows That Never Sleep" },
    { icon: "target", value: null, label: "End-to-End Delivery" },
  ],
};

export const experienceSection = {
  heading: "Experience & Education",
  closingLine:
    "Requirements to deployment, handled end to end, with solutions built to perform from day one.",
  // The live box beside the timeline.
  flow: {
    label: "Delivery pipeline",
    status: "running",
    steps: [
      { title: "Business Problem", note: "Find the task that eats your hours" },
      { title: "Workflow Map", note: "Every trigger, step and edge case" },
      { title: "AI Logic", note: "Prompts, agents and knowledge" },
      { title: "Integrations", note: "APIs, CRM, Sheets, calendars" },
      { title: "Testing", note: "Real inputs, error handling" },
      { title: "Live System", note: "Deployed and handed over", result: true },
    ],
  },
};

export const whatIBuildSection = {
  heading: "What I Build",
  subtitle: "The kinds of systems behind every project on this page.",
};

export const servicesSection = {
  heading: "Services",
  subtitle: "Pick what you need and message me directly. No forms, no waiting.",
};

export const techSection = {
  heading: "The tools behind every build",
  subtitle: "Hover or tap a group to see where it fits in an automation.",
};

export const projectsSection = {
  heading: "Automation Projects",
  subtitle: "Eleven production-style workflows across chat, voice, data and content.",
};

export const worksSection = {
  heading: "Try It Live",
  subtitle: "Talk to a live AI agent running on an n8n workflow, by text or by voice.",
  chatGreeting:
    "Hi, I'm the Executron demo agent. Ask me about AI automation, chatbots, voice agents or any of the projects on this page.",
  suggestions: [
    "What can you automate for a small business?",
    "How does a RAG chatbot work?",
    "Tell me about the Vapi voice agent project",
  ],
};

export const contactSection = {
  heading: "Let's build your automation",
  subtitle:
    "Have a workflow that eats hours every week? Describe it and I'll get back to you.",
};

export const footer = {
  tagline: "AI chatbots, voice agents and workflow automations.",
};
