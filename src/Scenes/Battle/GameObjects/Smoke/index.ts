import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import SmokeManager from './Scripts/SmokeManager';
import {IEntity} from '../../../../Levels';
import {Render} from "@eva/plugin-renderer-render";

const Smoke = (param: IEntity) => {
  const smoke = new GameObject('smoke', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  smoke.addComponent(new Render({
    zIndex: 1,
  }))
  smoke.addComponent(new SmokeManager(param));

  return smoke;
}

export default Smoke;