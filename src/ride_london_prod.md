---
# toc: false
theme: "air"
toc: false
sidebar: false
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<div class="hero">
  <h1>Ride London Wrap-up</h1>
  <h2>With Ride London being officially cancelled, let's dig into the data to see what happened and how we got here.</h2>
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

<div id="section-banner"><div id="section-banner-inner"></div></div>

---

<div class="grid grid-cols-2">
  <div>

  ## Introduction
  In case you're not in know, Ride London was a cycling festival created post the 2012 London Olympics games that took place yearly in London over the weekend of the late May public holiday in the UK. During the event roads were closed from Central London to Essex for cycling use only.

  The weekend opened with the [RideLondon Classique](https://en.wikipedia.org/wiki/RideLondon_Classique), a three day women's road race that was park of the UCI Women's World Tour as well as a series of challenge rides (or sportives) and a casual 'free-ride' around the closed roads in the center of London for all abilities on the Sunday.

  The most popular of the challenge rides was the 100 mile route, in which 500,000 people had ridden and raised over £85m for charity since 2013.

  In September 2024, it was announced that Ride London [would not be returning in 2025](https://www.ridelondon.co.uk/news-and-media/latest-news/2025-event-update). With London Marathon Events saying that they were taking the time to perform a "full strategic review" of the event. In February of 2026, Ride London was placed on ["indefinite pause" by the London Marathon Events](https://www.londonmarathonevents.co.uk/ridelondon).

  So what happened to our beloved cycling festival? The answer unfortunately comes down to declining participation numbers, sponsorship issues and route planning disputes between TFL and London Marathon events. This analysis will explore how the event was performing, how well it was run and why the event was eventually cancelled indefinitely.

  </div>

  <div>
  ${introRouteMap(introRouteGeoJSON, cartoKey)}
  </div>
</div>

<div class="rider-callout">

<h4>See yourself in the data</h4>

If you rode in the 2024 RideLondon 100 mile event enter your rider number below to have it highlighted throughout the analysis. If you don't know your rider number, you can find it by entering your name [here](https://results.ridelondon.co.uk/2024/).

```js
const riderInput = Inputs.text({placeholder: "Enter your rider number", type: "Number", value: 126410, label: "Your rider number"});
// Only riders with the core fields every highlighted chart below actually
// needs (start time, finish time, assigned + actual wave) - so whichever
// number the button lands on is guaranteed to show up. Deduplicated since
// rider_no isn't guaranteed unique across the raw rows.
const validRiderPool = [...new Set(
  raceData_2024_100
    .filter(d => d.rider_no != null
      && d.start_tod != null
      && d.final_time_decimal != null
      && d.assigned_wave_number != null
      && d.assigned_start_wave != null)
    .map(d => d.rider_no)
)];
const randomRiderButton = Inputs.button("Random Rider", {
  reduce: () => {
    riderInput.value = validRiderPool[Math.floor(Math.random() * validRiderPool.length)];
    riderInput.dispatchEvent(new Event("input", { bubbles: true }));
  },
});
display(html`<div style="display:flex; gap:0.75rem; align-items:end; flex-wrap:wrap;">${riderInput}${randomRiderButton}</div>`);
const riderNo = Generators.input(riderInput);
```

</div>

```js
  const allRoutesGeoJSON = FileAttachment("./data/rl_routes.geojson").json();
  const londonBridges = FileAttachment("./data/london_road_bridges.json").json();
  // CARTO now requires an API key on raster tile requests - see
  // src/data/carto-key.json.js for where this comes from.
  const cartoKey = FileAttachment("./data/carto-key.json").json().then(d => d.key);
  const raceData_100 = FileAttachment("./data/parsed_I_data.csv").csv({typed: true});
  const raceData_60 = FileAttachment("./data/parsed_I60_data.csv").csv({typed: true});
  const raceData_30 = FileAttachment("./data/parsed_I30_data.csv").csv({typed: true});
  const raceSimData = FileAttachment("./data/race_sim_data.csv").csv();
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
import * as aq from "npm:arquero"
```

```js
const _r = name => ({ type: "FeatureCollection", features: [allRoutesGeoJSON.features.find(f => f.properties.name === name)] });
const introRouteGeoJSON = _r('Route A');
const routeB            = _r('Route B');
const routeBLine        = _r('Route B Line');
const routeC            = _r('Route C');
const routeD            = _r('Route D');
const routeE            = _r('Route E');
const routeF            = _r('Route F');
```

```js
import { rideBlue, raceColors, formatRaceTime, waveStartLines, endLines, startLabels } from "./components/constants.js";
import { ridersYearlyChart } from "./components/ridersYearlyChart.js";
import { femaleRidersTotalsChart } from "./components/femaleRidersTotalsChart.js";
import { startTimeScatterChart } from "./components/startTimeScatterChart.js";
import { riderStartScatterChart } from "./components/riderStartScatterChart.js";
import { waveBoxPlotChart } from "./components/waveBoxPlotChart.js";
import { verticalBarChart } from "./components/verticalBarChart.js";
import { restStopAvgTable } from "./components/restStopAvgTable.js";
import { waveStatsTable, aggregatedColumns } from "./components/waveStatsTable.js";
import { waveChordChart } from "./components/waveChordChart.js";
import { waveMigrationHeatmap } from "./components/waveMigrationHeatmap.js";
import { raceSimGraph, withRestStops } from "./components/raceSimGraph.js";
import { riderPathsSingleChart } from "./components/riderPathsSingleChart.js";
import { riderPathsSimplifiedChart } from "./components/riderPathsSimplifiedChart.js";
import { riderPathsCanvasChart } from "./components/riderPathsCanvasChart.js";
import { yearHistogramsChart } from "./components/yearHistogramsChart.js";
import { introRouteMap } from "./components/introRouteMap.js";
import { silvertonRouteMap } from "./components/silvertonRouteMap.js";
import { routeMap } from "./components/routeMap.js";
```

```js
const combinedRaceData = [
    ...raceData_100.map(item => ({ ...item, raceLength: '100' })),
    ...raceData_60.map(item => ({ ...item, raceLength: '60' })),
    ...raceData_30.map(item => ({ ...item, raceLength: '30' }))
  ];

const raceData_2024_100 = raceData_100.filter(d => d.year == 2024);
```
---

# How was Ride London performing?

The first indication of trouble for Ride London was that less riders participated in the 2024 edition of Ride London than the previous two years.

In fact only a total of 21,103 people rode in one of the Ride London events in 2024, a 7% drop from the 22,596 riders from 2023.

However, this is the number of riders who completed the race, rather than registrations. Conditions were poor in the morning of the 2024 with scattered rain which may have led to less riders participating but the event did not sell out as in previous years.

```js
const groupedYearlyData = aq.from(combinedRaceData)
  .groupby("year", "raceLength")
  .rollup({ riders: aq.op.count() })
  .objects();

groupedYearlyData.push(
  {year: 2022, raceLength: "100", riders: 20432},
  {year: 2022, raceLength: "60", riders: 1386},
  {year: 2022, raceLength: "30", riders: 413},
)
```

<div>
${resize((width) => ridersYearlyChart(groupedYearlyData, width > 640 ? 640 : width))}
</div>

### Less people rode the 100, but the shorter rides were growing in popularity
The source of these declining numbers was in the most popular event, the 100 mile loop out to Essex and back. The total of entrants that departed dropped by 11% year to year, more than 2000 fewer entrants than 2023.

${resize((width) => verticalBarChart(rideTotals.filter(d => d.distance == "100"), width > 640 ? 640 : width, {
  title: "100 Miles",
  x: "year",
  y: "num_riders",
  fill: raceColors["100"],
  yLabel: "Number of Riders",
  label: d => d.num_riders,
}))}

Despite this, the shorter events aimed at beginners had considerably more riders than previous years. With the 60 mile race having an increase of 11% between 2024 & 2023, and the 30 mile race more than doubling to 832 riders in 2024. Up from 395 in 2023.

<div class="grid grid-cols-2">
  <div>
    ${resize((width) => verticalBarChart(rideTotals.filter(d => d.distance == "60"), width > 640 ? 640 : width, {
      title: "60 Miles",
      x: "year",
      y: "num_riders",
      fill: raceColors["60"],
      yLabel: "Number of Riders",
      label: d => d.num_riders,
    }))}
  </div>
  <div>
    ${resize((width) => verticalBarChart(rideTotals.filter(d => d.distance == "30"), width > 640 ? 640 : width, {
      title: "30 Miles",
      x: "year",
      y: "num_riders",
      fill: raceColors["30"],
      yLabel: "Number of Riders",
      label: d => d.num_riders,
    }))}
  </div>
</div>
<br>

### However, fewer women raced than ever before, including beginners.

With the Ride London Classique previously being part of the women's UCI world tour, it's disappointing that fewer women took part in the Ride London challenge rides than ever before. Only 4,091 female riders took part in Ride London, a decrease of 709 riders year to year.

This declining trend of female participation even occurred when the event grew in total attendance 2023. Meaning the ratio of female to male riders has also been declining year over year.

```js
const groupedFemaleData = aq.from(combinedRaceData)
  .filter(aq.escape(d => d.sex === 'W'))
  .groupby("year", "raceLength")
  .rollup({ riders: aq.op.count() })
  .objects();

groupedFemaleData.push(
  {year: 2022, raceLength: "100", riders: 4502},
  {year: 2022, raceLength: "60", riders: 429},
  {year: 2022, raceLength: "30", riders: 228},
  )
```

${resize((width) => femaleRidersTotalsChart(groupedFemaleData, width > 640 ? 640 : width))}

```js
  const races = [
    { raceDistance: "100", data: raceData_100 },
    { raceDistance: "60",  data: raceData_60 },
    { raceDistance: "30",  data: raceData_30 },
  ];

  const hardcoded2022 = { "100": 0.22, "60": 0.309523, "30": 0.552 };

  const femaleRatioData = [
    ...[2024, 2023].flatMap(year =>
      races.map(({ raceDistance, data }) => ({
        year: String(year),
        raceDistance,
        genderRatio: data.filter(d => d.sex == 'W' && d.year == year).length /
                     data.filter(d => d.year == year).length,
      }))
    ),
    ...races.map(({ raceDistance }) => ({
      year: "2022",
      raceDistance,
      genderRatio: hardcoded2022[raceDistance],
    })),
  ]
```

The ratio of female to male riders dropped in every category, from 2022 to 2024. Dropping 5% in the most popular race category, the 100 miler.

It's also worth noting the decline in the most beginner friendly race category of 30 miles in which more women used to race than men. The beginners race's overall popularly doubled in 2024 but this was not been felt equally between male and female riders, with the ratio of women to men seeing a 8% drop from 2023 to 2024.

<div class="grid grid-cols-3">
  <div>
    ${resize((width) => verticalBarChart(femaleRatioData.filter(d => d.raceDistance == "100"), width > 640 ? 640 : width, {
      title: "100 miles",
      x: d => String(d.year),
      y: "genderRatio",
      fill: raceColors["100"],
      yLabel: "Perc. of Female Riders",
      yDomain: [0, 1],
      yTickFormat: d => `${d * 100}%`,
      label: d => `${d3.format(".0f")(d.genderRatio * 100)}%`,
    }))}
  </div>
  <div>
    ${resize((width) => verticalBarChart(femaleRatioData.filter(d => d.raceDistance == "60"), width > 640 ? 640 : width, {
      title: "60 miles",
      x: d => String(d.year),
      y: "genderRatio",
      fill: raceColors["60"],
      yLabel: "Perc. of Female Riders",
      yDomain: [0, 1],
      yTickFormat: d => `${d * 100}%`,
      label: d => `${d3.format(".0f")(d.genderRatio * 100)}%`,
    }))}
  </div>
  <div>
    ${resize((width) => verticalBarChart(femaleRatioData.filter(d => d.raceDistance == "30"), width > 640 ? 640 : width, {
      title: "30 miles",
      x: d => String(d.year),
      y: "genderRatio",
      fill: raceColors["30"],
      yLabel: "Perc. of Female Riders",
      yDomain: [0, 1],
      yTickFormat: d => `${d * 100}%`,
      label: d => `${d3.format(".0f")(d.genderRatio * 100)}%`,
    }))}
  </div>
</div>
<br>

### This low level of female participation is an outlier in regards to mass participation LME events

This gender gap is particularly bad when compared to other mass participation events that the London Marathon Events group organises yearly.

When compared to the other two events in the London Classic series, the London marathon and the two mile swim in the Serpentine, we can see that Ride London had the lowest share of female participants of any event. Falling a massive 26% behind the participation rate of the London Marathon.

```js
  const londonMarathonData = [
    {year: "2022", genderRatio: 0.40589935496},
    {year: "2023", genderRatio: 0.41509433962},
    {year: "2024", genderRatio: 0.42614504114},
  ]

  const londonClassicData = [
    {year: "London Marathon", genderRatio: 0.42614504114},
    {year: "Serpentine 2 Mile Swim", genderRatio: 0.45594649607},
    {year: "Ride London 100", genderRatio: 0.17},
  ]

  const londonSwimData = [
    {year: "2022", genderRatio: 0.3},
    {year: "2023", genderRatio: 0.49975864843},
    {year: "2024", genderRatio: 0.45594649607},
  ]

  display(resize((width) => verticalBarChart(londonClassicData, width > 640 ? 640 : width, {
    title: "Female Participants in London Classic events",
    x: "year",
    xDomain: ["Serpentine 2 Mile Swim", "London Marathon", "Ride London 100"],
    y: "genderRatio",
    yLabel: "Perc. of Female Participants",
    yDomain: [0, 1],
    yTickFormat: d => `${d3.format(".0%")(d)}`,
    label: d => `${d3.format(".0%")(d.genderRatio)}`,
  })))
```

It was the only event where this gender gap between participants was increasing. The London Marathon's female to male ratio of participation has been steadily rising since 2022, from 41% in 2022 to 44% in 2026.

The London Serpentine swim has performed even better, from 2022 to 2025 (the 2026 edition has not yet happened at time of writing) female participation in the event has risen from 42% to 48%.

It's clear that London's premier cycling event was failing to attract and retain female riders as time went on.

---

# How well was the race run?

With over 17,000 riders sharing the 100 miles of road, allowing the event to flow with minimal traffic and providing a safe riding experience is no easy task.

In the perfect scenario the fastest riders would begin first so that the flow of traffic was as smooth as possible. This also means that riders have to perform as few passes of other slower riders as possible. Reducing these interactions between riders is the safest way to operate the event.

To account for this, when entering into the Ride London events, riders are asked to give an estimated time they expect to complete the event. The organisers then place riders into gated starting times to manage the flow of riders throughout the day.

We can see the impact of this management by comparing the time of day each rider began the race, to their total ride time (including any official stops).

```js
display(startTimeScatterChart(raceData_2024_100, width, { highlightRiderNo: riderNo }))
```
<figcaption>The graph above shows each rider plotted by the time of day they started vs the number of hours they took to finish the race (including rest breaks). Quicker riders generally left earlier.</figcaption>

Generally, riders who began riding earlier in the day did complete the race quicker. However the high amount of variance in the correlation shows there was definitely room for improvement.

Let's review how well the "quickest rider first" system was implemented.

For this system to work, these statement need to be true:

- **Riders are realistic about their estimated finishing time.** If riders choose times that are too ambitious, they will be placed in earlier waves and then passed by faster riders.

- **Riders actually begin at their designated starting time.**  If riders choose to leave at a different time than their alloted wave, they will potentially be passing slower riders, or being passed by faster ones.

To evaluate the these two points, we'll need to know what starting waves riders were assigned to and when they departed. Since this information is not publicly available, we'll have to try and infer it from the data itself.

<br>

## Can we tell which wave each rider was assigned to?

Since rider wave information is not available, how can tell if rider's picked the correct time for their wave, or started in their assigned wave?

Often we can infer information contained in the data by looking at the way the IDs are structured. This was famously used in WW2, when the allies estimated the number of German Panther tanks being produced per month by analysing the serial numbers of captured or destroyed tanks in the field (known as the [German tank problem](https://en.wikipedia.org/wiki/German_tank_problem)).

In our case, we can plot the each rider's designated race number against the time they began the race.

```js
display(riderStartScatterChart(raceData_2024_100, width, { stroke: rideBlue, opacity: 0.5, filled: true, highlightRiderNo: riderNo }))
```

<figcaption>The graph above shows each rider plotted by the time of day they started vs their designated rider number. Clear groupings can be seen meaning that rider numbers are based on their assigned start time.</figcaption>

We can see that rider numbers were assigned into blocks of departing times. Meaning that riders who picked a certain time range were given a rider number that fell within an appropriate wave with a departing time that would cause them to start after faster riders and before slower ones.

We can see that the 100 mile race was split into 5 starting waves with the following starting times:

1) **6:00am** - Rider no. between 101,000 and 103,500
2) **6:05am** - Rider no. numbers between 103,700 and 110,000
3) **6:45am** - Rider no. numbers between 110,000 and 116,000
4) **7:35am** - Rider no. numbers between 116,000 and 122,500
5) **8:15am** - Rider no. numbers between 123,000 and 129,000  

```js
display(riderStartScatterChart(raceData_2024_100, width, {
  stroke: "assigned_wave_number",
  opacity: 0.5,
  colorScheme: "viridis",
  ruleLines: [{ data: waveStartLines }],
  tipData: startLabels,
  filled: true,
  highlightRiderNo: riderNo,
  highlightTitle: d => `With a rider number of ${d.rider_no}, you were assigned to ${d.assigned_wave_number}`,
}))
```

<figcaption>The graph above shows each rider plotted by the time of day they started vs their designated rider number. Each rider's assigned wave is shown by colour.</figcaption>

There was also a VIP package sold which allowed entry at any point in the day, which I have assumed to the string of riders with numbers between 100,000 and 101,000 who start throughout the day.

We can also bucket all the rider's who didn't start in the correct wave here, as early or late starters. Let's say as a general rule, if a rider started before their assigned wave start they were an early starter and if they began the race after the subsequent wave start then they are a late starter. 

Since between wave 1 & 2 there is only ~5 minutes, we'll only classify riders who started during wave 3's time window as a later starter, as getting all riders on the road in 5 minutes is quite a task.

See our early and late starters below:

```js
display(riderStartScatterChart(raceData_2024_100, width, {
  stroke: d => d.is_early_starter == "True" ? "lightcoral" : d.is_late_starter == "True" ? "lightBlue" : "lightGrey",
  opacity: d => d.is_early_starter == "True" ? 1 : d.is_late_starter == "True" ? 1 : 0.3,
  ruleLines: [{ data: waveStartLines }, { data: endLines, dashed: true }],
  filled: true,
  highlightRiderNo: riderNo,
  highlightTitle: d => {
    const status = d.is_early_starter == "True" ? "early" : d.is_late_starter == "True" ? "late" : "on time";
    const waveNum = w => w?.replace(/^Wave\s+/, "");
    return status === "on time"
      ? `You left on time in your assigned wave, wave ${waveNum(d.assigned_wave_number)}`
      : `You left ${status} in wave ${waveNum(d.assigned_start_wave)}`;
  },
}))
```

<figcaption>The graph above shows each rider plotted by the time of day they started vs their designated rider number. Riders who started before their assigned wave's start time are marked as early starters, riders who started after the next wave's start time are marked as late starters.</figcaption>

Now we have this information, we can compare various rider stats to see how well riders predicted their own race times and how many departing in their assigned wave.

---

## Did riders choose the right race times?

Now we know where people alloted themselves, let's evaluate if people choose the appropriate race time for their ability. To do this, let's breakdown  the distribution of total ride times for each wave.

```js
    function aggregateWaveTimes(value, timesData) {
    if (timesData.length === 0) {
        return {
        min: null,
        max: null,
        median: null,
        avg: null,
        count: 0,
        percentile10: null,
        percentile90: null
        };
    }
    
    const times = timesData.map(d => d[value]);
    
    times.sort((a, b) => a - b);
    
    const minValue = d3.min(times);
    const maxValue = d3.max(times);
    const medianValue = d3.median(times);
    const avgValue = d3.mean(times);
    const count = times.length;
    const devValue = d3.deviation(times);
    const percentile10 = d3.quantile(times, 0.1);
    const percentile20 = d3.quantile(times, 0.2);
    const percentile30 = d3.quantile(times, 0.3);
    const percentile40 = d3.quantile(times, 0.4);
    const percentile50 = d3.quantile(times, 0.5);
    const percentile60 = d3.quantile(times, 0.6);
    const percentile70 = d3.quantile(times, 0.7);
    const percentile80 = d3.quantile(times, 0.8);
    const percentile90 = d3.quantile(times, 0.9);
    
    return {
        min: minValue,
        max: maxValue,
        median: medianValue,
        avg: avgValue,
        count: count,
        deviation: devValue,
        percentile10: percentile10,
        percentile20: percentile20,
        percentile30: percentile30,
        percentile40: percentile40,
        percentile50: percentile50,
        percentile60: percentile60,
        percentile70: percentile70,
        percentile80: percentile80,
        percentile90: percentile90
    };
    }
```

```js
  const riderWaveRow = raceData_2024_100.filter(d => d.rider_no == riderNo);
  display(waveBoxPlotChart(raceData_2024_100, width, { highlightData: riderWaveRow }))

const waveStats = [
    {
        wave: 'Wave 1',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024_100.filter(d => d.assigned_wave_number == "Wave 1")),
    },
    {
        wave: 'Wave 2',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024_100.filter(d => d.assigned_wave_number == "Wave 2")),

    },
    {
        wave: 'Wave 3',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024_100.filter(d => d.assigned_wave_number == "Wave 3")),

    },
    {
        wave: 'Wave 4',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024_100.filter(d => d.assigned_wave_number == "Wave 4")),

    },
    {
        wave: 'Wave 5',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024_100.filter(d => d.assigned_wave_number == "Wave 5")),

    },
]

display(waveStatsTable(waveStats))
```

<figcaption>The graph above shows the distribution of total ride times (including rest breaks) for all riders in each <strong>assigned wave</strong>. Solid lines mark the median ride time of the wave. If you selected a rider number, their result is marked with a red line. The table displays detailed information, including distribution thresholds.</figcaption>

We can see that riders did generally well at picking appropriate race lengths for themselves, as the median/mean ride time increased for each subsequent wave. 

Interestingly, the deviation of the waves also decreases for each wave, especially from wave 1 to wave 2. Indicating that perhaps riders who entered a particular short time were more likely to over estimate their abilities.

<br>

## Did riders begin in their assigned waves?

We previously labelled the riders who started the race earlier or later than their alloted time slots. Let's look into how this effected the race, starting with how large of a proportion of riders were late or early.

```js
  const leaveCategoryTable = aq.from(raceData_2024_100)
  .derive({
    leave_type: aq.escape(d =>
      d.is_early_starter === "True" ? "Early" :
      d.is_late_starter  === "True" ? "Late"  :
      "On-Time"
    )
  })

const leaveProportions = leaveCategoryTable
  .groupby("leave_type")
  .rollup({ count: aq.op.count() })
  .derive({ proportion: d => d.count / aq.op.sum(d.count) })
  .objects();
```

${resize((width) => verticalBarChart(leaveProportions, width > 640 ? 640 : width, {
  x: "leave_type",
  xDomain: ["Early", "On-Time", "Late"],
  y: "proportion",
  fill: "leave_type",
  color: { domain: ["Early", "On-Time", "Late"], range: ["lightcoral", rideBlue, "lightBlue"] },
  yLabel: "Perc. of Riders",
  yDomain: [0, 1],
  yTickFormat: d => `${d3.format(".0%")(d)}`,
  label: d => ` ${d3.format(".0%")(d.proportion)}`,
  secondaryLabel: "count",
}))}

If our rough estimation based on assigned waves is true, that means that 12% of riders (2,224) began the race earlier than specified and 17% (2,992) began later than instructed. Meaning over a third of riders did not begin in their original starting wave.

When we look at which wave each rider left in vs the wave they were asigned to, we can see riders in wave 2 and wave 5 had the highest proportion of riders who did not start in their allocated wave.



```js
display(resize((width) => waveMigrationHeatmap(raceData_2024_100, width > 640 ? 640 : width)))
```
<figcaption>Each cell's number is how many riders assigned to a wave (rows) actually started in a given wave (columns). The diagonal (started on time) is solid Ride London blue. Off the diagonal, colour is that cell's share of its row - red for early starters, blue for late.</figcaption>
<br>


The overall effect being a large net migration of riders from waves 2 & 5 into waves 3 & 4.

${waveChordChart(raceData_2024_100, width)}
<figcaption>Arrows show the net migration of riders from the rider's <strong>assigned</strong> wave to their <strong>actual</strong> wave. Grey blocks show the proportion of riders who started in their correct wave.</figcaption>

By plotting the number of riders per assigned wave we can see that the race organisers originally indented to allow a smaller group of faster riders to leave first, followed by even groups of riders of ~4000 people per wave. 

However, due to the rider behavior seen above, wave 3 and wave 4 had a much higher number of riders, with over 55% of the total riders leaving in two waves.

Wave 4 was especially concentrated, with an extra 1,446 riders leaving in the wave than planned (37% more than intended).

<div class="grid grid-cols-2">
  <div>
    ${resize((width) => verticalBarChart(
      raceData_2024_100.filter(d => d.assigned_wave_number != 'VIP'), width > 640 ? 640 : width,
      { title: 'Riders Assigned Starts', xLabel: 'Assigned Start Wave', x: 'assigned_wave_number', yDomain: [0, 6000], group: true }
    ))}
  </div>
  <div>
    ${resize((width) => verticalBarChart(
      raceData_2024_100.filter(d => d.assigned_start_wave != null), width > 640 ? 640 : width,
      { title: 'Riders Actual Starts', xLabel: 'Actual Start Wave', x: 'assigned_start_wave', yDomain: [0, 6000], group: true }
    ))}
  </div>
</div>
<br>

## How did this effect the flow of the race?

Due to people not starting in their designated waves, a large portion of the total riders began in wave 3 and 4 rather than evenly distributed across the morning. But how did that effect the *flow* of the race?

To analyse this, I've simulated the ride by splitting the 100 mile course into 5 mile buckets and the rest stops. Using the rider's average time that is calculated at each time gate, we can measure the estimated position of each rider on the route at 15 minute increments across the whole of the ride day.

We can then group our riders by which 5 mile bucket they were in and across the entire day to see where and when there were large concentration of riders during the event.

See below how the simulation looks across the whole day.

```js
raceSimData.forEach(item => {
  const regular = Number(item.regular_riders) || 0;
  const early = Number(item.early_starters) || 0;
  const late = Number(item.late_starters) || 0;

  item.total_riders = regular + early + late;
});


const raceSimFiltered = raceSimData

const riderDistributionLong = raceSimFiltered.flatMap(d => [
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "Correct Wave", riders: +d.regular_riders },
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "Early", riders: +d.early_starters },
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "Late", riders: +d.late_starters },
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "total_riders", riders: +d.total_riders }
])

const loopRaceSim = riderDistributionLong.filter(d => counter == d.hour)
```

```js
const startersRemaining = loopRaceSim.filter(d => d.estimated_distance_bucket == "Not Started")[0];
const startersRemainingInt = 
  Number(startersRemaining?.regular_riders || 0) +
  Number(startersRemaining?.early_starters || 0) +
  Number(startersRemaining?.late_starters || 0);

const ridersFinished = loopRaceSim.filter(d => d.estimated_distance_bucket == "Finished")[0];
const ridersFinishedInt = 
  Number(ridersFinished?.regular_riders || 0) +
  Number(ridersFinished?.early_starters || 0) +
  Number(ridersFinished?.late_starters || 0);

```

```js
const counter = (async function* () {
  let value = 6;

  while (true) {
    yield value;
    await new Promise((resolve) => setTimeout(resolve, 500));

    value += 0.25;
    if (value > 18) value = 6;
  }
})();
```

```js
const hours = Math.floor(counter);
const minutes = Math.round((counter % 1) * 60);

const formattedTime =
  `${(hours % 12) || 12}:${String(minutes).padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`;
```

### ${formattedTime}
```js
display(
  (() => {
    const mobile = width < 600;
    const marginBottom = mobile ? 80 : 30;
    const heightRatio = mobile ? 0.58 : 0.44;
    return Plot.plot({
    width: width,
    height: heightRatio * width + (mobile ? marginBottom - 30 : 0),
    marginBottom,
    y: {
      grid: true,
      label: "Number of Riders",
      domain: [0, 3500]
    },
    x: {
      domain: withRestStops,
      type: "band",
      label: "Distance (Miles)",
      tickRotate: mobile ? -45 : 0
    },
    marks: [
      Plot.barY(loopRaceSim.filter(d => d.type == 'total_riders'), {
        x: "bucket",
        y: "riders",
        fill: rideBlue,
        stack: "y"
      }),
    ]
    });
  })()
)
```

Let's break down the event over the day, looking how the density of riders changed at key points.

<br>

### 7AM - The early waves depart

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 7 == d.hour), width))
```

At 7AM, the first two waves are flowing freely after departing at 6AM. The road was especially low on congestion due to a third of riders (1,386 of 4,058) assigned to wave 2 not departing until later in the day.

Considering that to enter these waves you would have to get up at the crack of dawn to be at Buckingham Palace before 6AM in rainy conditions, not many riders from later waves started early in these waves. Meaning there was a low amount of rider on the road early 

 Wave 3 was in the process of departing, containing 900 early starters from wave 4 & 5 and 512 riders from wave 1 & 2, the departing wave is around 10% larger than intended.

 <br>

### 8AM - The super wave

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 8 == d.hour), width))
```

At 8am, riders have been beginning in wave 4 for about half an hour. Wave 4 has the highest amount of departing riders by far, as it has the ratio of riders who started in their assigned wave, as well being the most popular wave for riders who started early or late.

This leads of a huge peak of riders on the first five miles of the course. With 3,200 riders occupying a 5 mile stretch of the road, 18% of the total riders undertaking Ride London 100 were compressed into one five mile stretch at 8AM on the day of the event.

<br>


### 9AM - Two waves merge

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 9 == d.hour), width))
```

By 9AM, wave 5 has fully departed and the vast majority of riders are now on the road. At this point the early leavers in wave 3 & 4, who we observed generally ride at slower pace are starting to fall back in positions. This contrasted by late starting riders who may have been assigned to waves 1 & 2, who ride quicker and are therefore making up positions.

This leads to a larger concentration of riders in the early portion of the course before the first rest stop as these two groups collide. One slower group being passed on mass due to being slower than the pack on average and one faster group passing large amounts of riders.

<br>

### 9:30AM - Rest stop reset

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 9.5 == d.hour), width))
```

At 9:30AM, we can see still see a large amount of rider's concentrated between 10 and 20 miles into the route. However, by 10AM we can see that this has smoothed considerably, and the rider distribution seems to be fairly even across the whole route. So what happened?

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 10 == d.hour), width))
```

The first rest stop of the ride was 25 miles into the course, however some continued past the rest without stopping. More experienced riders who were in earlier waves stopped much less frequently than slower riders assigned to later waves.

```js
const stopDefs = [
  { stop: "Mile 25", before: "ride_time_25_decimal", after: "ride_time_26_decimal" },
  { stop: "Mile 50", before: "ride_time_53_decimal", after: "ride_time_54_decimal" },
  { stop: "Mile 73", before: "ride_time_73_decimal", after: "ride_time_74_decimal" },
];
const waveOrder = ["Wave 1", "Wave 2", "Wave 3", "Wave 4", "Wave 5"];

const restStopStats = stopDefs.flatMap(({ stop, before, after }) =>
  waveOrder.map(wave => {
    const restMinutes = raceData_2024_100
      .filter(d => d.assigned_wave_number == wave)
      .map(d => (d[after] - d[before]) * 60)
      .filter(m => !Number.isNaN(m));
    const stopped = restMinutes.filter(m => m >= 5);
    const cappedStopped = stopped.filter(m => m <= 60);
    return {
      stop,
      wave,
      pctStopped: restMinutes.length ? (stopped.length / restMinutes.length) * 100 : null,
      avgStopMinutes: cappedStopped.length ? d3.mean(cappedStopped) : null,
    };
  })
);
```

${resize((width) => verticalBarChart(restStopStats.filter(d => d.stop == "Mile 25"), width > 640 ? 640 : width, {
  x: "wave", xDomain: waveOrder, y: "pctStopped", yLabel: "Riders who stopped", yDomain: [0, 100],
  yTickFormat: d => `${d}%`,
  label: d => d.pctStopped == null ? "" : `${Math.round(d.pctStopped)}%`,
}))}

This had a correcting effect on the flow of the race, allowing faster late departing riders to pass slower rides safely while they were stopped in the first rest stop.

<br>

### 12PM - The Lunchpocalypse

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 12.25 == d.hour), width))
```

The final point of major congestion in the day comes at lunch time, at which point there was over 2,600 people in the 50 mile rest zone. As someone who was here during this time, it certainly felt like it.

<br>

### 1PM - Steady flow

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 13 == d.hour), width))
```

However, one good effect of the large amount of people taking a break at mile 50 is it gives another good opportunity for those late starters to pass and overtake our slower riders. On the day of the ride, it acted as another unofficial reset point for the order of riders.

So riders not beginning in their allotted waves led to some over-crowding in the morning of the race, but this did clear up throughout the day and was aided by the first two rest stops.


```js
  const linkData = raceData_2024_100
  const highlightedData = raceData_2024_100.filter(d => d.rider_no == riderNo)
```
<br>

## Did congestion make the race more dangerous?

Due to a large amount of riders entering early or late into waves 3 and 4, there was significantly more congestion than planned in the first 25 miles of the route. Did this make the event overall a more dangerous ride than if people had departed on time?

The most frequent point of risk for riders during the event is when two riders pass each other. During each pass both riders must interact with each other at speed, around a large number of other riders at speed. Any collision between riders at speed can also lead to a chain reactions of crashes, so reducing the number of rider passes is a must.

To measure the amount of passing during the event we can monitor the position that each rider hits the time gates set out across the course. See below a very cool looking chart showing each riders relative position change at each time gate.

```js
display(resize((containerWidth) => {
  const mobile = containerWidth < 600;
  const width = containerWidth > 640 ? 640 : containerWidth;
  return riderPathsCanvasChart(linkData, highlightedData, width, {
    equalWidth: true,
    ...(mobile ? { height: window.innerHeight * 0.8 } : {}),
  });
}))
```
<figcaption>The graph above shows each rider's position at each timing checkpoint. With a line being drawn between the start race position and end race position for each time gate. Shaded bands mark the three official rest stops. If you selected a rider number, this will be shown in red.</figcaption>

However the net position change of the rider doesn't truly capture the number of pass events a rider experiences. A rider could overtake 1000 slower riders and be passed by 1000 faster riders and still hold the same position.

To calculate the total number of pass events, each rider new position at each time gate is compared to every other rider's position at the previous time gate. Since we only have the four time gates available to us, our measurement is the **minimum total race day pass events**.
<br>

## How did wave departure behavior effect passing effects?

Across the whole event, riders passed each at **least 35 million times** on the road. Each rider experienced **1,997 pass events on average**. As we discussed in the previous section, due to wave 3 & 4 having a large amount of late/early starters from other waves the route was particularly congested until the most riders had passed through both rest stops. This was reflected by there being considerably more pass events in the first 50 miles of course. 

```js
const segmentDefs = [
  { field: "passed_riders_tod_25_td_race",     label: "Start → 25mi" },
  { field: "passed_riders_tod_53_td_race",     label: "26 → 53mi" },
  { field: "passed_riders_tod_73_td_race",     label: "54 → 73mi" },
  { field: "passed_riders_tod_finish_td_race", label: "74mi → Finish" },
];

const segmentPassStats = segmentDefs.map(({ field, label }) => {
  const values = raceData_2024_100.map(d => +d[field]).filter(v => !Number.isNaN(v));
  return { label, total: d3.sum(values) };
});
```

${resize((width) => verticalBarChart(segmentPassStats, width > 640 ? 640 : width, {
  title: "Total passes by race segment",
  x: "label",
  xDomain: segmentDefs.map(d => d.label),
  y: "total",
  yLabel: "Total passes",
  yTickFormat: d3.format(".3~s"),
  label: d => d3.format(".3~s")(d.total),
}))}


If we look at each rider's net passes (i.e. did the pass or get passed by more riders), as expected we can also see that riders who left in earlier waves were far more likely to be passed by significantly more riders than they overtook, on average they were passed by over 2500 riders. An opposite trend is true when looking at quicker riders who left late, on average riders who left 3 or 4 waves late passed over 2000 riders during the event.

```js
const WAVE_NUM = { "Wave 1": 1, "Wave 2": 2, "Wave 3": 3, "Wave 4": 4, "Wave 5": 5 };

const waveDiffData = raceData_2024_100
  .filter(d => WAVE_NUM[d.assigned_wave_number] && WAVE_NUM[d.assigned_start_wave] && d.total_passed_riders_race != null && d.total_passed_by_riders_race != null)
  .map(d => ({
    ...d,
    wave_diff: String(WAVE_NUM[d.assigned_start_wave] - WAVE_NUM[d.assigned_wave_number]),
    net_passes: d.total_passed_riders_race - d.total_passed_by_riders_race,
  }))
  // The 4-waves-early group is only 2 riders and doesn't follow the trend
  // the rest of the range shows - too small a sample to read anything into.
  .filter(d => d.wave_diff !== "-4");

const waveDiffDomain = d3.range(-3, 5).map(String);
```

```js
const riderWaveDiffRow = waveDiffData.filter(d => d.rider_no == riderNo);
display(waveBoxPlotChart(waveDiffData, width, {
  category: "wave_diff",
  categoryDomain: waveDiffDomain,
  categoryTickFormat: d => {
    const n = +d;
    if (n === 0) return "Correct Wave";
    const waves = Math.abs(n);
    return n < 0 ? `${waves} Wave${waves === 1 ? "" : "s"} Early` : `${waves} Wave${waves === 1 ? "" : "s"} Late`;
  },
  value: "net_passes",
  valueLabel: "Net Passes",
  centerOnZero: true,
  marginLeft: 110,
  highlightData: riderWaveDiffRow,
}))
```

```js
const waveDiffStats = waveDiffDomain.map(diff => ({
  wave: diff === "0" ? "Correct Wave" : `${Math.abs(+diff)} Wave${Math.abs(+diff) === 1 ? "" : "s"} ${diff < 0 ? "Early" : "Late"}`,
  ...aggregateWaveTimes("net_passes", waveDiffData.filter(d => d.wave_diff === diff)),
}));

const wholeNumberFormat = Object.fromEntries(
  aggregatedColumns.filter(c => c !== "wave").map(c => [c, d3.format(",.0f")])
);

display(waveStatsTable(waveDiffStats, { groupLabel: "Wave Diff", format: wholeNumberFormat }))
```
<figcaption>The graph above shows the distribution of total net passes made by each rider by how many waves they left early or late. Solid lines mark the median net passes of the group. If you selected a rider number, their result is marked with a red line. The table displays detailed information, including distribution thresholds.</figcaption>
<br>

Here we can also see the extremes of rider's leaving extremely early or late, where in some cases riders are part of over 10,000 pass events over the course of the day. Let's look at two outliers:

**<span class="secondaryUnderline">Rider 102302</span>**<br>
This rider was assigned in Wave 1, which would have been well suited to their ability as they finished in an impressive 4 hours and 52 minutes This puts them not only in the fastest 20% of riders in wave 1 but in the fastest 3% of total riders in the event.

However, this rider instead departed two and half hours later than their alloted start at 8:30AM in wave 5. Over the course of the day they **passed over 8,490 riders**, just under half of the total riders who undertook the event. With an average speed of 21mph (34kpm) for the full event, this rider also passed other riders with over a 6mph (9.6kpm) difference in speed.

**<span class="primaryUnderline">Rider 128118</span>**<br>
Inversely, this rider was assigned to wave 5, this was the correct wave choice for this rider as they finished the ride in 10 hours and 17 minutes, putting them in the slowest 2% of riders for the whole event. However they left at 6:30AM with wave 2 and were **passed by 14,404 riders** throughout the day. 

This was made worse due to the fact that this rider did not stop at rest points, meaning that faster riders who took breaks had to overtake the rider twice after the rest point. At the beginning of the event, this rider had an average pace of ~10mph, a full 8mph slower than the average speed of wave 2.


```js
const worstOffenderNos = [102302, 128118];
const worstOffenderData = raceData_2024_100.filter(d => worstOffenderNos.includes(d.rider_no));
```

```js
display(resize((containerWidth) => {
  const mobile = containerWidth < 600;
  const width = containerWidth > 640 ? 640 : containerWidth;
  return riderPathsCanvasChart(linkData, worstOffenderData, width, {
    equalWidth: true,
    highlightColor: d => d.rider_no == 128118 ? "#efb118" : "#37e1d5",
    ...(mobile ? { height: window.innerHeight * 0.8 } : {}),
  });
}))
```
<figcaption>The graph above shows each rider's position at each timing checkpoint. With a line being drawn between the start race position and end race position for each time gate. Shaded bands mark the three official rest stops. Our late and early riders are marked in teal and amber respectively.</figcaption>

These examples show how extreme wave jumping can lead to situations where riders are having to make, or having to deal with, high amounts of pass events in which there is a high difference in speeds between the two riders.
<br>

## Final thoughts

Overall, Ride London 2024 was well run, over 3,000 stewards and 100 vehicles provided 100 miles of safely closed road from London to Essex throughout the day, which on it's own requires a huge level of planning. 

London Marathon Events also planned departure waves that were intended to allow faster riders to depart earlier to keep the ride flowing freely. Most riders complied with these waves and assigned themselves to appropriate waves which reduced the number of rider pass events. 

However, due to around 29% of riders to not starting in their assigned waves, the first 25 miles of the route faced heavy congestion during wave 3 and wave 4's departure. This congestion eased over the day with the assistance of slower riders stopping more frequently at the first two rest stops.

This early period of congestion did make the early sections of the course more dangerous by introducing more passing events, especially in extreme cases where riders started over 2 waves early or late. In these cases, large amounts of riders who left in the correct had to make high speed passes past very slow riders, or were passed by late leaving high speed riders.

So how could this be improved? With over 17,000 riders to manage at the start line, it would be very difficult to enforce a *mandatory* start time for each rider without causing huge delays at the start as every rider is checked to ensure they're in the correct wave but I would recommend the following to increase rider safety and ride management:

- Introduce a cutoff start/end time for riders in the first and last waves to reduce the occurrence of extreme levels of pass events.

- Clearly explain that by entering in a different wave that you will disrupt other riders.

- Provide clear guidance to riders on how to ride in large group settings, especially on where to position yourself and how to overtake other riders.

---

# Why was RideLondon Cancelled?
<br>

## The 2025 hiatus
When planning the 2025 edition of Ride London, two major roadblocks presented themselves to organisational team at the London Marathon Events. 

The first was that TFL was demanding a major re-routing of the event to keep the Silvertown tunnel open for the full duration of the event day. At the same time the women's professional race, the London-Surrey Classic, was also dropped during this period when the UCI moved the dates of the race to the same day as the tooping the colour.

According to an FAQ sent to major stakeholders (such as the Essex County Council), this meant that no revenue to fund the organisation of the public sportives could be obtained from sponsorships or broadcasting rights for the UCI events.

With overall rider numbers consistently declining year over year and major routing and funding issues, the decision was made to place the 2025 event on hiatus and attempt to solve issues in the intervening year.

This decision was made in good faith, and the London Marathon Events did implement a roadmap for tackling these issues. Between September 2024 and April 2025 multiple sessions were conducted between LME, TFL and other stakeholders to attempt to resolve the routing and funding issues. The next two sections will investigate these problems in more detail.<br>
<br>


## Why was it so hard to reroute Ride London?
<div class="grid grid-cols-2">
  <div>

  To fully understand why rerouting the event was so challenging it's important to understand why the existing route worked so well and why closing the Silvertown tunnel become such a key issue. 

  The central London portion of the 2024 Ride London route had riders congregate at Buckingham Palace before heading down the Mall and starting along the Thames River Embankment. This route then avoided the docklands by using the Limehouse Link Tunnel, before cutting North via the A12 and heading out to Essex. The ride returned via the same route, ending with a sprint finish across Tower Bridge.

  By following this route, cyclists could ride through central London via riverside embankment route from West to East. This kept disruption on traffic flow across London as kept to a minimum as Traffic could still move across the Thames via the multiple tunnels and bridges that passed below and above the embankment. Traffic could also move from the East London and Essex into Central London via A13, and the roads passing under the A12.

  This route provided an easy, high volume route in and out London with minimal disruption to the standard weekend traffic that flows over the Thames river each day.
  </div>
  <div>
    ${silvertonRouteMap(introRouteGeoJSON, londonBridges, { center: [51.5085, -0.0485], zoom: 11.8, mobileZoom: 11.0, width, cartoKey })}
  <figcaption>Bridges and tunnels that could remain open using the 2022-2024 embankment route are marked in green, those that would have to closed are marked in red.</figcaption>
  </div>
</div>
<br>

## The Silvertown Tunnel issue
<div class="grid grid-cols-2">
  <div>
  
  In April 2025, the Silvertown tunnel opened linking the Royal Docks and Canary Wharf with north Greenwich. The tunnel was intended to reduce pressure on the heavily congested Dartford crossing and Blackwater Tunnel.

  If the previous Embankment route was to be used, the Silvertown tunnel would have to close between 4am and 7pm on the day of the event. However, Will Norman, London's cycling and walking commissioner at the time of planning described this described this as an “absolute no”.

  This left the London Marathon Events with a monumental re-planning effort, having to find a way to keep the Silvertown tunnel open and essentially ditching the tried and tested route following the Embankment without causing large scale disruption to central London.

  Multiple new routes were proposed by the London Marathon Events during the hiatus period, however each came with significant difficulties and challenges compared to the existing course.

  </div>
  <div>
    ${silvertonRouteMap(introRouteGeoJSON, londonBridges, { center: [51.501594787700675, 0.011805819341940176], zoom: 13.4, width, cartoKey })}
  <figcaption>The map above shows the portion of the route that would cause the closure of the Silvertown tunnel (marked in red).</figcaption>
  </div>
</div>
<br>

---

## The proposed 2025 routes

### Avoid East London Entirely
<div class="grid grid-cols-2 mobile-map-first">
  <div>

  By turning the route Northbound off of the Embankment at Tower bridge the docklands can be avoided entirely, meaning that the Silvertown tunnel could operate without disruption.
  
  The route would continue up the A10 via Dalston and out to Essex. Returning via the A104, cutting through Victoria Park onto the A11 and maintaining the finish on Tower Bridge.

  This however, would cause a huge amount of disruption to central London. The route contains no major bridges or overpasses meaning the traffic control would have to be conducted throughout the day. 

  The inbound and outbound road closures would also overlap 8am to 11am, essentially creating a 'landlocked' zone for a period of the day.

  </div>
  <div>
    ${routeMap(routeB, londonBridges, "#7b2fa0", width, { polygon: true, bridgeKey: 'b', lineGeojson: routeBLine, cartoKey })}
    <div class="muted">"Landlocked" area shaded in red.</div>
  </div>
</div>
<br>

### Avoid Central London Entirely
<div class="grid grid-cols-2 mobile-map-first">
  <div>

  By starting the event at the Queen Elizabeth Olympic Park and heading East, this proposed route requires no major river crossing to be closed for the full duration of the day.

  The returning route would cut Westerly across North London before heading South through Camden Town, switching to a new ending location of The Mall. 

  This route would create significant disruption Camden Town, one of London's busiest areas. It was also noted that for an event touted as Ride London, riders would see a very small amount of London Landmarks during their ride.

  </div>
  <div>
    ${routeMap(routeC, londonBridges, "#060549", width, { bridgeKey: 'c', cartoKey })}
  </div>
</div>
<br>

### Only close the Silvertown Tunnel for the morning
<div class="grid grid-cols-2 mobile-map-first">
  <div>

  By keeping the start of the ride on the Embankment , the route can maintain it's original low-disruption outward leg which involves a high amount of London landmarks. 
  
  This would however cause the Silvertown tunnel to have close until at least 11am and still require a very large amount disruption to Camden Town as this part of the adjusted route would still need to be used to allow the tunnel to reopen.

  </div>
  <div>
    ${routeMap(routeF, londonBridges, "#e07b39", width, { bridgeKey: 'f', cartoKey })}
  </div>
</div>
<br>

### Avoid the Silvertown tunnel specifically
<div class="grid grid-cols-2 mobile-map-first">
  <div>

  By starting the route in South East London, progressing up the Thames and beginning on the Southbank, Before turning North after Blackfriars Bridge onto the A11 and heading North East out of London on A104.

  The riders would again, return by cutting West across North London, then head South via Camden for an ending at the Mall.

  This route attempts to give Riders more visable London landmarks in the morning, while keeping the Silvertown tunnel open throughout the day.

  However, in attempting to solve each issue it also inherits all of issues from the other routes. A departing route via East London leaves no way for traffic to flow into central London from West to East, and introduces major disruption in Camden.

  </div>
  <div>
    ${routeMap(routeD, londonBridges, "#37e1d5", width, { bridgeKey: 'd', cartoKey })}
  </div>
</div>
<br>

## Finding Funding
According to internal documents, the cost of stewarding the challenge events was only growing, against declining rider numbers in the paid events and low interest from sponsors in what was described as a "challenging macro sponsorship environment".

These facts combined with the lost revenue of the UCI Women's Event meant that the Ride London event would need to source significant amount of additional funding for a 2026 edition to be feasible. The LME documents available have specific information about funding amount redacted but confirm that LME would not be able to provide the level of subsidy needed to run the event in it's existing form.

On top of this, when the event was founded after the London Olympic Games in 2012, a commitment was made that Ride London would not be held at any cost to the GLA (Greater London Authority), TFL or the taxpayer. Meaning that the event would have to court major sponsorship funding and significantly grow the number of paid entrants to acquire the relevant funding needed to keep the event viable.

TFL's "Strategic Problem Solving" team were engaged when the hiatus was announced in September 2024, and a number of workshops were run to attempt to look for solutions for Ride London's financial issues. 

Multiple workshops were held to try and find a sustainable financial model for Ride London, such as the event becoming more of a "carnival style celebration" (based on the existing [London Cycling Festival](https://lcc.org.uk/london-cycling-festival/) ran by the London Cycling Campaign) driven mostly by sponsorships, making use of the already closed roads for the challenge rides.

Plans were brainstormed for decentralised paid events, such as local hill climbs or time trials in the Olympic park or other closed road locations. Even expanded plans for more distances in the challenge rides and a larger array of merchandise was looked into.

## The indefinite pause
In the end, Ride London was facing pressure from all directions. The need for more funding from direct sponsorships would require the event extensively altered to accommodate more sponsor friendly situations such as "festival" style set-ups with tents brands could hire. Against falling rider participation numbers this was probably a hard sell. 

The event was also becoming the target of the usual anti-cycling London crowd, Tony Blackburn even suggested that Ride London should be replaced by an ["event for car owners"](https://road.cc/content/news/tony-blackburn-calls-car-event-replace-ridelondon-301527)

This was compounded by having to re-route the London portion of the ride to avoid closing the Silvertown tunnel. Unmentioned in the released internal documents are the impact any distance lost in London would have on the Essex portion of the route which already led to friction and [local](https://www.change.org/p/stop-the-ride-london-essex-cycling-event-from-disrupting-ongar) [petitions](https://www.change.org/p/stop-further-ride-london-essex-cycle-race-in-essex) from local residents.

The new options for both routing and fundraising was brought to RideLondon stakeholders on April 30th 2025. No information is available on the decision making process in this meeting but from internal timeline the decision to officially cancel RideLondon was made on July 21th 2025. 

Communications plans for the cancellation were drafted at the end of January and on February 10th 2026 the news was announced that Ride London was no more.
<br>

---

# Conclusion
Ride London in the end was the victim of rising organisational costs, a challenging sponsorship market and a major planning dispute with TFL. With falling ridership numbers, especially with female riders, LME and TFL were unable to come to solution that would have made the event financially and logistically viable.

This isn't to say the event was poorly organised, roads were properly stewarded and steps were taken by the event to reduce congestion by releasing faster riders earlier in the day. 

However around a quarter of participants didn't start in their allotted time however which led to significant rider concentration during the beginning of the day, but most of this balanced out via the rest stops along the route.

Ride London's inability to find a maintainable financial model providing closed road cycling events isn't an outlier. In 2023 the Tour of Cambridgeshire, part of the UCI Gran Fondo World Series, announced it would not return. Vélo Birmingham & Midlands ceased after being cancelled during the Covid-19 pandemic, without refunds being issued to participants due to "unrecoverable costs".

In fact, the cancellation of Ride London leaves England without a single closed road mass participation cycling event. English riders will now need to travel to Scotland for the Etape Caledonia or Loch Ness to take part in a cycling event without sharing the road with cars.

<style>

body {
  font-family: var(--sans-serif);
}

.leaflet-tooltip {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
}

/* Framework's .grid sets grid-auto-rows: 1fr, which keeps side-by-side
   .grid-cols-2 columns the same height on desktop (fine, intentional) - but
   below its own 640px breakpoint, .grid-cols-2 collapses to a single
   column, and 1fr then stretches *every stacked row* to match the tallest
   one instead. That's what was leaving a big gap under the shorter map
   figures whenever the text next to them ran longer. Reset it back to
   auto-height rows at the same breakpoint Framework itself collapses at. */
@container (max-width: 639px) {
  .grid {
    grid-auto-rows: auto;
  }
}

/* Proposed-routes sections: side by side (text, then map) on desktop, but
   map above text once .grid-cols-2 collapses to a single column on mobile -
   swap visual order only, source order (and desktop) stays untouched. */
@container (max-width: 639px) {
  .mobile-map-first > div:first-child {
    order: 2;
  }
  .mobile-map-first > div:last-child {
    order: 1;
  }
}

/* Match the two worst-offender riders' lines on the canvas rider-paths
   chart. Neither red (too close to riderHighlightColor, the "rider you
   typed in" colour) nor blue (too low-contrast against the chart's grey
   background) - amber and teal, both already used elsewhere on the page. */
.primaryUnderline {
    text-decoration: underline;
    text-decoration-color: #efb118;
}

.secondaryUnderline {
    text-decoration: underline;
    text-decoration-color: #37e1d5;
}

.rider-callout {
  margin: 1.5rem 0;
  padding: 0.9rem 1.25rem;
  border-left: 3px solid #060549;
  background: var(--theme-background-alt);
  border-radius: 0 6px 6px 0;
}

.rider-callout h4 {
  margin: 0 0 0.3rem;
  font-family: var(--sans-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: #060549;
}

.rider-callout p {
  margin: 0.4rem 0;
}

.rider-callout input,
.rider-callout button {
  margin-top: 0.4rem;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--sans-serif);
  min-height: 100dvh;
  box-sizing: border-box;
  padding-bottom: 4rem;
  position: relative;
  text-wrap: balance;
  text-align: center;
  font-weight: bold;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: clamp(3rem, 14vw, 120px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #060549;
}

#name {
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 28em;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-style: initial;
  font-weight: 500;
  line-height: 1.6;
  color: var(--theme-foreground-muted);
}


#scroll-indicator {
  position: absolute;
  bottom: 4rem;
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

/* Sticky section banner - a VS Code "sticky scroll"-style breadcrumb of
   the h1/h2 the reader is currently under. Hidden (translated above the
   viewport) until the first heading has been scrolled past. */
#section-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  background: var(--theme-background);
  border-bottom: 1px solid var(--theme-foreground-faintest);
  transform: translateY(-100%);
  transition: transform 0.15s ease;
}

#section-banner.visible {
  transform: translateY(0);
}

#section-banner-inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  font: 13px var(--sans-serif);
  color: var(--theme-foreground-muted);
  display: flex;
  align-items: baseline;
  overflow: hidden;
}

#section-banner-inner a {
  color: inherit;
  text-decoration: none;
}

#section-banner-inner a:hover {
  text-decoration: underline;
}

/* Parent crumb(s) - allowed to shrink and ellipsis if space is tight. */
#section-banner-inner a.crumb {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
}

/* The current (deepest) crumb - never truncated, even if a parent has to. */
#section-banner-inner a.crumb-current {
  color: var(--theme-foreground);
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
}

#section-banner-inner .crumb-sep {
  margin: 0 0.5em;
  opacity: 0.5;
  flex-shrink: 0;
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

```js
{
  // Sticky section banner - tracks the h1/h2 currently scrolled past, like
  // VS Code's sticky scroll. The hero's own h1/h2 are excluded, since
  // they're a title, not a section.
  const headings = Array.from(document.querySelectorAll('#observablehq-main h1, #observablehq-main h2'))
    .filter(h => !h.closest('.hero'));

  const banner = document.getElementById('section-banner');
  const inner = document.getElementById('section-banner-inner');
  const BUFFER = 4; // px - treat "just at the top" as passed, not pending

  let currentKey = null;

  function cleanTitle(h) {
    // Strip Framework's trailing "#" anchor-link glyph from the heading text.
    return h.textContent.replace(/\s*#\s*$/, '').trim();
  }

  function update() {
    let h1 = null, h2 = null;
    for (const h of headings) {
      if (h.getBoundingClientRect().top > BUFFER) break; // not reached yet - neither are any after it
      if (h.tagName === 'H1') { h1 = h; h2 = null; }
      else { h2 = h; }
    }

    const crumbs = [h1, h2].filter(Boolean);
    const key = crumbs.map(h => h.id).join('>');
    if (key === currentKey) return;
    currentKey = key;

    if (!crumbs.length) {
      banner.classList.remove('visible');
      return;
    }

    inner.replaceChildren();
    crumbs.forEach((h, i) => {
      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'crumb-sep';
        sep.textContent = '›';
        inner.appendChild(sep);
      }
      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.textContent = cleanTitle(h);
      a.classList.add(i === crumbs.length - 1 ? 'crumb-current' : 'crumb');
      inner.appendChild(a);
    });
    banner.classList.add('visible');
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}
```