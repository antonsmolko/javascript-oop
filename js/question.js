export default class Question {
    /**
     * @param {string} text Текст вопроса
     * @param {string[]} answers Варианты ответов
     * @param {number} correctAnswer Индекс правильного ответа
     */
    constructor(args) {
        this.text = args.text;
        this.answers = args.answers;
        this._correctAnswer = args.correctAnswer;
        this._ownAnswer = '';
        this.type = args.type;
        this.doAnswer = () => {};
    }
    
    get ownAnswer() {
        return this._ownAnswer;
    }

    set ownAnswer(value) {
        this._ownAnswer = value;
    }

    validate() {
        return this._ownAnswer.length === 0;
    }

    /**
     * Проверяет правильность ответа.
     * 
     */

    // get isCorrectAnswer() {
    //     return verifications[this.type](this.ownAnswer, this._correctAnswer, this.answers);
    // }
}