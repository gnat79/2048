// The game board [row][col]
var board = [];


$().ready(function () {
    // Initialize the board to empty.
    for (let j = 0; j < 4; j++) {
        let row = [];
        for (let i = 0; i < 4; i++) {
            row.push(1);
        }
        board.push(row);
    }

    $("#game_board").on('click', 'div.tile', function () {
        if($(this).hasClass("active")) {
            updateTile($(this));
        } else {
            addTile($(this).attr('class'));
        }
        return false;
    });
    return false;
});

function updateTile($tile) {
    let position = $tile.attr("class");
    let row = (position.match(/row(\d)/))[1];
    let col = (position.match(/col(\d)/))[1];
    $tile.text(board[row][col] *=2);
}


function addTile(position) {
    let row = (position.match(/row(\d)/))[1];
    let col = (position.match(/col(\d)/))[1];
    let $newTile = $('<div class="tile"></div>');
    $newTile.addClass(position);
    $newTile.toggleClass("active holder");
    $("#game_board").append($newTile);
    board[row][col] *= 2;
    $newTile.text(board[row][col]);
    return false;
}

function setValue(tile, power) {
    let color = blue;
}