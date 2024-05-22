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
                if (!this.grid[row][col].getMineStatus()) {
                    let adjacentMines = 0;
                    // loops through directions array created above
                    for (let [dx, dy] of this.directions) {
                        if (this.isValidTile(row+dx, col+dy) && this.grid[row+dx][col+dy].getMineStatus()) {
                            adjacentMines++;
                        }
                    }
                    this.grid[row][col].setAdjMines(adjacentMines);
                }
            }
        }
    }

    // reveal all mines and incorrectly placed flags
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

    // attempts to clear tile, if tile is a zero also clears surrounding tiles
    attemptClearNeighborTiles(row, col) {
        const queue = [[row, col]];
        while (queue.length > 0) {
            // removes current row/col from queue because we've seen it
            const [currRow, currCol] = queue.shift();

            // clears and sets tile symbol
            this.grid[currRow][currCol].clearTile();
            this.grid[currRow][currCol].updateSymbol(this.grid[currRow][currCol].getAdjMines());

            // if were at a 0 we need to scan other tiles
            if (this.grid[currRow][currCol].getAdjMines() == 0) {
                for (let [dx, dy] of this.directions) {
                    if (this.isValidTile(currRow+dx, currCol+dy) && !this.grid[currRow+dx][currCol+dy].getClearanceStatus()) {
                        queue.push([currRow+dx, currCol+dy])
                    }
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
        // clear / place adj mines on tile and attempt to clear neigbors if no adjacent mines
        else {
            this.attemptClearNeighborTiles(row, col);
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