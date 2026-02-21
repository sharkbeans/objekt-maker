/**
 * bulk.js
 * BulkManager - Handles bulk card creation with a shared template
 */

const BulkManager = {
    rows: [],          // Array of { image, fileName, topText, middleText, bottomText, backNameValue, backClassValue, backSeasonValue, imageScale, imagePosX, imagePosY }
    template: null,    // Snapshot of PresetManager.collectState() + image refs
    isOpen: false,
    previewIndex: -1,

    // Drag state for preview canvas
    _drag: { active: false, startX: 0, startY: 0, initialPanX: 0, initialPanY: 0 },

    // DOM element refs
    elements: {},

    init() {
        this.elements = {
            modal: document.getElementById('bulkModal'),
            backdrop: document.querySelector('.bulk-modal-backdrop'),
            closeBtn: document.getElementById('closeBulkModal'),
            uploadZone: document.getElementById('bulkUploadZone'),
            fileInput: document.getElementById('bulkImageUpload'),
            actionsBar: document.getElementById('bulkActionsBar'),
            countLabel: document.getElementById('bulkCount'),
            applyRow1Btn: document.getElementById('bulkApplyRow1'),
            addMoreBtn: document.getElementById('bulkAddMore'),
            clearAllBtn: document.getElementById('bulkClearAll'),
            tableContainer: document.getElementById('bulkTableContainer'),
            tableBody: document.getElementById('bulkTableBody'),
            previewArea: document.getElementById('bulkPreviewArea'),
            previewTitle: document.getElementById('bulkPreviewTitle'),
            closePreviewBtn: document.getElementById('bulkClosePreview'),
            previewFront: document.getElementById('bulkPreviewFront'),
            previewBack: document.getElementById('bulkPreviewBack'),
            progress: document.getElementById('bulkProgress'),
            progressFill: document.getElementById('bulkProgressFill'),
            progressText: document.getElementById('bulkProgressText'),
            exportAllBtn: document.getElementById('bulkExportAll'),
            bulkCreateBtn: document.getElementById('bulkCreateBtn'),
            bulkCreateBtnMobile: document.getElementById('bulkCreateBtnMobile'),
            // Preview adjustment controls
            previewZoom: document.getElementById('bulkPreviewZoom'),
            previewZoomValue: document.getElementById('bulkPreviewZoomValue'),
            previewPanX: document.getElementById('bulkPreviewPanX'),
            previewPanXValue: document.getElementById('bulkPreviewPanXValue'),
            previewPanY: document.getElementById('bulkPreviewPanY'),
            previewPanYValue: document.getElementById('bulkPreviewPanYValue'),
        };

        this.bindEvents();
        console.log('[OK] BulkManager initialized');
    },

    bindEvents() {
        // Open modal
        this.elements.bulkCreateBtn.addEventListener('click', () => this.openModal());
        if (this.elements.bulkCreateBtnMobile) {
            this.elements.bulkCreateBtnMobile.addEventListener('click', () => this.openModal());
        }

        // Close modal
        this.elements.closeBtn.addEventListener('click', () => this.closeModal());
        this.elements.backdrop.addEventListener('click', () => this.closeModal());

        // File upload
        this.elements.uploadZone.addEventListener('click', () => this.elements.fileInput.click());
        this.elements.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));

        // Drag and drop
        this.elements.uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.elements.uploadZone.classList.add('drag-over');
        });
        this.elements.uploadZone.addEventListener('dragleave', () => {
            this.elements.uploadZone.classList.remove('drag-over');
        });
        this.elements.uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.elements.uploadZone.classList.remove('drag-over');
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            if (files.length > 0) this.handleFiles(files);
        });

        // Action buttons
        this.elements.applyRow1Btn.addEventListener('click', () => this.applyRow1ToAll());
        this.elements.addMoreBtn.addEventListener('click', () => this.elements.fileInput.click());
        this.elements.clearAllBtn.addEventListener('click', () => this.clearAll());
        this.elements.closePreviewBtn.addEventListener('click', () => this.closePreview());
        this.elements.exportAllBtn.addEventListener('click', () => this.exportAll());

        // Preview canvas drag-to-pan
        this.initPreviewDrag();
        this.initPreviewWheel();
        this.initPreviewSliders();
    },

    initPreviewDrag() {
        const canvas = this.elements.previewFront;

        canvas.addEventListener('mousedown', (e) => {
            if (this.previewIndex < 0) return;
            const row = this.rows[this.previewIndex];
            this._drag.active = true;
            this._drag.startX = e.clientX;
            this._drag.startY = e.clientY;
            this._drag.initialPanX = row.imagePosX;
            this._drag.initialPanY = row.imagePosY;
            canvas.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!this._drag.active || this.previewIndex < 0) return;
            const row = this.rows[this.previewIndex];
            const canvas = this.elements.previewFront;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            const deltaX = (e.clientX - this._drag.startX) * scaleX;
            const deltaY = (e.clientY - this._drag.startY) * scaleX;

            row.imagePosX = Math.max(-300, Math.min(300, Math.round(this._drag.initialPanX + deltaX)));
            row.imagePosY = Math.max(-300, Math.min(300, Math.round(this._drag.initialPanY + deltaY)));

            this.syncPreviewSliders(row);
            this.refreshPreview();
        });

        document.addEventListener('mouseup', () => {
            if (this._drag.active) {
                this._drag.active = false;
                this.elements.previewFront.style.cursor = 'grab';
            }
        });

        // Touch support
        canvas.addEventListener('touchstart', (e) => {
            if (this.previewIndex < 0 || e.touches.length !== 1) return;
            const touch = e.touches[0];
            const row = this.rows[this.previewIndex];
            this._drag.active = true;
            this._drag.startX = touch.clientX;
            this._drag.startY = touch.clientY;
            this._drag.initialPanX = row.imagePosX;
            this._drag.initialPanY = row.imagePosY;
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!this._drag.active || this.previewIndex < 0 || e.touches.length !== 1) return;
            e.preventDefault();
            const touch = e.touches[0];
            const row = this.rows[this.previewIndex];
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            const deltaX = (touch.clientX - this._drag.startX) * scaleX;
            const deltaY = (touch.clientY - this._drag.startY) * scaleX;

            row.imagePosX = Math.max(-300, Math.min(300, Math.round(this._drag.initialPanX + deltaX)));
            row.imagePosY = Math.max(-300, Math.min(300, Math.round(this._drag.initialPanY + deltaY)));

            this.syncPreviewSliders(row);
            this.refreshPreview();
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            this._drag.active = false;
        }, { passive: true });
    },

    initPreviewWheel() {
        this.elements.previewFront.addEventListener('wheel', (e) => {
            if (this.previewIndex < 0) return;
            e.preventDefault();
            const row = this.rows[this.previewIndex];
            const zoomDelta = e.deltaY > 0 ? -5 : 5;
            row.imageScale = Math.max(50, Math.min(200, row.imageScale + zoomDelta));
            this.syncPreviewSliders(row);
            this.refreshPreview();
        }, { passive: false });
    },

    initPreviewSliders() {
        this.elements.previewZoom.addEventListener('input', (e) => {
            if (this.previewIndex < 0) return;
            const row = this.rows[this.previewIndex];
            row.imageScale = parseInt(e.target.value);
            this.elements.previewZoomValue.textContent = `${row.imageScale}%`;
            this.refreshPreview();
        });

        this.elements.previewPanX.addEventListener('input', (e) => {
            if (this.previewIndex < 0) return;
            const row = this.rows[this.previewIndex];
            row.imagePosX = parseInt(e.target.value);
            this.elements.previewPanXValue.textContent = `${row.imagePosX}px`;
            this.refreshPreview();
        });

        this.elements.previewPanY.addEventListener('input', (e) => {
            if (this.previewIndex < 0) return;
            const row = this.rows[this.previewIndex];
            row.imagePosY = parseInt(e.target.value);
            this.elements.previewPanYValue.textContent = `${row.imagePosY}px`;
            this.refreshPreview();
        });
    },

    syncPreviewSliders(row) {
        this.elements.previewZoom.value = row.imageScale;
        this.elements.previewZoomValue.textContent = `${row.imageScale}%`;
        this.elements.previewPanX.value = row.imagePosX;
        this.elements.previewPanXValue.textContent = `${row.imagePosX}px`;
        this.elements.previewPanY.value = row.imagePosY;
        this.elements.previewPanYValue.textContent = `${row.imagePosY}px`;
    },

    captureTemplate() {
        this.template = {
            state: PresetManager.collectState(),
            // Store image references that aren't part of presets
            uploadedImage: CanvasManager.uploadedImage,
            borderImage: CanvasManager.borderImage,
            signatureImage: CanvasManager.signatureImage,
            topLogoImage: CanvasManager.topLogoImage,
            logoImage: CanvasManager.logoImage,
            frontLogoImage: CanvasManager.frontLogoImage,
            frameImage: CanvasManager.frameImage,
            qrCodeCanvas: CanvasManager.qrCodeCanvas,
            qrCodeImage: CanvasManager.qrCodeImage,
        };
    },

    restoreTemplate() {
        if (!this.template) return;
        PresetManager.applyState(this.template.state);
        // Restore image refs
        CanvasManager.uploadedImage = this.template.uploadedImage;
        CanvasManager.borderImage = this.template.borderImage;
        CanvasManager.signatureImage = this.template.signatureImage;
        CanvasManager.topLogoImage = this.template.topLogoImage;
        CanvasManager.logoImage = this.template.logoImage;
        CanvasManager.frontLogoImage = this.template.frontLogoImage;
        CanvasManager.frameImage = this.template.frameImage;
        CanvasManager.qrCodeCanvas = this.template.qrCodeCanvas;
        CanvasManager.qrCodeImage = this.template.qrCodeImage;
        if (CanvasManager.hasImage()) CanvasManager.render();
        CanvasManager.updateBackSidePreview();
    },

    openModal() {
        this.captureTemplate();
        this.isOpen = true;
        this.elements.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.updateUI();
        lucide.createIcons();
    },

    closeModal() {
        this.isOpen = false;
        this.elements.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.closePreview();
    },

    handleFiles(fileList) {
        const files = Array.from(fileList);
        const templateState = this.template.state;

        files.forEach(file => {
            if (!file.type.startsWith('image/')) return;
            if (file.size > 5 * 1024 * 1024) {
                console.warn(`Skipping ${file.name}: exceeds 5MB`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.rows.push({
                        image: img,
                        fileName: file.name,
                        topText: templateState.topText,
                        middleText: templateState.middleText,
                        bottomText: templateState.bottomText,
                        backNameValue: templateState.backNameValue,
                        backClassValue: templateState.backClassValue,
                        backSeasonValue: templateState.backSeasonValue,
                        // Per-image transform (defaults from template)
                        imageScale: Math.round(templateState.imageScale * 100),
                        imagePosX: templateState.imagePosX,
                        imagePosY: templateState.imagePosY,
                    });
                    this.updateUI();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        // Reset file input so same files can be re-selected
        this.elements.fileInput.value = '';
    },

    removeRow(index) {
        this.rows.splice(index, 1);
        this.updateUI();
        if (this.previewIndex === index) {
            this.closePreview();
        } else if (this.previewIndex > index) {
            this.previewIndex--;
        }
    },

    moveRow(fromIndex, direction) {
        const toIndex = fromIndex + direction;
        if (toIndex < 0 || toIndex >= this.rows.length) return;
        const temp = this.rows[fromIndex];
        this.rows[fromIndex] = this.rows[toIndex];
        this.rows[toIndex] = temp;
        this.updateUI();
    },

    applyRow1ToAll() {
        if (this.rows.length < 2) return;
        const first = this.rows[0];
        for (let i = 1; i < this.rows.length; i++) {
            this.rows[i].topText = first.topText;
            this.rows[i].middleText = first.middleText;
            this.rows[i].bottomText = first.bottomText;
            this.rows[i].backNameValue = first.backNameValue;
            this.rows[i].backClassValue = first.backClassValue;
            this.rows[i].backSeasonValue = first.backSeasonValue;
        }
        this.renderTable();
    },

    clearAll() {
        this.rows = [];
        this.closePreview();
        this.updateUI();
    },

    updateUI() {
        const hasRows = this.rows.length > 0;
        this.elements.actionsBar.style.display = hasRows ? 'flex' : 'none';
        this.elements.tableContainer.style.display = hasRows ? 'block' : 'none';
        this.elements.countLabel.textContent = `${this.rows.length} card${this.rows.length !== 1 ? 's' : ''}`;
        this.elements.exportAllBtn.disabled = !hasRows;

        // Hide back-side columns if objekt border is off
        const showBack = CanvasManager.showObjektBorder;
        document.querySelectorAll('.bulk-back-col').forEach(el => {
            el.style.display = showBack ? '' : 'none';
        });

        this.renderTable();
    },

    renderTable() {
        const tbody = this.elements.tableBody;
        const showBack = CanvasManager.showObjektBorder;

        tbody.innerHTML = '';

        this.rows.forEach((row, index) => {
            const tr = document.createElement('tr');
            if (index === 0) tr.classList.add('bulk-row-template');
            tr.innerHTML = `
                <td class="bulk-col-num">${index + 1}</td>
                <td class="bulk-col-thumb">
                    <img src="${row.image.src}" alt="Card ${index + 1}" class="bulk-thumbnail">
                </td>
                <td class="bulk-col-text">
                    <input type="text" class="bulk-input" value="${this.escapeHtml(row.topText)}" data-index="${index}" data-field="topText">
                </td>
                <td class="bulk-col-text">
                    <input type="text" class="bulk-input" value="${this.escapeHtml(row.middleText)}" data-index="${index}" data-field="middleText">
                </td>
                <td class="bulk-col-text">
                    <input type="text" class="bulk-input" value="${this.escapeHtml(row.bottomText)}" data-index="${index}" data-field="bottomText">
                </td>
                <td class="bulk-col-text bulk-back-col" ${!showBack ? 'style="display:none"' : ''}>
                    <input type="text" class="bulk-input" value="${this.escapeHtml(row.backNameValue)}" data-index="${index}" data-field="backNameValue">
                </td>
                <td class="bulk-col-text bulk-back-col" ${!showBack ? 'style="display:none"' : ''}>
                    <input type="text" class="bulk-input" value="${this.escapeHtml(row.backClassValue)}" data-index="${index}" data-field="backClassValue">
                </td>
                <td class="bulk-col-text bulk-back-col" ${!showBack ? 'style="display:none"' : ''}>
                    <input type="text" class="bulk-input" value="${this.escapeHtml(row.backSeasonValue)}" data-index="${index}" data-field="backSeasonValue">
                </td>
                <td class="bulk-col-actions">
                    <button class="bulk-action-btn" data-action="preview" data-index="${index}" title="Preview & Adjust">
                        <i data-lucide="eye"></i>
                    </button>
                    <button class="bulk-action-btn" data-action="moveUp" data-index="${index}" title="Move up" ${index === 0 ? 'disabled' : ''}>
                        <i data-lucide="chevron-up"></i>
                    </button>
                    <button class="bulk-action-btn" data-action="moveDown" data-index="${index}" title="Move down" ${index === this.rows.length - 1 ? 'disabled' : ''}>
                        <i data-lucide="chevron-down"></i>
                    </button>
                    <button class="bulk-action-btn bulk-action-delete" data-action="remove" data-index="${index}" title="Remove">
                        <i data-lucide="trash-2"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);

            // Add separator after row 1
            if (index === 0 && this.rows.length > 1) {
                const colCount = showBack ? 9 : 6;
                const sep = document.createElement('tr');
                sep.classList.add('bulk-row-separator');
                sep.innerHTML = `<td colspan="${colCount}"><p>All cards below inherit Row 1's text as default values. Edit individually as needed.</p></td>`;
                tbody.appendChild(sep);
            }
        });

        // Bind input change events
        tbody.querySelectorAll('.bulk-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const idx = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                this.rows[idx][field] = e.target.value;
            });
        });

        // Bind action buttons
        tbody.querySelectorAll('.bulk-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.bulk-action-btn');
                const action = button.dataset.action;
                const idx = parseInt(button.dataset.index);
                switch (action) {
                    case 'preview': this.previewCard(idx); break;
                    case 'moveUp': this.moveRow(idx, -1); break;
                    case 'moveDown': this.moveRow(idx, 1); break;
                    case 'remove': this.removeRow(idx); break;
                }
            });
        });

        lucide.createIcons();
    },

    applyRowToCanvas(row) {
        // Apply template state (everything except the main image)
        PresetManager.applyState(this.template.state);

        // Restore shared images (logos, signature, border, QR, frame)
        CanvasManager.borderImage = this.template.borderImage;
        CanvasManager.signatureImage = this.template.signatureImage;
        CanvasManager.topLogoImage = this.template.topLogoImage;
        CanvasManager.logoImage = this.template.logoImage;
        CanvasManager.frontLogoImage = this.template.frontLogoImage;
        CanvasManager.frameImage = this.template.frameImage;
        CanvasManager.qrCodeCanvas = this.template.qrCodeCanvas;
        CanvasManager.qrCodeImage = this.template.qrCodeImage;

        // Apply per-row overrides
        CanvasManager.uploadedImage = row.image;
        CanvasManager.topText = row.topText;
        CanvasManager.middleText = row.middleText;
        CanvasManager.bottomText = row.bottomText;
        CanvasManager.backNameValue = row.backNameValue;
        CanvasManager.backClassValue = row.backClassValue;
        CanvasManager.backSeasonValue = row.backSeasonValue;

        // Apply per-image transform
        CanvasManager.imageScale = row.imageScale / 100;
        CanvasManager.imagePosX = row.imagePosX;
        CanvasManager.imagePosY = row.imagePosY;
    },

    previewCard(index) {
        if (index < 0 || index >= this.rows.length) return;
        this.previewIndex = index;

        const row = this.rows[index];
        this.elements.previewTitle.textContent = `Preview - Card ${index + 1}`;
        this.elements.previewArea.style.display = 'block';

        // Sync sliders to this row's values
        this.syncPreviewSliders(row);

        // Render preview
        this.refreshPreview();

        // Scroll preview into view
        this.elements.previewArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    refreshPreview() {
        if (this.previewIndex < 0 || this.previewIndex >= this.rows.length) return;
        const row = this.rows[this.previewIndex];

        // Apply this row's data to CanvasManager and render
        this.applyRowToCanvas(row);
        CanvasManager.showTemplate = false;
        CanvasManager.showTemplateBack = false;
        CanvasManager.render();

        // Copy front canvas to preview
        const mainCanvas = document.getElementById('mainCanvas');
        const pf = this.elements.previewFront;
        pf.width = mainCanvas.width;
        pf.height = mainCanvas.height;
        pf.getContext('2d').drawImage(mainCanvas, 0, 0);

        // Render back side
        if (CanvasManager.showObjektBorder) {
            const backCanvas = CanvasManager.renderBackSide();
            const pb = this.elements.previewBack;
            pb.width = backCanvas.width;
            pb.height = backCanvas.height;
            pb.getContext('2d').drawImage(backCanvas, 0, 0);
            this.elements.previewBack.parentElement.style.display = '';
        } else {
            this.elements.previewBack.parentElement.style.display = 'none';
        }

        // Restore original state so main editor isn't affected
        this.restoreTemplate();
    },

    closePreview() {
        this.previewIndex = -1;
        this.elements.previewArea.style.display = 'none';
    },

    canvasToBlob(canvas) {
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Failed to create blob'));
            }, 'image/png', 0.95);
        });
    },

    async exportAll() {
        if (this.rows.length === 0) return;

        const zip = new JSZip();
        const total = this.rows.length;
        const showBack = CanvasManager.showObjektBorder;

        // Show progress
        this.elements.progress.style.display = 'flex';
        this.elements.exportAllBtn.disabled = true;
        this.elements.exportAllBtn.innerHTML = '<i data-lucide="loader"></i> Generating...';
        lucide.createIcons();

        // Hide template overlays during export
        const templateWasVisible = CanvasManager.showTemplate;
        const templateBackWasVisible = CanvasManager.showTemplateBack;

        try {
            for (let i = 0; i < total; i++) {
                const row = this.rows[i];
                const num = String(i + 1).padStart(2, '0');

                // Update progress
                const progress = Math.round(((i) / total) * 100);
                this.elements.progressFill.style.width = `${progress}%`;
                this.elements.progressText.textContent = `${progress}% (${i}/${total})`;

                // Apply row data
                this.applyRowToCanvas(row);
                CanvasManager.showTemplate = false;
                CanvasManager.showTemplateBack = false;
                CanvasManager.render();

                // Capture front
                const mainCanvas = document.getElementById('mainCanvas');
                const frontBlob = await this.canvasToBlob(mainCanvas);
                zip.file(`card-${num}-front.png`, frontBlob);

                // Capture back (if applicable)
                if (showBack) {
                    const backCanvas = CanvasManager.renderBackSide();
                    const backBlob = await this.canvasToBlob(backCanvas);
                    zip.file(`card-${num}-back.png`, backBlob);
                }

                // Small delay to let UI update
                await new Promise(r => setTimeout(r, 10));
            }

            // Final progress
            this.elements.progressFill.style.width = '100%';
            this.elements.progressText.textContent = '100% - Zipping...';

            // Generate ZIP
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            // Download
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.download = 'objektify-bulk.zip';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            this.elements.progressText.textContent = 'Done!';

        } catch (error) {
            console.error('Bulk export failed:', error);
            this.elements.progressText.textContent = 'Export failed!';
        } finally {
            // Restore original state
            this.restoreTemplate();
            if (templateWasVisible) CanvasManager.showTemplate = true;
            if (templateBackWasVisible) CanvasManager.showTemplateBack = true;
            if (CanvasManager.hasImage()) CanvasManager.render();
            CanvasManager.updateBackSidePreview();

            // Reset UI after short delay
            setTimeout(() => {
                this.elements.progress.style.display = 'none';
                this.elements.progressFill.style.width = '0%';
                this.elements.exportAllBtn.disabled = false;
                this.elements.exportAllBtn.innerHTML = '<i data-lucide="download"></i> Download All as ZIP';
                lucide.createIcons();
            }, 2000);
        }
    },

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};
