import { hexToRgb } from './colorConvert.js';

const NAMED_COLORS: [string, string][] = [
  ['#000000','Black'],['#ffffff','White'],['#ff0000','Red'],['#00ff00','Lime'],
  ['#0000ff','Blue'],['#ffff00','Yellow'],['#00ffff','Cyan'],['#ff00ff','Magenta'],
  ['#808080','Gray'],['#800000','Maroon'],['#808000','Olive'],['#008000','Green'],
  ['#800080','Purple'],['#008080','Teal'],['#000080','Navy'],['#ffa500','Orange'],
  ['#ffc0cb','Pink'],['#a52a2a','Brown'],['#ffd700','Gold'],['#c0c0c0','Silver'],
  ['#ff6347','Tomato'],['#40e0d0','Turquoise'],['#ee82ee','Violet'],['#f5deb3','Wheat'],
  ['#fa8072','Salmon'],['#90ee90','Light Green'],['#add8e6','Light Blue'],['#ffb6c1','Light Pink'],
  ['#f08080','Light Coral'],['#20b2aa','Light Sea Green'],['#87ceeb','Sky Blue'],
  ['#6495ed','Cornflower Blue'],['#dc143c','Crimson'],['#ff4500','Orange Red'],
  ['#da70d6','Orchid'],['#ba55d3','Medium Orchid'],['#9370db','Medium Purple'],
  ['#3cb371','Medium Sea Green'],['#00ced1','Dark Turquoise'],['#ff8c00','Dark Orange'],
  ['#8b0000','Dark Red'],['#006400','Dark Green'],['#00008b','Dark Blue'],
  ['#8b008b','Dark Magenta'],['#556b2f','Dark Olive Green'],['#ff69b4','Hot Pink'],
  ['#cd5c5c','Indian Red'],['#4b0082','Indigo'],['#fffff0','Ivory'],['#f0e68c','Khaki'],
  ['#e6e6fa','Lavender'],['#7cfc00','Lawn Green'],['#00fa9a','Medium Spring Green'],
  ['#48d1cc','Medium Turquoise'],['#c71585','Medium Violet Red'],['#191970','Midnight Blue'],
  ['#f5fffa','Mint Cream'],['#ffe4e1','Misty Rose'],['#ffdead','Navajo White'],
  ['#fdf5e6','Old Lace'],['#6b8e23','Olive Drab'],['#ff7f50','Coral'],['#7b68ee','Slate Blue'],
  ['#708090','Slate Gray'],['#fffafa','Snow'],['#00ff7f','Spring Green'],
  ['#4682b4','Steel Blue'],['#d2b48c','Tan'],['#9acd32','Yellow Green'],
  ['#e0ffff','Light Cyan'],['#fafad2','Light Goldenrod'],['#d3d3d3','Light Gray'],
  ['#90ee90','Light Green'],['#ffffe0','Light Yellow'],['#32cd32','Lime Green'],
  ['#b0c4de','Light Steel Blue'],['#dda0dd','Plum'],['#b0e0e6','Powder Blue'],
  ['#bc8f8f','Rosy Brown'],['#4169e1','Royal Blue'],['#8b4513','Saddle Brown'],
  ['#f4a460','Sandy Brown'],['#2e8b57','Sea Green'],['#fff5ee','Seashell'],
  ['#a0522d','Sienna'],['#87cefa','Light Sky Blue'],['#778899','Light Slate Gray'],
];

function colorDistance(hex1: string, hex2: string): number {
  const a = hexToRgb(hex1), b = hexToRgb(hex2);
  return Math.sqrt((a.r-b.r)**2 + (a.g-b.g)**2 + (a.b-b.b)**2);
}

export function approximateColorName(hex: string): string {
  let best = NAMED_COLORS[0];
  let bestDist = Infinity;
  for (const entry of NAMED_COLORS) {
    const d = colorDistance(hex, entry[0]);
    if (d < bestDist) { bestDist = d; best = entry; }
  }
  return best[1];
}

/** Resolve a color name ("red", "cornflower blue") or passthrough a hex string. */
export function resolveColor(input: string): string {
  const lower = input.toLowerCase().trim();
  const match = NAMED_COLORS.find(([, name]) => name.toLowerCase() === lower);
  return match ? match[0] : input;
}
