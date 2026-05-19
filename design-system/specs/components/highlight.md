# Highlight (brand stroke)

## 1. Metadata
- **Category**: atom
- **Status**: stable
- **Related**: Hero H1

## 2. Overview

**The brand element.** A thick acid-yellow text stroke applied to a single word inside the hero display-serif H1. The stroke renders *behind* the letterforms (`paint-order: stroke fill`).

**When to use.** Around one emphasised word inside the hero H1 — usually the user's name or a key noun. One per headline. Examples: "Welcome, **gala**.", "The **Brand**, 2026."

**When not to use.** Anywhere outside the hero. Not in card titles. Not in body. Not on buttons. Not as a focus ring. Not on Inter words — the stroke only reads correctly on the heavy curved Caslon forms. Using it elsewhere destroys the signature.

## 3. Anatomy

```
   gala
  ╱╲╱╲   ← 0.16em acid stroke painted BEHIND the letters
```

A `<span>` with a text stroke. No children, no SVG.

## 4. Tokens used

| Property | Token |
| --- | --- |
| Stroke color | `--color-accent` |
| Stroke width | `--stroke-accent` (0.16em) |
| Stroke join | `round` (literal) |
| Paint order | `stroke fill` (literal) |
| Inherits | font family, size, weight, color from parent H1 |

The stroke width is `em`-relative, so it scales with the headline size automatically.

## 5. Props / API

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | The word(s) to highlight. Usually one word. |

That's the entire API. No variants — that would erode the signature.

## 6. States

None. The highlight is static.

## 7. Code example

React:
```jsx
function Highlight({ children }) {
  return (
    <span style={{
      WebkitTextStroke: "var(--stroke-accent) var(--color-accent)",
      paintOrder: "stroke fill",
      WebkitTextStrokeLinejoin: "round",
      display: "inline",
    }}>{children}</span>
  );
}
```

Inside an H1:
```jsx
<h1 style={{
  fontFamily: "var(--font-family-display)",
  fontSize: "var(--font-size-h1)",
  fontWeight: "var(--font-weight-regular)",
  color: "var(--color-text)",
  letterSpacing: "var(--letter-spacing-hero)",
  lineHeight: "var(--line-height-hero)",
  margin: 0,
}}>
  Welcome, <Highlight>{userName || "there"}</Highlight>.
</h1>
```

Plain CSS:
```css
.highlight {
  -webkit-text-stroke: var(--stroke-accent) var(--color-accent);
  text-stroke: var(--stroke-accent) var(--color-accent);
  paint-order: stroke fill;
  -webkit-text-stroke-linejoin: round;
  display: inline;
}
```

## 8. Cross-references
- **Used by**: every page's hero H1
- **See also**: Typography foundation for the surrounding hero styling

## Anti-examples

- ✗ Two highlighted words per headline — turns the hero into a marker session
- ✗ Highlighting body text — stroke calibrated for display sizes; looks like a bug at 13px
- ✗ Highlighting an Inter word — only reads correctly on Caslon
- ✗ Using a different accent shade — there is exactly one `--color-accent`
- ✗ Filled acid behind the word instead of stroke — different visual treatment, not this component
