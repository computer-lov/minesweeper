// tile.js

class Tile {
    constructor (row, col) {
        this.coordinates = [row, col];
        this.cleared = false;
        this.flagged = false;
        this.isMine = false;
        this.adjacentMines = 0;
        this.currSymbol = "_";
    }

    // toggles tile between flagged/unflagged
    toggleFlag() {
        if (!this.cleared && this.flagged) {
            this.flagged = false;
            this.updateSymbol("_");
        } else if (!this.cleared && !this.flagged) {
            this.flagged = true;
            this.updateSymbol("!");
        } // else - tile is cleared - nothing to do :}
    }

    // get flag status
    getFlagStatus() {
        return this.flagged;
    }
    
    // clears tile
    clearTile() {
        this.cleared = true;
    }
    
    // gets clerance status
    getClearanceStatus() {
        return this.cleared;
    }

    // plants mine
    plantMine() {
        this.isMine = true;
    }

    // get mine status 
    getMineStatus() {
        return this.isMine;
    }

    // set adjacent mines
    setAdjMines(adjMines) {
        this.adjacentMines = adjMines;
    }

    // set adjacent mines
    getAdjMines() {
        return this.adjacentMines;
    }

    // gets current symbol from tile
    getCurrSymbol() {
        return this.currSymbol;
    }

    // update symbol
    updateSymbol(newSymbol) {
        this.currSymbol = newSymbol;
    }
}

module.exports = Tile;