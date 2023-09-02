import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';
import {IEntity} from "../../../../Levels";


const WoodenSkeleton = (params: IEntity) => {
  const woodenSkeleton = new GameObject('woodenSkeleton', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  woodenSkeleton.addComponent(new WoodenSkeletonManager(params));

  return woodenSkeleton;
}

export default WoodenSkeleton;