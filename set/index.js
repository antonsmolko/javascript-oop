class Set {
    /**
     * Создает сет, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...items) {
        this._items = [];
        items.forEach(item => this.add(item));
    }

    /**
     * Возвращает количество элементов в сете
     * @returns {number}
     */
    get size() {
        return this._items.length;
    }

    /**
     * Возвращает массив элементов сета
     * @returns {Array}
     */
    get values() {
        return this._items;
    }

    /**
     * Добавляет элемент в сет
     * @param {*} item
     */
    add(item) {
        if(!this.has(item)) {       
            this._items.push(item);
            return this;            
        }
    }

    /**
     * Проверяет наличие элемента в сете
     * @param {*} item
     * @returns {boolean}
     */
    has(item) {
        return this._items.includes(item);
    }

    /**
     * Удаляет элемент из сета и возвращает `true` если элемент удален и `false` если нет
     * @param {*} item
     * @returns {boolean}
     */
    remove(item) {
        if(!this.has(item)) return false;
        this._items = this._items.filter(i => i !== item);
        return true;
    }

    /**
     * Удаляет все элементы в сете
     */
    clear() {
        this._items = [];
    }

    /**
     * Возращает сет состоящий из элементов двух сетов
     * @param {Set} set
     * @returns {Set}
     */
    union(set) {
        return new Set(...this.values, ...set.values);
    }

    /**
     * Возращает сет состоящий из элементов которые присутствуют в обоих сетах
     * @param {Set} set
     * @returns {Set}
     */
    intersection(set) {
        let commonItems = this.values.filter(item => set.has(item));
        return new Set(...commonItems);
    }

    /**
     * Возращает сет состоящий из элементов присутствующих в первом сете, и отсутствующих во втором
     * @param {Set} set
     * @returns {Set}
     */
    difference(set) {
        let commonItems = this.values.filter(item => !set.has(item));
        return new Set(...commonItems);
    }

    /**
     * Возвращает `true` если сет содержит в себе все элементы из друого сета
     * @param {Set} set
     * @returns {boolean}
     */
    isSubset(set) {
        if(this.size > set.size) {
            return false;
        } else {
            return this.values.every(item => set.has(item));
        }
    }
}

module.exports = Set;