// @flow
import  RoomInfo from './roomInfo';
import { ADDR_PORTS_OFFICIAL } from './../constraints/addrPortsOfficial';
import { ROOM_LABELS_OFFICIAL } from './../constraints/roomLabelsOfficial';

export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

export default class RoomInfoOfficial extends RoomInfo{
  constructor(playerStatus: any) {
    super(playerStatus);
  }

  arenaFront(): roomType {
    return this.roomAddrPort(0);
  }

  arena(): roomType {
    return this.roomAddrPort(1);
  }

  backArena(): roomType {
    return this.roomAddrPort(2);
  }

  firstCenterFront(): roomType {
    return this.roomAddrPort(3);
  }

  firstCenterFrontward(): roomType {
    return this.roomAddrPort(4);
  }

  firstCenterBackward(): roomType {
    return this.roomAddrPort(5);
  }

  firstRightFrontward(): roomType {
    return this.roomAddrPort(6);
  }

  firstRightBackward(): roomType {
    return this.roomAddrPort(7);
  }

  firstLeftFrontward(): roomType {
    return this.roomAddrPort(6);
  }

  firstLeftBackward(): roomType {
    return this.roomAddrPort(7);
  }

  secondCenterFront(): roomType {
    return this.roomAddrPort(8);
  }

  secondCenterFrontward(): roomType {
    return this.roomAddrPort(9);
  }

  black(): roomType {
    return this.roomAddrPort(6);
  }

  black2(): roomType {
    return this.roomAddrPort(7);
  }

  allRooms(): Array<roomType> {
    return [
      this.arenaFront(), this.arena(), this.backArena(), this.firstCenterFront(), this.firstCenterFrontward(),
      this.firstCenterBackward(), this.firstRightFrontward(), this.firstRightBackward(), this.firstLeftFrontward(),
      this.firstLeftBackward(), this.secondCenterFront(), this.secondCenterFrontward(), this.black(), this.black2()
    ];
  }

  addrPorts(): Array<any> {
    return ADDR_PORTS_OFFICIAL;
  }

  roomLabels(): Array<any> {
    return ROOM_LABELS_OFFICIAL;
  }
}
