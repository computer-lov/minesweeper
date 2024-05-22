// grid.test.js

const Grid = require('./grid');
const Tile = require('./tile');

describe('Grid', () => {
    let grid;

    beforeEach(() => {
        grid = new Grid(9);
        grid.initializeGrid();
    });

    test('should initialize a grid of given size', () => {
        expect(grid.grid.length).toBe(3);
        for (let row of grid.grid) {
            expect(row.length).toBe(3);
            for (let tile of row) {
                expect(tile).toBeInstanceOf(Tile);
            }
        }
    });

    test('should correctly randomize mines', () => {
        grid.randomizeGridMines(5, [0, 0]);
        let mineCount = 0;
        for (let row of grid.grid) {
            for (let tile of row) {
                if (tile.getMineStatus()) {
                    mineCount++;
                }
            }
        }
        expect(mineCount).toBe(5);
    });

    test('should correctly calculate adjacent mines', () => {
        // Plant mines manually for testing
        grid.grid[0][0].plantMine();
        grid.calculateAdjacentMines();

        expect(grid.grid[0][1].getAdjMines()).toBe(1);
        expect(grid.grid[1][0].getAdjMines()).toBe(1);
        expect(grid.grid[1][1].getAdjMines()).toBe(1);
        
    });

    test('should clear tile and show bomb symbol', () => {
        grid.grid[0][0].plantMine();

        grid.attemptClearTile(0, 0); // Click on a mine
        expect(grid.grid[0][0].getCurrSymbol()).toBe('*');
    });

    test('should clear a tile and show the number of adjacent mines', () => {
        grid.grid[1][1].plantMine(); // Place a mine
        grid.calculateAdjacentMines();

        grid.attemptClearTile(0, 0); // Click on a safe tile
        expect(grid.grid[0][0].getCurrSymbol()).toBe(1);
    });

    test('should clear grid', () => {
        grid.clearGrid();
        expect(grid.grid.length).toBe(0);
    });

    test('should recognize victory', () => {
        for (let i = 0; i < grid.grid.length; i++) {
            for (let j = 0; j < grid.grid.length; j++) {
                grid.grid[i][j].updateSymbol("$");
            }
        }
        expect(grid.victory()).toBe(true);
    });

    test('should successfully clear and set tiles with zero', () => {
        grid.grid[0][0].plantMine(); // Place a mine
        grid.calculateAdjacentMines();
        grid.grid[0][0].toggleFlag();
        grid.attemptClearNeighborTiles(2,2);
        expect(grid.victory()).toBe(true);
    });
});

describe('Tile', () => {
    let tile;

    beforeEach(() => {
        tile = new Tile(0,0); // initializes tile
    });

    test('should toggle flag and update symbol', () => {
        tile.toggleFlag();
        expect(tile.currSymbol).toBe("!");
        tile.toggleFlag();
        expect(tile.currSymbol).toBe("_");
    });

});