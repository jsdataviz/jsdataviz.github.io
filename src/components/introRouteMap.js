import { L, ensureLeafletCSS, createMapContainer, addBaseTileLayer } from "./leafletBase.js";

ensureLeafletCSS();

export function introRouteMap(routeGeoJSON) {
  const bounds = L.latLngBounds(L.latLng(51.48, -0.15), L.latLng(51.90, 0.52));
  const el = createMapContainer(700);
  const m = L.map(el, {
    center: [51.69, 0.185], zoom: 10,
    zoomControl: false, attributionControl: false,
    dragging: false, touchZoom: false, doubleClickZoom: false,
    scrollWheelZoom: false, boxZoom: false, keyboard: false,
    maxBounds: bounds, maxBoundsViscosity: 1.0
  });
  addBaseTileLayer(m);
  const latLngs = routeGeoJSON.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
  L.polyline(latLngs, { color: "#060549", weight: 3, opacity: 0.9 }).addTo(m);
  requestAnimationFrame(() => { m.invalidateSize(); m.fitBounds(bounds); });
  return el;
}
