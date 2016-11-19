// @flow
import rp from 'request-promise';
import net from 'net';
import RoomInfo from './model/roomInfo';
import LiveCommentStream from './commentStream/liveCommentStream';
import DoComment from './doComment/doComment';
import Common from './lib/common';
import RoomInfoFactory from './lib/roomInfoFactory';
import type { roomType } from './model/roomInfo';

const GET_PLAYERSTATUS_URL = 'http://watch.live.nicovideo.jp/api/getplayerstatus';

export default class Live{
  liveId: string;
  session: string;
  isAlreadyGetComments: boolean;
  playerStatus: any;
  currentViewer: any;
  commentStream: LiveCommentStream;
  constructor(liveId: string, session: string) {
    this.liveId = liveId;
    this.session = session;
    this.isAlreadyGetComments = false;
  }

  getCommentStream(): LiveCommentStream {
    return this.commentStream = new LiveCommentStream();
  }

  doComment(comment: string, option: string): Promise<any> {
    return DoComment.doComment(this.currentViewer, this.playerStatus, this.session, comment, option);
  }

  comments(): Promise<any> {
    if ( this.isAlreadyGetComments ) return Promise.resolve();
    return this.getPlayerStatus()
      .then( xmlString => {
        this.playerStatus = Common.xmlToJson(xmlString)['getplayerstatus'];
        if (this.playerStatus['_status'] === 'fail') return Promise.reject('Status fail. This live broadcast is ended');
        return Promise.resolve();
      })
      .then( () => {
        const room: RoomInfo = RoomInfoFactory.createRoomInfo(this.playerStatus);
        return Promise.all(room.allRooms().map( (r) => this.callbackComments(r)))
      })
      .then( result => {
        this.isAlreadyGetComments = true;
        return Promise.resolve();
      });
  }

  callbackComments(room: roomType): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.commentServerDataCallback(room, (viewer, data) => {
        const connectInfo = Common.xmlToJson(data);
        if (typeof connectInfo['thread'] !== 'undefined') return resolve();
        const chat = connectInfo['chat'];
        if (typeof(chat) === 'undefined') return resolve();
        if (this.commentStream) this.commentStream.writeComment(chat, room);
        return resolve();
      });
    });
  }

  commentServerDataCallback(room: roomType, callback: any): any {
    const viewer = net.connect(room['port'], room['addr']);
    if (room['isCurrent']) this.currentViewer = viewer;
    return viewer.on('connect', data => {
      viewer.setEncoding('utf-8');
      viewer.write(`<thread thread="${Common.getThread(room)}" res_from="-5" version="20061206" />\0`);
      viewer.on('data', data => {
        callback(viewer, data);
      });
    });
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
  }
}
