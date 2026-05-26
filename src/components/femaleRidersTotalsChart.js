import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { raceColors } from "./constants.js";

export function femaleRidersTotalsChart(groupedFemaleData, width) {
  return Plot.plot({
    width: width,
    height: width * 0.66,
    marginLeft: 50,
    marginTop: 25,
    y: { grid: true, label: "Female Riders" },
    x: { label: "Ride Year", type: "band" },
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
      Plot.ruleY([0]),
    ],
  });
}
