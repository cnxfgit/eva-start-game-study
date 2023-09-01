import {GameObject} from '@eva/eva.js';
import BurstManager from './Scripts/BurstManager';
import {TILE_HEIGHT, TILE_WIDTH} from '../Tile';

const Burst = () => {
  const burst = new GameObject('burst', {
    size: {
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
    }
  })

  burst.addComponent(new BurstManager());

  return burst;
}

export default Burst;