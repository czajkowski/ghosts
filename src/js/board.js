/* jshint ignore:start */
function Board (config, canvas) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = config.areaSize,
        canvasContext = canvas.getContext('2d');

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

    // col, row - coordinates,
    this.drawArea = function (col, row) {
        var top, right, bottom, left;

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
    }

    //#########################################################################
    // METHODS
    //#########################################################################

    this.draw = function() {
        var col, row;

        canvasContext.fillStyle = '#000';
        canvasContext.fillRect(0, 0, this.cols * areaSize, this.rows * areaSize);

        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                this.drawArea(col, row);
            }
        }
    }


}
