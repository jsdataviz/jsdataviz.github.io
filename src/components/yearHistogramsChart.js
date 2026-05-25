import * as Plot from "npm:@observablehq/plot";

export function yearHistogramsChart(data, width) {
  return Plot.plot({
    inset: 6,
    height: 650,
    width: width,
    marginLeft: 60,
    color: {
      scheme: "tableau10",
      type: "categorical",
      legend: true,
    },
    y: { label: "Number of Riders", grid: true },
    x: { label: "Ride Time Hours" },
    marks: [
      Plot.rectY(
        data,
        Plot.binX({ y2: "count" }, { x: "final_time_decimal", fill: "year", mixBlendMode: "multiply" })
      ),
      Plot.ruleY([0]),
    ],
  });
}
