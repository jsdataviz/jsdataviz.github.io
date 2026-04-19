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
  const raceSimData = FileAttachment("./data/race_sim_data.csv").csv();
  const rideBlue = '#060549'
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
    marginTop: 25,
    width: width * 0.75,
    height: width * 0.5,
    color: {
      legend: true,
      domain: Object.keys(raceColors), 
      range: Object.values(raceColors),
    },
    y: {
      grid: true, 
      label: "Riders",
      nice: true,
    },
    x: {
      label: 'Race Year', 
      type: 'band', 
    },
    marks: [
      Plot.barY(groupedYearlyData, {
        x: d => String(d.year), 
        y: "riders",
        fill: 'raceLength'
      }),
      Plot.text(groupedYearlyData, {
        x: d => String(d.year), 
        y: d => d3.sum(groupedYearlyData.filter(x => x.year == d.year).map(z => z.riders)),
        text: d => d3.sum(groupedYearlyData.filter(x => x.year == d.year).map(z => z.riders)),
        dy: -8,
      }),
      Plot.ruleY([0])
    ]
  })
);
```

<br>

### Less people rode the 100, but the shorter rides were growing in popularity
The number of total 100 riders dropped by 11% between 2024 and 2023. Which had better conditions when the race started and throughout the morning.

```js
display(
  Plot.plot({
      title: "100 Miles",
      width: width * 0.75,
      height: width * 0.5,
      marginLeft: 50,
      marginTop: 25,
      y: {
        grid: true, 
        label: "Riders",
        nice: true,
      },
      x: {
        label: 'Race Year', 
        type: 'band', 
      },
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
)
```


Despite the weather however, the shorter events aimed at beginners had considerably more riders than previous years. With the 60 mile race having an increase of 11% between 2024 & 2023, and the 30 mile race more than doubling to 832 riders in 2024. Up from 395 in 2023.

<div class="grid grid-cols-2">
  <div>
    ${resize((width) =>   
      Plot.plot({
        title: "60 Miles",
        height: width * 0.66,
        width: width,
        marginLeft: 50,
        marginTop: 25,
        x: {label: null, type: 'band'},
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
          }),
        Plot.ruleY([0]),
        ]
      }) 
    )}
  </div>
  <div>
    ${resize((width) =>   
    Plot.plot({
        title: "30 Miles",
        height: width * 0.66,
        width: width,
        marginLeft: 50,
        marginTop: 25,
        x: {label: null, type: 'band'},
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
          }),
        Plot.ruleY([0]),
        ]
      })
    )}
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
    width: width * 0.75,
    height: width * 0.5,
    marginLeft: 50,
    marginTop: 25,
    y: {
      grid: true,
      label: "Female Riders"
    },
    x: {
      label: "Ride Year",
      type: "band",
    },
    color: {
      legend: true,
      domain: Object.keys(raceColors), 
      range: Object.values(raceColors),
    },
    marks: [
      Plot.barY(groupedFemaleData, {
        x: d => String(d.year), 
        y: "riders", 
        fill: "raceLength",
      }),
      Plot.text(groupedFemaleData, {
        x: d => String(d.year), 
        y: d => d3.sum(groupedFemaleData.filter(x => x.year == d.year).map(z => z.riders)),
        text: d => d3.sum(groupedFemaleData.filter(x => x.year == d.year).map(z => z.riders)),
        dy: -8,
      }),
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

function femaleRatioBars(data, distance, width) {
  const graphData = data.filter(d => d.raceDistance == distance)

  return Plot.plot({
        width: width,
        height: 400,
        marginLeft: 50,
        marginTop: 25,
        title: `${distance} miles`,
        x: {label: null, type: 'band'},
        y: {label: "Perc. of Female Riders", domain: [0, 1], grid: true, tickFormat: d => `${d * 100}%`},
        marks: [
          Plot.barY(graphData, {
            x: d => String(d.year),
            y: "genderRatio",
            fill: d => raceColors[d.raceDistance],
          }),
          Plot.ruleY([0]),
          Plot.text(graphData, {
            x: d => String(d.year),
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

  display(
    Plot.plot({
        marginLeft: 50,
        marginTop: 25,
        title: `Female Participants in London Classic events`,
        x: {label: null, domain: ['Serpentine 2 Mile Swim', "London Marathon", "Ride London 100"]},
        y: {label: "Perc. of Female Participants", domain: [0, 1], grid: true, tickFormat: d => `${d3.format(".0%")(d)}`},
        marks: [
          Plot.barY(londonClassicData, {
            x: "year",
            y: "genderRatio",
            fill: rideBlue,
          }),
          Plot.ruleY([0]),
          Plot.text(londonClassicData, {
            x: "year",
            y: "genderRatio",
            text: d => `${d3.format(".0%")(d.genderRatio)}`,
            dy: -6,
            lineAnchor: "bottom",
          })
        ]
      })
    )
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
display(
    Plot.plot({
        title: "Riders who were assigned earlier starts generally finished faster than later riders.",
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
            }),
            Plot.linearRegressionY(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "ride_time_finish_decimal",
                stroke: "red", 
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
display(
    Plot.plot({
        inset: 6,
        height: 650,
        marginTop: 50,
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
                opacity: 0.5,
                r: 2,
            })
        ]
        })
)
```

We can see that the 100 mile race was split into 5 starting waves with the following starting times:

1) **6:00am** - Rider no. between 101,000 and 103,500
2) **6:05am** - Rider no. numbers between 103,700 and 110,000
3) **6:45am** - Rider no. numbers between 110,000 and 116,000
4) **7:35am** - Rider no. numbers between 116,000 and 122,500
5) **8:15am** - Rider no. numbers between 123,000 and 129,000  

```js
const startLines = [
  {
    x: "2024-05-26 06:00:00",
    y1: 101000,
    y2: 103500,
  },
  {
    x: "2024-05-26 06:03:00",
    y1: 103700,
    y2: 109500,
  },
  {
    x: "2024-05-26 06:45:00",
    y1: 110000,
    y2: 116000,
  },
  {
    x: "2024-05-26 07:37:00",
    y1: 117000,
    y2: 122000,
  },
  {
    x: "2024-05-26 08:15:00",
    y1: 123000,
    y2: 129000,
  },
]

const startLabels = [
  {
    x: "2024-05-26 06:00:00",
    y: 103500,
    label: 'Wave 1',
  },
  {
    x: "2024-05-26 06:03:00",
    y: 109500,
    label: "Wave 2",
  },
  {
    x: "2024-05-26 06:45:00",
    y: 116000,
    label: "Wave 3",
  },
  {
    x: "2024-05-26 07:37:00",
    y: 122000,
    label: "Wave 4",
  },
  {
    x: "2024-05-26 08:15:00",
    y: 129000,
    label: "Wave 5",
  },
]

const endLines = [
  {
    x: "2024-05-26 06:45:00",
    y1: 103700,
    y2: 109500,
  },
  {
    x: "2024-05-26 07:37:00",
    y1: 110000,
    y2: 116000,
  },
  {
    x: "2024-05-26 08:15:00",
    y1: 117000,
    y2: 122000,
  },
]

display(
    Plot.plot({
        inset: 6,
        height: 650,
        width: width,
        marginLeft: 60,
        marginTop: 50,
        grid: true,
        color: {
          scheme: "viridis"
        },
        y: { label: "Rider Number", grid: true},
        x: { label: "Start Time of Day", type: "time" },
        marks: [
            Plot.dot(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "rider_no",
                r: 2,
                stroke: "assigned_wave_number", 
            }),
            Plot.ruleX(startLines, {
              x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
              y1: "y1",
              y2: "y2",
              strokeWidth: 2,
            }),
            Plot.tip(startLabels, {
              x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
              y: "y",
              dy: -2,
              title: "label",
            })
        ]
        })
)
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

  display(
  Plot.plot({
    marginRight: 50,
    width: width * 0.66,
    height: width * 0.75,
    y: {
      grid: true,
      label: "Riders",
    },
    x: {
      grid: true,
      label: "Total Ride Time (Hours)",
    },
    fy: {axis: "right", label: null},
    marks: [
      Plot.rectY(raceData_2024.filter(d => d.assigned_wave_number != null && d.assigned_wave_number != 'VIP'), Plot.binX({y: "count"}, {
        x: "ride_time_finish_decimal",
        fy: "assigned_wave_number",
        fill: rideBlue,
      }
      )),
      Plot.ruleY([0])
    ]
  })
)
```

We can see that 

```js
  display(
    Plot.plot({
    width: width,
    height: width * 0.33,
    marginLeft: 50,
    y: {
      label: null
    },
    x: {
      grid: true,
      inset: 6
    },
    marks: [
      Plot.boxX(raceData_2024.filter(d => d.assigned_wave_number != null && d.assigned_wave_number != 'VIP'), {
        x: "ride_time_finish_decimal", 
        y: "assigned_wave_number",
        fill: rideBlue,
        fillOpacity: 0.3,
      })
    ]
  })
)

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

const aggregatedColumns = [
            "wave",
            "count",
            "median",
            "avg",
            "deviation",
            "outliers",
            "iqr",
            "kurt",
            "outliersPerc",
            "percentile10",
            "percentile20",
            "percentile30",
            "percentile40",
            "percentile50",
            "percentile60",
            "percentile70",
            "percentile80",
            "percentile90",
        ]
const aggregatedHeaders = {
            wave: "Mov. Month",
            count: "Riders",
            median: "Median",
            avg: "Mean",
            deviation: "Std. Dev.",
            kurt: "Kurtosis",
            percentile10: "10%",
            percentile20: "20%",
            percentile30: "30%",
            percentile40: "40%",
            percentile50: "50%",
            percentile60: "60%",
            percentile70: "70%",
            percentile80: "80%",
            percentile90: "90%",               
        }

display(
        Inputs.table(waveStats, {
            columns: aggregatedColumns,
            header: aggregatedHeaders,
            select: false,
        })
    )
```

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
        color: {
          scheme: "viridis"
        },
        marks: [
            Plot.dot(combinedRaceData.filter(d => d.raceLength == '100' && d.year == 2024), {
                x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
                y: "rider_no",
                opacity: d => d.is_early_starter == "True" ? 1 : d.is_late_starter == "True" ? 1 : 0.3,
                stroke: d => d.is_early_starter == "True" ? "lightcoral" : d.is_late_starter == "True" ? "lightBlue" : "lightGrey",
                // stroke: "assigned_wave_number", 
                r: 2,
            }),
            Plot.ruleX(startLines, {
              x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
              y1: "y1",
              y2: "y2",
              strokeWidth: 2,
            }),
            Plot.ruleX(endLines, {
              x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
              y1: "y1",
              y2: "y2",
              strokeWidth: 2,
              strokeDash: 0.5,
            }),
        ]
        })
)
```

```js
  const leaveCategoryRaceData = combinedRaceData.filter(d => d.year == 2024).map(item => {
  let leave_type = "On-Time";
  if (item.is_early_starter == "True") {
    leave_type = "Early";
  } else if (item.is_late_starter == "True") {
    leave_type = "Late";
  }

  return {
    ...item,
    leave_type,
  };
});

const total = leaveCategoryRaceData.length;
const grouped = leaveCategoryRaceData.reduce((acc, item) => {
  acc[item.leave_type] = (acc[item.leave_type] || 0) + 1;
  return acc;
}, {});

const leaveProportions = Object.entries(grouped).map(([type, count]) => ({
  leave_type: type,
  count,
  proportion: count / total
}));

display(
  Plot.plot({
    width: width * 0.7,
    height: width * 0.5,
    marginLeft: 50,
    marginTop: 25,
    title: `22% of riders did not start in their alloted time.`,
    y: {
      grid: true,
      domain: [0, 1],
      label: "Perc. of Riders",
      tickFormat: d => `${d3.format('.0%')(d)}`,
    },
    x: {
      label: null,
    },
    color: {
      domain: ['On-Time', 'Late',  'Early'],
      range: [rideBlue, 'lightBlue', 'lightcoral'],
    },
    marks: [
      Plot.barY(leaveProportions, {
        x: "leave_type",
        y: "proportion",
        sort: {x: "y", reverse: true},
        fill: "leave_type",
      }),
      Plot.text(leaveProportions, {
        x: "leave_type",
        y: "proportion",
        textAnchor: "middle",
        dy: -20,
        text: d => ` ${d3.format('.0%')(d.proportion)}`,
        sort: {x: "y", reverse: true}
      }),
      Plot.text(leaveProportions, {
        x: "leave_type",
        y: "proportion",
        textAnchor: "middle",
        dy: -8,
        text: "count",
        sort: {x: "y", reverse: true}
      }),
      Plot.ruleY([0])
    ]
  })
)
```

If this assumption is true, that means that 12% of riders (2156) began the race earlier than specified and 15% (2704) began later than instructed. Meaning over a quarter of riders did not begin in their original starting wave.

---

## How did this effect the race?

From our riders assigned waves, we can see that the intended starting process was to allow a smaller group of faster riders to leave first, followed by even groups of riders of ~4000 people per wave.

However, there was an overlapping of people from wave 2 starting later in the day, and wave 5 starting earlier. With over 55% of the total race riders (or ~10,000 people) leaving in waves 3 and 4.

<div class="grid grid-cols-2">
  <div>
    ${Plot.plot({
      title: 'Riders Assigned Starts',
      y: {grid: true, domain: [0, 6000]},
      x: {label: 'Assigned Start Wave'},
      height: width * 0.5,
      marks: [
        Plot.barY(raceData_100.filter(d => d.year == 2024 && d.assigned_wave_number != 'VIP'), Plot.groupX(
          { y: "count" }, { 
            x: "assigned_wave_number", 
            fill: rideBlue
          })),
        Plot.text(raceData_100.filter(d => d.year == 2024 && d.assigned_wave_number != 'VIP'), Plot.groupX(
          { y: "count" }, { 
            x: "assigned_wave_number", 
            dy: - 8,
            text: d => d.length,
          })),
          Plot.ruleY([0]),
      ]
    })}
  </div>
  <div>
    ${Plot.plot({
      title: 'Riders Actual Starts',
      y: {grid: true, domain: [0, 6000]},
      x: {label: 'Actual Start Wave'},
      height: width * 0.5,
      marks: [
        Plot.barY(raceData_100.filter(d => d.year == 2024 && d.assigned_start_wave != null), Plot.groupX(
          { y: "count" }, { 
            x: "assigned_start_wave", 
            fill: rideBlue
          })),
        Plot.text(raceData_100.filter(d => d.year == 2024 && d.assigned_start_wave != null), Plot.groupX(
          { y: "count" }, { 
            x: "assigned_start_wave", 
            dy: -8,
            text: d => d.length,
          })),
          Plot.ruleY([0]),
      ]
    })}
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
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "regular", riders: +d.regular_riders },
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "early", riders: +d.early_starters },
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "late", riders: +d.late_starters },
  { hour: +d.hour, bucket: d.estimated_distance_bucket, type: "total_riders", riders: +d.total_riders }
])

const loopRaceSim = riderDistributionLong.filter(d => counter == d.hour)
```

```js
const withoutRestStops = (d3.range(0, 100, 5)).map(String)
const withRestStops = withoutRestStops.toSpliced(6, 0, "Stop 25").toSpliced(12, 0, "Stop 53").toSpliced(17, 0, "Stop 73")
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


function raceSimGraph(data) {
  return Plot.plot({
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
    color: {
      legend: true,
    },
    marks: [
      Plot.barY(data.filter(d => d.type != 'total_riders'), {
        x: "bucket",
        y: "riders",
        fill: "type",
        stack: "y"
      }),
    ]
  })
}
```

### 7AM

```js
  raceSimGraph(riderDistributionLong.filter(d => 7 == d.hour))
```

### 8AM

```js
  raceSimGraph(riderDistributionLong.filter(d => 8 == d.hour))
```

### 9AM

```js
  raceSimGraph(riderDistributionLong.filter(d => 9 == d.hour))
```

### 10AM

```js
  raceSimGraph(riderDistributionLong.filter(d => 10 == d.hour))
```

### 12PM

```js
  raceSimGraph(riderDistributionLong.filter(d => 12.25 == d.hour))
```

### 1PM

```js
  raceSimGraph(riderDistributionLong.filter(d => 13 == d.hour))
```

This crowding in the 3rd and 4th waves led to some significant moments of overcrowding during the beginning of the day. Most notably:

 



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