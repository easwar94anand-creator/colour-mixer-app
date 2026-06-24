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
- `Interlude` — dark statement section between features and palette; shows live color strips (colorA, result, colorB) that update with the current mix

**Page structure** (dark → light → dark → light → dark):
1. `Hero` — dark, full-width, centered serif headline + interactive mixer panel
2. `FeatureSection` — light, editorial header + three feature cards + live formula
3. `Interlude` — dark, bold statement + three live color strips
4. `PaletteSection` — light, tonal shades + complementary/analogous swatches
5. `Footer` — dark, minimal

## Styling

All design tokens are CSS custom properties on `:root` in `src/index.css`. Components reference them via `var(--token-name)` — no inline values for colors, spacing, shadows, or radii. Typography uses Manrope (body) and Playfair Display (headings), loaded from Google Fonts in both `index.html` and `src/index.css`.

The hero does **not** use `min-height: 100vh` — height is content-driven. Adding it back will cause all sections below the hero to be pushed off-screen in tall viewports.

## TypeScript config

`verbatimModuleSyntax` is enabled — type-only imports must use `import type { Foo }`, not `import { Foo }`.

## Visual regression workflow

The reference design image is the Ellipsus-style layout the user provided at project start. When making any UI change, follow this loop until the app matches it:

### How to take screenshots

```powershell
# 1. Build the app
npm run build

# 2. Serve the dist folder (run in a separate terminal or as a background process)
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npx serve dist -p 4173" -WorkingDirectory $PWD -WindowStyle Minimized
Start-Sleep -Seconds 5

# 3. Take screenshots using Chrome headless
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$out    = ".screenshots"

# Hero viewport (what the user sees first)
& $chrome --headless=new --screenshot="$out\current-hero.png" --window-size=1440,900 --disable-gpu --no-sandbox "http://localhost:4173"
Start-Sleep -Seconds 3

# Full page
& $chrome --headless=new --screenshot="$out\current-full.png" --window-size=1440,5000 --disable-gpu --no-sandbox "http://localhost:4173"
Start-Sleep -Seconds 5
```

### Comparison loop

1. Take screenshots (above).
2. Read `.screenshots/current-hero.png` and `.screenshots/current-full.png` using the Read tool to view them.
3. Compare visually against the reference design: dark hero with large centered serif headline → wave divider → light feature section → dark interlude with color strips → light palette section → dark footer.
4. Identify specific gaps (spacing, font size, color, layout, missing elements).
5. Edit the relevant CSS or component, then go back to step 1.
6. Repeat until the screenshots match the reference closely.

### Key things to check each iteration

- Hero headline is large (`clamp(4rem, 10vw, 8.5rem)`) and centered
- All five page sections are visible (none hidden behind the hero)
- Wave SVG divider renders between hero and feature section
- Feature cards have shadow and hover lift
- Interlude color strips update dynamically with the mixed colors
- Palette swatches are portrait ratio (2:3) and fill the 9-column grid
- Footer is dark with italic serif logo

### Known gotchas

- Do **not** add `min-height: 100vh` to `.hero` — it will push all sections below the fold in tall headless viewports, making them appear invisible in screenshots.
- Chrome headless screenshots capture only the viewport height you pass via `--window-size`. Use at least `5000` for the full page.
- The `npx serve` process must be running before Chrome headless tries to connect — always `Start-Sleep -Seconds 5` after starting it.
- Screenshots are saved in `.screenshots/` at the project root.
