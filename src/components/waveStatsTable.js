import * as Inputs from "npm:@observablehq/inputs";

const aggregatedColumns = [
  "wave", "count", "median", "avg", "deviation",
  "outliers", "iqr", "kurt", "outliersPerc",
  "percentile10", "percentile20", "percentile30", "percentile40",
  "percentile50", "percentile60", "percentile70", "percentile80", "percentile90",
];

const aggregatedHeaders = {
  wave: "Mov. Month",
  count: "Riders",
  median: "Median",
  avg: "Mean",
  deviation: "Std. Dev.",
  kurt: "Kurtosis",
  percentile10: "10%",
  percentile20: "20%",
  percentile30: "30%",
  percentile40: "40%",
  percentile50: "50%",
  percentile60: "60%",
  percentile70: "70%",
  percentile80: "80%",
  percentile90: "90%",
};

export function waveStatsTable(waveStats) {
  return Inputs.table(waveStats, {
    columns: aggregatedColumns,
    header: aggregatedHeaders,
    select: false,
  });
}
