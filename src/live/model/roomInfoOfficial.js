// @flow
import  RoomInfo from './roomInfo';
import { ADDR_PORTS_OFFICIAL } from './../constraints/addrPortsOfficial';
import { ROOM_LABELS_OFFICIAL } from './../constraints/roomLabelsOfficial';

export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

/**
 *
 * RoomInfoOfficial
 */
export default class RoomInfoOfficial extends RoomInfo{
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
  arenaFront(): roomType {
    return this.roomAddrPort(0);
  }

  /**
   *
   * @returns {roomType}
   */
  arena(): roomType {
    return this.roomAddrPort(1);
  }

  /**
   *
   * @returns {roomType}
   */
  backArena(): roomType {
    return this.roomAddrPort(2);
  }

  /**
   *
   * @returns {roomType}
   */
  firstCenterFront(): roomType {
    return this.roomAddrPort(3);
  }

  /**
   *
   * @returns {roomType}
   */
  firstCenterFrontward(): roomType {
    return this.roomAddrPort(4);
  }

  /**
   *
   * @returns {roomType}
   */
  firstCenterBackward(): roomType {
    return this.roomAddrPort(5);
  }

  /**
   *
   * @returns {roomType}
   */
  firstRightFrontward(): roomType {
    return this.roomAddrPort(6);
  }

  /**
   *
   * @returns {roomType}
   */
  firstRightBackward(): roomType {
    return this.roomAddrPort(7);
  }

  /**
   *
   * @returns {roomType}
   */
  firstLeftFrontward(): roomType {
    return this.roomAddrPort(6);
  }

  /**
   *
   * @returns {roomType}
   */
  firstLeftBackward(): roomType {
    return this.roomAddrPort(7);
  }

  /**
   *
   * @returns {roomType}
   */
  secondCenterFront(): roomType {
    return this.roomAddrPort(8);
  }

  /**
   *
   * @returns {roomType}
   */
  secondCenterFrontward(): roomType {
    return this.roomAddrPort(9);
  }

  /**
   *
   * @returns {roomType}
   */
  black(): roomType {
    return this.roomAddrPort(6);
  }

  /**
   *
   * @returns {roomType}
   */
  black2(): roomType {
    return this.roomAddrPort(7);
  }

  /**
   *
   * @returns {*[]}
   */
  allRooms(): Array<roomType> {
    return [
      this.arenaFront(), this.arena(), this.backArena(), this.firstCenterFront(), this.firstCenterFrontward(),
      this.firstCenterBackward(), this.firstRightFrontward(), this.firstRightBackward(), this.firstLeftFrontward(),
      this.firstLeftBackward(), this.secondCenterFront(), this.secondCenterFrontward(), this.black(), this.black2()
    ];
  }

  /**
   *
   * @returns {Array.<any>}
   */
  addrPorts(): Array<any> {
    return ADDR_PORTS_OFFICIAL;
  }

  /**
   *
   * @returns {Array.<any>}
   */
  roomLabels(): Array<any> {
    return ROOM_LABELS_OFFICIAL;
  }
}
