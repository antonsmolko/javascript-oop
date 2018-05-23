export default class ColorPicker {
    constructor({ element }) {
        this.element = element;
        this.addColor = () => {};
        this._preview;
        this._sliders;
        this._close;
        this._defaultPreview = {
            red: 0,
            green: 0,
            blue: 0
        };
        this._colorPreview = this._defaultPreview;
        this.init();        
    }

    init() {
        this._preview = this.element.querySelector('#preview');
        this._sliders = this.element.querySelectorAll('.color-picker__slider');
        this._close = this.element.querySelector('#close');
        this._check = this.element.querySelector('#check')

        this._close.addEventListener('click', this.handleClickClose.bind(this));

        [].forEach.call(this._sliders, slider => {
            slider.addEventListener('input', this.handleInputSlider.bind(this));
        });

        this._check.addEventListener('click', this.handleClickCheck.bind(this));
    }

    set open(value) {
        this.element.classList.toggle('open', value);
        this.render(this._colorPreview);
    }

    set colorPreview(slider) {
        this._colorPreview[slider.name] = Number(slider.value);
        this.render(this.colorPreview);
    }

    get colorPreview() {
        return this._colorPreview;
    }

    render(color) {
        this._preview.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue}`;
    }

    setDefault() {
        this._colorPreview = {
            red: 0,
            green: 0,
            blue: 0
        };
        [].forEach.call(this._sliders, slider => {
            slider.value = 0;
        });
    }

    handleClickClose() {
        this.open = false;
        this.setDefault();
    }

    handleInputSlider(event) {
        this.colorPreview = event.target;
    }

    handleClickCheck() {
        this.addColor(this._colorPreview);
        this.open = false;
        this.setDefault();
    }
}