/**
 * ui.js
 * Handles all UI interactions, DOM manipulation, and user controls
 */

const UIManager = {
    elements: {},
    currentView: 'front', // Track current view ('front' or 'back')

    /**
     * Initialize UI manager and bind all event listeners
     */
    init() {
        // Initialize current view to null so first switch triggers animation
        this.currentView = null;
        // Cache DOM elements
        this.elements = {
            // Upload
            uploadArea: document.getElementById('uploadArea'),
            imageUpload: document.getElementById('imageUpload'),
            uploadSection: document.querySelector('.control-section:has(#uploadArea)'),

            // Canvas
            canvasContainer: document.getElementById('canvasContainer'),
            canvasWrapper: document.getElementById('canvasWrapper'),
            backCanvasWrapper: document.getElementById('backCanvasWrapper'),
            canvasPlaceholder: document.getElementById('canvasPlaceholder'),
            canvasViewToggle: document.getElementById('canvasViewToggle'),
            toggleBtns: document.querySelectorAll('.toggle-btn'),
            frontSideSection: document.getElementById('frontSideSection'),
            backSideSection: document.getElementById('backSideSection'),
            backSideSectionMobile: document.getElementById('backSideSectionMobile'),

            // Adjustment controls (desktop)
            zoomSlider: document.getElementById('zoomSlider'),
            zoomValue: document.getElementById('zoomValue'),
            panXSlider: document.getElementById('panXSlider'),
            panXValue: document.getElementById('panXValue'),
            panYSlider: document.getElementById('panYSlider'),
            panYValue: document.getElementById('panYValue'),

            // Mobile adjustment controls
            zoomSliderMobile: document.getElementById('zoomSliderMobile'),
            zoomValueMobile: document.getElementById('zoomValueMobile'),
            panXSliderMobile: document.getElementById('panXSliderMobile'),
            panXValueMobile: document.getElementById('panXValueMobile'),
            panYSliderMobile: document.getElementById('panYSliderMobile'),
            panYValueMobile: document.getElementById('panYValueMobile'),
            mobileAdjustments: document.getElementById('mobileAdjustments'),

            // Notch color controls - Dropdown selectors for category and color
            notchColorGroupSelect: document.getElementById('notchColorGroupSelect'),
            notchColorSelect: document.getElementById('notchColorSelect'),
            notchColorPicker: document.getElementById('notchColorPicker'),
            borderColorHex: document.getElementById('borderColorHex'),

            // Border image controls
            borderImageUpload: document.getElementById('borderImageUpload'),
            clearBorderImage: document.getElementById('clearBorderImage'),

            // Signature modal controls
            signatureModal: document.getElementById('signatureModal'),
            openSignatureModal: document.getElementById('openSignatureModal'),
            openSignatureModalMobile: document.getElementById('openSignatureModalMobile'),
            closeSignatureModal: document.getElementById('closeSignatureModal'),
            signatureModalDone: document.getElementById('signatureModalDone'),
            signatureImageUpload: document.getElementById('signatureImageUpload'),
            signatureZoomSlider: document.getElementById('signatureZoomSlider'),
            signatureZoomValue: document.getElementById('signatureZoomValue'),
            signaturePosXSlider: document.getElementById('signaturePosXSlider'),
            signaturePosXValue: document.getElementById('signaturePosXValue'),
            signaturePosYSlider: document.getElementById('signaturePosYSlider'),
            signaturePosYValue: document.getElementById('signaturePosYValue'),
            signatureZoomSection: document.getElementById('signatureZoomSection'),
            clearSignatureImage: document.getElementById('clearSignatureImage'),
            clearSignatureImageMobile: document.getElementById('clearSignatureImageMobile'),

            // Signature toolbar controls (desktop)
            signatureToolbarControls: document.getElementById('signatureToolbarControls'),
            signatureZoomToolbar: document.getElementById('signatureZoomToolbar'),
            signatureZoomToolbarValue: document.getElementById('signatureZoomToolbarValue'),
            signaturePosXToolbar: document.getElementById('signaturePosXToolbar'),
            signaturePosXToolbarValue: document.getElementById('signaturePosXToolbarValue'),
            signaturePosYToolbar: document.getElementById('signaturePosYToolbar'),
            signaturePosYToolbarValue: document.getElementById('signaturePosYToolbarValue'),

            // Signature toolbar controls (mobile)
            signatureToolbarControlsMobile: document.getElementById('signatureToolbarControlsMobile'),
            signatureZoomToolbarMobile: document.getElementById('signatureZoomToolbarMobile'),
            signatureZoomToolbarValueMobile: document.getElementById('signatureZoomToolbarValueMobile'),
            signaturePosXToolbarMobile: document.getElementById('signaturePosXToolbarMobile'),
            signaturePosXToolbarValueMobile: document.getElementById('signaturePosXToolbarValueMobile'),
            signaturePosYToolbarMobile: document.getElementById('signaturePosYToolbarMobile'),
            signaturePosYToolbarValueMobile: document.getElementById('signaturePosYToolbarValueMobile'),

            // Text controls
            topText: document.getElementById('topText'),
            middleText: document.getElementById('middleText'),
            bottomText: document.getElementById('bottomText'),
            textColorPicker: document.getElementById('textColorPicker'),
            textColorHex: document.getElementById('textColorHex'),
            presetColorsText: document.querySelectorAll('.preset-color-text'),

            // Text height sliders (Front - Desktop)
            topTextHeight: document.getElementById('topTextHeight'),
            topTextHeightValue: document.getElementById('topTextHeightValue'),
            middleTextHeight: document.getElementById('middleTextHeight'),
            middleTextHeightValue: document.getElementById('middleTextHeightValue'),
            bottomTextHeight: document.getElementById('bottomTextHeight'),
            bottomTextHeightValue: document.getElementById('bottomTextHeightValue'),

            // Text height sliders (Front - Mobile)
            topTextHeightMobile: document.getElementById('topTextHeightMobile'),
            topTextHeightValueMobile: document.getElementById('topTextHeightValueMobile'),
            middleTextHeightMobile: document.getElementById('middleTextHeightMobile'),
            middleTextHeightValueMobile: document.getElementById('middleTextHeightValueMobile'),
            bottomTextHeightMobile: document.getElementById('bottomTextHeightMobile'),
            bottomTextHeightValueMobile: document.getElementById('bottomTextHeightValueMobile'),

            // Action buttons
            exportBtn: document.getElementById('exportBtn'),
            resetBtn: document.getElementById('resetBtn'),
            exportBtnMobile: document.getElementById('exportBtnMobile'),
            resetBtnMobile: document.getElementById('resetBtnMobile'),

            // Back side controls (Desktop)
            notchColorGroupSelectBack: document.getElementById('notchColorGroupSelectBack'),
            notchColorSelectBack: document.getElementById('notchColorSelectBack'),
            notchColorPickerBack: document.getElementById('notchColorPickerBack'),
            borderColorHexBack: document.getElementById('borderColorHexBack'),
            borderImageUploadBack: document.getElementById('borderImageUploadBack'),
            clearBorderImageBack: document.getElementById('clearBorderImageBack'),
            textColorPickerBack: document.getElementById('textColorPickerBack'),
            textColorHexBack: document.getElementById('textColorHexBack'),
            presetColorsTextBack: document.querySelectorAll('.preset-color-text-back'),
            backNameLabel: document.getElementById('backNameLabel'),
            backNameValue: document.getElementById('backNameValue'),
            backClassLabel: document.getElementById('backClassLabel'),
            backClassValue: document.getElementById('backClassValue'),
            backSeasonLabel: document.getElementById('backSeasonLabel'),
            backSeasonValue: document.getElementById('backSeasonValue'),
            backGroupName: document.getElementById('backGroupName'),

            // Back side controls (Mobile)
            borderColorHexBackMobile: document.getElementById('borderColorHexBackMobile'),
            textColorPickerBackMobile: document.getElementById('textColorPickerBackMobile'),
            textColorHexBackMobile: document.getElementById('textColorHexBackMobile'),
            backNameLabelMobile: document.getElementById('backNameLabelMobile'),
            backNameValueMobile: document.getElementById('backNameValueMobile'),
            backClassLabelMobile: document.getElementById('backClassLabelMobile'),
            backClassValueMobile: document.getElementById('backClassValueMobile'),
            backSeasonLabelMobile: document.getElementById('backSeasonLabelMobile'),
            backSeasonValueMobile: document.getElementById('backSeasonValueMobile'),
            backGroupNameMobile: document.getElementById('backGroupNameMobile'),

            // Back side text height sliders (Desktop)
            backTopTextHeight: document.getElementById('backTopTextHeight'),
            backTopTextHeightValue: document.getElementById('backTopTextHeightValue'),
            backBottomTextHeight: document.getElementById('backBottomTextHeight'),
            backBottomTextHeightValue: document.getElementById('backBottomTextHeightValue'),

            // Back side text height sliders (Mobile - in collapsible section)
            backTopTextHeightMobile: document.getElementById('backTopTextHeightMobile'),
            backTopTextHeightValueMobile: document.getElementById('backTopTextHeightValueMobile'),
            backBottomTextHeightMobile: document.getElementById('backBottomTextHeightMobile'),
            backBottomTextHeightValueMobile: document.getElementById('backBottomTextHeightValueMobile'),

            // Back side text height sliders (Mobile - quick adjustments)
            mobileBackAdjustments: document.getElementById('mobileBackAdjustments'),
            backTopTextHeightMobileQuick: document.getElementById('backTopTextHeightMobileQuick'),
            backTopTextHeightValueMobileQuick: document.getElementById('backTopTextHeightValueMobileQuick'),
            backBottomTextHeightMobileQuick: document.getElementById('backBottomTextHeightMobileQuick'),
            backBottomTextHeightValueMobileQuick: document.getElementById('backBottomTextHeightValueMobileQuick'),

            // QR Code controls
            qrCodeLink: document.getElementById('qrCodeLink'),
            qrCodeLinkMobile: document.getElementById('qrCodeLinkMobile')
        };

        this.bindEvents();

        console.log('UI Manager initialized');
        
        // Set initial view after initialization
        this.currentView = 'front';
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

        // Adjustment controls (desktop)
        this.elements.zoomSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.zoomValue.textContent = `${value}%`;
            this.syncSliderValue('zoom', value);
            CanvasManager.setZoom(value / 100);
        });

        this.elements.panXSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.panXValue.textContent = `${value}px`;
            this.syncSliderValue('panX', value);
            CanvasManager.setPan(parseInt(value), CanvasManager.imagePosY);
        });

        this.elements.panYSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.panYValue.textContent = `${value}px`;
            this.syncSliderValue('panY', value);
            CanvasManager.setPan(CanvasManager.imagePosX, parseInt(value));
        });

        // Mobile adjustment controls
        if (this.elements.zoomSliderMobile) {
            this.elements.zoomSliderMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.zoomValueMobile.textContent = `${value}%`;
                this.syncSliderValue('zoom', value);
                CanvasManager.setZoom(value / 100);
            });
        }

        if (this.elements.panXSliderMobile) {
            this.elements.panXSliderMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.panXValueMobile.textContent = `${value}px`;
                this.syncSliderValue('panX', value);
                CanvasManager.setPan(parseInt(value), CanvasManager.imagePosY);
            });
        }

        if (this.elements.panYSliderMobile) {
            this.elements.panYSliderMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.panYValueMobile.textContent = `${value}px`;
                this.syncSliderValue('panY', value);
                CanvasManager.setPan(CanvasManager.imagePosX, parseInt(value));
            });
        }

        // Notch color dropdowns - Populate and handle selection changes
        this._initNotchColorDropdowns();

        // Color picker input for notch color
        this.elements.notchColorPicker.addEventListener('input', (e) => {
            const color = e.target.value.toUpperCase();
            // Update preview square, hex input, canvas, and sync dropdown
            this._updateColorPreview(color);
            this.elements.borderColorHex.value = color;
            CanvasManager.setBorderColor(color);
            this._syncDropdownWithColor(color);
        });

        // Hex input for notch color - Allow manual hex color entry
        this.elements.borderColorHex.addEventListener('input', (e) => {
            let color = e.target.value.trim();

            // Validate hex color format (#RRGGBB)
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                color = color.toUpperCase();
                // Update preview square, canvas, and sync dropdown
                this._updateColorPreview(color);
                CanvasManager.setBorderColor(color);
                this._syncDropdownWithColor(color);
            }
        });

        // Border image upload
        this.elements.borderImageUpload.addEventListener('change', (e) => this.handleBorderImageUpload(e));
        this.elements.clearBorderImage.addEventListener('click', () => this.clearBorderImage());

        // Signature modal controls
        if (this.elements.openSignatureModal) {
            this.elements.openSignatureModal.addEventListener('click', () => this.openSignatureModal());
        }
        if (this.elements.openSignatureModalMobile) {
            this.elements.openSignatureModalMobile.addEventListener('click', () => this.openSignatureModal());
        }
        if (this.elements.closeSignatureModal) {
            this.elements.closeSignatureModal.addEventListener('click', () => this.closeSignatureModal());
        }
        if (this.elements.signatureModalDone) {
            this.elements.signatureModalDone.addEventListener('click', () => this.closeSignatureModal());
        }
        if (this.elements.signatureImageUpload) {
            this.elements.signatureImageUpload.addEventListener('change', (e) => this.handleSignatureImageUpload(e));
        }
        if (this.elements.signatureZoomSlider) {
            this.elements.signatureZoomSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signatureZoomValue.textContent = `${value}%`;
                this.syncSignatureSliderValue('zoom', value);
                CanvasManager.setSignatureZoom(value / 100);
            });
        }
        if (this.elements.signaturePosXSlider) {
            this.elements.signaturePosXSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signaturePosXValue.textContent = `${value}px`;
                this.syncSignatureSliderValue('posX', value);
                CanvasManager.setSignaturePosition(value, CanvasManager.signaturePosY);
            });
        }
        if (this.elements.signaturePosYSlider) {
            this.elements.signaturePosYSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signaturePosYValue.textContent = `${value}px`;
                this.syncSignatureSliderValue('posY', value);
                CanvasManager.setSignaturePosition(CanvasManager.signaturePosX, value);
            });
        }
        if (this.elements.clearSignatureImage) {
            this.elements.clearSignatureImage.addEventListener('click', () => this.clearSignatureImage());
        }
        if (this.elements.clearSignatureImageMobile) {
            this.elements.clearSignatureImageMobile.addEventListener('click', () => this.clearSignatureImageMobile());
        }

        // Click backdrop to close modal
        if (this.elements.signatureModal) {
            const backdrop = this.elements.signatureModal.querySelector('.signature-modal-backdrop');
            if (backdrop) {
                backdrop.addEventListener('click', () => this.closeSignatureModal());
            }
        }

        // Signature toolbar controls (desktop)
        if (this.elements.signatureZoomToolbar) {
            this.elements.signatureZoomToolbar.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signatureZoomToolbarValue.textContent = `${value}%`;
                this.syncSignatureSliderValue('zoom', value);
                CanvasManager.setSignatureZoom(value / 100);
            });
        }
        if (this.elements.signaturePosXToolbar) {
            this.elements.signaturePosXToolbar.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signaturePosXToolbarValue.textContent = `${value}px`;
                this.syncSignatureSliderValue('posX', value);
                CanvasManager.setSignaturePosition(value, CanvasManager.signaturePosY);
            });
        }
        if (this.elements.signaturePosYToolbar) {
            this.elements.signaturePosYToolbar.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signaturePosYToolbarValue.textContent = `${value}px`;
                this.syncSignatureSliderValue('posY', value);
                CanvasManager.setSignaturePosition(CanvasManager.signaturePosX, value);
            });
        }

        // Signature toolbar controls (mobile)
        if (this.elements.signatureZoomToolbarMobile) {
            this.elements.signatureZoomToolbarMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signatureZoomToolbarValueMobile.textContent = `${value}%`;
                this.syncSignatureSliderValue('zoom', value);
                CanvasManager.setSignatureZoom(value / 100);
            });
        }
        if (this.elements.signaturePosXToolbarMobile) {
            this.elements.signaturePosXToolbarMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signaturePosXToolbarValueMobile.textContent = `${value}px`;
                this.syncSignatureSliderValue('posX', value);
                CanvasManager.setSignaturePosition(value, CanvasManager.signaturePosY);
            });
        }
        if (this.elements.signaturePosYToolbarMobile) {
            this.elements.signaturePosYToolbarMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.signaturePosYToolbarValueMobile.textContent = `${value}px`;
                this.syncSignatureSliderValue('posY', value);
                CanvasManager.setSignaturePosition(CanvasManager.signaturePosX, value);
            });
        }

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

        // Text height sliders (Front - Desktop)
        if (this.elements.topTextHeight) {
            this.elements.topTextHeight.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.topTextHeightValue.textContent = `${value}px`;
                // Sync to mobile
                if (this.elements.topTextHeightMobile) {
                    this.elements.topTextHeightMobile.value = value;
                    this.elements.topTextHeightValueMobile.textContent = `${value}px`;
                }
                CanvasManager.setTextHeight('top', parseInt(value));
            });
        }

        if (this.elements.middleTextHeight) {
            this.elements.middleTextHeight.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.middleTextHeightValue.textContent = `${value}px`;
                // Sync to mobile
                if (this.elements.middleTextHeightMobile) {
                    this.elements.middleTextHeightMobile.value = value;
                    this.elements.middleTextHeightValueMobile.textContent = `${value}px`;
                }
                CanvasManager.setTextHeight('middle', parseInt(value));
            });
        }

        if (this.elements.bottomTextHeight) {
            this.elements.bottomTextHeight.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.bottomTextHeightValue.textContent = `${value}px`;
                // Sync to mobile
                if (this.elements.bottomTextHeightMobile) {
                    this.elements.bottomTextHeightMobile.value = value;
                    this.elements.bottomTextHeightValueMobile.textContent = `${value}px`;
                }
                CanvasManager.setTextHeight('bottom', parseInt(value));
            });
        }

        // Text height sliders (Front - Mobile)
        if (this.elements.topTextHeightMobile) {
            this.elements.topTextHeightMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.topTextHeightValueMobile.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.topTextHeight) {
                    this.elements.topTextHeight.value = value;
                    this.elements.topTextHeightValue.textContent = `${value}px`;
                }
                CanvasManager.setTextHeight('top', parseInt(value));
            });
        }

        if (this.elements.middleTextHeightMobile) {
            this.elements.middleTextHeightMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.middleTextHeightValueMobile.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.middleTextHeight) {
                    this.elements.middleTextHeight.value = value;
                    this.elements.middleTextHeightValue.textContent = `${value}px`;
                }
                CanvasManager.setTextHeight('middle', parseInt(value));
            });
        }

        if (this.elements.bottomTextHeightMobile) {
            this.elements.bottomTextHeightMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.bottomTextHeightValueMobile.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.bottomTextHeight) {
                    this.elements.bottomTextHeight.value = value;
                    this.elements.bottomTextHeightValue.textContent = `${value}px`;
                }
                CanvasManager.setTextHeight('bottom', parseInt(value));
            });
        }

        // Action buttons
        this.elements.exportBtn.addEventListener('click', () => this.exportImage());
        this.elements.resetBtn.addEventListener('click', () => this.resetAll());
        this.elements.exportBtnMobile.addEventListener('click', () => this.exportImage());
        this.elements.resetBtnMobile.addEventListener('click', () => this.resetAll());

        // Mobile scroll to preview button
        if (this.elements.scrollToPreviewBtn) {
            this.elements.scrollToPreviewBtn.addEventListener('click', () => {
            this.scrollToPreview();
        });

            // Show/hide scroll button based on scroll position on mobile
            window.addEventListener('scroll', () => {
                if (window.innerWidth <= 768 && CanvasManager.hasImage()) {
                    const canvasContainer = this.elements.canvasContainer;
                    if (canvasContainer) {
                        const canvasRect = canvasContainer.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;

                        // Show button if canvas/preview is mostly out of view (user is in toolbar area)
                        // Canvas is considered "out of view" if its top is above the viewport
                        // or if less than 30% of it is visible
                        const isCanvasOutOfView = canvasRect.top < 0 && canvasRect.bottom < viewportHeight * 0.3;

                        if (isCanvasOutOfView) {
                            this.elements.scrollToPreviewBtn.style.display = 'flex';
                        } else {
                            this.elements.scrollToPreviewBtn.style.display = 'none';
                        }
                    }
                }
            });
        }

        // New mobile preview buttons in navigation
        const scrollToPreviewBtnMobile = document.getElementById('scrollToPreviewBtnMobile');
        const scrollToPreviewBtnMobileBack = document.getElementById('scrollToPreviewBtnMobileBack');
        
        if (scrollToPreviewBtnMobile) {
            scrollToPreviewBtnMobile.addEventListener('click', () => {
                this.scrollToPreview();
            });
        }
        
        if (scrollToPreviewBtnMobileBack) {
            scrollToPreviewBtnMobileBack.addEventListener('click', () => {
                this.scrollToPreview();
            });
        }

        // Canvas view toggle buttons
        this.elements.toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchCanvasView(view);
            });
        });

        // Back side color controls (Desktop)
        this._initNotchColorDropdownsBack();

        // Color picker for back side
        if (this.elements.notchColorPickerBack) {
            this.elements.notchColorPickerBack.addEventListener('input', (e) => {
                const color = e.target.value.toUpperCase();
                this._updateColorPreviewBack(color);
                this.elements.borderColorHexBack.value = color;
                CanvasManager.setBorderColor(color);
                this._syncDropdownWithColorBack(color);
                // Sync to front
                this._syncFrontColors(color, null);
            });
        }

        // Hex input for back side
        if (this.elements.borderColorHexBack) {
            this.elements.borderColorHexBack.addEventListener('input', (e) => {
                let color = e.target.value.trim();
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                    color = color.toUpperCase();
                    this._updateColorPreviewBack(color);
                    CanvasManager.setBorderColor(color);
                    this._syncDropdownWithColorBack(color);
                    // Sync to front
                    this._syncFrontColors(color, null);
                }
            });
        }

        // Border image upload for back side
        if (this.elements.borderImageUploadBack) {
            this.elements.borderImageUploadBack.addEventListener('change', (e) => this.handleBorderImageUploadBack(e));
        }
        if (this.elements.clearBorderImageBack) {
            this.elements.clearBorderImageBack.addEventListener('click', () => this.clearBorderImageBack());
        }

        // Text color controls for back side
        if (this.elements.textColorPickerBack) {
            this.elements.textColorPickerBack.addEventListener('input', (e) => {
                const color = e.target.value.toUpperCase();
                this.elements.textColorHexBack.value = color;
                CanvasManager.setTextColor(color);
                // Sync to front
                this._syncFrontColors(null, color);
            });
        }

        if (this.elements.textColorHexBack) {
            this.elements.textColorHexBack.addEventListener('input', (e) => {
                let color = e.target.value.trim();
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                    color = color.toUpperCase();
                    this.elements.textColorPickerBack.value = color;
                    CanvasManager.setTextColor(color);
                    // Sync to front
                    this._syncFrontColors(null, color);
                }
            });
        }

        // Preset text color buttons for back side
        if (this.elements.presetColorsTextBack) {
            this.elements.presetColorsTextBack.forEach(button => {
                button.addEventListener('click', (e) => {
                    const color = e.target.dataset.color;
                    this.elements.textColorPickerBack.value = color;
                    this.elements.textColorHexBack.value = color;
                    CanvasManager.setTextColor(color);
                    // Sync to front
                    this._syncFrontColors(null, color);
                });
            });
        }

        // Mobile back side color controls
        if (this.elements.borderColorHexBackMobile) {
            this.elements.borderColorHexBackMobile.addEventListener('input', (e) => {
                let color = e.target.value.trim();
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                    color = color.toUpperCase();
                    CanvasManager.setBorderColor(color);
                    // Sync to desktop back
                    if (this.elements.borderColorHexBack) this.elements.borderColorHexBack.value = color;
                    if (this.elements.notchColorPickerBack) this.elements.notchColorPickerBack.value = color;
                    // Sync to front
                    this._syncFrontColors(color, null);
                }
            });
        }

        if (this.elements.textColorPickerBackMobile) {
            this.elements.textColorPickerBackMobile.addEventListener('input', (e) => {
                const color = e.target.value.toUpperCase();
                this.elements.textColorHexBackMobile.value = color;
                CanvasManager.setTextColor(color);
                // Sync to desktop back
                if (this.elements.textColorPickerBack) this.elements.textColorPickerBack.value = color;
                if (this.elements.textColorHexBack) this.elements.textColorHexBack.value = color;
                // Sync to front
                this._syncFrontColors(null, color);
            });
        }

        if (this.elements.textColorHexBackMobile) {
            this.elements.textColorHexBackMobile.addEventListener('input', (e) => {
                let color = e.target.value.trim();
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                    color = color.toUpperCase();
                    this.elements.textColorPickerBackMobile.value = color;
                    CanvasManager.setTextColor(color);
                    // Sync to desktop back
                    if (this.elements.textColorPickerBack) this.elements.textColorPickerBack.value = color;
                    if (this.elements.textColorHexBack) this.elements.textColorHexBack.value = color;
                    // Sync to front
                    this._syncFrontColors(null, color);
                }
            });
        }

        // Back side controls (Desktop) - Direct input, no checkbox needed
        this.elements.backNameLabel.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ nameLabel: e.target.value });
            if (this.elements.backNameLabelMobile) this.elements.backNameLabelMobile.value = e.target.value;
        });

        this.elements.backNameValue.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ nameValue: e.target.value });
            if (this.elements.backNameValueMobile) this.elements.backNameValueMobile.value = e.target.value;
        });

        this.elements.backClassLabel.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ classLabel: e.target.value });
            if (this.elements.backClassLabelMobile) this.elements.backClassLabelMobile.value = e.target.value;
        });

        this.elements.backClassValue.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ classValue: e.target.value });
            if (this.elements.backClassValueMobile) this.elements.backClassValueMobile.value = e.target.value;
        });

        this.elements.backSeasonLabel.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ seasonLabel: e.target.value });
            if (this.elements.backSeasonLabelMobile) this.elements.backSeasonLabelMobile.value = e.target.value;
        });

        this.elements.backSeasonValue.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ seasonValue: e.target.value });
            if (this.elements.backSeasonValueMobile) this.elements.backSeasonValueMobile.value = e.target.value;
        });

        this.elements.backGroupName.addEventListener('input', (e) => {
            CanvasManager.setBackSideData({ groupName: e.target.value });
            if (this.elements.backGroupNameMobile) this.elements.backGroupNameMobile.value = e.target.value;
        });

        // QR Code controls (Desktop)
        if (this.elements.qrCodeLink) {
            this.elements.qrCodeLink.addEventListener('input', async (e) => {
                await CanvasManager.setQRCodeLink(e.target.value);
                if (this.elements.qrCodeLinkMobile) this.elements.qrCodeLinkMobile.value = e.target.value;
            });
        }

        // Back side controls (Mobile) - Sync to desktop (no checkbox needed)
        if (this.elements.backNameLabelMobile) {
            this.elements.backNameLabelMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ nameLabel: e.target.value });
                this.elements.backNameLabel.value = e.target.value;
            });

            this.elements.backNameValueMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ nameValue: e.target.value });
                this.elements.backNameValue.value = e.target.value;
            });

            this.elements.backClassLabelMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ classLabel: e.target.value });
                this.elements.backClassLabel.value = e.target.value;
            });

            this.elements.backClassValueMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ classValue: e.target.value });
                this.elements.backClassValue.value = e.target.value;
            });

            this.elements.backSeasonLabelMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ seasonLabel: e.target.value });
                this.elements.backSeasonLabel.value = e.target.value;
            });

            this.elements.backSeasonValueMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ seasonValue: e.target.value });
                this.elements.backSeasonValue.value = e.target.value;
            });

            this.elements.backGroupNameMobile.addEventListener('input', (e) => {
                CanvasManager.setBackSideData({ groupName: e.target.value });
                this.elements.backGroupName.value = e.target.value;
            });

            // QR Code controls (Mobile)
            if (this.elements.qrCodeLinkMobile) {
                this.elements.qrCodeLinkMobile.addEventListener('input', async (e) => {
                    await CanvasManager.setQRCodeLink(e.target.value);
                    this.elements.qrCodeLink.value = e.target.value;
                });
            }
        }

        // Back side text height sliders (Desktop)
        if (this.elements.backTopTextHeight) {
            this.elements.backTopTextHeight.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.backTopTextHeightValue.textContent = `${value}px`;
                // Sync to mobile (collapsible)
                if (this.elements.backTopTextHeightMobile) {
                    this.elements.backTopTextHeightMobile.value = value;
                    this.elements.backTopTextHeightValueMobile.textContent = `${value}px`;
                }
                // Sync to mobile (quick)
                if (this.elements.backTopTextHeightMobileQuick) {
                    this.elements.backTopTextHeightMobileQuick.value = value;
                    this.elements.backTopTextHeightValueMobileQuick.textContent = `${value}px`;
                }
                CanvasManager.setBackTextHeight('top', parseInt(value));
            });
        }

        if (this.elements.backBottomTextHeight) {
            this.elements.backBottomTextHeight.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.backBottomTextHeightValue.textContent = `${value}px`;
                // Sync to mobile (collapsible)
                if (this.elements.backBottomTextHeightMobile) {
                    this.elements.backBottomTextHeightMobile.value = value;
                    this.elements.backBottomTextHeightValueMobile.textContent = `${value}px`;
                }
                // Sync to mobile (quick)
                if (this.elements.backBottomTextHeightMobileQuick) {
                    this.elements.backBottomTextHeightMobileQuick.value = value;
                    this.elements.backBottomTextHeightValueMobileQuick.textContent = `${value}px`;
                }
                CanvasManager.setBackTextHeight('bottom', parseInt(value));
            });
        }

        // Back side text height sliders (Mobile - in collapsible section)
        if (this.elements.backTopTextHeightMobile) {
            this.elements.backTopTextHeightMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.backTopTextHeightValueMobile.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.backTopTextHeight) {
                    this.elements.backTopTextHeight.value = value;
                    this.elements.backTopTextHeightValue.textContent = `${value}px`;
                }
                // Sync to mobile quick
                if (this.elements.backTopTextHeightMobileQuick) {
                    this.elements.backTopTextHeightMobileQuick.value = value;
                    this.elements.backTopTextHeightValueMobileQuick.textContent = `${value}px`;
                }
                CanvasManager.setBackTextHeight('top', parseInt(value));
            });
        }

        if (this.elements.backBottomTextHeightMobile) {
            this.elements.backBottomTextHeightMobile.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.backBottomTextHeightValueMobile.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.backBottomTextHeight) {
                    this.elements.backBottomTextHeight.value = value;
                    this.elements.backBottomTextHeightValue.textContent = `${value}px`;
                }
                // Sync to mobile quick
                if (this.elements.backBottomTextHeightMobileQuick) {
                    this.elements.backBottomTextHeightMobileQuick.value = value;
                    this.elements.backBottomTextHeightValueMobileQuick.textContent = `${value}px`;
                }
                CanvasManager.setBackTextHeight('bottom', parseInt(value));
            });
        }

        // Back side text height sliders (Mobile - quick adjustments)
        if (this.elements.backTopTextHeightMobileQuick) {
            this.elements.backTopTextHeightMobileQuick.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.backTopTextHeightValueMobileQuick.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.backTopTextHeight) {
                    this.elements.backTopTextHeight.value = value;
                    this.elements.backTopTextHeightValue.textContent = `${value}px`;
                }
                // Sync to mobile collapsible
                if (this.elements.backTopTextHeightMobile) {
                    this.elements.backTopTextHeightMobile.value = value;
                    this.elements.backTopTextHeightValueMobile.textContent = `${value}px`;
                }
                CanvasManager.setBackTextHeight('top', parseInt(value));
            });
        }

        if (this.elements.backBottomTextHeightMobileQuick) {
            this.elements.backBottomTextHeightMobileQuick.addEventListener('input', (e) => {
                const value = e.target.value;
                this.elements.backBottomTextHeightValueMobileQuick.textContent = `${value}px`;
                // Sync to desktop
                if (this.elements.backBottomTextHeight) {
                    this.elements.backBottomTextHeight.value = value;
                    this.elements.backBottomTextHeightValue.textContent = `${value}px`;
                }
                // Sync to mobile collapsible
                if (this.elements.backBottomTextHeightMobile) {
                    this.elements.backBottomTextHeightMobile.value = value;
                    this.elements.backBottomTextHeightValueMobile.textContent = `${value}px`;
                }
                CanvasManager.setBackTextHeight('bottom', parseInt(value));
            });
        }

        // Collapsible sections functionality
        this.initCollapsibleSections();

        // Canvas text click event - for inline editing
        this.initCanvasTextEditor();
        
        // Initialize swipe gestures
        this.initSwipeGestures();
        
        // Initialize desktop navigation arrows
        this.initDesktopArrows();

    },

    /**
     * Initialize collapsible section toggle functionality
     */
    initCollapsibleSections() {
        const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

        collapsibleHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const section = this.closest('.collapsible-section');
                section.classList.toggle('collapsed');
            });
        });
    },

    /**
     * Notch color groups - Organized by category (e.g., First CLASS, Binary01, etc.)
     * Each category contains color options with title and hex/rgba color value
     */
    notchColorGroups: {
        "Atom01": [
            { "title": "FCO", "color": "#FFDD00" },
            { "title": "LoK", "color": "#2C3A53" },
            { "title": "Ancient8", "color": "#151646" },
            { "title": "DMM", "color": "#F49B4E" },
            { "title": "Ktown", "color": "#3D71B8" },
            { "title": "MMT", "color": "#39C3DB" },
            { "title": "SoundWave", "color": "#000000" },
            { "title": "Withmuu", "color": "#5E5FAB" },
            { "title": "World Cup 2022", "color": "#ED1941" },
            { "title": "Christmas 2022", "color": "#27550A" },
            { "title": "GS25", "color": "#0279BC" },
            { "title": "Lunar New Year", "color": "#E3F4F1" }
        ],
        "Binary01": [
            { "title": "FCO", "color": "#00FF00" },
            { "title": "DMM", "color": "#F49B4E" },
            { "title": "SoundWave", "color": "#000000" },
            { "title": "MMT", "color": "#39C3DB" },
            { "title": "GUESS", "color": "#000000" },
            { "title": "Objekt Trading Cafe 1.0", "color": "#2F6A9A" },
            { "title": "GS25", "color": "#0278BD" },
            { "title": "April Fools' Day", "color": "#000000" },
            { "title": "hellolive", "color": "#7D3AF5" },
            { "title": "Wonderwall", "color": "#000000" },
            { "title": "FLNK", "color": "#7D3AF5" },
            { "title": "All My Things (S8)", "color": "#F6ADCD" },
            { "title": "(S8) Objekt Trading Cafe 2.0", "color": "#3D71B8" },
            { "title": "(S1) COSMO the gate register", "color": "#8A8C8E" },
            { "title": "(S4) Urban Break", "color": "#F15D22" },
            { "title": "(S4) Everline", "color": "#DF2E37" },
            { "title": "LOVElution US Tour", "color": "#0C89FF" },
            { "title": "K4 Objekt Gaming Club", "color": "#3D71B8" },
            { "title": "(S15) Asian Games Hangzhou 2023", "color": "#F3486D" }
        ],
        "Cream01": [
            { "title": "FCO", "color": "#FF7477" },
            { "title": "MMT", "color": "#39C3DB" },
            { "title": "DMM", "color": "#F49B4E" },
            { "title": "AAA Anniversary", "color": "#000000" },
            { "title": "LOVE/EVOL promotion sale", "color": "#DF3174" },
            { "title": "EVOL Authentic tour", "color": "#BF4239" },
            { "title": "MAMA Best New Female Artist", "color": "#EED056" },
            { "title": "Christmas 2023", "color": "#C8161D" },
            { "title": "Season's Greeting 2024", "color": "#F0907A" },
            { "title": "(EVOL) Season's Greeting 2024", "color": "#FFF8EE" },
            { "title": "Badge War Season 1", "color": "#294A80" },
            { "title": "Aria promotion sale", "color": "#C8A2C8" },
            { "title": "Winter Meetup", "color": "#7282B9" },
            { "title": "Authentic Seoul", "color": "#C5D4FF" },
            { "title": "Rising Anniversary", "color": "#F9F8F2" },
            { "title": "Valentine's Day", "color": "#6D4633" },
            { "title": "GND gravity", "color": "#000000" },
            { "title": "Glow Pre-sale", "color": "#DEFAE9" },
            { "title": "Cherry Blossom", "color": "#F8E6FF" },
            { "title": "KRE Anniversary", "color": "#EDAFA6" },
            { "title": "Children's Day", "color": "#026009" }
        ],
        "Divine01": [
            { "title": "FCO", "color": "#B400FF" },
            { "title": "ASSEMBLE24 PB ver.", "color": "#0B3951" },
            { "title": "ASSEMBLE24 OMA ver.1", "color": "#C4C0BF" },
            { "title": "Offline event DCO", "color": "#A9CCED" },
            { "title": "HeartS Lightstick", "color": "#EEF3FF" },
            { "title": "GND gravity", "color": "#000000" },
            { "title": "MMT pob", "color": "#39C3DB" },
            { "title": "Fan-made Objekt", "color": "#C2FFE9" },
            { "title": "The Show 1st win", "color": "#A2F796" },
            { "title": "Badge War Season 2", "color": "#FFE67D" },
            { "title": "Everline pob", "color": "#DF2E37" },
            { "title": "Glow promotion sale", "color": "#D866A2" },
            { "title": "ASSEMBLE24 OMA ver.2", "color": "#000000" },
            { "title": "Mayu mini PB DCO sale", "color": "#03BD79" },
            { "title": "Summer Edition sale", "color": "#7899DD" },
            { "title": "LOVElution Anniversary", "color": "#FFF3EB" },
            { "title": "Women NGO sale", "color": "#D5D2FF" },
            { "title": "Hachi Gravity", "color": "#EFCBE2" },
            { "title": "VV Performante PB ver.", "color": "#0E2D6B" },
            { "title": "JiWoo Sofamon collab", "color": "#4F92FF" },
            { "title": "VV Performante OMA", "color": "#000000" },
            { "title": "Web drama (S1, S3)", "color": "#F1FFDE" },
            { "title": "EVOLution Anniversary", "color": "#EFCBE2" },
            { "title": "WAV 1st Fanclub", "color": "#8EBDD1" },
            { "title": "VV Sihyunhada collab DCO sale", "color": "#AB1A13" },
            { "title": "AAA 2nd Anniversary sale", "color": "#122C49" },
            { "title": "VV The Show 1st win", "color": "#A2F796" }
        ],
        "Ever01": [
            { "title": "FCO", "color": "#33ECFD" },
            { "title": "∞! Untitle album", "color": "#2A343C" },
            { "title": "WAV Japan 1st FanClub DCO", "color": "#9B1837" },
            { "title": "Offline event DCO", "color": "#FFFCE4" },
            { "title": "Season's Greeting 2025", "color": "#ECE3DB" },
            { "title": "K-monstar Trading Cafe in Taipei", "color": "#9A659D" },
            { "title": "Gravity-Rolex team DCO sale", "color": "#FDD46B" },
            { "title": "Nien Hakka Kitchen DCO sale", "color": "#DB5E1D" },
            { "title": "∞! promotion sale", "color": "#56399E" },
            { "title": "Everline pob", "color": "#DF2E37" },
            { "title": "Christmas 2024 sale", "color": "#C8161D" },
            { "title": "NXT Anniversary sale", "color": "#0B3B51" },
            { "title": "AAA ACCESS OMA", "color": "#000000" },
            { "title": "KRE AESTHETIC OMA", "color": "#000000" },
            { "title": "OT10 ASSEMBLE OMA", "color": "#000000" },
            { "title": "LOVElution MUHAN OMA", "color": "#000000" },
            { "title": "EVOLution MUJUK OMA", "color": "#000000" },
            { "title": "ASSEMBLE24 OMA ver.3", "color": "#000000" },
            { "title": "World Tour VIP pob", "color": "#AEE2FF" },
            { "title": "World Tour Attending gift", "color": "#AEE2FF" },
            { "title": "Hanlimz DCO sale", "color": "#1C2646" },
            { "title": "tripleS Awards 2024 sale", "color": "#6C87A8" },
            { "title": "Aria Anniversary sale", "color": "#E8BCEF" },
            { "title": "ASSEMBLE 2nd Anniversary sale", "color": "#F9F8F2" },
            { "title": "Valentine's Day", "color": "#6B4633" },
            { "title": "World Tour in Seoul Merch", "color": "#4d0083" },
            { "title": "World Tour BIGC streaming pob", "color": "#3F4049" },
            { "title": "1st Fanmeeting Surfing Club", "color": "#FFF0A9" },
            { "title": "Cherry Blossom", "color": "#F7E5FF" },
            { "title": "InfinityKPOP Trading Cafe in Singapore", "color": "#54C9CC" },
            { "title": "Withmuu pob", "color": "#5E5FAB" },
            { "title": "Black Soul Dress", "color": "#A2A7C2" },
            { "title": "Everline pob", "color": "#DF2E37" },
            { "title": "April Fools' Day", "color": "#E2F29E" },
            { "title": "Leader PCO (S2, S16)", "color": "#2E3192" },
            { "title": "Divine01 ranking top10", "color": "#2E3192" }
        ],
        "Atom02": [
            { "title": "FCO", "color": "#FFFF00" },
            { "title": "ASSEMBLE25 OMA ver.", "color": "#000000" },
            { "title": "ASSEMBLE25 PB ver.", "color": "#9cbb98" },
            { "title": "KRE 2nd Anniversary sale", "color": "#edafa6" },
            { "title": "Offline event DCO", "color": "#fe646b" },
            { "title": "tripleS X Woori Bank CBDC", "color": "#e6f6ff" },
            { "title": "ASSEMBLE24 1st Anniversary sale", "color": "#69738b" },
            { "title": "TikTok event", "color": "#FE2C55" },
            { "title": "MMT pob", "color": "#39C3DB" },
            { "title": "Melon event", "color": "#00CD3C" },
            { "title": "Makuhari Messe Booth DCO KCON", "color": "#ab73a8" },
            { "title": "Badge war Season 3 sale", "color": "#72F2D9" },
            { "title": "NXT Glow Spring Break sale", "color": "#E6E6E6" },
            { "title": "School Uniform", "color": "#2A4746" },
            { "title": "The Show 1st win", "color": "#A2F796" },
            { "title": "Show Champion 1 win", "color": "#1992ff" },
            { "title": "Everline pob", "color": "#DF2E37" },
            { "title": "K-monstar Trading Cafe in Taipei", "color": "#9A659D" },
            { "title": "Glow Anniversary sale", "color": "#FFCBF8" },
            { "title": "A Live 25 Concert VIP", "color": "#E35080" },
            { "title": "2025 Summer Edition", "color": "#7899DD" },
            { "title": "A Live 25 offline DCO", "color": "#C23A62" },
            { "title": "Abstract sale/event", "color": "#00C65E" },
            { "title": "Water Festival / Waterbomb", "color": "#FFE85F" },
            { "title": "Jump Up pob", "color": "#00A2E5" },
            { "title": "LOVElution 2nd Anniversary", "color": "#FFF3EB" },
            { "title": "Summer Edition Night ver.", "color": "#7899DD" },
            { "title": "Leader PCO (S1)", "color": "#2E3192" },
            { "title": "Ever01 ranking top10", "color": "#2E3192" }
        ]
    },

    /**
     * Initialize notch color dropdowns - Populates category and color selectors
     * Sets up event listeners for immediate color updates on selection
     */
    _initNotchColorDropdowns() {
        const groupSelect = this.elements.notchColorGroupSelect;
        const colorSelect = this.elements.notchColorSelect;

        if (!groupSelect || !colorSelect) return;

        // Populate category dropdown with all available groups
        const groupNames = Object.keys(this.notchColorGroups);
        groupSelect.innerHTML = '';
        groupNames.forEach((name, idx) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (idx === 0) option.selected = true;
            groupSelect.appendChild(option);
        });

        // Populate colors for the initially selected category
        this._populateColorDropdown(groupNames[0]);

        // Initialize preview square with current color from CanvasManager
        if (CanvasManager && CanvasManager.accentColor) {
            this._updateColorPreview(CanvasManager.accentColor);
        }

        // Event: Category selection changes - Update color dropdown options
        groupSelect.addEventListener('change', (e) => {
            this._populateColorDropdown(e.target.value);
        });

        // Event: Color selection changes - Apply color immediately to notch
        colorSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            if (selectedOption && selectedOption.value) {
                const color = selectedOption.value.toUpperCase();
                // Update preview square, hex input, and canvas
                this._updateColorPreview(color);
                this.elements.borderColorHex.value = color;
                CanvasManager.setBorderColor(color);
            }
        });
    },

    /**
     * Populate the color dropdown based on selected category
     * Each option displays the color name/title with a colored square preview
     * @param {string} groupName - The selected category/collection name
     */
    _populateColorDropdown(groupName) {
        const colorSelect = this.elements.notchColorSelect;
        const colors = this.notchColorGroups[groupName] || [];

        // Clear existing options and add default placeholder
        colorSelect.innerHTML = '<option value="">Select a color</option>';

        // Add color options with colored square indicator
        colors.forEach(item => {
            const option = document.createElement('option');
            option.value = item.color;

            // Display format: ■ Title (unicode square + text)
            option.textContent = `■ ${item.title}`;

            // Tooltip shows full color information on hover
            option.title = `${item.title} - ${item.color}`;

            // Store color in data attribute for styling
            option.dataset.color = item.color;
            option.dataset.title = item.title;

            colorSelect.appendChild(option);
        });

        // Apply colored square styling to each option
        this._styleColorOptions(colorSelect);
    },

    /**
     * Style dropdown options with colored unicode squares
     * The unicode box character will be colored to match the hex color
     * @param {HTMLSelectElement} selectElement - The select element containing color options
     */
    _styleColorOptions(selectElement) {
        Array.from(selectElement.options).forEach(option => {
            if (option.dataset.color) {
                const color = option.dataset.color;

                // Apply styling: Use text-shadow to create colored unicode box effect
                // The first character (■) gets the color shadow, rest of text stays white
                option.style.cssText = `
                    background: var(--surface-color);
                    padding-left: 0.2em;
                    text-shadow: 0 0 0 ${color};
                    color: ${color};
                `;
            }
        });
    },

    /**
     * Update the color preview square with the selected color
     * @param {string} color - Hex color value to display
     */
    _updateColorPreview(color) {
        if (this.elements.notchColorPicker) {
            this.elements.notchColorPicker.value = color;
        }
    },

    /**
     * Sync dropdown selection with manually entered hex color
     * Searches current category for matching color and selects it
     * @param {string} color - Hex color value to match
     */
    _syncDropdownWithColor(color) {
        const colorSelect = this.elements.notchColorSelect;
        const normalizedColor = color.toUpperCase();

        // Try to find and select matching option in current dropdown
        for (let i = 0; i < colorSelect.options.length; i++) {
            if (colorSelect.options[i].value.toUpperCase() === normalizedColor) {
                colorSelect.selectedIndex = i;
                return;
            }
        }

        // If not found, reset to default "Select a color"
        colorSelect.selectedIndex = 0;
    },

    /**
     * Initialize back side notch color dropdowns
     */
    _initNotchColorDropdownsBack() {
        const groupSelect = this.elements.notchColorGroupSelectBack;
        const colorSelect = this.elements.notchColorSelectBack;

        if (!groupSelect || !colorSelect) return;

        // Populate category dropdown
        const groupNames = Object.keys(this.notchColorGroups);
        groupSelect.innerHTML = '';
        groupNames.forEach((name, idx) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (idx === 0) option.selected = true;
            groupSelect.appendChild(option);
        });

        // Populate colors for initially selected category
        this._populateColorDropdownBack(groupNames[0]);

        // Initialize with current color from front side
        if (CanvasManager && CanvasManager.accentColor) {
            this._updateColorPreviewBack(CanvasManager.accentColor);
            this.elements.borderColorHexBack.value = CanvasManager.accentColor;
        }

        // Event: Category selection changes
        groupSelect.addEventListener('change', (e) => {
            this._populateColorDropdownBack(e.target.value);
        });

        // Event: Color selection changes
        colorSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            if (selectedOption && selectedOption.value) {
                const color = selectedOption.value.toUpperCase();
                this._updateColorPreviewBack(color);
                this.elements.borderColorHexBack.value = color;
                CanvasManager.setBorderColor(color);
                this._syncFrontColors(color, null);
            }
        });
    },

    /**
     * Populate back side color dropdown
     */
    _populateColorDropdownBack(groupName) {
        const colorSelect = this.elements.notchColorSelectBack;
        const colors = this.notchColorGroups[groupName] || [];

        colorSelect.innerHTML = '<option value="">Select a color</option>';

        colors.forEach(item => {
            const option = document.createElement('option');
            option.value = item.color;
            option.textContent = `■ ${item.title}`;
            option.title = `${item.title} - ${item.color}`;
            option.dataset.color = item.color;
            option.dataset.title = item.title;
            colorSelect.appendChild(option);
        });

        this._styleColorOptions(colorSelect);
    },

    /**
     * Update color preview for back side
     */
    _updateColorPreviewBack(color) {
        if (this.elements.notchColorPickerBack) {
            this.elements.notchColorPickerBack.value = color;
        }
    },

    /**
     * Sync dropdown selection for back side
     */
    _syncDropdownWithColorBack(color) {
        const colorSelect = this.elements.notchColorSelectBack;
        if (!colorSelect) return;

        const normalizedColor = color.toUpperCase();

        for (let i = 0; i < colorSelect.options.length; i++) {
            if (colorSelect.options[i].value.toUpperCase() === normalizedColor) {
                colorSelect.selectedIndex = i;
                return;
            }
        }

        colorSelect.selectedIndex = 0;
    },

    /**
     * Sync colors from back side to front side
     * @param {string} borderColor - Border color to sync (null to skip)
     * @param {string} textColor - Text color to sync (null to skip)
     */
    _syncFrontColors(borderColor, textColor) {
        if (borderColor) {
            if (this.elements.borderColorHex) this.elements.borderColorHex.value = borderColor;
            if (this.elements.notchColorPicker) this.elements.notchColorPicker.value = borderColor;
            this._syncDropdownWithColor(borderColor);
        }
        if (textColor) {
            if (this.elements.textColorPicker) this.elements.textColorPicker.value = textColor;
            if (this.elements.textColorHex) this.elements.textColorHex.value = textColor;
        }
    },

    /**
     * Sync front side colors to back side (called on load/switch)
     */
    syncBackColors() {
        // Sync border color
        const borderColor = CanvasManager.accentColor;
        if (borderColor) {
            if (this.elements.borderColorHexBack) this.elements.borderColorHexBack.value = borderColor;
            if (this.elements.notchColorPickerBack) this.elements.notchColorPickerBack.value = borderColor;
            if (this.elements.borderColorHexBackMobile) this.elements.borderColorHexBackMobile.value = borderColor;
            this._syncDropdownWithColorBack(borderColor);
        }

        // Sync text color
        const textColor = CanvasManager.textColor;
        if (textColor) {
            if (this.elements.textColorPickerBack) this.elements.textColorPickerBack.value = textColor;
            if (this.elements.textColorHexBack) this.elements.textColorHexBack.value = textColor;
            if (this.elements.textColorPickerBackMobile) this.elements.textColorPickerBackMobile.value = textColor;
            if (this.elements.textColorHexBackMobile) this.elements.textColorHexBackMobile.value = textColor;
        }
    },

    /**
     * Handle border image upload for back side
     */
    async handleBorderImageUploadBack(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await CanvasManager.loadBorderImage(file);
            this.elements.clearBorderImageBack.style.display = 'block';
            // Also update front side button
            if (this.elements.clearBorderImage) {
                this.elements.clearBorderImage.style.display = 'block';
            }
            this.showSuccessMessage('Border image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Clear border image from back side
     */
    clearBorderImageBack() {
        CanvasManager.clearBorderImage();
        this.elements.borderImageUploadBack.value = '';
        this.elements.clearBorderImageBack.style.display = 'none';
        // Also update front side
        if (this.elements.borderImageUpload) {
            this.elements.borderImageUpload.value = '';
        }
        if (this.elements.clearBorderImage) {
            this.elements.clearBorderImage.style.display = 'none';
        }
        console.log('Border image cleared');
    },

    /**
     * Sync slider values between desktop and mobile versions
     */
    syncSliderValue(type, value) {
        switch(type) {
            case 'zoom':
                if (this.elements.zoomSlider) this.elements.zoomSlider.value = value;
                if (this.elements.zoomValue) this.elements.zoomValue.textContent = `${value}%`;
                if (this.elements.zoomSliderMobile) this.elements.zoomSliderMobile.value = value;
                if (this.elements.zoomValueMobile) this.elements.zoomValueMobile.textContent = `${value}%`;
                break;
            case 'panX':
                if (this.elements.panXSlider) this.elements.panXSlider.value = value;
                if (this.elements.panXValue) this.elements.panXValue.textContent = `${value}px`;
                if (this.elements.panXSliderMobile) this.elements.panXSliderMobile.value = value;
                if (this.elements.panXValueMobile) this.elements.panXValueMobile.textContent = `${value}px`;
                break;
            case 'panY':
                if (this.elements.panYSlider) this.elements.panYSlider.value = value;
                if (this.elements.panYValue) this.elements.panYValue.textContent = `${value}px`;
                if (this.elements.panYSliderMobile) this.elements.panYSliderMobile.value = value;
                if (this.elements.panYValueMobile) this.elements.panYValueMobile.textContent = `${value}px`;
                break;
        }
    },

    /**
     * Sync signature slider values between modal and toolbar
     */
    syncSignatureSliderValue(type, value) {
        switch(type) {
            case 'zoom':
                // Modal
                if (this.elements.signatureZoomSlider) this.elements.signatureZoomSlider.value = value;
                if (this.elements.signatureZoomValue) this.elements.signatureZoomValue.textContent = `${value}%`;
                // Toolbar desktop
                if (this.elements.signatureZoomToolbar) this.elements.signatureZoomToolbar.value = value;
                if (this.elements.signatureZoomToolbarValue) this.elements.signatureZoomToolbarValue.textContent = `${value}%`;
                // Toolbar mobile
                if (this.elements.signatureZoomToolbarMobile) this.elements.signatureZoomToolbarMobile.value = value;
                if (this.elements.signatureZoomToolbarValueMobile) this.elements.signatureZoomToolbarValueMobile.textContent = `${value}%`;
                break;
            case 'posX':
                // Modal
                if (this.elements.signaturePosXSlider) this.elements.signaturePosXSlider.value = value;
                if (this.elements.signaturePosXValue) this.elements.signaturePosXValue.textContent = `${value}px`;
                // Toolbar desktop
                if (this.elements.signaturePosXToolbar) this.elements.signaturePosXToolbar.value = value;
                if (this.elements.signaturePosXToolbarValue) this.elements.signaturePosXToolbarValue.textContent = `${value}px`;
                // Toolbar mobile
                if (this.elements.signaturePosXToolbarMobile) this.elements.signaturePosXToolbarMobile.value = value;
                if (this.elements.signaturePosXToolbarValueMobile) this.elements.signaturePosXToolbarValueMobile.textContent = `${value}px`;
                break;
            case 'posY':
                // Modal
                if (this.elements.signaturePosYSlider) this.elements.signaturePosYSlider.value = value;
                if (this.elements.signaturePosYValue) this.elements.signaturePosYValue.textContent = `${value}px`;
                // Toolbar desktop
                if (this.elements.signaturePosYToolbar) this.elements.signaturePosYToolbar.value = value;
                if (this.elements.signaturePosYToolbarValue) this.elements.signaturePosYToolbarValue.textContent = `${value}px`;
                // Toolbar mobile
                if (this.elements.signaturePosYToolbarMobile) this.elements.signaturePosYToolbarMobile.value = value;
                if (this.elements.signaturePosYToolbarValueMobile) this.elements.signaturePosYToolbarValueMobile.textContent = `${value}px`;
                break;
        }
    },

    /**
     * Scroll to canvas/preview section
     */
    scrollToPreview() {
        if (this.elements.canvasContainer) {
            // Small delay to ensure canvas is rendered
            setTimeout(() => {
                this.elements.canvasContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Note: Button visibility is now controlled by scroll event listener
            }, 100);
        }
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
            this.scrollToPreview();
            this.showSuccessMessage('Image loaded successfully!');

            // Show tooltip for top text field (only once per session)
            this.showTopTextTooltip();
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
     * Open signature modal
     */
    openSignatureModal() {
        if (!this.elements.signatureModal) return;

        // Show zoom controls if signature is already uploaded
        if (CanvasManager.signatureImage) {
            this.elements.signatureZoomSection.style.display = 'block';
            // Set current values
            const currentZoom = Math.round(CanvasManager.signatureZoom * 100);
            const currentPosX = CanvasManager.signaturePosX;
            const currentPosY = CanvasManager.signaturePosY;

            this.elements.signatureZoomSlider.value = currentZoom;
            this.elements.signatureZoomValue.textContent = `${currentZoom}%`;
            this.elements.signaturePosXSlider.value = currentPosX;
            this.elements.signaturePosXValue.textContent = `${currentPosX}px`;
            this.elements.signaturePosYSlider.value = currentPosY;
            this.elements.signaturePosYValue.textContent = `${currentPosY}px`;
        } else {
            this.elements.signatureZoomSection.style.display = 'none';
        }

        // Show modal
        this.elements.signatureModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll

        // Re-initialize icons for modal content
        if (window.lucide) {
            lucide.createIcons();
        }
    },

    /**
     * Close signature modal
     */
    closeSignatureModal() {
        if (!this.elements.signatureModal) return;

        this.elements.signatureModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    },

    /**
     * Handle signature image upload
     */
    async handleSignatureImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await CanvasManager.loadSignatureImage(file);

            // Show zoom controls in modal
            this.elements.signatureZoomSection.style.display = 'block';

            // Reset zoom and position to defaults
            this.syncSignatureSliderValue('zoom', 100);
            this.syncSignatureSliderValue('posX', 0);
            this.syncSignatureSliderValue('posY', 0);
            CanvasManager.setSignatureZoom(1);
            CanvasManager.setSignaturePosition(0, 0);

            // Show clear buttons
            this.elements.clearSignatureImage.style.display = 'block';
            if (this.elements.clearSignatureImageMobile) {
                this.elements.clearSignatureImageMobile.style.display = 'block';
            }

            // Show toolbar controls
            if (this.elements.signatureToolbarControls) {
                this.elements.signatureToolbarControls.style.display = 'block';
            }
            if (this.elements.signatureToolbarControlsMobile) {
                this.elements.signatureToolbarControlsMobile.style.display = 'block';
            }

            this.showSuccessMessage('Signature image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Clear signature image
     */
    clearSignatureImage() {
        CanvasManager.clearSignatureImage();
        this.elements.signatureImageUpload.value = '';
        this.elements.clearSignatureImage.style.display = 'none';
        if (this.elements.clearSignatureImageMobile) {
            this.elements.clearSignatureImageMobile.style.display = 'none';
        }

        // Hide zoom section and reset values
        if (this.elements.signatureZoomSection) {
            this.elements.signatureZoomSection.style.display = 'none';
        }

        // Reset all values to defaults
        this.syncSignatureSliderValue('zoom', 100);
        this.syncSignatureSliderValue('posX', 0);
        this.syncSignatureSliderValue('posY', 0);

        // Hide toolbar controls
        if (this.elements.signatureToolbarControls) {
            this.elements.signatureToolbarControls.style.display = 'none';
        }
        if (this.elements.signatureToolbarControlsMobile) {
            this.elements.signatureToolbarControlsMobile.style.display = 'none';
        }

        console.log('Signature image cleared');
    },

    /**
     * Clear signature image (Mobile - just calls the main clear function)
     */
    clearSignatureImageMobile() {
        this.clearSignatureImage();
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
            this.scrollToPreview();
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

        // Hide scroll button when canvas is hidden
        if (this.elements.scrollToPreviewBtn) {
            this.elements.scrollToPreviewBtn.style.display = 'none';
        }
    },

    /**
     * Export image - Downloads only the currently active view (front or back)
     * Enhanced for mobile devices to save directly to gallery
     */
    async exportImage() {
        if (!CanvasManager.hasImage()) {
            this.showErrorMessage('Please upload an image first');
            return;
        }

        try {
            // Determine which canvas to export based on current view
            const canvas = this.currentView === 'front'
                ? document.getElementById('mainCanvas')
                : document.getElementById('backCanvas');

            const filename = `objekt-${this.currentView}.png`;

            // Check if we're on mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile && navigator.canShare) {
                // Try Web Share API for mobile devices - allows saving to gallery
                await this.exportImageShare(canvas, filename);
            } else {
                // Standard download for desktop
                await this.exportImageStandard(canvas, filename);
            }

            this.showSuccessMessage(`${this.currentView === 'front' ? 'Front' : 'Back'} side downloaded!`);
        } catch (error) {
            this.showErrorMessage('Failed to export image');
            console.error(error);
        }
    },

    /**
     * Export image using Web Share API - Allows saving to gallery on mobile
     * @param {HTMLCanvasElement} canvas - The canvas to export
     * @param {string} filename - Filename with extension
     */
    async exportImageShare(canvas, filename) {
        return new Promise((resolve, reject) => {
            try {
                // Convert canvas to blob
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create image blob'));
                        return;
                    }

                    try {
                        // Create a File object from the blob
                        const file = new File([blob], filename, { type: 'image/png' });

                        // Check if the browser supports sharing files
                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                            await navigator.share({
                                files: [file],
                                title: 'Objekt Image',
                                text: 'Download your objekt image'
                            });
                            resolve(true);
                        } else {
                            // Fallback to standard download if file sharing not supported
                            await this.exportImageStandard(canvas, filename);
                            resolve(true);
                        }
                    } catch (shareError) {
                        // User cancelled share or error occurred - try standard download
                        if (shareError.name === 'AbortError') {
                            console.log('Share cancelled by user');
                            resolve(false);
                        } else {
                            console.warn('Share failed, falling back to download:', shareError);
                            await this.exportImageStandard(canvas, filename);
                            resolve(true);
                        }
                    }
                }, 'image/png', 0.95);
            } catch (error) {
                reject(error);
            }
        });
    },

    /**
     * Export image using standard download method
     * @param {HTMLCanvasElement} canvas - The canvas to export
     * @param {string} filename - Filename with extension
     */
    async exportImageStandard(canvas, filename) {
        return new Promise((resolve, reject) => {
            try {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create image blob'));
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = url;
                    link.click();

                    // Clean up
                    URL.revokeObjectURL(url);
                    resolve(true);
                }, 'image/png', 0.95);
            } catch (error) {
                reject(error);
            }
        });
    },

    /**
     * Reset all settings and canvas
     */
    resetAll() {
        if (!confirm('Are you sure you want to reset everything?')) {
            return;
        }

        // Refresh the page to reset everything
        location.reload();
    },

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        // Simple console log for now - can be enhanced with toast notifications
        console.log('[SUCCESS]', message);
        alert(message);
    },

    /**
     * Show error message
     */
    showErrorMessage(message) {
        console.error('[ERROR]', message);
        alert(message);
    },

    /**
     * Switch between front and back canvas views
     * @param {string} view - 'front' or 'back'
     */
    async switchCanvasView(view, direction = null) {
        // Track current view
        const previousView = this.currentView;
        this.currentView = view;

        // Update toggle button states
        this.elements.toggleBtns.forEach(btn => {
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Get current and target canvas wrappers
        const frontWrapper = this.elements.canvasWrapper;
        const backWrapper = this.elements.backCanvasWrapper;
        const currentWrapper = previousView === 'front' ? frontWrapper : backWrapper;
        const targetWrapper = view === 'front' ? frontWrapper : backWrapper;

        // Prepare back canvas operations before animation if switching to back
        const prepareBackCanvas = async () => {
            if (view === 'back') {
                CanvasManager.setBackSideEnabled(true);
                if (!CanvasManager.qrCodeImage) {
                    await CanvasManager.generateQRCode();
                }
                CanvasManager.updateBackSidePreview();
                this.syncBackColors();
            }
        };

        // Only animate if switching between different views
        if (previousView && previousView !== view) {
            // Hide mobile adjustments immediately and keep them hidden during animation
            if (this.elements.mobileAdjustments) {
                this.elements.mobileAdjustments.style.setProperty('display', 'none', 'important');
            }
            if (this.elements.mobileBackAdjustments) {
                this.elements.mobileBackAdjustments.style.setProperty('display', 'none', 'important');
            }
            
            // Prepare back canvas before animation starts
            await prepareBackCanvas();
            
            // Determine rotation direction
            let outClass = 'rotating-out';
            let inAnimation = 'rotateIn';
            
            if (direction === 'left') {
                outClass = 'rotating-out-left';
                inAnimation = 'rotateInFromRight';
            } else if (direction === 'right') {
                outClass = 'rotating-out-right';
                inAnimation = 'rotateIn';
            }
            
            // Start rotation out animation for current wrapper
            currentWrapper.classList.add(outClass);
            
            // After rotation out completes, switch to new wrapper
            setTimeout(() => {
                // Hide current wrapper completely
                currentWrapper.classList.remove('active', 'rotating-out', 'rotating-out-left', 'rotating-out-right');
                
                // Show target wrapper and immediately start in animation
                targetWrapper.classList.add('active');
                // Force a reflow to ensure the element is rendered before animation
                targetWrapper.offsetHeight;
                targetWrapper.style.animation = `${inAnimation} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                
                // Clean up animation after completion
                setTimeout(() => {
                    targetWrapper.style.animation = '';
                }, 400);
            }, 250); // Match the rotateOut animation duration
            
            // Show mobile adjustments after complete animation (700ms total)
            setTimeout(() => {
                this.updateControlsVisibility(view);
            }, 700);
        } else {
            // First time or same view - just show without animation
            await prepareBackCanvas();
            
            if (view === 'front') {
                frontWrapper.classList.add('active');
                backWrapper.classList.remove('active');
            } else {
                backWrapper.classList.add('active');
                frontWrapper.classList.remove('active');
            }
        }

        // Update mobile navigation
        this.updateMobileNavigation(view);

        // Only update controls immediately if no animation is running
        if (!previousView || previousView === view) {
            this.updateControlsVisibility(view);
        }
    },

    /**
     * Update controls visibility based on current view
     * @param {string} view - 'front' or 'back'
     */
    updateControlsVisibility(view) {
        if (view === 'front') {
            // Show upload section on front view
            if (this.elements.uploadSection) {
                this.elements.uploadSection.style.display = 'block';
            }

            // Show front side controls, hide back side controls
            if (this.elements.frontSideSection) {
                this.elements.frontSideSection.style.display = 'block';
            }
            if (this.elements.backSideSection) {
                this.elements.backSideSection.style.display = 'none';
            }
            if (this.elements.backSideSectionMobile) {
                this.elements.backSideSectionMobile.style.display = 'none';
            }
            // Show mobile adjustments on front view (only on mobile)
            if (this.elements.mobileAdjustments) {
                this.elements.mobileAdjustments.style.removeProperty('display');
            }
            // Hide mobile back adjustments on front view
            if (this.elements.mobileBackAdjustments) {
                this.elements.mobileBackAdjustments.style.setProperty('display', 'none', 'important');
            }
        } else {
            // Hide upload section on back view
            if (this.elements.uploadSection) {
                this.elements.uploadSection.style.display = 'none';
            }

            // Hide front side controls, show back side controls
            if (this.elements.frontSideSection) {
                this.elements.frontSideSection.style.display = 'none';
            }
            if (this.elements.backSideSection) {
                this.elements.backSideSection.style.display = 'block';
            }
            if (this.elements.backSideSectionMobile) {
                this.elements.backSideSectionMobile.style.display = 'block';
            }
            // Hide mobile front adjustments on back view
            if (this.elements.mobileAdjustments) {
                this.elements.mobileAdjustments.style.setProperty('display', 'none', 'important');
            }
            // Show mobile back adjustments on back view (only on mobile)
            if (this.elements.mobileBackAdjustments) {
                this.elements.mobileBackAdjustments.style.removeProperty('display');
            }
        }
    },

    /**
     * Update toggle navigation visibility based on back side enabled state
     * Note: Toggle is now always visible, but we keep this for back side generation logic
     * @param {boolean} enabled - Whether back side is enabled
     */
    updateToggleVisibility(enabled) {
        // Toggle is always visible now, just ensure back canvas is generated
        if (!enabled) {
            // Reset to front view when disabling back side generation
            this.switchCanvasView('front');
        }
    },

    /**
     * Initialize canvas text editor for inline text editing
     * Allows clicking text on canvas previews to edit them directly
     */
    initCanvasTextEditor() {
        // Get both canvas wrappers
        const frontWrapper = document.getElementById('canvasWrapper');
        const backWrapper = document.getElementById('backCanvasWrapper');

        if (!frontWrapper || !backWrapper) return;

        // Add click/touch listener to front canvas
        const frontCanvas = document.getElementById('mainCanvas');
        if (frontCanvas) {
            frontCanvas.addEventListener('click', (e) => this.handleCanvasClick(e, 'front'));
            frontCanvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleCanvasClick(e, 'front');
            });
            frontCanvas.style.cursor = 'pointer';
        }

        // Add click/touch listener to back canvas
        const backCanvas = document.getElementById('backCanvas');
        if (backCanvas) {
            backCanvas.addEventListener('click', (e) => this.handleCanvasClick(e, 'back'));
            backCanvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleCanvasClick(e, 'back');
            });
            backCanvas.style.cursor = 'pointer';
        }
    },

    /**
     * Handle click on canvas to detect text area clicks
     * @param {MouseEvent|TouchEvent} event - Click or touch event
     * @param {string} side - 'front' or 'back'
     */
    handleCanvasClick(event, side) {
        const canvas = event.target;
        const rect = canvas.getBoundingClientRect();

        // Get clientX and clientY from touch or mouse event
        let clientX, clientY;
        if (event.type === 'touchend' && event.changedTouches && event.changedTouches.length > 0) {
            clientX = event.changedTouches[0].clientX;
            clientY = event.changedTouches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        // Calculate click position relative to canvas (accounting for canvas scaling)
        const scaleX = CanvasManager.canvasWidth / rect.width;
        const scaleY = CanvasManager.canvasHeight / rect.height;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        let clickedTextType = null;

        if (side === 'front') {
            clickedTextType = CanvasManager.getClickedText(x, y);
            if (clickedTextType) {
                this.showTextEditor(canvas, rect, clickedTextType, side);
            }
        } else if (side === 'back') {
            clickedTextType = CanvasManager.getClickedBackText(x, y);
            if (clickedTextType) {
                // If signature area is clicked, open signature modal instead of text editor
                if (clickedTextType === 'signature') {
                    this.openSignatureModal();
                } else if (clickedTextType === 'qrcode') {
                    // QR code area is disabled for now
                    // this.showQRCodeEditor();
                } else {
                    this.showTextEditor(canvas, rect, clickedTextType, side);
                }
            }
        }
    },

    /**
     * Show QR code editor modal
     */
    showQRCodeEditor() {
        // Remove any existing editor
        this.removeTextEditor();

        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'canvas-text-editor-backdrop';
        backdrop.id = 'qrCodeEditorBackdrop';

        // Create editor container
        const editor = document.createElement('div');
        editor.className = 'canvas-text-editor';
        editor.id = 'qrCodeEditor';
        editor.style.position = 'fixed';
        editor.style.top = '50%';
        editor.style.left = '50%';
        editor.style.transform = 'translate(-50%, -50%)';
        editor.style.zIndex = '1000';

        // Create title
        const title = document.createElement('div');
        title.style.fontWeight = '600';
        title.style.marginBottom = 'var(--space-sm)';
        title.textContent = 'Edit QR Code Link';

        // Create input element
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input';
        input.value = CanvasManager.qrCodeLink || '';
        input.placeholder = 'https://sharkbeans.github.io/objekt-maker/';
        input.style.width = '100%';
        input.style.marginBottom = 'var(--space-sm)';

        // Create hint text
        const hint = document.createElement('div');
        hint.className = 'upload-hint';
        hint.textContent = 'Enter a URL to generate a QR code';
        hint.style.textAlign = 'center';
        hint.style.marginTop = 'var(--space-xs)';

        // Append elements
        editor.appendChild(title);
        editor.appendChild(input);
        editor.appendChild(hint);

        // Add to document
        document.body.appendChild(backdrop);
        document.body.appendChild(editor);

        // Focus input and select all
        input.focus();
        input.select();

        // Handle input changes
        const updateQRCode = async () => {
            await CanvasManager.setQRCodeLink(input.value);
            // Update toolbar inputs
            const toolbarInput = document.getElementById('qrCodeLink');
            const toolbarInputMobile = document.getElementById('qrCodeLinkMobile');
            if (toolbarInput) toolbarInput.value = input.value;
            if (toolbarInputMobile) toolbarInputMobile.value = input.value;
        };

        // Handle enter key
        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                await updateQRCode();
                this.removeQRCodeEditor();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.removeQRCodeEditor();
            }
        });

        // Handle backdrop click (close editor)
        backdrop.addEventListener('click', async () => {
            await updateQRCode();
            this.removeQRCodeEditor();
        });
    },

    /**
     * Remove QR code editor
     */
    removeQRCodeEditor() {
        const editor = document.getElementById('qrCodeEditor');
        const backdrop = document.getElementById('qrCodeEditorBackdrop');
        if (editor) editor.remove();
        if (backdrop) backdrop.remove();
    },

    /**
     * Show inline text editor at clicked position
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {DOMRect} canvasRect - Canvas bounding rect
     * @param {string} textType - Type of text clicked
     * @param {string} side - 'front' or 'back'
     */
    showTextEditor(canvas, canvasRect, textType, side) {
        // Remove any existing editor
        this.removeTextEditor();

        // Create editor container
        const editor = document.createElement('div');
        editor.className = 'canvas-text-editor-overlay';
        editor.id = 'canvasTextEditor';

        // Create input element
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'canvas-text-editor-input';

        // Get current value and height info based on side and text type
        let currentValue = '';
        let inputElement = null;
        let hasHeightSlider = false;
        let currentHeight = 0;
        let heightSliderElement = null;

        if (side === 'front') {
            switch (textType) {
                case 'top':
                    currentValue = CanvasManager.topText;
                    inputElement = this.elements.topText;
                    hasHeightSlider = true;
                    currentHeight = CanvasManager.topTextHeight;
                    heightSliderElement = this.elements.topTextHeight;
                    break;
                case 'middle':
                    currentValue = CanvasManager.middleText;
                    inputElement = this.elements.middleText;
                    hasHeightSlider = true;
                    currentHeight = CanvasManager.middleTextHeight;
                    heightSliderElement = this.elements.middleTextHeight;
                    break;
                case 'bottom':
                    currentValue = CanvasManager.bottomText;
                    inputElement = this.elements.bottomText;
                    hasHeightSlider = true;
                    currentHeight = CanvasManager.bottomTextHeight;
                    heightSliderElement = this.elements.bottomTextHeight;
                    break;
            }
        } else if (side === 'back') {
            switch (textType) {
                case 'nameLabel':
                    currentValue = CanvasManager.backNameLabel;
                    inputElement = this.elements.backNameLabel;
                    break;
                case 'nameValue':
                    currentValue = CanvasManager.backNameValue;
                    inputElement = this.elements.backNameValue;
                    break;
                case 'classLabel':
                    currentValue = CanvasManager.backClassLabel;
                    inputElement = this.elements.backClassLabel;
                    break;
                case 'classValue':
                    currentValue = CanvasManager.backClassValue;
                    inputElement = this.elements.backClassValue;
                    break;
                case 'seasonLabel':
                    currentValue = CanvasManager.backSeasonLabel;
                    inputElement = this.elements.backSeasonLabel;
                    break;
                case 'seasonValue':
                    currentValue = CanvasManager.backSeasonValue;
                    inputElement = this.elements.backSeasonValue;
                    break;
                case 'topRotated':
                    currentValue = CanvasManager.backNameValue;
                    inputElement = this.elements.backNameValue;
                    hasHeightSlider = true;
                    currentHeight = CanvasManager.backTopTextHeight;
                    heightSliderElement = this.elements.backTopTextHeight;
                    break;
                case 'bottomRotated':
                    currentValue = CanvasManager.backGroupName;
                    inputElement = this.elements.backGroupName;
                    hasHeightSlider = true;
                    currentHeight = CanvasManager.backBottomTextHeight;
                    heightSliderElement = this.elements.backBottomTextHeight;
                    break;
            }
        }

        input.value = currentValue;
        input.placeholder = 'Enter text...';

        // Create editor content container
        const editorContent = document.createElement('div');
        editorContent.className = 'canvas-text-editor';

        // Add text input
        editorContent.appendChild(input);

        // Add height slider if applicable
        let heightSlider = null;
        let heightValueDisplay = null;
        if (hasHeightSlider) {
            const sliderContainer = document.createElement('div');
            sliderContainer.className = 'canvas-editor-slider-container';

            const sliderLabel = document.createElement('label');
            sliderLabel.className = 'canvas-editor-slider-label';
            sliderLabel.textContent = 'Text Height';

            const sliderWrapper = document.createElement('div');
            sliderWrapper.className = 'canvas-editor-slider-wrapper';

            heightSlider = document.createElement('input');
            heightSlider.type = 'range';
            heightSlider.className = 'canvas-editor-slider';
            heightSlider.min = '-200';
            heightSlider.max = '200';
            heightSlider.value = currentHeight;

            heightValueDisplay = document.createElement('span');
            heightValueDisplay.className = 'canvas-editor-slider-value';
            heightValueDisplay.textContent = `${currentHeight}px`;

            sliderWrapper.appendChild(heightSlider);
            sliderWrapper.appendChild(heightValueDisplay);

            sliderContainer.appendChild(sliderLabel);
            sliderContainer.appendChild(sliderWrapper);
            editorContent.appendChild(sliderContainer);

            // Handle slider input
            heightSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                heightValueDisplay.textContent = `${value}px`;

                // Update canvas in real-time
                if (side === 'front') {
                    CanvasManager.setTextHeight(textType, value);
                    // Sync to sliders
                    if (heightSliderElement) heightSliderElement.value = value;
                    if (textType === 'top' && this.elements.topTextHeightValue) {
                        this.elements.topTextHeightValue.textContent = `${value}px`;
                    } else if (textType === 'middle' && this.elements.middleTextHeightValue) {
                        this.elements.middleTextHeightValue.textContent = `${value}px`;
                    } else if (textType === 'bottom' && this.elements.bottomTextHeightValue) {
                        this.elements.bottomTextHeightValue.textContent = `${value}px`;
                    }
                    // Sync to mobile
                    if (textType === 'top' && this.elements.topTextHeightMobile) {
                        this.elements.topTextHeightMobile.value = value;
                        this.elements.topTextHeightValueMobile.textContent = `${value}px`;
                    } else if (textType === 'middle' && this.elements.middleTextHeightMobile) {
                        this.elements.middleTextHeightMobile.value = value;
                        this.elements.middleTextHeightValueMobile.textContent = `${value}px`;
                    } else if (textType === 'bottom' && this.elements.bottomTextHeightMobile) {
                        this.elements.bottomTextHeightMobile.value = value;
                        this.elements.bottomTextHeightValueMobile.textContent = `${value}px`;
                    }
                } else if (side === 'back') {
                    const position = textType === 'topRotated' ? 'top' : 'bottom';
                    CanvasManager.setBackTextHeight(position, value);
                    // Sync to sliders
                    if (heightSliderElement) heightSliderElement.value = value;
                    if (textType === 'topRotated' && this.elements.backTopTextHeightValue) {
                        this.elements.backTopTextHeightValue.textContent = `${value}px`;
                    } else if (textType === 'bottomRotated' && this.elements.backBottomTextHeightValue) {
                        this.elements.backBottomTextHeightValue.textContent = `${value}px`;
                    }
                    // Sync to mobile
                    if (textType === 'topRotated') {
                        if (this.elements.backTopTextHeightMobile) {
                            this.elements.backTopTextHeightMobile.value = value;
                            this.elements.backTopTextHeightValueMobile.textContent = `${value}px`;
                        }
                        if (this.elements.backTopTextHeightMobileQuick) {
                            this.elements.backTopTextHeightMobileQuick.value = value;
                            this.elements.backTopTextHeightValueMobileQuick.textContent = `${value}px`;
                        }
                    } else if (textType === 'bottomRotated') {
                        if (this.elements.backBottomTextHeightMobile) {
                            this.elements.backBottomTextHeightMobile.value = value;
                            this.elements.backBottomTextHeightValueMobile.textContent = `${value}px`;
                        }
                        if (this.elements.backBottomTextHeightMobileQuick) {
                            this.elements.backBottomTextHeightMobileQuick.value = value;
                            this.elements.backBottomTextHeightValueMobileQuick.textContent = `${value}px`;
                        }
                    }
                }
            });
        }

        // Create hint text
        const hint = document.createElement('div');
        hint.className = 'canvas-text-editor-hint';
        hint.textContent = 'Press Enter or click outside to save, Esc to cancel';

        editorContent.appendChild(hint);
        editor.appendChild(editorContent);

        // Create save function with access to all necessary variables
        const saveTextChanges = () => {
            const newValue = input.value;

            if (side === 'front') {
                switch (textType) {
                    case 'top':
                        CanvasManager.setText(newValue, undefined, undefined);
                        if (inputElement) inputElement.value = newValue;
                        break;
                    case 'middle':
                        CanvasManager.setText(undefined, newValue, undefined);
                        if (inputElement) inputElement.value = newValue;
                        break;
                    case 'bottom':
                        CanvasManager.setText(undefined, undefined, newValue);
                        if (inputElement) inputElement.value = newValue;
                        break;
                }
            } else if (side === 'back') {
                const updateData = {};
                switch (textType) {
                    case 'nameLabel':
                        updateData.nameLabel = newValue;
                        break;
                    case 'nameValue':
                        updateData.nameValue = newValue;
                        break;
                    case 'classLabel':
                        updateData.classLabel = newValue;
                        break;
                    case 'classValue':
                        updateData.classValue = newValue;
                        break;
                    case 'seasonLabel':
                        updateData.seasonLabel = newValue;
                        break;
                    case 'seasonValue':
                        updateData.seasonValue = newValue;
                        break;
                    case 'topRotated':
                        updateData.nameValue = newValue;
                        break;
                    case 'bottomRotated':
                        updateData.groupName = newValue;
                        break;
                }
                CanvasManager.setBackSideData(updateData);
                if (inputElement) inputElement.value = newValue;

                // Sync to mobile if needed
                if (textType === 'nameValue' && this.elements.backNameValueMobile) {
                    this.elements.backNameValueMobile.value = newValue;
                } else if (textType === 'nameLabel' && this.elements.backNameLabelMobile) {
                    this.elements.backNameLabelMobile.value = newValue;
                } else if (textType === 'classValue' && this.elements.backClassValueMobile) {
                    this.elements.backClassValueMobile.value = newValue;
                } else if (textType === 'classLabel' && this.elements.backClassLabelMobile) {
                    this.elements.backClassLabelMobile.value = newValue;
                } else if (textType === 'seasonValue' && this.elements.backSeasonValueMobile) {
                    this.elements.backSeasonValueMobile.value = newValue;
                } else if (textType === 'seasonLabel' && this.elements.backSeasonLabelMobile) {
                    this.elements.backSeasonLabelMobile.value = newValue;
                } else if (textType === 'bottomRotated' && this.elements.backGroupNameMobile) {
                    this.elements.backGroupNameMobile.value = newValue;
                }
            }
        };

        // Store save function for access from outside click handler
        this._currentEditorSaveFunction = saveTextChanges;

        // Create and add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'canvas-text-editor-backdrop';
        backdrop.id = 'canvasTextEditorBackdrop';
        backdrop.addEventListener('click', () => {
            saveTextChanges();
            this.removeTextEditor();
        });

        document.body.appendChild(backdrop);
        document.body.appendChild(editor);

        // Focus input and select all text
        input.focus();
        input.select();

        // Handle input events
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                // Save changes
                saveTextChanges();
                this.removeTextEditor();
            } else if (e.key === 'Escape') {
                // Cancel without saving
                this.removeTextEditor();
            }
        });

        // Remove editor when clicking outside
        setTimeout(() => {
            document.addEventListener('click', this.handleOutsideClick, true);
        }, 10);
    },

    /**
     * Handle clicks outside the text editor
     * Saves changes before closing
     */
    handleOutsideClick(event) {
        const editor = document.getElementById('canvasTextEditor');
        const backdrop = document.getElementById('canvasTextEditorBackdrop');

        // Check if click is outside editor (but allow backdrop clicks to be handled by backdrop listener)
        if (editor && !editor.contains(event.target) && event.target !== backdrop) {
            // Save changes before removing
            if (UIManager._currentEditorSaveFunction) {
                UIManager._currentEditorSaveFunction();
            }
            UIManager.removeTextEditor();
        }
    },

    /**
     * Remove the text editor overlay
     */
    removeTextEditor() {
        const editor = document.getElementById('canvasTextEditor');
        const backdrop = document.getElementById('canvasTextEditorBackdrop');
        if (editor) {
            editor.remove();
        }
        if (backdrop) {
            backdrop.remove();
        }
        document.removeEventListener('click', this.handleOutsideClick, true);
        // Clean up save function reference
        this._currentEditorSaveFunction = null;
    },

    /**
     * Show tooltip for top text field
     */
    showTopTextTooltip() {
        const tooltip = document.getElementById('topTextTooltip');
        const closeBtn = document.getElementById('closeTooltip');

        if (!tooltip) return;

        // Only show tooltip once per session
        const tooltipShown = sessionStorage.getItem('topTextTooltipShown');
        if (tooltipShown) return;

        // Show tooltip after a short delay
        setTimeout(() => {
            tooltip.style.display = 'block';

            // Re-initialize Lucide icons for the close button
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Mark as shown
            sessionStorage.setItem('topTextTooltipShown', 'true');

            // Auto-hide after 60 seconds
            this.tooltipTimeout = setTimeout(() => {
                this.hideTopTextTooltip();
            }, 60000);
        }, 1000);

        // Close button click handler
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideTopTextTooltip();
            });
        }
    },

    /**
     * Hide tooltip for top text field
     */
    hideTopTextTooltip() {
        const tooltip = document.getElementById('topTextTooltip');

        if (!tooltip) return;

        // Add fade-out class for smooth animation
        tooltip.classList.add('fade-out');

        // Remove after animation completes
        setTimeout(() => {
            tooltip.style.display = 'none';
            tooltip.classList.remove('fade-out');
        }, 300);

        // Clear timeout if exists
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = null;
        }
    },

    /**
     * Update mobile navigation visibility
     */
    updateMobileNavigation(view) {
        const frontNavSection = document.getElementById('frontNavSection');
        const backNavSection = document.getElementById('backNavSection');
        
        if (frontNavSection && backNavSection) {
            if (view === 'front') {
                frontNavSection.style.display = 'flex';
                backNavSection.style.display = 'none';
            } else {
                frontNavSection.style.display = 'none';
                backNavSection.style.display = 'flex';
            }
        }
    },

    /**
     * Initialize desktop navigation arrows
     */
    initDesktopArrows() {
        const canvasContainer = document.querySelector('.canvas-container');
        if (!canvasContainer) return;
        
        // Create left arrow
        const leftArrow = document.createElement('button');
        leftArrow.className = 'canvas-nav-arrow left';
        leftArrow.innerHTML = '<i data-lucide="chevron-left"></i>';
        leftArrow.addEventListener('click', () => this.switchCanvasView('front', 'right'));
        
        // Create right arrow
        const rightArrow = document.createElement('button');
        rightArrow.className = 'canvas-nav-arrow right';
        rightArrow.innerHTML = '<i data-lucide="chevron-right"></i>';
        rightArrow.addEventListener('click', () => this.switchCanvasView('back', 'left'));
        
        canvasContainer.appendChild(leftArrow);
        canvasContainer.appendChild(rightArrow);
        
        // Initialize icons
        if (window.lucide) lucide.createIcons();
    },

    /**
     * Initialize swipe gestures for canvas flipping
     */
    initSwipeGestures() {
        const canvasContainer = document.querySelector('.canvas-container');
        if (!canvasContainer) return;

        let startX = 0;
        let startY = 0;
        let startTime = 0;

        canvasContainer.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });

        canvasContainer.addEventListener('touchend', (e) => {
            if (!e.changedTouches[0]) return;
            
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const endTime = Date.now();
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;
            
            // Check if it's a valid swipe (horizontal, fast enough, long enough)
            if (Math.abs(deltaX) > Math.abs(deltaY) && // More horizontal than vertical
                Math.abs(deltaX) > 50 && // Minimum distance
                deltaTime < 300) { // Maximum time
                
                if (deltaX > 0) {
                    // Swipe right - show front
                    this.switchCanvasView('front', 'right');
                    this.updateMobileNavigation('front');
                } else {
                    // Swipe left - show back
                    this.switchCanvasView('back', 'left');
                    this.updateMobileNavigation('back');
                }
            }
        }, { passive: true });
    }
};

// Export to global scope for browser usage
window.UIManager = UIManager;

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scrollToPreviewBtn');

    if (!scrollBtn) {
        console.error('[ScrollToPreview] Button not found');
        return;
    }

    // Ensure button doesn’t submit forms accidentally
    scrollBtn.type = 'button';

    // Common preview targets — adjust to match your layout
    const possibleTargets = [
        'previewContainer',
        'canvasContainer',
        'canvasWrapper',
        'backCanvasWrapper',
        'canvasPlaceholder',
        'preview'
    ];

    const previewTarget = possibleTargets
        .map(id => document.getElementById(id))
        .find(el => el !== null);

    if (!previewTarget) {
        console.warn('[ScrollToPreview] No preview element found — will scroll down instead.');
    }

    // Attach click event
    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Small visual feedback (button click animation)
        scrollBtn.style.transform = 'scale(0.96)';
        setTimeout(() => (scrollBtn.style.transform = ''), 150);

        // Scroll smoothly to target if found
        if (previewTarget) {
            previewTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Fallback scroll if no target element exists
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
    });

    // Make sure Lucide icons render
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }

    console.info('[ScrollToPreview] Initialized successfully');
});

// Bottom Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const bottomNav = document.getElementById('bottomNav');
    const frontNavSection = document.getElementById('frontNavSection');
    const backNavSection = document.getElementById('backNavSection');
    const navBtns = document.querySelectorAll('.nav-btn');

    if (!bottomNav) return;

    // Map navigation targets to their corresponding sections
    const sectionMap = {
        'upload': () => {
            const uploadSection = document.querySelector('.control-section:has(#uploadArea)');
            if (uploadSection) {
                uploadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'border-color': () => {
            const section = document.querySelector('.collapsible-section:has(#notchColorSelect)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'border-image': () => {
            const section = document.querySelector('.collapsible-section:has(#borderImageUpload)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'text': () => {
            const section = document.querySelector('.collapsible-section:has(#topText)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'border-color-back': () => {
            const section = document.querySelector('.collapsible-section:has(#notchColorSelectBack)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'border-image-back': () => {
            const section = document.querySelector('.collapsible-section:has(#borderImageUploadBack)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'text-back': () => {
            const section = document.querySelector('.collapsible-section:has(#textColorPickerBack)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'signature': () => {
            const section = document.querySelector('.collapsible-section:has(#openSignatureModal)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        'content': () => {
            const section = document.querySelector('.collapsible-section:has(#backClassLabel)');
            if (section) {
                section.classList.remove('collapsed');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // Handle navigation button clicks
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.dataset.target;
            
            // Remove active state from all buttons
            navBtns.forEach(b => b.classList.remove('active'));
            // Add active state to clicked button
            btn.classList.add('active');
            
            // Execute navigation action
            if (sectionMap[target]) {
                sectionMap[target]();
            }
        });
    });

    // Update navigation visibility based on current view
    const updateNavVisibility = (view) => {
        if (view === 'front') {
            frontNavSection.style.display = 'flex';
            backNavSection.style.display = 'none';
        } else {
            frontNavSection.style.display = 'none';
            backNavSection.style.display = 'flex';
        }
        // Clear active states when switching views
        navBtns.forEach(btn => btn.classList.remove('active'));
    };

    // Listen for canvas view changes
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            updateNavVisibility(view);
        });
    });

    // Initialize with front view
    updateNavVisibility('front');
});

