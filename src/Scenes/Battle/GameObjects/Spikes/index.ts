import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import SpikesManager from './Scripts/SpikesManager';

const Spikes = () => {
  const spikes = new GameObject('spikes', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  spikes.addComponent(new SpikesManager());

  return spikes;
}

export default Spikes;