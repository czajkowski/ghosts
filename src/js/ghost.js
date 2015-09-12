/* jshint ignore:start */
function Ghost (gameConfig, characterConfig) {

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
        _speedY;


    //#########################################################################
    // PROPERTIES
    //#########################################################################

    this.color = characterConfig.color;
    this.speed = characterConfig.speed || 0;

    this.x = this.targetX = characterConfig.x;
    this.y = this.targetY = characterConfig.y;

    this.selected = characterConfig.selected;

    this.panicked = 0;
    this.dead = 0;

    // array ob {x, y} objects
    this.path = [];

    //#########################################################################
    // METHODS
    //#########################################################################

    this.init = function () {
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

        this.draw()
    };

    this.draw = function () {
        var x = _x,
            y = _y,
            // 0 - top
            // 1 - right
            // 2 - down
            // 3 - left
            horizontalPositioner = [0, 1, 0, -1],
            verticalPositioner = [-1, 0, 1, 0];

        if (this.selected && !this.panicked && !this.dead) {
            canvasContext.fillStyle = '#AAA';
            canvasContext.beginPath();
            canvasContext.lineTo(x + areaSize / 1.6, y + areaSize / 1.6);
            canvasContext.lineTo(x - areaSize / 1.6, y + areaSize / 1.6);
            canvasContext.arc(x, y, areaSize / 1.6, -Math.PI, 0);
            canvasContext.closePath();
            canvasContext.fill();
        }

        // character
        canvasContext.fillStyle = this.panicked ? '#00F' : this.color;
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
            x - areaSize / 4.5 + (horizontalPositioner[_direction] * areaSize / 13.5),
            y - areaSize / 8 + (verticalPositioner[_direction] * areaSize / 13.5),
            areaSize / 10,
            0,
            2 * Math.PI
        );
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.arc(
            x + areaSize / 4.5 + (horizontalPositioner[_direction] * areaSize / 13.5),
            y - areaSize / 8 + (verticalPositioner[_direction] * areaSize / 13.5),
            areaSize / 10,
            0,
            2 * Math.PI
        );
        canvasContext.closePath();
        canvasContext.fill();
    };

    this.move = function () {
        var newTarget;

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

    this.panic = function () {
        this.panicked = true;
    };

    this.calm = function () {
        this.panicked = false;
    };

    this.die = function () {
        this.dead = true;
    };

    this.revive = function () {
        this.dead = false;
    };

}
