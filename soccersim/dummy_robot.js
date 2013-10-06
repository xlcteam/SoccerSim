var gamejs = require('gamejs');

var DummyRobot = function(id) {
    this.id = id;
    return this;
};

DummyRobot.prototype.wait = function (millis) {
    var time = Date.now();
    while (Date.now() - time < millis) {}
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

DummyRobot.prototype.send_command = function (command) {
    return gamejs.worker.post({code: this.id + '.' + command + ';' });
}



exports.DummyRobot = DummyRobot;
