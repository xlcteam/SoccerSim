var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var surfacearray = require('gamejs/surfacearray');

var IRSensor = function(robot, pos){
    this.robot = robot;
    this.pos = pos;
    this.x = this.robot.rect.left + this.pos[0];
    this.y = this.robot.rect.top + this.pos[1];
};

IRSensor.prototype.draw = function (surface){
    this.x = Math.round(this.robot.rect.left + this.pos[0]);
    this.y = Math.round(this.robot.rect.top + this.pos[1]);
    draw.circle(surface, "#000CB7", [this.x, this.y], 3, 0);
}

IRSensor.prototype.read = function() {

  //console.log(this.robot.env.ball.rect.top , this.robot.rect.top, 
  //        this.robot.env.ball.rect.left , this.robot.rect.left);
    
    //console.log(p1.rect.left, p1.rect.top, p2.rect.left, p2.rect.top);
  //var angle = Math.atan2(this.robot.env.ball.rect.top - this.robot.rect.top,
  //                       this.robot.env.ball.rect.left - this.robot.rect.left);
  //angle *= (180 / Math.PI);
  //console.log(angle);
}

exports.IRSensor = IRSensor;
