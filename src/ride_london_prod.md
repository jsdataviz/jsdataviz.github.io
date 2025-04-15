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
  const raceData_100 = FileAttachment("./data/parsed_I_data.csv").csv({typed: true});
  const raceData_60 = FileAttachment("./data/parsed_I60_data.csv").csv({typed: true});
  const raceData_30 = FileAttachment("./data/parsed_I30_data.csv").csv({typed: true});
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
const combinedRaceData = [
    ...raceData_100.map(item => ({ ...item, raceLength: '100' })),
    ...raceData_60.map(item => ({ ...item, raceLength: '60' })),
    ...raceData_30.map(item => ({ ...item, raceLength: '30' }))
  ];
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

A total of 21,103 people rode in one of the Ride London events in 2024, a 7% drop from the 22,596 riders from 2023. However, this is the number of riders who completed the race, rather than registrations. The conditions of the race in 2023 were much better, which may have led to less people choosing to hit the road in 2024.

```js
const groupedYearlyData = Object.values(
combinedRaceData.reduce((acc, { year, raceLength }) => {
  const key = `${year}-${raceLength}`;
  
  if (!acc[key]) {
    acc[key] = { year, raceLength, riders: 0 };
  }

  acc[key].riders++;
  return acc;
}, {})
);

groupedYearlyData.push(
  {year: 2022, raceLength: "100", riders: 20432},
  {year: 2022, raceLength: "60", riders: 1386},
  {year: 2022, raceLength: "30", riders: 413},
)

display(
Plot.plot({
    marginLeft: 55,
    y: {grid: true, label: "Riders"},
    x: {label: null},
    marks: [
      Plot.barY(groupedYearlyData, {x: "year", y: "riders", fill: d => raceColors[d.raceLength]}),
      Plot.ruleY([0])
    ]
  })
);
```

<br>

### Less people rode the 100, but the shorter rides were growing in popularity
The number of total 100 riders dropped by 11% between 2024 and 2023. Which had better conditions when the race started and throughout the morning.

<div>
  ${Plot.plot({
      title: "100 Miles",
      height: 350,
      width: 400,
      marginLeft: 50,
      marginTop: 25,
      x: {label: null},
      y: {label: "Number of Riders", domain: [0, 22000], grid: true,},
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
        y: {label: "Number of Riders", domain: [0, 2500], grid: true,},
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
        y: {label: "Number of Riders", domain: [0, 2500], grid: true,},
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

<br>

### However, fewer women raced than ever before, including beginners.

At 4,088 total female riders, fewer women rode in the Ride London events than since 2022. Continuing the declining trend of female participation even when the event grew in total attendance 2023.

```js
const groupedFemaleData = Object.values(
  combinedRaceData.filter(d => d.sex == 'W').reduce((acc, { year, raceLength }) => {
    const key = `${year}-${raceLength}`;
    
    if (!acc[key]) {
      acc[key] = { year, raceLength, riders: 0 };
    }

    acc[key].riders++;
    return acc;
  }, {})
);

groupedFemaleData.push(
  {year: 2022, raceLength: "100", riders: 4502},
  {year: 2022, raceLength: "60", riders: 429},
  {year: 2022, raceLength: "30", riders: 228},
)

display(
Plot.plot({
    y: {grid: true},
    marks: [
      Plot.barY(groupedFemaleData, {x: "year", y: "riders", fill: d => raceColors[d.raceLength]}),
      Plot.ruleY([0])
    ]
  })
);
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

function femaleRatioBars(data, distance) {
  const graphData = data.filter(d => d.raceDistance == distance)

  return Plot.plot({
        height: 350,
        width: 400,
        marginLeft: 50,
        marginTop: 25,
        title: `${distance} miles`,
        x: {label: null},
        y: {label: "Perc. of Female Riders", domain: [0, 1], grid: true, tickFormat: d => `${d * 100}%`},
        marks: [
          Plot.barY(graphData, {
            x: "year",
            y: "genderRatio",
            fill: d => raceColors[d.raceDistance],
          }),
          Plot.ruleY([0]),
          Plot.text(graphData, {
            x: "year",
            y: "genderRatio",
            text: d => `${d3.format(".0f")(d.genderRatio * 100)}%`,
            dy: -6,
            lineAnchor: "bottom",
          })
        ]
      });
}
```

The ratio of female to male riders has dropped in every category, from 2022 to 2024. Dropping 5% in the most popular race category, the 100 miler.

It's also worth noting the decline in the most beginner friendly race category of 30 miles. Where more women used to race than men. This race's doubling in popularity has not been felt by both male and female riders equally, seeing a 8% drop from 2023 to 2024.

<div class="grid grid-cols-3">
  <div>
    ${femaleRatioBars(femaleRatioData, "100")}
  </div>
  <div>
    ${femaleRatioBars(femaleRatioData, "60")}
  </div>
  <div>
    ${femaleRatioBars(femaleRatioData, "30")}
  </div>
</div>

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
            Plot.rectY(combinedRaceData.filter(d => d.raceLength == '100'),
                Plot.binX({y2: "count"}, {x: "final_time_decimal", fill: "year", mixBlendMode: "multiply"})),
            Plot.ruleY([0]),
        ]
        })
)
```

## Did the poor weather lead to lower times overall?

Add wind impact analysis.

# How well was the race run?

When entering into the Ride London events, riders are asked to give an estimated time they expect to complete the event. The organisers then place riders into gated starting times to manage the flow of riders throughout the day.

This makes sense, in the perfect scenario the fastest riders would begin first so that the flow of traffic was as smooth as possible. This also means that riders have to perform as few passes of other slower riders as possible. Reducing these interactions between riders is the safest way to operate the event.

We can see the impact of this management by comparing the time of day each rider began the race, to their total ride time.

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
                y: "ride_time_finish_decimal",
                stroke: rideBlue, 
                tip: true,
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "ride_time_finish_decimal",
                stroke: "red", 
                tip: true,
            }),
            Plot.link([1], {
              x1: d3.timeParse("%Y-%m-%d %H:%M:%S")('2024-05-26 06:00:04'),
              x2: d3.timeParse("%Y-%m-%d %H:%M:%S")('2024-05-26 09:45:04'),
              y1: 12.90,
              y2: 9.10,
              strokeDasharray: 4,
              stroke: 'black',
            }),
            Plot.tip(["The dreaded sweeper bus that collects any riders who have not fished by 6pm sets the upper limit of how long riders can take throughout the day."], {
              x: d3.timeParse("%Y-%m-%d %H:%M:%S")('2024-05-26 08:00:04'),
              y: 11,
              frameAnchor: "bottom",
            }),
        ]
        })
)
```
Generally, riders who began riding earlier in the day did complete the race quicker. However there is a lot of variance in this trend.

### How well was this management system implemented?

This gating system only works if two things are true:

- Riders actually begin at their designated starting time.

- Riders are realistic about their estimated finishing time.

There are so clues in the data that might help us evaluate how closely these two points were followed.

## Did everyone start when they were meant to? 

If we plot the each rider's designated race number against the time they began the race.

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
            Plot.dot(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "rider_no",
                stroke: rideBlue, 
                tip: true,
            })
        ]
        })
)
```

 We can see that the 100 mile race was split into 5 starting waves:

1) Between 101,000 and 103,500 began at 6:00am.
2) Between 103,700 and 110,000 began at 6:05am.
3) Between 110,000 and 116,000 began at 6:45am.
4) Between 116,000 and 122,500 began at 7:35am
5) Between 123,000 and 129,000 began 8:15am.

There was also a VIP package sold which allowed entry at any point in the day, which I have assumed to the string of riders with numbers between 100,000 and 101,000 who start throughout the day.

We can *also* see that some riders, who based on their rider number and start time, either bumped into waves early than they should have had, or joined later than intended. Let's highlight those now.

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
            Plot.dot(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "rider_no",
                stroke: d => d.is_early_starter == "True" ? "red" : d.is_late_starter == "True" ? "green" : rideBlue, 
                tip: true,
            })
        ]
        })
)
```

If this assumption is true, that means that 12% of riders (2156) began the race earlier than specified and 15% (2704) began later than instructed. Meaning over a quarter of riders did not begin in their original starting wave.

## How did this effect the race?

Let's look where these rule breakers fall on our ride time plot.

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
                y: "ride_time_finish_decimal",
                stroke: d => d.is_early_starter == "True" ? "red" : d.is_late_starter == "True" ? "green" : rideBlue, 
                opacity: d => d.is_early_starter == "True" ? 0.8 : d.is_late_starter == "True" ? 0.8 : 0.2, 
                tip: true,
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "ride_time_finish_decimal",
                stroke: "red", 
                tip: true,
            }),
        ]
        })
)
```

We can see that our early starters more often than not fall into the upper final timezones in the correlation, whereas the late starters are quicker than their waves.

This can be more cleary seen when we plot each group's regression.

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
                y: "ride_time_finish_decimal",
                stroke: d => d.is_early_starter == "True" ? "red" : d.is_late_starter == "True" ? "green" : rideBlue, 
                tip: true,
                opacity: 0.05,
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024 && d.is_late_starter == "False" && d.is_early_starter == "False"), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "ride_time_finish_decimal",
                stroke: rideBlue, 
                tip: true,
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024 && d.is_early_starter == "True"), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "ride_time_finish_decimal",
                stroke: "red", 
                tip: true,
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024 && d.is_late_starter == "True"), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "ride_time_finish_decimal",
                stroke: "green", 
                tip: true,
            }),
        ]
        })
)
```

### What if every rider starter when they supposed to?

Let's give every rebellious rider a randomised start time in their starting wave and see how well the race time correlates with start time in comparison to the actual results to get an idea of how much this behavior effected the race planning.

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