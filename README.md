# Photocard Maker

A specialized web application for creating custom photocards with a yellow accent bar design, perfect for K-pop fans, collectors, and anyone who wants to create professional-looking photocards!

![Photocard Maker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Features

- **Image Upload**: Drag & drop or click to upload JPG/PNG images (max 5MB)
- **Fixed Canvas Size**: 768×1186 px (2:3 aspect ratio) - standard photocard dimensions
- **Rounded Corners**: 36px radius on all edges for a polished look
- **Yellow Accent Bar**: 135px wide vertical strip on the right side (#FFD400)
- **Rotated Text Labels**:
  - Top text (default: "SeoYeon") - rotated 90° counterclockwise
  - Bottom text (default: "tripleS") - rotated 90° clockwise
  - Bold sans-serif font in black (#000000)
- **Image Adjustments**:
  - Zoom control (50% - 200%)
  - Pan X/Y controls (-300 to +300 pixels)
- **Editable Text**: Customize both text fields to personalize your photocards
- **PNG Export**: Download your creation as high-quality PNG (768×1186 px)
- **Client-Side Only**: All processing happens in your browser - no server required
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Option 1: Open Locally

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/photocard-maker.git
   cd photocard-maker
   ```

2. **Open in browser**
   - Simply double-click `index.html`, or
   - Use a local server (recommended):
     ```bash
     # Python 3
     python -m http.server 8000

     # Python 2
     python -m SimpleHTTPServer 8000

     # Node.js (with npx)
     npx serve

     # PHP
     php -S localhost:8000
     ```

3. **Visit** `http://localhost:8000` in your browser

### Option 2: Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click Save

3. **Access your app** at `https://yourusername.github.io/photocard-maker/`

## How to Use

1. **Upload an Image**
   - Click the upload area or drag & drop your photo
   - Supported formats: JPG, PNG (max 5MB)
   - The image will automatically be cropped to fit the 768×1186 px canvas with 2:3 aspect ratio

2. **Adjust Your Photo**
   - Use the **Zoom** slider to scale your image (50% - 200%)
   - Use the **Pan X** slider to move the image horizontally
   - Use the **Pan Y** slider to move the image vertically

3. **Customize Text**
   - Edit the **Top Text** field (default: "SeoYeon")
   - Edit the **Bottom Text** field (default: "tripleS")
   - Text will appear vertically on the yellow accent bar

4. **Download**
   - Click "💾 Download Image"
   - Your photocard will be saved as `photocard.png` (768×1186 px)

## Project Structure

```
objekt-maker/
├── index.html              # Main HTML file
├── /assets/
│   └── /icons/            # Favicon and app icons
├── /css/
│   └── style.css          # All styles (dark mode theme)
├── /js/
│   ├── main.js            # App initialization & orchestration
│   ├── canvas.js          # Canvas drawing & export logic
│   ├── ui.js              # UI controls & event handlers
│   └── borders.js         # (Not used in current version)
├── README.md
└── LICENSE
```

## Technical Details

### Stack
- **HTML5** for structure
- **CSS3** for styling (CSS Grid, Flexbox, custom properties, dark mode theme)
- **Vanilla JavaScript (ES6+)** for functionality
- **Canvas API** for image manipulation and export
- **Google Fonts (Inter)** for typography

### Canvas Specifications
- **Canvas Size**: 768 × 1186 pixels
- **Aspect Ratio**: 2:3 (portrait)
- **Image Area**: 633 × 1186 pixels (canvas minus accent bar)
- **Accent Bar**: 135 × 1186 pixels (#FFD400)
- **Corner Radius**: 36 pixels (all corners)
- **Text Font**: Bold 48px Inter
- **Text Color**: #000000 (black)

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### No Build Process Required
This project uses zero build tools - it's pure HTML/CSS/JS that runs directly in the browser!

## Customization

### Changing Canvas Size

In `js/canvas.js`, modify the CanvasManager properties:
```javascript
canvasWidth: 768,     // Width in pixels
canvasHeight: 1186,   // Height in pixels
accentWidth: 135,     // Accent bar width
accentColor: '#FFD400', // Accent color (yellow)
cornerRadius: 36,     // Corner radius
```

### Changing Text Defaults

In `js/canvas.js`, modify:
```javascript
topText: 'SeoYeon',   // Default top text
bottomText: 'tripleS', // Default bottom text
```

### Styling

All styles are in `css/style.css`. Key CSS variables (dark mode theme):
```css
:root {
    --primary-color: #22AEFF;    /* Main accent color (blue) */
    --secondary-color: #9200FF;  /* Secondary accent (purple) */
    --bg-color: #000000;         /* Background (black) */
    --surface-color: #1a1a1a;    /* Card backgrounds (dark gray) */
    --text-primary: #ffffff;     /* Primary text (white) */
    --text-secondary: #a0a0a0;   /* Secondary text (gray) */
}
```

### Customizing Accent Color

To change the accent bar color, modify `accentColor` in `js/canvas.js`:
```javascript
accentColor: '#FFD400',  // Change to any hex color
```

Common K-pop photocard colors:
- Yellow: `#FFD400` (tripleS, current)
- Pink: `#FF69B4`
- Purple: `#9200FF`
- Blue: `#00A2FF`
- Green: `#00D084`

## Troubleshooting

### Images not loading
- Ensure you're using JPG or PNG format
- Check file size is under 5MB
- Try using a local server instead of opening `index.html` directly (file:// protocol may have limitations)

### Export not working
- Check that Canvas API is supported in your browser
- Ensure you have an image loaded first
- Try a different browser if issues persist
- Check browser console (F12) for error messages

### Text not showing
- Ensure the text fields are not empty
- Try zooming and panning the canvas to see if text is visible
- Check that you've uploaded an image first

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - See [LICENSE](LICENSE) file for details

## Credits

Created for photocard enthusiasts worldwide

---

**Note**: This is a client-side only application. No data is uploaded to any server - everything happens in your browser!

---

Made with vanilla JavaScript - No frameworks - No build tools - Just pure web tech!
