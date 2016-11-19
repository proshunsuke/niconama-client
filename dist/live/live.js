'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _roomInfo = require('./model/roomInfo');

var _roomInfo2 = _interopRequireDefault(_roomInfo);

var _liveCommentStream = require('./commentStream/liveCommentStream');

var _liveCommentStream2 = _interopRequireDefault(_liveCommentStream);

var _doComment = require('./doComment/doComment');

var _doComment2 = _interopRequireDefault(_doComment);

var _common = require('./lib/common');

var _common2 = _interopRequireDefault(_common);

var _roomInfoFactory = require('./lib/roomInfoFactory');

var _roomInfoFactory2 = _interopRequireDefault(_roomInfoFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GET_PLAYERSTATUS_URL = 'http://watch.live.nicovideo.jp/api/getplayerstatus';

/**
 *
 * Live client
 */

var Live = function () {

  /**
   *
   * @param liveId
   * @param session
   */
  function Live(liveId, session) {
    _classCallCheck(this, Live);

    this.liveId = liveId;
    this.session = session;
    this.isAlreadyGetComments = false;
  }

  /**
   *
   * @returns {LiveCommentStream}
   */


  _createClass(Live, [{
    key: 'getCommentStream',
    value: function getCommentStream() {
      return this.commentStream = new _liveCommentStream2.default();
    }

    /**
     *
     * @param comment
     * @param option
     * @returns {Promise.<any>}
     */

  }, {
    key: 'doComment',
    value: function doComment(comment, option) {
      return _doComment2.default.doComment(this.currentViewer, this.playerStatus, this.session, comment, option);
    }

    /**
     *
     * connect to niconico comment servers
     *
     * @returns {Promise.<any>}
     */

  }, {
    key: 'comments',
    value: function comments() {
      var _this = this;

      if (this.isAlreadyGetComments) return Promise.resolve();
      return this.getPlayerStatus().then(function (xmlString) {
        _this.playerStatus = _common2.default.xmlToJson(xmlString)['getplayerstatus'];
        if (_this.playerStatus['_status'] === 'fail') return Promise.reject('Status fail. This live broadcast is ended');
        return Promise.resolve();
      }).then(function () {
        var room = _roomInfoFactory2.default.createRoomInfo(_this.playerStatus);
        return Promise.all(room.allRooms().map(function (r) {
          return _this.connectServer(r);
        }));
      }).then(function (result) {
        _this.isAlreadyGetComments = true;
        return Promise.resolve();
      });
    }

    /**
     *
     * @param room
     * @returns {Promise}
     */

  }, {
    key: 'connectServer',
    value: function connectServer(room) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.connectServerCallback(room, function (viewer, data) {
          var connectInfo = _common2.default.xmlToJson(data);
          // When there is thread information, ignore it since it is just after receiving comment server information
          if (typeof connectInfo['thread'] !== 'undefined') return resolve();
          var chat = connectInfo['chat'];
          if (typeof chat === 'undefined') return resolve();
          if (_this2.commentStream) _this2.commentStream.writeComment(chat, room);
          return resolve();
        });
      });
    }

    /**
     *
     * @param room
     * @param callback
     * @returns {*}
     */

  }, {
    key: 'connectServerCallback',
    value: function connectServerCallback(room, callback) {
      var viewer = _net2.default.connect(room['port'], room['addr']);
      if (room['isCurrent']) this.currentViewer = viewer; // set current room connect infomation
      return viewer.on('connect', function (data) {
        viewer.setEncoding('utf-8');
        // write thread informations, and receive comment server information
        viewer.write('<thread thread="' + _common2.default.getThread(room) + '" res_from="-5" version="20061206" />\0');
        viewer.on('data', function (data) {
          callback(viewer, data);
        });
      });
    }

    /**
     *
     * @returns {Promise.<T>|*}
     */

  }, {
    key: 'getPlayerStatus',
    value: function getPlayerStatus() {
      return (0, _requestPromise2.default)({
        uri: GET_PLAYERSTATUS_URL,
        qs: {
          v: this.liveId
        },
        headers: {
          Cookie: this.session
        }
      }).then(function (xmlString) {
        return Promise.resolve(xmlString);
      });
    }
  }]);

  return Live;
}();

exports.default = Live;
module.exports = exports['default'];