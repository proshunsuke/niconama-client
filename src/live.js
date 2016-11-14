// @flow
import rp from 'request-promise';
import { SerializeCookieStore } from 'tough-cookie-serialize';
import net from 'net';
import X2JS from 'x2js';
import CommentInfo from './commentInfo';
import RoomInfo from './roomInfo';
import type { roomType } from './roomInfo';

export const GET_PLAYERSTATUS_URL = 'http://watch.live.nicovideo.jp/api/getplayerstatus';
export const GET_POSTKEY_URL = 'http://live.nicovideo.jp/api/getpostkey';

export default class Live{
  constructor() {}

  comments(liveId: string, session: string, callback: (comment: CommentInfo) => void) {
    return this.getPlayerStatus(liveId, session)
      .then((playerStatus) => {
        if (playerStatus['_status'] === 'fail') {
          throw ReferenceError('status fail.');
        }
        const room: RoomInfo = new RoomInfo(playerStatus);
        this.callbackComments(room.arena(), callback);
        this.callbackComments(room.a(), callback);
        this.callbackComments(room.b(), callback);
        this.callbackComments(room.c(), callback);
        this.callbackComments(room.d(), callback);
        this.callbackComments(room.e(), callback);
        this.callbackComments(room.f(), callback);
        this.callbackComments(room.g(), callback);
        this.callbackComments(room.h(), callback);
        this.callbackComments(room.i(), callback);
      });
  }

  callbackComments(room: roomType, callback: (comment: CommentInfo) => void) {
    this.commentServerDataCallback(room, data => {
      const chat = this.getConnectInfo(data)['chat'];
      if (typeof(chat) === 'undefined') {
        return;
      }
      callback(this.getCommentInfo(chat, room));
    });
  }

  getViewer(room: roomType) {
    return net.connect(room['port'], room['addr']);
  }

  getThread(room: roomType) {
    return room['thread'];
  }

  getCommentInfo(chat: any, room: roomType){
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
      chat['__text'],
      room['roomLabel']
    );
  }

  doComment(liveId: string, session: string, comment: string) {
    return new Promise( (resolve, reject) => {
      return this.getPlayerStatus(liveId, session)
        .then( playerStatus => {
          if (playerStatus['_status'] === 'fail') {
            return reject('Status is fail. The broadcasting has ended.');
          }
          const room: RoomInfo = new RoomInfo(playerStatus);
          const currentRoom = room.current();
          return this.commentServerDataCallback(currentRoom, (viewer, data) => {
            const chatResult = this.getConnectInfo(data)['chat_result'];
            if (chatResult) {
              viewer.destroy();
              if (chatResult['_status'] !== '0') {
                return reject(`Do comment failed. status: ${chatResult['_status']}`);
              }
              return resolve(chatResult);
            }
            const threadInfo = this.getConnectInfo(data)['thread'];
            if (typeof(threadInfo) === 'undefined') {
              return;
            }
            return rp(this.getPostkeyOption(threadInfo, session))
              .then( response => {
                viewer.write(this.commentRequestContent(playerStatus, response.slice(8, response.length), comment));
              }).catch( err => {
                viewer.destroy();
                return reject(err);
              });
          });
        })
        .catch( err => {
          return reject(err);
        });
    });
  }

  getPostkeyOption(threadInfo: any, session: string) {
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

  commentRequestContent(playerStatus: any, postKey: string, comment: string) {
    const date = new Date();
    const unixTimestamp = date.getTime();
    const startTime = playerStatus['stream']['start_time'];
    const vpos = unixTimestamp - startTime;
    const ticket = playerStatus['rtmp']['ticket'];
    const userId = playerStatus['user']['user_id'];
    const thread = playerStatus['ms']['thread'];
    return '<chat thread="'+thread +'" ticket="" vpos="'+vpos+'" postkey="'+postKey+'" mail="184" user_id="'+userId+'" premium="1">'+comment+'</chat>\0';
  }

  commentServerDataCallback(room: roomType, callback: any) {
    const viewer = this.getViewer(room);
    return viewer.on('connect', data => {
      viewer.setEncoding('utf-8');
      viewer.write('<thread thread="' + this.getThread(room) + '" res_from="-5" version="20061206" />\0');
      viewer.on('data', data => {
        callback(viewer, data);
      });
    });
  }

  getPlayerStatus(liveId: string, session: string){
    return rp({
      uri: GET_PLAYERSTATUS_URL,
      qs: {
        v: liveId
      },
      headers: {
        Cookie: session
      }
    })
      .then( xmlString => {
        const x2js = new X2JS;
        const playerStatus = x2js.xml2js(xmlString)['getplayerstatus'];
        return Promise.resolve(playerStatus);
      })
      .catch( err => {
        return Promise.reject(err);
      });
  }

  getConnectInfo(connectInfoXml: string) {
    const x2js = new X2JS;
    return x2js.xml2js(connectInfoXml);
  }
}
