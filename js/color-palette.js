export default class ColorPalette {
    constructor({ element, colors }) {
        this.element = element;
        this.colors = colors;
        this._currentColor = null;      
        this.init();
    }

    init() {
        this.colors.forEach(color => {
            let paletteColor = document.createElement('li');
            paletteColor.classList.add('color-palette__color');
            paletteColor.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue}`;
            this.element.appendChild(paletteColor);
        })
        this.element.addEventListener('click', this.handleColorChange.bind(this));
    }

    get currentColor() {
        return this._currentColor;
    }

    set currentColor(value) {
        this._currentColor = this.colors[value];
    }

    handleColorChange(event) {
        let elems = this.element.children;
        [].forEach.call(elems, (elem, index) => {
            elem.classList.toggle('selected', elem === event.target);
            if(elem === event.target) {
                this.currentColor = index;
            }
        });
    }
}