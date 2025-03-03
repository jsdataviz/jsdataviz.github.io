---
toc: false
theme: "air"
---

<script src="https://strava-embeds.com/embed.js"></script>

<div class="hero">
  <h1>Ride London Wrap-up</h1>
  <h2>As the future of Ride London is a little murky at the moment, let's concentrate on the good times by diving into last year's data.</h2>
</div>

---

<div class="grid grid-cols-2">
<div>

## Introduction
In case you're not in know, Ride London is (was?) a cycling festival that takes place yearly in London over the weekend of the May public holiday in the UK, during which roads are closed from Central London to Essex for cycling use only.

Professional events are featured over the weekend, as well as a series of spotifs and a casual 'free-ride' around the city for all abilities on the Sunday. The most popular event being the 100 mile route, which was also part of the [London Classics](https://www.thelondonclassics.co.uk/).

On the 11th of September 2024, it was announced that Ride London [would not be returning in 2025](https://www.ridelondon.co.uk/news-and-media/latest-news/2025-event-update). With London Marathon Events saying that they were taking the time to perform a "full strategic review" of the event.

So let's pay our respects to our fallen event by digging into the data and seeing what we can learn about how the event was organized and how it was ridden. 🫡

</div>

<div>
<iframe src="https://ridewithgps.com/embeds?type=route&id=46770285&sampleGraph=true&distanceMarkers=true&hideSurface=true" style="width: 1px; min-width: 100%; height: 700px; border: none;" scrolling="no"></iframe>
</div>
</div>

```js
  const raceData_100 = FileAttachment("./data/final_I_data.csv").csv({typed: true});
  const rideBlue = '#060549'
  const rideTotals_100 = [20432, 20057, 17887]
  const rideTotals_60 = [2124, 2145, 2378]
  const rideTotals_30 = [413, 395, 832]
```

```js
const raceData2024 = raceData_100.filter(d => d.year == 2024)
const sortedTimeData2024 = raceData2024.sort((a, b) => a.final_time_decimal - b.final_time_decimal).map(d => d.final_time_decimal)
```

```js
function formatRaceTime(timeDecimal) {
  var hours = Math.floor(timeDecimal)
  var minutes = Math.round((timeDecimal % 1) * 60)
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}
```
<!-- 
```js
display(raceData2024.filter(d => d.rider_no == 126410))
``` -->

## Basic Ride Facts
- How many people raced
- What the makeup of riders was
- Percentiles

TODO - Add Quantile lines, cumulative lines, 
Add filters for cumulative distribution, 

```js
const riderNo = view(Inputs.text({placeholder: "Enter your rider number", type: "Number"}));
```

```js
const quantiles = [0.01, 0.10, 0.25, 0.50, 0.75, 0.90, 0.99];
const quantileValues = quantiles.map(q => d3.quantile(sortedTimeData2024, q));

// Create a quantile scale that maps ride times to quantiles
const quantileScale = d3.scaleQuantile()
    .domain(sortedTimeData2024) // The domain should be the full sorted dataset
    .range(d3.range(100)); 

display(
    Plot.plot({
        inset: 6,
        height: 700,
        width: width,
        marginLeft: 60,
        marginRight: 60,
        grid: true,
        y: { label: "Ride Time (Hours)", grid: true, tickFormat: d => formatRaceTime(d)},
        x: { axis: null},
        marks: [
            Plot.ruleY(quantileValues, {stroke: rideBlue, strokeWidth: 1.5}),
            Plot.ruleY(raceData2024.filter(d => d.rider_no == riderNo), {y: "final_time_decimal", stroke: "darkRed", strokeWidth: 1.5}),
            Plot.text(quantileValues, {
              x: 18000,
              dx: 24,
              dy: -6,
              y: (d) => d,
              text: (d, i) => `${d3.format(".0%")(quantiles[i])}`,
            }),
            Plot.text(quantileValues, {
              x: 18000,
              dx: 24,
              dy: 6,
              y: (d) => d,
              text: (d, i) => `${formatRaceTime(d)}`,
            }),
            Plot.text(raceData2024.filter(d => d.rider_no == riderNo), {
              x: 18000,
              dx: 24,
              dy: -6,
              y: "final_time_decimal",
              fill: "red",
              text: (d) => `${quantileScale(d.final_time_decimal)}%`,
            }),
            Plot.text(raceData2024.filter(d => d.rider_no == riderNo), {
              x: 18000,
              dx: 24,
              dy: 6,
              y: "final_time_decimal",
              fill: "red",
              text: (d) => `${formatRaceTime(d.final_time_decimal)}`,
            }),
            Plot.dot(raceData2024, {
                x: "rider_pos",
                y: "final_time_decimal",
                stroke: rideBlue, 
                r: 2,
                strokeWidth: 1,
                tip: true,
            }),
            Plot.dot(raceData2024.filter(d => d.rider_no == riderNo), {
                x: "rider_pos",
                y: "final_time_decimal",
                stroke: "red",
                fill: "darkRed",
                r: 5, 
            }),
        ]
        })
)
```

```js
display(
    Plot.plot({
    marginLeft: 60,
    marginTop: 40,
    height: 540,
    width: width,
    x: { label: "Ride Time (Hours)", tickFormat: d => formatRaceTime(d)},
    y: { label: "Number of Finished Riders", grid: true},
    marks: [
        Plot.rectY(raceData_100.filter(d => d.year == 2024),
            Plot.binX({y: "count"}, {x: "final_time_decimal", fill: rideBlue}),
        ),
        Plot.ruleX(quantileValues, {stroke: "darkRed", strokeWidth: 2}),
        Plot.ruleX(raceData2024.filter(d => d.rider_no == riderNo), {x: "final_time_decimal", stroke: "red", strokeWidth: 1.5}),
        Plot.text(quantileValues, {
          y: 1200,
          dy: -26,
          x: (d) => d,
          text: (d, i) => `${d3.format(".0%")(quantiles[i])}`,
        }),
        Plot.text(quantileValues, {
          y: 1200,
          dy: -16,
          x: (d) => d,
          text: (d, i) => `${formatRaceTime(d)}`,
        }),
        Plot.text(raceData2024.filter(d => d.rider_no == riderNo), {
          y: 1200,
          dy: -26,
          x: (d) => d.final_time_decimal,
          fill: "red",
          text: (d) => `${quantileScale(d.final_time_decimal)}%`,
        }),
        Plot.text(raceData2024.filter(d => d.rider_no == riderNo), {
          y: 1200,
          dy: -16,
          x: (d) => d.final_time_decimal,
          fill: "red",
          text: (d) => `${formatRaceTime(d.final_time_decimal)}`,
        }),
        Plot.ruleY([0])
    ]
    })
)
```

```js
display(
    Plot.plot({
    marginLeft: 60,
    marginTop: 40,
    width: width,
    x: { label: "Ride Time (Hours)", tickFormat: d => formatRaceTime(d)},
    y: { label: "Number of Finished Riders", grid: true},
    marks: [
        Plot.rectY(raceData_100.filter(d => d.year == 2024), Plot.binX({y: "count"}, {x: "final_time_decimal", cumulative: 1, fill: rideBlue,})),
        Plot.ruleX(quantileValues, {stroke: "darkRed", strokeWidth: 2}),
        Plot.ruleX(raceData2024.filter(d => d.rider_no == riderNo), {x: "final_time_decimal", stroke: "red", strokeWidth: 1.5}),
        Plot.text(quantileValues, {
          y: 17500,
          dy: -26,
          x: (d) => d,
          text: (d, i) => `${d3.format(".0%")(quantiles[i])}`,
        }),
        Plot.text(quantileValues, {
          y: 17500,
          dy: -16,
          x: (d) => d,
          text: (d, i) => `${formatRaceTime(d)}`,
        }),
        Plot.text(raceData2024.filter(d => d.rider_no == riderNo), {
          y: 17500,
          dy: -26,
          x: (d) => d.final_time_decimal,
          fill: "red",
          text: (d) => `${quantileScale(d.final_time_decimal)}%`,
        }),
        Plot.text(raceData2024.filter(d => d.rider_no == riderNo), {
          y: 17500,
          dy: -16,
          x: (d) => d.final_time_decimal,
          fill: "red",
          text: (d) => `${formatRaceTime(d.final_time_decimal)}`,
        }),
        Plot.ruleY([0])
    ]
    })
)
```

- Average speed
- Overall distribution

## How was the event run?
- Start time waves
- Did the weather cause a crowded start?
- Number of breaks
- Most popular spots
- Least break time spot

## Event compared to previous years
- Number of riders per year (weather effect)
- Event types growing or shrinking
- Finish time distribution
- Wind speed factor

```js
display(
    Plot.plot({
        inset: 6,
        height: 650,
        width: width,
        marginLeft: 60,
        color: {
            scheme: "tableau10",
            type: "categorical",
            legend: true,
        },
        y: { label: "Number of Riders", grid: true },
        x: { label: "Ride Time Hours" },
        marks: [
            Plot.rectY(raceData_100,
                Plot.binX({y2: "count"}, {x: "final_time_decimal", fill: "year", mixBlendMode: "multiply"})),
            Plot.ruleY([0]),
        ]
        })
)
```

```js
display(
    Plot.plot({
        inset: 6,
        height: 650,
        width: width,
        marginLeft: 60,
        grid: true,
        y: { label: "Rider Number", grid: true},
        x: { label: "Start Time of Day", type: "time" },
        marks: [
            Plot.dot(raceData_100.filter(d => d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "rider_no",
                stroke: rideBlue, 
                tip: true,
            })
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

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 2rem 0 2rem;
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
  color: #060549;

}

#name {
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0rem 0 0rem;
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