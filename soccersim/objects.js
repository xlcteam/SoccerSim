var box2d = require('./Box2dWeb-2.1.a.3');

var BoxProp = function(env, pars, b2world){
    /*
   static rectangle shaped prop
     
     pars:
     size - array [width, height]
     position - array [x, y], in world meters, of center
    */

    this.env = env;

    this.size=pars.size;
    this.pos=pars.position;
    
    //initialize body
    var bdef=new box2d.b2BodyDef();
    bdef.position=new box2d.b2Vec2(pars.position[0], pars.position[1]);
    bdef.angle=0;
    bdef.fixedRotation=true;
    this.body=b2world.CreateBody(bdef);
    
    //initialize shape
    var fixdef=new box2d.b2FixtureDef;
    fixdef.shape=new box2d.b2PolygonShape();
    fixdef.shape.SetAsBox(this.size[0]/2, this.size[1]/2);
    fixdef.restitution=0.4; //positively bouncy!
    this.body.CreateFixture(fixdef);
    return this;  
};

BoxProp.prototype.point_whitin = function(point) {
    if (point[0] >= this.pos[0] && point[0] <= this.pos[0] + this.size[0] &&
        point[1] >= this.pos[1] && point[1] <= this.pos[1] + this.size[1]) {
        return true;
    } else {
        return false; 
    }
}



exports.BoxProp = BoxProp;
