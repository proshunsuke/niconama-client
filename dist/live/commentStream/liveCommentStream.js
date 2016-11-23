'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('stream');

var _commentInfo = require('../model/commentInfo');

var _commentInfo2 = _interopRequireDefault(_commentInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * LiveCommentStream
 */
var LiveCommentStream = function (_Duplex) {
  _inherits(LiveCommentStream, _Duplex);

  /**
   *
   * @param options
   */
  function LiveCommentStream(options) {
    _classCallCheck(this, LiveCommentStream);

    var _this = _possibleConstructorReturn(this, (LiveCommentStream.__proto__ || Object.getPrototypeOf(LiveCommentStream)).call(this, options));

    if (!options) options = {};
    options.objectMode = true;
    if (_stream.Duplex instanceof Function) _stream.Duplex.call(_this, options);
    return _this;
  }

  /**
   *
   * @param chunk
   * @param encoding
   * @param callback
   * @private
   */


  _createClass(LiveCommentStream, [{
    key: '_write',
    value: function _write(chunk, encoding, callback) {
      this.push(chunk);
      callback();
    }

    /**
     *
     * @param size
     * @private
     */

  }, {
    key: '_read',
    value: function _read(size) {}

    /**
     *
     * @param chat
     * @param room
     */

  }, {
    key: 'writeComment',
    value: function writeComment(chat, room) {
      this.write(this.getCommentInfo(chat, room));
    }

    /**
     *
     * @param chat
     * @param room
     * @returns {CommentInfo}
     */

  }, {
    key: 'getCommentInfo',
    value: function getCommentInfo(chat, room) {
      return new _commentInfo2.default(chat['_thread'], chat['_no'], chat['_vpos'], chat['_date'], chat['_date_usec'], chat['_mail'], chat['_user_id'], chat['_premium'], chat['_anonymity'], chat['_locale'], chat['_score'], chat['_yourpost'], chat['_deleted'], chat['_origin'], chat['__text'], room['roomLabel']);
    }
  }]);

  return LiveCommentStream;
}(_stream.Duplex);

exports.default = LiveCommentStream;
module.exports = exports['default'];