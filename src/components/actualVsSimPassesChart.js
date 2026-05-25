import * as Plot from "npm:@observablehq/plot";

export function actualVsSimPassesChart(simCompMelted, width) {
  return Plot.plot({
    title: "Average pass events per rider: actual vs simulated, by start group",
    width: width,
    marginLeft: 60,
    fx: { label: null, domain: ["On Time", "Early", "Late"] },
    x: { label: null, axis: null },
    y: { label: "Avg pass events per rider", grid: true },
    color: {
      legend: true,
      domain: ["Actual", "Simulated"],
      range: ["steelblue", "tomato"],
    },
    marks: [
      Plot.barY(simCompMelted, {
        x: "scenario",
        y: "value",
        fill: "scenario",
        fx: "starter_type",
      }),
      Plot.ruleY([0]),
    ],
  });
}
