import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function waveTimeHistogramChart(data, width) {
  return Plot.plot({
    marginRight: 50,
    width: width * 0.66,
    height: width * 0.75,
    y: { grid: true, label: "Riders" },
    x: { grid: true, label: "Total Ride Time (Hours)" },
    fy: { axis: "right", label: null },
    marks: [
      Plot.rectY(
        data.filter(d => d.assigned_wave_number != null && d.assigned_wave_number != "VIP"),
        Plot.binX({ y: "count" }, {
          x: "ride_time_finish_decimal",
          fy: "assigned_wave_number",
          fill: rideBlue,
        })
      ),
      Plot.ruleY([0]),
    ],
  });
}
