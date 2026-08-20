import { L, ensureLeafletCSS, createMapContainer, addBaseTileLayer, addStartEndPins, staticMapOptions } from "./leafletBase.js";

ensureLeafletCSS();

// Renders the actual 2024 route (in navy) against the London bridges/tunnels,
// coloured green where open and red where closed under that route ("a").
// Used twice on the page: once zoomed out over central London, once zoomed
// in on the Silvertown tunnel itself - pass different `center`/`zoom` for each.
export function silvertonRouteMap(routeGeoJSON, londonBridges, { center, zoom, mobileZoom = zoom, width } = {}) {
  const el = createMapContainer(500);
  const m = L.map(el, {
    ...staticMapOptions,
    center,
    zoom: width < 600 ? mobileZoom : zoom,
  });
  addBaseTileLayer(m);
  const latLngs = routeGeoJSON.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
  for (const b of londonBridges.filter(b => b.name !== "Tower" && !b.is_over_route)) {
    L.polyline(b.coords, { color: b['a'] ? "#2dc653" : "#e31a1c", weight: 2, opacity: 0.8 }).addTo(m)
      .bindTooltip(b.name, { direction: b.tooltipDirection || 'top' });
  }
  L.polyline(latLngs, { color: "#060549", weight: 3, opacity: 0.9 }).addTo(m);
  for (const b of londonBridges.filter(b => b.name !== "Tower" && b.is_over_route)) {
    L.polyline(b.coords, { color: b['a'] ? "#2dc653" : "#e31a1c", weight: 2, opacity: 0.8 }).addTo(m)
      .bindTooltip(b.name, { direction: b.tooltipDirection || 'top' });
  }
  addStartEndPins(m, latLngs[0], latLngs[latLngs.length - 1]);
  requestAnimationFrame(() => { m.invalidateSize(); });
  return el;
}
