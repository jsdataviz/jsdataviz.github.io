import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

export function leaveProportionsChart(leaveProportions, width) {
  return Plot.plot({
    width: width * 0.7,
    height: width * 0.5,
    marginLeft: 50,
    marginTop: 25,
    title: "22% of riders did not start in their alloted time.",
    y: {
      grid: true,
      domain: [0, 1],
      label: "Perc. of Riders",
      tickFormat: d => `${d3.format(".0%")(d)}`,
    },
    x: { label: null },
    color: {
      domain: ["On-Time", "Late", "Early"],
      range: [rideBlue, "lightBlue", "lightcoral"],
    },
    marks: [
      Plot.barY(leaveProportions, {
        x: "leave_type",
        y: "proportion",
        sort: { x: "y", reverse: true },
        fill: "leave_type",
      }),
      Plot.text(leaveProportions, {
        x: "leave_type",
        y: "proportion",
        textAnchor: "middle",
        dy: -20,
        text: d => ` ${d3.format(".0%")(d.proportion)}`,
        sort: { x: "y", reverse: true },
      }),
      Plot.text(leaveProportions, {
        x: "leave_type",
        y: "proportion",
        textAnchor: "middle",
        dy: -8,
        text: "count",
        sort: { x: "y", reverse: true },
      }),
      Plot.ruleY([0]),
    ],
  });
}
