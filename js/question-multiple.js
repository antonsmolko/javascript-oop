import Question from './question.js';

export default class QuestionMultiple extends Question {
    
    /**
     * Возвращает результат ответа на текущий вопрос.
     * 
     * @returns {Array}
     */
    get ownAnswer() {
        return this._ownAnswer;
    }

    /**
     * Записывает ответ на текущий вопрос.
     * Проверяет, если поступивший ответ уже есть в массиве - то удаляет его, иначе добавляет
     * 
     * @param {String} value
     */
    set ownAnswer(value) {
        let indexAnswer = this.answers.indexOf(value);
        if (this._ownAnswer.includes(indexAnswer)) {
            let removableAnswer = this._ownAnswer.indexOf(indexAnswer);
            this._ownAnswer.splice(removableAnswer, 1);               
        } else {
            this._ownAnswer = this._ownAnswer || [];
            this._ownAnswer.push(indexAnswer);
        }
    }

    /**
     * Проверяет правильность ответа.
     * 
     * @return {boolean}
     */
    get isCorrectAnswer() {
        return (this._ownAnswer.length === this._correctAnswer.length) && this._ownAnswer.every(ans => this._correctAnswer.includes(ans));
    }

    /**
     * Осуществляет рендеринг вариантов ответа.
     * Подписывается на событие при выборе ответа.
     * 
     */
    render() {
        this._element.innerHtml = '';
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
        this.ownAnswer = answer.textContent;
        answer.classList.toggle("active");
        this._doAnswer(this.validate());
    }
}