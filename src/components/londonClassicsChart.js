import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

export function londonClassicsChart(londonClassicData, width) {
  return Plot.plot({
    marginLeft: 50,
    marginTop: 25,
    width: width,
    title: "Female Participants in London Classic events",
    x: {
      label: null,
      domain: ["Serpentine 2 Mile Swim", "London Marathon", "Ride London 100"],
    },
    y: {
      label: "Perc. of Female Participants",
      domain: [0, 1],
      grid: true,
      tickFormat: d => `${d3.format(".0%")(d)}`,
    },
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
      }),
    ],
  });
}
