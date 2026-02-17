# Photocard Maker — Roadmap

This document outlines the planned features for evolving the photocard maker from an objekt-only tool into a full-featured photocard maker.

Each phase builds on the previous one and leaves the app in a working, shippable state.

---

## Phase 1: Toggleable Objekt Border

**Status:** Done

Make the objekt-style accent bar and rotated text toggleable (on by default). When toggled off, the card renders as a clean photocard without the accent bar, and the back side is disabled (since the back side layout is objekt-specific).

**What changes:**

- New toggle switch at the top of the controls panel
- When off: image fills the full card, no accent bar or rotated text
- When off: back side view and controls are hidden
- Export filename changes to `photocard.png` when border is off

---

## Phase 2: Card Size / Resize for Printing

**Status:** Done

Allow resizing the photocard for printing. The default size (768x1186px) stays as-is, but users can select common physical sizes or enter custom dimensions.

**Preset sizes (at 300 DPI):**

| Name               | Dimensions (mm) | Dimensions (px) |
| ------------------ | --------------- | --------------- |
| Objekt Default     | ~65x100         | 768x1186        |
| Standard Photocard | 54x86           | 638x1016        |
| Credit Card        | 55x85           | 650x1004        |
| Instax Mini        | 57x89           | 673x1051        |
| Custom             | user input      | calculated      |

**What changes:**

- New "Card Size" section with dropdown and custom input
- Canvas preview visually changes aspect ratio to match selected size
- All rendering (accent bar, text, back side) scales proportionally
- Export produces the correct resolution for the selected size

---

## Phase 3: Reference Template Overlay

**Status:** Done

Load a "model template" image as a reference overlay for alignment. Users can toggle it on/off and adjust opacity to line up their design against the ideal template shape.

**What changes:**

- New "Reference Template" section with upload, toggle, and opacity slider
- Template renders on top of everything as a semi-transparent overlay
- Template is NOT included in exported images
- Front side only (not applied to back side)

---

## Phase 4: Save Presets to LocalStorage

**Status:** Done

Save the full project state (all slider values, text, colors, sizes, etc.) to localStorage. Users can save multiple named presets and load them back.

**What's saved:**

- Canvas dimensions and card size preset
- Objekt border on/off
- Image transform (zoom, pan)
- Border color
- All text fields and colors
- Logo/signature transforms (zoom, position, rotation)
- Back side labels and values
- QR code link
- Template overlay settings

**What's NOT saved:** Uploaded images, logos, signatures, and templates (users must re-upload after loading a preset).

**What changes:**

- New "Presets" section at top of controls panel
- Save button (prompts for preset name)
- List of saved presets with load/delete actions
- Up to 20 presets stored in localStorage

---

## Phase 5: Template Share Codes

**Status:** Done

Encode preset values into a shareable URL. When someone opens the link, the template auto-loads. Only non-image values are included (layout, text, colors, sizes).

**What changes:**

- "Share Template" button that copies a URL to clipboard
- "Import Share Code" input for pasting codes from others
- URL parameter `?preset=<code>` auto-loads on page open
- Share codes are compact base64url-encoded strings (~500-1000 chars)

**Limitations:**

- Images cannot be shared (frontend-only, no server)
- Share codes include layout settings only
- Users must upload their own images after loading a shared template

---

## Technical Notes

- The app is **frontend-only** — pure HTML, CSS, and vanilla JavaScript, no build tools
- Main modules: `CanvasManager` (canvas.js), `UIManager` (ui.js), `BorderManager` (borders.js), `App` (main.js)
- Phase 4 introduces a new file: `js/presets.js` containing `PresetManager` and `ShareCodeManager`
- All rendering goes through `CanvasManager.render()` (front) and `CanvasManager.renderBackSide()` (back)
- Desktop and mobile UIs are synced — changes to controls must update both versions
