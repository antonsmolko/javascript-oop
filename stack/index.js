class Stack {
    /**
     * Создает стопку, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...rest) {
        this._store = [];
        rest.forEach((item) => this._store.push(item));
    }

    /**
     * Возвращает количество элементов в стопке
     * @returns {number}
     */
    get size() {
        return this._store.length;
    }

    /**
     * Возвращает `true` если стопка пустая, и `false` если стопка не пустая
     * @returns {boolean}
     */
    get isEmpty() {
        if(this.size === 0) {
            return true;
        }

        return false;
    }

    /**
     * Добавляет элемент в стопку
     * @param {*} item
     */
    push(item) {
        this._store.push(item);
    }

    /**
     * Удаляет последний элемент из стопки и возвращает его
     * @returns {*}
     */
    pop() {
        return this._store.pop();
    }

    /**
     * Возвращает последний элемент в стопке не удаляя его
     * @returns {*}
     */
    peek() {
        let store = this._store.slice();
        return store.pop();
    }
}

module.exports = Stack;