# PhotoBubble

## 1. Metadata
- **Category**: molecule
- **Status**: stable
- **Related**: Bubble (flat-gray placeholder for when there IS no photo), Photo Style foundation

## 2. Overview

**When to use.** Any place a user photo, team photo, brand asset photo, or memory photo appears in the product. PhotoBubble applies the liquid-glass brand treatment to the photo — see `specs/foundations/photo-style.md` for why.

**When not to use.**
- No photo available → use `Bubble` (flat gray placeholder).
- Non-photo content (icons, glyphs, illustrations) → use the appropriate icon component, not this.
- Square or rectangular photo treatments → not specced. Propose a spec before building.

## 3. Anatomy

```
       ●●●  ← spec layer (top-left highlight)
      ╱   ╲
     │ img │ ← image clipped to circle
      ╲   ╱
       ●●●  ← depth layer (bottom shadow)

     +rim box-shadow (white ring + insets + drop)
     +iris layer (conic rainbow, screen blend)
     +glass tint (uniform dark-blue overlay)
     +SVG liquidGlass filter (subtle warp)

     when selected:
     +acid ring (3px var(--color-accent))
     +✓ badge top-right
```

## 4. Tokens used

| Property | Token |
| --- | --- |
| Border radius | `--radius-pill` |
| Box shadow (rim) | `--photo-rim-shadow` |
| Glass tint background | `--photo-tint` |
| Iris background | `--photo-iris-gradient` |
| Spec background | `--photo-spec-gradient` |
| Depth background | `--photo-depth-gradient` |
| Filter | `--photo-filter` |
| Selected ring color | `--photo-selected-ring` (= `--color-accent`) |
| Hover transform | `scale(var(--photo-hover-scale))` |
| Press transform | `scale(var(--photo-press-scale))` |
| Transition | `--photo-transition` |
| Selected badge bg | `--color-accent` |
| Selected badge text | `--color-text` |
| Selected badge border | `--color-surface` |

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Image URL. Required. |
| `alt` | `string` | — | Alt text. Required for non-decorative photos. |
| `size` | `number` | `60` | Diameter in px |
| `selected` | `boolean` | `false` | Shows acid ring + ✓ badge |
| `onClick` | `() => void` | — | Interactive variant |
| `loading` | `'eager' \| 'lazy'` | `'lazy'` | Image loading hint |

## 6. States

### Default
Circular photo with full 5-layer treatment, default rim shadow.

### Hover (when `onClick` provided)
`transform: scale(1.06)` via `--photo-hover-scale`, spring easing.

### Active (pressed)
`transform: scale(0.95)` via `--photo-press-scale`.

### Selected
- 3px outer ring in `--color-accent` (achieved by extending the box-shadow stack with `0 0 0 3px var(--color-accent)` and a stronger outer drop `0 8px 32px rgba(0,0,0,0.22)`).
- ✓ badge appears top-right, 22px circle, acid background, dark text, white border. Sits in the unclipped outer wrapper so it's never cut by the circle's overflow.

### Image error
If `<img>` fails to load (`onError`), hide the img and apply a fallback background to the parent — a sphere gradient using one of the muted sphere palette colors (or a flat `--color-bubble`). The treatment layers above stay; only the image disappears.

### Loading
While the image is loading, the underlying container shows `--color-bubble` (flat gray). When the image arrives, it slots in behind the treatment layers.

## 7. Code example

```tsx
type PhotoBubbleProps = {
  src: string;
  alt: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
};

export function PhotoBubble({ src, alt, size = 60, selected, onClick }: PhotoBubbleProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div
        className="photo-bubble"
        style={{
          width: "100%",
          height: "100%",
          // selected variant adds the acid ring on top of the base rim shadow
          ...(selected && {
            boxShadow: `var(--photo-rim-shadow), 0 0 0 3px var(--color-accent), 0 8px 32px rgba(0,0,0,0.22)`,
          }),
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            borderRadius: "50%",
            pointerEvents: "none",
            filter: "var(--photo-filter)",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            // optional fallback: flat color on the parent
            (e.currentTarget.parentElement as HTMLElement).style.background = "var(--color-bubble)";
          }}
        />
        <div className="photo-bubble-glass" />
        <div className="photo-bubble-iris" />
        <div className="photo-bubble-depth" />
        <div className="photo-bubble-spec" />
      </div>

      {selected && (
        <div style={{
          position: "absolute",
          top: -3, right: -3,
          width: 22, height: 22,
          borderRadius: "var(--radius-pill)",
          background: "var(--color-accent)",
          color: "var(--color-text)",
          fontSize: 12, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `2px solid var(--color-surface)`,
          zIndex: 10,
          pointerEvents: "none",
        }}>✓</div>
      )}
    </div>
  );
}
```

```css
.photo-bubble {
  border-radius: var(--radius-pill);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: var(--photo-transition);
  box-shadow: var(--photo-rim-shadow);
}
.photo-bubble:hover  { transform: scale(var(--photo-hover-scale)); }
.photo-bubble:active { transform: scale(var(--photo-press-scale)); }

.photo-bubble-spec {
  position: absolute;
  top: 5%; left: 8%;
  width: 44%; height: 38%;
  background: var(--photo-spec-gradient);
  border-radius: var(--radius-pill);
  pointer-events: none;
  z-index: 4;
  transform: rotate(-15deg);
}

.photo-bubble-iris {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-pill);
  pointer-events: none;
  z-index: 3;
  background: var(--photo-iris-gradient);
  mix-blend-mode: screen;
}

.photo-bubble-depth {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 50%;
  background: var(--photo-depth-gradient);
  border-radius: 0 0 var(--radius-pill) var(--radius-pill);
  pointer-events: none;
  z-index: 3;
}

.photo-bubble-glass {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-pill);
  background: var(--photo-tint);
  pointer-events: none;
  z-index: 2;
}
```

## 8. Cross-references
- **Required setup**: the SVG `<filter id="liquidGlass">` must be defined once at the document root. See `specs/foundations/photo-style.md`.
- **Used by**: team photo grids, brand asset thumbnails, memory wall, photo picker
- **See also**: `Bubble` (flat-gray placeholder), `Highlight` (the other brand element)

## Anti-examples

- ✗ Flat circular avatar in the same UI as PhotoBubbles — visual rule violation
- ✗ PhotoBubble without the iris layer "to make it cleaner" — that's the brand element you'd be removing
- ✗ Selected ring in a color other than acid — accent is the selection signal
- ✗ PhotoBubble in a square shape — not specced; propose a new spec or use a different component
- ✗ 200+ PhotoBubbles on a single page without virtualization or deferred rendering — perf will tank
