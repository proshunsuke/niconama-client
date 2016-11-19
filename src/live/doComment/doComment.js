// @flow
import rp from 'request-promise';
import RoomInfo from '../model/roomInfo';
import Common from '../lib/common';

export const GET_POSTKEY_URL = 'http://live.nicovideo.jp/api/getpostkey';

export default class DoComment{
  isReady: boolean;
  constructor() {}

  static doComment(currentViewer :any, playerStatus: any, session: string, comment: string): Promise<any> {
    const room: RoomInfo = new RoomInfo(playerStatus);
    const currentRoom = room.current();
    return new Promise( (resolve, reject) => {
      this.isReady = true;
      currentViewer.write('<thread thread="' + Common.getThread(currentRoom) + '" res_from="-5" version="20061206" />\0');
      currentViewer.on('data', data => {
        if (!this.isReady) return;
        const chatResult = Common.getConnectInfo(data)['chat_result'];
        if (chatResult) {
          this.isReady = true;
          if (chatResult['_status'] !== '0') return reject(`Failed to o comment. status: ${chatResult['_status']}`);
          return resolve(chatResult);
        }
        const threadInfo = Common.getConnectInfo(data)['thread'];
        if (typeof threadInfo === 'undefined') return;
        this.isReady = false;
        return rp(this.getPostkeyOption(threadInfo, session))
          .then( response => {
            currentViewer.write(this.commentRequestContent(playerStatus, response.slice(8, response.length), comment));
          }).catch( err => {
            return reject(err);
          });
      });
    });
  }

  static commentRequestContent(playerStatus: any, postKey: string, comment: string) {
    const date = new Date();
    const unixTimestamp = date.getTime();
    const startTime = playerStatus['stream']['start_time'];
    const vpos = unixTimestamp - startTime;
    const ticket = playerStatus['rtmp']['ticket'];
    const userId = playerStatus['user']['user_id'];
    const thread = playerStatus['ms']['thread'];
    return '<chat thread="'+thread +'" ticket="" vpos="'+vpos+'" postkey="'+postKey+'" mail="184" user_id="'+userId+'" premium="1">'+comment+'</chat>\0';
  }

  static getPostkeyOption(threadInfo: any, session: string): {uri: string; qs: {thread: string; block_no: number}; headers: {Cookie: string}} {
    const thread = threadInfo['_thread'];
    const lastRes = threadInfo['_last_res'] || 0;
    const blockNo = Math.floor(lastRes / 100);
    return {
      uri: GET_POSTKEY_URL,
      qs: {
        thread: thread,
        block_no: blockNo
      },
      headers: {
        Cookie: session
      }
    }
  }
}
