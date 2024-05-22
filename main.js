// main minesweeper program

const Grid = require('./grid');
const prompt = require('prompt-sync')();
const math = require('mathjs');

// prints invalid message
function invalidMessage() {
    console.log("Invalid input. Please try again.\n");
}

// validates user input, user input must be within validArr
function validateInput(validArr, currVal) {
    for (let i = 0; i < validArr.length; i++) {
        if (validArr[i] == currVal) return true;
    }
    return false;
}

// gets preferred difficulty from user
function getDifficulty() {
    let diffStr = "Please select difficulty: \n [1] Easy (36 tiles) \n [2] Medium (64 tiles) \n [3] Hard (100 tiles) \n";
    let isValid = false;
    while (!isValid) {
        console.log(diffStr);
        diffNum = parseInt(prompt());
        if (validateInput([1, 2, 3], diffNum)) isValid = true;
        else invalidMessage();
    }
    return diffNum;
}

// sets up game parameters based on difficulty
function setGameParams(difficulty) {
    let size;
    let mines;
    switch(difficulty) {
        case 1:
            size = 36;
            mines = 5
            break;
        case 2:
            size = 64;
            mines = 10
            break;
        case 3:
            size = 100;
            mines = 15
            break;
    }
    let flags = mines;
    let n = math.sqrt(size);

    return [size, mines, flags, n];
}

// gets desired action from user
function displayActions() {
    let actionStr = "Please select action: \n [F] flag or unflag tile \n [C] clear tile \n [X] exit game \n";
    let isValid = false;
    while (!isValid) {
        console.log(actionStr);
        action = prompt();
        action = action.toUpperCase();
        if (validateInput(["F", "C", "X"], action)) isValid = true;
        else invalidMessage();
    }
    return action;
}

// gets coordinates from user
function getCrds(maxLength) {
    let crdStr = "\nPlease enter desired tile coordinates: \n";
    let isValid = false;
    while (!isValid) {
        console.log(crdStr);
        row = parseInt(prompt("Row: "));
        col = parseInt(prompt("Col: "));
        if (isNaN(row) || isNaN(col) || row < 0 || col < 0 || row >= maxLength || col >= maxLength)
            invalidMessage();
        else 
            isValid = true;
    }
    console.log();

    return [row, col];
}

// first move of game
// slightly different as player cannot lose on first move
function firstMove(grid, gameParams) {
    console.log("\nPlease select a tile\nThe first one you select will not have a mine underneath it\n");
    grid.displayGrid();
    let initCrds = getCrds();
    grid.randomizeGridMines(gameParams[1], initCrds);
    grid.calculateAdjacentMines();
    grid.attemptClearTile(initCrds[0], initCrds[1]);
    grid.displayGrid();
}

// handles flag action - user flagging / unflagging tile
function flagAction(grid, crds, flagsRemaining) {
    let currTile = grid.getTile(crds[0], crds[1]);
    if ((flagsRemaining > 0 || currTile.getFlagStatus()) && !currTile.getClearanceStatus()) {
        currTile.toggleFlag();
        if (currTile.getFlagStatus()) flagsRemaining--;
        else flagsRemaining++;
    } else if (currTile.getClearanceStatus()){
        console.log("\nCannot place flag on cleared tile\n");
    } else {
        console.log("Out of flags :(\nMust remove an existing flag before placing new one\n");
    }
    grid.displayGrid();
    return flagsRemaining;
};

// handles clear action - user attempting to clear a file
function clearAction(grid, crds) {
    let currTile = grid.getTile(crds[0], crds[1]);
    if (currTile.getClearanceStatus()) {
        console.log("\nTile already cleared\n");
        grid.displayGrid();
        return false;
    } else {
        let attempt = grid.attemptClearTile(crds[0], crds[1]);
        grid.displayGrid();
        // we hit a mine
        if (!attempt) {
            console.log("GAME OVER !!!!")
            grid.clearGrid();
            return true;
        // we are safe continue playing
        } else return false;
    }
};

// quit game early
function quit() {
    console.log("Okay. Goodbye : )");
    return true;
}

// main function that loops continually until game is over
function game(grid, gameParams) {
    // first move of game
    firstMove(grid, gameParams);
    let flagsRemaining = gameParams[2];

    let gameOver = false;
    while (!gameOver) {
        if (grid.victory()) {
            console.log("\nCONGRATULATIONS\nVICTORY ACHIEVED\nWELL DONE");
            gameOver = true;
        }
        else {
            console.log("Flags Remaining: " + flagsRemaining);
            let currAction = displayActions();
            
            if (currAction == "F") {
                let crds = getCrds(gameParams[3]);
                flagsRemaining = flagAction(grid, crds, flagsRemaining);
            } else if (currAction == "C") {
                let crds = getCrds(gameParams[3]);
                gameOver = clearAction(grid, crds);
            } else if (currAction == "X") gameOver = quit();
        }
    }
}

function setup() {
    console.log("--------MINESWEEPER--------");
    let gameDiff = getDifficulty();
    let gameParams = setGameParams(gameDiff);
    let grid = new Grid(gameParams[0]);
    grid.initializeGrid();
    game(grid, gameParams); 
}

setup();