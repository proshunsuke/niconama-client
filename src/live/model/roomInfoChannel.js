// @flow
import  RoomInfo from './roomInfo';
import { ADDR_PORTS_CHANNEL } from './../constraints/addrPortsChannel';
import { ROOM_LABELS_CHANNEL } from './../constraints/roomLabelsChannel';

export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

export default class RoomInfoChannel extends RoomInfo{
  constructor(playerStatus: any) {
    super(playerStatus);
  }

  arena(): roomType {
    return this.roomAddrPort(0);
  }

  a(): roomType {
    return this.roomAddrPort(1);
  }

  b(): roomType {
    return this.roomAddrPort(2);
  }

  c(): roomType {
    return this.roomAddrPort(3);
  }

  d(): roomType {
    return this.roomAddrPort(4);
  }

  e(): roomType {
    return this.roomAddrPort(5);
  }

  black(): roomType {
    return this.roomAddrPort(6);
  }

  black2(): roomType {
    return this.roomAddrPort(7);
  }

  allRooms(): Array<roomType> {
    return [this.arena(), this.a(), this.b(), this.c(), this.d(), this.e(), this.black(), this.black2()];
  }

  roomAddrPort(roomLabelIndex: number) :roomType {
    const addrPorts = this.defaultRoomAddrPort(roomLabelIndex);
    if (roomLabelIndex === 0) addrPorts['roomLabel'] = this.community;
    return addrPorts;
  }

  addrPorts(): Array<any> {
    return ADDR_PORTS_CHANNEL;
  }

  roomLabels(): Array<any> {
    return ROOM_LABELS_CHANNEL;
  }
}
