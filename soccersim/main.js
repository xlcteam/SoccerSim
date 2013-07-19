var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var box2d = require('./Box2dWeb-2.1.a.3');

var BoxProp = require('./Box2dWeb-2.1.a.3').BoxProp;

var Robot = require('robot').Robot;
var Ball = require('ball').Ball;

gamejs.preload(['img/field.png']);

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

    var ball = new Ball([364, 273], [8*3, 8*3], "#644B51", [this.width, this.height], function(){
        var neutralSpots = { "topleft" : [224, 185],
                          "topright": [503, 183],
                          "bottomleft": [224, 363],
                          "bottomright": [503, 363],
                          "center": [729/2, 546/2]};

        var unoccupied = [];

        for (spot in neutralSpots){
            var occupied = false;
            robots.forEach(function(robot){
                var dx = neutralSpots[spot][0] - robot.rect.left;
                var dy = neutralSpots[spot][1] - robot.rect.top;
                
                if (Math.sqrt(dx*dx+dy*dy) < robot.radius + ball.radius){
                    occupied = true;
                }
            });
            if (!occupied){
                unoccupied.push(spot);
            }
        }
       
        return unoccupied;
    });

    gamejs.onEvent(function(event) {
        // event handling

        robots.forEach(function(robot){
            robot.eventResponse(event);
        });

        ball.eventResponse(event);

    });

    gamejs.onTick(function(msDuration) {
        // game loop
        display.fill("#047a01");
        this.field = gamejs.image.load("img/field.png");

        display.blit(this.field, [(this.width-729)/2, (this.height-546)/2]);
        robots.forEach(function(robot){
            robot.stayIn([this.width, this.height]);
            robot.draw(display);
        });

        ball.stayIn();
        ball.draw(display);

    });
});
