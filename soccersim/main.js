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
    var dx = this.rect.x - pos[0];
    var dy = this.rect.y - pos[1];
    
    return 
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

    display.fill("#047a01");
    this.field = gamejs.image.load("img/field.png");

    display.blit(this.field, [(this.width-729)/2, (this.height-546)/2]);
    
  //var rect = new gamejs.Rect([0, 0], [this.width, 50]);
  //draw.rect(display, "#FFFFFF", rect, 100);

    var robot = new Robot([200, 200], [21*3, 21*3], 270, "#ff0000");

    gamejs.onEvent(function(event) {
        // event handling
        console.log(event);

        if (event.type == gamejs.event.MOUSE_DOWN) {
            var pos = event.pos; 
            if (robot.mouseOver(pos)) {
                robot.dragging = !robot.dragging; 
            }

        } else if (event.type === gamejs.event.MOUSE_UP) {
            var pos = event.pos;
        } else if (event.type === gamejs.event.MOUSE_MOTION) {
            var pos = event.pos; 
        }
    });

    gamejs.onTick(function(msDuration) {
        // game loop
        robot.draw(display);
    });
});
