// @flow
import NiconamaClient from '../src/niconamaClient'
import CommentInfo from '../src/live/model/commentInfo';

const liveId: string = process.argv[2];
const session: string = process.argv[3];

if (typeof liveId === 'undefined' || typeof session === 'undefined') {
  throw new Error('Invalid parameter error. Please check parameters liveId or session.');
}

const client: NiconamaClient = new NiconamaClient();
client.setLiveInfo(liveId, session);
const commentStream = client.createLiveCommentStream();
commentStream.on('readable', () => {
  const comment: CommentInfo = commentStream.read();
  if (comment.comment.match(/^\/hb ifseetno \d.*$/) && comment.premium === '3') {
    return;
  }
  console.log(
    `コメ番: ${comment.no}\tユーザーID: ${comment.user_id}\t時間: ${timestampToDateformat(comment.date)}\t
  コメント: ${comment.comment}\tプレミア: ${comment.premium}\t NGスコア: ${comment.score}\t 部屋: ${comment.roomLabel}`
  );
});

client.liveComments()
  .then(() => {
    console.log('Success to connect all comment servers');
  })
  .catch( err => {
    console.log(err);
  });

function timestampToDateformat(timestamp: string): string{
  const date = new Date(Number(timestamp) * 1000);
  const hour    = date.getHours();
  const minute  = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hour}:${minute}:${seconds}`;
}
