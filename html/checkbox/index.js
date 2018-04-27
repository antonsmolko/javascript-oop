const Input = require('../input/');

class Checkbox extends Input {
    /**
     * @param {{ tag: string, id: string, className: string, type: string, name: string, disabled: boolean, required: boolean, checked: boolean }} args 
     */
    constructor({ checked = false, ...args }) {
        super(args);
        this._value = checked;
    }

    /**
     * `get` - Возвращает значение элемента.
     * 
     * `set` - Устанавливает значение элемента и сообщает слушателям о событии `change`.
     * 
     * @returns {boolean}
     */
    get checked() { return this._value }
    set checked(value) {
        this._value = value;
        this.emit('change', value);
    }

    /**
     * Проверяет валидность значения
     * @returns {boolean}
     */
    get isValid() {
        return this.checked === true;
    }
}

module.exports = Checkbox;