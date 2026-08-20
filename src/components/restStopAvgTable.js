import * as Inputs from "npm:@observablehq/inputs";

const waveOrder = ["Wave 1", "Wave 2", "Wave 3", "Wave 4", "Wave 5"];
const stopOrder = ["Mile 25", "Mile 50", "Mile 73"];

// Pivots a flat [{ stop, wave, avgStopMinutes }] array into one row per wave,
// one column per stop.
export function restStopAvgTable(data) {
  const rows = waveOrder.map(wave => {
    const row = { wave };
    for (const stop of stopOrder) {
      const rec = data.find(d => d.wave === wave && d.stop === stop);
      row[stop] = rec?.avgStopMinutes != null ? Math.round(rec.avgStopMinutes * 10) / 10 : null;
    }
    return row;
  });
  return Inputs.table(rows, {
    columns: ["wave", ...stopOrder],
    header: { wave: "Wave" },
    select: false,
  });
}
