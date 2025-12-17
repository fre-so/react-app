# Present Beyond — Dev Notes

Succinct guide for working in this repo (React + TypeScript + Vite + Tailwind v4 + shadcn-style Radix wrappers).

## Stack & Key Dependencies
- React 19, Vite 7, TypeScript.
- Tailwind CSS v4 with `tailwindcss-animate`; utility helpers via `tailwind-merge` and `clsx`.
- shadcn-style UI built on Radix primitives (accordion, dialog, dropdown, select, tabs, tooltip, toast, etc.) and `lucide-react` icons.
- Data/state: `@tanstack/react-query`.
- Animations: `framer-motion` and `gsap`; also `tw-animate-css`.
- Other: `react-hook-form`, `zod`, `sonner`, `recharts`, `embla-carousel`, `scrollama`.

## Project Structure
- `src/main.tsx`: App bootstrap with React StrictMode.
- `src/App.tsx`: Present Beyond marketing hero copy (simplified slogan page).
- `src/index.css` & `src/App.css`: Tailwind v4 setup, Roboto font import, theme tokens, and base styles.
- `src/components/ui/`: shadcn-style wrappers for Radix (button, input, dialog, tabs, select, table, sheet, drawer, etc.) plus `sonner` wrapper and chart/progress helpers.
- `src/lib/utils.ts`: `cn` helper (`clsx` + `tailwind-merge`).
- `public/`: static assets served as-is.
- Config: `vite.config.ts` (React plugin), `tsconfig.*`, `wrangler.jsonc`/`worker-configuration.d.ts` for Cloudflare deployment.

## Scripts
- `npm run dev` — start Vite dev server with HMR.
- `npm run build` — type-check (`tsc -b`) then build for production.
- `npm run preview` — build then preview locally.
- `npm run lint` — ESLint.
- `npm run deploy` — build then `wrangler deploy` to Cloudflare Workers.
- `npm run cf-typegen` — generate Cloudflare types.

## Development Workflow
1) Install deps: `npm install`.
2) Run locally: `npm run dev` (Vite defaults to http://localhost:5173).
3) Edit components in `src/components/ui` using Tailwind classes; share utilities via `src/lib/utils.ts`.
4) For animations, prefer `framer-motion` for React components and `gsap` for timelines; lightweight effects can use `tw-animate-css` classes.
5) Add new styles in `src/index.css` or component-level CSS; Tailwind v4 is imported via `@import "tailwindcss";` (no separate config file).

## Deployment
- Ensure Cloudflare credentials are set; `wrangler.jsonc` controls environment.
- Deploy with `npm run deploy` (runs build first). For type updates against Cloudflare bindings, use `npm run cf-typegen`.

## Notes
- Existing UI components follow shadcn patterns; reuse them to keep styling consistent.
- Keep new code TypeScript-strict and Tailwind-first; prefer Radix primitives for accessibility.
