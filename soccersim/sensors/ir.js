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
    var angle = Math.atan2(this.ball.rect.left - this.robot.rect.left,
                           this.ball.rect.top - this.robot.rect.top) * (180 / Math.Pi);
}

exports.IRSensor = IRSensor;
