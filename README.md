# Inv Ecosystem

In-house investment platform for **Limited Partners (LPs)** — a single authenticated place to view consolidated financial account data, holdings, and allocation.

**Status:** Foundation phase (v0.1 in progress). Magic link auth and dashboard shell are in place. The **Accounts** feature and Supabase database schema are next.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) (Radix Nova) |
| Auth & database | [Supabase](https://supabase.com) (`@supabase/ssr`, `@supabase/supabase-js`) |
| Forms & validation | [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev) |
| Data fetching (client) | [TanStack Query](https://tanstack.com/query) |
| i18n | [next-intl](https://next-intl.dev) (Dutch primary) |
| Icons | [Lucide](https://lucide.dev) |
| Tooling | TypeScript, ESLint, [Supabase CLI](https://supabase.com/docs/guides/cli) |

---

## Prerequisites

- **Node.js** 20+
- **Yarn** (project uses `yarn.lock`)
- A **Supabase** project with Auth enabled
- Git

---

## Getting started

### 1. Clone the repository

```bash
git clone <repository-url>
cd next.js-inv-ecosystem
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | App URL, no trailing slash (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key |

### 4. Supabase configuration

1. In **Supabase Dashboard → Authentication → URL Configuration**, add to **Redirect URLs**:
   ```
   http://localhost:3000/api/callback/auth
   ```
2. Auth is **invite-only** — users must exist in Supabase before they can request a magic link.
3. (Optional) Link the local project for migrations and type generation:
   ```bash
   yarn supabase link
   ```

### 5. Run locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visits redirect to `/login`.

### Other scripts

```bash
yarn build    # Production build
yarn start    # Start production server
yarn lint     # ESLint
```

### Generate database types (after schema exists)

```bash
yarn supabase gen types typescript --linked > src/lib/supabase/types.ts
```

---

## Project structure

```
src/
  app/
    (auth)/           # Login
    (dashboard)/      # Authenticated routes (profile, accounts — planned)
    api/callback/auth # Magic link callback
  lib/
    auth/             # Authentication feature
    accounts/         # Planned — financial accounts (v0.1)
    navigation/       # Routes & sidebar
    supabase/         # Clients, proxy session, generated types
    i18n/             # next-intl config & nl.json
    components/ui/    # shadcn components
    providers/        # React providers (Query, i18n)
  proxy.ts            # Session refresh & route protection
.cursor/              # Cursor rules (architecture, features, roadmap)
supabase/             # Migrations & Supabase CLI (when added)
```

### Feature architecture

Business features follow a layered structure under `src/lib/<feature>/`:

| Layer | Responsibility |
|-------|----------------|
| `domain/` | Models & service (UI entry point for data) |
| `data/` | Zod schemas, DTOs, repository (Supabase queries) |
| `presentation/` | Optional — strip sensitive fields before UI |
| `ui/` | ViewModels & components |

Details: `.cursor/project/architecture.mdc`

---

## Authentication

- **Magic link** (email OTP) via Supabase — no passwords
- Session cookies + proxy-based route protection
- Public routes: `/login`, `/api/callback/auth`
- All other routes require a valid session

Details: `.cursor/features/feature-auth.mdc`

---

## Roadmap (summary)

| Phase | Focus |
|-------|--------|
| **Done** | Auth, dashboard shell, profile shell, i18n, project conventions |
| **Now (v0.1)** | Accounts — list, detail, holdings, asset-class allocation |
| **Later** | User↔account permissions, internal team roles, provider APIs (KBC, Saxo, DEGIRO, …) |

Full plan: `.cursor/project/roadmap.mdc`

---

## Documentation for contributors

| Topic | Location |
|-------|----------|
| Product overview | `.cursor/project/overview.mdc` |
| Architecture & layers | `.cursor/project/architecture.mdc` |
| Domain glossary | `.cursor/project/glossary.mdc` |
| Supabase conventions | `.cursor/database-supabase.mdc` |
| Auth feature | `.cursor/features/feature-auth.mdc` |
| Accounts feature | `.cursor/features/feature-accounts.mdc` |

---

## License

Private project — not for public distribution.
