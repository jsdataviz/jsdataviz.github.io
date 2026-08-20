import { L, ensureLeafletCSS, createMapContainer, addBaseTileLayer, addStartEndPins } from "./leafletBase.js";

ensureLeafletCSS();

const londonBounds = L.latLngBounds(
  L.latLng(51.48291207694818, -0.14397759120475853),
  L.latLng(51.601043, 0.016397)
);

const mapOpts = {
  zoomControl: false, attributionControl: false,
  dragging: false, touchZoom: false, doubleClickZoom: false,
  scrollWheelZoom: false, boxZoom: false, keyboard: false,
  maxBounds: londonBounds, maxBoundsViscosity: 1.0, zoomSnap: 0
};

// Renders one of the proposed 2025 routes against the London bridges/tunnels,
// coloured green where open and red where closed under that route (`bridgeKey`).
export function routeMap(geojson, londonBridges, color, width, { polygon = false, bridgeKey = null, lineGeojson = null } = {}) {
  const el = createMapContainer(500);
  const m = L.map(el, { ...mapOpts, center: [51.51716739884005, -0.10521727417415214], zoom: width < 600 ? 11.0 : 11.8 });
  addBaseTileLayer(m);
  const drawBridges = (overRoute) => {
    for (const b of londonBridges.filter(b => b.is_over_route === overRoute)) {
      const available = bridgeKey !== null ? b[bridgeKey] : true;
      const line = L.polyline(b.coords, { color: available ? "#2dc653" : "#e31a1c", weight: 2, opacity: 0.8 }).addTo(m);
      const annotation = b.annotation?.[bridgeKey];
      if (annotation) line.bindTooltip(annotation, { permanent: true, direction: b.tooltipDirection || 'top' });
    }
  };
  drawBridges(false);
  const latLngs = geojson.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
  if (polygon) {
    L.polygon(latLngs, { stroke: false, fillColor: "#cc0000", fillOpacity: 0.12 }).addTo(m);
  }
  L.polyline(latLngs, { color, weight: 3, opacity: 0.9 }).addTo(m);
  if (lineGeojson) {
    const lineLatLngs = lineGeojson.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
    L.polyline(lineLatLngs, { color, weight: 3, opacity: 0.9 }).addTo(m);
  }
  drawBridges(true);
  const startLatLngs = lineGeojson
    ? lineGeojson.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon])
    : latLngs;
  addStartEndPins(m, startLatLngs[0], latLngs[latLngs.length - 1]);
  requestAnimationFrame(() => { m.invalidateSize(); });
  return el;
}
