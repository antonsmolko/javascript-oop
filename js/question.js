export default class Question {
    
    /**
     * @param {string} text Текст вопроса
     * @param {string[]} answers Варианты ответов
     * @param {number} correctAnswer Индекс правильного ответа
     * @param {HTMLElement} element Елемент для рендеринга ответов
     */
    constructor({ args, element }) {
        this.text = args.text;
        this.answers = args.answers;
        this.type = args.type;        
        this._correctAnswer = args.correctAnswer;
        this._ownAnswer = '';
        this._element = element;
        this._doAnswer = () => {}; // Срабатывает при вводе ответа (выборе вариантов ответа)
    }
    
    /**
     * Возвращает результат ответа на текущий вопрос.
     * 
     * @returns {Array}
     */
    get ownAnswer() {
        return this._ownAnswer;
    }

    /**
     * Записывает ответ на текущий вопрос.
     * 
     * @param {string} value
     */
    set ownAnswer(value) {
        this._ownAnswer = value;
    }

    /**
     * Возвращает true, если _ownAnswer пустой.
     * 
     * @returns {boolean}
     */
    validate() {
        return this._ownAnswer.length === 0;
    }

}