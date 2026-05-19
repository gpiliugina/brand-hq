# Spacing

## Overview

4px base grid. Nine semantic steps named by t-shirt size. Density is moderate: widget grids gap at 20px, hero margins at 40px, card content at 24px.

## Tokens

| Token | Value | Typical use |
| --- | --- | --- |
| `--space-xs` | 4px | Icon-to-text gap |
| `--space-sm` | 8px | Tight inline |
| `--space-md` | 12px | Pill padding, small gaps |
| `--space-lg` | 16px | Input padding, default component step |
| `--space-xl` | 20px | Widget grid gap |
| `--space-2xl` | 24px | Card content gap |
| `--space-3xl` | 32px | Section gap |
| `--space-4xl` | 40px | Hero bottom margin |
| `--space-5xl` | 64px | Page-level rhythm |

## Usage rules

- Inside a component: `--space-xs` through `--space-lg`.
- Between components: `--space-xl` through `--space-3xl`.
- Page-level: `--space-4xl` or `--space-5xl`.
- Don't combine tokens additively — propose a new step instead.
- Widget grid specifically uses `gap: var(--space-xl)` (20px). Don't tighten or loosen without revisiting system rhythm.

## Examples

Widget grid:
```css
.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-xl);
}
```

Card inner stack:
```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  padding: var(--space-lg);
}
```

Hero margin:
```css
.hero { margin-bottom: var(--space-4xl); }
```
