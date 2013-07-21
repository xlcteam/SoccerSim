var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var math = require('gamejs/utils/math');
var box2d = require('./Box2dWeb-2.1.a.3');


function Wheel(pars, b2world){
    /*
    wheel object 
          
    pars:
    
    robot - robot this wheel belongs to
    x - horizontal position in meters relative to robot's center
    y - vertical position in meters relative to robot's center
    width - width in meters
    length - length in meters
    angle - angle in degrees relative to the car's angle
    */

    this.position=[pars.x, pars.y];
    this.car=pars.car;

    //initialize body
    var def = new box2d.b2BodyDef();
    def.type = box2d.b2Body.b2_dynamicBody;
    def.position = this.car.body.GetWorldPoint(new box2d.b2Vec2(
                this.position[0], 
                this.position[1])
            );
    def.angle=this.car.body.GetAngle() + math.radians(pars.angle) ;

    this.body = b2world.CreateBody(def);
    
    //initialize shape
    var fixdef= new box2d.b2FixtureDef;
    fixdef.density = 1;
    fixdef.isSensor = true;
    fixdef.shape = new box2d.b2PolygonShape();
    fixdef.shape.SetAsBox(pars.width/2, pars.length/2);
    this.body.CreateFixture(fixdef);

    //create joint to connect wheel to body
    var jointdef=new box2d.b2PrismaticJointDef();
    jointdef.Initialize(this.car.body, this.body, 
            this.body.GetWorldCenter(), new box2d.b2Vec2(1, 0));
    jointdef.enableLimit=true;
    jointdef.lowerTranslation = jointdef.upperTranslation = 0;
    b2world.CreateJoint(jointdef);
}

Wheel.prototype.setAngle = function(angle) {
    /*
       angle - wheel angle relative to car, in degrees
       */
    this.body.SetAngle(this.car.body.GetAngle()+math.radians(angle));
};

Wheel.prototype.getLocalVelocity=function(){
    /*returns get velocity vector relative to car
    */
    var res=this.car.body.GetLocalVector(this.car.body.GetLinearVelocityFromLocalPoint(new box2d.b2Vec2(this.position[0], this.position[1])));
    return [res.x, res.y];
};

Wheel.prototype.getDirectionVector=function(){
    /*
       returns a world unit vector pointing in the direction this wheel is moving
       */
    return vectors.rotate((this.getLocalVelocity()[1]>0) ? [0, 1]:[0, -1] , this.body.GetAngle()) ;
};


Wheel.prototype.getKillVelocityVector=function(){
    /*
       substracts sideways velocity from this wheel's velocity vector and returns the remaining front-facing velocity vector
       */
    var velocity=this.body.GetLinearVelocity();
    var sideways_axis=this.getDirectionVector();
    var dotprod=vectors.dot([velocity.x, velocity.y], sideways_axis);
    return [sideways_axis[0]*dotprod, sideways_axis[1]*dotprod];
};

Wheel.prototype.killSidewaysVelocity=function(){
    /*
       removes all sideways velocity from this wheels velocity
       */
    var kv=this.getKillVelocityVector();
    this.body.SetLinearVelocity(new box2d.b2Vec2(kv[0], kv[1]));

};


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
  //console.log(wheels)
  //for(var i=0;i < wheels.length;i++){
  //    wheeldef = wheels[i];
  //    wheeldef.car = this;
  //    this.wheels.push(new Wheel(wheeldef, b2world));
  //}

    draw.circle(this.originalImage, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);
    draw.circle(this.originalImage, 'rgba(255, 255, 255, 1)',
            [dims[0]/2, dims[1]/10], dims[1]/5, 0);

    this.speed = 0;

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
