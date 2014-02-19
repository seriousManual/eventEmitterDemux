var Emitter = require('events').EventEmitter;

var expect = require('chai').expect;

var Eemdm = require('../');

function expector(number, handler) {
    var i = 0;

    return function () {
        i++;
        if (i === number) {
            return handler();
        } else if (i > number) {
            throw new Error('too much invocations');
        }
    };
}

describe('eemm', function () {
    it('should emit events on child events', function (done) {
        var ee1 = new Emitter();
        var ee2 = new Emitter();

        var eemdmInstance = new Eemdm(ee1, ee2);
        var callExpected = expector(4, done);

        ee1.on('foo', function (a) {
            expect(a).to.equal(1);
            callExpected();
        });

        ee2.on('foo', function (a) {
            expect(a).to.equal(1);
            callExpected();
        });

        eemdmInstance.emit('foo', 1);
        eemdmInstance.emit('foo', 1);
    });

    it('should receive events from child events', function (done) {
        var ee1 = new Emitter();
        var ee2 = new Emitter();

        var eemdmInstance = new Eemdm(ee1, ee2);
        var callExpected = expector(4, done);

        eemdmInstance.on('foo', function (a) {
            expect(a).to.equal(1);
            callExpected();
        });

        ee1.emit('foo', 1);
        ee2.emit('foo', 1);
        ee2.emit('foo', 1);
        ee1.emit('foo', 1);
    });
});