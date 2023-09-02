import {ENTITY_STATE_ENUM, EVENT_ENUM,} from '../../../../../Enums';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';
import EventManager from '../../../../../Runtime/EventManager';
import DataManager from '../../../../../Runtime/DataManager';
import EnemyManager from '../../../../../Base/EnemyManager';
import {IEntity} from '../../../../../Levels';


export default class WoodenSkeletonManager extends EnemyManager {
  static componentName = 'WoodenSkeletonManager';

  init(params:IEntity) {
    this.fsm = this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    super.init(params);

    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack);
  }

  onAttack() {
    if (this.state ===ENTITY_STATE_ENUM.DEATH) {
      return;
    }
    const {x: playerX, y: playerY, state} = DataManager.Instance.player;

    if (((this.x === playerX && Math.abs(this.y - playerY) <= 1) ||
      (this.y === playerY && Math.abs(this.x - playerX) <= 1)) &&
      state === ENTITY_STATE_ENUM.IDLE) {
     this.state = ENTITY_STATE_ENUM.ATTACK;
     EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, ENTITY_STATE_ENUM.DEATH);
    }
  }

}