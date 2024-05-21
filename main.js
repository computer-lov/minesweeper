// main minesweeper program

const Grid = require('./grid');


function main() {
    let grid = new Grid();
    grid.initializeGrid();
    grid.randomizeGridMines(10);
    if (grid.attemptClearTile(1,1))
        grid.displayGrid();
    else 
        console.log("GAME OVER");
}

main();