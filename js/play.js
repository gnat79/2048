// The game board [row][col]
let board = [];

// Background, foreground
let textColor = "#E5E1D3";
let colors = {
    2: "#CAD2C5",
    4: "#84A98C",
    8: "#52796F",
    16: "#354F52",
    32: "#2F3E46",
    64: "#5171A5",
    128:"#454372",
    256: "#2F2963",
    512: "#320A28",
    1024: "#6E2594",
    2048: "#7B4B94",
    4096: "#92374D",
    8192: "#1B263B",
    16384: "black",
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
            updateTile($(this));
        } else {
            let [row, col] = getTileLocation($(this));
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
    let position = $tile.attr("class");
    let row = (position.match(/row(\d)/))[1];
    let col = (position.match(/col(\d)/))[1];
    let value = (board[row][col] *= 2);
    if (value < 16385) {
        $tile.text(value);
        $tile.css("background-color", colors[value]);
        $tile.css("color", textColor);
    }
    return false;
}


function addTile(row, col) {
    let $newTile = $('<div class="tile"></div>');
    $newTile.addClass(position);
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
            let $tile = $(selector);
            if ($tile.length > 0) {
                //alert("Found " + $tile.length + " tile with value " + $tile[0].innerHTML);
                slideTileRight($tile[0], row, col);
            }
        }
    }
}

function slideTileRight($tile, row, col) {
    let colsToSlide = 3-col; // Distance from here to last column
    if (colsToSlide > 0) {
        let thisTileValue = board[row][col];
        if (board[row][col+1] === thisTileValue) {
            let selector = "div.active.row" + row + ".col3";
            let $tileRight = $(selector);
            if ($tileRight[0]. === thisTileValue) {

            }
        } else if (col === 1) {
            // do something
        } else {
            // do something
        }
        let nextRightValue = board[row][col + 1];
    }
}

function getTileLocation($tile) {
    let thisTileClasses = $tile.attr("class");
    let row = (thisTileClasses.match(/row(\d)/))[1];
    let col = (thisTileClasses.match(/col(\d)/))[1];
    return [row, col];
}