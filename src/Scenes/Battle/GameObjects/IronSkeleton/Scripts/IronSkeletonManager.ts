import EnemyManager from '../../../../../Base/EnemyManager';
import IronSkeletonStateMachine from './IronSkeletonStateMachine';
import {IEntity} from '../../../../../Levels';

export default class IronSkeletonManager extends EnemyManager {
  static componentName = 'IronSkeletonManager';

  init(params:IEntity) {
    this.fsm = this.gameObject.addComponent(new IronSkeletonStateMachine());
    super.init(params);
  }
}