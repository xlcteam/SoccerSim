var gamejs = require('gamejs');

gamejs.preload(['img/field.png']);

gamejs.ready(function() {

    this.width = 600;
    this.height = 400;

    var display = gamejs.display.setMode([this.width, this.height], 
        gamejs.display.DISABLESMOOTHING | gamejs.display.FULLSCREEN);
  //display.blit(
  //    (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
  //);

    gamejs.display.setCaption("Soccer Simulation");

    display.fill("#047a01");
    this.field = gamejs.image.load("img/field.png");

    display.blit(this.field, [(600-486)/2, (400-364)/2]);


    gamejs.onEvent(function(event) {
        // event handling
    });

    gamejs.onTick(function(msDuration) {
        // game loop
    });
});
