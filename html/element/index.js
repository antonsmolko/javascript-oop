const EventEmitter = require('../event-emitter');

class Element extends EventEmitter {
    /**
     * @param {{ tag: string, id: string, className: string }} args
     */
    constructor({ tag, id, className = '' }) {
        super();
        this.tag = tag;
        this.id = id;
        this._className = [];
        this.init(className);
    }

    init(className) {
        if(className !== '') {
            this._className = className.split(' ');
        }
    }

    /**
     * Возвращает строку с названиями CSS классов.
     * 
     * @returns {string}
     */
    get className() {
        return this._className.join(' ');
    }

    /**
     * Добавляет CSS класс.
     * 
     * @param {string} className 
     */
    addClass(className) {
        if(!this.hasClass(className)) {
            this._className.push(className); 
         }
    }

    /**
     * Удаляет CSS класс.
     * 
     * @param {string} className 
     */
    removeClass(className) {
        let classIndex = this._className.indexOf(className);
        this._className.splice(classIndex, 1);
    }

    /**
     * Возращает `true` или `false` в зависимости от начилия CSS класса.
     * 
     * @param {string} className
     * @returns {boolean}
     */
    hasClass(className) {
        return this._className.indexOf(className) !== -1;
    }

    /**
     * Добавляет или удаляет CSS класс в зависимости от его наличия.
     * 
     * @param {string} className 
     */
    toggleClass(className) {
        if(this.hasClass(className)) {
            this.removeClass(className)
        } else {
            this.addClass(className);
        }
    }
}

module.exports = Element;