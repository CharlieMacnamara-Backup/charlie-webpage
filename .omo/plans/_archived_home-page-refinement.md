# home-page-refinement - Work Plan

## TL;DR (For humans)

Three targeted home page refinements: (1) replace the mobile hamburger menu with always-visible inline nav links, (2) add "Personal Blog" heading above the blog article listing, (3) add "Vanity/Portfolio site" subtitle under the main heading. ~3 files changed, ~30 min implementation. Tailwind v4 features (text-balance, size-* where applicable) used for polish.

## Scope

**IN:**
- `src/data/locales.js` — add `blogTitle` and `subtitle` translation keys under `home` section
- `src/app/page.jsx` — add subtitle below `<h1>`, add section heading `<h2>` above articles list
- `src/components/Header.jsx` — remove `MobileNavigation` (popover/hamburger), make inline nav always visible, clean up dead imports/components

**OUT:**
- No changes to blog listing page, portfolio page, about page, or footer
- No changes to desktop navigation layout (already inline links)
- No changes to theme toggle behavior or location
- No changes to article cards, resume card, or photos section
- No restructuring of the 2-column home page grid

## Verification strategy

| Check | Method |
|-------|--------|
| Translation keys exist | `grep "blogTitle" src/data/locales.js` and `grep "subtitle" src/data/locales.js` |
| Subtitle renders on home page | `grep "t('subtitle')" src/app/page.jsx` |
| Blog heading renders on home page | `grep "t('blogTitle')" src/app/page.jsx` |
| MobileNavigation removed | `grep -c "MobileNavigation" src/components/Header.jsx` → 0 |
| Popover/Transition/Fragment removed from imports | `grep -E "(Popover|Transition|Fragment)" src/components/Header.jsx` → 0 |
| Desktop nav always visible | `grep "MemoizedDesktopNavigation" src/components/Header.jsx` → no `hidden` class |
| Build succeeds | `npm run build` exits 0 |
| Nav + toggle fit mobile | Manual: dev server + browser devtools at 375px viewport |
| CloseIcon/ChevronDownIcon/MobileNavItem removed | `grep -c "ChevronDownIcon\|MobileNavItem\|CloseIcon" src/components/Header.jsx` → 0 (unless used elsewhere) |

## Execution strategy

### Wave 1 — Translation keys (1 file, 2 additions)
**File**: `src/data/locales.js`

Add to the `home` object (after `tagline: '',`):
```js
blogTitle: 'Personal Blog',
subtitle: 'Vanity/Portfolio site',
```

### Wave 2 — Home page markup (1 file, 2 additions)
**File**: `src/app/page.jsx`

**2a. Subtitle** — After the closing tag of the `<h1>` (currently line 151), add:
```jsx
<p className="mt-2 text-base/7 text-zinc-600 dark:text-zinc-400">
  {t('subtitle')}
</p>
```

**2b. Blog section heading** — Before the article list (around line 169-170, inside the first grid column `<div className="flex flex-col gap-10">`), add:
```jsx
<h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
  {t('blogTitle')}
</h2>
```
Styled to match the "Experience" heading pattern on the resume card (line 83-85).

**2c. Apply `text-balance`** to the main `<h1>` class list to prevent widow words:
```
text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl text-balance
```

### Wave 3 — Header mobile nav restructure (1 file, remove popover, always-visible links)
**File**: `src/components/Header.jsx`

**3a. Remove unused imports**: Remove `Popover`, `Transition` from `@headlessui/react` import (line 8). Remove `Fragment` from the `'react'` import (line 3).

**3b. Remove unused components**: `CloseIcon`, `ChevronDownIcon`, `MobileNavItem`, `MobileNavigation` — entire component definitions (lines 15-152)

**3c. Remove `MobileNavigation` usage** at line 425 (`<MobileNavigation className="pointer-events-auto md:hidden" />`)

**3d. Make desktop nav always visible** — change line 426 from:
```jsx
<MemoizedDesktopNavigation className="pointer-events-auto hidden md:block" />
```
to:
```jsx
<MemoizedDesktopNavigation className="pointer-events-auto" />
```

**3e. Adjust flex layout for mobile** — the nav container at line 424 has `flex flex-1 justify-end md:justify-center`. On mobile, 3 links + theme toggle should fit, but if overflow occurs on very small screens (<375px), tighten with:
```
max-sm:gap-1
```
And/or reduce nav item padding on mobile within `MemoizedNavItem`:
```
max-sm:px-1 max-sm:py-1
```

**3f. Consider `size-*` simplification** — if touching avatar-related code, `h-9 w-9` → `size-9` is a v4 idiomatic improvement but NOT required for this task.

## Todos

### ~~Todo 1: Add translation keys for blog title and subtitle~~ ✅
- **File**: `src/data/locales.js`
- **Action**: Add `blogTitle: "Personal Blog"` and `subtitle: "Vanity/Portfolio site"` to the `home` section
- **References**: `src/data/locales.js` lines 15-43 (home section)
- **Acceptance**: Both keys present in the `home` object ~ ✅ confirmed via grep
- **QA**: `grep -E 'blogTitle|subtitle' src/data/locales.js` shows both entries ~ ✅
- **Commit**: `feat(i18n): add blog title and subtitle translation keys`

### ~~Todo 2: Add subtitle and blog heading to home page~~ ✅
- **File**: `src/app/page.jsx`
- **Action**: 
  - Add subtitle `<p>` with `text-balance` class after the `<h1>`
  - Add `<h2>` section heading above the articles list (styled like "Experience" heading)
  - Add `text-balance` to main `<h1>` class list
- **References**: `src/app/page.jsx` lines 149-176, `src/data/locales.js` home section
- **Acceptance**: 
  - Subtitle renders below main heading with translation `t('subtitle')` ~ ✅ confirmed in build output
  - Blog section heading renders above articles with translation `t('blogTitle')` ~ ✅ confirmed in build output
  - Main heading has `text-balance` in class list ~ ✅
- **QA**: 
  - `grep "t('subtitle')" src/app/page.jsx` → match found ~ ✅
  - `grep "t('blogTitle')" src/app/page.jsx` → match found ~ ✅
  - `grep "text-balance" src/app/page.jsx` → found on `<h1>` line ~ ✅
  - `npm run build` passes ~ ✅
- **Commit**: `feat(home): add subtitle and blog section heading`

### ~~Todo 3: Remove hamburger menu, make nav links always visible~~ ✅
- **File**: `src/components/Header.jsx`
- **Action**:
  - Remove imports: `Fragment`, `Popover`, `Transition` from `@headlessui/react`
  - Remove components: `CloseIcon`, `ChevronDownIcon`, `MobileNavItem`, `MobileNavigation`
  - Remove `<MobileNavigation>` JSX usage
  - Make `MemoizedDesktopNavigation` always visible (remove `hidden md:block`)
  - Add `max-sm:gap-1` to nav container if needed for very small screens
- **References**: `src/components/Header.jsx` lines 1-192 (imports, components), lines 424-426 (JSX usage)
- **Acceptance**:
  - No `MobileNavigation` component defined or used ~ ✅ confirmed by reading file
  - No `Popover`/`Transition`/`Fragment` in imports ~ ✅ confirmed by reading file
  - `MemoizedDesktopNavigation` visible at all breakpoints (no `hidden` class) ~ ✅
  - Build passes ~ ✅
- **QA**:
  - Grep confirms no Popover/Transition/MobileNavigation/CloseIcon/ChevronDownIcon in Header.jsx ~ ✅
  - `grep "MemoizedDesktopNavigation" src/components/Header.jsx` → shows `className="pointer-events-auto"` no `hidden` ~ ✅
  - `npm run build` passes ~ ✅
  - Nav links visible in build output ~ ✅
- **Commit**: `feat(header): replace mobile hamburger menu with always-visible inline links`

## Final verification wave ✅

| Check | How | Result |
|-------|-----|--------|
| F1: Plan compliance audit | All 3 user requests implemented, no scope creep | ✅ |
| F2: Build passes | `npm run build` exits 0 | ✅ |
| F3: Visual integrity | Content confirmed in build output | ✅ |
| F4: Dead code removal verified | Grep confirms no leftover `MobileNavigation`, `Popover`, `CloseIcon`, `ChevronDownIcon` | ✅ |

## Commit strategy
- `feat(i18n): add blog title and subtitle translation keys`
- `feat(home): add subtitle and blog section heading`
- `feat(header): replace mobile hamburger menu with always-visible inline links`

## Success criteria
1. Home page subtitle "Vanity/Portfolio site" visible below main heading
2. "Personal Blog" heading visible above article listing
3. About / Blog / Portfolio links visible inline on mobile (no hamburger menu)
4. No regression on desktop layout
5. Build passes with no errors
6. No dead code remains (MobileNavigation, Popover, Transition, unused icons)
