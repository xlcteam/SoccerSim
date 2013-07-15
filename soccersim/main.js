var gamejs = require('gamejs');
var draw = require('gamejs/draw');

gamejs.preload(['img/field.png']);


var Robot = function(rect, dims, rotation, color) {
   // call superconstructor

   Robot.superConstructor.apply(this, arguments);
   this.rotation = rotation;
   this.color = color;
   this.dragging = false;

   this.originalImage = new gamejs.Surface(dims);

   this.radius = dims[0]/2;
   
   draw.circle(this.originalImage, this.color, [dims[0]/2, dims[1]/2], this.radius, 0);
   draw.circle(this.originalImage, 'rgba(255, 255, 255, 1)',
           [dims[0]/2, dims[1]/10], dims[1]/5, 0);

   this.speed = 20 + (40 * Math.random());

   // ever ship has its own scale
   var dims = this.originalImage.getSize();
   this.image = gamejs.transform.rotate(this.originalImage, this.rotation);
   this.rect = new gamejs.Rect(rect);
   return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Robot, gamejs.sprite.Sprite);
Robot.prototype.update = function(msDuration) {
   // moveIp = move in place
   this.rect.moveIp(0, this.speed * (msDuration/1000));
   if (this.rect.top > 600) {
      this.speed *= -1;
      this.image = gamejs.transform.rotate(this.originalImage, this.rotation + 180);
   } else if (this.rect.top < 0 ) {
      this.speed *= -1;
      this.image = gamejs.transform.rotate(this.originalImage, this.rotation);
   }
}

Robot.prototype.mouseOver = function(pos) {
    var dx = this.rect.left - pos[0];
    var dy = this.rect.top - pos[1];
    console.log(this.radius, Math.sqrt(dx*dx+dy*dy));
    
    return Math.sqrt(dx*dx+dy*dy) < this.radius;
}

Robot.prototype.stayIn = function(){
    var x = this.rect.left;
    var y = this.rect.top;

    if (x - this.radius < 0) this.rect.left = 0 + this.radius;
    else if (x + this.radius > 729) this.rect.left = 729 - this.radius;

    if (y - this.radius < 0) this.rect.top = 0 + this.radius;
    else if (y + this.radius > 546) this.rect.top = 546 - this.radius;
}  

Robot.prototype.draw = function(surface) {
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
            this.rect.left = pos[0];
            this.rect.top = pos[1];
        }
    }
}

gamejs.ready(function() {

    this.width = 729;
    this.height = 546;

    var display = gamejs.display.setMode([this.width, this.height]) //, 
        /*gamejs.display.DISABLESMOOTHING | gamejs.display.FULLSCREEN); */
  //display.blit(
  //    (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
  //);

    gamejs.display.setCaption("Soccer Simulation");

   
  //var rect = new gamejs.Rect([0, 0], [this.width, 50]);
  //draw.rect(display, "#FFFFFF", rect, 100);

    var robotA1 = new Robot([140, 200], [21*3, 21*3], 90, "#ff0000");
    var robotA2 = new Robot([140, 356], [21*3, 21*3], 90, "#ff001a");

    var robotB1 = new Robot([580, 200], [21*3, 21*3], 270, "#00ff00");
    var robotB2 = new Robot([580, 356], [21*3, 21*3], 270, "#00ff1a");


    var robots = [];
    robots.push(robotA1);
    robots.push(robotA2);
    robots.push(robotB1);
    robots.push(robotB2);

    gamejs.onEvent(function(event) {
        // event handling

        robots.forEach(function(robot){
            robot.eventResponse(event);
        });

    });

    gamejs.onTick(function(msDuration) {
        // game loop
        display.fill("#047a01");
        this.field = gamejs.image.load("img/field.png");

        display.blit(this.field, [(this.width-729)/2, (this.height-546)/2]);
        robots.forEach(function(robot){
            robot.stayIn();
            robot.draw(display);
        });


    });
});
