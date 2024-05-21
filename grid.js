// grid class

const Tile = require('./tile');
const math = require('mathjs');

class Grid extends Tile {
    constructor() {
        super();
        this.grid = [];
        this.size = 64;
        this.side = math.sqrt(this.size);
    }

    // initializes grid of tiles
    initializeGrid() {
        for (let row = 0; row < this.side; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.side; col++) {
                this.grid[row][col] = new Tile(row, col);
            }
        }
    };

    getRandInt(min, max) {
        return math.floor(Math.random() * (max - min)) + min;
    }

    // randmomize grid mines, number of mines to be planted must be provided
    randomizeGridMines(numMines) {
        while (numMines > 0) {
            let randRow = this.getRandInt(0, this.side);
            let randCol = this.getRandInt(0, this.side);

            if (!this.grid[randRow][randCol].getMineStatus()) {
                this.grid[randRow][randCol].plantMine();
                numMines--;
            }
        }
    };

    // prints out grid
    displayGrid() {
        for (let row = 0; row < this.side; row++) {
            let tempArr = []
            for (let col = 0; col < this.side; col++) {
                tempArr[col] = this.grid[row][col].getCurrSymbol();
            }
            console.log(tempArr.join(' '));
        }
    };

    // determines number of adjacent mines, should return an integer
    // update this to be more efficent
    findAdjacentMines(row, col) {
        let adjMineCount = 0;
        // check left lower corner
        if (row+1 < this.side && col-1 >= 0 && this.grid[row+1][col-1].getMineStatus()) adjMineCount++; 
        // check left
        if (col-1 >= 0 && this.grid[row][col-1].getMineStatus()) adjMineCount++;
        // check left upper corner
        if (row-1 >= 0 && col-1 >= 0 && this.grid[row-1][col-1].getMineStatus()) adjMineCount++;
        // check above
        if (row-1 >= 0 >= 0 && this.grid[row-1][col].getMineStatus()) adjMineCount++;
        // check right upper corner
        if (row-1 >= 0 && col+1 < this.side && this.grid[row-1][col+1].getMineStatus()) adjMineCount++;
        // check right
        if (col+1 < this.side && this.grid[row][col+1].getMineStatus()) adjMineCount++;
        // check right lower corner
        if (row+1 < this.side && col+1 < this.side && this.grid[row+1][col+1].getMineStatus()) adjMineCount++;
        // check below
        if (row+1 < this.side && this.grid[row+1][col].getMineStatus()) adjMineCount++;
        
        this.grid[row][col].setAdjMines(adjMineCount);
    }

    // attempts to clear tile, returns true if successful
    attemptClearTile(row, col) {
        // check if mine
        if (this.grid[row][col].getMineStatus()) {
            this.grid[row][col].updateSymbol("*");
            return false;
        }
        // determine number of adjacent mines
        else {
            this.findAdjacentMines(row, col);
            this.grid[row][col].updateSymbol(this.grid[row][col].getAdjMines());
            return true;
        }
    }

    // clears grid
    clearGrid() {
        this.grid = [];
    };

}

module.exports = Grid;