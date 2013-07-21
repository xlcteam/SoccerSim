var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var math = require('gamejs/utils/math');
var box2d = require('./Box2dWeb-2.1.a.3');

var Robot = function(rect, dims, rotation, color, b2world, wheels) {
    // call superconstructor

    Robot.superConstructor.apply(this, arguments);
    this.rotation = rotation;
    this.color = color;
    this.dragging = false;

    this.originalImage = new gamejs.Surface(dims);

    this.radius = dims[0]/2;

    //body
    var def = new box2d.b2BodyDef();
    def.type = box2d.b2Body.b2_dynamicBody;
    def.position = new box2d.b2Vec2(rect[0], rect[1]);
    def.angle = math.radians(this.rotation); 
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

  //this.wheels = [];
  //var wheeldef;
  //for(var i=0;i < wheels.length;i++){
  //    wheeldef = wheels[i];
  //    wheeldef.car = this;
  //    this.wheels.push(new Wheel(wheeldef, b2world));
  //}

    draw.circle(this.originalImage, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);
    draw.circle(this.originalImage, 'rgba(255, 255, 255, 1)',
            [dims[0]/2, dims[1]/10], dims[1]/5, 0);

    this.vec = [0, 0];

    // ever ship has its own scale
    var dims = this.originalImage.getSize();
    this.image = gamejs.transform.rotate(this.originalImage, this.rotation);
    this.rect = new gamejs.Rect(rect);
    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Robot, gamejs.sprite.Sprite);

Robot.prototype.getLocalVelocity = function(){
    var retv = this.body.GetLocalVector(
            this.body.GetLinearVelocityFromLocalPoint(new box2d.b2Vec2(0, 0))
            );
    return [retv.x, retv.y];
}

Robot.prototype.update = function(msDuration) {
    // moveIp = move in place
  //var fvect = [1, 0]; 
  //var vector = new box2d.b2Vec2(fvect[0], fvect[1]);
  //var position = this.body.GetWorldCenter();
  //this.body.ApplyForce(this.body.GetWorldVector(vector), position);
    
    if (this.dragging) {
        this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
    } else {
        this.body.SetLinearVelocity(new box2d.b2Vec2(this.vec[0], this.vec[1]));
    }
}



Robot.prototype.mouseOver = function(pos) {
    var dx = this.rect.left - pos[0];
    var dy = this.rect.top - pos[1];
    //console.log(this.radius, Math.sqrt(dx*dx+dy*dy));

    return Math.sqrt(dx*dx+dy*dy) < this.radius;
}

Robot.prototype.stayIn = function(dims){
    var x = this.rect.left;
    var y = this.rect.top;

    if (x - this.radius < 0) this.rect.left = 0 + this.radius;
    else if (x + this.radius > dims[0]) this.rect.left = dims[0] - this.radius;

    if (y - this.radius < 0) this.rect.top = 0 + this.radius;
    else if (y + this.radius > dims[1]) this.rect.top = dims[1] - this.radius;
}  

Robot.prototype.draw = function(surface) {
    var pos = this.body.GetWorldCenter();
    this.rect.left = pos.x;
    this.rect.top = pos.y;

    var rect = new gamejs.Rect([this.rect.left-this.radius, this.rect.top-this.radius]);
    surface.blit(this.image, rect);
}

Robot.prototype.eventResponse = function(event) {
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

exports.Robot = Robot;
