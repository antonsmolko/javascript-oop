export default class App {
    constructor({ canvas, colorPalette, colorPicker }) {
        this.canvas = canvas;
        this.palette = colorPalette;
        this.colorPicker = colorPicker;
        this.context = null;
        this.isDrawing = false;
        this.init();
    }

    init() {
        this.context = this.canvas.getContext('2d');
        this.clearCanvasButton = document.querySelector('#clear-canvas-button');
        this.newColorButton = document.querySelector('#new-color-button');
        this.brushSizeSlider = document.querySelector('#brush-size-slider');
        this.canvas.addEventListener('mousedown', this.handleCanvasMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));
        this.clearCanvasButton.addEventListener('click', this.handleCanvasClear.bind(this));
        this.brushSizeSlider.addEventListener('change', this.handleBrushSizeChange.bind(this));
        this.newColorButton.addEventListener('click', this.handleClickNewColorButton.bind(this));
        this.palette.colorChange = this.handleClickPalette.bind(this);
        this.colorPicker.addColor = this.handleAddColor.bind(this);
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
            this.context.strokeStyle = `rgb(${this.palette.selectedColor.red}, ${this.palette.selectedColor.green}, ${this.palette.selectedColor.blue}`;
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
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleBrushSizeChange(event) {
        this.context.lineWidth = Number(event.target.value);
    }

    handleClickPalette(color) {
        this._strokeStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
    }

    handleClickNewColorButton() {
        this.colorPicker.open = true;
    }

    handleAddColor(color) {
        this.palette.addColor(color);
        this.palette.render();
    }
}