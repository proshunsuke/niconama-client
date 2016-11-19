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

/**
 *
 * Live client
 */
export default class Live{
  liveId: string;
  session: string;
  isAlreadyGetComments: boolean;
  playerStatus: any;
  currentViewer: any;
  commentStream: LiveCommentStream;

  /**
   *
   * @param liveId
   * @param session
   */
  constructor(liveId: string, session: string) {
    this.liveId = liveId;
    this.session = session;
    this.isAlreadyGetComments = false;
  }

  /**
   *
   * @returns {LiveCommentStream}
   */
  getCommentStream(): LiveCommentStream {
    return this.commentStream = new LiveCommentStream();
  }

  /**
   *
   * @param comment
   * @param option
   * @returns {Promise.<any>}
   */
  doComment(comment: string, option: string): Promise<any> {
    return DoComment.doComment(this.currentViewer, this.playerStatus, this.session, comment, option);
  }

  /**
   *
   * connect to niconico comment servers
   *
   * @returns {Promise.<any>}
   */
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
        return Promise.all(room.allRooms().map( (r) => this.connectServer(r)))
      })
      .then( result => {
        this.isAlreadyGetComments = true;
        return Promise.resolve();
      });
  }

  /**
   *
   * @param room
   * @returns {Promise}
   */
  connectServer(room: roomType): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.connectServerCallback(room, (viewer, data) => {
        const connectInfo = Common.xmlToJson(data);
        // When there is thread information, ignore it since it is just after receiving comment server information
        if (typeof connectInfo['thread'] !== 'undefined') return resolve();
        const chat = connectInfo['chat'];
        if (typeof(chat) === 'undefined') return resolve();
        if (this.commentStream) this.commentStream.writeComment(chat, room);
        return resolve();
      });
    });
  }

  /**
   *
   * @param room
   * @param callback
   * @returns {*}
   */
  connectServerCallback(room: roomType, callback: any): any {
    const viewer = net.connect(room['port'], room['addr']);
    if (room['isCurrent']) this.currentViewer = viewer; // set current room connect infomation
    return viewer.on('connect', data => {
      viewer.setEncoding('utf-8');
      // write thread informations, and receive comment server information
      viewer.write(`<thread thread="${Common.getThread(room)}" res_from="-5" version="20061206" />\0`);
      viewer.on('data', data => {
        callback(viewer, data);
      });
    });
  }

  /**
   *
   * @returns {Promise.<T>|*}
   */
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
