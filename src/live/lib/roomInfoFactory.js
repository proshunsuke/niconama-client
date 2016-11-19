// @flow
import RoomInfo from '../model/roomInfo';
import RoomInfoCommunity from '../model/roomInfoCommunity';
import RoomInfoChannel from '../model/roomInfoChannel';
import RoomInfoOfficial from '../model/roomInfoOfficial';

export default class RoomInfoFactory{
  constructor() {
  }

  static createRoomInfo(playerStatus: any): RoomInfo {
    const providerType = playerStatus['stream']['provider_type'];
    if (providerType === 'community') return new RoomInfoCommunity(playerStatus);
    if (providerType === 'channel') return new RoomInfoChannel(playerStatus);
    if (providerType === 'official') return new RoomInfoOfficial(playerStatus);
    throw new Error(`Unknown provider type error. provider type: ${providerType}`);
  }
}
