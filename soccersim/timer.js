var Timer = function(mins, secs, millis){
    this.mins = mins;
    this.secs = secs;
    this.millis = millis;

    this.startTime = [this.mins, this.secs, this.millis];
};

Timer.prototype.start = function (){
    this.millis -= 0.5;

    if (this.millis < 0){
        this.millis = 0;
        this.secs--;
        if (this.secs < 0){
            this.mins--;
            if (this.mins < 0){
                this.mins = this.secs = this.millis = 0;
                return;
            }
        }
    }

    setInterval(this.start(), 50);
}

Timer.prototype.returnTime = function(){
    return [mins, secs, millis];
};
