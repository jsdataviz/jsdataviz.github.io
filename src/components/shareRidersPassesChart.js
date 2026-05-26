import * as Plot from "npm:@observablehq/plot";

export function shareRidersPassesChart(proportionMelted, width) {
  return Plot.plot({
    title: "Share of riders vs share of pass events, by start group",
    width: width,
    marginLeft: 60,
    fx: { label: null, domain: ["On Time", "Early", "Late"] },
    x: { label: null, axis: null },
    y: { label: "Share of total (%)", grid: true },
    color: {
      legend: true,
      domain: ["Share of riders", "Share of passes"],
      range: ["#aaa", "steelblue"],
    },
    marks: [
      Plot.barY(proportionMelted, {
        x: "series",
        y: "value",
        fill: "series",
        fx: "starter_type",
      }),
      Plot.ruleY([0]),
    ],
  });
}
