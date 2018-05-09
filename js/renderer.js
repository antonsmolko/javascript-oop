export default class Renderer {
    constructor(element) {
        this._element = element;
        this.init(this._element);
    }

    init(element) {
        element.innerHTML = '';
    }

    renderAnswers(answers) {
        answers.forEach(answerText => {
            let answer = document.createElement("li");
            answer.className = "list-group-item list-group-item-action";
            answer.innerHTML = answerText;
            this._element.appendChild(answer);
        })
    }

    renderInput() {
        let answerInput = document.createElement("input");
        this._element.appendChild(answerInput);
    }
}