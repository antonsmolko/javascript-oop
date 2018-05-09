import Question from './question.js';

export default class QuestionOpen extends Question {
    /**
     * @param {string} type Тип вопроса
     * @param {string} text Текст вопроса
     * @param {string} correctAnswer Индекс правильного ответа
     */
    constructor(type, text, correctAnswer) {
        super(type, text, correctAnswer);
    }

    /**
     * Проверяет правильность ответа.
     * 
     * @param {string} answer
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return this.correctAnswer === answer;
    }
}