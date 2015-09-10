/* jshint ignore:start */
function Pacman (gameConfig, characterConfig) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = gameConfig.areaSize,
        canvasContext = gameConfig.canvasContext;

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    this.color = '#FE0';
    this.x = characterConfig.x;
    this.y = characterConfig.y;

    // Directions
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left
    this.direction = 1,

    this.route = [1, 0, 0, 0, 1];

    //#########################################################################
    // METHODS
    //#########################################################################

    this.draw = function () {
        var x = this.x * areaSize + areaSize / 2,
            y = this.y * areaSize + areaSize / 2,
            r = Math.PI / 2 * this.direction,
            s = 0.2 * Math.PI;

        canvasContext.fillStyle = this.color;
        canvasContext.beginPath();
        canvasContext.arc(x, y, areaSize / 2, -Math.PI / 2 + s + r, -Math.PI / 2 - s + r);
        canvasContext.lineTo(x, y);
        canvasContext.closePath();
        canvasContext.fill();
    };

    this.move = function () {
        this.direction = this.route.shift();

        switch (this.direction) {
            case 0 :
                this.y--;
                break;
            case 1 :
                this.x++;
                break;
            case 2 :
                this.y++;
                break;
            case 3 :
                this.x++;
        }
    }
}
