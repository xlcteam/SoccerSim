
/**
 * A worker for asynchronous execution of code which controls the robot.
 *
 */

var gamejs = require('gamejs');
var DummyRobot = require('dummy_robot').DummyRobot;

var handleEvent = function(data) {
    var waiter = function(millis){
        var time = Date.now();
        while (Date.now() - time < millis) {
        }
    }

    if (data.todo) {
        var robot = new DummyRobot();
        var code = data.todo;

        //gamejs.log(data);

        try {
            eval(code);
        } catch (e) {
            // Null is thrown for infinite loop.
            // Otherwise, abnormal termination is a user error.
            gamejs.log(e);
        }


    } else {
        gamejs.log('unknown todo');
    }
}
gamejs.ready(function() {
    gamejs.onEvent(handleEvent);
})
