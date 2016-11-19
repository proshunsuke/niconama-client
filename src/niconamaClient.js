// @flow
import User from './user';
import Live from './live';
import LiveCommentStream from './liveCommentStream';

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

  createCommentStream(): LiveCommentStream {
    if (!this.liveClient) throw new Error('Live instance is not defined');
    return this.liveClient.getCommentStream();
  }

  liveComments(): Promise<any> {
    if (!this.liveClient) throw new Error('Live instance is not defined');
    return this.liveClient.comments();

    //return this.liveClient.rpResult()
    //  .then(xmlString => { return this.liveClient.comments(xmlString) })
    //  .catch( err => {
    //    return Promise.reject(err);
    //  })
  }

  //doLiveComment(liveId: string, session: string, comment: string) {
  //  return this.liveClient.rpResult(liveId, session)
  //    .then(xmlString => { return this.liveClient.liveInfo(xmlString) })
  //    .then( data => { return this.liveClient.testDoComment(comment) })
  //    .then( data => {
  //      return Promise.resolve(data);
  //    })
  //    .catch( err => {
  //      return Promise.reject(err);
  //    })
  //    ;
  //}
}
