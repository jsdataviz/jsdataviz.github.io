# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the index page hero fill the full viewport height, with a cascading animated scroll indicator that fades out on first scroll.

**Architecture:** All changes are in `src/index.md`. The `.hero` div gets `min-height: 100dvh` and `position: relative`. A `#scroll-indicator` child is absolutely positioned at the bottom-centre. A one-time `scroll` event listener adds `.hidden` to trigger a CSS opacity transition.

**Tech Stack:** Observable Framework 1.11, vanilla CSS, vanilla JS (no build step needed — `npm run dev` serves changes live).

---

### Task 1: Update hero CSS for full-viewport layout

**Files:**
- Modify: `src/index.md` (the `<style>` block, `.hero` and `.hero h2` rules)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Note that the hero currently has large top/bottom margins and does not fill the screen.

- [ ] **Step 2: Replace the `.hero` CSS rule**

In `src/index.md`, find:

```css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 12rem 0 12rem;
  text-wrap: balance;
  text-align: center;
}
```

Replace with:

```css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--sans-serif);
  min-height: 100dvh;
  position: relative;
  text-wrap: balance;
  text-align: center;
}
```

- [ ] **Step 3: Remove the large bottom margin from `.hero h2`**

Find:

```css
.hero h2 {
  margin: 0rem 0 10rem;
  max-width: 34em;
  font-size: 2vw;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}
```

Replace with:

```css
.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 2vw;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}
```

- [ ] **Step 4: Verify in browser**

The hero should now fill the entire viewport. The "What exactly is a full stack data specialist?" section should only become visible after scrolling down. The text should be vertically centred in the viewport.

- [ ] **Step 5: Commit**

```bash
git add src/index.md
git commit -m "feat: make hero fill full viewport height"
```

---

### Task 2: Add scroll indicator HTML and CSS

**Files:**
- Modify: `src/index.md` (HTML inside `.hero`, new CSS rules in `<style>`)

- [ ] **Step 1: Add the scroll indicator element inside `.hero`**

In `src/index.md`, find the closing `</div>` of the `.hero` div:

```html
  <h2>I'm a full stack data specialist based in London with a passion for finding answers to complex questions.</h2>
</div>
```

Replace with:

```html
  <h2>I'm a full stack data specialist based in London with a passion for finding answers to complex questions.</h2>
  <div id="scroll-indicator">
    <span class="scroll-label">scroll</span>
    <div class="chevron-stack">
      <svg class="c1" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="1,1 8,8 15,1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="c2" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="1,1 8,8 15,1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add scroll indicator CSS to the `<style>` block**

Append the following inside the existing `<style>` block in `src/index.md`, before the closing `</style>` tag:

```css
#scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: opacity 0.4s ease;
}

#scroll-indicator.hidden {
  opacity: 0;
}

.scroll-label {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-family: var(--sans-serif);
  color: var(--theme-foreground-muted);
}

.chevron-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

@keyframes chevron-fade {
  0%, 100% { opacity: 0.15; }
  50%       { opacity: 0.9; }
}

.c1 { animation: chevron-fade 1.4s ease-in-out infinite; }
.c2 { animation: chevron-fade 1.4s ease-in-out 0.22s infinite; }
```

- [ ] **Step 3: Verify in browser**

The scroll indicator should appear at the bottom-centre of the hero. "SCROLL" label above two downward-pointing chevrons. The chevrons should pulse in opacity — top leading, bottom following. No up/down movement.

- [ ] **Step 4: Commit**

```bash
git add src/index.md
git commit -m "feat: add animated scroll indicator to hero"
```

---

### Task 3: Add fade-out on scroll

**Files:**
- Modify: `src/index.md` (add `<script>` block after the `<style>` block)

- [ ] **Step 1: Add the script block**

In `src/index.md`, after the closing `</style>` tag, add:

```html
<script>
  function onScroll() {
    document.getElementById('scroll-indicator').classList.add('hidden');
    window.removeEventListener('scroll', onScroll);
  }
  window.addEventListener('scroll', onScroll);
</script>
```

- [ ] **Step 2: Verify in browser**

Reload the page. The scroll indicator should be visible. Scroll down — the indicator should fade to invisible over ~0.4s. Scroll back up — the indicator should remain hidden (it only fires once).

- [ ] **Step 3: Commit**

```bash
git add src/index.md
git commit -m "feat: fade out scroll indicator on first scroll"
```
