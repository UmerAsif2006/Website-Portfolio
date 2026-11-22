// SEO for the single page. TanStack Start renders these tags server-side through the
// route head() option (the platform's replacement for react-helmet-async).
import { seo, site } from "../data/site";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      url: site.url,
      sameAs: [site.linkedin],
      worksFor: { "@type": "Organization", name: site.brand },
      knowsAbout: ["AI automation", "n8n", "RAG chatbots", "AI voice agents", "OpenAI", "Workflow automation"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.brand,
      url: site.url,
      description: seo.description,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export function buildSeoHead() {
  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords },
      { name: "author", content: site.name },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.brand },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:url", content: site.url },
      { property: "og:image", content: seo.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${site.brand}: ${site.name}, ${site.role}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: seo.ogImage },
    ],
    links: [{ rel: "canonical", href: site.url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}

/** Accessible "skip to content" link rendered at the top of the page. */
export default function SEO() {
  return (
    <a href="#about" className="skip-link">
      Skip to content
    </a>
  );
}
