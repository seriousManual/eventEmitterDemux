var util = require('util');

function EeDemux() {
    this._emitters = [];

    for (var i = 0; i < arguments.length; i++) {
        this._emitters.push(arguments[i]);
    }
}

EeDemux.prototype.emit = function (name) {
    var args = Array.prototype.splice.call(arguments, 0);

    this._emitters.forEach(function(emitter) {
        emitter.emit.apply(emitter, args);
    });
};

EeDemux.prototype.on = function(name, handler) {
    this._emitters.forEach(function(emitter) {
        emitter.on(name, handler);
    });
};

module.exports = EeDemux;