// @flow
import NicoClient from '../src/niconamaClient'

const liveId: string = process.argv[2];
const session: string = process.argv[3];

if (typeof(liveId) === 'undefined' || typeof(session) === 'undefined') {
  throw new Error('Invalid parameter error. Please check parameters liveId or session.');
}

const client: NicoClient = new NicoClient();
client.liveComments(liveId, session, comment => {
  if (comment['comment'].match(/^\/hb ifseetno \d.*$/) && comment['premium'] === '3') {
    return;
  }
  console.log(
    `コメ番: ${comment['no']}\tユーザーID: ${comment['user_id']}\t時間: ${timestampToDateformat(comment['date'])}\t
    コメント: ${comment['comment']}\tプレミア: ${comment['premium']}\t NGスコア: ${comment['score']}\t 部屋: ${comment['roomLabel']}`
  );
});

function timestampToDateformat(timestamp){
  const date = new Date(timestamp * 1000);
  const hour    = date.getHours();
  const minute  = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hour}:${minute}:${seconds}`;
}
