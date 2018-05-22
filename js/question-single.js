import Question from './question.js';

export default class QuestionSingle extends Question {

    /**
     * Проверяет правильность ответа.
     * 
     * @return {boolean}
     */
    get isCorrectAnswer() {
        return this._correctAnswer === this.answers.indexOf(this._ownAnswer);
    }

    /**
     * Осуществляет рендеринг вариантов ответа.
     * Подписывается на событие при выборе ответа.
     * 
     */
    render() {
        this._element.innerHTML = '';
        this.answers.forEach(answerText => {
            let answer = document.createElement('div');
            answer.className = 'list-group-item list-group-item-action';
            answer.innerText = answerText;
            this._element.appendChild(answer);
            answer.addEventListener('click', this.handleClickAnswer.bind(this));
        })

    }

    /**
     * Записывает ответ в свойство _ownAnswer, меняет состояние ответов на "active" и обратно
     * Вызывает функцию _doAnswer и передает в нее значение валидации для изменения состояния кнопки "Ответить"
     *
     * @param {event} event
     */
    handleClickAnswer(event) {
        let answer = event.target;
        let answers = this._element.children;
        [].forEach.call(answers, ans => ans.classList.toggle("active", ans === answer));
        this.ownAnswer = answer.textContent;
        this._doAnswer(this.validate());
    }
}