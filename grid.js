// grid class

const Tile = require('./tile');
const math = require('mathjs');

class Grid extends Tile {
    constructor(size) {
        super();
        this.grid = [];
        this.size = size;
        this.side = math.sqrt(this.size);
        this.directions = [[-1, -1], [-1, 0], [-1, 1],
                            [0, -1],            [0, 1],
                            [1, -1],  [1, 0],   [1, 1]];
    }

    // initializes grid of tiles
    initializeGrid() {
        for (let row = 0; row < this.side; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.side; col++) {
                this.grid[row][col] = new Tile(row, col);
            }
        }
    }

    // randmomize grid mines, number of mines to be planted must be provided
    randomizeGridMines(numMines, initCoords) {
        while (numMines > 0) {
            let randRow = math.floor(Math.random() * this.side);
            let randCol = math.floor(Math.random() * this.side);
            if (!this.grid[randRow][randCol].getMineStatus() && !(initCoords[0] == randRow && initCoords[1] == randCol)) {
                this.grid[randRow][randCol].plantMine();
                numMines--;
            }
        }
    }

    // prints out grid
    displayGrid() {
        console.log("-------CURRENT GRID--------");
        for (let row = 0; row < this.side; row++) {
            let tempArr = []
            for (let col = 0; col < this.side; col++) {
                tempArr[col] = this.grid[row][col].getCurrSymbol();
            }
            console.log(tempArr.join(' '));
        }
        console.log();
    }

    isValidTile(row, col) {
        return row >= 0 && row < this.side && col >= 0 && col < this.side;
    }

    // improved function to calculate mines upfront
    calculateAdjacentMines() {
        for (let row = 0; row < this.side; row++) {
            for (let col = 0; col < this.side; col++) {
                if (this.grid[row][col].getMineStatus()) continue;
                let adjacentMines = 0;
                // loops through directions array created above
                for (let [dx, dy] of this.directions) {
                    let adjRow = row + dx;
                    let adjCol = col + dy;
                    if (this.isValidTile(adjRow, adjCol) && this.grid[adjRow][adjCol].getMineStatus()) {
                        adjacentMines++;
                    }
                }
                this.grid[row][col].setAdjMines(adjacentMines);
            }
        }
    }

    // reveal all mines
    revealAnswers() {
        for (let row = 0; row < this.side; row++) {
            for (let col = 0; col < this.side; col++) {
                if (this.grid[row][col].getMineStatus()) {
                    this.grid[row][col].clearTile();
                    this.grid[row][col].updateSymbol("*");
                } else if (this.grid[row][col].getFlagStatus()) {
                    this.grid[row][col].clearTile();
                    this.grid[row][col].updateSymbol("X");
                }
            }
        }
    }

    // attempts to clear tile, returns true if successful
    attemptClearTile(row, col) {
        // check if mine
        if (this.grid[row][col].getMineStatus()) {
            this.revealAnswers();
            return false;
        }
        // determine number of adjacent mines
        else {
            this.grid[row][col].clearTile();
            this.grid[row][col].updateSymbol(this.grid[row][col].getAdjMines());
            return true;
        }
    }
    
    // get specific tile
    getTile(row, col) {
        return this.grid[row][col];
    }

    // clears grid
    clearGrid() {
        this.grid = [];
    }

    // victory 
    victory() {
        for (let row = 0; row < this.side; row++) {
            for (let col = 0; col < this.side; col++) {
                // console.log(this.grid[row][col].getCurrSymbol());
                if (this.grid[row][col].getCurrSymbol() == "_") return false;
            }
        }
        return true;
    }
}

module.exports = Grid;