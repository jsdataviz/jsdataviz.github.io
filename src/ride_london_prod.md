---
toc: false
theme: "air"
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

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
  const rideTotals = [
    {year: "2024", distance: "100", num_riders: 17887},
    {year: "2024", distance: "60", num_riders: 2378},
    {year: "2024", distance: "30", num_riders: 832},
    {year: "2023", distance: "100", num_riders: 20057},
    {year: "2023", distance: "60", num_riders: 2145},
    {year: "2023", distance: "30", num_riders: 395},
    {year: "2022", distance: "100", num_riders: 20432},
    {year: "2022", distance: "60", num_riders: 2124},
    {year: "2022", distance: "30", num_riders: 413},
  ]
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

```js
const raceColors = {
    "100": rideBlue,
    "60": "#efb118",
    "30": "#ff725c",
  }
```

---

# How many people rode?

Add overall total number of riders here.

### Less people rode the 100, but the event was drawing in more beginners
<br>
The number of total 100 riders dropped by 11% between 2024 and 2023. Which had better conditions when the race started and throughout the day.

<div>
  ${Plot.plot({
      title: "100 Miles",
      height: 350,
      width: 400,
      marginLeft: 50,
      marginTop: 25,
      x: {label: null},
      y: {label: "Number of Riders", domain: [0, 22000]},
      marks: [
        Plot.barY(rideTotals.filter(d => d.distance == "100"), {
          x: "year",
          y: "num_riders",
          fill: raceColors["100"],
        }),
        Plot.ruleY([0]),
        Plot.text(rideTotals.filter(d => d.distance == "100"), {
          x: "year",
          y: "num_riders",
          text: "num_riders",
          dy: -6,
          lineAnchor: "bottom",
        })
      ]
    })
  }
</div>

Despite the weather however, the shorter events aimed at beginners had considerably more riders than previous years. With the 60 mile race having an increase of 11% between 2024 & 2023, and the 30 mile race more than doubling to 832 riders in 2024. Up from 395 in 2023.

<div class="grid grid-cols-2">
  <div>
    ${Plot.plot({
        title: "60 Miles",
        height: 350,
        width: 400,
        marginLeft: 50,
        marginTop: 25,
        x: {label: null},
        y: {label: "Number of Riders", domain: [0, 2500]},
        marks: [
          Plot.barY(rideTotals.filter(d => d.distance == "60"), {
            x: "year",
            y: "num_riders",
            fill: raceColors["60"],
          }),
          Plot.text(rideTotals.filter(d => d.distance == "60"), {
            x: "year",
            y: "num_riders",
            text: "num_riders",
            dy: -6,
            lineAnchor: "bottom",
          })
        ]
      })
    }
  </div>
  <div>
    ${Plot.plot({
        title: "30 Miles",
        height: 350,
        width: 400,
        marginLeft: 50,
        marginTop: 25,
        x: {label: null},
        y: {label: "Number of Riders", domain: [0, 2500]},
        marks: [
          Plot.barY(rideTotals.filter(d => d.distance == "30"), {
            x: "year",
            y: "num_riders",
            fill: raceColors["30"],
          }),
          Plot.text(rideTotals.filter(d => d.distance == "30"), {
            x: "year",
            y: "num_riders",
            text: "num_riders",
            dy: -6,
            lineAnchor: "bottom",
          })
        ]
      })
    }
  </div>
</div>

## Basic Ride Facts
- How many people raced ✅
- What the makeup of riders was
- Percentiles

```js
const riderNo = view(Inputs.text({placeholder: "Enter your rider number", type: "Number"}));
const distroPicker = view(Inputs.select(["Distribution", "Histogram", "Cumulative Histogram"], {value: "Distribution", label: "Graph Type"}));
```

```js
  function distroGraph(graphType) {
      let plotConfig;

      const quantiles = [0.01, 0.10, 0.25, 0.50, 0.75, 0.90, 0.99];
      const quantileValues = quantiles.map(q => d3.quantile(sortedTimeData2024, q));

      // Create a quantile scale that maps ride times to quantiles
      const quantileScale = d3.scaleQuantile()
          .domain(sortedTimeData2024) // The domain should be the full sorted dataset
          .range(d3.range(100)); 

      if (graphType === "Distribution") {
          plotConfig = {
              inset: 6,
              height: 640,
              width: width,
              marginLeft: 60,
              marginRight: 60,
              grid: true,
              y: { label: "Ride Time (Hours)", grid: true, tickFormat: d => formatRaceTime(d) },
              x: { label: "Finish Position", axis: null },
              marks: [
                  Plot.ruleY(quantileValues, { stroke: rideBlue, strokeWidth: 1.5 }),
                  Plot.ruleY(raceData2024.filter(d => d.rider_no == riderNo), { y: "final_time_decimal", stroke: "darkRed", strokeWidth: 1.5 }),
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
                      tip: {
                        format: {
                          y: (y) => formatRaceTime(y),
                        }
                      },
                  }),
                  Plot.dot(raceData2024.filter(d => d.rider_no == riderNo), {
                      x: "rider_pos",
                      y: "final_time_decimal",
                      stroke: "red",
                      fill: "darkRed",
                      r: 5,
                  }),
              ]
          };
      } else if (graphType === "Histogram") {
          plotConfig = {
              marginLeft: 60,
              marginTop: 40,
              height: 640,
              width: width,
              x: { label: "Ride Time (Hours)", tickFormat: d => formatRaceTime(d) },
              y: { label: "Number of Finished Riders", grid: true },
              marks: [
                  Plot.rectY(raceData_100.filter(d => d.year == 2024),
                      Plot.binX({ y: "count" }, { x: "final_time_decimal", fill: rideBlue }),
                  ),
                  Plot.ruleX(quantileValues, { stroke: "darkRed", strokeWidth: 2 }),
                  Plot.ruleX(raceData2024.filter(d => d.rider_no == riderNo), { x: "final_time_decimal", stroke: "red", strokeWidth: 1.5 }),
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
          };
      } else if (graphType === "Cumulative Histogram") {
          plotConfig = {
              marginLeft: 60,
              marginTop: 40,
              width: width,
              height: 640,
              x: { label: "Ride Time (Hours)", tickFormat: d => formatRaceTime(d) },
              y: { label: "Number of Finished Riders", grid: true },
              marks: [
                  Plot.rectY(raceData_100.filter(d => d.year == 2024),
                      Plot.binX({ y: "count" }, { x: "final_time_decimal", cumulative: 1, fill: rideBlue })),
                  Plot.ruleX(quantileValues, { stroke: "darkRed", strokeWidth: 2 }),
                  Plot.ruleX(raceData2024.filter(d => d.rider_no == riderNo), { x: "final_time_decimal", stroke: "red", strokeWidth: 1.5 }),
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
          };
      }

      // Display the selected graph
      return plotConfig;
}
```

```js
  display(Plot.plot(distroGraph(distroPicker)))
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

body {
  font-family: var(--sans-serif);
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 2rem 0 2rem;
  text-wrap: balance;
  text-align: center;
  font-weight: bold;
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