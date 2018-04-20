class Set {
    /**
     * Создает сет, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...rest) {
        this._key = 0;
        this._store = {};
        rest.forEach((item) => {
            this._store[this._key] = item;
            this._key += 1;
        })
    }

    /**
     * Возвращает количество элементов в сете
     * @returns {number}
     */
    get size() {
        let size = 0;
        for(let key in this._store) {
            if(this._store.hasOwnProperty(key)) size++;
        }
        return size;
    }

    /**
     * Возвращает массив элементов сета
     * @returns {Array}
     */
    get values() {
        let values = [];
        let store = this._store;
        for(let key in store) {
            values.push(store[key]);
        }
        return values;
    }

    /**
     * Добавляет элемент в сет
     * @param {*} item
     */
    add(item) {
        if(!this.has(item)) {
            this._key += 1;            
            this._store[this._key] = item;
            // this._store.push(item);
            return this;            
        }
    }

    /**
     * Проверяет наличие элемента в сете
     * @param {*} item
     * @returns {boolean}
     */
    has(item) {
        let store = this._store;
        for(let key in store) {
            if(store[key] == item) {
                return true;
            }
        }
        // if(this._store.indexOf(item) != -1) return true;
        return false;
    }

    /**
     * Удаляет элемент из сета и возвращает `true` если элемент удален и `false` если нет
     * @param {*} item
     * @returns {boolean}
     */
    remove(item) {
        let store = this._store;
        for(let key in store) {
            if(store[key] == item) {
                delete store[key];

                return true;
            }
        }

        return false;
    }

    /**
     * Удаляет все элементы в сете
     */
    clear() {
        this._store = {};
        this._key = 0;
    }

    /**
     * Возращает сет состоящий из элементов двух сетов
     * @param {Set} set
     * @returns {Set}
     */
    union(set) {
        let setValues = set.values;
        let unionSet = new Set(...this.values);
        for(let key in setValues) {
            if(!unionSet.has(setValues[key])) {
                unionSet.add(setValues[key]);
            }
        }
        return unionSet;
    }

    /**
     * Возращает сет состоящий из элементов которые присутствуют в обоих сетах
     * @param {Set} set
     * @returns {Set}
     */
    intersection(set) {
        let setStore = set.values;
        let interSet = new Set();
        for(let key in setStore) {
            if(this.has(setStore[key])) {
                interSet.add(setStore[key]);
            }
        }

        return interSet;
    }

    /**
     * Возращает сет состоящий из элементов присутствующих в первом сете, и отсутствующих во втором
     * @param {Set} set
     * @returns {Set}
     */
    difference(set) {
        let thisStore = this.values;
        let diffSet = new Set();
        for(let key in thisStore) {
            if(!set.has(thisStore[key])) {
                diffSet.add(thisStore[key]);
            }
        }
        
        return diffSet;
    }

    /**
     * Возвращает `true` если сет содержит в себе все элементы из друого сета
     * @param {Set} set
     * @returns {boolean}
     */
    isSubset(set) {
        let thisValues = this.values;
        if(this.size > set.size) {
            return false
        } else {
            for(let key in thisValues) {
                if(!set.has(thisValues[key])) {
                    return false;
                }
            }
        }

        return true;
    }
}

module.exports = Set;