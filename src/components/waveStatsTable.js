import * as Inputs from "npm:@observablehq/inputs";

export const aggregatedColumns = [
  "wave", "count", "median", "avg", "deviation",
  "percentile10", "percentile20", "percentile30", "percentile40",
  "percentile50", "percentile60", "percentile70", "percentile80", "percentile90",
];

const aggregatedHeaders = (groupLabel) => ({
  wave: groupLabel,
  count: "Riders",
  median: "Median",
  avg: "Mean",
  deviation: "Std. Deviation",
  percentile10: "10%",
  percentile20: "20%",
  percentile30: "30%",
  percentile40: "40%",
  percentile50: "50%",
  percentile60: "60%",
  percentile70: "70%",
  percentile80: "80%",
  percentile90: "90%",
});

// `format`: optional per-column formatters (same shape Inputs.table takes),
// for callers whose values shouldn't show decimal places - e.g. a table of
// pass counts, where a fractional pass doesn't mean anything.
export function waveStatsTable(waveStats, { groupLabel = "Wave", format } = {}) {
  return Inputs.table(waveStats, {
    columns: aggregatedColumns,
    header: aggregatedHeaders(groupLabel),
    select: false,
    ...(format ? { format } : {}),
  });
}
