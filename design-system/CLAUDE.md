# Archive — Design System

A brand management and DAM platform. The visual signature: **a single acid-stroked word in a display-serif hero — and Inter doing everything else**. Restraint is the system.

This project uses a token-based design system. Every visual decision has already been made and named. When writing UI, **look up**; don't decide.

## Read these before writing UI

- `tokens.css` — the closed set of variables
- `specs/tokens/token-reference.md` — flat lookup table
- `specs/foundations/` — color, typography, spacing, radius
- `specs/components/[name].md` — read before building or modifying

## The signature rules (do not break these)

1. **TWO brand elements, both required.**
   - **Stroke highlight**: `-webkit-text-stroke: 0.16em var(--color-accent)` with `paint-order: stroke fill` on one word inside the display-serif H1. See `specs/components/highlight.md`.
   - **Liquid-glass photo treatment**: every photo in the product is rendered through the 5-layer + SVG-filter recipe in `specs/foundations/photo-style.md`. Implementation in `specs/components/photo-bubble.md`.
   Both elements use the acid `--color-accent` — the stroke uses it directly; PhotoBubble uses it for the selected ring + ✓ badge. These are the ONLY valid uses of accent.
2. **Display serif is for the hero H1 only.** Every other piece of type — card titles, widget previews, stat numerals, avatar initials, nav, buttons, body, captions — uses Inter (`--font-family-ui`).
3. **Body default is 13px** (`--font-size-body`).
4. **One page background.** `--color-bg` (`#ECEDEF`) everywhere, with the dotted radial pattern.
5. **One dark.** `--color-text` (`#404040`) is used for text, avatars, and filled buttons. No second darker shade; no pure black.
6. **One hero size.** `--font-size-h1` (80px) for every page hero.
7. **Photos use PhotoBubble. Placeholders use Bubble.** When a real photo is available, render it through the liquid-glass treatment (PhotoBubble). When a photo *isn't* available, use a flat gray Bubble. Never use a raw `<img>` clipped to a circle without the treatment.

## Required document-level setup

The liquid-glass photo treatment depends on an SVG filter defined once at the document root. Without it, all photos render flat. Add to `app/layout.tsx` (Next.js) or your equivalent root element, just inside `<body>`:

```html
<svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
  <defs>
    <filter id="liquidGlass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="3" seed="42" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
```

## Token rules

1. **Only use tokens from `tokens.css`.** No hex codes, no `px`, no inline `rgb()`.
2. **Reference Layer 2 aliases, not Layer 1 primitives.** `var(--color-text)`, not `var(--ds-ink)`.
3. **If a needed value doesn't exist, propose a new token.** Don't hardcode.
4. **Don't combine tokens additively.** Propose a new step if the scale is missing one.
5. **Semantic colors are deliberately soft.** Muted earth tones, not vibrant. Don't replace.

## Component rules

- Before building a component, read its spec.
- Specs exist for: Highlight, Avatar, Pill, Card, Search input, Button, Bubble.
- No specs yet for: modal, toast, dropdown, sidebar nav, table, widget picker. If you need one of these, **stop and propose a spec** before building.
- Every component handles the states named in its spec. Never remove focus rings.

## What you're optimizing for

The product reads as editorial and serious because of *what isn't there* — no gradients, no vibrant chrome, no extra fonts in chrome, no extra accents. The one display-serif hero with one acid-stroked word is where the brand speaks loud. Every time you add a value, you erode that contrast.

## Foundations specced
Color, Typography, Spacing, Radius, **Photo style (liquid glass)**. See `specs/foundations/`.

## Components specced
Highlight, Avatar, Pill, Card, Search input, Button, Bubble, **PhotoBubble**. See `specs/components/`.

Files outside this list don't have specs yet. If you need one, propose a spec before building.

---

# How to implement (Claude Code instructions)

## Folder layout

Drop the `design-system/` folder at your repo root:

```
your-repo/
├── design-system/
│   ├── tokens.css
│   ├── CLAUDE.md
│   └── specs/
│       ├── tokens/token-reference.md
│       ├── foundations/{color,typography,spacing,radius}.md
│       └── components/{highlight,avatar,pill,card,search-input,button,bubble}.md
├── src/
│   └── ... your app code
└── CLAUDE.md           ← symlink or copy of design-system/CLAUDE.md, see below
```

## 1. Wire tokens into your build

Import `tokens.css` once, at the entry point of your app, **before** any other styles:

**Next.js (App Router):**
```tsx
// app/layout.tsx
import "../design-system/tokens.css";
import "./globals.css";
```

**Vite / CRA:**
```tsx
// src/main.tsx
import "../design-system/tokens.css";
import "./index.css";
```

**Plain HTML:**
```html
<head>
  <link rel="stylesheet" href="/design-system/tokens.css" />
  <link rel="stylesheet" href="/your-app-styles.css" />
</head>
```

## 2. Load the fonts

Add to `<head>` (or Next.js `<Layout>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

## 3. Set base body styles

In your global stylesheet (after importing tokens.css):
```css
body {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-body);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  background-image: radial-gradient(circle, var(--color-grid-dot) 1px, transparent 1px);
  background-size: 28px 28px;
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
}
```

## 4. Make CLAUDE.md visible to Claude Code

Claude Code reads `CLAUDE.md` from the **repo root** at session start. Copy it up:

```bash
cp design-system/CLAUDE.md ./CLAUDE.md
```

Then **fix the paths** inside the root copy so they point to the nested folder:
- `tokens.css` → `design-system/tokens.css`
- `specs/` → `design-system/specs/`

(Or use a symlink: `ln -s design-system/CLAUDE.md ./CLAUDE.md` — but then update the paths in the original. Whichever you prefer.)

## 5. Smoke-test with the Highlight component

Build the Highlight first — it validates fonts, accent, and stroke together:

```tsx
// src/components/Highlight.tsx
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      WebkitTextStroke: "var(--stroke-accent) var(--color-accent)",
      paintOrder: "stroke fill",
      WebkitTextStrokeLinejoin: "round",
      display: "inline",
    }}>{children}</span>
  );
}
```

Test page:
```tsx
<h1 style={{
  fontFamily: "var(--font-family-display)",
  fontSize: "var(--font-size-h1)",
  fontWeight: "var(--font-weight-regular)",
  color: "var(--color-text)",
  letterSpacing: "var(--letter-spacing-hero)",
  lineHeight: "var(--line-height-hero)",
  margin: 0,
}}>
  Welcome, <Highlight>gala</Highlight>.
</h1>
```

If "Welcome, gala." renders in Libre Caslon Display with "gala" outlined in acid yellow on a dotted gray background, the system is wired.

## 6. Working with Claude Code

In your first session, prefix your first request:

> Read `CLAUDE.md` and the relevant specs in `design-system/specs/` before writing any UI code. Use only tokens from `design-system/tokens.css` — no hex codes, no px values, no inline rgb().

After that, Claude Code will pick up the rules from `CLAUDE.md` automatically. If you ever see it inventing colors or sizes, paste this line again — it's the corrective.

## 7. When to extend the system

You'll hit moments where a needed value doesn't exist — a modal, a tooltip, a dropdown. The rule:

- **Don't hardcode.** Even once.
- **Propose a token addition** to `tokens.css` first, document it in `specs/tokens/token-reference.md`, then use it.
- **Propose a spec** for new components in `specs/components/`. Same 8-section structure as existing specs.

Re-run the design-system-creator skill when adding components from scratch.
