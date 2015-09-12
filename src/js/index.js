/* jshint ignore:start */

// Characters
// - max speed is 1

function Game () {
    var canvas = document.querySelector('canvas'),
        config = {
            tickTime : 10,
            panickedTicks : 100,
            deadTicks : 100,
            areaSize : 20,
            ctx : canvas.getContext('2d')
        },

        board = new Board(config),

        cakeman = new Cakeman(
            config,
            { x :14, y : 23 , speed: 1},
            board
        ),

        blinky = new Ghost(
            config,
            { x :14, y : 11, color : '#F00', selected : 1, speed: 0.5 }
        ),
        pinky = new Ghost(
            config,
            { x : 14, y : 13, color : '#F99', speed: 0.5 }
        ),
        inky = new Ghost(
            config,
            { x : 12, y : 13, color : '#6FF', speed: 0.5 }
        ),
        clyde = new Ghost(
            config,
            { x : 16, y : 13, color : '#FA0', speed: 0.5 }
        ),

        pathfinder = new Pathfinder(),

        controller = new Controller(
            config,
            board,
            pathfinder,
            cakeman,
            [blinky, pinky, inky, clyde]
        );

        canvas.width = config.areaSize * board.cols;
        canvas.height = config.areaSize * board.rows;

        controller.start();
}

new Game();
