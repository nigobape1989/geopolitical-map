"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
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

const DEFAULT_COMMITMENT_COLOR = "#3b82f6";

function getFilledCountries(
  showCommitments: boolean,
  activeCommitments: Set<string>
): Map<string, string> {
  const countryColorMap = new Map<string, string>();
  if (!showCommitments) return countryColorMap;

  for (const c of securityCommitments) {
    const color =
      activeCommitments.size === 0 || !activeCommitments.has(c.id)
        ? DEFAULT_COMMITMENT_COLOR
        : commitmentColors[c.id] || DEFAULT_COMMITMENT_COLOR;

    for (const country of c.countries) {
      countryColorMap.set(country.toLowerCase(), color);
    }
  }
  return countryColorMap;
}

function countryStyle(
  feature: Feature | undefined,
  filledCountries: Map<string, string>
): PathOptions {
  const name = (
    feature?.properties?.ADMIN ||
    feature?.properties?.name ||
    ""
  ).toLowerCase();

  for (const [key, color] of filledCountries.entries()) {
    if (name.includes(key) || key.includes(name)) {
      return {
        fillColor: color,
        fillOpacity: 0.45,
        color: "#93c5fd",
        weight: 0.8,
      };
    }
  }

  return {
    fillColor: "#f8fafc",
    fillOpacity: 1,
    color: "#93c5fd",
    weight: 0.5,
  };
}

function ShadowFilter() {
  const map = useMap();
  useEffect(() => {
    const pane = map.getPanes().overlayPane;
    if (!pane) return;
    const svg = pane.querySelector("svg");
    if (!svg) return;
    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "continent-shadow");
    filter.setAttribute("x", "-5%");
    filter.setAttribute("y", "-5%");
    filter.setAttribute("width", "110%");
    filter.setAttribute("height", "110%");
    filter.innerHTML = `
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.28)" result="shadow"/>
      <feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/></feMerge>
    `;
    if (!defs.querySelector("#continent-shadow")) {
      defs.appendChild(filter);
    }
    (pane as HTMLElement).style.filter = "drop-shadow(0px 3px 6px rgba(0,0,0,0.22))";
  }, [map]);
  return null;
}

export default function WorldMap({ showBases, showCommitments, activeCommitments }: Props) {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((r) => r.json())
      .then(setGeoData);
  }, []);

  const filledCountries = getFilledCountries(showCommitments, activeCommitments);
  const geoKey = showCommitments
    ? "on-" + Array.from(activeCommitments).sort().join(",")
    : "off";

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.5}
      minZoom={2}
      maxZoom={8}
      style={{ height: "100%", width: "100%", background: "#cbd5e1" }}
      worldCopyJump={false}
    >
      <TileLayer
        url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        attribution=""
        opacity={0}
      />

      <ShadowFilter />

      {geoData && (
        <GeoJSON
          key={geoKey}
          data={geoData}
          style={(feature) => countryStyle(feature as Feature, filledCountries)}
          onEachFeature={(feature, layer) => {
            if (!showCommitments) return;
            const rawName = feature.properties?.ADMIN || feature.properties?.name || "";
            const name = rawName.toLowerCase();
            for (const [key] of filledCountries.entries()) {
              if (name.includes(key) || key.includes(name)) {
                const commitment = securityCommitments.find((c) =>
                  c.countries.some((cn) => cn.toLowerCase() === key)
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

      {showBases &&
        militaryBases.map((base, i) => (
          <CircleMarker
            key={i}
            center={[base.lat, base.lng]}
            radius={5}
            pathOptions={{
              fillColor: "#dc2626",
              fillOpacity: 0.92,
              color: "#450a0a",
              weight: 1.2,
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
