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
            canvasContext : canvas.getContext('2d')
        },

        board = new Board(config),

        pacman = new Pacman(
            config,
            { x :14, y : 23 , speed: 0.7},
            board
        ),

        blinky = new Ghost(
            config,
            { x :14, y : 11, color : '#F00', selected : 1 }
        ),
        pinky = new Ghost(
            config,
            { x : 14, y : 13, color : '#F99' }
        ),
        inky = new Ghost(
            config,
            { x : 12, y : 13, color : '#6FF' }
        ),
        clyde = new Ghost(
            config,
            { x : 16, y : 13, color : '#FA0' }
        ),

        pathfinder = new Pathfinder(),

        controller = new Controller(
            config,
            board,
            pacman,
            [blinky, pinky, inky, clyde]
        );

        canvas.width = config.areaSize * board.cols;
        canvas.height = config.areaSize * board.rows;

        var pacmanPath = pathfinder.calculatePacmanPath(board.map, pacman, [blinky, pinky, inky, clyde]);
        pacman.path = pacmanPath;


        controller.start();
}

new Game();
