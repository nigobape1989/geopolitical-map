export type NuclearStatus = "p5" | "declared" | "undeclared" | "sharing";

export interface NuclearPower {
  country: string;
  status: NuclearStatus;
  warheads?: number;
  firstTest?: number;
  notes: string;
}

// Sources: SIPRI Yearbook 2024, Arms Control Association, FAS Nuclear Notebook
export const nuclearPowers: NuclearPower[] = [
  // ── NPT P5 ────────────────────────────────────────────────────────────────
  {
    country: "Russia",
    status: "p5",
    warheads: 5580,
    firstTest: 1949,
    notes: "World's largest nuclear arsenal. ~1,550 deployed on ICBMs, SLBMs, and bombers under New START. ~4,000 in reserve/storage.",
  },
  {
    country: "United States of America",
    status: "p5",
    warheads: 5044,
    firstTest: 1945,
    notes: "~1,700 warheads deployed. First nation to develop and use nuclear weapons (Trinity 1945, Hiroshima and Nagasaki). Hosts B61 tactical nukes at 5 NATO allies.",
  },
  {
    country: "China",
    status: "p5",
    warheads: 410,
    firstTest: 1964,
    notes: "Arsenal growing rapidly — Pentagon projects 1,500 warheads by 2035. First full nuclear triad operational. No-first-use doctrine (disputed).",
  },
  {
    country: "France",
    status: "p5",
    warheads: 290,
    firstTest: 1960,
    notes: "Independent deterrent; not integrated into NATO command. ASMP-A air-launched cruise missiles and M51 SLBMs (submarine-based).",
  },
  {
    country: "United Kingdom",
    status: "p5",
    warheads: 225,
    firstTest: 1952,
    notes: "Minimum credible deterrent. Vanguard-class SSBN submarines (one always at sea). Shares US Trident II D5 missiles.",
  },

  // ── Declared, outside NPT ─────────────────────────────────────────────────
  {
    country: "India",
    status: "declared",
    warheads: 172,
    firstTest: 1974,
    notes: "Declared in 1998 ('Smiling Buddha' 1974, 'Pokhran-II' 1998). No-first-use policy. Triad capability. Refuses to sign NPT as non-nuclear state.",
  },
  {
    country: "Pakistan",
    status: "declared",
    warheads: 170,
    firstTest: 1998,
    notes: "Developed in response to India. Does NOT have a no-first-use policy — explicitly reserves first use against conventional attack. A.Q. Khan proliferation network.",
  },
  {
    country: "North Korea",
    status: "declared",
    warheads: 50,
    firstTest: 2006,
    notes: "Withdrew from NPT in 2003. ~50 warheads estimated. Tests of ICBMs (Hwasong-17) demonstrate range to reach continental US. Tactical nukes declared 2022.",
  },

  // ── Undeclared / presumed ─────────────────────────────────────────────────
  {
    country: "Israel",
    status: "undeclared",
    warheads: 90,
    notes: "Policy of nuclear ambiguity — never confirmed or denied. Widely assessed by intelligence agencies to possess ~90 warheads. Developed with French assistance in 1960s. Refuses NPT.",
  },

  // ── NATO Nuclear Sharing (host US B61 tactical nukes) ─────────────────────
  {
    country: "Belgium",
    status: "sharing",
    notes: "Hosts ~20 US B61-12 gravity bombs at Kleine Brogel Air Base. Belgian F-35As certified to deliver them.",
  },
  {
    country: "Germany",
    status: "sharing",
    notes: "Hosts ~15 US B61-12 bombs at Büchel Air Base. Tornado and future F-35A delivery. Political controversy domestically.",
  },
  {
    country: "Italy",
    status: "sharing",
    notes: "Hosts ~35 US B61-12 bombs split between Aviano (USAF) and Ghedi (Italian AF). F-35A certified.",
  },
  {
    country: "Netherlands",
    status: "sharing",
    notes: "Hosts ~20 US B61-12 bombs at Volkel Air Base. Dutch F-35As certified. Parliament has repeatedly sought removal.",
  },
  {
    country: "Turkey",
    status: "sharing",
    notes: "Hosts ~50 US B61-12 bombs at İncirlik Air Base. Largest NATO nuclear sharing stockpile. Turkey blocked access during 2016 coup attempt. Future of arrangement debated.",
  },
];

export const nuclearStatusColors: Record<NuclearStatus, string> = {
  p5: "#ef4444",        // red — recognized nuclear power
  declared: "#f97316",  // orange — declared non-NPT
  undeclared: "#a855f7", // purple — undeclared/presumed
  sharing: "#eab308",   // yellow — NATO nuclear sharing
};

export const nuclearStatusLabels: Record<NuclearStatus, string> = {
  p5: "NPT P5 — Recognized Nuclear Power",
  declared: "Declared (non-NPT)",
  undeclared: "Undeclared / Presumed",
  sharing: "NATO Nuclear Sharing (hosts US B61s)",
};
