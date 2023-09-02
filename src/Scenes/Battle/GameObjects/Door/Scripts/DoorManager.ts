import {ENTITY_STATE_ENUM, EVENT_ENUM,} from '../../../../../Enums';
import EntityManager from '../../../../../Base/EntityManager';
import EventManager from '../../../../../Runtime/EventManager';
import DoorStateMachine from './DoorStateMachine';
import DataManager from '../../../../../Runtime/DataManager';
import {IEntity} from '../../../../../Levels';


export default class DoorManager extends EntityManager {
  static componentName = 'DoorManager';

  init(params: IEntity) {
    this.fsm = this.gameObject.addComponent(new DoorStateMachine());
    super.init(params);

    EventManager.Instance.on(EVENT_ENUM.DOOR_OPEN, this.onOpen, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.DOOR_OPEN, this.onOpen);
  }

  onOpen() {
    if (DataManager.Instance.enemies.every(enemy => enemy.state === ENTITY_STATE_ENUM.DEATH)
      && this.state !== ENTITY_STATE_ENUM.DEATH) {
      this.state = ENTITY_STATE_ENUM.DEATH;
    }
  }

}