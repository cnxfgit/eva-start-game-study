import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import DoorManager from './Scripts/DoorManager';
import {IEntity} from '../../../../Levels';
import {Render} from "@eva/plugin-renderer-render";

const Door = (param: IEntity) => {
  const door = new GameObject('door', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  door.addComponent(new Render({
    zIndex: 2,
  }))
  door.addComponent(new DoorManager(param));

  return door;
}

export default Door;