import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

// Rider number vs. start time of day - the one scatter shape used across all
// three stages of "did riders start when they were supposed to": plain, then
// coloured by assigned wave (with wave-start lines + labels), then coloured
// by early/late starter (with wave-start and wave-end lines).
export function riderStartScatterChart(data, width, {
  stroke = rideBlue,
  opacity = 1,
  r = 2,
  colorScheme,
  ruleLines = [],
  tipData,
} = {}) {
  // Below mobile width, the wave clusters get squeezed into too little
  // horizontal room - swap the axes so time runs vertically instead, where
  // a narrow screen actually has more room to spread them out.
  const mobile = width < 600;

  const dot = mobile
    ? Plot.dot(data, { x: "rider_no", y: d => parseTime(d.start_tod), stroke, opacity, r })
    : Plot.dot(data, { x: d => parseTime(d.start_tod), y: "rider_no", stroke, opacity, r });

  const rules = ruleLines.map(({ data: lineData, dashed }) =>
    mobile
      ? Plot.ruleY(lineData, { y: d => parseTime(d.x), x1: "y1", x2: "y2", strokeWidth: 2, ...(dashed && { strokeDasharray: "4 2" }) })
      : Plot.ruleX(lineData, { x: d => parseTime(d.x), y1: "y1", y2: "y2", strokeWidth: 2, ...(dashed && { strokeDasharray: "4 2" }) })
  );

  const tip = tipData
    ? [mobile
        ? Plot.tip(tipData, { x: "y", y: d => parseTime(d.x), dy: -2, title: "label" })
        : Plot.tip(tipData, { x: d => parseTime(d.x), y: "y", dy: -2, title: "label" })]
    : [];

  return Plot.plot({
    inset: 6,
    height: 650,
    width: width,
    marginLeft: 60,
    marginTop: 50,
    grid: true,
    color: colorScheme ? { scheme: colorScheme } : undefined,
    x: mobile
      ? { label: "Rider Number" }
      : { label: "Start Time of Day", type: "time" },
    y: mobile
      ? { label: "Start Time of Day", type: "time", reverse: true }
      : { label: "Rider Number", grid: true },
    marks: [dot, ...rules, ...tip],
  });
}
