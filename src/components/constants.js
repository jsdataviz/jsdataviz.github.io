import * as d3 from "npm:d3";

export const rideBlue = "#060549";

// One colour for every mark that represents "the rider number typed into the
// intro input", so it reads as the same identity wherever it shows up - the
// scatter-chart dots, the wave-box-plot rule, and the canvas path highlight.
export const riderHighlightColor = "crimson";

// Shared height/width ratio for the page's bar charts, so they all sit
// consistently regardless of container width (taken from the
// Early/On-Time/Late breakdown chart).
export const barChartHeightRatio = 5 / 7;

export const raceColors = {
  "100": rideBlue,
  "60": "#efb118",
  "30": "#ff725c",
};

export function formatRaceTime(timeDecimal) {
  const hours = Math.floor(timeDecimal);
  const minutes = Math.round((timeDecimal % 1) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

// Shared start_tod parse/format - used anywhere a "You started at ..." tip
// needs to turn the raw "2024-05-26 06:12:34" timestamp into a clock time.
export const parseStartTod = d3.timeParse("%Y-%m-%d %H:%M:%S");
export const formatClock = d3.timeFormat("%-I:%M %p");

export const waveStartLines = [
  { x: "2024-05-26 06:00:00", y1: 101000, y2: 103500 },
  { x: "2024-05-26 06:03:00", y1: 103700, y2: 109600 },
  { x: "2024-05-26 06:45:00", y1: 110000, y2: 116200 },
  { x: "2024-05-26 07:37:00", y1: 116500, y2: 122500 },
  { x: "2024-05-26 08:15:00", y1: 123000, y2: 129000 },
];

export const startLabels = [
  { x: "2024-05-26 06:00:00", y: 103500, label: "Wave 1" },
  { x: "2024-05-26 06:03:00", y: 109600, label: "Wave 2" },
  { x: "2024-05-26 06:45:00", y: 116200, label: "Wave 3" },
  { x: "2024-05-26 07:37:00", y: 122000, label: "Wave 4" },
  { x: "2024-05-26 08:15:00", y: 129000, label: "Wave 5" },
];

export const endLines = [
  { x: "2024-05-26 06:45:00", y1: 101000, y2: 103500 },
  { x: "2024-05-26 06:45:00", y1: 103700, y2: 109600 },
  { x: "2024-05-26 07:37:00", y1: 110000, y2: 116200 },
  { x: "2024-05-26 08:15:00", y1: 116500, y2: 122500 },
];

export const raceCheckpoints = [
  "rider_pos_start",
  "rider_pos_25",
  "rider_pos_26",
  "rider_pos_53",
  "rider_pos_54",
  "rider_pos_73",
  "rider_pos_74",
  "rider_pos_finish",
];

export const checkpointMiles = {
  rider_pos_start: 0,
  rider_pos_25: 25,
  rider_pos_26: 26,
  rider_pos_53: 53,
  rider_pos_54: 54,
  rider_pos_73: 73,
  rider_pos_74: 74,
  rider_pos_finish: 100,
};

// Readable checkpoint label, used on the rider-path canvas charts instead of
// a bare "25mi" tick - start/finish get named, everything else gets "Mile N".
export function checkpointLabel(cp) {
  if (cp === "rider_pos_start") return "Start";
  if (cp === "rider_pos_finish") return "Finish";
  return `Mile ${checkpointMiles[cp]}`;
}

// The three official rest stops, each bounded by a "before" and "after"
// checkpoint a mile apart (e.g. mile 25 -> mile 26 brackets stop 1). Used to
// shade and label the stop itself on the full-checkpoint rider-path chart,
// since otherwise two consecutive mile ticks don't read as "a stop happened
// here" on their own.
export const restStopCheckpointPairs = [
  ["rider_pos_25", "rider_pos_26"],
  ["rider_pos_53", "rider_pos_54"],
  ["rider_pos_73", "rider_pos_74"],
];
