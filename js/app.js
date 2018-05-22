import Renderer from './renderer.js';

export default class App {
    /**
     * @param {HTMLElement} element 
     * @param {Quiz} quiz 
     */
    constructor(element, quiz) {
        this.element = element;
        this.quiz = quiz;
        this._question;
        this._answers;
        this._button;
        this._progress;
        this.init();
    }

    /**
     * Инициализирует объект.
     * Получает доступ к DOM-элементам, устанавливает заголовок.
     * Подписывается на событие click на #answer-button
     */

    init() {
        this._question = this.element.querySelector("#question");
        this._answers = this.element.querySelector("#answers");
        this._button = this.element.querySelector("#answer-button");
        this._progress = this.element.querySelector("#progress");

        let title = this.element.querySelector("#title");
        title.textContent = this.quiz.title;

        this.quiz._answerButtonClick = this.displayNext.bind(this);
    }

    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext(quiz) {
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
        this._question.innerHTML = this.quiz.currentQuestion.text;
    }

    /**
     * Отображает ответы.
     */
    displayAnswers() {
        this.quiz.disabledAnswerButton = true;
        this.quiz.currentQuestion.render();
    }

    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        this._progress.innerHTML = `Вопрос ${this.quiz.currentQuestionIndex + 1} из ${this.quiz.questionsNumber}`;
    }

    /**
     * Отображает результат теста.
     */
    displayScore() {
        let score = this.element.querySelector("#score");
        score.textContent = `Правильных ответов ${this.quiz.score} из ${this.quiz.questionsNumber}`;
    }
}