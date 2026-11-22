import { useCallback, useEffect, useState } from "react";
import { site } from "../data/site";

export const THEME_STORAGE_KEY = "executron-theme";

/** Light is the default; only an explicit saved "dark" switches the site to dark. */
export function resolveTheme(saved) {
  return saved === "dark" ? "dark" : "light";
}

/** Runs in <head> before the page paints so a saved dark choice never flashes light. */
export const themeBootScript = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"){document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`;

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? site.themeColorDark : site.themeColor);
}

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable: the choice just lasts for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
