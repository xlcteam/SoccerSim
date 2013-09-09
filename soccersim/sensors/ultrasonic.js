var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var UltraSonicSensor = function(robot, pos, angle) {
    this.robot = robot;
    this.pos = pos;
    this.angle = angle;
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1]
};

UltraSonicSensor.prototype.draw = function(surface) {
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1];
    draw.circle(surface, "#FF3CB7", [this.x, this.y], 3, 0);
}

UltraSonicSensor.prototype.read = function() {
    var size = this.robot.env.field_size;

    var x = this.robot.rect.left;
    var y = this.robot.rect.top;

    var l = 0;

    var angle = this.angle / (Math.PI / 180.0);


    while (true) {
        l += 1;

        var rgba = this.robot.env.surface.get(x, y); 
        console.log(rgba);
        if (rgba[0] == undefined) {
            break; 
        }

        x += Math.sin(angle);
        y += -Math.cos(angle);
    }

    return l;
}

exports.UltraSonicSensor = UltraSonicSensor
