---
toc: false
sidebar: false
---

<div class="hero">
  <h1>Hi there, I'm <span id='name'>Joe</span>.</h1>
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

---

## What exactly is a full stack data specialist?
It's a job title I've held since 2023 that sums up my role best. I enjoy solving the puzzles and drawing the value that can be found in data, from building the infrastructure to obtain the raw data from interal or public sources, to presenting that data as analysis or useful data products to stakeholders.

### Examples

<div class="grid grid-cols-3" style="grid-auto-rows: 404px;">
  <div class="card">
    <h1>Ride London Analysis</h1>
  </div>
  <div class="card">
    <h1>Data Products</h1>
  </div>
  <div class="card">
    <h1>Scraping and Infrastructure</h1>
  </div>
</div>

---

### Experience

<div class="timeline">

  <div class="timeline-entry">
    <div class="timeline-date">
      <span class="timeline-years">2023 — Now</span>
      <div class="timeline-role">Full Stack Data Specialist</div>
      <div class="timeline-company">Company Name</div>
    </div>
    <div class="timeline-aside">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content">
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
    </div>
  </div>

  <div class="timeline-entry">
    <div class="timeline-date">
      <span class="timeline-years">2021 — 2023</span>
      <div class="timeline-role">Senior Data Analyst</div>
      <div class="timeline-company">Company Name</div>
    </div>
    <div class="timeline-aside">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content">
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
    </div>
  </div>

  <div class="timeline-entry">
    <div class="timeline-date">
      <span class="timeline-years">2019 — 2021</span>
      <div class="timeline-role">Data Analyst</div>
      <div class="timeline-company">Company Name</div>
    </div>
    <div class="timeline-aside">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content">
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
      <p class="timeline-desc">End-to-end ownership of data infrastructure and analytics products. Designed and maintained ETL pipelines ingesting from public APIs and internal sources, built interactive dashboards for senior stakeholders, and led a small team of analysts.</p>
    </div>
  </div>

  <div class="timeline-entry">
    <div class="timeline-date">
      <span class="timeline-years">2017 — 2019</span>
      <div class="timeline-role">Junior Data Analyst</div>
      <div class="timeline-company">Company Name</div>
    </div>
    <div class="timeline-aside">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content">
      <p class="timeline-desc">First role in data. Maintained dashboards, performed ad-hoc analysis in Excel and early Python, and supported the senior team on quarterly business reviews.</p>
    </div>
  </div>

</div>

---


<style>

#observablehq-center {
  margin-top: 0;
}

#observablehq-main {
  margin-top: 0;
  font-family: var(--sans-serif);
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--sans-serif);
  min-height: 100dvh;
  box-sizing: border-box;
  padding-bottom: 6rem;
  position: relative;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 11vw;
  font-weight: 600;
  line-height: 1;

}

#name {
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 2vw;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

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

/* ── Timeline ─────────────────────────────────────────── */

.timeline {
  max-width: 680px;
  margin: 2rem 0;
}

.timeline-entry {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.timeline-date {
  position: sticky;
  top: 1.5rem;
  width: 160px;
  flex-shrink: 0;
  text-align: right;
}

.timeline-years {
  display: block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--theme-foreground-muted);
  line-height: 1.5;
  white-space: nowrap;
}

.timeline-aside {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-dot {
  --size: 8px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: var(--theme-foreground-muted);
  flex-shrink: 0;
  margin-top: 4px;
}

.timeline-line {
  flex-grow: 1;
  width: 1px;
  min-height: 1.5rem;
  margin: 6px 0;
  background: var(--theme-foreground-faintest);
}

.timeline-content {
  padding-bottom: 2.5rem;
}

.timeline-role {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3;
  margin-top: 0.3rem;
  margin-bottom: 0.15rem;
  color: var(--theme-foreground);
}

.timeline-company {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--theme-foreground-focus);
}

.timeline-desc {
  font-size: 0.875rem;
  color: var(--theme-foreground-muted);
  line-height: 1.65;
  margin: 0;
}

</style>

```js
{
  const onScroll = () => {
    document.getElementById('scroll-indicator').classList.add('hidden');
    window.removeEventListener('scroll', onScroll);
  };
  window.addEventListener('scroll', onScroll);
}
```
