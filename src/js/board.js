/* jshint ignore:start */
function Board (gameConfig) {


    //#########################################################################
    // PROPERTIES
    //#########################################################################

    // Map elements
    // 0 - empty road
    // 3 - dot
    // 4 - big dot
    // 8 - door
    // 9 - wall
    this.map = [
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,3,3,3,3,3,3,3,3,3,3,3,3,9,9,3,3,3,3,3,3,3,3,3,3,3,3,9],
        [9,3,9,9,9,9,3,9,9,9,9,9,3,9,9,3,9,9,9,9,9,3,9,9,9,9,3,9],
        [9,4,9,9,9,9,3,9,9,9,9,9,3,9,9,3,9,9,9,9,9,3,9,9,9,9,4,9],
        [9,3,9,9,9,9,3,9,9,9,9,9,3,9,9,3,9,9,9,9,9,3,9,9,9,9,3,9],
        [9,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,9],
        [9,3,9,9,9,9,3,9,9,3,9,9,9,9,9,9,9,9,3,9,9,3,9,9,9,9,3,9],
        [9,3,9,9,9,9,3,9,9,3,9,9,9,9,9,9,9,9,3,9,9,3,9,9,9,9,3,9],
        [9,3,3,3,3,3,3,9,9,3,3,3,3,9,9,3,3,3,3,9,9,3,3,3,3,3,3,9],
        [9,9,9,9,9,9,3,9,9,9,9,9,0,9,9,0,9,9,9,9,9,3,9,9,9,9,9,9],
        [9,9,9,9,9,9,3,9,9,9,9,9,0,9,9,0,9,9,9,9,9,3,9,9,9,9,9,9],
        [9,0,0,0,9,9,3,9,9,0,0,0,0,0,0,0,0,0,0,9,9,3,9,9,0,0,0,9],
        [9,9,9,9,9,9,3,9,9,0,9,9,9,8,8,9,9,9,0,9,9,3,9,9,9,9,9,9],
        [9,9,9,9,9,9,3,9,9,0,9,0,0,0,0,0,0,9,0,9,9,3,9,9,9,9,9,9],
        [9,0,0,0,0,0,3,0,0,0,9,0,0,0,0,0,0,9,0,0,0,3,0,0,0,0,0,9],
        [9,9,9,9,9,9,3,9,9,0,9,0,0,0,0,0,0,9,0,9,9,3,9,9,9,9,9,9],
        [9,9,9,9,9,9,3,9,9,0,9,9,9,9,9,9,9,9,0,9,9,3,9,9,9,9,9,9],
        [9,0,0,0,9,9,3,9,9,0,0,0,0,0,0,0,0,0,0,9,9,3,9,9,0,0,0,9],
        [9,9,9,9,9,9,3,9,9,0,9,9,9,9,9,9,9,9,0,9,9,3,9,9,9,9,9,9],
        [9,9,9,9,9,9,3,9,9,0,9,9,9,9,9,9,9,9,0,9,9,3,9,9,9,9,9,9],
        [9,3,3,3,3,3,3,3,3,3,3,3,3,9,9,3,3,3,3,3,3,3,3,3,3,3,3,9],
        [9,3,9,9,9,9,3,9,9,9,9,9,3,9,9,3,9,9,9,9,9,3,9,9,9,9,3,9],
        [9,3,9,9,9,9,3,9,9,9,9,9,3,9,9,3,9,9,9,9,9,3,9,9,9,9,3,9],
        [9,4,3,3,9,9,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,9,9,3,3,4,9],
        [9,9,9,3,9,9,3,9,9,3,9,9,9,9,9,9,9,9,3,9,9,3,9,9,3,9,9,9],
        [9,9,9,3,9,9,3,9,9,3,9,9,9,9,9,9,9,9,3,9,9,3,9,9,3,9,9,9],
        [9,3,3,3,3,3,3,9,9,3,3,3,3,9,9,3,3,3,3,9,9,3,3,3,3,3,3,9],
        [9,3,9,9,9,9,9,9,9,9,9,9,3,9,9,3,9,9,9,9,9,9,9,9,9,9,3,9],
        [9,3,9,9,9,9,9,9,9,9,9,9,3,9,9,3,9,9,9,9,9,9,9,9,9,9,3,9],
        [9,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
    ];

    this.cols = this.map[0].length;
    this.rows = this.map.length;

    this.ghostShelter = {
        x : 14,
        y : 14
    };

    //#########################################################################
    // HELPER FUNCTIONS
    //#########################################################################

    // Draw solid map element.
    //
    // Parameters:
    // col, row - coordinates,
    // top, right, bottom, left - surrounding elements - if any truthy, connect to it
    // door - draw as door
    function drawSolid (col, row, top, right, bottom, left, door) {

        gameConfig.ctx.fillStyle = '#111';
        gameConfig.ctx.fillRect(col * gameConfig.areaSize, row * gameConfig.areaSize, gameConfig.areaSize, gameConfig.areaSize);

        gameConfig.ctx.fillStyle = door ? '#333' : '#00F';
        if (top) {
            gameConfig.ctx.fillRect(
                col * gameConfig.areaSize + (gameConfig.areaSize / 16) * 7,
                row * gameConfig.areaSize,
                gameConfig.areaSize / 8,
                gameConfig.areaSize / 2
            );
        }

        if (right) {
            gameConfig.ctx.fillRect(
                col * gameConfig.areaSize + gameConfig.areaSize / 2,
                row * gameConfig.areaSize + (gameConfig.areaSize / 16) * 7,
                gameConfig.areaSize / 2,
                gameConfig.areaSize / 8
            );
        }

        if (bottom) {
            gameConfig.ctx.fillRect(
                col * gameConfig.areaSize + (gameConfig.areaSize / 16) * 7,
                row * gameConfig.areaSize + gameConfig.areaSize / 2,
                gameConfig.areaSize / 8,
                gameConfig.areaSize / 2
            );
        }

        if (left) {
            gameConfig.ctx.fillRect(
                col * gameConfig.areaSize,
                row * gameConfig.areaSize + (gameConfig.areaSize / 16) * 7,
                gameConfig.areaSize / 2,
                gameConfig.areaSize / 8
            );
        }
    }

    // Parameters
    // col, row - coordinates,
    // big - draw big dot
    function drawDot (col, row, big) {
        gameConfig.ctx.fillStyle = '#FFF';
        gameConfig.ctx.beginPath();
        gameConfig.ctx.arc(
            col * gameConfig.areaSize + gameConfig.areaSize / 2,
            row * gameConfig.areaSize + gameConfig.areaSize / 2,
            gameConfig.areaSize / (big ? 4 : 10),
            0,
            2 * Math.PI
        );
        gameConfig.ctx.closePath();
        gameConfig.ctx.fill();
    }


    //#########################################################################
    // METHODS
    //#########################################################################

    // Execute function for each map area.
    this.eachArea = function (fn) {
        var col, row;

        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                fn(col, row);
            }
        }
    }

    // Draw map area
    this.drawArea = function (col, row) {
        var top, right, bottom, left;

        // Clear area.
        gameConfig.ctx.fillStyle = '#000';
        gameConfig.ctx.fillRect(col * gameConfig.areaSize, row * gameConfig.areaSize, gameConfig.areaSize, gameConfig.areaSize);

        // Check if coresponding elements are solid
        top = row == 0 ? 0 : this.map[row - 1][col] > Map.BIG_DOT;
        right = col == this.cols - 1 ? 0 : this.map[row][col + 1] > Map.BIG_DOT;
        bottom = row == this.rows - 1 ? 0 : this.map[row + 1][col] > Map.BIG_DOT;
        left = col == 0 ? 0 : this.map[row][col - 1] > Map.BIG_DOT;

        switch (this.map[row][col]) {
            case 9 :
                // wall
                drawSolid(col, row, top, right, bottom, left);
                break;
            case 8 :
                // door
                drawSolid(col, row, top, right, bottom, left, true);
                break;
            case 3 :
                // dot
                drawDot(col, row);
                break;
            case 4 :
                // big dot
                drawDot(col, row, true);
                break;
        }
    };

    this.isWall = function (col, row) {
        return this.map[row][col] === Map.WALL;
    };


    this.isSmallDot = function (col, row) {
        return this.map[row][col] === Map.DOT;
    };

    this.isBigDot = function (col, row) {
        return this.map[row][col] === Map.BIG_DOT;
    };

    this.isDot = function (col, row) {
        return this.isSmallDot(col, row) || this.isBigDot(col, row);
    };

    this.clearArea = function (col, row) {
        this.map[row][col] = Map.EMPTY;
    };

    // Draw area and all its neighbours.
    this.drawSurrounding = function (col, row) {
        var tmpC = [col],
            tmpR = [row],
            c,
            r;

        // Calculate surrounding colls and rows.
        col > 0             && tmpC.push(col - 1);
        col < this.cols - 1 && tmpC.push(col + 1);

        row > 0             && tmpR.push(row - 1);
        row < this.rows - 1 && tmpR.push(row + 1);

        for (c = 0; c < tmpC.length; c++) {
            for (r = 0; r < tmpR.length; r++) {
                this.drawArea(tmpC[c], tmpR[r]);
            }
        }
    };

    // Draw whole map
    this.drawMap = function () {
        this.eachArea(this.drawArea.bind(this));
    };

    this.countDots = function () {
        var self = this,
            count = 0;

        this.eachArea(function (col, row) {
            if (self.isDot(col, row)) count++;
        });

        return count;
    };

    this.drawFooter = function (ghosts) {
        var i, x, y;

        gameConfig.ctx.fillStyle = '#000';
        gameConfig.ctx.fillRect(
            0,
            this.rows * gameConfig.areaSize,
            this.cols * gameConfig.areaSize,
            gameConfig.footerHeight
        );

        for (i = 0; i<ghosts.length; i++) {
            x = this.cols / 2 * gameConfig.areaSize + gameConfig.areaSize * 3 * i;
            y = this.rows * gameConfig.areaSize + 30;

            gameConfig.ctx.textAlign = "left";
            gameConfig.ctx.fillStyle = '#AAA';
            gameConfig.ctx.font="16px 'Lucida Console'";
            gameConfig.ctx.fillText(i + 1, x, y);

            ghosts[i].draw.call({
                _x : x + gameConfig.areaSize * 1.3,
                _y : y - 7,
                color : ghosts[i].color,
                direction: Direction.LEFT
            })
        }
    };

    this.drawPoints = function (points) {
        gameConfig.ctx.textAlign = "left";
        gameConfig.ctx.fillStyle = '#000';
        gameConfig.ctx.fillRect(
            0,
            this.rows * gameConfig.areaSize + 10,
            this.cols / 2 * gameConfig.areaSize,
            gameConfig.footerHeight);

        gameConfig.ctx.fillStyle = '#AAA';
        gameConfig.ctx.font="16px 'Lucida Console'";
        gameConfig.ctx.fillText("POINTS: " + points,
            10,
            this.rows * gameConfig.areaSize + 30
        );
    };

}
