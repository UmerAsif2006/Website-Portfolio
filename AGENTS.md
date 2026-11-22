<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- App code is JavaScript (.jsx/.js) with CSS Modules + `src/styles/global.css`/`variables.css`; no Tailwind classes or shadcn. Why: owner requires a JS-only, plain-CSS codebase. Only the TanStack Start platform skeleton (`__root.tsx`, `router.tsx`, `start.ts`, `server.ts`, `lib/*`, config) stays TypeScript; `tsconfig` has `allowJs` so routes can be `.jsx`.
- All site copy and content live in `src/data/*.js`; components read from there. Why: owner edits content without touching components.
- SEO tags come from `buildSeoHead()` in `src/components/SEO.jsx`, used by the `/` route `head()` (TanStack replacement for react-helmet-async).
- n8n webhook URLs are read only from `import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL` / `VITE_N8N_CONTACT_WEBHOOK_URL` in `src/services/api.js`; missing URLs show a friendly "not connected yet" message.
- Project screenshots, videos and files are `lovable-assets` pointers in `src/assets/projects/`, attached via `screenshots`/`videos`/`files` arrays in `src/data/projects.js`. Why: keeps binaries out of the repo and lets the owner add media by editing data only.
- Theming: `variables.css` `:root` holds the light theme and `:root[data-theme="dark"]` overrides it; components use only tokens (accent tints via `color-mix` on token colors), and the canvas reads `--neural-*`. Why: one set of components serves both themes from the menu switch.
