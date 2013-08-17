var Timer = function(mins, secs, millis){
    this.mins = mins;
    this.secs = secs;
    this.millis = millis;
};

Timer.prototype.returnTime = function(){
    return [mins, secs, millis];
};
