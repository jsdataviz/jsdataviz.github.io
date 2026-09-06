import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { rideBlue } from "./constants.js";

const WAVES = ["Wave 1", "Wave 2", "Wave 3", "Wave 4", "Wave 5"];
const waveIndex = Object.fromEntries(WAVES.map((w, i) => [w, i]));

// Same early/late colour language as the rest of the page (the early/late
// riderStartScatterChart, the leave-proportions bar chart): lightcoral for
// riders who started earlier than their assigned wave, lightblue for later.
const EARLY_COLOR = "lightcoral";
const LATE_COLOR = "lightblue";

// Same assigned-wave -> actual-start-wave matrix as waveChordChart, as a
// heatmap instead - the chord is better for the "flow" story, this is
// better for reading an exact cell's count without hovering.
export function waveMigrationHeatmap(data, width) {
  const cells = WAVES.flatMap(assigned => WAVES.map(actual => ({ assigned, actual, count: 0 })));
  const lookup = new Map(cells.map(c => [`${c.assigned}|${c.actual}`, c]));

  data
    .filter(d => d.assigned_wave_number !== "VIP" && d.assigned_start_wave != null)
    .forEach(d => {
      const cell = lookup.get(`${d.assigned_wave_number}|${d.assigned_start_wave}`);
      if (cell) cell.count++;
    });

  // Colour by each cell's share of its *own row* (assigned wave), not raw
  // count - the waves aren't the same size (Wave 3 has ~2.5x Wave 1's
  // riders), so colouring by count just re-draws "which wave is biggest"
  // instead of "where did this wave's riders actually go". Count still
  // shows as the cell's text label.
  for (const assigned of WAVES) {
    const rowCells = cells.filter(c => c.assigned === assigned);
    const rowTotal = d3.sum(rowCells, c => c.count);
    for (const c of rowCells) c.pctOfRow = rowTotal ? c.count / rowTotal : 0;
  }

  // The diagonal (started in your assigned wave) isn't an "early or late"
  // story, so it gets its own solid colour instead of sitting on either
  // scale. Everything else splits into two one-hue ramps by direction -
  // earlier-indexed actual wave than assigned = early starter, later = late
  // - both scaled against the same max so the two sides stay comparable.
  const offDiagonal = cells.filter(c => c.assigned !== c.actual);
  const maxOffDiagPct = d3.max(offDiagonal, d => d.pctOfRow) || 1;
  const earlyScale = d3.scaleLinear().domain([0, maxOffDiagPct]).range(["white", EARLY_COLOR]);
  const lateScale = d3.scaleLinear().domain([0, maxOffDiagPct]).range(["white", LATE_COLOR]);

  for (const c of cells) {
    if (c.assigned === c.actual) {
      c.fill = rideBlue;
      c.textFill = "white";
    } else {
      const early = waveIndex[c.actual] < waveIndex[c.assigned];
      c.fill = early ? earlyScale(c.pctOfRow) : lateScale(c.pctOfRow);
      c.textFill = "#333";
    }
  }

  const mobile = width < 600;

  return Plot.plot({
    width,
    height: width * 0.75,
    marginLeft: 90,
    marginTop: 10,
    marginBottom: 40,
    x: { domain: WAVES, label: "Actual wave started" },
    y: { domain: WAVES, label: "Assigned wave" },
    marks: [
      // `fill`/`textFill` hold literal CSS colour strings, not data values -
      // Plot renders channels like that directly rather than through a
      // scale, so no colour legend gets generated for either mark.
      Plot.cell(cells, { x: "actual", y: "assigned", fill: "fill", inset: 1.5, rx: 8, stroke: "black", strokeWidth: 1 }),
      Plot.text(cells, {
        x: "actual",
        y: "assigned",
        text: d => d.count ? d3.format(",")(d.count) : "",
        fill: "textFill",
        fontSize: mobile ? 10 : 12,
        fontWeight: 600,
      }),
    ],
  });
}
