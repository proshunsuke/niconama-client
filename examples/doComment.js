// @flow
import NiconamaClient from '../src/niconamaClient'

const liveId: string = process.argv[2];
const session: string = process.argv[3];
const comment: string = process.argv[4];

if (typeof(liveId) === 'undefined' || typeof(session) === 'undefined' || typeof(comment) === 'undefined') {
  throw new Error('Invalid parameter error. Please check parameters liveId or session or comment.');
}

const client: NiconamaClient = new NiconamaClient();
client.setLiveInfo(liveId, session);

let commentCout = 0;
let interval = setInterval(() => {
  if (commentCout === 5) clearInterval(interval);
  commentCout++;
  client.liveComments()
    .then(() => {
      client.doLiveComment(comment);
      console.log(`success to do comment. ${commentCout}`);
    })
    .catch( err => {console.log(err);});
} , 100);


