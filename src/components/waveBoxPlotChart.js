import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue, riderHighlightColor } from "./constants.js";

export function waveBoxPlotChart(data, width, {
  category = "assigned_wave_number",
  categoryDomain,
  categoryTickFormat,
  value = "ride_time_finish_decimal",
  valueLabel = "Ride Time (hours)",
  centerOnZero = false,
  marginLeft = 50,
  highlightData = [],
} = {}) {
  // Five horizontal boxes need real width for their whiskers to read - below
  // mobile width there isn't enough of it, so flip to vertical boxes, which
  // trade the width they don't have for the height a narrow screen does.
  const mobile = width < 600;
  const filtered = data.filter(d => d[category] != null && d[category] != "VIP");
  // Fill the phone screen rather than following width - fall back to a
  // width-based guess if window isn't available (e.g. during a static build).
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : width * 1.5;

  // For a value that can go either side of zero (e.g. net passes), balance
  // the axis so 0 sits in the middle rather than wherever the data's actual
  // min/max happen to land, and mark the zero line itself.
  const maxAbs = centerOnZero ? d3.max(filtered, d => Math.abs(+d[value])) || 1 : undefined;
  const valueDomain = centerOnZero ? [-maxAbs, maxAbs] : undefined;
  const zeroRule = centerOnZero ? [mobile ? Plot.ruleY([0]) : Plot.ruleX([0])] : [];

  // The rider entered in the intro input, if any - a rule confined to their
  // own wave's band (a tick, not a full-width/height line) so it reads as
  // "here's where you sit within your group" rather than crossing every box.
  // Drawn last so it sits on top of the box.
  const highlight = highlightData.length
    ? [mobile
        ? Plot.tickY(highlightData, { x: category, y: value, stroke: riderHighlightColor, strokeWidth: 3 })
        : Plot.tickX(highlightData, { y: category, x: value, stroke: riderHighlightColor, strokeWidth: 3 })]
    : [];

  return Plot.plot({
    width: width,
    height: mobile ? viewportHeight * 0.9 : width * 0.33,
    marginLeft: mobile ? undefined : marginLeft,
    x: mobile ? { label: null, domain: categoryDomain, tickFormat: categoryTickFormat } : { grid: true, inset: 6, domain: valueDomain, label: valueLabel },
    y: mobile ? { grid: true, inset: 6, label: valueLabel, domain: valueDomain } : { label: null, domain: categoryDomain, tickFormat: categoryTickFormat },
    marks: [
      mobile
        ? Plot.boxY(filtered, {
            x: category,
            y: value,
            fill: rideBlue,
            fillOpacity: 0.3,
          })
        : Plot.boxX(filtered, {
            x: value,
            y: category,
            fill: rideBlue,
            fillOpacity: 0.3,
          }),
      ...zeroRule,
      ...highlight,
    ],
  });
}
