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
        this.currentQuestionIndex;
        this._score;
        this._currentQuestion = this.questions[this.qurrentQuestionIndex];
        this.init();
        this._answerButtonClick = () => {}; // Ф-я срабатывает при клике на #answer-button
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

    /**
     * Устанавливае значение атрибута disabled кнопки #answer-button
     * 
     * @param {boolean} value 
     */
    set disabledAnswerButton(value) {
        this._button.disabled = value;
    }

    /**
     * Возвращает результат ответов на вопросы.
     * 
     * @returns {number}
     */
    get score() {
        return this._score;
    }

    /**
     * Инициализирует объект.
     * Получает доступ к DOM-элементам.
     * Устанавливает счетчики в начальное положение.
     * Устанавливает значение атрибута disabled кнопки #answer-button в true.
     * Подписывается на событие при выборе ответа.
     * Подписывается на событие click на кнопку #answer-button.
     */
    init() {
        this._answers = this.element.querySelector("#answers");
        this._button = this.element.querySelector("#answer-button");
        this._progress = this.element.querySelector("#progress");

        this.currentQuestionIndex = 0;
        this._score = 0;
        this.disabledAnswerButton = true;

        // Слушаем событие _doAnswer при ответе на вопрос
        this.questions.forEach(question => {
            question._doAnswer = this.handleDisabledAnswerButton.bind(this);
        })

        this._button.addEventListener('click', this.handleAnswerButtonClick.bind(this));
    }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * 
     * @returns {bulean}
     */
    checkAnswer() {
        return this.currentQuestion.isCorrectAnswer;
    }

    /**
     * Устанавливае значение атрибута disabled кнопки #answer-button
     *
     * @param {boolean} value 
     */
    handleDisabledAnswerButton(validate) {
        this.disabledAnswerButton = validate;
    }

    /**
     * Обрабатывает событие при клике на кнопку #answer-button ("Ответить").
     * 
     * @param {Event} event 
     */
    handleAnswerButtonClick(event) {     
        if(this.checkAnswer()) {
            this._score += 1;
        }
        this.currentQuestionIndex += 1;
        this._answerButtonClick();
    }
}