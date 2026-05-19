# Avatar

## 1. Metadata
- **Category**: atom
- **Status**: stable
- **Related**: Pill (paired in top-bar)

## 2. Overview

**When to use.** Represent a user or brand space with a single initial inside a circular dark surface. Top-left (brand space) and top-right (current user).

**When not to use.** For real user photos, use a circular image element. For non-identity glyphs, use an icon component.

## 3. Anatomy

```
   ●
  ( A )    Dark gray circle, single uppercase initial in Inter medium.
   ●
```

## 4. Tokens used

| Property | Token |
| --- | --- |
| Background | `--color-fill-strong` (`#404040`) |
| Text color | `--color-fill-strong-text` (white) |
| Border radius | `--radius-pill` |
| Font family | `--font-family-ui` (Inter) |
| Font size | `--font-size-body-lg` (14px) |
| Font weight | `--font-weight-medium` |
| Diameter | 40px (component constant) |

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `string` | — | Single character. Required. |
| `as` | `'div' \| 'button' \| 'a'` | `'div'` | Interactive variants |

## 6. States

### Default
Dark gray circle, white Inter initial.

### Hover / focus (interactive only)
Cursor pointer; focus ring: `outline: 2px solid var(--color-text); outline-offset: 2px;`

### Disabled
N/A.

## 7. Code example

```html
<div class="avatar" aria-label="Current user: Dis">D</div>
```

```css
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-fill-strong);
  color: var(--color-fill-strong-text);
  border-radius: var(--radius-pill);
  font-family: var(--font-family-ui);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  user-select: none;
}
```

## 8. Cross-references
- **Used by**: app frame top-bar
- **See also**: Pill (sits next to avatar as tool-context indicator)
