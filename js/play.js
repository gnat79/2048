$().ready(function() {
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
    let $newTile = $( '<div class="tile"></div>' );
    $newTile.addClass(position);
    $newTile.toggleClass("active holder");
    $("#game_board").append($newTile);
    return false;
}