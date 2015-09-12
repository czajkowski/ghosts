/* jshint ignore:start */
function Character (gameConfig, characterConfig) {

    // Current character diretion calculated based on current and target position.
    // Used to position characer when drawing.
    // Directions:
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left
    this.direction = Direction.RIGHT;

    // X/Y variables starting with _
    // hold real character position (in pixels) on board.
    // One without _ represent area coordinates.

    // Current character position.
    this._x;
    this._y;

    // Target character position.
    this._targetX;
    this._targetY;

    this.moveCounter = 0;

    this.color = '#FE0';
    this.speed = characterConfig.speed;

    // Current character map coordinates.
    this.x = characterConfig.x;
    this.y = characterConfig.y;

    // Target charatcter map coordinates.
    // The next area the character is heading.
    this.targetX = this.x;
    this.targetY = this.y;

    // Array of {x, y} objects representing map areas
    // which the character should visit.
    this.path = [];

    //#########################################################################
    // METHODS
    //#########################################################################

    this.init = function () {
        this.speedX = this.getXSpeed();
        this.speedY = 0;

        // Start at middle of left edge of area.
        this._x = this.x * gameConfig.areaSize;
        this._y = this.y * gameConfig.areaSize + gameConfig.areaSize / 2;

        // Set target in the middle of area.
        this._targetX = this._x + gameConfig.areaSize / 2;
        this._targetY = this._y;

        this.draw();
    };

    this.draw = function () {}

    this.move = function () {
        var newTarget;

        this.moveCounter++;

        if (this._x != this._targetX || this._y != this._targetY) {
            // Target not reached yet.
            // Move current charcet position in the direction it is heading
            // based on current direction speed.

            // Math[min/max] used to make sure characted didn't moved past
            // the target.
            this._x = Math[this._targetX < this._x ? 'max' : 'min'](this._targetX, this._x + this.getXSpeed());
            this._y = Math[this._targetY < this._y ? 'max' : 'min'](this._targetY, this._y + this.getYSpeed());

        } else {
            // Target reached!

            this.x = this.targetX;
            this.y = this.targetY;

            // Get new target adrea from current path.
            newTarget = this.path.shift();


            // No way to go?
            if (newTarget === undefined) return;

            this.targetX = newTarget.x;
            this.targetY = newTarget.y;

            // Set movement parameters based on
            // new direction.

            // Right
            if (this.targetX > this.x) {
                this.direction = Direction.RIGHT;
            }

            // Left
            if (this.targetX < this.x) {
                this.direction = Direction.LEFT;
            }

            // Down
            if (this.targetY > this.y) {
                this.direction = Direction.DOWN;
            }

            // Up
            if (this.targetY < this.y) {
                this.direction = Direction.UP;
            }

            // Set new target position at the center
            // of target area.
            this._targetX = this.targetX * gameConfig.areaSize + gameConfig.areaSize / 2;
            this._targetY = this.targetY * gameConfig.areaSize + gameConfig.areaSize / 2;
        }
    };
}

Character.prototype.getXSpeed = function () {
    var multipliers = [0, 1, 0, -1];
    return this.speed * multipliers[this.direction];
};

Character.prototype.getYSpeed = function () {
    var multipliers = [-1, 0, 1, 0];
    return this.speed * multipliers[this.direction];
};
