import Question from './question.js';

export default class QuestionOpen extends Question {
    /**
     * @param {string} type Тип вопроса
     * @param {string} text Текст вопроса
     * @param {string} correctAnswer Индекс правильного ответа
     */
    constructor(args) {
        super(args);
        this._correctAnswer = args.correctAnswer;
    }

    /**
     * Проверяет правильность ответа.
     * 
     * @returns {boolean}
     */
    isCorrectAnswer() {
        return this.correctAnswer.toLowerCase() === this.ownAnswer.toLowerCase();
    }
}