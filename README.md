# Objektify – Custom Photocard Maker

Create custom photocards with borders, text, logos, QR codes, and full front/back control.
Made for Objekt cards and similar formats.

---

## Overview

| Area       | What You Can Do              |
| ---------- | ---------------------------- |
| Front Side | Image, border, text, logos   |
| Back Side  | Signature, logos, QR         |
| Bulk Mode  | Generate many cards at once  |
| Export     | 300 DPI print-ready PNG      |
|            |                              |
| History    | Undo, redo, restore sessions |
| Presets    | Save and share templates     |
| Collection | Binder of saved full designs |

---

## Key Features

**Bulk Create** — Upload multiple images at once via drag and drop. A shared template row controls global settings across all cards. Fine-tune individual cards by clicking into the canvas editor. Copy text to all cards in one click. Exports a ZIP of front and back PNGs for every card, with a progress bar and mobile share sheet support.

**Overflow / Bleed** — Add a configurable bleed area (0.5%–30%, default 2%) around the card for cutting guides. Works on both front and back. The canvas expands with a gray bleed background so print margins are clearly visible.

**History** — Full undo/redo with up to 50 states. Keyboard shortcuts (`Ctrl+Z` / `Ctrl+Y`). Clickable history panel to jump to any past state. Your session is restored automatically on reload.

**Collection** — Save complete designs (images + settings) to your browser. Works like a binder — browse thumbnails, load any card to resume editing. Stored in IndexedDB, no upload needed.

**Presets** — Save your layout and styling as a named preset (up to 20). Generate a shareable code and paste it into any browser to load the exact same settings instantly, without tweaking everything again from scratch.

**Card Sizes** — Choose from built-in size presets (Objekt, Standard Photocard, Credit Card, Instax Mini) or enter a custom size in millimeters. All sizes auto-convert to 300 DPI pixels for print-ready output.

# Front Side

## Image

| Feature  | Details             |
| -------- | ------------------- |
| Upload   | JPG / PNG (max 5MB) |
| Controls | Zoom + Pan          |
| Preview  | Real-time canvas    |

## Border

| Option        | Details            |
| ------------- | ------------------ |
| Objekt Border | Toggle on/off      |
| Preset Colors | Category selection |
| Custom Color  | Hex input          |
| Custom Border | Upload image       |

## Text

| Position | Customizable |
| -------- | ------------ |
| Top      | Artist name  |
| Middle   | Card number  |
| Bottom   | Extra info   |

Extra:

- Font style, size, color
- Text positioning
- Use `#12345` in middle text for monospace serial format

## Logo (Front)

| Control  | Available |
| -------- | --------- |
| Upload   | Yes       |
| Zoom     | Yes       |
| Position | Yes       |
| Rotate   | Yes       |

---

# Back Side

## Signature

| Feature         | Available |
| --------------- | --------- |
| Upload          | Yes       |
| Zoom & Position | Yes       |
| Dedicated Modal | Yes       |

## Logos

| Location         | Controls               |
| ---------------- | ---------------------- |
| Top              | Zoom, Position, Rotate |
| Bottom Text Area | Zoom, Position, Rotate |

## QR Code

| Feature       | Details      |
| ------------- | ------------ |
| Auto Generate | Yes          |
| Custom QR     | Supported    |
| Position      | Bottom Right |

---

# Overflow (Bleed Area)

| Feature  | Details       |
| -------- | ------------- |
| Toggle   | On / Off      |
| Size     | 0.5% – 30%   |
| Default  | 2%            |
| Works On | Front + Back  |
| Purpose  | Cutting guide |

Canvas expands with gray bleed background.

---

# Bulk Create

| Feature          | Details                        |
| ---------------- | ------------------------------ |
| Multi Upload     | Drag & Drop                    |
| Shared Template  | Row 1 controls global settings |
| Per Card Editing | Text + Image Zoom              |
| Edit On Canvas   | Click row to fine tune         |
| Copy to All      | One-click text sync            |
| Export           | ZIP (Front + Back PNGs)        |
| Mobile Export    | System share sheet             |
| Progress Bar     | Yes                            |

---

# Card Sizes

## Presets

| Type               | Size         |
| ------------------ | ------------ |
| Objekt Default     | 65 × 100 mm |
| Standard Photocard | 54 × 86 mm  |
| Credit Card        | 55 × 85 mm  |
| Instax Mini        | 57 × 89 mm  |

## Custom Size

- Input millimeters
- Auto convert to pixels at 300 DPI

---

# Export

| Feature    | Details   |
| ---------- | --------- |
| Resolution | 300 DPI   |
| Download   | Front PNG |
| Download   | Back PNG  |

Print-ready quality.

---

# Undo / Redo

| Feature       | Limit           |
| ------------- | --------------- |
| Saved States  | 50              |
| History Panel | Last 15 states  |
| Shortcuts     | Ctrl+Z / Ctrl+Y |
| Auto Restore  | On reload       |

---

# Presets & Saved Cards

## Presets (Settings Only)

| Item          | Details          |
| ------------- | ---------------- |
| Limit         | 20               |
| Saves         | Layout + styling |
| Does Not Save | Images           |

---

## Saved Cards (Full Design)

| Item     | Details             |
| -------- | ------------------- |
| Limit    | 100                 |
| Storage  | Browser (IndexedDB) |
| Includes | Images + settings   |
| Preview  | Thumbnail view      |

# Interface

| Feature            | Details          |
| ------------------ | ---------------- |
| Responsive         | Desktop + Mobile |
| View Toggle        | Front / Back     |
| Collapsible Panels | Yes              |
| Real-time Preview  | Yes              |
| Mobile Sliders     | Touch optimized  |

---

Simple. Fast. Print-ready.

---

## Legal Disclaimer

**Notice regarding Trademarks and Affiliation:**

This project is an independent, open-source fan project created for non-commercial, educational, and creative purposes only.

**No Affiliation:** This project is not affiliated with, authorized, maintained, sponsored, or endorsed by MODHAUS, COSMO, or any of their affiliates or subsidiaries.

**Trademarks:** The term "Objekt" and any associated logos, group names (e.g., tripleS, ARTMS), or brand assets are the registered trademarks and intellectual property of MODHAUS. The use of these terms in this project is for descriptive and identification purposes only under "nominative fair use."

**Non-Commercial Use:** This tool is provided for free. The developer does not generate revenue, sell "Objekts," or provide any blockchain-related "minting" services associated with official MODHAUS products.

**Assumption of Risk:** This software is provided "as is" without warranty of any kind. Users are responsible for ensuring their use of the tool complies with local laws and the official Terms of Service of the respective IP holders.
 
 ## Offline Release

 - Download the release ZIP from the project's GitHub Releases page.
 - The ZIP root includes `index.html` plus the folders `fonts/`, `assets/`, `css/`, and `js/` so the app runs offline with no setup.
 - To add custom fonts: create per-font folders inside the top-level `fonts/` directory (example: `fonts/MatrixSSK Regular/MatrixSSK Regular.ttf`). The app will try to load fonts from `fonts/` first, then fall back to `assets/fonts/`.
 - Do not add or distribute copyrighted fonts unless you have the right to do so.
 - To run: open `index.html` in a modern browser (no server required). Some browsers restrict loading local fonts via file://; in that case open the file with a simple local server, e.g. `python -m http.server`.

