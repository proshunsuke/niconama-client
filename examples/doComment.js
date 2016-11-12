// @flow
import NiconamaClient from '../src/niconamaClient'

const liveId: string = process.argv[2];
const session: string = process.argv[3];

//if (typeof(liveId) === 'undefined' || typeof(session) === 'undefined') {
//  throw new Error('Invalid parameter error. Please check parameters liveId or session.');
//}

const client: NiconamaClient = new NiconamaClient();
client.doLiveComment(liveId, session);
