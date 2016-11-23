'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _roomInfo = require('../model/roomInfo');

var _roomInfo2 = _interopRequireDefault(_roomInfo);

var _roomInfoCommunity = require('../model/roomInfoCommunity');

var _roomInfoCommunity2 = _interopRequireDefault(_roomInfoCommunity);

var _roomInfoChannel = require('../model/roomInfoChannel');

var _roomInfoChannel2 = _interopRequireDefault(_roomInfoChannel);

var _roomInfoOfficial = require('../model/roomInfoOfficial');

var _roomInfoOfficial2 = _interopRequireDefault(_roomInfoOfficial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * RoomInfoFactory
 */
var RoomInfoFactory = function () {
  function RoomInfoFactory() {
    _classCallCheck(this, RoomInfoFactory);
  }

  /**
   *
   * according to providerType, return each RoomInfo instance
   *
   * @param playerStatus
   * @returns {*}
   */


  _createClass(RoomInfoFactory, null, [{
    key: 'createRoomInfo',
    value: function createRoomInfo(playerStatus) {
      var providerType = playerStatus['stream']['provider_type'];
      if (providerType === 'community') return new _roomInfoCommunity2.default(playerStatus);
      if (providerType === 'channel') return new _roomInfoChannel2.default(playerStatus);
      if (providerType === 'official') return new _roomInfoOfficial2.default(playerStatus);
      throw new Error('Unknown provider type error. provider type: ' + providerType);
    }
  }]);

  return RoomInfoFactory;
}();

exports.default = RoomInfoFactory;
module.exports = exports['default'];