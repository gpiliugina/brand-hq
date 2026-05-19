# Token Reference

Flat lookup for every Layer 2 alias in `tokens.css`. Components reference these — never Layer 1 primitives.

## Color — text

| Token | Value | When to use |
| --- | --- | --- |
| `--color-text` | `#404040` | Default text — body, headings, display hero. Also background fill on avatars and primary buttons (via `--color-fill-strong`). |
| `--color-text-muted` | `#888888` | Secondary text, helper labels, eyebrow, metadata |
| `--color-text-inverse` | white | Text on filled-strong backgrounds |
| `--color-text-danger` | `#7A5050` | Error labels |
| `--color-text-success` | `#3A6A3A` | Confirmation labels |

## Color — surfaces

| Token | Value | When to use |
| --- | --- | --- |
| `--color-bg` | `#ECEDEF` | The single page background (with dotted overlay) |
| `--color-surface` | white | Cards, panels, modals |
| `--color-surface-faint` | `#F5F5F6` | Recessed insets, ghost-slot hover |

## Color — borders & lines

| Token | Value | When to use |
| --- | --- | --- |
| `--color-border` | `#E2E2E2` | Hairlines (rare — most cards use `--color-line`) |
| `--color-line` | `rgb(0 0 0 / 0.06)` | Tile borders, separators |
| `--color-grid-dot` | `rgb(0 0 0 / 0.07)` | The dotted page pattern |

## Color — filled chrome

| Token | Value | When to use |
| --- | --- | --- |
| `--color-fill-strong` | `#404040` | Avatar bg, primary button bg |
| `--color-fill-strong-text` | white | Label/initial on the above |

## Color — bubble

| Token | Value | When to use |
| --- | --- | --- |
| `--color-bubble` | `#E8E8E8` | Flat gray circle, content placeholder. Real photos use real photos. |

## Color — accent

| Token | Value | When to use |
| --- | --- | --- |
| `--color-accent` | `#E8FE67` | The acid stroke. **Highlight component only.** |

## Color — status

| Token | Value | When to use |
| --- | --- | --- |
| `--color-status-ok-bg` / `-fg` | `#E1E8DC` / `#3A6A3A` | Soft sage — approved/success |
| `--color-status-bad-bg` / `-fg` | `#F4DDDD` / `#7A5050` | Soft rose — error/destructive |

## Color — placeholder ramp

| Token | Value | When to use |
| --- | --- | --- |
| `--color-ph-1` | `#FAFAFA` | Lightest skeleton |
| `--color-ph-2` | `#F2F2F2` | Default skeleton |
| `--color-ph-3` | `#E8E8E8` | Mid (same as bubble) |
| `--color-ph-4` | `#D4D4D4` | Darkest anchor |

## Spacing

| Token | Value | Typical use |
| --- | --- | --- |
| `--space-xs` | 4px | Icon-to-text gap |
| `--space-sm` | 8px | Tight inline |
| `--space-md` | 12px | Pill padding |
| `--space-lg` | 16px | Input padding, default step |
| `--space-xl` | 20px | Widget grid gap |
| `--space-2xl` | 24px | Card content gap |
| `--space-3xl` | 32px | Section gap |
| `--space-4xl` | 40px | Hero bottom margin |
| `--space-5xl` | 64px | Page-level rhythm |

## Typography

### Family
| Token | Value | When to use |
| --- | --- | --- |
| `--font-family-display` | Libre Caslon Display | **Hero H1 only.** Nothing else. |
| `--font-family-ui` | Inter | Everything else — body, buttons, card titles, widget previews, stat numerals, avatar initials, nav, captions, eyebrow |
| `--font-family-mono` | SF Mono / JetBrains Mono | Hex codes, code, paths |

### Size
| Token | Value | Family | When to use |
| --- | --- | --- | --- |
| `--font-size-eyebrow` | 10px | UI | Uppercase eyebrow labels |
| `--font-size-meta` | 11px | UI | Tiny metadata |
| `--font-size-caption` | 12px | UI | Captions, helper text |
| `--font-size-body` | 13px | UI | **Default body** |
| `--font-size-body-lg` | 14px | UI | Slightly emphasised body, avatar initial |
| `--font-size-card-title` | 18px | UI (Inter) | Card titles, widget headers |
| `--font-size-stat` | 28px | UI (Inter, medium) | Stat numerals inside cards (e.g. "847", "94%") |
| `--font-size-h1` | 80px | Display | THE hero — every page hero, unified |

### Weight
| Token | Value | When to use |
| --- | --- | --- |
| `--font-weight-light` | 300 | "+" glyphs |
| `--font-weight-regular` | 400 | Body, hero display |
| `--font-weight-medium` | 500 | UI labels, buttons, stat numerals, active nav |
| `--font-weight-semibold` | 600 | Card titles, emphasis |

### Line height
| Token | Value | When to use |
| --- | --- | --- |
| `--line-height-hero` | 0.92 | Hero H1 only |
| `--line-height-tight` | 1.25 | Card titles, headings |
| `--line-height-base` | 1.4 | Body, UI default |

### Letter-spacing
| Token | Value | When to use |
| --- | --- | --- |
| `--letter-spacing-hero` | -0.0313em | Hero H1 |
| `--letter-spacing-eyebrow` | 0.14em | Uppercase eyebrows |

## Radius

| Token | Value | When to use |
| --- | --- | --- |
| `--radius-md` | 14px | Cards, tiles, search input |
| `--radius-pill` | 9999px | Pills, circles (avatars, bubbles, "+" glyph) |

## Elevation

| Token | Use |
| --- | --- |
| `--shadow-card` | Subtle drop. Used only when something genuinely floats. |

## Motion

| Token | Value | When to use |
| --- | --- | --- |
| `--duration-fast` | 120ms | Press feedback |
| `--duration-base` | 220ms | Hover lift, transitions |
| `--duration-screen` | 600ms | Page entrance |
| `--ease-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot pop-ins |

## Border widths

| Token | Value | Use |
| --- | --- | --- |
| `--border-width` | 1px | Default hairlines |
| `--border-width-strong` | 1.5px | "+" glyph, focused slots |

## Brand stroke

| Token | Value | Use |
| --- | --- | --- |
| `--stroke-accent` | 0.16em | The acid text-stroke width. Highlight only. |

## Photo style (liquid glass — the second brand element)

See `specs/foundations/photo-style.md` for the recipe. These tokens compose the 5-layer photo treatment.

| Token | Use |
| --- | --- |
| `--photo-tint` | Dark-blue glass overlay (`rgb(20 20 40 / 0.12)`) |
| `--photo-rim-shadow` | Composed box-shadow: inner white ring + insets + outer drops. The 3D bead rim. |
| `--photo-iris-gradient` | Conic rainbow gradient — the iridescent edge color |
| `--photo-spec-gradient` | Radial highlight gradient — top-left specular reflection |
| `--photo-depth-gradient` | Radial shadow gradient — bottom of the bead |
| `--photo-filter` | `url(#liquidGlass)` — the SVG distortion filter reference |
| `--photo-selected-ring` | `var(--color-accent)` — acid ring on selected photo |
| `--photo-hover-scale` | `1.06` — scale on hover |
| `--photo-press-scale` | `0.95` — scale on active/press |
| `--photo-transition` | The springy scale transition |

**Required setup**: the SVG `<filter id="liquidGlass">` must be defined once at the document root. See `specs/foundations/photo-style.md`.
