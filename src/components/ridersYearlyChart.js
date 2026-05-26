import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { raceColors } from "./constants.js";

export function ridersYearlyChart(groupedYearlyData, width) {
  return Plot.plot({
    width: width,
    height: width < 568 ? 400 : width * 0.66,
    marginLeft: 50,
    marginTop: 25,
    marginBottom: 20,
    color: {
      legend: true,
      domain: Object.keys(raceColors),
      range: Object.values(raceColors),
    },
    y: { grid: true, label: "Riders", nice: true },
    x: { type: "band" , label: null,},
    marks: [
      Plot.barY(groupedYearlyData, {
        x: d => String(d.year),
        y: "riders",
        fill: "raceLength",
      }),
      Plot.text(groupedYearlyData, {
        x: d => String(d.year),
        y: d => d3.sum(groupedYearlyData.filter(x => x.year == d.year).map(z => z.riders)),
        text: d => d3.sum(groupedYearlyData.filter(x => x.year == d.year).map(z => z.riders)),
        dy: -8,
      }),
      Plot.ruleY([0]),
    ],
  });
}
