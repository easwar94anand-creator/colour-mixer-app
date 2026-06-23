import { hexToRgb, rgbToHsl, formatRgb, formatHsl } from '../utils/colorConvert';
import type { BlendMode } from '../utils/colorMath';
import { BLEND_MODE_LABELS } from '../utils/colorMath';
import './Formula.css';

interface Props {
  colorA: string;
  colorB: string;
  ratio: number;
  mode: BlendMode;
  result: string;
}

export function Formula({ colorA, colorB, ratio, mode, result }: Props) {
  const pctA = Math.round((1 - ratio) * 100);
  const pctB = Math.round(ratio * 100);

  const fmtColor = (hex: string) => {
    if (mode === 'hsl') return formatHsl(rgbToHsl(hexToRgb(hex)));
    if (mode === 'pigment') {
      const { r, g, b } = hexToRgb(hex);
      const c = (1 - r / 255).toFixed(2);
      const m = (1 - g / 255).toFixed(2);
      const y = (1 - b / 255).toFixed(2);
      return `cmy(${c}, ${m}, ${y})`;
    }
    return formatRgb(hexToRgb(hex));
  };

  return (
    <div className="formula">
      <div className="formula__badge">{BLEND_MODE_LABELS[mode]}</div>
      <div className="formula__expression">
        <span className="formula__swatch" style={{ backgroundColor: colorA }} />
        <span className="formula__term">{fmtColor(colorA)}</span>
        <span className="formula__op">×</span>
        <span className="formula__pct">{pctA}%</span>
        <span className="formula__op">+</span>
        <span className="formula__swatch" style={{ backgroundColor: colorB }} />
        <span className="formula__term">{fmtColor(colorB)}</span>
        <span className="formula__op">×</span>
        <span className="formula__pct">{pctB}%</span>
        <span className="formula__op formula__op--eq">=</span>
        <span className="formula__swatch" style={{ backgroundColor: result }} />
        <span className="formula__term formula__term--result">{result.toUpperCase()}</span>
      </div>
    </div>
  );
}
