# Justin Nelson — Portfolio

A minimal, single-page portfolio. Monochrome palette with a single "iris" gradient
accent, animated ambient background, light/dark themes, and a project detail modal.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion for entrance and hover animation
- `next/og` for the generated favicon and Open Graph image

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Repository structure

```
portfolio/
├── public/projects/          # Site media (served as static files)
│   ├── finder/
│   ├── integral/
│   ├── soral/
│   ├── voxel/
│   └── other-works/
│       ├── illustration/
│       ├── logos-graphics/
│       ├── motion-design/
│       ├── pages/
│       └── photomanipulation/
├── src/
│   ├── app/                    # Next.js App Router (layout, page, OG icons)
│   ├── components/             # UI components
│   └── lib/                    # Content data (projects, timeline, about, social)
├── .env.example                # Copy to .env.local for local config
└── Images/                     # Local source masters (gitignored, not deployed)
```

**Media workflow:** Keep original exports in `Images/` locally. Add optimized
web copies to `public/projects/<slug>/` and reference them in `src/lib/projects.ts`.

## Configuration

Copy `.env.example` to `.env.local` and set your production URL:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL` — canonical site URL for metadata and OG/Twitter tags.
  Falls back to `VERCEL_URL` on Vercel, then `localhost` in development.
- `src/lib/social.ts` — email and social links in the contact block and JSON-LD.

## Editing content

All page content lives in `src/lib/*`. Add or edit projects in `projects.ts`
(images go in `public/projects/<slug>/`), update the timeline in `timeline.ts`,
and the about/awards/fun-facts copy in `about.ts`.

## Deploy

### GitHub

```bash
git add .
git commit -m "Portfolio site"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

### Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Add `NEXT_PUBLIC_SITE_URL` in project settings once you have a custom domain
4. Deploy — `public/projects/` assets are served from the CDN automatically

**Note:** Total media is ~190 MB. Vercel Hobby has a 100 MB upload limit; Pro
supports up to 1 GB. Compress videos or upgrade if the deploy fails on size.
