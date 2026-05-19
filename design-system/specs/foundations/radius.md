# Radius

## Overview

Two values: `--radius-md` (14px) and `--radius-pill` (fully rounded). Every rounded element in the product is one of the two.

The 14 isn't on a "clean" scale of 4/8/16 — it's what the source uses, and the rhythm depends on consistency. Don't substitute 12 or 16.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--radius-md` | 14px | Cards, tiles, search input |
| `--radius-pill` | 9999px | Pills, full circles (avatars, bubbles, "+" glyph) |

## Usage rules

- Card uses `--radius-md`. Pill inside uses `--radius-pill`. The contrast is a feature.
- Bubbles are fully round (`--radius-pill`).
- Avatars are fully round (`--radius-pill`).
- No middle radii. If you want 24px, push back to `--radius-md` or `--radius-pill`.

## Do / Don't

✓ `border-radius: var(--radius-md);` on a card.
✗ `border-radius: 10px;` — invents a new radius.

✓ `border-radius: var(--radius-pill);` for an avatar circle.
✗ `border-radius: 50%;` — works but skips the token.
