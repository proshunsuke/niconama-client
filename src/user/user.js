// @flow
import rp from 'request-promise';
import { SerializeCookieStore } from 'tough-cookie-serialize';

const LOGIN_URL = 'https://secure.nicovideo.jp/secure/login';

/**
 * User client
 */
export default class User {
  constructor() {
  }

  /**
   *
   * @param email
   * @param password
   * @returns {Promise.<T>}
   */
  login(email: string, password: string): Promise<any> {
    const cookieStore = rp.jar(new SerializeCookieStore);
    return rp.post(LOGIN_URL, {
        resolveWithFullResponse: true,
        followAllRedirects: true,
        jar: cookieStore,
        timeout: 5000,
        form: {
          mail_tel: email,
          password: password
        }
      })
      .then( body => {
        const session = cookieStore._jar.store.findCookie('nicovideo.jp', '/', 'user_session', (err, cookie) => {
          if (err) { return Promise.reject(err); }
          if (typeof cookie === 'undefined') return Promise.reject('Cannot get user session. Please check your email or password.');
          return `user_session=${cookie.value};`;
        });
        return Promise.resolve(session);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
