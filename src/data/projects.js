import ragWorkflow from "../assets/projects/rag-chatbot-workflow.png.asset.json";
import ragWorkflowV2 from "../assets/projects/rag-chatbot-workflow-v2.png.asset.json";
import ragKnowledgeFiles from "../assets/projects/rag-chatbot-knowledge-files.png.asset.json";
import ragBusinessSheet from "../assets/projects/rag-chatbot-business-sheet.png.asset.json";
import ragLiveData from "../assets/projects/rag-chatbot-live-data.png.asset.json";
import ragCrmLeads from "../assets/projects/rag-chatbot-crm-leads.png.asset.json";
import stockChatbot from "../assets/projects/stock-sentiment-chatbot.png.asset.json";
import stockChart from "../assets/projects/stock-sentiment-chart-analysis.png.asset.json";
import serpWorkflow from "../assets/projects/serp-chatbot-workflow.png.asset.json";
import linkedinScraper from "../assets/projects/linkedin-scraper-workflow.png.asset.json";
import linkedinAutomator from "../assets/projects/linkedin-automator-workflow.png.asset.json";
import avatarWorkflow from "../assets/projects/talking-avatar-workflow.png.asset.json";
import avatarVideo from "../assets/projects/talking-avatar-result.mp4.asset.json";
import mapsWorkflow from "../assets/projects/maps-leads-workflow.png.asset.json";
import youtubeWorkflow from "../assets/projects/youtube-course-workflow.png.asset.json";
import kieWorkflow from "../assets/projects/kie-reels-workflow.png.asset.json";
import kieVideo from "../assets/projects/kie-reels-result.mp4.asset.json";
import cvWorkflow from "../assets/projects/cv-maker-workflow.png.asset.json";
import sampleCv from "../assets/projects/sample-generated-cv.pdf.asset.json";
import vapiWorkflow from "../assets/projects/vapi-voice-agent-workflow.png.asset.json";

// screenshots: [{ src, alt }]. Empty arrays render a "Screenshot coming soon" placeholder.
// videos: [{ src, title }]. Shown first in the project popup.
// files: [{ href, label, note }]. Shown as links in the project popup.
// demoUrl: string or null. Blocks with null/empty data are hidden automatically.

export const categories = [
  "All",
  "Chatbots & Agents",
  "Data & Scraping",
  "Content Automation",
  "Voice & Avatar",
];

export const projects = [
  {
    id: "rag-chatbot",
    title: "RAG Business / Website / Social Media Chatbot",
    category: "Chatbots & Agents",
    summary:
      "An AI assistant that learns from a business's own documents and answers customers accurately, with tool access to Google Sheets, Calendar and Gmail to take real actions.",
    tools: ["n8n", "OpenAI", "Supabase Vector Store", "Embeddings", "Google Sheets", "Google Calendar", "Gmail"],
    flow: [
      "Documents land in Google Drive",
      "Content is chunked and embedded",
      "Stored in the vector database",
      "Chat agent retrieves answers and uses Sheets, Calendar and Gmail tools",
    ],
    screenshots: [
      { src: ragWorkflow.url, alt: "n8n workflow: Google Drive documents embedded into a Supabase vector store, with a chat agent using Sheets, Calendar and Gmail tools" },
      { src: ragWorkflowV2.url, alt: "Second version of the RAG chatbot workflow with document sync and a Sheets-powered AI agent" },
      { src: ragKnowledgeFiles.url, alt: "Google Drive folder with the sample business documents the chatbot learns from" },
      { src: ragBusinessSheet.url, alt: "Google Sheet with the sample business profile the chatbot reads live" },
      { src: ragLiveData.url, alt: "Google Drive folder with the live business data and CRM leads sheets" },
      { src: ragCrmLeads.url, alt: "CRM leads sheet filled in automatically by the chatbot during a conversation" },
    ],
    demoUrl: null,
  },
  {
    id: "stock-sentiment",
    title: "Sentiment Analysis of Public Stock Opinion",
    category: "Chatbots & Agents",
    summary:
      "A stock intelligence chatbot that merges live news sentiment with TradingView chart and MACD momentum analysis into one structured market read.",
    tools: ["n8n", "OpenAI", "Tavily", "TradingView (chart-img)"],
    flow: [
      "User asks about a ticker",
      "Technical-analysis sub-workflow renders the chart and reads MACD momentum",
      "Live news and sentiment search",
      "Agent synthesizes a structured analysis",
    ],
    screenshots: [
      { src: stockChatbot.url, alt: "n8n chat agent with Tavily news search, a Think tool and a technical-analysis sub-workflow" },
      { src: stockChart.url, alt: "Technical-analysis sub-workflow that renders a TradingView chart and reads it with AI" },
    ],
    demoUrl: null,
  },
  {
    id: "serp-chatbot",
    title: "SERP API Chatbot",
    category: "Chatbots & Agents",
    summary:
      "A research chatbot that searches Google in real time, cross-checks sources and answers with current, verified information.",
    tools: ["n8n", "OpenAI", "SearchApi"],
    flow: [
      "Question received",
      "Agent plans targeted searches",
      "Google results fetched via SearchApi",
      "Think tool validates and compares sources",
      "Synthesized answer",
    ],
    screenshots: [{ src: serpWorkflow.url, alt: "n8n chat agent with SearchApi Google search and a Think tool" }],
    demoUrl: null,
  },
  {
    id: "linkedin-scraper",
    title: "LinkedIn Post Scraper",
    category: "Data & Scraping",
    summary:
      "Tracks selected industry voices, pulls their top-performing posts by engagement, removes duplicates and stores everything in Google Sheets.",
    tools: ["n8n", "Apify", "Google Sheets"],
    flow: [
      "Creator list in Google Sheets",
      "Apify scrapes their posts",
      "Filter high-engagement posts",
      "Skip posts already saved",
      "Append to the content sheet",
    ],
    screenshots: [{ src: linkedinScraper.url, alt: "n8n workflow looping over creators, scraping posts with Apify and appending new ones to Google Sheets" }],
    demoUrl: null,
  },
  {
    id: "linkedin-automator",
    title: "LinkedIn Post Automator",
    category: "Content Automation",
    summary:
      "Rewrites top-performing posts in your own brand voice, polishes them professionally and publishes them to your LinkedIn account automatically.",
    tools: ["n8n", "OpenAI", "Google Sheets", "LinkedIn"],
    flow: [
      "Select top posts from the content sheet",
      "AI agent rewrites them in your branding",
      "Publishes to LinkedIn automatically",
    ],
    screenshots: [{ src: linkedinAutomator.url, alt: "n8n workflow that rewrites selected posts with AI and publishes them to LinkedIn" }],
    demoUrl: null,
  },
  {
    id: "talking-avatar",
    title: "AI Talking Avatar Automation",
    category: "Voice & Avatar",
    summary:
      "Turns a simple form submission into a finished talking-avatar video, scripted by AI and rendered automatically.",
    tools: ["n8n", "Google Gemini", "D-ID", "Shotstack", "Kie AI"],
    flow: [
      "Form submission",
      "AI agent writes the script",
      "Avatar video generated and rendered",
      "Finished video delivered",
    ],
    screenshots: [{ src: avatarWorkflow.url, alt: "n8n workflow from form submission to AI script, avatar generation and video rendering" }],
    videos: [{ src: avatarVideo.url, title: "Talking-avatar video made by this automation" }],
    demoUrl: null,
  },
  {
    id: "maps-leads",
    title: "Google Maps Lead Generation Automation",
    category: "Data & Scraping",
    summary:
      "Enter a business type and location in a form and receive a clean, de-duplicated lead list in Google Sheets.",
    tools: ["n8n", "Apify", "Google Sheets"],
    flow: [
      "Form with business type and location",
      "Apify scrapes Google Maps",
      "Data cleaned and duplicates removed",
      "Leads appended to Google Sheets",
    ],
    screenshots: [{ src: mapsWorkflow.url, alt: "n8n workflow scraping Google Maps with Apify, cleaning results and saving leads to Google Sheets" }],
    demoUrl: null,
  },
  {
    id: "youtube-course",
    title: "YouTube Research & Course Generation Automation",
    category: "Content Automation",
    summary:
      "Takes a learning goal, researches YouTube, scores videos and channels for quality, and delivers a structured course as a PDF.",
    tools: ["n8n", "OpenAI", "YouTube Data API", "PDF.co"],
    flow: [
      "Chat intake agent captures the goal",
      "YouTube search, video and channel stats retrieved",
      "Scoring ranks the best content",
      "Structured course exported to PDF",
    ],
    screenshots: [{ src: youtubeWorkflow.url, alt: "n8n workflow with an intake agent, YouTube search and stats, scoring and PDF export" }],
    demoUrl: null,
  },
  {
    id: "kie-reels",
    title: "Kie AI Reel Automation",
    category: "Content Automation",
    summary:
      "Produces short-form reels end to end: AI-crafted concepts and prompts, rendered through Kie AI and tracked in Google Sheets.",
    tools: ["n8n", "OpenAI", "Kie AI", "Google Sheets"],
    flow: [
      "AI agents craft the concept and prompts",
      "Kie AI generates the media",
      "Results tracked in Google Sheets",
    ],
    screenshots: [{ src: kieWorkflow.url, alt: "n8n workflow with AI agents writing prompts, Kie AI generation and Google Sheets tracking" }],
    videos: [{ src: kieVideo.url, title: "Reel generated by this automation" }],
    demoUrl: null,
  },
  {
    id: "cv-maker",
    title: "AI CV Maker Automation",
    category: "Content Automation",
    summary:
      "An AI agent that builds or updates an ATS-friendly CV from a simple form and saves a polished PDF straight to Google Drive.",
    tools: ["n8n", "OpenAI", "PDFShift", "Google Drive"],
    flow: [
      "Form submission with optional CV upload",
      "Existing CV text extracted",
      "AI agent creates or updates the CV",
      "PDF rendered",
      "Saved to Google Drive",
    ],
    screenshots: [{ src: cvWorkflow.url, alt: "n8n workflow from form submission and CV extraction to AI rewrite, PDF rendering and Google Drive upload" }],
    files: [
      {
        href: sampleCv.url,
        label: "Sample generated CV (PDF)",
        note: "Sample output made with test details to show the result. Not my original CV.",
      },
    ],
    demoUrl: null,
  },
  {
    id: "vapi-voice-agent",
    title: "AI Vapi Voice Agent Automation",
    category: "Voice & Avatar",
    summary:
      "A real-time voice agent on Vapi, backed by n8n webhooks that read and write Google Calendar and Sheets during the call.",
    tools: ["Vapi", "n8n Webhooks", "Google Calendar", "Google Sheets"],
    flow: [
      "Caller speaks to the Vapi agent",
      "Vapi triggers n8n webhooks",
      "Workflow reads and writes Calendar and Sheets",
      "Response returns to the caller in real time",
    ],
    screenshots: [{ src: vapiWorkflow.url, alt: "n8n webhooks the Vapi voice agent calls to check, book, cancel and update Google Calendar events" }],
    demoUrl: null,
  },
];
