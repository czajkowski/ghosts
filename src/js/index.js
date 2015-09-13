function Game () {
    'use strict';

    var canvas = document.querySelector('canvas'),
        config = {
            tickTime : 10,
            panickedTicks : 1000,
            deadTicks : 100,
            areaSize : 20,
            mapCols : 28,
            mapRows : 31,
            footerHeight : 50,
            ctx : canvas.getContext('2d')
        },
        pathfinder = new Pathfinder(),
        startEventHandler = (function (e) {
            var code = e.which || e.keyCode;

            if (code === 13) {
                document.removeEventListener('keypress', startEventHandler);
                this.start();
            }
        }).bind(this);

    canvas.width = config.areaSize * config.mapCols;
    canvas.height = config.areaSize * config.mapRows + config.footerHeight;

    function showWindow(text) {
        config.ctx.fillStyle = '#000';
        config.ctx.fillRect(
            config.areaSize * 4,
            config.mapRows * config.areaSize / 3,
            config.mapCols * config.areaSize - config.areaSize * 8,
            config.areaSize * 6
        );

        config.ctx.strokeStyle = '#FE0';
        config.ctx.lineWidth = 5;
        config.ctx.strokeRect(
            config.areaSize * 4,
            config.mapRows * config.areaSize / 3,
            config.mapCols * config.areaSize - config.areaSize * 8,
            config.areaSize * 6
        );

        config.ctx.fillStyle = '#AAA';
        config.ctx.font = '32px "Lucida Console"';
        config.ctx.textAlign = 'center';
        config.ctx.fillText(
            text,
            config.mapCols * config.areaSize / 2,
            config.mapRows * config.areaSize / 3 + 3 * config.areaSize
        );

        config.ctx.fillStyle = '#FFF';
        config.ctx.font = '16px "Lucida Console"';
        config.ctx.fillText(
            'PRESS ENTER KEY TO PLAY AGAIN',
            config.mapCols * config.areaSize / 2,
            config.mapRows * config.areaSize / 3 + 3 * config.areaSize + 30
        );
    }

    this.showStartScreen = function () {
        config.ctx.fillStyle = '#000';
        config.ctx.fillRect(
            0,
            0,
            config.mapCols * config.areaSize,
            config.mapRows * config.areaSize + config.footerHeight
        );

        config.ctx.fillStyle = '#AAA';
        config.ctx.font = '50px "Lucida Console"';
        config.ctx.textAlign = 'center';
        config.ctx.fillText('G H O S T S', config.mapCols * config.areaSize / 2, canvas.height / 3);



        config.ctx.fillStyle = '#555';
        config.ctx.font = '14px "Lucida Console"';
        config.ctx.fillText('Keys 1-4 : choose ghost', config.mapCols * config.areaSize / 2, canvas.height / 2 + 60);
        config.ctx.fillText('Arrows   : move ghost  ', config.mapCols * config.areaSize / 2, canvas.height / 2 + 80);

        config.ctx.fillStyle = '#FFF';
        config.ctx.font = '16px "Lucida Console"';
        config.ctx.fillText('PRESS ENTER KEY TO START', config.mapCols * config.areaSize / 2, canvas.height / 2  + 140);

        document.addEventListener('keypress', startEventHandler);
    };

    this.start = function () {
        var board = new Board(config),
            cakeman = new Cakeman(
                config,
                { x :14, y : 23 , speed: 1.2},
                board
            ),

            ghost1 = new Ghost(
                config,
                { x :14, y : 11, color : '#F00', speed:0.6 }
            ),
            ghost2 = new Ghost(
                config,
                { x : 14, y : 13, color : '#F99', speed: 0.6 }
            ),
            ghost3 = new Ghost(
                config,
                { x : 12, y : 13, color : '#6FF', speed: 0.6 }
            ),
            ghost4 = new Ghost(
                config,
                { x : 16, y : 13, color : '#FA0', speed: 0.6 }
            ),

            controller = new Controller(
                config,
                board,
                pathfinder,
                cakeman,
                [ghost1, ghost2, ghost3, ghost4]
            );

        controller.start(this.won.bind(this), this.lost.bind(this));
    };

    this.won = function () {
        showWindow('YOU WIN!');
        document.addEventListener('keypress', startEventHandler);
    };

    this.lost = function () {
        showWindow('YOU LOSE!');
        document.addEventListener('keypress', startEventHandler);
    };

    this.showStartScreen();
}

new Game();
