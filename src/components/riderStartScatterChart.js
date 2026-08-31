import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue, riderHighlightColor, parseStartTod as parseTime, formatClock } from "./constants.js";

// VIP riders can start any time through the day, so the start-time axis has
// a long, sparse tail out past 9am. On desktop that's fine - there's width
// to spare - but on mobile, where time runs down the (limited) height, that
// tail stretches the axis and leaves most of the chart empty. Cap to
// pre-9am starters there so the vertical space is spent on where the data
// actually is.
const MOBILE_START_CUTOFF = parseTime("2024-05-26 09:00:00");

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
  filled = false,
  highlightRiderNo,
  // What the highlighted rider's tip says - defaults to their start time,
  // but callers with more context (assigned wave, early/late status) can
  // pass something more specific to that chart.
  highlightTitle = d => `You started at ${formatClock(parseTime(d.start_tod))}`,
} = {}) {
  // Below mobile width, the wave clusters get squeezed into too little
  // horizontal room - swap the axes so time runs vertically instead, where
  // a narrow screen actually has more room to spread them out.
  const mobile = width < 600;
  const plotData = mobile ? data.filter(d => parseTime(d.start_tod) < MOBILE_START_CUTOFF) : data;

  const dotOptions = { ...(filled ? { fill: stroke } : { stroke }), opacity, r: mobile ? 1.5 : r };
  const dot = mobile
    ? Plot.dot(plotData, { x: "rider_no", y: d => parseTime(d.start_tod), ...dotOptions })
    : Plot.dot(plotData, { x: d => parseTime(d.start_tod), y: "rider_no", ...dotOptions });

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

  // The rider entered in the intro input, if any - fully opaque, 1.5x the
  // size of the other dots with a black outline, drawn last (after dot,
  // rules and tip) so it sits on top of everything else.
  const highlightRow = plotData.find(d => d.rider_no == highlightRiderNo);
  const highlightR = (mobile ? 1.5 : r) * 1.5;
  const highlightDotOptions = { stroke: "black", fill: riderHighlightColor, opacity: 1, r: highlightR };
  // Anchored above the dot, pushed past its own edge (by its radius) so the
  // tip's pointer arrow starts outside the dot instead of inside it - same
  // treatment as the highlighted dot on startTimeScatterChart.
  const highlightTipOptions = { anchor: "bottom", dy: -highlightR, title: highlightTitle };
  const highlight = highlightRow
    ? [
        mobile
          ? Plot.dot([highlightRow], { x: "rider_no", y: d => parseTime(d.start_tod), ...highlightDotOptions })
          : Plot.dot([highlightRow], { x: d => parseTime(d.start_tod), y: "rider_no", ...highlightDotOptions }),
        mobile
          ? Plot.tip([highlightRow], { x: "rider_no", y: d => parseTime(d.start_tod), ...highlightTipOptions })
          : Plot.tip([highlightRow], { x: d => parseTime(d.start_tod), y: "rider_no", ...highlightTipOptions }),
      ]
    : [];

  return Plot.plot({
    inset: 6,
    height: 650,
    width: width,
    marginLeft: mobile ? undefined : 60,
    marginTop: mobile ? undefined : 50,
    grid: true,
    color: colorScheme ? { scheme: colorScheme } : undefined,
    x: mobile
      ? { label: "Rider Number" }
      : { label: "Start Time of Day", type: "time" },
    y: mobile
      ? { label: "Start Time of Day", type: "time", reverse: true }
      : { label: "Rider Number", grid: true },
    marks: [dot, ...rules, ...tip, ...highlight],
  });
}
