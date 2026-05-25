import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function waveStartBar(title, xLabel, data, xField, width) {
  return Plot.plot({
    title: title,
    y: { grid: true, domain: [0, 6000] },
    x: { label: xLabel },
    height: width * 0.5,
    marks: [
      Plot.barY(data, Plot.groupX({ y: "count" }, { x: xField, fill: rideBlue })),
      Plot.text(data, Plot.groupX({ y: "count" }, { x: xField, dy: -8, text: d => d.length })),
      Plot.ruleY([0]),
    ],
  });
}
