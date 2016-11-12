// @flow
import NicoClient from '../src/niconamaClient'

const email: string = process.argv[2];
const password: string = process.argv[3];

if (typeof(email) === 'undefined' || typeof(password) === 'undefined') {
  throw new Error('Invalid parameter error. Please check parameters email or password.');
}

const client = new NicoClient();
client.login(email, password)
  .then( session => {
    console.log(session);
  });
