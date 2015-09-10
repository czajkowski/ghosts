/* jshint ignore:start */
function Game () {
    var config = {
            areaSize : 24
        },
        canvas = document.querySelector('canvas'),
        board = new Board(config, canvas),
        pacman = new Pacman(config, canvas, 14, 23, board),
        blinky = new Ghost(config, canvas, 14, 11, '#F00', board),
        pinky = new Ghost(config, canvas, 14, 13, '#F99', board),
        inky = new Ghost(config, canvas, 12, 13, '#6FF', board),
        clyde = new Ghost(config, canvas, 16, 13, '#FA0', board);

        canvas.width = config.areaSize * board.cols;
        canvas.height = config.areaSize * board.rows;

        board.draw();
        pacman.draw();
        blinky.draw();
        pinky.draw();
        inky.draw();
        clyde.draw();
}

new Game();
