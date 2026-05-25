import * as Plot from "npm:@observablehq/plot";

export function avgPassesChart(avgMelted, width) {
  return Plot.plot({
    title: "Average passes by start-time group",
    marginLeft: 60,
    width: width,
    x: { label: null },
    y: { label: "Average passes", grid: true },
    color: { legend: true },
    marks: [
      Plot.barY(avgMelted, {
        x: "starter_type",
        y: "value",
        fill: "metric",
        fx: "metric",
      }),
      Plot.ruleY([0]),
    ],
  });
}
