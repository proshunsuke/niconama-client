// @flow
import userClient from './user';
import liveClient from './live';

export default class NicoClient {
  constructor() {}

  login(email: string, password: string) {
    const client = new userClient();
    return client.login(email, password);
  }

  liveComments(liveId: string, session: string, callback: any) {
    const client = new liveClient();
    return client.comments(liveId, session, callback);
  }

  doLiveComment(liveId: string, session: string) {
    const client: liveClient = new liveClient();
    return client.doComment(liveId, session);
  }
}
