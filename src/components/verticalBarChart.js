import * as Plot from "npm:@observablehq/plot";
import { rideBlue, barChartHeightRatio } from "./constants.js";

// The one simple categorical vertical bar chart, used everywhere a chart is
// just "one bar per category, maybe faceted, maybe with a value label on
// top." Every plot built from this shares the same height/width ratio so
// they all sit consistently on the page regardless of container width.
//
// Not for: stacked bars (multiple series per category), histograms (binned
// continuous data), or anything that needs its own bespoke layout - those
// stay as their own components.

export function verticalBarChart(data, width, {
  x,
  y,
  fill = rideBlue,
  xDomain,
  xLabel = null,
  yDomain,
  yLabel = null,
  yTickFormat,
  title,
  color,
  fx,
  fxDomain,
  group = false,
  label,
  secondaryLabel,
  marginLeft = 50,
  marginTop = 25,
} = {}) {
  if (group && !label) label = d => d.length;

  // group mode counts rows per x category itself, so y/count is an *output*
  // of the groupX transform rather than a channel we already have.
  const bar = group
    ? Plot.barY(data, Plot.groupX({ y: "count" }, { x, fill }))
    : Plot.barY(data, { x, y, fill, fx });

  const labelMarks = [];
  if (label) {
    const dy = secondaryLabel ? -20 : -8;
    labelMarks.push(
      group
        ? Plot.text(data, Plot.groupX({ y: "count" }, { x, dy, text: label }))
        : Plot.text(data, { x, y, dy, text: label, fx })
    );
  }
  if (secondaryLabel) {
    labelMarks.push(
      group
        ? Plot.text(data, Plot.groupX({ y: "count" }, { x, dy: -8, text: secondaryLabel }))
        : Plot.text(data, { x, y, dy: -8, text: secondaryLabel, fx })
    );
  }

  return Plot.plot({
    title,
    width,
    height: width * barChartHeightRatio,
    marginLeft,
    marginTop,
    color,
    fx: fx ? { label: null, domain: fxDomain } : undefined,
    x: { label: xLabel, type: "band", domain: xDomain },
    y: { label: yLabel, domain: yDomain, grid: true, tickFormat: yTickFormat },
    marks: [bar, ...labelMarks, Plot.ruleY([0])],
  });
}
