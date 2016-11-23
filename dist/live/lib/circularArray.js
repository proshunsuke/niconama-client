'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CircularArray = function () {
  function CircularArray() {
    _classCallCheck(this, CircularArray);
  }

  _createClass(CircularArray, [{
    key: 'construct',
    value: function construct() {}

    /**
     *
     * @param list
     * @param num
     * @returns {any}
     */

  }], [{
    key: 'get',
    value: function get(list, num) {
      if (list.length === 0) throw new Error('Array length is should be greater then 0');
      var surplusNum = num % list.length;
      if (surplusNum >= 0) {
        return list[surplusNum];
      } else {
        return list[surplusNum + list.length];
      }
    }
  }]);

  return CircularArray;
}();

exports.default = CircularArray;
module.exports = exports['default'];