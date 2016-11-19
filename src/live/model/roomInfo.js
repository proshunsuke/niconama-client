// @flow
export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

export default class RoomInfo {
  thread: number;
  community: string;
  currentRoomIndex: number;
  currentAddrPortIndex: number;
  constructor(playerStatus: any) {
    this.thread = Number(playerStatus['ms']['thread']);
    this.community = playerStatus['stream']['default_community'];
    this.setCurrentRoomIndex(playerStatus['user']['room_label']);
    this.setCurrentAddrPortIndex(playerStatus['ms']['addr'], Number(playerStatus['ms']['port']));
  }

  current(): roomType {
    return this.roomAddrPort(this.currentRoomIndex);
  }

  roomAddrPort(roomLabelIndex: number) :roomType {
    return this.defaultRoomAddrPort(roomLabelIndex);
  }

  defaultRoomAddrPort(roomLabelIndex: number) :roomType {
    let addrPorts = this.addrPorts()[(this.currentAddrPortIndex - this.currentRoomIndex + roomLabelIndex) % this.addrPorts().length];
    addrPorts['roomLabel'] = String(this.roomLabels()[roomLabelIndex]).substr(2, String(this.roomLabels()[roomLabelIndex]).length - 4);
    addrPorts['thread'] = this.thread - this.currentRoomIndex + roomLabelIndex;
    addrPorts['isCurrent'] = this.currentRoomIndex === roomLabelIndex;
    return addrPorts;
  }

  setCurrentRoomIndex(roomLabel: string) {
    for(let i = 0; i < this.roomLabels().length; i++) {
      if (roomLabel.match(this.roomLabels()[i])) this.currentRoomIndex = i;
    }
  }

  setCurrentAddrPortIndex(addr: string, port: number) {
    for(let i = 0; i < this.addrPorts().length; i++) {
      if (this.addrPorts()[i]['addr'] === addr && this.addrPorts()[i]['port'] === port) {
        this.currentAddrPortIndex = i;
        break
      }
    }
  }

  allRooms(): Array<roomType> {
    throw new Error('Not implemented error');
  }

  addrPorts(): Array<any> {
    throw new Error('Not implemented error');
  }

  roomLabels(): Array<any> {
    throw new Error('Not implemented error');
  }
}
