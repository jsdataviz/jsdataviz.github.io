import * as Plot from "npm:@observablehq/plot";
import { raceCheckpoints, checkpointMiles } from "./constants.js";

export function riderPathsSingleChart(linkData, highlightedData, width) {
  return Plot.plot({
    width: width,
    height: 900,
    x: {
      axis: "top",
      label: "miles",
      domain: [0, 100],
      ticks: Object.values(checkpointMiles),
      tickFormat: d => `${d}mi`,
    },
    y: { axis: null, reverse: true },
    marks: [
      ...raceCheckpoints.slice(0, -1).flatMap((cp, i) => [
        Plot.link(linkData, {
          x1: () => checkpointMiles[cp],
          x2: () => checkpointMiles[raceCheckpoints[i + 1]],
          y1: cp,
          y2: raceCheckpoints[i + 1],
          opacity: 0.2,
          strokeWidth: 0.2,
        }),
        Plot.link(highlightedData, {
          x1: () => checkpointMiles[cp],
          x2: () => checkpointMiles[raceCheckpoints[i + 1]],
          y1: cp,
          y2: raceCheckpoints[i + 1],
          stroke: "tomato",
        }),
      ]),
    ],
  });
}
