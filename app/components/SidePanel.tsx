"use client";

import { useState } from "react";
import { securityCommitments, commitmentColors, strengthLabels } from "../data/securityCommitments";

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
  const [commitmentOpen, setCommitmentOpen] = useState(true);
  const [basesOpen, setBasesOpen] = useState(true);

  return (
    <aside
      className="relative flex flex-col"
      style={{
        width: 320,
        minWidth: 300,
        height: "100%",
        background: "linear-gradient(160deg, #0f172a 0%, #0c1322 100%)",
        borderRight: "1px solid rgba(148,163,184,0.12)",
        boxShadow: "4px 0 32px rgba(0,0,0,0.45)",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "22px 20px 18px",
          borderBottom: "1px solid rgba(148,163,184,0.1)",
          background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 60%)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#3b82f6",
              boxShadow: "0 0 8px #3b82f6",
            }}
          />
          <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
            Intelligence Overlay
          </span>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: 4 }}>
          US Global Presence
        </h1>
        <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
          Military installations &amp; security commitments worldwide
        </p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "12px 0" }}>

        {/* ── Military Bases Section ── */}
        <Section
          title="Military Bases Abroad"
          subtitle={`${showBases ? "Showing" : "Hidden"} · ~800 installations`}
          active={showBases}
          onToggle={setShowBases}
          toggleColor="#ef4444"
          open={basesOpen}
          onOpenToggle={() => setBasesOpen((v) => !v)}
          accentColor="#ef4444"
          icon="⬡"
        >
          <div
            style={{
              background: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.18)",
              borderRadius: 8,
              padding: "10px 12px",
              margin: "4px 0 8px",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#dc2626",
                  border: "1.5px solid #7f1d1d",
                  boxShadow: "0 0 6px rgba(220,38,38,0.5)",
                }}
              />
              <span style={{ fontSize: 12, color: "#fca5a5", fontWeight: 500 }}>
                US military installation
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>
              Click any marker for name, personnel count, and notes. Covers major permanent and rotational bases.
            </p>
          </div>
        </Section>

        <Divider />

        {/* ── Security Commitments Section ── */}
        <Section
          title="Security Commitments"
          subtitle={`${showCommitments ? `${activeCommitments.size > 0 ? activeCommitments.size + " selected" : "All shown in blue"}` : "Hidden"} · ${securityCommitments.length} agreements`}
          active={showCommitments}
          onToggle={setShowCommitments}
          toggleColor="#3b82f6"
          open={commitmentOpen}
          onOpenToggle={() => setCommitmentOpen((v) => !v)}
          accentColor="#3b82f6"
          icon="◈"
        >
          {showCommitments && (
            <>
              <p style={{ fontSize: 11, color: "#475569", marginBottom: 8, lineHeight: 1.5 }}>
                All allies shown in <span style={{ color: "#3b82f6", fontWeight: 600 }}>blue</span> by default.
                Select a specific treaty to highlight it in its own color.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {securityCommitments.map((c) => {
                  const active = activeCommitments.has(c.id);
                  const color = commitmentColors[c.id] || "#3b82f6";
                  const strength = strengthLabels[c.strength];
                  return (
                    <CommitmentCard
                      key={c.id}
                      name={c.name}
                      year={c.year}
                      type={c.type}
                      description={c.description}
                      article={c.article}
                      color={color}
                      active={active}
                      strength={strength}
                      wikipedia={c.wikipedia}
                      onClick={() => toggleCommitment(c.id)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </Section>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid rgba(148,163,184,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 10, color: "#334155", letterSpacing: "0.05em" }}>
          SOURCES: DoD · Wikipedia · US State Dept
        </span>
        <span style={{ fontSize: 10, color: "#1e3a5f", fontWeight: 600 }}>
          2025
        </span>
      </div>
    </aside>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Divider() {
  return <div style={{ height: 1, background: "rgba(148,163,184,0.08)", margin: "4px 20px" }} />;
}

function Section({
  title,
  subtitle,
  active,
  onToggle,
  toggleColor,
  open,
  onOpenToggle,
  accentColor,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  active: boolean;
  onToggle: (v: boolean) => void;
  toggleColor: string;
  open: boolean;
  onOpenToggle: () => void;
  accentColor: string;
  icon: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ padding: "10px 20px" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: open && active ? 10 : 0 }}>
        <button
          onClick={onOpenToggle}
          className="flex items-center gap-2 flex-1 text-left"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span style={{ fontSize: 14, color: accentColor, lineHeight: 1 }}>{icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", letterSpacing: "-0.01em" }}>
              {title}
            </div>
            <div style={{ fontSize: 10, color: "#475569", marginTop: 1 }}>{subtitle}</div>
          </div>
          <span
            style={{
              marginLeft: 6,
              fontSize: 10,
              color: "#334155",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.15s",
              display: "inline-block",
            }}
          >
            ▶
          </span>
        </button>
        <Toggle checked={active} onChange={onToggle} color={toggleColor} />
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}

function CommitmentCard({
  name,
  year,
  type,
  description,
  article,
  color,
  active,
  strength,
  wikipedia,
  onClick,
}: {
  name: string;
  year: number;
  type: string;
  description: string;
  article?: string;
  color: string;
  active: boolean;
  strength: { label: string; color: string };
  wikipedia?: string;
  onClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        borderRadius: 10,
        border: active
          ? `1.5px solid ${color}55`
          : "1px solid rgba(148,163,184,0.1)",
        background: active
          ? `linear-gradient(135deg, ${color}14 0%, ${color}07 100%)`
          : "rgba(15,23,42,0.5)",
        transition: "all 0.15s ease",
        overflow: "hidden",
      }}
    >
      {/* Card header — click to select */}
      <button
        onClick={onClick}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "10px 12px 8px",
          textAlign: "left",
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        {/* Color swatch */}
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: 3,
            background: active ? color : "#1e3a5f",
            border: active ? `1.5px solid ${color}` : "1.5px solid #334155",
            marginTop: 2,
            flexShrink: 0,
            transition: "all 0.15s",
            boxShadow: active ? `0 0 8px ${color}66` : "none",
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#f1f5f9" : "#94a3b8" }}>
              {name}
            </span>
            <span style={{ fontSize: 10, color: "#334155" }}>{year}</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
            <Tag label={type} bg="rgba(59,130,246,0.12)" color="#60a5fa" />
            <Tag label={strength.label} bg={strength.color + "18"} color={strength.color} />
          </div>
          {article && (
            <div style={{ fontSize: 10, color: "#475569", marginTop: 4, fontStyle: "italic" }}>
              {article}
            </div>
          )}
        </div>
      </button>

      {/* Expand/collapse details */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          borderTop: "1px solid rgba(148,163,184,0.06)",
          cursor: "pointer",
          padding: "4px 12px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#334155",
          fontSize: 10,
          textAlign: "left",
        }}
      >
        <span style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.15s", fontSize: 8 }}>▶</span>
        {expanded ? "Hide details" : "Show details"}
      </button>

      {expanded && (
        <div style={{ padding: "8px 12px 10px", borderTop: "1px solid rgba(148,163,184,0.06)" }}>
          <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{description}</p>
          {wikipedia && (
            <a
              href={wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-block",
                marginTop: 6,
                fontSize: 10,
                color: "#3b82f6",
                textDecoration: "none",
              }}
            >
              Source / Wikipedia →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Tag({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      style={{
        fontSize: 9,
        padding: "2px 6px",
        borderRadius: 4,
        background: bg,
        color,
        fontWeight: 600,
        textTransform: "capitalize",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </span>
  );
}

function Toggle({
  checked,
  onChange,
  color,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  color: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        position: "relative",
        width: 36,
        height: 20,
        borderRadius: 10,
        background: checked ? color : "#1e293b",
        border: checked ? `1px solid ${color}` : "1px solid #334155",
        cursor: "pointer",
        transition: "all 0.2s",
        flexShrink: 0,
        boxShadow: checked ? `0 0 10px ${color}55` : "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 17 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: checked ? "#fff" : "#475569",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}
