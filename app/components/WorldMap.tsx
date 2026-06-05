"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, GeoJsonObject } from "geojson";
import type { PathOptions } from "leaflet";
import { militaryBases } from "../data/militaryBases";
import { securityCommitments, commitmentColors } from "../data/securityCommitments";
import { nuclearPowers, nuclearStatusColors } from "../data/nuclearPowers";
import { matchesCountry } from "../utils/countryMatch";

interface Props {
  showBases: boolean;
  showCommitments: boolean;
  activeCommitments: Set<string>;
  showNuclear: boolean;
}

const DEFAULT_COMMITMENT_COLOR = "#3b82f6";

const HUGE_COUNTRIES = new Set([
  "Russia", "Canada", "United States of America", "China", "Brazil",
  "Australia", "India", "Argentina", "Kazakhstan", "Algeria",
]);
const LARGE_COUNTRIES = new Set([
  ...HUGE_COUNTRIES,
  "Greenland", "Saudi Arabia", "Mexico", "Indonesia", "Sudan",
  "Libya", "Iran", "Mongolia", "Peru", "Chad", "Niger", "Angola",
  "Mali", "South Africa", "Colombia", "Ethiopia", "Bolivia",
  "Mauritania", "Egypt", "Nigeria", "Mozambique", "Zambia", "Turkey",
  "Ukraine", "France", "Germany", "United Kingdom", "Spain", "Japan",
  "Pakistan", "Democratic Republic of the Congo",
]);

function getFilledCountries(showCommitments: boolean, activeCommitments: Set<string>): Map<string, string> {
  const map = new Map<string, string>();
  if (!showCommitments) return map;
  for (const c of securityCommitments) {
    const color = activeCommitments.size === 0 || !activeCommitments.has(c.id)
      ? DEFAULT_COMMITMENT_COLOR
      : commitmentColors[c.id] || DEFAULT_COMMITMENT_COLOR;
    for (const country of c.countries) {
      map.set(country, color);
    }
  }
  return map;
}

function commitmentStyle(feature: Feature | undefined, filledCountries: Map<string, string>): PathOptions {
  const name = feature?.properties?.ADMIN || feature?.properties?.name || "";
  for (const [key, color] of filledCountries.entries()) {
    if (matchesCountry(name, key)) {
      return { fillColor: color, fillOpacity: 0.4, color: "#93c5fd", weight: 0.8 };
    }
  }
  return { fillColor: "#f8fafc", fillOpacity: 1, color: "#93c5fd", weight: 0.5 };
}

function nuclearStyle(feature: Feature | undefined): PathOptions {
  const name = feature?.properties?.ADMIN || feature?.properties?.name || "";
  for (const np of nuclearPowers) {
    if (matchesCountry(name, np.country)) {
      return {
        fillColor: nuclearStatusColors[np.status],
        fillOpacity: 0.55,
        color: nuclearStatusColors[np.status],
        weight: 1.2,
      };
    }
  }
  return { fillColor: "#f8fafc", fillOpacity: 1, color: "#93c5fd", weight: 0.5 };
}

// ── Drop shadow on overlay pane ───────────────────────────────────────────────
function ContinentShadow() {
  const map = useMap();
  useEffect(() => {
    const pane = map.getPanes().overlayPane as HTMLElement | undefined;
    if (pane) pane.style.filter = "drop-shadow(0px 4px 8px rgba(0,0,0,0.24))";
  }, [map]);
  return null;
}

// ── Country label layer ───────────────────────────────────────────────────────
function CountryLabels({ geoData }: { geoData: GeoJsonObject | null }) {
  const map = useMap();
  const geoRef = useRef<L.GeoJSON | null>(null);

  const updateVisibility = useCallback(() => {
    if (!geoRef.current) return;
    const zoom = map.getZoom();
    geoRef.current.eachLayer((layer) => {
      const l = layer as L.Path & {
        feature?: Feature;
        openTooltip?: () => void;
        closeTooltip?: () => void;
        getTooltip?: () => L.Tooltip | undefined;
      };
      if (!l.getTooltip?.()) return;
      const name: string = l.feature?.properties?.ADMIN || l.feature?.properties?.name || "";
      const show =
        zoom >= 5 ||
        (zoom >= 4) ||
        (zoom >= 3 && LARGE_COUNTRIES.has(name)) ||
        (zoom < 3 && HUGE_COUNTRIES.has(name));
      if (show) l.openTooltip?.();
      else l.closeTooltip?.();
    });
  }, [map]);

  useMapEvents({ zoomend: updateVisibility });
  useEffect(() => { if (geoData) setTimeout(updateVisibility, 300); }, [geoData, updateVisibility]);

  if (!geoData) return null;

  return (
    <GeoJSON
      ref={(r) => { geoRef.current = r; }}
      data={geoData}
      style={() => ({ weight: 0, opacity: 0, fillOpacity: 0 })}
      onEachFeature={(feature, layer) => {
        const name = feature.properties?.ADMIN || feature.properties?.name;
        if (!name) return;
        (layer as L.Path).bindTooltip(name, {
          permanent: true,
          direction: "center",
          className: "country-label",
          interactive: false,
          opacity: 1,
        });
        (layer as any).closeTooltip?.();
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WorldMap({ showBases, showCommitments, activeCommitments, showNuclear }: Props) {
  const [geoState, setGeoState] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((r) => r.json())
      .then(setGeoState);
  }, []);

  const filledCountries = getFilledCountries(showCommitments, activeCommitments);
  const commitmentKey = showCommitments
    ? "on-" + Array.from(activeCommitments).sort().join(",")
    : "off";

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.5}
      minZoom={2}
      maxZoom={9}
      style={{ height: "100%", width: "100%", background: "#cbd5e1" }}
      worldCopyJump={false}
    >
      <TileLayer
        url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        attribution=""
        opacity={0}
      />

      <ContinentShadow />

      {/* Base countries layer (white fill + light blue borders) */}
      {geoState && (
        <GeoJSON
          key={commitmentKey}
          data={geoState}
          style={(f) => commitmentStyle(f as Feature, filledCountries)}
          onEachFeature={(feature, layer) => {
            if (!showCommitments) return;
            const rawName = feature.properties?.ADMIN || feature.properties?.name || "";
            for (const [key] of filledCountries.entries()) {
              if (matchesCountry(rawName, key)) {
                const commitment = securityCommitments.find((c) =>
                  c.countries.some((cn) => matchesCountry(cn, rawName))
                );
                if (commitment) {
                  const color = filledCountries.get(key) || DEFAULT_COMMITMENT_COLOR;
                  layer.bindTooltip(
                    `<strong>${rawName}</strong><br/><span style="color:${color}">${commitment.name}</span>`,
                    { sticky: true, className: "map-tooltip" }
                  );
                }
                break;
              }
            }
          }}
        />
      )}

      {/* Nuclear overlay — separate layer on top */}
      {geoState && showNuclear && (
        <GeoJSON
          key={"nuclear"}
          data={geoState}
          style={(f) => nuclearStyle(f as Feature)}
          onEachFeature={(feature, layer) => {
            const rawName = feature.properties?.ADMIN || feature.properties?.name || "";
            const np = nuclearPowers.find((n) => matchesCountry(rawName, n.country));
            if (!np) return;
            const color = nuclearStatusColors[np.status];
            layer.bindTooltip(
              `<strong>${rawName}</strong><br/>
               <span style="color:${color};font-weight:600">${np.status === "p5" ? "NPT P5" : np.status === "declared" ? "Declared (non-NPT)" : np.status === "undeclared" ? "Undeclared / Presumed" : "NATO Nuclear Sharing"}</span>
               ${np.warheads ? `<br/>~${np.warheads.toLocaleString()} warheads` : ""}`,
              { sticky: true, className: "map-tooltip" }
            );
          }}
        />
      )}

      {/* Country labels */}
      <CountryLabels geoData={geoState} />

      {/* Military bases */}
      {showBases &&
        militaryBases.map((base, i) => {
          const radius = base.prominent ? 7 : 5;
          const color = base.withdrawn ? "#6b7280" : "#dc2626";
          const border = base.withdrawn ? "#374151" : "#450a0a";
          return (
            <CircleMarker
              key={i}
              center={[base.lat, base.lng]}
              radius={radius}
              pathOptions={{
                fillColor: color,
                fillOpacity: base.withdrawn ? 0.5 : 0.92,
                color: border,
                weight: 1.2,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <div className={`font-bold mb-1 ${base.withdrawn ? "text-gray-500" : "text-red-700"}`}>
                    {base.withdrawn && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded mr-1">WITHDRAWN</span>
                    )}
                    {base.name}
                  </div>
                  <div className="text-gray-600">{base.country}</div>
                  {base.personnel && (
                    <div className="text-gray-700 mt-1">~{base.personnel.toLocaleString()} personnel</div>
                  )}
                  {base.notes && (
                    <div className="text-gray-500 mt-1 italic text-xs">{base.notes}</div>
                  )}
                </div>
              </Popup>
              <Tooltip sticky>{base.name}{base.withdrawn ? " [WITHDRAWN]" : ""}</Tooltip>
            </CircleMarker>
          );
        })}
    </MapContainer>
  );
}
