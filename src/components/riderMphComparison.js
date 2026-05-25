import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function riderMphComparison(title, comparisons, width) {
  return Plot.plot({
    title: title,
    width: width * 0.6,
    height: 300,
    marginLeft: 160,
    x: { label: "Average mph (finish)", grid: true },
    marks: [
      Plot.barX(comparisons, {
        x: "mph",
        y: "label",
        fill: rideBlue,
        sort: { y: "x" },
      }),
      Plot.ruleX([0]),
    ],
  });
}
