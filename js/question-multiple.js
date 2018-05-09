import Question from './question.js';

export default class QuestionMultiple extends Question {
    /**
     * @param {string} text Текст вопроса
     * @param {string[]} answers Варианты ответов
     * @param {number[]} correctAnswer Индексы правильных ответов
     */
    constructor(args) {
        super(args);
        this._correctAnswers = args.correctAnswers;
        this._ownAnswers = [];
    }

    /**
     * Проверяет правильность ответа.
     * 
     * @param {number} answers
     * @returns {boolean}
     */
    isCorrectAnswer(answers) {
        return (answers.length === this._correctAnswers.length) && answers.every(answer => this._correctAnswers.includes(answer));
    }

}