import './Footer.css';

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__content">
        <div className="footer__brand">
          <span className="footer__logo">Color Mix Lab</span>
          <span className="footer__tagline">Blend. Explore. Create.</span>
        </div>
        <div className="footer__sketch" aria-hidden="true">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <circle cx="20" cy="30" r="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 5"/>
            <circle cx="60" cy="30" r="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 5"/>
            <circle cx="100" cy="30" r="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 5"/>
            <circle cx="40" cy="30" r="4" fill="rgba(255,255,255,0.12)"/>
            <circle cx="80" cy="30" r="4" fill="rgba(255,255,255,0.12)"/>
          </svg>
        </div>
        <p className="footer__copy">Crafted with care. All color values are computed in-browser.</p>
      </div>
    </footer>
  );
}
