export default class ColorPalette {
    constructor({ element, colors, colorChange = () => {} }) {
        this.element = element;
        this._colors = colors;
        this.colorChange = colorChange;
        this._selectedColorIndex = 0;
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
            paletteColor.classList.add('color-palette__color');
            paletteColor.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue}`;
            this.element.appendChild(paletteColor);
        })
        this.selectedColorIndex = this._selectedColorIndex;
    }

    set selectedColorIndex(value) {
        this._selectedColorIndex = value;
        let elems = this.element.children;
        [].forEach.call(elems, (elem, index) => {
            elem.classList.toggle('selected', index === value);
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
        let elems = this.element.children;
        [].forEach.call(elems, (elem, index) => {
            if(elem === event.target) {
                this.selectedColorIndex = index;
            }
        });

        this.colorChange(this.selectedColor);
    }
}