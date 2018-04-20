class Queue {
    /**
     * Создает очередь, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...items) {
        this._store = this._setStore(items);
    }

    _setStore(items) {
        let store = [];
        for(let key in items) {
            store.push(items[key]);
        }

        return store;
    }

    /**
     * Возвращает количество элементов в очереди
     * @returns {number}
     */
    get size() {
        // let size = 0;
        // for(let key in this._store) {
        //     if(this._store.hasOwnProperty(key)) size++;
        // }
        // return size;

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
        let store = this._store.slice();
        let first = store.shift();
        return first;
    }

    /**
     * Возвращает последний элемент в очереди
     * @returns {*}
     */
    get back() {
        let store = this._store.slice();
        let last = store.pop();
        return last;
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

// let queue = new Queue(1,2,3);
// queue.dequeue();

// console.log(queue.back);

module.exports = Queue;