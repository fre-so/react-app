# Dev Notes

Succinct guide for working in this repo (React + TypeScript + Vite + Tailwind v4 + shadcn-style Radix wrappers).

## Stack & Key Dependencies
- Core: React 19, Vite 7, TypeScript.
- Styling: Tailwind CSS v4 + `tailwindcss-animate`; utilities `tailwind-merge`, `clsx`, `class-variance-authority`.
- UI: shadcn-style Radix wrappers (accordion/dialog/dropdown/select/tabs/tooltip/toast etc.), `lucide-react` icons, `vaul` for sheets/drawers, `next-themes` for theme toggling.
- Data/state: `@tanstack/react-query`.
- Forms/validation: `react-hook-form`, `@hookform/resolvers`, `zod`, `input-otp`.
- Dates & pickers: `date-fns`, `react-day-picker`.
- Content: `react-markdown`.
- Feedback/UX: `sonner` (toasts), `recharts` (charts).
- Animations: `framer-motion`, `gsap`, plus `tw-animate-css`.
- Carousels: `embla-carousel` for sliders.
- Scroll narratives: `scrollama`/`react-scrollama` for scroll-driven steps.
- APIs: `openai` client.

## Project Structure
- `src/main.tsx`: App bootstrap with React StrictMode.
- `src/App.tsx`: Present Beyond marketing hero copy (simplified slogan page).
- `src/index.css` & `src/App.css`: Tailwind v4 setup, Roboto font import, theme tokens, and base styles.
- `src/components/ui/`: shadcn-style wrappers for Radix (button, input, dialog, tabs, select, table, sheet, drawer, etc.) plus `sonner` wrapper and chart/progress helpers.
- `src/lib/utils.ts`: `cn` helper (`clsx` + `tailwind-merge`).
- `public/`: static assets served as-is.
- `index.html`: HTML shell; set product-level metadata (title/description/OG).
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

## HTML & SEO
- Update `index.html` head tags for product SEO/preview. Example:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Present Beyond — Product Stories Without Slides</title>
  <meta name="description" content="Present Beyond turns product states into cohesive stories you can present in minutes." />
  <meta name="author" content="Present Beyond" />
  <meta property="og:title" content="Present Beyond — Product Stories Without Slides" />
  <meta property="og:description" content="Present Beyond turns product states into cohesive stories you can present in minutes." />
  <meta property="og:type" content="website" />
  ```
- Swap the default favicon (`/vite.svg`) with your own in `public/`.

## Deployment
- Ensure Cloudflare credentials are set; `wrangler.jsonc` controls environment.
- Before running `npm run deploy`:
  - Configure custom domain in `wrangler.jsonc` as `{PROJECT_NAME}.bespoker.ai`.
  - Verify all required production environment variables are set.
  - Run the deploy command and confirm it completes successfully.
- Deploy with `npm run deploy` (runs build first). For type updates against Cloudflare bindings, use `npm run cf-typegen`.

## Important Notes
- Existing UI components follow shadcn patterns; reuse them to keep styling consistent.
- Keep new code TypeScript-strict and Tailwind-first; prefer Radix primitives for accessibility.
- Do not add a manual global reset like `* { margin: 0; padding: 0; box-sizing: border-box; }`—Tailwind v4’s preflight already normalizes base styles.
