var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var surfacearray = require('gamejs/surfacearray');

var IRSensor = function(robot, pos, ball){
    this.robot = robot;
    this.pos = pos;
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1];
    this.ball = ball;
};

IRSensor.prototype.draw = function (surface){
    this.x = Math.round(this.robot.rect.left + this.pos[0]);
    this.y = Math.round(this.robot.rect.top + this.pos[1]);
    draw.circle(surface, "#000CB7", [this.x, this.y], 3, 0);
}

IRSensor.prototype.read = function() {
    
    function max (numArray) {
        return Math.max.apply(null, numArray);
    }

    function min (numArray) {
        return Math.min.apply(null, numArray);
    }

    var color = this.robot.env.surface.get(this.x, this.y).slice(0, 3);
    return Math.round(((0.5 * max(color)) + (0.5 * min(color)))/ 2.55);
}

exports.IRSensor = IRSensor;
