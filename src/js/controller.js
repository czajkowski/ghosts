/* jshint ignore:start */
function Controller (gameConfig, board, pacman, ghosts) {

    this.points = 0;

    // Map
    // 0 - empty road
    // 1 - portal
    // 3 - dot
    // 4 - big dot
    // 8 - door
    // 9 - wall

    // Directions
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left

    function forEachGhost (fn) {
        for (var i = 0; i < ghosts.lenght; i++) {
            fn(ghosts[i]);
        }
    }

    function forEachCharacter (fn) {
        forEachGhost(fn);
        fn(pacman);
    }


    //#########################################################################
    // METHODS
    //#########################################################################

    this.tick = function () {

        forEachCharacter(function (character) {
            character.move();
            board.drawSurrounding(character.x, character.y);
        });

        if (board.map[pacman.y][pacman.x] === 3) {
            board.map[pacman.y][pacman.x] = 0;

            this.points += 10;
        }

        if (board.map[pacman.y][pacman.x] === 4) {
            board.map[pacman.y][pacman.x] = 0;

            this.points += 50;

            forEachGhost(function (ghost) {
                ghost.panicked = true;
            });

        }

        forEachCharacter(function (character) {
            character.draw();
        });

    }
}
