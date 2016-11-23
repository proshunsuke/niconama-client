'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _circularArray = require('../lib/circularArray');

var _circularArray2 = _interopRequireDefault(_circularArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * RoomInfo
 * this is RoomInfo base class. extends this class, and use it
 */
var RoomInfo = function () {

  /**
   *
   * @param playerStatus
   */
  function RoomInfo(playerStatus) {
    _classCallCheck(this, RoomInfo);

    this.thread = Number(playerStatus['ms']['thread']);
    this.community = playerStatus['stream']['default_community'];
    this.setCurrentRoomIndex(playerStatus['user']['room_label']);
    this.setCurrentAddrPortIndex(playerStatus['ms']['addr'], Number(playerStatus['ms']['port']));
  }

  /**
   *
   * @returns {roomType}
   */


  _createClass(RoomInfo, [{
    key: 'current',
    value: function current() {
      return this.roomAddrPort(this.currentRoomIndex);
    }

    /**
     *
     * @param roomLabelIndex
     * @returns {roomType}
     */

  }, {
    key: 'roomAddrPort',
    value: function roomAddrPort(roomLabelIndex) {
      return this.defaultRoomAddrPort(roomLabelIndex);
    }

    /**
     *
     * @param roomLabelIndex
     * @returns {any}
     */

  }, {
    key: 'defaultRoomAddrPort',
    value: function defaultRoomAddrPort(roomLabelIndex) {
      var arenaFrontIndex = this.currentAddrPortIndex - this.currentRoomIndex;
      var currentAddrPorts = _circularArray2.default.get(this.addrPorts(), arenaFrontIndex + roomLabelIndex);
      currentAddrPorts['roomLabel'] = String(this.roomLabels()[roomLabelIndex]).substr(2, String(this.roomLabels()[roomLabelIndex]).length - 4);
      currentAddrPorts['thread'] = this.thread - this.currentRoomIndex + roomLabelIndex;
      currentAddrPorts['isCurrent'] = this.currentRoomIndex === roomLabelIndex;
      return currentAddrPorts;
    }

    /**
     *
     * @param roomLabel
     */

  }, {
    key: 'setCurrentRoomIndex',
    value: function setCurrentRoomIndex(roomLabel) {
      for (var i = 0; i < this.roomLabels().length; i++) {
        if (roomLabel.match(this.roomLabels()[i])) {
          this.currentRoomIndex = i;
        }
      }
    }

    /**
     *
     * @param addr
     * @param port
     */

  }, {
    key: 'setCurrentAddrPortIndex',
    value: function setCurrentAddrPortIndex(addr, port) {
      for (var i = 0; i < this.addrPorts().length; i++) {
        if (this.addrPorts()[i]['addr'] === addr && this.addrPorts()[i]['port'] === port) {
          this.currentAddrPortIndex = i;
          break;
        }
      }
    }
  }, {
    key: 'allRooms',
    value: function allRooms() {
      throw new Error('Not implemented error');
    }
  }, {
    key: 'addrPorts',
    value: function addrPorts() {
      throw new Error('Not implemented error');
    }
  }, {
    key: 'roomLabels',
    value: function roomLabels() {
      throw new Error('Not implemented error');
    }
  }]);

  return RoomInfo;
}();

exports.default = RoomInfo;
module.exports = exports['default'];