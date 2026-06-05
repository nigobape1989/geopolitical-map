export interface SecurityCommitment {
  id: string;
  name: string;
  type: "treaty" | "agreement" | "executive";
  countries: string[];
  year: number;
  article?: string; // The specific defense clause
  description: string;
  wikipedia?: string;
  // For drawing: country centroids (approximate)
  countryCentroids: { country: string; lat: number; lng: number }[];
}

export const securityCommitments: SecurityCommitment[] = [
  {
    id: "nato",
    name: "NATO",
    type: "treaty",
    year: 1949,
    article: "Article 5 — collective defense",
    description: "North Atlantic Treaty Organization. An attack on one member is an attack on all. The US is obligated to defend all 32 members.",
    wikipedia: "https://en.wikipedia.org/wiki/Article_5_of_the_North_Atlantic_Treaty",
    countries: [
      "Albania", "Belgium", "Bulgaria", "Canada", "Croatia", "Czech Republic",
      "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
      "Hungary", "Iceland", "Italy", "Latvia", "Lithuania", "Luxembourg",
      "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland",
      "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
      "Turkey", "United Kingdom"
    ],
    countryCentroids: [
      { country: "Albania", lat: 41.15, lng: 20.17 },
      { country: "Belgium", lat: 50.84, lng: 4.47 },
      { country: "Bulgaria", lat: 42.73, lng: 25.49 },
      { country: "Canada", lat: 56.13, lng: -106.35 },
      { country: "Croatia", lat: 45.10, lng: 15.20 },
      { country: "Czech Republic", lat: 49.82, lng: 15.47 },
      { country: "Denmark", lat: 56.26, lng: 9.50 },
      { country: "Estonia", lat: 58.60, lng: 25.01 },
      { country: "Finland", lat: 61.92, lng: 25.75 },
      { country: "France", lat: 46.23, lng: 2.21 },
      { country: "Germany", lat: 51.17, lng: 10.45 },
      { country: "Greece", lat: 39.07, lng: 21.82 },
      { country: "Hungary", lat: 47.16, lng: 19.50 },
      { country: "Iceland", lat: 64.96, lng: -19.02 },
      { country: "Italy", lat: 41.87, lng: 12.57 },
      { country: "Latvia", lat: 56.88, lng: 24.60 },
      { country: "Lithuania", lat: 55.17, lng: 23.88 },
      { country: "Luxembourg", lat: 49.82, lng: 6.13 },
      { country: "Montenegro", lat: 42.71, lng: 19.37 },
      { country: "Netherlands", lat: 52.13, lng: 5.29 },
      { country: "North Macedonia", lat: 41.61, lng: 21.75 },
      { country: "Norway", lat: 60.47, lng: 8.47 },
      { country: "Poland", lat: 51.92, lng: 19.15 },
      { country: "Portugal", lat: 39.40, lng: -8.22 },
      { country: "Romania", lat: 45.94, lng: 24.97 },
      { country: "Slovakia", lat: 48.67, lng: 19.70 },
      { country: "Slovenia", lat: 46.15, lng: 14.99 },
      { country: "Spain", lat: 40.46, lng: -3.75 },
      { country: "Sweden", lat: 60.13, lng: 18.64 },
      { country: "Turkey", lat: 38.96, lng: 35.24 },
      { country: "United Kingdom", lat: 55.38, lng: -3.44 },
    ],
  },
  {
    id: "japan",
    name: "US–Japan Security Treaty",
    type: "treaty",
    year: 1960,
    article: "Article 5 — mutual defense",
    description: "The Treaty of Mutual Cooperation and Security between the United States and Japan. The US is obligated to defend Japan. Japan hosts ~54,000 US troops.",
    wikipedia: "https://en.wikipedia.org/wiki/Treaty_of_Mutual_Cooperation_and_Security_between_the_United_States_and_Japan",
    countries: ["Japan"],
    countryCentroids: [{ country: "Japan", lat: 36.20, lng: 138.25 }],
  },
  {
    id: "south_korea",
    name: "US–South Korea Mutual Defense Treaty",
    type: "treaty",
    year: 1953,
    article: "Article 3 — mutual defense",
    description: "Signed after the Korean War armistice. The US is obligated to defend South Korea. ~28,500 US troops stationed there.",
    wikipedia: "https://en.wikipedia.org/wiki/Mutual_Defense_Treaty_Between_the_United_States_and_the_Republic_of_Korea",
    countries: ["South Korea"],
    countryCentroids: [{ country: "South Korea", lat: 35.91, lng: 127.77 }],
  },
  {
    id: "philippines",
    name: "US–Philippines Mutual Defense Treaty",
    type: "treaty",
    year: 1951,
    article: "Article 4 — mutual defense",
    description: "Obligates the US to defend the Philippines against armed attack. Reaffirmed in 2023 to explicitly include South China Sea.",
    wikipedia: "https://en.wikipedia.org/wiki/Mutual_Defense_Treaty_(United_States%E2%80%93Philippines)",
    countries: ["Philippines"],
    countryCentroids: [{ country: "Philippines", lat: 12.88, lng: 121.77 }],
  },
  {
    id: "anzus",
    name: "ANZUS Treaty",
    type: "treaty",
    year: 1951,
    article: "Article 4 — mutual defense",
    description: "Security treaty between Australia, New Zealand, and the United States. NZ's obligations are suspended (1986) after nuclear dispute, but US–Australia commitments remain active.",
    wikipedia: "https://en.wikipedia.org/wiki/ANZUS",
    countries: ["Australia", "New Zealand"],
    countryCentroids: [
      { country: "Australia", lat: -25.27, lng: 133.78 },
      { country: "New Zealand", lat: -40.90, lng: 174.89 },
    ],
  },
  {
    id: "taiwan",
    name: "Taiwan Relations Act",
    type: "agreement",
    year: 1979,
    description: "Not a formal treaty, but the US considers any non-peaceful resolution of Taiwan's status a matter of 'grave concern' and is legally obligated to provide Taiwan with defensive arms. US policy of strategic ambiguity.",
    wikipedia: "https://en.wikipedia.org/wiki/Taiwan_Relations_Act",
    countries: ["Taiwan"],
    countryCentroids: [{ country: "Taiwan", lat: 23.70, lng: 120.96 }],
  },
  {
    id: "israel",
    name: "US–Israel Memorandum of Understanding",
    type: "agreement",
    year: 2016,
    description: "The US provides $3.8B/year in military aid and has strong security commitments via MoUs, though no formal mutual defense treaty. US has pledged to ensure Israel's Qualitative Military Edge (QME).",
    wikipedia: "https://en.wikipedia.org/wiki/United_States%E2%80%93Israel_relations",
    countries: ["Israel"],
    countryCentroids: [{ country: "Israel", lat: 31.05, lng: 34.85 }],
  },
  {
    id: "rio",
    name: "Inter-American Treaty of Reciprocal Assistance (Rio Treaty)",
    type: "treaty",
    year: 1947,
    article: "Article 3 — mutual defense",
    description: "Western Hemisphere collective defense treaty. An attack on any member is an attack on all. Several members have suspended participation. Signatories include most of Latin America.",
    wikipedia: "https://en.wikipedia.org/wiki/Inter-American_Treaty_of_Reciprocal_Assistance",
    countries: [
      "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Costa Rica",
      "Cuba", "Dominican Republic", "Ecuador", "El Salvador", "Guatemala",
      "Haiti", "Honduras", "Mexico", "Nicaragua", "Panama", "Paraguay",
      "Peru", "Trinidad and Tobago", "Uruguay", "Venezuela"
    ],
    countryCentroids: [
      { country: "Argentina", lat: -38.42, lng: -63.62 },
      { country: "Bolivia", lat: -16.29, lng: -63.59 },
      { country: "Brazil", lat: -14.24, lng: -51.93 },
      { country: "Chile", lat: -35.68, lng: -71.54 },
      { country: "Colombia", lat: 4.57, lng: -74.30 },
      { country: "Costa Rica", lat: 9.75, lng: -83.75 },
      { country: "Dominican Republic", lat: 18.74, lng: -70.16 },
      { country: "Ecuador", lat: -1.83, lng: -78.18 },
      { country: "El Salvador", lat: 13.79, lng: -88.90 },
      { country: "Guatemala", lat: 15.78, lng: -90.23 },
      { country: "Haiti", lat: 18.97, lng: -72.29 },
      { country: "Honduras", lat: 15.20, lng: -86.24 },
      { country: "Mexico", lat: 23.63, lng: -102.55 },
      { country: "Nicaragua", lat: 12.87, lng: -85.21 },
      { country: "Panama", lat: 8.54, lng: -80.78 },
      { country: "Paraguay", lat: -23.44, lng: -58.44 },
      { country: "Peru", lat: -9.19, lng: -75.02 },
      { country: "Trinidad and Tobago", lat: 10.69, lng: -61.22 },
      { country: "Uruguay", lat: -32.52, lng: -55.77 },
      { country: "Venezuela", lat: 6.42, lng: -66.59 },
    ],
  },
  {
    id: "kuwait",
    name: "US–Kuwait Defense Cooperation Agreement",
    type: "agreement",
    year: 1991,
    description: "Bilateral defense agreement allowing US military presence in Kuwait. Renewed multiple times. Kuwait hosts ~13,000 US troops.",
    wikipedia: "https://en.wikipedia.org/wiki/United_States%E2%80%93Kuwait_relations",
    countries: ["Kuwait"],
    countryCentroids: [{ country: "Kuwait", lat: 29.31, lng: 47.48 }],
  },
  {
    id: "bahrain",
    name: "US–Bahrain Defense Cooperation Agreement",
    type: "agreement",
    year: 1991,
    description: "Bahrain hosts the US 5th Fleet and NAVCENT. Defense cooperation agreement renewed in 2021.",
    wikipedia: "https://en.wikipedia.org/wiki/United_States%E2%80%93Bahrain_relations",
    countries: ["Bahrain"],
    countryCentroids: [{ country: "Bahrain", lat: 26.07, lng: 50.55 }],
  },
];

export const commitmentColors: Record<string, string> = {
  nato: "#3b82f6",          // blue
  japan: "#ef4444",         // red
  south_korea: "#f97316",   // orange
  philippines: "#eab308",   // yellow
  anzus: "#22c55e",         // green
  taiwan: "#8b5cf6",        // purple
  israel: "#06b6d4",        // cyan
  rio: "#ec4899",           // pink
  kuwait: "#f59e0b",        // amber
  bahrain: "#10b981",       // emerald
};
