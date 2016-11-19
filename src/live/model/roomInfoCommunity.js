// @flow
import  RoomInfo from './roomInfo';
import { ADDR_PORTS_COMMUNITY } from './../constraints/addrPortsCommunity';
import { ROOM_LABELS_COMMUNITY } from './../constraints/roomLabelsCommunity';

export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

export default class RoomInfoCommunity extends RoomInfo{
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

  f(): roomType {
    return this.roomAddrPort(6);
  }

  g(): roomType {
    return this.roomAddrPort(7);
  }

  h(): roomType {
    return this.roomAddrPort(8);
  }

  i(): roomType {
    return this.roomAddrPort(9);
  }

  allRooms(): Array<roomType> {
    return [this.arena(), this.a(), this.b(), this.c(), this.d(), this.e(), this.f(), this.g(), this.h(), this.i()];
  }

  roomAddrPort(roomLabelIndex: number) :roomType {
    const addrPorts = this.defaultRoomAddrPort(roomLabelIndex);
    if (roomLabelIndex === 0) addrPorts['roomLabel'] = this.community;
    return addrPorts;
  }

  addrPorts(): Array<any> {
    return ADDR_PORTS_COMMUNITY;
  }

  roomLabels(): Array<any> {
    return ROOM_LABELS_COMMUNITY;
  }
}
