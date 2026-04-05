# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (Next.js + Turbopack)
- `npm run build` — production build
- `npm run check` — lint + typecheck
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run format:write` — Prettier
- `./start-database.sh` — start local Postgres via Docker
- `npm run db:push` — push schema to DB
- `npm run db:generate` — create migration
- `npm run db:studio` — Prisma Studio
- `npx prisma db seed` — seed database

## Architecture

T3 Stack app: Next.js 15 App Router + tRPC v11 + Prisma 7 + Better Auth + Tailwind CSS 4. App name is "The Steel Mug" (coffee shop).

**API layer:** tRPC routers live in `src/server/api/routers/` (post, menu, cart) and are registered in `src/server/api/root.ts`. Two procedure types: `publicProcedure` and `protectedProcedure` (requires auth). Transformer is SuperJSON.

**tRPC client usage:** Client components import `api` from `~/trpc/react` (React Query hooks). Server components import `api` from `~/trpc/server` (RSC caller with hydration).

**Auth:** Better Auth with email/password + GitHub OAuth. Config at `src/server/better-auth/config.ts`, client at `src/server/better-auth/client.ts`. Catch-all route at `src/app/api/auth/[...all]/route.ts`.

**Database:** Prisma with `@prisma/adapter-pg` for Postgres. Schema in `prisma/schema.prisma`. Generated client outputs to `generated/prisma/`.

**UI:** Catalyst component library (Headless UI-based) in `src/app/_components/ui/catalyst/`. Animations use `motion`. Toast notifications via `sonner`.

**Env:** Validated with `@t3-oss/env-nextjs` in `src/env.ts`. Required server vars: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_GITHUB_CLIENT_ID`, `BETTER_AUTH_GITHUB_CLIENT_SECRET`. Skip validation with `SKIP_ENV_VALIDATION=true`.

**Path alias:** `~` → `src/` (e.g., `~/server/db`).
