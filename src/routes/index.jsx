import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import { buildSeoHead } from "../components/SEO";

export const Route = createFileRoute("/")({
  head: () => buildSeoHead(),
  component: App,
});
