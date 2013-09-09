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

    var x = this.robot.rect.left;
    var y = this.robot.rect.top;

    var l = 0;

    var angle = this.angle / (Math.PI / 180.0);

    var tx = x + 800 * Math.sin(angle);
    var ty = y - 800 * Math.cos(angle);

    var size = this.robot.env.field_size;
    function is_in (x, y) {
        return (x >= 0 && y >= 0 && x <= size[0] && y <= size[1]) ? true : false; 
    }

    while (is_in(x, y)) {
        l += 1;
        
        var touched = false;
        var robot = this.robot;

        this.robot.env.objects.forEach(function(object){
            if (object.rect.left == robot.rect.left &&
                object.rect.top == robot.rect.top) {
                return;
            }


            if (object.point_whitin([x, y])) {
                touched = true;
            }

        });

        if (touched) {
            break; 
        }
          

        x += Math.sin(angle);
        y += -Math.cos(angle);
    }

    return Math.round(l / 3);
}

exports.UltraSonicSensor = UltraSonicSensor
