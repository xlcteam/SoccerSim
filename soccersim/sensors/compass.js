var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var CompassSensor = function(robot) {
    this.robot = robot;
    this.x = this.robot.rect.left;
    this.y = this.robot.rect.top;
};

CompassSensor.prototype.read = function(){
    return this.robot.rotation;
}

exports.CompassSensor = CompassSensor
