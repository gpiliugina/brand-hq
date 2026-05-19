# Pill

## 1. Metadata
- **Category**: atom
- **Status**: stable
- **Related**: Avatar, Button (don't confuse — pills are status, buttons are action)

## 2. Overview

**When to use.** Small capsule-shaped label communicating state or context — "No tools open," "Onboarding ×," "SOON." Quiet status markers, not actions.

**When not to use.** For primary actions, use Button. For decorative text without state meaning, use plain text.

## 3. Anatomy

```
( Onboarding × )
   ^        ^
   1        2

1. Label — Inter medium
2. Optional dismiss "×" — only when closeable
```

## 4. Tokens used

| Property | Token |
| --- | --- |
| Background | `--color-surface` (white) |
| Text color | `--color-text` |
| Border radius | `--radius-pill` |
| Padding (vertical) | `--space-md` |
| Padding (horizontal) | `--space-lg` |
| Gap (label ↔ ×) | `--space-sm` |
| Font family | `--font-family-ui` |
| Font size | `--font-size-body` (13px) |
| Font weight | `--font-weight-medium` |
| Line height | `--line-height-tight` |

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | Text |
| `dismissible` | `boolean` | `false` | Shows trailing × |
| `onDismiss` | `() => void` | — | Called when × clicked |

## 6. States

### Default
White surface, dark text, fully rounded.

### Hover (dismissible only)
Cursor pointer on the × area.

### Focus (dismissible ×)
`outline: 2px solid var(--color-text); outline-offset: 2px;`

### Disabled
`opacity: 0.5; pointer-events: none;`

## 7. Code example

```html
<span class="pill">
  <span class="pill__label">Onboarding</span>
  <button class="pill__dismiss" aria-label="Close">×</button>
</span>
```

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-pill);
  font-family: var(--font-family-ui);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  white-space: nowrap;
}

.pill__dismiss {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: inherit;
  line-height: 1;
}
.pill__dismiss:hover { color: var(--color-text); }
.pill__dismiss:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
  border-radius: var(--radius-pill);
}
```

## 8. Cross-references
- **Used by**: top-bar tool indicator, card status corners
- **See also**: Button (action), Highlight (brand stroke — different role)
