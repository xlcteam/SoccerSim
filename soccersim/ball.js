var box2d = require('./Box2dWeb-2.1.a.3');
var gamejs = require('gamejs');
var draw = require('gamejs/draw');

var Ball = function(env, rect, dims, color, field, b2world, getNeutralSpotsCallback){
    
    //Ball.superConstructor.apply(this, arguments);

    this.env = env;

    this.color = color;
    this.rect = new gamejs.Rect(rect);
    this.radius = dims[0]/2;
    this.image = new gamejs.Surface(dims);
    this.unoccupiedNeutralSpots = getNeutralSpotsCallback;
    this.field = field;


    var def = new box2d.b2BodyDef();
    def.type = box2d.b2Body.b2_dynamicBody;
    def.position = new box2d.b2Vec2(rect[0], rect[1]);
    def.linearDamping = 0.15;
    def.bullet = true;
    def.angularDamping = 0.3;
    this.body = b2world.CreateBody(def);

    //fixture
    var fixdef = new box2d.b2FixtureDef();
    fixdef.density = 1.0;
    fixdef.friction = 0.3;
    fixdef.restitution = 0.4;
    fixdef.shape = new box2d.b2CircleShape(this.radius);
    this.body.CreateFixture(fixdef);

    draw.circle(this.image, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);

    this.neutralSpots = { "topleft" : [224, 185],
                          "topright": [503, 185],
                          "bottomleft": [224, 363],
                          "bottomright": [503, 363],
                          "center": [729/2, 546/2]};

    this.followingSpots = {
        "topleft" : ["topleft", "bottomleft", "center", "topright", "bottomright"],
        "topright": ["topright", "bottomright", "center", "topleft", "bottomleft"],
        "bottomleft": ["bottomleft", "topleft", "center", "bottomright", "topright"],
        "bottomright": ["bottomright", "topright", "center", "bottomleft", "topleft"]};
    this.dragging = false;

    return this;
};

Ball.prototype.moveToNS = function(spot) {
    var vec = {x: this.neutralSpots[spot][0], y: this.neutralSpots[spot][1]};
    this.body.SetPosition(vec);
    this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
}

Ball.prototype.moveToUNS = function() { // unoccupied neutral spot
    var unoccupiedNeutralSpots = this.unoccupiedNeutralSpots();
    this.dragging = false;

    var side = "";
    if (this.rect.top < this.field[1]/2) side += "top";
    else side += "bottom";

    if (this.rect.left < this.field[0]/2) side += "left";
    else side += "right";

    var moved = false;
    var $this = this;

    this.followingSpots[side].forEach(function(spot){

        if (moved) return;

        if (unoccupiedNeutralSpots.indexOf(spot) != -1){
            $this.moveToNS(spot);
            moved = true;
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
            var vec = {x: pos[0], y: pos[1]};
            this.body.SetPosition(vec);
        }
    }
}

Ball.prototype.draw = function(surface) {
    var pos = this.body.GetWorldCenter();
    this.rect.left = pos.x;
    this.rect.top = pos.y;

    var rect = new gamejs.Rect([this.rect.left-this.radius, this.rect.top-this.radius]);
    surface.blit(this.image, rect);
}

Ball.prototype.point_whitin = function(point) {
    return this.mouseOver(point);    
}



exports.Ball = Ball;
