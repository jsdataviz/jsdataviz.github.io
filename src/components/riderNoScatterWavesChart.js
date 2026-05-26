import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { startLines, startLabels } from "./constants.js";

export function riderNoScatterWavesChart(data, width) {
  return Plot.plot({
    inset: 6,
    height: 650,
    width: width,
    marginLeft: 60,
    marginTop: 50,
    grid: true,
    color: { scheme: "viridis" },
    y: { label: "Rider Number", grid: true },
    x: { label: "Start Time of Day", type: "time" },
    marks: [
      Plot.dot(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "rider_no",
        r: 2,
        stroke: "assigned_wave_number",
      }),
      Plot.ruleX(startLines, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
        y1: "y1",
        y2: "y2",
        strokeWidth: 2,
      }),
      Plot.tip(startLabels, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.x),
        y: "y",
        dy: -2,
        title: "label",
      }),
    ],
  });
}
