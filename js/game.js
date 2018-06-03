export default class Game {
    constructor({ element, grid }) {
        // определить свойства
        this.element = element;
        this.grid = grid;
        this.onPlay = false;
        this.gameSpeed = 0;
        this.gameInterval;
        // доинициализировать свойства в методе `init`
        this.init();
    }

    init() {
        // сохранить кнопку Play в свойство и подписаться на событие `click`
        this.playButton = document.querySelector('#play-button');
        this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));
        // сохранить кнопку Reset в свойство и подписаться на событие `click`
        this.resetButton = document.querySelector('#reset-button');
        this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));
        // сохранить кнопку Random в свойство и подписаться на событие `click`
        this.randomizeButton = document.querySelector('#randomize-button');
        this.randomizeButton.addEventListener('click', this.handleRandomizeButtonClick.bind(this));
        // сохранить слайдер Speed в свойство и подписаться на событие `input`
        this.speedSlider = document.querySelector('#speed-slider');
        this.speedSlider.addEventListener('input', this.handleSpeedSliderChange.bind(this));
    }

    play() {
        // отметить что игра в процессе
        this.onPlay = true;
        // изменить содержимое кнопки Play на pause (название икноки)
        this.playButton.textContent = 'pause';
        // высчитать следующее поколение клеток
        this.grid.next();
    }

    pause() {
        // отметить что игра присотановлена
        this.onPlay = false;
        // изменить содержимое кнопки Play на play_arrow (название икноки)
        this.playButton.textContent = 'play_arrow';
        // очистить интервал
        clearInterval(this.gameInterval);
    }

    reset() {
        // отметить что игра присотановлена
        this.onPlay = false;
        // изменить содержимое кнопки Play на play_arrow (название икноки)
        this.playButton.textContent = 'play_arrow';
        // сбросить состояние клетки
        this.grid.reset();
        // обнулить слайдер
        this.speedSlider.value = 0;
        // обнулить скорость
        this.gameSpeed = 0;
        // очистить интервал
        clearInterval(this.gameInterval);
    }

    randomize() {
        // если игра в процсее, то ничего делать не нужно
        if (this.onPlay) return;
        // сбросить игру
        this.reset();
        // опредлить случайное сосояние сетки
        this.grid.init(true);
    }

    handlePlayButtonClick(event) {
        // если игра в процессе
        if (event.target.textContent === 'pause') {
            // приостановить игру
            this.pause();
        // в противном случае
        } else {    
            // играть
            this.play();
            // запустить интервал обновления
            this.gameInterval = setInterval(() => {
                this.grid.next()
            }, 1000 - this.gameSpeed);
        }
    }

    handleResetButtonClick(event) {
        // обнулить игру
        this.reset();
    }

    handleRandomizeButtonClick(event) {
        // определить случайное состояние для игры
        this.randomize();
    }

    handleSpeedSliderChange(event) {
        // получить значение слайдера
        this.gameSpeed = event.target.value;
        // очистить интервал
        clearInterval(this.gameInterval);
        // запустить интервал с новой скоростью
        this.gameInterval = setInterval(() => {
            this.grid.next()
        }, 1000 - this.gameSpeed);
    }
}