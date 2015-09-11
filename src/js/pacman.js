/* jshint ignore:start */
function Pacman (gameConfig, characterConfig) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = gameConfig.areaSize,
        canvasContext = gameConfig.canvasContext,

        // helper saves last direction for drawing
        // drawing pacman arc is determined by direction
        // if there is no more path and direction would be undefined
        // there would be an error drawing character
        _direction,

        // current coordinates
        _x,
        _y,

        // target coordinates
        _targetX,
        _targetY,

        // current direction speed
        _speedX,
        _speedY,

        // target area
        targetX,
        targetY,

        // mouth opening
        omnomnom = 0;

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    this.color = '#FE0';
    this.speed = characterConfig.speed;

    this.x = targetX = characterConfig.x;
    this.y = targetY = characterConfig.y;

    // Directions
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left
    this.direction = 1,

    this.path = [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,2,2,2];

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    //#########################################################################
    // METHODS
    //#########################################################################

    this.init = function () {
        // init direction is right
        _direction = this.direction;

        _speedX = this.speed;
        _speedY = 0;

        // start at a left edge of area
        _x = this.x * areaSize;
        _y = this.y * areaSize + areaSize / 2;

        // general target is the middle of area
        _targetX = _x + areaSize / 2;
        _targetY = _y;

        this.draw();
    };

    this.draw = function () {
        var x = _x,
            y = _y,
            r = Math.PI / 2 * _direction,
            s = (omnomnom % 1) * 0.25 * Math.PI;

        canvasContext.fillStyle = this.color;
        canvasContext.beginPath();
        canvasContext.arc(x, y, areaSize / 2, -Math.PI / 2 + s + r, -Math.PI / 2 - s + r);
        canvasContext.lineTo(x, y);
        canvasContext.closePath();
        canvasContext.fill();
    };

    this.move = function () {

        omnomnom += 0.02;

        if (_x != _targetX || _y != _targetY) {

            if (_targetX < _x) {
                _x = Math.max(_targetX, _x + _speedX);
            } else {
                _x = Math.min(_targetX, _x + _speedX);
            }

            if (_targetY < _y) {
                _y = Math.max(_targetY, _y + _speedY);
            } else {
                _y = Math.min(_targetY, _y + _speedY);
            }


        } else {
            this.x = targetX;
            this.y = targetY;

            this.direction = this.path.shift();

            // no way to go?
            if (this.direction === undefined) return;

            _direction = this.direction;

            switch (this.direction) {
                case 0 :
                    targetY--;
                    _speedY = -this.speed;
                    _speedX = 0;
                    break;
                case 1 :
                    targetX++;
                    _speedX = this.speed;
                    _speedY = 0;
                    break;
                case 2 :
                    targetY++;
                    _speedY = this.speed;
                    _speedX = 0;
                    break;
                case 3 :
                    targetX--;
                    _speedX = -this.speed;
                    _speedY = 0;
            }

            _targetX = targetX * areaSize + areaSize / 2;
            _targetY = targetY * areaSize + areaSize / 2;
        }
    };

    this.calculatePath = function (map, ghosts) {

    };
}
