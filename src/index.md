---
# toc: false
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
    <h1>Scraping and Infrastructure</h1>
  </div>
  <div class="card">## Dashboards and Products</div>
  <div class="card">## Analysis</div>
</div>  

---

```js
  const raceData_100 = FileAttachment("./data/final_I_data.csv").csv({tyed: true});
```
```js
console.log(raceData_100)
```

```js
display(
    Plot.plot({
        inset: 6,
        height: 650,
        width: 960,
        grid: true,
        y: { label: "Finish Time", grid: true},
        x: { type: "time" },
        marks: [
            Plot.dot(raceData_100.filter(d => d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "final_time_decimal",
                // stroke: d => d.charity_name !== null ? "red" : "white", 
                tip: true,
            }),
            // Plot.dot(raceData_100.filter(d => d.year == 2024 && d.charity_name !== null), {
            //     x: "rider_no",
            //     y: d => d3.timeParse("%H:%M:%S")(d.final_time),
            //     stroke: "red",
            //     tip: true,
            //     // title: d => `Date: ${d.price_updated_datetime.substring(0, 10)}\nHectare Trading Close: £${Math.round(d.hectare_close)}`
            // }),
        ]
        })
)
```

## Next steps

Here are some ideas of things you could try…

<div class="grid grid-cols-4">
  <div class="card">
    Chart your own data using <a href="https://observablehq.com/framework/lib/plot"><code>Plot</code></a> and <a href="https://observablehq.com/framework/files"><code>FileAttachment</code></a>. Make it responsive using <a href="https://observablehq.com/framework/javascript#resize(render)"><code>resize</code></a>.
  </div>
  <div class="card">
    Create a <a href="https://observablehq.com/framework/project-structure">new page</a> by adding a Markdown file (<code>whatever.md</code>) to the <code>src</code> folder.
  </div>
  <div class="card">
    Add a drop-down menu using <a href="https://observablehq.com/framework/inputs/select"><code>Inputs.select</code></a> and use it to filter the data shown in a chart.
  </div>
  <div class="card">
    Write a <a href="https://observablehq.com/framework/loaders">data loader</a> that queries a local database or API, generating a data snapshot on build.
  </div>
  <div class="card">
    Import a <a href="https://observablehq.com/framework/imports">recommended library</a> from npm, such as <a href="https://observablehq.com/framework/lib/leaflet">Leaflet</a>, <a href="https://observablehq.com/framework/lib/dot">GraphViz</a>, <a href="https://observablehq.com/framework/lib/tex">TeX</a>, or <a href="https://observablehq.com/framework/lib/duckdb">DuckDB</a>.
  </div>
  <div class="card">
    Ask for help, or share your work or ideas, on the <a href="https://talk.observablehq.com/">Observable forum</a>.
  </div>
  <div class="card">
    Visit <a href="https://github.com/observablehq/framework">Framework on GitHub</a> and give us a star. Or file an issue if you’ve found a bug!
  </div>
</div>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 12rem 0 12rem;
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
  margin: 0rem 0 10rem;
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
