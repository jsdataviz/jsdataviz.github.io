import L from "npm:leaflet";
import { html } from "npm:htl";

// Injects Leaflet's stylesheet once, no matter how many map components load.
let cssInjected = false;
export function ensureLeafletCSS() {
  if (cssInjected) return;
  cssInjected = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

// Shared options for the small, read-only route maps used throughout the page.
export const staticMapOptions = {
  zoomControl: false, attributionControl: false,
  dragging: false, touchZoom: false, doubleClickZoom: false,
  scrollWheelZoom: false, boxZoom: false, keyboard: false, zoomSnap: 0,
};

export function createMapContainer(height = 500) {
  return html`<div style="height:${height}px; border-radius:4px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.08);"></div>`;
}

export function addBaseTileLayer(m) {
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19, subdomains: "abcd"
  }).addTo(m);
  L.control.attribution({ prefix: false, position: "bottomright" })
    .addAttribution('© <a href="https://carto.com">CARTO</a>')
    .addTo(m);
}

export function addStartEndPins(m, startLatLng, endLatLng) {
  const pinStyle = { radius: 5, weight: 2, color: "#fff", fillOpacity: 1 };
  L.circleMarker(startLatLng, { ...pinStyle, fillColor: "#2dc653" }).addTo(m);
  L.circleMarker(endLatLng,   { ...pinStyle, fillColor: "#e31a1c" }).addTo(m);
}

export { L };
