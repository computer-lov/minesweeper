// tile.js

class Tile {
    constructor () {
        this.coordinates = [-1, -1];
        this.cleared = false;
        this.flagged = false;
        this.isMine = false;
        this.adjacentMines = 0;
        this.currSymbol = '_';
        this.adjacentTiles; // need to figure out how to reference adjacent tiles
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
    
    // sets cleared variable to true
    clearTile() {
        this.cleared = true;
    }

}

module.exports = Tile;