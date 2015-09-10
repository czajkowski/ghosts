/* jshint ignore:start */
function Ghost (gameConfig, characterConfig) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = gameConfig.areaSize,
        canvasContext = gameConfig.canvasContext;

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    this.color = characterConfig.color;
    this.x = characterConfig.x;
    this.y = characterConfig.y;

    // Directions
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left
    this.direction = 1;
    this.panicked = 0;
    this.dead = 0;

    //#########################################################################
    // METHODS
    //#########################################################################

    this.draw = function () {
        var x = this.x * areaSize,
            y = this.y * areaSize + areaSize / 2,
            // 0 - top
            // 1 - right
            // 2 - down
            // 3 - left
            horizontalPositioner = [0, 1, 0, -1],
            verticalPositioner = [-1, 0, 1, 0];

        // character
        canvasContext.fillStyle = this.color;
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
            x - areaSize / 4.5 + (horizontalPositioner[this.direction] * areaSize / 13.5),
            y - areaSize / 8 + (verticalPositioner[this.direction] * areaSize / 13.5),
            areaSize / 10,
            0,
            2 * Math.PI
        );
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.arc(
            x + areaSize / 4.5 + (horizontalPositioner[this.direction] * areaSize / 13.5),
            y - areaSize / 8 + (verticalPositioner[this.direction] * areaSize / 13.5),
            areaSize / 10,
            0,
            2 * Math.PI
        );
        canvasContext.closePath();
        canvasContext.fill();
    }

}
