# Bubble

## 1. Metadata
- **Category**: atom
- **Status**: stable
- **Related**: Card (cards contain bubbles in their media region when no real photo is available)

## 2. Overview

**When to use.** A flat gray circular placeholder used wherever a real photo or brand asset **isn't yet available** — empty preview slots, loading states for asset thumbnails, decorative-but-empty media regions.

**When NOT to use — important.** When a real photo IS available, use `PhotoBubble` (the liquid-glass photo treatment), not Bubble. These are deliberately opposite components: Bubble means "no content yet," PhotoBubble means "content rendered through the brand photo style." Don't substitute one for the other.

## 3. Anatomy

```
   ●     ●●    ●●●
         ●     ●

A bubble. Or a small cluster (2–4) for media regions that benefit from
a content-suggesting placeholder.
```

A perfect circle in flat `--color-bubble`. No gradient, no inner shadow, no shine, no highlight. The visual flatness is the point.

## 4. Tokens used

| Property | Token |
| --- | --- |
| Background | `--color-bubble` (`#E8E8E8`) |
| Border radius | `--radius-pill` |
| Diameter | Component constant — typically 40–80px depending on context. Pass a `size` prop. |

No shadow, no border, no inner highlight. If you reach for any of these, you've recreated the sphere subsystem the bubble replaced.

## 5. Props / API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `60` | Diameter in px |

That's it. Bubbles aren't configurable beyond size — extending them with colors or shadows defeats the purpose.

## 6. States

None. Bubbles are static placeholders. If you need a loading state with motion, use a skeleton component (not yet specced).

## 7. Code example

Single bubble:
```html
<div class="bubble" style="--size: 60px;" aria-hidden="true"></div>
```

```css
.bubble {
  width: var(--size, 60px);
  height: var(--size, 60px);
  background: var(--color-bubble);
  border-radius: var(--radius-pill);
}
```

React component:
```tsx
export function Bubble({ size = 60 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: "var(--color-bubble)",
        borderRadius: "var(--radius-pill)",
      }}
    />
  );
}
```

Cluster usage inside a card media region:
```tsx
<div className="card__media" aria-hidden="true">
  <Bubble size={56} />
  <Bubble size={40} />
  <Bubble size={48} />
</div>
```

```css
.card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  min-height: 120px;
  background: var(--color-surface-faint);
  border-radius: var(--radius-md);
}
```

## 8. Cross-references
- **Used by**: Card (placeholder media region), empty-state illustrations
- **See also**: real photo content (preferred when available), skeleton patterns (for active loading states — not yet specced)

## Anti-examples

- ✗ Bubble with `inset` shadow to make it look 3D — that's the sphere subsystem you removed
- ✗ Bubble in a brand-palette color (lavender, sage) — bubbles are flat gray, always
- ✗ Bubble with a gradient — flat means flat
- ✗ Bubble + border — the contrast with the surface is enough
- ✗ Bubble as a button — interactive circles are avatars or icon-buttons, not bubbles
