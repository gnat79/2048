// The game board [row][col]
let board = [];

let score = 0;

// Background, foreground
let textColor = "#E5E1D3";
let colors = {
    2: "#CAD2C5",
    4: "#84A98C",
    8: "#52796F",
    16: "#354F52",
    32: "#2F3E46",
    64: "#5171A5",
    128:"#36558F",
    256: "#4C2C69",
    512: "#42253B",
    1024: "#832232",
    2048: "#963D5A",
    4096: "#C16E70",
    8192: "#9E5E31",
    16384: "#FF6F59",
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
            addTile(row, col);
        }
        return false;
    });

    // Handle arrow keys
    $(document).keydown(function(event) {
        let keyCode = event.which;
        switch (keyCode) {
            case 37: {
                slideTiles("left");
                event.preventDefault();
                break;
            }
            case 38: {
                slideTiles("up");
                event.preventDefault();
                break;
            }
            case 39: {
                slideTiles("right");
                event.preventDefault();
                break;
            }
            case 40: {
                slideTiles("down");
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
        $tile.css("background-color", colors[value]);
        $tile.css("color", textColor);
    }
    return false;
}


function addTile(row, col) {
    let $newTile = $('<div class="tile"></div>');
    $newTile.addClass("row" + row + " col" + col);
    $newTile.toggleClass("active holder");
    let value = 2;
    board[row][col] = value;
    $newTile.text(board[row][col]);
    $newTile.css("background-color", colors[value]);
    $newTile.css("color", "#3D3C38");
    $("#game_board").append($newTile);
    return false;
}

function slideTiles(direction) {
    switch (direction) {
        case "down": alert(direction); break;
        case "up": alert(direction); break;
        case "left": alert(direction); break;
        case "right": {
            slideAllTilesRight();
            break;
        }
    }
}

function slideAllTilesRight() {
    for (let col = 2; col > -1; col--) {
        for (let row = 0; row < 4; row++) {
            let selector = "div.active.row" + row + ".col" + col;
            let tile = $(selector);
            if (tile.length > 0) {
                //alert("Found " + $tile.length + " tile with value " + $tile[0].innerHTML);
                slideTileRight($(tile[0]), row, col);
            }
        }
    }
}

function getPosition($tile) {
    let thisTileClasses = $tile.attr("class");
    let row = (thisTileClasses.match(/row(\d)/))[1];
    let col = (thisTileClasses.match(/col(\d)/))[1];
    return [row, col];
}

function moveTileToPosition($tile, currentRow, currentCol, newRow, newCol) {
    board[currentRow][currentCol] = 0;
    $tile.removeClass("row" + currentRow + " col" + currentCol);
    $tile.addClass("row" + newRow + " col" + newCol);
}

function updateScoreDisplay() {
    let scoreDiv = $("#score")[0];
    scoreDiv.innerHTML = "Score: " + score;
}


function slideTileRight($tile, row, col, direction) {
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
                    let selector = "div.active.row" + row + ".col" + (col + shift);
                    let $oldTile = $(selector)[0];
                    moveTileToPosition($tile, row, col, row, col + shift);
                    board[row][col + shift] *= 2;
                    score += board[row][col + shift];
                    updateScoreDisplay();
                    updateTile($tile);
                    $oldTile.remove();
                }
            }
            return;
        }
        case "left": {
            return;
        }
        case "up": {
            return;
        }
        case "down": {
            return;
        }
    }
}