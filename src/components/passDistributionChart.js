import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function passDistributionChart(title, xField, xLabel, data, width) {
  return Plot.plot({
    title: title,
    marginLeft: 60,
    width: width,
    x: { label: xLabel },
    y: { label: "Count", grid: true },
    fx: { label: null },
    marks: [
      Plot.rectY(
        data,
        Plot.binX(
          { y: "count" },
          { x: xField, fill: rideBlue, fillOpacity: 0.7, fx: "starter_type" }
        )
      ),
      Plot.ruleY([0]),
    ],
  });
}
