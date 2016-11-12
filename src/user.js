// @flow
import rp from 'request-promise';
import { SerializeCookieStore } from 'tough-cookie-serialize';

export const LOGIN_URL = 'https://secure.nicovideo.jp/secure/login';

export default class User {
  constructor() {
  }
  login(email: string, password: string) {
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
      .then((body) => {
        const session = cookieStore._jar.store.findCookie('nicovideo.jp', '/', 'user_session', (err, cookie) => {
          if (cookie) { return `user_session=${cookie.value};`; }
          if (err) { return Promise.reject(err); }
          return Promise.reject('Cannot get user session. Please check your email or password.');
        });
        return Promise.resolve(session);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
