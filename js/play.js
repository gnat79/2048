// The game board [row][col]
var board = [];

// Background, foreground
var colors = {
    2: ["#CCCCFF", "black"],
    4: ["#9999FF", "white"],
    8: ["#6565FF", "white"],
    16: ["#3232FF", "white"],
    32: ["#0000FF", "white"],
    64: ["#0000CC", "white"],
    128:["#000099", "white"],
    256: ["#000066", "white"],
    512: ["#000032", "white"],
    1024: ["#000000", "white"],
    2048: ["#005604", "white"],
    4096: ["#008906", "black"],
    8192: ["#FFEE00", "black"],
    16384: ["#EE00FF", "white"]
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
            addTile($(this).attr('class'));
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
        $tile.css("background-color", colors[value][0]);
        $tile.css("color", colors[value][1]);
    }
    return false;
}


function addTile(position) {
    let row = (position.match(/row(\d)/))[1];
    let col = (position.match(/col(\d)/))[1];
    let $newTile = $('<div class="tile"></div>');
    $newTile.addClass(position);
    $newTile.toggleClass("active holder");
    board[row][col] = 2;
    $newTile.text(board[row][col]);
    $("#game_board").append($newTile);
    return false;
}

function slideTiles(direction) {
    switch (direction) {
        case "down": alert(direction); break;
        case "up": alert(direction); break;
        case "left": alert(direction); break;
        case "right": alert(direction); break;
    }
}