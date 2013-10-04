var gamejs = require('gamejs');
var font = require('gamejs/font');

var Timer = function(env, mins, secs, millis){
    this.env = env;
    this.mins = mins;
    this.secs = secs;
    this.millis = millis;

    this.renderFont = new font.Font('50px monospace');

    this.startTime = [this.mins, this.secs, this.millis];
};

Timer.prototype.start = function (){
    this.millis -= 0.5;

    if (this.millis < 0){
        this.millis = 10;
        this.secs--;
        if (this.secs < 0){
            this.secs = 59;
            this.mins--;
            if (this.mins < 0){
                this.mins = this.secs = this.millis = 0;
                return;
            }
        }
    }

    setInterval(this.start, 50);
}

Timer.prototype.returnTime = function(){

    function pad2(number)
    {
      return (number < 10 ? '0' : '') + number;
    }

    return [pad2(this.mins), pad2(this.secs), this.millis];
};

Timer.prototype.draw = function(surface){
    var timeSurface = this.renderFont.render(this.mins.toString() + ":" + this.secs.toString() + "," + this.millis);
    surface.blit(timeSurface, [this.env.width/2-90,10]);
}

exports.Timer = Timer;
