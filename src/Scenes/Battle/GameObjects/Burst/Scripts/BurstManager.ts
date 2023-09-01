import {DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM,} from '../../../../../Enums';
import EntityManager from '../../../../../Base/EntityManager';
import EventManager from '../../../../../Runtime/EventManager';
import BurstStateMachine from './BurstStateMachine';
import {TILE_HEIGHT, TILE_WIDTH} from "../../Tile";
import DataManager from "../../../../../Runtime/DataManager";


export default class BurstManager extends EntityManager {
  static componentName = 'BurstManager';

  init() {
    this.fsm = this.gameObject.addComponent(new BurstStateMachine());
    super.init();
    this.x = 2;
    this.y = 6;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;

    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onBurst, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onBurst);
  }

  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT;
  }

  onBurst() {
    if (this.state === ENTITY_STATE_ENUM.DEATH) {
      return;
    }

    const {x: playerX, y: palyerY} = DataManager.Instance.player;
    if (this.x === playerX && this.y === palyerY && this.state === ENTITY_STATE_ENUM.IDLE) {
      this.state = ENTITY_STATE_ENUM.ATTACK;
    } else if (this.state === ENTITY_STATE_ENUM.ATTACK){
      this.state = ENTITY_STATE_ENUM.DEATH;
      if (this.x === playerX && this.y === palyerY) {
        EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, ENTITY_STATE_ENUM.AIRDEATH);
      }
    }
  }



}