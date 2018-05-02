export default class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title, questions) {
        this.title = title;
        this.questions = questions;
        this.questionsNumber = questions.length;
        this._currentQuestion = 0;
    }

    /**
     * Возвращает текущий вопрос.
     * 
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this._currentQuestion];
    }

    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     * 
     * @returns {boolean}
     */
    get hasEnded() {
        return this.currentQuestion >= this.questionsNumber;
    }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer 
     */
    checkAnswer(answer) {
        
    }
}