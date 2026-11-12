'use strict';
// Shim de buffer-equal-constant-time para Node >= 25, donde buffer.SlowBuffer fue eliminado.
// Misma API que el original: bufferEq(a, b), bufferEq.install(), bufferEq.restore().
var Buffer = require('buffer').Buffer;
var timingSafeEqual = require('crypto').timingSafeEqual;

function bufferEq(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

var origBufEqual = Buffer.prototype.equal;

bufferEq.install = function () {
  Buffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
};

bufferEq.restore = function () {
  Buffer.prototype.equal = origBufEqual;
};

module.exports = bufferEq;
