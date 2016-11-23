'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./user/user');

var _user2 = _interopRequireDefault(_user);

var _live = require('./live/live');

var _live2 = _interopRequireDefault(_live);

var _liveCommentStream = require('./live/commentStream/liveCommentStream');

var _liveCommentStream2 = _interopRequireDefault(_liveCommentStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * NiconamaClient
 */
var NiconamaClient = function () {
  function NiconamaClient() {
    _classCallCheck(this, NiconamaClient);
  }

  /**
   *
   * login to niconico. and receive session
   *
   * @param email
   * @param password
   * @returns {Promise.<any>}
   */


  _createClass(NiconamaClient, [{
    key: 'login',
    value: function login(email, password) {
      var userClient = new _user2.default();
      return userClient.login(email, password);
    }

    /**
     *
     * create Live instance with liveId and session
     *
     * liveId is the string starting with "lv" in niconico live URL
     * ex. http://live.nicovideo.jp/watch/lv0000000
     * in this case, "lv0000000" is the liveId
     *
     * session is string which is received after login
     *
     * @param liveId
     * @param session
     */

  }, {
    key: 'setLiveInfo',
    value: function setLiveInfo(liveId, session) {
      this.liveClient = new _live2.default(liveId, session);
    }

    /**
     *
     * get comments from niconico comment servers
     *
     * @returns {Promise.<any>}
     */

  }, {
    key: 'liveComments',
    value: function liveComments() {
      if (!this.liveClient) Promise.reject('Live instance is not defined');
      return this.liveClient.comments();
    }

    /**
     *
     * create LiveCommentStream instance
     *
     * call this method after calling liveComments()
     *
     * @returns {LiveCommentStream}
     */

  }, {
    key: 'createLiveCommentStream',
    value: function createLiveCommentStream() {
      if (!this.liveClient) throw new Error('Live instance is not defined');
      return this.liveClient.getCommentStream();
    }

    /**
     *
     * do comment to niconico live broadcast
     *
     * call this method after calling liveComments()
     *
     * options argument is a string with space separator. ex: "184 red big"
     * options are is below
     *
     * ****************************************************************************************************************
     * size: small, big
     * vertical position: ue/top, shita/bottom
     * horizontal position: migi/right, hidari/left
     * color:
     *  not premium: white, red, green, blue, cyan, yellow, purple, pink, orange
     *  premium or broadcaster: niconicowhite/white2, marineblue/blue2, madyellow/yellow2,
     *                          passionorange/orange2, nobleviolet/purple2, elementalgreen/green2, truered/red2, black
     *  psyllium: fred, fpink, faqua, fblue, fyellow, fgreen, forange
     * other: 184, hidden
     * ****************************************************************************************************************
     *
     * @param comment
     * @param option
     * @returns {Promise.<any>}
     */

  }, {
    key: 'doLiveComment',
    value: function doLiveComment(comment, option) {
      if (!this.liveClient) Promise.reject('Live instance is not defined');
      return this.liveClient.doComment(comment, option);
    }
  }]);

  return NiconamaClient;
}();

exports.default = NiconamaClient;
module.exports = exports['default'];