import * as Plot from "npm:@observablehq/plot";

const withoutRestStops = Array.from({ length: 20 }, (_, i) => String(i * 5));
export const withRestStops = withoutRestStops
  .toSpliced(6, 0, "Stop 25")
  .toSpliced(12, 0, "Stop 53")
  .toSpliced(17, 0, "Stop 73");

export function raceSimGraph(data, width) {
  // Rotated tick labels need more room below the axis than a horizontal
  // label does - push the plot area up (marginBottom) and grow the canvas
  // by the same amount so the bars themselves don't get squished.
  const mobile = width < 600;
  const marginBottom = mobile ? 80 : 30;
  const heightRatio = mobile ? 0.58 : 0.44;
  return Plot.plot({
    width: width,
    height: heightRatio * width + (mobile ? marginBottom - 30 : 0),
    marginBottom,
    y: { grid: true, label: "Number of Riders", domain: [0, 3500] },
    x: { domain: withRestStops, type: "band", label: "Distance (Miles)", tickRotate: mobile ? -45 : 0 },
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
