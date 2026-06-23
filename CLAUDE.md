# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # tsc -b && vite build (type-check + production bundle)
npm run preview  # serve the dist/ build locally
```

No test runner is configured.

## Architecture

Single-page React + TypeScript app (Vite). All state lives in `App.tsx` and is passed down as props — no context or external state library.

**Data flow:** `App.tsx` holds `colorA`, `colorB`, `ratio`, `mode` → calls `blend()` → passes `result` hex to all child sections.

**Utils (`src/utils/`)** are pure functions with no React dependency:
- `colorConvert.ts` — `hexToRgb`, `rgbToHex`, `rgbToHsl`, `hslToRgb`, `formatRgb`, `formatHsl`
- `colorMath.ts` — `blend(hexA, hexB, ratio, mode)` dispatches to `blendRgb`, `blendHsl`, or `blendPigment`; also exports `BlendMode` type and label/description maps
- `colorNames.ts` — nearest-color lookup via Euclidean RGB distance against a hardcoded named-color table

**Components (`src/components/`)** each have a co-located `.css` file. Key ones:
- `ColorPicker` — wraps a hidden `<input type="color">` with a styled swatch button + bidirectional HEX text input
- `MixResult` — displays the blended color swatch + HEX/RGB/HSL/name values with copy buttons
- `MixerControls` — ratio slider, blend mode radio tabs, swap/reset/random buttons
- `Formula` — renders the human-readable blend expression from the current state
- `PaletteSection` — derives tonal shades + complementary/analogous swatches from the result color using `hslToRgb`

## Styling

All design tokens are CSS custom properties on `:root` in `src/index.css`. Components reference them via `var(--token-name)` — no inline values for colors, spacing, shadows, or radii. Typography uses Manrope (body) and Playfair Display (headings), loaded from Google Fonts in both `index.html` and `src/index.css`.

## TypeScript config

`verbatimModuleSyntax` is enabled — type-only imports must use `import type { Foo }`, not `import { Foo }`.
