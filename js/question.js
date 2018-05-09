const verifications = {
    single: answer => this._correctAnswer === this.answers.indexOf(answer),
    multiple: answers => (answers.length === this._correctAnswers.length) && answers.every(answer => this._correctAnswers.includes(answer)),
    open: answer => this.correctAnswer === answer
}

export default class Question {
    /**
     * @param {string} text Текст вопроса
     * @param {string[]} answers Варианты ответов
     * @param {number} correctAnswer Индекс правильного ответа
     */
    // constructor(type, text, answers, correctAnswer) {
    constructor(args) {
        this.text = args.text;
        this.answers = args.answers;
        this._correctAnswer = args.correctAnswer;
        this._ownAnswer = '';
        this.type = args.type;
        this.verification;
    }
    // /**
    //  * Проверяет правильность ответа.
    //  * 
    //  * @param {number} answer
    //  */
    // set ownAnswer(answer) {
    //     this._ownAnswer = answer;
    // }

    get correctAnswer() {
        return this._correctAnswer;
    }
}