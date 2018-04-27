class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Добавляет слушателя на событие.
     * 
     * @param {string} event Название события
     * @param {Function} listener Функция обработчик
     */
    on(event, listener) {
        this.events[event] = [this.events[event], listener];
        // this.events[event] = [... listener];
    }

    /** 
     * Сообщает слушателям о событии.
     * 
     * @param {string} event Название события
     * @param {*} arg Данные передаваемые слушателю
     */
    emit(event, arg) {
        let listener = this.events[event];
        this.events[event].forEach((listener) => {
            listener();
        }, arg)
    }
}

let eventEmitter = new EventEmitter();
let listener = () => {};
let listener2 = () => {};
let listener3 = () => {};
eventEmitter.on('change', listener);
eventEmitter.on('change', listener2);
eventEmitter.on('change', listener3);
console.log(eventEmitter.events);