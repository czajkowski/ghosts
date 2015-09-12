/* jshint ignore:start */
function Cakeman (gameConfig, characterConfig) {
    Character.apply(this, arguments);

    this.color = '#FE0';

    this.draw = function () {
        var x = this._x,
            y = this._y,
            r = Math.PI / 2 * this.direction,
            s = 0.25 * Math.PI * (((this.moveCounter % 40) + 1) / 40);

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
