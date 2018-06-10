export default class Cell {
    
    constructor({ element, row, col, alive = false }) {
        this.element = element;
        this.row = row;
        this.col = col;
        this._alive = alive;
        this.init();
    }

    get alive() {
        return this._alive;
    }

    set alive(value) {
        this._alive = value;
        this.element.classList.toggle('alive', value);        
    }

    init() {
        this.element.classList.add('cell');
        if (this.alive) this.element.classList.add('alive');
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        this.alive = !this.alive;
    }
}