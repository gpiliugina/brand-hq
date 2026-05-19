# Card

## 1. Metadata
- **Category**: molecule
- **Status**: stable
- **Related**: Pill (status corners), Bubble (placeholder content), Avatar

## 2. Overview

**When to use.** Group a single tool, workspace, or widget into a self-contained surface on the dashboard. Each card is one "place to go." The dashboard grid is `repeat(auto-fill, minmax(300px, 1fr))` with `gap: 20px`.

**When not to use.** For dense lists, use a table. For inline blocks inside long-form content, use plain prose.

## 3. Anatomy

```
┌──────────────────────────────────┐
│  Title                  [pill]   │  1 / 2 (optional)
│                                  │
│        [media / preview]         │  3 (photos or bubbles)
│                                  │
│  847              Caption        │  4 (optional: stat + caption)
│  ASSETS                          │
└──────────────────────────────────┘
```

1. **Title** — Inter semibold at 18px.
2. **Status pill** (optional) — top-right.
3. **Media region** (optional) — real photos when available, flat gray bubbles when not.
4. **Stat + caption** (optional) — Inter medium 28px for the numeral; Inter regular caption underneath, eyebrow above.

## 4. Tokens used

| Property | Token |
| --- | --- |
| Background | `--color-surface` |
| Padding | `--space-lg` (16px) |
| Border radius | `--radius-md` (14px) |
| Border | `--border-width` solid `--color-line` |
| Inner gap | `--space-2xl` (24px) |
| Title font family | `--font-family-ui` (Inter) |
| Title size | `--font-size-card-title` (18px) |
| Title weight | `--font-weight-semibold` |
| Title color | `--color-text` |
| Stat numeral size | `--font-size-stat` (28px) |
| Stat numeral weight | `--font-weight-medium` |
| Stat numeral family | `--font-family-ui` (Inter) |
| Caption family | `--font-family-ui` |
| Caption size | `--font-size-caption` |
| Caption color | `--color-text-muted` |
| Transition | `--duration-base` `--ease-smooth` |
| Hover transform | `translateY(-3px)` |

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Card heading (Inter semibold) |
| `pill` | `ReactNode` | — | Optional status pill, top-right |
| `media` | `ReactNode` | — | Optional preview region (photos or bubbles) |
| `stat` | `string \| number` | — | Optional large numeral |
| `caption` | `string` | — | Optional caption under the stat |
| `interactive` | `boolean` | `true` | Clickable card |
| `placeholder` | `boolean` | `false` | Dashed empty state ("Add widget") |

## 6. States

### Default
White surface, hairline `--color-line` border, no shadow.

### Hover (interactive)
`transform: translateY(-3px)`. No background or shadow change — the lift alone is the affordance.

### Focus
`outline: 2px solid var(--color-text); outline-offset: 2px;`

### Active (pressed)
`transform: scale(0.94)` for tactile feedback.

### Placeholder (empty state)
Transparent background, dashed `--color-border`, muted text. On hover: border → `--color-text`, background → `--color-surface-faint`.

## 7. Code example

```html
<article class="card lift-hover" tabindex="0">
  <header class="card__header">
    <h2 class="card__title">Brand Pulse</h2>
    <span class="pill">SOON</span>
  </header>
  <div class="card__media">
    <!-- real photos or <Bubble /> placeholders -->
  </div>
  <div class="card__footer">
    <div class="stat">847</div>
    <div class="card__caption">Assets · v3.2</div>
  </div>
</article>
```

```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  padding: var(--space-lg);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-line);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    transform var(--duration-base) var(--ease-smooth);
}
.card:hover { transform: translateY(-3px); }
.card:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}

.card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-lg);
}

.card__title {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-card-title);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  margin: 0;
}

.stat {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-stat);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--color-text);
}

.card__caption {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-caption);
  color: var(--color-text-muted);
  margin: 0;
}

.card--placeholder {
  background: transparent;
  border-style: dashed;
  border-color: var(--color-border);
  color: var(--color-text-muted);
}
.card--placeholder:hover {
  border-color: var(--color-text);
  background: var(--color-surface-faint);
  color: var(--color-text);
}
```

## 8. Cross-references
- **Uses**: Pill (status), Bubble (placeholder media)
- **Used by**: dashboard widget grid, tool selector
- **See also**: List item (dense tabular — not specced)
