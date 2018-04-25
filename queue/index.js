class Queue {
    /**
     * Создает очередь, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...rest) {
        this._store = rest;
    }

    /**
     * Возвращает количество элементов в очереди
     * @returns {number}
     */
    get size() {
        return this._store.length;
    }

    /**
     * Возвращает `true` если очередь пустая, в противном случае возвращает `false`
     * @returns {boolean}
     */
    get isEmpty() {
        if(this.size === 0) {
            return true;
        }

        return false;
    }

    /**
     * Возвращает первый элемент в очереди
     * @returns {*}
     */
    get front() {
        return this._store[0];
    }

    /**
     * Возвращает последний элемент в очереди
     * @returns {*}
     */
    get back() {
        return this._store[this.size - 1];
    }

    /**
     * Добавляет элемент в очередь
     * @param {*} item 
     */
    enqueue(item) {
        this._store.push(item);
    }

    /**
     * Удаляет первый элемент из очереди и возвращает его
     * @returns {*}
     */
    dequeue () {
        return this._store.shift();
    }
}

module.exports = Queue;
