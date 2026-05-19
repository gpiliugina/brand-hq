# Color

## Overview

One dark, one bg, one accent, two soft status pairs, plus a placeholder ramp for skeletons. That's the whole surface area.

The accent (`--color-accent`) is the acid stroke and lives entirely inside the Highlight component on the hero H1. Restraint is the system — every other color decision is some shade of gray.

## Tokens

### Text
| Token | Value | Use |
| --- | --- | --- |
| `--color-text` | `#404040` | Default text |
| `--color-text-muted` | `#888888` | Secondary, helper, eyebrow, metadata |
| `--color-text-inverse` | white | Text on filled-strong surfaces |
| `--color-text-danger` | `#7A5050` | Error labels |
| `--color-text-success` | `#3A6A3A` | Confirmation labels |

### Surfaces
| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#ECEDEF` | The single page background |
| `--color-surface` | white | Cards, panels |
| `--color-surface-faint` | `#F5F5F6` | Recessed insets |

### Filled chrome
| Token | Use |
| --- | --- |
| `--color-fill-strong` | Avatar bg, primary button bg (same value as `--color-text`, semantically distinct) |
| `--color-fill-strong-text` | White text on the above |

### Bubble
| Token | Use |
| --- | --- |
| `--color-bubble` | Flat gray circle placeholder — content stand-in when no real photo is available |

### Accent
| Token | Use |
| --- | --- |
| `--color-accent` | The acid stroke. **Highlight component only.** |

### Status
| Token | Use |
| --- | --- |
| `--color-status-ok-bg` / `-fg` | Soft sage pair for success |
| `--color-status-bad-bg` / `-fg` | Soft rose pair for error/destructive |

### Placeholder ramp
For skeletons and asset stand-ins. See token reference.

## Usage rules

- Default text is `--color-text` (`#404040`). Never pure black.
- `--color-fill-strong` is a **background** color (avatars, filled buttons). Don't apply it to text — text is `--color-text` even though both resolve to `#404040`. The aliases keep the *intent* clear so a future change won't accidentally affect the wrong context.
- The acid `--color-accent` is for the stroke on the hero H1's highlighted word. Nowhere else. No focus rings, no buttons, no hovers.
- One page background — `--color-bg` covers role/login *and* the dashboard.
- Status colors are soft earth tones by design. Don't replace with vibrant green/red.
- Bubble placeholders are flat gray. No gradients, no shadows, no shine. Real photos use real photos.

## Do / Don't

✓ `color: var(--color-text);`
✗ `color: #000;`

✓ Stroke highlight on one word in the hero H1.
✗ Acid color anywhere else.

✓ `background: var(--color-fill-strong);` on a primary button.
✗ `color: var(--color-fill-strong);` on body text — works but wrong alias for that intent; use `--color-text`.

## Examples

Hero with brand stroke:
```css
.hero-h1 {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-hero);
  line-height: var(--line-height-hero);
}

.highlight {
  -webkit-text-stroke: var(--stroke-accent) var(--color-accent);
  paint-order: stroke fill;
  -webkit-text-stroke-linejoin: round;
}
```

Card on bg:
```css
.card {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-line);
  color: var(--color-text);
}
```
