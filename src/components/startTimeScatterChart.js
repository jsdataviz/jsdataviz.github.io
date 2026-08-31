import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue, riderHighlightColor, formatRaceTime } from "./constants.js";

export function startTimeScatterChart(data, width, { highlightRiderNo } = {}) {
  const mobile = width < 600;
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
  const highlightData = data.filter(d => d.rider_no == highlightRiderNo);
  const baseR = mobile ? 1 : 3;

  // Match Plot.linearRegressionY's OLS fit ourselves so we know which side
  // of the red line the highlighted rider's dot lands on. The tip still
  // anchors to the dot itself either way - only which side of the dot it
  // opens on flips, so it never renders on top of the regression line.
  const xNum = d => +parseTime(d.start_tod);
  const meanX = d3.mean(data, xNum);
  const meanY = d3.mean(data, d => d.final_time_decimal);
  const slope = d3.sum(data, d => (xNum(d) - meanX) * (d.final_time_decimal - meanY)) /
                d3.sum(data, d => (xNum(d) - meanX) ** 2);
  const intercept = meanY - slope * meanX;
  const highlightRider = highlightData[0];
  const highlightR = baseR * 1.5;
  // Dot above the line -> open the tip downward ("top" anchor puts the
  // dot at the top of the tip box, i.e. the box hangs below it) so it
  // can't overlap the line sitting just above. Dot below (or on) the
  // line -> open it upward instead.
  const tipAnchor = highlightRider && highlightRider.final_time_decimal > slope * xNum(highlightRider) + intercept
    ? "top"
    : "bottom";
  // Push the anchor point past the dot's own edge, so the tip's pointer
  // arrow starts outside the dot instead of inside it.
  const tipDy = tipAnchor === "top" ? highlightR : -highlightR;

  return Plot.plot({
    title: "Riders who were assigned earlier starts generally finished faster than later riders.",
    inset: 6,
    height: mobile ? width * 0.85 : width * 0.65,
    width: width,
    marginLeft: mobile ? 22 : 60,
    grid: true,
    y: { label: "Ride Time - inc. stops (hours)", grid: true },
    x: { label: "Start Time of Day", type: "time" },
    marks: [
      Plot.dot(data, {
        x: d => parseTime(d.start_tod),
        y: "final_time_decimal",
        stroke: rideBlue,
        opacity: 0.4,
        r: baseR,
      }),
      Plot.linearRegressionY(data, {
        x: d => parseTime(d.start_tod),
        y: "final_time_decimal",
        stroke: "red",
      }),
      // The rider entered in the intro input, if any - fully opaque, 1.5x
      // the size of the other dots with a black outline, drawn last so it
      // sits on top of everything else.
      ...(highlightData.length
        ? [
            Plot.dot(highlightData, {
              x: d => parseTime(d.start_tod),
              y: "final_time_decimal",
              stroke: "black",
              fill: riderHighlightColor,
              opacity: 1,
              r: highlightR,
            }),
            Plot.tip(highlightData, {
              x: d => parseTime(d.start_tod),
              y: "final_time_decimal",
              anchor: tipAnchor,
              dy: tipDy,
              title: d => `You finished in ${formatRaceTime(d.final_time_decimal)} hours`,
            }),
          ]
        : []),
    ],
  });
}
