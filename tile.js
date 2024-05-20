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
    
    // clears tile, should end game if mine is discovered
    clearTile() {
        // check if mine
        if (this.isMine) {
            this.adjustTileSymbol('*');
            return false;
        }
        // determine number of adjacent mines
        else {
            this.adjacentMines = findAdjacentMines(this.coordinates);
            this.adjustTileSymbol(this.adjacentMines.toString());
            return true;
        }
    }

    // overwrites tile symbol displayed on grid
    // _ - uncleared tile 
    // ! - flagged tile
    // 123 etc. - cleared tile that displays number of adjacent mines
    // * - display mine (GAME OVER!!!)
    adjustTileSymbol(newSymbol) {
        this.currSymbol = newSymbol;
    }

    // determines number of adjacent mines, should return an integer
    findAdjacentMines(coordinates) {
        let row = coordinates[0];
        let col = coordinates[1];
        
        // check left

        // check left upper corner
        
        // check above 


        

    }

}

module.exports = Tile;