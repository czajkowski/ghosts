/* jshint ignore:start */
function Controller (gameConfig, board, pacman, ghosts) {

    //#########################################################################
    // VARIABLED
    //#########################################################################

    var tickTime = gameConfig.tickTime,
        interval,
        panickedTicksLeft = 0;

    //#########################################################################
    // PROPERTIES
    //#########################################################################

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

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    function forEachGhost (fn) {
        ghosts.forEach(fn)
    }

    function forEachCharacter (fn) {
        forEachGhost(fn);
        fn(pacman);
    }

    function moveAllCharacters () {
        forEachCharacter(function (character) {
            character.move();
            board.drawSurrounding(character.x, character.y);
        });
    }

    function drawAllCharacters () {
        forEachCharacter(function (character) {
            character.draw();
        });
    }

    function tick () {

        if (panickedTicksLeft) {
            if (panickedTicksLeft === 1) {
                forEachGhost(function (ghost) {
                    ghost.calm();
                });
            }

            panickedTicksLeft--;
        }

        moveAllCharacters();

        if (board.map[pacman.y][pacman.x] === 3) {
            board.map[pacman.y][pacman.x] = 0;

            this.points += 10;
        }

        if (board.map[pacman.y][pacman.x] === 4) {
            board.map[pacman.y][pacman.x] = 0;

            this.points += 50;

            forEachGhost(function (ghost) {
                ghost.die();
            });

            panickedTicksLeft = gameConfig.panickedTicks;
        }

        drawAllCharacters();
    }

    //#########################################################################
    // METHODS
    //#########################################################################

    this.start = function () {
        board.draw();

        forEachCharacter(function (character) {
            character.init();
        });

        intervel = setInterval(tick.bind(this), tickTime);
    };

}
