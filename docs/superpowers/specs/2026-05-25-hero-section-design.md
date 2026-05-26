# Hero Section Design

**Date:** 2026-05-25  
**File affected:** `src/index.md`

## Overview

Add a full-viewport hero section to the CV site index page. The hero fills the entire screen on load, encouraging the user to scroll down to reach the rest of the page content.

## Layout

- The existing `.hero` div is given `min-height: 100dvh` (`dvh` to account for mobile browser chrome) and `position: relative`
- Content is centred vertically and horizontally using flexbox (`justify-content: center; align-items: center`)
- The existing large top/bottom margins (`12rem`) are removed — flexbox centering replaces them
- The `---` horizontal rule below the hero remains, acting as the natural visual break when the user scrolls down

## Scroll Indicator

A `<div id="scroll-indicator">` is added inside `.hero`, positioned `absolute` at `bottom: 2rem`, centred horizontally with `left: 50%; transform: translateX(-50%)`.

Contents:
- A `<span>` displaying "SCROLL" in small uppercase with tracked letter-spacing
- Two inline SVG chevrons stacked vertically, each drawn as `<polyline points="1,1 8,8 15,1">` — pointing straight down
- `stroke="currentColor"` with `opacity: 0.5` on the SVG element so the colour adapts to Observable's light/dark theme automatically; `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`

Animation:
- `@keyframes` animates `opacity` only (0.15 → 1 → 0.15) — no positional movement
- Top chevron: 1.4s loop, `ease-in-out`
- Bottom chevron: same keyframes, 0.22s delay — creates a downward cascade ripple effect

## Fade-out on Scroll

A `<script>` block is added to the page:

1. Attaches a `scroll` event listener to `window`
2. On first scroll event: adds class `.hidden` to `#scroll-indicator` and removes the listener immediately
3. `.hidden` sets `opacity: 0`
4. A `transition: opacity 0.4s ease` on `#scroll-indicator` makes the fade smooth

## Constraints

- All changes are in `src/index.md` — no new files, no config changes
- Uses only standard CSS and vanilla JS — no Observable reactive cells needed
- Observable Framework's sidebar and header are already hidden via frontmatter (`sidebar: false`, `toc: false`)
