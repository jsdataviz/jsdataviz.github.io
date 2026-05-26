import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

export function riderNoScatterSimpleChart(data, width) {
  return Plot.plot({
    inset: 6,
    height: 650,
    marginTop: 50,
    width: width,
    marginLeft: 60,
    grid: true,
    y: { label: "Rider Number", grid: true },
    x: { label: "Start Time of Day", type: "time" },
    marks: [
      Plot.dot(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "rider_no",
        stroke: rideBlue,
        opacity: 0.5,
        r: 2,
      }),
    ],
  });
}
