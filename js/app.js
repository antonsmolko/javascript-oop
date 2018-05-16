export default class App {
    constructor({ canvas, colorPalette }) {
        this.canvas = canvas;
        this.palette = colorPalette;
        this.context = null;
        this.isDrawing = false;
        this._strokeStyle = 'black';
        this.init();
    }

    init() {
        this.context = this.canvas.getContext('2d');
        this.clearCanvasButton = document.querySelector('#clear-canvas-button');
        this.brushSizeSlider = document.querySelector('#brush-size-slider');
        this.canvas.addEventListener('mousedown', this.handleCanvasMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));
        this.clearCanvasButton.addEventListener('click', this.handleCanvasClear.bind(this));
        this.brushSizeSlider.addEventListener('change', this.handleBrushSizeChange.bind(this));

        this.palette.element.addEventListener('click', () => this._strokeStyle = `rgb(${this.palette.currentColor.red}, ${this.palette.currentColor.green}, ${this.palette.currentColor.blue})`);
    }

    handleCanvasMousedown(event) {
        this.lastEvent = event;
        this.isDrawing = true;
    }

    handleCanvasMousemove(event) {
        if (this.isDrawing) {
            this.context.beginPath();
            this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.strokeStyle = this._strokeStyle || 'black';
            this.context.stroke();
            this.lastEvent = event;
        }
    }

    handleCanvasMouseup(event) {
        this.isDrawing = false;
    }

    handleCanvasMouseleave(event) {
        this.isDrawing = false;
    }

    handleCanvasClear(event) {
        this.context.fillStyle = 'white';
        // this._strokeStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleBrushSizeChange(event) {
        this.context.lineWidth = Number(event.target.value);
    }
}