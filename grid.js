// grid class

const Tile = require('./tile');
const math = require('mathjs');

class Grid extends Tile {
    constructor(size) {
        super();
        this.grid = [];
        this.size = size;
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

    // determines number of adjacent mines, should return an integer
    // update this to be more efficent 
    // CAUSES CRASH AROUND BOUNDARIES
    findAdjacentMines(row, col) {
        let adjMineCount = 0;
        // check left lower corner
        if (row+1 < this.side && col-1 >= 0)
             if (this.grid[row+1][col-1].getMineStatus()) adjMineCount++;
        // check left
        if (col-1 >= 0)
            if (this.grid[row][col-1].getMineStatus()) adjMineCount++;
        // check left upper corner
        if (row-1 >= 0 && col-1 >= 0)
            if (this.grid[row-1][col-1].getMineStatus()) adjMineCount++;
        // check above
        if (row-1 >= 0)
            if (this.grid[row-1][col].getMineStatus()) adjMineCount++;
        // check right upper corner
        if (row-1 >= 0 && col+1 < this.side)
            if (this.grid[row-1][col+1].getMineStatus()) adjMineCount++;
        // check right
        if (col+1 < this.side)
            if (this.grid[row][col+1].getMineStatus()) adjMineCount++;
        // check right lower corner
        if (row+1 < this.side && col+1 < this.side) 
            if (this.grid[row+1][col+1].getMineStatus()) adjMineCount++;
        // check below
        if (row+1 < this.side) 
            if (this.grid[row+1][col].getMineStatus()) adjMineCount++;
        
        this.grid[row][col].setAdjMines(adjMineCount);
        this.grid[row][col].updateSymbol(this.grid[row][col].getAdjMines());
    }

    // attempts to clear tile, returns true if successful
    attemptClearTile(row, col) {
        // check if mine
        if (this.grid[row][col].getMineStatus()) {
            this.grid[row][col].clearTile();
            this.grid[row][col].updateSymbol("*");
            return false;
        }
        // determine number of adjacent mines
        else {
            this.grid[row][col].clearTile();
            this.findAdjacentMines(row, col);
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
        let count = 0;
        for (let row = 0; row < this.side; row++) {
            for (let col = 0; col < this.side; col++) {
                // console.log(this.grid[row][col].getCurrSymbol());
                if (this.grid[row][col].getCurrSymbol() == "_") return false;
            }
        }
        console.log("\nCONGRATULATIONS\nVICTORY ACHIEVED\nWELL DONE");
        return true;
    }
}

module.exports = Grid;