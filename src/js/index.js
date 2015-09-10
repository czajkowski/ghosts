/* jshint ignore:start */
function Game () {
    var canvas = document.querySelector('canvas'),
        config = {
            areaSize : 16,
            canvasContext : canvas.getContext('2d')
        },

        board = new Board(config),

        pacman = new Pacman(
            config,
            { x :14, y : 23 },
            board
        ),

        blinky = new Ghost(
            config,
            { x :14, y : 11, color : '#F00' }
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

        controller = new Controller(
            config,
            board,
            pacman,
            [blinky, pinky, inky, clyde]
        );

        canvas.width = config.areaSize * board.cols;
        canvas.height = config.areaSize * board.rows;

        board.draw();
        pacman.draw();
        blinky.draw();
        pinky.draw();
        inky.draw();
        clyde.draw();

        controller.tick();
        controller.tick();
        controller.tick();
        controller.tick();
        controller.tick();
}

new Game();
