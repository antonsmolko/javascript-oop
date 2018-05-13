const verifications = {
    single: (ownAnswer, correctAnswer, answers) => correctAnswer === answers.indexOf(ownAnswer),
    multiple: (ownAnswer, correctAnswer, answers) => (ownAnswer.length === correctAnswer.length) && ownAnswer.every(ans => correctAnswer.includes(ans)),
    open: (ownAnswer, correctAnswer) => correctAnswer.toLowerCase() === ownAnswer.toLowerCase()
}

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
     */

    get isCorrectAnswer() {
        return verifications[this.type](this.ownAnswer, this._correctAnswer, this.answers);
    }
}