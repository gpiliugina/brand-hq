# Button

## 1. Metadata
- **Category**: atom
- **Status**: stable
- **Related**: Pill (same shape, different role)

## 2. Overview

**When to use.** Trigger an action — submit, advance, confirm, dismiss, destruct.

**When not to use.** For navigation (route, URL), use a link. For status, use Pill. For destructive actions, use the `danger` variant.

## 3. Anatomy

```
( [icon]  Label  [icon] )

Pill-shaped. Verb-first sentence-case labels.
```

## 4. Tokens used

| Property | Token |
| --- | --- |
| Background (primary) | `--color-fill-strong` |
| Text (primary, danger) | `--color-fill-strong-text` |
| Background (secondary) | `--color-surface` |
| Text (secondary, ghost) | `--color-text` |
| Border (secondary) | `--border-width` solid `--color-line` |
| Background (ghost) | transparent |
| Hover bg (secondary, ghost) | `--color-surface-faint` |
| Background (danger) | `--color-status-bad-bg` |
| Text (danger) | `--color-status-bad-fg` |
| Padding (vertical) | `--space-md` |
| Padding (horizontal) | `--space-xl` |
| Gap (icon ↔ label) | `--space-sm` |
| Border radius | `--radius-pill` |
| Font family | `--font-family-ui` |
| Font size | `--font-size-body` |
| Font weight | `--font-weight-medium` |
| Transition | `--duration-fast` `--ease-smooth` |
| Press transform | `scale(0.94)` |
| Focus ring | `--color-text` |

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual emphasis |
| `size` | `'sm' \| 'md'` | `'md'` | Two sizes only |
| `iconStart` | `ReactNode` | — | Leading icon |
| `iconEnd` | `ReactNode` | — | Trailing icon |
| `disabled` | `boolean` | `false` | Non-interactive |
| `loading` | `boolean` | `false` | Spinner replaces `iconStart`; disabled |

## 6. States

### Default
Pill-shaped. Primary: dark `--color-fill-strong` bg, white label. Secondary: white bg, dark label, hairline border. Ghost: transparent, dark label. Danger: soft rose.

### Hover
Secondary/ghost: bg shifts to `--color-surface-faint`. Primary/danger: subtle opacity shift.

### Active (pressed)
`transform: scale(0.94)`.

### Focus
`outline: 2px solid var(--color-text); outline-offset: 2px;` Never the acid accent.

### Disabled
`opacity: 0.5; pointer-events: none;`

### Loading
Spinner replaces `iconStart`; non-interactive; label unchanged.

## 7. Code example

```html
<button class="btn btn--secondary press-fx">Mark as complete</button>
<button class="btn btn--secondary press-fx">
  Next module
  <span aria-hidden="true">→</span>
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font-family-ui);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--duration-fast) var(--ease-smooth),
    opacity var(--duration-fast) var(--ease-smooth);
}

.btn--primary {
  background: var(--color-fill-strong);
  color: var(--color-fill-strong-text);
}

.btn--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: var(--border-width) solid var(--color-line);
}
.btn--secondary:hover { background: var(--color-surface-faint); }

.btn--ghost {
  background: transparent;
  color: var(--color-text);
}
.btn--ghost:hover { background: var(--color-surface-faint); }

.btn--danger {
  background: var(--color-status-bad-bg);
  color: var(--color-status-bad-fg);
}

.press-fx { transition: transform var(--duration-fast) ease; }
.press-fx:active { transform: scale(0.94); }

.btn:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}

.btn[disabled],
.btn[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
}
```

## 8. Cross-references
- **Uses**: Icon
- **Used by**: forms, onboarding flow, card actions
- **See also**: Pill (status), anchor `<a>` (navigation)
