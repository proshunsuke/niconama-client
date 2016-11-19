'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_PLAYERSTATUS_URL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _toughCookieSerialize = require('tough-cookie-serialize');

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _x2js = require('x2js');

var _x2js2 = _interopRequireDefault(_x2js);

var _commentInfo = require('./commentInfo');

var _commentInfo2 = _interopRequireDefault(_commentInfo);

var _roomInfo = require('./roomInfo');

var _roomInfo2 = _interopRequireDefault(_roomInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GET_PLAYERSTATUS_URL = exports.GET_PLAYERSTATUS_URL = 'http://watch.live.nicovideo.jp/api/getplayerstatus';

var Live = function () {
  function Live() {
    _classCallCheck(this, Live);
  }

  _createClass(Live, [{
    key: 'comments',
    value: function comments(liveId, session, callback) {
      var _this = this;

      return this.getPlayerStatus(liveId, session).then(function (playerStatus) {
        if (playerStatus['_status'] === 'fail') {
          throw ReferenceError('status fail.');
        }
        var room = new _roomInfo2.default(playerStatus);
        _this.callbackComments(room.arena(), callback);
        _this.callbackComments(room.a(), callback);
        _this.callbackComments(room.b(), callback);
        _this.callbackComments(room.c(), callback);
        _this.callbackComments(room.d(), callback);
        _this.callbackComments(room.e(), callback);
        _this.callbackComments(room.f(), callback);
        _this.callbackComments(room.g(), callback);
        _this.callbackComments(room.h(), callback);
        _this.callbackComments(room.i(), callback);
      });
    }
  }, {
    key: 'callbackComments',
    value: function callbackComments(room, callback) {
      var _this2 = this;

      var viewer = this.connectRoom(room);
      viewer.on('connect', function (data) {
        viewer.setEncoding('utf-8');
        viewer.write('<thread thread="' + _this2.getThread(room) + '" res_from="-5" version="20061206" />\0');
        viewer.on('data', function (data) {
          var chat = _this2.xmlToJson(data)['chat'];
          if (typeof chat === 'undefined') {
            return;
          }
          callback(_this2.getCommentInfo(chat, room));
        });
      });
    }
  }, {
    key: 'connectRoom',
    value: function getViewer(room) {
      return _net2.default.connect(room['port'], room['addr']);
    }
  }, {
    key: 'getThread',
    value: function getThread(room) {
      return room['thread'];
    }
  }, {
    key: 'getCommentInfo',
    value: function getCommentInfo(chat, room) {
      return new _commentInfo2.default(chat['_thread'], chat['_no'], chat['_vpos'], chat['_date'], chat['_date_usec'], chat['_mail'], chat['_user_id'], chat['_premium'], chat['_anonymity'], chat['_locale'], chat['_score'], chat['_yourpost'], chat['_deleted'], chat['__text'], room['roomLabel']);
    }
  }, {
    key: 'getPlayerStatus',
    value: function getPlayerStatus(liveId, session) {
      return (0, _requestPromise2.default)({
        uri: GET_PLAYERSTATUS_URL,
        qs: {
          v: liveId
        },
        headers: {
          Cookie: session
        }
      }).then(function (xmlString) {
        var x2js = new _x2js2.default();
        var playerStatus = x2js.xml2js(xmlString)['getplayerstatus'];
        return Promise.resolve(playerStatus);
      }).catch(function (err) {
        return Promise.reject(err);
      });
    }
  }, {
    key: 'xmlToJson',
    value: function getConnectInfo(connectInfoXml) {
      var x2js = new _x2js2.default();
      return x2js.xml2js(connectInfoXml);
    }
  }]);

  return Live;
}();

exports.default = Live;
