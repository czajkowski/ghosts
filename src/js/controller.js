/* jshint ignore:start */
function Controller (gameConfig, board, pathfinder, cakeman, ghosts) {

    //#########################################################################
    // VARIABLED
    //#########################################################################

    var mainInterval,
        panickedTicksLeft = 0,
        selectedGhost,
        eventHandler,
        successCallback,
        failureCallback;

    eventHandler = (function (e) {
        var code = e.which || e.keyCode,
            ghostId;

        // Ghost select
        if (code > 48 && code <= 48 + ghosts.length) {
            ghostId = code - 48 - 1;

            if (ghosts[ghostId] !== selectedGhost) {
                selectedGhost && (selectedGhost.selected = false);
                selectedGhost = ghosts[ghostId]
                selectedGhost.selected = true;
                selectedGhost.path = [];
            }
        }

        // Arrows
        if (selectedGhost && selectedGhost.path.length === 0) {
            switch (code) {
                case 37 :
                    // left
                    if (!board.isWall(selectedGhost.targetX - 1, selectedGhost.targetY)) {
                        selectedGhost.path.push({
                            y : selectedGhost.targetY,
                            x : selectedGhost.targetX - 1
                        });
                    } else if (selectedGhost.direction === Direction.UP &&
                                !board.isWall(selectedGhost.targetX - 1, selectedGhost.targetY - 1)) {
                        // Cutting corners
                        // Move up and then left
                        selectedGhost.path.push({
                            y : selectedGhost.targetY - 1,
                            x : selectedGhost.targetX
                        }, {
                            y : selectedGhost.targetY - 1,
                            x : selectedGhost.targetX - 1
                        });
                    } else if (selectedGhost.direction === Direction.DOWN &&
                                !board.isWall(selectedGhost.targetX - 1, selectedGhost.targetY + 1)) {
                        // Cutting corners
                        // Move down and then left
                        selectedGhost.path.push({
                            x : selectedGhost.targetX,
                            y : selectedGhost.targetY + 1
                        }, {
                            x : selectedGhost.targetX - 1,
                            y : selectedGhost.targetY + 1
                        });
                    }
                    break;
                case 38 :
                    // up
                    if (!board.isWall(selectedGhost.targetX, selectedGhost.targetY - 1)) {
                        selectedGhost.path.push({
                            x : selectedGhost.targetX,
                            y : selectedGhost.targetY - 1
                        });
                    } else if (selectedGhost.direction === Direction.RIGHT &&
                                !board.isWall(selectedGhost.targetX + 1, selectedGhost.targetY - 1)) {
                        // Cutting corners
                        // Move up and then right
                        selectedGhost.path.push({
                            x : selectedGhost.targetX + 1,
                            y : selectedGhost.targetY
                        }, {
                            x : selectedGhost.targetX + 1,
                            y : selectedGhost.targetY - 1
                        });
                    } else if (selectedGhost.direction === Direction.LEFT &&
                                !board.isWall(selectedGhost.targetX - 1, selectedGhost.targetY - 1)) {
                        // Cutting corners
                        // Move down and then right
                        selectedGhost.path.push({
                            x : selectedGhost.targetX - 1,
                            y : selectedGhost.targetY
                        }, {
                            x : selectedGhost.targetX - 1,
                            y : selectedGhost.targetY - 1
                        });
                    }
                    break;
                case 39 :
                    // right
                    if (!board.isWall(selectedGhost.targetX + 1, selectedGhost.targetY)) {
                        selectedGhost.path.push({
                            y : selectedGhost.targetY,
                            x : selectedGhost.targetX + 1
                        });
                    } else if (selectedGhost.direction === Direction.UP &&
                                !board.isWall(selectedGhost.targetX + 1, selectedGhost.targetY - 1)) {
                        // Cutting corners
                        // Move up and then right
                        selectedGhost.path.push({
                            x : selectedGhost.targetX,
                            y : selectedGhost.targetY - 1
                        }, {
                            x : selectedGhost.targetX + 1,
                            y : selectedGhost.targetY - 1
                        });
                    } else if (selectedGhost.direction === Direction.DOWN &&
                                !board.isWall(selectedGhost.targetX + 1, selectedGhost.targetY + 1)) {
                        // Cutting corners
                        // Move down and then right
                        selectedGhost.path.push({
                            x : selectedGhost.targetX,
                            y : selectedGhost.targetY + 1
                        }, {
                            x : selectedGhost.targetX + 1,
                            y : selectedGhost.targetY + 1
                        });
                    }
                    break;
                case 40 :
                    // down
                    if (!board.isWall(selectedGhost.targetX, selectedGhost.targetY + 1)) {
                        selectedGhost.path.push({
                            x : selectedGhost.targetX,
                            y : selectedGhost.targetY + 1
                        });
                    } else if (selectedGhost.direction === Direction.RIGHT &&
                                !board.isWall(selectedGhost.targetX + 1, selectedGhost.targetY + 1)) {
                        // Cutting corners
                        // Move up and then right
                        selectedGhost.path.push({
                            x : selectedGhost.targetX + 1,
                            y : selectedGhost.targetY
                        }, {
                            x : selectedGhost.targetX + 1,
                            y : selectedGhost.targetY + 1
                        });
                    } else if (selectedGhost.direction === Direction.LEFT &&
                                !board.isWall(selectedGhost.targetX - 1, selectedGhost.targetY + 1)) {
                        // Cutting corners
                        // Move down and then right
                        selectedGhost.path.push({
                            x : selectedGhost.targetX - 1,
                            y : selectedGhost.targetY
                        }, {
                            x : selectedGhost.targetX - 1,
                            y : selectedGhost.targetY + 1
                        });
                    }
            }
        }
    }).bind(this);

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
        board.drawPoints(this.points);
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

                if (!ghost.selected) {
                    ghost.path = pathfinder.calculateGhostPath(board.map, ghost);
                }
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
                // Living ghost encountered.
                this.stop();

                // Game won!
                successCallback();
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

        if (board.countDots() === 0) {
            // Game lost!
            failureCallback();
        }
    };

    this.start = function (onSuccess, onFailure) {
        successCallback = onSuccess;
        failureCallback = onFailure;

        board.drawMap();

        board.drawFooter(ghosts);
        board.drawPoints(this.points);

        // Use ghost drawing methods to draw ghosts on footer
        eachGhost(function (ghost, index) {
        });

        eachCharacter(function (character) {
            character.init();
        });

        mainInterval = setInterval(this.tick.bind(this), gameConfig.tickTime);

        document.addEventListener("keydown", eventHandler);
    };

    this.stop = function () {
        clearInterval(mainInterval);
        document.removeEventListener("keydown", eventHandler);
    };



}
