import * as d3 from "npm:d3";

const WAVES = ["Wave 1", "Wave 2", "Wave 3", "Wave 4", "Wave 5"];
const WAVE_COLORS = ["#060549", "#1a6eb5", "#5dade2", "#e9a84c", "#e76f51"];

export function waveChordChart(data, width) {
  const height = width;
  // Leaves room around the circle for the wave labels, which otherwise
  // clip against the canvas edge (e.g. "Wave 2", sitting near the widest
  // point of the circle).
  const outerRadius = width * 0.38;
  const innerRadius = outerRadius * 0.93;
  const labelOffset = Math.max(8, width * 0.02);

  const waveIndex = Object.fromEntries(WAVES.map((w, i) => [w, i]));
  const matrix = Array.from({ length: 5 }, () => new Array(5).fill(0));

  data
    .filter(d => d.assigned_wave_number !== "VIP" && d.assigned_start_wave != null)
    .forEach(d => {
      const i = waveIndex[d.assigned_wave_number];
      const j = waveIndex[d.assigned_start_wave];
      if (i !== undefined && j !== undefined) matrix[i][j]++;
    });

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("style", "max-width:100%;height:auto;font-family:system-ui,sans-serif;");

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const HIGHLIGHT = new Set([1, 2, 4]); // Wave 2 (index 1), Wave 3 (index 2), and Wave 5 (index 4)
  const MUTED_CHORD = "rgba(120,120,130,0.4)";

  const chord = d3.chord().padAngle(0.04).sortSubgroups(d3.descending)(matrix);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const ribbon = d3.ribbon().radius(innerRadius - 2);
  const arrowRibbon = d3.ribbonArrow().radius(innerRadius - 2).headRadius(10);

  // On-time chords (diagonal) — original muted grey, drawn behind
  g.append("g")
    .selectAll("path")
    .data(chord.filter(d => d.source.index === d.target.index))
    .join("path")
    .attr("d", ribbon)
    .attr("fill", "rgba(180,180,195,0.3)")
    .attr("stroke", "rgba(180,180,195,0.4)")
    .attr("stroke-width", 0.5);

  // Off-diagonal chords — Wave 2 & 5 outgoing keep their colour, all others go dark grey
  g.append("g")
    .selectAll("path")
    .data(chord.filter(d => d.source.index !== d.target.index))
    .join("path")
    .attr("d", arrowRibbon)
    .attr("fill", d => HIGHLIGHT.has(d.source.index) ? WAVE_COLORS[d.source.index] : MUTED_CHORD)
    .attr("fill-opacity", d => HIGHLIGHT.has(d.source.index) ? 0.72 : 1)
    .attr("stroke", d => HIGHLIGHT.has(d.source.index) ? "white" : "none")
    .attr("stroke-width", 0.5);

  // Outer arcs — all waves keep their original colours
  g.append("g")
    .selectAll("path")
    .data(chord.groups)
    .join("path")
    .attr("d", arc)
    .attr("fill", d => WAVE_COLORS[d.index])
    .attr("stroke", "white")
    .attr("stroke-width", 1);

  // Wave labels
  g.append("g")
    .selectAll("text")
    .data(chord.groups)
    .join("text")
    .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
    .attr("dy", "0.35em")
    .attr("transform", d => `
      rotate(${d.angle * 180 / Math.PI - 90})
      translate(${outerRadius + labelOffset})
      ${d.angle > Math.PI ? "rotate(180)" : ""}
    `)
    .attr("text-anchor", d => d.angle > Math.PI ? "end" : "start")
    .attr("font-size", Math.max(10, width * 0.018))
    .attr("fill", "#333")
    .text(d => WAVES[d.index]);

  return svg.node();
}
