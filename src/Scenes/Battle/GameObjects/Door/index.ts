import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import DoorManager from './Scripts/DoorManager';

const Door = () => {
  const door = new GameObject('door', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  door.addComponent(new DoorManager());

  return door;
}

export default Door;