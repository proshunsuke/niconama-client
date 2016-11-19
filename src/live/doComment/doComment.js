// @flow
import rp from 'request-promise';
import RoomInfo from '../model/roomInfo';
import Common from '../lib/common';
import RoomInfoFactory from '../lib/roomInfoFactory';

const GET_POSTKEY_URL = 'http://live.nicovideo.jp/api/getpostkey';

export default class DoComment{
  constructor() {}

  static doComment(currentViewer :any, playerStatus: any, session: string, comment: string, option: string): Promise<any> {
    const room: RoomInfo = RoomInfoFactory.createRoomInfo(playerStatus);
    const currentRoom = room.current();
    return new Promise( (resolve, reject) => {
      let isReady: boolean = true;
      currentViewer.write(`<thread thread="${Common.getThread(currentRoom)}" res_from="-5" version="20061206" />\0`);
      currentViewer.on('data', data => {
        if (!isReady) return;
        const chatResult = Common.xmlToJson(data)['chat_result'];
        if (chatResult) {
          isReady = true;
          if (chatResult['_status'] !== '0') return reject(`Failed to o comment. status: ${chatResult['_status']}`);
          return resolve(chatResult);
        }
        const threadInfo = Common.xmlToJson(data)['thread'];
        if (typeof threadInfo === 'undefined') return;
        isReady = false;
        return this.getPostkey(threadInfo, session)
          .then( postKey => {
            currentViewer.write(this.commentRequestContent(playerStatus, postKey, comment, option));
          });
      });
    });
  }

  static commentRequestContent(playerStatus: any, postKey: string, comment: string, option: string) {
    const date = new Date();
    const unixTimestamp = date.getTime();
    const startTime = playerStatus['stream']['start_time'];
    const vpos = unixTimestamp - startTime;
    const ticket = playerStatus['rtmp']['ticket'];
    const userId = playerStatus['user']['user_id'];
    const isPremium = playerStatus['user']['is_premium'];
    const thread = playerStatus['ms']['thread'];
    return `<chat thread="${thread}" ticket="${ticket}" vpos="${vpos}" postkey="${postKey}" mail="${option}" user_id="${userId}" premium="${isPremium}">${comment}</chat>\0`;
  }

  static getPostkey(threadInfo: any, session: string): Promise<any> {
    const thread = threadInfo['_thread'];
    const lastRes = threadInfo['_last_res'] || 0;
    const blockNo = Math.floor(lastRes / 100);
    return rp({
      uri: GET_POSTKEY_URL,
      qs: {
        thread: thread,
        block_no: blockNo
      },
      headers: {
        Cookie: session
      }
    })
      .then( (response) => {
        return Promise.resolve(response.slice(8, response.length));
      })
  }
}
