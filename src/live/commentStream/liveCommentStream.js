import { Duplex } from 'stream';
import CommentInfo from '../model/commentInfo';

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

  writeComment(chat, room) {
    this.write(this.getCommentInfo(chat, room));
  }

  getCommentInfo(chat, room) {
    return new CommentInfo(
      chat['_thread'],
      chat['_no'],
      chat['_vpos'],
      chat['_date'],
      chat['_date_usec'],
      chat['_mail'],
      chat['_user_id'],
      chat['_premium'],
      chat['_anonymity'],
      chat['_locale'],
      chat['_score'],
      chat['_yourpost'],
      chat['_deleted'],
      chat['_origin'],
      chat['__text'],
      room['roomLabel']
    );
  }
}
