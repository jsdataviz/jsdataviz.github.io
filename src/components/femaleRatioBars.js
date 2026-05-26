import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { raceColors } from "./constants.js";

export function femaleRatioBars(data, distance, width) {
  const graphData = data.filter(d => d.raceDistance == distance);
  return Plot.plot({
    width: width,
    height: 400,
    marginLeft: 50,
    marginTop: 25,
    title: `${distance} miles`,
    x: { label: null, type: "band" },
    y: {
      label: "Perc. of Female Riders",
      domain: [0, 1],
      grid: true,
      tickFormat: d => `${d * 100}%`,
    },
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
      }),
    ],
  });
}
