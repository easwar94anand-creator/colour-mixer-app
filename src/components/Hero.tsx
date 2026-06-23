import { ColorPicker } from './ColorPicker';
import { MixResult } from './MixResult';
import { MixerControls } from './MixerControls';
import type { BlendMode } from '../utils/colorMath';
import './Hero.css';

interface Props {
  colorA: string;
  colorB: string;
  result: string;
  ratio: number;
  mode: BlendMode;
  onColorAChange: (c: string) => void;
  onColorBChange: (c: string) => void;
  onRatioChange: (v: number) => void;
  onModeChange: (m: BlendMode) => void;
  onSwap: () => void;
  onReset: () => void;
  onRandom: () => void;
}

export function Hero(props: Props) {
  const { colorA, colorB, result, ratio, mode, onColorAChange, onColorBChange, onRatioChange, onModeChange, onSwap, onReset, onRandom } = props;

  return (
    <section className="hero" aria-label="Color Mix Lab — main mixer">
      {/* Grain texture overlay */}
      <div className="hero__grain" aria-hidden="true" />

      {/* Decorative SVG sketch lines */}
      <div className="hero__deco hero__deco--tl" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 6"/>
          <circle cx="60" cy="60" r="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 8"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="hero__deco hero__deco--br" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="10" y="10" width="60" height="60" rx="4" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 5"/>
          <rect x="25" y="25" width="30" height="30" rx="2" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Color Mixing Tool
          </div>
          <h1 className="hero__title">
            Color<br />
            <em>Mix Lab</em>
          </h1>
          <p className="hero__subtitle">
            Blend any two colors. Explore the result.<br />
            Three blend algorithms. One beautiful output.
          </p>
        </div>

        <div className="hero__mixer" role="main" aria-label="Color mixer interface">
          <div className="hero__pickers">
            <ColorPicker label="Color A" sublabel="First" color={colorA} onChange={onColorAChange} />
            <div className="hero__plus" aria-hidden="true">+</div>
            <ColorPicker label="Color B" sublabel="Second" color={colorB} onChange={onColorBChange} />
            <div className="hero__equals" aria-hidden="true">=</div>
            <MixResult color={result} />
          </div>

          <div className="hero__controls-panel">
            <MixerControls
              ratio={ratio}
              onRatioChange={onRatioChange}
              mode={mode}
              onModeChange={onModeChange}
              colorA={colorA}
              colorB={colorB}
              onSwap={onSwap}
              onReset={onReset}
              onRandom={onRandom}
            />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#fbfbf9"/>
        </svg>
      </div>
    </section>
  );
}
