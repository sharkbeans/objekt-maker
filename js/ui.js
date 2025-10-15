/**
 * ui.js
 * Handles all UI interactions, DOM manipulation, and user controls
 */

const UIManager = {
    elements: {},

    /**
     * Initialize UI manager and bind all event listeners
     */
    init() {
        // Cache DOM elements
        this.elements = {
            // Upload
            uploadArea: document.getElementById('uploadArea'),
            imageUpload: document.getElementById('imageUpload'),

            // Canvas
            canvasWrapper: document.getElementById('canvasWrapper'),
            canvasPlaceholder: document.getElementById('canvasPlaceholder'),

            // Adjustment controls
            zoomSlider: document.getElementById('zoomSlider'),
            zoomValue: document.getElementById('zoomValue'),
            panXSlider: document.getElementById('panXSlider'),
            panXValue: document.getElementById('panXValue'),
            panYSlider: document.getElementById('panYSlider'),
            panYValue: document.getElementById('panYValue'),

            // Border color controls
            borderColorPicker: document.getElementById('borderColorPicker'),
            borderColorHex: document.getElementById('borderColorHex'),
            presetColors: document.querySelectorAll('.preset-color'),

            // Border image controls
            borderImageUpload: document.getElementById('borderImageUpload'),
            clearBorderImage: document.getElementById('clearBorderImage'),

            // Text controls
            topText: document.getElementById('topText'),
            middleText: document.getElementById('middleText'),
            bottomText: document.getElementById('bottomText'),
            textColorPicker: document.getElementById('textColorPicker'),
            textColorHex: document.getElementById('textColorHex'),
            presetColorsText: document.querySelectorAll('.preset-color-text'),

            // Action buttons
            exportBtn: document.getElementById('exportBtn'),
            resetBtn: document.getElementById('resetBtn')
        };

        this.bindEvents();

        console.log('UI Manager initialized');
    },

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Upload events
        this.elements.imageUpload.addEventListener('change', (e) => this.handleImageUpload(e));
        this.elements.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.elements.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.elements.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

        // Adjustment controls
        this.elements.zoomSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.zoomValue.textContent = `${value}%`;
            CanvasManager.setZoom(value / 100);
        });

        this.elements.panXSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.panXValue.textContent = `${value}px`;
            CanvasManager.setPan(parseInt(value), CanvasManager.imagePosY);
        });

        this.elements.panYSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.panYValue.textContent = `${value}px`;
            CanvasManager.setPan(CanvasManager.imagePosX, parseInt(value));
        });

        // Border color controls
        this.elements.borderColorPicker.addEventListener('input', (e) => {
            const color = e.target.value.toUpperCase();
            this.elements.borderColorHex.value = color;
            CanvasManager.setBorderColor(color);
        });

        this.elements.borderColorHex.addEventListener('input', (e) => {
            let color = e.target.value.trim();

            // Validate hex color format
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                color = color.toUpperCase();
                this.elements.borderColorPicker.value = color;
                CanvasManager.setBorderColor(color);
            }
        });

        // Preset color buttons
        this.elements.presetColors.forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.elements.borderColorPicker.value = color;
                this.elements.borderColorHex.value = color;
                CanvasManager.setBorderColor(color);
            });
        });

        // Border image upload
        this.elements.borderImageUpload.addEventListener('change', (e) => this.handleBorderImageUpload(e));
        this.elements.clearBorderImage.addEventListener('click', () => this.clearBorderImage());

        // Text controls
        this.elements.topText.addEventListener('input', (e) => {
            CanvasManager.setText(e.target.value, undefined, undefined);
        });

        this.elements.middleText.addEventListener('input', (e) => {
            CanvasManager.setText(undefined, e.target.value, undefined);
        });

        this.elements.bottomText.addEventListener('input', (e) => {
            CanvasManager.setText(undefined, undefined, e.target.value);
        });

        // Text color controls
        this.elements.textColorPicker.addEventListener('input', (e) => {
            const color = e.target.value.toUpperCase();
            this.elements.textColorHex.value = color;
            CanvasManager.setTextColor(color);
        });

        this.elements.textColorHex.addEventListener('input', (e) => {
            let color = e.target.value.trim();

            // Validate hex color format
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                color = color.toUpperCase();
                this.elements.textColorPicker.value = color;
                CanvasManager.setTextColor(color);
            }
        });

        // Preset text color buttons
        this.elements.presetColorsText.forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.elements.textColorPicker.value = color;
                this.elements.textColorHex.value = color;
                CanvasManager.setTextColor(color);
            });
        });

        // Action buttons
        this.elements.exportBtn.addEventListener('click', () => this.exportImage());
        this.elements.resetBtn.addEventListener('click', () => this.resetAll());
    },

    /**
     * Handle image file upload
     */
    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await CanvasManager.loadImage(file);
            this.showCanvas();
            this.showSuccessMessage('Image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Handle border image upload
     */
    async handleBorderImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await CanvasManager.loadBorderImage(file);
            this.elements.clearBorderImage.style.display = 'block';
            this.showSuccessMessage('Border image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Clear border image
     */
    clearBorderImage() {
        CanvasManager.clearBorderImage();
        this.elements.borderImageUpload.value = '';
        this.elements.clearBorderImage.style.display = 'none';
        console.log('Border image cleared');
    },

    /**
     * Handle drag over event
     */
    handleDragOver(event) {
        event.preventDefault();
        this.elements.uploadArea.classList.add('drag-over');
    },

    /**
     * Handle drag leave event
     */
    handleDragLeave(event) {
        event.preventDefault();
        this.elements.uploadArea.classList.remove('drag-over');
    },

    /**
     * Handle file drop
     */
    async handleDrop(event) {
        event.preventDefault();
        this.elements.uploadArea.classList.remove('drag-over');

        const file = event.dataTransfer.files[0];
        if (!file) return;

        try {
            await CanvasManager.loadImage(file);
            this.showCanvas();
            this.showSuccessMessage('Image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Show canvas and hide placeholder
     */
    showCanvas() {
        this.elements.canvasWrapper.classList.add('active');
        this.elements.canvasPlaceholder.classList.add('hidden');
    },

    /**
     * Hide canvas and show placeholder
     */
    hideCanvas() {
        this.elements.canvasWrapper.classList.remove('active');
        this.elements.canvasPlaceholder.classList.remove('hidden');
    },

    /**
     * Export image
     */
    async exportImage() {
        if (!CanvasManager.hasImage()) {
            this.showErrorMessage('Please upload an image first');
            return;
        }

        try {
            await CanvasManager.exportImage([], 'png', 'photocard');
            this.showSuccessMessage('Photocard downloaded!');
        } catch (error) {
            this.showErrorMessage('Failed to export image');
            console.error(error);
        }
    },

    /**
     * Reset all settings and canvas
     */
    resetAll() {
        if (!confirm('Are you sure you want to reset everything?')) {
            return;
        }

        // Reset canvas
        CanvasManager.reset();

        // Reset controls
        this.elements.zoomSlider.value = 100;
        this.elements.zoomValue.textContent = '100%';
        this.elements.panXSlider.value = 0;
        this.elements.panXValue.textContent = '0px';
        this.elements.panYSlider.value = 0;
        this.elements.panYValue.textContent = '0px';
        this.elements.topText.value = 'SeoYeon';
        this.elements.middleText.value = '100A';
        this.elements.bottomText.value = 'tripleS';
        this.elements.imageUpload.value = '';
        this.elements.borderColorPicker.value = '#FFD400';
        this.elements.borderColorHex.value = '#FFD400';
        this.elements.borderImageUpload.value = '';
        this.elements.clearBorderImage.style.display = 'none';
        this.elements.textColorPicker.value = '#000000';
        this.elements.textColorHex.value = '#000000';

        // Hide canvas
        this.hideCanvas();

        console.log('All reset');
    },

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        // Simple console log for now - can be enhanced with toast notifications
        console.log('✓', message);
        alert(message);
    },

    /**
     * Show error message
     */
    showErrorMessage(message) {
        console.error('✗', message);
        alert(message);
    }
};

// Export to global scope for browser usage
window.UIManager = UIManager;

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}
