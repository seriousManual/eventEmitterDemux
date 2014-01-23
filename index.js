var util = require('util');
var Emitter = require('events').EventEmitter;

function EeDemux() {
    Emitter.call(this);

    this._emitters = [];

    for(var i = 0; i < arguments.length; i++) {
        this._emitters.push(arguments[i]);
    }

    this.on('newListener', function(eventName, handler) {
        this._emitters.forEach(function(emitter) {
            emitter.on(eventName, handler);
        });
    });

    this.on('removeListener', function(eventName, handler) {
        this._emitters.foreach(function(emitter) {
            emitter.removeListener(eventName, handler);
        });
    });
}

util.inherits(EeDemux, Emitter);

module.exports = EeDemux;