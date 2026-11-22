import { describe, expect, it } from "vitest";
import { projects, categories } from "../data/projects";
import { experience } from "../data/experience";
import { hero, site } from "../data/site";
import { validateContact } from "../components/Contact";

describe("portfolio content rules", () => {
  it("lists exactly 11 projects, each in a known category", () => {
    expect(projects).toHaveLength(11);
    for (const project of projects) expect(categories).toContain(project.category);
  });

  it("has exactly 2 experience entries", () => {
    expect(experience.map((e) => e.title)).toEqual(["AI Automation", "BS Computer Science"]);
  });

  it("keeps the WhatsApp number split into parts and has no GitHub link", () => {
    expect(site.whatsappParts).toEqual(["92", "300", "7300009"]);
    expect(JSON.stringify(site)).not.toContain("wa.me");
    expect(JSON.stringify(site).toLowerCase()).not.toContain("github");
  });
});

describe("hero role line", () => {
  it("keeps 'AI Automation Engineer' static and rotates the other tags below it", () => {
    expect(site.role).toBe("AI Automation Engineer");
    expect(hero.rotatingTags).toEqual(["RAG Chatbots", "Voice Agents", "Workflow Automation", "Founder, Executron AI Automations"]);
    expect(hero.rotatingTags).not.toContain(site.role);
  });
});

describe("project media", () => {
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

  it("gives every project at least one screenshot", () => {
    for (const project of projects) expect(project.screenshots.length, project.id).toBeGreaterThan(0);
  });

  it("attaches the avatar video to the talking avatar and the reel video to Kie AI", () => {
    expect(byId["talking-avatar"].videos[0].src).toContain("talking-avatar-result.mp4");
    expect(byId["kie-reels"].videos[0].src).toContain("kie-reels-result.mp4");
  });

  it("labels the CV Maker PDF as a sample, not the owner's original CV", () => {
    const [cv] = byId["cv-maker"].files;
    expect(cv.href).toContain("sample-generated-cv.pdf");
    expect(cv.note).toMatch(/sample/i);
    expect(cv.note).toMatch(/not my original cv/i);
  });
});

describe("contact form validation", () => {
  const valid = { name: "Ali", email: "ali@example.com", subject: "Lead gen", message: "Please automate my CRM.", company: "" };

  it("accepts a complete message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("rejects a bad email and a too-short message", () => {
    const errors = validateContact({ ...valid, email: "ali@", message: "hi" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message"]);
  });
});
