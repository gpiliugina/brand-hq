# Search Input

## 1. Metadata
- **Category**: molecule
- **Status**: stable
- **Related**: Pill (⌘K shortcut hint)

## 2. Overview

**When to use.** Primary search/command surface on the home dashboard ("Ask Archive…"). Also the role/login screen's name input. Hero-feeling, generously sized.

**When not to use.** For small panel filters, use a smaller text input (not yet specced).

## 3. Anatomy

```
┌─────────────────────────────────────────────────────┐
│  [✦]  Ask Archive — find any brand space, file...   │   ⌘K   │
└─────────────────────────────────────────────────────┘
   ^     ^                                              ^
   1     2                                              3

1. Optional leading glyph in a small dark rounded square
2. Placeholder / typed text
3. Optional keyboard shortcut hint
```

## 4. Tokens used

| Property | Token |
| --- | --- |
| Background | `--color-surface` |
| Border radius | `--radius-md` |
| Border | `--border-width` solid `--color-line` |
| Padding (vertical) | `--space-lg` |
| Padding (horizontal) | `--space-xl` |
| Gap | `--space-lg` |
| Font family | `--font-family-ui` |
| Font size | `--font-size-body-lg` (14px) |
| Text color | `--color-text` |
| Placeholder color | `--color-text-muted` |
| Transition | `--duration-fast` `--ease-smooth` |

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | — | Placeholder copy |
| `glyph` | `ReactNode` | — | Optional leading glyph |
| `shortcut` | `string` | — | Optional keyboard hint |
| `value` / `onChange` | standard | — | Controlled pattern |

## 6. States

### Default
White surface, hairline border, no shadow.

### Hover
No visible change.

### Focus
`outline: 2px solid var(--color-text); outline-offset: 2px;` on the wrapper. Never use the acid accent for focus.

### Disabled
`opacity: 0.5; pointer-events: none;`

### Invalid (login name field)
Text shifts to `--color-text-danger`; inline error message carries the rest of the signal.

## 7. Code example

```html
<label class="search">
  <span class="search__glyph" aria-hidden="true">✦</span>
  <input
    class="search__input"
    type="text"
    placeholder="Ask Archive — find any brand space, file or rule…"
    aria-label="Search Archive"
  />
  <kbd class="search__shortcut">⌘K</kbd>
</label>
```

```css
.search {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-lg) var(--space-xl);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-line);
  border-radius: var(--radius-md);
  transition: border-color var(--duration-fast) var(--ease-smooth);
}

.search__glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-fill-strong);
  color: var(--color-fill-strong-text);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  flex-shrink: 0;
}

.search__input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-family-ui);
  font-size: var(--font-size-body-lg);
  color: var(--color-text);
  outline: none;
}
.search__input::placeholder { color: var(--color-text-muted); }

.search__shortcut {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg);
  border-radius: var(--radius-md);
  font-family: var(--font-family-ui);
  font-size: var(--font-size-caption);
  color: var(--color-text-muted);
}

.search:focus-within {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}
```

## 8. Cross-references
- **Used by**: home dashboard hero, login name field
- **See also**: Button, Pill
