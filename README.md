# ✨ Photocard Maker

A beautiful, feature-rich web application for creating custom photocards with borders, frames, and text overlays. Perfect for K-pop fans, collectors, and anyone who wants to create stunning photo cards!

![Photocard Maker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## 🌟 Features

- **📸 Image Upload**: Drag & drop or click to upload JPG/PNG images (max 5MB)
- **🖼️ Multiple Frame Styles**: Choose from 8 preset borders including:
  - Classic border
  - Polaroid style
  - Rounded corners
  - Circle crop
  - Heart shape
  - And more!
- **🎨 Customizable Colors**: Pick any color for frames and text
- **✏️ Text Overlays**: Add draggable text with adjustable size and color
- **🔧 Image Adjustments**:
  - Zoom control (50% - 200%)
  - Rotation (0° - 360°)
- **💾 Export**: Download your creation as high-quality PNG
- **💻 Client-Side Only**: All processing happens in your browser - no server required
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **💾 LocalStorage**: Remembers your last used frame and color preferences

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

## 📖 How to Use

1. **Upload an Image**
   - Click the upload area or drag & drop your photo
   - Supported formats: JPG, PNG (max 5MB)

2. **Choose a Frame**
   - Click one of the frame style buttons
   - Select a color using the color picker

3. **Add Text** (Optional)
   - Type your text in the input field
   - Choose text color and size
   - Click "Add Text"
   - Drag the text to position it anywhere on the card

4. **Adjust Your Photo**
   - Use the zoom slider to scale your image
   - Use the rotation slider to rotate your image

5. **Download**
   - Click "💾 Download Photocard"
   - Your image will be saved as `photocard.png`

## 🗂️ Project Structure

```
photocard-maker/
├── index.html              # Main HTML file
├── /assets/
│   ├── /borders/          # Sample border assets (SVG/PNG)
│   ├── /fonts/            # Custom fonts (optional)
│   └── /icons/            # Favicon and app icons
├── /css/
│   └── style.css          # All styles
├── /js/
│   ├── main.js            # App initialization & orchestration
│   ├── canvas.js          # Canvas drawing & export logic
│   ├── ui.js              # UI controls & event handlers
│   └── borders.js         # Border/frame management
├── /data/
│   └── borders.json       # Frame preset definitions
├── README.md
└── LICENSE
```

## 🛠️ Technical Details

### Stack
- **HTML5** for structure
- **CSS3** for styling (CSS Grid, Flexbox, custom properties)
- **Vanilla JavaScript (ES6+)** for functionality
- **Canvas API** for image manipulation and export

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### No Build Process Required
This project uses zero build tools - it's pure HTML/CSS/JS that runs directly in the browser!

## 🎨 Customization

### Adding New Frames

1. Open `data/borders.json`
2. Add a new border object:
   ```json
   {
     "id": "my-frame",
     "name": "My Frame",
     "description": "Custom frame style",
     "type": "border",
     "width": 50,
     "color": "#ff0000",
     "emoji": "🎨"
   }
   ```

3. Supported types: `none`, `border`, `polaroid`, `rounded`, `circle`, `heart`

### Changing Canvas Size

In `js/canvas.js`, modify:
```javascript
canvasWidth: 800,   // Width in pixels
canvasHeight: 1000, // Height in pixels
```

Standard photocard sizes:
- **Standard**: 800x1000px (55x85mm)
- **Mini**: 640x1020px (42x59mm)
- **Polaroid**: 800x1000px (Polaroid instant)

### Styling

All styles are in `css/style.css`. Key CSS variables:
```css
:root {
    --primary-color: #6366f1;    /* Main accent color */
    --secondary-color: #8b5cf6;  /* Secondary accent */
    --bg-color: #f8fafc;         /* Background */
    --surface-color: #ffffff;    /* Card backgrounds */
}
```

## 🐛 Troubleshooting

### Images not loading
- Ensure you're using JPG or PNG format
- Check file size is under 5MB
- Try using a local server instead of opening `index.html` directly

### Frames not showing
- Check browser console for errors
- Ensure `data/borders.json` is accessible
- Verify you're using a modern browser

### Export not working
- Check that Canvas API is supported in your browser
- Ensure you have an image loaded first
- Try a different browser if issues persist

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🎉 Credits

Created with ❤️ for photocard enthusiasts worldwide

---

**Note**: This is a client-side only application. No data is uploaded to any server - everything happens in your browser!

## 🔗 Links

- [Live Demo](https://yourusername.github.io/photocard-maker/)
- [Report Issues](https://github.com/yourusername/photocard-maker/issues)
- [Documentation](https://github.com/yourusername/photocard-maker/wiki)

---

Made with vanilla JavaScript • No frameworks • No build tools • Just pure web tech! 🚀
