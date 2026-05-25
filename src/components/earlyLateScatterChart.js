import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { startLines, endLines } from "./constants.js";

export function earlyLateScatterChart(data, width) {
  return Plot.plot({
    inset: 6,
    height: 650,
    width: width,
    marginLeft: 60,
    grid: true,
    y: { label: "Rider Number", grid: true },
    x: { label: "Start Time of Day", type: "time" },
    color: { scheme: "viridis" },
    marks: [
      Plot.dot(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "rider_no",
        opacity: d => d.is_early_starter == "True" ? 1 : d.is_late_starter == "True" ? 1 : 0.3,
        stroke: d => d.is_early_starter == "True" ? "lightcoral" : d.is_late_starter == "True" ? "lightBlue" : "lightGrey",
        r: 2,
      }),
      Plot.ruleX(startLines, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
        y1: "y1",
        y2: "y2",
        strokeWidth: 2,
      }),
      Plot.ruleX(endLines, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
        y1: "y1",
        y2: "y2",
        strokeWidth: 2,
        strokeDash: 0.5,
      }),
    ],
  });
}
