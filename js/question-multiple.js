import Question from './question.js';

export default class QuestionMultiple extends Question {
    
    get ownAnswer() {
        return this._ownAnswer;
    }

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
     */
    get isCorrectAnswer() {
        return (this._ownAnswer.length === this._correctAnswer.length) && this._ownAnswer.every(ans => this._correctAnswer.includes(ans));
    }

    render() {
        let answers = '';
        this.answers.forEach(answer => {
            answers += `<div class="list-group-item list-group-item-action">${answer}</div>`;
        })
        return answers;
    }

    doAnswer(answer) {
        this.ownAnswer = answer.textContent;
        answer.classList.toggle("active");
        this.validate = this.ownAnswer.length === 0;      
        this.doValidate(this.validate);
    }
}