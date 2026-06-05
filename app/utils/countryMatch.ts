// Aliases for country names that differ between our data and the GeoJSON
const ALIASES: [string, string][] = [
  ["czech republic", "czechia"],
  ["russia", "russian federation"],
  ["united states", "united states of america"],
  ["south korea", "korea, south"],
  ["north korea", "dem. rep. korea"],
  ["north korea", "korea, north"],
  ["ivory coast", "côte d'ivoire"],
  ["dr congo", "democratic republic of the congo"],
  ["trinidad and tobago", "trinidad & tobago"],
];

export function matchesCountry(geoName: string, dataName: string): boolean {
  const a = geoName.toLowerCase().trim();
  const b = dataName.toLowerCase().trim();
  if (a === b) return true;

  for (const [x, y] of ALIASES) {
    if ((a === x || a === y) && (b === x || b === y)) return true;
  }

  // Substring fallback — require the shorter string to be at least 6 chars to prevent
  // false matches like "oman" ⊂ "romania", "mali" ⊂ "somalia", "niger" ⊂ "nigeria"
  const [longer, shorter] = a.length >= b.length ? [a, b] : [b, a];
  if (shorter.length < 6) return false;
  return longer.includes(shorter);
}
