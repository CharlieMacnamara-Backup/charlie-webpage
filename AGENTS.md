# Charlie-Webpage

Personal portfolio + blog built with Next.js 15 (app router), Tailwind CSS v4, MDX.

## Commands

```sh
npm run dev        # starts on :3000, logs to /tmp/next-dev.log (overwrites each run)
npm test           # vitest
npm run test:watch
npm run build      # static export via next.config.js output:'export'
npm run lint       # next lint
npm run check      # lint + test + build — catch issues before committing
npm run clean      # rm -rf .next .cache (stale cache fix)
npm run validate:mdx  # checks all <Definition term=""> usages have glossary entries
```

## Architecture

- **Static export** — `next.config.js` sets `output: 'export'`. No SSR/API routes in prod.
- **Babel** overrides SWC via `.babelrc`. The `@/` alias is handled by Next.js's built-in path resolution via `jsconfig.json` (`@/* → ./src/*`). The old `babel-plugin-module-resolver` was removed because it conflicted with Next.js's own alias resolution, causing client-side webpack chunk loading errors.
- **Deploy**: AWS Amplify (auto from `main` branch push via `.github/workflows/autodeploy.yml`) + manual seedbox via `scripts/deploy.sh`.

## Stale cache gotchas

The `.next` cache frequently causes `ENOENT` / `Cannot find module` / webpack chunk errors after the dev server recompiles. Fix:
```sh
rm -rf .next && npm run dev
```
Then hard-refresh browser (`Ctrl+Shift+R`) to purge cached chunks.

## JSON imports through `@` alias fail at runtime

`@/data/glossary.json` imported from a browser bundle fails (webpack resolution quirk). Use `.js` modules with named exports instead. The `glossary` data lives in both `glossary.json` (source of truth) and `glossary.js` (named export `{ glossary }` for the `Definition` component).

## Components

- **`mdx-components.jsx`** — registers `StaticPlayer`, `Definition` globally for MDX
- **`Definition`** — Radix Tooltip popup, uses `@/data/glossary.js` (JSON import fails)
- **`Analytics`** — CLS check wrapped in `PerformanceObserver.supportedEntryTypes?.includes('layout-shift')` to suppress browser warning
- **`ArticleLayout`** — blog post wrapper; uses `next/head` (pre-app-router pattern, triggers migration warning but works)
- **`SEO.jsx`** — `generateMetadata()` helper with defaults for title, OG, Twitter, canonical

## Blog

MDX files live in `src/app/blog/*/page.mdx`. Each exports `const article = {...}` with `title`, `description`, `date`, `author`, `slug`. The listing page (`/blog`) uses `getAllArticles()` which reads MDX files at build time via `fast-glob` + regex parsing.

The `_template` directory is excluded. Three live posts: `davison-menswear`, `sourdough-journey`, `markdown-cv`.

## SEO

- **Name spelling**: "Macnamara" (correct), commonly misspelled as "McNamara" in Scotland. JSON-LD `Person` schema in `schema.js` uses `alternateName: "Charlie McNamara"`. Metadata descriptions include both spellings.
- **Google Search Console** verification tag in `layout.jsx` line 51 still has placeholder — replace with real code before production.
- **Sitemap**: `src/app/sitemap.js` auto-generates `/sitemap.xml` at build.
- **Robots**: `src/app/robots.js` auto-generates `/robots.txt` at build.

## Separate project

The quality-kilts worker code referenced in the blog post lives at `/mnt/dev/projects/quality-kilts` — 4 Cloudflare Workers (frontend, calendar, reviews, admin-dashboard). Not in this repo.

## Style

- `prettier-plugin-tailwindcss` for class sorting (`.prettierrc` configured)
- No semicolons
- Tailwind v4 CSS-first config in `src/styles/tailwind.css`
- Class names use Tailwind v4 syntax (e.g. `bg-linear-to-b` not `bg-gradient-to-b`)
