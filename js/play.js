// The game board [row][col]
let board = [];

let score = 0;

// Text colors
let lightColor = "#E5E1D3";
let darkColor = "#3D3C38";

// Tile colors
let colors = {
    2:      {"bgColor": "#CAD2C5", "fgColor": darkColor},
    4:      {"bgColor": "#84A98C", "fgColor": darkColor},
    8:      {"bgColor": "#52796F", "fgColor": lightColor},
    16:     {"bgColor": "#354F52", "fgColor": lightColor},
    32:     {"bgColor": "#2F3E46", "fgColor": lightColor},
    64:     {"bgColor": "#5171A5", "fgColor": lightColor},
    128:    {"bgColor": "#36558F", "fgColor": lightColor},
    256:    {"bgColor": "#4C2C69", "fgColor": lightColor},
    512:    {"bgColor": "#42253B", "fgColor": lightColor},
    1024:   {"bgColor": "#832232", "fgColor": lightColor},
    2048:   {"bgColor": "#963D5A", "fgColor": lightColor},
    4096:   {"bgColor": "#C16E70", "fgColor": lightColor},
    8192:   {"bgColor": "#9E5E31", "fgColor": darkColor},
    16384:  {"bgColor": "#FF6F59", "fgColor": darkColor},
};

$().ready(function () {
    // Initialize the board to empty.
    for (let j = 0; j < 4; j++) {
        let row = [];
        for (let i = 0; i < 4; i++) {
            row.push(0);
        }
        board.push(row);
    }

    // Add a tile where clicked, or else double the value of the clicked tile.
    $("#game_board").on('mousedown', 'div.tile', function () {
        if($(this).hasClass("active")) {
            let [row, col] = getPosition($(this));
            board[row][col] *= 2;
            updateTile($(this));
        } else {
            let [row, col] = getPosition($(this));
            addTile(row, col, Math.pow(2, getRandomInt(1,4)));
        }
        return false;
    });

    // Handle arrow keys
    $(document).keydown(function(event) {
        let keyCode = event.which;
        switch (keyCode) {
            case 37: {
                if (slideTiles("left")) {
                    addRandomTiles();
                }
                event.preventDefault();
                break;
            }
            case 38: {
                if (slideTiles("up")) {
                    addRandomTiles();
                }
                event.preventDefault();
                break;
            }
            case 39: {
                if (slideTiles("right")) {
                    addRandomTiles();
                }
                event.preventDefault();
                break;
            }
            case 40: {
                if (slideTiles("down")) {
                    addRandomTiles();
                }
                event.preventDefault();
                break;
            }
            default:
                return;
        }
        return false;
    });

    return false;
});

function updateTile($tile) {
    let [row, col] = getPosition($tile);
    let value = board[row][col];
    if (value < 16385) {
        $tile.text(value);
        $tile.css("background-color", colors[value]['bgColor']);
        if (value !== 2) $tile.css("color", colors[value]['fgColor']);
    }
    return false;
}

function addTile(row, col, value) {
    let $newTile = $('<div class="tile"></div>');
    $newTile.addClass("row" + row + " col" + col);
    $newTile.toggleClass("active holder");
    board[row][col] = value;
    $newTile.text(board[row][col]);
    $newTile.css("background-color", colors[value]['bgColor']);
    $newTile.css("color", colors[value]['fgColor']);
    $("#game_board").append($newTile);
    return false;
}

function slideTiles(direction) {
    let movedTiles = false;
    switch (direction) {
        case "down": {
            for (let row = 1; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        } break;
        case "up": {
            for (let row = 2; row >= 0; row--) {
                for (let col = 0; col < 4; col++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        } break;
        case "left": {
            for (let col = 1; col < 4; col++) {
                for (let row = 0; row < 4; row++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        } break;
        case "right": {
            for (let col = 2; col >= 0; col--) {
                for (let row = 0; row < 4; row++) {
                    if (board[row][col] > 0) {
                        let $tile = getTileAtPosition(row, col);
                        movedTiles = (slideTile($tile, direction) || movedTiles);
                    }
                }
            }
        }
    }
    return movedTiles;
}

function getPosition($tile) {
    let thisTileClasses = $tile.attr("class");
    let row = (thisTileClasses.match(/row(\d)/))[1];
    let col = (thisTileClasses.match(/col(\d)/))[1];
    return [parseInt(row), parseInt(col)];
}

function getTileAtPosition(row, col) {
    let selector = "div.active.row" + row + ".col" + col;
    return $($(selector)[0]);
}

function removeTileAtPosition(row, col) {
    let $tile = getTileAtPosition(row, col);
    $tile.remove();
}

function updateScoreDisplay() {
    let scoreDiv = $("#score")[0];
    scoreDiv.innerHTML = "Score: " + score;
}

function slideTile($tile, direction) {
    let movedTile = false;
    let [row, col] = getPosition($tile);
    let thisTileValue = board[row][col];
    switch (direction) {
        case "right": {
            let distanceToEdge = 3 - col;
            if (distanceToEdge > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToEdge; shift++) {
                    let foundTileValue = board[row][col + shift];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row, col + distanceToMove);
                    movedTile = true;
                }
            }
            return movedTile;
        }
        case "left": {
            let distanceToEdge = col;
            if (distanceToEdge > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToEdge; shift++) {
                    let foundTileValue = board[row][col - shift];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row, col - distanceToMove);
                    movedTile = true;
                }
            }
            return movedTile;
        }
        case "up": {
            let distanceToTop = 3 - row;
            if (distanceToTop > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToTop; shift++) {
                    let foundTileValue = board[row + shift][col];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row + distanceToMove, col);
                    movedTile = true;
                }
            }
            return movedTile;
        }
        case "down": {
            let distanceToBottom = row;
            if (distanceToBottom > 0) {
                let shift;
                let distanceToMove = 0;
                for (shift = 1; shift <= distanceToBottom; shift++) {
                    let foundTileValue = board[row - shift][col];
                    if (foundTileValue === 0) {
                        distanceToMove = shift;
                    } else if (foundTileValue === thisTileValue) {
                        distanceToMove = shift;
                        break;
                    } else break;
                }
                if (distanceToMove > 0) {
                    moveTileToPosition($tile, row, col, row - distanceToMove, col);
                    movedTile = true;
                }
            }
            return movedTile;
        }
    }
}

function moveTileToPosition($tile, currentRow, currentCol, newRow, newCol) {
    if (currentCol !== newCol || currentRow !== newRow) {
        let currentVal = board[currentRow][currentCol];
        let newVal = board[newRow][newCol];
        if (currentVal === newVal) {
            let doubleVal = currentVal * 2;
            board[newRow][newCol] = doubleVal;
            score += doubleVal;
            removeTileAtPosition(newRow, newCol);
            updateScoreDisplay();
            updateTile($tile);
        } else board[newRow][newCol] = currentVal;
        board[currentRow][currentCol] = 0;
        $tile.removeClass("row" + currentRow + " col" + currentCol);
        $tile.addClass("row" + newRow + " col" + newCol);
        updateTile($tile);
    }
}

function addRandomTiles() {
    let row;
    let col;
    let emptyCell =  false;
    while (!emptyCell) {
        row = getRandomInt(0,4);
        col = getRandomInt(0,4);
        emptyCell = (board[row][col] === 0);
    }
    let value = 2;
    let prob = Math.random();
    if (prob > .85) value = 4;
    //alert("Adding a tile at " + row + ", " + col + " with value " + value);
    addTile(row, col, value);
}

// The maximum is exclusive and the minimum is inclusive. Stolen (and then edited) from somewhere on the internets.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function gameOver() {
    let cellsToCheck = [[0,0], [0,2], [1,1], [1,3], [2,0], [2,2], [3,1], [3,3]];
    for (let cell in cellsToCheck) {
        let cellValue = board[cell[0]][cell[1]];
        if (cellValue = 0) return false;
        else {
            return true;
        }
    }
    return false;
}

//Mock Board
// o 0 o 0
// 0 o 0 o
// o 0 o 0
// 0 o 0 o