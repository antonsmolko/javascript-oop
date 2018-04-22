export default class Tab {
    /**
     * Создает вкладку.
     * @param {{ element: HTMLElement, onActivate: Function }} args
     */
    constructor({ element, onActivate = () => {} }) {
        this.init({ element });
        this.onActivate = onActivate;
    }

    /**
     * Инициализирует объект.
     * Устанавливает свойство акивности вкладки.
     * Устанавливает обработчик для обработки нажатия на элемент.
     * @private
     */
    init({ element }) {
        this._element = element;
        this._active = this._element.classList.contains('active');
        this._element.addEventListener('click', this.handleClick.bind(this));
    }

    /**
     * Возвращает HTML элемент.
     * @returns {HTMLElement}
     */
    get element() {
        return this._element;
    }

    /**
     * Возвращает ID вкладки.
     * ID вкладки берется из атрибута `hash` у элемента (`#panel-1` => `panel-1`)
     * @returns {string}
     */
    get id() {
        return this.element.hash.substring(1);
    }

    /**
     * `get` - Возвращает `true` или `false` в зависимости от того активна вкладка или нет.
     * 
     * `set` - Устанавливает активность вкладки, добавляя или удаляя соответствующий класс
     * @returns {boolean}
     */
    get isActive() {
        return this._active;
    }
    set isActive(value) {
        this._active = value;
        if(value) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }
    }

    /**
     * Вызывается при нажатии на вкладку.
     * 
     * Устанавливает активность вкладки.
     * Вызывает функцию обратно вызова, отправляя туда ссылку на текущий объект, т.е. саму вкладку.
     * @private
     * @param {Event} event 
     */
    handleClick(event) {
        this.isActive = true;
        event.preventDefault();
        let activeTab = event.target;
        this.onActivate(this);
    }
}