var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var Ball = function(rect, dims, color){
    
    //Ball.superConstructor.apply(this, arguments);
    this.color = color;
    this.rect = new gamejs.Rect(rect);
    this.radius = dims[0]/2;    
    this.image = new gamejs.Surface(dims);

    draw.circle(this.image, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);

    this.neutralSpots = { "topleft" : [224, 185],
                          "topright": [503, 183],
                          "bottomleft": [224, 363],
                          "bottomright": [503, 363]};

    return this;
};

Ball.prototype.moveToNeutralSpot = function() {

}

Ball.prototype.draw = function(surface) {
    var rect = new gamejs.Rect([this.rect.left-this.radius, this.rect.top-this.radius]);
    surface.blit(this.image, rect);
}

exports.Ball = Ball;
