var gamejs = require('gamejs');
var draw = require('gamejs/draw');

gamejs.preload(['img/field.png', 'img/robot.png']);


var Robot = function(rect, dims, rotation, color) {
   // call superconstructor

   Robot.superConstructor.apply(this, arguments);
   this.rotation = rotation;
   this.color = color;

   this.originalImage = gamejs.image.load("img/robot.png");

   this.originalImage = new gamejs.Surface(dims);

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


    gamejs.onEvent(function(event) {
        // event handling
    });

    gamejs.onTick(function(msDuration) {
        // game loop
    });
});
