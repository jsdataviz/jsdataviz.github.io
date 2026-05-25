---
toc: false
sidebar: false
---

<div class="hero">
  <h1>Hi there, I'm <span id='name'>Joe</span>.</h1>
  <h2>I'm a full stack data specialist based in London with a passion for finding answers to complex questions.</h2>
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


<style>

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

</style>
