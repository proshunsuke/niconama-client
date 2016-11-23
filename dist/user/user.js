'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _toughCookieSerialize = require('tough-cookie-serialize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOGIN_URL = 'https://secure.nicovideo.jp/secure/login';

/**
 * User client
 */

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  /**
   *
   * @param email
   * @param password
   * @returns {Promise.<T>}
   */


  _createClass(User, [{
    key: 'login',
    value: function login(email, password) {
      var cookieStore = _requestPromise2.default.jar(new _toughCookieSerialize.SerializeCookieStore());
      return _requestPromise2.default.post(LOGIN_URL, {
        resolveWithFullResponse: true,
        followAllRedirects: true,
        jar: cookieStore,
        timeout: 5000,
        form: {
          mail_tel: email,
          password: password
        }
      }).then(function (body) {
        var session = cookieStore._jar.store.findCookie('nicovideo.jp', '/', 'user_session', function (err, cookie) {
          if (err) {
            return Promise.reject(err);
          }
          if (typeof cookie === 'undefined') return Promise.reject('Cannot get user session. Please check your email or password.');
          return 'user_session=' + cookie.value + ';';
        });
        return Promise.resolve(session);
      }).catch(function (err) {
        return Promise.reject(err);
      });
    }
  }]);

  return User;
}();

exports.default = User;
module.exports = exports['default'];