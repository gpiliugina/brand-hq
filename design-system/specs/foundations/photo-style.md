# Photo Style (liquid glass)

## Overview

The second brand element. Where the **acid stroke highlight** makes text feel like Archive, the **liquid-glass photo treatment** makes photos feel like Archive. Both are signatures; they appear together on hero screens and reinforce each other.

Every photo rendered in the product gets the treatment by default. The treatment turns a flat circular crop into a 3D glass bead — the photo sits behind a stack of CSS layers (rim, glass tint, iridescence, depth shadow, specular highlight) plus a subtle SVG distortion filter. The cumulative effect: photos look like marbles, snow-globes, or soap bubbles holding the image inside.

This is deliberate. A brand-management product full of *flat circular photos* would look like every other SaaS. The liquid-glass treatment is what makes a team photo grid, a brand-asset gallery, or a memory screen visibly Archive's.

## The recipe

A photo gets the treatment by wrapping the image in a circular container and stacking **five layers** on top of it (in z-order, lowest to highest):

1. **Image** — `<img>` clipped to a circle via `border-radius: 50%`
2. **Glass tint** — uniform dark-blue overlay (~12% opacity) that desaturates and unifies the photo
3. **Depth** — radial gradient at the bottom of the circle, dark to transparent, faking the shadow side of a sphere
4. **Iris** — conic-gradient rainbow at 14–28% opacity with `mix-blend-mode: screen`, producing the iridescent "petrol on water" edge color
5. **Spec** — bright tilted highlight at the top-left, faking specular reflection on a glass surface

Plus the container itself carries a **composed `box-shadow`** that paints the rim of the bead:
- Inner white ring (1.5px) — the bright top edge
- Inner dark inset on bottom-right — the dark inner curve
- Inner light inset on top-left — the lit inner curve
- Two outer drop shadows — one tight, one diffuse — anchoring the bead on the surface

And finally, a **single SVG `<filter id="liquidGlass">`** is defined once in the document and referenced on every photo via `filter: url(#liquidGlass)`. It uses `feTurbulence` + `feDisplacementMap` to introduce a subtle warping that makes the photo feel like it's seen through real glass.

## Tokens

The treatment is multi-layered, so it owns several tokens. All live in `tokens.css`.

| Token | Value | What it controls |
| --- | --- | --- |
| `--photo-tint` | `rgb(20 20 40 / 0.12)` | The dark-blue glass overlay color |
| `--photo-rim-shadow` | composed box-shadow (see tokens.css) | Inner+outer shadow stack that builds the bead rim |
| `--photo-iris-gradient` | conic-gradient string | The rainbow iridescence colors and stops |
| `--photo-spec-gradient` | radial-gradient string | The specular highlight |
| `--photo-depth-gradient` | radial-gradient string | The bottom-shadow gradient |
| `--photo-filter` | `url(#liquidGlass)` | The SVG distortion filter reference |
| `--photo-selected-ring` | `var(--color-accent)` | Acid ring around a photo when selected |
| `--photo-hover-scale` | `1.06` | Scale on hover |
| `--photo-press-scale` | `0.95` | Scale on active/press |
| `--photo-transition` | `transform var(--duration-base) var(--ease-spring)` | The springy scale animation |

The iris/spec/depth gradients live in tokens because they ARE the recipe — changing them is changing the brand. Don't inline them in components.

## The SVG filter

The `liquidGlass` filter must be defined **once** in the document, typically near the top of `<body>` or in a global SVG defs file. Every photo references it via `filter: url(#liquidGlass)`.

```html
<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <defs>
    <filter id="liquidGlass" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="3" seed="42" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
```

**Tuning knobs** (only change for new variants, not as one-off tweaks):
- `baseFrequency` — higher = finer warp pattern. Default 0.018/0.022 reads as subtle distortion at thumbnail sizes.
- `scale` — strength of the warp. 3 is the default; anything above 8 reads as "broken image."
- `seed` — randomizes the noise. Keep 42 unless you want a different fingerprint.

## Usage rules

- **Every product photo gets the treatment.** Default-on. No raw `<img>` cropped to a circle without the bead layers.
- **Always circular** in v1. Square or rounded-rect variants are a future decision; don't extend the treatment to other shapes without specifying a separate recipe.
- **Selected state uses `--color-accent` as a ring.** This is one of the two valid uses of the accent outside the Highlight component (the other being the ✓ badge on selected photos). Don't introduce other accent uses.
- **The treatment is expensive.** Five overlay layers + an SVG filter per photo can stutter at 50+ photos on screen. For dense grids (memory wall, asset library), use the treatment on visible cards only; defer for off-screen ones, or render a flat placeholder until the photo is in view.
- **Sizes** vary by context — typical bead diameters in the product are 40, 60, 80, 92, 120px. Don't fix a size in the spec; pass it as a prop.

## Do / Don't

✓ A team-photo grid with every face rendered as a liquid-glass bead.
✗ A flat circular avatar in the same grid — breaks the visual rule.

✓ Selected photo gets a 3px acid-yellow ring + ✓ badge.
✗ Selected photo gets a blue ring "for accessibility" — the accent IS the selection signal.

✓ A 4-photo team preview at 92px each, all with the full treatment.
✗ The same treatment on a 200-photo memory wall — too expensive, use deferred rendering or a flat placeholder for off-screen photos.

## Cross-references

- **Used by**: `specs/components/photo-bubble.md` (the canonical circular implementation)
- **See also**: `specs/components/bubble.md` (the flat-gray placeholder used when no photo is available — opposite role)
- **See also**: `specs/components/highlight.md` (the other brand signature element)
