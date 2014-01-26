var Emitter = require('events').EventEmitter;

var expect = require('chai').expect;

var Eemdm = require('../');

describe('eemm', function () {
    it('should foo', function (done) {
        var expected = {exp: 'ected'};
        var ee1 = new Emitter();
        var eemdmInstance = new Eemdm(ee1);

        ee1.on('foo', function (actual) {
            expect(actual).to.equal(expected);

            done();
        });

        eemdmInstance.emit('foo', expected);
    });
});