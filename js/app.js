import Renderer from './renderer.js';

export default class App {
    /**
     * @param {HTMLElement} element 
     * @param {Quiz} quiz 
     */
    constructor(element, quiz) {
        this.element;
        this.quiz = quiz;
        this._question;
        this._answers;
        this._button;
        this._progress;
        this._displayScore;
        this._currentQuestion;
        this.init(element);
    }

    /**
     * Инициализирует объект.
     * 
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init(element) {
        this.element = element;
        this._question = this.element.querySelector("#question");
        this._answers = this.element.querySelector("#answers");
        this._button = this.element.querySelector("#answer-button");
        this._button.disabled = true;
        this._progress = this.element.querySelector("#progress");
        this._displayScore = 0;
        this._currentQuestion = this.quiz.currentQuestion;
        let title = this.element.querySelector("#title");
        title.textContent = this.quiz.title;
        this._answers.addEventListener('click', this.handleOwnAnswer.bind(this));
        this._button.addEventListener('click', this.handleAnswerButtonClick.bind(this));

    }

    /**
     * Обрабатывает событие при выборе ответа.
     * 
     * @param {Event} event
     */
    handleOwnAnswer(event) {
        let answer = event.target;
        if (this._currentQuestion.type === 'multiple') {
            this._currentQuestion.ownAnswer = answer.textContent;
            answer.classList.toggle("active");
            this._button.disabled = (this._currentQuestion.ownAnswer.length === 0);                  
        } else if (this._currentQuestion.type === 'single') {
            for (let i=0; i < this._answers.children.length; i++) {
               this._answers.children[i].classList.toggle("active", this._answers.children[i] === answer);
            }
            this._currentQuestion.ownAnswer = answer.textContent;
            this._button.disabled = (this._currentQuestion.ownAnswer.length === 0);
        } else if (this._currentQuestion.type === 'open') {
            let answer = this._answers.querySelector("input");
            answer.addEventListener('input', event => {
                this._currentQuestion.ownAnswer = event.target.value.trim();
                this._button.disabled = this._currentQuestion.ownAnswer === '';
            });
        }
    }

    /**
     * Обрабатывает событие при клике на кнопку ответить.
     * 
     * @param {Event} event 
     */
    handleAnswerButtonClick(event) {
        if(this.quiz.checkAnswer()) {
            this._displayScore += 1;
        }
        this.quiz.currentQuestionIndex += 1;
        this._currentQuestion = this.quiz.currentQuestion
        this.displayNext();
    }

    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext() {
        if(this.quiz.hasEnded) {
            this.displayScore();
            this._button.remove();
            this._question.remove();
            this._answers.remove();
            this._progress.remove();
        } else {
            this.displayQuestion();
            this.displayAnswers();
            this.displayProgress()
        }
    }

    /**
     * Отображает вопрос.
     */
    displayQuestion() {
        this._question.innerHTML = this._currentQuestion.text;
    }

    /**
     * Отображает ответы.
     */
    displayAnswers() {
        let renderer = new Renderer(this._answers);
        this._button.disabled = true;
        if(this._currentQuestion.answers !== undefined) {      
            renderer.renderAnswers(this._currentQuestion.answers);
        } else {
            renderer.renderInput();
        }
    }

    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        let currentQuestionNumber = this.quiz.currentQuestionIndex + 1;
        this._progress.innerHTML = `Вопрос ${currentQuestionNumber} из ${this.quiz.questionsNumber}`;
    }

    /**
     * Отображает результат теста.
     */
    displayScore() {
        let score = this.element.querySelector("#score");
        score.textContent = `Правильных ответов ${this._displayScore}`;
    }
}