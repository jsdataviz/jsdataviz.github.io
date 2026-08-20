import * as d3 from "npm:d3";
import { raceCheckpoints, checkpointMiles } from "./constants.js";

const HEIGHT = 900;
const MARGIN = { top: 30, right: 16, bottom: 10, left: 16 };

// Same chart as riderPathsSingleChart (every rider's position at each
// checkpoint, linked into a path) but drawn on a <canvas> instead of as SVG.
// riderPathsSingleChart draws ~7 links per rider as individual SVG <path>
// elements - at ~18k riders that's well over 100k DOM nodes, which is what
// makes it slow. Canvas has no DOM cost per line: the whole background
// layer is one beginPath()/stroke() call per rider, so it scales with
// strokes issued rather than elements created.
//
// `stages` picks which checkpoints to plot and in what order - pass a
// subset of raceCheckpoints to drop stages entirely (e.g. a two-point
// start/finish "order swap" view, or skipping the rest stops), or the full
// list for the granular view.
// `equalWidth` spaces stages evenly instead of proportionally to their
// actual mile marker - two checkpoints either side of a rest stop sit only
// a mile apart, so proportional spacing squeezes them (and their tick
// labels) into an unreadable sliver; equal spacing gives every stage the
// same room regardless of how far apart it is in real miles.
export function riderPathsCanvasChart(linkData, highlightedData, width, {
  stages = raceCheckpoints,
  equalWidth = false,
} = {}) {
  const height = HEIGHT;
  const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;

  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const xForStage = equalWidth
    ? d3.scalePoint().domain(stages).range([MARGIN.left, width - MARGIN.right])
    : (milesScale => cp => milesScale(checkpointMiles[cp]))(
        d3.scaleLinear().domain([0, 100]).range([MARGIN.left, width - MARGIN.right])
      );

  const segments = stages.slice(0, -1).map((cp, i) => [cp, stages[i + 1]]);

  // Rider position values span every plotted checkpoint, not just start/finish.
  const allPositions = linkData.flatMap(d => stages.map(cp => +d[cp]).filter(v => !Number.isNaN(v)));
  const y = d3.scaleLinear()
    .domain(d3.extent(allPositions))
    .range([MARGIN.top, height - MARGIN.bottom]); // min -> top, matching Plot's y.reverse: true

  // One beginPath()/stroke() per *rider* (not one giant path for everyone).
  // Canvas only applies alpha once per stroke() call - batching every rider
  // into a single path made the whole thing paint as one flat grey shape
  // instead of overlapping strokes compounding, which is what gave the SVG
  // version its "web" of darker, more-crossed-over regions. Stroking each
  // rider separately keeps that layering while still being one draw call
  // per rider rather than one DOM element per segment.
  const strokePaths = (ctx, data) => {
    for (const d of data) {
      ctx.beginPath();
      let drew = false;
      for (const [cpA, cpB] of segments) {
        const yA = +d[cpA], yB = +d[cpB];
        if (Number.isNaN(yA) || Number.isNaN(yB)) continue;
        // moveTo per segment (not just once) so a missing checkpoint in the
        // middle leaves a gap instead of drawing a stray connecting line.
        ctx.moveTo(xForStage(cpA), y(yA));
        ctx.lineTo(xForStage(cpB), y(yB));
        drew = true;
      }
      if (drew) ctx.stroke();
    }
  };

  // Background: every rider, thin and faint.
  ctx.lineWidth = 0.16;
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  strokePaths(ctx, linkData);

  // Highlighted rider(s), solid, on top.
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "tomato";
  strokePaths(ctx, highlightedData);

  // Mile ticks along the top, mirroring the original's `axis: "top"`.
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillStyle = "#555";
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  for (const cp of stages) {
    const tx = xForStage(cp);
    ctx.beginPath();
    ctx.moveTo(tx, MARGIN.top);
    ctx.lineTo(tx, height - MARGIN.bottom);
    ctx.stroke();
    ctx.fillText(`${checkpointMiles[cp]}mi`, tx, MARGIN.top - 4);
  }

  return canvas;
}
