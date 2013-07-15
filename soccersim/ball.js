var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var Ball = function(rect, dims, color, field, getNeutralSpotsCallback){
    
    //Ball.superConstructor.apply(this, arguments);
    this.color = color;
    this.rect = new gamejs.Rect(rect);
    this.radius = dims[0]/2;    
    this.image = new gamejs.Surface(dims);
    this.unoccupiedNeutralSpots = getNeutralSpotsCallback;
    this.field = field;

    draw.circle(this.image, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);

    this.neutralSpots = { "topleft" : [224, 185],
                          "topright": [503, 183],
                          "bottomleft": [224, 363],
                          "bottomright": [503, 363],
                          "center": [729/2, 546/2]};

    this.followingSpots = { "topleft" : ["topleft", "bottomleft", "center", "topright", "bottomright"],
                            "topright": ["topright", "bottomright", "center", "topleft", "bottomleft"],
                            "bottomleft": ["bottomleft", "topleft", "center", "bottomright", "topright"],
                            "bottomright": ["bottomright", "topright", "center", "bottomleft", "topleft"]};
    this.dragging = false;

    return this;
};

Ball.prototype.moveToNS = function(spot) {
    this.rect.left = this.neutralSpots[spot][0];
    this.rect.top = this.neutralSpots[spot][1];
}

Ball.prototype.moveToUNS = function() { // unoccupied neutral spot
    var unoccupiedNeutralSpots = this.unoccupiedNeutralSpots();
    this.dragging = false;
    
    var side = "";
    if (this.rect.top < this.field[1]/2) side += "top";
    else side += "bottom";

    if (this.rect.left < this.field[0]/2) side += "left";
    else side += "right";
    
    this.followingSpots[side].forEach(function(spot){
        if (spot in unoccupiedNeutralSpots){
            this.moveToNS(spot);
            return;
        }
    });
}

Ball.prototype.ballOutside = function(){
    if (this.rect.top < 73 || this.rect.left < 73) return true;
    else if (this.rect.left > 656 || this.rect.top > 473) return true;

    return false;
}

Ball.prototype.stayIn = function(){
    if (this.ballOutside()){
        this.moveToUNS();
    }
}

Ball.prototype.mouseOver = function(pos) {
    var dx = this.rect.left - pos[0];
    var dy = this.rect.top - pos[1];
    
    return Math.sqrt(dx*dx+dy*dy) < this.radius;
}

Ball.prototype.eventResponse = function(event) {
    if (event.type == gamejs.event.MOUSE_DOWN) {
        var pos = event.pos;
        if (this.mouseOver(pos)) {
            this.dragging = !this.dragging;
        }
    } else if (event.type === gamejs.event.MOUSE_UP) {
        var pos = event.pos;
    } else if (event.type === gamejs.event.MOUSE_MOTION) {
        var pos = event.pos;
        if (this.dragging) {
            this.rect.left = pos[0];
            this.rect.top = pos[1];
        }
    }
}

Ball.prototype.draw = function(surface) {
    var rect = new gamejs.Rect([this.rect.left-this.radius, this.rect.top-this.radius]);
    surface.blit(this.image, rect);
}

exports.Ball = Ball;
