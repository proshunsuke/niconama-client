'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _live = require('./live');

var _live2 = _interopRequireDefault(_live);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NicoClient = function () {
  function NicoClient() {
    _classCallCheck(this, NicoClient);
  }

  _createClass(NicoClient, [{
    key: 'login',
    value: function login(email, password) {
      var client = new _user2.default();
      return client.login(email, password);
    }
  }, {
    key: 'liveComments',
    value: function liveComments(liveId, session, callback) {
      var client = new _live2.default();
      return client.comments(liveId, session, callback);
    }
  }]);

  return NicoClient;
}();

exports.default = NicoClient;
module.exports = exports['default'];