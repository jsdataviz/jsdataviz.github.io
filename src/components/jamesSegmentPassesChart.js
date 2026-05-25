import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function jamesSegmentPassesChart(jamesPassData, width) {
  return Plot.plot({
    title: "James's passes and times passed — by segment",
    width: width,
    height: 350,
    marginLeft: 100,
    x: { label: "Riders", grid: true },
    y: { label: null },
    color: {
      legend: true,
      domain: ["Passed", "Passed by"],
      range: [rideBlue, "tomato"],
    },
    marks: [
      Plot.barX(
        jamesPassData.flatMap(d => [
          { segment: d.segment, type: d.type, metric: "Passed",    value:  d.passed },
          { segment: d.segment, type: d.type, metric: "Passed by", value: -d.passed_by },
        ]),
        { x: "value", y: "segment", fill: "metric", rx: 2 }
      ),
      Plot.ruleX([0]),
      Plot.text(jamesPassData, {
        x: 0,
        y: "segment",
        text: d => d.type,
        textAnchor: "middle",
        dy: -10,
        fontSize: 10,
        fill: d => d.type === "Rest" ? "darkorange" : "grey",
      }),
    ],
  });
}
