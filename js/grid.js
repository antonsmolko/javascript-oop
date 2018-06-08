import Cell from "./cell.js";

export default class Grid {
    constructor({ element, size }) {
        // определить свойства
        this.element = element;
        this.size = size;
        // доинициализировать свойства в методе `init`
        this.init();
    }

    init(randomize) {
        this.element.innerHTML = '';
        // создать таблицу и сохранить ее в свойство
        let tableElement = document.createElement('table');
        // создать массивы для клеток и буфера (временное хранение для расчета следующего поколения)
        this.cells = [];
        this.cellsBuffer = [];        
        // перебрать ряды
        for (let row = 0; row < this.size; row++) {
            // создать элемент tr
            let rowElement = document.createElement('tr');
            // доинициализировать массивы для клеток и буфера
            this.cells[row] = [];
            this.cellsBuffer[row] = [];
            // перебрать столбцы
            for (let col = 0; col < this.size; col++) {
                // создать клетку
                let cellElement = document.createElement('td');
                let alive = false;   
                if (randomize) {
                    alive = this.randomize();
                }
                let cell = new Cell({
                    element: cellElement,
                    row: row,
                    col: col,
                    alive: alive
                });
                // добавить ее в ряд
                rowElement.appendChild(cellElement);
                // сохранить ее в сетку
                this.cells[row][col] = cell;
                // продублировать значение в буфере
                this.cellsBuffer[row][col] = cell;
            }
            // добавить ряд в таблицу
            tableElement.appendChild(rowElement);
        }        
        // добавить таблицу в элемент
        this.element.appendChild(tableElement);
    }

    cellExistenceAndAlive(row, col) {
        if(this.cells[row] === undefined) return false;
        if (this.cells[row][col] === undefined) return false;
        return this.cells[row][col].alive;
    }

    countNeighbors(cell) {
        // высчитать и вернуть количество соседей у клетки
        let { row, col } = cell;
        let count = 0;
        if (this.cellExistenceAndAlive(row - 1, col - 1)) count += 1;
        if (this.cellExistenceAndAlive(row - 1, col)) count += 1;
        if (this.cellExistenceAndAlive(row - 1, col + 1)) count += 1;
        if (this.cellExistenceAndAlive(row, col - 1)) count += 1;
        if (this.cellExistenceAndAlive(row, col + 1)) count += 1;
        if (this.cellExistenceAndAlive(row + 1, col - 1)) count += 1;
        if (this.cellExistenceAndAlive(row + 1, col)) count += 1;
        if (this.cellExistenceAndAlive(row + 1, col + 1)) count += 1;
        return count;
    }

    reset() {
        // привести сетку в исходное состояние
        this.init();
    }

    resetBuffer() {
        // привести буфер в исходное состояние
        this.cellsBuffer = [];
    }

    randomize() {
        // определить случайное состояние для сетки
        return Math.random() < .5;
    }

    next() {
        // высчитать следующее поколение клеток
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.alive) {
                    if (this.countNeighbors(cell) < 2 || this.countNeighbors(cell) > 3) {
                        cell.alive = false;
                    }
                } else {
                    if (this.countNeighbors(cell) === 3) {
                        cell.alive = true;
                    }
                }
                
            })
        })
        // обнулить буфер
        this.cellsBuffer = [];
    }
}