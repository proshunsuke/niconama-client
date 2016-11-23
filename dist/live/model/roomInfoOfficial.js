'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _roomInfo = require('./roomInfo');

var _roomInfo2 = _interopRequireDefault(_roomInfo);

var _addrPortsOfficial = require('./../constraints/addrPortsOfficial');

var _roomLabelsOfficial = require('./../constraints/roomLabelsOfficial');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * RoomInfoOfficial
 */
var RoomInfoOfficial = function (_RoomInfo) {
  _inherits(RoomInfoOfficial, _RoomInfo);

  /**
   *
   * @param playerStatus
   */
  function RoomInfoOfficial(playerStatus) {
    _classCallCheck(this, RoomInfoOfficial);

    return _possibleConstructorReturn(this, (RoomInfoOfficial.__proto__ || Object.getPrototypeOf(RoomInfoOfficial)).call(this, playerStatus));
  }

  /**
   *
   * @returns {roomType}
   */


  _createClass(RoomInfoOfficial, [{
    key: 'arenaFront',
    value: function arenaFront() {
      return this.roomAddrPort(0);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'arena',
    value: function arena() {
      return this.roomAddrPort(1);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'backArena',
    value: function backArena() {
      return this.roomAddrPort(2);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstCenterFront',
    value: function firstCenterFront() {
      return this.roomAddrPort(3);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstCenterFrontward',
    value: function firstCenterFrontward() {
      return this.roomAddrPort(4);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstCenterBackward',
    value: function firstCenterBackward() {
      return this.roomAddrPort(5);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstRightFrontward',
    value: function firstRightFrontward() {
      return this.roomAddrPort(6);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstRightBackward',
    value: function firstRightBackward() {
      return this.roomAddrPort(7);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstLeftFrontward',
    value: function firstLeftFrontward() {
      return this.roomAddrPort(6);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'firstLeftBackward',
    value: function firstLeftBackward() {
      return this.roomAddrPort(7);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'secondCenterFront',
    value: function secondCenterFront() {
      return this.roomAddrPort(8);
    }

    /**
     *
     * @returns {roomType}
     */

  }, {
    key: 'secondCenterFrontward',
    value: function secondCenterFrontward() {
      return this.roomAddrPort(9);
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
      return [this.arenaFront(), this.arena(), this.backArena(), this.firstCenterFront(), this.firstCenterFrontward(), this.firstCenterBackward(), this.firstRightFrontward(), this.firstRightBackward(), this.firstLeftFrontward(), this.firstLeftBackward(), this.secondCenterFront(), this.secondCenterFrontward(), this.black(), this.black2()];
    }

    /**
     *
     * @returns {Array.<any>}
     */

  }, {
    key: 'addrPorts',
    value: function addrPorts() {
      return _addrPortsOfficial.ADDR_PORTS_OFFICIAL;
    }

    /**
     *
     * @returns {Array.<any>}
     */

  }, {
    key: 'roomLabels',
    value: function roomLabels() {
      return _roomLabelsOfficial.ROOM_LABELS_OFFICIAL;
    }
  }]);

  return RoomInfoOfficial;
}(_roomInfo2.default);

exports.default = RoomInfoOfficial;
module.exports = exports['default'];