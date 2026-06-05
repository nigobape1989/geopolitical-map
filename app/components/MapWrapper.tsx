"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import SidePanel from "./SidePanel";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

export default function MapWrapper() {
  const [showBases, setShowBases] = useState(false);
  const [showCommitments, setShowCommitments] = useState(false);
  const [activeCommitments, setActiveCommitments] = useState<Set<string>>(new Set());

  function toggleCommitment(id: string) {
    setActiveCommitments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleShowCommitments(v: boolean) {
    setShowCommitments(v);
    if (!v) setActiveCommitments(new Set());
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex-1 relative">
        <WorldMap
          showBases={showBases}
          showCommitments={showCommitments}
          activeCommitments={activeCommitments}
        />
      </div>
      <SidePanel
        showBases={showBases}
        setShowBases={setShowBases}
        showCommitments={showCommitments}
        setShowCommitments={handleShowCommitments}
        activeCommitments={activeCommitments}
        toggleCommitment={toggleCommitment}
      />
    </div>
  );
}
