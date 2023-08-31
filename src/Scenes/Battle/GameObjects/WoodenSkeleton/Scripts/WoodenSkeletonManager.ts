import {DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM,} from '../../../../../Enums';
import EntityManager from '../../../../../Base/EntityManager';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';
import EventManager from "../../../../../Runtime/EventManager";
import DataManager from "../../../../../Runtime/DataManager";


export default class WoodenSkeletonManager extends EntityManager {
  static componentName = 'WoodenSkeletonManager';

  init() {
    this.fsm = this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    this.x = 7;
    this.y = 6;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;

    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection, this);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack, this);
    EventManager.Instance.on(EVENT_ENUM.ATTACK_ENEMY, this.onDead, this);
  }

  start() {
    this.onChangeDirection(true)
  }

  onChangeDirection(init: boolean) {
    if (this.state ===ENTITY_STATE_ENUM.DEATH || !DataManager.Instance.player) {
      return;
    }
    const {x: playerX, y: playerY} = DataManager.Instance.player;

    const disX = Math.abs(this.x - playerX);
    const disY = Math.abs(this.x - playerY);

    if (disY === disX && !init) return;

    if (playerX >= this.x && playerY <= this.y) {
      // 第一象限
      this.direction = disX > disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.TOP;
    } else if (playerX <= this.x && playerY <= this.y) {
      // 第二象限
      this.direction = disX > disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.TOP;
    } else if (playerX <= this.x && playerY >= this.y) {
      // 第三象限
      this.direction = disX > disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.BOTTOM;
    } else if (playerX >= this.x && playerY >= this.y) {
      // 第四象限
      this.direction = disX > disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.BOTTOM;
    }
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

  onDead(id:string){
    if (this.state ===ENTITY_STATE_ENUM.DEATH) {
      return;
    }

    if (id === this.id) {
      this.state = ENTITY_STATE_ENUM.DEATH;
    }
  }
}