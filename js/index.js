import App from './app.js';
import Quiz from './quiz.js';
import QuestionSingle from './question-single.js';
import QuestionMultiple from './question-multiple.js';
import QuestionOpen from './question-open.js';

const questions = [
    {
        type: 'multiple',
        text: 'Какие способы создают объект?',
        answers: [
            'new { x = 1, y = 2 }',
            '{ x: 1, y: 2 }',
            '{ x = 1, y = 2 }',
            'Object({ x: 1 })',
            'new { x: 1, y: 2 }',
            'Object.create(null)'
        ],
        correctAnswer: [1, 3, 5]
    },
    {
        type: 'single',
        text: 'Какой из способов создает копию массива?',
        answers: [
            'let newArray = oldArray;',
            'let newArray = oldArray.slice();',
            'let newArray = [oldArray];',
            'let newArray = new Array(oldArray);',
            'let newArray = oldArray.copy();'
        ],
        correctAnswer: 1
    },
    {
        type: 'single',
        text: 'Что отобразится в консоле?<br><br>console.log(typeof [1,2])',
        answers: [
            'string',
            'array',
            'object',
            'number',
            'undefined'
        ],
        correctAnswer: 2
    },
    {
        type: 'single',
        text: 'Что будет результатом выражения?<br><br>new Boolean(new Boolean(false)).valueOf()',
        answers: [
            'true',
            'false',
            '"true"',
            '"false"',
            'undefined'
        ],
        correctAnswer: 0
    },
    {
        type: 'open',
        text: 'Как называется совокупность функции и лексичесокй среды в который функция была объявлена?',
        correctAnswer: 'Замыкание'
    }
];

const getQuestion = {
    single: args => new QuestionSingle(args),
    multiple: args => new QuestionMultiple(args),
    open: args => new QuestionOpen(args)
}

const root = document.querySelector('#app');

const elemQuiz = document.querySelector('#quiz');

const elemAnswers = document.querySelector('#answers');

const quiz = new Quiz('JS Quiz', elemQuiz, questions.map(q => {
    return getQuestion[q.type]({
        args: q,
        element: elemAnswers
    });
}));

const app = new App(root, quiz);

app.displayNext();
