# Elevation

## Overview

One shadow. Archive does not use shadows to establish hierarchy — it uses surface colour, spacing, and the dotted background to separate layers. The single drop shadow exists for elements that genuinely *float* above the surface: a modal, a popover, a card lifted off the grid. Using it on static cards or widget tiles would flatten the page; reserve it for true elevation.

## Tokens

| Token | Value | When to use |
| --- | --- | --- |
| `--shadow-card` | `0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 12px -2px rgb(0 0 0 / 0.06)` | Floating elements only — modals, popovers, lifted cards |

## Photo treatment shadows (separate system)

The liquid-glass photo treatment has its own multi-layer `box-shadow` via `--photo-rim-shadow`. It is not an elevation shadow — it is a 3D-bead rendering technique. Do not apply `--shadow-card` to photos.

| Token | Role |
| --- | --- |
| `--photo-rim-shadow` | 5-layer inset + drop shadow stack that builds the bead rim |

## Z-index scale

Archive uses a minimal, named z-index scale. No magic numbers.

| Token | Value | When to use |
| --- | --- | --- |
| `--z-0` | `0` | Base layer — ghost atmospheric type, default stacking |
| `--z-1` | `1` | One step above base |
| `--z-2` | `2` | Photo glass tint layer (`--photo-z-glass`) |
| `--z-3` | `3` | Photo iris + depth layers (`--photo-z-iris`, `--photo-z-depth`) |
| `--z-4` | `4` | Photo specular layer (`--photo-z-spec`); bubble content |
| `--z-10` | `10` | Photo selected badge (`--photo-z-badge`); floating indicators |
| `--z-overlay` | `999` | Full-screen overlays, circle-reveal transitions |

### Photo layer aliases (preferred over raw z-index tokens in photo components)

| Token | Value | Layer |
| --- | --- | --- |
| `--photo-z-glass` | `var(--z-2)` | Dark-blue glass tint |
| `--photo-z-iris` | `var(--z-3)` | Iridescent conic gradient |
| `--photo-z-depth` | `var(--z-3)` | Bottom-sphere depth shadow |
| `--photo-z-spec` | `var(--z-4)` | Top-left specular highlight |
| `--photo-z-badge` | `var(--z-10)` | ✓ selected badge |

## Rules

- Never use a raw integer for `z-index`. Always reference a `--z-*` token.
- Never use `z-index: 9999` or similar "just make it work" values — add a named step to the scale if a new layer is needed.
- The overlay scale is intentionally sparse. If you need something between `--z-4` and `--z-10`, propose a token, don't interpolate.
- `--shadow-card` is the **only** drop shadow. Do not introduce `box-shadow` values with different blur/offset values — they erode the single-shadow discipline.
