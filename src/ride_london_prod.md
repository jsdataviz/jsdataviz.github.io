---
# toc: false
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

Professional events are featured over the weekend, as well as a series of sportives and a casual 'free-ride' around the city for all abilities on the Sunday. The most popular event being the 100 mile route, which was also part of the [London Classics](https://www.thelondonclassics.co.uk/).

On the 11th of September 2024, it was announced that Ride London [would not be returning in 2025](https://www.ridelondon.co.uk/news-and-media/latest-news/2025-event-update). With London Marathon Events saying that they were taking the time to perform a "full strategic review" of the event.

So let's pay our respects to our fallen event by digging into the data and seeing what we can learn about how the event was organized and how it was ridden. 🫡

</div>

<div>
<iframe src="https://ridewithgps.com/embeds?type=route&id=46770285&sampleGraph=true&distanceMarkers=true&hideSurface=true" style="width: 1px; min-width: 100%; height: 700px; border: none;" scrolling="no"></iframe>
</div>
</div>

```js
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
import { rideBlue, raceColors, formatRaceTime, startLines, startLabels, endLines, raceCheckpoints, checkpointMiles } from "./components/constants.js";
import { ridersYearlyChart } from "./components/ridersYearlyChart.js";
import { distanceRidersBar } from "./components/distanceRidersBar.js";
import { femaleRidersTotalsChart } from "./components/femaleRidersTotalsChart.js";
import { femaleRatioBars } from "./components/femaleRatioBars.js";
import { londonClassicsChart } from "./components/londonClassicsChart.js";
import { startTimeScatterChart } from "./components/startTimeScatterChart.js";
import { riderNoScatterSimpleChart } from "./components/riderNoScatterSimpleChart.js";
import { riderNoScatterWavesChart } from "./components/riderNoScatterWavesChart.js";
import { waveTimeHistogramChart } from "./components/waveTimeHistogramChart.js";
import { waveBoxPlotChart } from "./components/waveBoxPlotChart.js";
import { waveStatsTable } from "./components/waveStatsTable.js";
import { earlyLateScatterChart } from "./components/earlyLateScatterChart.js";
import { leaveProportionsChart } from "./components/leaveProportionsChart.js";
import { waveStartBar } from "./components/waveStartBar.js";
import { raceSimGraph, withRestStops } from "./components/raceSimGraph.js";
import { riderPathsSingleChart } from "./components/riderPathsSingleChart.js";
import { riderPathsSimplifiedChart } from "./components/riderPathsSimplifiedChart.js";
import { avgPassesChart } from "./components/avgPassesChart.js";
import { passDistributionChart } from "./components/passDistributionChart.js";
import { actualVsSimPassesChart } from "./components/actualVsSimPassesChart.js";
import { shareRidersPassesChart } from "./components/shareRidersPassesChart.js";
import { riderMphComparison } from "./components/riderMphComparison.js";
import { jamesSegmentPassesChart } from "./components/jamesSegmentPassesChart.js";
import { fullBumpChart } from "./components/fullBumpChart.js";
import { yearHistogramsChart } from "./components/yearHistogramsChart.js";
```

```js
const combinedRaceData = [
    ...raceData_100.map(item => ({ ...item, raceLength: '100' })),
    ...raceData_60.map(item => ({ ...item, raceLength: '60' })),
    ...raceData_30.map(item => ({ ...item, raceLength: '30' }))
  ];
```


---

# How many people rode?

A total of 21,103 people rode in one of the Ride London events in 2024, a 7% drop from the 22,596 riders from 2023. However, this is the number of riders who completed the race, rather than registrations. The conditions of the race in 2023 were much better, which may have led to less people choosing to hit the road in 2024.

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

```js
display(ridersYearlyChart(groupedYearlyData, width))
```

<br>

### Less people rode the 100, but the shorter rides were growing in popularity
The number of total 100 riders dropped by 11% between 2024 and 2023. Which had better conditions when the race started and throughout the morning.

```js
display(distanceRidersBar("100", rideTotals, width * 0.75))
```


Despite the weather however, the shorter events aimed at beginners had considerably more riders than previous years. With the 60 mile race having an increase of 11% between 2024 & 2023, and the 30 mile race more than doubling to 832 riders in 2024. Up from 395 in 2023.

<div class="grid grid-cols-2">
  <div>
    ${resize((width) => distanceRidersBar("60", rideTotals, width))}
  </div>
  <div>
    ${resize((width) => distanceRidersBar("30", rideTotals, width))}
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

display(femaleRidersTotalsChart(groupedFemaleData, width));
```

```js
  // to-do: reduce this data in a better way
  const femaleRatioData = [
    {
      year: "2024",
      raceDistance: "100",
      genderRatio: raceData_100.filter(d => d.sex == 'W' && d.year == 2024).length / raceData_100.filter(d => d.year == 2024).length,
    },
    {      
      year: "2024",
      raceDistance: "60",
      genderRatio: raceData_60.filter(d => d.sex == 'W' && d.year == 2024).length / raceData_60.filter(d => d.year == 2024).length,
    },
    {
      year: "2024",
      raceDistance: "30",
      genderRatio: raceData_30.filter(d => d.sex == 'W' && d.year == 2024).length / raceData_30.filter(d => d.year == 2024).length,
    },
    {
      year: "2023",
      raceDistance: "100",
      genderRatio: raceData_100.filter(d => d.sex == 'W' && d.year == 2023).length / raceData_100.filter(d => d.year == 2023).length,
    },
    {      
      year: "2023",
      raceDistance: "60",
      genderRatio: raceData_60.filter(d => d.sex == 'W' && d.year == 2023).length / raceData_60.filter(d => d.year == 2023).length,
    },
    {
      year: "2023",
      raceDistance: "30",
      genderRatio: raceData_30.filter(d => d.sex == 'W' && d.year == 2023).length / raceData_30.filter(d => d.year == 2023).length,
    },
    {
      year: "2022",
      raceDistance: "100",
      genderRatio: 0.22,
    },
    {      
      year: "2022",
      raceDistance: "60",
      genderRatio: 0.309523,
    },
    {
      year: "2022",
      raceDistance: "30",
      genderRatio: 0.552,
    },
    ]
```

The ratio of female to male riders has dropped in every category, from 2022 to 2024. Dropping 5% in the most popular race category, the 100 miler.

It's also worth noting the decline in the most beginner friendly race category of 30 miles. Where more women used to race than men. This race's doubling in popularity has not been felt by both male and female riders equally, seeing a 8% drop from 2023 to 2024.

<div class="grid grid-cols-3">
  <div>
    ${resize((width) =>   
      femaleRatioBars(femaleRatioData, "100", width)
    )}
  </div>
  <div>
    ${resize((width) =>   
      femaleRatioBars(femaleRatioData, "60", width)
    )}
  </div>
  <div>
    ${resize((width) =>   
      femaleRatioBars(femaleRatioData, "30", width)
    )}
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

  display(londonClassicsChart(londonClassicData, width))
```

It was the only event where this proportion was declining.

The proportion of London Marathon runners has been steadily moving towards even over the last 3 years. Last year, over X of Y total runners were women.

The two-mile serpentine swim also has far better participation than the ride 100.

---

# How well was the race run?

When entering into the Ride London events, riders are asked to give an estimated time they expect to complete the event. The organisers then place riders into gated starting times to manage the flow of riders throughout the day.

This makes sense, in the perfect scenario the fastest riders would begin first so that the flow of traffic was as smooth as possible. This also means that riders have to perform as few passes of other slower riders as possible. Reducing these interactions between riders is the safest way to operate the event.

We can see the impact of this management by comparing the time of day each rider began the race, to their total ride time.

```js
display(startTimeScatterChart(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), width))
```
Generally, riders who began riding earlier in the day did complete the race quicker. However the high amount of variance in the finish trend shows there was definitely room for improvement.

Let's review how well the "quickest rider first" system was implemented.

For this system to work, two main things need to be true:

- **Riders are realistic about their estimated finishing time.** If riders choose times that are too ambitious, they will be placed in earlier waves and then passed by faster riders.

- **Riders actually begin at their designated starting time.**  If riders choose to leave at a different time than their alloted wave, they will potentially be passing slower riders, or being passed by faster ones.

To evaluate these how often these occurred we'll need to know what waves each rider was assigned, unfortunately that isn't available in the Ride London published data but we might need be able to infer it from the data structure.

## Can we tell which wave each rider was assigned to?

Often we can infer information contained in the data by looking at the way IDs are structured. This was famously used in WW2, when the allies estimated the number of German Panther tanks being produced per month by analysing the serial numbers of captured or destroyed tanks in the field (known as the [German tank problem](https://en.wikipedia.org/wiki/German_tank_problem)).

In our case, we can plot the each rider's designated race number against the time they began the race.

```js
display(riderNoScatterSimpleChart(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), width))
```

We can see that the 100 mile race was split into 5 starting waves with the following starting times:

1) **6:00am** - Rider no. between 101,000 and 103,500
2) **6:05am** - Rider no. numbers between 103,700 and 110,000
3) **6:45am** - Rider no. numbers between 110,000 and 116,000
4) **7:35am** - Rider no. numbers between 116,000 and 122,500
5) **8:15am** - Rider no. numbers between 123,000 and 129,000  

```js
display(riderNoScatterWavesChart(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), width))
```

There was also a VIP package sold which allowed entry at any point in the day, which I have assumed to the string of riders with numbers between 100,000 and 101,000 who start throughout the day.

With this information, we can now analyse how well the race was managed.

---

## Did riders choose the right race times?

Now we know where people alloted themselves, let's evaluate if people choose the appropriate race time for their ability. To do this, let's breakdown  the distribution of total ride times for each wave.

```js
  const raceData_2024 = combinedRaceData.filter(d => d.year == 2024)

  function calculateKurtosis(data) {
    const n = data.length;
    // Calculate the mean
    const mean = data.reduce((sum, value) => sum + value, 0) / n;

    // Calculate the standard deviation
    const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n;
    const standardDeviation = Math.sqrt(variance);

    // Calculate the fourth moment
    const fourthMoment = data.reduce((sum, value) => sum + Math.pow(value - mean, 4), 0) / n;

    // Calculate the kurtosis
    const kurtosis = fourthMoment / Math.pow(standardDeviation, 4);

    return kurtosis;

    }

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
    const q1 = d3.quantile(times, 0.25);
    const q2 = d3.quantile(times, 0.50);
    const q3 = d3.quantile(times, 0.75);
    const iqrValue = q3 - q1;
    const r0 = Math.max(minValue, q1 - iqrValue * 1.5)
    const r1 = Math.min(maxValue, q3 + iqrValue * 1.5);
    const outliersValues = times.filter(v => v < r0 || v > r1).length
    const percOutliersValue = times.filter(v => v < r0 || v > r1).length / times.length
    const kurtValue = calculateKurtosis(times)
    
    return {
        min: minValue,
        max: maxValue,
        median: medianValue,
        avg: avgValue,
        count: count,
        deviation: devValue,
        iqr: iqrValue,
        kurt: kurtValue,
        outliers: outliersValues,
        outliersPerc: percOutliersValue,
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

  display(waveTimeHistogramChart(raceData_2024, width))
```

We can see that 

```js
  display(waveBoxPlotChart(raceData_2024, width))

const waveStats = [
    {
        wave: 'Wave 1',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024.filter(d => d.assigned_wave_number == "Wave 1")),
    },
    {
        wave: 'Wave 2',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024.filter(d => d.assigned_wave_number == "Wave 2")),

    },
    {
        wave: 'Wave 3',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024.filter(d => d.assigned_wave_number == "Wave 3")),

    },
    {
        wave: 'Wave 4',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024.filter(d => d.assigned_wave_number == "Wave 4")),

    },
    {
        wave: 'Wave 5',
        ...aggregateWaveTimes("ride_time_finish_decimal", raceData_2024.filter(d => d.assigned_wave_number == "Wave 5")),

    },
]

display(waveStatsTable(waveStats))
```

We can *also* see that some riders, who based on their rider number and start time, either bumped into waves early than they should have had, or joined later than intended. Let's highlight those now.

```js
display(earlyLateScatterChart(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), width))
```

```js
  const leaveCategoryTable = aq.from(combinedRaceData)
  .filter(aq.escape(d => d.year == 2024))
  .derive({
    leave_type: aq.escape(d =>
      d.is_early_starter === "True" ? "Early" :
      d.is_late_starter  === "True" ? "Late"  :
      "On-Time"
    )
  })

const leaveCategoryRaceData = leaveCategoryTable.objects()

const leaveProportions = leaveCategoryTable
  .groupby("leave_type")
  .rollup({ count: aq.op.count() })
  .derive({ proportion: d => d.count / aq.op.sum("count") })
  .objects();

display(leaveProportionsChart(leaveProportions, width))
```

If this assumption is true, that means that 12% of riders (2156) began the race earlier than specified and 15% (2704) began later than instructed. Meaning over a quarter of riders did not begin in their original starting wave.

---

## How did this effect the race?

From our riders assigned waves, we can see that the intended starting process was to allow a smaller group of faster riders to leave first, followed by even groups of riders of ~4000 people per wave.

However, there was an overlapping of people from wave 2 starting later in the day, and wave 5 starting earlier. With over 55% of the total race riders (or ~10,000 people) leaving in waves 3 and 4.

<div class="grid grid-cols-2">
  <div>
    ${waveStartBar(
      'Riders Assigned Starts', 'Assigned Start Wave',
      raceData_100.filter(d => d.year == 2024 && d.assigned_wave_number != 'VIP'),
      'assigned_wave_number', width
    )}
  </div>
  <div>
    ${waveStartBar(
      'Riders Actual Starts', 'Actual Start Wave',
      raceData_100.filter(d => d.year == 2024 && d.assigned_start_wave != null),
      'assigned_start_wave', width
    )}
  </div>
</div>

### How did this effect the flow of the race?

Due to people not starting in their designated waves, a large portion of the race began in two waves rather than evenly distributed across the morning. But how did that effect the *~flow~* of the race?

To analyse this, I've simulated each rider's position on the course at 15 minute intervals by taking their average speed measured at each time gate along the course (you can see the code for this simulation here).

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

Time: ${formattedTime}
Remaining starting riders: ${startersRemainingInt}
Finished riders: ${ridersFinishedInt}
```js
display(
  Plot.plot({
    width: width,
    height: 0.44 * width,
    y: {
      grid: true,
      label: "Number of Riders",
      domain: [0, 3500]
    },
    x: {
      domain: withRestStops,
      type: "band",
      label: "Distance (Miles)"
    },
    marks: [
      Plot.barY(loopRaceSim.filter(d => d.type == 'total_riders'), {
        x: "bucket",
        y: "riders",
        fill: rideBlue,
        stack: "y"
      }),
    ]
  })
)
```

```js
const raceSim10 = riderDistributionLong.filter(d => 10 == d.hour)
const raceSim12 = riderDistributionLong.filter(d => 12 == d.hour)
```

### 7AM - The early waves depart

By 7AM, the first two waves have departed. The earliest wave is made up of the most die hard riders, with very few riders assigned to later waves beginning this early (marked as early riders). 

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 7 == d.hour), width))
```

The second wave departing in the 0-5 mile bucket, contains some of the wave 1 riders who weren't prepared to wake up at 5am and started late. However, 800 riders designated to begin in this wave do not depart on time, instead opting to start the race later.

### 8AM - A peak develops

Wave

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 8 == d.hour), width))
```

### 9AM

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 9 == d.hour), width))
```

### 10AM

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 10 == d.hour), width))
```

### 12PM

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 12.25 == d.hour), width))
```

### 1PM

```js
  display(raceSimGraph(riderDistributionLong.filter(d => 13 == d.hour), width))
```

This crowding in the 3rd and 4th waves led to some significant moments of overcrowding during the beginning of the day. Most notably:

```js
  const linkData = raceData_100.filter(d => d.year == 2024)
  const highlightedData = raceData_100.filter(d => d.year == 2024 && d.rider_no == 126410)
```

```js
display(riderPathsSingleChart(linkData, highlightedData, width))
```

```js
display(riderPathsSimplifiedChart(linkData, highlightedData, width))
```

---

## Passes by start-time compliance

Did riders who jumped the gun (or started too late) cause more disruption on the road?

```js
const starterTypeTable = aq.from(raceData_100.filter(d => d.year == 2024))
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

```js
display(avgPassesChart(avgMelted, width))
```

```js
display(passDistributionChart(
  "Distribution of total riders passed on the road",
  "total_passed_riders_race",
  "Riders passed",
  starterTypeData,
  width
))
```

```js
display(passDistributionChart(
  "Distribution of total times passed by others on the road",
  "total_passed_by_riders_race",
  "Times passed by",
  starterTypeData,
  width
))
```

## Real vs simulated: how much did wave non-compliance cost?

To quantify the disruption caused by early and late starters, we can compare each rider's actual pass counts against the simulation — where every non-compliant rider is placed back into their correct wave, but their speed is held constant.

```js
const simCompTable = aq.from(raceData_100.filter(d => d.year == 2024))
  .derive({
    starter_type: aq.escape(d =>
      d.is_early_starter === "True" ? "Early" :
      d.is_late_starter  === "True" ? "Late"  : "On Time"
    ),
    real_pass_events: aq.escape(d => +d.total_passed_riders_race + +d.total_passed_by_riders_race),
    sim_pass_events:  aq.escape(d => +d.sim_total_passed_riders_race + +d.sim_total_passed_by_riders_race),
  })

const simCompStats = simCompTable
  .groupby("starter_type")
  .rollup({
    avg_real: aq.op.mean("real_pass_events"),
    avg_sim:  aq.op.mean("sim_pass_events"),
    count:    aq.op.count(),
  })
  .objects()

const realTotalPasses = d3.sum(raceData_100.filter(d => d.year == 2024), d => +d.total_passed_riders_race)
const simTotalPasses  = d3.sum(raceData_100.filter(d => d.year == 2024), d => +d.sim_total_passed_riders_race)

const simCompMelted = simCompStats.flatMap(d => [
  { starter_type: d.starter_type, scenario: "Actual",    value: d.avg_real },
  { starter_type: d.starter_type, scenario: "Simulated", value: d.avg_sim  },
])
```

Each unique overtake between two riders counts as one event. If all ${raceData_100.filter(d => d.year == 2024 && (d.is_early_starter === "True" || d.is_late_starter === "True")).length.toLocaleString()} non-compliant riders had started in their correct wave, the total pass events across the field would fall from **${realTotalPasses.toLocaleString()}** to **${simTotalPasses.toLocaleString()}** — a reduction of **${(realTotalPasses - simTotalPasses).toLocaleString()} events (${((realTotalPasses - simTotalPasses) / realTotalPasses * 100).toFixed(1)}%)**.

```js
display(actualVsSimPassesChart(simCompMelted, width))
```

The on-time group shows almost no change between actual and simulated — as expected, since their start times are unchanged. The largest gaps appear in the early and late starter groups, where incorrect wave placement directly drives excess passing interactions.

Are early and late starters responsible for a disproportionate share of pass events relative to their size in the field?

```js
const totalRiders2024 = raceData_100.filter(d => d.year == 2024).length

const proportionStats = simCompTable
  .groupby("starter_type")
  .rollup({
    count:           aq.op.count(),
    real_pass_total: aq.op.sum("total_passed_riders_race"),
  })
  .derive({
    pct_riders:      aq.escape(d => d.count / totalRiders2024 * 100),
    pct_real_passes: aq.escape(d => d.real_pass_total / realTotalPasses * 100),
  })
  .objects()

const proportionMelted = proportionStats.flatMap(d => [
  { starter_type: d.starter_type, series: "Share of riders",  value: d.pct_riders      },
  { starter_type: d.starter_type, series: "Share of passes",  value: d.pct_real_passes },
])
```

```js
display(shareRidersPassesChart(proportionMelted, width))
```

---

## An outlier: the rider who passed almost everyone

```js
const andrewRider = raceData_100.find(d => d.rider_no === 100273 && d.year === 2024)
const andrewPassedRiders = raceData_100.filter(d =>
  d.year === 2024 &&
  +d.rider_pos_start < +andrewRider.rider_pos_start &&
  +d.rider_pos_finish > +andrewRider.rider_pos_finish
)
const andrewPassedAvgMph = d3.mean(andrewPassedRiders, d => +d.mph_finish)
const fieldAvgMph = d3.mean(raceData_100.filter(d => d.year === 2024), d => +d.mph_finish)
```

Meet **Andrew Habibi-Parker**. As a VIP entrant (rider #100273) he had his own start slot and rolled off the line at 08:32 — one of the very last to start, in the bottom 6% of riders by start time. By that point, the bulk of the field had been on the road for hours.

What followed was one of the most disruptive rides in the race. Starting from position ${andrewRider.rider_pos_start.toLocaleString()} out of 17,893, Andrew spent the next 7 hours and 4 minutes cutting through the field, overtaking **${(+andrewRider.total_passed_riders_race).toLocaleString()} riders** on the open road — and being passed by just **${andrewRider.total_passed_by_riders_race}**.

He finished in position ${andrewRider.rider_pos_finish.toLocaleString()}, climbing roughly 5,900 places through the field.

The speed differential tells the whole story. Andrew averaged **${(+andrewRider.mph_finish).toFixed(1)} mph** across the course. The riders he overtook averaged just **${andrewPassedAvgMph.toFixed(1)} mph** — the field as a whole averaged ${fieldAvgMph.toFixed(1)} mph.

```js
display(riderMphComparison(
  "Andrew's mph vs riders he passed vs the full field",
  [
    { label: "Field average",        mph: fieldAvgMph },
    { label: "Riders he passed",     mph: andrewPassedAvgMph },
    { label: "Andrew Habibi-Parker", mph: +andrewRider.mph_finish },
  ],
  width
))
```

---

## A different kind of disruption: the rider the field swallowed whole

```js
const jamesRider = raceData_100.find(d => d.rider_no === 102317 && d.year === 2024)
const jamesPassedByRiders = raceData_100.filter(d =>
  d.year === 2024 &&
  +d.rider_pos_start > +jamesRider.rider_pos_start &&
  +d.rider_pos_finish < +jamesRider.rider_pos_finish
)
const jamesPassedByAvgMph = d3.mean(jamesPassedByRiders, d => +d.mph_finish)

const jamesPassData = [
  { segment: "Start → 25mi",  type: "Road", passed: +jamesRider.passed_riders_tod_25_td_race,  passed_by: +jamesRider.passed_by_riders_tod_25_td_race },
  { segment: "25 → 26mi",     type: "Rest", passed: +jamesRider.passed_riders_tod_26_td_rest,  passed_by: +jamesRider.passed_by_riders_tod_26_td_rest },
  { segment: "26 → 53mi",     type: "Road", passed: +jamesRider.passed_riders_tod_53_td_race,  passed_by: +jamesRider.passed_by_riders_tod_53_td_race },
  { segment: "53 → 54mi",     type: "Rest", passed: +jamesRider.passed_riders_tod_54_td_rest,  passed_by: +jamesRider.passed_by_riders_tod_54_td_rest },
  { segment: "54 → 73mi",     type: "Road", passed: +jamesRider.passed_riders_tod_73_td_race,  passed_by: +jamesRider.passed_by_riders_tod_73_td_race },
  { segment: "73 → 74mi",     type: "Rest", passed: +jamesRider.passed_riders_tod_74_td_rest,  passed_by: +jamesRider.passed_by_riders_tod_74_td_rest },
  { segment: "74mi → Finish", type: "Road", passed: +jamesRider.passed_riders_tod_finish_td_race, passed_by: +jamesRider.passed_by_riders_tod_finish_td_race },
]
```

Andrew's disruption came from speed — cutting through the field, one overtake at a time. **James Holloway**'s disruption worked in reverse. A Wave 1 starter, James was on the road by 06:01 — position ${jamesRider.rider_pos_start.toLocaleString()} out of 17,893, near the very front of the entire field.

By the finish he was position ${jamesRider.rider_pos_finish.toLocaleString()}. The entire race had washed over him. He was passed by **${(+jamesRider.total_passed_by_riders_race).toLocaleString()} riders** on the open road, and overtook just **${jamesRider.total_passed_riders_race}** himself on the road. His finish time of ${(+jamesRider.ride_time_finish_decimal).toFixed(2)} hours — nearly 12 and a half hours — is ${((+jamesRider.ride_time_finish_decimal - d3.mean(raceData_100.filter(d => d.year === 2024), d => +d.ride_time_finish_decimal))).toFixed(1)} hours slower than the field average.

But there's a twist. While James was barely moving on the road, he was one of the most efficient riders through the rest stops — passing **${(+jamesRider.total_passed_riders_rest).toLocaleString()} riders** at the feed stations, including ${+jamesRider.passed_riders_tod_54_td_rest} at the 53-54 mile stop alone. He'd roll in while others were lingering, and roll out before them. On the road he was a rock in a river; at the rest stops he was threading through standing water.

The riders who streamed past him on the road averaged **${jamesPassedByAvgMph.toFixed(1)} mph**. James averaged **${(+jamesRider.mph_finish).toFixed(1)} mph** — a pace that, on a 100-mile course, tells its own story of a very tough day in the saddle.

```js
display(riderMphComparison(
  "James's mph vs riders who passed him vs the full field",
  [
    { label: "James Holloway",    mph: +jamesRider.mph_finish },
    { label: "Field average",     mph: fieldAvgMph },
    { label: "Riders who passed", mph: jamesPassedByAvgMph },
  ],
  width
))
```

```js
display(jamesSegmentPassesChart(jamesPassData, width))
```

Four riders define the extremes of this chart.

At the top, **Andrew Habibi-Parker** cut from the back of Wave 2 into the top third of the field — the most passes made. Alongside him, **Csaba Csenge** achieved the single biggest position gain of the entire race: starting from ${csabaRider.rider_pos_start.toLocaleString()} and finishing at ${csabaRider.rider_pos_finish.toLocaleString()}, a climb of **${(+csabaRider.rider_pos_start - +csabaRider.rider_pos_finish).toLocaleString()} places**. He averaged **${(+csabaRider.mph_finish).toFixed(1)} mph** — **${((+csabaRider.mph_finish) - fieldAvgMph).toFixed(1)} mph** faster than the field — and was passed by no one.

At the bottom, **James Holloway** and **Kelly-Ann Plummer** both started in position ${jamesRider.rider_pos_start.toLocaleString()} and sank to the very end of the field. Kelly-Ann's drop of **17,060 places** is the largest in the race. She averaged **${(+kellyRider.mph_finish).toFixed(1)} mph** — **${(fieldAvgMph - +kellyRider.mph_finish).toFixed(1)} mph** slower than the field average.

```js
const kellyRider  = raceData_100.find(d => d.rider_no === 102316 && d.year === 2024)
const csabaRider  = raceData_100.find(d => d.rider_no === 102302 && d.year === 2024)
```

```js
const andrewHighlight = raceData_100.filter(d => d.year == 2024 && d.rider_no === 100273);
const jamesHighlight  = raceData_100.filter(d => d.year == 2024 && d.rider_no === 102317);
const kellyHighlight  = raceData_100.filter(d => d.year == 2024 && d.rider_no === 102316);
const csabaHighlight  = raceData_100.filter(d => d.year == 2024 && d.rider_no === 102302);
```

```js
display(fullBumpChart(linkData, andrewHighlight, csabaHighlight, jamesHighlight, kellyHighlight, width))
```

<span style="color: tomato">―</span> **Andrew Habibi-Parker** — most riders passed &nbsp;&nbsp; <span style="color: seagreen">―</span> **Csaba Csenge** — most positions gained (+11,952) &nbsp;&nbsp; <span style="color: steelblue">―</span> **James Holloway** — most passed by &nbsp;&nbsp; <span style="color: goldenrod">―</span> **Kelly-Ann Plummer** — most positions lost (−17,060)

---

## The most disruptive rider overall

Andrew passed almost everyone he met. James was an obstacle for almost the entire field. But when you count both directions — passes made and passes received — neither of them tops the list.

That distinction belongs to **Bryn Hassan**, with **${(+raceData_100.find(d => d.rider_no === 101061 && d.year === 2024).total_passed_riders_race + +raceData_100.find(d => d.rider_no === 101061 && d.year === 2024).total_passed_by_riders_race).toLocaleString()} total on-road disruption events**.

```js
const brynRider = raceData_100.find(d => d.rider_no === 101061 && d.year === 2024)
```

Like James, Bryn started in Wave 1 — on the road by 06:02, position ${brynRider.rider_pos_start.toLocaleString()} out of 17,893. He passed ${(+brynRider.total_passed_riders_race).toLocaleString()} riders himself, but was overtaken by ${(+brynRider.total_passed_by_riders_race).toLocaleString()} — a combined ${(+brynRider.total_passed_riders_race + +brynRider.total_passed_by_riders_race).toLocaleString()} overtaking events on the open road. He finished at position ${brynRider.rider_pos_finish.toLocaleString()}.

Andrew's dominance flowed in one direction; James was almost entirely a passive obstacle. Bryn was genuinely two-way — active enough to pass thousands, but still slow enough relative to his start position that the bulk of the field eventually streamed past him too.

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
            Plot.dot(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
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
            Plot.dot(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(is_sim_data ? d.simulated_start_dt : d.start_tod),
                y: "final_time_decimal",
                stroke: rideBlue, 
                opacity: d => d.is_early_starter == "True" ? 0.8 : d.is_late_starter == "True" ? 0.8 : 0.2, 
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
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
display(yearHistogramsChart(combinedRaceData, width))
```

## Did the poor weather lead to lower times overall?

Add wind impact analysis.


 -->

## Basic Ride Facts
- How many people raced ✅ 
- What the makeup of riders was ✅
- Percentiles and fun facts. ✅
- Wind speed factor


## How was the event run?
- Start time waves  ✅ 
- Did the weather cause a crowded start? / Did people choose to start later due to the rain?
- Number of breaks / Most popular spots
- Least break time spot

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