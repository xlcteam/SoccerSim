var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var box2d = require('./Box2dWeb-2.1.a.3');

var BoxProp = require('./objects').BoxProp;

var b2world = new box2d.b2World(new box2d.b2Vec2(0, 0), false);

var Env = require('env').Env;
var Robot = require('robot').Robot;
var Ball = require('ball').Ball;

gamejs.preload(['img/field.png']);

gamejs.ready(function() {

    var width = 729;
    var height = 546;

    var display = gamejs.display.setMode([width, height]) //, 
        /*gamejs.display.DISABLESMOOTHING | gamejs.display.FULLSCREEN); */
  //display.blit(
  //    (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
  //);
  //
    
    
    var env = new Env(teamA, teamB, [width, height], display);

    display.fill("#047a01");
    this.field = gamejs.image.load("img/field.png");

    display.blit(this.field, [(env.width-729)/2, (env.height-546)/2]);
    env.update_surface()


    // added the color of goals
    env.add_block_color("#000000");

    gamejs.display.setCaption("Soccer Simulation");

   
  //var rect = new gamejs.Rect([0, 0], [env.width, 50]);
  //draw.rect(display, "#FFFFFF", rect, 100);
    
    var wheels = [{x: 46.66904, y: 46.66904, width: 0.4, height: 0.8, angle: 45},
                  {x: 46.66904, y: -46.66904, width: 0.4, height: 0.8, angle: 135},
                  {x: -46.66904, y: -46.66904, width: 0.4, height: 0.8, angle: 225},
                  {x: -46.66904, y: 46.66904, width: 0.4, height: 0.8, angle: 315}];
    
    var robotA1 = new Robot(env, [140, 200], [21*3, 21*3], 90, "#ff0000", b2world);
    var robotA2 = new Robot(env, [140, 356], [21*3, 21*3], 90, "#ff007a", b2world);

    var robotB1 = new Robot(env, [580, 200], [21*3, 21*3], 270, "#00ff00", b2world);
    var robotB2 = new Robot(env, [580, 356], [21*3, 21*3], 270, "#00ff7a", b2world);

    var robots = [];
    robots.push(robotA1);
    robots.push(robotA2);
    robots.push(robotB1);
    robots.push(robotB2);

    var props=[];
    
    //goal props
    // back
    props.push(new BoxProp(env, {'size':[6, 180], 'position':[50, 272]}, b2world));
    props.push(new BoxProp(env, {'size':[6, 180], 'position':[676, 272]}, b2world));
    //top    
    props.push(new BoxProp(env, {'size':[37, 7], 'position':[66, 183]}, b2world));
    props.push(new BoxProp(env, {'size':[37, 7], 'position':[660, 183]}, b2world));
    //bottom    
    props.push(new BoxProp(env, {'size':[37, 7], 'position':[66, 364]}, b2world));
    props.push(new BoxProp(env, {'size':[37, 7], 'position':[660, 364]}, b2world));
    
    var ball = new Ball(env, [364, 273], [8*3, 8*3], "#644B51", [env.width, env.height], 
        b2world,
        function(){
            var neutralSpots = { "topleft" : [224, 185],
                              "topright": [503, 185],
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

    env.ball = ball;

    gamejs.onEvent(function(event) {
        // event handling

        robots.forEach(function(robot){
            robot.eventResponse(event);
        });

        ball.eventResponse(event);
    });

    robotA1.forward_right(80);

    gamejs.onTick(function(msDuration) {
        // game loop
        display.fill("#047a01");
        this.field = gamejs.image.load("img/field.png");

        display.blit(this.field, [(env.width-729)/2, (env.height-546)/2]);
        robots.forEach(function(robot){
            robot.update(msDuration);
            robot.stayIn([env.width, env.height]);

            robot.ir_sensor.read();

            robot.ultrasonic_sensors[0].read();
            robot.ultrasonic_sensors[1].read();
            robot.light_sensors[0].read()
            robot.light_sensors[1].read()
        });


        //console.log(robotA1.light_sensors[0].read())

        // debug draw of goals
      //props.forEach(function(prop){
      //    var list = prop.body.GetFixtureList();
      //    var xf = prop.body.m_xf;
      //    var v = prop.body.GetFixtureList().GetShape().GetVertices();

      //    var c = prop.body.GetFixtureList().GetShape().GetVertexCount();
      //    var lines = new Array(c);
      //    var math = box2d.Box2D.Common.Math.b2Math;

      //    for (var i=0; i<c; i++) {
      //        var o = math.MulX(xf, v[i]);
      //        lines[i] = [o.x, o.y];
      //    }

      //    draw.lines(display, "#ff0000", true, lines, 1);
      //});

        b2world.Step(msDuration/1000, 10, 8);

        ball.stayIn();

        robots.forEach(function(robot){
            robot.draw(display);
        });

        ball.draw(display);

        //console.log(msDuration);

        b2world.ClearForces();
    });
});
