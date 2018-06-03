export default class Cell {
    
    constructor({ element, row, col, alive = false }) {
        // опредлить свойства
        this.element = element;
        this.row = row;
        this.col = col;
        this._alive = alive;
        // доинициализировать свойства в методе `init`
        this.init();
    }

    get alive() {
        // вернуть состояние клетки
        return this._alive;
    }

    set alive(value) {
        // обвновить состояние клетки
        this._alive = value;
        // если клетка жива, присвоить класс `alive`
        // в противном случае убрать класс `alive`
        this.element.classList.toggle('alive', value);        
    }

    init() {
        // элементу присвоить класс `cell`
        this.element.classList.add('cell');
        // если клетка жива присвоить ей класс `alive`
        if (this.alive) this.element.classList.add('alive');
        // подписаться на событие `click` у элемента
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        // при нажатии на клетку изменить ее состояние
        this.alive = !this.alive;
    }
}