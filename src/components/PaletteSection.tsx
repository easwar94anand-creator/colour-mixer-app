import { hexToRgb, rgbToHsl, rgbToHex, hslToRgb } from '../utils/colorConvert';
import { approximateColorName } from '../utils/colorNames';
import './PaletteSection.css';

interface Props {
  result: string;
}

function generatePalette(hex: string): string[] {
  const hsl = rgbToHsl(hexToRgb(hex));
  const shades: string[] = [];
  // Lighter and darker tints
  for (const l of [90, 75, 60, hsl.l, 35, 20]) {
    shades.push(rgbToHex(hslToRgb({ h: hsl.h, s: Math.min(hsl.s, 80), l })));
  }
  // Complementary
  const comp = rgbToHex(hslToRgb({ h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l }));
  // Analogous
  const ana1 = rgbToHex(hslToRgb({ h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l }));
  const ana2 = rgbToHex(hslToRgb({ h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l }));
  return [...shades, comp, ana1, ana2];
}

interface SwatchProps { color: string; }
function Swatch({ color }: SwatchProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(color).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); });
  };
  return (
    <button className="palette-swatch" onClick={copy} aria-label={`Copy ${color}`} title={color.toUpperCase()}>
      <span className="palette-swatch__color" style={{ backgroundColor: color }} />
      <span className="palette-swatch__hex">{copied ? 'Copied!' : color.toUpperCase()}</span>
    </button>
  );
}

import { useState } from 'react';

export function PaletteSection({ result }: Props) {
  const palette = generatePalette(result);
  const name = approximateColorName(result);

  return (
    <section className="palette-section" aria-label="Color palette suggestions">
      <div className="palette-section__content">
        <div className="palette-section__header">
          <div className="palette-section__eyebrow">Palette</div>
          <h2 className="palette-section__title">
            From <em>{name}</em>,<br />
            a full palette
          </h2>
          <p className="palette-section__lead">
            Every mixed color unlocks a complete tonal palette — shades, tints,
            a complementary, and two analogous companions.
          </p>
        </div>

        <div className="palette-section__result-chip">
          <span className="palette-section__chip-dot" style={{ backgroundColor: result }} />
          <span className="palette-section__chip-label">{result.toUpperCase()}</span>
          <span className="palette-section__chip-name">{name}</span>
        </div>

        <div className="palette-section__swatches">
          {palette.map((c, i) => <Swatch key={i} color={c} />)}
        </div>

        <div className="palette-section__group-labels">
          <span>Tonal Shades</span>
          <span>Companions</span>
        </div>
      </div>
    </section>
  );
}
