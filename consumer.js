var Emitter = require('events').EventEmitter;

var EeDemux = require('./');

var ee1 = new Emitter();
var ee2 = new Emitter();

var myDemuxed = new EeDemux(ee1, ee2);

ee1.on('bax', function() {
    console.log('ee1 bax');
});

ee2.on('bax', function() {
    console.log('ee2 bax');
});

myDemuxed.on('foo', function() {
    console.log('demux foo');
});

ee1.emit('foo');
ee2.emit('foo');

myDemuxed.emit('bax');