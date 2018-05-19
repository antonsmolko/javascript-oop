export default class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title, questions) {
        this.title = title;
        this.questions = questions;
        this.questionsNumber = questions.length;
        this.currentQuestionIndex = 0;
        // this.setButton = () => {};
        // this.init();
    }

    /**
     * Возвращает текущий вопрос.
     * 
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    // set currentQuestion(value) {

    // }

    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     * 
     * @returns {boolean}
     */
    get hasEnded() {
        return this.questions.indexOf(this.currentQuestion) === -1;
    }

    // init() {
    //     this.currentQuestion.doValidate = this.handleValidate.bind(this);
    // }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer 
     */
    checkAnswer() {
        return this.currentQuestion.isCorrectAnswer;
    }

    // handleValidate(validate) {
    //     this.setButton(validate);
    // }
}