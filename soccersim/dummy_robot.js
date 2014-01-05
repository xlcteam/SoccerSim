var gamejs = require('gamejs');

var DummySensor = function(robot, type) {
    this.robot = robot;
    this.type = type
    return ;
}

DummySensor.prototype.read = function() {
    return this.robot.sensor_vals[this.type];
}

var DummyRobot = function(id) {
    this.id = id;

    this.light_sensors = [new DummySensor(this, 'light_sensors[0]'),
                          new DummySensor(this, 'light_sensors[1]')];
    this.ultrasonic_sensors = [new DummySensor(this, 'ultrasonic_sensors[0]'),
                               new DummySensor(this, 'ultrasonic_sensors[1]')];

    this.ir_sensor = new DummySensor(this, 'ir_sensor');

    this.sensor_queue = new Array();
    return this;
};

DummyRobot.prototype.wait = function (millis) {
    var time = Date.now();
    while (Date.now() - time < millis) {}
    this.tick()
}

DummyRobot.prototype.stop = function () {
    return this.send_command('stop()');
}

DummyRobot.prototype.forward = function (speed) {
    return this.send_command('forward(' + speed + ')');
}

DummyRobot.prototype.reverse = function (speed) {
    return this.send_command('reverse(' + speed + ')');
}

DummyRobot.prototype.right = function (speed) {
    return this.send_command('right(' + speed + ')');
}

DummyRobot.prototype.left = function (speed) {
    return this.send_command('left(' + speed + ')');
}

DummyRobot.prototype.forward_right = function (speed) {
    return this.send_command('forward_right(' + speed + ')');
}

DummyRobot.prototype.forward_left = function (speed) {
    return this.send_command('forward_left(' + speed + ')');
}

DummyRobot.prototype.reverse_left = function (speed) {
    return this.send_command('reverse_left(' + speed + ')');
}

DummyRobot.prototype.reverse_right = function (speed) {
    return this.send_command('reverse_right(' + speed + ')');
}

DummyRobot.prototype.log = function (what) {
    return this.send_command('log(\'' + JSON.stringify(what) + '\')');
}

DummyRobot.prototype.send_command = function (command) {
    gamejs.log(command);
    return gamejs.worker.post({code: this.id + '.' + command + ';ticker();' });
}


DummyRobot.prototype.tick = function() {
    return gamejs.worker.post({code: 'ticker();' });
}





exports.DummyRobot = DummyRobot;
