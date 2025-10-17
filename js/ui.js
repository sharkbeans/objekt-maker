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

            // Text controls
            topText: document.getElementById('topText'),
            middleText: document.getElementById('middleText'),
            bottomText: document.getElementById('bottomText'),
            textColorPicker: document.getElementById('textColorPicker'),
            textColorHex: document.getElementById('textColorHex'),
            presetColorsText: document.querySelectorAll('.preset-color-text'),

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
            backGroupNameMobile: document.getElementById('backGroupNameMobile')
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
        this.elements.exportBtnMobile.addEventListener('click', () => this.exportImage());
        this.elements.resetBtnMobile.addEventListener('click', () => this.resetAll());

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
        }

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
    },

    /**
     * Export image - Downloads only the currently active view (front or back)
     * Enhanced for iOS devices to save to gallery
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

            const filename = `objekt-${this.currentView}`;

            // Check if we're on iOS
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

            if (isIOS) {
                // iOS-specific download logic for better gallery support
                await this.exportImageIOS(canvas, filename);
            } else {
                // Standard download for desktop and Android
                await this.exportImageStandard(canvas, filename);
            }

            this.showSuccessMessage(`${this.currentView === 'front' ? 'Front' : 'Back'} side downloaded!`);
        } catch (error) {
            this.showErrorMessage('Failed to export image');
            console.error(error);
        }
    },

    /**
     * Export image for iOS devices - Opens in new tab for "Save to Photos"
     * @param {HTMLCanvasElement} canvas - The canvas to export
     * @param {string} filename - Base filename without extension
     */
    async exportImageIOS(canvas, filename) {
        return new Promise((resolve, reject) => {
            try {
                // Convert canvas to blob
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create image blob'));
                        return;
                    }

                    // Create object URL
                    const url = URL.createObjectURL(blob);

                    // Open in new tab so user can long-press and "Save to Photos"
                    const newWindow = window.open(url, '_blank');

                    if (!newWindow) {
                        // Fallback: Try creating a download link
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${filename}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }

                    // Clean up after a delay
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 10000);

                    resolve(true);
                }, 'image/png', 0.95);
            } catch (error) {
                reject(error);
            }
        });
    },

    /**
     * Export image using standard download method
     * @param {HTMLCanvasElement} canvas - The canvas to export
     * @param {string} filename - Base filename without extension
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
                    link.download = `${filename}.png`;
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
    switchCanvasView(view) {
        // Track current view
        this.currentView = view;

        // Update toggle button states
        this.elements.toggleBtns.forEach(btn => {
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Switch canvas visibility with fade effect
        if (view === 'front') {
            this.elements.canvasWrapper.classList.add('active');
            this.elements.backCanvasWrapper.classList.remove('active');

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
        } else {
            this.elements.canvasWrapper.classList.remove('active');
            this.elements.backCanvasWrapper.classList.add('active');

            // Hide upload section on back view
            if (this.elements.uploadSection) {
                this.elements.uploadSection.style.display = 'none';
            }

            // Automatically enable and generate back side when switching to back view
            CanvasManager.setBackSideEnabled(true);
            CanvasManager.updateBackSidePreview();

            // Sync colors from front to back
            this.syncBackColors();

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
            // Hide mobile adjustments on back view (not needed for back side)
            if (this.elements.mobileAdjustments) {
                this.elements.mobileAdjustments.style.setProperty('display', 'none', 'important');
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
    }
};

// Export to global scope for browser usage
window.UIManager = UIManager;

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}
