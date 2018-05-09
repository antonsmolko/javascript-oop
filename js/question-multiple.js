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
        this._ownAnswer = [];
    }

    get ownAnswer() {
        return this._ownAnswer;
    }

    set ownAnswer(value) {
        let indexAnswer = this.answers.indexOf(value);
        if (this._ownAnswer.includes(indexAnswer)) {
            let removableAnswer = this._ownAnswer.indexOf(indexAnswer);
            this._ownAnswer.splice(removableAnswer, 1);               
        } else {
            this._ownAnswer.push(indexAnswer);  
        }
    }

    /**
     * Проверяет правильность ответов.
     * 
     * @param {number} answers
     * @returns {boolean}
     */
    isCorrectAnswer() {
        return (this.ownAnswer.length === this._correctAnswers.length) && this.ownAnswer.every(answer => this._correctAnswers.includes(answer));
    }

}