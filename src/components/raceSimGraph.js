import * as Plot from "npm:@observablehq/plot";

const withoutRestStops = Array.from({ length: 20 }, (_, i) => String(i * 5));
export const withRestStops = withoutRestStops
  .toSpliced(6, 0, "Stop 25")
  .toSpliced(12, 0, "Stop 53")
  .toSpliced(17, 0, "Stop 73");

export function raceSimGraph(data, width) {
  return Plot.plot({
    width: width,
    height: 0.44 * width,
    y: { grid: true, label: "Number of Riders", domain: [0, 3500] },
    x: { domain: withRestStops, type: "band", label: "Distance (Miles)" },
    color: { legend: true },
    marks: [
      Plot.barY(data.filter(d => d.type != "total_riders"), {
        x: "bucket",
        y: "riders",
        fill: "type",
        stack: "y",
      }),
    ],
  });
}
