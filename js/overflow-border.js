// Overflow border event handlers
document.addEventListener('DOMContentLoaded', () => {
    const overflowToggle = document.getElementById('overflowBorderToggle');
    const overflowSlider = document.getElementById('overflowBorderSlider');
    const overflowValue = document.getElementById('overflowBorderValue');
    const overflowContainer = document.getElementById('overflowBorderSliderContainer');

    if (overflowToggle) {
        overflowToggle.addEventListener('change', (e) => {
            CanvasManager.showOverflowBorder = e.target.checked;
            if (overflowContainer) {
                overflowContainer.style.display = e.target.checked ? 'flex' : 'none';
            }
            CanvasManager.render();
        });
    }

    if (overflowSlider && overflowValue) {
        overflowSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            overflowValue.textContent = `${value}%`;
            CanvasManager.overflowBorderPercent = value;
            CanvasManager.render();
        });
    }
});
