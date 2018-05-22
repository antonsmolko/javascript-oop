import Question from './question.js';

export default class QuestionOpen extends Question {
    
    /**
     * Проверяет правильность ответа.
     * 
     * @return {boolean}
     */
    get isCorrectAnswer() {
        return this._correctAnswer.toLowerCase() === this._ownAnswer.toLowerCase();
    }

    /**
     * Осуществляет рендеринг поля input для ввода ответа.
     * Подписывается на событие при вводе ответа.
     * 
     */
    render() {
        this._element.innerHTML = '';
        let answer = document.createElement('input');
        answer.className = 'form-control';
        this._element.appendChild(answer);
        answer.addEventListener('input', this.handleClickAnswer.bind(this));
    }

    /**
     * Записывает ответ в свойство _ownAnswer
     * Вызывает функцию _doAnswer и передает в нее значение валидации для изменения состояния кнопки "Ответить"
     * 
     * @param {event} event
     */
    handleClickAnswer(event) {
        let answer = event.target;
        this.ownAnswer = answer.value.trim();
        this._doAnswer(this.validate());
    }
}