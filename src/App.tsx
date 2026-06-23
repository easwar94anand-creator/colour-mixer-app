import { useState, useCallback } from 'react';
import './App.css';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { PaletteSection } from './components/PaletteSection';
import { Footer } from './components/Footer';
import type { BlendMode } from './utils/colorMath';
import { blend } from './utils/colorMath';

const DEFAULT_A = '#2173be';
const DEFAULT_B = '#eb5b55';

function randomHex() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function App() {
  const [colorA, setColorA] = useState(DEFAULT_A);
  const [colorB, setColorB] = useState(DEFAULT_B);
  const [ratio, setRatio] = useState(0.5);
  const [mode, setMode] = useState<BlendMode>('rgb');

  const result = blend(colorA, colorB, ratio, mode);

  const handleSwap = useCallback(() => {
    setColorA(colorB);
    setColorB(colorA);
  }, [colorA, colorB]);

  const handleReset = useCallback(() => {
    setColorA(DEFAULT_A);
    setColorB(DEFAULT_B);
    setRatio(0.5);
    setMode('rgb');
  }, []);

  const handleRandom = useCallback(() => {
    setColorA(randomHex());
    setColorB(randomHex());
  }, []);

  return (
    <>
      <Hero
        colorA={colorA}
        colorB={colorB}
        result={result}
        ratio={ratio}
        mode={mode}
        onColorAChange={setColorA}
        onColorBChange={setColorB}
        onRatioChange={setRatio}
        onModeChange={setMode}
        onSwap={handleSwap}
        onReset={handleReset}
        onRandom={handleRandom}
      />
      <FeatureSection
        colorA={colorA}
        colorB={colorB}
        result={result}
        ratio={ratio}
        mode={mode}
      />
      <PaletteSection result={result} />
      <Footer />
    </>
  );
}

export default App;
