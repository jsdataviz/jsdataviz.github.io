import * as Plot from "npm:@observablehq/plot";

export function riderPathsSimplifiedChart(linkData, highlightedData, width) {
  return Plot.plot({
    width: width / 4,
    height: 900,
    x: {
      axis: "top",
      type: "point",
      domain: ["rider_pos_start", "rider_pos_finish"],
      padding: 0,
      label: null,
    },
    y: { axis: null, reverse: true },
    marks: [
      Plot.link(linkData, {
        x1: () => "rider_pos_start",
        x2: () => "rider_pos_finish",
        y1: "rider_pos_start",
        y2: "rider_pos_finish",
        opacity: 0.2,
        strokeWidth: 0.2,
      }),
      Plot.link(highlightedData, {
        x1: () => "rider_pos_start",
        x2: () => "rider_pos_finish",
        y1: "rider_pos_start",
        y2: "rider_pos_finish",
        stroke: "tomato",
      }),
    ],
  });
}
