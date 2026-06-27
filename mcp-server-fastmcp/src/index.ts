import { FastMCP } from "fastmcp";
import { z } from "zod";
import { blend } from "./utils/colorMath.js";
import { hexToRgb, rgbToHsl, formatRgb, formatHsl } from "./utils/colorConvert.js";
import { approximateColorName, resolveColor } from "./utils/colorNames.js";

const mcp = new FastMCP({ name: "colour-mixer", version: "1.0.0" });

// Shared input description used across all tools
const colorInput = z
  .string()
  .describe('A color name (e.g. "red", "cornflower blue") or a hex code (e.g. "#ff0000")');

// ── Tool 1: mix_colors ──────────────────────────────────────────────────────

mcp.addTool({
  name: "mix_colors",
  description:
    "Blend two colors together. Accepts color names or hex codes. " +
    'Returns the mixed hex color and its nearest named color. ' +
    'Blend modes: "rgb" (digital), "hsl" (perceptual wheel), "pigment" (paint-like subtractive).',
  parameters: z.object({
    colorA: colorInput.describe("First color — name or hex"),
    colorB: colorInput.describe("Second color — name or hex"),
    ratio: z
      .number()
      .min(0)
      .max(1)
      .default(0.5)
      .describe("Mix ratio: 0 = pure colorA, 0.5 = equal mix, 1 = pure colorB"),
    mode: z
      .enum(["rgb", "hsl", "pigment"])
      .default("rgb")
      .describe("Blending algorithm"),
  }),
  execute: async ({ colorA, colorB, ratio, mode }) => {
    const hexA = resolveColor(colorA);
    const hexB = resolveColor(colorB);
    const result = blend(hexA, hexB, ratio, mode);
    const name = approximateColorName(result);
    return (
      `Mixed color: ${result} (${name})\n` +
      `  colorA: ${colorA} → ${hexA}\n` +
      `  colorB: ${colorB} → ${hexB}\n` +
      `  ratio: ${ratio}, mode: ${mode}`
    );
  },
});

// ── Tool 2: get_color_formats ───────────────────────────────────────────────

mcp.addTool({
  name: "get_color_formats",
  description:
    "Convert any color to all common formats: hex, RGB, HSL, and nearest named color. " +
    "Accepts color names or hex codes.",
  parameters: z.object({
    color: colorInput,
  }),
  execute: async ({ color }) => {
    const hex = resolveColor(color);
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb);
    return JSON.stringify(
      {
        input: color,
        hex,
        rgb: formatRgb(rgb),
        hsl: formatHsl(hsl),
        name: approximateColorName(hex),
      },
      null,
      2
    );
  },
});

// ── Tool 3: get_color_name ──────────────────────────────────────────────────

mcp.addTool({
  name: "get_color_name",
  description:
    "Return the nearest CSS named color for any color input. " +
    "Accepts color names (returns the exact or nearest match) or hex codes.",
  parameters: z.object({
    color: colorInput,
  }),
  execute: async ({ color }) => {
    const hex = resolveColor(color);
    return approximateColorName(hex);
  },
});

// ── Start ───────────────────────────────────────────────────────────────────

mcp.start();  // defaults to stdio transport
