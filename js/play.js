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

    $("#game_board").on('click', 'div.tile', function() {
        alert($(this).attr("class"));
        if ($(this).hasClass("holder")) {
            alert("holder");
        }
        else if ($(this).hasClass("active")) {
            alert("active");
        }
        else {
            alert($(this).attr("class"));
            return false;
        }
        // $(this).toggleClass("active holder");
        addTile($(this).attr('class'));
        return false;
    });
    return false;
});


function addTile(position) {
    let row = (position.match(/row(\d)/))[1];
    let col = (position.match(/col(\d)/))[1];
    alert("Adding a new tile at [" + row + ", " + col + "]");
    let $newTile = $( '<div class="tile"></div>' );
    $newTile.addClass(position);
    $newTile.toggleClass("active holder");
    $("#game_board").append($newTile);
    board[row][col].push($newTile);
    alert("Success!");
    return false;
}

// function setValue(tile, power) {
//     let color = blue;
// }