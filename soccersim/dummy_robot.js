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

DummyRobot.prototype.send_command = function (command) {
    return gamejs.worker.post({code: this.id + '.' + command + ';' });
}


exports.DummyRobot = DummyRobot;
