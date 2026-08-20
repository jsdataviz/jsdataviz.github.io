import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

export function startTimeScatterChart(data, width) {
  return Plot.plot({
    title: "Riders who were assigned earlier starts generally finished faster than later riders.",
    inset: 6,
    height: width * 0.65,
    width: width,
    marginLeft: width < 600 ? 35 : 60,
    grid: true,
    y: { label: "Ride Time - exc. stops (hours)", grid: true },
    x: { label: "Start Time of Day", type: "time" },
    marks: [
      Plot.dot(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "final_time_decimal",
        stroke: rideBlue,
        opacity: 0.4,
      }),
      Plot.linearRegressionY(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "final_time_decimal",
        stroke: "red",
      }),
    ],
  });
}
