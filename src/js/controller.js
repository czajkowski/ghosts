/* jshint ignore:start */
function Controller (gameConfig, board, pathfinder, pacman, ghosts) {

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

    function isGhostOnPath (path) {
        var i, g;

        for (i = 0; i<path.length; i++) {
            for(g = 0; g < ghosts.length; g++) {
                if (!ghosts[g].dead && path[i].x === ghosts[g].x && path[i].y === ghosts[g].y) {
                    return true;
                }
            }
        }
        return false;
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

        if ((pacman.path.length == 0 || isGhostOnPath(pacman.path)) && board.countDots() > 0) {
            pacman.path = pathfinder.calculatePacmanPath(board.map, pacman, ghosts);
        }

        forEachGhost(function (ghost) {
            if (ghost.path.length == 0) {
                ghost.path = pathfinder.calculateGhostPath(board.map, ghost);
            }
        });

        moveAllCharacters();


        if (board.map[pacman.y][pacman.x] === 3) {
            board.map[pacman.y][pacman.x] = 0;

            this.points += 10;
        }

        if (board.map[pacman.y][pacman.x] === 4) {
            board.map[pacman.y][pacman.x] = 0;

            this.points += 50;

            forEachGhost(function (ghost) {
                ghost.panic();
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
