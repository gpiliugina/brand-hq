# Motion

## Overview

Motion in Archive is purposeful and restrained. It communicates state change, not personality. The two easing curves cover all use cases: `ease-smooth` for predictable hover/transition feedback, `ease-spring` for the one brand-motion moment — the springy photo scale.

## Tokens

### Duration

| Token | Value | When to use |
| --- | --- | --- |
| `--duration-fast` | `120ms` | Press feedback (button active, small state toggles) |
| `--duration-base` | `220ms` | Hover lift, tab switch, most transitions |
| `--duration-screen` | `600ms` | Full-screen entrance animations |

### Easing

| Token | Value | When to use |
| --- | --- | --- |
| `--ease-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default — lift hover, focus ring, most transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring overshoot — photo bubble scale, widget pop-in |

### Composed transition

| Token | Value | When to use |
| --- | --- | --- |
| `--photo-transition` | `transform var(--duration-base) var(--ease-spring)` | PhotoBubble hover/active scale |

## Rules

- Never hardcode a duration in milliseconds or seconds in a component — always reference `--duration-*`.
- Never hardcode a `cubic-bezier` in a component — always reference `--ease-*`.
- The spring easing is for **scale transforms only** (photos, pop-in widgets). Do not use it for `opacity` or `color` transitions — the overshoot reads as a glitch there.
- Entrance animations (`screenIn`, `heroIn`, `tileIn`) are keyframe animations; their timing uses the duration tokens inline via `animation-duration` or the shorthand. Do not use the transition shorthand for entrance animations.
- `--duration-screen` (600ms) is only for page-level entrances. A tooltip or hover state that takes 600ms feels broken.

## Entrance animation reference

These keyframe animations are defined globally in `archive-wireframe.html` and/or in the app's global CSS. They use duration and easing tokens.

| Animation | Duration | Easing | Use |
| --- | --- | --- | --- |
| `screenIn` | `--duration-screen` | `--ease-smooth` | Screen/page entrance |
| `heroIn` | `--duration-screen` | `--ease-smooth` | Hero H1 entrance |
| `tileIn` | `--duration-screen` | `--ease-smooth` | Card/tile staggered entrance |
| `widgetAddIn` | `--duration-base` | `--ease-spring` | Widget added to home |
| `popIn` | `--duration-base` | `--ease-spring` | Small element pop appearance |
| `fadeIn` | `--duration-base` | `--ease-smooth` | Simple opacity fade |

## Do / Don't

✓ `transition: transform var(--duration-base) var(--ease-spring);`
✗ `transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);`

✓ `animation: screenIn var(--duration-screen) var(--ease-smooth) both;`
✗ `animation: screenIn 600ms ease both;`
