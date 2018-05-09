export default class ResponseProcessing {
    constructor(respondeField, questionType) {
        this._responseField = respondeField;
        this._type = questionType;
        this._response = '';
    }

    init() {
        if (this._type === 'single') {
           this._responseField 
        }
        // Single 
        element.addEventListener('click', this.handleChange.bind(this));



    }

    handleChange(event) {
        let answer = event.target;
        this._response = answer.textContent;
        answer.classList.add('active');
    }


    
}