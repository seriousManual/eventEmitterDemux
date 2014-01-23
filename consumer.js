var Emitter = require('events').EventEmitter;

var EeDemux = require('./');

var ee1 = new Emitter();
var ee2 = new Emitter();

var myDemuxed = new EeDemux(ee1, ee2);

myDemuxed.on('foo', function() {
    console.log('foo');
});

myDemuxed.on('bar', function() {
    console.log('bar');
});

ee1.emit('foo');
ee1.emit('bar');
ee2.emit('foo');
ee2.emit('bar');
ee2.emit('bar');