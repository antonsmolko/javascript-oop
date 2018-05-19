import Question from './question.js';

export default class QuestionOpen extends Question {
    /**
     * Проверяет правильность ответа.
     * 
     */
    get isCorrectAnswer() {
        return this._correctAnswer.toLowerCase() === this._ownAnswer.toLowerCase();
    }

    render() {
        return '<div class="form-group"><input class="form-control"></div>';
    }

    doAnswer(answer) {
        answer.addEventListener('input', event => {
            this.ownAnswer = event.target.value.trim();
            this.validate = this.ownAnswer.length === 0;      
            this.doValidate(this.validate);         
        });
    }
}