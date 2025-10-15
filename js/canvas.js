/**
 * canvas.js
 * Handles all canvas drawing operations, image rendering, and export functionality
 */

const CanvasManager = {
    canvas: null,
    ctx: null,
    uploadedImage: null,
    imageScale: 1,
    imageRotation: 0,
    imagePosX: 0,
    imagePosY: 0,
    canvasWidth: 768,
    canvasHeight: 1186,
    accentWidth: 85,
    accentColor: '#FFD400',
    cornerRadius: 36,
    notchHeight: 1050, // Height of the centered notch
    topText: 'SeoYeon',
    bottomText: 'tripleS',

    /**
     * Initialize canvas manager
     * @param {HTMLCanvasElement} canvasElement - The canvas element
     */
    init(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: false });

        // Set initial canvas size
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        // Enable image smoothing for better quality
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        console.log('Canvas initialized:', this.canvasWidth, 'x', this.canvasHeight);
    },

    /**
     * Load an image from file
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>} Success status
     */
    async loadImage(file) {
        return new Promise((resolve, reject) => {
            // Validate file type
            if (!file.type.match('image/(png|jpeg|jpg)')) {
                reject(new Error('Please upload a PNG or JPG image'));
                return;
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                reject(new Error('Image size must be less than 5MB'));
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    this.uploadedImage = img;
                    console.log('Image loaded:', img.width, 'x', img.height);
                    this.render();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load image'));
                };

                img.src = e.target.result;
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsDataURL(file);
        });
    },

    /**
     * Set zoom level
     * @param {number} scale - Scale value (1 = 100%)
     */
    setZoom(scale) {
        this.imageScale = scale;
        this.render();
    },

    /**
     * Set rotation angle
     * @param {number} degrees - Rotation in degrees
     */
    setRotation(degrees) {
        this.imageRotation = degrees;
        this.render();
    },

    /**
     * Set text values
     * @param {string} top - Top text
     * @param {string} bottom - Bottom text
     */
    setText(top, bottom) {
        if (top !== undefined) this.topText = top;
        if (bottom !== undefined) this.bottomText = bottom;
        this.render();
    },

    /**
     * Pan image position
     * @param {number} x - X offset
     * @param {number} y - Y offset
     */
    setPan(x, y) {
        this.imagePosX = x;
        this.imagePosY = y;
        this.render();
    },

    /**
     * Main render function - draws everything on canvas
     */
    render() {
        if (!this.uploadedImage) {
            return;
        }

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Create a temporary canvas for the rounded image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvasWidth;
        tempCanvas.height = this.canvasHeight;
        const tempCtx = tempCanvas.getContext('2d');

        // Calculate image area (canvas width minus accent bar)
        const imageAreaWidth = this.canvasWidth - this.accentWidth;
        const imageAreaHeight = this.canvasHeight;

        // Calculate image dimensions to cover the entire canvas with 2:3 aspect ratio
        // Using "cover" mode - fill entire area, cropping if necessary
        const targetAspect = 2 / 3; // Width / Height = 2 / 3
        const imgAspect = this.uploadedImage.width / this.uploadedImage.height;

        let drawWidth, drawHeight;

        // Calculate dimensions to cover the entire canvas area (including accent bar)
        const fullAspect = this.canvasWidth / this.canvasHeight;

        if (imgAspect > fullAspect) {
            // Image is wider - fit to height
            drawHeight = this.canvasHeight * this.imageScale;
            drawWidth = drawHeight * imgAspect;
        } else {
            // Image is taller - fit to width
            drawWidth = this.canvasWidth * this.imageScale;
            drawHeight = drawWidth / imgAspect;
        }

        // Calculate position (centered with pan)
        const xPos = (this.canvasWidth - drawWidth) / 2 + this.imagePosX;
        const yPos = (this.canvasHeight - drawHeight) / 2 + this.imagePosY;

        // Draw image on temp canvas
        tempCtx.drawImage(
            this.uploadedImage,
            xPos,
            yPos,
            drawWidth,
            drawHeight
        );

        // Create rounded rectangle clip path on main canvas
        this.ctx.save();
        this.createRoundedRect(0, 0, this.canvasWidth, this.canvasHeight, this.cornerRadius);
        this.ctx.clip();

        // Draw the temp canvas (with image) onto main canvas
        this.ctx.drawImage(tempCanvas, 0, 0);

        this.ctx.restore();

        // Draw centered notch on right side
        this.ctx.save();
        const accentX = this.canvasWidth - this.accentWidth;
        this.ctx.fillStyle = this.accentColor;

        // Calculate vertical centering
        const notchY = (this.canvasHeight - this.notchHeight) / 2;
        const notchRadius = 20; // Radius for the notch rounded corners (left side only)

        // Create path for centered notch with rounded corners only on left side
        this.ctx.beginPath();
        this.ctx.moveTo(accentX, notchY + notchRadius);
        this.ctx.arcTo(accentX, notchY, accentX + notchRadius, notchY, notchRadius);
        this.ctx.lineTo(this.canvasWidth, notchY); // Straight line to top-right (no rounding)
        this.ctx.lineTo(this.canvasWidth, notchY + this.notchHeight); // Straight line down the right edge
        this.ctx.lineTo(accentX + notchRadius, notchY + this.notchHeight);
        this.ctx.arcTo(accentX, notchY + this.notchHeight, accentX, notchY + this.notchHeight - notchRadius, notchRadius);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();

        // Draw text on accent bar
        this.drawAccentText();
    },

    /**
     * Create rounded rectangle path
     */
    createRoundedRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.arcTo(x + width, y, x + width, y + radius, radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.arcTo(x, y + height, x, y + height - radius, radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.arcTo(x, y, x + radius, y, radius);
        this.ctx.closePath();
    },

    /**
     * Draw rotated text on accent bar
     */
    drawAccentText() {
        this.ctx.save();

        const accentX = this.canvasWidth - this.accentWidth;
        const centerX = accentX + this.accentWidth / 2;

        // Set text properties
        this.ctx.fillStyle = '#000000';
        this.ctx.font = 'bold 48px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Draw top text (rotated 90° counterclockwise)
        this.ctx.save();
        this.ctx.translate(centerX, 200);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText(this.topText, 0, 0);
        this.ctx.restore();

        // Draw bottom text (rotated 90° clockwise)
        this.ctx.save();
        this.ctx.translate(centerX, this.canvasHeight - 200);
        this.ctx.rotate(Math.PI / 2);
        this.ctx.fillText(this.bottomText, 0, 0);
        this.ctx.restore();

        this.ctx.restore();
    },

    /**
     * Export canvas as downloadable image
     * @param {Array} textOverlays - Array of text overlay objects (not used anymore)
     * @param {string} format - Export format ('png' or 'jpeg')
     * @param {string} filename - Download filename
     */
    async exportImage(textOverlays = [], format = 'png', filename = 'image') {
        // Convert to blob and download
        return new Promise((resolve) => {
            this.canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${filename}.${format}`;
                link.href = url;
                link.click();

                // Clean up
                URL.revokeObjectURL(url);
                resolve(true);
            }, `image/${format}`, 0.95);
        });
    },

    /**
     * Reset canvas to initial state
     */
    reset() {
        this.uploadedImage = null;
        this.imageScale = 1;
        this.imageRotation = 0;
        this.imagePosX = 0;
        this.imagePosY = 0;
        this.topText = 'SeoYeon';
        this.bottomText = 'tripleS';
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        console.log('Canvas reset');
    },

    /**
     * Check if canvas has an image loaded
     * @returns {boolean}
     */
    hasImage() {
        return this.uploadedImage !== null;
    },

    /**
     * Get current canvas as data URL
     * @returns {string} Data URL
     */
    toDataURL() {
        return this.canvas.toDataURL('image/png');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasManager;
}
