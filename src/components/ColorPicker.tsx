import { useRef, useState, useEffect } from 'react';
import './ColorPicker.css';

interface Props {
  label: string;
  sublabel: string;
  color: string;
  onChange: (hex: string) => void;
  accentVar?: string;
}

function isValidHex(s: string) { return /^#[0-9a-fA-F]{6}$/.test(s); }

export function ColorPicker({ label, sublabel, color, onChange, accentVar }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hexInput, setHexInput] = useState(color);

  useEffect(() => { setHexInput(color); }, [color]);

  const handleNative = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    setHexInput(val);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
    setHexInput(val);
    if (isValidHex(val)) onChange(val);
  };

  const handleHexBlur = () => {
    if (!isValidHex(hexInput)) setHexInput(color);
  };

  return (
    <div className="color-picker" style={{ '--picker-accent': accentVar ?? color } as React.CSSProperties}>
      <div className="color-picker__header">
        <span className="color-picker__label">{label}</span>
        <span className="color-picker__sublabel">{sublabel}</span>
      </div>
      <button
        className="color-picker__swatch-btn"
        onClick={() => inputRef.current?.click()}
        aria-label={`Choose ${label} color, current: ${color}`}
        style={{ backgroundColor: color }}
      >
        <input
          ref={inputRef}
          type="color"
          value={color}
          onChange={handleNative}
          aria-hidden="true"
          tabIndex={-1}
          className="color-picker__native"
        />
        <span className="color-picker__swatch-ripple" />
      </button>
      <div className="color-picker__hex-row">
        <label className="color-picker__hex-label" htmlFor={`hex-${label}`}>HEX</label>
        <input
          id={`hex-${label}`}
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          onBlur={handleHexBlur}
          maxLength={7}
          className="color-picker__hex-input"
          aria-label={`${label} hex color value`}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
