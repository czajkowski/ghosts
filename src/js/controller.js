/* jshint ignore:start */
function Controller (gameConfig, board, pathfinder, cakeman, ghosts) {

    //#########################################################################
    // VARIABLED
    //#########################################################################

    var mainInterval,
        panickedTicksLeft = 0;

    //#########################################################################
    // HELPER FUNCTIONS
    //#########################################################################

    // Helper method execiting passed function
    // for each ghost.
    function eachGhost (fn) {
        ghosts.forEach(fn)
    }

    // Helper method execiting passed function
    // for each character.
    function eachCharacter (fn) {
        eachGhost(fn);
        fn(cakeman);
    }

    // Moves each character and cleares area
    // he was previously on.
    function moveCharacters () {
        eachCharacter(function (character) {
            character.move();
            board.drawSurrounding(character.x, character.y);
        });
    }

    // Draws each character.
    function drawCharacters () {
        eachCharacter(function (character) {
            character.draw();
        });
    }

    // Reeturns a living ahos if it is in the area
    function getGhostInArea (col, row) {
        var g;

        for(g = 0; g < ghosts.length; g++) {
            if (!ghosts[g].dead && col === ghosts[g].x && row === ghosts[g].y) {
                return ghosts[g];
            }
        }
        return null;
    }

    function isGhostInArea (col, row) {
        return getGhostInArea(col, row) !== null;
    }

    // Checks if where is a living ghost on any
    // segment of given path.
    //
    // Used to determin if main character
    // should change path.
    function isGhostOnPath (path) {
        var i;

        for (i = 0; i<path.length; i++) {
            if (isGhostInArea(path[i].x, path[i].y)) {
                return true;
            }
        }
        return false;
    }

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    // Points gathered by main character.
    this.points = 0;

    //#########################################################################
    // METHODS
    //#########################################################################

    this.addPoints = function (add) {
        this.points += add;
        this.drawPoints();
    };

    this.drawFooter = function () {
        gameConfig.ctx.fillStyle = '#000';
        gameConfig.ctx.fillRect(
            0,
            board.rows * gameConfig.areaSize,
            board.cols * gameConfig.areaSize,
            gameConfig.footerHeight);
    };

    this.drawPoints = function () {
        gameConfig.ctx.fillStyle = '#000';
        gameConfig.ctx.fillRect(
            0,
            board.rows * gameConfig.areaSize + 10,
            board.cols / 2 * gameConfig.areaSize,
            gameConfig.footerHeight);

        gameConfig.ctx.fillStyle = '#AAA';
        gameConfig.ctx.font="16px 'Lucida Console'";
        gameConfig.ctx.fillText("POINTS: " + this.points,
            10,
            board.rows * gameConfig.areaSize + 30
        );
    };

    this.tick = function () {
        var ghost;

        // Check if ghosts are panicked
        if (panickedTicksLeft) {
            panickedTicksLeft--;

            // If counter reaches 0, calm ghosts down.
            if (panickedTicksLeft === 0) {
                eachGhost(function (ghost) {
                    ghost.panicked = false;
                });
            }

        }

        // Calculate main character path
        if ((cakeman.path.length === 0 || isGhostOnPath(cakeman.path)) && board.countDots() > 0) {
            cakeman.path = pathfinder.calculateCakemanPath(board.map, cakeman, ghosts);
        }

        // Calculate ghost paths
        eachGhost(function (ghost) {
            if (ghost.path.length === 0) {
                // If ghost at destination revive it.
                // Ghost paths are only recalculated when they die
                // or when they reach destination.
                // When they die new path is calculated to the ghost shelter.
                // In either situation ghost should be alive at its destination.
                ghost.dead = false;
                ghost.path = pathfinder.calculateGhostPath(board.map, ghost);
            }
        });

        moveCharacters();

        ghost = getGhostInArea(cakeman.x, cakeman.y);
        if (ghost) {
            if (ghost.panicked) {
                ghost.dead = true;
                // Galculate ghost path to shelter.
                ghost.path = pathfinder.calculatePath(board.map, ghost, board.  ghostShelter);

                this.addPoints(200);

            } else {
                // Living ghost!
                this.stop();
            }
        }

        if (board.isSmallDot(cakeman.x, cakeman.y)) {
            board.clearArea(cakeman.x, cakeman.y);
            this.addPoints(10);
        }

        if (board.isBigDot(cakeman.x, cakeman.y)) {
            board.clearArea(cakeman.x, cakeman.y);
            this.addPoints(50);

            eachGhost(function (ghost) {
                ghost.panicked = true;
            });

            // Count down panicked ticks.
            panickedTicksLeft = gameConfig.panickedTicks;
        }

        drawCharacters();
    };

    this.start = function () {
        board.draw();
        this.drawFooter();
        this.drawPoints();

        eachCharacter(function (character) {
            character.init();
        });

        mainInterval = setInterval(this.tick.bind(this), gameConfig.tickTime);
    };

    this.stop = function () {
        clearInterval(mainInterval);
    };

}
