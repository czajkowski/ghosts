/* jshint ignore:start */
function Board (gameConfig) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = gameConfig.areaSize,
        canvasContext = gameConfig.canvasContext;

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    // 0 - empty road
    // 1 - portal
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
        [1,0,0,0,0,0,3,0,0,0,9,0,0,0,0,0,0,9,0,0,0,3,0,0,0,0,0,1],
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

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    // col, row - coordinates,
    // t, r, b, l - surrounding: top, right, bottom, left - if any truthy, connect to it
    // door - is door
    function drawSolid (col, row, top, right, bottom, left, door) {

        canvasContext.fillStyle = '#111';
        canvasContext.fillRect(col * areaSize, row * areaSize, areaSize, areaSize);

        canvasContext.fillStyle = door ? '#333' : '#00F';
        top && canvasContext.fillRect(
            col * areaSize + (areaSize / 16) * 7,
            row * areaSize,
            areaSize / 8,
            areaSize / 2
        );

        right && canvasContext.fillRect(
            col * areaSize + areaSize / 2,
            row * areaSize + (areaSize / 16) * 7,
            areaSize / 2,
            areaSize / 8
        );

        bottom && canvasContext.fillRect(
            col * areaSize + (areaSize / 16) * 7,
            row * areaSize + areaSize / 2,
            areaSize / 8,
            areaSize / 2
        );

        left && canvasContext.fillRect(
            col * areaSize,
            row * areaSize + (areaSize / 16) * 7,
            areaSize / 2,
            areaSize / 8
        );
    }

    // col, row - coordinates,
    // big - is big dot
    function drawDot (col, row, big) {
        canvasContext.fillStyle = '#FFF';
        canvasContext.beginPath();
        canvasContext.arc(col * areaSize + areaSize / 2, row * areaSize + areaSize / 2, areaSize / (big ? 4 : 10), 0 ,2*Math.PI);
        canvasContext.closePath();
        canvasContext.fill();
    }


    //#########################################################################
    // METHODS
    //#########################################################################

    this.forEachArea = function (fn) {
        var col, row;

        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                fn(col, row);
            }
        }
    }


    // col, row - coordinates,
    this.drawArea = function (col, row) {
        var top, right, bottom, left;

        // clear area
        canvasContext.fillStyle = '#000';
        canvasContext.fillRect(col * areaSize, row * areaSize, areaSize, areaSize);

        // check if coresponding elements are solid
        top = row == 0 ? 0 : this.map[row - 1][col] > 7;
        right = col == this.cols - 1 ? 0 : this.map[row][col + 1] > 7;
        bottom = row == this.rows - 1 ? 0 : this.map[row + 1][col] > 7;
        left = col == 0 ? 0 : this.map[row][col - 1] > 7;

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
                drawDot(col, row, 1);
                break;
        }
    };

    // draw area and all its neighbours
    this.drawSurrounding = function (col, row) {
        var tmpC = [col], tmpR = [row], c, r;

        col > 0 && tmpC.push(col - 1);
        col < this.cols - 1 && tmpC.push(col + 1);

        row > 0 && tmpR.push(row - 1);
        row < this.rows - 1 && tmpR.push(row + 1);

        for (c = 0; c < tmpC.length; c++) {
            for (r = 0; r < tmpR.length; r++) {
                this.drawArea(tmpC[c], tmpR[r]);
            }
        }
    };

    this.draw = function () {
        var self = this;
        this.forEachArea(function (col, row) {
            self.drawArea(col, row);
        });
    };

    this.countDots = function () {
        var self = this, count = 0;

        this.forEachArea(function (col, row) {
            if (self.map[row][col] === 3 || self.map[row][col] === 4) count++;
        });

        return count;
    };


}
