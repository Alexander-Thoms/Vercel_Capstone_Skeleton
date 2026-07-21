<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

Compact guidance for OpenCode sessions in this repo.

## Stack (verified)
- Next.js 16.2.10, App Router, JavaScript (no TypeScript), React 19.2.7
- Tailwind CSS v4, ESLint 9 (`eslint-config-next` 16.2.10)
- Turbopack dev server. Packages managed with npm (use `npm`, not yarn/pnpm/bun)

## Commands
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (note: `lint` is `eslint`, NOT `next lint`)

## Conventions / gotchas
- App code lives under `src/app/` (not top-level `app/`). `src/app/page.js` = `/`, `src/app/layout.js` = root layout. New routes = new folders under `src/app/`.
- `next.config.mjs` sets `turbopack.root: import.meta.dirname` to silence a lockfile warning caused by a stray `C:\Users\Alexlaptop\package-lock.json` outside this repo. Do not remove that line unless the stray lockfile is gone.
- Keep React pinned to the version in `package.json`. `eslint-config-next` 16 expects ESLint 9 — do NOT upgrade `eslint` to v10 (it would break lint).
- `CLAUDE.md` just contains `@AGENTS.md`; keep it as a pointer, don't duplicate content there.

## Before writing Next.js code
This is Next.js 16, not a version from training data. Read `node_modules/next/dist/docs/` (e.g. `01-app/`) for the current App Router APIs before editing routes, layouts, or config.
