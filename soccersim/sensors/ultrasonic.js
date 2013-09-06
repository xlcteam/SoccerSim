var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var UltraSonicSensor = function(robot, pos, angle) {
    this.robot = robot;
    this.pos = pos;
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1]

};

UltraSonicSensor.prototype.draw = function(surface) {
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1];
    draw.circle(surface, "#FF3CB7", [this.x, this.y], 3, 0);
}

UltraSonicSensor.prototype.read = function() {
    
}

exports.UltraSonicSensor = UltraSonicSensor
