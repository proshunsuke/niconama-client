// @flow
import NiconamaClient from '../src/niconamaClient'

const liveId: string = process.argv[2];
const session: string = process.argv[3];
const comment: string = process.argv[4];

if (typeof(liveId) === 'undefined' || typeof(session) === 'undefined' || typeof(comment) === 'undefined') {
  throw new Error('Invalid parameter error. Please check parameters liveId or session or comment.');
}

const client: NiconamaClient = new NiconamaClient();

client.doLiveComment(liveId, session, comment)
  .then(data => {
    console.log('コメント投稿に成功');
    console.log(data);
  })
  .catch(err => {
    console.log('コメント投稿に失敗');
    console.log(err);
  });
