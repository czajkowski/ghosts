/* jshint ignore:start */
function Pacman (config, canvas, startX, startY, board) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = config.areaSize,
        canvasContext = canvas.getContext('2d');

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    this.color = '#FE0';
    this.x = startX;
    this.y = startY;

    // Directions
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left
    this.direction = 1;

    //#########################################################################
    // METHODS
    //#########################################################################

    this.draw = function () {
        var x = this.x * areaSize,
            y = this.y * areaSize + areaSize / 2,
            r = Math.PI / 2 * this.direction,
            s = 0.2 * Math.PI;

        canvasContext.fillStyle = this.color;
        canvasContext.beginPath();
        canvasContext.arc(x, y, areaSize / 2, -Math.PI / 2 + s + r, -Math.PI / 2 - s + r);
        canvasContext.lineTo(x, y);
        canvasContext.closePath();
        canvasContext.fill();
    }
}
