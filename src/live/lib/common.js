// @flow
import X2JS from 'x2js';
import type { roomType } from '../model/roomInfo';
export default class Common{
  construct() {}

  static getThread(room: roomType): number {
    return room['thread'];
  }

  static getConnectInfo(connectInfoXml: string): any {
    const x2js = new X2JS;
    return x2js.xml2js(connectInfoXml);
  }
}
