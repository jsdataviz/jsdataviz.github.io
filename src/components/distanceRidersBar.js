import * as Plot from "npm:@observablehq/plot";
import { raceColors } from "./constants.js";

export function distanceRidersBar(distance, rideTotals, width) {
  return Plot.plot({
    title: `${distance} Miles`,
    height: width * 0.66,
    width: width,
    marginLeft: 50,
    marginTop: 25,
    x: { label: null, type: "band" },
    y: { label: "Number of Riders", grid: true },
    marks: [
      Plot.barY(rideTotals.filter(d => d.distance == distance), {
        x: "year",
        y: "num_riders",
        fill: raceColors[distance],
      }),
      Plot.text(rideTotals.filter(d => d.distance == distance), {
        x: "year",
        y: "num_riders",
        text: "num_riders",
        dy: -6,
        lineAnchor: "bottom",
      }),
      Plot.ruleY([0]),
    ],
  });
}
