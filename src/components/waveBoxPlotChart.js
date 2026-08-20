import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function waveBoxPlotChart(data, width) {
  // Five horizontal boxes need real width for their whiskers to read - below
  // mobile width there isn't enough of it, so flip to vertical boxes, which
  // trade the width they don't have for the height a narrow screen does.
  const mobile = width < 600;
  const filtered = data.filter(d => d.assigned_wave_number != null && d.assigned_wave_number != "VIP");
  // Fill the phone screen rather than following width - fall back to a
  // width-based guess if window isn't available (e.g. during a static build).
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : width * 1.5;

  return Plot.plot({
    width: width,
    height: mobile ? viewportHeight * 0.9 : width * 0.33,
    marginLeft: mobile ? undefined : 50,
    x: mobile ? { label: null } : { grid: true, inset: 6 },
    y: mobile ? { grid: true, inset: 6, label: "Ride Time (hours)" } : { label: null },
    marks: [
      mobile
        ? Plot.boxY(filtered, {
            x: "assigned_wave_number",
            y: "ride_time_finish_decimal",
            fill: rideBlue,
            fillOpacity: 0.3,
          })
        : Plot.boxX(filtered, {
            x: "ride_time_finish_decimal",
            y: "assigned_wave_number",
            fill: rideBlue,
            fillOpacity: 0.3,
          }),
    ],
  });
}
