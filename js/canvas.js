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
    // Default dimensions (Objekt Default)
    baseCanvasWidth: 768,
    baseCanvasHeight: 1186,
    canvasWidth: 768,
    canvasHeight: 1186,
    scaleFactor: 1, // Scale factor for proportional scaling (current / base)
    // Card size presets (at 300 DPI)
    cardSizePresets: {
        objekt: { name: 'Objekt Default', widthMM: 65, heightMM: 100, width: 768, height: 1186 },
        standard: { name: 'Standard Photocard', widthMM: 54, heightMM: 86, width: 638, height: 1016 },
        credit: { name: 'Credit Card', widthMM: 55, heightMM: 85, width: 650, height: 1004 },
        instax: { name: 'Instax Mini', widthMM: 57, heightMM: 89, width: 673, height: 1051 },
        custom: { name: 'Custom', widthMM: 65, heightMM: 100, width: 768, height: 1186 }
    },
    currentCardSize: 'objekt',
    accentWidth: 82.61793, // Reduced by 10% from 91.7977 (91.7977 × 0.9) - base size
    accentColor: '#FFD400',
    borderImage: null, // Custom border/notch image
    signatureImage: null, // Custom signature image
    signatureZoom: 1, // Signature zoom level (1 = 100%)
    signaturePosX: 0, // Signature X position offset
    signaturePosY: 0, // Signature Y position offset
    topLogoImage: null, // Custom logo image for back side top (replaces hex cube)
    topLogoZoom: 1.5, // Top logo zoom level (1.5 = 150%)
    topLogoPosX: 0, // Top logo X position offset
    topLogoPosY: 0, // Top logo Y position offset
    topLogoBaseX: 82, 
    topLogoBaseY: 155, 
    topLogoRotation: 0, // Top logo rotation in degrees (default 0)
    logoImage: null, // Custom logo image for back side bottom text area
    logoZoom: 1, // Logo zoom level (1 = 100%)
    logoPosX: 0, // Logo X position offset (reset to 0)
    logoPosY: 0, // Logo Y position offset (reset to 0)
    logoBaseX: 310, // Base X position for back logo
    logoBaseY: 410, // Base Y position for back logo
    logoRotation: 90, // Logo rotation in degrees (default 90 clockwise)
    frontLogoImage: null, // Custom logo image for front side
    frontLogoZoom: 1, // Front logo zoom level (1 = 100%)
    frontLogoPosX: 0, // Front logo X position offset (reset to 0)
    frontLogoPosY: 0, // Front logo Y position offset (reset to 0)
    frontLogoBaseX: 385, // Base X position to maintain original logo spot (+65)
    frontLogoBaseY: 430, // Base Y position to maintain original logo spot (-20)
    frontLogoRotation: 90, // Front logo rotation in degrees (default 90 clockwise)
    cornerRadius: 36,
    notchHeight: 1050, // Height of the centered notch
    topText: 'SeoYeon',
    middleText: '100A',
    bottomText: 'tripleS',
    textColor: '#000000', // Color for all text

    // Text height offsets (Front side)
    topTextHeight: 0,
    middleTextHeight: 0,
    bottomTextHeight: 0,

    // Back side settings
    enableBackSide: false,
    backNameLabel: 'NAME',
    backNameValue: 'SeoYeon',
    backClassLabel: 'CLASS',
    backClassValue: 'First',
    backSeasonLabel: 'SEASON',
    backSeasonValue: 'Atom02',
    backGroupName: 'tripleS',

    // Back side text height offsets
    backTopTextHeight: 0,
    backBottomTextHeight: 0,

    // QR Code settings
    qrCodeLink: 'https://sharkbeans.github.io/objekt-maker/',
    qrCodeImage: null, // Cached QR code image
    qrCodeCanvas: null, // Cached QR code canvas

    // Objekt border toggle (Phase 1)
    showObjektBorder: true, // When false, renders as clean photocard without accent bar

    // Overflow border settings
    showOverflowBorder: false,
    overflowBorderPercent: 2,

    // Reference Template Overlay (Phase 3)
    templateImage: null, // Template image for alignment reference
    templateOpacity: 0.5, // Template opacity (0-1)
    showTemplate: false, // Whether to show the template overlay

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
     * Set card size from preset or custom dimensions
     * @param {string} preset - Preset name ('objekt', 'standard', 'credit', 'instax', 'custom')
     * @param {number} customWidth - Custom width in pixels (for 'custom' preset)
     * @param {number} customHeight - Custom height in pixels (for 'custom' preset)
     */
    setCardSize(preset, customWidth = null, customHeight = null) {
        let newWidth, newHeight;

        if (preset === 'custom' && customWidth && customHeight) {
            newWidth = customWidth;
            newHeight = customHeight;
            this.cardSizePresets.custom.width = customWidth;
            this.cardSizePresets.custom.height = customHeight;
        } else if (this.cardSizePresets[preset]) {
            newWidth = this.cardSizePresets[preset].width;
            newHeight = this.cardSizePresets[preset].height;
        } else {
            console.error('Invalid card size preset:', preset);
            return;
        }

        // Calculate scale factor based on base dimensions
        this.scaleFactor = newWidth / this.baseCanvasWidth;

        // Update canvas dimensions
        this.canvasWidth = newWidth;
        this.canvasHeight = newHeight;
        this.currentCardSize = preset;

        // Update actual canvas element dimensions
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;

        // Update back canvas dimensions if it exists
        const backCanvas = document.getElementById('backCanvas');
        if (backCanvas) {
            backCanvas.width = newWidth;
            backCanvas.height = newHeight;
        }

        console.log('Card size updated:', preset, `${newWidth}x${newHeight}`, `scale: ${this.scaleFactor.toFixed(3)}`);

        // Re-render if image is loaded
        if (this.hasImage()) {
            this.render();
            this.updateBackSidePreview();
        }
    },

    /**
     * Convert mm to pixels at 300 DPI
     * @param {number} mm - Millimeters
     * @returns {number} Pixels
     */
    mmToPixels(mm) {
        // 1 inch = 25.4 mm
        // At 300 DPI: 1 mm = (300 / 25.4) pixels ≈ 11.811 pixels
        return Math.round(mm * (300 / 25.4));
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
    async setTextColor(color) {
        this.textColor = color;
        this.render();
        // Regenerate QR code with new color
        if (this.qrCodeImage || this.qrCodeCanvas) {
            await this.generateQRCode();
        }
        this.updateBackSidePreview();
    },

    /**
     * Set text height offset for front side
     * @param {string} position - 'top', 'middle', or 'bottom'
     * @param {number} offset - Y offset in pixels
     */
    setTextHeight(position, offset) {
        if (position === 'top') this.topTextHeight = offset;
        else if (position === 'middle') this.middleTextHeight = offset;
        else if (position === 'bottom') this.bottomTextHeight = offset;
        this.render();
    },

    /**
     * Set back side text height offset
     * @param {string} position - 'top' or 'bottom'
     * @param {number} offset - Y offset in pixels
     */
    setBackTextHeight(position, offset) {
        if (position === 'top') this.backTopTextHeight = offset;
        else if (position === 'bottom') this.backBottomTextHeight = offset;
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
        if (data.groupName !== undefined) this.backGroupName = data.groupName;
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

                img.onload = async () => {
                    this.borderImage = img;
                    console.log('Border image loaded:', img.width, 'x', img.height);
                    this.render();
                    // Regenerate QR code before updating back side to ensure it displays
                    if (this.qrCodeImage || this.qrCodeCanvas) {
                        await this.generateQRCode();
                    }
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
    async clearBorderImage() {
        this.borderImage = null;
        this.render();
        // Regenerate QR code before updating back side to ensure it displays
        if (this.qrCodeImage || this.qrCodeCanvas) {
            await this.generateQRCode();
        }
        this.updateBackSidePreview();
    },

    /**
     * Load a signature image from file
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>} Success status
     */
    async loadSignatureImage(file) {
        return new Promise((resolve, reject) => {
            // Validate file type - only accept PNG for transparency support
            if (!file.type.match('image/png')) {
                reject(new Error('Please upload a PNG image with transparent background'));
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
                    this.signatureImage = img;
                    console.log('Signature image loaded:', img.width, 'x', img.height);
                    this.updateBackSidePreview();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load signature image'));
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
     * Clear the signature image and use default signature instead
     */
    clearSignatureImage() {
        this.signatureImage = null;
        this.signatureZoom = 1;
        this.topLogoImage = null;
        this.topLogoZoom = 1;
        this.topLogoPosX = 0;
        this.topLogoPosY = 0;
        this.topLogoRotation = 0;
        this.updateBackSidePreview();
    },

    /**
     * Set signature zoom level
     * @param {number} zoom - Zoom level (1 = 100%)
     */
    setSignatureZoom(zoom) {
        this.signatureZoom = zoom;
        this.updateBackSidePreview();
    },

    /**
     * Set signature position
     * @param {number} x - X offset
     * @param {number} y - Y offset
     */
    setSignaturePosition(x, y) {
        this.signaturePosX = x;
        this.signaturePosY = y;
        this.updateBackSidePreview();
    },

    /**
     * Load top logo image from file (replaces hex cube)
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>}
     */
    async loadTopLogoImage(file) {
        return new Promise((resolve, reject) => {
            // Validate file type (PNG, JPG)
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
                    this.topLogoImage = img;
                    console.log('Top logo image loaded:', img.width, 'x', img.height);
                    this.updateBackSidePreview();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load top logo image'));
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
     * Clear the top logo image
     */
    clearTopLogoImage() {
        this.topLogoImage = null;
        this.topLogoZoom = 1;
        this.topLogoPosX = 0;
        this.topLogoPosY = 0;
        this.topLogoRotation = 0;
        this.updateBackSidePreview();
    },

    /**
     * Set top logo zoom level
     * @param {number} zoom - Zoom level (1 = 100%)
     */
    setTopLogoZoom(zoom) {
        this.topLogoZoom = zoom;
        this.updateBackSidePreview();
    },

    /**
     * Set top logo position
     * @param {number} x - X offset
     * @param {number} y - Y offset
     */
    setTopLogoPosition(x, y) {
        this.topLogoPosX = x;
        this.topLogoPosY = y;
        this.updateBackSidePreview();
    },

    /**
     * Set top logo rotation
     * @param {number} rotation - Rotation in degrees
     */
    setTopLogoRotation(rotation) {
        this.topLogoRotation = rotation;
        this.updateBackSidePreview();
    },

    /**
     * Load back side logo image from file
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>}
     */
    async loadLogoImage(file) {
        return new Promise((resolve, reject) => {
            // Validate file type (PNG, JPG)
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
                    this.logoImage = img;
                    this.backGroupName = ''; // Clear back side bottom text when logo is loaded
                    console.log('Logo image loaded:', img.width, 'x', img.height);
                    this.updateBackSidePreview();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load logo image'));
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
     * Clear the back side logo image
     */
    clearLogoImage() {
        this.logoImage = null;
        this.logoZoom = 1;
        this.logoPosX = 0;
        this.logoPosY = 0;
        this.logoRotation = 90;
        this.updateBackSidePreview();
    },

    /**
     * Set logo zoom level
     * @param {number} zoom - Zoom level (1 = 100%)
     */
    setLogoZoom(zoom) {
        this.logoZoom = zoom;
        this.updateBackSidePreview();
    },

    /**
     * Set logo position
     * @param {number} x - X offset
     * @param {number} y - Y offset
     */
    setLogoPosition(x, y) {
        this.logoPosX = x;
        this.logoPosY = y;
        this.updateBackSidePreview();
    },

    /**
     * Set logo rotation
     * @param {number} rotation - Rotation in degrees
     */
    setLogoRotation(rotation) {
        this.logoRotation = rotation;
        this.updateBackSidePreview();
    },

    /**
     * Load front side logo image from file
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>}
     */
    async loadFrontLogoImage(file) {
        return new Promise((resolve, reject) => {
            // Validate file type (PNG, JPG)
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
                    this.frontLogoImage = img;
                    this.bottomText = ''; // Clear bottom text when logo is loaded
                    console.log('Front logo image loaded:', img.width, 'x', img.height);
                    this.render();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load logo image'));
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
     * Clear the front side logo image
     */
    clearFrontLogoImage() {
        this.frontLogoImage = null;
        this.frontLogoZoom = 1;
        this.frontLogoPosX = 0;
        this.frontLogoPosY = 0;
        this.frontLogoRotation = 90;
        this.render();
    },

    /**
     * Set front logo zoom level
     * @param {number} zoom - Zoom level (1 = 100%)
     */
    setFrontLogoZoom(zoom) {
        this.frontLogoZoom = zoom;
        this.render();
    },

    /**
     * Set front logo position
     * @param {number} x - X offset
     * @param {number} y - Y offset
     */
    setFrontLogoPosition(x, y) {
        this.frontLogoPosX = x;
        this.frontLogoPosY = y;
        this.render();
    },

    /**
     * Set front logo rotation
     * @param {number} rotation - Rotation in degrees
     */
    setFrontLogoRotation(rotation) {
        this.frontLogoRotation = rotation;
        this.render();
    },

    /**
     * Load a template image from file (Phase 3)
     * @param {File} file - Image file to load
     * @returns {Promise<boolean>} Success status
     */
    async loadTemplateImage(file) {
        return new Promise((resolve, reject) => {
            if (!file.type.match('image/(png|jpeg|jpg)')) {
                reject(new Error('Please upload a PNG or JPG image'));
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                reject(new Error('Image size must be less than 5MB'));
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    this.templateImage = img;
                    this.showTemplate = true;
                    console.log('Template image loaded:', img.width, 'x', img.height);
                    this.render();
                    resolve(true);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load template image'));
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
     * Clear the template image
     */
    clearTemplateImage() {
        this.templateImage = null;
        this.showTemplate = false;
        this.templateOpacity = 0.5;
        this.render();
    },

    /**
     * Set template opacity
     * @param {number} opacity - Opacity value (0-1)
     */
    setTemplateOpacity(opacity) {
        this.templateOpacity = Math.max(0, Math.min(1, opacity));
        this.render();
    },

    /**
     * Set template visibility
     * @param {boolean} visible - Whether to show the template
     */
    setTemplateVisible(visible) {
        this.showTemplate = visible;
        this.render();
    },

    /**
     * Render the template overlay on top of the canvas (Phase 3)
     * Called at the end of render() when template is visible
     */
    renderTemplateOverlay() {
        if (!this.templateImage || !this.showTemplate) {
            return;
        }

        this.ctx.save();

        // Apply opacity
        this.ctx.globalAlpha = this.templateOpacity;

        // Calculate dimensions to cover the canvas while maintaining aspect ratio
        const imgAspect = this.templateImage.width / this.templateImage.height;
        const canvasAspect = this.canvasWidth / this.canvasHeight;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (imgAspect > canvasAspect) {
            // Image is wider - fit to height
            drawHeight = this.canvasHeight;
            drawWidth = drawHeight * imgAspect;
            offsetX = (this.canvasWidth - drawWidth) / 2;
        } else {
            // Image is taller - fit to width
            drawWidth = this.canvasWidth;
            drawHeight = drawWidth / imgAspect;
            offsetY = (this.canvasHeight - drawHeight) / 2;
        }

        // Draw template overlay
        this.ctx.drawImage(
            this.templateImage,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight
        );

        this.ctx.restore();
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
     * Set QR code link and regenerate QR code
     * @param {string} link - URL for the QR code
     */
    async setQRCodeLink(link) {
        this.qrCodeLink = link;
        await this.generateQRCode();
        this.updateBackSidePreview();
    },

    /**
     * Generate QR code image from the current link using Nayuki QR Code generator
     * @returns {Promise<void>}
     */
    async generateQRCode() {
        if (!this.qrCodeLink || typeof qrcode === 'undefined') {
            this.qrCodeImage = null;
            this.qrCodeCanvas = null;
            console.warn('QR Code library not loaded or no link provided', {
                link: this.qrCodeLink,
                libraryLoaded: typeof qrcode !== 'undefined'
            });
            return;
        }

        try {
            console.log('Generating QR code for:', this.qrCodeLink, 'with text color:', this.textColor);

            // Create QR code using Nayuki library
            // Error correction level: L=1, M=0, Q=3, H=2
            const typeNumber = 0; // Auto-detect optimal type
            const errorCorrectionLevel = 'M'; // Medium error correction
            const qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(this.qrCodeLink);
            qr.make();

            // Get the module count (size of the QR code grid)
            const moduleCount = qr.getModuleCount();
            const cellSize = 8; // Size of each module in pixels
            const margin = 2; // Margin in modules
            const size = (moduleCount + margin * 2) * cellSize;

            // Create a canvas for QR code generation
            const qrCanvas = document.createElement('canvas');
            qrCanvas.width = size;
            qrCanvas.height = size;
            const ctx = qrCanvas.getContext('2d');

            // Fill background with white
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, size, size);

            // Draw QR code modules
            ctx.fillStyle = this.textColor;
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillRect(
                            (col + margin) * cellSize,
                            (row + margin) * cellSize,
                            cellSize,
                            cellSize
                        );
                    }
                }
            }

            console.log('QR canvas created, dimensions:', qrCanvas.width, 'x', qrCanvas.height, 'modules:', moduleCount);

            // Store the canvas directly for rendering
            this.qrCodeCanvas = qrCanvas;

            // Also convert canvas to image for backwards compatibility
            const img = new Image();
            img.src = qrCanvas.toDataURL('image/png');

            await new Promise((resolve, reject) => {
                img.onload = () => {
                    console.log('QR image loaded successfully, dimensions:', img.width, 'x', img.height);
                    resolve();
                };
                img.onerror = (error) => {
                    console.error('QR image failed to load:', error);
                    reject(error);
                };
            });

            this.qrCodeImage = img;
            console.log('QR Code generated successfully and stored');

            // Update back side preview
            this.updateBackSidePreview();
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            this.qrCodeImage = null;
            this.qrCodeCanvas = null;
        }
    },

    /**
     * Update back side preview canvas
     */
    updateBackSidePreview() {
        const backCanvasWrapper = document.getElementById('backCanvasWrapper');
        const backCanvas = document.getElementById('backCanvas');

        if (!backCanvasWrapper || !backCanvas) {
            console.warn('Back canvas elements not found');
            return;
        }

        // Always render the back side (even if not visible) so it's ready when needed
        console.log('Updating back side preview, QR code status:', {
            canvasExists: !!this.qrCodeCanvas,
            imageExists: !!this.qrCodeImage,
            imageComplete: this.qrCodeImage ? this.qrCodeImage.complete : false,
            enableBackSide: this.enableBackSide
        });

        // Render the back side to the preview canvas
        const backSideCanvas = this.renderBackSide();
        const backCtx = backCanvas.getContext('2d');
        backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
        backCtx.drawImage(backSideCanvas, 0, 0);
        console.log('Back side preview updated');

        if (this.enableBackSide) {
            // Show the back canvas wrapper
            backCanvasWrapper.classList.add('active');
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

        // Calculate canvas size with overflow
        const multiplier = this.showOverflowBorder ? (1 + this.overflowBorderPercent / 100) : 1;
        const renderWidth = Math.round(this.canvasWidth * multiplier);
        const renderHeight = Math.round(this.canvasHeight * multiplier);
        const offset = Math.round((renderWidth - this.canvasWidth) / 2);

        // Resize canvas if needed
        if (this.canvas.width !== renderWidth || this.canvas.height !== renderHeight) {
            this.canvas.width = renderWidth;
            this.canvas.height = renderHeight;
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
        }

        // Clear and draw gray background if overflow enabled
        this.ctx.clearRect(0, 0, renderWidth, renderHeight);
        if (this.showOverflowBorder) {
            this.ctx.fillStyle = '#D3D3D3';
            this.ctx.fillRect(0, 0, renderWidth, renderHeight);
        }

        // Create a temporary canvas for the rounded image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvasWidth;
        tempCanvas.height = this.canvasHeight;
        const tempCtx = tempCanvas.getContext('2d');

        // Calculate scaled accent width
        const scaledAccentWidth = this.accentWidth * this.scaleFactor;

        // Calculate image area (canvas width minus accent bar)
        const imageAreaWidth = this.canvasWidth - scaledAccentWidth;
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
        const scaledCornerRadius = this.cornerRadius * this.scaleFactor;
        this.ctx.save();
        this.createRoundedRect(offset, offset, this.canvasWidth, this.canvasHeight, scaledCornerRadius);
        this.ctx.clip();

        // Draw the temp canvas (with image) onto main canvas
        this.ctx.drawImage(tempCanvas, offset, offset);

        this.ctx.restore();

        // Draw centered notch on right side (only if objekt border is enabled)
        if (this.showObjektBorder) {
            this.ctx.save();
            const scaledNotchHeight = this.notchHeight * this.scaleFactor;
            const accentX = offset + this.canvasWidth - scaledAccentWidth;

            // Calculate vertical centering
            const notchY = offset + (this.canvasHeight - scaledNotchHeight) / 2;
            const notchRadius = 20 * this.scaleFactor; // Radius for the notch rounded corners (left side only)

            // Create path for centered notch with rounded corners only on left side
            this.ctx.beginPath();
            this.ctx.moveTo(accentX, notchY + notchRadius);
            this.ctx.arcTo(accentX, notchY, accentX + notchRadius, notchY, notchRadius);
            this.ctx.lineTo(offset + this.canvasWidth, notchY); // Straight line to top-right (no rounding)
            this.ctx.lineTo(offset + this.canvasWidth, notchY + scaledNotchHeight); // Straight line down the right edge
            this.ctx.lineTo(accentX + notchRadius, notchY + scaledNotchHeight);
            this.ctx.arcTo(accentX, notchY + scaledNotchHeight, accentX, notchY + scaledNotchHeight - notchRadius, notchRadius);
            this.ctx.closePath();

            // If border image is set, use it; otherwise use color
            if (this.borderImage) {
                // Clip and draw the border image
                this.ctx.clip();

                // Calculate dimensions to cover the notch area (zoom to fill, don't stretch)
                const notchAspect = scaledAccentWidth / scaledNotchHeight;
                const imgAspect = this.borderImage.width / this.borderImage.height;

                let drawWidth, drawHeight;
                let offsetX = 0, offsetY = 0;

                if (imgAspect > notchAspect) {
                    // Image is wider - fit to height and crop sides
                    drawHeight = scaledNotchHeight;
                    drawWidth = drawHeight * imgAspect;
                    offsetX = (scaledAccentWidth - drawWidth) / 2;
                } else {
                    // Image is taller - fit to width and crop top/bottom
                    drawWidth = scaledAccentWidth;
                    drawHeight = drawWidth / imgAspect;
                    offsetY = (scaledNotchHeight - drawHeight) / 2;
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
        }

        // Draw front side logo if present
        if (this.frontLogoImage) {
            // Position logo inside the main image area
            // When objekt border is on, exclude the notch area; when off, use full canvas width
            const scaledAccentWidth = this.accentWidth * this.scaleFactor;
            const imageAreaWidth = this.showObjektBorder ? this.canvasWidth - scaledAccentWidth : this.canvasWidth;
            const centerX = offset + imageAreaWidth / 2;
            const centerY = offset + this.canvasHeight / 2;
            this.drawFrontLogo(this.ctx, centerX, centerY);
        }

        // Draw template overlay on top (Phase 3) - only for preview, not export
        this.renderTemplateOverlay();
    },

    /**
     * Draw front side logo image
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    drawFrontLogo(ctx, x, y) {
        ctx.save();

        // If a front logo image is uploaded, use it
        if (this.frontLogoImage) {
            const baseWidth = 100 * this.scaleFactor; // Base width for front logo at 100% zoom (scaled)
            const baseHeight = 100 * this.scaleFactor; // Base height for front logo at 100% zoom (scaled)

            // Calculate dimensions to fit logo while maintaining aspect ratio
            const imgAspect = this.frontLogoImage.width / this.frontLogoImage.height;
            let drawWidth, drawHeight;

            if (imgAspect > baseWidth / baseHeight) {
                // Image is wider - fit to width
                drawWidth = baseWidth;
                drawHeight = drawWidth / imgAspect;
            } else {
                // Image is taller - fit to height
                drawHeight = baseHeight;
                drawWidth = drawHeight * imgAspect;
            }

            // Apply zoom
            drawWidth *= this.frontLogoZoom;
            drawHeight *= this.frontLogoZoom;

            // Center the logo
            const drawX = x - drawWidth / 2;
            const drawY = y - drawHeight / 2;

            // Apply position offsets (base position + slider offset), scaled
            const finalX = drawX + (this.frontLogoBaseX * this.scaleFactor) + this.frontLogoPosX;
            const finalY = drawY + (this.frontLogoBaseY * this.scaleFactor) + this.frontLogoPosY;

            // Translate to center, rotate, translate back to draw position
            ctx.translate(finalX + drawWidth / 2, finalY + drawHeight / 2);
            ctx.rotate((this.frontLogoRotation * Math.PI) / 180);
            ctx.translate(-(finalX + drawWidth / 2), -(finalY + drawHeight / 2));

            // Draw the logo image
            ctx.drawImage(this.frontLogoImage, finalX, finalY, drawWidth, drawHeight);
        }

        ctx.restore();
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

        const multiplier = this.showOverflowBorder ? (1 + this.overflowBorderPercent / 100) : 1;
        const renderWidth = Math.round(this.canvasWidth * multiplier);
        const offset = Math.round((renderWidth - this.canvasWidth) / 2);

        const scaledAccentWidth = this.accentWidth * this.scaleFactor;
        const accentX = offset + this.canvasWidth - scaledAccentWidth;
        const centerX = accentX + scaledAccentWidth / 2;

        // Set text properties
        this.ctx.fillStyle = this.textColor;
        const scaledFontSize = 40.90875 * this.scaleFactor;
        this.ctx.font = `600 ${scaledFontSize}px "Helvetica Neue", sans-serif`;

        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';

        // Draw top text (rotated 90° counterclockwise + 180° flip) - SeoYeon with reduced letter spacing
        this.ctx.save();
        const scaledTopLetterSpacing = -2.045 * this.scaleFactor;
        this.ctx.letterSpacing = `${scaledTopLetterSpacing}px`;
        const scaledTopY = offset + 104 * this.scaleFactor;
        this.ctx.translate(centerX, scaledTopY + this.topTextHeight);
        this.ctx.rotate(-Math.PI / 2 + Math.PI);
        this.ctx.fillText(this.topText, 0, 0);
        this.ctx.restore();

        // Draw middle text (rotated 90° counterclockwise + 180° flip) - 100A with reduced letter spacing
        this.ctx.save();
        const scaledMiddleFontSize = 45 * this.scaleFactor;
        this.ctx.font = `550 ${scaledMiddleFontSize}px "SF Pro Display", sans-serif`;
        const scaledMiddleLetterSpacing = -1.975 * this.scaleFactor;
        this.ctx.letterSpacing = `${scaledMiddleLetterSpacing}px`;
        this.ctx.translate(centerX, offset + this.canvasHeight / 2.25 + this.middleTextHeight);
        this.ctx.rotate(-Math.PI / 2 + Math.PI);
        this.ctx.fillText(this.middleText, 0, 0);
        this.ctx.restore();

        // Draw bottom text (rotated 90° clockwise) - tripleS with increased letter spacing
        this.ctx.save();

        // Calculate notch boundaries for bottom text positioning
        const scaledNotchHeight = this.notchHeight * this.scaleFactor;
        const notchY = offset + (this.canvasHeight - scaledNotchHeight) / 2;
        const notchBottom = notchY + scaledNotchHeight;
        const scaledDefaultBottomY = offset + this.canvasHeight - (227 * this.scaleFactor);

        // Measure text width to determine if it needs adjustment
        let textWidth = 0;
        const baseSpacing = -1.0973 * this.scaleFactor;

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
        const bottomMargin = 20 * this.scaleFactor; // Padding from the bottom edge of the notch
        let bottomTextY = scaledDefaultBottomY;
        const textEnd = scaledDefaultBottomY + textWidth; // After rotation, text extends upward (positive direction)

        if (textEnd > notchBottom - bottomMargin) {
            // Text overflows - align to right edge of notch with margin
            bottomTextY = notchBottom - textWidth - bottomMargin;
        }

        this.ctx.translate(centerX, bottomTextY + this.bottomTextHeight);
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
        const scaledCornerRadius = this.cornerRadius * this.scaleFactor;
        backCtx.save();
        this.createRoundedRectOnContext(backCtx, 0, 0, this.canvasWidth, this.canvasHeight, scaledCornerRadius);
        backCtx.fillStyle = '#FFFFFF'; // White background
        backCtx.fill();
        backCtx.restore();

        // Draw yellow rectangle with corner rounding
        // Width calculation: white background decreased by 16.22%, so yellow box expands
        // Original white width: accentWidth (82.61793)
        // New white width: accentWidth * (1 - 0.1622) = accentWidth * 0.8378
        const scaledAccentWidth = this.accentWidth * this.scaleFactor;
        const whiteBackgroundWidth = scaledAccentWidth * 0.8378;
        const rectWidth = this.canvasWidth - whiteBackgroundWidth;

        // Height calculation: top and bottom white parts decreased by 15.625%
        // Original top/bottom white height: accentWidth (82.61793)
        // New top/bottom white height: accentWidth * (1 - 0.15625) = accentWidth * 0.84375
        const whiteBackgroundHeight = scaledAccentWidth * 0.84375;
        const rectHeight = this.canvasHeight - (2 * whiteBackgroundHeight);

        const rectX = 0;
        const rectY = whiteBackgroundHeight;
        const rectRadius = 26 * this.scaleFactor; // Corner radius for the info block (scaled)

        backCtx.save();
        // Draw content panel with rounded corners only on right side (top-right and bottom-right)
        this.createPartiallyRoundedRect(backCtx, rectX, rectY, rectWidth, rectHeight, rectRadius);

        // If border image is set, use it; otherwise use color (same as front side)
        if (this.borderImage) {
            // Clip and draw the border image
            backCtx.clip();

            // Calculate dimensions to cover the info block area (zoom to fill, don't stretch)
            const blockAspect = rectWidth / rectHeight;
            const imgAspect = this.borderImage.width / this.borderImage.height;

            let drawWidth, drawHeight;
            let offsetX = 0, offsetY = 0;

            if (imgAspect > blockAspect) {
                // Image is wider - fit to height and crop sides
                drawHeight = rectHeight;
                drawWidth = drawHeight * imgAspect;
                offsetX = (rectWidth - drawWidth) / 2;
            } else {
                // Image is taller - fit to width and crop top/bottom
                drawWidth = rectWidth;
                drawHeight = drawWidth / imgAspect;
                offsetY = (rectHeight - drawHeight) / 2;
            }

            // Draw the border image to cover the info block area
            backCtx.drawImage(
                this.borderImage,
                rectX + offsetX,
                rectY + offsetY,
                drawWidth,
                drawHeight
            );
        } else {
            // Use solid color
            backCtx.fillStyle = this.accentColor; // Yellow color (inherits from front)
            backCtx.fill();
        }

        backCtx.restore();

        // Draw top logo if present, otherwise draw filled hexagonal cube logo at top left
        if (this.topLogoImage) {
            this.drawTopLogo(backCtx, this.topLogoBaseX * this.scaleFactor, this.topLogoBaseY * this.scaleFactor);
        } else {
            this.drawFilledHexCubeIcon(backCtx, 47 * this.scaleFactor, 110 * this.scaleFactor);
        }

        // Draw the text content on the left side
        backCtx.fillStyle = this.textColor;
        backCtx.textAlign = 'left';
        backCtx.textBaseline = 'top';

        const leftMargin = 47 * this.scaleFactor;

        // Calculate divider positions based on info block proportions
        // Info block is 100 units tall, dividers at: 17.5, 32.5, 47.5, 62.5, 83.5
        const divider1Y = rectY + (rectHeight * 0.175); // 17.5 units
        const divider2Y = rectY + (rectHeight * 0.325); // 32.5 units
        const divider3Y = rectY + (rectHeight * 0.475); // 47.5 units
        const divider4Y = rectY + (rectHeight * 0.625); // 62.5 units
        const divider5Y = rectY + (rectHeight * 0.835); // 83.5 units

        // Calculate white square position and size for divider line endpoint
        const squareSize = divider5Y - divider4Y;
        const whiteBoxX = rectX + (rectWidth * 0.52);
        const whiteBoxRightEdge = whiteBoxX + squareSize;

        // Draw horizontal divider line 1 (1px solid line)
        backCtx.fillRect(leftMargin, divider1Y, whiteBoxRightEdge - leftMargin, 1);

        // NAME section
        const scaledLabelFontSize = 29.828 * this.scaleFactor;
        backCtx.font = `400 ${scaledLabelFontSize}px "Helvetica Neue", sans-serif`;
        backCtx.letterSpacing = '0px';
        backCtx.fillText(this.backNameLabel, leftMargin, divider1Y + (10 * this.scaleFactor));

        const scaledValueFontSize = 88 * this.scaleFactor;
        backCtx.font = `500 ${scaledValueFontSize}px "Neue Helvetica Georgian 65 Medium", "Helvetica Neue", sans-serif`;
        const scaledLetterSpacing = -1 * this.scaleFactor;
        backCtx.letterSpacing = `${scaledLetterSpacing}px`;
        // Use stroke to make it slightly thicker than 500 but thinner than 600
        backCtx.strokeStyle = this.textColor;
        backCtx.lineWidth = 2 * this.scaleFactor;
        backCtx.strokeText(this.backNameValue, leftMargin, divider1Y + (58 * this.scaleFactor));
        backCtx.fillStyle = this.textColor;
        backCtx.fillText(this.backNameValue, leftMargin, divider1Y + (58 * this.scaleFactor));

        // Horizontal divider 2 (1px solid line)
        backCtx.fillRect(leftMargin, divider2Y, whiteBoxRightEdge - leftMargin, 1);

        // CLASS section
        backCtx.font = `400 ${scaledLabelFontSize}px "Helvetica Neue", sans-serif`;
        backCtx.letterSpacing = '0px';
        backCtx.fillText(this.backClassLabel, leftMargin, divider2Y + (10 * this.scaleFactor));

        backCtx.font = `500 ${scaledValueFontSize}px "Neue Helvetica Georgian 65 Medium", "Helvetica Neue", sans-serif`;
        const scaledClassLetterSpacing = -1.67 * this.scaleFactor;
        backCtx.letterSpacing = `${scaledClassLetterSpacing}px`;
        // Use stroke to make it slightly thicker than 500 but thinner than 600
        backCtx.strokeStyle = this.textColor;
        backCtx.lineWidth = 2 * this.scaleFactor;
        backCtx.strokeText(this.backClassValue, leftMargin, divider2Y + (58 * this.scaleFactor));
        backCtx.fillStyle = this.textColor;
        backCtx.fillText(this.backClassValue, leftMargin, divider2Y + (58 * this.scaleFactor));

        // Horizontal divider 3 (1px solid line)
        backCtx.fillRect(leftMargin, divider3Y, whiteBoxRightEdge - leftMargin, 1);

        // SEASON section
        backCtx.font = `400 ${scaledLabelFontSize}px "Helvetica Neue", sans-serif`;
        backCtx.letterSpacing = '0px';
        backCtx.fillText(this.backSeasonLabel, leftMargin, divider3Y + (10 * this.scaleFactor));

        // Draw SEASON value with special handling for outline "02"
        this.drawSeasonTextWithOutline(backCtx, this.backSeasonValue, leftMargin, divider3Y + (56 * this.scaleFactor));

        // Horizontal divider 4 (1px solid line)
        backCtx.fillRect(leftMargin, divider4Y, whiteBoxRightEdge - leftMargin, 1);

        // Draw signature on the left side of the lower area
        const signatureWidth = 220;
        const signatureHeight = squareSize;
        const signatureX = leftMargin + 30;
        const signatureY = divider4Y + (squareSize - signatureHeight) / 2;
        this.drawSignature(backCtx, signatureX, signatureY, signatureWidth, signatureHeight);

        // Draw white square (whiteBoxX and squareSize already calculated above)
        const whiteBoxY = divider4Y;
        backCtx.fillStyle = '#FFFFFF';
        backCtx.fillRect(whiteBoxX, whiteBoxY, squareSize, squareSize);

        // Add black border to white square (1px like divider lines)
        backCtx.strokeStyle = this.textColor;
        backCtx.lineWidth = 1;
        backCtx.strokeRect(whiteBoxX, whiteBoxY, squareSize, squareSize);

        // Draw QR code inside the white square
        // Prioritize qrCodeCanvas as it's more reliable than the image
        const qrSource = this.qrCodeCanvas || this.qrCodeImage;

        if (qrSource && (this.qrCodeCanvas || (this.qrCodeImage && this.qrCodeImage.complete))) {
            // Save context state before drawing QR code
            backCtx.save();

            // Set important rendering properties to ensure QR code is visible
            backCtx.globalAlpha = 1.0; // Force full opacity
            backCtx.globalCompositeOperation = 'source-over'; // Ensure normal blending

            // Add padding inside the white box for the QR code (reduced to 5% for thinner border)
            const qrPadding = squareSize * 0.05; // 5% padding (half of previous 10%)
            const qrSize = squareSize - (qrPadding * 2);
            const qrX = whiteBoxX + qrPadding;
            const qrY = whiteBoxY + qrPadding;

            // Draw QR code with high quality settings
            backCtx.imageSmoothingEnabled = false; // Disable smoothing for crisp QR code
            backCtx.drawImage(qrSource, qrX, qrY, qrSize, qrSize);

            // Restore context state
            backCtx.restore();
        }

        // Horizontal divider 5 at bottom (1px solid line)
        backCtx.fillStyle = this.textColor;
        backCtx.fillRect(leftMargin, divider5Y, whiteBoxRightEdge - leftMargin, 1);

        // Draw rotated text on the sides
        backCtx.save();
        // Position text at the right edge of the yellow info block
        const scaledAccentWidth2 = this.accentWidth * this.scaleFactor;
        const whiteBackgroundWidth2 = scaledAccentWidth2 * 0.8378;
        const rectWidth2 = this.canvasWidth - whiteBackgroundWidth2;
        const rectY2 = scaledAccentWidth2 * 0.84375;
        const rectHeight2 = this.canvasHeight - (2 * rectY2);
        const rightGap = rectWidth2 * 0.04; // 4% of info block width from right edge
        const textX = rectWidth2 - rightGap - (18 * this.scaleFactor);
        const topGap = rectHeight2 * 0.04; // 4% of info block height from top edge
        const bottomGap = 30 * this.scaleFactor; // Gap from bottom of info block

        // Draw "SeoYeon" (name) - aligned to top corner of info block
        const scaledRotatedFontSize = 41.18 * this.scaleFactor;
        backCtx.translate(textX, rectY2 + topGap - (10 * this.scaleFactor) + this.backTopTextHeight);
        backCtx.rotate(Math.PI / 2); // Rotate 90 degrees clockwise

        backCtx.fillStyle = this.textColor;
        backCtx.font = `600 ${scaledRotatedFontSize}px "Helvetica Neue", sans-serif`;
        backCtx.textAlign = 'left';
        backCtx.textBaseline = 'middle';
        const scaledRotatedLetterSpacing = -1.5 * this.scaleFactor;
        backCtx.letterSpacing = `${scaledRotatedLetterSpacing}px`;
        backCtx.fillText(this.backNameValue, 0, 0);
        backCtx.restore();

        // Draw group name text (e.g., "tripleS") - aligned to bottom corner of info block
        backCtx.save();
        backCtx.translate(textX, rectY2 + rectHeight2 - bottomGap - (135 * this.scaleFactor) + this.backBottomTextHeight);
        backCtx.rotate(Math.PI / 2); // Rotate 90 degrees clockwise

        backCtx.fillStyle = this.textColor;
        backCtx.font = `600 ${scaledRotatedFontSize}px "Helvetica Neue", sans-serif`;
        backCtx.textAlign = 'left';
        backCtx.textBaseline = 'middle';

        // Special handling for "tripleS" text with custom letter pair spacing (same as front page)
        const text = this.backGroupName;
        const baseSpacing = -1.5 * this.scaleFactor; // Base letter spacing for this text (scaled)
        const extraGap100 = Math.abs(baseSpacing); // 100% increment (doubling the gap)
        const extraGap50 = Math.abs(baseSpacing) * 0.5; // 50% increment
        const reducedGap = baseSpacing * 0.15; // 15% reduction

        // Draw each character with custom spacing
        let xOffset = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            backCtx.fillText(char, xOffset, 0);

            // Measure character width for next position
            const charWidth = backCtx.measureText(char).width;
            xOffset += charWidth + baseSpacing;

            // Special spacing adjustments only apply if text is exactly "tripleS"
            if (text === 'tripleS') {
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
        }

        backCtx.restore();

        // Draw back side logo if present
        if (this.logoImage) {
            // Position logo inside the yellow info block border
            const whiteBackgroundWidth = this.accentWidth * 0.8378;
            const rectWidth = this.canvasWidth - whiteBackgroundWidth;
            const whiteBackgroundHeight = this.accentWidth * 0.84375;
            const rectHeight = this.canvasHeight - (2 * whiteBackgroundHeight);
            const rectX = 0;
            const rectY = whiteBackgroundHeight;

            // Center the logo within the yellow info block
            const centerX = rectX + rectWidth / 2;
            const centerY = rectY + rectHeight / 2;
            this.drawLogo(backCtx, centerX, centerY);
        }

        return backCanvas;
    },

    /**
     * Draw back side logo image
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    drawLogo(ctx, x, y) {
        ctx.save();

        // If a logo image is uploaded, use it
        if (this.logoImage) {
            const baseWidth = 80 * this.scaleFactor; // Base width for logo at 100% zoom (scaled)
            const baseHeight = 80 * this.scaleFactor; // Base height for logo at 100% zoom (scaled)

            // Calculate dimensions to fit logo while maintaining aspect ratio
            const imgAspect = this.logoImage.width / this.logoImage.height;
            let drawWidth, drawHeight;

            if (imgAspect > baseWidth / baseHeight) {
                // Image is wider - fit to width
                drawWidth = baseWidth;
                drawHeight = drawWidth / imgAspect;
            } else {
                // Image is taller - fit to height
                drawHeight = baseHeight;
                drawWidth = drawHeight * imgAspect;
            }

            // Apply zoom
            drawWidth *= this.logoZoom;
            drawHeight *= this.logoZoom;

            // Center the logo
            const drawX = x - drawWidth / 2;
            const drawY = y - drawHeight / 2;

            // Apply position offsets (base position + slider offset), scaled
            const finalX = drawX + (this.logoBaseX * this.scaleFactor) + this.logoPosX;
            const finalY = drawY + (this.logoBaseY * this.scaleFactor) + this.logoPosY;

            // Translate to center, rotate, translate back to draw position
            ctx.translate(finalX + drawWidth / 2, finalY + drawHeight / 2);
            ctx.rotate((this.logoRotation * Math.PI) / 180);
            ctx.translate(-(finalX + drawWidth / 2), -(finalY + drawHeight / 2));

            // Draw the logo image
            ctx.drawImage(this.logoImage, finalX, finalY, drawWidth, drawHeight);
        }

        ctx.restore();
    },

    /**
     * Draw top logo image (replaces hex cube)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position (already scaled by caller)
     * @param {number} y - Y position (already scaled by caller)
     */
    drawTopLogo(ctx, x, y) {
        ctx.save();

        if (this.topLogoImage) {
            const baseWidth = 100 * this.scaleFactor; // Base width for top logo at 100% zoom (scaled)
            const baseHeight = 100 * this.scaleFactor; // Base height for top logo at 100% zoom (scaled)

            // Calculate dimensions to fit logo while maintaining aspect ratio
            const imgAspect = this.topLogoImage.width / this.topLogoImage.height;
            let drawWidth, drawHeight;

            if (imgAspect > baseWidth / baseHeight) {
                // Image is wider - fit to width
                drawWidth = baseWidth;
                drawHeight = drawWidth / imgAspect;
            } else {
                // Image is taller - fit to height
                drawHeight = baseHeight;
                drawWidth = drawHeight * imgAspect;
            }

            // Apply zoom
            drawWidth *= this.topLogoZoom;
            drawHeight *= this.topLogoZoom;

            // Center the logo at the base position
            const centerX = x - drawWidth / 2;
            const centerY = y - drawHeight / 2;

            // Apply position offsets (base position + slider offset)
            const finalX = centerX + this.topLogoPosX;
            const finalY = centerY + this.topLogoPosY;

            // Translate to center, rotate, translate back to draw position
            ctx.translate(finalX + drawWidth / 2, finalY + drawHeight / 2);
            ctx.rotate((this.topLogoRotation * Math.PI) / 180);
            ctx.translate(-(finalX + drawWidth / 2), -(finalY + drawHeight / 2));

            // Draw the top logo image
            ctx.drawImage(this.topLogoImage, finalX, finalY, drawWidth, drawHeight);
        }

        ctx.restore();
    },

    /**
     * Draw outlined hexagonal cube logo (matching the reference card logo)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position (already scaled by caller)
     * @param {number} y - Y position (already scaled by caller)
     */
    drawFilledHexCubeIcon(ctx, x, y) {
        const size = 100 * this.scaleFactor;
        ctx.save();
        ctx.strokeStyle = this.textColor;
        ctx.lineWidth = 3.5 * this.scaleFactor;
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
        const scaledFontSize = 88 * this.scaleFactor;
        ctx.font = `500 ${scaledFontSize}px "Neue Helvetica Georgian 65 Medium", "Helvetica Neue", sans-serif`;
        const scaledLetterSpacing = -1.67 * this.scaleFactor;
        ctx.letterSpacing = `${scaledLetterSpacing}px`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // Check if text ends with numbers (like "02")
        const numberMatch = text.match(/^([A-Za-z]+)(\d+)$/);

        if (numberMatch) {
            const textPart = numberMatch[1]; // e.g., "Atom"
            const numberPart = numberMatch[2]; // e.g., "02"

            // Draw text part with stroke + fill for slightly thicker appearance
            ctx.strokeStyle = this.textColor;
            ctx.lineWidth = 3 * this.scaleFactor;
            ctx.strokeText(textPart, x, y);
            ctx.fillStyle = this.textColor;
            ctx.fillText(textPart, x, y);

            // Measure text part width
            const textWidth = ctx.measureText(textPart).width;

            // Draw number part (outlined)
            ctx.strokeStyle = this.textColor;
            ctx.lineWidth = 2.0 * this.scaleFactor;
            ctx.strokeText(numberPart, x + textWidth - (3 * this.scaleFactor), y);
        } else {
            // If no numbers, just draw normally with stroke + fill
            ctx.strokeStyle = this.textColor;
            ctx.lineWidth = 0.5 * this.scaleFactor;
            ctx.strokeText(text, x, y);
            ctx.fillStyle = this.textColor;
            ctx.fillText(text, x, y);
        }

        ctx.restore();
    },

    /**
     * Draw signature in the signature area (left side, next to white box)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Signature X position
     * @param {number} y - Signature Y position
     * @param {number} _width - Signature area width (unused)
     * @param {number} height - Signature area height
     */
    drawSignature(ctx, x, y, _width, height) {
        ctx.save();

        // If a signature image is uploaded, use it
        if (this.signatureImage) {
            const baseWidth = 220 * this.scaleFactor; // Base width for signature at 100% zoom (scaled)
            const maxHeight = height; // Use available height as reference

            // Calculate dimensions to fit signature while maintaining aspect ratio
            const imgAspect = this.signatureImage.width / this.signatureImage.height;
            let drawWidth, drawHeight;

            if (imgAspect > baseWidth / maxHeight) {
                // Image is wider - fit to width
                drawWidth = baseWidth;
                drawHeight = drawWidth / imgAspect;
            } else {
                // Image is taller - fit to height
                drawHeight = maxHeight;
                drawWidth = drawHeight * imgAspect;
            }

            // Apply zoom
            drawWidth *= this.signatureZoom;
            drawHeight *= this.signatureZoom;

            // Center the signature vertically in the available space (before zoom)
            // This allows the signature to overflow and overlap divider lines
            // Apply position offsets
            const drawX = x + this.signaturePosX;
            const drawY = y + (height - drawHeight) / 2 + this.signaturePosY;

            // Draw the signature image with transparency preserved
            // No clipping - allow overflow
            ctx.drawImage(this.signatureImage, drawX, drawY, drawWidth, drawHeight);
        } else {
            // Draw default procedural signature
            ctx.strokeStyle = this.textColor;
            ctx.lineWidth = 2 * this.scaleFactor;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const centerY = y + height / 2;
            const scale = this.scaleFactor;

            // Draw a flowing cursive signature
            ctx.beginPath();

            // First swooping curve
            ctx.moveTo(x, centerY - 10);
            ctx.bezierCurveTo(
                x + 30, centerY - 35,
                x + 50, centerY + 20,
                x + 80, centerY - 5
            );

            // Middle flowing part
            ctx.bezierCurveTo(
                x + 110, centerY - 25,
                x + 130, centerY + 15,
                x + 160, centerY + 5
            );

            // Final tail
            ctx.bezierCurveTo(
                x + 180, centerY - 10,
                x + 200, centerY + 10,
                x + 220, centerY
            );

            ctx.stroke();

            // Add a subtle underline below the signature
            ctx.beginPath();
            ctx.moveTo(x + 10, centerY + 40);
            ctx.lineTo(x + 200, centerY + 40);
            ctx.stroke();
        }

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
     * Create partially rounded rectangle path (only top-right and bottom-right corners rounded)
     * Used for the content panel on the back side
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Width
     * @param {number} height - Height
     * @param {number} radius - Corner radius for top-right and bottom-right
     */
    createPartiallyRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        // Start at top-left (no rounding)
        ctx.moveTo(x, y);
        // Top edge to top-right corner (with rounding)
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        // Right edge to bottom-right corner (with rounding)
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        // Bottom edge to bottom-left (no rounding)
        ctx.lineTo(x, y + height);
        // Left edge back to top-left (no rounding)
        ctx.lineTo(x, y);
        ctx.closePath();
    },

    /**
     * Export canvas as downloadable image
     * @param {Array} textOverlays - Array of text overlay objects (not used anymore)
     * @param {string} format - Export format ('png' or 'jpeg')
     * @param {string} filename - Download filename (optional, will be generated based on settings)
     */
    async exportImage(textOverlays = [], format = 'png', filename = null) {
        // Temporarily hide template overlay during export (Phase 3)
        const templateWasVisible = this.showTemplate;
        if (templateWasVisible) {
            this.showTemplate = false;
            this.render(); // Re-render without template
        }

        // Generate filename based on settings if not provided
        if (!filename) {
            if (this.showObjektBorder) {
                filename = 'objekt';
            } else {
                filename = 'photocard';
            }
            // Add card size info for non-objekt sizes
            if (this.currentCardSize !== 'objekt') {
                const preset = this.cardSizePresets[this.currentCardSize];
                if (preset) {
                    filename += `-${this.currentCardSize}`;
                }
            }
        }

        let result;
        if (this.enableBackSide) {
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

            result = true;
        } else {
            result = await new Promise((resolve) => {
                this.canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${filename}.${format}`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    resolve(true);
                }, `image/${format}`, 0.95);
            });
        }

        // Restore template visibility after export (Phase 3)
        if (templateWasVisible) {
            this.showTemplate = true;
            this.render(); // Re-render with template
        }

        return result;
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
        this.signatureImage = null;
        this.signatureZoom = 1;
        this.signaturePosX = 0;
        this.signaturePosY = 0;
        this.textColor = '#000000';
        this.showObjektBorder = true; // Reset to objekt mode by default
        // Reset template overlay (Phase 3)
        this.templateImage = null;
        this.templateOpacity = 0.5;
        this.showTemplate = false;
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
    },

    /**
     * Get bounding boxes for all text areas on the front side
     * @returns {Array} Array of text bound objects with {type, x, y, width, height}
     */
    getTextBounds() {
        const bounds = [];
        const accentX = this.canvasWidth - this.accentWidth;
        const centerX = accentX + this.accentWidth / 2;
        const padding = 20; // Hit area padding

        // Top text bounds
        this.ctx.font = '600 40.90875px "Helvetica Neue", sans-serif';
        const topTextWidth = this.ctx.measureText(this.topText).width;
        const topTextY = 104 + this.topTextHeight;
        bounds.push({
            type: 'top',
            x: centerX - topTextWidth / 2 - padding,
            y: topTextY - padding,
            width: topTextWidth + padding * 2,
            height: 40.90875 + padding * 2
        });

        // Middle text bounds
        this.ctx.font = '550 45px "SF Pro Display", sans-serif';
        const middleTextWidth = this.ctx.measureText(this.middleText).width;
        const middleTextY = this.canvasHeight / 2.25 + this.middleTextHeight;
        bounds.push({
            type: 'middle',
            x: centerX - middleTextWidth / 2 - padding,
            y: middleTextY - padding,
            width: middleTextWidth + padding * 2,
            height: 45 + padding * 2
        });

        // Bottom text bounds (more complex due to rotation and positioning)
        const notchY = (this.canvasHeight - this.notchHeight) / 2;
        const notchBottom = notchY + this.notchHeight;
        const defaultBottomY = this.canvasHeight - 227;

        let textWidth = 0;
        const baseSpacing = -1.0973;

        if (this.bottomText === 'tripleS') {
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
            this.ctx.letterSpacing = '-1.0973px';
            textWidth = this.ctx.measureText(this.bottomText).width;
        }

        const bottomMargin = 20;
        let bottomTextY = defaultBottomY;
        const textEnd = defaultBottomY + textWidth;

        if (textEnd > notchBottom - bottomMargin) {
            bottomTextY = notchBottom - textWidth - bottomMargin;
        }

        bottomTextY += this.bottomTextHeight;

        bounds.push({
            type: 'bottom',
            x: centerX - padding,
            y: bottomTextY - padding,
            width: 45 + padding * 2,
            height: textWidth + padding * 2
        });

        return bounds;
    },

    /**
     * Get which text area was clicked (if any)
     * @param {number} x - Click X coordinate relative to canvas
     * @param {number} y - Click Y coordinate relative to canvas
     * @returns {string|null} Text type ('top', 'middle', 'bottom') or null
     */
    getClickedText(x, y) {
        const bounds = this.getTextBounds();

        for (const bound of bounds) {
            if (x >= bound.x && x <= bound.x + bound.width &&
                y >= bound.y && y <= bound.y + bound.height) {
                return bound.type;
            }
        }

        return null;
    },

    /**
     * Get bounding boxes for all text areas on the back side
     * @returns {Array} Array of text bound objects with {type, x, y, width, height}
     */
    getBackTextBounds() {
        const bounds = [];
        const ctx = document.createElement('canvas').getContext('2d');
        const padding = 30; // Hit area padding for easier clicking

        // Calculate dimensions used in back side rendering
        const whiteBackgroundWidth = this.accentWidth * 0.8378;
        const rectWidth = this.canvasWidth - whiteBackgroundWidth;
        const whiteBackgroundHeight = this.accentWidth * 0.84375;
        const rectHeight = this.canvasHeight - (2 * whiteBackgroundHeight);
        const rectX = 0;
        const rectY = whiteBackgroundHeight;

        const leftMargin = 47;

        // Calculate divider positions
        const divider1Y = rectY + (rectHeight * 0.175);
        const divider2Y = rectY + (rectHeight * 0.325);
        const divider3Y = rectY + (rectHeight * 0.475);
        const divider4Y = rectY + (rectHeight * 0.625);

        // NAME Label
        ctx.font = '400 29.828px "Helvetica Neue", sans-serif';
        const nameLabelWidth = ctx.measureText(this.backNameLabel).width;
        bounds.push({
            type: 'nameLabel',
            x: leftMargin - padding,
            y: divider1Y + 10 - padding,
            width: nameLabelWidth + padding * 2,
            height: 29.828 + padding * 2
        });

        // NAME Value
        ctx.font = '500 88px "Neue Helvetica Georgian 65 Medium", "Helvetica Neue", sans-serif';
        const nameValueWidth = ctx.measureText(this.backNameValue).width;
        bounds.push({
            type: 'nameValue',
            x: leftMargin - padding,
            y: divider1Y + 58 - padding,
            width: nameValueWidth + padding * 2,
            height: 88 + padding * 2
        });

        // CLASS Label
        ctx.font = '400 29.828px "Helvetica Neue", sans-serif';
        const classLabelWidth = ctx.measureText(this.backClassLabel).width;
        bounds.push({
            type: 'classLabel',
            x: leftMargin - padding,
            y: divider2Y + 10 - padding,
            width: classLabelWidth + padding * 2,
            height: 29.828 + padding * 2
        });

        // CLASS Value
        ctx.font = '500 88px "Neue Helvetica Georgian 65 Medium", "Helvetica Neue", sans-serif';
        const classValueWidth = ctx.measureText(this.backClassValue).width;
        bounds.push({
            type: 'classValue',
            x: leftMargin - padding,
            y: divider2Y + 58 - padding,
            width: classValueWidth + padding * 2,
            height: 88 + padding * 2
        });

        // SEASON Label
        ctx.font = '400 29.828px "Helvetica Neue", sans-serif';
        const seasonLabelWidth = ctx.measureText(this.backSeasonLabel).width;
        bounds.push({
            type: 'seasonLabel',
            x: leftMargin - padding,
            y: divider3Y + 10 - padding,
            width: seasonLabelWidth + padding * 2,
            height: 29.828 + padding * 2
        });

        // SEASON Value
        ctx.font = '500 88px "Neue Helvetica Georgian 65 Medium", "Helvetica Neue", sans-serif';
        const seasonValueWidth = ctx.measureText(this.backSeasonValue).width;
        bounds.push({
            type: 'seasonValue',
            x: leftMargin - padding,
            y: divider3Y + 56 - padding,
            width: seasonValueWidth + padding * 2,
            height: 88 + padding * 2
        });

        // Rotated text on the right side
        const rightGap = rectWidth * 0.04;
        const textX = rectWidth - rightGap - 18;
        const topGap = rectHeight * 0.04;

        // Top rotated text (name value) - rotated 90 degrees
        ctx.font = '600 41.18px "Helvetica Neue", sans-serif';
        const topRotatedWidth = ctx.measureText(this.backNameValue).width;
        // Since it's rotated 90 degrees, x and y are swapped for hit detection
        bounds.push({
            type: 'topRotated',
            x: textX - 41.18 / 2 - padding,
            y: rectY + topGap - 10 + this.backTopTextHeight - padding,
            width: 41.18 + padding * 2,
            height: topRotatedWidth + padding * 2
        });

        // Bottom rotated text (group name) - rotated 90 degrees
        const bottomGap = 30;
        const bottomRotatedWidth = ctx.measureText(this.backGroupName).width;
        bounds.push({
            type: 'bottomRotated',
            x: textX - 41.18 / 2 - padding,
            y: rectY + rectHeight - bottomGap - 135 + this.backBottomTextHeight - padding,
            width: 41.18 + padding * 2,
            height: bottomRotatedWidth + padding * 2
        });

        return bounds;
    },

    /**
     * Get which back side text area was clicked (if any)
     * @param {number} x - Click X coordinate relative to canvas
     * @param {number} y - Click Y coordinate relative to canvas
     * @returns {string|null} Text type or null
     */
    getClickedBackText(x, y) {
        const bounds = this.getBackTextBounds();

        for (const bound of bounds) {
            if (x >= bound.x && x <= bound.x + bound.width &&
                y >= bound.y && y <= bound.y + bound.height) {
                return bound.type;
            }
        }

        // Check QR code area
        if (this.isQRCodeAreaClicked(x, y)) {
            return 'qrcode';
        }

        // Check signature area
        if (this.isSignatureAreaClicked(x, y)) {
            return 'signature';
        }

        // Check top logo area
        if (this.isTopLogoAreaClicked(x, y)) {
            return 'toplogo';
        }

        return null;
    },

    /**
     * Check if the QR code (white box) area was clicked
     * @param {number} x - Click X coordinate relative to canvas
     * @param {number} y - Click Y coordinate relative to canvas
     * @returns {boolean} True if QR code area was clicked
     */
    isQRCodeAreaClicked(x, y) {
        // Calculate QR code area bounds (same as in renderBackSide)
        const whiteBackgroundWidth = this.accentWidth * 0.8378;
        const rectWidth = this.canvasWidth - whiteBackgroundWidth;
        const whiteBackgroundHeight = this.accentWidth * 0.84375;
        const rectHeight = this.canvasHeight - (2 * whiteBackgroundHeight);
        const rectY = whiteBackgroundHeight;

        const divider4Y = rectY + (rectHeight * 0.625);
        const divider5Y = rectY + (rectHeight * 0.835);
        const squareSize = divider5Y - divider4Y;

        const whiteBoxX = (rectWidth * 0.52);
        const whiteBoxY = divider4Y;

        // Check if click is within the white box area
        return x >= whiteBoxX && x <= whiteBoxX + squareSize &&
               y >= whiteBoxY && y <= whiteBoxY + squareSize;
    },

    /**
     * Check if the signature area was clicked
     * @param {number} x - Click X coordinate relative to canvas
     * @param {number} y - Click Y coordinate relative to canvas
     * @returns {boolean} True if signature area was clicked
     */
    isSignatureAreaClicked(x, y) {
        // Calculate signature area bounds (same as in renderBackSide)
        const whiteBackgroundWidth = this.accentWidth * 0.8378;
        const rectWidth = this.canvasWidth - whiteBackgroundWidth;
        const whiteBackgroundHeight = this.accentWidth * 0.84375;
        const rectHeight = this.canvasHeight - (2 * whiteBackgroundHeight);
        const rectY = whiteBackgroundHeight;

        const divider4Y = rectY + (rectHeight * 0.625);
        const divider5Y = rectY + (rectHeight * 0.835);
        const squareSize = divider5Y - divider4Y;

        const leftMargin = 47;
        const signatureX = leftMargin + 30;
        const signatureY = divider4Y + (squareSize - squareSize) / 2;
        const signatureWidth = 220;
        const signatureHeight = squareSize;

        // Generous padding for easier clicking
        const padding = 20;

        return x >= signatureX - padding && x <= signatureX + signatureWidth + padding &&
               y >= signatureY - padding && y <= signatureY + signatureHeight + padding;
    },

    /**
     * Check if the top logo area was clicked
     * @param {number} x - Click X coordinate relative to canvas
     * @param {number} y - Click Y coordinate relative to canvas
     * @returns {boolean} True if top logo area was clicked
     */
    isTopLogoAreaClicked(x, y) {
        // Calculate top logo area bounds (same as hex cube position)
        const logoX = this.topLogoBaseX;
        const logoY = this.topLogoBaseY;
        const logoSize = 100; // Base size of the logo/hex cube area
        const padding = 20; // Generous padding for easier clicking

        return x >= logoX - padding && x <= logoX + logoSize + padding &&
               y >= logoY - padding && y <= logoY + logoSize + padding;
    }
};

// Export to global scope for browser usage
window.CanvasManager = CanvasManager;

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasManager;
}
