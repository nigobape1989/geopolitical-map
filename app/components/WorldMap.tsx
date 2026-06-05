"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, GeoJsonObject } from "geojson";
import type { PathOptions } from "leaflet";
import { militaryBases } from "../data/militaryBases";
import { securityCommitments, commitmentColors } from "../data/securityCommitments";

interface Props {
  showBases: boolean;
  showCommitments: boolean;
  activeCommitments: Set<string>;
}

// Countries in each commitment keyed by commitment id
function getCommitmentCountries(activeCommitments: Set<string>): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const c of securityCommitments) {
    if (activeCommitments.has(c.id)) {
      map.set(c.id, c.countries);
    }
  }
  return map;
}

function countryStyle(
  feature: Feature | undefined,
  commitmentMap: Map<string, string[]>
): PathOptions {
  const name = feature?.properties?.ADMIN || feature?.properties?.name || "";

  for (const [id, countries] of commitmentMap.entries()) {
    if (countries.some(c => name.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(name.toLowerCase()))) {
      return {
        fillColor: commitmentColors[id] || "#94a3b8",
        fillOpacity: 0.35,
        color: "#93c5fd",
        weight: 0.8,
      };
    }
  }

  return {
    fillColor: "#ffffff",
    fillOpacity: 1,
    color: "#93c5fd",
    weight: 0.5,
  };
}

export default function WorldMap({ showBases, showCommitments, activeCommitments }: Props) {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const commitmentMap = getCommitmentCountries(activeCommitments);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((r) => r.json())
      .then(setGeoData);
  }, []);

  // key forces GeoJSON re-render when commitments change
  const geoKey = Array.from(activeCommitments).sort().join(",");

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.5}
      minZoom={2}
      maxZoom={8}
      style={{ height: "100%", width: "100%", background: "#ffffff" }}
      worldCopyJump={false}
    >
      {/* Blank white tile layer for ocean */}
      <TileLayer
        url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
        attribution=""
      />

      {geoData && (
        <GeoJSON
          key={geoKey}
          data={geoData}
          style={(feature) => countryStyle(feature as Feature, commitmentMap)}
          onEachFeature={(feature, layer) => {
            const name = feature.properties?.ADMIN || feature.properties?.name;
            if (name && showCommitments) {
              // Find which commitment this country belongs to
              for (const [id] of commitmentMap.entries()) {
                const commitment = securityCommitments.find(c => c.id === id);
                const countries = commitmentMap.get(id) || [];
                if (countries.some(c => name.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(name.toLowerCase()))) {
                  layer.bindTooltip(
                    `<strong>${name}</strong><br/><span style="color:${commitmentColors[id]}">${commitment?.name}</span>`,
                    { sticky: true, className: "map-tooltip" }
                  );
                  break;
                }
              }
            }
          }}
        />
      )}

      {showBases &&
        militaryBases.map((base, i) => (
          <CircleMarker
            key={i}
            center={[base.lat, base.lng]}
            radius={5}
            pathOptions={{
              fillColor: "#dc2626",
              fillOpacity: 0.9,
              color: "#7f1d1d",
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-red-700 mb-1">{base.name}</div>
                <div className="text-gray-600">{base.country}</div>
                {base.personnel && (
                  <div className="text-gray-700 mt-1">
                    ~{base.personnel.toLocaleString()} personnel
                  </div>
                )}
                {base.notes && (
                  <div className="text-gray-500 mt-1 italic text-xs">{base.notes}</div>
                )}
              </div>
            </Popup>
            <Tooltip sticky>{base.name}</Tooltip>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}
