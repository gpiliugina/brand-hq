# Archive — Design System

A brand management and DAM platform. The visual signature: **a single acid-stroked word in a display-serif hero — and Inter doing everything else**. Restraint is the system.

This project uses a token-based design system. Every visual decision has already been made and named. When writing UI, **look up**; don't decide.

## Read these before writing UI

- `design-system/tokens.css` — the closed set of variables
- `design-system/specs/tokens/token-reference.md` — flat lookup table
- `design-system/specs/foundations/` — color, typography, spacing, radius
- `design-system/specs/components/[name].md` — read before building or modifying

## The signature rules (do not break these)

1. **TWO brand elements, both required.**
   - **Stroke highlight**: `-webkit-text-stroke: 0.16em var(--color-accent)` with `paint-order: stroke fill` on one word inside the display-serif H1. See `design-system/specs/components/highlight.md`.
   - **Liquid-glass photo treatment**: every photo in the product is rendered through the 5-layer + SVG-filter recipe in `design-system/specs/foundations/photo-style.md`. Implementation in `design-system/specs/components/photo-bubble.md`.
   Both elements use the acid `--color-accent` — the stroke uses it directly; PhotoBubble uses it for the selected ring + ✓ badge. These are the ONLY valid uses of accent.
2. **Display serif is for the hero H1 only.** Every other piece of type — card titles, widget previews, stat numerals, avatar initials, nav, buttons, body, captions — uses Inter (`--font-family-ui`).
3. **Body default is 13px** (`--font-size-body`).
4. **One page background.** `--color-bg` (`#ECEDEF`) everywhere, with the dotted radial pattern.
5. **One dark.** `--color-text` (`#404040`) is used for text, avatars, and filled buttons. No second darker shade; no pure black.
6. **One hero size.** `--font-size-h1` (80px) for every page hero.
7. **Photos use PhotoBubble. Placeholders use Bubble.** When a real photo is available, render it through the liquid-glass treatment (PhotoBubble). When a photo *isn't* available, use a flat gray Bubble. Never use a raw `<img>` clipped to a circle without the treatment.

## Required document-level setup

The liquid-glass photo treatment depends on an SVG filter defined once at the document root. Without it, all photos render flat. Already wired in `app/layout.tsx` just inside `<body>`:

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

1. **Only use tokens from `design-system/tokens.css`.** No hex codes, no `px`, no inline `rgb()`.
2. **Reference Layer 2 aliases, not Layer 1 primitives.** `var(--color-text)`, not `var(--ds-ink)`.
3. **If a needed value doesn't exist, propose a new token.** Don't hardcode.
4. **Don't combine tokens additively.** Propose a new step if the scale is missing one.
5. **Semantic colors are deliberately soft.** Muted earth tones, not vibrant. Don't replace.

## Component rules

- Before building a component, read its spec.
- Specs exist for: Highlight, Avatar, Pill, Card, Search input, Button, Bubble, PhotoBubble.
- No specs yet for: modal, toast, dropdown, sidebar nav, table, widget picker. If you need one of these, **stop and propose a spec** before building.
- Every component handles the states named in its spec. Never remove focus rings.

## What you're optimizing for

The product reads as editorial and serious because of *what isn't there* — no gradients, no vibrant chrome, no extra fonts in chrome, no extra accents. The one display-serif hero with one acid-stroked word is where the brand speaks loud. Every time you add a value, you erode that contrast.

## App stack

Next.js 14 + TypeScript + App Router. Run with:

```bash
npm run dev    # http://localhost:3000
```

Tokens load order in `app/layout.tsx`:
```tsx
import "../design-system/tokens.css";  // FIRST — tokens must load before any other styles
import "./globals.css";
```

Fonts (Libre Caslon Display + Inter) are loaded via `next/font/google` and exposed as CSS variable overrides for `--font-family-display` and `--font-family-ui`.

## Component rules

- Before building a component, read its spec in `design-system/specs/components/`.
- Existing components: `app/components/Highlight.tsx`, `app/components/PhotoBubble.tsx`.
- PhotoBubble CSS classes (`.photo-bubble`, `.photo-bubble-glass`, etc.) live in `app/globals.css`.

## When to extend the system

You'll hit moments where a needed value doesn't exist — a modal, a tooltip, a dropdown. The rule:

- **Don't hardcode.** Even once.
- **Propose a token addition** to `design-system/tokens.css` first, document it in `design-system/specs/tokens/token-reference.md`, then use it.
- **Propose a spec** for new components in `design-system/specs/components/`. Same 8-section structure as existing specs.

## Working agreement

Before writing or modifying any UI code:

1. Read `design-system/CLAUDE.md` and the relevant spec in `design-system/specs/`.
2. Use only tokens from `design-system/tokens.css` — no hex codes, no raw `px`, no inline `rgb()`.
3. Run the token audit before committing. **Zero errors required.**

```bash
node scripts/token-audit.js          # must exit 0 before commit
node scripts/token-audit.js --strict # warnings also fail (optional, stricter gate)
```

The audit scans all `.css`, `.tsx/.ts`, and `.html` files for hardcoded visual values. It skips `node_modules/`, `.next/`, `design-system/tokens.css` (Layer 1 intentionally has raw values), and `:root {}` blocks in HTML files (the wireframe's own token layer).
