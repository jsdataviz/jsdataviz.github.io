---
# toc: false
theme: "air"
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

---

<div class="grid grid-cols-2">
  <div>

  ## Introduction
  In case you're not in know, Ride London was a cycling festival created post the 2012 London Olympics games that took place yearly in London over the weekend of the late May public holiday in the UK. During the event roads were closed from Central London to Essex for cycling use only.

  Professional events were featured over the weekend, as well as a series of sportives and a casual 'free-ride' around the city for all abilities on the Sunday. The most popular of these sportives being the 100 mile route, in which 500,000 people had ridden and raised over £85m for charity since 2013.

  The 100 mile event was also part of the [London Classics](https://www.thelondonclassics.co.uk/) - a kind of mega London triathlon, in which you would complete the RideLondon 100 cycle, the London marathon and the Hyde Park swim serpentine event in the same year.

  In September 2024, it was announced that Ride London [would not be returning in 2025](https://www.ridelondon.co.uk/news-and-media/latest-news/2025-event-update). With London Marathon Events saying that they were taking the time to perform a "full strategic review" of the event. In February of 2026, Ride London was placed on "indefinite pause" by the 

  So what happened to our beloved cycling festival? The answer unfortunately comes down to declining participation numbers, organisational issues and route planning disputes between TFL and London Marathon events. Let's get into it.

  </div>

  <div>
  ${introRouteMap(introRouteGeoJSON)}
  </div>
</div>

```js
  const allRoutesGeoJSON = FileAttachment("./data/rl_routes.geojson").json();
  const londonBridges = FileAttachment("./data/london_road_bridges.json").json();
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
import { waveStatsTable } from "./components/waveStatsTable.js";
import { waveChordChart } from "./components/waveChordChart.js";
import { raceSimGraph, withRestStops } from "./components/raceSimGraph.js";
import { riderPathsSingleChart } from "./components/riderPathsSingleChart.js";
import { riderPathsSimplifiedChart } from "./components/riderPathsSimplifiedChart.js";
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

# Ride London was becoming less popular

A total of 21,103 people rode in one of the Ride London events in 2024, a 7% drop from the 22,596 riders from 2023. However, this is the number of riders who completed the race, rather than registrations. Conditions were poor in the morning of the 2024 which may have led to less riders participating but the event did not sell out as in previous years.

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
The number of total 100 riders dropped by 11% between 2024 and 2023. Which had better conditions when the race started and throughout the morning.

${resize((width) => verticalBarChart(rideTotals.filter(d => d.distance == "100"), width > 640 ? 640 : width, {
  title: "100 Miles",
  x: "year",
  y: "num_riders",
  fill: raceColors["100"],
  yLabel: "Number of Riders",
  label: d => d.num_riders,
}))}

Despite the weather however, the shorter events aimed at beginners had considerably more riders than previous years. With the 60 mile race having an increase of 11% between 2024 & 2023, and the 30 mile race more than doubling to 832 riders in 2024. Up from 395 in 2023.

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

At 4,088 total female riders, fewer women rode in the Ride London events than since 2022. Continuing the declining trend of female participation even when the event grew in total attendance 2023.

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

The ratio of female to male riders has dropped in every category, from 2022 to 2024. Dropping 5% in the most popular race category, the 100 miler.

It's also worth noting the decline in the most beginner friendly race category of 30 miles. Where more women used to race than men. This race's doubling in popularity has not been felt by both male and female riders equally, seeing a 8% drop from 2023 to 2024.

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

### This low level of female participation is an outlier in regards to London Sportifs

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

It was the only event where this proportion was declining.

The proportion of London Marathon runners has been steadily moving towards even over the last 3 years. Last year, over X of Y total runners were women.

The two-mile serpentine swim also has far better participation than the ride 100.

---

# How well was the race run?

When entering into the Ride London events, riders are asked to give an estimated time they expect to complete the event. The organisers then place riders into gated starting times to manage the flow of riders throughout the day.

This makes sense, in the perfect scenario the fastest riders would begin first so that the flow of traffic was as smooth as possible. This also means that riders have to perform as few passes of other slower riders as possible. Reducing these interactions between riders is the safest way to operate the event.

We can see the impact of this management by comparing the time of day each rider began the race, to their total ride time (excluding any official stops).

```js
display(startTimeScatterChart(raceData_2024_100, width))
```
Generally, riders who began riding earlier in the day did complete the race quicker. However the high amount of variance in the correlation shows there was definitely room for improvement.

Let's review how well the "quickest rider first" system was implemented.

For this system to work, two main things need to be true:

- **Riders are realistic about their estimated finishing time.** If riders choose times that are too ambitious, they will be placed in earlier waves and then passed by faster riders.

- **Riders actually begin at their designated starting time.**  If riders choose to leave at a different time than their alloted wave, they will potentially be passing slower riders, or being passed by faster ones.

- **Riders all take similar breaks at the rest stops**  If faster riders take long breaks, they will end up behind slower riders which will lead to more passing overall.

To evaluate the first two points, we'll need to know what starting waves riders were assigned to and when they departed. Since this information is not publicly available, we'll have to try and infer it from the data itself.

<br>

## Can we tell which wave each rider was assigned to?

Often we can infer information contained in the data by looking at the way the IDs are structured. This was famously used in WW2, when the allies estimated the number of German Panther tanks being produced per month by analysing the serial numbers of captured or destroyed tanks in the field (known as the [German tank problem](https://en.wikipedia.org/wiki/German_tank_problem)).

In our case, we can plot the each rider's designated race number against the time they began the race.

```js
display(riderStartScatterChart(raceData_2024_100, width, { stroke: rideBlue, opacity: 0.5 }))
```

Just by eye-balling this, we can see that rider numbers were assigned into blocks of departing times.

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
}))
```

There was also a VIP package sold which allowed entry at any point in the day, which I have assumed to the string of riders with numbers between 100,000 and 101,000 who start throughout the day.

We can also bucket all the rider's who didn't start in the correct wave here, as early or late starters. Let's say as a general rule, if a rider started before their assigned wave start they were an early starter and if they began the race after the subsequent wave start then they are a late starter. 

Since between wave 1 & 2 there is only ~5 minutes, we'll only classify riders who started during wave 3's time window as a later starter, as getting all riders on the road in 5 minutes is quite a task.

See our early and late starters below:

```js
display(riderStartScatterChart(raceData_2024_100, width, {
  stroke: d => d.is_early_starter == "True" ? "lightcoral" : d.is_late_starter == "True" ? "lightBlue" : "lightGrey",
  opacity: d => d.is_early_starter == "True" ? 1 : d.is_late_starter == "True" ? 1 : 0.3,
  ruleLines: [{ data: waveStartLines }, { data: endLines, dashed: true }],
}))
```

With this information, we can now analyse how well the race was managed.

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
  display(waveBoxPlotChart(raceData_2024_100, width))

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

We can see that riders did generally well at picking appropriate race lengths for themselves, as the median/mean ride time increased for each subsequent wave. 

Interestingly, the deviation of the waves also decreases for each wave, especially from wave 1 to wave 2. Indicating that perhaps riders who entered a particular short time were more likely to over estimate their abilities.

<br>

## Did begin when were supposed to?

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
  title: "Over a third of riders did not start in their alloted time.",
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

Of the waves, riders in wave 2 and wave 5 had the highest proportion of riders who did not start in their allocated wave.

The chord diagram below shows the net migration from each rider's **assigned wave** to their **actual start wave**. We can see that the flow of early starters and late leavers generally moved from waves 2 and 5 into waves 3 and 4.


${waveChordChart(raceData_2024_100, width)}


By plotting the amount of riders in each assigned wave, we can see that the intended starting process was to allow a smaller group of faster riders to leave first, followed by even groups of riders of ~4000 people per wave. However, due to the rider behavior seen above, wave 3 and wave 4 had a much higher number of riders. 

This led to wave 4 being especially concentrated, with an extra 1,446 riders leaving in the wave than planned (37% more than intended).

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

This meant that over 55% of the race (around 10,000 riders) left in two waves. 


### How did this effect the flow of the race?

Due to people not starting in their designated waves, a large portion of the race began in wave 3 and 4 rather than evenly distributed across the morning. But how did that effect the *~flow~* of the race?

To analyse this, I've simulated the flow of the race by splitting the 100 mile course into 5 mile buckets and the rest stops. Using the rider's average time that is calculated at each time gate, we can measure the estimated position of each rider on the road at 15 minute increments across the race day.

We can then group our riders by bucket and loop across the entire day to analyse the concentration of riders due to early and late starters.

The simulation for the 100 mile race looks like this. You can see the code for this simulation here.

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

```js
const raceSim10 = riderDistributionLong.filter(d => 10 == d.hour)
const raceSim12 = riderDistributionLong.filter(d => 12 == d.hour)
```

### 7AM - The early waves depart

By 7AM, the first three waves have departed. The earliest wave is made up of the most die hard riders, with very few riders assigned to later waves beginning this early (marked as early riders). 

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 7 == d.hour), width))
```

The early part of the race is relatively quiet as wave 2 is smaller than expected, with a peak at the start of the course as wave 3 departs with extra riders from other waves.

### 8AM - Rider starts converge

At 8am, wave 4 is in full swing. This wave has the highest ratio of riders who departed in their assigned wave, as well as largest amount of early and late riders migrating from waves 2, 3 and 5. This together leads of a huge peak of riders on the first five miles of the course.

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 8 == d.hour), width))
```

### 9AM - Two waves merge

By 9AM, the late leavers who are generally quicker than the early starters and wave 4 riders start to overtake the field and the wave 3 departures merge with the large rider peak seen at 8am.

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 9 == d.hour), width))
```

This leads to there be two larger groups of riders, the quicker wave 1 & 2 riders who departed mostly on time at the 30 mile mark, and a large clump of riders who did not start in their assigned waves in a congested period at the beginning of the course before the first stop.

### 10AM - Things begin to settle

As the race continues and later riders from wave 2 pass the wave 3 and early wave 4 starts, the field starts to even out across the course. Only one major group of ultra late starts at around the 20 mile mark.

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 10 == d.hour), width))
```

Part of why that early congestion flattens out is that faster riders skip the rest stops at a lower rate than slower ones - so as the quicker end of the field reaches these points, they mostly ride straight through rather than bunching up. The race has three official rest stops, at roughly mile 25, mile 50 and mile 73. Here's the share of each assigned wave who actually stopped (5+ minutes) at each one:

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

### 12PM - The Lunchpocalypse

The final point of major congestion in the day comes at lunch time, at which point there was over 2,600 people in the 50 mile rest zone. As someone who was here during this time, it certainly felt like it.

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 12.25 == d.hour), width))
```

That's the mile 50 stop specifically, so here's how each wave's stopping rate looked there:

${resize((width) => verticalBarChart(restStopStats.filter(d => d.stop == "Mile 50"), width > 640 ? 640 : width, {
  x: "wave", xDomain: waveOrder, y: "pctStopped", yLabel: "Riders who stopped", yDomain: [0, 100],
  yTickFormat: d => `${d}%`,
  label: d => d.pctStopped == null ? "" : `${Math.round(d.pctStopped)}%`,
}))}

### 1PM - Steady flow

However, one good effect of the large amount of people taking a break at mile 50 is it gives a good opportunity for those late starters to pass and overtake our slower riders. On the day of the ride, it acted as an unofficial reset point for the order of riders.

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 13 == d.hour), width))
```

So riders not beginning in their allotted waves led to some over-crowding in the morning of the race, but this did clear up throughout the day.

The last of the three official rest stops comes at mile 73:

${resize((width) => verticalBarChart(restStopStats.filter(d => d.stop == "Mile 73"), width > 640 ? 640 : width, {
  x: "wave", xDomain: waveOrder, y: "pctStopped", yLabel: "Riders who stopped", yDomain: [0, 100],
  yTickFormat: d => `${d}%`,
  label: d => d.pctStopped == null ? "" : `${Math.round(d.pctStopped)}%`,
}))}

And the average time spent at each of the three stops, among riders who actually stopped (5-60 minutes, to exclude outliers):

```js
display(restStopAvgTable(restStopStats))
```

```js
  const linkData = raceData_2024_100
  const highlightedData = raceData_2024_100.filter(d => d.rider_no == 126410)
```

<!-- ## Did congestion make the race more dangerous?


```js
display(riderPathsSingleChart(linkData, highlightedData, width))
```

```js
display(riderPathsSimplifiedChart(linkData, highlightedData, width))
``` -->

---

<!-- ## Passes by start-time compliance

Did riders who jumped the gun (or started too late) cause more disruption on the road?

```js
const starterTypeTable = aq.from(raceData_2024_100)
  .derive({
    starter_type: aq.escape(d =>
      d.is_early_starter === "True" ? "Early" :
      d.is_late_starter  === "True" ? "Late"  :
      "On Time"
    )
  })

const starterTypeStats = starterTypeTable
  .groupby("starter_type")
  .rollup({
    avg_passed:         aq.op.mean("total_passed_riders_race"),
    avg_passed_by:      aq.op.mean("total_passed_by_riders_race"),
    count:              aq.op.count(),
  })
  .objects()

const starterTypeData = starterTypeTable.objects()

const avgMelted = starterTypeStats.flatMap(d => [
  { starter_type: d.starter_type, metric: "Riders passed",    value: d.avg_passed    },
  { starter_type: d.starter_type, metric: "Passed by riders", value: d.avg_passed_by },
])
```

${resize((width) => verticalBarChart(avgMelted, width > 640 ? 640 : width, {
  title: "Average passes by start-time group",
  x: "starter_type",
  y: "value",
  yLabel: "Average passes",
  fill: "metric",
  fx: "metric",
  color: { legend: true },
  marginLeft: 60,
}))}

```js
const segmentPassTotals = aq.from(raceData_2024_100)
  .rollup({
    passed_riders_tod_25_td_race:     aq.op.sum('passed_riders_tod_25_td_race'),
    passed_riders_tod_53_td_race:     aq.op.sum('passed_riders_tod_53_td_race'),
    passed_riders_tod_73_td_race:     aq.op.sum('passed_riders_tod_73_td_race'),
    passed_riders_tod_finish_td_race: aq.op.sum('passed_riders_tod_finish_td_race'),
  })
  .fold(aq.all())
  .rename({ key: 'segment', value: 'passes' })
  .derive({
    label: aq.escape(d => ({
      passed_riders_tod_25_td_race:     'Start → 25mi',
      passed_riders_tod_53_td_race:     '26 → 53mi',
      passed_riders_tod_73_td_race:     '54 → 73mi',
      passed_riders_tod_finish_td_race: '74mi → Finish',
    })[d.segment]),
  })
  .objects()
```

```js
const riderPositions = aq.from(raceData_2024_100)
  .derive({
    net_positions: d => d.total_passed_riders_race - d.total_passed_by_riders_race,
    speed: d => 100 / d.final_time_decimal,
  })

const topNetRider = riderPositions
  .orderby(aq.desc('net_positions'))
  .slice(0, 1)
  .objects()[0]

const avgSpeedOfRidersBeforeTop = riderPositions
  .filter(aq.escape(d => d.start_tod && d.start_tod < topNetRider.start_tod))
  .rollup({ avg_speed: aq.op.mean('speed') })
  .objects()[0].avg_speed
```

```js
const topPositionGainers = aq.from(raceData_2024_100)
  .derive({
    positions_gained: d => d.rider_pos_start - d.rider_pos_finish,
    actual_wave: aq.escape(d => {
      if (!d.start_tod) return null;
      if (d.start_tod < "2024-05-26 06:45:00") return "Wave 1/2";
      if (d.start_tod < "2024-05-26 07:37:00") return "Wave 3";
      if (d.start_tod < "2024-05-26 08:15:00") return "Wave 4";
      return "Wave 5";
    }),
  })
  .orderby(aq.desc('positions_gained'))
  .slice(0, 20)
  .select(
    'rider_pos_start', 'rider_pos_finish', 'positions_gained',
    'total_passed_riders_race',
    'assigned_wave_number', 'actual_wave',
    'mph_25', 'mph_53', 'mph_73', 'mph_finish',
    'ride_time_finish', 'final_time'
  )
  .objects()
``` -->


<!-- We can see that our early starters more often than not fall into the upper final timezones in the correlation, whereas the late starters are quicker than their waves.

This can be more clearly seen when we plot each group's regression.

```js
display(
    Plot.plot({
        inset: 6,
        height: 650,
        width: width,
        marginLeft: 60,
        grid: true,
        y: { label: "Total Ride Time (hours)", grid: true},
        x: { label: "Start Time of Day", type: "time" },
        marks: [
            Plot.dot(raceData_2024_100, {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "final_time_decimal",
                stroke: d => d.is_early_starter == "True" ? "red" : d.is_late_starter == "True" ? "green" : rideBlue, 
                opacity: 0.05,
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024 && d.is_late_starter == "False" && d.is_early_starter == "False"), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "final_time_decimal",
                stroke: rideBlue, 
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024 && d.is_early_starter == "True"), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "final_time_decimal",
                stroke: "red", 
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024 && d.is_late_starter == "True"), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "final_time_decimal",
                stroke: "green", 
            }),
        ]
        })
)
```

### What if every rider starter when they supposed to?

Let's give every rebellious rider a randomised start time in their starting wave and see how well the race time correlates with start time in comparison to the actual results to get an idea of how much this behavior effected the race planning.

```js
const is_sim_data = view(Inputs.toggle({label: "Simulated Data", value: true}));
```

```js
display(
    Plot.plot({
        inset: 6,
        height: 650,
        width: width,
        marginLeft: 60,
        grid: true,
        y: { label: "Total Ride Time (hours)", grid: true},
        x: { label: "Start Time of Day", type: "time" },
        marks: [
            Plot.dot(raceData_2024_100, {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(is_sim_data ? d.simulated_start_dt : d.start_tod),
                y: "final_time_decimal",
                stroke: rideBlue, 
                opacity: d => d.is_early_starter == "True" ? 0.8 : d.is_late_starter == "True" ? 0.8 : 0.2, 
            }),
            Plot.linearRegressionY(raceData_2024_100, {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(is_sim_data ? d.simulated_start_dt : d.start_tod),
                y: "final_time_decimal",
                stroke: "red", 
            }),
        ]
        })
)
```

# How did people ride?

Most people finished the ride within 6 hours and 40 minutes. See the ride time distributions below.

Enter your ride number below to see where you place on the distribution, if you don't know your ride number you can find it by entering your name [here](https://results.ridelondon.co.uk/2024/).
```js
const riderNo = view(Inputs.text({placeholder: "Enter your rider number", type: "Number"}));
const eventPicker = view(Inputs.select(["100", "60", "30"], {value: "100", label: "Race Length"}));
const distroPicker = view(Inputs.select(["Distribution", "Histogram", "Cumulative Histogram"], {value: "Distribution", label: "Graph Type"}));
```

```js
  display(Plot.plot(distroGraph(distroPicker, eventPicker)))
```

```js
  function distroGraph(graphType, length) {
      let plotConfig;
      const distroData = combinedRaceData.filter(d => d.raceLength == length && d.year == 2024)
      const sortedTimeData2024 = distroData.sort((a, b) => a.final_time_decimal - b.final_time_decimal).map(d => d.final_time_decimal)
      const maxRiders = d3.max(distroData.map(d => d.rider_pos))
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
              y: { label: "Ride Time (Hours)", grid: true, tickFormat: d => formatRaceTime(d)},
              x: { label: "Finish Position", axis: null,},
              marks: [
                  Plot.ruleY(quantileValues, { stroke: rideBlue, strokeWidth: 1.5 }),
                  Plot.ruleY(distroData.filter(d => d.rider_no == riderNo), { y: "final_time_decimal", stroke: "darkRed", strokeWidth: 1.5 }),
                  Plot.text(quantileValues, {
                      x: maxRiders,
                      dx: 24,
                      dy: -6,
                      y: (d) => d,
                      text: (d, i) => `${d3.format(".0%")(quantiles[i])}`,
                  }),
                  Plot.text(quantileValues, {
                      x: maxRiders,
                      dx: 24,
                      dy: 6,
                      y: (d) => d,
                      text: (d, i) => `${formatRaceTime(d)}`,
                  }),
                  Plot.text(distroData.filter(d => d.rider_no == riderNo), {
                      x: maxRiders,
                      dx: 24,
                      dy: -6,
                      y: "final_time_decimal",
                      fill: "red",
                      text: (d) => `${quantileScale(d.final_time_decimal)}%`,
                  }),
                  Plot.text(distroData.filter(d => d.rider_no == riderNo), {
                      x: maxRiders,
                      dx: 24,
                      dy: 6,
                      y: "final_time_decimal",
                      fill: "red",
                      text: (d) => `${formatRaceTime(d.final_time_decimal)}`,
                  }),
                  Plot.dot(distroData, {
                      x: "rider_pos",
                      y: "final_time_decimal",
                      stroke: raceColors[length],
                      r: 2,
                      strokeWidth: 1,
                      tip: true,
                      tip: {
                        format: {
                          y: (y) => formatRaceTime(y),
                        }
                      },
                  }),
                  Plot.dot(distroData.filter(d => d.rider_no == riderNo), {
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
              marginBottom: 60,
              height: 640,
              width: width,
              x: { label: "Ride Time (Hours)", tickFormat: d => formatRaceTime(d) },
              y: { label: "Number of Finished Riders", grid: true },
              marks: [
                  Plot.rectY(distroData,
                      Plot.binX({ y: "count" }, { x: "final_time_decimal", fill: raceColors[length] }),
                  ),
                  Plot.ruleX(quantileValues, { stroke: "darkRed", strokeWidth: 2 }),
                  Plot.ruleX(distroData.filter(d => d.rider_no == riderNo), { x: "final_time_decimal", stroke: "red", strokeWidth: 1.5 }),
                  Plot.text(quantileValues, {
                      y: 0,
                      dy: 35,
                      x: (d) => d,
                      text: (d, i) => `${d3.format(".0%")(quantiles[i])}`,
                  }),
                  Plot.text(quantileValues, {
                      y: 0,
                      dy: 25,
                      x: (d) => d,
                      text: (d, i) => `${formatRaceTime(d)}`,
                  }),
                  Plot.text(distroData.filter(d => d.rider_no == riderNo), {
                      y: 0,
                      dy: 35,
                      x: (d) => d.final_time_decimal,
                      fill: "red",
                      text: (d) => `${quantileScale(d.final_time_decimal)}%`,
                  }),
                  Plot.text(distroData.filter(d => d.rider_no == riderNo), {
                      y: 0,
                      dy: 25,
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
                  Plot.rectY(distroData,
                      Plot.binX({ y: "count" }, { x: "final_time_decimal", cumulative: 1, fill: raceColors[length] })),
                  Plot.ruleX(quantileValues, { stroke: "darkRed", strokeWidth: 2 }),
                  Plot.ruleX(distroData.filter(d => d.rider_no == riderNo), { x: "final_time_decimal", stroke: "red", strokeWidth: 1.5 }),
                  Plot.text(quantileValues, {
                      y: maxRiders,
                      dy: -26,
                      x: (d) => d,
                      text: (d, i) => `${d3.format(".0%")(quantiles[i])}`,
                  }),
                  Plot.text(quantileValues, {
                      y: maxRiders,
                      dy: -16,
                      x: (d) => d,
                      text: (d, i) => `${formatRaceTime(d)}`,
                  }),
                  Plot.text(distroData.filter(d => d.rider_no == riderNo), {
                      y: maxRiders,
                      dy: -26,
                      x: (d) => d.final_time_decimal,
                      fill: "red",
                      text: (d) => `${quantileScale(d.final_time_decimal)}%`,
                  }),
                  Plot.text(distroData.filter(d => d.rider_no == riderNo), {
                      y: maxRiders,
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

However, there was a much wider distribution of finish times in the 100 mile race when compared to the 2023 ride, with people generally taking longer to finish the race.

```js
display(yearHistogramsChart(combinedRaceData.filter(d => d.raceLength == "100"), width))
```

## Did the poor weather lead to lower times overall?

Add wind impact analysis.


 -->

## Why did the route need to be altered?
<div class="grid grid-cols-2">
  <div>

  The central London portion of the route had riders congregate at Buckingham Palace before heading down the Mall and starting along the Thames River Embankment. 

  The route then avoided the docklands by using the Limehouse Link Tunnel, before cutting North via the A12.

  After heading out to Essex and back, the ride returned via the same route, ending with a sprint finish across Tower Bridge.

  By following this route, disruption on traffic flow across London as kept to a minimum. Traffic could move from the South across the river via the multiple tunnels and bridges as the ride progressed along the Embankment, and from the East via A13, and the roads passing under the A12.
  </div>
  <div>
    ${silvertonRouteMap(introRouteGeoJSON, londonBridges, { center: [51.5085, -0.0485], zoom: 11.8, mobileZoom: 11.0, width })}
    <div class="muted">Open bridges and tunnel marked in green, closed in red.</div>
  </div>
</div>

<div class="grid grid-cols-2">
  <div>
  
  In April 2025, the Silvertown tunnel opened linking the Royal Docks and Canary Wharf with north Greenwich. The tunnel was intended to reduce pressure on the heavily congested Dartford crossing and Blackwater Tunnel. Cyclists who wish to use the tunnel need to phone for a dedicated shuttle bus to pick them up.

  If the previous route was to be used, the Silvertown tunnel would have to close between 4am and 7pm on the day of the event. Will Norman, London's cycling and walking commissioner at the time of planning described this described this as an “absolute no”.

  This left the London Marathon Group with a monumental re-planning effort, having to find a way to keep the Silvertown tunnel open without causing large scale disruption to central London.

  </div>
  <div>
    ${silvertonRouteMap(introRouteGeoJSON, londonBridges, { center: [51.501594787700675, 0.011805819341940176], zoom: 13.4, width })}
    <div class="muted">Silvertown tunnel marked in red.</div>
  </div>
</div>

---

## The proposed 2025 routes

<div class="grid grid-cols-2">
  <div>

  ### Avoid East London Entirely
  By turning the route Northbound off of the Embankment at Tower bridge the docklands can be avoided entirely, meaning that the Silvertown tunnel could operate without disruption.
  
  The route would continue up the A10 via Dalston and out to Essex. Returning via the A104, cutting through Victoria Park onto the A11 and maintaining the finish on Tower Bridge.

  This however, would cause a huge amount of disruption to central London. The route contains no major bridges or overpasses meaning the traffic control would have to be conducted throughout the day. 

  The inbound and outbound road closures would also overlap 8am to 11am, essentially creating a 'landlocked' zone for a period of the day.

  </div>
  <div>
    ${routeMap(routeB, londonBridges, "#7b2fa0", width, { polygon: true, bridgeKey: 'b', lineGeojson: routeBLine })}
    <div class="muted">"Landlocked" area shaded in red.</div>
  </div>
</div>
<br>

<div class="grid grid-cols-2">
  <div>

  ### Avoid Central London Entirely
  By starting the event at the Queen Elizabeth Olympic Park and heading East, this proposed route requires no major river crossing to be closed for the full duration of the day.

  The returning route would cut Westerly across North London before heading South through Camden Town, switching to a new ending location of The Mall. 

  This route would create significant disruption Camden Town, one of London's busiest areas. It was also noted that for an event touted as Ride London, riders would see a very small amount of London Landmarks during their ride.

  </div>
  <div>
    ${routeMap(routeC, londonBridges, "#060549", width, { bridgeKey: 'c' })}
  </div>
</div>

<div class="grid grid-cols-2">
  <div>

  ### Only close the Silvertown Tunnel for the morning
  By keeping the start of the ride on the Embankment , the route can maintain it's original low-disruption outward leg which involves a high amount of London landmarks. 
  
  This would however cause the Silvertown tunnel to have close until at least 11am and still require a very large amount disruption to Camden Town as this part of the adjusted route would still need to be used to allow the tunnel to reopen.

  </div>
  <div>
    ${routeMap(routeF, londonBridges, "#e07b39", width, { bridgeKey: 'f' })}
  </div>
</div>

<div class="grid grid-cols-2">
  <div>

  ### Avoid the Silvertown tunnel specifically
  By starting the route in South East London, progressing up the Thames and beginning on the Southbank, Before turning North after Blackfriars Bridge onto the A11 and heading North East out of London on A104.

  The riders would again, return by cutting West across North London, then head South via Camden for an ending at the Mall.

  This route attempts to give Riders more visable London landmarks in the morning, while keeping the Silvertown tunnel open throughout the day.

  However, in attempting to solve each issue it also inherits all of issues from the other routes. A departing route via East London leaves no way for traffic to flow into central London from West to East, and a Southern route via Camden means major disruption 

  </div>
  <div>
    ${routeMap(routeD, londonBridges, "#37e1d5", width, { bridgeKey: 'd' })}
  </div>
</div>
<br>

This all does not begin to get into the knock-on effect that these London based route changes would have, any distance lost in the City of London would have to be made up in Essex. Considering the event was already controversial, with [petitions created](https://www.change.org/p/stop-the-ride-london-essex-cycling-event-from-disrupting-ongar) appealing to stop the ride in Ongar and Tony Blackburn suggesting that Ride London should be replaced by an ["event for car owners"](https://road.cc/content/news/tony-blackburn-calls-car-event-replace-ridelondon-301527), shutting more roads in Essex may not have been a viable option either.


# Cancelling the event
<br>

## The 2024 hiatus
When planning the 2025 edition of Ride London, two major events happened. TFL demanded a major re-routing of the event to keep the Silvertown tunnel open for the full duration of the event day. This was a huge undertaking for the route planning staff at LME.

The women's professional race, the London-Surrey Classic, was also dropped during this period when the UCI moved the dates of the race to the same day as the Trooping the Colour. 

According to [an FAQ](https://www.whatdotheyknow.com/request/correspondence_with_london_marat/response/3375500/attach/html/4/FOI%204366%202526%20Redacted.pdf.html) sent to major stakeholders (such as theEssex Council), this meant that no revenue from sponsorships or broadcasting rights could be obtained for funding the organisation of the event. 

With rider numbers for the longest route were consistently declining year over year and major routing and funding issues, the decision was made to place the 2025 event on hiatus and attempt to solve issues in the intervening year. 

<br>

## Why was the race cancelled permanently?

The 2024 Ride London event was a fairly well run event. Riders generally set appropriate times for themselves, with faster riders leaving in earlier waves on average. 

However, about 29% of riders didn't leave in their intended block, overpopulating waves 3 and 4, leading to a large area of congestion in the morning of the race. This led to some extreme events where extremely fast riders passed a large number of slower riders throughout the day.

This congestion cleared after the lunch rush at the 50 mile rest point, **with slower riders opting to take longer breaks for lunch**, and the rest of the day had a fairly evenly distributed number of riders.

Considering the epic levels of organisation the event requires, with over 3,000 stewards, 100 support vehicles and 450km of road closures, London Marathon Events also expressed that they would not be able to maintain the subsidy required for keep running the race.

<style>

body {
  font-family: var(--sans-serif);
}

.leaflet-tooltip {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
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