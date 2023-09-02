import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import SpikesManager from './Scripts/SpikesManager';
import {ISpikes} from '../../../../Levels';
import {Render} from "@eva/plugin-renderer-render";

const Spikes = (param: ISpikes) => {
  const spikes = new GameObject('spikes', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  spikes.addComponent(new Render({
    zIndex: 0,
  }))

  spikes.addComponent(new SpikesManager(param));

  return spikes;
}

export default Spikes;