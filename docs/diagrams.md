# Blog Diagrams

Text-to-diagram pipeline using [D2](https://d2lang.com).

## Quickstart

```sh
# Install D2 (macOS)
brew install d2

# Install D2 (Linux — see https://d2lang.com/tour/install)
curl -fsSL https://d2lang.com/install.sh | sh -s --

# Regenerate all blog diagrams
npm run diagram:blog:davison
```

## Scripts

| Command | Action |
|---------|--------|
| `npm run diagram` | Runs `d2` (alias for the d2 binary) |
| `npm run diagram:blog:davison` | Generates the Davison Menswear testing pipeline SVG |

## Adding a new diagram

1. Create a `.d2` file under `src/app/blog/<post-slug>/`.
2. Add an npm script in `package.json`:
   ```json
   "diagram:blog:<post>": "node scripts/generate-blog-diagram.mjs src/app/blog/<post>/<file>.d2"
   ```
3. Run the script to produce `public/blog/<post>/<file>.svg`.
4. Reference the SVG in your MDX via `<SingleImage>`:
   ```jsx
   <SingleImage
     src="/blog/<post>/<file>.svg"
     alt="Description"
     orientation="horizontal"
     caption="Optional caption"
   />
   ```

## Architecture

### Generator (`scripts/generate-blog-diagram.mjs`)

- Compiles `.d2` → `.svg` using the `d2` CLI binary.
- Strips the white background `<rect>` so diagrams render transparently on dark mode.
- Rewrites `@font-face` declarations and replaces font-family with the site font (`Trebuchet MS, sans-serif`).
- Output is written under `public/blog/<post-slug>/` to mirror the source path under `src/app/blog/`.

### Styling

- All diagrams use the **dagre** layout engine (bundled with D2, no extra install).
- Arrows use `#14b8a6` (teal-500), the site accent color.
- Text nodes use `#52525b` (zinc-500) at font-size 12.
- Container groups use dashed teal borders with transparent fill.

## Mobile-first design

Diagrams are authored as SVG and rendered via Next.js `<Image>` at 100% width. Key constraints:

- **Aspect ratio**: Favor portrait/tall layouts (`direction: down`) so the diagram fits narrow viewports without horizontal scroll. The current pipeline produces `viewBox` ~189×935 (1:5 aspect ratio).
- **Font size**: Node text uses `font-size: 12` in SVG coordinates. With the viewBox scaled to viewport width, text remains legible on 375px+ screens.
- **Container groups**: Phases are wrapped in dashed containers with explicit labels — no reliance on color alone.
- **No prose duplication**: Each step label is 2–4 words at a higher level of abstraction than the surrounding paragraph text.

### Layout rules

```
direction: down    ← always use vertical for blog diagrams
                    horizontal direction (direction: right) creates
                    wide viewBoxes that shrink text on mobile.
```

Use `direction: right` only when the diagram has ≤3 items that must appear side by side (e.g. before/after comparison).

## Testing coverage

| Check | What it validates | Run with |
|-------|-------------------|----------|
| D2 compilation | `.d2` file parses and renders to SVG | `npm run diagram:blog:davison` |
| SVG post-processing | Background rect removed, font-family patched | (part of generate script) |
| Visual regression | Manual — open the SVG in browser after generation | — |
| Static export build | Next.js builds all pages including diagram MDX | `npm run build` |
| CI pipeline | Full `check` job runs validate:mdx → lint → test → build | Push to `main` |

There are no automated tests for the SVG output itself. Regenerate and visually verify after any `.d2` edit.

## Reference

- [D2 docs](https://d2lang.com/tour/intro)
- [D2 grid diagrams](https://d2lang.com/tour/grid-diagrams)
- [Generate script](../scripts/generate-blog-diagram.mjs)
- [Diagram theme template](../scripts/diagram-theme.json) (unused — reserved for future `--theme` flag)
- [BlogImages component](../src/components/BlogImages.jsx) (renders `variant="diagram"` path)
