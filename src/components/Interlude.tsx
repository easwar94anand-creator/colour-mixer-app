import './Interlude.css';

interface Props {
  result: string;
  colorA: string;
  colorB: string;
}

export function Interlude({ result, colorA, colorB }: Props) {
  return (
    <section className="interlude" aria-label="Color showcase">
      {/* Three large color strips */}
      <div className="interlude__strips" aria-hidden="true">
        <div className="interlude__strip" style={{ backgroundColor: colorA }} />
        <div className="interlude__strip interlude__strip--result" style={{ backgroundColor: result }} />
        <div className="interlude__strip" style={{ backgroundColor: colorB }} />
      </div>

      <div className="interlude__content">
        <p className="interlude__statement">
          One interaction.<br />
          <em>Infinite combinations.</em>
        </p>
        <p className="interlude__sub">
          Every slider position, every blend mode, every color choice
          produces a unique result — computed in real time, right in your browser.
        </p>
      </div>
    </section>
  );
}
