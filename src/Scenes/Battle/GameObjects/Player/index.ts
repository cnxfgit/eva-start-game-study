import {GameObject} from '@eva/eva.js';
import PlayerManager from './Scripts/PlayerManager';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from "../../../../Base/EntityManager";
import {IEntity} from "../../../../Levels";

const Player = (params:IEntity) => {
  const player = new GameObject('player', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  player.addComponent(new PlayerManager(params));

  return player;
}

export default Player;