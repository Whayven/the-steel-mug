# The Steel Mug

A community coffee shop web app where customers can browse the menu, like their favourite items to earn points, and manage a cart. Built with the T3 Stack.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router + Turbopack)
- **API:** [tRPC v11](https://trpc.io) with SuperJSON
- **Database:** PostgreSQL with [Prisma 7](https://prisma.io)
- **Auth:** [Better Auth](https://www.better-auth.com/) (email/password + GitHub OAuth)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) with Catalyst UI components
- **Animations:** Motion

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for the local Postgres database)

### Setup

```bash
# Install dependencies
npm install

# Start the local Postgres database
./start-database.sh

# Push the schema to the database
npm run db:push

# Seed the database with menu items
npx prisma db seed

# Start the dev server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file with the following:

```
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
BETTER_AUTH_GITHUB_CLIENT_ID=
BETTER_AUTH_GITHUB_CLIENT_SECRET=
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run check` | Lint + typecheck |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run typecheck` | TypeScript check |
| `npm run format:write` | Format with Prettier |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:generate` | Create a migration |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & components
│   ├── _assets/          # Static images
│   ├── _components/      # Shared UI components
│   │   └── ui/catalyst/  # Catalyst component library
│   ├── menu/             # Menu page
│   ├── sign-in/          # Sign in page
│   └── sign-up/          # Sign up page
├── server/
│   ├── api/routers/      # tRPC routers (post, menu, cart)
│   ├── better-auth/      # Auth config & client
│   └── db.ts             # Prisma client
├── styles/               # Global CSS
└── trpc/                 # tRPC client (React + RSC)
```
