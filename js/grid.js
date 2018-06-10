import Cell from "./cell.js";

export default class Grid {
    constructor({ element, size }) {
        this.element = element;
        this.size = size;
        this.init();
    }

    init(randomize) {
        this.element.innerHTML = '';
        let tableElement = document.createElement('table');
        this.cells = [];
        this.cellsBuffer = [];
        for (let row = 0; row < this.size; row++) {
            let rowElement = document.createElement('tr');
            this.cells[row] = [];
            // this.cellsBuffer[row] = [];
            for (let col = 0; col < this.size; col++) {
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
                rowElement.appendChild(cellElement);
                this.cells[row][col] = cell;
                // this.cellsBuffer[row][col] = cell;
            }
            tableElement.appendChild(rowElement);
        }        
        this.element.appendChild(tableElement);
    }

    cellExistenceAndAlive(row, col) {
        if(this.cells[row] === undefined) return false;
        if (this.cells[row][col] === undefined) return false;
        return this.cells[row][col].alive;
    }

    countNeighbors(cell) {
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
        this.init();
    }

    resetBuffer() {
        this.cellsBuffer = [];
    }

    randomize() {
        return Math.random() < .5;
    }

    next() {
        this.cellsBuffer = [];
        
        this.cells.forEach((row, index) => {
            this.cellsBuffer[index] = [];
            row.forEach(cell => {
                this.cellsBuffer[cell.row][cell.col] = true;
                if (cell.alive) {
                    if (this.countNeighbors(cell) < 2 || this.countNeighbors(cell) > 3) {
                        this.cellsBuffer[cell.row][cell.col] = false;
                    }
                } else {
                    if (this.countNeighbors(cell) !== 3) {
                        this.cellsBuffer[cell.row][cell.col] = false;
                    }
                }
                
            })
        })
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.alive = this.cellsBuffer[cell.row][cell.col];
            })
        })
        this.cellsBuffer = [];
    }
}