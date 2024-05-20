// tile.js

class Tile {
    constructor () {
        this.coordinates = [-1, -1];
        this.cleared = false;
        this.flagged = false;
        this.isMine = false;
        this.adjacentMines = 0;
        this.currSymbol = '_';
    }

    // toggles tile between flagged/unflagged
    toggleFlag() {
        if (!this.cleared && this.flagged) {
            this.flagged = false;
            this.adjustTileSymbol('_');
        } else if (!this.cleared && !this.flagged) {
            this.flagged = true;
            this.adjustTileSymbol('!');
        } // else - tile is cleared - nothing to do :}
    }
    
    // clears tile
    clearTile() {
        this.cleared = true;
    }

    // plants mine
    plantMine() {
        this.isMine = true;
    }

    // set adjacent mines
    setAdjMines(adjMines) {
        this.adjacentMines = adjMines;
    }

    // update symol
    updateSymbol(newSymbol) {
        this.currSymbol = newSymbol;
    }
}

module.exports = Tile;