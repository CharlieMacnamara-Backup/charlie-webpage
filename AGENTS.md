# Charlie-Webpage

Personal portfolio + blog built with Next.js 15 (app router), Tailwind CSS v4, MDX.

## CI/CD Pipeline

`.github/workflows/autodeploy.yml` — three jobs:

| Job | Trigger | What it does |
|-----|---------|-------------|
| **check** | Every push/PR to `main` | validate:mdx → lint → test → build → worker syntax check → upload artifact. **Dependency review** runs inline on PRs (requires Dependency graph enabled in repo settings). 15-min timeout. |
| **codeql** | Push to `main` | JavaScript/TypeScript security analysis (async, doesn't block deploy). |
| **deploy** | Push to `main` | Rebuilds (same as check), deploys to Cloudflare Workers via `wrangler-action`. |

**Concurrency**: `cancel-in-progress: true` per branch — if you push again while a run is active, the old one is cancelled.

**Pre-push hook** (`.githooks/pre-push`): runs `npm run check` before any push. Skip with `git push --no-verify`.

**Branch protection** (`main`): requires `check` status to pass, required linear history. Exempt from PR/tier-2 requirements for admins (`CharlieMacnamara`, `CharlieMacnamara-Backup`). Force pushes and deletions blocked.

## Commands

```sh
npm run dev        # starts on :3000, logs to /tmp/next-dev.log (overwrites each run)
npm test           # vitest
npm run test:watch
npm run build      # static export via next.config.js output:'export'
npm run lint       # next lint
npm run check      # validate:mdx + format:check + lint + test + build — catch issues before committing
npm run clean      # rm -rf .next .cache (stale cache fix)
npm run validate:mdx  # checks all <Definition term=""> usages have glossary entries
npm run check:grammar  # harper-cli UK English grammar check on all blog MDX files
```

## Grammar Checking

[Harper](https://github.com/automattic/harper) is a local, private, Rust-based grammar checker installed at `~/.cargo/bin/harper-cli`. It replaces Grammarly for this project.

### Usage

```sh
npm run check:grammar       # quick check — filters MDX noise, shows real prose issues
```

The script pipes each `src/app/blog/*/page.mdx` (excluding `_template`) through harper with:
- **Dialect**: UK English (`-d uk`)
- **Ignored rules** (MDX/JSX noise + URL-path noise): `UnclosedQuotes`, `SentenceCapitalization`, `Spaces`, `OrthographicConsistency`, `Dashes`, `UseEllipsisCharacter`, `LongSentences`, `PronounVerbAgreement`, `SpellCheck`, `SplitWords`, `CompoundNouns`
- **User dictionary**: `~/.config/harper-ls/dictionary.txt` (94 project-specific terms)

### Real findings harper catches

- US→UK spelling mismatches (`flavors`→`flavours`, `center`→`centre`, `caramelization`→`caramelisation`)
- Real typos like `inital`→`initial`, `prefermented`→`pre-fermented`
- Formatting: `...`→`…` (ellipsis), `---`→`—` (em dash), `2026-03`→`2026–03` (en dash)
- Capitalisation: `father's day`→`Father's Day`
- Readability: long sentence warnings (55+ words)
- Grammar: pronoun-verb agreement

### Known limitations

- **Harper 0.1.0 dictionary bug**: Words in `dictionary.txt` that are short (≤8 chars) or technical (`d1`, `kv`, `jwt`, `biga`, `davison`, `Markdown`, `diastatic`, `unhydrated`, `caramelisation`) are loaded correctly but still flagged as `SpellCheck`. Cannot be suppressed — `SpellCheck` is the core engine, not a single rule. ~30 hits across all 3 posts.
- **Glossary term keys** (`D1`, `KV`, `JWT`) and **Cloudflare doc URLs** (`d1/`, `kv/`) are capitalised in source but harper still flags the attribute values and URL segments — unfixable without breaking the lookups or URLs.
- **prose-rich ai_tells**: ~68 false positives in sourdough-journey from image URLs (`/blog/sourdough-journey/...`) and deliberate no-space em dashes. Not fixable.
- **prose-rich write-good**: 2 `</div>` false positives in markdown-cv JSX code blocks. Not fixable.

### Adding words to the dictionary

Edit `~/.config/harper-ls/dictionary.txt` (one word per line, sorted alphabetically). Words are case-sensitive — add both `Davison` (prose capitalisation) and `davison` (URL path segments) if needed.

```sh
# open for editing
$EDITOR ~/.config/harper-ls/dictionary.txt
```

## Architecture

- **Static export** — `next.config.js` sets `output: 'export'`. No SSR/API routes in prod.
- **Babel** overrides SWC via `.babelrc`. The `@/` alias is handled by Next.js's built-in path resolution via `jsconfig.json` (`@/* → ./src/*`). The old `babel-plugin-module-resolver` was removed because it conflicted with Next.js's own alias resolution, causing client-side webpack chunk loading errors.
- **Deploy**: Cloudflare Workers via `.github/workflows/autodeploy.yml`. Pushes to `main` deploy automatically. Manual seedbox via `scripts/deploy.sh`.

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
