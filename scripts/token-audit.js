#!/usr/bin/env node
/**
 * token-audit.js — Archive design-token audit
 *
 * Scans CSS files, TSX/TS inline styles, and <style> blocks in HTML
 * for hardcoded visual values that should reference CSS custom properties.
 *
 * Exit 0 — clean
 * Exit 1 — one or more errors found
 *
 * Usage:
 *   node scripts/token-audit.js
 *   node scripts/token-audit.js --dir app/
 *   node scripts/token-audit.js --strict   (warnings also fail)
 */

const fs = require("fs");
const path = require("path");

// ─── CLI args ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const rootDir = (() => {
  const i = args.indexOf("--dir");
  return i !== -1 ? args[i + 1] : ".";
})();

// ─── Files to skip ─────────────────────────────────────────────────────────
const SKIP_PATHS = [
  "node_modules",
  ".next",
  "design-system/tokens.css", // intentionally has raw values in Layer 1
  "scripts/",
];

// ─── Token reverse-lookup map ──────────────────────────────────────────────
// Maps known raw values → the Layer 2 token to use instead.
const TOKEN_MAP = {
  // Colors — text
  "#404040": "--color-text",
  "#888888": "--color-text-muted",
  "#ffffff": "--color-text-inverse",
  "#fff": "--color-text-inverse",
  "#7a5050": "--color-text-danger",
  "#3a6a3a": "--color-text-success",
  // Colors — surfaces
  "#ecedef": "--color-bg",
  "#f5f5f6": "--color-surface-faint",
  // Colors — borders
  "#e2e2e2": "--color-border",
  // Colors — accent
  "#e8fe67": "--color-accent",
  // Colors — placeholders
  "#fafafa": "--color-ph-1",
  "#f2f2f2": "--color-ph-2",
  "#e8e8e8": "--color-ph-3",
  "#d4d4d4": "--color-ph-4",
  // Colors — status
  "#e1e8dc": "--color-status-ok-bg",
  "#f4dddd": "--color-status-bad-bg",
  // rgba patterns
  "rgb(0 0 0 / 0.06)": "--color-line",
  "rgba(0,0,0,0.06)": "--color-line",
  "rgb(0 0 0 / 0.07)": "--color-grid-dot",
  "rgba(0,0,0,0.07)": "--color-grid-dot",
  // Spacing
  "4px": "--space-xs",
  "8px": "--space-sm",
  "12px": "--space-md",
  "16px": "--space-lg",
  "20px": "--space-xl",
  "24px": "--space-2xl",
  "28px": "--space-7",
  "32px": "--space-3xl",
  "40px": "--space-4xl",
  "64px": "--space-5xl",
  // Typography
  "13px": "--font-size-body",
  "12px": "--font-size-caption",
  "11px": "--font-size-meta",
  "10px": "--font-size-eyebrow",
  "14px": "--font-size-body-lg",
  "18px": "--font-size-card-title",
  "28px": "--font-size-stat",
  "80px": "--font-size-h1",
  "300": "--font-weight-light",
  "400": "--font-weight-regular",
  "500": "--font-weight-medium",
  "600": "--font-weight-semibold",
  "700": "--font-weight-bold",
  // Radius
  "14px": "--radius-md",
  "9999px": "--radius-pill",
  // Borders
  "1px": "--border-width",
  "1.5px": "--border-width-strong",
  "2px": "--border-width-badge",
  // Shadows
  "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 12px -2px rgb(0 0 0 / 0.06)": "--shadow-card",
  // Motion — durations
  "120ms": "--duration-fast",
  "220ms": "--duration-base",
  "600ms": "--duration-screen",
  // Motion — easings
  "cubic-bezier(0.22, 1, 0.36, 1)": "--ease-smooth",
  "cubic-bezier(0.34, 1.56, 0.64, 1)": "--ease-spring",
  // Z-index
  "z-index: 0": "--z-0",
  "z-index: 1": "--z-1",
  "z-index: 2": "--z-2 (or --photo-z-glass)",
  "z-index: 3": "--z-3 (or --photo-z-iris / --photo-z-depth)",
  "z-index: 4": "--z-4 (or --photo-z-spec)",
  "z-index: 10": "--z-10 (or --photo-z-badge)",
  "z-index: 999": "--z-overlay",
};

// ─── Violation patterns ─────────────────────────────────────────────────────
// Each entry: { pattern, type: "error"|"warning", label, getHint }

const COLOR_PROPS =
  "(?:color|background(?:-color)?|fill|stroke|caret-color|outline-color|border(?:-color)?|text-decoration-color|-webkit-text-stroke-color|box-shadow|text-shadow)";

const VIOLATIONS = [
  // ── ERRORS ──────────────────────────────────────────────────────────────
  {
    // Hex color anywhere in the value of a relevant property
    pattern: new RegExp(
      `(?:${COLOR_PROPS})\\s*:[^;\\n]*#[0-9A-Fa-f]{3,8}`,
      "g"
    ),
    type: "error",
    label: "hardcoded hex color",
    getHint: (match) => {
      const hex = (match.match(/#[0-9A-Fa-f]{3,8}/) || [])[0];
      return hex ? TOKEN_MAP[hex.toLowerCase()] || "no direct token — check design-system/tokens.css" : "";
    },
  },
  {
    // rgb/rgba in a color-bearing property
    pattern: new RegExp(
      `(?:${COLOR_PROPS})\\s*:[^;\\n]*rgba?\\s*\\(`,
      "g"
    ),
    type: "error",
    label: "hardcoded rgba() color",
    getHint: () => "use a --color-* token from design-system/tokens.css",
  },
  {
    // font-size with a raw value (not var())
    pattern: /font-size\s*:\s*(?!var\()[\d.]+(?:px|rem|em)/g,
    type: "error",
    label: "hardcoded font-size",
    getHint: (match) => {
      const val = (match.match(/[\d.]+(?:px|rem|em)/) || [])[0];
      return val ? TOKEN_MAP[val] || "--font-size-* token" : "--font-size-* token";
    },
  },
  {
    // font-weight with a raw value
    pattern: /font-weight\s*:\s*(?!var\()\d+/g,
    type: "error",
    label: "hardcoded font-weight",
    getHint: (match) => {
      const val = (match.match(/\d+$/) || [])[0];
      return val ? TOKEN_MAP[val] || "--font-weight-* token" : "--font-weight-* token";
    },
  },
  {
    // border-radius with raw px (not var())
    pattern: /border-radius\s*:\s*(?!var\()[\d.]+px/g,
    type: "error",
    label: "hardcoded border-radius",
    getHint: (match) => {
      const val = (match.match(/[\d.]+px/) || [])[0];
      return val ? TOKEN_MAP[val] || "--radius-md or --radius-pill" : "--radius-* token";
    },
  },
  {
    // z-index with a raw number (not var())
    pattern: /z-index\s*:\s*(?!var\()\d+/g,
    type: "error",
    label: "hardcoded z-index",
    getHint: (match) => {
      const key = match.trim().replace(/\s+/g, " ");
      return TOKEN_MAP[key] || "--z-* token";
    },
  },
  // ── WARNINGS ─────────────────────────────────────────────────────────────
  {
    // padding/margin/gap with raw px
    pattern: /(?:padding|margin|gap)\s*:\s*(?!var\()[^;]*\d+px/g,
    type: "warning",
    label: "hardcoded spacing",
    getHint: (match) => {
      const val = (match.match(/(\d+)px/) || [])[0];
      return val ? TOKEN_MAP[val] || "--space-* token" : "--space-* token";
    },
  },
  {
    // transition with raw duration (not var())
    pattern: /transition\s*:[^;]*(?<!\))\b\d+(?:ms|s)\b/g,
    type: "warning",
    label: "hardcoded transition duration",
    getHint: (match) => {
      const ms = (match.match(/\d+ms/) || [])[0];
      return ms ? TOKEN_MAP[ms] || "--duration-* token" : "--duration-* token";
    },
  },
  {
    // cubic-bezier without var()
    pattern: /cubic-bezier\([^)]+\)/g,
    type: "warning",
    label: "hardcoded easing curve",
    getHint: () => "--ease-smooth or --ease-spring",
  },
];

// ─── File collection ────────────────────────────────────────────────────────
function shouldSkip(filePath) {
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
  return SKIP_PATHS.some((s) => rel.startsWith(s) || rel.includes(s));
}

function collectFiles(dir, exts) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (shouldSkip(full)) continue;
    if (entry.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

// ─── CSS extraction ─────────────────────────────────────────────────────────
function extractCssBlocks(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const ext = path.extname(filePath);

  if (ext === ".css") {
    // Skip the Layer 1 :root block in tokens.css (intentionally has raw values)
    if (filePath.includes("tokens.css")) {
      const layer2Start = src.indexOf("/* ===\n   LAYER 2");
      if (layer2Start === -1) return [];
      return [{ src: src.slice(layer2Start), startLine: src.slice(0, layer2Start).split("\n").length }];
    }
    return [{ src, startLine: 1 }];
  }

  if (ext === ".html") {
    const blocks = [];
    let pos = 0;
    while (true) {
      const open = src.indexOf("<style", pos);
      if (open === -1) break;
      const close = src.indexOf("</style>", open);
      if (close === -1) break;
      // Strip :root { ... } blocks — the wireframe's own token layer (raw values are intentional there)
      const blockSrc = src.slice(open, close).replace(/:root\s*\{[^}]*\}/gs, "");
      const startLine = src.slice(0, open).split("\n").length;
      blocks.push({ src: blockSrc, startLine });
      pos = close + 8;
    }
    return blocks;
  }

  if (ext === ".tsx" || ext === ".ts") {
    // Extract inline style objects — look for style={{ ... }} patterns
    const blocks = [];
    const inlinePattern = /style\s*=\s*\{\s*\{([\s\S]*?)\}\s*\}/g;
    let m;
    while ((m = inlinePattern.exec(src)) !== null) {
      const startLine = src.slice(0, m.index).split("\n").length;
      blocks.push({ src: m[0], startLine, isInline: true });
    }
    // Also check styled JSX or style prop strings
    return blocks;
  }

  return [];
}

// ─── Scan ───────────────────────────────────────────────────────────────────
function scanBlock(filePath, block, violations) {
  const lines = block.src.split("\n");

  for (const v of VIOLATIONS) {
    let m;
    const re = new RegExp(v.pattern.source, v.pattern.flags);
    while ((m = re.exec(block.src)) !== null) {
      const linesBefore = block.src.slice(0, m.index).split("\n").length - 1;
      const absLine = block.startLine + linesBefore;
      const hint = v.getHint(m[0]);
      violations.push({
        file: path.relative(process.cwd(), filePath),
        line: absLine,
        type: v.type,
        label: v.label,
        value: m[0].trim().slice(0, 80),
        hint,
      });
    }
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────
const files = [
  ...collectFiles(rootDir, [".css"]),
  ...collectFiles(rootDir, [".tsx", ".ts"]),
  ...collectFiles(rootDir, [".html"]),
];

const violations = [];

for (const f of files) {
  try {
    const blocks = extractCssBlocks(f);
    for (const block of blocks) {
      scanBlock(f, block, violations);
    }
  } catch (e) {
    console.warn(`⚠  Could not read ${f}: ${e.message}`);
  }
}

// ─── Report ─────────────────────────────────────────────────────────────────
const errors = violations.filter((v) => v.type === "error");
const warnings = violations.filter((v) => v.type === "warning");

if (violations.length === 0) {
  console.log("✓  Token audit passed — zero violations.");
  process.exit(0);
}

const byFile = {};
for (const v of violations) {
  (byFile[v.file] = byFile[v.file] || []).push(v);
}

for (const [file, vs] of Object.entries(byFile).sort()) {
  console.log(`\n${file}`);
  for (const v of vs) {
    const icon = v.type === "error" ? "✗" : "⚠";
    const tag = v.type === "error" ? "ERROR  " : "WARNING";
    console.log(`  ${icon} ${tag} line ${v.line}: ${v.label}`);
    console.log(`          ${v.value}`);
    if (v.hint) console.log(`          → use ${v.hint}`);
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`  Errors:   ${errors.length}`);
console.log(`  Warnings: ${warnings.length}`);
console.log(`  Total:    ${violations.length}`);

if (errors.length > 0 || (strict && warnings.length > 0)) {
  console.log("\n✗  Audit failed. Fix errors before committing.\n");
  process.exit(1);
} else {
  console.log("\n⚠  Warnings found — no errors. Run with --strict to fail on warnings.\n");
  process.exit(0);
}
