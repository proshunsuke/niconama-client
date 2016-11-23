// @flow
/**
 *
 * ex.
 * % ./node_modules/.bin/flow; ./node_modules/.bin/babel-node examples/liveCommentsAndDoComment.js lv000000000 user_session=user_session_0000_123abc comment big 184 red
 * No errors!
 * success to do comment. 1
 * コメ番: 9       ユーザーID: YVeNI0zBeyro9LW5oNgxCWeQ0b8 時間: 5:32:50
 *   コメント: comment1    プレミア: 1      NGスコア: -120  部屋: co0000000
 * success to do comment. 2
 * success to do comment. 3
 * コメ番: 10      ユーザーID: YVeNI0zBeyro9LW5oNgxCWeQ0b8 時間: 5:33:4
 *   コメント: comment2    プレミア: 1      NGスコア: -120  部屋: co0000000
 * コメ番: 11      ユーザーID: YVeNI0zBeyro9LW5oNgxCWeQ0b8 時間: 5:33:4
 *   コメント: comment3    プレミア: 1      NGスコア: -120  部屋: co0000000
 * success to do comment. 4
 * コメ番: 12      ユーザーID: YVeNI0zBeyro9LW5oNgxCWeQ0b8 時間: 5:33:5
 *   コメント: comment4    プレミア: 1      NGスコア: -120  部屋: co0000000
 * success to do comment. 5
 * コメ番: 13      ユーザーID: YVeNI0zBeyro9LW5oNgxCWeQ0b8 時間: 5:33:10
 *   コメント: comment5    プレミア: 1      NGスコア: -120  部屋: co0000000
 */
import NiconamaClient from '../src/niconamaClient'
import CommentInfo from '../src/live/model/commentInfo';

const liveId: string = process.argv[2];
const session: string = process.argv[3];
const comment: string = process.argv[4];
const option1: string = process.argv[5];
const option2: string = process.argv[6];
const option3: string = process.argv[7];
const option4: string = process.argv[8];
const option5: string = process.argv[9];
const option6: string = process.argv[10];

let optionArray = [];
optionArray.push(option1);
optionArray.push(option2);
optionArray.push(option3);
optionArray.push(option4);
optionArray.push(option5);
optionArray.push(option6);

const option: string = optionArray.join(' ');

if (typeof(liveId) === 'undefined' || typeof(session) === 'undefined' || typeof(comment) === 'undefined') {
  throw new Error('Invalid parameter error. Please check parameters liveId or session or comment.');
}

const client: NiconamaClient = new NiconamaClient();
client.setLiveInfo(liveId, session);

const commentStream = client.createLiveCommentStream();
commentStream.on('readable', () => {
  const comment: CommentInfo = commentStream.read();
  if (comment.comment.match(/^\/hb ifseetno \d.*$/) && comment.premium === '3') return;
  if (comment.origin) return;
  console.log(
    `コメ番: ${comment.no}\tユーザーID: ${comment.user_id}\t時間: ${timestampToDateformat(comment.date)}\t
  コメント: ${comment.comment}\tプレミア: ${comment.premium}\t NGスコア: ${comment.score}\t 部屋: ${comment.roomLabel}`
  );
});

// comment 5 times every 5 seconds
client.liveComments()
  .then( () => {
    let commentCount = 0;
    let interval = setInterval( () => {
      commentCount++;
      if (commentCount >= 5) clearInterval(interval);
      client.doLiveComment(`${comment}${commentCount}`, option);
      console.log(`success to do comment. ${commentCount}`);
    }, 5000);
  })
  .catch( err => {console.log(err);});

function timestampToDateformat(timestamp: string): string{
  const date = new Date(Number(timestamp) * 1000);
  const hour    = date.getHours();
  const minute  = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hour}:${minute}:${seconds}`;
}
