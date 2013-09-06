var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var math = require('gamejs/utils/math');
var box2d = require('./Box2dWeb-2.1.a.3');
var LightSensor = require('./sensors/light').LightSensor;
var UltraSonicSensor = require('./sensors/ultrasonic').UltraSonicSensor;

var Robot = function(rect, dims, rotation, color, b2world, wheels) {
    // call superconstructor

    Robot.superConstructor.apply(this, arguments);
    this.rotation = rotation;
    this.color = color;
    this.dragging = false;
    this.out = false;

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

    draw.circle(this.originalImage, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);
    draw.circle(this.originalImage, 'rgba(255, 255, 255, 1)',
            [dims[0]/2, dims[1]/10], dims[1]/5, 0);

    this.vec = [0, 0];

    // ever ship has its own scale
    var dims = this.originalImage.getSize();
    this.image = gamejs.transform.rotate(this.originalImage, this.rotation);
    this.rect = new gamejs.Rect(rect);

    this.light_sensors = [];
    this.light_sensors.push(new LightSensor(this, [0, -5]));
    this.light_sensors.push(new LightSensor(this, [0,  5]));

    this.ultrasonic_sensors = []
    this.ultrasonic_sensors.push(new UltraSonicSensor(this, [0, -25]));
    this.ultrasonic_sensors.push(new UltraSonicSensor(this, [0,  25]));

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

    if (x - this.radius < 0) {
        this.rect.left = 0 + this.radius;

        var vec = {x: this.rect.left, y: this.rect.top};
        this.body.SetPosition(vec);
    } else if (x + this.radius > dims[0]) {
        this.rect.left = dims[0] - this.radius;

        var vec = {x: this.rect.left, y: this.rect.top};
        this.body.SetPosition(vec);
    }

    if (y - this.radius < 0) {
        this.rect.top = 0 + this.radius;
        var vec = {x: this.rect.left, y: this.rect.top};
        this.body.SetPosition(vec);
 
    } else if (y + this.radius > dims[1]) { 
        this.rect.top = dims[1] - this.radius;
        var vec = {x: this.rect.left, y: this.rect.top};
        this.body.SetPosition(vec);
 
    }
}  

Robot.prototype.draw = function(surface) {
    var pos = this.body.GetWorldCenter();
    this.rect.left = pos.x;
    this.rect.top = pos.y;

    var rect = new gamejs.Rect([this.rect.left-this.radius, this.rect.top-this.radius]);
    surface.blit(this.image, rect);

    this.light_sensors.forEach(function(s){
        s.draw(surface);
    });

    this.ultrasonic_sensors.forEach(function(s){
        s.draw(surface); 
    });
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
        //console.log(pos);
        if (this.dragging) {
            var vec = {x: pos[0], y: pos[1]};
            this.body.SetPosition(vec);
        }
    }
}

Robot.prototype.point_whitin = function(point) {
    return this.mouseOver(point);    
}

exports.Robot = Robot;
