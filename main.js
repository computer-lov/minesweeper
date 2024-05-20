// main minesweeper program

const Grid = require('./grid');


// attempts to clear tile, should end game if mine is discovered
function attemptClearTile(tile) {
    // check if mine
    if (tile.isMine) {
        tile.adjustTileSymbol('*');
        return false;
    }
    // determine number of adjacent mines
    else {
        tile.adjacentMines = findAdjacentMines(tile.coordinates);
        tile.adjustTileSymbol(tile.adjacentMines.toString());
        return true;
    }
}

// determines number of adjacent mines, should return an integer
function findAdjacentMines(coordinates) {
    let row = coordinates[0];
    let col = coordinates[1];
    
    // check left

    // check left upper corner
    
    // check above 
}


function main() {

}