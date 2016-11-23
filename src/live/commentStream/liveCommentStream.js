import { Duplex } from 'stream';
import CommentInfo from '../model/commentInfo';

/**
 *
 * LiveCommentStream
 */
export default class LiveCommentStream extends Duplex {
  /**
   *
   * @param options
   */
  constructor(options) {
    super(options);
    if (!options) options = {};
    options.objectMode = true;
    if (Duplex instanceof Function) Duplex.call(this, options);
  }

  /**
   *
   * @param chunk
   * @param encoding
   * @param callback
   * @private
   */
  _write(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }

  /**
   *
   * @param size
   * @private
   */
  _read(size) {
  }

  /**
   *
   * @param chat
   * @param room
   */
  writeComment(chat, room) {
    this.write(this.getCommentInfo(chat, room));
  }

  /**
   *
   * @param chat
   * @param room
   * @returns {CommentInfo}
   */
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
