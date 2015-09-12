/* jshint ignore:start */
function Ghost (gameConfig, characterConfig) {
    Character.apply(this, arguments);

    this.color = characterConfig.color;

    // Is current ghost selected by user.
    this.selected = characterConfig.selected;

    // Wheh big dot gets eaten, ghosts get scared.
    this.panicked = false;

    // Am I dead?
    this.dead = false;

    // Ghost speed is multiplied when dead
    this.getXSpeed = function () {
        return Character.prototype.getXSpeed.call(this) * (this.dead ? 5 : 1);
    };

    this.getYSpeed = function () {
        return Character.prototype.getYSpeed.call(this) * (this.dead ? 5 : 1);
    };

    this.draw = function () {
        var x = this._x,
            y = this._y,

            // Helpers to posotion eye puppils.
            // Depending on current direction. puppils should point ahead.
            // Positioners help with calculating x/y position
            // when drawing.
            horizontalPositioner = [0, 1, 0, -1],
            verticalPositioner = [-1, 0, 1, 0];

        // When ghost selected. draw ligher background to mark it on
        // the board.
        if (this.selected && !this.panicked && !this.dead) {
            gameConfig.ctx.fillStyle = '#AAA';
            gameConfig.ctx.beginPath();
            gameConfig.ctx.lineTo(x + gameConfig.areaSize / 1.6, y + gameConfig.areaSize / 1.6);
            gameConfig.ctx.lineTo(x - gameConfig.areaSize / 1.6, y + gameConfig.areaSize / 1.6);
            gameConfig.ctx.arc(x, y, gameConfig.areaSize / 1.6, -Math.PI, 0);
            gameConfig.ctx.closePath();
            gameConfig.ctx.fill();
        }

        // Draw character
        if (!this.dead) {
            gameConfig.ctx.fillStyle = this.panicked ? '#00F' : this.color;
            gameConfig.ctx.beginPath();
            gameConfig.ctx.lineTo(x + gameConfig.areaSize / 2, y + gameConfig.areaSize / 2);
            gameConfig.ctx.lineTo(x + (gameConfig.areaSize / 6) * 2, y + (gameConfig.areaSize / 6) * 2);
            gameConfig.ctx.lineTo(x + (gameConfig.areaSize / 6), y + gameConfig.areaSize / 2);
            gameConfig.ctx.lineTo(x, y + (gameConfig.areaSize / 6) * 2);
            gameConfig.ctx.lineTo(x - (gameConfig.areaSize / 6), y + gameConfig.areaSize / 2);
            gameConfig.ctx.lineTo(x - (gameConfig.areaSize / 6) * 2, y + (gameConfig.areaSize / 6) * 2);
            gameConfig.ctx.lineTo(x - gameConfig.areaSize / 2, y + gameConfig.areaSize / 2);
            gameConfig.ctx.lineTo(x - gameConfig.areaSize / 2, y);
            gameConfig.ctx.arc(x, y, gameConfig.areaSize / 2, -Math.PI, 0);
            gameConfig.ctx.closePath();
            gameConfig.ctx.fill();
        }

        // Draw eyes
        gameConfig.ctx.fillStyle = '#FFF';
        gameConfig.ctx.beginPath();
        gameConfig.ctx.arc(x - gameConfig.areaSize / 4.5, y - gameConfig.areaSize / 8, gameConfig.areaSize / 6, 0 ,2*Math.PI);
        gameConfig.ctx.closePath();
        gameConfig.ctx.fill();

        gameConfig.ctx.beginPath();
        gameConfig.ctx.arc(x + gameConfig.areaSize / 4.5, y - gameConfig.areaSize / 8, gameConfig.areaSize / 6, 0 ,2*Math.PI);
        gameConfig.ctx.closePath();
        gameConfig.ctx.fill();

        // Draw pupils
        gameConfig.ctx.fillStyle = '#000';
        gameConfig.ctx.beginPath();
        gameConfig.ctx.arc(
            x - gameConfig.areaSize / 4.5 + (horizontalPositioner[this.direction] * gameConfig.areaSize / 13.5),
            y - gameConfig.areaSize / 8 + (verticalPositioner[this.direction] * gameConfig.areaSize / 13.5),
            gameConfig.areaSize / 10,
            0,
            2 * Math.PI
        );
        gameConfig.ctx.closePath();
        gameConfig.ctx.fill();

        gameConfig.ctx.beginPath();
        gameConfig.ctx.arc(
            x + gameConfig.areaSize / 4.5 + (horizontalPositioner[this.direction] * gameConfig.areaSize / 13.5),
            y - gameConfig.areaSize / 8 + (verticalPositioner[this.direction] * gameConfig.areaSize / 13.5),
            gameConfig.areaSize / 10,
            0,
            2 * Math.PI
        );
        gameConfig.ctx.closePath();
        gameConfig.ctx.fill();
    };


}

Ghost.prototype = Object.create(Character.prototype);
Ghost.prototype.constructor = Ghost;
