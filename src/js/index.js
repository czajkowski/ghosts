/* jshint ignore:start */

// Characters
// - max speed is 1

function Game () {
    var canvas = document.querySelector('canvas'),
        config = {
            tickTime : 10,
            panickedTicks : 1000,
            deadTicks : 100,
            areaSize : 20,
            footerHeight : 50,
            ctx : canvas.getContext('2d')
        },

        board = new Board(config),

        cakeman = new Cakeman(
            config,
            { x :14, y : 23 , speed: 1.5},
            board
        ),

        ghost1 = new Ghost(
            config,
            { id : 1, x :14, y : 11, color : '#F00', speed: 0.2 }
        ),
        ghost2 = new Ghost(
            config,
            { id : 2, x : 14, y : 13, color : '#F99', speed: 0.5 }
        ),
        ghost3 = new Ghost(
            config,
            { id : 3, x : 12, y : 13, color : '#6FF', speed: 0.5 }
        ),
        ghost4 = new Ghost(
            config,
            { id : 4, x : 16, y : 13, color : '#FA0', speed: 0.5 }
        ),

        pathfinder = new Pathfinder(),

        controller = new Controller(
            config,
            board,
            pathfinder,
            cakeman,
            [ghost1, ghost2, ghost3, ghost4]
        );

        canvas.width = config.areaSize * board.cols;
        canvas.height = config.areaSize * board.rows + config.footerHeight;

        controller.start();
}

new Game();
