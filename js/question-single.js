import Question from './question.js';

export default class QuestionSingle extends Question {
    constructor(args) {
        super(args);
        this._correctAnswer = args.correctAnswer;
        this._ownAnswer = '';
    }

    get ownAnswer() {
        return this._ownAnswer;
    }

    set ownAnswer(value) {
        this._ownAnswer = value;
    }

    /**
     * Проверяет правильность ответа.
     * 
     * @returns {boolean}
     */
    isCorrectAnswer() {
        return this._correctAnswer === this.answers.indexOf(this.ownAnswer);
    }
}