# Brand HQ — "Archive"

## What this project is

A high-fidelity **interactive prototype** for "Archive" — a brand-management / digital-asset-management (DAM) platform. It is not a production app; it is a clickable wireframe used to design and validate the product's screens, flows, and visual language.

## Architecture

### The prototype: `archive-wireframe.html`

- **One file, no build step.** React 18 + ReactDOM + Babel Standalone loaded from the unpkg CDN. All JSX lives in a single `<script type="text/babel">`. All CSS lives in one inline `<style>` block with `:root` custom properties for design tokens.
- **Routing** is a screen state machine in `App()`. `const [screen, setScreen]` + `go(screenKey)` navigates, scrolls to top, and tracks open tool tabs. No router library, no URL routing.
- **Screens** (each a top-level `function ScreenX({ go })`):
  - `role` — first-login role selection (`ScreenRole`), the default initial screen
  - `home` — sidebar-less radial widget picker (`ScreenHome`)
  - `library` — Brand Library (`ScreenLibrary`)
  - `files` / `photo` — Team Photos grid + Photo Detail (`ScreenFiles`, `ScreenPhoto`)
  - `creator` — Brand Checker (`ScreenCreator`)
  - `signature` — Email Signature (`ScreenSignature`)
  - `social` — Social Post Constructor (`ScreenSocial`)
  - `onboarding` — `ScreenOnboarding`
  - `memory` — Photo Archive / Constellation Timeline (`ScreenMemory`)
- **Data constants:** `TOOLS` (tool/tab catalogue, ~line 492), `WIDGET_CATALOGUE` (home widgets, ~line 3945).
- **Persistence:** browser `localStorage` only — keys `archive-home-widgets` (home layout) and `archive-role`. No backend.
- **Shared context:** `AppContext` provides `role`, `changeRole`, `resetOnboarding`, `openTabs`, `closeTab`, `userName`, `theme`, `toggleTheme`.

## Non-obvious rules & gotchas

1. **The app is light-only. Do not reintroduce dark mode.** `theme` is hardcoded to `"light"` and `toggleTheme()` is an intentional no-op.
2. **The brand signature is restraint — two elements only.** (a) One acid-stroked word inside the display-serif hero H1 (`-webkit-text-stroke: 0.16em var(--color-accent)` + `paint-order: stroke fill`); (b) the liquid-glass PhotoBubble treatment for real photos. The accent `#E8FE67` is used **nowhere else**.
3. **Type discipline:** Libre Caslon Display serif is for the hero H1 *only*. Everything else is Inter. Body default is 13px. One hero size: 80px.
4. **One background** (`#ECEDEF` with the dotted radial pattern), **one dark** (`#404040` — never pure black).
5. **Photos vs placeholders:** real photos render through `PhotoBubble` (5-layer liquid-glass + the document-level SVG filter `#liquidGlass`). Missing photos use a flat gray `Bubble`. Never a raw `<img>` clipped to a circle.
6. **No spec = stop and propose one.** Modals, toasts, dropdowns, sidebar nav, tables, widget picker have no spec yet. Don't freelance them; propose the design first.
7. `.claude/worktrees/` may contain leftover isolated-agent worktrees — old snapshot copies of the repo, not the working tree. Don't edit files there.

## Run / preview

```bash
node .claude/serve.js          # static server on http://localhost:4178
```

No build, test, or lint step — it is a static prototype.

## File structure

```
archive-wireframe.html      # THE prototype (single-file React app)
.claude/
  serve.js                  # tiny Node static server, port 4178
  launch.json               # "spheres" launch config
  worktrees/                # leftover isolated-agent worktrees (not the live tree)
color/ elements/ typo/ timeline/   # design-reference imagery
```

## Working agreement

- Keep the prototype self-contained and build-free (CDN React + Babel, single file). Don't introduce a bundler or split it up unless asked.
- No hex codes or raw px values in new code — use the `:root` custom properties already defined in the inline `<style>`.
- Write real, descriptive commit messages.
