// @flow
import User from './user/user';
import Live from './live/live';
import LiveCommentStream from './live/commentStream/liveCommentStream';

/**
 * NiconamaClient
 */
export default class NiconamaClient{
  liveClient: Live;
  constructor() {}

  /**
   *
   * login to niconico. and receive session
   *
   * @param email
   * @param password
   * @returns {Promise.<any>}
   */
  login(email: string, password: string): Promise<any> {
    const userClient = new User();
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
  setLiveInfo(liveId: string, session: string) {
    this.liveClient = new Live(liveId, session);
  }

  /**
   *
   * get comments from niconico comment servers
   *
   * @returns {Promise.<any>}
   */
  liveComments(): Promise<any> {
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
  createLiveCommentStream(): LiveCommentStream {
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
  doLiveComment(comment: string, option: string = ''): Promise<any> {
    if (!this.liveClient) Promise.reject('Live instance is not defined');
    return this.liveClient.doComment(comment, option);
  }
}
