// @flow
import User from './user/user';
import Live from './live/live';
import LiveCommentStream from './live/commentStream/liveCommentStream';

export default class NiconamaClient{
  liveClient: Live;
  constructor() {}

  login(email: string, password: string): Promise<any> {
    const userClient = new User();
    return userClient.login(email, password);
  }

  setLiveInfo(liveId: string, session: string) {
    this.liveClient = new Live(liveId, session);
  }

  createLiveCommentStream(): LiveCommentStream {
    if (!this.liveClient) throw new Error('Live instance is not defined');
    return this.liveClient.getCommentStream();
  }

  liveComments(): Promise<any> {
    if (!this.liveClient) Promise.reject('Live instance is not defined');
    return this.liveClient.comments();
  }

  doLiveComment(comment: string, option: string): Promise<any> {
    if (!this.liveClient) Promise.reject('Live instance is not defined');
    return this.liveClient.doComment(comment, option);
  }
}
