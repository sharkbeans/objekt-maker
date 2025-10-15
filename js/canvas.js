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
    canvasWidth: 800,
    canvasHeight: 1000,
    frameColor: '#ffffff',

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
     * Set frame/border color
     * @param {string} color - Hex color value
     */
    setFrameColor(color) {
        this.frameColor = color;
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

        // Fill background with white
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Save context state
        this.ctx.save();

        // Move to center for rotation
        this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);

        // Apply rotation
        const radians = (this.imageRotation * Math.PI) / 180;
        this.ctx.rotate(radians);

        // Calculate image dimensions to fit canvas while maintaining aspect ratio
        const imgAspect = this.uploadedImage.width / this.uploadedImage.height;
        const canvasAspect = this.canvasWidth / this.canvasHeight;

        let drawWidth, drawHeight;

        if (imgAspect > canvasAspect) {
            // Image is wider than canvas
            drawHeight = this.canvasHeight;
            drawWidth = drawHeight * imgAspect;
        } else {
            // Image is taller than canvas
            drawWidth = this.canvasWidth;
            drawHeight = drawWidth / imgAspect;
        }

        // Apply zoom
        drawWidth *= this.imageScale;
        drawHeight *= this.imageScale;

        // Draw image centered
        this.ctx.drawImage(
            this.uploadedImage,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
        );

        // Restore context state
        this.ctx.restore();

        // Apply border/frame on top
        if (BorderManager && BorderManager.getCurrentBorder()) {
            BorderManager.applyBorder(this.ctx, this.canvasWidth, this.canvasHeight, this.frameColor);
        }
    },

    /**
     * Add text overlay to canvas
     * @param {string} text - Text content
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} color - Text color
     * @param {number} fontSize - Font size in pixels
     */
    addTextToCanvas(text, x, y, color, fontSize) {
        this.ctx.save();

        this.ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';

        // Add text shadow for better visibility
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;

        this.ctx.fillText(text, x, y);

        this.ctx.restore();
    },

    /**
     * Export canvas as downloadable image
     * @param {Array} textOverlays - Array of text overlay objects {text, x, y, color, fontSize}
     * @param {string} format - Export format ('png' or 'jpeg')
     * @param {string} filename - Download filename
     */
    async exportImage(textOverlays = [], format = 'png', filename = 'photocard') {
        // Create a temporary canvas for export
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.canvasWidth;
        exportCanvas.height = this.canvasHeight;
        const exportCtx = exportCanvas.getContext('2d');

        // Draw the main canvas content
        exportCtx.drawImage(this.canvas, 0, 0);

        // Add all text overlays
        textOverlays.forEach(overlay => {
            exportCtx.save();

            exportCtx.font = `bold ${overlay.fontSize}px Arial, sans-serif`;
            exportCtx.fillStyle = overlay.color;
            exportCtx.textAlign = 'left';
            exportCtx.textBaseline = 'top';

            // Add text shadow
            exportCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            exportCtx.shadowBlur = 4;
            exportCtx.shadowOffsetX = 2;
            exportCtx.shadowOffsetY = 2;

            exportCtx.fillText(overlay.text, overlay.x, overlay.y);

            exportCtx.restore();
        });

        // Convert to blob and download
        return new Promise((resolve) => {
            exportCanvas.toBlob((blob) => {
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
        this.frameColor = '#ffffff';
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
