import Question from './question.js';

export default class QuestionSingle extends Question {

    /**
     * Проверяет правильность ответа.
     * 
     */
    get isCorrectAnswer() {
        return this._correctAnswer === this.answers.indexOf(this._ownAnswer);
    }

    render() {
        let answers = '';
        this.answers.forEach(answer => {
            answers += `<div class="list-group-item list-group-item-action">${answer}</div>`;
        })
        return answers;
    }

    doAnswer(answer) {
        let answers = answer.parentElement.children;
        [].forEach.call(answers, ans => ans.classList.toggle("active", ans === answer));
        this.ownAnswer = answer.textContent;
        this.validate = this.ownAnswer.length === 0;      
        this.doValidate(this.validate);
    }
}