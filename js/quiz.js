export default class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title, element, questions) {
        this.title = title;
        this.element = element;
        this.questions = questions;
        this.questionsNumber = questions.length;
        this.currentQuestionIndex = 0;
        this._score;
        this._currentQuestion = this.questions[this.qurrentQuestionIndex];
        this.init();
    }

    /**
     * Возвращает текущий вопрос.
     * 
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    set currentQuestion(index) {
        this._currentQuestion = this.questions[index];
    }

    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     * 
     * @returns {boolean}
     */
    get hasEnded() {
        return this.questions.indexOf(this.currentQuestion) === -1;
    }

    set stateButton(value) {
        this._button.disabled = value;
    }

    get score() {
        return this._score;
    }

    init() {
        // this._question = this.element.querySelector("#question");
        this._answers = this.element.querySelector("#answers");
        this._button = this.element.querySelector("#answer-button");
        this.stateButton = true;
        this._progress = this.element.querySelector("#progress");
        this._score = 0;
        let title = this.element.querySelector("#title");
        this.questions.forEach(question => {
            question.doAnswer = handleDoAnswer.bind(this);
        });
    }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer 
     */
    checkAnswer() {
        this.quiz.currentQuestionIndex += 1;
        this._currentQuestion = this.quiz.currentQuestion
        return this.currentQuestion.isCorrectAnswer;
    }

    handleDoAnswer(question) {
        question.validate();
    }
}