'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _x2js = require('x2js');

var _x2js2 = _interopRequireDefault(_x2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    _classCallCheck(this, Common);
  }

  _createClass(Common, [{
    key: 'construct',
    value: function construct() {}

    /**
     *
     * @param room
     * @returns {*}
     */

  }], [{
    key: 'getThread',
    value: function getThread(room) {
      return room['thread'];
    }

    /**
     *
     * @param xmlString
     */

  }, {
    key: 'xmlToJson',
    value: function xmlToJson(xmlString) {
      var x2js = new _x2js2.default();
      return x2js.xml2js(xmlString);
    }
  }]);

  return Common;
}();

exports.default = Common;
module.exports = exports['default'];