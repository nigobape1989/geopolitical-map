"use client";

import { securityCommitments, commitmentColors } from "../data/securityCommitments";

interface Props {
  showBases: boolean;
  setShowBases: (v: boolean) => void;
  showCommitments: boolean;
  setShowCommitments: (v: boolean) => void;
  activeCommitments: Set<string>;
  toggleCommitment: (id: string) => void;
}

export default function SidePanel({
  showBases,
  setShowBases,
  showCommitments,
  setShowCommitments,
  activeCommitments,
  toggleCommitment,
}: Props) {
  return (
    <div className="w-80 min-w-[280px] h-full bg-gray-950 text-gray-100 flex flex-col overflow-hidden border-l border-gray-800">
      {/* Header */}
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-lg font-bold tracking-tight text-white">US Global Presence</h1>
        <p className="text-xs text-gray-400 mt-1">Geopolitical intelligence overlay</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* Military Bases */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-200">Military Bases Abroad</h2>
              <p className="text-xs text-gray-500 mt-0.5">Major permanent installations</p>
            </div>
            <Toggle checked={showBases} onChange={setShowBases} color="red" />
          </div>
          {showBases && (
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full bg-red-600 border border-red-900 inline-block" />
                <span className="text-xs text-gray-300">US military installation</span>
              </div>
              <p className="text-xs text-gray-500">Click a marker for details. ~800 bases worldwide.</p>
            </div>
          )}
        </section>

        {/* Security Commitments */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-200">Security Commitments</h2>
              <p className="text-xs text-gray-500 mt-0.5">Treaties & defense agreements</p>
            </div>
            <Toggle checked={showCommitments} onChange={setShowCommitments} color="blue" />
          </div>

          {showCommitments && (
            <div className="space-y-2">
              {securityCommitments.map((c) => {
                const active = activeCommitments.has(c.id);
                const color = commitmentColors[c.id] || "#94a3b8";
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCommitment(c.id)}
                    className={`w-full text-left rounded-lg p-3 border transition-all ${
                      active
                        ? "bg-gray-800 border-gray-600"
                        : "bg-gray-900 border-gray-800 opacity-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className="w-3 h-3 rounded-sm mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-gray-200">{c.name}</span>
                          <span className="text-xs text-gray-500">{c.year}</span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded capitalize"
                            style={{ backgroundColor: color + "22", color }}
                          >
                            {c.type}
                          </span>
                        </div>
                        {c.article && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{c.article}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                          {c.description}
                        </p>
                        {c.wikipedia && (
                          <a
                            href={c.wikipedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
                          >
                            Wikipedia →
                          </a>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
        Sources: DoD, Wikipedia, US State Dept
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  color,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  color: "red" | "blue";
}) {
  const bg = checked
    ? color === "red"
      ? "bg-red-600"
      : "bg-blue-600"
    : "bg-gray-700";
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors ${bg}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
