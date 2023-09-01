import EnemyManager from '../../../../../Base/EnemyManager';
import {DIRECTION_ENUM, ENTITY_STATE_ENUM} from '../../../../../Enums';
import IronSkeletonStateMachine from './IronSkeletonStateMachine';

export default class IronSkeletonManager extends EnemyManager {
  static componentName = 'IronSkeletonManager';

  init() {
    this.fsm = this.gameObject.addComponent(new IronSkeletonStateMachine());
    super.init();
    this.x = 2;
    this.y = 2;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
  }
}