// @flow
import rp from 'request-promise';
import { SerializeCookieStore } from 'tough-cookie-serialize';
import net from 'net';
import X2JS from 'x2js';
import CommentInfo from './commentInfo';
import RoomInfo from './roomInfo';
import LiveCommentStream from './liveCommentStream';
import type { roomType } from './roomInfo';

export const GET_PLAYERSTATUS_URL = 'http://watch.live.nicovideo.jp/api/getplayerstatus';
export const GET_POSTKEY_URL = 'http://live.nicovideo.jp/api/getpostkey';

export default class Live{
  liveId: string;
  session: string;
  playerStatus: any;
  currentViewer: any;
  commentStream: LiveCommentStream;
  constructor(liveId: string, session: string) {
    this.liveId = liveId;
    this.session = session;
    this.currentViewer = null;
  }

  getCommentStream(): LiveCommentStream {
    return this.commentStream = new LiveCommentStream();
  }

  comments(): Promise<any> {
    return this.getPlayerStatus()
      .then( xmlString => {
        const x2js: X2JS = new X2JS;
        this.playerStatus = x2js.xml2js(xmlString)['getplayerstatus'];
        if (this.playerStatus['_status'] === 'fail') return Promise.reject('status fail.');
        return Promise.resolve();
      })
      .then( () => {
        const room: RoomInfo = new RoomInfo(this.playerStatus);
        return Promise.all([
          this.callbackComments(room.arena()),
          this.callbackComments(room.a()),
          this.callbackComments(room.b()),
          this.callbackComments(room.c()),
          this.callbackComments(room.d()),
          this.callbackComments(room.e()),
          this.callbackComments(room.f()),
          this.callbackComments(room.g()),
          this.callbackComments(room.h()),
          this.callbackComments(room.i())
        ])
      })
      .then( result => {
        return Promise.resolve();
      });
  }

  callbackComments(room: roomType): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.commentServerDataCallback(room, (viewer, data) => {
        const chat = this.getConnectInfo(data)['chat'];
        if (typeof(chat) === 'undefined') return resolve();
        this.commentStream.write(this.getCommentInfo(chat, room));
        return resolve();
      });
    });
  }

  commentServerDataCallback(room: roomType, callback: any): any {
    const viewer = this.getViewer(room);
    if (room['isCurrent']) this.currentViewer = viewer;
    return viewer.on('connect', data => {
      viewer.setEncoding('utf-8');
      viewer.write('<thread thread="' + this.getThread(room) + '" res_from="-5" version="20061206" />\0');
      viewer.on('data', data => {
        callback(viewer, data);
      });
    });
  }

  testDoComment(comment: string) {
    const room: RoomInfo = new RoomInfo(this.playerStatus);
    const currentRoom = room.current();
    return new Promise( (resolve, reject) => {
      this.currentViewer.write('<thread thread="' + this.getThread(currentRoom) + '" res_from="-5" version="20061206" />\0');
      this.currentViewer.on('data', data => {
        const chatResult = this.getConnectInfo(data)['chat_result'];
        if (chatResult) {
          this.currentViewer.destroy();
          if (chatResult['_status'] !== '0') return reject(`Do comment failed. status: ${chatResult['_status']}`);
          return resolve(chatResult);
        }
        const threadInfo = this.getConnectInfo(data)['thread'];
        if (typeof threadInfo === 'undefined') return;
        return rp(this.getPostkeyOption(threadInfo, this.session))
          .then( response => {
            this.currentViewer.write(this.commentRequestContent(this.playerStatus, response.slice(8, response.length), comment));
          }).catch( err => {
            return reject(err);
          });
      });
    });
  }

  doComment(liveId: string, session: string, comment: string) {
    return new Promise( (resolve, reject) => {
      return this.getPlayerStatus(liveId, session)
        .then( playerStatus => {
          if (playerStatus['_status'] === 'fail') return reject('Status is fail. The broadcasting has ended.');
          const room: RoomInfo = new RoomInfo(playerStatus);
          const currentRoom = room.current();
          return this.commentServerDataCallback(currentRoom, (viewer, data) => {
            const chatResult = this.getConnectInfo(data)['chat_result'];
            if (chatResult) {
              viewer.destroy();
              if (chatResult['_status'] !== '0') return reject(`Do comment failed. status: ${chatResult['_status']}`);
              return resolve(chatResult);
            }
            const threadInfo = this.getConnectInfo(data)['thread'];
            if (typeof(threadInfo) === 'undefined') return;
            return rp(this.getPostkeyOption(threadInfo))
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

  getViewer(room: roomType): any {
    return net.connect(room['port'], room['addr']);
  }

  getThread(room: roomType): number {
    return room['thread'];
  }

  getCommentInfo(chat: any, room: roomType): CommentInfo{
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

  getPostkeyOption(threadInfo: any): {uri: string; qs: {thread: string; block_no: number}; headers: {Cookie: string}} {
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
        Cookie: this.session
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

  getPlayerStatus(): Promise<any> {
    return rp({
      uri: GET_PLAYERSTATUS_URL,
      qs: {
        v: this.liveId
      },
      headers: {
        Cookie: this.session
      }
    })
      .then( xmlString => {
        return Promise.resolve(xmlString);
      })
      .catch( err => {
        return Promise.reject(err);
      })
  }

  getConnectInfo(connectInfoXml: string): any {
    const x2js = new X2JS;
    return x2js.xml2js(connectInfoXml);
  }
}
