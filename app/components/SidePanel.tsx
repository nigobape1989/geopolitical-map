"use client";

import { useState } from "react";
import { securityCommitments, commitmentColors, strengthLabels } from "../data/securityCommitments";
import { militaryBases } from "../data/militaryBases";
import { nuclearPowers, nuclearStatusColors, nuclearStatusLabels, type NuclearStatus } from "../data/nuclearPowers";

interface Props {
  showBases: boolean;
  setShowBases: (v: boolean) => void;
  showCommitments: boolean;
  setShowCommitments: (v: boolean) => void;
  activeCommitments: Set<string>;
  toggleCommitment: (id: string) => void;
  showNuclear: boolean;
  setShowNuclear: (v: boolean) => void;
}

const totalBases = militaryBases.filter((b) => !b.withdrawn).length;
const withdrawnBases = militaryBases.filter((b) => b.withdrawn).length;

export default function SidePanel(props: Props) {
  const [usOpen, setUsOpen] = useState(true);
  const [globalOpen, setGlobalOpen] = useState(true);

  return (
    <aside
      style={{
        width: 320,
        minWidth: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(160deg, #0f172a 0%, #0c1322 100%)",
        borderRight: "1px solid rgba(148,163,184,0.10)",
        boxShadow: "4px 0 32px rgba(0,0,0,0.45)",
        zIndex: 10,
      }}
    >
      {/* App header */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(148,163,184,0.09)",
          background: "linear-gradient(135deg, rgba(59,130,246,0.10) 0%, transparent 60%)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 8px #3b82f6", flexShrink: 0, display: "inline-block" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.16em", color: "#475569", textTransform: "uppercase", fontWeight: 600 }}>
            Global Intelligence Overlay
          </span>
        </div>
        <h1 style={{ fontSize: 19, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", margin: 0 }}>
          Geopolitical Atlas
        </h1>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0 16px" }}>

        {/* ── Global Overlays ── */}
        <CountrySection
          flag="🌐"
          name="Global Overlays"
          open={globalOpen}
          onToggle={() => setGlobalOpen((v) => !v)}
          accentColor="#a855f7"
        >
          <NuclearContent
            showNuclear={props.showNuclear}
            setShowNuclear={props.setShowNuclear}
          />
        </CountrySection>

        <div style={{ height: 1, background: "rgba(148,163,184,0.07)", margin: "2px 16px" }} />

        {/* ── United States ── */}
        <CountrySection
          flag="🇺🇸"
          name="United States"
          open={usOpen}
          onToggle={() => setUsOpen((v) => !v)}
          accentColor="#3b82f6"
        >
          <USContent {...props} />
        </CountrySection>

        {/* ── Placeholder for future countries ── */}
        <div style={{ margin: "8px 16px 0" }}>
          <button
            disabled
            style={{
              width: "100%",
              padding: "9px 14px",
              borderRadius: 10,
              border: "1px dashed rgba(148,163,184,0.15)",
              background: "transparent",
              color: "#334155",
              fontSize: 12,
              cursor: "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: 8,
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 16, opacity: 0.4 }}>＋</span>
            <span>Add country overlay</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: "#1e3a5f", background: "rgba(59,130,246,0.1)", padding: "2px 7px", borderRadius: 4 }}>
              coming soon
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 20px",
          borderTop: "1px solid rgba(148,163,184,0.07)",
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 10, color: "#1e3a5f", letterSpacing: "0.04em" }}>
          DoD · Wikipedia · US State Dept
        </span>
        <span style={{ fontSize: 10, color: "#1e3a5f", fontWeight: 600 }}>2025–26</span>
      </div>
    </aside>
  );
}

// ── Country section wrapper ──────────────────────────────────────────────────
function CountrySection({
  flag, name, open, onToggle, accentColor, children,
}: {
  flag: string; name: string; open: boolean; onToggle: () => void;
  accentColor: string; children: React.ReactNode;
}) {
  return (
    <div style={{ margin: "0 0 4px" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: open ? `linear-gradient(90deg, ${accentColor}14 0%, transparent 70%)` : "transparent",
          border: "none",
          borderLeft: open ? `2px solid ${accentColor}` : "2px solid transparent",
          cursor: "pointer",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          textAlign: "left",
          transition: "all 0.15s",
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>{flag}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: open ? "#e2e8f0" : "#64748b", flex: 1, letterSpacing: "-0.01em" }}>
          {name}
        </span>
        <span style={{
          fontSize: 9, color: accentColor,
          transform: open ? "rotate(90deg)" : "rotate(0)",
          transition: "transform 0.15s",
          display: "inline-block",
        }}>▶</span>
      </button>
      {open && <div style={{ padding: "0 0 6px" }}>{children}</div>}
    </div>
  );
}

// ── US-specific content ──────────────────────────────────────────────────────
function USContent({
  showBases, setShowBases,
  showCommitments, setShowCommitments,
  activeCommitments, toggleCommitment,
}: Props) {
  const [basesOpen, setBasesOpen] = useState(true);
  const [commitmentsOpen, setCommitmentsOpen] = useState(true);

  return (
    <div style={{ padding: "0 12px" }}>

      {/* Military Bases subsection */}
      <Subsection
        icon="⬡"
        title="Military Bases Abroad"
        subtitle={showBases ? `${totalBases} active · ${withdrawnBases} withdrawn` : "Hidden"}
        active={showBases}
        onToggle={setShowBases}
        toggleColor="#ef4444"
        open={basesOpen}
        onOpenToggle={() => setBasesOpen((v) => !v)}
        accentColor="#ef4444"
      >
        <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.16)", borderRadius: 8, padding: "9px 11px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#dc2626", border: "1.5px solid #7f1d1d", boxShadow: "0 0 6px rgba(220,38,38,0.5)", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#fca5a5", fontWeight: 500 }}>Active base</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6b7280", border: "1.5px solid #374151", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Withdrawn</span>
            </span>
          </div>
          <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.5, margin: 0 }}>
            Larger dots = hard-to-see small territories. Click any marker for details.
          </p>
        </div>
      </Subsection>

      <div style={{ height: 1, background: "rgba(148,163,184,0.07)", margin: "4px 0" }} />

      {/* Security Commitments subsection */}
      <Subsection
        icon="◈"
        title="Security Commitments"
        subtitle={
          showCommitments
            ? activeCommitments.size > 0
              ? `${activeCommitments.size} highlighted`
              : "All shown in blue"
            : "Hidden"
        }
        active={showCommitments}
        onToggle={setShowCommitments}
        toggleColor="#3b82f6"
        open={commitmentsOpen}
        onOpenToggle={() => setCommitmentsOpen((v) => !v)}
        accentColor="#3b82f6"
      >
        {showCommitments && (
          <>
            <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.5, marginBottom: 8 }}>
              All allies in <span style={{ color: "#3b82f6", fontWeight: 600 }}>blue</span> by default.
              Select a treaty to highlight it in its distinct color.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {securityCommitments.map((c) => (
                <CommitmentCard
                  key={c.id}
                  {...c}
                  active={activeCommitments.has(c.id)}
                  color={commitmentColors[c.id] || "#3b82f6"}
                  strengthInfo={strengthLabels[c.strength]}
                  onClick={() => toggleCommitment(c.id)}
                />
              ))}
            </div>
          </>
        )}
      </Subsection>
    </div>
  );
}

// ── Subsection ───────────────────────────────────────────────────────────────
function Subsection({
  icon, title, subtitle, active, onToggle, toggleColor,
  open, onOpenToggle, accentColor, children,
}: {
  icon: string; title: string; subtitle: string;
  active: boolean; onToggle: (v: boolean) => void; toggleColor: string;
  open: boolean; onOpenToggle: () => void; accentColor: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: open ? 8 : 0 }}>
        <button
          onClick={onOpenToggle}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 7, flex: 1, textAlign: "left" }}
        >
          <span style={{ fontSize: 13, color: accentColor }}>{icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{title}</div>
            <div style={{ fontSize: 10, color: "#475569", marginTop: 1 }}>{subtitle}</div>
          </div>
          <span style={{ fontSize: 8, color: "#334155", transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s", display: "inline-block", marginLeft: 4 }}>▶</span>
        </button>
        <Toggle checked={active} onChange={onToggle} color={toggleColor} />
      </div>
      {open && children}
    </div>
  );
}

// ── Commitment card ───────────────────────────────────────────────────────────
function CommitmentCard({
  name, year, type, description, article, color,
  active, strengthInfo, wikipedia, onClick,
}: {
  name: string; year: number; type: string; description: string;
  article?: string; color: string; active: boolean;
  strengthInfo: { label: string; color: string }; wikipedia?: string;
  onClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      borderRadius: 9,
      border: active ? `1.5px solid ${color}50` : "1px solid rgba(148,163,184,0.09)",
      background: active ? `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)` : "rgba(15,23,42,0.5)",
      transition: "all 0.14s",
      overflow: "hidden",
    }}>
      <button
        onClick={onClick}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "9px 11px 7px", textAlign: "left", display: "flex", alignItems: "flex-start", gap: 8 }}
      >
        <span style={{
          display: "inline-block", width: 9, height: 9, borderRadius: 3, marginTop: 2, flexShrink: 0,
          background: active ? color : "#1e3a5f",
          border: `1.5px solid ${active ? color : "#334155"}`,
          boxShadow: active ? `0 0 8px ${color}60` : "none",
          transition: "all 0.14s",
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: active ? "#f1f5f9" : "#94a3b8" }}>{name}</span>
            <span style={{ fontSize: 9, color: "#334155" }}>{year}</span>
          </div>
          <div style={{ display: "flex", gap: 3, marginTop: 3, flexWrap: "wrap" }}>
            <Tag label={type} bg="rgba(59,130,246,0.10)" color="#60a5fa" />
            <Tag label={strengthInfo.label} bg={strengthInfo.color + "18"} color={strengthInfo.color} />
          </div>
          {article && <div style={{ fontSize: 10, color: "#475569", marginTop: 3, fontStyle: "italic" }}>{article}</div>}
        </div>
      </button>

      <button
        onClick={() => setExpanded((v) => !v)}
        style={{ width: "100%", background: "none", border: "none", borderTop: "1px solid rgba(148,163,184,0.05)", cursor: "pointer", padding: "3px 11px", display: "flex", alignItems: "center", gap: 4, color: "#334155", fontSize: 10, textAlign: "left" }}
      >
        <span style={{ fontSize: 7, transform: expanded ? "rotate(90deg)" : "rotate(0)", display: "inline-block", transition: "transform 0.13s" }}>▶</span>
        {expanded ? "Hide" : "Details"}
      </button>

      {expanded && (
        <div style={{ padding: "7px 11px 9px", borderTop: "1px solid rgba(148,163,184,0.05)" }}>
          <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{description}</p>
          {wikipedia && (
            <a href={wikipedia} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              style={{ display: "inline-block", marginTop: 5, fontSize: 10, color: "#3b82f6", textDecoration: "none" }}>
              Source / Wikipedia →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── Nuclear Powers content ────────────────────────────────────────────────────
function NuclearContent({
  showNuclear, setShowNuclear,
}: { showNuclear: boolean; setShowNuclear: (v: boolean) => void }) {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const byStatus = (status: NuclearStatus) => nuclearPowers.filter((n) => n.status === status);

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: open ? 10 : 0 }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 7, flex: 1, textAlign: "left" }}
        >
          <span style={{ fontSize: 13, color: "#a855f7" }}>☢</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>Nuclear Powers</div>
            <div style={{ fontSize: 10, color: "#475569", marginTop: 1 }}>
              {showNuclear ? `${nuclearPowers.length} states · 4 categories` : "Hidden"}
            </div>
          </div>
          <span style={{ fontSize: 8, color: "#334155", transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s", display: "inline-block", marginLeft: 4 }}>▶</span>
        </button>
        <Toggle checked={showNuclear} onChange={setShowNuclear} color="#a855f7" />
      </div>

      {open && showNuclear && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(["p5", "declared", "undeclared", "sharing"] as NuclearStatus[]).map((status) => {
            const countries = byStatus(status);
            const color = nuclearStatusColors[status];
            return (
              <div key={status} style={{ borderRadius: 9, border: `1px solid ${color}25`, background: `${color}0a`, overflow: "hidden" }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 6px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: color, opacity: 0.9, flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color, flex: 1 }}>{nuclearStatusLabels[status]}</span>
                </div>
                {/* Country list */}
                <div style={{ padding: "0 10px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
                  {countries.map((np) => (
                    <div key={np.country} style={{ borderRadius: 6, overflow: "hidden" }}>
                      <button
                        onClick={() => setExpanded(expanded === np.country ? null : np.country)}
                        style={{
                          width: "100%", border: "none", cursor: "pointer",
                          padding: "5px 8px", display: "flex", alignItems: "center", gap: 8, textAlign: "left",
                          borderRadius: 6,
                          background: expanded === np.country ? `${color}12` : "transparent",
                        }}
                      >
                        <span style={{ fontSize: 11, color: "#cbd5e1", flex: 1, fontWeight: 500 }}>{np.country === "United States of America" ? "United States" : np.country}</span>
                        {np.warheads && (
                          <span style={{ fontSize: 10, color: color, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                            ~{np.warheads.toLocaleString()}
                          </span>
                        )}
                        {np.firstTest && (
                          <span style={{ fontSize: 9, color: "#475569" }}>{np.firstTest}</span>
                        )}
                        <span style={{ fontSize: 7, color: "#334155", transform: expanded === np.country ? "rotate(90deg)" : "rotate(0)", display: "inline-block", transition: "transform 0.13s" }}>▶</span>
                      </button>
                      {expanded === np.country && (
                        <div style={{ padding: "4px 8px 8px", background: `${color}0d` }}>
                          <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{np.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Total warhead note */}
          <p style={{ fontSize: 10, color: "#334155", lineHeight: 1.5, margin: "0 2px", fontStyle: "italic" }}>
            ~12,500 nuclear warheads exist globally. ~90% held by Russia and the US.
            Sources: SIPRI 2024, FAS Nuclear Notebook.
          </p>
        </div>
      )}
    </div>
  );
}

function Tag({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 4, background: bg, color, fontWeight: 600, textTransform: "capitalize", letterSpacing: "0.04em" }}>
      {label}
    </span>
  );
}

function Toggle({ checked, onChange, color }: { checked: boolean; onChange: (v: boolean) => void; color: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        position: "relative", width: 34, height: 19, borderRadius: 10, flexShrink: 0,
        background: checked ? color : "#1e293b",
        border: `1px solid ${checked ? color : "#334155"}`,
        cursor: "pointer", transition: "all 0.18s",
        boxShadow: checked ? `0 0 10px ${color}50` : "none",
      }}
    >
      <span style={{
        position: "absolute", top: 2, left: checked ? 15 : 2,
        width: 13, height: 13, borderRadius: "50%",
        background: checked ? "#fff" : "#475569",
        transition: "left 0.18s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}
