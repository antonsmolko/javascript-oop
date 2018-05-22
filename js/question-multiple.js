import Question from './question.js';

export default class QuestionMultiple extends Question {
    constructor(args) {
        super(args);
        this.init();
    }

    init() {
        const answers = document.querySelectorAll('.list-group-item.list-group-item-action');
        [].forEach.call(answers, answer => {
            answer.addEventListener('click', () => {
                this.handleClickAnswer.bind(this);
                this.validate();
            });
        });
    }
    
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

    handleClickAnswer(event) {
        let answer = event.target;
        this.ownAnswer = answer.textContent;
        this.doAnswer(this);
    }

    // doAnswer(answer) {
    //     this.ownAnswer = answer.textContent;
    //     answer.classList.toggle("active");
    // }
}