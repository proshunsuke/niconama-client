// @flow
import NiconamaClient from '../src/niconamaClient'

const liveId: string = process.argv[2];
const session: string = process.argv[3];

//if (typeof(liveId) === 'undefined' || typeof(session) === 'undefined') {
//  throw new Error('Invalid parameter error. Please check parameters liveId or session.');
//}

const client: NiconamaClient = new NiconamaClient();
//client.doLiveComment(liveId, session)
//  .then( data => {
//    console.log('成功');
//    console.log(data);
//  })
//  .catch( err => {
//    console.log('eraaaa');
//    console.log(err);
//  })
//;

client.doLiveComment(liveId, session, data => {
  console.log('doLiveCommentのコールバックの中');
  console.log(data);
  console.log('コメント投稿に成功');
});
