var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var surfacearray = require('gamejs/surfacearray');

var LightSensor = function(robot, pos){
    this.robot = robot;
    this.pos = pos;
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1];
};

LightSensor.prototype.draw = function (surface){
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1];
    draw.circle(surface, "#000CB7", [this.x, this.y], 3, 0);
}

LightSensor.prototype.read = function() {
    var color = surfacearray.get(this.x, this.y);
}

exports.LightSensor = LightSensor;
