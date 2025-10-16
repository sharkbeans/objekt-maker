/**
 * main.js
 * Main application entry point - orchestrates all modules
 */

// Application state
const App = {
    version: '1.0.0',
    initialized: false,

    /**
     * Initialize the application
     */
    async init() {
        console.log(`Photocard Maker v${this.version} - Initializing...`);

        try {
            // Initialize CanvasManager
            const canvas = document.getElementById('mainCanvas');
            if (!canvas) {
                throw new Error('Canvas element not found');
            }
            CanvasManager.init(canvas);
            console.log('[OK] CanvasManager initialized');

            // Initialize UIManager
            UIManager.init();
            console.log('[OK] UIManager initialized');

            this.initialized = true;
            console.log('[OK] Photocard Maker ready!');

            // Show welcome message
            this.showWelcome();

        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    },

    /**
     * Show welcome message in console
     */
    showWelcome() {
        console.log(`
╔═══════════════════════════════════════╗
║       PHOTOCARD MAKER                 ║
║                                       ║
║  Upload an image to create a          ║
║  768×1186 px photocard with           ║
║  yellow accent bar and text!          ║
║                                       ║
╚═══════════════════════════════════════╝
        `);
    },

    /**
     * Show error message
     */
    showError(message) {
        alert(message);
    },

    /**
     * Get application info
     */
    getInfo() {
        return {
            version: this.version,
            initialized: this.initialized,
            hasImage: CanvasManager.hasImage(),
            canvasSize: `${CanvasManager.canvasWidth}x${CanvasManager.canvasHeight}`,
            topText: CanvasManager.topText,
            bottomText: CanvasManager.bottomText
        };
    }
};

/**
 * Wait for DOM to be fully loaded, then initialize app
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    // DOM already loaded
    App.init();
}

/**
 * Handle page visibility changes (optional performance optimization)
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - pausing...');
    } else {
        console.log('Page visible - resuming...');
        // Re-render canvas if needed
        if (CanvasManager.hasImage()) {
            CanvasManager.render();
        }
    }
});

/**
 * Expose App object to window for debugging
 * Accessible via browser console: App.getInfo()
 */
window.PhotocardMaker = App;

/**
 * Service Worker registration for PWA support (optional future enhancement)
 * Uncomment when service worker is implemented
 */
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(err => console.log('SW registration failed:', err));
    });
}
*/
