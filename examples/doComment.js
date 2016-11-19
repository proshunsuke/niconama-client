// @flow
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
