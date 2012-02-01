
var assert = require('assert');

require('amd-loader');

var exec = require('../Source/exec');
var parse = require('../Source/parse');

assert.deepEqual(['+', 3, 2], parse('(+ 3 2)'));
assert.equal(4, exec('(+ 1 3)'));

console.log('no failing assertions');
