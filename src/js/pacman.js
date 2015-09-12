/* jshint ignore:start */
function Pacman (gameConfig, characterConfig) {

    //#########################################################################
    // VARIABLES
    //#########################################################################

    var areaSize = gameConfig.areaSize,
        canvasContext = gameConfig.canvasContext,

        // current diretion calculated based on current and target position
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

        // mouth opening
        omnomnom = 0;

    //#########################################################################
    // PROPERTIES
    //#########################################################################

    this.color = '#FE0';
    this.speed = characterConfig.speed;

    this.x = this.targetX = characterConfig.x;
    this.y = this.targetY = characterConfig.y;

    // array ob {x, y} objects
    this.path = [];

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    //#########################################################################
    // METHODS
    //#########################################################################

    this.init = function () {
        // Directions
        // 0 - top
        // 1 - right
        // 2 - down
        // 3 - left

        // init direction is right
        _direction = 1

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
        var newTarget;

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
            this.x = this.targetX;
            this.y = this.targetY;

            newTarget = this.path.shift();

            // no way to go?
            if (newTarget === undefined) return;

            this.targetX = newTarget.x;
            this.targetY = newTarget.y;

            // Directions
            // 0 - top
            // 1 - right
            // 2 - down
            // 3 - left

            if (this.targetX > this.x) {
                // right
                _direction = 1;
                _speedX = this.speed;
                _speedY = 0;
            }

            if (this.targetX < this.x) {
                // left
                _direction = 3;
                _speedX = -this.speed;
                _speedY = 0;
            }

            if (this.targetY > this.y) {
                // down
                _direction = 2;
                _speedY = this.speed;
                _speedX = 0;
            }

            if (this.targetY < this.y) {
                // up
                _direction = 0;
                _speedY = -this.speed;
                _speedX = 0;
            }

            _targetX = this.targetX * areaSize + areaSize / 2;
            _targetY = this.targetY * areaSize + areaSize / 2;
        }
    };

    this.calculatePath = function (map, ghosts) {

    };
}
