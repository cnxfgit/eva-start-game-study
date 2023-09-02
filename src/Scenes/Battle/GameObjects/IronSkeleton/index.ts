import {GameObject} from '@eva/eva.js';
import {ENTITY_HEIGHT, ENTITY_WIDTH} from '../../../../Base/EntityManager';
import IronSkeletonManager from './Scripts/IronSkeletonManager';
import {IEntity} from "../../../../Levels";


const IronSkeleton = (params: IEntity) => {
  const ironSkeleton = new GameObject('ironSkeleton', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  ironSkeleton.addComponent(new IronSkeletonManager(params));

  return ironSkeleton;
}

export default IronSkeleton;