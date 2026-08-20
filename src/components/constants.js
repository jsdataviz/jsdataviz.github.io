export const rideBlue = "#060549";

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
