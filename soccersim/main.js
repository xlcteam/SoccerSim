var gamejs = require('gamejs');
var draw = require('gamejs/draw');

gamejs.preload(['img/field.png']);

gamejs.ready(function() {

    this.width = 729;
    this.height = 646;

    var display = gamejs.display.setMode([this.width, this.height], 
        gamejs.display.DISABLESMOOTHING | gamejs.display.FULLSCREEN);
  //display.blit(
  //    (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
  //);

    gamejs.display.setCaption("Soccer Simulation");

    display.fill("#047a01");
    this.field = gamejs.image.load("img/field.png");

    display.blit(this.field, [(this.width-729)/2, 100+(this.height-100-546)/2]);
    
    var rect = new gamejs.Rect([0, 0], [this.width, 50]);
    draw.rect(display, "#FFFFFF", rect, 100);


    gamejs.onEvent(function(event) {
        // event handling
    });

    gamejs.onTick(function(msDuration) {
        // game loop
    });
});
