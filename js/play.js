// The game board [row][col]
var board = [];


$().ready(function() {
    // Initialize the board to empty.
    for (let j = 0; j < 4; j++) {
        let row = [];
        for (let i = 0; i < 4; i++) {
            row.push([]);
        }
        board.push(row);
    }

    $("div.active").click(function() {
        $(this).toggleClass("row1");
        return false;
    });

    $("div.holder").click(function() {
        addTile($(this).attr('class'));
    });
    return false;
});


function addTile(position) {
    let row = position.match('/row(\d)/');
    alert(row[0]);
    let $newTile = $( '<div class="tile"></div>' );
    $newTile.addClass(position);
    $newTile.toggleClass("active holder");
    $("#game_board").append($newTile);
    return false;
}

function setValue(tile, power) {
    let color = blue;
}