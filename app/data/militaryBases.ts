export interface MilitaryBase {
  name: string;
  country: string;
  lat: number;
  lng: number;
  personnel?: number;
  notes?: string;
  prominent?: boolean; // render larger — base is in a small/hard-to-see territory
  withdrawn?: boolean; // base closed or withdrawn
}

// US military bases and major forward operating locations abroad
// Sources: DoD, Wikipedia, Congressional Research Service, AFRICOM
export const militaryBases: MilitaryBase[] = [

  // ── JAPAN ──────────────────────────────────────────────────────────────────
  { name: "Kadena Air Base", country: "Japan", lat: 26.356, lng: 127.768, personnel: 18000, notes: "Largest USAF base in Asia, 18th Wing" },
  { name: "Camp Foster (Camp Butler)", country: "Japan", lat: 26.274, lng: 127.757, personnel: 12000, notes: "III MEF HQ, Okinawa" },
  { name: "Yokosuka Naval Base", country: "Japan", lat: 35.283, lng: 139.666, personnel: 7000, notes: "US 7th Fleet HQ" },
  { name: "Misawa Air Base", country: "Japan", lat: 40.703, lng: 141.368, personnel: 5000 },
  { name: "Camp Zama", country: "Japan", lat: 35.494, lng: 139.394, personnel: 2500, notes: "US Army Japan HQ" },
  { name: "Yokota Air Base", country: "Japan", lat: 35.748, lng: 139.348, personnel: 3500, notes: "US Forces Japan HQ" },
  { name: "MCAS Iwakuni", country: "Japan", lat: 34.144, lng: 132.235, personnel: 4000 },

  // ── SOUTH KOREA ────────────────────────────────────────────────────────────
  { name: "Camp Humphreys", country: "South Korea", lat: 36.972, lng: 127.029, personnel: 36000, notes: "Largest US overseas base in the world" },
  { name: "Osan Air Base", country: "South Korea", lat: 37.090, lng: 127.029, personnel: 3500 },
  { name: "Kunsan Air Base", country: "South Korea", lat: 35.903, lng: 126.616, personnel: 2500 },

  // ── GERMANY ────────────────────────────────────────────────────────────────
  { name: "Ramstein Air Base", country: "Germany", lat: 49.437, lng: 7.600, personnel: 9000, notes: "USAFE-AFAFRICA HQ; drone operations hub" },
  { name: "Spangdahlem Air Base", country: "Germany", lat: 49.972, lng: 6.692, personnel: 4000 },
  { name: "Grafenwöhr Training Area", country: "Germany", lat: 49.698, lng: 11.942, personnel: 6500 },
  { name: "Landstuhl Regional Medical Center", country: "Germany", lat: 49.412, lng: 7.571, personnel: 3000, notes: "Largest US military hospital outside CONUS" },
  { name: "HQ EUCOM / AFRICOM Stuttgart", country: "Germany", lat: 48.735, lng: 9.068, personnel: 10000, notes: "EUCOM and AFRICOM dual HQ" },

  // ── UNITED KINGDOM ─────────────────────────────────────────────────────────
  { name: "RAF Lakenheath", country: "United Kingdom", lat: 52.409, lng: 0.560, personnel: 4500, notes: "Only USAF F-35A wing in Europe" },
  { name: "RAF Mildenhall", country: "United Kingdom", lat: 52.361, lng: 0.486, personnel: 3500, notes: "USAFE tankers & ISR" },
  { name: "RAF Croughton", country: "United Kingdom", lat: 52.072, lng: -1.194, personnel: 1200, notes: "NSA/USAF signals intelligence" },

  // ── ITALY ──────────────────────────────────────────────────────────────────
  { name: "NAS Sigonella", country: "Italy", lat: 37.402, lng: 14.923, personnel: 4500, notes: "Key Mediterranean P-8 and drone hub" },
  { name: "Aviano Air Base", country: "Italy", lat: 46.032, lng: 12.597, personnel: 3500 },
  { name: "Camp Darby", country: "Italy", lat: 43.681, lng: 10.358, personnel: 700, notes: "Army prepositioned war stocks" },
  { name: "NSA Naples", country: "Italy", lat: 40.923, lng: 14.291, personnel: 6000, notes: "US 6th Fleet HQ" },

  // ── SPAIN ──────────────────────────────────────────────────────────────────
  { name: "Naval Station Rota", country: "Spain", lat: 36.645, lng: -6.349, personnel: 3500, notes: "BMD destroyers; key Atlantic hub" },

  // ── GREECE ─────────────────────────────────────────────────────────────────
  { name: "NSA Souda Bay", country: "Greece", lat: 35.508, lng: 24.072, personnel: 800 },

  // ── PORTUGAL (AZORES) ──────────────────────────────────────────────────────
  { name: "Lajes Field (Azores)", country: "Portugal", lat: 38.762, lng: -27.091, personnel: 650, notes: "Strategic mid-Atlantic refueling" },

  // ── ROMANIA ────────────────────────────────────────────────────────────────
  { name: "Mihail Kogălniceanu Air Base", country: "Romania", lat: 44.362, lng: 28.488, personnel: 4000, notes: "NATO Eastern flank hub, surge capacity" },
  { name: "Deveselu (Aegis Ashore)", country: "Romania", lat: 44.143, lng: 24.088, personnel: 500, notes: "US ballistic missile defense site" },

  // ── POLAND ─────────────────────────────────────────────────────────────────
  { name: "V Corps FWD / Camp Kościuszko", country: "Poland", lat: 52.413, lng: 16.951, personnel: 5500, notes: "V Corps forward HQ; largest US Army presence in Europe" },
  { name: "Redzikowo (Aegis Ashore)", country: "Poland", lat: 54.332, lng: 17.537, personnel: 250, notes: "US ballistic missile defense site" },

  // ── BULGARIA ───────────────────────────────────────────────────────────────
  { name: "Novo Selo Training Area", country: "Bulgaria", lat: 42.380, lng: 26.375, personnel: 500, notes: "US Army Garrison Black Sea" },
  { name: "Bezmer Air Base", country: "Bulgaria", lat: 42.456, lng: 26.351, personnel: 300 },

  // ── TURKEY ─────────────────────────────────────────────────────────────────
  { name: "İncirlik Air Base", country: "Turkey", lat: 37.002, lng: 35.426, personnel: 1500, notes: "B61 nuclear weapons stored; access issues with Turkey" },

  // ── BAHRAIN ────────────────────────────────────────────────────────────────
  { name: "NSA Bahrain", country: "Bahrain", lat: 26.228, lng: 50.601, personnel: 7000, notes: "US 5th Fleet / NAVCENT HQ", prominent: true },

  // ── QATAR ──────────────────────────────────────────────────────────────────
  { name: "Al Udeid Air Base", country: "Qatar", lat: 25.117, lng: 51.315, personnel: 10000, notes: "CENTCOM FWD HQ; largest US air base in Middle East", prominent: true },

  // ── KUWAIT ─────────────────────────────────────────────────────────────────
  { name: "Camp Arifjan", country: "Kuwait", lat: 29.196, lng: 47.961, personnel: 13000, notes: "ARCENT HQ", prominent: true },
  { name: "Ali Al Salem Air Base", country: "Kuwait", lat: 29.350, lng: 47.521, personnel: 2000, prominent: true },

  // ── UAE ────────────────────────────────────────────────────────────────────
  { name: "Al Dhafra Air Base", country: "UAE", lat: 24.248, lng: 54.548, personnel: 2000, notes: "F-35s, RQ-4 Global Hawks" },

  // ── SAUDI ARABIA ───────────────────────────────────────────────────────────
  { name: "Prince Sultan Air Base", country: "Saudi Arabia", lat: 24.062, lng: 47.580, personnel: 3000, notes: "Reactivated 2019; F-15s, Patriot batteries" },

  // ── IRAQ ───────────────────────────────────────────────────────────────────
  { name: "Ain al-Assad Airbase", country: "Iraq", lat: 33.785, lng: 42.438, personnel: 2000, notes: "Western Iraq (Anbar); site of 2020 Iranian ballistic missile strike" },
  { name: "Erbil Air Base", country: "Iraq", lat: 36.237, lng: 44.099, personnel: 1500, notes: "Kurdistan Region; US-led CJTF-OIR" },
  { name: "Union III / Camp Victory (Baghdad)", country: "Iraq", lat: 33.293, lng: 44.234, personnel: 1000, notes: "Baghdad embassy compound area; OIR HQ" },

  // ── SYRIA ──────────────────────────────────────────────────────────────────
  { name: "Al-Tanf Garrison", country: "Syria", lat: 33.470, lng: 38.668, personnel: 200, notes: "Withdrawn February 2026. Was key to blocking Iran land corridor.", withdrawn: true },
  { name: "Conoco FOB / Green Village", country: "Syria", lat: 35.115, lng: 40.155, personnel: 500, notes: "Deir ez-Zor; secures SDF oil fields; status uncertain post-Assad fall" },

  // ── JORDAN ─────────────────────────────────────────────────────────────────
  { name: "Muwaffaq Salti Air Base (Azraq)", country: "Jordan", lat: 31.826, lng: 36.787, personnel: 3000, notes: "332nd AEW; major air hub for Middle East operations" },
  { name: "Prince Hassan Air Base", country: "Jordan", lat: 32.161, lng: 37.149, personnel: 500 },
  { name: "Camp Tigerland / Tower 22", country: "Jordan", lat: 32.461, lng: 38.217, personnel: 350, notes: "Site of Jan 2024 Iranian drone attack killing 3 US soldiers" },

  // ── OMAN ───────────────────────────────────────────────────────────────────
  { name: "Masirah Air Base", country: "Oman", lat: 20.676, lng: 58.893, personnel: 600, notes: "Indian Ocean access; used for Afghanistan operations", prominent: true },

  // ── DJIBOUTI ───────────────────────────────────────────────────────────────
  { name: "Camp Lemonnier", country: "Djibouti", lat: 11.546, lng: 43.159, personnel: 4000, notes: "Only permanent US base in Africa; CJTF-HOA HQ", prominent: true },

  // ── SOMALIA ────────────────────────────────────────────────────────────────
  { name: "Baledogle Airfield", country: "Somalia", lat: 2.338, lng: 44.770, personnel: 500, notes: "US drone base; trains Somali special forces" },

  // ── KENYA ──────────────────────────────────────────────────────────────────
  { name: "Camp Simba / Manda Bay", country: "Kenya", lat: -2.171, lng: 40.897, personnel: 400, notes: "Drones; counterterrorism ops in Somalia; attacked 2020" },

  // ── CAMEROON ───────────────────────────────────────────────────────────────
  { name: "Contingency Location Garoua", country: "Cameroon", lat: 9.337, lng: 13.378, personnel: 300, notes: "Lake Chad Basin CVE operations" },

  // ── SENEGAL ────────────────────────────────────────────────────────────────
  { name: "Cooperative Security Location Dakar", country: "Senegal", lat: 14.739, lng: -17.490, personnel: 200, notes: "Dakar Airport compound; West Africa logistics" },

  // ── GHANA ──────────────────────────────────────────────────────────────────
  { name: "Cooperative Security Location Accra", country: "Ghana", lat: 5.605, lng: -0.167, personnel: 150, notes: "West Africa Logistics Network" },

  // ── EGYPT ──────────────────────────────────────────────────────────────────
  { name: "MFO Sinai (North Camp)", country: "Egypt", lat: 31.082, lng: 33.591, personnel: 700, notes: "Multinational Force & Observers; enforces Egypt–Israel peace treaty" },

  // ── DIEGO GARCIA (BIOT) ────────────────────────────────────────────────────
  { name: "Diego Garcia (BIOT)", country: "British Indian Ocean Territory", lat: -7.313, lng: 72.412, personnel: 3000, notes: "Key Indian Ocean hub; B-2 bombers, submarines, prepositioned ships", prominent: true },

  // ── GUAM (US TERRITORY) ────────────────────────────────────────────────────
  { name: "Andersen Air Force Base", country: "Guam", lat: 13.584, lng: 144.929, personnel: 3500, prominent: true },
  { name: "Naval Base Guam", country: "Guam", lat: 13.442, lng: 144.651, personnel: 4000, prominent: true },

  // ── AUSTRALIA ──────────────────────────────────────────────────────────────
  { name: "Pine Gap", country: "Australia", lat: -23.799, lng: 133.737, personnel: 800, notes: "NRO/CIA/NSA joint facility; satellite surveillance" },
  { name: "NCS Harold E. Holt", country: "Australia", lat: -21.817, lng: 114.167, personnel: 300, notes: "Very low frequency submarine comms" },
  { name: "RAAF Darwin (MRF-D)", country: "Australia", lat: -12.424, lng: 130.877, personnel: 2500, notes: "Marine Rotational Force Darwin (AUKUS)" },

  // ── PHILIPPINES ────────────────────────────────────────────────────────────
  { name: "Antonio Bautista AB (EDCA)", country: "Philippines", lat: 9.328, lng: 118.063, personnel: 100, notes: "EDCA site — Palawan, faces South China Sea", prominent: true },
  { name: "Basa Air Base (EDCA)", country: "Philippines", lat: 14.988, lng: 120.493, personnel: 100, notes: "EDCA site" },
  { name: "Fort Magsaysay (EDCA)", country: "Philippines", lat: 15.491, lng: 121.094, personnel: 100, notes: "EDCA site" },
  { name: "Camilo Osias Naval Base (EDCA)", country: "Philippines", lat: 18.405, lng: 122.143, personnel: 100, notes: "EDCA site — Cagayan, faces Taiwan Strait", prominent: true },
  { name: "Mactan-Benito Ebuen AB (EDCA)", country: "Philippines", lat: 10.265, lng: 123.978, personnel: 100, notes: "EDCA site" },
  { name: "Lal-Lo Airport (EDCA)", country: "Philippines", lat: 18.202, lng: 121.703, personnel: 100, notes: "EDCA site — new 2024" },
  { name: "Balabac Island (EDCA)", country: "Philippines", lat: 7.986, lng: 117.059, personnel: 100, notes: "EDCA site — new 2024", prominent: true },

  // ── KOSOVO ─────────────────────────────────────────────────────────────────
  { name: "Camp Bondsteel", country: "Kosovo", lat: 42.357, lng: 21.347, personnel: 700, notes: "Largest US base in Balkans; KFOR since 1999", prominent: true },

  // ── HONDURAS ───────────────────────────────────────────────────────────────
  { name: "Soto Cano Air Base", country: "Honduras", lat: 14.382, lng: -87.621, personnel: 600, notes: "Joint Task Force Bravo" },

  // ── CUBA ───────────────────────────────────────────────────────────────────
  { name: "Guantanamo Bay Naval Station", country: "Cuba", lat: 19.906, lng: -75.101, personnel: 6000, notes: "Oldest US overseas base (leased 1903); detention facility", prominent: true },

  // ── GREENLAND ──────────────────────────────────────────────────────────────
  { name: "Pituffik Space Base (Thule)", country: "Greenland", lat: 76.531, lng: -68.703, personnel: 400, notes: "Space surveillance; missile warning; strategic Arctic position", prominent: true },
];
