export default class ColorPalette {
    constructor({ element, colors, colorClassName }) {
        this.element = element;
        this._colors = colors;
        this._colorChange = () => {};
        this._selectedColorIndex = 0;
        this.colorClassName = colorClassName;
        this.init();
    }

    init() {
        this.element.addEventListener('click', this.handleColorChange.bind(this));
        this.render();
    }

    render() {
        this.element.innerHTML = '';
        this._colors.forEach(color => {
            let paletteColor = document.createElement('li');
            paletteColor.classList.add(this.colorClassName);
            paletteColor.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue}`;
            this.element.appendChild(paletteColor);
        })
        this.selectedColorIndex = this._selectedColorIndex;
    }

    set selectedColorIndex(value) {
        this._selectedColorIndex = value;
        let colors = this.element.querySelectorAll('li');
        [].forEach.call(colors, (color, index) => {
            color.classList.toggle('selected', index === value);
        });
    }

    get selectedColorIndex() {
        return this._selectedColorIndex;
    }

    get selectedColor() {
        return this.colors[this.selectedColorIndex];
    }

    get colors() {
        return this._colors;
    }

    addColor(color) {
        this._colors.push(color);
    }

    handleColorChange(event) {
        let colors = this.element.children;
        [].forEach.call(colors, (color, index) => {
            if(color === event.target) {
                this.selectedColorIndex = index;
            }
        });

        this._colorChange(this.selectedColor);
    }
}