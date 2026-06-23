import type { BlendMode } from '../utils/colorMath';
import { BLEND_MODE_LABELS, BLEND_MODE_DESCRIPTIONS } from '../utils/colorMath';
import './MixerControls.css';

interface Props {
  ratio: number;
  onRatioChange: (v: number) => void;
  mode: BlendMode;
  onModeChange: (m: BlendMode) => void;
  colorA: string;
  colorB: string;
  onSwap: () => void;
  onReset: () => void;
  onRandom: () => void;
}

const MODES: BlendMode[] = ['rgb', 'hsl', 'pigment'];

export function MixerControls({ ratio, onRatioChange, mode, onModeChange, colorA, colorB, onSwap, onReset, onRandom }: Props) {
  const pctA = Math.round((1 - ratio) * 100);
  const pctB = Math.round(ratio * 100);

  return (
    <div className="mixer-controls">
      <div className="mixer-controls__section">
        <div className="mixer-controls__section-header">
          <span className="mixer-controls__section-title">Mix Ratio</span>
          <span className="mixer-controls__ratio-display">
            <span style={{ color: colorA }}>■</span> {pctA}%
            &nbsp;·&nbsp;
            {pctB}% <span style={{ color: colorB }}>■</span>
          </span>
        </div>
        <div className="mixer-controls__slider-track">
          <div className="mixer-controls__slider-a" style={{ backgroundColor: colorA, width: `${pctA}%` }} />
          <div className="mixer-controls__slider-b" style={{ backgroundColor: colorB, width: `${pctB}%` }} />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(ratio * 100)}
          onChange={e => onRatioChange(Number(e.target.value) / 100)}
          className="mixer-controls__slider"
          aria-label="Mix ratio between Color A and Color B"
          aria-valuetext={`${pctA}% Color A, ${pctB}% Color B`}
        />
        <div className="mixer-controls__slider-labels">
          <span>Color A</span>
          <span>Equal</span>
          <span>Color B</span>
        </div>
      </div>

      <div className="mixer-controls__section">
        <div className="mixer-controls__section-title">Blend Mode</div>
        <div className="mixer-controls__mode-tabs" role="radiogroup" aria-label="Blend mode">
          {MODES.map(m => (
            <button
              key={m}
              role="radio"
              aria-checked={mode === m}
              className={`mixer-controls__mode-tab${mode === m ? ' mixer-controls__mode-tab--active' : ''}`}
              onClick={() => onModeChange(m)}
            >
              {BLEND_MODE_LABELS[m]}
            </button>
          ))}
        </div>
        <p className="mixer-controls__mode-desc">{BLEND_MODE_DESCRIPTIONS[mode]}</p>
      </div>

      <div className="mixer-controls__actions">
        <button className="mixer-controls__action-btn" onClick={onSwap} aria-label="Swap colors A and B">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M11 1l3 3-3 3M13 4H3M5 15l-3-3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Swap
        </button>
        <button className="mixer-controls__action-btn" onClick={onReset} aria-label="Reset to default colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8a6 6 0 1 0 1.5-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2 3v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reset
        </button>
        <button className="mixer-controls__action-btn" onClick={onRandom} aria-label="Pick random colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h2l7 8h2M11 4h2M4 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M13 2l2 2-2 2M13 10l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Random
        </button>
      </div>
    </div>
  );
}
