#!/usr/bin/env node
/**
 * One-off script: tokenise hardcoded values in archive-wireframe.html.
 * Run once, then delete. Does NOT touch :root Layer-1 definitions.
 */
const fs = require("fs");
const filePath = "archive-wireframe.html";
let src = fs.readFileSync(filePath, "utf8");

// ── 1. Inject new tokens into the wireframe's :root ──────────────────────────
// Insert BEFORE the closing brace of the first :root block.
const NEW_ROOT_TOKENS = `
    /* ── Typography scale ── */
    --font-size-body: 13px;
    --font-size-input: 22px;
    --font-weight-regular: 400;
    --line-height-base: 1.4;
    --letter-spacing-hero: -0.03em;

    /* ── Grid pattern ── */
    --grid-dot-size: 1px;
    --grid-bg-size: 28px 28px;

    /* ── Z-index scale ── */
    --z-0: 0;
    --z-2: 2;
    --z-3: 3;
    --z-4: 4;
    --z-overlay: 999;

    /* ── Radius ── */
    --radius-full: 50%;
    --radius-input: 18px;

    /* ── Motion ── */
    --duration-fast: 0.12s;
    --duration-base: 0.22s;
    --duration-slow: 0.3s;
    --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out: ease;

    /* ── Photo treatment (mirrors design-system/tokens.css) ── */
    --photo-tint: rgba(20, 20, 40, 0.12);
    --photo-rim-shadow:
      inset 0 0 0 1.5px rgba(255, 255, 255, 0.25),
      inset -6px -6px 18px rgba(0, 0, 0, 0.55),
      inset 4px 4px 12px rgba(255, 255, 255, 0.18),
      0 8px 32px rgba(0, 0, 0, 0.22),
      0 2px 8px rgba(0, 0, 0, 0.14);
    --photo-iris-gradient: conic-gradient(
      from 200deg,
      rgba(120, 80, 220, 0.28) 0deg,
      rgba(60, 160, 255, 0.22) 60deg,
      rgba(80, 220, 180, 0.18) 100deg,
      rgba(240, 220, 60, 0.14) 140deg,
      rgba(255, 100, 80, 0.20) 200deg,
      rgba(200, 60, 220, 0.25) 260deg,
      rgba(120, 80, 220, 0.28) 360deg
    );
    --photo-spec-gradient: radial-gradient(
      ellipse at 40% 35%,
      rgba(255, 255, 255, 0.72) 0%,
      rgba(255, 255, 255, 0.22) 45%,
      rgba(255, 255, 255, 0) 100%
    );
    --photo-depth-gradient: radial-gradient(
      ellipse at 60% 80%,
      rgba(0, 0, 0, 0.38) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    --photo-filter: url(#liquidGlass);
    --photo-hover-scale: 1.06;
    --photo-press-scale: 0.95;
    --photo-transition: transform var(--duration-slow) var(--ease-spring);

    /* ── Sphere treatment ── */
    --sphere-shadow:
      inset -5px -5px 12px rgba(0, 0, 0, 0.20),
      inset 4px 4px 10px rgba(255, 255, 255, 0.60);
    --sphere-spec-gradient: radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%);
    --sphere-depth-gradient: radial-gradient(circle, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0) 100%);

    /* ── Placeholder / CTA text ── */
    --placeholder: #9AA0A6;
`;

// Insert before `    color-scheme: light;` which is the last line in :root
src = src.replace(
  /(\s+color-scheme: light;)/,
  NEW_ROOT_TOKENS + "$1"
);

// ── 2. body block fixes ───────────────────────────────────────────────────────
src = src.replace(
  /font-size: 13px;/g,
  "font-size: var(--font-size-body);"
);
src = src.replace(
  /line-height: 1\.4;/g,
  "line-height: var(--line-height-base);"
);
src = src.replace(
  /background-size: 28px 28px;/g,
  "background-size: var(--grid-bg-size);"
);
// Fix radial-gradient dot size (1px hardcoded)
src = src.replace(
  /radial-gradient\(circle, var\(--grid-dot\) 1px, transparent 1px\)/g,
  "radial-gradient(circle, var(--grid-dot) var(--grid-dot-size), transparent var(--grid-dot-size))"
);
// body transition
src = src.replace(
  /transition: background-color 0\.3s ease, color 0\.3s ease;/g,
  "transition: background-color var(--duration-slow) var(--ease-out), color var(--duration-slow) var(--ease-out);"
);

// ── 3. Placeholder ─────────────────────────────────────────────────────────
src = src.replace(
  /::placeholder \{ color: #999; \}/,
  "::placeholder { color: var(--placeholder); }"
);

// ── 4. .ghost ─────────────────────────────────────────────────────────────
src = src.replace(
  /z-index: 0; white-space: nowrap; letter-spacing: -0\.03em;/,
  "z-index: var(--z-0); white-space: nowrap; letter-spacing: var(--letter-spacing-hero);"
);

// ── 5. .sphere pseudo-element border-radius and z-index ───────────────────
src = src.replace(
  /border-radius: 50%; pointer-events: none; z-index: 2;/g,
  "border-radius: var(--radius-full); pointer-events: none; z-index: var(--z-2);"
);

// ── 6. .sphere box-shadow and transition ──────────────────────────────────
src = src.replace(
  `box-shadow:
      inset -5px -5px 12px rgba(0,0,0,0.20),
      inset 4px 4px 10px rgba(255,255,255,0.60);`,
  "box-shadow: var(--sphere-shadow);"
);
src = src.replace(
  /transition: transform 0\.3s cubic-bezier\(0\.34,1\.56,0\.64,1\), box-shadow 0\.2s ease;/,
  "transition: transform var(--duration-slow) var(--ease-spring), box-shadow var(--duration-slow) var(--ease-out);"
);

// .sphere::before background gradient
src = src.replace(
  /background: radial-gradient\(circle, rgba\(255,255,255,0\.85\) 0%, rgba\(255,255,255,0\) 100%\);/,
  "background: var(--sphere-spec-gradient);"
);
// .sphere::after background gradient
src = src.replace(
  /background: radial-gradient\(circle, rgba\(0,0,0,0\.18\) 0%, rgba\(0,0,0,0\) 100%\);/,
  "background: var(--sphere-depth-gradient);"
);

// ── 7. .lift-hover and .press-fx transitions ──────────────────────────────
src = src.replace(
  /transition: transform 0\.22s cubic-bezier\(0\.22,1,0\.36,1\), box-shadow 0\.22s ease;/,
  "transition: transform var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-out);"
);
src = src.replace(
  /transition: transform 0\.12s ease;/,
  "transition: transform var(--duration-fast) var(--ease-out);"
);

// ── 8. .name-field ────────────────────────────────────────────────────────
src = src.replace(
  /\.name-field \{[\s\S]*?background: #FFFFFF;[\s\S]*?border-radius: 18px;[\s\S]*?font-size: 22px;/,
  (m) =>
    m
      .replace("background: #FFFFFF;", "background: var(--surface);")
      .replace("border-radius: 18px;", "border-radius: var(--radius-input);")
      .replace("font-size: 22px;", "font-size: var(--font-size-input);")
);

// ── 9. Delete dead dark-theme .name-field block ───────────────────────────
src = src.replace(
  /\s*:root\[data-theme="dark"\] \.name-field \{[\s\S]*?\}/,
  ""
);

// ── 10. .cta-letter color ─────────────────────────────────────────────────
src = src.replace(
  /color: #9AA0A6;/g,
  "color: var(--placeholder);"
);

// ── 11. .circle-reveal z-index ────────────────────────────────────────────
// (background-size already fixed by global 28px replace above)
src = src.replace(
  /z-index: 999;/g,
  "z-index: var(--z-overlay);"
);

// ── 12. .bubble-content z-index ───────────────────────────────────────────
// z-index: 4 appears multiple times; target .bubble-content context
// Global z-index replacements (safe because these values always map to tokens)
src = src.replace(/z-index: 4;/g, "z-index: var(--z-4);");
src = src.replace(/z-index: 3;/g, "z-index: var(--z-3);");
src = src.replace(/z-index: 2;/g, "z-index: var(--z-2);");

// ── 13. .photo-bubble ─────────────────────────────────────────────────────
// border-radius: 50% on photo-bubble and its layers
src = src.replace(/border-radius: 50%;/g, "border-radius: var(--radius-full);");
// 0 0 50% 50% for depth
src = src.replace(
  /border-radius: 0 0 50% 50%;/g,
  "border-radius: 0 0 var(--radius-full) var(--radius-full);"
);

// transition
src = src.replace(
  /transition: transform 0\.3s cubic-bezier\(0\.34, 1\.56, 0\.64, 1\);/,
  "transition: var(--photo-transition);"
);

// box-shadow (the multi-line rim shadow)
src = src.replace(
  `box-shadow:
      inset 0 0 0 1.5px rgba(255,255,255,0.25),
      inset -6px -6px 18px rgba(0,0,0,0.55),
      inset 4px 4px 12px rgba(255,255,255,0.18),
      0 8px 32px rgba(0,0,0,0.22),
      0 2px 8px rgba(0,0,0,0.14);`,
  "box-shadow: var(--photo-rim-shadow);"
);

// hover/active scale
src = src.replace(
  /transform: scale\(1\.06\);/g,
  "transform: scale(var(--photo-hover-scale));"
);
src = src.replace(
  /transform: scale\(0\.95\);/g,
  "transform: scale(var(--photo-press-scale));"
);

// photo-bubble-spec background gradient
src = src.replace(
  /background: radial-gradient\(\s*ellipse at 40% 35%,\s*rgba\(255,255,255,0\.72\) 0%,\s*rgba\(255,255,255,0\.22\) 45%,\s*rgba\(255,255,255,0\) 100%\s*\);/,
  "background: var(--photo-spec-gradient);"
);

// photo-bubble-iris background (conic-gradient)
src = src.replace(
  /background: conic-gradient\(\s*from 200deg,[\s\S]*?rgba\(120,80,220,0\.28\) 360deg\s*\);/,
  "background: var(--photo-iris-gradient);"
);

// photo-bubble-depth background
src = src.replace(
  /background: radial-gradient\(\s*ellipse at 60% 80%,\s*rgba\(0,0,0,0\.38\) 0%,\s*rgba\(0,0,0,0\) 100%\s*\);/,
  "background: var(--photo-depth-gradient);"
);

// photo-bubble-glass background
src = src.replace(
  /background: rgba\(20,20,40,0\.12\);/,
  "background: var(--photo-tint);"
);

// ── 14. -webkit-text-stroke-color hardcoded values ────────────────────────
src = src.replace(/-webkit-text-stroke-color: #FFFFFF;/g, "-webkit-text-stroke-color: var(--surface);");
src = src.replace(/-webkit-text-stroke-color: #E8FE67;/g, "-webkit-text-stroke-color: var(--accent);");

// ── 15. font-weight: 400 ─────────────────────────────────────────────────
src = src.replace(/font-weight: 400;/g, "font-weight: var(--font-weight-regular);");

// ── Write ─────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, src);
console.log("✓ archive-wireframe.html tokenised.");
