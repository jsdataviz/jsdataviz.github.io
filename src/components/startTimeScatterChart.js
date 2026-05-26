import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

export function startTimeScatterChart(data, width) {
  return Plot.plot({
    title: "Riders who were assigned earlier starts generally finished faster than later riders.",
    inset: 6,
    height: 650,
    width: width,
    marginLeft: 60,
    grid: true,
    y: { label: "Total Ride Time (hours)", grid: true },
    x: { label: "Start Time of Day", type: "time" },
    marks: [
      Plot.dot(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "ride_time_finish_decimal",
        stroke: rideBlue,
      }),
      Plot.linearRegressionY(data, {
        x: d => d3.timeParse("%Y-%m-%d %H:%M:%S")(d.start_tod),
        y: "ride_time_finish_decimal",
        stroke: "red",
      }),
      Plot.link([1], {
        x1: d3.timeParse("%Y-%m-%d %H:%M:%S")("2024-05-26 06:00:04"),
        x2: d3.timeParse("%Y-%m-%d %H:%M:%S")("2024-05-26 09:45:04"),
        y1: 12.90,
        y2: 9.10,
        strokeDasharray: 4,
        stroke: "black",
      }),
      Plot.tip(
        ["The dreaded sweeper bus that collects any riders who have not fished by 6pm sets the upper limit of how long riders can take throughout the day."],
        {
          x: d3.timeParse("%Y-%m-%d %H:%M:%S")("2024-05-26 08:00:04"),
          y: 11,
          frameAnchor: "bottom",
        }
      ),
    ],
  });
}
