// @flow
export type roomType = { addr: string; port: number; thread: number; roomLabel: string; isCurrent: boolean};

/**
 *
 * RoomInfo
 * this is RoomInfo base class. extends this class, and use it
 */
export default class RoomInfo {
  thread: number;
  community: string;
  currentRoomIndex: number;
  currentAddrPortIndex: number;

  /**
   *
   * @param playerStatus
   */
  constructor(playerStatus: any) {
    this.thread = Number(playerStatus['ms']['thread']);
    this.community = playerStatus['stream']['default_community'];
    this.setCurrentRoomIndex(playerStatus['user']['room_label']);
    this.setCurrentAddrPortIndex(playerStatus['ms']['addr'], Number(playerStatus['ms']['port']));
  }

  /**
   *
   * @returns {roomType}
   */
  current(): roomType {
    return this.roomAddrPort(this.currentRoomIndex);
  }

  /**
   *
   * @param roomLabelIndex
   * @returns {roomType}
   */
  roomAddrPort(roomLabelIndex: number) :roomType {
    return this.defaultRoomAddrPort(roomLabelIndex);
  }

  /**
   *
   * @param roomLabelIndex
   * @returns {any}
   */
  defaultRoomAddrPort(roomLabelIndex: number) :roomType {
    let addrPorts = this.addrPorts()[(this.currentAddrPortIndex - this.currentRoomIndex + roomLabelIndex) % this.addrPorts().length];
    addrPorts['roomLabel'] = String(this.roomLabels()[roomLabelIndex]).substr(2, String(this.roomLabels()[roomLabelIndex]).length - 4);
    addrPorts['thread'] = this.thread - this.currentRoomIndex + roomLabelIndex;
    addrPorts['isCurrent'] = this.currentRoomIndex === roomLabelIndex;
    return addrPorts;
  }

  /**
   *
   * @param roomLabel
   */
  setCurrentRoomIndex(roomLabel: string) {
    for(let i = 0; i < this.roomLabels().length; i++) {
      if (roomLabel.match(this.roomLabels()[i])) this.currentRoomIndex = i;
    }
  }

  /**
   *
   * @param addr
   * @param port
   */
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
