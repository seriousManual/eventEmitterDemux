var util = require('util');
var Emitter = require('events').EventEmitter;

function EeDemux() {
    Emitter.call(this);

    this._emitters = [];

    for(var i = 0; i < arguments.length; i++) {
        this._emitters.push(arguments[i]);
    }

    var that = this;

    this.on('newListener', function(eventName, handler) {
        if(handler._preventListen) return;
        handler._preventListen = true;

        this._emitters.forEach(function(emitter) {
            emitter.on(eventName, handler);
        });
    });

    this._emitters.forEach(function(emitter) {
        emitter.on('newListener', function(eventName, handler) {
            if(handler._preventListen) return;
            handler._preventListen = true;

            that.on(eventName, handler);
        });
    });
}

util.inherits(EeDemux, Emitter);

module.exports = EeDemux;