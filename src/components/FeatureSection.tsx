import { Formula } from './Formula';
import type { BlendMode } from '../utils/colorMath';
import './FeatureSection.css';

interface Props {
  colorA: string;
  colorB: string;
  result: string;
  ratio: number;
  mode: BlendMode;
}

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M12 3C12 3 7 7 7 12s5 9 5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    title: 'Three Blend Algorithms',
    desc: 'Mix through RGB channels, HSL color space, or simulate physical pigment behavior with our subtractive CMY model.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
        <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    title: 'Live Preview',
    desc: 'Every adjustment — color, ratio, or blend mode — updates the output instantly. No submit buttons, no waiting.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h9a2 2 0 012 2v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M13 13h4M13 16h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Export Values',
    desc: 'Copy the result in HEX, RGB, or HSL format with a single click. Name approximation included for quick reference.',
  },
];

export function FeatureSection({ colorA, colorB, result, ratio, mode }: Props) {
  return (
    <section className="feature-section" aria-label="Features and formula">
      {/* Sketch accent */}
      <div className="feature-section__sketch" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M100 20 Q140 60 100 100 Q60 140 100 180" stroke="var(--color-border-tertiary)" strokeWidth="1" fill="none" strokeDasharray="3 6"/>
          <circle cx="100" cy="20" r="3" fill="var(--color-border-tertiary)"/>
          <circle cx="100" cy="180" r="3" fill="var(--color-border-tertiary)"/>
        </svg>
      </div>

      <div className="feature-section__content">
        <div className="feature-section__header">
          <div className="feature-section__eyebrow">What it does</div>
          <h2 className="feature-section__title">
            Where science<br/>
            <em>meets colour</em>
          </h2>
          <p className="feature-section__lead">
            Color Mix Lab blends any two colors using real algorithms,
            not approximations. Choose your method, fine-tune the ratio,
            and see exactly how the result is computed.
          </p>
        </div>

        <div className="feature-section__cards">
          {FEATURES.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="feature-section__formula-wrapper">
          <div className="feature-section__formula-label">Live formula</div>
          <Formula colorA={colorA} colorB={colorB} ratio={ratio} mode={mode} result={result} />
        </div>
      </div>
    </section>
  );
}
