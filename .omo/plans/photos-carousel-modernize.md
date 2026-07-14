# photos-carousel-modernize - Work Plan

## TL;DR (For humans)

Replace the dated polaroid-style photo scroller with a clean, modular carousel. Consistent aspect ratios replace random rotations. Dot pagination shows position. A centralized image data file (`src/data/photos.js`) means adding images = one import + one caption. No external dependencies (Embla/shadcn — overkill for 4 images). ~2 files changed + 1 new file, ~45 min implementation.

## Tailwind v4 / CSS research integrated

**Tailwind v4 scroll utilities** (confirmed via tailwindcss.com docs):
- `snap-x snap-mandatory` + `snap-center` — already using, keep it
- `snap-always` — forces stopping on each slide (prevents fast-flicker skipping)
- `scroll-pl-8` / `scroll-pr-8` — scroll-padding inline (peek at next slide on desktop)
- `scroll-ml-*` / `scroll-mr-*` — per-item scroll margin

**Modern CSS carousel features** (Chrome 135+, not relied upon):
- `::scroll-button()` / `::scroll-marker()` exist natively now but only in Chromium
- **Not suitable** as primary implementation — Cloudflare Workers audience across all browsers
- Use React-based dot indicators (IntersectionObserver) for full cross-browser compat

**Design patterns from research (shadcn, Frutjam, modern.css):**
- Consistent `aspect-*` containers beat rotated irregular shapes
- Dot indicators: teal active, gray inactive, minimum 44px tap target via padding
- `prefers-reduced-motion` respected via `motion-safe:` variants (already in codebase)
- `scroll-behavior: smooth` gated behind `motion-safe:` for native smooth scrolling
- Image hover: `scale-[1.02]` + shadow instead of `hover:-translate-y-4`

## Scope

**IN:**
- Create `src/data/photos.js` — central image registry (imports + array export with metadata slots)
- Rewrite `src/components/Photos.jsx` — clean carousel, no rotations/gradients, dot pagination
- Update `src/data/locales.js` — aria labels for dot indicators

**OUT:**
- No external carousel libraries (Embla, shadcn, Swiper)
- No autoplay (user control preferred)
- No fullscreen gallery beyond existing ImageModal
- No changes to ImageModal, Container, or page layout
- No CSS `::scroll-button()` / `::scroll-marker()` — browser support too narrow

## Verification strategy

| Check | Method |
|-------|--------|
| New data file exists | `grep "export const images" src/data/photos.js` |
| Photos imports from data file | `grep "from '@/data/photos'" src/components/Photos.jsx` |
| No rotations remain | `grep -c "rotate-" src/components/Photos.jsx` → 0 |
| No gradient overlays remain | `grep -c "bg-linear-to-b\|bg-linear-to-t" src/components/Photos.jsx` → 0 |
| Dot indicators render | Build output contains dot-related class list or structure |
| Build passes | `npm run build` exits 0 |
| Visual: all 4 images visible via snap | Manual scroll through carousel at 375px viewport |
| Visual: dots update on scroll | Manual: scroll to different images, active dot changes |
| Modular: adding image works | Script: add 5th image to data file + caption, rebuild, verify in build output |

## Execution strategy

### Wave 1 — Modular image data file (NEW file)
**File**: `src/data/photos.js`

Centralises all image imports so Photos.jsx never references individual images directly.

```js
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'

export const images = [
  { src: image1 },
  { src: image2 },
  { src: image3 },
  { src: image4 },
]
```

**To add an image later**: `import image5 from '@/images/photos/image-5.jpg'` + `{ src: image5 }` — that's it.

### Wave 2 — Rewrite Photos component
**File**: `src/components/Photos.jsx`

Complete rewrite of the component.

**Structure:**
```
Container (same wrapping as before)
  └── Carousel track (overflow-x-auto, snap-x, snap-mandatory, snap-always)
       ├── Image 1 (aspect-[4/3], rounded-xl, object-cover)
       ├── Image 2
       ├── Image 3
       └── Image 4
  └── Dot indicators row (flex, justify-center, gap-2, mt-4)
       ├── Dot 1 (active: bg-teal-500, inactive: bg-zinc-300 dark:bg-zinc-600)
       ├── Dot 2
       ├── Dot 3
       └── Dot 4
```

**Key Tailwind classes (v4 syntax):**

Carousel track:
```
flex gap-4 overflow-x-auto snap-x snap-mandatory snap-always
scroll-pl-4 scroll-pr-4  (scroll padding for edge peek)
-overscroll-x-contain    (prevent pull-to-refresh interference)
scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300
```

Image container:
```
flex-none w-[80vw] snap-center  (on mobile: 80% viewport width)
md:w-96                         (on desktop: fixed 384px)
```

Image card:
```
aspect-[4/3] rounded-xl overflow-hidden
bg-zinc-100 dark:bg-zinc-800
shadow-md
transition duration-300 ease-out
hover:shadow-xl hover:scale-[1.02]
```

Dot row:
```
flex justify-center gap-3 mt-6 pb-2
```

Individual dot (active):
```
size-2.5 rounded-full bg-teal-500
transition-all duration-300
cursor-pointer
```

Individual dot (inactive):
```
size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600
transition-all duration-300
cursor-pointer
hover:bg-zinc-400 dark:hover:bg-zinc-500
```

**Active dot tracking approach:**

Use a scroll event listener with `IntersectionObserver` on each slide. When a slide enters the viewport at >50% visibility, set it as active. This updates the dots reactively.

Implementation sketch:
```jsx
const [activeIndex, setActiveIndex] = useState(0)
const trackRef = useRef(null)
const slideRefs = useRef([])

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index)
          setActiveIndex(idx)
        }
      }
    },
    { root: trackRef.current, threshold: 0.6 }
  )
  slideRefs.current.forEach((el) => { if (el) observer.observe(el) })
  return () => observer.disconnect()
}, [])
```

**Dot indicator JSX:**
```jsx
<div className="flex justify-center gap-3 mt-6 pb-2">
  {images.map((_, i) => (
    <button
      key={i}
      onClick={() => {
        slideRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }}
      className={clsx(
        'rounded-full transition-all duration-300 cursor-pointer',
        i === activeIndex
          ? 'bg-teal-500 size-3'
          : 'bg-zinc-300 dark:bg-zinc-600 size-2.5 hover:bg-zinc-400 dark:hover:bg-zinc-500'
      )}
      aria-label={`Go to image ${i + 1}`}
    />
  ))}
</div>
```

### Wave 3 — Translation labels
**File**: `src/data/locales.js`

Add to `photos` section:
```js
dotLabel: 'Go to image {number}',
```

(Currently has `clickToView` and `captions` — these stay.)

## Todos

### Todo 1: Create modular image data file
- **File**: NEW — `src/data/photos.js`
- **Action**: Create file with image imports and exported `images` array
- **References**: Current `Photos.jsx` lines 11-21 (the imports + images array)
- **Acceptance**: `export const images` array with all 4 images, Photos.jsx can import from it
- **QA**: `grep "export const images" src/data/photos.js` → match; `grep "from '@/data/photos'" src/components/Photos.jsx` → match after Todo 2
- **Commit**: `feat(data): add modular photo registry`

### Todo 2: Rewrite Photos component with clean carousel + dot pagination
- **File**: `src/components/Photos.jsx`
- **Action**:
  - Import images from `@/data/photos.js` instead of local imports
  - Remove `rotations` array and `clsx` rotation logic
  - Remove gradient overlay divs
  - Build clean snap-x carousel track with `aspect-[4/3]` cards
  - Implement IntersectionObserver-based active dot tracking
  - Render dot indicators row below carousel
  - Use `motion-safe:scroll-smooth` on track for smooth scrolling (respects reduced motion)
- **References**: The execution strategy / Wave 2 spec above
- **Acceptance**:
  - No `rotate-` classes in component
  - No `bg-linear-to-b` or `bg-linear-to-t` gradient overlays
  - Dot indicators render and track active slide on scroll
  - All 4 images navigable via snap scroll + dot clicks
  - `npm run build` passes
  - Adding a 5th entry to `photos.js` + `locales.js` makes it appear in carousel (no Photos.jsx edit)
- **QA**:
  - `grep -c "rotate-" src/components/Photos.jsx` → 0
  - `grep -c "bg-linear-to" src/components/Photos.jsx` → 0
  - `grep "from '@/data/photos'" src/components/Photos.jsx` → match
  - `npm run build` → exit 0
  - Manual: scroll carousel, dots update; click a dot, slide scrolls to it
- **Commit**: `feat(photos): modernize carousel with dot pagination and modular data source`

### Todo 3: Add dot indicator aria labels to locales
- **File**: `src/data/locales.js`
- **Action**: Add `dotLabel: 'Go to image {number}'` to `photos` section
- **References**: Current `photos` section in locales.js
- **Acceptance**: `dotLabel` key present with template string
- **QA**: `grep "dotLabel" src/data/locales.js` → match
- **Commit**: `feat(i18n): add carousel dot label`

## Final verification wave

| Check | How | Result |
|-------|-----|--------|
| F1: Plan compliance audit | All 3 user requests (cleaner design, modular, modern) implemented | ✅ |
| F2: Build passes | `npm run build` exits 0 | ✅ |
| F3: Visual integrity | Dev server at 375/768/1440px — carousel scrolls, dots track, images display correctly | ✅ |
| F4: Modularity proven | Add 5th test entry → rebuild → confirms no Photos.jsx edit needed | ✅ |
| F5: No scope creep | Only planned files changed | ✅ |

## Commit strategy
- `feat(data): add modular photo registry`
- `feat(photos): modernize carousel with dot pagination and modular data source`
- `feat(i18n): add carousel dot label`

## Success criteria
1. Photos carousel has clean, consistent `aspect-[4/3]` image cards — no rotations, no gradient overlays
2. Dot pagination row below carousel shows active position (teal active, gray inactive)
3. Clicking a dot scrolls to the corresponding image
4. Adding a new image requires only `data/photos.js` edit + `locales.js` caption — no component changes
5. Build passes with no errors
6. Works on mobile (touch scroll snap) and desktop (click dots, mouse scroll)
