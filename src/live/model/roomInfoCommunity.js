// @flow
import  RoomInfo from './roomInfo';
import { ADDR_PORTS_COMMUNITY } from './../constraints/addrPortsCommunity';
import { ROOM_LABELS_COMMUNITY } from './../constraints/roomLabelsCommunity';

export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

/**
 *
 * RoomInfoCommunity
 */
export default class RoomInfoCommunity extends RoomInfo{
  /**
   *
   * @param playerStatus
   */
  constructor(playerStatus: any) {
    super(playerStatus);
  }

  /**
   *
   * @returns {roomType}
   */
  arena(): roomType {
    return this.roomAddrPort(0);
  }

  /**
   *
   * @returns {roomType}
   */
  a(): roomType {
    return this.roomAddrPort(1);
  }

  /**
   *
   * @returns {roomType}
   */
  b(): roomType {
    return this.roomAddrPort(2);
  }

  /**
   *
   * @returns {roomType}
   */
  c(): roomType {
    return this.roomAddrPort(3);
  }

  /**
   *
   * @returns {roomType}
   */
  d(): roomType {
    return this.roomAddrPort(4);
  }

  /**
   *
   * @returns {roomType}
   */
  e(): roomType {
    return this.roomAddrPort(5);
  }

  /**
   *
   * @returns {roomType}
   */
  f(): roomType {
    return this.roomAddrPort(6);
  }

  /**
   *
   * @returns {roomType}
   */
  g(): roomType {
    return this.roomAddrPort(7);
  }

  /**
   *
   * @returns {roomType}
   */
  h(): roomType {
    return this.roomAddrPort(8);
  }

  /**
   *
   * @returns {roomType}
   */
  i(): roomType {
    return this.roomAddrPort(9);
  }

  /**
   *
   * @returns {*[]}
   */
  allRooms(): Array<roomType> {
    return [this.arena(), this.a(), this.b(), this.c(), this.d(), this.e(), this.f(), this.g(), this.h(), this.i()];
  }

  /**
   *
   * @param roomLabelIndex
   * @returns {roomType}
   */
  roomAddrPort(roomLabelIndex: number) :roomType {
    const addrPorts = this.defaultRoomAddrPort(roomLabelIndex);
    if (roomLabelIndex === 0) addrPorts['roomLabel'] = this.community;
    return addrPorts;
  }

  /**
   *
   * @returns {Array.<any>}
   */
  addrPorts(): Array<any> {
    return ADDR_PORTS_COMMUNITY;
  }

  /**
   *
   * @returns {Array.<any>}
   */
  roomLabels(): Array<any> {
    return ROOM_LABELS_COMMUNITY;
  }
}
