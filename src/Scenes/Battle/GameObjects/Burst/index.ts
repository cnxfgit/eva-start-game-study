import {GameObject} from '@eva/eva.js';
import BurstManager from './Scripts/BurstManager';
import {TILE_HEIGHT, TILE_WIDTH} from '../Tile';
import {IEntity} from '../../../../Levels';

const Burst = (params: IEntity) => {
  const burst = new GameObject('burst', {
    size: {
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
    }
  })

  burst.addComponent(new BurstManager(params));

  return burst;
}

export default Burst;