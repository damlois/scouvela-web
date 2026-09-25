# Scouvela Web

Optional marketing and demonstration landing page for the **Scouvela** Apify Actor.

Scouvela is an Apify Actor that discovers public grants, tenders, accelerators, training programmes and SME empowerment opportunities across official websites and supported public social pages. It converts fragmented announcements into structured, source-linked data and can optionally use AI to classify and match opportunities.

This repository is **not** the Actor. The Actor lives here:

```text
https://github.com/damlois/Scouvela
```

## Prerequisites

- Node.js 20 or newer
- [pnpm](https://pnpm.io/) 9 via Corepack:

```bash
corepack enable && corepack prepare pnpm@9.15.9 --activate
```

## Local setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

On Windows PowerShell:

```powershell
pnpm install
Copy-Item .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variable

```env
NEXT_PUBLIC_APIFY_ACTOR_URL=https://apify.com/your-username/scouvela-african-sme-opportunities
```

Replace the placeholder with the public Actor Store URL when it is available. If the variable is missing or still contains `your-username`, “Run on Apify” buttons stay visible but disabled.

## Scripts

```bash
pnpm dev        # local development server
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # ESLint
pnpm typecheck  # TypeScript --noEmit
```

## Deploy to Vercel

1. Import this repository in Vercel.
2. Keep the root directory as the repository root.
3. Install command: `pnpm install`
4. Build command: `pnpm build`
5. Set `NEXT_PUBLIC_APIFY_ACTOR_URL` in the project environment variables when the Actor is published.

## Brand assets

```text
public/images/scouvela-wordmark.png
public/images/scouvela-mark.png
public/favicon.ico
src/app/icon.png
src/app/apple-icon.png
```

## Related

- Actor repository: [damlois/Scouvela](https://github.com/damlois/Scouvela)
- Landing page repository: [damlois/scouvela-web](https://github.com/damlois/scouvela-web)
