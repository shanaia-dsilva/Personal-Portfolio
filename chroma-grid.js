/**
 * ChromaGrid - Vanilla JS implementation
 * A spotlight-following grid with grayscale overlay effect
 */

class ChromaGrid {
    constructor(element, options = {}) {
        this.root = element;
        this.options = {
            radius: options.radius || 300,
            columns: options.columns || 3,
            rows: options.rows || 2,
            damping: options.damping || 0.45,
            fadeOut: options.fadeOut || 0.6,
            ease: options.ease || 'power3.out',
            ...options
        };

        this.pos = { x: 0, y: 0 };
        this.fadeEl = null;

        this.init();
    }

    init() {
        // Set CSS variables
        this.root.style.setProperty('--r', `${this.options.radius}px`);
        this.root.style.setProperty('--cols', this.options.columns);
        this.root.style.setProperty('--rows', this.options.rows);

        // Get initial dimensions
        const { width, height } = this.root.getBoundingClientRect();
        this.pos = { x: width / 2, y: height / 2 };
        this.root.style.setProperty('--x', `${this.pos.x}px`);
        this.root.style.setProperty('--y', `${this.pos.y}px`);

        // Create overlay elements
        this.createOverlays();

        // Bind events
        this.bindEvents();
    }

    createOverlays() {
        // Create chroma-overlay
        const overlay = document.createElement('div');
        overlay.className = 'chroma-overlay';
        this.root.appendChild(overlay);

        // Create chroma-fade
        this.fadeEl = document.createElement('div');
        this.fadeEl.className = 'chroma-fade';
        this.root.appendChild(this.fadeEl);
    }

    bindEvents() {
        this.root.addEventListener('pointermove', this.handleMove.bind(this));
        this.root.addEventListener('pointerleave', this.handleLeave.bind(this));

        // Bind card events
        const cards = this.root.querySelectorAll('.chroma-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', this.handleCardMove.bind(this));
        });
    }

    moveTo(x, y) {
        gsap.to(this.pos, {
            x,
            y,
            duration: this.options.damping,
            ease: this.options.ease,
            onUpdate: () => {
                this.root.style.setProperty('--x', `${this.pos.x}px`);
                this.root.style.setProperty('--y', `${this.pos.y}px`);
            },
            overwrite: true
        });
    }

    handleMove(e) {
        const rect = this.root.getBoundingClientRect();
        this.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        gsap.to(this.fadeEl, { opacity: 0, duration: 0.25, overwrite: true });
    }

    handleLeave() {
        gsap.to(this.fadeEl, {
            opacity: 1,
            duration: this.options.fadeOut,
            overwrite: true
        });
    }

    handleCardMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }
}

// Auto-initialize all chroma grids when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.chroma-grid');
    grids.forEach(grid => {
        const options = {
            radius: parseInt(grid.dataset.radius) || 300,
            columns: parseInt(grid.dataset.columns) || 4,
            damping: parseFloat(grid.dataset.damping) || 0.45,
            fadeOut: parseFloat(grid.dataset.fadeout) || 0.6
        };
        new ChromaGrid(grid, options);
    });
});
