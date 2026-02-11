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

            // Objekt border toggle
            objektBorderToggle: document.getElementById('objektBorderToggle'),

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

            // Top logo upload and controls (Desktop)
            topLogoUpload: document.getElementById('topLogoUpload'),
            topLogoZoom: document.getElementById('topLogoZoom'),
            topLogoZoomValue: document.getElementById('topLogoZoomValue'),
            topLogoPosX: document.getElementById('topLogoPosX'),
            topLogoPosXValue: document.getElementById('topLogoPosXValue'),
            topLogoPosY: document.getElementById('topLogoPosY'),
            topLogoPosYValue: document.getElementById('topLogoPosYValue'),
            topLogoRotation: document.getElementById('topLogoRotation'),
            topLogoRotationValue: document.getElementById('topLogoRotationValue'),
            clearTopLogoBtn: document.getElementById('clearTopLogoBtn'),
            topLogoControlsContainer: document.getElementById('topLogoControlsContainer'),

            // Top logo upload and controls (Mobile)
            topLogoUploadMobile: document.getElementById('topLogoUploadMobile'),
            topLogoZoomMobile: document.getElementById('topLogoZoomMobile'),
            topLogoZoomValueMobile: document.getElementById('topLogoZoomValueMobile'),
            topLogoPosXMobile: document.getElementById('topLogoPosXMobile'),
            topLogoPosXValueMobile: document.getElementById('topLogoPosXValueMobile'),
            topLogoPosYMobile: document.getElementById('topLogoPosYMobile'),
            topLogoPosYValueMobile: document.getElementById('topLogoPosYValueMobile'),
            topLogoRotationMobile: document.getElementById('topLogoRotationMobile'),
            topLogoRotationValueMobile: document.getElementById('topLogoRotationValueMobile'),
            clearTopLogoBtnMobile: document.getElementById('clearTopLogoBtnMobile'),
            topLogoControlsContainerMobile: document.getElementById('topLogoControlsContainerMobile'),

            // Back side logo upload and controls (Desktop)
            logoUpload: document.getElementById('logoUpload'),
            logoZoom: document.getElementById('logoZoom'),
            logoZoomValue: document.getElementById('logoZoomValue'),
            logoPosX: document.getElementById('logoPosX'),
            logoPosXValue: document.getElementById('logoPosXValue'),
            logoPosY: document.getElementById('logoPosY'),
            logoPosYValue: document.getElementById('logoPosYValue'),
            logoRotation: document.getElementById('logoRotation'),
            logoRotationValue: document.getElementById('logoRotationValue'),
            clearLogoBtn: document.getElementById('clearLogoBtn'),
            logoControlsContainer: document.getElementById('logoControlsContainer'),

            // Back side logo upload and controls (Mobile)
            logoUploadMobile: document.getElementById('logoUploadMobile'),
            logoZoomMobile: document.getElementById('logoZoomMobile'),
            logoZoomValueMobile: document.getElementById('logoZoomValueMobile'),
            logoPosXMobile: document.getElementById('logoPosXMobile'),
            logoPosXValueMobile: document.getElementById('logoPosXValueMobile'),
            logoPosYMobile: document.getElementById('logoPosYMobile'),
            logoPosYValueMobile: document.getElementById('logoPosYValueMobile'),
            logoRotationMobile: document.getElementById('logoRotationMobile'),
            logoRotationValueMobile: document.getElementById('logoRotationValueMobile'),
            clearLogoBtnMobile: document.getElementById('clearLogoBtnMobile'),
            logoControlsContainerMobile: document.getElementById('logoControlsContainerMobile'),

            // Front side logo upload and controls (Desktop)
            frontLogoUpload: document.getElementById('frontLogoUpload'),
            frontLogoZoom: document.getElementById('frontLogoZoom'),
            frontLogoZoomValue: document.getElementById('frontLogoZoomValue'),
            frontLogoPosX: document.getElementById('frontLogoPosX'),
            frontLogoPosXValue: document.getElementById('frontLogoPosXValue'),
            frontLogoPosY: document.getElementById('frontLogoPosY'),
            frontLogoPosYValue: document.getElementById('frontLogoPosYValue'),
            frontLogoRotation: document.getElementById('frontLogoRotation'),
            frontLogoRotationValue: document.getElementById('frontLogoRotationValue'),
            clearFrontLogoBtn: document.getElementById('clearFrontLogoBtn'),
            frontLogoControlsContainer: document.getElementById('frontLogoControlsContainer'),

            // Front side logo upload and controls (Mobile)
            frontLogoUploadMobile: document.getElementById('frontLogoUploadMobile'),
            frontLogoZoomMobile: document.getElementById('frontLogoZoomMobile'),
            frontLogoZoomValueMobile: document.getElementById('frontLogoZoomValueMobile'),
            frontLogoPosXMobile: document.getElementById('frontLogoPosXMobile'),
            frontLogoPosXValueMobile: document.getElementById('frontLogoPosXValueMobile'),
            frontLogoPosYMobile: document.getElementById('frontLogoPosYMobile'),
            frontLogoPosYValueMobile: document.getElementById('frontLogoPosYValueMobile'),
            frontLogoRotationMobile: document.getElementById('frontLogoRotationMobile'),
            frontLogoRotationValueMobile: document.getElementById('frontLogoRotationValueMobile'),
            clearFrontLogoBtnMobile: document.getElementById('clearFrontLogoBtnMobile'),
            frontLogoControlsContainerMobile: document.getElementById('frontLogoControlsContainerMobile'),

            // QR Code controls
            qrCodeLink: document.getElementById('qrCodeLink'),
            qrCodeLinkMobile: document.getElementById('qrCodeLinkMobile')
        };

        this.bindEvents();

        console.log('UI Manager initialized');

        // Set initial view after initialization
        this.currentView = 'front';

        // Make canvas wrapper clickable initially (no image loaded)
        this.elements.canvasWrapper.classList.add('clickable');
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

        // Make canvas placeholder clickable to trigger image upload
        this.elements.canvasPlaceholder.addEventListener('click', () => {
            this.elements.imageUpload.click();
        });

        // Make front canvas wrapper clickable to trigger image upload when no image is loaded
        this.elements.canvasWrapper.addEventListener('click', (e) => {
            // Only trigger if no image is loaded and click is not on an interactive element
            if (!CanvasManager.hasImage() && !e.target.closest('button, input, .tooltip-close')) {
                this.elements.imageUpload.click();
            }
        });

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

        // Objekt border toggle
        if (this.elements.objektBorderToggle) {
            this.elements.objektBorderToggle.addEventListener('change', (e) => {
                this.handleObjektBorderToggle(e.target.checked);
            });
        }

        // Top logo upload and controls (desktop)
        if (this.elements.topLogoUpload) {
            this.elements.topLogoUpload.addEventListener('change', (e) => this.handleTopLogoImageUpload(e));
        }
        if (this.elements.topLogoUploadMobile) {
            this.elements.topLogoUploadMobile.addEventListener('change', (e) => this.handleTopLogoImageUpload(e, true));
        }

        // Top logo adjustment sliders (desktop)
        if (this.elements.topLogoZoom) {
            this.elements.topLogoZoom.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoZoomValue.textContent = `${value}%`;
                this.syncTopLogoSliderValue('zoom', value);
                CanvasManager.setTopLogoZoom(value / 100);
            });
        }
        if (this.elements.topLogoPosX) {
            this.elements.topLogoPosX.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoPosXValue.textContent = `${value}px`;
                this.syncTopLogoSliderValue('posX', value);
                CanvasManager.setTopLogoPosition(value, CanvasManager.topLogoPosY);
            });
        }
        if (this.elements.topLogoPosY) {
            this.elements.topLogoPosY.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoPosYValue.textContent = `${value}px`;
                this.syncTopLogoSliderValue('posY', value);
                CanvasManager.setTopLogoPosition(CanvasManager.topLogoPosX, value);
            });
        }
        if (this.elements.topLogoRotation) {
            this.elements.topLogoRotation.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoRotationValue.textContent = `${value}°`;
                this.syncTopLogoSliderValue('rotation', value);
                CanvasManager.setTopLogoRotation(value);
            });
        }
        if (this.elements.clearTopLogoBtn) {
            this.elements.clearTopLogoBtn.addEventListener('click', () => this.clearTopLogoImage());
        }

        // Top logo adjustment sliders (mobile)
        if (this.elements.topLogoZoomMobile) {
            this.elements.topLogoZoomMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoZoomValueMobile.textContent = `${value}%`;
                this.syncTopLogoSliderValue('zoom', value, true);
                CanvasManager.setTopLogoZoom(value / 100);
            });
        }
        if (this.elements.topLogoPosXMobile) {
            this.elements.topLogoPosXMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoPosXValueMobile.textContent = `${value}px`;
                this.syncTopLogoSliderValue('posX', value, true);
                CanvasManager.setTopLogoPosition(value, CanvasManager.topLogoPosY);
            });
        }
        if (this.elements.topLogoPosYMobile) {
            this.elements.topLogoPosYMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoPosYValueMobile.textContent = `${value}px`;
                this.syncTopLogoSliderValue('posY', value, true);
                CanvasManager.setTopLogoPosition(CanvasManager.topLogoPosX, value);
            });
        }
        if (this.elements.topLogoRotationMobile) {
            this.elements.topLogoRotationMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.topLogoRotationValueMobile.textContent = `${value}°`;
                this.syncTopLogoSliderValue('rotation', value, true);
                CanvasManager.setTopLogoRotation(value);
            });
        }
        if (this.elements.clearTopLogoBtnMobile) {
            this.elements.clearTopLogoBtnMobile.addEventListener('click', () => this.clearTopLogoImage());
        }

        // Back side logo upload and controls (desktop)
        if (this.elements.logoUpload) {
            this.elements.logoUpload.addEventListener('change', (e) => this.handleLogoImageUpload(e));
        }
        if (this.elements.logoUploadMobile) {
            this.elements.logoUploadMobile.addEventListener('change', (e) => this.handleLogoImageUpload(e, true));
        }

        // Back side logo adjustment sliders (desktop)
        if (this.elements.logoZoom) {
            this.elements.logoZoom.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoZoomValue.textContent = `${value}%`;
                this.syncLogoSliderValue('zoom', value);
                CanvasManager.setLogoZoom(value / 100);
            });
        }
        if (this.elements.logoPosX) {
            this.elements.logoPosX.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoPosXValue.textContent = `${value}px`;
                this.syncLogoSliderValue('posX', value);
                CanvasManager.setLogoPosition(value, CanvasManager.logoPosY);
            });
        }
        if (this.elements.logoPosY) {
            this.elements.logoPosY.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoPosYValue.textContent = `${value}px`;
                this.syncLogoSliderValue('posY', value);
                CanvasManager.setLogoPosition(CanvasManager.logoPosX, value);
            });
        }
        if (this.elements.logoRotation) {
            this.elements.logoRotation.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoRotationValue.textContent = `${value}°`;
                this.syncLogoSliderValue('rotation', value);
                CanvasManager.setLogoRotation(value);
            });
        }
        if (this.elements.clearLogoBtn) {
            this.elements.clearLogoBtn.addEventListener('click', () => this.clearLogoImage());
        }

        // Back side logo adjustment sliders (mobile)
        if (this.elements.logoZoomMobile) {
            this.elements.logoZoomMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoZoomValueMobile.textContent = `${value}%`;
                this.syncLogoSliderValue('zoom', value, true);
                CanvasManager.setLogoZoom(value / 100);
            });
        }
        if (this.elements.logoPosXMobile) {
            this.elements.logoPosXMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoPosXValueMobile.textContent = `${value}px`;
                this.syncLogoSliderValue('posX', value, true);
                CanvasManager.setLogoPosition(value, CanvasManager.logoPosY);
            });
        }
        if (this.elements.logoPosYMobile) {
            this.elements.logoPosYMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoPosYValueMobile.textContent = `${value}px`;
                this.syncLogoSliderValue('posY', value, true);
                CanvasManager.setLogoPosition(CanvasManager.logoPosX, value);
            });
        }
        if (this.elements.logoRotationMobile) {
            this.elements.logoRotationMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.logoRotationValueMobile.textContent = `${value}°`;
                this.syncLogoSliderValue('rotation', value, true);
                CanvasManager.setLogoRotation(value);
            });
        }
        if (this.elements.clearLogoBtnMobile) {
            this.elements.clearLogoBtnMobile.addEventListener('click', () => this.clearLogoImage());
        }

        // Front side logo upload and controls (desktop)
        if (this.elements.frontLogoUpload) {
            this.elements.frontLogoUpload.addEventListener('change', (e) => this.handleFrontLogoImageUpload(e));
        }
        if (this.elements.frontLogoUploadMobile) {
            this.elements.frontLogoUploadMobile.addEventListener('change', (e) => this.handleFrontLogoImageUpload(e, true));
        }

        // Front side logo adjustment sliders (desktop)
        if (this.elements.frontLogoZoom) {
            this.elements.frontLogoZoom.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoZoomValue.textContent = `${value}%`;
                this.syncFrontLogoSliderValue('zoom', value);
                CanvasManager.setFrontLogoZoom(value / 100);
            });
        }
        if (this.elements.frontLogoPosX) {
            this.elements.frontLogoPosX.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoPosXValue.textContent = `${value}px`;
                this.syncFrontLogoSliderValue('posX', value);
                CanvasManager.setFrontLogoPosition(value, CanvasManager.frontLogoPosY);
            });
        }
        if (this.elements.frontLogoPosY) {
            this.elements.frontLogoPosY.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoPosYValue.textContent = `${value}px`;
                this.syncFrontLogoSliderValue('posY', value);
                CanvasManager.setFrontLogoPosition(CanvasManager.frontLogoPosX, value);
            });
        }
        if (this.elements.frontLogoRotation) {
            this.elements.frontLogoRotation.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoRotationValue.textContent = `${value}°`;
                this.syncFrontLogoSliderValue('rotation', value);
                CanvasManager.setFrontLogoRotation(value);
            });
        }
        if (this.elements.clearFrontLogoBtn) {
            this.elements.clearFrontLogoBtn.addEventListener('click', () => this.clearFrontLogoImage());
        }

        // Front side logo adjustment sliders (mobile)
        if (this.elements.frontLogoZoomMobile) {
            this.elements.frontLogoZoomMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoZoomValueMobile.textContent = `${value}%`;
                this.syncFrontLogoSliderValue('zoom', value, true);
                CanvasManager.setFrontLogoZoom(value / 100);
            });
        }
        if (this.elements.frontLogoPosXMobile) {
            this.elements.frontLogoPosXMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoPosXValueMobile.textContent = `${value}px`;
                this.syncFrontLogoSliderValue('posX', value, true);
                CanvasManager.setFrontLogoPosition(value, CanvasManager.frontLogoPosY);
            });
        }
        if (this.elements.frontLogoPosYMobile) {
            this.elements.frontLogoPosYMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoPosYValueMobile.textContent = `${value}px`;
                this.syncFrontLogoSliderValue('posY', value, true);
                CanvasManager.setFrontLogoPosition(CanvasManager.frontLogoPosX, value);
            });
        }
        if (this.elements.frontLogoRotationMobile) {
            this.elements.frontLogoRotationMobile.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.elements.frontLogoRotationValueMobile.textContent = `${value}°`;
                this.syncFrontLogoSliderValue('rotation', value, true);
                CanvasManager.setFrontLogoRotation(value);
            });
        }
        if (this.elements.clearFrontLogoBtnMobile) {
            this.elements.clearFrontLogoBtnMobile.addEventListener('click', () => this.clearFrontLogoImage());
        }

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

        // Initialize direct canvas manipulation (drag, wheel, touch, pinch)
        this.initCanvasDragPan();
        this.initCanvasWheelZoom();
        this.initCanvasDoubleClickReset();
        // Touch drag-to-pan removed for mobile - using sliders instead
        // this.initCanvasTouchPan();
        this.initCanvasPinchZoom();
        this.initFloatingAdjustOverlay();
        this.initMobilePanSliders();

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
                // Floating overlay
                if (this.elements.zoomSliderFloating) this.elements.zoomSliderFloating.value = value;
                if (this.elements.zoomValueFloating) this.elements.zoomValueFloating.textContent = `${value}%`;
                break;
            case 'panX':
                if (this.elements.panXSlider) this.elements.panXSlider.value = value;
                if (this.elements.panXValue) this.elements.panXValue.textContent = `${value}px`;
                if (this.elements.panXSliderMobile) this.elements.panXSliderMobile.value = value;
                if (this.elements.panXValueMobile) this.elements.panXValueMobile.textContent = `${value}px`;
                // Floating overlay
                if (this.elements.panXSliderFloating) this.elements.panXSliderFloating.value = value;
                if (this.elements.panXValueFloating) this.elements.panXValueFloating.textContent = `${value}px`;
                // Mobile edge slider
                if (this.elements.mobilePanXSlider) this.elements.mobilePanXSlider.value = value;
                break;
            case 'panY':
                if (this.elements.panYSlider) this.elements.panYSlider.value = value;
                if (this.elements.panYValue) this.elements.panYValue.textContent = `${value}px`;
                if (this.elements.panYSliderMobile) this.elements.panYSliderMobile.value = value;
                if (this.elements.panYValueMobile) this.elements.panYValueMobile.textContent = `${value}px`;
                // Floating overlay
                if (this.elements.panYSliderFloating) this.elements.panYSliderFloating.value = value;
                if (this.elements.panYValueFloating) this.elements.panYValueFloating.textContent = `${value}px`;
                // Mobile edge slider (rotated, so negate value)
                if (this.elements.mobilePanYSlider) this.elements.mobilePanYSlider.value = -value;
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

            // Show mobile pan controls
            this.updateMobilePanControlsVisibility();
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
     * Handle objekt border toggle
     * When disabled: hides accent bar, disables back side view, hides objekt-specific controls
     * @param {boolean} enabled - Whether objekt border is enabled
     */
    handleObjektBorderToggle(enabled) {
        CanvasManager.showObjektBorder = enabled;
        CanvasManager.render();

        // Show/hide the back side toggle button and related controls
        const backToggleBtn = document.querySelector('.toggle-btn[data-view="back"]');
        const canvasViewToggle = this.elements.canvasViewToggle;

        // Show/hide objekt-only controls (border color, border image, front text)
        const objektOnlyControls = document.querySelectorAll('.objekt-only-control');

        if (enabled) {
            // Show back side toggle
            if (backToggleBtn) backToggleBtn.style.display = '';
            if (canvasViewToggle) canvasViewToggle.style.display = '';

            // Show objekt-only controls
            objektOnlyControls.forEach(control => {
                control.style.display = '';
            });
        } else {
            // Hide back side toggle and force front view
            if (backToggleBtn) backToggleBtn.style.display = 'none';

            // If currently on back view, switch to front
            if (this.currentView === 'back') {
                this.switchCanvasView('front');
            }

            // Hide the entire toggle when only front is available
            if (canvasViewToggle) canvasViewToggle.style.display = 'none';

            // Hide objekt-only controls
            objektOnlyControls.forEach(control => {
                control.style.display = 'none';
            });
        }

        console.log('Objekt border toggled:', enabled ? 'ON' : 'OFF');
    },

    /**
     * Handle back side logo image upload
     */
    async handleLogoImageUpload(event, isMobile = false) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // Clear bottom text (tripleS) before loading logo
            CanvasManager.backGroupName = '';
            if (this.elements.backGroupName) {
                this.elements.backGroupName.value = '';
            }
            if (this.elements.backGroupNameMobile) {
                this.elements.backGroupNameMobile.value = '';
            }

            await CanvasManager.loadLogoImage(file);

            // Show controls container
            this.elements.logoControlsContainer.style.display = 'block';
            if (this.elements.logoControlsContainerMobile) {
                this.elements.logoControlsContainerMobile.style.display = 'block';
            }

            // Reset sliders to neutral position (0) - base position is handled internally
            this.syncLogoSliderValue('zoom', 100);
            this.syncLogoSliderValue('posX', 0);
            this.syncLogoSliderValue('posY', 0);
            this.syncLogoSliderValue('rotation', 90);
            CanvasManager.setLogoZoom(1);
            CanvasManager.setLogoPosition(0, 0);
            CanvasManager.setLogoRotation(90);

            CanvasManager.render();
            this.showSuccessMessage('Logo image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Clear back side logo image
     */
    clearLogoImage() {
        CanvasManager.clearLogoImage();
        if (this.elements.logoUpload) {
            this.elements.logoUpload.value = '';
        }
        if (this.elements.logoUploadMobile) {
            this.elements.logoUploadMobile.value = '';
        }
        this.elements.logoControlsContainer.style.display = 'none';
        if (this.elements.logoControlsContainerMobile) {
            this.elements.logoControlsContainerMobile.style.display = 'none';
        }
        console.log('Logo image cleared');
    },

    /**
     * Handle top logo image upload (replaces hex cube)
     */
    async handleTopLogoImageUpload(event, isMobile = false) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await CanvasManager.loadTopLogoImage(file);

            // Show controls container
            this.elements.topLogoControlsContainer.style.display = 'block';
            if (this.elements.topLogoControlsContainerMobile) {
                this.elements.topLogoControlsContainerMobile.style.display = 'block';
            }

            // Reset sliders to neutral position (0)
            this.syncTopLogoSliderValue('zoom', 100);
            this.syncTopLogoSliderValue('posX', 0);
            this.syncTopLogoSliderValue('posY', 0);
            this.syncTopLogoSliderValue('rotation', 0);
            CanvasManager.setTopLogoZoom(1);
            CanvasManager.setTopLogoPosition(0, 0);
            CanvasManager.setTopLogoRotation(0);

            this.showSuccessMessage('Top logo image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Clear top logo image
     */
    clearTopLogoImage() {
        CanvasManager.clearTopLogoImage();
        if (this.elements.topLogoUpload) {
            this.elements.topLogoUpload.value = '';
        }
        if (this.elements.topLogoUploadMobile) {
            this.elements.topLogoUploadMobile.value = '';
        }
        this.elements.topLogoControlsContainer.style.display = 'none';
        if (this.elements.topLogoControlsContainerMobile) {
            this.elements.topLogoControlsContainerMobile.style.display = 'none';
        }
        console.log('Top logo image cleared');
    },

    /**
     * Sync top logo slider values between desktop and mobile
     */
    syncTopLogoSliderValue(sliderType, value, isMobile = false) {
        if (sliderType === 'zoom') {
            if (!isMobile && this.elements.topLogoZoomMobile) {
                this.elements.topLogoZoomMobile.value = value;
                this.elements.topLogoZoomValueMobile.textContent = `${value}%`;
            } else if (isMobile && this.elements.topLogoZoom) {
                this.elements.topLogoZoom.value = value;
                this.elements.topLogoZoomValue.textContent = `${value}%`;
            }
        } else if (sliderType === 'posX') {
            if (!isMobile && this.elements.topLogoPosXMobile) {
                this.elements.topLogoPosXMobile.value = value;
                this.elements.topLogoPosXValueMobile.textContent = `${value}px`;
            } else if (isMobile && this.elements.topLogoPosX) {
                this.elements.topLogoPosX.value = value;
                this.elements.topLogoPosXValue.textContent = `${value}px`;
            }
        } else if (sliderType === 'posY') {
            if (!isMobile && this.elements.topLogoPosYMobile) {
                this.elements.topLogoPosYMobile.value = value;
                this.elements.topLogoPosYValueMobile.textContent = `${value}px`;
            } else if (isMobile && this.elements.topLogoPosY) {
                this.elements.topLogoPosY.value = value;
                this.elements.topLogoPosYValue.textContent = `${value}px`;
            }
        } else if (sliderType === 'rotation') {
            if (!isMobile && this.elements.topLogoRotationMobile) {
                this.elements.topLogoRotationMobile.value = value;
                this.elements.topLogoRotationValueMobile.textContent = `${value}°`;
            } else if (isMobile && this.elements.topLogoRotation) {
                this.elements.topLogoRotation.value = value;
                this.elements.topLogoRotationValue.textContent = `${value}°`;
            }
        }
    },

    /**
     * Handle front side logo image upload
     */
    async handleFrontLogoImageUpload(event, isMobile = false) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // Clear bottom text before loading logo
            CanvasManager.bottomText = '';
            if (this.elements.bottomText) {
                this.elements.bottomText.value = '';
            }
            if (this.elements.bottomTextMobile) {
                this.elements.bottomTextMobile.value = '';
            }
            // Clear canvas text editor if open
            const editorInput = document.querySelector('.canvas-text-editor-input');
            if (editorInput) {
                editorInput.value = '';
            }

            await CanvasManager.loadFrontLogoImage(file);

            // Show controls container
            this.elements.frontLogoControlsContainer.style.display = 'block';
            if (this.elements.frontLogoControlsContainerMobile) {
                this.elements.frontLogoControlsContainerMobile.style.display = 'block';
            }

            // Reset sliders to neutral position (0) - base position is handled internally
            this.syncFrontLogoSliderValue('zoom', 100);
            this.syncFrontLogoSliderValue('posX', 0);
            this.syncFrontLogoSliderValue('posY', 0);
            this.syncFrontLogoSliderValue('rotation', 90);
            CanvasManager.setFrontLogoZoom(1);
            CanvasManager.setFrontLogoPosition(0, 0);
            CanvasManager.setFrontLogoRotation(90);

            CanvasManager.render();
            this.showSuccessMessage('Front logo image loaded successfully!');
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    },

    /**
     * Clear front side logo image
     */
    clearFrontLogoImage() {
        CanvasManager.clearFrontLogoImage();
        if (this.elements.frontLogoUpload) {
            this.elements.frontLogoUpload.value = '';
        }
        if (this.elements.frontLogoUploadMobile) {
            this.elements.frontLogoUploadMobile.value = '';
        }
        this.elements.frontLogoControlsContainer.style.display = 'none';
        if (this.elements.frontLogoControlsContainerMobile) {
            this.elements.frontLogoControlsContainerMobile.style.display = 'none';
        }
        console.log('Front logo image cleared');
    },

    /**
     * Sync logo slider values between desktop and mobile
     */
    syncLogoSliderValue(sliderType, value, isMobile = false) {
        if (sliderType === 'zoom') {
            if (!isMobile && this.elements.logoZoomMobile) {
                this.elements.logoZoomMobile.value = value;
                this.elements.logoZoomValueMobile.textContent = `${value}%`;
            } else if (isMobile && this.elements.logoZoom) {
                this.elements.logoZoom.value = value;
                this.elements.logoZoomValue.textContent = `${value}%`;
            }
        } else if (sliderType === 'posX') {
            if (!isMobile && this.elements.logoPosXMobile) {
                this.elements.logoPosXMobile.value = value;
                this.elements.logoPosXValueMobile.textContent = `${value}px`;
            } else if (isMobile && this.elements.logoPosX) {
                this.elements.logoPosX.value = value;
                this.elements.logoPosXValue.textContent = `${value}px`;
            }
        } else if (sliderType === 'posY') {
            if (!isMobile && this.elements.logoPosYMobile) {
                this.elements.logoPosYMobile.value = value;
                this.elements.logoPosYValueMobile.textContent = `${value}px`;
            } else if (isMobile && this.elements.logoPosY) {
                this.elements.logoPosY.value = value;
                this.elements.logoPosYValue.textContent = `${value}px`;
            }
        } else if (sliderType === 'rotation') {
            if (!isMobile && this.elements.logoRotationMobile) {
                this.elements.logoRotationMobile.value = value;
                this.elements.logoRotationValueMobile.textContent = `${value}°`;
            } else if (isMobile && this.elements.logoRotation) {
                this.elements.logoRotation.value = value;
                this.elements.logoRotationValue.textContent = `${value}°`;
            }
        }
    },

    /**
     * Sync front logo slider values between desktop and mobile
     */
    syncFrontLogoSliderValue(sliderType, value, isMobile = false) {
        if (sliderType === 'zoom') {
            if (!isMobile && this.elements.frontLogoZoomMobile) {
                this.elements.frontLogoZoomMobile.value = value;
                this.elements.frontLogoZoomValueMobile.textContent = `${value}%`;
            } else if (isMobile && this.elements.frontLogoZoom) {
                this.elements.frontLogoZoom.value = value;
                this.elements.frontLogoZoomValue.textContent = `${value}%`;
            }
        } else if (sliderType === 'posX') {
            if (!isMobile && this.elements.frontLogoPosXMobile) {
                this.elements.frontLogoPosXMobile.value = value;
                this.elements.frontLogoPosXValueMobile.textContent = `${value}px`;
            } else if (isMobile && this.elements.frontLogoPosX) {
                this.elements.frontLogoPosX.value = value;
                this.elements.frontLogoPosXValue.textContent = `${value}px`;
            }
        } else if (sliderType === 'posY') {
            if (!isMobile && this.elements.frontLogoPosYMobile) {
                this.elements.frontLogoPosYMobile.value = value;
                this.elements.frontLogoPosYValueMobile.textContent = `${value}px`;
            } else if (isMobile && this.elements.frontLogoPosY) {
                this.elements.frontLogoPosY.value = value;
                this.elements.frontLogoPosYValue.textContent = `${value}px`;
            }
        } else if (sliderType === 'rotation') {
            if (!isMobile && this.elements.frontLogoRotationMobile) {
                this.elements.frontLogoRotationMobile.value = value;
                this.elements.frontLogoRotationValueMobile.textContent = `${value}°`;
            } else if (isMobile && this.elements.frontLogoRotation) {
                this.elements.frontLogoRotation.value = value;
                this.elements.frontLogoRotationValue.textContent = `${value}°`;
            }
        }
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
        this.elements.canvasWrapper.classList.remove('clickable');
        this.elements.canvasPlaceholder.classList.add('hidden');
    },

    /**
     * Hide canvas and show placeholder
     */
    hideCanvas() {
        this.elements.canvasWrapper.classList.remove('active');
        this.elements.canvasWrapper.classList.add('clickable');
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
        // Only require front image when exporting front side
        if (this.currentView === 'front' && !CanvasManager.hasImage()) {
            this.showErrorMessage('Please upload an image first');
            return;
        }

        try {
            // Determine which canvas to export based on current view
            const canvas = this.currentView === 'front'
                ? document.getElementById('mainCanvas')
                : document.getElementById('backCanvas');

            // Use 'photocard' when objekt border is off, 'objekt' when on
            const baseName = CanvasManager.showObjektBorder ? 'objekt' : 'photocard';
            const filename = `${baseName}-${this.currentView}.png`;

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
                // Always regenerate QR code when switching to back view to ensure it displays
                await CanvasManager.generateQRCode();
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
                currentWrapper.style.display = 'none';

                // Show target wrapper and immediately start in animation
                targetWrapper.style.display = 'flex';
                targetWrapper.classList.add('active');
                // Force a reflow to ensure the element is rendered before animation
                targetWrapper.offsetHeight;
                targetWrapper.style.animation = `${inAnimation} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

                // Clean up animation after completion but keep opacity and transform
                setTimeout(() => {
                    targetWrapper.style.animation = '';
                    // Ensure final state is preserved
                    targetWrapper.style.opacity = '1';
                    targetWrapper.style.transform = 'none';
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
                frontWrapper.style.display = 'flex';
                frontWrapper.style.opacity = '1';
                frontWrapper.style.transform = 'none';
                backWrapper.classList.remove('active');
                backWrapper.style.display = 'none';
            } else {
                backWrapper.classList.add('active');
                backWrapper.style.display = 'flex';
                backWrapper.style.opacity = '1';
                backWrapper.style.transform = 'none';
                frontWrapper.classList.remove('active');
                frontWrapper.style.display = 'none';
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
            // Show mobile pan sliders on front view (if image is loaded)
            if (this.elements.mobilePanYContainer) {
                this.elements.mobilePanYContainer.classList.remove('hidden');
            }
            if (this.elements.mobilePanXContainer) {
                this.elements.mobilePanXContainer.classList.remove('hidden');
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
            // Hide mobile pan sliders on back view
            if (this.elements.mobilePanYContainer) {
                this.elements.mobilePanYContainer.classList.add('hidden');
            }
            if (this.elements.mobilePanXContainer) {
                this.elements.mobilePanXContainer.classList.add('hidden');
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
                    this.showQRCodeEditor();
                } else if (clickedTextType === 'toplogo') {
                    this.openTopLogoModal();
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
     * Open top logo modal
     */
    openTopLogoModal() {
        // Remove any existing modal
        this.removeTopLogoModal();

        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'canvas-text-editor-backdrop';
        backdrop.id = 'topLogoModalBackdrop';
        backdrop.style.backdropFilter = 'blur(4px)';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'canvas-text-editor';
        modal.id = 'topLogoModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.zIndex = '1000';
        modal.style.maxWidth = '400px';
        modal.style.width = '90%';

        // Create title
        const title = document.createElement('div');
        title.style.fontWeight = '600';
        title.style.marginBottom = 'var(--space-md)';
        title.style.display = 'flex';
        title.style.alignItems = 'center';
        title.style.gap = '8px';
        title.innerHTML = '<i data-lucide="image" style="width: 18px; height: 18px;"></i> Top Logo';

        // Create upload section
        const uploadSection = document.createElement('div');
        uploadSection.style.marginBottom = 'var(--space-md)';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png,image/jpeg,image/jpg';
        fileInput.style.display = 'none';
        fileInput.id = 'topLogoModalUpload';

        const uploadButton = document.createElement('button');
        uploadButton.type = 'button';
        uploadButton.className = 'btn btn-secondary';
        uploadButton.style.width = '100%';
        uploadButton.style.marginBottom = 'var(--space-sm)';
        uploadButton.innerHTML = '<i data-lucide="upload" style="width: 16px; height: 16px;"></i> Upload Logo';
        uploadButton.addEventListener('click', () => fileInput.click());

        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.className = 'btn btn-secondary';
        clearButton.style.width = '100%';
        clearButton.style.display = CanvasManager.topLogoImage ? 'block' : 'none';
        clearButton.innerHTML = '<i data-lucide="x" style="width: 16px; height: 16px;"></i> Clear Logo';
        clearButton.addEventListener('click', () => {
            CanvasManager.clearTopLogoImage();
            controlsContainer.style.display = 'none';
            clearButton.style.display = 'none';
        });

        // Handle file upload
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    await CanvasManager.loadTopLogoImage(file);
                    controlsContainer.style.display = 'block';
                    clearButton.style.display = 'block';
                    // Reset controls to default values
                    zoomSlider.value = 150;
                    zoomValue.textContent = '150%';
                    posXSlider.value = 0;
                    posXValue.textContent = '0px';
                    posYSlider.value = 0;
                    posYValue.textContent = '0px';
                    rotationSlider.value = 0;
                    rotationValue.textContent = '0°';
                } catch (error) {
                    alert(error.message);
                }
            }
        });

        uploadSection.appendChild(fileInput);
        uploadSection.appendChild(uploadButton);
        uploadSection.appendChild(clearButton);

        // Create controls container
        const controlsContainer = document.createElement('div');
        controlsContainer.style.display = CanvasManager.topLogoImage ? 'block' : 'none';

        // Helper function to create slider
        const createSlider = (label, min, max, value, unit, onChange) => {
            const container = document.createElement('div');
            container.style.marginBottom = 'var(--space-sm)';

            const labelEl = document.createElement('label');
            labelEl.style.display = 'block';
            labelEl.style.marginBottom = '4px';
            labelEl.style.fontWeight = '500';
            labelEl.textContent = label;

            const sliderWrapper = document.createElement('div');
            sliderWrapper.style.display = 'flex';
            sliderWrapper.style.alignItems = 'center';
            sliderWrapper.style.gap = 'var(--space-sm)';

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = min;
            slider.max = max;
            slider.value = value;
            slider.style.flex = '1';

            const valueDisplay = document.createElement('span');
            valueDisplay.style.minWidth = '50px';
            valueDisplay.style.textAlign = 'right';
            valueDisplay.style.fontSize = '0.875rem';
            valueDisplay.textContent = value + unit;

            slider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                valueDisplay.textContent = val + unit;
                onChange(val);
            });

            // On mobile/touch, hide the backdrop and make the modal transparent when slider is touched
            slider.addEventListener('touchstart', (e) => {
                const backdrop = document.getElementById('topLogoModalBackdrop');
                if (backdrop) {
                    backdrop.style.display = 'none';
                }
                const modalElement = document.getElementById('topLogoModal');
                if (modalElement) {
                    // Store original styles for restoration
                    this._originalTopLogoModalBackground = modalElement.style.background || '';
                    // Hide modal background
                    modalElement.style.background = 'transparent';
                    modalElement.style.boxShadow = 'none';
                    modalElement.style.padding = '0';

                    // Hide all children except the controls container
                    const controlsContainer = slider.closest('div')?.parentElement;
                    if (controlsContainer && controlsContainer.classList.contains('canvas-text-editor')) {
                        // If we're in text editor context, use that logic
                    } else {
                        // Otherwise, hide non-essential modal content
                        Array.from(modalElement.children).forEach(child => {
                            // Keep the control that contains the slider visible
                            if (child.contains(slider) || child === controlsContainer) {
                                child.style.display = 'block';
                                child.style.visibility = 'visible';
                                child.style.opacity = '1';
                                child.style.pointerEvents = 'auto';
                            } else {
                                child.style.display = 'none';
                            }
                        });
                    }
                }
            });

            // On mobile/touch, restore the modal when slider interaction ends
            slider.addEventListener('touchend', (e) => {
                const backdrop = document.getElementById('topLogoModalBackdrop');
                if (backdrop) {
                    backdrop.style.display = 'block';
                }
                const modalElement = document.getElementById('topLogoModal');
                if (modalElement) {
                    // Restore modal background
                    modalElement.style.background = this._originalTopLogoModalBackground || '';
                    modalElement.style.boxShadow = '';
                    modalElement.style.padding = '';

                    // Restore all children visibility
                    Array.from(modalElement.children).forEach(child => {
                        child.style.display = '';
                        child.style.visibility = '';
                        child.style.opacity = '';
                        child.style.pointerEvents = '';
                    });
                }
            });

            sliderWrapper.appendChild(slider);
            sliderWrapper.appendChild(valueDisplay);
            container.appendChild(labelEl);
            container.appendChild(sliderWrapper);

            return { container, slider, valueDisplay };
        };

        // Create zoom slider
        const { container: zoomContainer, slider: zoomSlider, valueDisplay: zoomValue } = createSlider(
            'Zoom', 20, 300, Math.round(CanvasManager.topLogoZoom * 100), '%',
            (value) => {
                CanvasManager.setTopLogoZoom(value / 100);
                this.syncTopLogoSliderValue('zoom', value);
            }
        );
        controlsContainer.appendChild(zoomContainer);

        // Create position X slider
        const { container: posXContainer, slider: posXSlider, valueDisplay: posXValue } = createSlider(
            'Position X', -100, 100, CanvasManager.topLogoPosX, 'px',
            (value) => {
                CanvasManager.setTopLogoPosition(value, CanvasManager.topLogoPosY);
                this.syncTopLogoSliderValue('posX', value);
            }
        );
        controlsContainer.appendChild(posXContainer);

        // Create position Y slider
        const { container: posYContainer, slider: posYSlider, valueDisplay: posYValue } = createSlider(
            'Position Y', -100, 100, CanvasManager.topLogoPosY, 'px',
            (value) => {
                CanvasManager.setTopLogoPosition(CanvasManager.topLogoPosX, value);
                this.syncTopLogoSliderValue('posY', value);
            }
        );
        controlsContainer.appendChild(posYContainer);

        // Create rotation slider
        const { container: rotationContainer, slider: rotationSlider, valueDisplay: rotationValue } = createSlider(
            'Rotation', 0, 360, CanvasManager.topLogoRotation, '°',
            (value) => {
                CanvasManager.setTopLogoRotation(value);
                this.syncTopLogoSliderValue('rotation', value);
            }
        );
        controlsContainer.appendChild(rotationContainer);

        // Create done button
        const doneButton = document.createElement('button');
        doneButton.type = 'button';
        doneButton.className = 'btn btn-primary';
        doneButton.style.width = '100%';
        doneButton.style.marginTop = 'var(--space-md)';
        doneButton.textContent = 'Done';
        doneButton.addEventListener('click', () => this.removeTopLogoModal());

        // Assemble modal
        modal.appendChild(title);
        modal.appendChild(uploadSection);
        modal.appendChild(controlsContainer);
        modal.appendChild(doneButton);

        // Add to document
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);

        // Handle backdrop click
        backdrop.addEventListener('click', () => this.removeTopLogoModal());

        // Prevent modal content clicks from closing modal
        modal.addEventListener('click', (e) => e.stopPropagation());

        // Initialize Lucide icons
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    },

    /**
     * Remove top logo modal
     */
    removeTopLogoModal() {
        const modal = document.getElementById('topLogoModal');
        const backdrop = document.getElementById('topLogoModalBackdrop');
        if (modal) modal.remove();
        if (backdrop) backdrop.remove();
        document.body.style.overflow = '';
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

        // Flag to track if a slider is being actively dragged
        this._isSliderDragging = false;

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

        // Add name dropdown for front top text and back name fields
        if ((side === 'front' && textType === 'top') ||
            (side === 'back' && (textType === 'nameValue' || textType === 'topRotated'))) {
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'canvas-editor-dropdown-container';
            dropdownContainer.style.marginTop = '12px';
            dropdownContainer.style.width = '100%';

            const dropdownLabel = document.createElement('label');
            dropdownLabel.className = 'canvas-editor-dropdown-label';
            dropdownLabel.textContent = 'Select Name:';
            dropdownLabel.style.display = 'block';
            dropdownLabel.style.fontSize = '0.875rem';
            dropdownLabel.style.fontWeight = '600';
            dropdownLabel.style.marginBottom = '8px';
            dropdownLabel.style.color = 'var(--text-secondary)';

            const dropdown = document.createElement('select');
            dropdown.className = 'canvas-editor-dropdown';
            dropdown.style.width = '100%';
            dropdown.style.padding = '10px';
            dropdown.style.fontSize = '1rem';
            dropdown.style.border = '1px solid var(--border-color)';
            dropdown.style.borderRadius = '6px';
            dropdown.style.backgroundColor = 'var(--bg-primary)';
            dropdown.style.color = 'var(--text-primary)';
            dropdown.style.cursor = 'pointer';

            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Select a name --';
            dropdown.appendChild(defaultOption);

            // Add all member names
            const memberNames = [
                'SeoYeon', 'HyeRin', 'JiWoo', 'ChaeYeon', 'YooYeon', 'SooMin',
                'NaKyoung', 'YuBin', 'Kaede', 'DaHyun', 'Kotone', 'YeonJi',
                'Nien', 'SoHyun', 'Xinyu', 'Mayu', 'Lynn', 'JooBin',
                'HaYeon', 'ShiOn', 'ChaeWon', 'Sullin', 'SeoAh', 'JiYeon'
            ];

            memberNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                dropdown.appendChild(option);
            });

            // Set current value in dropdown if it matches
            if (memberNames.includes(currentValue)) {
                dropdown.value = currentValue;
            }

            // Handle dropdown selection
            dropdown.addEventListener('change', (e) => {
                if (e.target.value) {
                    input.value = e.target.value;
                    // Trigger input event to update the canvas
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });

            dropdownContainer.appendChild(dropdownLabel);
            dropdownContainer.appendChild(dropdown);
            editorContent.appendChild(dropdownContainer);
        }

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

            // Track slider dragging state (only for mouse/desktop, not touch/mobile)
            heightSlider.addEventListener('mousedown', (e) => {
                this._isSliderDragging = true;
                e.stopPropagation();
            });
            heightSlider.addEventListener('mouseup', (e) => {
                this._isSliderDragging = false;
                e.stopPropagation();
            });
            heightSlider.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            // On mobile/touch, minimize the editor when slider is touched (hide everything except this slider)
            heightSlider.addEventListener('touchstart', (e) => {
                const backdrop = document.getElementById('canvasTextEditorBackdrop');
                if (backdrop) {
                    backdrop.style.display = 'none';
                }
                const editor = document.getElementById('canvasTextEditor');
                if (editor) {
                    // Store original background for restoration
                    this._originalEditorBackground = editor.style.background || '';
                    // Hide editor background
                    editor.style.background = 'transparent';

                    // Get the content container
                    const editorContent = editor.querySelector('.canvas-text-editor');
                    if (editorContent) {
                        this._originalContentBackground = editorContent.style.background || '';
                        this._originalContentPadding = editorContent.style.padding || '';
                        this._originalContentBoxShadow = editorContent.style.boxShadow || '';
                        this._originalContentBorder = editorContent.style.border || '';

                        // Hide content container background
                        editorContent.style.background = 'transparent';
                        editorContent.style.padding = '0';
                        editorContent.style.boxShadow = 'none';
                        editorContent.style.border = 'none';

                        // Hide all children except the slider container
                        const sliderContainer = heightSlider.closest('.canvas-editor-slider-container');
                        Array.from(editorContent.children).forEach(child => {
                            if (child !== sliderContainer) {
                                child.style.display = 'none';
                            } else {
                                // Explicitly keep the slider container visible and ensure proper styling
                                child.style.display = 'block';
                                child.style.visibility = 'visible';
                                child.style.opacity = '1';
                                child.style.pointerEvents = 'auto';
                                // Ensure the slider itself is visible and interactive
                                const slider = child.querySelector('input[type="range"]');
                                if (slider) {
                                    slider.style.visibility = 'visible';
                                    slider.style.opacity = '1';
                                    slider.style.pointerEvents = 'auto';
                                }
                            }
                        });
                    }
                }
            });

            // On mobile/touch, restore the editor when slider interaction ends
            heightSlider.addEventListener('touchend', () => {
                const backdrop = document.getElementById('canvasTextEditorBackdrop');
                if (backdrop) {
                    backdrop.style.display = 'block';
                }
                const editor = document.getElementById('canvasTextEditor');
                if (editor) {
                    // Restore editor background
                    editor.style.background = this._originalEditorBackground || '';

                    // Get the content container
                    const editorContent = editor.querySelector('.canvas-text-editor');
                    if (editorContent) {
                        // Restore content container styling
                        editorContent.style.background = this._originalContentBackground || '';
                        editorContent.style.padding = this._originalContentPadding || '';
                        editorContent.style.boxShadow = this._originalContentBoxShadow || '';
                        editorContent.style.border = this._originalContentBorder || '';

                        // Restore all children
                        Array.from(editorContent.children).forEach(child => {
                            child.style.display = '';
                        });
                    }
                }
            });

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

        // Add logo upload section for bottom text on both front and back sides
        const isBottomText = (side === 'front' && textType === 'bottom') || (side === 'back' && textType === 'bottomRotated');
        if (isBottomText) {
            // Create logo section container
            const logoSection = document.createElement('div');
            logoSection.className = 'canvas-editor-logo-section';
            logoSection.style.cssText = 'margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color);';

            // Create logo section title
            const logoTitle = document.createElement('div');
            logoTitle.className = 'canvas-editor-logo-title';
            logoTitle.style.cssText = 'font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;';
            logoTitle.innerHTML = '<i data-lucide="image" style="width: 16px; height: 16px;"></i> Logo';
            logoSection.appendChild(logoTitle);

            // Determine which logo we're working with
            const isFrontSide = side === 'front';
            const logoImage = isFrontSide ? CanvasManager.frontLogoImage : CanvasManager.logoImage;

            // Create upload area
            const uploadArea = document.createElement('div');
            uploadArea.className = 'canvas-editor-logo-upload';
            uploadArea.style.cssText = 'margin-bottom: 12px;';

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/png,image/jpeg,image/jpg';
            fileInput.style.display = 'none';
            fileInput.id = 'canvasEditorLogoUpload';

            const uploadButton = document.createElement('button');
            uploadButton.type = 'button';
            uploadButton.className = 'btn btn-secondary btn-small';
            uploadButton.style.cssText = 'width: 100%; margin-bottom: 8px;';
            uploadButton.innerHTML = '<i data-lucide="upload" style="width: 14px; height: 14px;"></i> Upload Logo';

            uploadButton.addEventListener('click', () => fileInput.click());

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    if (isFrontSide) {
                        CanvasManager.loadFrontLogoImage(file);
                    } else {
                        CanvasManager.loadLogoImage(file);
                    }
                    // Update the UI to show controls
                    logoControlsContainer.style.display = 'block';
                    clearButton.style.display = 'block';
                }
            });

            const clearButton = document.createElement('button');
            clearButton.type = 'button';
            clearButton.className = 'btn btn-secondary btn-small';
            clearButton.style.cssText = 'width: 100%;';
            clearButton.style.display = logoImage ? 'block' : 'none';
            clearButton.innerHTML = '<i data-lucide="x" style="width: 14px; height: 14px;"></i> Clear Logo';

            clearButton.addEventListener('click', () => {
                if (isFrontSide) {
                    CanvasManager.clearFrontLogoImage();
                } else {
                    CanvasManager.clearLogoImage();
                }
                logoControlsContainer.style.display = 'none';
                clearButton.style.display = 'none';
            });

            uploadArea.appendChild(fileInput);
            uploadArea.appendChild(uploadButton);
            uploadArea.appendChild(clearButton);
            logoSection.appendChild(uploadArea);

            // Create logo controls container (zoom, position, rotation)
            const logoControlsContainer = document.createElement('div');
            logoControlsContainer.className = 'canvas-editor-logo-controls';
            logoControlsContainer.style.display = logoImage ? 'block' : 'none';

            // Helper function to create a slider control
            const createSlider = (label, min, max, value, onChange) => {
                const container = document.createElement('div');
                container.className = 'canvas-editor-slider-container';
                container.style.cssText = 'margin-bottom: 8px;';

                const sliderLabel = document.createElement('label');
                sliderLabel.className = 'canvas-editor-slider-label';
                sliderLabel.textContent = label;

                const sliderWrapper = document.createElement('div');
                sliderWrapper.className = 'canvas-editor-slider-wrapper';

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.className = 'canvas-editor-slider';
                slider.min = min;
                slider.max = max;
                slider.value = value;

                const valueDisplay = document.createElement('span');
                valueDisplay.className = 'canvas-editor-slider-value';
                valueDisplay.textContent = label.includes('Rotation') ? `${value}°` : label.includes('Zoom') ? `${value}%` : `${value}px`;

                // Track slider dragging state (only for mouse/desktop, not touch/mobile)
                slider.addEventListener('mousedown', (e) => {
                    this._isSliderDragging = true;
                    e.stopPropagation();
                });
                slider.addEventListener('mouseup', (e) => {
                    this._isSliderDragging = false;
                    e.stopPropagation();
                });
                slider.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                // On mobile/touch, minimize the editor when slider is touched (hide everything except this slider)
                slider.addEventListener('touchstart', (e) => {
                    const backdrop = document.getElementById('canvasTextEditorBackdrop');
                    if (backdrop) {
                        backdrop.style.display = 'none';
                    }
                    const editor = document.getElementById('canvasTextEditor');
                    if (editor) {
                        // Store original background for restoration
                        this._originalEditorBackground = editor.style.background || '';
                        // Hide editor background
                        editor.style.background = 'transparent';

                        // Get the content container
                        const editorContent = editor.querySelector('.canvas-text-editor');
                        if (editorContent) {
                            this._originalContentBackground = editorContent.style.background || '';
                            this._originalContentPadding = editorContent.style.padding || '';
                            this._originalContentBoxShadow = editorContent.style.boxShadow || '';
                            this._originalContentBorder = editorContent.style.border || '';

                            // Hide content container background
                            editorContent.style.background = 'transparent';
                            editorContent.style.padding = '0';
                            editorContent.style.boxShadow = 'none';
                            editorContent.style.border = 'none';

                            // Hide all children except the slider container and its parents
                            const sliderContainer = slider.closest('.canvas-editor-slider-container');
                            const logoSection = slider.closest('.canvas-editor-logo-section');

                            Array.from(editorContent.children).forEach(child => {
                                if (child === logoSection || child === sliderContainer) {
                                    // Keep logo section visible if slider is inside it
                                    child.style.display = 'block';
                                    child.style.visibility = 'visible';
                                    child.style.opacity = '1';
                                    child.style.pointerEvents = 'auto';
                                } else if (logoSection && logoSection.contains(child)) {
                                    // This child is inside logo section, check if it's the slider container
                                    if (child === sliderContainer) {
                                        child.style.display = 'block';
                                        child.style.visibility = 'visible';
                                        child.style.opacity = '1';
                                        child.style.pointerEvents = 'auto';
                                    }
                                } else {
                                    // Hide everything else
                                    child.style.display = 'none';
                                }
                            });

                            // If slider is in logo section, hide logo section children except slider
                            if (logoSection) {
                                Array.from(logoSection.children).forEach(child => {
                                    const logoControls = logoSection.querySelector('.canvas-editor-logo-controls');
                                    if (child === logoControls) {
                                        child.style.display = 'block';
                                        child.style.visibility = 'visible';
                                        child.style.opacity = '1';
                                        child.style.pointerEvents = 'auto';
                                        // Hide all sliders in logo controls except the active one
                                        Array.from(logoControls.children).forEach(logoChild => {
                                            if (logoChild === sliderContainer) {
                                                logoChild.style.display = 'block';
                                                logoChild.style.visibility = 'visible';
                                                logoChild.style.opacity = '1';
                                                logoChild.style.pointerEvents = 'auto';
                                                // Ensure the slider itself is visible and interactive
                                                const activeSlider = logoChild.querySelector('input[type="range"]');
                                                if (activeSlider) {
                                                    activeSlider.style.visibility = 'visible';
                                                    activeSlider.style.opacity = '1';
                                                    activeSlider.style.pointerEvents = 'auto';
                                                }
                                            } else {
                                                logoChild.style.display = 'none';
                                            }
                                        });
                                    } else {
                                        child.style.display = 'none';
                                    }
                                });
                            }
                        }
                    }
                });

                // On mobile/touch, restore the editor when slider interaction ends
                slider.addEventListener('touchend', () => {
                    const backdrop = document.getElementById('canvasTextEditorBackdrop');
                    if (backdrop) {
                        backdrop.style.display = 'block';
                    }
                    const editor = document.getElementById('canvasTextEditor');
                    if (editor) {
                        // Restore editor background
                        editor.style.background = this._originalEditorBackground || '';

                        // Get the content container
                        const editorContent = editor.querySelector('.canvas-text-editor');
                        if (editorContent) {
                            // Restore content container styling
                            editorContent.style.background = this._originalContentBackground || '';
                            editorContent.style.padding = this._originalContentPadding || '';
                            editorContent.style.boxShadow = this._originalContentBoxShadow || '';
                            editorContent.style.border = this._originalContentBorder || '';

                            // Restore all children
                            Array.from(editorContent.children).forEach(child => {
                                child.style.display = '';
                            });
                        }
                    }
                });

                slider.addEventListener('input', (e) => {
                    const val = parseInt(e.target.value);
                    valueDisplay.textContent = label.includes('Rotation') ? `${val}°` : label.includes('Zoom') ? `${val}%` : `${val}px`;
                    onChange(val);
                });

                sliderWrapper.appendChild(slider);
                sliderWrapper.appendChild(valueDisplay);
                container.appendChild(sliderLabel);
                container.appendChild(sliderWrapper);

                return container;
            };

            // Add zoom slider
            const currentZoom = isFrontSide ? CanvasManager.frontLogoZoom * 100 : CanvasManager.logoZoom * 100;
            const zoomSlider = createSlider('Logo Zoom', 20, 300, currentZoom, (value) => {
                if (isFrontSide) {
                    CanvasManager.setFrontLogoZoom(value / 100);
                } else {
                    CanvasManager.setLogoZoom(value / 100);
                }
            });
            logoControlsContainer.appendChild(zoomSlider);

            // Add position X slider
            const currentPosX = isFrontSide ? CanvasManager.frontLogoPosX : CanvasManager.logoPosX;
            const posXSlider = createSlider('Position X', -100, 100, currentPosX, (value) => {
                const currentY = isFrontSide ? CanvasManager.frontLogoPosY : CanvasManager.logoPosY;
                if (isFrontSide) {
                    CanvasManager.setFrontLogoPosition(value, currentY);
                } else {
                    CanvasManager.setLogoPosition(value, currentY);
                }
            });
            logoControlsContainer.appendChild(posXSlider);

            // Add position Y slider
            const currentPosY = isFrontSide ? CanvasManager.frontLogoPosY : CanvasManager.logoPosY;
            const posYSlider = createSlider('Position Y', -100, 100, currentPosY, (value) => {
                const currentX = isFrontSide ? CanvasManager.frontLogoPosX : CanvasManager.logoPosX;
                if (isFrontSide) {
                    CanvasManager.setFrontLogoPosition(currentX, value);
                } else {
                    CanvasManager.setLogoPosition(currentX, value);
                }
            });
            logoControlsContainer.appendChild(posYSlider);

            // Add rotation slider
            const currentRotation = isFrontSide ? CanvasManager.frontLogoRotation : CanvasManager.logoRotation;
            const rotationSlider = createSlider('Rotation', 0, 360, currentRotation, (value) => {
                if (isFrontSide) {
                    CanvasManager.setFrontLogoRotation(value);
                } else {
                    CanvasManager.setLogoRotation(value);
                }
            });
            logoControlsContainer.appendChild(rotationSlider);

            logoSection.appendChild(logoControlsContainer);
            editorContent.appendChild(logoSection);
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
                        // Don't restore bottom text if front logo is present
                        if (!CanvasManager.frontLogoImage) {
                            CanvasManager.setText(undefined, undefined, newValue);
                        }
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
                        // Don't restore bottom text if back logo is present
                        if (!CanvasManager.logoImage) {
                            updateData.groupName = newValue;
                        }
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

        // Initialize Lucide icons for dynamically created elements
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }

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

        // Add global listeners to handle drag end anywhere (only for mouse/desktop, not touch/mobile)
        const globalMouseUpHandler = () => {
            if (this._isSliderDragging) {
                this._isSliderDragging = false;
            }
        };

        document.addEventListener('mouseup', globalMouseUpHandler);

        // Store handler for cleanup
        this._globalMouseUpHandler = globalMouseUpHandler;

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

        // Detect if this is a touch event (mobile) or mouse event (desktop)
        const isTouchEvent = event.sourceCapabilities?.firesTouchEvents ||
                            event.pointerType === 'touch' ||
                            ('ontouchstart' in window && event.type.includes('touch'));

        // Only apply desktop protections for mouse events, not touch events
        if (!isTouchEvent) {
            // Don't close if a slider is being actively dragged (desktop only)
            if (UIManager._isSliderDragging) {
                return;
            }

            // Don't close if the event is from a slider being dragged (desktop only)
            if (event.target && event.target.type === 'range') {
                return;
            }

            // Don't close if clicking on slider-related elements (desktop only)
            if (event.target && (
                event.target.classList.contains('canvas-editor-slider') ||
                event.target.classList.contains('canvas-editor-slider-value') ||
                event.target.classList.contains('canvas-editor-slider-wrapper') ||
                event.target.classList.contains('canvas-editor-slider-container') ||
                event.target.classList.contains('canvas-editor-slider-label')
            )) {
                return;
            }
        }

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

        // Clean up global event listeners
        if (this._globalMouseUpHandler) {
            document.removeEventListener('mouseup', this._globalMouseUpHandler);
            this._globalMouseUpHandler = null;
        }

        // Clean up save function reference
        this._currentEditorSaveFunction = null;
        // Clean up slider dragging flag
        this._isSliderDragging = false;
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
    },

    /**
     * Initialize drag-to-pan functionality on canvas (desktop)
     */
    initCanvasDragPan() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;

        let isDragging = false;
        let startX, startY, initialPanX, initialPanY;

        // Set initial cursor
        canvas.style.cursor = CanvasManager.hasImage() ? 'grab' : 'pointer';

        canvas.addEventListener('mousedown', (e) => {
            // Only start drag if image is loaded
            if (!CanvasManager.hasImage()) return;

            // Check if click is on a text area (let text editing take precedence)
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const canvasX = (e.clientX - rect.left) * scaleX;
            const canvasY = (e.clientY - rect.top) * scaleY;

            if (CanvasManager.getClickedText(canvasX, canvasY)) {
                return; // Let text editor handle this click
            }

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialPanX = CanvasManager.imagePosX;
            initialPanY = CanvasManager.imagePosY;
            canvas.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            const deltaX = (e.clientX - startX) * scaleX;
            const deltaY = (e.clientY - startY) * scaleX; // Use same scale for uniform movement

            const newPanX = Math.max(-300, Math.min(300, initialPanX + deltaX));
            const newPanY = Math.max(-300, Math.min(300, initialPanY + deltaY));

            CanvasManager.setPan(Math.round(newPanX), Math.round(newPanY));
            this.syncSliderValue('panX', Math.round(newPanX));
            this.syncSliderValue('panY', Math.round(newPanY));
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                canvas.style.cursor = CanvasManager.hasImage() ? 'grab' : 'pointer';
            }
        });

        // Update cursor when image is loaded/removed
        this._updateCanvasCursor = () => {
            if (!isDragging) {
                canvas.style.cursor = CanvasManager.hasImage() ? 'grab' : 'pointer';
            }
        };
    },

    /**
     * Initialize mouse wheel zoom on canvas (desktop)
     */
    initCanvasWheelZoom() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;

        canvas.addEventListener('wheel', (e) => {
            if (!CanvasManager.hasImage()) return;
            e.preventDefault();

            const currentZoom = CanvasManager.imageScale * 100;
            // Scroll down = zoom out, scroll up = zoom in
            const zoomDelta = e.deltaY > 0 ? -10 : 10;
            const newZoom = Math.max(50, Math.min(200, currentZoom + zoomDelta));

            CanvasManager.setZoom(newZoom / 100);
            this.syncSliderValue('zoom', newZoom);
        }, { passive: false });
    },

    /**
     * Initialize double-click/double-tap to reset pan
     */
    initCanvasDoubleClickReset() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;

        const handleDoubleAction = () => {
            if (!CanvasManager.hasImage()) return;

            CanvasManager.setPan(0, 0);
            this.syncSliderValue('panX', 0);
            this.syncSliderValue('panY', 0);
        };

        // Desktop double-click
        canvas.addEventListener('dblclick', (e) => {
            // Check if click is on a text area
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const canvasX = (e.clientX - rect.left) * scaleX;
            const canvasY = (e.clientY - rect.top) * scaleY;

            if (CanvasManager.getClickedText(canvasX, canvasY)) {
                return; // Don't reset if clicking on text
            }

            e.preventDefault();
            handleDoubleAction();
        });
    },

    /**
     * Initialize touch drag-to-pan on canvas (mobile)
     */
    initCanvasTouchPan() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;

        let isPanning = false;
        let startX, startY, initialPanX, initialPanY;
        let hasMoved = false;

        canvas.addEventListener('touchstart', (e) => {
            if (!CanvasManager.hasImage()) return;
            if (e.touches.length !== 1) return; // Only single touch for pan

            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            initialPanX = CanvasManager.imagePosX;
            initialPanY = CanvasManager.imagePosY;
            isPanning = true;
            hasMoved = false;
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!isPanning || e.touches.length !== 1) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            // Only start panning if movement exceeds threshold
            if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                // Check if this is more like a horizontal swipe (for view switching)
                // Fast horizontal swipe should switch views, not pan
                const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 2;
                if (isHorizontalSwipe && !hasMoved) {
                    return; // Let swipe gesture handler take over
                }

                hasMoved = true;
                e.preventDefault();

                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;

                const scaledDeltaX = deltaX * scaleX;
                const scaledDeltaY = deltaY * scaleX;

                const newPanX = Math.max(-300, Math.min(300, initialPanX + scaledDeltaX));
                const newPanY = Math.max(-300, Math.min(300, initialPanY + scaledDeltaY));

                CanvasManager.setPan(Math.round(newPanX), Math.round(newPanY));
                this.syncSliderValue('panX', Math.round(newPanX));
                this.syncSliderValue('panY', Math.round(newPanY));
            }
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            isPanning = false;
        });
    },

    /**
     * Initialize two-finger touch gestures on canvas (mobile)
     * - Two-finger pan: move image when both fingers move in the same direction
     * - Pinch-to-zoom: zoom when fingers move apart or together
     * This prevents accidental page scroll by requiring 2 fingers for image manipulation
     */
    initCanvasPinchZoom() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;

        let initialDistance = null;
        let initialZoom = null;
        let initialPanX = null;
        let initialPanY = null;
        let initialMidpointX = null;
        let initialMidpointY = null;
        let isTwoFingerGesture = false;

        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2 && CanvasManager.hasImage()) {
                isTwoFingerGesture = true;

                // Calculate initial distance for pinch-to-zoom
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                initialDistance = Math.hypot(dx, dy);
                initialZoom = CanvasManager.imageScale;

                // Calculate initial midpoint for two-finger pan
                initialMidpointX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                initialMidpointY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                initialPanX = CanvasManager.imagePosX;
                initialPanY = CanvasManager.imagePosY;
            }
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!isTwoFingerGesture || e.touches.length !== 2 || !initialDistance) return;
            e.preventDefault();

            // Calculate current distance for pinch-to-zoom
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const currentDistance = Math.hypot(dx, dy);

            // Calculate current midpoint for two-finger pan
            const currentMidpointX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const currentMidpointY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            // Apply pinch-to-zoom
            const zoomRatio = currentDistance / initialDistance;
            const newZoom = Math.max(0.5, Math.min(2, initialZoom * zoomRatio));
            CanvasManager.setZoom(newZoom);
            this.syncSliderValue('zoom', Math.round(newZoom * 100));

            // Apply two-finger pan
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            const deltaX = (currentMidpointX - initialMidpointX) * scaleX;
            const deltaY = (currentMidpointY - initialMidpointY) * scaleX;

            const newPanX = Math.max(-300, Math.min(300, initialPanX + deltaX));
            const newPanY = Math.max(-300, Math.min(300, initialPanY + deltaY));

            CanvasManager.setPan(Math.round(newPanX), Math.round(newPanY));
            this.syncSliderValue('panX', Math.round(newPanX));
            this.syncSliderValue('panY', Math.round(newPanY));
        }, { passive: false });

        canvas.addEventListener('touchend', (e) => {
            // Only reset when all fingers are lifted
            if (e.touches.length === 0) {
                isTwoFingerGesture = false;
                initialDistance = null;
                initialZoom = null;
                initialPanX = null;
                initialPanY = null;
                initialMidpointX = null;
                initialMidpointY = null;
            }
        });
    },

    /**
     * Initialize floating adjustment overlay (mobile)
     */
    initFloatingAdjustOverlay() {
        const overlay = document.getElementById('floatingAdjustOverlay');
        const closeBtn = document.getElementById('closeFloatingAdjust');
        const resetBtn = document.getElementById('resetPositionBtn');
        const zoomSliderF = document.getElementById('zoomSliderFloating');
        const panXSliderF = document.getElementById('panXSliderFloating');
        const panYSliderF = document.getElementById('panYSliderFloating');
        const zoomValueF = document.getElementById('zoomValueFloating');
        const panXValueF = document.getElementById('panXValueFloating');
        const panYValueF = document.getElementById('panYValueFloating');

        if (!overlay) return;

        // Store references
        this.elements.floatingAdjustOverlay = overlay;
        this.elements.zoomSliderFloating = zoomSliderF;
        this.elements.panXSliderFloating = panXSliderF;
        this.elements.panYSliderFloating = panYSliderF;
        this.elements.zoomValueFloating = zoomValueF;
        this.elements.panXValueFloating = panXValueF;
        this.elements.panYValueFloating = panYValueF;

        // Close button
        closeBtn?.addEventListener('click', () => this.hideFloatingAdjustOverlay());

        // Reset button
        resetBtn?.addEventListener('click', () => {
            CanvasManager.setPan(0, 0);
            CanvasManager.setZoom(1);
            this.syncSliderValue('panX', 0);
            this.syncSliderValue('panY', 0);
            this.syncSliderValue('zoom', 100);
        });

        // Floating slider events
        zoomSliderF?.addEventListener('input', (e) => {
            const value = e.target.value;
            zoomValueF.textContent = `${value}%`;
            CanvasManager.setZoom(value / 100);
            this.syncSliderValue('zoom', value);
        });

        panXSliderF?.addEventListener('input', (e) => {
            const value = e.target.value;
            panXValueF.textContent = `${value}px`;
            CanvasManager.setPan(parseInt(value), CanvasManager.imagePosY);
            this.syncSliderValue('panX', value);
        });

        panYSliderF?.addEventListener('input', (e) => {
            const value = e.target.value;
            panYValueF.textContent = `${value}px`;
            CanvasManager.setPan(CanvasManager.imagePosX, parseInt(value));
            this.syncSliderValue('panY', value);
        });
    },

    /**
     * Show floating adjustment overlay
     */
    showFloatingAdjustOverlay() {
        const overlay = this.elements.floatingAdjustOverlay;
        if (overlay) {
            overlay.classList.add('visible');
            // Re-initialize Lucide icons in the overlay
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    },

    /**
     * Hide floating adjustment overlay
     */
    hideFloatingAdjustOverlay() {
        const overlay = this.elements.floatingAdjustOverlay;
        if (overlay) {
            overlay.classList.remove('visible');
        }
    },

    /**
     * Initialize mobile edge pan sliders (thin sliders on left and bottom of canvas)
     */
    initMobilePanSliders() {
        const mobilePanXSlider = document.getElementById('mobilePanXSlider');
        const mobilePanYSlider = document.getElementById('mobilePanYSlider');
        const mobilePanYContainer = document.getElementById('mobilePanControls');
        const mobilePanXContainer = document.getElementById('mobilePanXContainer');

        if (!mobilePanXSlider || !mobilePanYSlider) return;

        // Store references
        this.elements.mobilePanXSlider = mobilePanXSlider;
        this.elements.mobilePanYSlider = mobilePanYSlider;
        this.elements.mobilePanYContainer = mobilePanYContainer;
        this.elements.mobilePanXContainer = mobilePanXContainer;

        // X slider (horizontal pan - at bottom)
        mobilePanXSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            CanvasManager.setPan(value, CanvasManager.imagePosY);
            this.syncSliderValue('panX', value);
        });

        // Y slider (vertical pan - on left, rotated so negate value)
        mobilePanYSlider.addEventListener('input', (e) => {
            const value = -parseInt(e.target.value);
            CanvasManager.setPan(CanvasManager.imagePosX, value);
            this.syncSliderValue('panY', value);
        });

        // Prevent touch events from propagating to page scroll
        [mobilePanXSlider, mobilePanYSlider].forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            }, { passive: true });

            slider.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            }, { passive: true });
        });
    },

    /**
     * Show/hide mobile pan controls based on whether image is loaded
     */
    updateMobilePanControlsVisibility() {
        const mobilePanYContainer = this.elements.mobilePanYContainer;
        const mobilePanXContainer = this.elements.mobilePanXContainer;

        if (CanvasManager.hasImage()) {
            if (mobilePanYContainer) mobilePanYContainer.classList.remove('hidden');
            if (mobilePanXContainer) mobilePanXContainer.classList.remove('hidden');
        } else {
            if (mobilePanYContainer) mobilePanYContainer.classList.add('hidden');
            if (mobilePanXContainer) mobilePanXContainer.classList.add('hidden');
        }
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
        'adjust': () => {
            // Show floating adjustment overlay
            UIManager.showFloatingAdjustOverlay();
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
        'logo': () => {
            const section = document.querySelector('.collapsible-section:has(#frontLogoUpload)');
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
        'logo-back': () => {
            const section = document.querySelector('.collapsible-section:has(#logoUpload)');
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

