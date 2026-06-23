import { useState } from 'react';
import { hexToRgb, rgbToHsl, formatRgb, formatHsl } from '../utils/colorConvert';
import { approximateColorName } from '../utils/colorNames';
import './MixResult.css';

interface Props {
  color: string;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button className="copy-btn" onClick={copy} aria-label={`Copy ${label}`} title={`Copy ${label}`}>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M2 10V3a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  );
}

export function MixResult({ color }: Props) {
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb);
  const name = approximateColorName(color);
  const rgbStr = formatRgb(rgb);
  const hslStr = formatHsl(hsl);

  const values = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: rgbStr },
    { label: 'HSL', value: hslStr },
    { label: 'NAME', value: name },
  ];

  return (
    <div className="mix-result">
      <div className="mix-result__swatch" style={{ backgroundColor: color }} aria-label={`Mixed color: ${color}`}>
        <div className="mix-result__swatch-overlay" />
        <span className="mix-result__swatch-label">Result</span>
      </div>
      <div className="mix-result__values">
        {values.map(({ label, value }) => (
          <div className="mix-result__row" key={label}>
            <span className="mix-result__key">{label}</span>
            <span className="mix-result__value">{value}</span>
            <CopyButton value={value} label={label} />
          </div>
        ))}
      </div>
    </div>
  );
}
