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
}