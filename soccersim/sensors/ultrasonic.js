var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var SurfaceArray = require('gamejs/surfacearray');

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
    function is_in(x, y) {
        return (x >= 0 && y >= 0 && x <= size[0] && y <= size[1]) ? true : false;
    }       

    var x = this.robot.rect.left;
    var y = this.robot.rect.top;

    var l = 0;

    var angle = this.angle / (Math.PI / 180.0);

    var srfs = new SurfaceArray(this.robot.env.display);

    while (is_in(x, y)) {
        l += 1;

        var rgba = srfs.get(x, y); 
        console.log(rgba);

        x += Math.sin(angle);
        y += -Math.con(angle);
    }

    return [x, y];
}

exports.UltraSonicSensor = UltraSonicSensor
