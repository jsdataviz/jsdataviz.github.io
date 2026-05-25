import * as Plot from "npm:@observablehq/plot";
import { rideBlue } from "./constants.js";

export function waveBoxPlotChart(data, width) {
  return Plot.plot({
    width: width,
    height: width * 0.33,
    marginLeft: 50,
    y: { label: null },
    x: { grid: true, inset: 6 },
    marks: [
      Plot.boxX(
        data.filter(d => d.assigned_wave_number != null && d.assigned_wave_number != "VIP"),
        {
          x: "ride_time_finish_decimal",
          y: "assigned_wave_number",
          fill: rideBlue,
          fillOpacity: 0.3,
        }
      ),
    ],
  });
}
