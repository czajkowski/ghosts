/* jshint ignore:start */
function Board (canvas) {
    var areaSize = 24,
        canvasContext = canvas.getContext('2d'),

        // Directions
        // 0 - top
        // 1 - right
        // 2 - down
        // 3 - left
        pacman = {
            color : '#FE0',
            x : 14,
            y : 23,
            direction: 3
        }
        // red ghost
        blinky = {
            color : '#F00',
            x : 14,
            y : 11,
            direction: 0
        },
        // pink ghost
        pinky = {
            color : '#F99',
            x : 14,
            y : 13,
            direction: 1
        },
        // blue ghost
        inky = {
            color : '#6FF',
            x : 12,
            y : 13,
            direction: 2
        },
        // yellow ghost
        clyde = {
            color : '#4AC',
            x : 16,
            y : 13,
            direction: 3
        },

        // 0 - empty road
        // 1 - portal
        // 3 - dot
        // 4 - big dot
        // 8 - door
        // 9 - wall
        map = [
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
        ],
        mapCols = map[0].length,
        mapRows = map.length;

    canvas.width = areaSize * mapCols;
    canvas.height = areaSize * mapRows;

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
    function drawArea (col, row) {
        var top, right, bottom, left;

        // check if coresponding elements are solid
        top = row == 0 ? 0 : map[row - 1][col] > 7;
        right = col == mapCols - 1 ? 0 : map[row][col + 1] > 7;
        bottom = row == mapRows - 1 ? 0 : map[row + 1][col] > 7;
        left = col == 0 ? 0 : map[row][col - 1] > 7;

        switch (map[row][col]) {
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

    function drawGhost (character) {
        var x = character.x * areaSize,
            y = character.y * areaSize + areaSize / 2,
            // 0 - top
            // 1 - right
            // 2 - down
            // 3 - left
            horizontalPositioner = [0, 1, 0, -1],
            verticalPositioner = [-1, 0, 1, 0];

        // character
        canvasContext.fillStyle = character.color;
        canvasContext.beginPath();
        canvasContext.lineTo(x + areaSize / 2, y + areaSize / 2);
        canvasContext.lineTo(x + (areaSize / 6) * 2, y + (areaSize / 6) * 2);
        canvasContext.lineTo(x + (areaSize / 6), y + areaSize / 2);
        canvasContext.lineTo(x, y + (areaSize / 6) * 2);
        canvasContext.lineTo(x - (areaSize / 6), y + areaSize / 2);
        canvasContext.lineTo(x - (areaSize / 6) * 2, y + (areaSize / 6) * 2);
        canvasContext.lineTo(x - areaSize / 2, y + areaSize / 2);
        canvasContext.lineTo(x - areaSize / 2, y);
        canvasContext.arc(x, y, areaSize / 2, -Math.PI, 0);
        canvasContext.closePath();
        canvasContext.fill();

        // Eyes
        canvasContext.fillStyle = '#FFF';
        canvasContext.beginPath();
        canvasContext.arc(x - areaSize / 4.5, y - areaSize / 8, areaSize / 6, 0 ,2*Math.PI);
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.arc(x + areaSize / 4.5, y - areaSize / 8, areaSize / 6, 0 ,2*Math.PI);
        canvasContext.closePath();
        canvasContext.fill();

        // Pupils
        canvasContext.fillStyle = '#00F';
        canvasContext.beginPath();
        canvasContext.arc(
            x - areaSize / 4.5 + (horizontalPositioner[character.direction] * areaSize / 13.5),
            y - areaSize / 8 + (verticalPositioner[character.direction] * areaSize / 13.5),
            areaSize / 10,
            0,
            2 * Math.PI
        );
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.arc(
            x + areaSize / 4.5 + (horizontalPositioner[character.direction] * areaSize / 13.5),
            y - areaSize / 8 + (verticalPositioner[character.direction] * areaSize / 13.5),
            areaSize / 10,
            0,
            2 * Math.PI
        );
        canvasContext.closePath();
        canvasContext.fill();
    }

    function drawPacman (character) {
        var x = character.x * areaSize,
            y = character.y * areaSize + areaSize / 2,
            r = Math.PI / 2 * character.direction,
            s = 0.2 * Math.PI;



        canvasContext.fillStyle = character.color;
        canvasContext.beginPath();
        canvasContext.arc(x, y, areaSize / 2, -Math.PI / 2 + s + r, -Math.PI / 2 - s + r);
        canvasContext.lineTo(x, y);
        canvasContext.closePath();
        canvasContext.fill();
    }

    function drawMap() {
        var col, row;

        canvasContext.fillStyle = '#000';
        canvasContext.fillRect(0, 0, mapCols * areaSize, mapRows * areaSize);

        for (col = 0; col < mapCols; col++) {
            for (row = 0; row < mapRows; row++) {
                drawArea(col, row);
            }
        }
    }

    //#########################################################################
    // INIT
    //#########################################################################

    drawMap();
    drawGhost(blinky);
    drawGhost(inky);
    drawGhost(pinky);
    drawGhost(inky);
    drawGhost(clyde);
    drawPacman(pacman);
}
