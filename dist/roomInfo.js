'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addrPorts = require('./addrPorts');

var _roomLabels = require('./roomLabels');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomInfo = function () {
  function RoomInfo(playerStatus) {
    _classCallCheck(this, RoomInfo);

    this.thread = Number(playerStatus['ms']['thread']);
    this.community = playerStatus['stream']['default_community'];
    this.setCurrentRoomIndex(playerStatus['user']['room_label']);
    this.setCurrentAddrPortIndex(playerStatus['ms']['addr'], Number(playerStatus['ms']['port']));
  }

  _createClass(RoomInfo, [{
    key: 'current',
    value: function current() {
      return this.roomAddrPort(this.currentRoomIndex);
    }
  }, {
    key: 'arena',
    value: function arena() {
      var room = this.roomAddrPort(0);
      room['roomLabel'] = this.community;
      return room;
    }
  }, {
    key: 'a',
    value: function a() {
      return this.roomAddrPort(1);
    }
  }, {
    key: 'b',
    value: function b() {
      return this.roomAddrPort(2);
    }
  }, {
    key: 'c',
    value: function c() {
      return this.roomAddrPort(3);
    }
  }, {
    key: 'd',
    value: function d() {
      return this.roomAddrPort(4);
    }
  }, {
    key: 'e',
    value: function e() {
      return this.roomAddrPort(5);
    }
  }, {
    key: 'f',
    value: function f() {
      return this.roomAddrPort(6);
    }
  }, {
    key: 'g',
    value: function g() {
      return this.roomAddrPort(7);
    }
  }, {
    key: 'h',
    value: function h() {
      return this.roomAddrPort(8);
    }
  }, {
    key: 'i',
    value: function i() {
      return this.roomAddrPort(9);
    }
  }, {
    key: 'roomAddrPort',
    value: function roomAddrPort(roomLabelIndex) {
      var addrPorts = _addrPorts.ADDR_PORTS[this.currentAddrPortIndex - this.currentRoomIndex + roomLabelIndex];
      addrPorts['roomLabel'] = String(_roomLabels.ROOM_LABELS[roomLabelIndex]).substr(2, String(_roomLabels.ROOM_LABELS[roomLabelIndex]).length - 4);
      addrPorts['thread'] = this.thread - this.currentRoomIndex + roomLabelIndex;
      return addrPorts;
    }
  }, {
    key: 'setCurrentRoomIndex',
    value: function setCurrentRoomIndex(roomLabel) {
      for (var i = 0; i < _roomLabels.ROOM_LABELS.length; i++) {
        if (roomLabel.match(_roomLabels.ROOM_LABELS[i])) {
          this.currentRoomIndex = i;
        }
      }
    }
  }, {
    key: 'setCurrentAddrPortIndex',
    value: function setCurrentAddrPortIndex(addr, port) {
      for (var i = 0; i < _addrPorts.ADDR_PORTS.length; i++) {
        if (_addrPorts.ADDR_PORTS[i]['addr'] === addr && _addrPorts.ADDR_PORTS[i]['port'] === port) {
          this.currentAddrPortIndex = i;
          break;
        }
      }
    }
  }]);

  return RoomInfo;
}();

exports.default = RoomInfo;
module.exports = exports['default'];