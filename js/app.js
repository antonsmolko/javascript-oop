export default class App {
    /**
     * @param {HTMLElement} element 
     * @param {Quiz} quiz 
     */
    constructor(element, quiz) {
        this.element;
        this.nextQuestionIndex;
        this.nextQuestion;
        this.quiz = quiz;
        // this.questionNumber = quiz.length;
        this.init(element);
    }

    /**
     * Инициализирует объект.
     * 
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init(element) {
        this.element = element;
        this.nextQuestionIndex = 0;
        this.nextQuestion = this.quiz.questions[this.nextQuestionIndex];
        this.title = this.quiz.title;
        let title = this.element.querySelector("#title");
        title.textContent = this.title;
    }

    /**
     * Обрабатывает событие при выборе ответа.
     * 
     * @param {Event} event 
     */
    handleAnswerButtonClick(event) {
        return event;
    }

    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext() {
        this.displayQuestion();
        this.displayAnswers();
    }

    /**
     * Отображает вопрос.
     */
    displayQuestion() {
        let question = this.element.querySelector("#question");
        question.textContent = this.nextQuestion.text;
    }

    /**
     * Отображает ответы.
     */
    displayAnswers() {
        let answers = this.element.querySelector("#answers");
        this.nextQuestion.answers.forEach(answerText => {
                let answer = document.createElement("li");
                answer.className = "list-group-item list-group-item-action";
                answer.textContent = answerText;
                answers.appendChild(answer);
            }
        );
    }

    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        
    }

    /**
     * Отображает результат теста.
     */
    displayScore() {
        
    }
}