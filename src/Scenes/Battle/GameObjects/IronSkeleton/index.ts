import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import IronSkeletonManager from './Scripts/IronSkeletonManager';


const IronSkeleton = () => {
  const ironSkeleton = new GameObject('ironSkeleton', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  ironSkeleton.addComponent(new IronSkeletonManager());

  return ironSkeleton;
}

export default IronSkeleton;