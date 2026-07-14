# Draft: photos-carousel-modernize

## Intent
**CLEAR** — user wants a cleaner, more modern carousel design for the home page photos, professional on mobile/desktop.
**review_required**: false

## Components ledger

| # | Component | Outcome | Status | Evidence |
|---|-----------|---------|--------|----------|
| 1 | **Modular image data source** — Extract image imports + metadata into a central data file so adding images means one file edit + one caption | New `src/data/photos.js` with named exports, imported by Photos component | Resolved |
| 2 | **Carousel track** — Replace polaroid rotations with clean squared/rounded images in a horizontal snap-scroll track | Consistent aspect ratio, no rotations, subtle shadow/hover | Resolved |
| 3 | **Navigation indicators** — Add dot pagination below the carousel showing current position | Clean dots, active state, clickable | Resolved |
| 4 | **Prev/next arrows** — Optional overlay arrows for desktop navigation | Subtle overlay arrows on hover (desktop only) | Resolved |
| 5 | **Responsive sizing** — Mobile-friendly image sizes, larger on desktop | `aspect-[4/3]` or similar, responsive width classes | Resolved |
| 6 | **Remove dated styling** — Remove gradient shadow overlays, remove polaroid rotation transforms | Clean visual presentation | Resolved |

## Research findings (web search + Tailwind v4 patterns)

- **CSS scroll snap** (`snap-x snap-mandatory` + `scroll-snap-align`) is the standard approach — already used, keep it
- **Polaroid rotations** (`rotate-2`, `-rotate-2`) feel dated — remove entirely
- **Gradient overlays** for scroll indication are clunky — replace with clean edge fade or remove
- **Dot pagination** is the modern standard for indicating carousel position — add below the track
- **Prev/next arrows** as subtle overlay buttons improve desktop UX — optional for 4 images
- **Tailwind v4** `aspect-*` utilities (e.g. `aspect-[4/3]`) for consistent image sizing
- **`size-*`** shorthand available for width+height (but `aspect-*` + width is preferred here)
- **`backdrop-blur`** for frosted-glass arrow buttons if used
- **Active dot styling**: `bg-teal-500` (active) / `bg-zinc-300 dark:bg-zinc-600` (inactive) to match site teal accent
- **4 images** means navigation is minimal — dots are more useful than arrows for few items
- **Touch scrolling** (snap) works naturally on mobile — preserve it
- **`prefers-reduced-motion`** respected via Tailwind's `motion-safe:` variant (already used)

## Decisions & defaults

- **Image container**: `aspect-[4/3]` (consistent landscape crop) sized `w-[75vw] max-w-sm` mobile, `w-80` desktop — full-width snap items on mobile, peek at next slide on desktop
- **Rotations**: Removed entirely — clean squared presentation with `rounded-xl`
- **Gradient overlays**: Removed — clean edges
- **Pagination dots**: Horizontal row centered below carousel, `gap-2`, 8px circles, teal accent for active
- **Arrows**: Skip for now — only 4 images, dots + snap scroll is sufficient. Can add later.
- **Hover/tap**: Subtle scale-up `hover:scale-[1.02]` + shadow lift instead of `hover:-translate-y-4`
- **Scrollbar**: Already hidden via custom scrollbar styling — keep `scrollbar-thin` approach

## Status
**Awaiting approval** — pending action: write `.omo/plans/photos-carousel-modernize.md`

## Modularity design

Adding or replacing images will require exactly **two** changes:

1. **`src/data/photos.js`** — Add/replace an import line + array entry
2. **`src/data/locales.js`** (`photos.captions`) — Add/replace a caption string

The Photos component itself stays untouched — it reads from the data file and locales dynamically.

## Approach
1. Create `src/data/photos.js` — centralises all image imports and exports the `images` array with metadata slots
2. Rewrite `src/components/Photos.jsx` — clean carousel using `src/data/photos.js`, removes rotations/gradients, adds dot pagination
3. Update `src/data/locales.js` — add dot-indicator aria labels if needed
4. Verify build + visual at 375/768/1440px viewports
