# Draft: home-page-refinement

## Intent
**CLEAR** — user knows 3 specific outcomes.  
**review_required**: false (user didn't ask for high accuracy)

## Components ledger

| # | Component | Outcome | Status | Evidence |
|---|-----------|---------|--------|----------|
| 1 | **Blog section title** — add "Personal Blog" above article list on home page | New `<h2>` + translation key | Resolved | `src/app/page.jsx:170-176` articles render without section heading |
| 2 | **Page subtitle** — add "Vanity/Portfolio site" below main heading | New `<p>` subtitle + translation key | Resolved | `src/app/page.jsx:149` main heading exists, no subtitle |
| 3 | **Mobile nav: always-visible inline links** — remove hamburger popover, show About/Blog/Portfolio links inline at all screen sizes | Remove `MobileNavigation`, make desktop nav always visible | Resolved — user confirmed inline links over popover |

## Decisions & defaults

- **Mobile nav approach**: Inline links always visible — no hamburger menu. Remove `MobileNavigation` popover, make `MemoizedDesktopNavigation` visible at all breakpoints. User confirmed "Inline links always visible" option.
- **Styling**: Follow existing design tokens — teal accent for active/hover states, same text sizing for nav, h2 section heading matching "Experience" heading style, subtitle in secondary text weight/color.

## Status
**Plan approved** — `.omo/plans/home-page-refinement.md` written and reviewed

## Momus review result
- **Verdict**: APPROVED
- **Minor fix applied**: `Fragment` is from `'react'` not `@headlessui/react` — corrected in plan
- **Verdict details**: All file references verified, no dead-code dependency issues, all imports safe to remove, Tailwind v4 suggestions appropriate

## Approach
1. Edit `src/data/locales.js` — add `blogTitle: "Personal Blog"` and `subtitle: "Vanity/Portfolio site"` to the `home` section
2. Edit `src/app/page.jsx` — add subtitle below h1, add h2 above articles list
3. Edit `src/components/Header.jsx` — remove `MobileNavigation` popover, make nav links always visible, clean up unused imports
