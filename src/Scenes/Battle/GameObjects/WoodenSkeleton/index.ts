import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';


const WoodenSkeleton = () => {
  const woodenSkeleton = new GameObject('woodenSkeleton', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  woodenSkeleton.addComponent(new WoodenSkeletonManager());

  return woodenSkeleton;
}

export default WoodenSkeleton;