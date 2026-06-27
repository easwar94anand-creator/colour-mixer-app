import type { RGB, HSL } from './colorConvert.js';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from './colorConvert.js';

export type BlendMode = 'rgb' | 'hsl' | 'pigment';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function lerpHue(a: number, b: number, t: number) {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return (a + diff * t + 360) % 360;
}

export function blendRgb(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

export function blendHsl(a: HSL, b: HSL, t: number): HSL {
  return {
    h: Math.round(lerpHue(a.h, b.h, t)),
    s: Math.round(lerp(a.s, b.s, t)),
    l: Math.round(lerp(a.l, b.l, t)),
  };
}

export function blendPigment(a: RGB, b: RGB, t: number): RGB {
  // Blend in CMY (subtractive) space: C=1-R, M=1-G, Y=1-B
  const ca = { c: 1 - a.r / 255, m: 1 - a.g / 255, y: 1 - a.b / 255 };
  const cb = { c: 1 - b.r / 255, m: 1 - b.g / 255, y: 1 - b.b / 255 };
  const cr = { c: lerp(ca.c, cb.c, t), m: lerp(ca.m, cb.m, t), y: lerp(ca.y, cb.y, t) };
  return {
    r: Math.round((1 - cr.c) * 255),
    g: Math.round((1 - cr.m) * 255),
    b: Math.round((1 - cr.y) * 255),
  };
}

export function blend(hexA: string, hexB: string, ratio: number, mode: BlendMode): string {
  // ratio = 0 → pure A, ratio = 1 → pure B
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  if (mode === 'rgb') return rgbToHex(blendRgb(a, b, ratio));
  if (mode === 'hsl') {
    const ha = rgbToHsl(a), hb = rgbToHsl(b);
    return rgbToHex(hslToRgb(blendHsl(ha, hb, ratio)));
  }
  return rgbToHex(blendPigment(a, b, ratio));
}

export const BLEND_MODE_LABELS: Record<BlendMode, string> = {
  rgb: 'RGB Blend',
  hsl: 'HSL Blend',
  pigment: 'Pigment Mix',
};

export const BLEND_MODE_DESCRIPTIONS: Record<BlendMode, string> = {
  rgb: 'Interpolates red, green, and blue channels directly — the most predictable digital blend.',
  hsl: 'Blends through hue, saturation, and lightness — follows the perceptual color wheel.',
  pigment: 'Simulates paint mixing via subtractive CMY model — mimics how physical pigments behave.',
};
