/* jshint ignore:start */
function Cakeman (gameConfig, characterConfig) {
    Character.apply(this, arguments);

    this.draw = function () {
        var x = this._x,
            y = this._y,
            r = Math.PI / 2 * this.direction,
            s = (this.moveCounter / 40) % 1 * 0.25 * Math.PI;

        gameConfig.ctx.fillStyle = this.color;
        gameConfig.ctx.beginPath();
        gameConfig.ctx.arc(x, y, gameConfig.areaSize / 1.8, -Math.PI / 2 + s + r, -Math.PI / 2 - s + r);
        gameConfig.ctx.lineTo(x, y);
        gameConfig.ctx.closePath();
        gameConfig.ctx.fill();
    };

}

Cakeman.prototype = Object.create(Character.prototype);
Cakeman.prototype.constructor = Cakeman;
