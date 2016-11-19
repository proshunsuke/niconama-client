import { Duplex } from 'stream';

export default class LiveCommentStream extends Duplex {
  constructor(options) {
    super(options);
    if (!options) options = {};
    options.objectMode = true;
    if (Duplex instanceof Function) Duplex.call(this, options);
  }

  _write(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }

  _read(size) {
  }
}
