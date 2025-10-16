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
    accentWidth: 82.61793, // Reduced by 10% from 91.7977 (91.7977 × 0.9)
    accentColor: '#FFD400',
    borderImage: null, // Custom border/notch image
    cornerRadius: 36,
    notchHeight: 1050, // Height of the centered notch
    topText: 'SeoYeon',
    middleText: '100A',
    bottomText: 'tripleS',
    textColor: '#000000', // Color for all text

    // Back side settings
    enableBackSide: false,
    backNameLabel: 'NAME',
    backNameValue: 'SeoYeon',
    backClassLabel: 'CLASS',
    backClassValue: 'First',
    backSeasonLabel: 'SEASON',
    backSeasonValue: 'Atom02',
    backFooterText: '©& MODHAUS. All Rights Reserved.',

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
     * @param {string} middle - Middle text
     * @param {string} bottom - Bottom text
     */
    setText(top, middle, bottom) {
        if (top !== undefined) this.topText = top;
        if (middle !== undefined) this.middleText = middle;
        if (bottom !== undefined) this.bottomText = bottom;
        this.render();
    },

    /**
     * Set border/accent color
     * @param {string} color - Hex color value
     */
    setBorderColor(color) {
        this.accentColor = color;
        this.render();
        this.updateBackSidePreview();
    },

    /**
     * Set text color (applies to all text)
     * @param {string} color - Hex color value
     */
    setTextColor(color) {
        this.textColor = color;
        this.render();
        this.updateBackSidePreview();
    },

    /**
     * Set back side enabled state
     * @param {boolean} enabled - Whether back side is enabled
     */
    setBackSideEnabled(enabled) {
        this.enableBackSide = enabled;
        // Trigger back side preview update
        this.updateBackSidePreview();
    },

    /**
     * Set back side text values
     * @param {Object} data - Back side text data
     */
    setBackSideData(data) {
        if (data.nameLabel !== undefined) this.backNameLabel = data.nameLabel;
        if (data.nameValue !== undefined) this.backNameValue = data.nameValue;
        if (data.classLabel !== undefined) this.backClassLabel = data.classLabel;
        if (data.classValue !== undefined) this.backClassValue = data.classValue;
        if (data.seasonLabel !== undefined) this.backSeasonLabel = data.seasonLabel;
        if (data.seasonValue !== undefined) this.backSeasonValue = data.seasonValue;
        if (data.footerText !== undefined) this.backFooterText = data.footerText;
        // Update back side preview
        this.updateBackSidePreview();
    },

    /**
     * Load a border image from file
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>} Success status
     */
    async loadBorderImage(file) {
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
                    this.borderImage = img;
                    console.log('Border image loaded:', img.width, 'x', img.height);
                    this.render();
                    this.updateBackSidePreview();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load border image'));
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
     * Clear the border image and use color instead
     */
    clearBorderImage() {
        this.borderImage = null;
        this.render();
        this.updateBackSidePreview();
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
     * Update back side preview canvas
     */
    updateBackSidePreview() {
        const backCanvasWrapper = document.getElementById('backCanvasWrapper');
        const backCanvas = document.getElementById('backCanvas');

        if (!backCanvasWrapper || !backCanvas) return;

        if (this.enableBackSide) {
            // Show the back canvas wrapper
            backCanvasWrapper.classList.add('active');

            // Render the back side to the preview canvas
            const backSideCanvas = this.renderBackSide();
            const backCtx = backCanvas.getContext('2d');
            backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
            backCtx.drawImage(backSideCanvas, 0, 0);
        } else {
            // Hide the back canvas wrapper
            backCanvasWrapper.classList.remove('active');
        }
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

        // If border image is set, use it; otherwise use color
        if (this.borderImage) {
            // Clip and draw the border image
            this.ctx.clip();

            // Calculate dimensions to cover the notch area (zoom to fill, don't stretch)
            const notchAspect = this.accentWidth / this.notchHeight;
            const imgAspect = this.borderImage.width / this.borderImage.height;

            let drawWidth, drawHeight;
            let offsetX = 0, offsetY = 0;

            if (imgAspect > notchAspect) {
                // Image is wider - fit to height and crop sides
                drawHeight = this.notchHeight;
                drawWidth = drawHeight * imgAspect;
                offsetX = (this.accentWidth - drawWidth) / 2;
            } else {
                // Image is taller - fit to width and crop top/bottom
                drawWidth = this.accentWidth;
                drawHeight = drawWidth / imgAspect;
                offsetY = (this.notchHeight - drawHeight) / 2;
            }

            // Draw the border image to cover the notch area
            this.ctx.drawImage(
                this.borderImage,
                accentX + offsetX,
                notchY + offsetY,
                drawWidth,
                drawHeight
            );
        } else {
            // Use solid color
            this.ctx.fillStyle = this.accentColor;
            this.ctx.fill();
        }

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
        this.ctx.fillStyle = this.textColor;
        this.ctx.font = '600 40.90875px "Helvetica Neue", sans-serif';

        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';

        // Draw top text (rotated 90° counterclockwise + 180° flip) - SeoYeon with reduced letter spacing
        this.ctx.save();
        this.ctx.letterSpacing = '-2.045px'; // 25% reduction from 0px (approximately -0.05em or -2.045px at 40.90875px font size)
        this.ctx.translate(centerX, 104);
        this.ctx.rotate(-Math.PI / 2 + Math.PI);
        this.ctx.fillText(this.topText, 0, 0);
        this.ctx.restore();

        // Draw middle text (rotated 90° counterclockwise + 180° flip) - 100A with reduced letter spacing
        this.ctx.save();
        this.ctx.font = '550 45px "SF Pro Display", sans-serif';
        this.ctx.letterSpacing = '-1.975px'; // 25% reduction from 0px (approximately -0.05em or -2.045px at 40.90875px font size)
        this.ctx.translate(centerX, this.canvasHeight / 2.25);
        this.ctx.rotate(-Math.PI / 2 + Math.PI);
        this.ctx.fillText(this.middleText, 0, 0);
        this.ctx.restore();

        // Draw bottom text (rotated 90° clockwise) - tripleS with increased letter spacing
        this.ctx.save();

        // Calculate notch boundaries for bottom text positioning
        const notchY = (this.canvasHeight - this.notchHeight) / 2;
        const notchBottom = notchY + this.notchHeight;
        const defaultBottomY = this.canvasHeight - 227;

        // Measure text width to determine if it needs adjustment
        let textWidth = 0;
        const baseSpacing = -1.0973;

        if (this.bottomText === 'tripleS') {
            // Calculate width for special "tripleS" rendering
            const extraGap100 = Math.abs(baseSpacing);
            const extraGap50 = Math.abs(baseSpacing) * 0.5;
            const reducedGap = baseSpacing * 0.15;

            for (let i = 0; i < this.bottomText.length; i++) {
                const char = this.bottomText[i];
                const charWidth = this.ctx.measureText(char).width;
                textWidth += charWidth + baseSpacing;

                if (i === 0 || i === 1) textWidth += extraGap100;
                if (i === 5) textWidth += extraGap50;
                if (i === 6) textWidth -= reducedGap;
            }
        } else {
            // Measure standard text width
            this.ctx.letterSpacing = '-1.0973px';
            textWidth = this.ctx.measureText(this.bottomText).width;
        }

        // Calculate Y position, adjusting if text would overflow the notch
        const bottomMargin = 20; // Padding from the bottom edge of the notch
        let bottomTextY = defaultBottomY;
        const textEnd = defaultBottomY + textWidth; // After rotation, text extends upward (positive direction)

        if (textEnd > notchBottom - bottomMargin) {
            // Text overflows - align to right edge of notch with margin
            bottomTextY = notchBottom - textWidth - bottomMargin;
        }

        this.ctx.translate(centerX, bottomTextY);
        this.ctx.rotate(Math.PI / 2);

        // Special handling for "tripleS" text with custom letter pair spacing
        if (this.bottomText === 'tripleS') {
            const extraGap100 = Math.abs(baseSpacing); // 100% increment (doubling the gap)
            const extraGap50 = Math.abs(baseSpacing) * 0.5; // 50% increment
            const reducedGap = baseSpacing * 0.15; // 15% reduction

            // Draw each character with custom spacing
            let xOffset = 0;
            for (let i = 0; i < this.bottomText.length; i++) {
                const char = this.bottomText[i];
                this.ctx.fillText(char, xOffset, 0);

                // Measure character width for next position
                const charWidth = this.ctx.measureText(char).width;
                xOffset += charWidth + baseSpacing;

                // Add 100% extra gap after 't' (index 0) and 'r' (index 1)
                if (i === 0 || i === 1) {
                    xOffset += extraGap100;
                }

                // Add 50% extra gap after 'l' (index 5)
                if (i === 5) {
                    xOffset += extraGap50;
                }

                // Reduce gap after 'e' (index 6)
                if (i === 6) {
                    xOffset -= reducedGap;
                }
            }
        } else {
            // Default rendering for other text
            this.ctx.letterSpacing = '-1.0973px';
            this.ctx.fillText(this.bottomText, 0, 0);
        }

        this.ctx.restore();

        this.ctx.restore();
    },

    /**
     * Render back side of the Objekt card
     * @returns {HTMLCanvasElement} Canvas with back side rendered
     */
    renderBackSide() {
        // Create a new canvas for the back side
        const backCanvas = document.createElement('canvas');
        backCanvas.width = this.canvasWidth;
        backCanvas.height = this.canvasHeight;
        const backCtx = backCanvas.getContext('2d');

        // Enable high quality rendering
        backCtx.imageSmoothingEnabled = true;
        backCtx.imageSmoothingQuality = 'high';

        // Clear canvas
        backCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw rounded rectangle background (white)
        backCtx.save();
        this.createRoundedRectOnContext(backCtx, 0, 0, this.canvasWidth, this.canvasHeight, this.cornerRadius);
        backCtx.fillStyle = '#FFFFFF'; // White background
        backCtx.fill();
        backCtx.restore();

        // Draw yellow rectangle with corner rounding
        // Width = canvasWidth - accentWidth (notch width)
        // Height = canvasHeight - 2*accentWidth
        const rectWidth = this.canvasWidth - this.accentWidth;
        const rectHeight = this.canvasHeight - (2 * this.accentWidth);
        const rectX = 0;
        const rectY = this.accentWidth;
        const rectRadius = 20; // Corner radius for the yellow rectangle

        backCtx.save();
        this.createRoundedRectOnContext(backCtx, rectX, rectY, rectWidth, rectHeight, rectRadius);
        backCtx.fillStyle = this.accentColor; // Yellow color (inherits from front)
        backCtx.fill();
        backCtx.restore();

        // Draw filled hexagonal cube logo at top left
        this.drawFilledHexCubeIcon(backCtx, 47, 124);

        // Draw the text content on the left side
        backCtx.fillStyle = this.textColor;
        backCtx.textAlign = 'left';
        backCtx.textBaseline = 'top';

        const leftMargin = 47;
        const rightMargin = 678; // Right edge for divider lines (adjusted to match reference)

        // Draw horizontal divider line at top
        backCtx.fillRect(leftMargin, 290, rightMargin - leftMargin, 2);

        // NAME section
        backCtx.font = '400 20px "Helvetica Neue", sans-serif';
        backCtx.letterSpacing = '0px';
        backCtx.fillText(this.backNameLabel, leftMargin, 317);

        backCtx.font = '700 80px "Helvetica Neue", sans-serif';
        backCtx.letterSpacing = '-3px';
        backCtx.fillText(this.backNameValue, leftMargin, 352);

        // Horizontal divider
        backCtx.fillRect(leftMargin, 475, rightMargin - leftMargin, 2);

        // CLASS section
        backCtx.font = '400 20px "Helvetica Neue", sans-serif';
        backCtx.letterSpacing = '0px';
        backCtx.fillText(this.backClassLabel, leftMargin, 502);

        backCtx.font = '700 90px "Helvetica Neue", sans-serif';
        backCtx.letterSpacing = '-2px';
        backCtx.fillText(this.backClassValue, leftMargin, 537);

        // Horizontal divider
        backCtx.fillRect(leftMargin, 655, rightMargin - leftMargin, 2);

        // SEASON section
        backCtx.font = '400 20px "Helvetica Neue", sans-serif';
        backCtx.letterSpacing = '0px';
        backCtx.fillText(this.backSeasonLabel, leftMargin, 682);

        // Draw SEASON value with special handling for outline "02"
        this.drawSeasonTextWithOutline(backCtx, this.backSeasonValue, leftMargin, 717);

        // Draw signature/white box area (bottom left)
        backCtx.fillStyle = '#FFFFFF';
        backCtx.fillRect(leftMargin, 837, 260, 260);

        // Draw signature inside the box if available
        this.drawSignature(backCtx, leftMargin, 837, 260, 260);

        // Horizontal divider at bottom
        backCtx.fillStyle = this.textColor;
        backCtx.fillRect(leftMargin, 1120, rightMargin - leftMargin, 2);

        // Footer text - Updated to match reference
        backCtx.font = '400 11px "Helvetica Neue", sans-serif';
        backCtx.letterSpacing = '0px';
        backCtx.fillText('©& MODHAUS. All Rights Reserved.', leftMargin, 1145);

        // Draw rotated text on the sides
        backCtx.save();
        const centerX = this.canvasWidth - this.accentWidth / 2;

        // Draw "SeoYeon" (name) - positioned in upper portion
        backCtx.translate(centerX, 250);
        backCtx.rotate(Math.PI / 2); // Rotate 90 degrees clockwise

        backCtx.fillStyle = this.textColor;
        backCtx.font = '600 35px "Helvetica Neue", sans-serif';
        backCtx.textAlign = 'left';
        backCtx.textBaseline = 'middle';
        backCtx.letterSpacing = '-1.5px';
        backCtx.fillText(this.backNameValue, 0, 0);
        backCtx.restore();

        // Draw "tripleS" text - positioned in lower portion
        backCtx.save();
        backCtx.translate(centerX, this.canvasHeight - 200);
        backCtx.rotate(Math.PI / 2); // Rotate 90 degrees clockwise

        backCtx.fillStyle = this.textColor;
        backCtx.font = '600 35px "Helvetica Neue", sans-serif';
        backCtx.textAlign = 'left';
        backCtx.textBaseline = 'middle';
        backCtx.letterSpacing = '-1.5px';
        backCtx.fillText('tripleS', 0, 0);
        backCtx.restore();

        return backCanvas;
    },

    /**
     * Draw outlined hexagonal cube logo (matching the reference card logo)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    drawFilledHexCubeIcon(ctx, x, y) {
        const size = 90;
        ctx.save();
        ctx.strokeStyle = this.textColor;
        ctx.lineWidth = 4;
        ctx.lineJoin = 'miter';
        ctx.lineCap = 'square';

        // Draw outlined hexagonal cube (isometric style)
        const w = size * 0.65;
        const h = size * 0.75;

        // Top face (diamond/rhombus) - outline only
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x + w, y + h * 0.25);
        ctx.lineTo(x + w / 2, y + h * 0.5);
        ctx.lineTo(x, y + h * 0.25);
        ctx.closePath();
        ctx.stroke();

        // Left face - outline only
        ctx.beginPath();
        ctx.moveTo(x, y + h * 0.25);
        ctx.lineTo(x + w / 2, y + h * 0.5);
        ctx.lineTo(x + w / 2, y + h);
        ctx.lineTo(x, y + h * 0.75);
        ctx.closePath();
        ctx.stroke();

        // Right face - outline only
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h * 0.5);
        ctx.lineTo(x + w, y + h * 0.25);
        ctx.lineTo(x + w, y + h * 0.75);
        ctx.lineTo(x + w / 2, y + h);
        ctx.closePath();
        ctx.stroke();

        // Add internal vertical line for detail
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x + w / 2, y + h);
        ctx.stroke();

        ctx.restore();
    },

    /**
     * Draw season text with outline style for numbers (like "Atom02" where "02" is outlined)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {string} text - Season text (e.g., "Atom02")
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    drawSeasonTextWithOutline(ctx, text, x, y) {
        ctx.save();
        ctx.font = '700 75px "Helvetica Neue", sans-serif';
        ctx.letterSpacing = '-2px';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // Check if text ends with numbers (like "02")
        const numberMatch = text.match(/^([A-Za-z]+)(\d+)$/);

        if (numberMatch) {
            const textPart = numberMatch[1]; // e.g., "Atom"
            const numberPart = numberMatch[2]; // e.g., "02"

            // Draw text part (filled)
            ctx.fillStyle = this.textColor;
            ctx.fillText(textPart, x, y);

            // Measure text part width
            const textWidth = ctx.measureText(textPart).width;

            // Draw number part (outlined)
            ctx.strokeStyle = this.textColor;
            ctx.lineWidth = 3;
            ctx.strokeText(numberPart, x + textWidth - 2, y);
        } else {
            // If no numbers, just draw normally
            ctx.fillStyle = this.textColor;
            ctx.fillText(text, x, y);
        }

        ctx.restore();
    },

    /**
     * Draw signature in the signature box
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Box X position
     * @param {number} y - Box Y position
     * @param {number} width - Box width
     * @param {number} height - Box height
     */
    drawSignature(ctx, x, y, width, height) {
        // Draw a stylized signature similar to the reference
        ctx.save();
        ctx.strokeStyle = this.textColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const scale = 0.6;

        // Draw a stylized cursive signature (abstract representation)
        // This creates flowing curves similar to a handwritten signature
        ctx.beginPath();

        // First curve (left side)
        ctx.moveTo(x + 40, centerY + 20);
        ctx.bezierCurveTo(
            x + 60, centerY - 30,
            x + 80, centerY + 40,
            x + 100, centerY - 10
        );

        // Second curve (middle)
        ctx.bezierCurveTo(
            x + 120, centerY - 40,
            x + 140, centerY + 30,
            x + 160, centerY + 10
        );

        // Third curve (right side)
        ctx.bezierCurveTo(
            x + 180, centerY - 20,
            x + 200, centerY + 20,
            x + 220, centerY - 5
        );

        ctx.stroke();

        // Add a decorative underline
        ctx.beginPath();
        ctx.moveTo(x + 40, centerY + 40);
        ctx.quadraticCurveTo(centerX, centerY + 50, x + width - 40, centerY + 40);
        ctx.stroke();

        ctx.restore();
    },

    /**
     * Create rounded rectangle path on a given context
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Width
     * @param {number} height - Height
     * @param {number} radius - Corner radius
     */
    createRoundedRectOnContext(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
    },

    /**
     * Export canvas as downloadable image
     * @param {Array} textOverlays - Array of text overlay objects (not used anymore)
     * @param {string} format - Export format ('png' or 'jpeg')
     * @param {string} filename - Download filename
     */
    async exportImage(textOverlays = [], format = 'png', filename = 'image') {
        if (this.enableBackSide) {
            // Export both front and back side
            // First, download the front side
            await new Promise((resolve) => {
                this.canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${filename}-front.${format}`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    resolve(true);
                }, `image/${format}`, 0.95);
            });

            // Then, download the back side
            const backCanvas = this.renderBackSide();
            await new Promise((resolve) => {
                backCanvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${filename}-back.${format}`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    resolve(true);
                }, `image/${format}`, 0.95);
            });

            return true;
        } else {
            // Export only front side
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
        }
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
        this.middleText = '100A';
        this.bottomText = 'tripleS';
        this.accentColor = '#FFD400';
        this.borderImage = null;
        this.textColor = '#000000';
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

// Export to global scope for browser usage
window.CanvasManager = CanvasManager;

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasManager;
}
