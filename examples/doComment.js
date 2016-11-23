// @flow

/**
 *
 * ex.
 * % ./node_modules/.bin/flow; ./node_modules/.bin/babel-node examples/doComment.js lv282494871 user_session=user_session_13294831_62b5680bddf575eed836352e89c02b57b926254f0f28598c5393a1863430e1a2 comment big 184 red
 * No errors!
 * success to do comment. 1
 * success to do comment. 2
 * success to do comment. 3
 * success to do comment. 4
 * success to do comment. 5
 */
import NiconamaClient from '../src/niconamaClient'

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
