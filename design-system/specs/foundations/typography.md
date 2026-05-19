# Typography

## Overview

**Display serif on one element. Inter on everything else.**

Libre Caslon Display appears only on the hero H1 (where it's paired with the acid-stroke Highlight on one word). Every other piece of type — card titles, widget previews, stat numerals, avatar initials, nav, buttons, body, eyebrows — is Inter.

The single-display-element rule is the whole typographic personality. It works because it's rare: the hero feels like a magazine cover precisely because no other type in the product looks anything like it.

## Tokens

### Family
| Token | Value | Use |
| --- | --- | --- |
| `--font-family-display` | Libre Caslon Display | **Hero H1 only.** |
| `--font-family-ui` | Inter | Everything else |
| `--font-family-mono` | SF Mono / JetBrains Mono | Hex codes, code, paths |

### Size
| Token | Value | Family | Use |
| --- | --- | --- | --- |
| `--font-size-eyebrow` | 10px | UI | Uppercase eyebrow labels |
| `--font-size-meta` | 11px | UI | Tiny metadata |
| `--font-size-caption` | 12px | UI | Captions, helper text |
| `--font-size-body` | 13px | UI | **Default body** |
| `--font-size-body-lg` | 14px | UI | Slightly emphasised body, avatar initials |
| `--font-size-card-title` | 18px | UI (Inter, semibold) | Card titles, widget headers |
| `--font-size-stat` | 28px | UI (Inter, medium) | Stat numerals inside cards |
| `--font-size-h1` | 80px | Display | THE hero, every page |

### Weight
| Token | Value | Use |
| --- | --- | --- |
| `--font-weight-light` | 300 | "+" glyphs |
| `--font-weight-regular` | 400 | **Body + hero display** |
| `--font-weight-medium` | 500 | UI labels, buttons, stat numerals, active nav |
| `--font-weight-semibold` | 600 | Card titles, emphasis |

### Line height
| Token | Value | Use |
| --- | --- | --- |
| `--line-height-hero` | 0.92 | Hero H1 |
| `--line-height-tight` | 1.25 | Card titles, headings |
| `--line-height-base` | 1.4 | Body, UI |

### Letter-spacing
| Token | Value | Use |
| --- | --- | --- |
| `--letter-spacing-hero` | -0.0313em | Hero H1 (≈ -2.5px @ 80px) |
| `--letter-spacing-eyebrow` | 0.14em | Uppercase eyebrows |

## Usage rules

- **Display family for the hero H1, and that's it.** Card titles, widget previews, stat numerals — all Inter.
- Hero is **80px**, weight **400** (regular). The face is heavy enough on its own; semibold would lose the editorial calm.
- Body default is 13px, line-height 1.4.
- Card titles: Inter semibold at 18px (`--font-size-card-title`, `--font-weight-semibold`).
- Stat numerals in cards (e.g. "847"): Inter medium at 28px (`--font-size-stat`, `--font-weight-medium`).
- Avatar initials: Inter medium at 14px (`--font-size-body-lg`, `--font-weight-medium`).
- Eyebrow labels: Inter medium at 10px with `--letter-spacing-eyebrow`, uppercase, muted color.
- Negative letter-spacing only on the hero. Don't apply to Inter UI text — it tightens to the point of legibility loss at small sizes.

## Examples

Hero H1 with brand stroke (the only display-serif moment):
```css
.hero {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-hero);
  line-height: var(--line-height-hero);
  margin: 0;
}
```

```html
<h1 class="hero">Welcome, <span class="highlight">gala</span>.</h1>
```

Card title (Inter):
```css
.card__title {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-card-title);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
}
```

Stat numeral (Inter):
```css
.stat {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-stat);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--color-text);
}
```

Eyebrow label:
```css
.eyebrow {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-eyebrow);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-eyebrow);
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```
