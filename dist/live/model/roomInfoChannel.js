'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _roomInfo = require('./roomInfo');

var _roomInfo2 = _interopRequireDefault(_roomInfo);

var _addrPortsChannel = require('./../constraints/addrPortsChannel');

var _roomLabelsChannel = require('./../constraints/roomLabelsChannel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * RoomInfoChannel
 */
var RoomInfoChannel = function (_RoomInfo) {
  _inherits(RoomInfoChannel, _RoomInfo);

  /**
   *
   * @param playerStatus
   */
  function RoomInfoChannel(playerStatus) {
    _classCallCheck(this, RoomInfoChannel);

    return _possibleConstructorReturn(this, (RoomInfoChannel.__proto__ || Object.getPrototypeOf(RoomInfoChannel)).call(this, playerStatus));
  }

  /**
   *
   * @returns {roomType}
   */


  _createClass(RoomInfoChannel, [{
    key: 'arena',
    value: function arena() {
      return this.roomAddrPort(0);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'a',
    value: function a() {
      return this.roomAddrPort(1);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'b',
    value: function b() {
      return this.roomAddrPort(2);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'c',
    value: function c() {
      return this.roomAddrPort(3);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'd',
    value: function d() {
      return this.roomAddrPort(4);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'e',
    value: function e() {
      return this.roomAddrPort(5);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'black',
    value: function black() {
      return this.roomAddrPort(6);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'black2',
    value: function black2() {
      return this.roomAddrPort(7);
    }

    /**
     *
     * @returns {*[]}
     */

  }, {
    key: 'allRooms',
    value: function allRooms() {
      return [this.arena(), this.a(), this.b(), this.c(), this.d(), this.e(), this.black(), this.black2()];
    }

    /**
     *
     * @param roomLabelIndex
     * @returns {roomType}
     */

  }, {
    key: 'roomAddrPort',
    value: function roomAddrPort(roomLabelIndex) {
      var addrPorts = this.defaultRoomAddrPort(roomLabelIndex);
      if (roomLabelIndex === 0) addrPorts['roomLabel'] = this.community;
      return addrPorts;
    }

    /**
     *
     * @returns {Array.<any>}
     */

  }, {
    key: 'addrPorts',
    value: function addrPorts() {
      return _addrPortsChannel.ADDR_PORTS_CHANNEL;
    }

    /**
     *
     * @returns {Array.<any>}
     */

  }, {
    key: 'roomLabels',
    value: function roomLabels() {
      return _roomLabelsChannel.ROOM_LABELS_CHANNEL;
    }
  }]);

  return RoomInfoChannel;
}(_roomInfo2.default);

exports.default = RoomInfoChannel;
module.exports = exports['default'];