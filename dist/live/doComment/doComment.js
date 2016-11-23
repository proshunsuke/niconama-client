'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _roomInfo = require('../model/roomInfo');

var _roomInfo2 = _interopRequireDefault(_roomInfo);

var _common = require('../lib/common');

var _common2 = _interopRequireDefault(_common);

var _roomInfoFactory = require('../lib/roomInfoFactory');

var _roomInfoFactory2 = _interopRequireDefault(_roomInfoFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GET_POSTKEY_URL = 'http://live.nicovideo.jp/api/getpostkey';

/**
 *
 * DoComment
 */

var DoComment = function () {
  function DoComment() {
    _classCallCheck(this, DoComment);
  }

  /**
   *
   * do comment with options
   *
   * @param currentViewer
   * @param playerStatus
   * @param session
   * @param comment
   * @param option
     * @returns {Promise}
   */


  _createClass(DoComment, null, [{
    key: 'doComment',
    value: function doComment(currentViewer, playerStatus, session, comment, option) {
      var _this = this;

      var room = _roomInfoFactory2.default.createRoomInfo(playerStatus);
      var currentRoom = room.current();
      return new Promise(function (resolve, reject) {
        var isReady = true; // for waiting for receiving do comment response
        currentViewer.write('<thread thread="' + _common2.default.getThread(currentRoom) + '" res_from="-5" version="20061206" />\0');
        currentViewer.on('data', function (data) {
          if (!isReady) return;
          var chatResult = _common2.default.xmlToJson(data)['chat_result'];
          if (chatResult) {
            isReady = true;
            if (chatResult['_status'] !== '0') return reject('Failed to o comment. status: ' + chatResult['_status']);
            return resolve(chatResult);
          }
          var threadInfo = _common2.default.xmlToJson(data)['thread'];
          if (typeof threadInfo === 'undefined') return;
          isReady = false;
          return _this.getPostkey(threadInfo, session).then(function (postKey) {
            currentViewer.write(_this.commentRequestContent(playerStatus, postKey, comment, option));
          });
        });
      });
    }

    /**
     *
     * @param playerStatus
     * @param postKey
     * @param comment
     * @param option
       * @returns {*}
     */

  }, {
    key: 'commentRequestContent',
    value: function commentRequestContent(playerStatus, postKey, comment, option) {
      var date = new Date();
      var unixTimestamp = date.getTime();
      var startTime = playerStatus['stream']['start_time'];
      var vpos = unixTimestamp - startTime;
      var ticket = playerStatus['rtmp']['ticket'];
      var userId = playerStatus['user']['user_id'];
      var isPremium = playerStatus['user']['is_premium'];
      var thread = playerStatus['ms']['thread'];
      return '<chat thread="' + thread + '" ticket="' + ticket + '" vpos="' + vpos + '" postkey="' + postKey + '" mail="' + option + '" user_id="' + userId + '" premium="' + isPremium + '">' + comment + '</chat>\0';
    }

    /**
     *
     * @param threadInfo
     * @param session
     * @returns {Promise.<T>|*}
     */

  }, {
    key: 'getPostkey',
    value: function getPostkey(threadInfo, session) {
      var thread = threadInfo['_thread'];
      var lastRes = threadInfo['_last_res'] || 0;
      var blockNo = Math.floor(lastRes / 100);
      return (0, _requestPromise2.default)({
        uri: GET_POSTKEY_URL,
        qs: {
          thread: thread,
          block_no: blockNo
        },
        headers: {
          Cookie: session
        }
      }).then(function (response) {
        return Promise.resolve(response.slice(8, response.length));
      });
    }
  }]);

  return DoComment;
}();

exports.default = DoComment;
module.exports = exports['default'];