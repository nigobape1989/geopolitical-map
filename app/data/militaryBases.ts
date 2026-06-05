export interface MilitaryBase {
  name: string;
  country: string;
  lat: number;
  lng: number;
  personnel?: number;
  notes?: string;
}

// US military bases abroad (major installations)
// Sources: DoD, Wikipedia
export const militaryBases: MilitaryBase[] = [
  // Japan
  { name: "Kadena Air Base", country: "Japan", lat: 26.356, lng: 127.768, personnel: 18000, notes: "Largest US Air Force base in Asia" },
  { name: "Camp Foster (Camp Butler)", country: "Japan", lat: 26.274, lng: 127.757, personnel: 12000, notes: "III Marine Expeditionary Force HQ" },
  { name: "Yokosuka Naval Base", country: "Japan", lat: 35.283, lng: 139.666, personnel: 7000, notes: "US 7th Fleet HQ" },
  { name: "Misawa Air Base", country: "Japan", lat: 40.703, lng: 141.368, personnel: 5000 },
  { name: "Camp Zama", country: "Japan", lat: 35.494, lng: 139.394, personnel: 2500, notes: "US Army Japan HQ" },
  { name: "Yokota Air Base", country: "Japan", lat: 35.748, lng: 139.348, personnel: 3500, notes: "US Forces Japan HQ" },
  { name: "Iwakuni Marine Corps Air Station", country: "Japan", lat: 34.144, lng: 132.235, personnel: 4000 },

  // South Korea
  { name: "Camp Humphreys", country: "South Korea", lat: 36.972, lng: 127.029, personnel: 36000, notes: "Largest overseas US military base" },
  { name: "Osan Air Base", country: "South Korea", lat: 37.090, lng: 127.029, personnel: 3500 },
  { name: "Kunsan Air Base", country: "South Korea", lat: 35.903, lng: 126.616, personnel: 2500 },

  // Germany
  { name: "Ramstein Air Base", country: "Germany", lat: 49.437, lng: 7.600, personnel: 9000, notes: "US Air Forces in Europe HQ" },
  { name: "Spangdahlem Air Base", country: "Germany", lat: 49.972, lng: 6.692, personnel: 4000 },
  { name: "Grafenwöhr Training Area", country: "Germany", lat: 49.698, lng: 11.942, personnel: 6500 },
  { name: "Landstuhl Regional Medical Center", country: "Germany", lat: 49.412, lng: 7.571, personnel: 3000, notes: "Largest US military hospital outside CONUS" },
  { name: "Stuttgart (AFRICOM/EUCOM HQ)", country: "Germany", lat: 48.735, lng: 9.068, personnel: 10000, notes: "AFRICOM and EUCOM HQ" },

  // United Kingdom
  { name: "RAF Lakenheath", country: "United Kingdom", lat: 52.409, lng: 0.560, personnel: 4000, notes: "Only F-35 base in Europe" },
  { name: "RAF Mildenhall", country: "United Kingdom", lat: 52.361, lng: 0.486, personnel: 3500 },
  { name: "RAF Croughton", country: "United Kingdom", lat: 52.072, lng: -1.194, personnel: 1200, notes: "NSA/USAF signals" },

  // Italy
  { name: "Naval Air Station Sigonella", country: "Italy", lat: 37.402, lng: 14.923, personnel: 4500, notes: "Key Mediterranean hub" },
  { name: "Aviano Air Base", country: "Italy", lat: 46.032, lng: 12.597, personnel: 3500 },
  { name: "Camp Darby", country: "Italy", lat: 43.681, lng: 10.358, personnel: 700, notes: "Army prepositioned stocks" },
  { name: "Naval Support Activity Naples", country: "Italy", lat: 40.923, lng: 14.291, personnel: 6000, notes: "US 6th Fleet HQ" },

  // Spain
  { name: "Naval Station Rota", country: "Spain", lat: 36.645, lng: -6.349, personnel: 3000, notes: "Key Atlantic/Med hub, BMD destroyers" },

  // Greece
  { name: "Naval Support Activity Souda Bay", country: "Greece", lat: 35.508, lng: 24.072, personnel: 600 },

  // Romania
  { name: "Mihail Kogălniceanu Air Base", country: "Romania", lat: 44.362, lng: 28.488, personnel: 2000, notes: "NATO Eastern flank" },
  { name: "Deveselu (Aegis Ashore)", country: "Romania", lat: 44.143, lng: 24.088, personnel: 500, notes: "US missile defense site" },

  // Poland
  { name: "Fort Trump / Camp Kosciuszko", country: "Poland", lat: 52.413, lng: 16.951, personnel: 5500, notes: "V Corps forward HQ" },
  { name: "Redzikowo (Aegis Ashore)", country: "Poland", lat: 54.332, lng: 17.537, personnel: 250, notes: "US missile defense site" },

  // Bahrain
  { name: "Naval Support Activity Bahrain", country: "Bahrain", lat: 26.228, lng: 50.601, personnel: 7000, notes: "US 5th Fleet/NAVCENT HQ" },

  // Qatar
  { name: "Al Udeid Air Base", country: "Qatar", lat: 25.117, lng: 51.315, personnel: 10000, notes: "CENTCOM Forward HQ, largest base in Middle East" },

  // Kuwait
  { name: "Camp Arifjan", country: "Kuwait", lat: 29.196, lng: 47.961, personnel: 13000, notes: "Army Central (ARCENT) HQ" },
  { name: "Ali Al Salem Air Base", country: "Kuwait", lat: 29.350, lng: 47.521, personnel: 2000 },

  // UAE
  { name: "Al Dhafra Air Base", country: "UAE", lat: 24.248, lng: 54.548, personnel: 2000 },

  // Saudi Arabia
  { name: "Prince Sultan Air Base", country: "Saudi Arabia", lat: 24.062, lng: 47.580, personnel: 2500, notes: "Reactivated 2019" },

  // Djibouti
  { name: "Camp Lemonnier", country: "Djibouti", lat: 11.546, lng: 43.159, personnel: 4000, notes: "Only permanent US base in Africa" },

  // Diego Garcia
  { name: "Diego Garcia (BIOT)", country: "British Indian Ocean Territory", lat: -7.313, lng: 72.412, personnel: 3000, notes: "Key Indian Ocean hub" },

  // Guam
  { name: "Andersen Air Force Base", country: "Guam (US Territory)", lat: 13.584, lng: 144.929, personnel: 3500 },
  { name: "Naval Base Guam", country: "Guam (US Territory)", lat: 13.442, lng: 144.651, personnel: 4000 },

  // Australia
  { name: "Pine Gap", country: "Australia", lat: -23.799, lng: 133.737, personnel: 800, notes: "NRO/CIA/NSA joint facility" },
  { name: "Naval Communication Station Harold E. Holt", country: "Australia", lat: -21.817, lng: 114.167, personnel: 300 },
  { name: "RAAF Darwin (US Marine Rotation)", country: "Australia", lat: -12.424, lng: 130.877, personnel: 2500, notes: "Marine Rotational Force Darwin" },

  // Philippines
  { name: "Antonio Bautista Air Base (EDCA)", country: "Philippines", lat: 9.328, lng: 118.063, personnel: 100, notes: "EDCA site, Palawan" },
  { name: "Basa Air Base (EDCA)", country: "Philippines", lat: 14.988, lng: 120.493, personnel: 100, notes: "EDCA site" },
  { name: "Fort Magsaysay (EDCA)", country: "Philippines", lat: 15.491, lng: 121.094, personnel: 100, notes: "EDCA site" },
  { name: "Lumbia Airport (EDCA)", country: "Philippines", lat: 8.418, lng: 124.611, personnel: 100, notes: "EDCA site" },
  { name: "Mactan-Benito Ebuen AB (EDCA)", country: "Philippines", lat: 10.265, lng: 123.978, personnel: 100, notes: "EDCA site" },

  // Kosovo
  { name: "Camp Bondsteel", country: "Kosovo", lat: 42.357, lng: 21.347, personnel: 700, notes: "Largest US base in Balkans" },

  // Honduras
  { name: "Soto Cano Air Base", country: "Honduras", lat: 14.382, lng: -87.621, personnel: 600, notes: "Joint Task Force Bravo" },

  // Cuba
  { name: "Guantanamo Bay Naval Station", country: "Cuba", lat: 19.906, lng: -75.101, personnel: 6000, notes: "Oldest US overseas base" },

  // Greenland (Denmark)
  { name: "Pituffik Space Base (Thule)", country: "Greenland", lat: 76.531, lng: -68.703, personnel: 400, notes: "DEW line successor" },
];
