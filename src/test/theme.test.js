import { describe, expect, it } from "vitest";
import { resolveTheme } from "../hooks/useTheme";
import { techStack } from "../data/techStack";
import { getToolIcon, toolIcons } from "../data/toolIcons";

describe("theme switch", () => {
  it("opens in the light theme when the visitor has no saved choice", () => {
    expect(resolveTheme(null)).toBe("light");
  });

  it("opens in the dark theme when the visitor saved dark", () => {
    expect(resolveTheme("dark")).toBe("dark");
  });
});

describe("tech stack icons", () => {
  it("gives every listed tool its own icon", () => {
    for (const group of techStack) {
      for (const name of group.items) expect(toolIcons[name], name).toBeDefined();
    }
    expect(getToolIcon("Some Unknown Tool")).toEqual(expect.objectContaining({ lucide: "Hash" }));
  });
});
