/**
 * ui.js
 * Handles all UI interactions, DOM manipulation, and user controls
 */

const UIManager = {
    elements: {},
    textOverlays: [],
    draggedElement: null,
    dragOffset: { x: 0, y: 0 },

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
            textOverlaysContainer: document.getElementById('textOverlays'),

            // Frame controls
            frameGrid: document.getElementById('frameGrid'),
            frameColor: document.getElementById('frameColor'),

            // Text controls
            textInput: document.getElementById('textInput'),
            textColor: document.getElementById('textColor'),
            fontSize: document.getElementById('fontSize'),
            addTextBtn: document.getElementById('addTextBtn'),

            // Adjustment controls
            zoomSlider: document.getElementById('zoomSlider'),
            zoomValue: document.getElementById('zoomValue'),
            rotationSlider: document.getElementById('rotationSlider'),
            rotationValue: document.getElementById('rotationValue'),

            // Action buttons
            exportBtn: document.getElementById('exportBtn'),
            resetBtn: document.getElementById('resetBtn')
        };

        this.bindEvents();
        this.loadFrameOptions();
        this.loadSavedSettings();

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

        // Frame color
        this.elements.frameColor.addEventListener('input', (e) => {
            CanvasManager.setFrameColor(e.target.value);
            localStorage.setItem('frameColor', e.target.value);
        });

        // Text controls
        this.elements.addTextBtn.addEventListener('click', () => this.addTextOverlay());
        this.elements.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTextOverlay();
        });

        // Adjustment controls
        this.elements.zoomSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.zoomValue.textContent = `${value}%`;
            CanvasManager.setZoom(value / 100);
        });

        this.elements.rotationSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.rotationValue.textContent = `${value}°`;
            CanvasManager.setRotation(parseInt(value));
        });

        // Action buttons
        this.elements.exportBtn.addEventListener('click', () => this.exportPhotocard());
        this.elements.resetBtn.addEventListener('click', () => this.resetAll());
    },

    /**
     * Load frame options into the grid
     */
    async loadFrameOptions() {
        const borders = BorderManager.getAllBorders();

        this.elements.frameGrid.innerHTML = '';

        borders.forEach((border, index) => {
            const frameOption = document.createElement('div');
            frameOption.className = 'frame-option';
            frameOption.dataset.borderId = border.id;
            frameOption.innerHTML = border.emoji || '◻️';
            frameOption.title = border.name;

            // Set first border as active by default
            if (index === 0 || border.id === BorderManager.getCurrentBorder()?.id) {
                frameOption.classList.add('active');
            }

            frameOption.addEventListener('click', () => {
                // Remove active class from all options
                document.querySelectorAll('.frame-option').forEach(el => {
                    el.classList.remove('active');
                });

                // Add active class to clicked option
                frameOption.classList.add('active');

                // Set border
                BorderManager.setBorder(border.id);
                CanvasManager.render();
            });

            this.elements.frameGrid.appendChild(frameOption);
        });
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
     * Add draggable text overlay
     */
    addTextOverlay() {
        const text = this.elements.textInput.value.trim();
        if (!text) {
            this.showErrorMessage('Please enter some text');
            return;
        }

        if (!CanvasManager.hasImage()) {
            this.showErrorMessage('Please upload an image first');
            return;
        }

        const color = this.elements.textColor.value;
        const fontSize = parseInt(this.elements.fontSize.value);

        // Create text overlay element
        const overlay = document.createElement('div');
        overlay.className = 'text-overlay';
        overlay.style.color = color;
        overlay.style.fontSize = `${fontSize}px`;
        overlay.style.left = '50%';
        overlay.style.top = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.textContent = text;

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'text-overlay-delete';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeTextOverlay(overlay);
        });
        overlay.appendChild(deleteBtn);

        // Store overlay data
        const overlayData = {
            element: overlay,
            text: text,
            color: color,
            fontSize: fontSize,
            x: 0,
            y: 0
        };

        this.textOverlays.push(overlayData);

        // Make draggable
        this.makeDraggable(overlay, overlayData);

        this.elements.textOverlaysContainer.appendChild(overlay);
        this.elements.textInput.value = '';

        console.log('Text overlay added:', text);
    },

    /**
     * Make element draggable
     */
    makeDraggable(element, overlayData) {
        element.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('text-overlay-delete')) return;

            this.draggedElement = element;
            element.classList.add('dragging');

            const rect = element.getBoundingClientRect();
            const containerRect = this.elements.textOverlaysContainer.getBoundingClientRect();

            this.dragOffset.x = e.clientX - rect.left;
            this.dragOffset.y = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.draggedElement !== element) return;

            const containerRect = this.elements.textOverlaysContainer.getBoundingClientRect();
            let x = e.clientX - containerRect.left - this.dragOffset.x;
            let y = e.clientY - containerRect.top - this.dragOffset.y;

            // Keep within bounds
            x = Math.max(0, Math.min(x, containerRect.width - element.offsetWidth));
            y = Math.max(0, Math.min(y, containerRect.height - element.offsetHeight));

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.style.transform = 'none';

            // Update overlay data for export
            overlayData.x = x;
            overlayData.y = y;
        });

        document.addEventListener('mouseup', () => {
            if (this.draggedElement === element) {
                element.classList.remove('dragging');
                this.draggedElement = null;
            }
        });
    },

    /**
     * Remove text overlay
     */
    removeTextOverlay(element) {
        const index = this.textOverlays.findIndex(overlay => overlay.element === element);
        if (index > -1) {
            this.textOverlays.splice(index, 1);
            element.remove();
            console.log('Text overlay removed');
        }
    },

    /**
     * Export photocard as image
     */
    async exportPhotocard() {
        if (!CanvasManager.hasImage()) {
            this.showErrorMessage('Please upload an image first');
            return;
        }

        try {
            // Prepare text overlays for export
            const textOverlaysForExport = this.textOverlays.map(overlay => ({
                text: overlay.text,
                x: overlay.x,
                y: overlay.y,
                color: overlay.color,
                fontSize: overlay.fontSize
            }));

            await CanvasManager.exportImage(textOverlaysForExport, 'png', 'photocard');
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

        // Remove all text overlays
        this.textOverlays = [];
        this.elements.textOverlaysContainer.innerHTML = '';

        // Reset controls
        this.elements.zoomSlider.value = 100;
        this.elements.zoomValue.textContent = '100%';
        this.elements.rotationSlider.value = 0;
        this.elements.rotationValue.textContent = '0°';
        this.elements.textInput.value = '';
        this.elements.imageUpload.value = '';

        // Hide canvas
        this.hideCanvas();

        console.log('All reset');
    },

    /**
     * Load saved settings from localStorage
     */
    loadSavedSettings() {
        const savedColor = localStorage.getItem('frameColor');
        if (savedColor) {
            this.elements.frameColor.value = savedColor;
        }
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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}
