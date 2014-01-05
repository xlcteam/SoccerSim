
/**
 * A worker for asynchronous execution of code which controls the robot.
 *
 */

var gamejs = require('gamejs');
var DummyRobot = require('dummy_robot').DummyRobot;
var robot;

var code = '';

var handleEvent = function(data) {
    var waiter = function(millis){
        var time = Date.now();
        while (Date.now() - time < millis) {
        }
    }
    gamejs.log(data);

    if (data.id) {
        robot = new DummyRobot(data.id);

    } else if (data.sensor_value) {
        robot.sensor_queue.push(data.sensor_value);
        gamejs.log(robot.sensor_queue);
    } 
    if (data.sensor_vals) {
        robot.sensor_vals = data.sensor_vals;
        gamejs.log(robot.sensor_vals);
    } 
    
    if (data.todo) {
        code = data.todo;

        gamejs.log(code);

        eval(code);

    } else {
        gamejs.log('unknown todo', data);
    }
}
gamejs.ready(function() {
    gamejs.onEvent(handleEvent);
});

